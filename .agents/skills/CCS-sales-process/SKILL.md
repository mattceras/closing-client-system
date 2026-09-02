---
name: CCS-sales-process
description: Vertical-agnostic sales intelligence system covering pre-call prep, proposal generation, pre-call-2 prep, and agreement drafting. Use whenever the user has a sales call scheduled, just finished one, needs a proposal generated, or needs an agreement drafted. Also use when the user says "call tomorrow," "just got off a call," "draft the proposal," "preparing for follow-up," "they said yes," or "draft the agreement." Auto-detects the mode from context. Deal terms, positioning, and vertical always come from agency-profile.md or the specific client's profile — never assume a pricing model or industry.
metadata:
  version: 1.0.0
---

# Sales Process

Operate in four modes. **Detect the mode automatically from context — don't ask which mode is wanted unless genuinely ambiguous.**

| Mode | Trigger | Output |
|---|---|---|
| **PRE-CALL PREP** | A URL, company name, or "call tomorrow/this week" | Discovery questions, terminology, intent signals, deal structure reminder |
| **PROPOSAL** | Transcript pasted, or "just got off call 1" | Full HTML proposal (print-to-PDF ready) |
| **PRE-CALL 2 PREP** | "Call 2 tomorrow," "they reviewed it," "preparing for follow-up" | Likely questions, execution talking points, closing sequence |
| **AGREEMENT** | "They said yes," "moving forward," "draft the agreement" | Engagement agreement, ready to drop into PandaDoc/DocuSign/plain PDF |

---

## Before using any mode: know who's talking and what they're selling

