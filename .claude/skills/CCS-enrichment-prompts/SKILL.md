---
name: CCS-enrichment-prompts
description: Build AI enrichment prompts for lead qualification, lead info enrichment, and cold email copy generation for Lead Formatter. Use when the user wants to build prompts for a new client, customize qualification criteria, write enrichment columns, generate email copy prompts, or update existing prompt sets. Also use when the user says "build me the prompts," "write the qualification prompt," "set up enrichment for this client," or "I need prompts for this campaign." All variable syntax defaults to Lead Formatter format.
metadata:
  version: 1.1.0
---

# AI Enrichment Prompt Builder

Build the three-prompt sequence for Lead Formatter. All variable references use Lead Formatter's `{{ Variable Name }}` syntax by default. Takes a client description and outputs ready-to-paste prompts for qualification, lead enrichment, and cold email copy generation.

## The Three Prompts

Every client gets all three. Always build them together unless told otherwise.

1. **Prompt 1 — Qualification** — Yes/No: is this lead a good fit?
2. **Prompt 2 — Lead Info** — Enriches the lead with business details and use cases
3. **Prompt 3 — Email Copy** — Writes the cold email using the lead info output

---

## What to Collect Before Building

Work with what you're given. If the user gives you a client name and description, start building. Only ask for what's missing.

- **Client name** — Company name
- **What they sell** — Services, product, offer
- **Who they sell to** — ICP: industries, company sizes, titles
- **What result they deliver** — The primary outcome for their clients
- **Client type** — Marketing agency / lead gen agency / video production / SaaS / other (determines tone and use case framing)
- **Services they offer** — What's in scope (important for constraining the email copy prompt)
- **Services they don't offer** — What NOT to reference in the email ideas
- **CTA style** — Brief call, demo, one-pager, or other

---

## Prompt 1: Qualification

```
You are qualifying leads for [CLIENT COMPANY], [ONE SENTENCE: what they do and who they serve].

Using the following information:
- Company Keywords: {{ Company Product and Services }}
- SEO Description: {{ Company SEO Description }}
- Short Description: {{ Company Description }}

Determine if this company would be a good fit for [CLIENT COMPANY]'s services.

QUALIFICATION CRITERIA:
1. [CRITERIA 1]
2. [CRITERIA 2]
3. [CRITERIA 3]
4. [CRITERIA 4]
5. [CRITERIA 5]

GOOD FIT (Answer YES):
[List specific business types, industries, and company profiles that are a good fit. Be exhaustive.]

NOT A GOOD FIT (Answer NO):
[List specific exclusions: competitors, wrong size, wrong model, won't get value]

Output only: Yes or No
```

### Qualification — Good Fit / Not a Good Fit by Client Type

**Marketing agency clients:**
Good fit includes: financial advisors, CPAs, managed IT/MSPs, management consulting firms, home service companies (pool, roofing, HVAC, plumbing, solar), law firms, medical and dental practices, commercial cleaning, B2B SaaS (early stage), franchise development companies.
Not a good fit: marketing agencies (competitors), digital marketing agencies, SEO agencies, staffing/recruiting firms, custom software dev shops, e-commerce / online-only businesses, nonprofits/government/education, sole proprietors with no team.

**Lead gen / outbound agency clients:**
Good fit includes: B2B SaaS companies, marketing and creative agencies serving businesses, management consulting firms, professional services with enterprise clients, B2B technology companies, companies selling high-ticket services or software to businesses.
Not a good fit: staffing and recruiting firms, IT services and MSPs, custom software dev shops, B2C companies, nonprofits/government/education, low-ticket B2B (under $5K).

**Video production clients:**
Good fit includes: real estate developers, luxury real estate, property management, home builders, automotive dealerships, cosmetic surgery and med spas, dental practices, fitness/gyms/country clubs, restaurants and hospitality groups, DTC e-commerce brands, franchise companies, higher education and private schools.
Not a good fit: other video production companies (competitors), B2B SaaS (not video-driven), staffing, nonprofits, government, education (K-12).

---

## Prompt 2: Lead Info Enrichment

