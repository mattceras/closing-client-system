import {
  dateWindow,
  formatPercent,
  getCampaignVariationStats,
  getWorkspaces,
  listCampaigns,
  loadCredentials,
  markdownTable,
  parseCommonArgs,
  requirePlusVibe
} from "./lib/plusvibe.mjs";
import { analyzeStep } from "./lib/campaign-experiments.mjs";

const common = parseCommonArgs(process.argv.slice(2));
const args = parseOptimizerArgs(process.argv.slice(2), common);
if (args.help) {
  console.log("Usage: node scripts/run-campaign-optimizer.mjs [--campaign name-or-id] [--days 30|all] [--client client-folder-name] [--all]");
  process.exit(0);
}

try {
  const credentials = await loadCredentials(args.client);
  const { apiKey, workspaceIds } = requirePlusVibe(credentials);
  const minimumSent = configuredNumber(credentials.CAMPAIGN_VARIATION_MIN_SENT, 500);
  const minimumAbsoluteLift = configuredNumber(credentials.CAMPAIGN_VARIATION_MIN_LIFT_PERCENTAGE_POINTS, 0.5);
  const workspaces = await getWorkspaces(apiKey, workspaceIds);
  const rows = [];
  const decisions = [];

  for (const workspace of workspaces) {
    const campaigns = await listCampaigns(apiKey, workspace.id);
    const selected = campaigns.filter((campaign) => includeCampaign(campaign, args));
    for (const campaign of selected) {
      const campaignId = String(campaign.id ?? campaign._id ?? "");
      if (!campaignId) continue;
      const range = args.days === "all" ? null : dateWindow(args.days);
      const steps = await getCampaignVariationStats(
        apiKey,
        workspace.id,
        campaignId,
        range?.startDate ?? "",
        range?.endDate ?? ""
      );
      for (const step of steps) {
        const analysis = analyzeStep(step, { minimumSent, minimumAbsoluteLift });
        for (const variation of analysis.variations) {
          const copy = findVariationCopy(campaign, step.step, variation.label);
          rows.push([
            workspace.name,
            campaign.camp_name ?? campaign.name ?? campaignId,
            step.step,
            variation.label,
            variation.isDeleted ? "deleted" : variation.isActive ? "active" : "inactive",
            variation.sent,
            variation.replies,
            formatPercent(variation.replyRate),
            variation.positiveReplies,
            formatPercent(variation.positiveReplyRate),
            `${variation.positiveReplyInterval.low}%–${variation.positiveReplyInterval.high}%`,
            copy.subject
          ]);
        }
        decisions.push({ workspace, campaign, step: step.step, analysis });
      }
    }
  }

  console.log("# Campaign variation optimizer\n");
  if (!rows.length) {
    console.log("No matching campaign variation data was returned.");
  } else {
    console.log(markdownTable(
      ["Workspace", "Campaign", "Step", "Variation", "State", "Sent", "Replies", "Reply rate", "Positive", "Positive rate", "95% range", "Subject"],
      rows
    ));
  }
  console.log(`\nPrimary metric: positive replies divided by sent emails. Minimum sample: ${minimumSent} sent per variation. Minimum practical lift: ${minimumAbsoluteLift} percentage points.`);
  console.log("Comparisons are made only within the same campaign step. Opens are ignored because open tracking may be disabled or unreliable.\n");

  for (const item of decisions) {
    const name = item.campaign.camp_name ?? item.campaign.name ?? item.campaign.id;
    const leader = item.analysis.leader ? ` Variation ${item.analysis.leader.label} leads at ${item.analysis.leader.positiveReplyRate}% positive replies.` : "";
    console.log(`- ${item.workspace.name} / ${name} / step ${item.step}: ${item.analysis.status}.${leader} ${item.analysis.reason}`);
    if (item.analysis.status === "winner" || item.analysis.status === "directional_leader") {
      const copy = findVariationCopy(item.campaign, item.step, item.analysis.leader.label);
      console.log(`  Current leader copy: subject "${copy.subject || "(threaded/no subject)"}"; body "${copy.bodyPreview}"`);
    }
  }
  console.log("\nThis report does not edit, deactivate, or upload any variation. The assistant must present the evidence, draft a challenger, and obtain approval before any external change.");
} catch (error) {
  console.error(`Campaign optimizer stopped: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseOptimizerArgs(argv, common) {
  const result = { ...common, campaign: "", days: 30 };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--campaign") result.campaign = argv[++index] ?? "";
    else if (argv[index] === "--days") {
      const value = argv[++index] ?? "30";
      result.days = value.toLowerCase() === "all" ? "all" : Math.max(1, Number.parseInt(value, 10) || 30);
    }
  }
  return result;
}

function includeCampaign(campaign, args) {
  const status = String(campaign.status ?? "UNKNOWN").toUpperCase();
  const isParent = !campaign.campaign_type || campaign.campaign_type === "parent";
  if (!isParent || (!args.all && status !== "ACTIVE")) return false;
  if (!args.campaign) return true;
  const needle = args.campaign.toLowerCase();
  return [campaign.id, campaign._id, campaign.camp_name, campaign.name]
    .some((value) => String(value ?? "").toLowerCase().includes(needle));
}

function findVariationCopy(campaign, stepNumber, label) {
  const step = (campaign.sequences ?? []).find((item) => Number(item.step) === Number(stepNumber));
  const variation = (step?.variations ?? []).find((item) => String(item.variation) === String(label));
  return {
    subject: cleanText(variation?.subject ?? "").slice(0, 100),
    bodyPreview: cleanText(variation?.body ?? "").slice(0, 240)
  };
}

function cleanText(value) {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().replaceAll("|", "\\|");
}

function configuredNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}