Read `agency-profile.md` (project root) first — that's the default: what the user's business does, who they sell to, their tone, their proof points, and critically their **default deal terms**. If working a specific client engagement, check `clients/<name>/profile.md` for anything that overrides the default (some clients negotiate different terms than the agency's standard).

**Never assume a pricing model, a vertical, or an industry.** This system gets used by people selling wildly different things on wildly different terms — a flat monthly retainer, a tech fee plus cost-per-call, a trial period that converts to ongoing, a performance fee per qualified meeting, or something else entirely. If `agency-profile.md` doesn't have deal terms filled in yet, stop and point the user to `CCS-onboarding` before generating a proposal or agreement — don't invent numbers.

---

## Core Sales Framework

This is a general high-ticket B2B sales framework — it applies regardless of vertical. Use it to shape call prep, proposal tone, and closing language.

### The Meta-Principle
The prospect is buying the seller, not just the service. They're outsourcing a problem they don't want to solve themselves — they're purchasing time, expertise, and confidence that it'll get handled. If they don't believe the seller can execute, they won't buy regardless of how good the offer sounds on paper. **Communication competence signals execution competence.**

### Tonality (worth reminding the user when relevant)
- Speak from the chest, not the throat — resonance reads as confidence.
- No upward inflection at the end of statements — every claim should land as a statement, not a question.
- Downward inflection on the points that matter most.
- Volume is a dominance signal — too quiet reads as submissive, appropriately confident volume reads as in control.

### Call 1 Structure

**Opening (first 2-3 minutes):** Brief small talk, then move straight into: *"I took a little time to look at your business before jumping on — [one genuine, specific observation]. I think a good place to start is for you to give me some background: what you're focused on right now, and what you'd like the next 90 days or so to look like. From there we can see if there's a fit."* Then stop talking and let them go.

**Discovery (middle 60-70% of the call):** Let them talk. Use the discovery questions from Mode 1 as a mental checklist, not a script — tick them off as they come up naturally rather than asking in sequence. It should feel like genuine curiosity, not an intake form.

**Back 20% of the call — three things, in this order:**
1. A high-level description of how the seller would approach their specific situation — reference whatever the seller's actual differentiators are (from `agency-profile.md`). Compelling but not overly specific yet — no definitives.
2. State the price range plainly, anchored to the deal terms in `agency-profile.md` (or the client-specific override). Explain *why* the structure is what it is if it's not obvious (e.g. "the upfront covers buildout because there's a ramp before this converts").
3. Book the next call before hanging up — a specific day/time, not "I'll follow up."

After the call: a brief 3-4 sentence follow-up email summarizing the discussion, confirming the next call, and noting that a proposal is coming before it — ask them to review it beforehand.

**Hard rules for call 1:**
- No definitives on pricing, deliverables, or timelines until the proposal.
- Don't try to close high-ticket offers on a single call.
- Don't present a full deck live on the call.
- Don't send an intake form or questionnaire before there's a signed agreement.
- Don't open at the floor price.

### Objection Handling Sequence (in this order)
1. *"Meet me in the middle — what would you need to feel comfortable moving forward with the terms I proposed?"*
2. Split payments (e.g. 50% at signing, 50% at day 30).
3. A credit structure: the upfront pre-covers the first N backend events within X days, then a per-event fee kicks in.
4. A guaranteed minimum (e.g. a meeting/result guarantee) baked into the engagement.
5. A money-back guarantee tied to one specific, measurable metric.

Pull the specific numbers for any of these from the user's actual deal terms — never invent a structure they haven't described.

### Pre-Objection Credibility Frames (use before objections surface)
- *"I looked into your business before we got on this call — I wouldn't be here if I didn't already think we could deliver for you."*
- *"I'm talking to a handful of other [businesses like theirs] right now — the ones who've committed are the ones I can prioritize building a strong program for."*
- Frame the upfront as going to the buildout/infrastructure/labor, not as pure margin — the real economic alignment is on the back end (if that matches the actual deal structure).

### Call 2 Structure
Send the proposal before the call. Open with: *"Did you get a chance to look at what I sent over? Any questions on it?"* Then let them drive — call 2 is them asking questions and the seller going deep on execution detail. **The more specific and thorough the execution explanation, the more certainty it creates.** People buy on perceived value, not just actual value — a confident, detailed walkthrough of exactly how the work gets done is what closes.

### Positioning Lines (adapt to the seller's actual differentiators)
- **Against doing it themselves / referral-only pipeline:** referrals and internal effort are reactive — what's being sold is a proactive, systematic function that produces results on a schedule instead of waiting for one to show up.
- **Against a direct competitor:** avoid a head-to-head comparison. If pushed, redirect to what's actually different about this seller's approach (from `agency-profile.md`) rather than trash-talking the competitor.
- **Speaking to results without a case study (three approaches):**
  1. Anchor to the prospect's own numbers: "based on what you told me, adding X per month at your current close rate is roughly Y in additional revenue per quarter."
  2. Credibility-by-process: describe why the approach is built differently for businesses like theirs.
  3. Pre-commitment framing: "I looked into your business before this call — I wouldn't have gotten on it if I didn't already think we could do this."

---

## Fallback Sequence on Pricing Pushback

Always in this order, regardless of vertical:
1. Split: partial at signing, remainder at a later milestone (e.g. day 30).
2. Credit structure: upfront pre-covers the first N backend events within X days, then per-event pricing kicks in.
3. Minimum guarantee: a floor on deliverables within the engagement window.
4. Money-back guarantee tied to one specific, measurable metric.

---

## Mode 1: Pre-Call Prep

**Triggered by:** a URL, company name, LinkedIn profile, or any sign a call is coming up.

Output in this order:

### 1. Business Snapshot
2-3 sentences, in the prospect's own language: what they do, how they make money, what they're likely optimizing for right now.

### 2. How They Likely Get Results Today
Infer, based on their business type, how they currently get whatever the seller's service would improve (new customers, new deals, new candidates, new capital — whatever it is) — referrals, an internal team, a broker/vendor, paid ads, word of mouth, etc. — and what's limited about that. This is the seed for the differentiated angle later in the call and in the proposal. Don't force a generic answer; reason about their specific business type.

### 3. Discovery Questions (5-7)
Framed as natural conversation openers, broad to specific. Cover:
- **Current state:** how are they generating [outcome] today? What's working, what isn't?
- **Volume/goals:** what are they doing now, what would they like to be doing?
- **Roadblocks:** what's stopping them from getting there internally?
- **Team/process:** who owns this today? What does their process look like?
- **Decision-making:** who else needs to be involved in a decision?

Write them the way the user would actually say them out loud — conversational, not clinical.

### 4. Terminology Cheat Sheet
6-10 words or phrases specific to the prospect's industry that make the seller sound like they've done this before. One-line note on when to use each.

### 5. Intent Signals / Differentiators for This Prospect
4-6 things specific to this prospect's business and market that the seller's approach would key off of — framed in language the seller could actually say on the call. Make these specific to the actual prospect, not generic filler.

### 6. "What a Good Result Looks Like" Framing
One paragraph the seller can adapt for the back 20% of the call — anchored to the prospect's own numbers where possible (from what's known about their business): "Based on what you're describing, adding X per month at your current rate is roughly Y per quarter. A reasonable goal for an initial engagement would be Z, within [timeframe]."

