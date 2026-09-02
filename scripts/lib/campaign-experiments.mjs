export function analyzeStep(step, options = {}) {
  const minimumSent = positiveNumber(options.minimumSent, 500);
  const minimumAbsoluteLift = positiveNumber(options.minimumAbsoluteLift, 0.5);
  const variations = (step.variations ?? []).map(normalizeVariation);
  const eligible = variations
    .filter((item) => item.isActive && !item.isDeleted && item.sent >= minimumSent)
    .sort((a, b) => b.positiveReplyRate - a.positiveReplyRate || b.sent - a.sent);

  if (variations.filter((item) => item.isActive && !item.isDeleted).length < 2) {
    return { status: "no_test", leader: null, variations, reason: "Fewer than two active variations are available in this step." };
  }
  if (eligible.length < 2) {
    return { status: "insufficient_data", leader: eligible[0] ?? null, variations, reason: `At least two variations need ${minimumSent} sent emails each.` };
  }

  const leader = eligible[0];
  const runnerUp = eligible[1];
  const absoluteLift = round(leader.positiveReplyRate - runnerUp.positiveReplyRate);
  if (leader.positiveReplies === 0 || absoluteLift <= 0) {
    return { status: "no_detectable_difference", leader, runnerUp, variations, absoluteLift, reason: "No positive-reply advantage is visible." };
  }

  const highestCompetingUpperBound = Math.max(...eligible.slice(1).map((item) => item.positiveReplyInterval.high));
  const intervalsSeparate = leader.positiveReplyInterval.low > highestCompetingUpperBound;
  if (intervalsSeparate && absoluteLift >= minimumAbsoluteLift) {
    return { status: "winner", leader, runnerUp, variations, absoluteLift, reason: "The leader clears the sample floor, minimum practical lift, and has a 95% Wilson interval above every other eligible variation." };
  }
  return { status: "directional_leader", leader, runnerUp, variations, absoluteLift, reason: "The observed leader is not yet strong enough to promote as a confirmed control." };
}

export function normalizeVariation(item) {
  const sent = count(item.sent);
  const replies = count(item.reply);
  const positiveReplies = count(item.pos_reply);
  return {
    label: String(item.variation ?? item.name ?? "?"),
    name: String(item.name ?? ""),
    sent,
    replies,
    positiveReplies,
    replyRate: rate(replies, sent),
    positiveReplyRate: rate(positiveReplies, sent),
    positiveReplyInterval: wilsonInterval(positiveReplies, sent),
    isActive: item.is_active !== false,
    isDeleted: item.is_del === true
  };
}

export function wilsonInterval(successes, trials, z = 1.96) {
  if (!Number.isFinite(trials) || trials <= 0) return { low: 0, high: 0 };
  const n = trials;
  const p = Math.max(0, Math.min(successes, n)) / n;
  const denominator = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denominator;
  const margin = (z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n)) / denominator;
  return { low: round((center - margin) * 100), high: round((center + margin) * 100) };
}

function count(value) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) && number > 0 ? Math.round(number) : 0;
}

function rate(numerator, denominator) {
  return denominator > 0 ? round((numerator / denominator) * 100) : 0;
}

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function round(value) {
  return Math.round(value * 100) / 100;
}
