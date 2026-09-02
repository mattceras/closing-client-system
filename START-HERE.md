# Start Here

You do not need GitHub Desktop and you do not need to type terminal commands.

## If you use ChatGPT Work, Claude Code, or Codex locally

1. Accept the private GitHub invitation sent by Closing Client System.
2. Open Claude Code, Codex, or the ChatGPT desktop app in **Work** mode with a **Local** project.
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

## If you use ChatGPT Work in the cloud or on a phone

Cloud Work cannot directly install or run a folder on your computer. Use the GitHub connector to read the private repository inside a ChatGPT Project.

This is suitable for research, planning, writing, and using the CCS knowledge. Local scripts and direct computer-file operations require ChatGPT Work Local, Codex, or Claude Code. Always-on webhooks, scheduled tasks, and integrations use the optional CCS cloud setup.

After connecting the repository, say:

> Read the Closing Client System repository, onboard my business, and tell me which parts I can use in ChatGPT and which parts require a local or cloud setup.

ChatGPT should create a private agency profile after the interview. Add that file to the ChatGPT Project's private sources so new chats retain the business context. Do not add it to the shared GitHub repository.

## If you use ordinary ChatGPT Chat

Chat is best for questions, brainstorming, and short writing tasks. Switch the conversation to **Work** when you want ChatGPT to use tools, work through multiple steps, create files, or carry a task through to a completed result.

## Updating later

Inside the installed CCS workspace, say:

> Update my Closing Client System without changing my agency profile, clients, campaigns, or credentials.

The assistant will run the safe updater. It stops rather than overwriting a managed file that was changed locally. Cloud-only projects read the current repository through the GitHub connector instead.

## Your first on-demand commands

After onboarding, you can say any of these without remembering technical commands:

- **Run the domain health check** — checks PlusVibe sending domains against URIBL/SURBL and shows 7, 14, and 30-day reply performance.
- **Run the campaign monitor** — shows active PlusVibe campaigns that are low on untouched leads.
- **Run the campaign optimizer** — compares variations, identifies defensible winners, and proposes the next focused challenger without changing the campaign.
- **Review this interested reply** — evaluates the conversation and prospect, then drafts a reply without sending it.
- **Check intent signals** — researches timely public events that may create a reason to contact a company.

The AI runs the local tool for you when live account data is needed. From a phone or Cloud Work project, live PlusVibe commands require the optional CCS cloud connector; pasted-reply review and public intent research can still be done conversationally.
