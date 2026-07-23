# Image-Gen Prompt Template — Generic Magnet

Use this when the chosen magnet is tagged **Generic** — one image reused across all prospects.

The image shows the CLIENT's product, dashboard, deliverable, or workflow. It does NOT reference any specific prospect's logo or brand.

## Structure — 5 blocks

### Block 1 — Overall format
Landscape roughly 1600x1000. Photorealistic UI mock-up or corporate-deliverable render, depending on category. Clean. Corporate. Not moody. Not artistic. White or subtle-gradient background.

### Block 2 — Header
Top-left: CLIENT's logo, faithful recreation.

Top-centre: bold header naming the deliverable. Example: `"7-DAY PIPELINE PREVIEW"` or `"90-DAY CONTENT CALENDAR MOCK-UP"`.

Under header: one sentence describing what the deliverable does. Reference concrete numbers if the client has them (calls booked, MRR, close rate, etc.).

### Block 3 — Objectives + theme (left column)
Two small panels stacked:

1. **CAMPAIGN OBJECTIVES / DELIVERABLE OUTCOMES** — 4-5 tick-bulleted lines. Each line is one concrete outcome the prospect gets.
2. **THEME / VISUAL ANCHOR** — hero panel showing the core visual metaphor. For a pipeline preview, it's a small dashboard. For a content calendar, it's a calendar month view. For an ad board, it's an ad frame.

### Block 4 — Mock-up grid (right side, dominant)
7 labelled photorealistic frames arranged in a grid. Each frame shows one part of the deliverable, labelled with a dark ribbon top-left.

The 7 frames are category-specific. Choose what fits.

**For SDR / lead gen dashboard preview:**
- Prospect list (table with names, titles, MRR band, LinkedIn thumbnails)
- Email copy preview (mail client mock)
- Sending infrastructure (mailboxes, deliverability score)
- Reply queue (SDR replies with timestamps)
- Qualified-call filter
- Booked calendar (7-day view with meetings)
- Meetings tracker (Kanban)

**For content calendar / creator services:**
- Monthly calendar view
- Post-type breakdown
- Content pillars
- Sample post 1
- Sample post 2
- Distribution schedule
- Analytics preview

**For ad creative board / paid media:**
- Hook variants (5 hooks)
- Creative frames (3 formats)
- Copy blocks
- CTA options
- Landing page preview
- Audience segments
- Testing matrix

**For merch / gift guide:**
- Product frame 1
- Product frame 2
- Product frame 3
- Brand board
- Packaging
- Delivery kit
- Reorder flow

Every frame has real-looking data. No lorem ipsum.

### Block 5 — Workflow strip (bottom, full width)
6 line-drawn icons + labels showing the CLIENT'S execution chain. Connected by arrows.

For Leads4You: ICP RESEARCH → LIST BUILD → AI-PERSONALISED COPY → SEND + WARMUP → SDR-MANAGED REPLIES → BOOKED CALLS TO CALENDAR.

For a content agency: STRATEGY → HOOKS → SCRIPT → SHOOT → EDIT → PUBLISH.

For a merch client: DESIGN → SAMPLE → PRODUCE → BRAND & PACK → SHIP → REORDER.

### Block 6 — Footer bar (bottom)
Full-width dark strip.

Left: three tick-bullet value lines specific to the client (e.g. "PIPELINE ON DAY 7. NOT DAY 90." / "SDR DESK INCLUDED. NOT ADD-ON." / "PERFORMANCE-BASED AFTER TRIAL.").

Right: single CTA panel — `"FULL [DELIVERABLE NAME] AVAILABLE ON A CALL."`.

Optional right-side callout: proof stats from the research (client count, deals booked, close rate).

## Voice rules inside the image
- No em-dashes
- No exclamation marks
- en-GB spelling
- Direct verbs

## Final prompt shape (paste into ChatGPT)

```
Create a landscape photorealistic UI mock-up of a "[DELIVERABLE NAME]" for [CLIENT'S CATEGORY]. Roughly 1600x1000. Clean corporate deliverable feel. Not moody. Not artistic.

TOP-LEFT: [CLIENT LOGO — describe faithfully]
TOP-CENTRE: Bold header "[DELIVERABLE NAME]" with subtitle "[SUB-HEADLINE]" in accent colour.
UNDER HEADER: One-sentence description referencing client's real numbers.

LEFT COLUMN: Two small panels stacked.
  1. "DELIVERABLE OUTCOMES" — 4-5 tick-bulleted outcomes.
  2. "VISUAL THEME" — hero panel with the core visual metaphor.

RIGHT SIDE (dominant): 7 labelled mock-up frames arranged in a grid:
  [list the 7 category-specific frames — see Block 4]
Every frame shows real-looking data. No lorem ipsum. Plausible names, numbers, timestamps.

BOTTOM STRIP (full width): Horizontal chain of 6 icons with labels showing the client's execution chain: [list the 6 steps for THIS client's category — see Block 5].

RIGHT-SIDE CALLOUT: proof stats — [client's real numbers if available].

BOTTOM FOOTER: Dark navy full-width strip. Left: three tick-bullet value lines. Right: CTA panel — "FULL [DELIVERABLE NAME] AVAILABLE ON A CALL."

Brand palette: [primary + accent from CLIENT'S brand]
Style: clean UI mock-up, high-fidelity, commercial deliverable feel.
No text errors. No cropped logos. No em-dashes. en-GB spelling.
```

Fill the bracketed placeholders with the client-specific values from the research memo.

## Scale note

Because this image is Generic, the operator builds it ONCE and reuses across every prospect on their outbound list. No per-prospect regeneration needed.
