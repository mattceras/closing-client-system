---
name: CCS-sneak-peek-case-builder
description: Take a client URL and produce a Sneak Peek outbound playbook - research + fit check + 2-3 cold-traffic lead magnet ideas (user picks one) + ChatGPT image-gen prompt + 3 email templates. Handles both generic magnets (one image for all leads) and per-prospect magnets (one image per lead). Flags risky offers with a heads-up but still produces the playbook so the operator decides. Use whenever a cold email campaign is going to push an AI-generated mockup/preview lead magnet - this is what builds it. Often plugs into a follow-up step of CCS-cold-email's sequence rather than being a standalone campaign. Invoke with /sneak-peek-case-builder.
disable-model-invocation: false
user-invocable: true
disable-model-invocation: false
user-invocable: true
---

# Sneak Peek Case Builder

## BOOT SEQUENCE — READ BEFORE RESPONDING

Read these references before generating any output:

1. `references/cold-traffic-offer-check.md` — the PASS/FAIL rules every magnet idea must pass. Baked in. Do not depend on external skills.
2. `references/research-shape.md` — the plain-English research memo shape.
3. `references/email-templates.md` — email voice rules and shape.

Read ONE of these worked examples based on the client type after phase 1:
- `references/worked-example-bpd-bm.md` — for per-prospect / enterprise clients (BPD-shape)
- `references/worked-example-leads4you.md` — for generic-magnet / repeatable-ICP clients (Leads4You-shape)

Read ONE of these image prompt templates after the user picks a magnet in phase 3:
- `references/image-prompt-per-prospect.md` — if chosen magnet is per-prospect
- `references/image-prompt-generic.md` — if chosen magnet is generic

---

## WHAT THIS SKILL DOES

Take a client URL. Produce a Sneak Peek outbound playbook the operator can install today. The core deliverables:

- Client research memo (plain English)
- Fit check: is this client's product a match for cold outbound at all?
- 2-3 lead magnet ideas that pass the cold-traffic offer check, each tagged Generic or Per-prospect
- User picks one
- ChatGPT image-gen prompt for the chosen magnet
- 3 emails

The skill does the ideation. The operator handles execution (list building, sending, image generation via ChatGPT + context.dev).

## INPUT

**Required:** client URL.

