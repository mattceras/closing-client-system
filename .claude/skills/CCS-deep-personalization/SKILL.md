---
name: CCS-deep-personalization
description: Write genuinely bespoke cold emails at the firm level, one per company, from scraped or enriched source material. Use when the user has a lead list and wants real per-lead personalization rather than merge-variable copy. Also use when the user says "write an email to each of them," "make these personalized," "bespoke outreach," "1:1 emails," "personalize this list," "write copy for each company," or has a small high-intent segment worth deep effort. Covers the full pipeline: triage, scraping, disqualification, firm-level collapse, writing, QA, and handoff to the sequencer. Includes a volume path via Lead Formatter for lists too large to write by hand.
metadata:
  version: 1.0.0
---

# Deep Personalization

Writes one genuinely bespoke email per **company**, built from what that company actually published about itself. Not merge variables. Not spintax. Real copy that could not be sent to anyone else.

This is the most effective outreach in the system and the most expensive to produce. The whole skill is about spending that effort only where it pays.

---

## The One Number That Governs Everything

**Cost scales with unique firms, not leads.**

A list of 744 contacts was 234 companies. You write 234 emails, not 744. Everyone at the same firm gets that firm's email, because the personalization is their investment box, their sectors, their structure — not their personal biography.

Check this ratio first, before anything else:

```bash
node scripts/pipeline.js count <list.csv>
```

Typical clustering is 2-4 leads per firm. That ratio decides which tier you're in.

---

## Two Tiers — Pick One Before Starting

| | **Tier A — Claude writes** | **Tier B — Lead Formatter writes** |
|---|---|---|
| Size | ≤1,000 leads / ≤300 firms | 3,000+ leads |
| Who writes | Claude Code, by hand, in batches | Lead Formatter, per row |
| Quality | Highest | ~85-90% as good |
| Cost sits on | Claude usage | AirScale/Clay per-row pricing |
| Use for | Intent-triggered segments, high-value ICPs | Broad list coverage |

**Tier B is not a lesser version of the workflow — it is the same workflow with the writing step swapped out.** Steps 1-5 and 7-8 are identical. Only step 6 changes.

Do not offer to hand-write 1,200 firms. Say what it costs and recommend Tier B.

---

## The Pipeline

### 1. Parse and dedupe

Parse with a real RFC4180 parser. **Never trust `wc -l`** — description fields contain newlines and will inflate the row count by 4-5x.

Dedupe by email, keeping the most senior title. Report the true unique count before doing anything else.

### 2. Triage into two buckets

Most lists already carry usable enrichment. Only scrape what doesn't.

- **WRITE** — description is ≥180 chars and reads like the target ICP. Use as-is.
- **SCRAPE** — thin, missing, or wrong. Needs the website.

On a recent 744-lead list this was 476 / 214. The 214 collapsed to **86 unique domains**. Always dedupe domains before scraping.

### 3. Scrape only what you must

Default to plain `fetch()` — free and fast. Strip scripts, styles, nav, footer. Keep the meta description, `og:description`, title, and first ~2,000 chars of body.

**Use context.dev via the `monid` skill when:**
- The plain fetch fails (JS-rendered, bot-walled) — typically 10-15% of domains
- The list is large enough that a 15% miss rate is real money in lost leads
- Cost is ~$0.0009/page; 1,000 domains ≈ $0.90

Never fire a paid `monid run` without explicit written approval each time.

### 4. Disqualify — the step people skip

The scrape doubles as qualification. Read `references/list-hygiene.md` before this step.

**Bad personalization is worse than no personalization.** A confidently wrong email — "I saw you're a full-service real estate company serving Central Virginia" to a private equity Managing Partner — is the one that gets screenshotted. When the source material doesn't establish a real fit, **reject the lead. Never invent.**

Always hand back a rejects file with a reason on every row.

### 5. Collapse to firms and check for collisions

Group by company. Then **check whether the same firm name covers different companies** by comparing domains within each name group.

