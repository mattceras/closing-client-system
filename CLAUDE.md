# Closing Client System

This folder is a self-contained Claude Code setup for running cold email outreach end-to-end: building lead lists, cleaning and enriching them, writing copy, uploading campaigns, and running the sales process on the replies you get. Everything it needs lives in this folder — skills, config, and client data all travel together.

## First thing to check, every session

If `agency-profile.md` does not exist yet in this folder's root, this is a new install. On the user's first interaction—even a greeting or vague message—begin the `CCS-onboarding` skill automatically. Do not wait for them to know or type a setup command. If they first ask a capability, setup, or troubleshooting question, answer it and then transition into onboarding. The skill asks about the user's business and deal terms and writes `agency-profile.md`. Every other skill reads that profile for context, so don't guess at answers on the user's behalf.

If `agency-profile.md` already exists, read it at the start of the session and use it as background context — the user shouldn't have to re-explain who they are or what they charge every time. Also read `coaching-progress.md` when it exists so the amount of explanation matches the student's demonstrated experience.

The profile also records whether the student chose local or cloud mode. Never assume Railway, Slack, webhooks, scheduled tasks, or a reply agent are configured merely because the repository documents them. Local is the safe default until a completed cloud setup says otherwise.

If asked "what version is this" (or something like it), read the top of `VERSION.md` and answer with just the version number — this is how support requests in Slack get triaged, so don't skip it or guess.

## The built-in coach

Route broad coaching and prioritization questions through `ccs-coach`, including:

- **What can you do?**
- **What should I do next?**
- **Based on all my data, what do you recommend?**
- **Based on my offer, what would you recommend?**
- **Where am I stuck?**
- **Coach me through this** or **Teach me how to do this**
- **Am I ready to do this myself?**

The coach reads the student's private business context and available evidence, identifies the current bottleneck, explains the important judgment, and routes execution to the correct specialist skill. It should reduce hand-holding as demonstrated competence grows. After meaningful completed work, update the private `coaching-progress.md` with a short evidence entry. When accumulated evidence supports a less guided mode, mention it at the end of a natural milestone. Never claim the student or the system inspected or saved data that was not actually available.

## The core workflow (in order — don't skip steps)

This is the main loop for taking a client (or the user's own business) from "I want to target X" to "campaign is live":

1. **Offer check** — `CCS-cold-traffic-offer`. Run this before writing any copy, for every new client/campaign. Most bad campaigns trace back to a warm offer forced into a cold channel, not bad copy.
2. **List building** — `CCS-ai-ark-list-builder` turns an ICP description into a ready-to-click AI Ark search URL.
   - If the campaign starts from a public event, filing, permit, award, licence, exhibitor list, or other intent signal, use `CCS-intent-signals` first. It designs the signal and selects a source from the included public directory bank; AI Ark then handles company/contact matching and enrichment.
3. **Export & clean** — the user opens that URL in AI Ark, tweaks filters if needed, exports the CSV themselves, and hands it back. `CCS-ai-ark-csv-cleaner` removes blank-email rows and normalizes the email column.
4. **Optional enrichment scrape** — `CCS-lead-enrichment-scraper` (Jina AI). Off by default; only run it if the user asks for it.
5. **Enrichment prompts** — `CCS-enrichment-prompts` builds the qualification / lead-info / email-copy prompt set for Lead Formatter (or Clay/AirScale) from the cleaned CSV.
6. **Copy** — `CCS-cold-email` and `CCS-email-script-frameworks` for subject lines, body copy, and follow-up sequences. If the campaign is going to push an AI-generated mockup/preview lead magnet (a "Sneak Peek" — usually offered as a tease partway through the follow-up sequence, not in email 1), use `CCS-sneak-peek-case-builder` to build the magnet idea, the ChatGPT image prompt, and the tease/reveal/book-a-call email set. Most campaigns don't use this — only reach for it when a lead magnet is actually part of the plan.
7. **Upload** — check `agency-profile.md`'s Sequencer field (or the client's profile override) to know which tool is in play, then use the matching skill: `CCS-plusvibe-uploader`, `CCS-smartlead-uploader`, or `CCS-emailbison-uploader`. All three push the finished sequence in and never activate the campaign — that's always a manual step for the user.

