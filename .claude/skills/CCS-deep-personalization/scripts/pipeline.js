#!/usr/bin/env node
/**
 * CCS Deep Personalization — pipeline
 *
 * Mechanical steps only. Writing the emails is Claude's job.
 * State lives in ./_dp/ next to wherever you run this.
 *
 *   node pipeline.js count      <list.csv>
 *   node pipeline.js triage     <list.csv>
 *   node pipeline.js scrape
 *   node pipeline.js classify
 *   node pipeline.js collisions
 *   node pipeline.js language
 *   node pipeline.js firms      [batchSize] [batchNum]
 *   node pipeline.js build      <emails.json> [out.csv]
 *
 * Configure the ICP test in _dp/config.json (written on first `triage`).
 */

const fs = require("fs");
const path = require("path");

const DIR = "./_dp";
const P = (f) => path.join(DIR, f);
const ensure = () => { if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true }); };
const load = (f) => JSON.parse(fs.readFileSync(P(f), "utf8"));
const save = (f, d) => { ensure(); fs.writeFileSync(P(f), JSON.stringify(d)); };

const DEFAULT_CONFIG = {
  _comment: "Edit icpPattern to match the ICP. Case-insensitive regex source.",
  icpPattern: "(private equity|invest(s|ing|ment|or)\\b|acquisi|acquire|buyout|portfolio compan|ebitda|middle.market|holding compan|family office|recapitaliz)",
  minDescriptionChars: 180,
  nameColumn: "Company Name",
  emailColumn: "Email",
  titleColumn: "Job title",
  domainColumn: "Company domain",
  descriptionColumns: ["Company Description", "Company Product and Services", "Company SEO Description"],
  placeholderEmployers: ["retired", "self", "self-employed", "none", "n/a", "freelance", "unemployed", "student"],
};
const cfg = () => (fs.existsSync(P("config.json")) ? load("config.json") : DEFAULT_CONFIG);

