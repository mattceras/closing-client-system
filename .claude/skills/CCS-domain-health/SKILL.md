---
name: CCS-domain-health
description: Run a read-only health check across PlusVibe sending domains, including URIBL/SURBL blacklist checks and 7, 14, and 30-day reply-rate trends. Use when the user says "run the domain health check," asks about sending-domain health, blacklist status, or declining domain performance.
---

# Domain Health Check

Use this on demand. It does not require Railway or a schedule when the local CCS folder is open.

## Default command

When the user says **Run the domain health check**:

1. Read `agency-profile.md` and resolve credentials in the normal CCS order.
2. Confirm the sequencer is PlusVibe. If it is not, explain that the packaged performance collector currently supports PlusVibe and offer a blacklist-only review from a supplied domain list.
3. Run `node scripts/run-domain-health.mjs`. If a specific client is in scope, run `node scripts/run-domain-health.mjs --client <client-folder-name>`.
4. Present the resulting table directly in chat. Do not make the user open a database or raw JSON.
5. Summarize only the domains marked `LISTED`, `UNKNOWN`, `declining`, or `watch`.

## What the report means

- **Reply** is the human reply rate, excluding out-of-office responses.
- **Total** is the reply rate including out-of-office responses.
- The comparison uses the last 7, 14, and 30 complete days.
- A reliable 7-day trend requires at least 500 sent emails. Below that is `low volume`, not a failure.
- `UNKNOWN` blacklist status means the DNS blacklist source could not be validated. Never present it as clear.

## Rules

- Read-only: never pause, remove, reconnect, or edit a sender automatically.
- Do not inspect SPF, DKIM, or DMARC unless the user separately asks.
- Do not print or commit API keys.
- Treat a blacklist result and a reply-rate decline as evidence for review, not automatic proof that a domain is ruined.
- Ask before making any external change based on the report.
