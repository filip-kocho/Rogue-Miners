using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web.Script.Serialization;

namespace RogueMinersLauncher
{
    internal static class Program
    {
        private static readonly ManualResetEvent ExitSignal = new ManualResetEvent(false);

        private static int Main(string[] args)
        {
            bool serverOnly = Array.Exists(args ?? new string[0], value => string.Equals(value, "--server-only", StringComparison.OrdinalIgnoreCase));
            string contentRoot = ExtractEmbeddedGame();
            if (contentRoot == null) return 1;

            PortableGameServer server = null;
            try
            {
                server = PortableGameServer.Start(contentRoot, ExitSignal, 37621, 20);
                if (!serverOnly) LaunchBrowser(server.LocalUrl);

                ExitSignal.WaitOne();
                return 0;
            }
            catch (Exception error)
            {
                System.Windows.Forms.MessageBox.Show(
                    "Rogue Miners could not start.\n\n" + error.Message,
                    "Rogue Miners",
                    System.Windows.Forms.MessageBoxButtons.OK,
                    System.Windows.Forms.MessageBoxIcon.Error);
                return 1;
            }
            finally
            {
                if (server != null) server.Dispose();
                try { Directory.Delete(contentRoot, true); } catch { }
            }
        }

        private static string ExtractEmbeddedGame()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            Stream bundle = assembly.GetManifestResourceStream("RogueMinersBundle.zip");
            if (bundle == null)
            {
                System.Windows.Forms.MessageBox.Show(
                    "The portable game bundle is missing from RogueMiners.exe.",
                    "Rogue Miners",
                    System.Windows.Forms.MessageBoxButtons.OK,
                    System.Windows.Forms.MessageBoxIcon.Error);
                return null;
            }

            string root = Path.Combine(Path.GetTempPath(), "RogueMinersPortable", Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(root);
            using (bundle)
            using (ZipArchive archive = new ZipArchive(bundle, ZipArchiveMode.Read))
            {
                foreach (ZipArchiveEntry entry in archive.Entries)
                {
                    string target = Path.GetFullPath(Path.Combine(root, entry.FullName.Replace('/', Path.DirectorySeparatorChar)));
                    if (!target.StartsWith(Path.GetFullPath(root), StringComparison.OrdinalIgnoreCase)) continue;
                    if (string.IsNullOrEmpty(entry.Name))
                    {
                        Directory.CreateDirectory(target);
                        continue;
                    }
                    Directory.CreateDirectory(Path.GetDirectoryName(target));
                    using (Stream input = entry.Open())
                    using (FileStream output = File.Create(target)) input.CopyTo(output);
                }
            }
            return root;
        }

        private static Process LaunchBrowser(string url)
        {
            string browser = FindBrowser();
            if (browser == null)
            {
                Process.Start(url);
                return null;
            }

            string profile = Path.Combine(Path.GetTempPath(), "RogueMinersBrowser", Process.GetCurrentProcess().Id.ToString());
            Directory.CreateDirectory(profile);
            string args = string.Format(
                "--app=\"{1}\" --start-fullscreen --allow-file-access-from-files --autoplay-policy=no-user-gesture-required --user-data-dir=\"{0}\"",
                profile,
                url);

            return Process.Start(new ProcessStartInfo
            {
                FileName = browser,
                Arguments = args,
                UseShellExecute = false
            });
        }

        private static string FindBrowser()
        {
            string[] candidates =
            {
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Google", "Chrome", "Application", "chrome.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Google", "Chrome", "Application", "chrome.exe")
            };
            foreach (string path in candidates) if (File.Exists(path)) return path;
            return null;
        }
    }

