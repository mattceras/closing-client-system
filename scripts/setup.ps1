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
    Write-Host "Node.js is not installed. Core CCS onboarding, research, and writing still work."
    Write-Host "Install Node.js LTS later when you need the cleaning, enrichment, or upload utilities."
} else {
    $nodeVersion = (node --version).TrimStart("v")
    $nodeMajor = [int]($nodeVersion.Split(".")[0])
    if ($nodeMajor -lt 18) {
        Write-Host "Found Node.js v$nodeVersion. Core CCS work still functions, but utilities need version 18 or later."
    } else {
        Write-Host "Node.js v$nodeVersion found. Optional utilities are available."
    }
}

# --- Detect supported AI applications ---
$claude = Get-Command claude -ErrorAction SilentlyContinue
$codex = Get-Command codex -ErrorAction SilentlyContinue
if ($claude) { Write-Host "Claude Code CLI found." }
if ($codex) { Write-Host "Codex CLI found." }
if (-not $claude -and -not $codex) {
    Write-Host ""
    Write-Host "No Claude or Codex command-line tool was found. That is okay if you use a desktop app."
    Write-Host "Open Claude Desktop or Codex, choose a Local project, and select this exact folder."
}

# --- Set up config\.env if it doesn't exist yet ---
$envPath = Join-Path $RootDir "config\.env"
$envExamplePath = Join-Path $RootDir "config\.env.example"
if (-not (Test-Path $envPath)) {
    Copy-Item $envExamplePath $envPath
    Write-Host ""
    Write-Host "Created config\.env from the template. You don't need to fill it in by hand -"
    Write-Host "the onboarding step inside your AI application will help you fill in whatever you have."
} else {
    Write-Host "config\.env already exists - leaving it as is."
}

Write-Host ""
Write-Host "Setup complete."
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Open this exact folder as a Local project in Claude or ChatGPT/Codex."
Write-Host "  2. Say: Help me set up my Closing Client System"
Write-Host "  3. The onboarding agent will save your agency, client, tool, and setup preferences."
Write-Host ""
