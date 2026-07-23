# Setup

## What you need first

- **Node.js 18 or later** — [nodejs.org](https://nodejs.org), download the LTS version. This runs the CSV cleaning, PlusVibe upload, and optional Jina scraping scripts.
- **Claude Code** — [claude.ai/code](https://claude.ai/code). This is what you actually talk to.

You do **not** need any API keys to get started — the core workflow (list building → cleaning → enrichment → copy) works with zero keys. You'll only need a PlusVibe key when you're ready to upload a campaign.

---

## Fresh install

### Windows

1. Unzip this folder anywhere (Desktop, Documents, wherever).
2. Open the folder, right-click `scripts\setup.ps1` → **Run with PowerShell**.
   - If you get a red permissions error, open PowerShell yourself, `cd` into this folder, and run:
     ```
     powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
     ```
3. Once it says "Setup complete," stay in this folder and run `claude`.

### Mac / Linux

1. Unzip this folder anywhere.
2. Open Terminal and `cd` into the unzipped folder.
3. Run:
   ```bash
   bash scripts/setup.sh
   ```
   (Running it with `bash` directly like this avoids needing to `chmod +x` anything or fight macOS Gatekeeper over an unsigned script — you don't need to double-click it.)
4. Once it says "Setup complete," run `claude` from the same terminal, still inside this folder.

### Claude Desktop app (most people — no terminal needed)

If you use the Claude Desktop app instead of a terminal, the setup script doesn't apply to you — skip it entirely. Just make sure Node.js is installed first (see above), then:

1. Unzip this folder anywhere on your computer.
2. Open Claude Desktop and click the **Code** tab at the top.
3. Select **Local** as the environment.
4. Click **Select folder** and, in the picker that opens, navigate to and select the folder you just unzipped — it should be named `closing-client-system`.
   - **Select that exact folder, not the Downloads folder it's sitting in, and not a folder inside it.** Picking the wrong level is the single most common setup mistake — see "Make sure it worked" below to catch it early if you're not sure.
5. Pick a model, then just start typing.

### Either way, once `claude` is running (or the Desktop app is set up)

Just start talking. Something like:

> "I want to build a lead list for a roofing company client."

The first time, it'll walk you through a short setup — what your business does, your deal terms, any API keys you already have. After that it remembers, and you can just get to work.

### Make sure it worked

Before you get into real work, send one throwaway message to confirm Claude actually loaded this system: ask **"what skills do you have access to, and what should we set up first?"**

- **Working correctly:** it should mention onboarding, your agency profile, or one of the `CCS-` skills by name.
- **Not working:** if it responds like a completely generic assistant with no idea what any of this is, you're very likely pointed at the wrong folder. Close it out, re-check that you selected the exact unzipped `closing-client-system` folder (not its parent, not a folder inside it), and try again.

---

## Updating to a new version

Every new version is a fresh, self-contained zip — never unzip a new version on top of an old install.

1. Unzip the new version into a **new** folder (don't overwrite the old one).
2. From your **old** folder, copy these three things into the **new** folder:
   - `config/.env`
   - `agency-profile.md`
   - `clients/` (your actual client folders — not `_template`, that's already in the new zip)
3. Run the setup script in the new folder (same as a fresh install — it'll see your `config/.env` already exists and leave it alone).
4. From now on, run `claude` from the new folder. You can delete the old one once you've confirmed everything carried over.

Check `VERSION.md` in each release to see what changed.

---

## If you already used the old Claude Toolkit

If you previously ran the old installer that copies hundreds of generic skills into your global `~/.claude` folder, you don't have to remove anything for this to work — this package is self-contained and doesn't depend on what is or isn't installed globally. But if you want to avoid overlap or confusion (e.g. an old skill firing instead of the one in this package), you can clean out your global skills folder:

- **Windows:** delete the contents of `C:\Users\<you>\.claude\skills\`
- **Mac/Linux:** delete the contents of `~/.claude/skills/`

This is optional and only affects skills available *outside* this folder — it won't touch anything in here.

---

## Troubleshooting

**"node: command not found" / "'node' is not recognized"**
Node.js isn't installed, or your terminal needs restarting after installing it. Reinstall from [nodejs.org](https://nodejs.org), then open a brand new terminal window and try again.

**"claude: command not found"**
Claude Code isn't installed, or your terminal's PATH doesn't see it yet. Follow the install steps at [claude.ai/code](https://claude.ai/code), then open a new terminal window.

**Mac: "cannot be opened because it is from an unidentified developer"**
This happens if you try to double-click a script instead of running it through Terminal. Use the `bash scripts/setup.sh` command shown above instead of double-clicking anything.

**PlusVibe/SmartLead/Email Bison/AI Ark/Jina isn't working**
Check `config/.env` (or `clients/<name>/credentials.env` if it's client-specific) has the right value saved. You can always say "update my API key" in Claude Code and it'll walk you through it again via `CCS-onboarding`.

**Claude seems stuck after you send a message**
It's probably not stuck — it's waiting for you to approve a file it wants to create or edit (you'll see something like a diff with an "Accept" option). This is normal, expected behavior, not an error. Review it and click Accept to let it continue. You'll see this the first time it writes `agency-profile.md`, `config/.env`, and any new client folder.

**You never need to manually open or edit any file yourself** — not `config/.env`, not `agency-profile.md`, nothing. Everything happens by talking to Claude. If you're being told to hand-edit a file, something's off — ask Claude to do it for you instead.

**Still stuck?**
Post in Slack with: your OS (Windows/Mac), the exact error message or what happened, and which version this is (check `VERSION.md`, or just ask Claude "what version is this?").
