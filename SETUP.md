# Setup

You are setting up an AI workspace, not installing a traditional software application. The folder contains the instructions and skills that teach Claude or ChatGPT/Codex how to help operate your agency.

Start locally. Railway and the always-on cloud features are optional and can be added later.

## Step 1: Get the folder

### Recommended: GitHub Desktop

Using GitHub Desktop makes future updates much easier.

1. Install GitHub Desktop from `desktop.github.com`.
2. Accept the private-repository invitation supplied by Closing Client System.
3. In GitHub Desktop, choose **File**, then **Clone repository**.
4. Select `closing-client-system`.
5. Choose an easy location such as Documents.
6. Click **Clone**.

### Simpler fallback: Download ZIP

You can choose **Code**, then **Download ZIP** on GitHub and unzip the folder. The system works normally, but future updates require downloading a fresh release because the folder is not connected to GitHub.

## Step 2: Install Node.js

Install the current LTS version from `nodejs.org`.

Node.js runs the included CSV-cleaning, enrichment, and sequencer-upload utilities. Restart your AI application after installing it.

## Step 3: Choose your AI application

The same system supports either option.

### Claude Desktop or Claude Code

1. Open Claude.
2. Choose the Code environment.
3. Choose **Local**.
4. Select the exact `closing-client-system` folder.
5. Do not select its parent folder or a folder inside it.

Claude reads `CLAUDE.md` and the skills under `.claude/skills/`.

### ChatGPT/Codex

1. Open Codex on your computer.
2. Create or open a Local project.
3. Select the exact `closing-client-system` folder.
4. Start a new task inside that project.

ChatGPT/Codex reads `AGENTS.md` and the skills under `.agents/skills/`.

If you are using regular ChatGPT Work rather than a local Codex project, connect the private GitHub repository with the GitHub plugin. Regular ChatGPT cannot run files stored only on your computer.

## Step 4: Run the local setup checker

### Windows

Right-click `scripts/setup.ps1` and choose **Run with PowerShell**.

If Windows blocks it, open PowerShell in the folder and run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup.ps1
```

### Mac/Linux

Open Terminal in the folder and run:

```bash
bash scripts/setup.sh
```

The checker confirms Node.js is available and creates the private credential file. It does not require API keys.

## Step 5: Start onboarding

In Claude or ChatGPT/Codex, say:

> Help me set up my Closing Client System

The onboarding agent will ask about:

- your agency and offers;
- whether you have clients;
- your standard pricing and deal structure;
- your sequencer;
- your list-building and enrichment tools;
- any API keys you already have;
- whether you want local mode or the optional cloud setup.

You can skip anything. Missing information is recorded as **Not set yet** rather than blocking you.

## Step 6: Confirm it worked

Ask:

> What do you know about my agency, what CCS skills can you use, and what should we do first?

A correct installation should mention your saved agency profile and recommend the appropriate CCS workflow. A generic answer usually means the wrong folder was selected.

## Updating later

Your private information is protected from updates. See [DATA-AND-UPDATES.md](DATA-AND-UPDATES.md).

- GitHub Desktop: click **Fetch origin**, then **Pull origin**.
- Windows: run `scripts/update.ps1`.
- Mac/Linux: run `bash scripts/update.sh`.

## Troubleshooting

### Node is not recognized

Install Node.js from `nodejs.org`, then completely close and reopen your terminal and AI application.

### Claude or ChatGPT gives generic answers

Close the project and select the exact `closing-client-system` folder. Selecting Downloads, Documents, or a subfolder prevents the system instructions from loading correctly.

### An API integration does not work

Tell the assistant which integration you want to connect. It should help save the key into `config/.env` or the relevant client's private credential file without repeating the full key in chat.

### You are unsure whether to use Railway

Stay local. Railway is only necessary for webhooks, scheduled tasks, Slack, and agents that must continue running while your computer is off.

### You are still stuck

Post in the CCS support channel with:

- Windows or Mac;
- Claude or ChatGPT/Codex;
- the exact error or screenshot;
- the version shown at the top of `VERSION.md`.
