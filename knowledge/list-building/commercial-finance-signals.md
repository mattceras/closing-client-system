# Commercial Finance Signal Playbook

## Purpose

Find public business events that may create a timely commercial financing use case, then separate credible opportunities from generic growth news. A signal is a reason to investigate. It is never proof that a company needs financing, is distressed, or will qualify.

This playbook has two lanes:

1. **Borrower opportunity signals:** companies with a recent event that may create a capital requirement.
2. **Funded-deal and lender intelligence:** public evidence of which lenders are financing which transaction types, industries, property types, sizes, and geographies.

The second lane informs market selection and lender mapping. It is not automatically a borrower prospect list.

## Define the financing box first

Use the agency or client profile when available. Otherwise collect these fields together before scoring results:

- financing products offered;
- geography;
- preferred industries or property types;
- minimum and maximum deal size;
- borrower or sponsor requirements;
- exclusions;
- whether the objective is borrower origination, lender research, or both.

Do not invent a credit box. The same public event can be highly relevant for an equipment lender and irrelevant for a CRE bridge lender.

## Borrower signal taxonomy

| Observable event | Possible financing relevance | Evidence that strengthens it | Common false positive |
|---|---|---|---|
| Acquisition announcement, signed LOI, definitive agreement, or roll-up activity | Acquisition financing, bridge capital, SBA acquisition financing, working capital | Named buyer and target, transaction stage, consideration or closing window | Deal already fully financed or already closed |
| Government or major commercial contract award | Mobilization capital, payroll, purchase-order finance, receivables finance, bonding support | Award date, amount, performance period, named recipient | Vendor registration or bid eligibility without an award |
| Commercial property acquisition, development application, or construction permit | CRE acquisition, bridge, construction, renovation, or tenant-improvement financing | Named owner/developer, address, project value, permit status, transaction date | Minor permit, stale application, or contractor listed instead of owner |
| New facility, plant, warehouse, clinic, franchise location, or geographic expansion | CRE, equipment, fit-out, inventory, or working capital | Location, opening timeline, square footage, jobs, stated capex | Generic expansion language with no concrete project |
| Equipment order, production-line upgrade, fleet expansion, or manufacturing capex | Equipment loan or lease, term debt, working capital | Equipment type, vendor, amount, delivery or commissioning date | Routine replacement with no material financing need |
| Debt maturity, refinancing process, covenant amendment, or stated liquidity need in a public filing | Refinance, recapitalization, term loan, ABL, or CRE refinance | Maturity amount/date, facility type, collateral, management statement | Historical debt disclosure with no current event |
| Grant, tax credit, economic-development incentive, or reimbursement award tied to a project | Bridge, matching capital, equipment, construction, or working capital | Award amount, matching requirement, reimbursement timing, project scope | Unrestricted grant with no capital gap |
| Backlog increase, large purchase order, receivables growth, or delayed contract payment | Working capital, factoring, ABL, or purchase-order finance | Named contract/customer, amount, payment terms, backlog comparison | Revenue growth alone with no cash-conversion evidence |
| Multi-unit opening plan, franchise award, or portfolio expansion | SBA, CRE, equipment, inventory, or working capital | Number of locations, geography, schedule, sponsor/operator | Aspirational plan without approved sites or timeline |

## Signals that need special caution

- A directory membership, business registration, hiring post, or executive appointment is usually a market-fit clue, not a financing signal by itself.
- A UCC filing may show that financing already exists. Do not label it a new need without a separate current event.
- A completed financing announcement is market intelligence unless there is evidence of a follow-on need.
- Bankruptcy, layoffs, liens, and distress events can create sensitive or predatory outreach. Exclude them by default. Use them only for a clearly applicable, legally reviewed restructuring product.
- Do not use consumer credit, personal financial information, or protected personal data.

## Source hierarchy

Prefer evidence in this order:

1. **Primary public records:** company filings, SEC EDGAR filings, government contract awards, USAspending records, building permits, planning applications, recorder/property records, economic-development awards, and other official datasets.
2. **First-party announcements:** company newsrooms, lender transaction announcements, investor relations pages, and official project announcements.
3. **Reliable trade or local reporting:** useful for discovery and context; corroborate material details when possible.
4. **Aggregators and social posts:** discovery only unless they link to the underlying evidence.

The included public source bank contains useful starting points under Building Permit, Construction & CRE, Gov Procurement, Manufacturing, Grant & Award, and Financial & Insurance. Search `knowledge/list-building/public-source-directory-bank.json`, then verify that the source still exists and supports the needed fields before relying on it.

## Funded-deal and lender intelligence

Track public closed or announced financings separately. Preserve:

- lender and any participating lenders;
- borrower or sponsor, when public;
- announcement or closing date;
- amount, or `UNKNOWN`;
- financing product and stated use of proceeds;
- industry, property type, and geography;
- term, rate, leverage, or collateral only when publicly stated;
- source URL and a concise evidence note;
- whether the record demonstrates lender appetite, pricing, structure, or only general activity.

Aggregate repeated records to identify patterns such as active lenders, favored collateral, common loan purposes, transaction-size bands, and active geographies. Do not infer a lender's full credit policy from one deal.

## Recency and evidence

- Start with the previous 24 hours for a frequent scan.
- If fewer than five credible borrower candidates are found, expand to seven days and label the wider lookback.
- Use the event date when available. Publication date is not a substitute; preserve both when they differ.
- Prefer one strong primary source over several copied articles.
- Resolve the most likely company domain and retain the evidence used for that match.
- Deduplicate by company and underlying event, not merely by URL or headline.

## Scoring

Score visible components separately:

- **Credit-box and ICP fit:** 0-35
- **Signal strength:** 0-30
- **Recency:** 0-20
- **Source confidence:** 0-15

Suggested routing:

- **75-100:** human review for potential enrichment;
- **55-74:** watch or investigate further;
- **Below 55:** drop from the presented opportunity queue.

A high total cannot repair missing evidence. If the event itself is unverified, route it to watch regardless of the arithmetic.

## Truthful messaging bridge

Reference only what the source proves:

- Good: “Saw the county permit for the warehouse expansion.”
- Bad: “It looks like you need a construction loan.”

Connect the public event to a possible financing use case without claiming knowledge of the company's finances. Any outreach must separately follow the client's approvals, licensing, advertising, privacy, and platform requirements.