/* ---------- CSV ---------- */
function parseCSV(text) {
  const rows = []; let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const q = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;

function readList(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const rows = parseCSV(raw);
  const hdr = rows[0].map((h) => h.trim());
  const data = rows.slice(1).filter((r) => r.some((c) => c && c.trim()));
  return { hdr, data };
}
const mkCol = (hdr) => (r, n) => (r[hdr.indexOf(n)] || "").trim();
const cleanDomain = (d) => (d || "").replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").toLowerCase();

const RANK = [
  [/managing partner|founder|owner|managing principal|chief executive|^ceo\b/i, 6],
  [/partner|principal|president|chief|chairman/i, 5],
  [/managing director/i, 4],
  [/director/i, 3],
  [/vice president|^vp\b/i, 2],
];
const rank = (t) => (RANK.find(([re]) => re.test(t)) || [, 1])[1];

function dedupe(hdr, data, C) {
  const c = cfg();
  const by = new Map();
  for (const r of data) {
    const e = C(r, c.emailColumn).toLowerCase();
    if (!e) continue;
    const cur = by.get(e);
    if (!cur || rank(C(r, c.titleColumn)) > rank(C(cur, c.titleColumn))) by.set(e, r);
  }
  return [...by.values()];
}
const descOf = (C, r) => cfg().descriptionColumns.map((k) => C(r, k)).filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

/* ---------- commands ---------- */
const CMD = {};

CMD.count = (file) => {
  const { hdr, data } = readList(file);
  const C = mkCol(hdr); const c = cfg();
  const uniq = dedupe(hdr, data, C);
  const firms = new Set(uniq.map((r) => C(r, c.nameColumn).toLowerCase().trim()));
  console.log("rows in file      :", data.length, "  (never trust wc -l)");
  console.log("unique emails     :", uniq.length, ` (${data.length - uniq.length} duplicates)`);
  console.log("unique firms      :", firms.size);
  console.log("leads per firm    :", (uniq.length / firms.size).toFixed(2));
  console.log("\nemails to write   :", firms.size);
  console.log(firms.size <= 300 ? ">> TIER A: Claude writes them all." : ">> TIER B: exemplars + Lead Formatter.");
  console.log("\n=== FILL RATES ===");
  for (const h of hdr) {
    const n = uniq.filter((r) => C(r, h)).length;
    const pct = ((n / uniq.length) * 100).toFixed(0);
    console.log(`${pct === "0" ? "!! " : "   "}${h.padEnd(30).slice(0, 30)} ${pct}%`);
  }
};

CMD.triage = (file) => {
  ensure();
  if (!fs.existsSync(P("config.json"))) {
    fs.writeFileSync(P("config.json"), JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log("[wrote _dp/config.json — review icpPattern before continuing]\n");
  }
  const c = cfg();
  const { hdr, data } = readList(file);
  const C = mkCol(hdr);
  const uniq = dedupe(hdr, data, C);
  const icp = new RegExp(c.icpPattern, "i");
  const placeholder = new RegExp(`^\\s*(${c.placeholderEmployers.join("|")})\\s*$`, "i");

  const CUT = [], SCRAPE = [], WRITE = [];
  for (const r of uniq) {
    if (placeholder.test(C(r, c.nameColumn)) || /\bretired\b/i.test(C(r, c.titleColumn))) { CUT.push(r); continue; }
    const t = descOf(C, r);
    if (t.length >= c.minDescriptionChars && icp.test(t)) WRITE.push(r); else SCRAPE.push(r);
  }
  const domains = [...new Set(SCRAPE.map((r) => cleanDomain(C(r, c.domainColumn))).filter(Boolean))];
  save("state.json", { hdr, CUT, SCRAPE, WRITE });
  save("domains.json", domains);
  console.log("unique leads          :", uniq.length);
  console.log("CUT (placeholder)     :", CUT.length);
  console.log("WRITE (desc usable)   :", WRITE.length);
  console.log("SCRAPE (needs site)   :", SCRAPE.length);
  console.log("unique domains to hit :", domains.length, `  <- only ${domains.length}, not ${SCRAPE.length}`);
};

CMD.scrape = async () => {
  const domains = load("domains.json");
  const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
  const strip = (html) => {
    const g = (re) => (html.match(re) || [, ""])[1];
    const meta = g(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']{20,400})["']/i)
              || g(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']{20,400})["']/i);
    const body = html
      .replace(/<(script|style|noscript|nav|footer)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/&#?\w+;/g, " ").replace(/\s+/g, " ").trim();
    return { title: (g(/<title[^>]*>([^<]{2,160})<\/title>/i) || "").trim(), meta: meta || "", body: body.slice(0, 2200) };
  };
  const one = async (d) => {
    for (const url of [`https://${d}`, `https://www.${d}`, `http://${d}`]) {
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12000);
        const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow", signal: ctl.signal });
        clearTimeout(t);
        if (!res.ok || !/html/i.test(res.headers.get("content-type") || "")) continue;
        const p = strip(await res.text());
        if ((p.body || "").length < 60 && !p.meta) continue;
        return { domain: d, ok: true, ...p };
      } catch {}
    }
    return { domain: d, ok: false };
  };
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (i < domains.length) {
      const r = await one(domains[i++]); out.push(r);
      console.log(`[${out.length}/${domains.length}] ${r.ok ? "OK  " : "FAIL"} ${r.domain}`);
    }
  }));
  save("sites.json", out);
  const failed = out.filter((r) => !r.ok);
  console.log(`\n${out.length - failed.length}/${out.length} fetched.`);
  if (failed.length) {
    console.log(`\n${failed.length} failed. These are usually JS-rendered or bot-walled.`);
    console.log("Re-run them through context.dev via the `monid` skill (~$0.0009/page).");
    console.log("Ask for explicit approval before any paid run. Failed domains:");
    failed.forEach((r) => console.log("   " + r.domain));
  }
};

