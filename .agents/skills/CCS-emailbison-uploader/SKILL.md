---
name: CCS-emailbison-uploader
description: Build Node.js upload scripts for pushing cold email sequences into Email Bison campaigns via API. Use when the user's sequencer is Email Bison and they say "upload these to Email Bison," "push these into Bison," "load these into the campaign," or when scripts are finalized and ready to load into Email Bison without copy-pasting manually. Sibling skill to CCS-plusvibe-uploader and CCS-smartlead-uploader — check agency-profile.md (or the client's credentials.env override) for which sequencer is actually in use before assuming this one.
metadata:
  version: 1.0.0
---

# Email Bison Campaign Uploader

Build Node.js scripts that upload cold email sequences into Email Bison campaigns via API. Run locally with `node upload_campaign.mjs` from the CCS repository root. Generated scripts must load credentials from private ignored files at runtime; never hardcode a resolved token.

Verified against Email Bison's published docs (docs.emailbison.com) as of this skill's writing — endpoints can change over time, trust an actual error response from the API over what's written here if they ever conflict.

---

## Credential Resolution (check this before asking the user for anything)

1. If working in a client folder, check `clients/<name>/credentials.env` for `EMAILBISON_API_KEY`.
2. Fall back to `config/.env`.
3. Only ask if neither has it — the token is created at Settings → Developer API → New API Token, inside Email Bison. Use an `api-user` token (workspace-specific) rather than a `super-admin` token unless the user specifically needs cross-workspace access. Tell the user where it got saved once provided.

## What to Collect Before Building

Ask for whatever isn't already resolved, in one message:

1. **API Token** — from credential resolution above, or ask.
2. **Campaign ID** — existing campaign to add sequence steps to. Omit if creating a new one.
3. **Campaign name** — only needed if creating new.
4. **Which scripts** — confirm which finalized scripts from the conversation to upload.
5. **Step order and wait days** — position in the sequence and days before it sends. Default: step 1, no wait; step 2+, 1 day.
6. **Variant handling** — if testing multiple versions of the same step, Email Bison marks extra versions with `variant: true` and points them at the original step via `variant_from_step`, rather than PlusVibe/SmartLead's labeled-variant-array approach. Confirm which step number a variant belongs to.

---

## API Reference

**Base URL:** `https://dedi.emailbison.com/api/`
**Auth:** `Authorization: Bearer YOUR_API_TOKEN` header on every request.
**Rate limit:** not published as a fixed number as of this writing — be conservative, add a short delay between calls, and back off on any `429`.

### Create Campaign

```
POST /api/campaigns
Header: Authorization: Bearer YOUR_API_TOKEN

{ "name": "Campaign Name" }

Returns 200 OK with the new campaign's id.
```

### Add Sequence Steps

```
POST /api/campaigns/{campaign_id}/sequence-steps
Header: Authorization: Bearer YOUR_API_TOKEN

{
  "title": "Sequence Name",
  "sequence_steps": [
    {
      "email_subject": "subject line",
      "email_body": "HTML or plain body with {VARIABLE} placeholders",
      "order": 1,
      "wait_in_days": 0,
      "thread_reply": false
    }
  ]
}
```

Field notes:
- `thread_reply` (boolean, required) — set `true` for a follow-up step that should land as a reply in the same thread as the previous email (Email Bison's equivalent of PlusVibe/SmartLead's "leave the subject blank" convention — here it's an explicit flag instead, so still set `email_subject` but flag it as a thread reply).
- `variant` (boolean, optional) + `variant_from_step` (integer, required if `variant` is true) — use these to add an A/B variant of an existing step rather than a new step in the sequence.
- Variable placeholders use `{VARIABLE}` (curly braces, no double-bracing) — different syntax from Lead Formatter's `{{ Variable }}` used elsewhere in this system. Don't carry over the double-brace syntax when writing copy destined for Email Bison.

### Launching (never do this automatically)

```
PATCH /api/campaigns/{campaign_id}/resume
```

This is the activation endpoint. Same rule as every other uploader in this system: never call it. Tell the user it exists and that they start the campaign themselves in the Email Bison UI (or explicitly ask if they want the script to call it, and only then include it, clearly labeled).

### Optional: adding leads via API

Out of scope for this skill by default (matches how PlusVibe upload works), but documented here in case the user wants it: `POST /api/leads/bulk/csv` bulk-imports a lead list from a CSV with column mapping (`columnsToMap[first_name]`, etc., 50,000-lead limit per file), which returns a lead list to attach with `POST /api/campaigns/{campaign_id}/leads/attach-lead-list`. Only build this if the user explicitly asks to also push the lead list via API — the primary job of this skill is the copy/sequence upload.

---

## Script Template

```javascript
// [CLIENT NAME] - [CAMPAIGN NAME] - Email Bison Uploader
// Usage: node upload_campaign.mjs

import { loadCredentials } from "./scripts/lib/plusvibe.mjs";

const CLIENT_FOLDER = ""; // Set only when a client-specific credentials.env is used.
const credentials = await loadCredentials(CLIENT_FOLDER);
const API_TOKEN = credentials.EMAILBISON_API_KEY;
if (!API_TOKEN) throw new Error("Email Bison is not connected. Save EMAILBISON_API_KEY in config/.env.");
const CAMPAIGN_ID = "actual-campaign-id-here"; // omit if creating new

const BASE_URL = "https://dedi.emailbison.com/api";

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
};

const steps = [
  {
    email_subject: "subject line",
    email_body: "HTML or plain body with {FIRST_NAME} placeholders",
    order: 1,
    wait_in_days: 0,
    thread_reply: false,
  },
  // ... one object per sequence step
];

async function main() {
  // If new campaign, create first:
  // const createRes = await fetch(`${BASE_URL}/campaigns`, {
  //   method: "POST",
  //   headers,
  //   body: JSON.stringify({ name: "Campaign Name" }),
  // });
  // const createData = await createRes.json();
  // const campaignId = createData.id;

  const stepsRes = await fetch(
    `${BASE_URL}/campaigns/${CAMPAIGN_ID}/sequence-steps`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: "Sequence",
        sequence_steps: steps,
      }),
    }
  );

  const stepsData = await stepsRes.json();

  if (stepsRes.ok) {
    console.log("Done! Sequence steps uploaded successfully.");
  } else {
    console.error("Failed:", JSON.stringify(stepsData, null, 2));
  }
}

main().catch(console.error);
```

## Converting Scripts to Variations

Same conventions as `CCS-plusvibe-uploader`, with two Email Bison-specific differences:
1. Variable syntax is `{VARIABLE}` single braces, not `{{ Variable }}` — rewrite any copy pulled from Lead Formatter-style prompts before pasting it in.
2. A/B variants of the same step use `variant: true` + `variant_from_step` pointing at the original step's order number, rather than a labeled-variant array.
3. Thread-reply follow-ups set `thread_reply: true` explicitly rather than leaving the subject blank.

---

## Rules

- NEVER call the `/resume` (launch) endpoint unless the user explicitly asks for it — the default is always to leave the campaign for the user to start manually in the UI.
- Auth is a `Bearer` token in the `Authorization` header — don't mix this up with SmartLead's query-parameter auth.
- Rewrite `{{ Variable }}` syntax to `{VARIABLE}` before uploading — Email Bison doesn't use double braces.
- Remind the user to rotate their API token after sharing it in chat.
- The user needs Node.js installed to run the script.
