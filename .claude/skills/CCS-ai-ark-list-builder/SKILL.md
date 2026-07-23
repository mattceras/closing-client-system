---
name: CCS-ai-ark-list-builder
description: Build AI Ark people search URLs for B2B cold email list building. Takes an ICP or target description and outputs a ready-to-click search URL with all standard filters pre-applied. Use when the user wants to build a lead list, generate an AI Ark search URL, find prospects by vertical or industry, or asks about targeting keywords and job titles for cold email outreach. Also use when the user mentions "AI Ark," "list building," "lead list," "search URL," "prospect list," "build a list," "who should I target," or any combination of ICP + list/outreach context.
metadata:
  version: 1.1.0
---

# AI Ark List Builder

Build ready-to-click AI Ark people search URLs. Accept natural language input — the user can describe their target in a sentence or provide structured details. Do not run a rigid Q&A. Work with what you're given. If critical information is missing (vertical/target type), ask only for that.

---

## What This Always Produces

A URL at `https://app.ai-ark.com/search/people` with:
- Outlook tech exclusions (always)
- Gov/nonprofit/education company type exclusions (always)
- US + Canada as default location (unless user specifies otherwise)
- Company-level keywords via `companies_include_keywords`
- Comprehensive job title variations
- Headcount range derived from price point or stated directly

**Industry exclusions are never applied automatically.** The user may be targeting software companies, advertising agencies, or any other vertical — never assume what to exclude. Only add `exclude_industry` if the user explicitly asks to exclude specific industries.

---

## URL Parameter Order

Always build the URL in this order:

```
https://app.ai-ark.com/search/people?exclude_technologies=...&modality=UNSAVED&company_hq_include_location_region=...&contact_include_location_region=...&company_type_exclude=...&companies_include_keywords=...&current_job_include_job_title=...&exact_match=current_job_include_job_title%3AWORD&employee_size_custom=...
```

Include `&exclude_industry=...` only if the user explicitly requests industry exclusions. When present, insert it before `employee_size_custom`.

---

## Fixed Parameters (Always Present — Never Omit)

```
exclude_technologies=Outlook%5Emicrosoft+outlook%5Eoutlook+web+app
modality=UNSAVED
company_type_exclude=GOVERNMENT_AGENCY%5ENON_PROFIT%5EEDUCATIONAL
exact_match=current_job_include_job_title%3AWORD
```

---

## URL Encoding Rules

- Space → `+`
- `^` (multi-value separator) → `%5E`
- `::` (location separator) → `%3A%3A`
- `:` (in exact_match value) → `%3A`
- `>` (in headcount range) → `%3E`
- `&` (e.g. M&A) → `%26`
- `(` → `%28`
- `)` → `%29`
- `/` → `%2F`

Multiple values in any parameter are always joined with `%5E`.

---

## Headcount Range

Format: `employee_size_custom=MIN%3EMAX`

**Derive from monthly price point if stated:**
- Under $2K/mo → `5%3E200`
- $2K–$5K/mo → `10%3E200`
- $5K–$15K/mo → `25%3E500`
- $15K+/mo → `50%3E1000`

Accept a directly stated range if given. Default to `5%3E200` if nothing is specified.

---

## Location Reference

**Default (US + Canada):**
```
company_hq_include_location_region=North+America%3A%3AUnited+States%5ENorth+America%3A%3ACanada
contact_include_location_region=North+America%3A%3AUnited+States%5ENorth+America%3A%3ACanada
```

**US only:**
```
company_hq_include_location_region=North+America%3A%3AUnited+States
contact_include_location_region=North+America%3A%3AUnited+States
```

