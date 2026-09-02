# Start Here

You do not need GitHub Desktop and you do not need to type terminal commands.

## If you use Claude Code or Codex

1. Accept the private GitHub invitation sent by Closing Client System.
2. Open Claude Code or Codex.
3. Paste this message:

> Set up the Closing Client System for me from https://github.com/mattceras/closing-client-system. Handle the technical setup yourself. If GitHub needs me to sign in, pause and show me exactly what to click. Put the system in an easy-to-find folder, run its setup check, read its instructions, and then onboard me conversationally. Do not ask me to type terminal commands, and do not ask for API keys until you have explained why they are optional.

The AI assistant should:

- connect to GitHub;
- download the private repository;
- create the local workspace;
- check that the required software is available;
- load the CCS instructions and skills;
- ask about your agency, clients, offers, tools, and preferred operating mode;
- save your private business context outside the files that receive product updates.

If the assistant cannot connect to the private repository, it should help you complete GitHub's browser sign-in. Downloading a ZIP is the fallback, not the default.

## If you use regular ChatGPT only

Regular ChatGPT cannot install or run a folder on your computer. Use the GitHub connector to read the private repository inside a ChatGPT Project.

This is suitable for research, planning, writing, and using the CCS knowledge. Local scripts and direct file operations require Codex or Claude Code. Always-on webhooks, scheduled tasks, and integrations require the optional cloud setup.

After connecting the repository, say:

> Read the Closing Client System repository, onboard my business, and tell me which parts I can use in ChatGPT and which parts require a local or cloud setup.

ChatGPT should create a private agency profile after the interview. Add that file to the ChatGPT Project's private sources so new chats retain the business context. Do not add it to the shared GitHub repository.

## Updating later

Inside the installed CCS workspace, say:

> Update my Closing Client System without changing my agency profile, clients, campaigns, or credentials.

The assistant will run the safe updater. It stops rather than overwriting a managed file that was changed locally.