```
CONTEXT ABOUT YOUR COMPANY (DO NOT REFERENCE IN OUTPUT):
[CLIENT COMPANY] is [DETAILED description: business, services, pricing, target market, value proposition. Be thorough — this context helps the AI understand what use cases to generate, but it should NEVER appear in the output.]

YOUR TASK:
You are analyzing a PROSPECT COMPANY to understand their business, who their customers are, and how [GENERAL SERVICE CATEGORY — e.g., "professional marketing services" / "cold email lead generation" / "video production"] could help them grow.

CRITICAL: The output below should ONLY describe the PROSPECT COMPANY being analyzed. DO NOT mention [CLIENT COMPANY], [CLIENT'S PRODUCT NAME], or any of our services in the output.

IMPORTANT: Only include information that can be directly inferred from the data provided. Do not guess, assume, or fabricate details. If the data does not contain enough information to complete a section, write "Insufficient data" for that section. Accuracy is more important than completeness.

DATA ABOUT THE PROSPECT COMPANY:
- Company Keywords: {{ Company Product and Services }}
- SEO Description: {{ Company SEO Description }}
- Short Description: {{ Company Description }}
[OPTIONAL: - Company Headcount: {{ Company Headcount }}]

Most of what you need will be from the short description.

OUTPUT (ABOUT THE PROSPECT COMPANY ONLY):

BUSINESS TYPE: [e.g., home services company / financial advisory firm / B2B SaaS company]

WHAT THEY DO: [Detailed overview of the prospect's business based only on the data provided. Include: core services or products, service area or market, problems they solve for clients, how they differentiate, any specializations or niches, business model, and other relevant details. Only include what is clearly stated or directly implied.]

THEIR CUSTOMERS: [Who does the prospect sell to? Be specific about industries, company sizes, job titles, demographics, characteristics. What triggers someone to need their services? Only include details evident from the data.]

INDUSTRY LANGUAGE: [Key terms, phrases, jargon, and language used in the prospect's industry that would resonate with them. Only include terms clearly relevant based on the data.]

POTENTIAL [USE CASES / MARKETING USE CASES]: [List 2-3 specific ways the client's services could help this prospect. Be specific to their business type. Only suggest use cases that logically follow from the data.]

POTENTIAL BUSINESS OUTCOME: [ONE specific, realistic, outcome-oriented result on a QUARTERLY basis. Specific to their business type. Use a number range when possible. Stop after the outcome — do NOT explain how it would be achieved. Do NOT add "by," "through," "via," or "leveraging" after the result. Under 15 words.]
```

### Use Case Framing by Client Type

**Lead gen / outbound agency:**
Use cases framed as: "Who could we reach out to on their behalf? [Job Title] at [Industry] — reason they'd be interested"
Business outcome: "source X–Y additional deals per quarter" style

**Marketing agency:**
Use cases framed as: "Strategy — how it applies to their specific business and the result it could drive"
Business outcome: "sign X–Y new contracts per quarter" style
CRITICAL: Constrain use cases to services the client actually offers. Do not reference services they don't have.

**Video production:**
Use cases framed as: "Type of video content — how it would help this specific business convert"
Business outcome: focus on conversion, brand awareness, or lead gen results

---

## Prompt 3: Email Copy

```
You are writing a cold email FROM [CLIENT COMPANY] TO this business, explaining how [CLIENT'S SERVICE CATEGORY] can help THEM [PRIMARY OUTCOME].

CONTEXT: [CLIENT COMPANY] provides [BRIEF DESCRIPTION]. The prospect does NOT need to know all of this yet. Focus on the result and the ideas.

DATA:
Lead Info: {{ lead info }}

INSTRUCTIONS: Write a short, punchy cold email. The body before the CTA should be under 50 words. Ideas must be condensed to one short phrase each — no full sentences.

FIRST LINE — RESULT PROMISE:
[Choose Option A or B based on the client:]

Option A (enrichment-driven): Pull the POTENTIAL BUSINESS OUTCOME directly from the lead info. Use it as-is — do not rewrite it or add to it.

Option B (templated with variation): Based on the business type, select the most natural-sounding outcome from these options:
- [LIST CLIENT-SPECIFIC OUTCOME FORMATS]
ALWAYS include the word "additional" to show this is incremental.
ALWAYS use "[per month / per quarter]" as the timeframe.

OPENING LINE: For the very first words of the email, randomly pick ONE of the following and write it directly into the email. Do not default to the first option. Distribute evenly across all options:
[LIST 5–6 OPENING VARIATIONS — see library below]

THE THREE IDEAS:
Pull from the POTENTIAL USE CASES in the lead info. Condense each idea into one short punchy phrase — 10 words max per idea.

CRITICAL: The ideas MUST only reference services that [CLIENT COMPANY] actually provides:
✅ [List what's in scope]
❌ Do NOT reference: [List what's out of scope]

Format each idea with a "-" (hyphen/dash).

CRITICAL FORMATTING:
Start with: "[opening] [result] by:"
[BLANK LINE]
- [Idea 1]
[BLANK LINE]
- [Idea 2]
[BLANK LINE]
- [Idea 3]
[BLANK LINE]
[CTA paragraph]

IMPORTANT: Only ONE blank line between each element, never two.

CTA:
[CUSTOMIZE PER CLIENT — see CTA library below]

TONE: Direct and conversational. Peer-to-peer. Not corporate, not salesy. Write like a business owner talking to another business owner.

CRITICAL: Do NOT mention [CLIENT COMPANY] by name anywhere in the email. Do NOT list all services. The ideas should feel like they came from someone who actually looked at their business.
```

---

## Opening Line Library

### Marketing agency (softer, consultative):
1. "I think we could help you"
2. "From what I can see, it looks like we could help you"
3. "It looks like we might be able to help you"
4. "My team and I could help you"
5. "I think my team could help you"
6. "From what I can tell, we could help you"

### Lead gen / outbound agency (more direct):
1. "We can help you land"
2. "My team can help you get"
3. "Our team can help you bring in"
4. "We can help you bring in"
5. "My team and I can help you land"

### SaaS / product company:
1. "Looks like you might benefit from"
2. "I think we could help you with"
3. "From what I can tell, we could help you"
4. "My team built something that could help you"