**Full North America (US + Canada + territories):**
```
company_hq_include_location_region=North+America%3A%3AUnited+States%5ENorth+America%3A%3ACanada%5ENorth+America%3A%3ABermuda%5ENorth+America%3A%3AGreenland%5ENorth+America%3A%3ASaint+Pierre+and+Miquelon%5ENorth+America%3A%3AUnited+States+Minor+Outlying+Islands%5ENorth+America%3A%3ABaker+Island%5ENorth+America%3A%3AHowland+Island%5ENorth+America%3A%3AJarvis+Island%5ENorth+America%3A%3AJohnston+Atoll%5ENorth+America%3A%3AMidway+Islands%5ENorth+America%3A%3ANavassa+Island%5ENorth+America%3A%3APalmyra+Atoll%5ENorth+America%3A%3AWake+Island
contact_include_location_region=North+America%3A%3AUnited+States%5ENorth+America%3A%3ACanada%5ENorth+America%3A%3ABermuda%5ENorth+America%3A%3AGreenland%5ENorth+America%3A%3ASaint+Pierre+and+Miquelon%5ENorth+America%3A%3AUnited+States+Minor+Outlying+Islands%5ENorth+America%3A%3ABaker+Island%5ENorth+America%3A%3AHowland+Island%5ENorth+America%3A%3AJarvis+Island%5ENorth+America%3A%3AJohnston+Atoll%5ENorth+America%3A%3AMidway+Islands%5ENorth+America%3A%3ANavassa+Island%5ENorth+America%3A%3APalmyra+Atoll%5ENorth+America%3A%3AWake+Island
```

**UK:**
```
company_hq_include_location_region=Europe%3A%3AUnited+Kingdom
contact_include_location_region=Europe%3A%3AUnited+Kingdom
```

**Australia:**
```
company_hq_include_location_region=Oceania%3A%3AAustralia
contact_include_location_region=Oceania%3A%3AAustralia
```

**Singapore:**
```
company_hq_include_location_region=Asia%3A%3ASingapore
contact_include_location_region=Asia%3A%3ASingapore
```

**Hong Kong:**
```
company_hq_include_location_region=Asia%3A%3AHong+Kong
contact_include_location_region=Asia%3A%3AHong+Kong
```

Location is easy for users to adjust inside AI Ark — don't over-engineer it. Default to US + Canada silently.

---

## Job Title Library

Always generate comprehensive title variations. A single title like "CEO" must become many forms. Select the tier(s) appropriate for the headcount range. Combine tiers when targeting a wide headcount range.

AI Ark allows up to 250 keyword values. Use as many relevant title variations as the search warrants.

### Tier 1 — Founder / Owner (5–25 employees)
Decision-maker is almost always the owner. Use for small companies.

**URL-encoded string:**
```
CEO%5EChief+Executive+Officer%5EFounder%5ECo-Founder%5EOwner%5ECo-Owner%5EPresident%5EPrincipal%5EManaging+Partner%5EManaging+Director%5EPartner%5EFounding+Partner%5EManaging+Owner%5EFounder+and+CEO%5ECEO+and+Founder%5EFounder+%26+CEO%5ECEO+%26+Founder%5EFounder%2FCEO%5ECEO%2FFounder%5ECo-Founder+and+CEO%5ECEO+and+Co-Founder%5ECo-Founder+%26+CEO%5ECEO+%26+Co-Founder%5EChief+Executive+Officer+and+Founder%5EFounder+and+Chief+Executive+Officer%5ECo-Founder+and+Chief+Executive+Officer%5EChief+Executive+Officer+and+Co-Founder%5EPresident+and+CEO%5ECEO+and+President%5EFounder+and+President%5EPresident+and+Founder%5EOwner+and+Founder%5EFounder+and+Owner%5EFounding+CEO%5EFounding+Director%5ESole+Proprietor%5EProprietor
```

**Comma-separated (for user output on request):**
CEO, Chief Executive Officer, Founder, Co-Founder, Owner, Co-Owner, President, Principal, Managing Partner, Managing Director, Partner, Founding Partner, Managing Owner, Founder and CEO, CEO and Founder, Founder & CEO, CEO & Founder, Founder/CEO, CEO/Founder, Co-Founder and CEO, CEO and Co-Founder, Co-Founder & CEO, CEO & Co-Founder, Chief Executive Officer and Founder, Founder and Chief Executive Officer, Co-Founder and Chief Executive Officer, Chief Executive Officer and Co-Founder, President and CEO, CEO and President, Founder and President, President and Founder, Owner and Founder, Founder and Owner, Founding CEO, Founding Director, Sole Proprietor, Proprietor

---

### Tier 2 — C-Suite + VP (25–150 employees)
Owners have delegated. Use Tier 1 titles plus these.

