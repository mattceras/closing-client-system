---
name: CCS-smartlead-uploader
description: Build Node.js upload scripts for pushing cold email sequences into SmartLead campaigns via API. Use when the user's sequencer is SmartLead and they say "upload these to SmartLead," "push these into Smartlead," "load these into the campaign," or when scripts are finalized and ready to load into SmartLead without copy-pasting manually. Sibling skill to CCS-plusvibe-uploader and CCS-emailbison-uploader — check agency-profile.md (or the client's credentials.env override) for which sequencer is actually in use before assuming this one.
metadata:
  version: 1.0.0
---

# SmartLead Campaign Uploader

Build Node.js scripts that upload cold email sequences into SmartLead campaigns via API. Run locally with `node upload_campaign.mjs` from the CCS repository root. Generated scripts must load credentials from private ignored files at runtime; never hardcode a resolved key.

Verified against SmartLead's published API documentation (helpcenter.smartlead.ai and api.smartlead.ai) as of this skill's writing — endpoints can change over time, trust an actual error response from the API over what's written here if they ever conflict.

---

## Credential Resolution (check this before asking the user for anything)

1. If working in a client folder, check `clients/<name>/credentials.env` for `SMARTLEAD_API_KEY`.
2. Fall back to `config/.env`.
3. Only ask if neither has it — SmartLead's key is found at Settings → "Activate API" inside their account. Tell the user where it got saved once provided.

## What to Collect Before Building

Ask for whatever isn't already resolved, in one message:

1. **API Key** — from credential resolution above, or ask.
2. **Campaign ID** — existing campaign to add sequences to. Omit if creating a new one.
3. **Campaign name** — only needed if creating new.
4. **`client_id`** — only relevant for agency-tier accounts assigning a campaign to a specific client inside SmartLead. Most users don't need this — skip unless they mention managing multiple clients inside one SmartLead account.
5. **Which scripts** — confirm which finalized scripts from the conversation to upload.
6. **Step number** (`seq_number`) — 1-indexed position in the sequence. Default: 1.
7. **Wait time** (`delay_in_days`) — days before this step sends (step 2+ only). Default: 1.
8. **Variant distribution** — SmartLead splits send volume across variants. Default `MANUALLY_EQUAL` (even split) unless told otherwise.

---

## API Reference

**Base URL:** `https://server.smartlead.ai/api/v1`
**Auth:** append `?api_key=YOUR_API_KEY` to the end of every request URL — this is a **query parameter**, not a header. Easy to get wrong if used to PlusVibe/EmailBison's header-based auth — double check this when writing the script.
**Rate limit:** 60 requests per 60 seconds per API key. A `429` means back off — add a short delay between calls if uploading multiple sequence steps or campaigns in one run.

### Create Campaign

```
POST /campaigns/create?api_key=YOUR_API_KEY

{
  "name": "Campaign Name",
  "client_id": null
}

Response includes the new campaign's id.
```

### Add / Update Sequence Steps

```
POST /campaigns/{campaign_id}/sequences?api_key=YOUR_API_KEY

[
  {
    "seq_number": 1,
    "seq_delay_details": { "delay_in_days": 0 },
    "variant_distribution_type": "MANUALLY_EQUAL",
    "variants": [
      {
        "subject": "subject line",
        "email_body": "<p>HTML body</p>",
        "variant_label": "A"
      }
    ]
  }
]
```

**Cannot modify sequences on an ACTIVE campaign** — only matters if editing an existing live campaign; a newly-created campaign is inactive by default, so this is rarely an issue for a first upload. If updating a live campaign, tell the user to pause it in the SmartLead UI first.

Follow-up steps that should thread as a reply to the previous email: **leave `subject` empty**. A non-empty subject sends as a new email instead of a thread reply — same convention as PlusVibe.

### Optional: adding leads via API

Out of scope for this skill by default (matches how PlusVibe upload works — leads get added separately), but documented here in case the user wants it: `POST /campaigns/{campaign_id}/leads?api_key=YOUR_API_KEY` accepts up to 400 leads per request in a `lead_list` array (`email`, `first_name`, `last_name`, `company_name`, `custom_fields`, etc.), with a `settings` object controlling block-list/duplicate behavior. Only build this if the user explicitly asks to also push the lead list via API — the primary job of this skill is the copy/sequence upload.

---

## Script Template

```javascript
// [CLIENT NAME] - [CAMPAIGN NAME] - SmartLead Uploader
// Usage: node upload_campaign.mjs

import { loadCredentials } from "./scripts/lib/plusvibe.mjs";

const CLIENT_FOLDER = ""; // Set only when a client-specific credentials.env is used.
const credentials = await loadCredentials(CLIENT_FOLDER);
const API_KEY = credentials.SMARTLEAD_API_KEY;
if (!API_KEY) throw new Error("SmartLead is not connected. Save SMARTLEAD_API_KEY in config/.env.");
const CAMPAIGN_ID = "actual-campaign-id-here"; // omit if creating new

const BASE_URL = "https://server.smartlead.ai/api/v1";

const variations = [
  {
    variation: "A",
    subject: "spintaxed subject line",
    body: `<p>Full HTML email body with spintax</p>`,
  },
  // ... one object per script variation
];

async function main() {
  // If new campaign, create first:
  // const createRes = await fetch(`${BASE_URL}/campaigns/create?api_key=${API_KEY}`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name: "Campaign Name" }),
  // });
  // const createData = await createRes.json();
  // const campaignId = createData.id;

  const sequenceRes = await fetch(
    `${BASE_URL}/campaigns/${CAMPAIGN_ID}/sequences?api_key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          seq_number: 1,
          seq_delay_details: { delay_in_days: 0 },
          variant_distribution_type: "MANUALLY_EQUAL",
          variants: variations.map((v) => ({
            subject: v.subject,
            email_body: v.body,
            variant_label: v.variation,
          })),
        },
      ]),
    }
  );

  const sequenceData = await sequenceRes.json();

  if (sequenceRes.ok) {
    console.log("Done! Sequence uploaded successfully.");
  } else {
    console.error("Failed:", JSON.stringify(sequenceData, null, 2));
  }
}

main().catch(console.error);
```

## Converting Scripts to Variations

Same conventions as `CCS-plusvibe-uploader`:
1. Each finalized script becomes one variant object (`variant_label`: A, B, C...).
2. Convert plain-text email body to HTML the same way (line breaks → `<br>`/`<p>`, spintax stays intact).
3. Follow-up steps that should thread as a reply: leave `subject` empty.
4. Multiple steps = multiple objects in the array passed to the `/sequences` endpoint, each with its own `seq_number` and `seq_delay_details`.

---

## Rules

- NEVER activate/launch the campaign — that's the user's manual step in the SmartLead UI.
- Auth is a query parameter (`?api_key=...`), not a header — don't mix this up with the other uploader skills.
- Always respect the 60 requests/60 seconds rate limit — add a short delay between calls if uploading several steps or campaigns back to back.
- Remind the user to rotate their API key after sharing it in chat.
- The user needs Node.js installed to run the script.
- Leave `subject` empty on any step meant to thread as a reply to the previous email.
