# Crawling for Source Material

When the lead list has no usable description column — or the descriptions belong to the wrong
company — the firm's own website is the source. This is the proven configuration.

Verified on 1,805 domains: **98.1% success, ~8,000 characters per firm, $4.56 total.**

---

## The One Rule

**Crawl per domain, never per lead.**

A 7,200-lead list is usually 1,800 domains. Crawling per lead scrapes the same site four
times for four colleagues and costs 4x for identical data. Deduplicate domains first, crawl
once, join back.

Join on **domain, not company name.** Names collide; domains don't.

---

## Working Configuration

```json
{
  "url": "https://DOMAIN",
  "maxPages": 3,
  "maxDepth": 2,
  "useMainContentOnly": true,
  "includeLinks": false,
  "includeImages": false,
  "stopAfterMs": 45000
}
```

Via `monid run -p context.dev -e /web/crawl --json -i '<body>'`.

**Cap `maxPages` explicitly.** It defaults to **100**. Left alone, 1,800 domains costs $266
instead of $4.60. Billing is per page *actually scraped* — failed and skipped pages are free.

**Do not set `urlRegex`.** Natural link-following reaches the strategy pages on its own. A
regex intended to target `/criteria` and `/about` steered the crawler to `/team` instead and
cut the yield. An `(?i)` inline flag silently breaks matching altogether.

**`useMainContentOnly: true`** strips nav, header and footer at the source and is worth more
than any post-processing.

Concurrency **4**. Six triggers intermittent provider 503s.

---

## Reliability

Three things that must be built in before a run of this size:

**Retry with backoff.** Provider 503s and generic `UNKNOWN` errors are transient. The same
domain that fails once usually succeeds on the second attempt. Four attempts, backing off
2s / 6s / 15s.

**Resume on successes only.** This is the subtle one. If the resume logic skips every domain
already recorded, a run interrupted midway restarts, skips all the recorded *failures*, and
reports itself complete with most firms missing. That is worse than the crash, because it
looks finished. Skip `ok === true` and nothing else.

**A circuit breaker.** A dropped connection looks like an unbroken run of failures. Without a
breaker the crawler cheerfully burns through the remaining list offline — in one run, 1,400
domains "failed" in minutes because the machine lost internet. After ~25 consecutive failures,
stall and probe every 30 seconds until connectivity returns.

---

## Cleaning the Output

The crawl returns markdown for each page. Before it becomes a usable column:

- **Deduplicate lines across pages** — nav and footer text repeats on every page
- Strip markdown syntax, bullets, heading markers, emphasis
- Drop lines under ~12 characters and lines with no letters
- Drop known boilerplate: cookie notices, "skip to content", "all rights reserved"
- Lead with the page title and meta description; they are the densest summary a site offers
- Trim on a sentence boundary, not mid-word

---

## Sizing the Column

The text is per-firm but the column is per-lead, so a 30-contact firm repeats its text 30
times. That inflates the file fast.

| Chars per firm | 7,200-lead CSV |
|---:|---:|
| Full (~8,000) | ~58 MB |
| 3,000 | ~19 MB |
| 2,000 | ~14 MB |

**3,000 is the working default.** It holds the homepage pitch plus the strategy page.

Note the consequence: at 3 pages you capture ~8,000 characters and use 3,000, so **raising
`maxPages` does nothing unless the trim rises too.** If some firms lack size criteria in their
first 3 pages, the targeted fix is re-crawling only those at 5-6 pages, not raising the cap
for everyone.

---

## Status Column

Emit `crawl_status` alongside the text: `ok` / `thin` (under ~400 chars) / `failed`.

Filter to `ok` before running any paid enrichment. On a real run that was 6,772 of 7,217 —
skipping 445 rows that would otherwise have produced invented copy from nothing, and cost
money to produce it.

---

## Windows Gotchas

All four of these surfaced in a single session:

| Symptom | Cause | Fix |
|---|---|---|
| `Endpoint 'C:/Program Files/Git/web/crawl' not found` | Git Bash rewrites `/web/crawl` as a path | Prefix `MSYS_NO_PATHCONV=1` |
| `Invalid JSON input` | `spawn(..., {shell:true})` lets cmd.exe mangle the JSON body | Don't use a shell |
| `spawn EINVAL` | Node 22 refuses to spawn `.cmd` without a shell | Spawn the CLI's JS entry directly |
| Silent 1-page results | `(?i)` in `urlRegex` | Drop the regex |

The robust invocation is `spawn(process.execPath, [pathToCliIndexJs, ...args], {shell:false})`
— it sidesteps both the quoting and the `.cmd` problem at once.