    internal sealed class PortableGameServer : IDisposable
    {
        private readonly string root;
        private readonly TcpListener listener;
        private readonly ManualResetEvent exitSignal;
        private readonly Thread acceptThread;
        private readonly object stateLock = new object();
        private readonly object lobbyLock = new object();
        private readonly JavaScriptSerializer json = new JavaScriptSerializer { MaxJsonLength = 16 * 1024 * 1024 };
        private volatile bool running = true;
        private string latestPayload;
        private long stateVersion;
        private string roomCode;
        private string hostClientId;
        private bool lobbyStarted;
        private readonly List<LobbyPlayer> lobbyPlayers = new List<LobbyPlayer>();
        private readonly List<LobbyAction> lobbyActions = new List<LobbyAction>();
        private long actionVersion;

        public int Port { get; private set; }
        public string LocalUrl { get { return "http://127.0.0.1:" + Port + "/"; } }
        public string LanUrl { get { return "http://" + FindLanAddress() + ":" + Port + "/"; } }

        private PortableGameServer(string root, TcpListener listener, int port, ManualResetEvent exitSignal)
        {
            this.root = Path.GetFullPath(root);
            this.listener = listener;
            this.Port = port;
            this.exitSignal = exitSignal;
            this.acceptThread = new Thread(AcceptLoop);
            this.acceptThread.IsBackground = true;
            this.acceptThread.Start();
        }

        public static PortableGameServer Start(string root, ManualResetEvent exitSignal, int firstPort, int attempts)
        {
            Exception last = null;
            for (int port = firstPort; port < firstPort + attempts; port++)
            {
                try
                {
                    TcpListener listener = new TcpListener(IPAddress.Any, port);
                    listener.Start(24);
                    return new PortableGameServer(root, listener, port, exitSignal);
                }
                catch (Exception error) { last = error; }
            }
            throw new InvalidOperationException("No available Rogue Miners network port was found.", last);
        }

        private void AcceptLoop()
        {
            while (running)
            {
                try
                {
                    TcpClient client = listener.AcceptTcpClient();
                    ThreadPool.QueueUserWorkItem(delegate { HandleClient(client); });
                }
                catch { if (!running) return; }
            }
        }

        private void HandleClient(TcpClient client)
        {
            using (client)
            {
                try
                {
                    client.ReceiveTimeout = 10000;
                    client.SendTimeout = 10000;
                    NetworkStream stream = client.GetStream();
                    HttpRequest request = HttpRequest.Read(stream);
                    if (request == null) return;

                    IPEndPoint remote = client.Client.RemoteEndPoint as IPEndPoint;
                    bool localRequest = remote != null && IPAddress.IsLoopback(remote.Address);
                    Route(stream, request, localRequest);
                }
                catch { }
            }
        }