CMD.classify = () => {
  const c = cfg();
  const { hdr, CUT, SCRAPE, WRITE } = load("state.json");
  const C = mkCol(hdr);
  const sites = new Map(load("sites.json").filter((s) => s.ok).map((s) => [s.domain, s]));
  const icp = new RegExp(c.icpPattern, "i");
  const OK = [], NO = [], DEAD = [];
  for (const r of SCRAPE) {
    const s = sites.get(cleanDomain(C(r, c.domainColumn)));
    if (!s) { DEAD.push(r); continue; }
    (icp.test(`${s.title} ${s.meta} ${s.body}`) ? OK : NO).push({ r, site: s });
  }
  save("state.json", { hdr, CUT, WRITE, siteOK: OK, siteNO: NO.map((x) => x.r), DEAD });
  console.log("site says fits ICP :", OK.length);
  console.log("site says NOT      :", NO.length);
  console.log("unreachable        :", DEAD.length);
  console.log("\nTOTAL TO WRITE     :", WRITE.length + OK.length);
  console.log("\n!! Keyword classification has false positives both ways.");
  console.log("!! Claude must confirm fit per firm while writing, and reject rather than invent.");
};

CMD.collisions = () => {
  const c = cfg();
  const st = load("state.json"); const C = mkCol(st.hdr);
  if (!st.siteOK) {
    console.log("!! `classify` has not been run, so scraped leads are not in scope yet.");
    console.log("!! Collisions most often involve exactly those leads. Run scrape + classify first,");
    console.log("!! then re-run this. A clean result now does NOT mean the list is clean.\n");
  }
  const all = [...st.WRITE, ...(st.siteOK || []).map((x) => x.r)];
  const g = {};
  for (const r of all) {
    const k = C(r, c.nameColumn).toLowerCase().trim();
    (g[k] = g[k] || { doms: new Set(), n: 0 }).doms.add(cleanDomain(C(r, c.domainColumn)) || "(none)");
    g[k].n++;
  }
  const bad = Object.entries(g).filter(([, v]) => v.doms.size > 1).sort((a, b) => b[1].n - a[1].n);
  console.log("=== NAME COLLISIONS: one name, multiple domains ===");
  if (!bad.length) return console.log("none. safe to join on name.");
  bad.forEach(([k, v]) => console.log(`  ${k}  (${v.n} leads)\n     ${[...v.doms].join("   |   ")}`));
  console.log(`\n${bad.length} colliding name(s). Inspect each, split by domain, reject the impostors.`);
  console.log("Add impostor domains to _dp/impostors.json as a string array before `build`.");
};

CMD.language = () => {
  const c = cfg();
  const st = load("state.json"); const C = mkCol(st.hdr);
  const all = [...st.WRITE, ...(st.siteOK || []).map((x) => x.r)];
  const blob = all.map((r) => descOf(C, r)).join(" ").toLowerCase();
  const words = blob.match(/[a-z][a-z-]{3,}/g) || [];
  const stop = new Set("that with this from have their they which them been more over into your will them our we are for and the a of to in is as on by an at or be it its can has who whom you us".split(" "));
  const freq = {};
  words.forEach((w) => { if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1; });
  console.log("=== TOP SINGLE TERMS ===");
  Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 40)
    .forEach(([w, n]) => console.log(String(n).padStart(6) + "  " + w));
  const bigrams = {};
  for (let i = 0; i < words.length - 1; i++) {
    if (stop.has(words[i]) || stop.has(words[i + 1])) continue;
    const b = words[i] + " " + words[i + 1];
    bigrams[b] = (bigrams[b] || 0) + 1;
  }
  console.log("\n=== TOP PHRASES ===");
  Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, 30)
    .forEach(([w, n]) => console.log(String(n).padStart(6) + "  " + w));
  console.log("\nWrite in this vocabulary. Check the client's own phrasing against it.");
};

CMD.firms = (size = "25", num = "1") => {
  const c = cfg();
  const st = load("state.json"); const C = mkCol(st.hdr);
  const siteBy = new Map((st.siteOK || []).map((x) => [C(x.r, c.emailColumn), x.site]));
  const firms = new Map();
  const add = (r) => {
    const k = C(r, c.nameColumn).trim();
    if (!firms.has(k)) {
      const s = siteBy.get(C(r, c.emailColumn));
      firms.set(k, { n: 0, dom: C(r, c.domainColumn), src: s ? `${s.meta} ${s.body}`.replace(/\s+/g, " ").trim() : descOf(C, r) });
    }
    firms.get(k).n++;
  };
  st.WRITE.forEach(add); (st.siteOK || []).forEach((x) => add(x.r));
  const list = [...firms.entries()].sort((a, b) => b[1].n - a[1].n);
  const S = +size, N = +num, start = (N - 1) * S;
  const slice = list.slice(start, start + S);
  console.log(`### BATCH ${N} — firms ${start + 1}-${start + slice.length} of ${list.length} ###`);
  let acc = 0;
  slice.forEach(([k, v], i) => {
    acc += v.n;
    console.log(`\n[${start + i + 1}] ${k}  (${v.n} contacts)  ${v.dom}`);
    console.log("   " + v.src.slice(0, 700));
  });
  console.log(`\n[${acc} contacts in this batch]`);
};

