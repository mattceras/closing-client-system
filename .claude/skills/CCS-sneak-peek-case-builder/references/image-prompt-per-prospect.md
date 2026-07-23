# Image-Gen Prompt Template — Per-Prospect Magnet

Use this when the chosen magnet is tagged **Per-prospect** — one image per lead, because the mock-up needs the specific prospect's logo, brand colours, or context to land.

This is the BPD → B&M shape. The finished image is what the operator sends to the prospect after they reply YES to email 1.

## Scale approach

Because per-prospect magnets need one image per lead, there are two operating modes:

**Mode 1 — On-reply (recommended for small volume):**
Only generate the image AFTER a prospect replies YES to email 1. The inbox manager or operator opens ChatGPT, pastes the prompt with the prospect's logo, and produces the image in about 2 minutes. Send back with email 2.

**Mode 2 — At scale (for high-volume outbound):**
Use context.dev to pull every prospect's logo from their URL. Then run the ChatGPT prompt across the list with the logo swap. Coming soon in Lead Formatter: this runs for thousands of leads at once.

Whichever mode the operator uses, the base prompt is the same. Only the {PROSPECT_LOGO} and {PROSPECT_COMPANY} placeholders change per lead.

## What the image MUST feel like

**Not a Canva mock-up.** Not a logo pasted on a stock photo. It must feel like a real commercial deliverable the operator's team already started building. That is the whole psychological lever.

**Good version:** "here is what your next campaign could look like, produced and rolled out end-to-end."

**Bad version:** random stock image with the target's logo dropped on top.

## Template structure

Every prompt has six blocks. Fill each one.

### Block 1 — Overall format
Landscape orientation, roughly 1600x1000 or 1600x1050. Photorealistic 3D render. Clean, commercially-produced look. White or subtle-gradient background. Not moody. Not artistic. Corporate deliverable feel.

### Block 2 — Header
Top-left: target company LOGO (recreate faithfully — colours, wordmark, sunburst / icon if present).

Top: campaign title in target's own brand typography if identifiable, else clean bold sans. Example:

```
[TARGET] SPRING GARDEN EVENT
IN-STORE CAMPAIGN PREVIEW
```

Below the title, one-line description (2 sentences max) of what the campaign is designed to do. Reference the target's real scale (e.g. "777+ UK stores", "1,000+ shops", "national convenience estate").

### Block 3 — Objectives + theme (left column)
Two small labelled panels stacked vertically:

1. **Campaign objectives** — 4-5 tick-bulleted lines. Each line is one commercial outcome (drive footfall, boost basket size, unified in-store look, quick-install, easy-to-update).
2. **Campaign theme** — a small hero panel showing the campaign's primary artwork/tagline (e.g. "SPRING GARDEN EVENT — Great value for your garden") with brand colours and seasonal imagery.

### Block 4 — Mock-up grid (right side, dominant)
A grid of labelled photorealistic 3D mock-ups. Each frame has a small dark-blue label ribbon in the top-left showing what the format IS.

For a multi-site retailer, use these 7 frames:

- STORE ENTRANCE (front-door / window signage in situ)
- AISLE FIN (end-of-aisle vertical sign)
- SHELF BARKER (product-adjacent shelf strip)
- DUMP BIN (branded dump bin loaded with product)
- FSDU / DISPLAY UNIT (free-standing display in-aisle)
- WINDOW POSTER (external window)
- CHECKOUT PROMO (small standee at till)

For other categories, swap the frames but keep the pattern (7 labelled contextual mock-ups showing the deliverable IN a real environment).

Every frame shows the CAMPAIGN ARTWORK actually deployed in a photorealistic store or context, not just the artwork on a white background.

### Block 5 — End-to-end workflow strip (bottom, full width)
A horizontal chain of 6 icons + labels showing the client's OWN capability chain. Icons are line-drawn, minimal, connected by arrows.

For BPD (retail POS execution), the chain is:

1. CONCEPT & DESIGN (creative, CAD, 3D visualisation)
2. PROTOTYPE (white sample + technical approval)
3. PRINT & PRODUCE (high-quality print + finishing)
4. PACK & FULFIL (kitting + quality check)
5. DELIVER (to store or DC)
6. INSTALL (professional multi-site installation)

For a merch client the chain would be: DESIGN → SAMPLE → PRODUCE → BRAND & PACK → SHIP → REORDER.

For a lead-gen client: TAM RESEARCH → LIST BUILD → COPY → SEND → REPLY MGMT → BOOKED CALL.

The strip is what makes the image feel like an EXECUTION story, not just a visual pitch.

### Block 6 — Bottom footer bar
Full-width dark navy or brand-primary strip along the very bottom.

Left three ticks (each one line): "ONE PARTNER. EVERY ELEMENT.", "COST CONTROL & EFFICIENCY", "CONSISTENT BRAND EXPERIENCE".

Right side: a single call-to-action panel: "FULL CAMPAIGN PREVIEW & ROLLOUT PLAN — Available to walk you through on a call."

Optional: a small right-side "BUILT FOR SCALE" callout with a UK-map graphic and 3-4 stat lines (e.g. "777+ UK stores", "Multi-site rollout expertise", "Fast turnaround", "Consistent quality").

## Voice inside the image

Same rules as the emails:
- No em-dashes
- No exclamation marks
- en-GB spelling
- Direct verbs, short lines

## Final prompt shape (paste into ChatGPT)

```
Create a landscape photorealistic 3D render for a commercial [CATEGORY] preview board. Roughly 1600x1000. Corporate deliverable feel, not artistic.

TOP-LEFT: {PROSPECT_LOGO} — recreate faithfully. If unknown, use placeholder "COMPANY LOGO" and note colour palette.
TOP-CENTRE: Bold header "{PROSPECT_COMPANY} [CAMPAIGN NAME]" with subtitle "[MAGNET NAME]" in accent colour.
UNDER HEADER: One-sentence description referencing {PROSPECT_COMPANY}'s scale (store count / revenue / employee count).

LEFT COLUMN: Two small panels stacked.
  1. "CAMPAIGN OBJECTIVES" — 4-5 tick-bulleted outcomes.
  2. "CAMPAIGN THEME" — hero panel with primary artwork/tagline.

RIGHT SIDE (dominant): 7 labelled photorealistic mock-up frames arranged in a grid:
  [list the 7 frames — see Block 4]
Each frame shows the CAMPAIGN ARTWORK deployed in-context.

BOTTOM STRIP (full width): Horizontal chain of 6 icons with labels showing the CLIENT'S execution chain: [list the 6 workflow steps for THIS client's category].

BOTTOM FOOTER: Dark navy full-width strip. Left: three tick-bullet value lines. Right: CTA panel — "FULL [DELIVERABLE NAME] AVAILABLE ON A CALL."

Brand palette: {PROSPECT_COLOURS} (extract from logo)
Style: clean, commercially-produced, high-fidelity.
No text errors. No cropped logos. No em-dashes. en-GB spelling.
```

**Placeholders to fill per lead:**
- `{PROSPECT_LOGO}` — pulled via context.dev or manually
- `{PROSPECT_COMPANY}` — from the lead list
- `{PROSPECT_COLOURS}` — from the logo

Everything else stays constant across all prospects.