### 7. Deal Structure Reminder
Pull the seller's actual default deal terms from `agency-profile.md` (or the client override) and restate them in plain language, ready to say out loud on the call. Never substitute a generic or invented number.

---

## Mode 2: Proposal

**Triggered by:** a call transcript being shared, or the user saying they just finished call 1.

**If there's no transcript:** ask for a plain-language summary instead — what was discussed, what the prospect cares about, what they seemed to react to. Don't block on having a formal transcript; most users won't have one.

### Step 1 — Extract (show the user what got extracted)
- Firm name, contact name, title
- Current situation (how they get results today, volume, team)
- Stated goals and roadblocks
- Specific criteria mentioned (size, profile, geography, industry — whatever's relevant to this seller's business)
- Budget/timeline signals
- What they seemed to care about most

### Step 2 — Generate the HTML proposal

Generate a complete, standalone HTML document. Clean, print-ready, professional. Use the seller's own positioning language from `agency-profile.md` — don't invent language the user hasn't actually used to describe their business.

**Branding:** Use the seller's agency name as a CSS text wordmark (see template below) unless they've provided an actual logo file or URL — if they have, embed it as an `<img>`, matching background treatment to whether the logo is light-on-dark or dark-on-light. If the prospect has a discoverable logo, mirror the same header-left/header-right layout with a border rule between them; otherwise use the prospect's name in styled text.

