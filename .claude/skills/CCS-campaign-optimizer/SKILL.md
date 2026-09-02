---
name: CCS-campaign-optimizer
description: Analyze cold-email variation performance, distinguish confirmed winners from directional leaders, preserve the winner as a control, and design the next focused challenger. Use when the user says "run the campaign optimizer," asks which variation won, or wants campaigns to improve from their own results.
---

# Campaign Optimizer

Run a disciplined learn-and-iterate loop. "Self-improving" means that the system analyzes results, records what was learned, and proposes the next controlled test. It does not silently rewrite or activate campaigns.

## Default command

When the user says **Run the campaign optimizer**:

1. Read `agency-profile.md` and the matching client profile.
2. Identify the campaign and analysis window. Default to active campaigns over the last 30 complete days when the user does not specify either.
3. For PlusVibe, run `node scripts/run-campaign-optimizer.mjs`. Add `--campaign <name-or-id>`, `--client <client-folder>`, `--days <number|all>`, or `--all` when needed.
4. For another sequencer, request or retrieve equivalent variation-level sent, reply, and positive-reply counts, then apply the same decision rules manually.
5. Present the evidence and verdict before drafting anything.
6. If a challenger is warranted, read `CCS-cold-email` and `CCS-email-script-frameworks` before writing it.
7. Obtain explicit approval before uploading or changing a campaign. Never activate a campaign.

## Decision rules

- Compare variations only within the same campaign step. A follow-up and an initial email are different experiments.
- Primary metric: positive replies divided by sent emails.
- Diagnostic metric: human replies divided by sent emails.
- Ignore opens for winner selection; open tracking may be disabled or unreliable.
- Default sample floor: 500 sent emails per variation.
- A `winner` must clear the sample floor, the configured minimum practical lift, and non-overlapping 95% Wilson intervals versus the runner-up.
- A `directional_leader` is promising but stays unconfirmed.
- `insufficient_data`, `no_test`, and `no_detectable_difference` are valid outcomes. Do not force a winner.
- Check for unequal allocation, list/segment changes, sender problems, date contamination, and edits made during the run before trusting the result.

These rules are deliberately conservative. Students may configure the sample floor and minimum practical lift privately, but lowering them does not create certainty.

## Iteration loop

1. **Freeze the evidence:** Record campaign, dates, audience, offer, step, variation copy, sent, replies, positive replies, and verdict.
2. **Diagnose the mechanism:** Explain which difference may have helped: hook, problem framing, proof, offer, CTA, specificity, length, or subject. If several changed, call the result a bundle and do not claim which element caused it.
3. **Preserve the control:** Keep the confirmed winner unchanged in the next round.
4. **Write one focused challenger:** Change one strategic variable and state the hypothesis: "We believe [change] will improve [metric] because [reason]."
5. **Pre-register the test:** Record primary metric, guardrails, sample floor, minimum meaningful lift, intended allocation, and stopping rule before launch.
6. **Review and upload:** Show the exact control and challenger. Upload only after approval, and never activate automatically.
7. **Learn:** After the next run, record whether the hypothesis won, lost, or remained inconclusive. Promote reusable principles, not isolated wording.

## Private campaign memory

Create and maintain these ignored student-owned files when the workflow is first used:

- `campaign-intelligence/experiment-log.md` — every test, including inconclusive tests.
- `campaign-intelligence/winning-patterns.md` — patterns supported across more than one credible test.
- `campaign-intelligence/failed-tests.md` — changes that repeatedly failed or harmed the primary metric.

Do not store client-specific campaign data inside tracked skills or system documentation.

## Output

Return:

- campaign, step, analysis window, and data-quality notes;
- variation table with sent, reply rate, positive-reply rate, and confidence range;
- verdict: confirmed winner, directional leader, insufficient data, no test, or no detectable difference;
- what can and cannot be inferred;
- control copy;
- one focused challenger and its hypothesis;
- required sample, stopping rule, and next review point;
- the exact learning recorded in campaign memory.

## Hard stops

- Do not compare variants exposed to materially different audiences or time periods as though they were randomized.
- Do not replace or edit the control during a live test.
- Do not stop early merely because the current leader looks attractive.
- Do not generate a challenger from an inconclusive result unless it is clearly labeled exploratory.
- Do not auto-disable, delete, upload, or activate any variation.
