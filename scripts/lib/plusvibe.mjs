import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_BASE = "https://api.plusvibe.ai/api/v1";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
let lastRequestAt = 0;

export function repositoryRoot() {
  return rootDir;
}

export async function loadCredentials(clientName = "") {
  const account = await readEnvFile(path.join(rootDir, "config", ".env"));
  const client = clientName
    ? await readEnvFile(path.join(rootDir, "clients", clientName, "credentials.env"))
    : {};
  const nonBlankClientValues = Object.fromEntries(Object.entries(client).filter(([, value]) => value !== ""));
  const runtimeValues = Object.fromEntries(knownKeys
    .filter((key) => typeof process.env[key] === "string" && process.env[key] !== "")
    .map((key) => [key, process.env[key]]));
  return { ...account, ...nonBlankClientValues, ...runtimeValues };
}

const knownKeys = [
  "PLUSVIBE_API_KEY", "PLUSVIBE_WORKSPACE_ID", "PLUSVIBE_WORKSPACE_IDS",
  "CAMPAIGN_LOW_LEAD_THRESHOLD", "CAMPAIGN_CRITICAL_LEAD_THRESHOLD",
  "SMARTLEAD_API_KEY", "EMAILBISON_API_KEY", "INSTANTLY_API_KEY",
  "AI_ARK_API_KEY", "JINA_API_KEY", "BRAVE_SEARCH_API_KEY", "EXA_API_KEY",
  "X_BEARER_TOKEN", "GOOGLE_CUSTOM_SEARCH_API_KEY", "GOOGLE_CUSTOM_SEARCH_ENGINE_ID",
  "NEWSAPI_KEY", "GNEWS_API_KEY", "APOLLO_API_KEY"
];

export function parseCommonArgs(argv) {
  const result = { client: "", all: false, help: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--client") result.client = argv[++index] ?? "";
    else if (arg === "--all") result.all = true;
    else if (arg === "--help" || arg === "-h") result.help = true;
  }
  return result;
}

export async function getWorkspaces(apiKey, configuredIds = "") {
  const response = await requestJson(apiKey, "/authenticate");
  const workspaces = arrayFrom(response, ["workspaces", "data"])
    .map((item) => ({ id: String(item?._id ?? item?.id ?? ""), name: String(item?.name ?? "Unnamed workspace") }))
    .filter((item) => item.id);
  const selectedIds = configuredIds.split(",").map((value) => value.trim()).filter(Boolean);
  if (selectedIds.length === 0) return workspaces;
  const byId = new Map(workspaces.map((workspace) => [workspace.id, workspace]));
  return selectedIds.map((id) => byId.get(id) ?? { id, name: id });
}

export async function listEmailAccounts(apiKey, workspaceId) {
  const results = [];
  const limit = 100;
  for (let skip = 0; ; skip += limit) {
    const response = await requestJson(apiKey, "/account/list", { workspace_id: workspaceId, skip, limit });
    const accounts = arrayFrom(response, ["accounts", "data"]);
    results.push(...accounts);
    if (accounts.length < limit) return results;
  }
}

export async function getDomainStats(apiKey, workspaceId, domain, startDate, endDate) {
  return requestJson(apiKey, "/account/email-stats", {
    workspace_id: workspaceId,
    domain,
    start_date: startDate,
    end_date: endDate
  });
}

export async function listCampaigns(apiKey, workspaceId, status = "") {
  const results = [];
  const limit = 100;
  for (let skip = 0; ; skip += limit) {
    const response = await requestJson(apiKey, "/campaign/list-all", {
      workspace_id: workspaceId,
      ...(status ? { status } : {}),
      skip,
      limit
    });
    const campaigns = arrayFrom(response, ["campaigns", "data", "results"]);
    results.push(...campaigns);
    if (campaigns.length < limit) return results;
  }
}

export async function getLeadCounts(apiKey, workspaceId, campaignId) {
  const response = await requestJson(apiKey, "/lead/count/lead-status", {
    workspace_id: workspaceId,
    campaign_id: campaignId
  });
  return arrayFrom(response, ["data", "counts"]);
}

export function requirePlusVibe(credentials) {
  const apiKey = credentials.PLUSVIBE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("PlusVibe is not connected yet. Ask the assistant to save your PlusVibe API key in config/.env; do not paste it into a skill or tracked file.");
  }
  const workspaceIds = credentials.PLUSVIBE_WORKSPACE_IDS?.trim()
    || credentials.PLUSVIBE_WORKSPACE_ID?.trim()
    || "";
  return { apiKey, workspaceIds };
}

export function dateWindow(days, endDate = yesterdayUtc()) {
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return { startDate: start.toISOString().slice(0, 10), endDate };
}

export function formatPercent(value) {
  const number = Number(value ?? 0);
  return `${Number.isFinite(number) ? Math.round(number * 10) / 10 : 0}%`;
}

export function markdownTable(headers, rows) {
  const clean = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
  const lines = [
    `| ${headers.map(clean).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`
  ];
  for (const row of rows) lines.push(`| ${row.map(clean).join(" | ")} |`);
  return lines.join("\n");
}

async function requestJson(apiKey, endpoint, params = {}) {
  const url = new URL(`${API_BASE}${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== "" && value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const wait = 250 - (Date.now() - lastRequestAt);
    if (wait > 0) await delay(wait);
    lastRequestAt = Date.now();
    try {
      const response = await fetch(url, {
        headers: { "x-api-key": apiKey, accept: "application/json", "user-agent": "ClosingClientSystem/1.2" },
        signal: AbortSignal.timeout(30_000)
      });
      const body = await response.text();
      if (response.ok) return body ? JSON.parse(body) : {};
      if (response.status !== 429 && response.status < 500) {
        throw new Error(`PlusVibe request failed (${response.status}): ${body.slice(0, 240)}`);
      }
      lastError = new Error(`PlusVibe temporarily failed (${response.status}).`);
    } catch (error) {
      lastError = error;
    }
    await delay(Math.min(1_000 * 2 ** attempt, 15_000));
  }
  throw lastError instanceof Error ? lastError : new Error("PlusVibe request failed.");
}

function arrayFrom(value, keys) {
  if (Array.isArray(value)) return value;
  for (const key of keys) if (Array.isArray(value?.[key])) return value[key];
  if (value && typeof value === "object" && (value.id || value._id || value.status)) return [value];
  return [];
}

async function readEnvFile(filePath) {
  let content;
  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return {};
    throw error;
  }
  const result = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const equals = line.indexOf("=");
    if (equals < 1) continue;
    const key = line.slice(0, equals).trim();
    let value = line.slice(equals + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function yesterdayUtc() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