**URL-encoded string (append to Tier 1 with %5E):**
```
Chief+Marketing+Officer%5ECMO%5EChief+Revenue+Officer%5ECRO%5EChief+Growth+Officer%5EChief+Operating+Officer%5ECOO%5EChief+Commercial+Officer%5EChief+Business+Officer%5EVP+of+Marketing%5EVP+Marketing%5EVice+President+of+Marketing%5EVice+President+Marketing%5EVP+of+Sales%5EVP+Sales%5EVice+President+of+Sales%5EVice+President+Sales%5EVP+of+Business+Development%5EVP+Business+Development%5EVice+President+of+Business+Development%5EVP+of+Growth%5EVP+Growth%5EVice+President+of+Growth%5EVP+of+Revenue%5EVice+President+of+Revenue%5EVP+of+Operations%5EVice+President+of+Operations%5ESVP+of+Marketing%5ESVP+Marketing%5ESenior+Vice+President+of+Marketing%5ESVP+of+Sales%5ESenior+Vice+President+of+Sales%5ESVP+of+Business+Development%5ESenior+Vice+President+of+Business+Development%5EEVP+of+Marketing%5EEVP+of+Sales%5EExecutive+Vice+President+of+Marketing%5EExecutive+Vice+President+of+Sales
```

**Comma-separated (for user output on request):**
Chief Marketing Officer, CMO, Chief Revenue Officer, CRO, Chief Growth Officer, Chief Operating Officer, COO, Chief Commercial Officer, Chief Business Officer, VP of Marketing, VP Marketing, Vice President of Marketing, Vice President Marketing, VP of Sales, VP Sales, Vice President of Sales, Vice President Sales, VP of Business Development, VP Business Development, Vice President of Business Development, VP of Growth, VP Growth, Vice President of Growth, VP of Revenue, Vice President of Revenue, VP of Operations, Vice President of Operations, SVP of Marketing, SVP Marketing, Senior Vice President of Marketing, SVP of Sales, Senior Vice President of Sales, SVP of Business Development, Senior Vice President of Business Development, EVP of Marketing, EVP of Sales, Executive Vice President of Marketing, Executive Vice President of Sales

---

### Tier 3 — Director / Head (100–500 employees)
Target functional leaders. Use alongside or instead of Tier 2 for larger companies.

**URL-encoded string:**
```
Director+of+Marketing%5EMarketing+Director%5EDirector+of+Sales%5ESales+Director%5EDirector+of+Business+Development%5EBusiness+Development+Director%5EDirector+of+Growth%5EGrowth+Director%5EDirector+of+Demand+Generation%5EHead+of+Demand+Generation%5EDirector+of+Digital+Marketing%5EHead+of+Marketing%5EHead+of+Sales%5EHead+of+Growth%5EHead+of+Business+Development%5EHead+of+Revenue%5EHead+of+Demand+Gen%5ESenior+Director+of+Marketing%5ESenior+Director+of+Sales%5EDirector+of+Revenue%5EDirector+of+Operations%5EHead+of+Operations%5EDirector+of+Partnerships%5EHead+of+Partnerships%5EVP+of+Partnerships%5EDirector+of+Customer+Success%5EHead+of+Customer+Success
```

**Comma-separated (for user output on request):**
Director of Marketing, Marketing Director, Director of Sales, Sales Director, Director of Business Development, Business Development Director, Director of Growth, Growth Director, Director of Demand Generation, Head of Demand Generation, Director of Digital Marketing, Head of Marketing, Head of Sales, Head of Growth, Head of Business Development, Head of Revenue, Head of Demand Gen, Senior Director of Marketing, Senior Director of Sales, Director of Revenue, Director of Operations, Head of Operations, Director of Partnerships, Head of Partnerships, VP of Partnerships, Director of Customer Success, Head of Customer Success

---

### Finance / Investment / VC / PE Titles (specialized vertical)
Use when targeting private equity, venture capital, investment banking, family offices, or capital markets.

