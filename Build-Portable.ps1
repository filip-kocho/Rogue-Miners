$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$stage = Join-Path $env:TEMP ("RogueMinersBuild-" + [Guid]::NewGuid().ToString("N"))
$bundle = Join-Path $root "RogueMinersBundle.zip"
$dist = Join-Path $root "dist"
$output = Join-Path $dist "RogueMiners-Portable.exe"
$csc = "$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\csc.exe"

$assetDirectories = @(
    "_data",
    "sounds",
    "_bandit_icons",
    "_day_shifs",
    "_moon_icons",
    "_operation_icons",
    "_player_markers",
    "_thief_icons"
)

try {
    New-Item -ItemType Directory -Path $stage -Force | Out-Null
    New-Item -ItemType Directory -Path $dist -Force | Out-Null

    Copy-Item -LiteralPath (Join-Path $root "RogueMiners.html") -Destination $stage
    Copy-Item -LiteralPath (Join-Path $root "RogueMiners.jfif") -Destination $stage
    Copy-Item -LiteralPath (Join-Path $root "RogueMiners.ico") -Destination $stage
    foreach ($directory in $assetDirectories) {
        Copy-Item -LiteralPath (Join-Path $root $directory) -Destination $stage -Recurse
    }

    if (Test-Path $bundle) { Remove-Item -LiteralPath $bundle -Force }
    Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $bundle -CompressionLevel Optimal

    & $csc /nologo /target:winexe `
        "/out:$output" `
        /reference:System.Windows.Forms.dll `
        /reference:System.Web.Extensions.dll `
        /reference:System.IO.Compression.dll `
        /reference:System.IO.Compression.FileSystem.dll `
        "/win32icon:$(Join-Path $root 'RogueMiners.ico')" `
        "/resource:$bundle,RogueMinersBundle.zip" `
        (Join-Path $root "RogueMinersLauncher.cs")

    if ($LASTEXITCODE -ne 0) { throw "Portable launcher compilation failed." }
    Copy-Item -LiteralPath $output -Destination (Join-Path $root "RogueMiners.exe") -Force
    Get-Item $output | Select-Object FullName, Length, LastWriteTime
}
finally {
    if (Test-Path $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
    if (Test-Path $bundle) { Remove-Item -LiteralPath $bundle -Force }
}
