# Your Data and CCS Updates

## The short version

CCS updates the operating system without replacing your business.

Your agency profile, clients, campaigns, and credentials are kept in paths that Git does not manage. Pulling a new version updates skills, agents, instructions, scripts, and templates while leaving those private paths untouched.

## What updates can change

These are product files maintained by Closing Client System:

- `.claude/` and `CLAUDE.md`
- `.agents/` and `AGENTS.md`
- setup and update instructions;
- reusable scripts;
- empty templates;
- generic research, list-building, campaign, and sales methodologies.

Do not customize these files directly. If you need a personal rule, put it in your agency profile or the relevant client profile.

## What updates never replace

These paths belong to the student and are excluded by `.gitignore`:

- `agency-profile.md`
- `config/.env`
- every real folder under `clients/`
- `self-campaign/`
- every real `.env` file anywhere in the workspace.

The only tracked client folder is `clients/_template/`, which is an empty starting point.

## How students receive updates

### Ask the AI assistant

Inside the CCS workspace, say:

> Update my Closing Client System without changing my agency profile, clients, campaigns, or credentials.

Claude Code or Codex should run the included safe updater and explain any issue in plain language. The student does not need GitHub Desktop or a memorized command.

### GitHub Desktop

1. Open the Closing Client System repository in GitHub Desktop.
2. Click **Fetch origin**.
3. If an update is available, click **Pull origin**.
4. Reopen the folder in Claude or ChatGPT/Codex.

### Windows updater

Run `scripts/update.ps1`. It refuses to continue if a managed product file was changed locally, because silently overwriting work would be unsafe.

### Mac/Linux updater

Run `bash scripts/update.sh`. It applies the same safety check.

## Using more than one computer

The local version deliberately does not upload private client data anywhere. To move a local workspace to another computer, copy the private files yourself using an encrypted location you control.

The optional cloud version stores changing operational information in the student's own Railway/PostgreSQL environment. Credentials remain in the student's own Railway variables and never enter the CCS repository.

## If an update reports local changes

Do not delete anything. Ask your AI assistant:

> Help me safely update CCS without losing my work

The assistant should identify whether the change belongs in the private agency/client workspace or is a deliberate product modification that needs support.