**HTML Proposal Template** (adapt colors/fonts if the user has stated brand colors — otherwise this navy/gold palette is a safe default):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>[Agency Name] — [Firm Name] Proposal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', Georgia, serif; color: #1a1a2e; background: #fff; padding: 60px; max-width: 820px; margin: 0 auto; -webkit-font-smoothing: antialiased; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 28px; border-bottom: 1px solid #1a2a6c; margin-bottom: 40px; }

  /* Agency CSS wordmark — use unless a real logo file/URL was provided */
  .agency-logo-wrap { display: flex; flex-direction: column; gap: 5px; }
  .agency-wordmark { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: normal; color: #1a2a6c; letter-spacing: 0.04em; line-height: 1; }
  .agency-rule { display: flex; align-items: center; gap: 4px; }
  .agency-rule-line { flex: 1; height: 1px; background: #1a2a6c; }
  .agency-rule-diamond { width: 4px; height: 4px; background: #1a2a6c; transform: rotate(45deg); flex-shrink: 0; }

  .prospect-logo-img { height: 44px; object-fit: contain; object-position: right center; display: block; }
  .prospect-logo { text-align: right; }
  .prospect-wordmark { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: #1a2a6c; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1; }
  .prospect-sub { font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #B8922A; margin-top: 5px; }

  .title-block { margin-bottom: 44px; }
  .eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #1a2a6c; margin-bottom: 8px; }
  h1 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: normal; color: #1a1a2e; margin-bottom: 18px; line-height: 1.3; }
  .meta { font-size: 12px; color: #888; line-height: 2; }

  hr.divider { border: none; border-top: 1px solid #e8e8e8; margin: 32px 0; }

  section { margin-bottom: 32px; }
  section h2 { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #1a2a6c; font-weight: normal; padding-bottom: 8px; border-bottom: 1px solid #e8e8e8; margin-bottom: 16px; }

  p { font-size: 13.5px; line-height: 1.9; color: #2a2a3e; margin-bottom: 12px; }

  ul { margin: 8px 0 12px 0; padding-left: 0; list-style: none; }
  ul li { font-size: 13.5px; line-height: 1.85; color: #2a2a3e; padding: 5px 0 5px 18px; position: relative; }
  ul li::before { content: "—"; position: absolute; left: 0; color: #1a2a6c; font-size: 12px; }

  .terms-block { background: #f8f8fc; border-left: 3px solid #1a2a6c; padding: 22px 26px; margin: 14px 0; }
  .terms-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #1a2a6c; margin-bottom: 6px; }
  .terms-amount { font-family: 'Playfair Display', serif; font-size: 24px; color: #1a2a6c; margin-bottom: 4px; }
  .terms-detail { font-size: 13px; color: #2a2a3e; line-height: 1.8; margin-top: 6px; }
  .terms-split { margin-top: 10px; display: flex; flex-direction: column; gap: 5px; }
  .terms-split-row { display: flex; gap: 10px; align-items: flex-start; }
  .split-dot { width: 4px; height: 4px; border-radius: 50%; background: #B8922A; margin-top: 5px; flex-shrink: 0; }
  .split-text { font-size: 13px; color: #2a2a3e; line-height: 1.7; }

  .next-steps ol { padding-left: 20px; margin-top: 8px; }
  .next-steps ol li { font-size: 13.5px; line-height: 1.85; color: #2a2a3e; padding: 4px 0; }

  .footer { margin-top: 52px; padding-top: 24px; border-top: 1px solid #1a2a6c; display: flex; justify-content: space-between; align-items: flex-end; }
  .footer-left { font-size: 12px; color: #666; line-height: 1.9; }
  .footer-right { font-size: 11px; color: #aaa; text-align: right; }

  @media print {
    @page { margin: 15mm 18mm; size: A4; }
    body { padding: 40px; }
    section, .terms-block, .next-steps, .footer { break-inside: avoid; page-break-inside: avoid; }
  }
</style>
</head>
<body>

<div class="header">
  <div class="agency-logo-wrap">
    <div class="agency-wordmark">[Agency Name]</div>
    <div class="agency-rule">
      <div class="agency-rule-diamond"></div>
      <div class="agency-rule-line"></div>
      <div class="agency-rule-diamond"></div>
    </div>
  </div>

  <div class="prospect-logo">
    <div class="prospect-wordmark">[Firm Name]</div>
    <div class="prospect-sub">[Tagline or sector]</div>
  </div>
</div>

<div class="title-block">
  <p class="eyebrow">[Program Name — e.g. "Deal Origination Program," "90-Day Pipeline Program" — match the seller's own wedge offer language]</p>
  <h1>Prepared for [Firm Name]</h1>
  <div class="meta">
    Prepared by [Agency Name] &nbsp;·&nbsp; [Seller's Name]<br>
    [DATE]
  </div>
</div>

<section>
  <h2>Overview</h2>
  <p>[2-3 sentences contextualizing the conversation. Second person. Reference what they actually said on the call — their situation, what they're trying to achieve, what the seller will build for them.]</p>
</section>

<hr class="divider">

<section>
  <h2>What We'll Build</h2>
  <ul>
    <li>[Core deliverable, framed around their specific situation]</li>
    <li>[Second deliverable]</li>
    <li>[The execution mechanism — in the seller's own language, from agency-profile.md]</li>
    <li>[Delivery/reporting process]</li>
  </ul>
</section>

<section>
  <h2>Who We'll Target</h2>
  <p>[Specific: whatever criteria came up on the call — industry, geography, size, titles, whatever's relevant to this seller's business. Should feel custom, not generic.]</p>
</section>

<section>
  <h2>What's Included</h2>
  <ul>
    <li>[Item built to this firm's specific criteria]</li>
    <li>[Item]</li>
    <li>[Item]</li>
    <li>Regular reporting on progress and results</li>
  </ul>
</section>

<hr class="divider">

<section>
  <h2>Engagement Terms</h2>

  <!--
  Pick the block(s) that match the seller's ACTUAL deal structure from
  agency-profile.md — never default to one of these if the real terms
  are different. Common shapes:

  A) Single upfront fee only
  B) Upfront fee + performance fee per outcome (funded deal, signed mandate,
     qualified meeting, closed sale — whatever the unit is)
  C) Flat monthly retainer
  D) Monthly tech/platform fee + cost-per-outcome (e.g. cost-per-call)
  E) Trial/pilot period at a reduced rate, converting to an ongoing rate
  -->

  <div class="terms-block">
    <div class="terms-label">[Fee Label — e.g. "Engagement Fee," "Monthly Retainer," "Trial Program Fee"]</div>
    <div class="terms-amount">$[X][ / month, if recurring]</div>
    <div class="terms-detail">[What this covers, in plain language]</div>
  </div>

  <!-- Only include a second terms-block if the structure has a second component (e.g. a performance fee, or a cost-per-outcome on top of a tech fee) -->
  <div class="terms-block">
    <div class="terms-label">[Second component label, if applicable]</div>
    <div class="terms-amount">$[X] per [the actual unit — call, meeting, funded deal, closed sale, etc.]</div>
    <div class="terms-detail">[Attribution/qualification rule and window, if applicable]</div>
  </div>
</section>

<hr class="divider">

<section class="next-steps">
  <h2>Next Steps</h2>
  <ol>
    <li>Review this proposal and share with the team as needed</li>
    <li>If you'd like to continue the conversation, we can schedule a call [timeframe]</li>
    <li>Upon agreement, [Agency Name] will send the engagement letter and begin immediately</li>
  </ol>
</section>

<div class="footer">
  <div class="footer-left">
    [Seller's Name] &nbsp;|&nbsp; [Agency Name]<br>
    [Seller's Email]
  </div>
  <div class="footer-right">
    Confidential &nbsp;|&nbsp; Prepared exclusively for [Firm Name]
  </div>
</div>

</body>
</html>
```

### Turning it into a PDF

Default: save the HTML file and tell the user to open it in any browser and use Print → Save as PDF (works on any OS, zero setup). This is the reliable default for most users.

**Advanced/optional:** if the user already has `puppeteer-core` and a local Chrome install set up and wants an automated PDF (no manual print dialog), a script can drive that instead — only do this if they ask for it and confirm they have Chrome and Node available; don't make it the default path since it adds a dependency most users won't have configured.

---

## Mode 3: Pre-Call 2 Prep

**Triggered by:** "call 2 is tomorrow," "they reviewed the proposal," or "preparing for the follow-up."

### 1. Proposal Summary (Quick Refresh)
Bullet recap of what was proposed — terms, structure, what's included.

### 2. Questions They're Most Likely to Ask
For each: the question, a recommended response, and the underlying concern it signals.

### 3. Execution Detail Talking Points
3-5 specific things the seller can say about *how* the work actually gets done. Thorough, specific execution explanations create the certainty that closes deals. Include, adapted to the seller's actual process:
- How the work gets built (their actual process, from agency-profile.md)
- What makes their approach different from doing it in-house or through a competitor
- What week 1, 2, 3, 4 of the engagement look like

### 4. Closing Sequence
Specific language options for moving from Q&A into commitment at the end of the call.

### 5. Objection Reminders
Quick-reference version of the objection sequence above.

---

## Mode 4: Agreement

**Triggered by:** "they said yes," "they want to move forward," "help me draft the agreement."

Generate a clean engagement agreement — professional, not overly legalistic. Pull the seller's legal entity name, state, and signer name from `agency-profile.md` (ask if not set). **The FEES section must match the seller's actual deal structure** — don't default to an upfront-plus-performance-fee shape if their model is a flat retainer, a tech fee plus cost-per-outcome, or a trial period. Build that section fresh from their real terms each time.

```
ENGAGEMENT AGREEMENT

This Engagement Agreement ("Agreement") is entered into as of [DATE] between:

[AGENCY LEGAL NAME], a [State] [entity type] ("Provider")

and

[CLIENT FIRM LEGAL NAME], a [State] [entity type] ("Client")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SCOPE OF ENGAGEMENT
Provider will provide [describe the actual service] for Client as described
herein, including [the real deliverables discussed on the call].

2. TERM
The initial engagement period is [X] days/months, commencing on the date of
execution ("Initial Period"). Following the Initial Period, the parties may
agree to a continuation on terms to be mutually agreed.

3. FEES
[Build this clause to match the seller's actual deal structure — for example:
 - "Setup Fee: $[X], due upon execution" + "Performance Fee: $[X] per [unit],
   attributed per Section 4" for an upfront-plus-performance model
 - "Monthly Fee: $[X], due on the [Nth] of each month" for a flat retainer
 - "Monthly Platform Fee: $[X]" + "Cost Per [Outcome]: $[X], invoiced monthly"
   for a tech-fee-plus-cost-per-outcome model
 - "Trial Program Fee: $[X] for the first [N] [outcomes/days], converting to
   [ongoing rate] thereafter" for a trial-then-convert model
Only include an Attribution section (4) if the fee structure has a
performance/attribution component — omit it entirely for flat retainers.]

4. ATTRIBUTION (only if applicable)
A [unit — e.g. funded deal, signed mandate, qualified meeting] is attributed
to Provider when it was first generated through Provider's work, as confirmed
by Client's records or written acknowledgment. The Attribution Window is
[X] days from the date of first introduction/contact.

5. CLIENT OBLIGATIONS
Client agrees to: (a) provide timely written confirmation of attributed
events for fee reconciliation, if applicable; (b) designate a primary point
of contact; (c) provide reasonable cooperation in defining and refining
criteria/scope.

6. CONFIDENTIALITY
Each party agrees to keep confidential any non-public information received
from the other party in connection with this Agreement and not to disclose
it to third parties without prior written consent.

7. INDEPENDENT CONTRACTOR
Provider is an independent contractor. Nothing in this Agreement creates an
employment, partnership, or joint venture relationship between the parties.

8. LIMITATION OF LIABILITY
Provider's total liability under this Agreement shall not exceed the total
fees paid by Client in the three months preceding the claim. Provider does
not guarantee specific outcomes.

9. TERMINATION
After the Initial Period, either party may terminate this Agreement with
[X] days' written notice. [State whether any upfront/setup fee is
non-refundable, matching the seller's actual policy.] Any fees accrued prior
to termination remain payable.

10. GOVERNING LAW
This Agreement shall be governed by the laws of the State of [State].

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AGREED AND ACCEPTED:

[AGENCY LEGAL NAME]

Signature: ___________________________
Name: [Seller's Name]
Title: [Title]
Date: ___________________________


[CLIENT FIRM NAME]

Signature: ___________________________
Name: ___________________________
Title: ___________________________
Date: ___________________________
```

---

## Rules

- Never invent deal terms, a vertical's economics, or a pricing model — always pull from `agency-profile.md` or `clients/<name>/profile.md`, and stop to ask if neither has it.
- Never carry over one business's numbers, verticals, claims, or forbidden-word list into a different user's output. Business-specific rules are not reusable defaults.
- Never require a call transcript to exist — a plain-language summary from the user is always an acceptable substitute in Mode 2 and Mode 4.
- Never default the PDF step to an automated puppeteer pipeline — manual print-to-PDF is the default; automation is opt-in only for users who already have it set up.
- Keep the proposal and agreement's Engagement Terms / FEES section matched exactly to the seller's real structure — don't force a deal shape the business doesn't actually use.
