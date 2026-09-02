# On-Demand Operations

These are permanent phrases students can use. The AI assistant should handle the technical command and return the result in chat.

| Say this | What it does | Local requirement | Automatic cloud version |
|---|---|---|---|
| **Run the domain health check** | Checks PlusVibe sending domains against URIBL/SURBL and compares 7, 14, and 30-day reply rates | Local CCS folder, Node.js, PlusVibe API key | Optional schedule and stored history |
| **Run the campaign monitor** | Flags active PlusVibe campaigns with low untouched-lead inventory | Local CCS folder, Node.js, PlusVibe API key | Optional recurring monitor and alerts |
| **Run the campaign optimizer** | Compares variation-level positive reply performance, identifies defensible winners, and designs the next control-versus-challenger test | Local CCS folder, Node.js, PlusVibe API key; manual exports also work | Optional recurring analysis and experiment log |
| **Review this interested reply** | Classifies the reply, gives a two-sentence company synopsis, scores fit, and drafts the next response | Paste the conversation; website link recommended | Optional PlusVibe webhook, Slack approval, and audit history |
| **Check intent signals** | Finds and scores sourced public events that may create a timely reason to contact a company | Target market, offer, and signal definition | Optional recurring source monitors |

Students can also say **Give me intent-signal ideas for this offer**. The assistant will work backward from the offer, search the included public source bank, propose several observable events and sources, explain what each signal proves, identify likely false positives, and recommend a small pilot before any paid or large-scale collection.

The campaign optimizer uses positive reply rate as its primary metric, requires 500 sends per variation by default, and records confirmed, directional, inconclusive, and failed tests in private campaign memory. It preserves the winner unchanged as the next control and changes one strategic variable in the challenger.

## Local versus phone

In ChatGPT Work Local, Claude Code/Desktop, or Codex, the assistant can run the included scripts from this folder. In ChatGPT Work cloud or on a phone, reply review and public research can still be performed conversationally, but live PlusVibe reports require the optional CCS cloud connector.

## Safety defaults

- Domain health and campaign monitoring are read-only.
- Reply review drafts but does not send.
- Intent research does not buy data, enrich contacts, upload leads, or start outreach without separate approval.
- Schedules, webhooks, Slack actions, and unattended processing are not active merely because these commands exist.

## PlusVibe setup

Ask the assistant to connect PlusVibe. It will save the API key in the private ignored `config/.env` file and can discover all workspaces available to an account-level key. A client-specific workspace can instead be placed in `clients/<client-name>/credentials.env`.

The domain report uses two reply metrics:

- **Reply rate:** human replies, excluding out-of-office responses.
- **Total reply rate:** replies including out-of-office responses.

The 7-day trend is considered reliable after 500 sent emails. Lower volume is labeled `low volume`, not bad performance.