This is the sneaky failure. On a recent list, "Tenet" was 31 contacts across two unrelated companies — a real estate capital firm and a public AI analytics company. Three leads would have received a sale-leaseback pitch meant for someone else. Same pattern hit three other names.

```bash
node scripts/pipeline.js collisions
```

Any name key spanning multiple domains needs splitting or rejecting. Do this **before** writing, so you don't write for a company that isn't there.

### 6. Write

Read `references/email-pattern.md`. That file is the actual craft; this one is the process.

Work in batches of 20-50 firms, largest firms first so contact coverage climbs fast. Write to a JSON file keyed by company name, not into chat — the file is the deliverable. Show the user 3-5 samples per batch and the running coverage count.

**Get the pattern approved on 5-8 samples before writing hundreds.** Expect two or three rounds of revision on tone. That is normal and much cheaper than rewriting 200.

### 7. Join, QA, output

Join emails back to leads on **company name + domain**, never name alone.

Automated checks before handoff:
- Word count in range (target 130-170)
- Zero em-dashes and en-dashes
- No more than one question mark per email
- Every lead accounted for: personalized + rejected = original unique count

### 8. Hand off to the sequencer

Output a CSV with the original columns plus `personalized_email`. Convert paragraph breaks to `<br><br>` if the sequencer body is HTML.

In the sequencer, step 1 body is just the merge variable plus a signature:

```
{{personalized_email}}<br><br>[First name]<br>[Title, Company]
```

Keeping the signature in the campaign rather than in 500 rows means it can be changed once.

Follow-ups are generic bumps. No new pitch, no restating the offer. See `references/email-pattern.md`.

**Tell the user to send one test before activating** — sequencers vary on whether they render HTML inside a merged custom variable.

---

## Tier B: Volume Path

Same pipeline, step 6 swapped.

1. Run steps 1-5 exactly as above. The hygiene work matters *more* at volume, not less.
2. Write **20-25 exemplars by hand** across the real spread of the list — big firms, small firms, thin descriptions, unusual sectors.
3. Get those approved.
4. Build a Lead Formatter prompt via `CCS-enrichment-prompts` with the exemplars embedded as few-shot examples and the positioning brief inline.
5. Run 50 rows. Read every one. Fix the prompt.
6. Run the rest.
7. Steps 7-8 as above, plus spot-check 30 random outputs.

The exemplars carry the quality. A prompt written without them produces generic copy that reads like a template, which defeats the point of the exercise.

---

## What Makes This Work

Ranked by how much they actually matter:

1. **Specificity that could not be swapped to another lead.** Their stated EBITDA band, their exact sectors, their structure. If the first line would work on a different company, it is not personalized.
2. **Their vocabulary, not the client's.** Mine the descriptions for the words the segment actually uses about itself. Frequency-count them. A segment that says "EBITDA," "platform," "control" and "founder-owned" 500 times and "off-market deal flow" twice should not receive copy built on "off-market deal flow."
3. **Outcome in their economics.** Not features. Money: a turn off the purchase price, margin kept at exit, being the only bidder.
4. **Introduce the product.** They have never heard of it. "We built a platform called X that…"
5. **Reject aggressively.** The rejects file is part of the deliverable.

---

## Anti-Patterns

- Writing per *person* instead of per *firm* — 3-4x the cost for no additional reply
- Trusting a line count as a row count
- Scraping every lead instead of every unique domain
- Joining on company name without the domain
- Writing copy from a description without checking it belongs to that company
- Inventing a detail because the source material was thin
- Bulking follow-ups with more pitch

---

## Related Skills

- `CCS-cold-email` — principles and structure for standard cold email
- `CCS-cold-traffic-offer` — run this first if the offer itself is unproven
- `CCS-enrichment-prompts` — required for Tier B
- `monid` — context.dev scraping when plain fetch fails
- `CCS-plusvibe-uploader` / `CCS-smartlead-uploader` / `CCS-emailbison-uploader` — sequencer handoff
