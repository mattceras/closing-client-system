---
name: CCS-research
description: Research topics using web search, X/Twitter search, and multiple search APIs. Use for finding companies, people, deal intelligence, media appearances, news, or any task requiring real-time web data.
---

# Research — Multi-Source Intelligence

## Available research sources

Use the AI platform's web-search tools first. Optional external providers include Brave Search, Exa, X, Google Custom Search, NewsAPI, GNews, and Apollo.

If the student selects one, read its credential from the normal private credential files using these names:

- `BRAVE_SEARCH_API_KEY`
- `EXA_API_KEY`
- `X_BEARER_TOKEN`
- `GOOGLE_CUSTOM_SEARCH_API_KEY` and `GOOGLE_CUSTOM_SEARCH_ENGINE_ID`
- `NEWSAPI_KEY`
- `GNEWS_API_KEY`
- `APOLLO_API_KEY`

Never place a real credential in a skill, prompt, command example, generated script, URL shown in chat, or tracked file. If the required key is absent, ask once and save it privately.

## Deal Research Workflow

For researching potential acquisition targets or deal opportunities:

1. **Company search** — Brave + Exa for company info, financials, news
2. **People search** — LinkedIn (via linkedin-cli or Unipile), Apollo enrichment
3. **News/sentiment** — NewsAPI + GNews for recent coverage
4. **Social signals** — X/Twitter for founder activity, company mentions
5. **Financial data** — Alpha Vantage, FMP, Finnhub for public companies
6. **SEC filings** — edgartools skill for regulatory filings

## Person Research Workflow

1. LinkedIn profile via `linkedin-cli` or Unipile API
2. Apollo enrichment when selected and `APOLLO_API_KEY` is available
3. X/Twitter presence via bearer token search
4. News mentions via NewsAPI/GNews

## Tips
- Use Exa for semantic/conceptual searches ("companies doing AI in healthcare")
- Use Brave for factual lookups ("company X revenue 2025")
- Use NewsAPI for time-sensitive news
- Rate limits: Brave (1/sec), Exa (100/day free), NewsAPI (100/day free)
- All optional API keys belong in `config/.env` or the matching client's private `credentials.env`.
