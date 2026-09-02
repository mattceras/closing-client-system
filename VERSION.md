# Version History

## 1.5.0 — Commercial finance signal monitor

Added the permanent command “Check commercial finance signals.” The new read-only agent scans public sources for evidence-based potential borrower opportunities and separately reports recent funded-deal or lender activity. It includes a reusable commercial-finance signal taxonomy, credit-box-aware scoring, source hierarchy, 24-hour-to-7-day lookback, false-positive rules, truthful messaging boundaries, and a controlled handoff into company enrichment and campaign development. No paid provider, enrichment, upload, or outreach action runs without separate approval.

## 1.4.1 — Automatic first-run onboarding

New local installations now begin onboarding automatically after the student's first message whenever `agency-profile.md` is missing. Students no longer need to memorize or paste a setup prompt after the folder is opened. Updated the landing and setup instructions for the public repository and clarified that the only unavoidable human action is giving the repository link to the local AI assistant or downloading and opening the folder.

## 1.4.0 — Built-in adaptive coach

Added the CCS Coach for broad questions such as “What can you do?”, “What should I do next?”, “Based on all my data, what do you recommend?”, and “Am I ready to do this myself?”. The coach uses the student's accessible business and campaign evidence, identifies the current bottleneck, routes execution to specialist CCS agents, and records demonstrated proficiency in a private ignored progress file. Coaching now moves from guided to collaborative, on-demand, and graduated peer-review modes without pretending unavailable data was inspected.

## 1.3.0 — Campaign learning loop

Added the on-demand campaign optimizer. It retrieves PlusVibe variation statistics, compares positive-reply performance within the same campaign step, separates confirmed winners from directional or inconclusive results, preserves the winner as the control, drafts one focused challenger, and records reusable learnings in private campaign memory. No variation is edited, uploaded, disabled, or activated automatically.

## 1.2.1 — Signal-led sourcing library

Added the full 368-source public directory bank in JSON and CSV plus the complete signal-led list-building methodology under neutral CCS names. Expanded the intent-signal agent with a repeatable workflow for inventing, evaluating, and piloting signal concepts from any offer.

## 1.2.0 — On-demand operations agents

Added four plain-English operational commands for local use: domain health, campaign monitoring, interested-reply review, and intent-signal research. The PlusVibe domain report now combines URIBL/SURBL results with 7, 14, and 30-day human and total reply rates; the campaign monitor flags low untouched-lead inventory without changing campaigns. Onboarding now teaches every student the command menu and clearly separates on-demand local use from optional Railway webhooks and schedules. Removed legacy embedded research credentials and standardized private runtime credential loading.

## 1.1.2 — ChatGPT Work clarification

Added ChatGPT Work Local as a full local operating path alongside Claude Code and Codex. Distinguished ordinary Chat, Work Local, and Work cloud/phone so students choose the correct setup without assuming the ChatGPT product is limited to ordinary chat.

## 1.1.1 — AI-guided installation

Changed the default beginner path so Claude Code or Codex can install and update CCS from one conversational instruction. GitHub Desktop is now an optional manual alternative. Added a separate explanation for students using regular ChatGPT without a local coding environment.

## 1.1.0 — Student workspace foundation

Added:

- Claude and ChatGPT/Codex discovery files and mirrored skills
- beginner-first setup instructions for both AI platforms
- local-first and optional-cloud operating modes
- expanded onboarding for agency type, clients, sequencer, data providers, credentials, and operating mode
- documented separation between maintained CCS product files and private student data
- safe Git-based update scripts for Windows, Mac, and Linux
- update checks that stop instead of overwriting modified managed files

Private student paths remain ignored and are not replaced during updates: `agency-profile.md`, real `clients/` folders, `self-campaign/`, `config/.env`, and all real credential files.

## 1.0.0 — Initial release
First curated build of the Closing Client System, replacing the general-purpose Claude Toolkit distribution for cold email work.

Included:
- Onboarding (agency profile + deal terms)
- Core workflow: list building, AI Ark CSV cleaning, optional Jina enrichment scraping, enrichment prompts, cold email copy + frameworks, campaign upload to PlusVibe, SmartLead, or Email Bison (pick one during onboarding)
- Sales process (pre-call prep, proposal, pre-call 2, agreement) — vertical-agnostic
- Sneak Peek lead magnet builder — AI-generated mockup/preview lead magnets, plugs into the cold email follow-up sequence
- On-demand utilities: research, market research, competitive landscape, competitor alternatives, sales enablement, slides, UI/UX design intelligence, email sequences, lead magnet strategy

---

**Updating:** cloned installations can use GitHub Desktop or the safe scripts in `scripts/`. ZIP installations still require a fresh download. See [DATA-AND-UPDATES.md](DATA-AND-UPDATES.md).
