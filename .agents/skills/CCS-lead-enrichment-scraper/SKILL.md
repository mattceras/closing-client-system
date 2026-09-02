---
name: CCS-lead-enrichment-scraper
description: Optional stage that scrapes each lead's company website via Jina AI Reader (homepage plus best-effort about/team/services pages) and appends it as one "Website Scrape" column on the cleaned lead CSV. Off by default — only use when the user explicitly asks to scrape/enrich the list with Jina, says "scrape these websites," "add the Jina scrape," or "enrich this list with website content." Runs after CCS-ai-ark-csv-cleaner and before CCS-enrichment-prompts.
metadata:
  version: 1.0.0
---

# Lead Enrichment Scraper (Jina AI)

Adds real website content to a cleaned lead list before enrichment prompts run. This is optional and off by default — never run it unless the user asks for it. Not every user wants this step, and it takes real time (one to several seconds per lead, sequentially).

---

## What to collect before running

1. **The cleaned CSV** — output of `CCS-ai-ark-csv-cleaner` (has a `Company Website` or similar column).
2. **Jina API key, if they have one** — check `config/.env` / `clients/<name>/credentials.env` for `JINA_API_KEY` first. Works without one at low volume (no key required for the free tier), just slower and more likely to get rate-limited on large lists. Don't block on this — proceed without a key if they don't have one.
3. **Set expectations up front**: this is best-effort. Not every site has a discoverable about/team/services page, some sites will time out or block the scraper entirely, and a list of several hundred leads will take a while to run since it's sequential (roughly 1-3 seconds per lead, more if it finds multiple sub-pages). For large lists, mention it'll run for a while and checkpoints every 25 leads so nothing is lost if it's interrupted.

## How it works

Run the bundled script:

```
node scripts/scrape_leads.js "path/to/cleaned.csv" ["optional-jina-api-key"]
```

For each lead with a website on file:
1. Fetches the homepage through Jina Reader (`https://r.jina.ai/<url>`), which returns clean readable text/markdown instead of raw HTML.
2. Scans the homepage content for internal links matching common patterns for an about page, a team page, and a services/solutions page (e.g. `/about`, `/about-us`, `/team`, `/our-team`, `/services`, `/solutions`). There's no universal URL pattern across sites — this is pattern-matching against whatever links the homepage actually contains, not a guaranteed hit.
3. Fetches whichever of those it actually finds (skips categories it can't find — most sites won't have all three).
4. Combines everything into **one new column, `Website Scrape`**, with clearly labeled sections (`HOMEPAGE:`, `ABOUT:`, `TEAM:`, `SERVICES:`) so downstream enrichment prompts can reference specific parts if needed, but a single `{{ Website Scrape }}` variable also works fine as one blob of context.
5. Writes the result as `<original-name>_scraped.csv` next to the input, saving progress every 25 leads so a crash or interruption partway through doesn't lose everything already scraped.
6. Leads with no website on file, or where the site couldn't be reached at all, get a blank `Website Scrape` value rather than blocking the whole run — never let one bad site stop the rest of the list.

Requires Node.js 18+ (uses the built-in `fetch`) — if the user's on an older Node version, tell them to update rather than trying to patch around it.

## After scraping

Tell the user the summary the script prints (scraped / no website / failed counts) and that the output file is ready to feed into `CCS-enrichment-prompts` in place of the un-scraped cleaned CSV.

---

## Rules

- Never run this automatically as part of the core workflow — it's opt-in only.
- Never fabricate scrape content for a site that failed or timed out — leave it blank.
- Never treat "no about/team page found" as an error — most sites won't have all three, that's expected.
- Don't scrape a lead's website more than once per run — one homepage fetch plus at most one fetch per category (about/team/services), capped at 4 total requests per lead.
- If the list is large (500+ leads), mention the runtime up front rather than letting the user assume it's instant.
