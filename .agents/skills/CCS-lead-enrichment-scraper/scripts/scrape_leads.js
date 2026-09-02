// CCS Lead Enrichment Scraper (Jina AI Reader)
// Usage: node scrape_leads.js "path/to/cleaned.csv" ["JINA_API_KEY"]
//
// For each lead, scrapes the company homepage plus (best-effort) an about,
// team, and services/solutions page via Jina Reader, and appends everything
// as ONE new "Website Scrape" column. Requires Node 18+ (built-in fetch).
//
// Optional: pass a Jina API key as the second argument for higher rate
// limits. Works without one at low volume.

const fs = require("fs");
const path = require("path");

// --- Same RFC4180-safe CSV parser/writer used by the AI Ark CSV cleaner ---

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = text.length;
  while (i < len) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function escapeCSVField(value) {
  const v = value == null ? "" : String(value);
  if (/[",\n\r]/.test(v)) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

function writeCSV(rows) {
  return rows.map((r) => r.map(escapeCSVField).join(",")).join("\r\n");
}

// --- Column detection ---

function findColumn(header, keywords) {
  const lower = header.map((h) => h.trim().toLowerCase());
  return lower.findIndex((h) => keywords.some((k) => h.includes(k)));
}

// --- Jina Reader fetch ---

const JINA_PREFIX = "https://r.jina.ai/";

async function jinaFetch(url, apiKey) {
  const headers = {};
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(JINA_PREFIX + url, {
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 6000); // cap per-page text so the CSV doesn't explode
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

const PAGE_PATTERNS = {
  about: [/about-us/, /about/, /who-we-are/, /company/],
  team: [/our-team/, /team/, /leadership/, /people/],
  services: [/services/, /solutions/, /what-we-do/, /products/],
};

function extractLinks(markdown, baseHost) {
  const linkRe = /\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g;
  const links = new Set();
  let m;
  while ((m = linkRe.exec(markdown)) !== null) {
    try {
      const u = new URL(m[1]);
      if (u.hostname.replace(/^www\./, "") === baseHost.replace(/^www\./, "")) {
        links.add(m[1]);
      }
    } catch {
      // ignore malformed URLs
    }
  }
  return Array.from(links);
}

function pickPageForCategory(links, category) {
  const patterns = PAGE_PATTERNS[category];
  for (const pattern of patterns) {
    const match = links.find((l) => pattern.test(l.toLowerCase()));
    if (match) return match;
  }
  return null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeLead(domain, apiKey) {
  const url = /^https?:\/\//i.test(domain) ? domain : `https://${domain}`;
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }

  const sections = [];

  const homepage = await jinaFetch(url, apiKey);
  if (!homepage) return null; // couldn't reach the site at all
  sections.push(`HOMEPAGE:\n${homepage}`);

  const links = extractLinks(homepage, host);

  for (const category of ["about", "team", "services"]) {
    const pageUrl = pickPageForCategory(links, category);
    if (!pageUrl) continue;
    await sleep(400);
    const text = await jinaFetch(pageUrl, apiKey);
    if (text) sections.push(`${category.toUpperCase()}:\n${text}`);
  }

  return sections.join("\n\n---\n\n");
}

async function main() {
  const inputPath = process.argv[2];
  const apiKey = process.argv[3] || process.env.JINA_API_KEY || "";

  if (!inputPath) {
    console.error('Usage: node scrape_leads.js "path/to/cleaned.csv" ["JINA_API_KEY"]');
    process.exit(1);
  }
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }
  if (typeof fetch !== "function") {
    console.error("This script needs Node.js 18 or later (built-in fetch). Check your version with: node --version");
    process.exit(1);
  }

  let text = fs.readFileSync(inputPath, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const allRows = parseCSV(text).filter((r) => !(r.length === 1 && r[0].trim() === ""));
  const header = allRows[0];
  const dataRows = allRows.slice(1);

  const websiteIdx = findColumn(header, ["website", "domain", "url"]);
  if (websiteIdx === -1) {
    console.error(`Could not find a website/domain column. Headers found: ${header.join(", ")}`);
    process.exit(1);
  }

  const outHeader = [...header, "Website Scrape"];
  const inputDir = path.dirname(inputPath);
  const inputBase = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(inputDir, `${inputBase}_scraped.csv`);

  const outRows = [];
  let scraped = 0;
  let skippedNoWebsite = 0;
  let failed = 0;

  for (let idx = 0; idx < dataRows.length; idx++) {
    const row = dataRows[idx];
    const domain = (row[websiteIdx] || "").trim();

    if (!domain) {
      outRows.push([...row, ""]);
      skippedNoWebsite++;
      continue;
    }

    process.stdout.write(`[${idx + 1}/${dataRows.length}] ${domain} ... `);
    const result = await scrapeLead(domain, apiKey);
    if (result) {
      outRows.push([...row, result]);
      scraped++;
      console.log("ok");
    } else {
      outRows.push([...row, ""]);
      failed++;
      console.log("skipped (unreachable)");
    }

    // Checkpoint every 25 leads so a crash mid-run doesn't lose everything.
    if ((idx + 1) % 25 === 0 || idx === dataRows.length - 1) {
      fs.writeFileSync(outputPath, writeCSV([outHeader, ...outRows]), "utf8");
    }

    await sleep(300);
  }

  console.log("");
  console.log(`Total leads: ${dataRows.length}`);
  console.log(`Scraped successfully: ${scraped}`);
  console.log(`No website on file: ${skippedNoWebsite}`);
  console.log(`Unreachable / failed: ${failed}`);
  console.log(`Saved to: ${outputPath}`);
}

main();