        private void Route(NetworkStream stream, HttpRequest request, bool localRequest)
        {
            string path = request.Path;
            if (path == "/api/info")
            {
                string infoJson = "{\"port\":" + Port + ",\"localUrl\":\"" + JsonEscape(LocalUrl) + "\",\"lanUrl\":\"" + JsonEscape(LanUrl) + "\"}";
                WriteResponse(stream, 200, "application/json; charset=utf-8", Encoding.UTF8.GetBytes(infoJson), null);
                return;
            }
            if (path == "/api/lobby/create" && request.Method == "POST")
            {
                Dictionary<string, object> body = ParseObject(request.Body);
                string clientId = GetString(body, "clientId");
                string playerName = CleanPlayerName(GetString(body, "name"));
                if (clientId.Length == 0 || playerName.Length == 0)
                {
                    WriteJsonError(stream, 400, "Player name is required.");
                    return;
                }
                lock (lobbyLock)
                {
                    roomCode = CreateRoomCode();
                    hostClientId = clientId;
                    lobbyStarted = false;
                    lobbyPlayers.Clear();
                    lobbyActions.Clear();
                    actionVersion = 0;
                    lock (stateLock) { latestPayload = null; stateVersion = 0; }
                    lobbyPlayers.Add(new LobbyPlayer { ClientId = clientId, Name = playerName, Seat = 0, IsHost = true, LastSeenUtc = DateTime.UtcNow });
                    WriteLobbyResponse(stream, clientId);
                }
                return;
            }
            if (path == "/api/lobby/join" && request.Method == "POST")
            {
                Dictionary<string, object> body = ParseObject(request.Body);
                string clientId = GetString(body, "clientId");
                string playerName = CleanPlayerName(GetString(body, "name"));
                string requestedRoom = GetString(body, "roomCode").ToUpperInvariant();
                lock (lobbyLock)
                {
                    if (roomCode == null || requestedRoom != roomCode) { WriteJsonError(stream, 404, "Room code was not found."); return; }
                    LobbyPlayer existing = lobbyPlayers.Find(player => player.ClientId == clientId);
                    if (existing == null && lobbyStarted) { WriteJsonError(stream, 403, "This game has already started."); return; }
                    if (existing == null && lobbyPlayers.Count >= 4) { WriteJsonError(stream, 403, "The lobby is full."); return; }
                    if (existing == null)
                    {
                        existing = new LobbyPlayer { ClientId = clientId, Seat = NextLobbySeat(), IsHost = false };
                        lobbyPlayers.Add(existing);
                    }
                    existing.Name = playerName;
                    existing.LastSeenUtc = DateTime.UtcNow;
                    WriteLobbyResponse(stream, clientId);
                }
                return;
            }
            if (path == "/api/lobby" && request.Method == "GET")
            {
                string clientId = GetQuery(request, "client");
                string requestedRoom = GetQuery(request, "room").ToUpperInvariant();
                lock (lobbyLock)
                {
                    if (roomCode == null || requestedRoom != roomCode) { WriteJsonError(stream, 404, "Lobby not found."); return; }
                    LobbyPlayer player = lobbyPlayers.Find(entry => entry.ClientId == clientId);
                    if (player == null) { WriteJsonError(stream, 403, "You are not a member of this lobby."); return; }
                    player.LastSeenUtc = DateTime.UtcNow;
                    WriteLobbyResponse(stream, clientId);
                }
                return;
            }
            if (path == "/api/lobby/start" && request.Method == "POST")
            {
                Dictionary<string, object> body = ParseObject(request.Body);
                string clientId = GetString(body, "clientId");
                string requestedRoom = GetString(body, "roomCode").ToUpperInvariant();
                lock (lobbyLock)
                {
                    if (roomCode == null || requestedRoom != roomCode) { WriteJsonError(stream, 404, "Lobby not found."); return; }
                    if (clientId != hostClientId) { WriteJsonError(stream, 403, "Only the host can start the game."); return; }
                    if (lobbyPlayers.Count < 2 || lobbyPlayers.Count > 4) { WriteJsonError(stream, 400, "The game needs 2 to 4 players."); return; }
                    lobbyStarted = true;
                    WriteLobbyResponse(stream, clientId);
                }
                return;
            }
            if (path == "/api/action" && request.Method == "POST")
            {
                Dictionary<string, object> body = ParseObject(request.Body);
                string clientId = GetString(body, "source");
                string requestedRoom = GetString(body, "roomCode").ToUpperInvariant();
                string method = GetString(body, "method");
                object argsObject;
                body.TryGetValue("args", out argsObject);
                lock (lobbyLock)
                {
                    LobbyPlayer player = GetLobbyMember(clientId, requestedRoom);
                    if (player == null) { WriteJsonError(stream, 403, "You are not in this lobby."); return; }
                    if (!lobbyStarted) { WriteJsonError(stream, 403, "The game has not started."); return; }
                    int expectedSeat = GetExpectedActorSeat();
                    if (expectedSeat >= 0 && player.Seat != expectedSeat) { WriteJsonError(stream, 403, "It is not your turn."); return; }
                    if (!IsAllowedActionMethod(method)) { WriteJsonError(stream, 403, "That action is not allowed."); return; }
                    LobbyAction action = new LobbyAction { Id = ++actionVersion, Source = clientId, Seat = player.Seat, Method = method, Args = argsObject };
                    lobbyActions.Add(action);
                    if (lobbyActions.Count > 120) lobbyActions.RemoveRange(0, lobbyActions.Count - 120);
                    WriteResponse(stream, 200, "application/json", Encoding.UTF8.GetBytes("{\"actionId\":" + action.Id + "}"), null);
                }
                return;
            }
            if (path == "/api/actions" && request.Method == "GET")
            {
                string clientId = GetQuery(request, "client");
                string requestedRoom = GetQuery(request, "room").ToUpperInvariant();
                long since = ParseLong(request.Query, "since");
                lock (lobbyLock)
                {
                    if (clientId != hostClientId || roomCode == null || requestedRoom != roomCode) { WriteJsonError(stream, 403, "Only the host receives actions."); return; }
                    List<LobbyAction> actions = lobbyActions.FindAll(action => action.Id > since);
                    string actionJson = json.Serialize(new Dictionary<string, object> { { "latest", actionVersion }, { "actions", actions } });
                    WriteResponse(stream, 200, "application/json; charset=utf-8", Encoding.UTF8.GetBytes(actionJson), null);
                }
                return;
            }
            if (path == "/api/state" && request.Method == "GET")
            {
                string clientId = GetQuery(request, "client");
                string requestedRoom = GetQuery(request, "room").ToUpperInvariant();
                long since = ParseLong(request.Query, "since");
                LobbyPlayer member;
                lock (lobbyLock)
                {
                    member = GetLobbyMember(clientId, requestedRoom);
                    if (member == null) { WriteJsonError(stream, 403, "You are not in this lobby."); return; }
                    member.LastSeenUtc = DateTime.UtcNow;
                }
                lock (stateLock)
                {
                    if (latestPayload == null || stateVersion <= since)
                    {
                        WriteResponse(stream, 204, "application/json", new byte[0], null);
                        return;
                    }
                    string personalized = member.IsHost ? latestPayload : GetPersonalizedPayload(latestPayload, member.Seat);
                    string stateJson = "{\"version\":" + stateVersion + ",\"payload\":" + personalized + "}";
                    WriteResponse(stream, 200, "application/json; charset=utf-8", Encoding.UTF8.GetBytes(stateJson), null);
                    return;
                }
            }
            if (path == "/api/state" && request.Method == "POST")
            {
                string body = Encoding.UTF8.GetString(request.Body ?? new byte[0]);
                if (body.Length < 2 || body[0] != '{' || body.Length > 12 * 1024 * 1024)
                {
                    WriteResponse(stream, 400, "text/plain", Encoding.UTF8.GetBytes("Invalid state"), null);
                    return;
                }
                Dictionary<string, object> envelope = ParseObject(request.Body);
                string source = GetString(envelope, "source");
                string requestedRoom = GetString(envelope, "roomCode").ToUpperInvariant();
                lock (lobbyLock)
                {
                    if (source != hostClientId || roomCode == null || requestedRoom != roomCode || !lobbyStarted)
                    {
                        WriteJsonError(stream, 403, "Only the lobby host can publish game state.");
                        return;
                    }
                }
                long version;
                lock (stateLock)
                {
                    latestPayload = body;
                    version = ++stateVersion;
                }
                WriteResponse(stream, 200, "application/json", Encoding.UTF8.GetBytes("{\"version\":" + version + "}"), null);
                return;
            }
            if (path == "/api/shutdown" && request.Method == "POST")
            {
                if (!localRequest)
                {
                    WriteResponse(stream, 403, "text/plain", Encoding.UTF8.GetBytes("Only the host can stop the server."), null);
                    return;
                }
                WriteResponse(stream, 200, "application/json", Encoding.UTF8.GetBytes("{\"ok\":true}"), null);
                ThreadPool.QueueUserWorkItem(delegate { Thread.Sleep(120); exitSignal.Set(); });
                return;
            }
            if (request.Method == "OPTIONS")
            {
                WriteResponse(stream, 204, "text/plain", new byte[0], null);
                return;
            }
            ServeStatic(stream, request);
        }

