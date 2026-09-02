---
name: CCS-campaign-monitor
description: Check active PlusVibe campaigns for remaining untouched leads and flag campaigns that may soon run out. Use when the user says "run the campaign monitor," asks which campaigns need more leads, or wants a read-only campaign runway report.
---

# Campaign Monitor

Use this on demand. Scheduling it is optional.

## Default command

When the user says **Run the campaign monitor**:

1. Read `agency-profile.md` and resolve credentials in the normal CCS order.
2. Confirm the sequencer is PlusVibe.
3. Run `node scripts/run-campaign-monitor.mjs`. Add `--client <client-folder-name>` when a specific client is in scope.
4. Show the table in chat and put `CRITICAL` campaigns first in the written summary, followed by `LOW` campaigns.
5. Recommend the next human decision: add leads, prepare a replacement list, allow the campaign to finish, or investigate an unexpected count.

The default report checks active campaigns only. If the user asks for paused or completed campaigns too, add `--all`.

## Default thresholds

- `LOW`: 500 untouched leads or fewer.
- `CRITICAL`: 100 untouched leads or fewer.
- Students may override these in their private `config/.env` with `CAMPAIGN_LOW_LEAD_THRESHOLD` and `CAMPAIGN_CRITICAL_LEAD_THRESHOLD`.

## Rules

- Read-only: never activate, pause, delete, archive, or alter a campaign.
- Never start paid list building or enrichment automatically.
- Do not claim a precise number of sending days remaining unless a verified daily sending rate is available.
- Never print or commit credentials.
- The report currently supports PlusVibe. For another sequencer, explain the limitation and perform a manual dashboard review if the user provides access.
