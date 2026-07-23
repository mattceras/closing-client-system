#!/usr/bin/env bash
# Closing Client System — Mac/Linux setup
# Run with: bash scripts/setup.sh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo ""
echo "Closing Client System — Setup"
echo "=============================="
echo ""

# --- Check Node.js ---
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed (or not on your PATH)."
  echo "This system needs Node.js 18 or later to run the cleaning/upload/scraper scripts."
  echo "Install it from: https://nodejs.org (choose the LTS version), then run this script again."
  exit 1
fi

NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "Found Node.js $(node --version), but this system needs 18 or later."
  echo "Update at: https://nodejs.org"
  exit 1
fi
echo "Node.js $(node --version) found."

# --- Check Claude Code CLI ---
if ! command -v claude >/dev/null 2>&1; then
  echo ""
  echo "Claude Code CLI not found on your PATH."
  echo "Install it from: https://claude.ai/code, then run this script again."
  exit 1
fi
echo "Claude Code CLI found."

# --- Set up config/.env if it doesn't exist yet ---
if [ ! -f "config/.env" ]; then
  cp "config/.env.example" "config/.env"
  echo ""
  echo "Created config/.env from the template. You don't need to fill it in by hand —"
  echo "the onboarding step inside Claude Code will help you fill in whatever you have."
else
  echo "config/.env already exists — leaving it as is."
fi

echo ""
echo "Setup complete."
echo ""
echo "Next steps:"
echo "  1. Stay in this folder (or 'cd' into it if you're not already here)."
echo "  2. Run: claude"
echo "  3. Just start talking — e.g. \"I want to build a lead list for a roofing company.\""
echo "     First run will walk you through a short setup (your business, your deal terms)."
echo ""