        private void ServeStatic(NetworkStream stream, HttpRequest request)
        {
            string relative = request.Path == "/" ? "RogueMiners.html" : Uri.UnescapeDataString(request.Path.TrimStart('/'));
            relative = relative.Replace('/', Path.DirectorySeparatorChar);
            string file = Path.GetFullPath(Path.Combine(root, relative));
            if (!file.StartsWith(root, StringComparison.OrdinalIgnoreCase) || !File.Exists(file))
            {
                WriteResponse(stream, 404, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes("Not found"), null);
                return;
            }

            byte[] data = File.ReadAllBytes(file);
            Dictionary<string, string> extra = new Dictionary<string, string>();
            extra["Cache-Control"] = "no-cache";
            extra["Accept-Ranges"] = "bytes";
            string range;
            if (request.Headers.TryGetValue("range", out range) && range.StartsWith("bytes=", StringComparison.OrdinalIgnoreCase))
            {
                long start = 0;
                long end = data.Length - 1;
                string[] parts = range.Substring(6).Split('-');
                if (parts.Length > 0 && parts[0].Length > 0) long.TryParse(parts[0], out start);
                if (parts.Length > 1 && parts[1].Length > 0) long.TryParse(parts[1], out end);
                start = Math.Max(0, Math.Min(start, data.Length - 1));
                end = Math.Max(start, Math.Min(end, data.Length - 1));
                int count = (int)(end - start + 1);
                byte[] slice = new byte[count];
                Buffer.BlockCopy(data, (int)start, slice, 0, count);
                extra["Content-Range"] = "bytes " + start + "-" + end + "/" + data.Length;
                WriteResponse(stream, 206, MimeType(file), slice, extra);
                return;
            }
            WriteResponse(stream, 200, MimeType(file), data, extra);
        }

