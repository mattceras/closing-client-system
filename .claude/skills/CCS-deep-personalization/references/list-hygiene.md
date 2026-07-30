# List Hygiene

Personalization amplifies whatever is in the data. On a merge-variable campaign a bad row wastes a send. On a bespoke campaign a bad row produces a confidently wrong email that damages the client.

Every check below came from a real list that looked clean.

---

## The Governing Rule

**Verified is not the same as correct.**

An email address can be deliverable and still belong to someone who is not a buyer. Deliverability answers *will this arrive*. It says nothing about *should this arrive*. Run these checks even when the client insists the list is verified — they are answering a different question, and both of you can be right.

---

## Check 1 — Placeholder Employers

Search the company-name column for `Retired`, `Self`, `Self-Employed`, `None`, `N/A`, `Freelance`, `Consultant`, `Unemployed`, `Student`.

On one 744-lead list, 54 rows had a company name of literally "Retired." The attached descriptions were a computer repair shop, a school district, several realty brokers, and an HR consultancy. Some had placeholder email domains.

**Action:** reject. These pull down domain reputation and can never convert.

---

## Check 2 — The Description Belongs to Someone Else

Enrichment matches on company name. Short or generic names collide with larger, better-indexed companies.

Real examples from one list:

| Listed as | Description that came back |
|---|---|
| `AES` | A fireplace and hearth distributor |
| `Crescent` | A contract packaging company |
| `Tenet` | "A group of AI companies" |
| `Cottage Industries` | A team chat app |
| `Flyleaf` | A bookstore and cafe |

**Detection:** flag any lead whose description fails to read like the target ICP. A keyword test gets you most of the way; the website settles it.

**Action:** scrape the domain and rewrite from the real source. Reject if the site confirms they aren't a buyer.

---

## Check 3 — Same Name, Different Company

The nastiest one, because both records look valid and the join succeeds silently.

Group leads by lowercased company name, then compare **domains within each group**. More than one domain under one name means more than one company.

Real collisions from a single list:

| Name | Company A | Company B |
|---|---|---|
| Tenet | `tenetequity.com` — real estate capital (28 leads) | `tenetfintech.com` — public AI analytics co (3 leads) |
| Traction Capital Partners | `tractioncp.com` — PE firm (5) | `traccap.com` — hard money lender (1) |
| Taurus Capital Partners | `taurus-cp.com` — PE firm (1) | `tauruscp.com` — hotel asset management (1) |
| Greencrest | `greencrest.co` — permanent capital (1) | `greencrest.com` — marketing agency (1) |

Without this check, all 31 "Tenet" contacts inherit one email and three of them receive a pitch written for a different company.

**Action:** split by domain. Write separately for each real company, reject the ones that aren't a fit. **Always join on name + domain, never name alone.**

---

## Check 4 — Wrong Seniority

Filter titles that cannot buy and will not forward:

- Summer analysts and interns — gone in weeks, zero authority
- Administrative, data, and commission-sales roles that share a title stem with a real one (`Associate Broker`, `Administrative Associate`, `Lead Data Analyst`)

Keep genuine junior investment staff when they are the actual product user. Judge by the role, not the word.

---

## Check 5 — Duplicate Addresses

Dedupe by email, keeping the most senior title. One list had 23 duplicate addresses across 767 rows. The same person receiving the same campaign twice is a visible error.

---

## Check 6 — Empty Columns

Report fill rates before planning anything. On one list `Company Location`, `Phone`, `Gender`, and `Linkedin Company Url` were **0% populated** — so no geographic targeting was possible regardless of what the campaign plan assumed. Find that out before promising it, not after.

---

## The Rejects File Is Part of the Deliverable

Never silently drop rows. Output a second CSV with every rejected lead and a reason:

```
Company Name, First Name, Last Name, Job title, Email, Company domain, reason
```

Reasons in use:
- `Retired / not an operating buyer`
- `Website confirms operating company, not a fit`
- `No usable description and website unreachable`
- `Reviewed and rejected: not a buyer`
- `Name collision: different company sharing the firm name`

Then reconcile out loud: **personalized + rejected = original unique count.** If those don't tie, something was lost.

---

## Expected Yield

From one real 767-row list:

```
767  rows in file
744  unique emails            (23 duplicates)
576  passed triage
517  personalized and shipped
227  rejected
```

**Roughly two thirds of a purchased list survives.** Budget for that. A client expecting 744 sends needs to hear the real number early, with the reasoning, not on delivery day.
