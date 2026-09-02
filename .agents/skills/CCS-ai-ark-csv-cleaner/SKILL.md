---
name: CCS-ai-ark-csv-cleaner
description: Clean a lead list CSV exported from AI Ark — removes leads with a blank email and renames the email column to "email" for Lead Formatter compatibility. Use when the user hands over a CSV from AI Ark, says "clean this list," "remove the blanks," "clean up this export," or after CCS-ai-ark-list-builder has produced a search URL and the user comes back with the exported file. Also covers the optional (beta) fully-automated API export path for users who've added an AI Ark API key.
metadata:
  version: 1.0.0
---

# AI Ark CSV Cleaner

Takes the CSV a user exported from AI Ark's own UI and produces a clean version ready for Lead Formatter (or Clay/AirScale): blank-email leads removed, email column renamed to `email`.

This is the default path for every user — export the file manually from AI Ark, then give it to the AI assistant. Don't reach for the API path (see Advanced section below) unless the user has explicitly set up an AI Ark API key and asks for it.

---

## What AI Ark's export actually looks like

Column names can vary slightly by user's own export settings, but the shape is consistent. A real sample export from AI Ark has this header:

```
First Name,Last Name,Full Name,Title,Organization,Email Business,Business Status,LinkedIn,Company Name,Company Size,Company Product and Services,Company Description,Company SEO Description,Company Website
```

The columns that actually matter for the rest of the pipeline (enrichment prompts in particular) are **Company Product and Services**, **Company Description**, **Company SEO Description**, and **Company Website** — those map directly to the `{{ }}` variables used in `CCS-enrichment-prompts`. Company Size, Title, and LinkedIn may or may not be present depending on the user's own export settings — don't assume they're there.

**Critical formatting detail:** these CSVs contain quoted fields with embedded commas *and embedded literal newlines* (company descriptions are often several paragraphs, wrapped in quotes per RFC 4180). A naive line-by-line split will corrupt the file — one lead's multi-paragraph description will look like several broken rows. Always use a real CSV parser, never `split("\n")`.

## How to clean it

Use the bundled script — it already handles the quoting/newline issue correctly (tested against a real 976-row export):

```
node scripts/clean_csv.js "path/to/the/export.csv"
```

What it does:
1. Parses the CSV properly (RFC 4180 — handles quoted multi-line fields, embedded commas, escaped quotes, and a leading BOM).
2. Finds the email column by header match — looks for a header containing "email" (prefers one that also says "business" or "work" if there's more than one candidate, e.g. to avoid confusing it with a personal/other email field).
3. Drops every row where that column is blank or whitespace-only.
4. Renames that column's header to `email` (lowercase) — this is what makes it compatible with Lead Formatter.
5. Writes the result next to the original file as `<original-name>_cleaned.csv`, and prints a summary: total leads in, blank emails removed, leads remaining.

If the user wants the cleaned file somewhere specific (e.g. their Downloads folder, if the original wasn't already there), just move/rename the output — the script always writes next to the input.

If the header doesn't contain anything matching "email" at all, the script exits with the headers it found so the mismatch can be diagnosed rather than silently producing a bad file — check with the user what their export actually calls that column.

## After cleaning

Tell the user the counts (e.g. "976 leads in, 318 had no email, 658 remain") and that the file is ready to go straight into Lead Formatter, or into `CCS-lead-enrichment-scraper` first if they want the optional Jina scrape before enrichment.

---

## Advanced (beta): fully-automated API export

Off by default. Only relevant if the user has put an `AI_ARK_API_KEY` in `config/.env` (or a client-specific override) and explicitly asks to skip the manual export step — e.g. "just pull it via the API," "can you auto-export this."

This is **not based on AI Ark's official published API docs** — it's a reverse-engineered pipeline that's worked in practice. Treat it as best-effort: if AI Ark changes their API, this section may need updating, and any actual error response from the API should be trusted over what's written here.

**Base URL:** `https://api.ai-ark.com/api/developer-portal`
**Auth header:** `X-TOKEN: <AI_ARK_API_KEY>`

1. Given the search URL the user got from `CCS-ai-ark-list-builder` (and possibly tweaked in-browser), translate its query parameters into the API's filter body — see the mapping table below.
2. Quick count check: `POST /v1/people` with `size: 1` — read `totalElements` from the response.
3. If `totalElements <= 10000`: submit one export job — `POST /v1/people/export` with the same filters and `size` up to 10000.
4. If more than 10,000: submit multiple export jobs (`size: 10000`, incrementing `page`) and merge the results after download.
5. Poll `GET /v1/people/export/{trackId}/statistics` every ~30 seconds until `state === "DONE"`.
6. Download results page by page: `GET /v1/people/export/{trackId}/inquiries?page=X&size=100`.
7. Keep only records where `email.output[].found === true`; take `email.output.find(e => e.found).address` as the email.
8. Build the CSV using this column set and field mapping, then run it through the exact same blank-check/rename logic as the manual path (there won't be any blanks left since step 7 already filtered them, but keep the `email` column name consistent):

| Output column | Source field |
|---|---|
| first_name | `r.first_name` |
| last_name | `r.last_name` |
| email | `email.output.find(e => e.found).address` |
| title | `r.summary` or `r.profile` (export responses use `summary`, search responses use `profile`) |
| company | `company.name` |
| company_domain | `company.domain` |
| linkedin | `r.linkedin` |
| location | `r.location` |
| industry | `company.industry` |
| headcount | `company.employeeSize` |
| company_products_services | `company.keywords.join(', ')` |
| company_description | `company.summary.description` |
| company_overview | `company.summary.overview` |
| company_seo | `company.summary.seo` |

**URL param → API filter body mapping** (for translating a `CCS-ai-ark-list-builder` URL into the request body):

| URL parameter | API field | Notes |
|---|---|---|
| `exclude_technologies` | `account.technologies.any.exclude` | mode: `WORD` |
| `company_hq_include_location_region` | `account.location.any.include` | strip the `Region::` prefix |
| `contact_include_location_region` | `contact.location.any.include` | |
| `company_type_exclude` | `account.type.any.exclude` | |
| `companies_include_keywords` | `account.productAndServices.any.include` | mode: `SMART` |
| `exclude_industry` | `account.industries.any.exclude` | mode: `WORD` |
| `employee_size_custom` | `account.employeeSize` | RANGE, format `MIN>MAX` |
| `current_job_include_job_title` | `contact.jobTitle.any.include` | mode from `exact_match` param |
| `modality=UNSAVED` | (implicit) | only net-new leads not already saved in AI Ark |

## Rules

- Never guess at a blank email — an empty string, whitespace, or missing value are all "blank." Never fabricate one.
- Never drop a lead for any reason other than a blank email (missing headcount, missing title, etc. are fine — leave those rows in).
- Never rename any column other than the email column.
- Always use a real CSV parser — never process this data line-by-line.
- The advanced API path is optional and unofficial — never push a user toward it if they haven't set up an API key themselves.