**URL-encoded string:**
```
General+Partner%5EManaging+General+Partner%5EPartner%5ESenior+Partner%5EManaging+Partner%5EPrincipal%5EChief+Investment+Officer%5ECIO%5EHead+of+Sourcing%5EVP+of+Sourcing%5EVP+of+Corporate+Development%5EDirector+of+Corporate+Development%5EVP+of+Business+Development%5ESVP+of+Business+Development%5EEVP+of+Business+Development%5EDirector+of+Business+Development%5EHead+of+Business+Development%5EHead+of+Growth%5EHead+of+Investor+Relations%5EVP+of+Investor+Relations%5EManaging+Director%5EPortfolio+Manager%5EFund+Manager%5EInvestment+Manager%5EDeal+Principal%5EFounder%5ECo-Founder%5ECEO%5EChief+Executive+Officer%5EPresident
```

**Comma-separated (for user output on request):**
General Partner, Managing General Partner, Partner, Senior Partner, Managing Partner, Principal, Chief Investment Officer, CIO, Head of Sourcing, VP of Sourcing, VP of Corporate Development, Director of Corporate Development, VP of Business Development, SVP of Business Development, EVP of Business Development, Director of Business Development, Head of Business Development, Head of Growth, Head of Investor Relations, VP of Investor Relations, Managing Director, Portfolio Manager, Fund Manager, Investment Manager, Deal Principal, Founder, Co-Founder, CEO, Chief Executive Officer, President

---

## Vertical Keyword Library

Always use `companies_include_keywords`. These are company-level keywords — what the company does or offers — **not** person-level attributes. Never use this field for person keywords.

AI Ark supports up to 250 keyword values. Include both lowercase and Proper Case versions for better matching coverage. Join with `%5E` in the URL.

### Home Services & Trades
**Keywords (comma-separated):**
pool construction, pool installation, pool service, roofing contractor, roof replacement, hvac installation, hvac repair, plumbing services, electrical contractor, solar installation, solar panels, general contractor, home remodeling, kitchen remodel, bathroom remodel, landscaping, hardscaping, fence installation, paving, concrete contractor, painting contractor, garage door installation, window replacement, door replacement, pest control, tree removal, waterproofing, foundation repair, flooring installation, Pool Construction, Pool Service, Roofing Contractor, HVAC, Plumbing Services, Electrical Contractor, Solar Installation, General Contractor, Home Remodeling, Kitchen Remodel, Bathroom Remodel, Landscaping, Hardscaping, Fence Installation, Paving, Concrete Contractor, Painting Contractor, Garage Door Installation, Window Replacement, Pest Control, Tree Removal, Waterproofing, Foundation Repair, Flooring Installation

---

### Financial Services & Wealth Management
**Keywords (comma-separated):**
financial planning, wealth management, investment management, portfolio management, retirement planning, estate planning, tax planning, tax preparation, bookkeeping services, payroll services, audit services, business advisory, CFO services, fractional CFO, accounting services, insurance planning, risk management, annuities, life insurance, succession planning, trust services, 401k management, financial consulting, business valuation, forensic accounting, compliance services, wealth transfer, mortgage lending, loan origination, registered investment advisor, RIA, financial advisor, independent financial advisor, Financial Planning, Wealth Management, Investment Management, Portfolio Management, Retirement Planning, Estate Planning, Tax Planning, Tax Preparation, Bookkeeping Services, CFO Services, Fractional CFO, Accounting Services, Financial Consulting, Business Valuation, Registered Investment Advisor, Financial Advisor, Mortgage Lending

---

### Law Firms
**Keywords (comma-separated):**
personal injury, family law, divorce attorney, estate planning attorney, immigration law, criminal defense, real estate law, business law, workers compensation, medical malpractice, employment law, bankruptcy attorney, DUI defense, slip and fall, wrongful death, child custody, immigration services, civil litigation, probate, trust administration, law firm, legal services, attorney, Personal Injury, Family Law, Divorce Attorney, Estate Planning Attorney, Immigration Law, Criminal Defense, Real Estate Law, Business Law, Workers Compensation, Medical Malpractice, Employment Law, Bankruptcy Attorney, Civil Litigation, Probate, Trust Administration

---

### Managed IT & MSP
**Keywords (comma-separated):**
managed IT services, IT support, cybersecurity, network management, cloud migration, IT consulting, helpdesk support, data backup, disaster recovery, managed security, network monitoring, VoIP services, IT infrastructure, managed cloud, endpoint security, compliance services, co-managed IT, virtual CIO, server management, Microsoft 365 management, managed service provider, MSP, IT managed services, co-managed IT services, Managed IT Services, IT Support, Cybersecurity, Network Management, Cloud Migration, IT Consulting, Helpdesk Support, Data Backup, Disaster Recovery, Managed Security, Endpoint Security, Co-Managed IT, Virtual CIO, Managed Service Provider, MSP, Microsoft 365 Management