CMD.build = (emailsFile, out = "personalized.csv") => {
  const c = cfg();
  const st = load("state.json"); const C = mkCol(st.hdr);
  const emails = {};
  for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(emailsFile, "utf8")))) emails[k.toLowerCase().trim()] = v;
  const impostors = new Set(fs.existsSync(P("impostors.json")) ? load("impostors.json") : []);

  const universe = [...st.WRITE, ...(st.siteOK || []).map((x) => x.r)];
  const matched = [], unmatched = [], imp = [];
  for (const r of universe) {
    if (impostors.has(cleanDomain(C(r, c.domainColumn)))) { imp.push(r); continue; }
    const k = C(r, c.nameColumn).toLowerCase().trim();
    if (emails[k]) matched.push({ r, email: emails[k] }); else unmatched.push(r);
  }

  const outHdr = [...st.hdr, "personalized_email"];
  const lines = [outHdr.map(q).join(",")];
  for (const { r, email } of matched) {
    lines.push([...st.hdr.map((h) => C(r, h)), email.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>")].map(q).join(","));
  }
  fs.writeFileSync(out, "﻿" + lines.join("\r\n"), "utf8");

  const rej = [["Company Name","First Name","Last Name","Job title","Email","Company domain","reason"].map(q).join(",")];
  const addRej = (rows, reason) => rows.forEach((r) => rej.push(
    [C(r, c.nameColumn), C(r, "First Name"), C(r, "Last Name"), C(r, c.titleColumn), C(r, c.emailColumn), C(r, c.domainColumn), reason].map(q).join(",")));
  addRej(st.CUT, "Placeholder employer / retired");
  addRej(st.siteNO || [], "Website confirms not a fit");
  addRej(st.DEAD || [], "No usable description and website unreachable");
  addRej(unmatched, "Reviewed and rejected: not a buyer");
  addRej(imp, "Name collision: different company sharing the firm name");
  const rejOut = out.replace(/\.csv$/, "") + "_REJECTS.csv";
  fs.writeFileSync(rejOut, "﻿" + rej.join("\r\n"), "utf8");

  const total = matched.length + rej.length - 1;
  console.log(`[WROTE] ${out}        ${matched.length} rows`);
  console.log(`[WROTE] ${rejOut}  ${rej.length - 1} rows`);
  console.log("\n=== QA ===");
  const wc = matched.map((m) => m.email.split(/\s+/).length);
  console.log("word count min/avg/max :", Math.min(...wc), Math.round(wc.reduce((a, b) => a + b, 0) / wc.length), Math.max(...wc));
  const flag = (label, n) => console.log(`${n ? "!! " : "   "}${label}: ${n}`);
  flag("emails with an em/en dash", matched.filter((m) => /[—–]/.test(m.email)).length);
  flag("emails with >1 question mark", matched.filter((m) => (m.email.match(/\?/g) || []).length > 1).length);
  flag("emails outside 120-180 words", wc.filter((n) => n < 120 || n > 180).length);
  console.log(`\nreconciliation: ${matched.length} personalized + ${rej.length - 1} rejected = ${total}`);
};

/* ---------- main ---------- */
const [, , cmd, ...args] = process.argv;
if (!cmd || !CMD[cmd]) {
  console.log("commands: count | triage | scrape | classify | collisions | language | firms | build");
  process.exit(1);
}
Promise.resolve(CMD[cmd](...args)).catch((e) => { console.error(e); process.exit(1); });
