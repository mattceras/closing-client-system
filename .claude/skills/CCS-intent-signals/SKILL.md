---
name: CCS-intent-signals
description: Find, verify, score, and deduplicate timely public intent signals for a student's offer or client. Use when the user says "check intent signals," wants event-driven prospecting ideas, or asks for companies showing a timely reason to buy.
---

# Intent Signal Monitor

This is an on-demand public-research workflow. A schedule or paid monitoring service is optional.

## Included source knowledge

Before designing a signal or choosing a public source, read:

- `knowledge/list-building/signal-led-list-building.md` for the source-to-relevance methodology, build motions, discovery operators, scoring model, and extraction rules.
- `knowledge/list-building/public-source-directory-bank.json` for the maintained bank of company registries, permits, awards, procurement systems, licences, associations, exhibitor lists, regulated datasets, and other public sources. Use the adjacent CSV when a spreadsheet-shaped export is more convenient.

Use neutral CCS terminology such as **signal-led list building**, **public source bank**, or **directory-led sourcing**.

## Designing a new intent signal

When the user wants ideas rather than a scan, build the signal backward from the offer:

1. **Offer problem:** What expensive or urgent problem does the offer solve?
2. **Observable event:** What public action, filing, listing, award, hire, permit, expansion, or change would make that problem more likely now?
3. **Source:** Which public directory or recurring source records that event reliably?
4. **Implication:** What does appearing in that source actually prove, and what does it merely suggest?
5. **Timing:** How recent must the event be for outreach to feel relevant?
6. **Data shape:** Which company, date, geography, category, amount, and source fields must be preserved?
7. **Buyer:** Which role can act on the implied problem?
8. **Message bridge:** How can the signal become a truthful reason for the email without overstating what it proves?
9. **Pilot:** Pull a small sample, score it, inspect false positives, and validate the angle before scaling.

Return three to five signal concepts in a table with: signal concept, observable event, likely sources, implication, best buyer, freshness window, required fields, message angle, expected false positives, and test plan. Score the source using the included 100-point model before recommending a scrape.

## Default command

When the user says **Check intent signals**:

1. Read `agency-profile.md` and the matching client profile.
2. Confirm the target market, geography, offer, signal types, and lookback window. Infer only what is clearly saved; otherwise ask one compact question.
3. Search public directories, filings, company announcements, and reputable news sources.
4. Ground every candidate with a source URL, event date, discovery date, and concise evidence.
5. Score fit, signal strength, recency, and source confidence separately.
6. Deduplicate by company and underlying event.
7. Return a reviewed list. Do not enrich contacts, upload leads, or launch outreach unless separately authorized.

## Scoring

- ICP fit: 0-35
- Signal strength: 0-30
- Recency: 0-20
- Source confidence: 0-15

## Output

For each candidate include company, website, signal, event date, evidence/source, component scores, overall score, duplicate status, recommended route, and unresolved questions. Routes are `drop`, `watch`, `enrich`, or `human review`.

## Rules

- A signal is a timely reason to investigate, not permission to contact someone.
- Never invent a company fact, source, event date, or score input.
- Keep first runs read-only and human-reviewed.
- Never start a paid data-provider run without the user's explicit approval for that run.
- Apply the client's privacy, platform, and industry rules before any outreach step.