---

### B2B Consulting & Professional Services
**Keywords (comma-separated):**
management consulting, business consulting, HR consulting, operations consulting, strategic planning, organizational development, leadership training, executive coaching, compliance consulting, safety consulting, environmental consulting, process improvement, change management, workforce development, employee training, talent development, business process outsourcing, risk consulting, quality assurance consulting, regulatory compliance, Management Consulting, Business Consulting, HR Consulting, Operations Consulting, Strategic Planning, Executive Coaching, Compliance Consulting, Safety Consulting, Environmental Consulting, Process Improvement, Change Management, Business Process Outsourcing, Regulatory Compliance

---

### Commercial / B2B Services
**Keywords (comma-separated):**
commercial cleaning, janitorial services, office cleaning, facility maintenance, commercial landscaping, commercial pest control, security services, property management, commercial real estate, fleet maintenance, commercial HVAC, commercial roofing, fire protection services, commercial painting, facility management, Commercial Cleaning, Janitorial Services, Office Cleaning, Facility Maintenance, Commercial Landscaping, Commercial Pest Control, Security Services, Property Management, Commercial Real Estate, Facility Management, Commercial HVAC, Commercial Roofing, Fire Protection Services

---

### B2B Healthcare & Medtech
**Keywords (comma-separated):**
medical devices, healthcare technology, telehealth platform, clinical research, medical equipment sales, healthcare consulting, health IT solutions, patient engagement, electronic health records, remote patient monitoring, medical billing, revenue cycle management, healthcare compliance, population health management, medtech, health technology, Medical Devices, Healthcare Technology, Telehealth, Clinical Research, Medical Equipment, Healthcare Consulting, Health IT, Electronic Health Records, Medical Billing, Revenue Cycle Management, Healthcare Compliance, Medtech

---

### Industrial / Manufacturing / Supply Chain
**Keywords (comma-separated):**
industrial supply, wholesale distribution, custom packaging, freight brokerage, third party logistics, warehousing, fulfillment services, custom manufacturing, contract manufacturing, industrial automation, printing services, commercial printing, material handling, supply chain management, procurement services, 3PL, Industrial Supply, Wholesale Distribution, Custom Packaging, Freight Brokerage, Third Party Logistics, Warehousing, Fulfillment Services, Custom Manufacturing, Contract Manufacturing, Industrial Automation, Supply Chain Management, Procurement Services

---

### B2B Technology & SaaS
**Keywords (comma-separated):**
cloud platform, SaaS, data analytics, business intelligence, workflow automation, enterprise software, cybersecurity solutions, identity management, compliance software, project management software, CRM platform, ERP solutions, document management, API integration, process automation, software as a service, B2B software, Cloud Platform, SaaS, Data Analytics, Business Intelligence, Workflow Automation, Enterprise Software, Cybersecurity Solutions, CRM Platform, ERP Solutions, Document Management, API Integration, Process Automation

---

### Corporate Training & L&D
**Keywords (comma-separated):**
corporate training, leadership development, executive coaching, workplace safety training, compliance training, team building, organizational development, sales training, employee development, e-learning platform, learning management system, professional certification, DEI training, onboarding programs, performance coaching, Corporate Training, Leadership Development, Executive Coaching, Workplace Safety Training, Compliance Training, Sales Training, Employee Development, E-Learning, Learning Management System, Professional Certification, DEI Training

---

### Franchise & Multi-Location
**Keywords (comma-separated):**
franchise development, franchise consulting, franchise sales, franchise brokerage, multi-unit management, franchise marketing, territory development, franchise recruitment, franchise operations, area development, master franchise, Franchise Development, Franchise Consulting, Franchise Sales, Franchise Brokerage, Multi-Unit Management, Franchise Marketing, Territory Development, Franchise Recruitment, Franchise Operations, Area Development

---

