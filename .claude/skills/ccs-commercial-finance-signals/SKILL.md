---
name: ccs-commercial-finance-signals
description: Run an evidence-based public commercial-finance signal scan for potential borrower opportunities and funded-deal or lender activity. Use when the user says "check commercial finance signals," "run the commercial finance monitor," wants companies with timely potential financing use cases, or wants to see which lenders are funding which types of deals.
metadata:
  version: 1.0.0
---

# Commercial Finance Signal Monitor

## Objective

Produce a concise, source-grounded review of recent business events that may create a commercial financing use case. Also summarize recent funded-deal evidence when it helps the user understand active lenders and transaction types.

This is an on-demand public-research workflow. It does not require a paid data provider. A schedule or cloud monitor is optional and is not active merely because this skill exists.

## Required context

Read:

1. `agency-profile.md`;
2. the relevant client profile, when this is client work;
3. `knowledge/list-building/commercial-finance-signals.md`;
4. `knowledge/list-building/signal-led-list-building.md` when converting results into a list or campaign;
5. the public source bank only when source discovery is needed.

Use saved financing products, geography, deal-size range, industries, qualification rules, and exclusions. If the financing box is missing, ask one compact grouped question for those fields. Do not invent it.

## Permanent command

When the user says **Check commercial finance signals**:

1. Run a read-only public web scan using the saved financing box.
2. Start with events from the previous 24 hours. If fewer than five credible borrower candidates exist, expand to seven days and label the wider window.
3. Search the borrower signal categories in the playbook, prioritizing acquisitions, contract awards, permits and CRE activity, facility or equipment expansion, refinancing language, grants tied to projects, and working-capital events.
4. Search recent lender announcements and public financing records for funded-deal intelligence when reliable details are available.
5. Verify every candidate with the strongest available source. Preserve event date, publication date, URL, evidence, and canonical company domain.
6. Deduplicate by company and underlying event.
7. Score fit, signal strength, recency, and source confidence separately.
8. Return the report in chat. Do not enrich people, call a paid provider, upload a list, create a campaign, or send outreach.

If live web access is unavailable, say that a current scan cannot be completed. Offer to design the source plan or analyze supplied links; never fabricate current signals.

## Output

### 1. Scan summary

State:

- financing box used;
- geography and lookback;
- sources searched;
- number reviewed, accepted, watched, and dropped;
- important coverage gaps.

### 2. Borrower opportunity candidates

Return a readable table with:

- company;
- website/domain;
- signal and event date;
- concise evidence and source;
- likely financing relevance and product match;
- likely business decision-maker role;
- fit, signal, recency, source-confidence, and overall scores;
- route: `human review`, `watch`, or `drop`;
- unresolved question.

Present high-confidence candidates first. Keep weak examples out of the main queue; summarize why they were rejected so the user can improve the definition.

### 3. Funded-deal and lender activity

When found, return a separate table with lender, borrower or sponsor when public, date, amount or `UNKNOWN`, financing type, purpose, industry/property type, geography, source, and what the deal actually demonstrates about lender appetite.

### 4. Recommended next move

Recommend one of:

- review and refine the signal definition;
- approve a small company-level enrichment sample;
- save high-confidence companies to a private research queue;
- design a truthful signal-led campaign;
- continue watching because evidence is insufficient.

The recommendation is not authorization. Wait for separate approval before any paid, mutating, upload, or outreach action.

## Handoff to the campaign workflow

If the user wants to build a campaign from approved candidates:

1. Preserve source, event date, evidence, and company domain.
2. Use `CCS-ai-ark-list-builder` or the selected data provider for company/contact matching only after approval.
3. Run the offer check before writing copy.
4. Use the signal as a truthful relevance bridge, never as a claim that the company needs money.
5. Keep campaign upload and activation as separate approvals.

## Rules

- Commercial business finance only; do not collect consumer credit or personal financial data.
- A signal indicates possible timing, not need, distress, qualification, or consent.
- Never invent an event, date, amount, domain match, lender, financing product, or source.
- Do not claim pre-approval, guaranteed funding, or knowledge of private finances.
- Exclude distress-based signals by default unless the user has a legally reviewed applicable product.
- Apply the user's jurisdiction, licensing, client, advertising, privacy, and platform rules before outreach.
- Never run Monid, AI Ark, Lead Formatter, or another paid data process without explicit approval for that run.
