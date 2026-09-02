---
name: CCS-plusvibe-uploader
description: Build Node.js upload scripts for pushing cold email sequences into PlusVibe campaigns via API. Use when the user says "upload these to PlusVibe," "push these into the sequencer," "load these into the campaign," "build me the upload script," or when scripts are finalized and ready to load into PlusVibe without copy-pasting manually. Sibling skill to CCS-smartlead-uploader and CCS-emailbison-uploader — check agency-profile.md (or the client's credentials.env override) for which sequencer is actually in use before assuming this one.
metadata:
  version: 1.0.0
---

# PlusVibe Campaign Uploader

Build Node.js scripts that upload cold email sequences into PlusVibe campaigns via API. Run locally with `node upload_campaign.js` in PowerShell.

---

## Credential Resolution (check this before asking the user for anything)

This system supports one PlusVibe login with multiple client workspaces, or entirely separate PlusVibe accounts per client. Before asking the user for a key, resolve it in this order:

1. If working in a client folder (`clients/<name>/`), check `clients/<name>/credentials.env` for `PLUSVIBE_API_KEY` / `PLUSVIBE_WORKSPACE_ID`.
2. Fall back to `config/.env` for the account-level defaults.
3. Only ask the user if neither has it — then tell them where it got saved (client override vs. account default) so it's there next time.

Use whatever's resolved directly in the generated script (see Script Template) instead of leaving placeholder text for the user to hand-edit.

## What to Collect Before Building

Ask for whatever isn't already resolved from config, in a single message — do not ask one at a time:

1. **API Key** and **Workspace ID** — only ask if not found via credential resolution above. Found at `app.plusvibe.ai/v2/settings/api-access` (requires Business Plan); workspace ID is the 24-character string in the PlusVibe URL when inside the workspace (e.g., `697e3d7609cad610a892cd64`).
2. **Campaign ID** — 24-character string found in the URL when inside the campaign. Omit if creating a new campaign.
3. **New or existing campaign?** — New = create first, then patch. Existing = patch directly.
4. **Campaign name** — Only needed if creating a new campaign.
5. **Which scripts?** — Confirm which scripts from the conversation to upload.
6. **Step number** — Which step are these going into? Default: step 1.
7. **Wait time** — Days before this step sends (step 2+ only). Default: 1.
8. **Variation selection** — Round robin (`R_ROBIN`) or random? Default: `R_ROBIN`.

---

## API Reference

**Base URL:** `https://api.plusvibe.ai/api/v1`
**Auth header:** `x-api-key`
**Rate limit:** 5 requests/second

### Create New Campaign

```
POST /campaign/add/campaign

{
  "workspace_id": "WORKSPACE_ID",
  "camp_name": "Campaign Name"
}

Response: { "status": "success", "id": "NEW_CAMPAIGN_ID" }
```

### Add Scripts to Campaign

```
PATCH /campaign/update/campaign

{
  "workspace_id": "WORKSPACE_ID",
  "campaign_id": "CAMPAIGN_ID",
  "sequences": [
    {
      "step": 1,
      "wait_time": 1,
      "variations": [
        {
          "variation": "A",
          "subject": "subject line with spintax",
          "name": "",
          "body": "<div>HTML body with spintax</div>"
        }
      ]
    }
  ],
  "first_wait_time": 60,
  "var_sel_type": "R_ROBIN"
}
```

**`first_wait_time` is required** — always include it, default 60. Omitting it throws a validation error.

---

## Script Template

Generate a Node.js script the user runs with `node upload_campaign.js` in PowerShell. Fill `API_KEY` / `WORKSPACE_ID` in with the values resolved from `clients/<name>/credentials.env` or `config/.env` (see Credential Resolution above) — don't leave placeholder text for the user to hand-edit if the value is already known.

```javascript
// [CLIENT NAME] - [CAMPAIGN NAME] - PlusVibe Uploader
// Usage: node upload_campaign.js

const API_KEY = "actual-key-here";
const WORKSPACE_ID = "actual-workspace-id-here";
const CAMPAIGN_ID = "actual-campaign-id-here"; // omit if creating new

const BASE_URL = "https://api.plusvibe.ai/api/v1";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
};

const variations = [
  {
    variation: "A",
    subject: "spintaxed subject line",
    body: `<div>Full HTML email body with spintax</div>`,
  },
  // ... one object per script variation
];

async function main() {
  // If new campaign, create first:
  // const createRes = await fetch(`${BASE_URL}/campaign/add/campaign`, {
  //   method: "POST",
  //   headers,
  //   body: JSON.stringify({ workspace_id: WORKSPACE_ID, camp_name: "Campaign Name" }),
  // });
  // const createData = await createRes.json();
  // const campaignId = createData.id;

  const updateRes = await fetch(`${BASE_URL}/campaign/update/campaign`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      workspace_id: WORKSPACE_ID,
      campaign_id: CAMPAIGN_ID,
      sequences: [
        {
          step: 1,
          wait_time: 1,
          variations: variations.map((v) => ({
            variation: v.variation,
            subject: v.subject,
            name: "",
            body: v.body,
          })),
        },
      ],
      first_wait_time: 60,
      var_sel_type: "R_ROBIN",
    }),
  });

  const updateData = await updateRes.json();

  // The PATCH returns {"status":"success"} with no id. Checking only for an id
  // reports a false failure on a patch that actually landed.
  if (updateData.status === "success" || updateData.id) {
    console.log("Done! Variations uploaded successfully.");
  } else {
    console.error("Failed:", JSON.stringify(updateData, null, 2));
  }
}

main().catch(console.error);
```

---

## Converting Scripts to Variations

1. Each script becomes one variation object (A, B, C, D... up to Z, then "1", "2", "3"...)
2. Subject line goes in `subject` with spintax intact
3. Convert email body to HTML:
   - Opening line `{{first_name}},` → `{{first_name}},<br><br>`
   - Paragraph breaks → `<br><br>`
   - Single line breaks → `<br>`
   - Spintax stays as-is (`{{random|...|...}}` and `{{first_name}}` go in unchanged)
   - Sign-off: `{{random|Thanks|Best|All the best}},<br>{{sender_signature}}`
   - **Custom columns take a `custom_` prefix.** PlusVibe prepends `custom_` to whatever the CSV column is named, so a column called `opener` is referenced as `{{custom_opener}}`. Tell the user to name the CSV column *without* the prefix — a column named `custom_opener` resolves to `{{custom_custom_opener}}` and renders blank. Standard fields (`first_name`, `email`, `company`) are not prefixed.
4. Wrap entire body in `<div>...</div>`
5. Do NOT include script labels (e.g. "SCRIPT 1 — Direct Question Opener") — those are internal reference only

### Variation Labels

- Standard (up to 26): A, B, C ... Z
- Extended (beyond 26): "1", "2", "3" or compound labels like "A1", "A2" — each label just needs to be unique

### Multiple Steps

Include multiple objects in the sequences array when uploading email 1 and follow-ups together:

```javascript
"sequences": [
  { "step": 1, "wait_time": 1, "variations": [...] },
  { "step": 2, "wait_time": 3, "variations": [...] }
]
```

Follow-up thread replies use an empty subject (`"subject": ""`) so PlusVibe sends them as replies in the original thread.

---

## Expanded Variations (No Spintax)

**Only do this when explicitly asked.** Trigger phrases: "expand these into unique variants," "do the expanded version," "write out all the combinations," "no spintax, do individual variants," "do the full variant expansion."

### What It Is

Instead of spintax resolving variation at send time, write every possible combination as its own standalone email. Zero spintax in the output — each variation is complete, unique copy. Tests better for reply rates because every email is genuinely different.

### How to Generate

1. Start with the approved spintax scripts
2. Map every spintax bracket — each bracket with N options is a variation point
3. Compute all combinations: e.g. 5 brackets × 3 options each = 243 combinations
4. Write each combination as a standalone complete email (no spintax tags)
5. Layer micro-variations on top:
   - Swap hyphen for comma or semicolon
   - Add/remove a period
   - Different line break structure
   - "20 to 30 minutes" vs "20-30 minutes" vs "twenty to thirty minutes"
   - Minor word swaps ("your team" / "your group" / "your crew")
6. Subject lines also get expanded — unique subject per variation, no spintax

### Generating at Scale (100+ variations)

Write the combinations programmatically inside the upload script itself:

1. Define the base email as a template with numbered placeholder slots
2. Define option arrays for each slot
3. Loop through all combinations to build variation objects
4. Layer punctuation/formatting tweaks programmatically
5. Assign unique labels and unique subject lines per variation

The AI assistant writes the script that generates the combinations — not 500 emails by hand in chat.

### What to Confirm Before Expanding

1. Which scripts to expand
2. How many total variations needed
3. Any scripts to skip (some may be fine with standard spintax)

---

## Rules

- NEVER activate the campaign — the user does that manually in PlusVibe
- NEVER set `"status": "ACTIVE"` or call an activate endpoint
- Always include `first_wait_time: 60` in the PATCH payload
- Always set `name: ""` on each variation object
- Remind the user to rotate their API key after sharing it in chat — it's visible in the conversation
- The user needs Node.js installed to run the script (`nodejs.org`)
- Run in PowerShell: `cd Downloads` then `node upload_campaign.js`
- If PlusVibe has a variation limit per step and it's exceeded, split across multiple campaigns