        private static void WriteResponse(NetworkStream stream, int status, string contentType, byte[] body, Dictionary<string, string> extra)
        {
            string reason = status == 200 ? "OK" : status == 204 ? "No Content" : status == 206 ? "Partial Content" : status == 400 ? "Bad Request" : status == 403 ? "Forbidden" : "Not Found";
            StringBuilder headers = new StringBuilder();
            headers.Append("HTTP/1.1 ").Append(status).Append(' ').Append(reason).Append("\r\n");
            headers.Append("Content-Type: ").Append(contentType).Append("\r\n");
            headers.Append("Content-Length: ").Append(body.Length).Append("\r\n");
            headers.Append("Connection: close\r\n");
            headers.Append("Access-Control-Allow-Origin: *\r\n");
            headers.Append("Access-Control-Allow-Headers: Content-Type\r\n");
            if (extra != null) foreach (KeyValuePair<string, string> entry in extra) headers.Append(entry.Key).Append(": ").Append(entry.Value).Append("\r\n");
            headers.Append("\r\n");
            byte[] headerBytes = Encoding.ASCII.GetBytes(headers.ToString());
            stream.Write(headerBytes, 0, headerBytes.Length);
            if (body.Length > 0) stream.Write(body, 0, body.Length);
        }

        private static string MimeType(string path)
        {
            switch (Path.GetExtension(path).ToLowerInvariant())
            {
                case ".html": return "text/html; charset=utf-8";
                case ".js": return "application/javascript; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".svg": return "image/svg+xml";
                case ".png": return "image/png";
                case ".jpg": case ".jpeg": case ".jfif": return "image/jpeg";
                case ".ico": return "image/x-icon";
                case ".mp3": return "audio/mpeg";
                default: return "application/octet-stream";
            }
        }

        private static long ParseLong(Dictionary<string, string> query, string key)
        {
            string value;
            long parsed;
            return query.TryGetValue(key, out value) && long.TryParse(value, out parsed) ? parsed : 0;
        }