**Optional overrides:**
- `service` — one-line description of what they actually sell (use if the site is unclear)
- `icp_hint` — describe the ICP if you know it (use if the site doesn't reveal it clearly)

If no URL, refuse and ask for one.

---

## PHASES

### Phase 1 — Research the client

Use `WebFetch` to read the site. Fill the sections listed in `references/research-shape.md`.

Do not invent. If a section has no evidence on the site, say so.

### Phase 2 — Fit check (GATE)

After the research memo, run this gate. Three possible outcomes. Only ONE outcome stops the flow. Two outcomes proceed.

**Outcome A — Standard fit (proceed cleanly).**

All four hold:
- Price supports a discovery call (rough band: $500+/mo or $3k+ one-off)
- Buyer takes discovery calls before buying
- ICP is clear from the site OR the user provided an `icp_hint`
- Client's brand survives cold outbound (not a personal brand built on inbound-only)

Proceed to phase 3. No warning banner.

**Outcome B — ICP unclear (STOP, ask).**

The product fits cold outbound but the ICP is genuinely not extractable from the site (no case studies, no named ICP, no proof segments). This is an information gap, not a fit problem.

Stop. Ask the user:
> **I can't tell who this client's ICP is from their site. Before I propose lead magnet ideas, can you tell me: who is their best customer? (industry, size, role of buyer)**

Once the user replies, proceed to phase 3.

**Outcome C — Fits with risk (WARN, then proceed).**

The product doesn't match the standard cold-outbound shape. One or more of:
- Low-ticket / self-serve (below ~$500/mo, no sales call in the funnel)
- Mass ICP with no specific named buyer
- Personal brand built on inbound / thought leadership (cold outbound conflicts with brand equity)
- B2C where discovery calls don't happen

BUT the whole point of the Sneak Peek mechanism is to make traditionally-difficult offers workable on cold traffic. The skill does NOT refuse. It flags the risk clearly at the top of Message 1, suggests what to adjust, and then produces the full playbook so the operator decides.

Output a warning banner at the very top of Message 1 (before "What this client actually does"), then proceed to phases 3-6.

**Warning banner shape:**

> ⚠️ **Heads-up: this offer is harder than usual for cold outbound.**
>
> **Why:** [one specific sentence naming the risk — e.g. "$4/mo self-serve product. Standard cold outbound assumes a discovery call the operator recoups from a mid-to-high ticket deal. Here the unit economics only work if you shift to the enterprise team plan angle." Or "Personal brand built on books, podcast, and keynotes. Cold email conflicts with the inbound-reputation sales motion. Only run this if the client has agreed."]
>
> **What to adjust to make it work:** [1-2 sentences of specific tactical advice — e.g. "Target the enterprise team plan, not the individual buyer. Angle the magnet at team rollout across a specific department. Send to Head of Product Ops, not the general user." Or "Position the outbound as coming from an operator on the client's team, not the client themselves. Route replies via the client's usual booking process to keep the brand consistent."]
>
> **You can still run this. The playbook below assumes that adjustment. Decide for yourself.**

Then proceed to phase 3. The research memo, target profile, and magnet ideas should be shaped for the ADJUSTED play (e.g. enterprise team plan angle, not individual plan).

### Phase 3 — Propose 2-3 lead magnet ideas + STOP

Fires after Outcome A, C, or B (once the user has answered the ICP question).

Read `references/cold-traffic-offer-check.md`. Propose 2-3 magnet ideas. Each idea MUST:

- Pass all 6 checks in cold-traffic-offer-check.md (including check 3b: magnet category ≠ client's core service)
- Sit inside ONE named category: Ads / Funnels / Content / Lead Gen / Strategy
- Be tagged **Generic** or **Per-prospect**
- Have a sharp name (never "audit", "analysis", "review", "assessment", "consultation")
- Have a one-line description of what the mock-up visually shows
- Name the best buyer segment inside the target ICP

**Trade-off variant surface:** for solo consultants / personal brands / low-volume high-value outbound, propose BOTH Generic and Per-prospect variants of at least ONE magnet, side by side, so the operator picks the effort/impact trade. See the "When to propose BOTH variants" section of cold-traffic-offer-check.md.

Format each idea like this:

> **1. [MAGNET NAME]** *(category: [Ads/Funnels/Content/Lead Gen], tag: [Generic/Per-prospect])* — one-line visual description. Best buyer: [role].

After the list, explicitly stop with:

> **Pick one: 1, 2 or 3. Once you tell me which one, I will build the ChatGPT image prompt and the 3 emails around it.**

Wait for the user's pick. Do not proceed.

### Phase 4 — Image prompt (fires after user picks)

Read the correct image prompt template based on the picked magnet's tag:
- Generic → `references/image-prompt-generic.md`
- Per-prospect → `references/image-prompt-per-prospect.md`

Fill it in for the chosen magnet + the flagship target from phase 3.

Output the prompt as ONE clean, paste-into-ChatGPT block in a code fence. No wrapping commentary.

For per-prospect magnets, also include a "How to scale this" note at the end pointing to context.dev + Lead Formatter (coming soon).

### Phase 5 — 3 emails (fires after user picks)

Read `references/email-templates.md` for voice rules.

Produce three emails in order:
- Email 1 — the "want this?" outbound
- Email 2 — the sneak peek reply
- Email 3 — the book-a-call reply

---

## VOICE RULES (enforced everywhere)

- No em-dashes
- No exclamation marks
- en-GB spelling
- Third-grade reading level
- Banned words: leverage, synergy, scale (as verb), elevate, unlock, streamline, seamless, robust, cutting-edge, next-gen, transform, empower, disrupt
- Banned magnet-name words: audit, analysis, review, assessment, consultation, health check
- Literal outcomes over abstract states ("calls stop getting booked" beats "pipeline stalls")

---

## OUTPUT SHAPE

**Message 1 (phases 1-3):**

Use H2 headings in this order with these EXACT labels:

0. **⚠️ Heads-up** (ONLY if Outcome C fired — insert the warning banner above section 1)
1. **What this client actually does** (all 8 research sections from research-shape.md)
2. **Fit for cold outbound?** (verdict from phase 2 — one of: "Standard fit, proceed" / "Fit with risk, proceed with the heads-up above" / "ICP unclear, need your input")
3. If Outcome B → stop here with the ICP question. Otherwise continue below.
4. Conditional H2 for section 4:
   - If Per-prospect → **"The one dream client to chase (plus backups)"** — one named flagship company + 3-5 adjacent targets, and CROSS-CHECK the flagship against the client's existing named clients from section 3 (never pick an existing client)
   - If Generic → **"The ICP profile to target (plus signal companies)"** — describe the ICP as a persona (industry, size, role, trigger), then list 3-5 signal companies that fit the profile (so the operator has names to seed a list build from, without treating them as THE target)
5. **What could go wrong** (2-3 risks)
6. **Lead magnet ideas — pick one** (2-3 ideas + explicit pick line)

Then STOP. Wait for user pick.

**Message 2 (phases 4-5):**

Use H2 headings in this order:

1. **The image prompt (paste this into ChatGPT)** (code block)
2. If per-prospect, also **"How to scale this across your outbound list"** (short note on context.dev + Lead Formatter roadmap)
3. **Email 1 — the "want this?" outbound**
4. **Email 2 — the sneak peek reply**
5. **Email 3 — the book-a-call reply**

---

## WHAT TO REFUSE

- Requests without a URL → ask for one
- Requests to output the FULL deliverable (not the sneak peek) → this defeats the mechanism
- Requests to skip the image → the image IS the mechanism
- Requests for "audit" / "analysis" / "review" positioning → refuse. Preview beats audit.
- Requests to force the flagship-target format on a client that's not a fit for cold outbound → do NOT refuse. Warn via Outcome C banner, then proceed with the adjusted play (per phase 2).
- Requests to skip the pick and run all phases in one message → refuse. The pick is what makes the operator own the campaign.
