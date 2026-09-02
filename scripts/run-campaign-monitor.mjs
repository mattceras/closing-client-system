import {
  getLeadCounts,
  getWorkspaces,
  listCampaigns,
  loadCredentials,
  markdownTable,
  parseCommonArgs,
  requirePlusVibe
} from "./lib/plusvibe.mjs";

const args = parseCommonArgs(process.argv.slice(2));
if (args.help) {
  console.log("Usage: node scripts/run-campaign-monitor.mjs [--client client-folder-name] [--all]");
  process.exit(0);
}

try {
  const credentials = await loadCredentials(args.client);
  const { apiKey, workspaceIds } = requirePlusVibe(credentials);
  const lowThreshold = positiveInteger(credentials.CAMPAIGN_LOW_LEAD_THRESHOLD, 500);
  const criticalThreshold = positiveInteger(credentials.CAMPAIGN_CRITICAL_LEAD_THRESHOLD, 100);
  const workspaces = await getWorkspaces(apiKey, workspaceIds);
  const rows = [];
  const reviewQueue = [];

  for (const workspace of workspaces) {
    const campaigns = await listCampaigns(apiKey, workspace.id);
    const selected = campaigns.filter((campaign) => {
      const status = String(campaign.status ?? "UNKNOWN").toUpperCase();
      const isParent = !campaign.campaign_type || campaign.campaign_type === "parent";
      return isParent && (args.all || status === "ACTIVE");
    });
    for (const campaign of selected) {
      const id = String(campaign.id ?? campaign._id ?? "");
      if (!id) continue;
      const counts = await getLeadCounts(apiKey, workspace.id, id);
      const byStatus = new Map(counts.map((item) => [String(item.status ?? "UNKNOWN").toUpperCase(), number(item.count)]));
      const untouched = byStatus.get("NOT_CONTACTED") ?? 0;
      const status = String(campaign.status ?? "UNKNOWN").toUpperCase();
      const flag = status !== "ACTIVE"
        ? "not active"
        : untouched <= criticalThreshold
          ? "CRITICAL"
          : untouched <= lowThreshold
            ? "LOW"
            : "healthy";
      if (flag === "CRITICAL" || flag === "LOW") reviewQueue.push({ workspace, campaign, untouched, flag });
      rows.push([
        workspace.name,
        campaign.camp_name ?? campaign.name ?? id,
        status,
        untouched,
        byStatus.get("CONTACTED") ?? 0,
        byStatus.get("REPLIED") ?? number(campaign.replied_count),
        byStatus.get("COMPLETED") ?? number(campaign.completed_lead_count),
        flag
      ]);
    }
  }

  console.log("# Campaign lead monitor\n");
  if (rows.length === 0) {
    console.log(args.all ? "No campaigns were returned." : "No active campaigns were returned. Ask to include paused campaigns if you want a full inventory.");
  } else {
    console.log(markdownTable(
      ["Workspace", "Campaign", "Status", "Untouched leads", "Contacted", "Replied", "Completed", "Flag"],
      rows
    ));
  }
  console.log(`\nThresholds: LOW at ${lowThreshold} untouched leads or fewer; CRITICAL at ${criticalThreshold} or fewer. This is a read-only report and never pauses, activates, or edits a campaign.`);
  console.log(`\nReview queue: ${reviewQueue.length} active campaign(s).`);
  for (const item of reviewQueue) {
    console.log(`- ${item.flag}: ${item.workspace.name} / ${item.campaign.camp_name ?? item.campaign.name ?? item.campaign.id} has ${item.untouched} untouched leads.`);
  }
} catch (error) {
  console.error(`Campaign monitor stopped: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function number(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}
