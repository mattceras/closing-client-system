import { resolve4 } from "node:dns/promises";
import {
  dateWindow,
  formatPercent,
  getDomainStats,
  getWorkspaces,
  listEmailAccounts,
  loadCredentials,
  markdownTable,
  parseCommonArgs,
  requirePlusVibe
} from "./lib/plusvibe.mjs";

const args = parseCommonArgs(process.argv.slice(2));
if (args.help) {
  console.log("Usage: node scripts/run-domain-health.mjs [--client client-folder-name]");
  process.exit(0);
}

try {
  const credentials = await loadCredentials(args.client);
  const { apiKey, workspaceIds } = requirePlusVibe(credentials);
  const workspaces = await getWorkspaces(apiKey, workspaceIds);
  if (workspaces.length === 0) throw new Error("The PlusVibe key did not return any workspaces.");

  const domainLocations = [];
  for (const workspace of workspaces) {
    const accounts = await listEmailAccounts(apiKey, workspace.id);
    const domains = [...new Set(accounts.map((account) => domainFromEmail(account.email)).filter(Boolean))].sort();
    for (const domain of domains) domainLocations.push({ workspace, domain });
  }
  if (domainLocations.length === 0) throw new Error("No sending domains were found in the selected PlusVibe workspaces.");

  const uniqueDomains = [...new Set(domainLocations.map((item) => item.domain))];
  console.log(`Checking ${uniqueDomains.length} sending domains across ${workspaces.length} workspace(s)...`);
  const blacklistByDomain = new Map();
  for (const domain of uniqueDomains) blacklistByDomain.set(domain, await checkBlacklists(domain));

  const rows = [];
  const flagged = [];
  for (const location of domainLocations) {
    const windows = [];
    for (const days of [7, 14, 30]) {
      const dates = dateWindow(days);
      const response = await getDomainStats(apiKey, location.workspace.id, location.domain, dates.startDate, dates.endDate);
      const header = response?.header ?? {};
      windows.push({
        days,
        sent: number(header.total_sent_count),
        humanRate: number(header.reply_rate),
        totalRate: number(header.reply_rate_with_ooo)
      });
    }
    const trend = assessTrend(windows);
    const blacklist = blacklistByDomain.get(location.domain);
    if (blacklist.status !== "clear" || trend !== "stable") flagged.push({ ...location, blacklist, trend });
    const [seven, fourteen, thirty] = windows;
    rows.push([
      location.workspace.name,
      location.domain,
      blacklist.label,
      trend,
      seven.sent,
      formatPercent(seven.humanRate),
      formatPercent(seven.totalRate),
      fourteen.sent,
      formatPercent(fourteen.humanRate),
      formatPercent(fourteen.totalRate),
      thirty.sent,
      formatPercent(thirty.humanRate),
      formatPercent(thirty.totalRate)
    ]);
  }

  console.log("\n# Domain health report\n");
  console.log(markdownTable(
    ["Workspace", "Domain", "Blacklist", "Trend", "7d sent", "7d reply", "7d total", "14d sent", "14d reply", "14d total", "30d sent", "30d reply", "30d total"],
    rows
  ));
  console.log("\nReply = human reply rate. Total = reply rate including out-of-office replies. A 7-day trend needs at least 500 sent emails; otherwise it is marked low volume.");
  console.log(`\nReview queue: ${flagged.length} of ${rows.length} workspace/domain rows.`);
  for (const item of flagged) {
    const details = item.blacklist.hits.length ? ` (${item.blacklist.hits.join(", ")})` : "";
    console.log(`- ${item.workspace.name} / ${item.domain}: blacklist ${item.blacklist.status}${details}; trend ${item.trend}`);
  }
} catch (error) {
  console.error(`Domain health check stopped: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function domainFromEmail(email) {
  const value = String(email ?? "").trim().toLowerCase();
  const at = value.lastIndexOf("@");
  return at > 0 ? value.slice(at + 1) : "";
}

function number(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function assessTrend(windows) {
  const [seven, fourteen, thirty] = windows;
  if (thirty.sent === 0) return "inactive";
  if (seven.sent < 500) return "low volume";
  const humanDeclining = seven.humanRate < fourteen.humanRate && fourteen.humanRate < thirty.humanRate;
  const totalDeclining = seven.totalRate < fourteen.totalRate && fourteen.totalRate < thirty.totalRate;
  if (humanDeclining && totalDeclining) return "declining";
  const humanWatch = thirty.humanRate - seven.humanRate >= 1 && seven.humanRate <= thirty.humanRate * 0.6;
  const totalWatch = thirty.totalRate - seven.totalRate >= 1 && seven.totalRate <= thirty.totalRate * 0.6;
  return humanWatch || totalWatch ? "watch" : "stable";
}

async function checkBlacklists(domain) {
  const sources = [
    { name: "URIBL", zone: "multi.uribl.com", test: "test.uribl.com", valid: (answers) => answers.includes("127.0.0.14") },
    { name: "SURBL", zone: "multi.surbl.org", test: "surbl-org-permanent-test-point.com", valid: (answers) => answers.includes("127.0.0.126") || answers.includes("127.0.0.254") }
  ];
  const hits = [];
  const errors = [];
  for (const source of sources) {
    try {
      const testAnswers = await withTimeout(resolve4(`${source.test}.${source.zone}`), 8_000);
      if (!source.valid(testAnswers) || testAnswers.includes("127.0.0.1") || testAnswers.includes("127.0.0.255")) {
        errors.push(`${source.name} unavailable`);
        continue;
      }
      try {
        const answers = await withTimeout(resolve4(`${domain}.${source.zone}`), 8_000);
        if (answers.length) hits.push(`${source.name}: ${answers.join(",")}`);
      } catch (error) {
        if (!notListed(error)) errors.push(`${source.name}: ${shortError(error)}`);
      }
    } catch (error) {
      errors.push(`${source.name}: ${shortError(error)}`);
    }
  }
  if (hits.length) return { status: "listed", label: "LISTED", hits, errors };
  if (errors.length) return { status: "unknown", label: "UNKNOWN", hits, errors };
  return { status: "clear", label: "clear", hits, errors };
}

function notListed(error) {
  return ["ENOTFOUND", "ENODATA", "NXDOMAIN", "NOTFOUND"].includes(String(error?.code ?? ""));
}

function shortError(error) {
  return error instanceof Error ? error.message.slice(0, 120) : "DNS error";
}

async function withTimeout(promise, timeoutMs) {
  let timeout;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error("DNS timeout")), timeoutMs); })
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