Don't jump straight to step 6 or 7 if earlier steps haven't happened for this client yet — walk the user through the gap instead of skipping it silently.

## The sales lane (triggered by events, not sequence)

Whenever the user has a call scheduled, just had one, or needs a proposal or agreement drafted, use `CCS-sales-process`. It auto-detects which of its four modes applies (pre-call prep, proposal generation, pre-call-2 prep, agreement drafting) from context. It uses the deal terms in `agency-profile.md` (or a client-specific override in `clients/<name>/profile.md`) — never assume a specific pricing model.

## Operational commands (plain-English, on demand)

Students do not need to remember script names. Route these phrases to the matching skill:

- **Run the domain health check** → `CCS-domain-health`. For PlusVibe, checks URIBL/SURBL and 7/14/30-day reply performance. Local execution requires the local folder and PlusVibe credentials; scheduling is optional.
- **Run the campaign monitor** → `CCS-campaign-monitor`. For PlusVibe, reports active campaigns that are running low on untouched leads. It is read-only.
- **Run the campaign optimizer** → `CCS-campaign-optimizer`. Compares variations within each step, identifies confirmed or directional leaders, preserves a winner as the control, and proposes one focused challenger. It never edits or activates campaigns automatically.
- **Review this interested reply** → `CCS-reply-agent`. Reviews a pasted or retrieved conversation, summarizes the company, scores fit, and drafts a response. Local mode never sends.
- **Check intent signals** → `CCS-intent-signals`. Runs sourced public research for timely company events. Paid data-provider runs and outreach require separate approval.
- **What should I do next?** → `ccs-coach`. Reviews the accessible offer, client, campaign, and learning data and recommends the highest-leverage next move.

When a command can run locally, execute it for the student and display the result in chat. Do not make them memorize or type the underlying terminal command. ChatGPT Work cloud/phone cannot execute the local scripts; it needs the optional cloud connector for live PlusVibe data.

## Other on-demand utilities (no required sequence)

Available whenever they're relevant, not gated to a workflow step: `CCS-research`, `CCS-market-research`, `CCS-competitive-landscape`, `CCS-competitor-alternatives`, `CCS-sales-enablement`, `CCS-slides`, `CCS-ui-ux-pro-max`, `CCS-email-sequence`, `CCS-lead-magnets`.

## Client folders

If the user is running this for a client (not just their own business), work out of `clients/<client-name>/`. Copy `clients/_template/` to create a new one. If the user has no clients and runs this only for their own business, that's fine — nothing requires a client folder to exist.

## Credentials — resolution order

For anything needing an API key or workspace ID (PlusVibe, SmartLead, Email Bison, AI Ark, Jina):
1. Check `clients/<name>/credentials.env` first, if a client folder is in use.
2. Fall back to `config/.env`.
3. If neither has it, ask the user once and tell them where to save it (don't just ask again next time).

Never hardcode a key into a skill file or a script you generate — always read it from these config files.

## Student data and product updates

`agency-profile.md`, `coaching-progress.md`, real `clients/` folders, `self-campaign/`, `campaign-intelligence/`, and real `.env` files belong to the student and are ignored by Git. Never move their contents into a tracked system file. Skills, agents, setup instructions, scripts, and templates are maintained product files. Read `DATA-AND-UPDATES.md` before helping with an update or resolving a Git conflict.

## Things to never do

- Never activate a campaign automatically on any sequencer (PlusVibe, SmartLead, or Email Bison).
- Never commit or print full API keys into any file that isn't `config/.env` or `clients/*/credentials.env`.
- Never assume a specific deal structure, vertical, or pricing model — this system is used by people selling very different things on very different terms.
- Never assume PlusVibe if the user hasn't said so — check `agency-profile.md`'s Sequencer field first.
