# Closing Client System

A Claude Code setup for running cold email outreach end-to-end — list building, cleaning, enrichment, copy, campaign upload, and the sales process that follows. Works with PlusVibe, SmartLead, or Email Bison as your sequencer — you pick which one during setup.

**New here? Start with [SETUP.md](SETUP.md).**

## What's in this folder

| Folder | Contents |
|---|---|
| `.claude/skills/` | The skills that do the actual work (all prefixed `CCS-`) |
| `config/` | Your API keys and workspace IDs (never shared/committed) |
| `clients/` | One folder per client you run campaigns for (optional — skip if you don't have clients) |
| `agency-profile.md` | Your business info and deal terms, created on first run |
| `scripts/` | Setup/update scripts |

## Quick start

1. Read [SETUP.md](SETUP.md) and run the setup script for your OS.
2. Open a terminal in this folder and run `claude`.
3. Just start talking — e.g. "I want to build a lead list for a roofing company client." The system will walk you through onboarding the first time, then the rest of the workflow.

## What this replaces

If you previously installed the old Claude Toolkit (the one that copies 380+ generic skills into your global `~/.claude` folder), this package is meant to replace it for cold email work — it's a small, curated set built specifically for this workflow instead of a general-purpose dump. You don't need to uninstall the old one for this to work, but if you want to avoid overlap/confusion, you can remove `parkmont-sales` and `parkmont-deck` from your global `~/.claude/skills` — those were client-specific and shouldn't have been in general circulation.
