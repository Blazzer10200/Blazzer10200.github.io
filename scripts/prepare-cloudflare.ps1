$ErrorActionPreference = 'Stop'
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$buildRoot = Join-Path $repoRoot '.svelte-kit'
$outputPath = Join-Path $buildRoot 'cloudflare'

# Never follow a redirected repository/output path during recursive cleanup.
foreach ($path in @($repoRoot, $buildRoot, $outputPath)) {
    if (Test-Path -LiteralPath $path) {
        $item = Get-Item -LiteralPath $path -Force
        if (!$item.PSIsContainer -or ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
            throw "Expected ordinary directory, refusing cleanup: $path"
        }
    }
}
if (!(Test-Path -LiteralPath $outputPath)) { exit 0 }
$resolved = (Resolve-Path -LiteralPath $outputPath).Path
if ($resolved -ne $outputPath -or (Split-Path -Parent $resolved) -ne $buildRoot) {
    throw 'Generated output resolved outside the expected build directory.'
}
$links = Get-ChildItem -LiteralPath $resolved -Recurse -Force |
    Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }
if ($links) { throw 'Generated output contains a reparse point; refusing recursive cleanup.' }
try {
    Remove-Item -LiteralPath $resolved -Recurse -Force -ErrorAction Stop
} catch {
    throw "Cannot clear generated Cloudflare output. Close this project's local Wrangler preview and retry. No processes were stopped. $($_.Exception.Message)"
}
Write-Output 'Cleared generated Cloudflare output before the local platform proxy starts.'