### Finance / Investment / Capital Markets (M&A, PE, VC, Capital Advisory)
**Keywords (comma-separated):**
boutique investment banking, M&A advisory, mergers and acquisitions advisory, sell-side advisory, buy-side advisory, corporate finance advisory, business valuation, independent sponsor, private equity, growth equity, leveraged buyout, deal sourcing, fundless sponsor, venture capital, private credit, emerging fund manager, limited partner sourcing, fund placement, real estate syndication, specialty tax services, R&D tax credit consulting, cost segregation studies, tax incentive advisory, contingency tax consulting, capital advisory, capital raising, debt placement, equipment finance, equipment leasing, asset-based lending, commercial lending, business brokerage, business sale advisory, Boutique Investment Banking, M&A Advisory, Mergers and Acquisitions, Sell-Side Advisory, Buy-Side Advisory, Corporate Finance Advisory, Business Valuation, Independent Sponsor, Private Equity, Growth Equity, Venture Capital, Private Credit, Emerging Fund Manager, Capital Advisory, Capital Raising, Commercial Lending, Equipment Finance, Equipment Leasing, Asset-Based Lending, Business Brokerage, Investment Banking

---

### Video Production Targets
**Keywords (comma-separated):**
video production, corporate video, brand video, product video, commercial production, video marketing, branded content, explainer video, testimonial video, social video, video content, ad creative, video advertising, content creation, video agency, Video Production, Corporate Video, Brand Video, Product Video, Commercial Production, Video Marketing, Branded Content, Explainer Video, Testimonial Video, Social Video, Video Content, Video Advertising, Content Creation, Video Agency

---

## Industry Exclusions (On Request Only)

Never apply industry exclusions by default. Only add `exclude_industry` when the user explicitly asks.

**Format:** lowercase, spaces between words, values joined with `%5E`

**Known industry names (confirmed from AI Ark URL format):**
- `real+estate`
- `construction`
- `medical+practices`
- `retail`
- `business+consulting+and+services`
- `software+development`
- `it+services+and+it+consulting`
- `individual+and+family+services`
- `advertising+services`
- `restaurants`
- `hospitals+and+health+care`
- `wholesale`
- `wholesale+building+materials`
- `financial+services`
- `investment+banking`
- `health+and+wellness+services`
- `hospitality`
- `facilities+services`
- `truck+transportation`
- `venture+capital+and+private+equity+principals` (covers most VC/PE firms)
- `venture+capital`
- `civic+and+social+organizations`
- `staffing+and+recruiting`
- `law+practice`

AI Ark has many more industries than listed here. If the user mentions an industry name not in this list, format it in lowercase with `+` for spaces and include it — AI Ark supports dynamic industry labels. The full industry list is available in AI Ark's help docs.

**Example:** User says "exclude staffing and law firms" →
```
exclude_industry=staffing+and+recruiting%5Elaw+practice
```

---

## Output Instructions

### Default Output

1. **The full URL** — one clean, clickable link
2. **Search summary:**
   ```
   Target: [vertical or ICP description]
   Headcount: [X–Y employees]
   Location: [region]
   Keywords: [N terms]
   Job titles: [N variations]
   Exclusions: Outlook tech · Gov/Nonprofit/Education · [any industry exclusions]
   ```

### On Request: Comma-Separated Outputs

If the user asks for just the keywords or just the job titles:
- Output as a clean comma-separated list (not URL-encoded, no `%5E`)
- Do not regenerate the full URL unless also asked

### On Request: URL Tweaks

If the user wants to change one element ("swap the keywords," "change headcount to 50–500," "add director titles"), update only that parameter and output the new full URL. No need to re-explain anything.

### On Request: New Vertical, Same Settings

If the user says "now do the same for [different vertical]," reuse location, headcount, and exclusions — swap only the keywords and adjust titles if the headcount tier changes.

---

## Rules

- Always use `companies_include_keywords` — never person-level keyword fields
- Always apply Outlook exclusions, company type exclusions, and `exact_match=current_job_include_job_title%3AWORD`
- Never apply industry exclusions unless the user explicitly asks for them
- Always use `/search/people` — never a company search URL
- Default to US + Canada silently — no need to ask unless the user mentions a different region
- Up to 250 keywords are supported — use as many as the vertical warrants
- Include both lowercase and Proper Case keyword variants for better AI Ark matching
- Job titles must include full variations — not just the short form
