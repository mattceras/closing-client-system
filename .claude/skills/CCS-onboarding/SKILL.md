---
name: CCS-onboarding
description: First-run setup for the Closing Client System — collects the user's business info, deal terms, and API keys, and writes agency-profile.md. Use when agency-profile.md doesn't exist yet in the project root, when the user says "set up," "get started," "onboard me," or asks to update their profile, deal terms, or API keys later. Every other CCS skill depends on agency-profile.md existing, so this always runs first for a new install.
metadata:
  version: 1.0.0
---

# Closing Client System — Onboarding

Run this before anything else if `agency-profile.md` doesn't exist in the project root yet. This is a one-time setup (re-runnable any time something changes — new deal terms, new API key, etc.).

Ask for everything below in a small number of conversational messages — don't fire off ten separate questions one at a time. Group related questions together, and work with partial answers; nothing here blocks the rest of the system from working. If the user skips something, write "Not set yet" in that section rather than leaving the file inconsistent, and move on.

---

## Step 1 — The business

Ask:
1. **What do you do?** — the service/offer, in their own words
2. **Solo, or do you run this for clients?** — determines whether the `clients/` folder gets used at all
3. **If solo:** who do you sell to (their own ICP)? **If agency:** what kind of clients do you typically take on?
4. **Tone** — how do they want copy/proposals to sound? (default: direct, peer-to-peer, no corporate fluff — matches the writing principles baked into `CCS-cold-email`)
5. **Proof points** — any case studies, results, or credibility signals worth referencing in cold copy and proposals
6. **Which email sequencer do you use?** — PlusVibe, SmartLead, Email Bison, or something else. This determines which upload skill (`CCS-plusvibe-uploader` / `CCS-smartlead-uploader` / `CCS-emailbison-uploader`) gets used later. If they name a tool outside those three, say so plainly — there's no upload automation for it yet, but everything up through writing the copy still works.

## Step 2 — Deal terms (critical — do not assume a structure)

This system is used by people selling on very different terms. Never default to a specific model. Ask directly:

> "What's your standard pricing/deal structure? For example: a monthly tech fee plus cost-per-call, a flat retainer, a trial period that converts to an ongoing engagement, a performance fee per qualified meeting, or something else entirely."

Capture:
- **Pricing model** — in their own words, then restate it back structured (amount, cadence, any performance component)
- **Trial/pilot terms**, if they have one (this feeds the wedge-offer thinking in `CCS-cold-traffic-offer` and the proposal structure in `CCS-sales-process`)
- **What's in scope / out of scope** at that price point

If they have a written proposal, contract, or pricing page already, ask them to paste it or point to the file instead of re-explaining from scratch — extract the structure from that.

## Step 3 — API keys and workspace IDs (optional, skip anything they don't have yet)

Explain first: these get written to `config/.env`, which is gitignored and never leaves this machine. Nothing here is required to start — the core workflow (list building → cleaning → enrichment → copy) works with zero API keys since the default AI Ark flow is manual export, and the sequencer upload only needs the key at upload time.

Ask for, and write whatever they provide into `config/.env` (copy from `config/.env.example` if `.env` doesn't exist yet):
- **Sequencer credentials matching their Step 1 answer only** — don't ask about all three tools, just the one they said they use:
  - PlusVibe → API key + workspace ID (`app.plusvibe.ai/v2/settings/api-access`)
  - SmartLead → API key (Settings → "Activate API")
  - Email Bison → API token (Settings → Developer API → New API Token)
- AI Ark API key — **only if** they want the optional automated export mode instead of the manual CSV-export flow. Most users should skip this and stick with the manual flow.
- Jina API key — only if they plan to use the optional lead-enrichment scraper. Works without a key at low volume.

Never print a full key back into chat after writing it to `.env` — confirm it's saved, don't echo it.

## Step 4 — Write agency-profile.md

Write to the project root using this structure:

```markdown
---
agency_name: [name]
created: [date]
solo_or_agency: [solo | agency]
---

# Agency Profile

## About
- What we do: [...]
- Who we sell to: [ICP if solo, or typical client profile if agency]
- Tone: [...]
- Proof points: [...]
- Sequencer: [PlusVibe | SmartLead | Email Bison | other — name it]

## Deal Terms (default)
- Pricing model: [structured restatement]
- Trial/pilot terms: [...]
- Scope (in / out): [...]

## Notes
[anything else worth remembering — recurring objections, past campaign learnings, etc.]
```

## Step 5 — Confirm and hand off

Tell the user what got saved and where (`agency-profile.md`, `config/.env`), and that they can say "update my deal terms" or "change my API key" any time to come back through this skill instead of hand-editing files. Then ask what they want to do first — most people either want to start on a lead list (`CCS-ai-ark-list-builder`) or check an offer (`CCS-cold-traffic-offer`) for a specific client.

---

## Rules

- Never invent an ICP, tone, or deal structure the user didn't state — leave it as "Not set yet" over guessing.
- Never require every field to be filled before letting the user move on to actual work.
- If `agency-profile.md` already exists and the user is just updating one section (e.g. new deal terms for a new offer), only touch that section — don't regenerate the whole file from scratch and lose the rest.
- Deal terms belong in `agency-profile.md` as the *default*. A specific client's terms can differ — that's handled in `clients/<name>/profile.md`, not here.
