# Closing Client System

Your AI workspace for building and operating cold-email campaigns from start to finish.

## New student: you only need this page

You do not need a special setup prompt. Give this public repository link to ChatGPT Work Local, Codex, or Claude Code and ask it to open or set it up. Ordinary wording is fine. If you prefer, download the repository and select the exact folder as a Local project.

Once the folder is open, send any first message—even **Hi**. CCS detects that no agency profile exists and starts its onboarding conversation automatically.

A GitHub webpage cannot install itself on a computer, so the student must still give the link to their AI assistant or download and open the folder. After that one action, the repository handles the onboarding instructions.

It can help you:

- understand and improve an offer before sending;
- build, clean, and enrich lead lists;
- research markets, companies, and competitors;
- write cold-email campaigns and follow-ups;
- prepare campaigns for PlusVibe, SmartLead, Instantly, or Email Bison;
- organize client context so you do not have to explain the business every session;
- coach you through the system, recommend the next best move from your actual data, and reduce hand-holding as you become independent;
- prepare for sales calls, proposals, and agreements;
- run a sending-domain blacklist and 7/14/30-day reply-performance check on demand;
- monitor active PlusVibe campaigns that are running low on untouched leads;
- compare campaign variations and turn credible winners into the next controlled copy test;
- review interested replies, score prospect fit, summarize the company, and draft the next response;
- research and score timely public intent signals;
- scan public commercial-finance signals for potential borrower opportunities and recent funded-deal or lender activity;
- design new intent-signal campaigns using an included 368-source public directory bank (JSON and CSV) and source-scoring methodology;
- use the same operating system with ChatGPT Work, Claude, or Codex.

**New here? Open [START-HERE.md](START-HERE.md).** GitHub Desktop is optional. You do not need a GitHub invitation, Railway, Slack, OAuth, or API keys to begin.

**Need guidance? Read [COACHING.md](COACHING.md), or simply ask “What should I do next?”**

## How this repository works

You use the maintained Closing Client System repository, but your business information stays private on your computer.

| Maintained by CCS | Private to you |
|---|---|
| Skills and agents | `agency-profile.md` |
| Setup instructions | Your real `clients/` folders |
| Scripts and templates | `self-campaign/` and `campaign-intelligence/` |
| Research methodologies | API keys in `config/.env` |
| Coaching framework | Your private `coaching-progress.md` |
| Product improvements | Client-specific credential files |

When you update the system, Git retrieves improvements to the left-hand column and leaves the right-hand column alone. Read [DATA-AND-UPDATES.md](DATA-AND-UPDATES.md) for the exact rules.

## Local or cloud

Start locally unless you already know you need an always-on agent.

- **Local:** simplest setup. Work from the folder on your computer with ChatGPT Work Local, Claude Code, or Codex.
- **Cloud:** optional Railway deployment for webhooks, Slack, scheduled tasks, a reply agent, and use across devices while your computer is off.

The cloud layer is an extension of the same workspace, not a different product. See [LOCAL-OR-CLOUD.md](LOCAL-OR-CLOUD.md).

## First conversation

After selecting this folder in ChatGPT Work Local, Claude, or Codex, send any message. The onboarding agent starts automatically and asks about your agency, offers, clients, sequencer, data providers, credentials, and whether you want local or cloud mode. It saves your answers so future sessions start with the right context.

## Commands you can say at any time

- **What can you do?**
- **What should I do next?**
- **Based on all my data, what do you recommend?**
- **Based on my offer, what would you recommend?**
- **Coach me through this**
- **Am I ready to do this myself?**
- **Run the domain health check**
- **Run the campaign monitor**
- **Run the campaign optimizer**
- **Review this interested reply**
- **Check intent signals**
- **Check commercial finance signals**
- **Give me intent-signal ideas for this offer**

The domain-health, campaign-monitor, and campaign-optimizer commands use live PlusVibe data when the API key is connected. Reply review can work from a pasted conversation, and the intent-signal commands use public research when web access is available. Local mode runs when you ask; Railway is only needed when you want webhooks, schedules, or work that continues while your computer is off.

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
