# The Email Pattern

The structure below was arrived at by revision, not by theory. Each beat exists because a version without it got rejected. The failure notes are included so the same ground doesn't get relitigated.

---

## Four Beats

### 1. The offer, as a deliverable, in their own stated criteria

Not an observation about their market. Not a clever hook. **What they get.**

> We can put together a ranked list of companies that fit your box: control positions, $2-20mm of EBITDA, owner recapitalizations and management buyouts across business services, healthcare, niche manufacturing and software, narrowed to owners who aren't sitting in a banker's process yet.

The specificity is the personalization. Every clause is lifted from what that firm published. If this sentence would work on a different company, start over.

> **Failed version:** *"Microcap is where the good businesses are hardest to find."*
> Rejected as "too anecdotal." It is commentary about their world, not an offer. They already know their world. Lead with what you'll hand them.

### 2. What the product is, for someone who has never heard of it

Assume zero brand awareness. Name it and explain the mechanic plainly.

> The way we do it is a platform we built called [NAME]. It has already profiled more than [SCALE FACT], so instead of [the old way they work now] you [the new way], and it returns [the concrete output].

Include one scale fact that establishes the thing already exists and has done the work. Include the actual mechanic — what they type, what comes back.

> **Failed version:** *"[NAME] ranks every match against your thesis."*
> Rejected as "you're talking about it like they know what it is." Never reference the product as a known quantity.

### 3. Why it pays, in their economics

Not features. Money, or the thing money follows. This is the beat that gets the reply.

Good outcome lines are specific to that buyer's model:

- *"The deals you reach first don't get bid up. In your range that's often a full turn of EBITDA off the purchase price."*
- *"Add-ons sourced directly get bought well below what the platform itself will trade at, so every one you find off-market is arbitrage you keep at exit instead of paying away to a banker."*
- *"Whoever reaches the owner first is usually the only buyer in the conversation."*
- *"Reaching them directly means you're competing on structure and fit, which is your advantage, instead of on price."*

Each one names a mechanism the reader already believes. None of them describe the product.

> **Failed version:** *"ranked, with the evidence behind each one"* used as the payoff.
> That is a feature. It answers *what it does*, not *why they care*.

### 4. One soft CTA

> If you'd be open to a 20-30 minute intro call, I can run your box live and show you exactly what comes back.

Conditional, not interrogative. It offers to do something specific with *their* material. It is a statement, which keeps the email to one question total.

---

## Hard Rules

| Rule | Why |
|---|---|
| **One question maximum** | Two questions splits the ask. If the opener is a question, the close must be a statement. |
| **No em-dashes or en-dashes** | Reads as machine-written. Use commas or a full stop. |
| **130-170 words** | Shorter reads clipped and punchy to a professional buyer. Longer stops getting read. |
| **Never a `{{companyName}}` merge variable** | Instantly marks it as mail-merge. Reference what they *do* instead of naming them. |
| **No corporate jargon in follow-ups** | "Circling back," "closing the loop," "wrapping up," "touching base" — all out. |
| **Never invent a detail** | If the source material is thin, write more generally or reject the lead. |

---

## Calibrating Length to the Reader

Short and punchy is not universally better. A buyer who reads dense documents all day — a Managing Partner, a GC, a CFO — will read 160 words of substance and will discard 60 words of staccato that says nothing concrete.

Match the register to what that reader consumes professionally. The length ceiling is set by how fast the email stops earning attention, not by a rule.

---

## Mining Their Vocabulary

Before writing anything, frequency-count the language across all the descriptions in the segment. Write to what comes back, not to what the client says about themselves.

```bash
node scripts/pipeline.js language
```

A real result from one segment of 724 company descriptions:

```
236  middle market          47  family-owned
131  EBITDA                 40  proprietary
 93  lower middle market    34  succession
 93  platform               25  "independent sponsor"
 88  control                 2  off-market
                             1  deal flow
```

The client's own copy led with "proprietary, off-market deal flow." The segment used that phrasing **three times across 724 descriptions.** They talk in EBITDA bands, control positions, platforms, family-owned and succession.

Two conclusions came out of that table, and both changed the copy:

1. **Write in their register, not the client's.**
2. **Only 25 of 724 used the segment label the client had given them.** Don't open with a label the reader doesn't apply to themselves.

---

## Fully Worked Example

Generic shape, with the source material shown so the derivation is visible.

**Source (from their own site):** *"[FIRM] is a lower-middle market investment firm partnering with companies that support the Built Environment across the US and Canada. This universe includes design and engineering firms, specialty and trade contractors, operations and maintenance providers, and building products firms. Target investments include control positions in entrepreneur and family-owned businesses with revenue between $5 million and $60+ million and EBITDA between $1 million and $7+ million."*

**Email:**

> We can build you the full Built Environment universe in your range: design and engineering firms, specialty and trade contractors, O&M providers and building products companies at $5-60mm of revenue and $1-7mm of EBITDA, narrowed to entrepreneur and family-owned businesses.
>
> The way we do it is a platform we built called [NAME]. It has already profiled more than [SCALE FACT], so instead of depending on industry codes, which is exactly where a sector like yours falls apart, you describe the universe in plain English and it returns the companies that match, ranked, with the evidence behind each one and how to reach the owner.
>
> You focus on one industry, so you already read these businesses better than any seller's banker will. The constraint was never your judgment, it's reaching the owner before the banker does.
>
> If you'd be open to a 20-30 minute intro call, I can run the Built Environment thesis live and show you what comes back.

Note what beat 3 does: it pays the reader a genuine compliment that is *true and derived from the source*, then names the actual bottleneck. It doesn't mention a product feature.

---

## Follow-Ups

Generic bumps. No new pitch, no restating the offer, no new information. Thread replies with an empty subject so they land under the original.

**Step 2 — +2 days:**
- "Hey, just wanted to make sure you saw this."
- "Hey, wanted to make sure this didn't get buried."
- "Hey, just checking you saw this one."
- "Hey, bumping this in case it got lost."
- "Hey, just making sure this got to you."

**Step 3 — +1 day:**
- "Hey, just wanted to see if this was relevant for you."
- "Hey, is this something worth a look on your end?"
- "Hey, not sure if this is a fit. Let me know either way."
- "Hey, if this isn't for you just tell me and I'll stop."
- "Hey, worth a look or should I let it go?"

Five variations per step on round-robin. Signature only, no title block — the first email already established who is writing.
