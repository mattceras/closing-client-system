# Closing Client System

Your AI workspace for building and operating cold-email campaigns from start to finish.

It can help you:

- understand and improve an offer before sending;
- build, clean, and enrich lead lists;
- research markets, companies, and competitors;
- write cold-email campaigns and follow-ups;
- prepare campaigns for PlusVibe, SmartLead, Instantly, or Email Bison;
- organize client context so you do not have to explain the business every session;
- prepare for sales calls, proposals, and agreements;
- run a sending-domain blacklist and 7/14/30-day reply-performance check on demand;
- monitor active PlusVibe campaigns that are running low on untouched leads;
- review interested replies, score prospect fit, summarize the company, and draft the next response;
- research and score timely public intent signals;
- use the same operating system with ChatGPT Work, Claude, or Codex.

**New here? Open [START-HERE.md](START-HERE.md).** If you have ChatGPT Work Local, Claude Code, or Codex, you can paste one instruction and let the AI handle the technical setup. GitHub Desktop is optional. You do not need Railway, Slack, OAuth, or API keys to begin.

## How this repository works

You use the maintained Closing Client System repository, but your business information stays private on your computer.

| Maintained by CCS | Private to you |
|---|---|
| Skills and agents | `agency-profile.md` |
| Setup instructions | Your real `clients/` folders |
| Scripts and templates | `self-campaign/` |
| Research methodologies | API keys in `config/.env` |
| Product improvements | Client-specific credential files |

When you update the system, Git retrieves improvements to the left-hand column and leaves the right-hand column alone. Read [DATA-AND-UPDATES.md](DATA-AND-UPDATES.md) for the exact rules.

## Local or cloud

Start locally unless you already know you need an always-on agent.

- **Local:** simplest setup. Work from the folder on your computer with ChatGPT Work Local, Claude Code, or Codex.
- **Cloud:** optional Railway deployment for webhooks, Slack, scheduled tasks, a reply agent, and use across devices while your computer is off.

The cloud layer is an extension of the same workspace, not a different product. See [LOCAL-OR-CLOUD.md](LOCAL-OR-CLOUD.md).

## First conversation

After selecting this folder in ChatGPT Work Local, Claude, or Codex, say:

> Help me set up my Closing Client System

The onboarding agent will ask about your agency, offers, clients, sequencer, data providers, credentials, and whether you want local or cloud mode. It saves your answers so future sessions start with the right context.

## Commands you can say at any time

- **Run the domain health check**
- **Run the campaign monitor**
- **Review this interested reply**
- **Check intent signals**

The first two use live PlusVibe data when the API key is connected. The reply and intent workflows can also be used manually by pasting a conversation or describing the market. Local mode runs when you ask; Railway is only needed when you want webhooks, schedules, or work that continues while your computer is off.

See [OPERATIONS.md](OPERATIONS.md) for what each command needs and what changes when the optional cloud module is connected.

## Updating

The easiest update command is to tell ChatGPT Work Local, Claude Code, or Codex:

> Update my Closing Client System without changing my agency profile, clients, campaigns, or credentials.

You can also run the updater directly:

- Windows: right-click `scripts/update.ps1` and choose **Run with PowerShell**
- Mac/Linux: run `bash scripts/update.sh`

You can also use GitHub Desktop and click **Fetch origin**, followed by **Pull origin**. Your private workspace is intentionally excluded from system updates.

## Important safety rule

Never put real API keys, client data, or campaign exports into the shared CCS repository. The included private workspace paths are ignored by Git for this reason.
