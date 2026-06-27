using System;
using System.Diagnostics;
using System.IO;

namespace RogueMinersLauncher
{
    internal static class Program
    {
        private static int Main()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string htmlPath = Path.Combine(baseDir, "RogueMiners.html");

            if (!File.Exists(htmlPath))
            {
                htmlPath = Path.Combine(Environment.CurrentDirectory, "RogueMiners.html");
            }

            if (!File.Exists(htmlPath))
            {
                System.Windows.Forms.MessageBox.Show(
                    "RogueMiners.html was not found next to RogueMiners.exe.",
                    "Rogue Miners",
                    System.Windows.Forms.MessageBoxButtons.OK,
                    System.Windows.Forms.MessageBoxIcon.Error);
                return 1;
            }

            string url = new Uri(htmlPath).AbsoluteUri;
            string browser = FindBrowser();

            if (browser == null)
            {
                Process.Start(url);
                return 0;
            }

            string userDataDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "RogueMiners",
                "BrowserProfile");

            Directory.CreateDirectory(userDataDir);

            string args = string.Format(
                "--app=\"{1}\" --start-fullscreen --allow-file-access-from-files --user-data-dir=\"{0}\"",
                userDataDir,
                url);

            Process.Start(new ProcessStartInfo
            {
                FileName = browser,
                Arguments = args,
                UseShellExecute = false
            });

            return 0;
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

            foreach (string path in candidates)
            {
                if (File.Exists(path)) return path;
            }

            return null;
        }
    }
}
