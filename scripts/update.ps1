# Closing Client System - safe Windows updater
$ErrorActionPreference = "Stop"
$RootDir = Split-Path -Parent $PSScriptRoot
Set-Location $RootDir

Write-Host ""
Write-Host "Closing Client System - Update"
Write-Host "==============================="
Write-Host ""

if (-not (Test-Path (Join-Path $RootDir ".git"))) {
    Write-Host "This installation was downloaded as a ZIP and is not connected to GitHub."
    Write-Host "Ask support for the newest release, or clone the repository with GitHub Desktop for one-click updates."
    exit 1
}

$trackedChanges = git status --porcelain --untracked-files=no
if ($LASTEXITCODE -ne 0) { throw "Git could not inspect this installation." }
if ($trackedChanges) {
    Write-Host "Update stopped because a managed CCS file was changed on this computer."
    Write-Host "Your private agency and client files are not the problem; they are ignored automatically."
    Write-Host "Ask your AI assistant: Help me safely update CCS without losing my work"
    exit 1
}

git pull --ff-only
if ($LASTEXITCODE -ne 0) { throw "The update could not be downloaded." }

Write-Host ""
Write-Host "CCS is up to date."
Write-Host "Your agency profile, clients, campaigns, and credentials were not changed."
Write-Host ""
