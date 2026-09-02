---
name: CCS-onboarding
description: First-run setup for the Closing Client System. Collects the student's agency, offers, clients, sequencer, data providers, operating mode, deal terms, and optional credentials. Writes the private agency profile and creates any requested client folders. Use when agency-profile.md does not exist, when the user says set up, get started, onboard me, or when they want to update their business, tools, clients, or credentials.
metadata:
  version: 1.3.0
---

# Closing Client System Onboarding

## Objective

Give a nontechnical student a working, personalized CCS installation through conversation. They should not need to understand repository structure, environment variables, or manually edit files.

Run this before other CCS work when `agency-profile.md` does not exist.

## Conversation rules

- Explain why a question matters in one short sentence when it is not obvious.
- Ask related questions together, but never present a wall of ten questions.
- Work with partial answers. Record `Not set yet` and continue when the student skips something.
- Do not require API keys to finish onboarding.
- Never repeat a complete credential after it has been saved.
- Never invent an offer, ICP, client, result, price, or tool selection.
- Prefer plain language over technical terminology.

## Step 1: Choose how they want to use CCS

Confirm which AI application they are currently using:

- Claude Desktop or Claude Code;
- ChatGPT Work with a Local project;
- Codex with a Local project;
- ChatGPT Work in the cloud or on a phone with the GitHub plugin;
- ordinary ChatGPT Chat.

Explain that ChatGPT Work Local, Claude Code, and Codex can operate the local CCS folder. Work cloud/phone can use the GitHub knowledge and connected cloud tools but cannot directly access the student's computer files. Ordinary Chat is intended for shorter conversational work; recommend Work for CCS workflows that need tools or multiple steps.

Then ask them to choose an operating mode:

1. **Local:** recommended first. Runs while their computer and AI session are active.
2. **Cloud later:** complete local onboarding now and keep Railway, Slack, webhooks, and scheduled tasks for a separate guided setup.
3. **Cloud now:** mark it as requested, but finish the local agency and tool profile before beginning cloud setup.

Do not pressure a beginner into cloud mode. Explain that local mode supports the core campaign workflow and requires less setup.

## Step 2: Understand the business

Ask conversationally:

1. What does the agency or business sell?
2. Are they operating only for themselves, serving clients, or both?
3. Who do they sell to, or what types of clients do they normally accept?
4. What tone should emails and proposals use?
5. What proof points, case studies, or credibility can be referenced?
6. What is the agency or business name?

If they serve clients, ask whether they want to add their current clients now or later. For each client added now, collect only:

- client name;
- what the client sells;
- target market;
- primary offer;
- any client-specific sequencer or workspace.

Create `clients/<client-name>/` from `clients/_template/`. Never place credentials in the client profile.

## Step 3: Capture the default deal terms

Ask:

> What is your normal pricing and deal structure? For example, a flat retainer, technology fee plus performance component, trial that converts into an ongoing engagement, price per qualified meeting, or something else

Capture:

- pricing model, amount, and cadence;
- trial or pilot terms;
- performance component, if any;
- what is included and excluded;
- any qualification standard that affects whether a meeting counts.

If the student already has a proposal, agreement, or pricing document, offer to extract the terms from it.

## Step 4: Identify the operating stack

Ask which tools they currently use. Only discuss credentials for selected tools.

### Email sequencer

- PlusVibe
- SmartLead
- Instantly
- Email Bison
- another tool
- none yet

If they select another tool, state whether CCS currently supports automated upload. The campaign workflow still works without upload automation.

### Company and contact data

Ask what they currently use for company lists, decision makers, email discovery, and enrichment. Examples may include AI Ark, Apollo, Clay, Lead Formatter, AirScale, public directories, or manual research. Do not imply that any one tool is required.

### Website research

Ask whether they want optional website research and lead scoring. Record the selected provider if they have one. Do not run paid enrichment during onboarding.

## Step 5: Save optional credentials

Explain:

> Keys are optional. CCS can start with research, list planning, and campaign writing without them. Anything you provide is stored in a private ignored file and is never committed with system updates

Create `config/.env` from `config/.env.example` when needed.

Ask only for credentials relevant to tools they selected:

- PlusVibe: API key and optional workspace ID list (an account-level key can discover all accessible workspaces);
- SmartLead: API key;
- Instantly: API key;
- Email Bison: API token;
- AI Ark: API key only when they want automated API usage;
- Jina or another website provider: only when selected.

Client-specific credentials belong in `clients/<client-name>/credentials.env`. Account-level defaults belong in `config/.env`.

After saving, confirm the credential name and location without displaying its value.

## Step 6: Write the private agency profile

Write `agency-profile.md` in the repository root:

```markdown
---
agency_name: [name]
created: [date]
solo_or_agency: [solo | agency | both]
ai_platform: [Claude | ChatGPT Work Local | ChatGPT Work Cloud | Codex | ChatGPT Chat]
operating_mode: [local | cloud-later | cloud-requested]
---

# Agency Profile

## Business
- What we sell: [...]
- Who we sell to: [...]
- Typical clients: [...]
- Tone: [...]
- Proof points: [...]

## Default Deal Terms
- Pricing model: [...]
- Trial or pilot: [...]
- Performance component: [...]
- Qualification standard: [...]
- In scope: [...]
- Out of scope: [...]

## Operating Stack
- Sequencer: [...]
- Company data: [...]
- Contact data: [...]
- Email enrichment: [...]
- Website research: [...]
- Local or cloud: [...]

## Current Priorities
- [...]

## Notes
[Anything the student wants the system to remember]
```

The agency profile is private and ignored by Git. System updates must never overwrite it.

Create `coaching-progress.md` from `config/coaching-progress.template.md` if it does not exist. Ask one preference question:

> When we work together, do you want step-by-step coaching, a collaborative recommendation with the AI doing the mechanical work, or concise answers unless you ask for teaching?

Save the answer under Coaching Preferences. Start the coaching level as `guided` unless the student provides real prior-work evidence that supports another level. Explain that CCS will record short evidence from completed work and reduce hand-holding as they become independent. The file is private and ignored by Git.

## Step 7: Run a readiness summary

Give the student a concise summary:

- what was saved;
- which client folders were created;
- which integrations are ready;
- which optional credentials or decisions are missing;
- whether they are local or cloud;
- the safest useful first task.

Recommend one of these as the first task:

- evaluate an offer with `CCS-cold-traffic-offer`;
- create or review the first client profile;
- plan a lead list with `CCS-ai-ark-list-builder`;
- begin a campaign brief.

Then teach the student the permanent on-demand command menu:

- `What can you do?`
- `What should I do next?`
- `Based on all my data, what do you recommend?`
- `Based on my offer, what would you recommend?`
- `Coach me through this`
- `Am I ready to do this myself?`
- `Run the domain health check`
- `Run the campaign monitor`
- `Run the campaign optimizer`
- `Review this interested reply`
- `Check intent signals`

Explain in one sentence that these work on demand in local mode, while Railway is only needed for automatic webhooks, scheduled runs, Slack approvals, and live account access from a phone.

Do not begin cloud deployment, paid enrichment, campaign upload, or external sending without a separate explicit request.

## Updating later

When the user says `update my agency`, `add a client`, `change my sequencer`, `change my API key`, or `move me to cloud`, update only the relevant section or file. Never regenerate the entire profile and lose existing context.
