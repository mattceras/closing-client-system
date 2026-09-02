---
name: CCS-intent-signals
description: Find, verify, score, and deduplicate timely public intent signals for a student's offer or client. Use when the user says "check intent signals," wants event-driven prospecting ideas, or asks for companies showing a timely reason to buy.
---

# Intent Signal Monitor

This is an on-demand public-research workflow. A schedule or paid monitoring service is optional.

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
