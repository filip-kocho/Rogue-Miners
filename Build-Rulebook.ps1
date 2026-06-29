$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$html = Join-Path $root "RogueMiners_Rulebook.html"
$pdf = Join-Path $root "RogueMiners_Rulebook.pdf"
$profile = Join-Path $env:TEMP ("RogueMinersRulebook-" + [Guid]::NewGuid().ToString("N"))
$edgeCandidates = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
)
$edge = $edgeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edge) { throw "Microsoft Edge was not found. It is required to render the rulebook PDF." }

try {
    $uri = [Uri]::new($html).AbsoluteUri
    & $edge `
        --headless=new `
        --disable-gpu `
        --allow-file-access-from-files `
        --run-all-compositor-stages-before-draw `
        --no-pdf-header-footer `
        "--user-data-dir=$profile" `
        "--print-to-pdf=$pdf" `
        $uri | Out-Null
    if (-not (Test-Path -LiteralPath $pdf)) { throw "Rulebook PDF was not created." }
    Get-Item -LiteralPath $pdf | Select-Object FullName, Length, LastWriteTime
}
finally {
    if (Test-Path -LiteralPath $profile) { Remove-Item -LiteralPath $profile -Recurse -Force }
}