---

## CTA Library

### Holistic service CTA (marketing agency):
"If you'd be open to a brief call, I'll show you how we package all of this together as one marketing system for your [business type] — what strategy we'd use, results we typically see, and the full approach — even if you just want to take the strategies and run with them yourself."

### Risk reversal CTA (lead gen / outbound):
"On a brief call, I'll walk you through exactly how we did it and what applies to [business type] like yours — even if you just want to take the strategy and run with it yourself."

### Consulting-value CTA:
"If you'd be open to a quick intro, I'll break down what this would look like for your [business type] — the strategy, what kind of results to expect, and exactly how it works — even if you just want the playbook to use with your own team."

### Simple CTA:
"Worth a quick call to see how we're doing this for [business type]?"

---

## P.S. Lines (Added in Sequencer — Not in AI Prompts)

### Cost anchor:
```
P.S. {{random|We built this|We designed this|We put this together|This was built}} {{random|specifically for|intentionally for|for}} businesses your size - {{random|the whole thing costs less than one marketing hire|all for less than the cost of a single new hire|everything included for less than you'd pay one marketing employee|the entire program runs less than what you'd spend on one hire}}.
```

### Social proof:
```
P.S. {{random|We just did this for|We recently did this for|Built this for}} a similar [business type] - {{random|they saw|they hit|results were}} [SPECIFIC METRIC].
```

### Freebie / lead magnet:
```
P.S. {{random|Happy to send over|I can share|Want me to send}} a one-pager that {{random|covers|breaks down|goes over}} everything {{random|that's included|you get|and how it works}} - {{random|just say the word|just let me know|no strings}}.
```

---

## Follow-Up Templates (For Sequencer — Not AI Prompts)

This one-pager template is for a static asset (PDF, doc). If the lead magnet is an AI-generated mockup/preview image instead (a "Sneak Peek"), use `CCS-sneak-peek-case-builder` for the tease/reveal/book-a-call set instead of this template.

### Lead magnet / one-pager offer (thread reply):
```
{{first_name}} - {{random|if it's easier|if it helps|if you'd rather see it first|if that's easier}}, I can {{random|send over|shoot you|share|pass along}} a one-pager that {{random|breaks down|goes over|covers|lays out}} everything that's included and {{random|how it all works|what you actually get|how we set it up|how it comes together}}.

{{random|If it makes sense after that, happy to set up a time to chat.|If it looks like a fit, we can set up a quick call from there.|And if you think it's worth a conversation after that, we'll set something up.|If anything stands out, we can go from there.}}
```

### Right person? (thread reply):
```
Am I {{random|reaching out to|contacting|getting in touch with}} the right person to {{random|chat|talk|discuss}} about [TOPIC] {{random|at|for}} {COMPANY}, {{first_name}}?

- {{sender_signature}}
```

### Warm float back up (thread reply):
```
{{random|Floating this back up|Just following up}}, {{first_name}}.

{{random|If this isn't a priority right now, no worries.|If this isn't on your radar right now, totally understand.}} {{random|But if it is|If it's worth exploring}}, {{random|happy to show you what we built|can show you how this works}}.

{{random|Either way|No pressure}},
{{sender_signature}}
```

### Soft breakup (thread reply):
```
{{random|Hey|Hi}} {{first_name}},

{{random|Was hoping to connect|Still interested in chatting}} - is [TOPIC] something {COMPANY} is {{random|focused on right now|thinking about right now|prioritizing}}?

{{random|Either way, no worries.|If not, totally understand.}}

- {{sender_signature}}
```

---

## Output Format

When building prompts for a new client, output all three in order with clear headers:

```
--- PROMPT 1: QUALIFICATION ---
[full prompt text, ready to paste]

--- PROMPT 2: LEAD INFO ---
[full prompt text, ready to paste]

--- PROMPT 3: EMAIL COPY ---
[full prompt text, ready to paste]
```

Each prompt should be complete and ready to paste directly into Lead Formatter with no further editing needed. All `{{ }}` variables map directly to Lead Formatter column names.

---

## Variable Syntax

All prompts use **Lead Formatter syntax** by default: `{{ Variable Name }}` — double curly braces with a space inside on each side. Always output this format unless the user specifically says they are using a different tool.

**Standard Lead Formatter variables used in these prompts:**
- `{{ Company Product and Services }}` — company keywords / products and services
- `{{ Company SEO Description }}` — SEO meta description
- `{{ Company Description }}` — short company description
- `{{ Company Headcount }}` — employee count (include only when available)
- `{{ lead info }}` — the enriched lead info column output (used in email copy prompt)

---

## Rules

- Always build all three prompts together unless told otherwise
- Prompt 2 output should NEVER mention the client company — only describe the prospect
- Email ideas must be constrained to what the client actually offers — never suggest services outside their scope
- The "Potential Business Outcome" in Prompt 2 must stop at the result — no explanation of how
- Spacing in Prompt 3 output is critical: one blank line between every element, never two
- Do NOT mention the client company name in the cold email body
- As real prompt examples are added to this skill, prioritize them as reference over the generic templates