        private static string JsonEscape(string value)
        {
            return value.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }

        private static string FindLanAddress()
        {
            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.OperationalStatus != OperationalStatus.Up || nic.NetworkInterfaceType == NetworkInterfaceType.Loopback) continue;
                foreach (UnicastIPAddressInformation address in nic.GetIPProperties().UnicastAddresses)
                {
                    if (address.Address.AddressFamily == AddressFamily.InterNetwork && !IPAddress.IsLoopback(address.Address)) return address.Address.ToString();
                }
            }
            return "127.0.0.1";
        }

        private Dictionary<string, object> ParseObject(byte[] body)
        {
            try
            {
                string text = Encoding.UTF8.GetString(body ?? new byte[0]);
                return json.Deserialize<Dictionary<string, object>>(text) ?? new Dictionary<string, object>();
            }
            catch { return new Dictionary<string, object>(); }
        }

        private static string GetString(Dictionary<string, object> source, string key)
        {
            object value;
            return source != null && source.TryGetValue(key, out value) && value != null ? Convert.ToString(value) : "";
        }

        private static string GetQuery(HttpRequest request, string key)
        {
            string value;
            return request.Query.TryGetValue(key, out value) ? value : "";
        }

        private static string CleanPlayerName(string value)
        {
            string clean = (value ?? "").Trim();
            if (clean.Length > 18) clean = clean.Substring(0, 18);
            return clean;
        }

        private static string CreateRoomCode()
        {
            const string alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            Random random = new Random(unchecked(Environment.TickCount * 31 + Process.GetCurrentProcess().Id));
            char[] code = new char[5];
            for (int i = 0; i < code.Length; i++) code[i] = alphabet[random.Next(alphabet.Length)];
            return new string(code);
        }

        private int NextLobbySeat()
        {
            for (int seat = 0; seat < 4; seat++) if (!lobbyPlayers.Exists(player => player.Seat == seat)) return seat;
            return lobbyPlayers.Count;
        }

        private LobbyPlayer GetLobbyMember(string clientId, string requestedRoom)
        {
            if (roomCode == null || requestedRoom != roomCode) return null;
            return lobbyPlayers.Find(player => player.ClientId == clientId);
        }

        private void WriteLobbyResponse(NetworkStream stream, string clientId)
        {
            LobbyPlayer self = lobbyPlayers.Find(player => player.ClientId == clientId);
            List<Dictionary<string, object>> players = new List<Dictionary<string, object>>();
            foreach (LobbyPlayer player in lobbyPlayers)
            {
                players.Add(new Dictionary<string, object>
                {
                    { "name", player.Name }, { "seat", player.Seat }, { "isHost", player.IsHost },
                    { "connected", (DateTime.UtcNow - player.LastSeenUtc).TotalSeconds < 8 }
                });
            }
            Dictionary<string, object> response = new Dictionary<string, object>
            {
                { "roomCode", roomCode }, { "started", lobbyStarted }, { "players", players },
                { "seat", self == null ? -1 : self.Seat }, { "isHost", self != null && self.IsHost },
                { "lanUrl", LanUrl }
            };
            WriteResponse(stream, 200, "application/json; charset=utf-8", Encoding.UTF8.GetBytes(json.Serialize(response)), null);
        }

        private void WriteJsonError(NetworkStream stream, int status, string message)
        {
            string body = json.Serialize(new Dictionary<string, object> { { "error", message } });
            WriteResponse(stream, status, "application/json; charset=utf-8", Encoding.UTF8.GetBytes(body), null);
        }

        private int GetExpectedActorSeat()
        {
            string payload;
            lock (stateLock) payload = latestPayload;
            if (string.IsNullOrEmpty(payload)) return 0;
            try
            {
                Dictionary<string, object> envelope = json.Deserialize<Dictionary<string, object>>(payload);
                Dictionary<string, object> state = envelope["state"] as Dictionary<string, object>;
                if (state == null) return 0;
                object wildShift;
                object wildPlayer;
                if (state.TryGetValue("currentWildShift", out wildShift) && wildShift != null
                    && state.TryGetValue("currentWildPlayerIdx", out wildPlayer) && wildPlayer != null)
                {
                    return Convert.ToInt32(wildPlayer);
                }
                int pendingSeat;
                if (TryPendingPlayer(state, "pendingKeepChoice", true, out pendingSeat)) return pendingSeat;
                if (TryPendingPlayer(state, "pendingThiefTradeChoice", true, out pendingSeat)) return pendingSeat;
                if (TryPendingPlayer(state, "pendingThiefLegacyChoice", true, out pendingSeat)) return pendingSeat;
                if (TryPendingPlayer(state, "pendingSabotageBonus", false, out pendingSeat)) return pendingSeat;
                if (TryPendingPlayer(state, "pendingNightChoice", false, out pendingSeat)) return pendingSeat;
                string[] actionKeys = { "pendingAdditionalAction", "pendingBankAction", "pendingBanditAction", "pendingMarketAction", "pendingThiefAction", "pendingTavernAction", "pendingCrownlessPoolChoice" };
                foreach (string key in actionKeys) if (TryPendingPlayer(state, key, false, out pendingSeat)) return pendingSeat;
                Dictionary<string, object> round = GetDictionary(state, "pendingRoundSummary");
                if (round != null && GetString(round, "kind") == "debt-reminder") return -1;
                object active;
                return state.TryGetValue("activePIdx", out active) ? Convert.ToInt32(active) : 0;
            }
            catch { return 0; }
        }

        private static bool TryPendingPlayer(Dictionary<string, object> state, string key, bool useCurrent, out int seat)
        {
            seat = -1;
            Dictionary<string, object> pending = GetDictionary(state, key);
            if (pending == null) return false;
            if (useCurrent) pending = GetDictionary(pending, "current");
            if (pending == null) return false;
            object value;
            if (!pending.TryGetValue("playerIdx", out value) || value == null) return false;
            seat = Convert.ToInt32(value);
            return true;
        }

        private static Dictionary<string, object> GetDictionary(Dictionary<string, object> source, string key)
        {
            object value;
            return source != null && source.TryGetValue(key, out value) ? value as Dictionary<string, object> : null;
        }

        private static bool IsAllowedActionMethod(string method)
        {
            if (string.IsNullOrEmpty(method) || method.Length > 64) return false;
            foreach (char ch in method) if (!char.IsLetterOrDigit(ch) && ch != '_') return false;
            if (method == "getDebt") return true;
            string[] blockedPrefixes = { "render", "get", "is", "can", "has", "count", "format", "capture", "apply", "poll", "schedule", "broadcast", "init", "createNetwork", "setIntro", "copyNetwork", "joinNetwork", "createNetworkLobby", "startNetworkLobby" };
            foreach (string prefix in blockedPrefixes) if (method.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)) return false;
            return method != "exitGame" && method != "toggleSound";
        }

        private string GetPersonalizedPayload(string payload, int seat)
        {
            try
            {
                Dictionary<string, object> envelope = json.Deserialize<Dictionary<string, object>>(payload);
                Dictionary<string, object> state = envelope["state"] as Dictionary<string, object>;
                object playersObject;
                IEnumerable players = state != null && state.TryGetValue("players", out playersObject) ? playersObject as IEnumerable : null;
                if (players != null)
                {
                    int i = 0;
                    foreach (object playerObject in players)
                    {
                        if (i != seat)
                        {
                            Dictionary<string, object> player = playerObject as Dictionary<string, object>;
                            if (player != null)
                            {
                                player["hand"] = new object[0];
                                player["deck"] = new object[0];
                            }
                        }
                        i++;
                    }
                }
                int expected = GetExpectedActorSeat();
                if (state != null && expected != seat)
                {
                    string[] privatePending = { "pendingBankAction", "pendingBankPayment", "pendingBanditAction", "pendingBanditPayment", "pendingMarketAction", "pendingThiefAction", "pendingThiefPayment", "pendingThiefFlexChoice", "pendingTavernAction", "pendingNightChoice", "pendingSabotageBonus", "pendingAdditionalAction", "pendingKeepChoice", "pendingCrownlessPoolChoice", "pendingThiefTradeChoice", "pendingThiefLegacyChoice", "currentWildShift", "currentWildGain", "currentWildQueue", "currentWildBandit", "currentWildMineLog", "currentWildPlayerIdx" };
                    foreach (string key in privatePending) state[key] = null;
                    state["bankContractsExpanded"] = false;
                    state["banditGuildsExpanded"] = false;
                    state["marketCardsExpanded"] = false;
                    state["thiefCardsExpanded"] = false;
                    state["tavernCardsExpanded"] = false;
                }
                return json.Serialize(envelope);
            }
            catch { return payload; }
        }

        public void Dispose()
        {
            running = false;
            try { listener.Stop(); } catch { }
        }
    }

    internal sealed class LobbyPlayer
    {
        public string ClientId { get; set; }
        public string Name { get; set; }
        public int Seat { get; set; }
        public bool IsHost { get; set; }
        public DateTime LastSeenUtc { get; set; }
    }

    internal sealed class LobbyAction
    {
        public long Id { get; set; }
        public string Source { get; set; }
        public int Seat { get; set; }
        public string Method { get; set; }
        public object Args { get; set; }
    }

    internal sealed class HttpRequest
    {
        public string Method;
        public string Path;
        public Dictionary<string, string> Query = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        public Dictionary<string, string> Headers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        public byte[] Body;

        public static HttpRequest Read(NetworkStream stream)
        {
            MemoryStream headerBuffer = new MemoryStream();
            int matched = 0;
            byte[] end = { 13, 10, 13, 10 };
            while (headerBuffer.Length < 65536)
            {
                int value = stream.ReadByte();
                if (value < 0) return null;
                headerBuffer.WriteByte((byte)value);
                if (value == end[matched]) matched++;
                else matched = value == end[0] ? 1 : 0;
                if (matched == 4) break;
            }

            string headerText = Encoding.ASCII.GetString(headerBuffer.ToArray());
            string[] lines = headerText.Split(new[] { "\r\n" }, StringSplitOptions.None);
            if (lines.Length == 0) return null;
            string[] first = lines[0].Split(' ');
            if (first.Length < 2) return null;

            HttpRequest request = new HttpRequest();
            request.Method = first[0].ToUpperInvariant();
            string target = first[1];
            int queryAt = target.IndexOf('?');
            request.Path = queryAt >= 0 ? target.Substring(0, queryAt) : target;
            if (queryAt >= 0)
            {
                foreach (string pair in target.Substring(queryAt + 1).Split('&'))
                {
                    string[] kv = pair.Split(new[] { '=' }, 2);
                    if (kv.Length > 0) request.Query[Uri.UnescapeDataString(kv[0])] = kv.Length > 1 ? Uri.UnescapeDataString(kv[1]) : "";
                }
            }
            for (int i = 1; i < lines.Length; i++)
            {
                int colon = lines[i].IndexOf(':');
                if (colon > 0) request.Headers[lines[i].Substring(0, colon).Trim()] = lines[i].Substring(colon + 1).Trim();
            }

            int length = 0;
            string lengthText;
            if (request.Headers.TryGetValue("content-length", out lengthText)) int.TryParse(lengthText, out length);
            if (length < 0 || length > 12 * 1024 * 1024) return null;
            request.Body = new byte[length];
            int read = 0;
            while (read < length)
            {
                int count = stream.Read(request.Body, read, length - read);
                if (count <= 0) break;
                read += count;
            }
            return request;
        }
    }
}
