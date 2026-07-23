# Closing Client System — Windows setup
# Run with: powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
# (or right-click scripts\setup.ps1 -> Run with PowerShell)

$ErrorActionPreference = "Stop"
$RootDir = Split-Path -Parent $PSScriptRoot
Set-Location $RootDir

Write-Host ""
Write-Host "Closing Client System - Setup"
Write-Host "=============================="
Write-Host ""

# --- Check Node.js ---
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "Node.js is not installed (or not on your PATH)."
    Write-Host "This system needs Node.js 18 or later to run the cleaning/upload/scraper scripts."
    Write-Host "Install it from: https://nodejs.org (choose the LTS version), then run this script again."
    exit 1
}

$nodeVersion = (node --version).TrimStart("v")
$nodeMajor = [int]($nodeVersion.Split(".")[0])
if ($nodeMajor -lt 18) {
    Write-Host "Found Node.js v$nodeVersion, but this system needs 18 or later."
    Write-Host "Update at: https://nodejs.org"
    exit 1
}
Write-Host "Node.js v$nodeVersion found."

# --- Check Claude Code CLI ---
$claude = Get-Command claude -ErrorAction SilentlyContinue
if (-not $claude) {
    Write-Host ""
    Write-Host "Claude Code CLI not found on your PATH."
    Write-Host "Install it from: https://claude.ai/code, then run this script again."
    exit 1
}
Write-Host "Claude Code CLI found."

# --- Set up config\.env if it doesn't exist yet ---
$envPath = Join-Path $RootDir "config\.env"
$envExamplePath = Join-Path $RootDir "config\.env.example"
if (-not (Test-Path $envPath)) {
    Copy-Item $envExamplePath $envPath
    Write-Host ""
    Write-Host "Created config\.env from the template. You don't need to fill it in by hand -"
    Write-Host "the onboarding step inside Claude Code will help you fill in whatever you have."
} else {
    Write-Host "config\.env already exists - leaving it as is."
}

Write-Host ""
Write-Host "Setup complete."
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Stay in this folder (or cd into it if you're not already here)."
Write-Host "  2. Run: claude"
Write-Host "  3. Just start talking - e.g. `"I want to build a lead list for a roofing company.`""
Write-Host "     First run will walk you through a short setup (your business, your deal terms)."
Write-Host ""
