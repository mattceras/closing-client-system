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
  echo "Node.js is not installed. Core CCS onboarding, research, and writing still work."
  echo "Install Node.js LTS later when you need the cleaning, enrichment, or upload utilities."
else
  NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
  if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "Found Node.js $(node --version). Core CCS work still functions, but utilities need version 18 or later."
  else
    echo "Node.js $(node --version) found. Optional utilities are available."
  fi
fi

# --- Detect supported AI applications ---
AI_CLI_FOUND=0
if command -v claude >/dev/null 2>&1; then
  echo "Claude Code CLI found."
  AI_CLI_FOUND=1
fi
if command -v codex >/dev/null 2>&1; then
  echo "Codex CLI found."
  AI_CLI_FOUND=1
fi
if [ "$AI_CLI_FOUND" -eq 0 ]; then
  echo ""
  echo "No Claude or Codex command-line tool was found. That is okay if you use a desktop app."
  echo "Open Claude Desktop or Codex, choose a Local project, and select this exact folder."
fi

# --- Set up config/.env if it doesn't exist yet ---
if [ ! -f "config/.env" ]; then
  cp "config/.env.example" "config/.env"
  echo ""
  echo "Created config/.env from the template. You don't need to fill it in by hand —"
  echo "the onboarding step inside your AI application will help you fill in whatever you have."
else
  echo "config/.env already exists — leaving it as is."
fi

echo ""
echo "Setup complete."
echo ""
echo "Next steps:"
echo "  1. Open this exact folder as a Local project in Claude or ChatGPT/Codex."
echo "  2. Say: Help me set up my Closing Client System"
echo "  3. The onboarding agent will save your agency, client, tool, and setup preferences."
echo ""
