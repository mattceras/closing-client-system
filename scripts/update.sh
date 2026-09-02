#!/usr/bin/env bash
# Closing Client System - safe Mac/Linux updater
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo ""
echo "Closing Client System - Update"
echo "==============================="
echo ""

if [ ! -d ".git" ]; then
  echo "This installation was downloaded as a ZIP and is not connected to GitHub."
  echo "Ask support for the newest release, or clone the repository with GitHub Desktop for one-click updates."
  exit 1
fi

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Update stopped because a managed CCS file was changed on this computer."
  echo "Your private agency and client files are not the problem; they are ignored automatically."
  echo "Ask your AI assistant: Help me safely update CCS without losing my work"
  exit 1
fi

git pull --ff-only

echo ""
echo "CCS is up to date."
echo "Your agency profile, clients, campaigns, and credentials were not changed."
echo ""
