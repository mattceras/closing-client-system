// CCS AI Ark CSV Cleaner
// Usage: node clean_csv.js "path/to/export.csv"
//
// Removes leads with a blank email and renames the email column to "email"
// so the output is ready to import into Lead Formatter (or Clay/AirScale).
//
// Uses a hand-rolled RFC4180 CSV parser (no npm dependencies) because AI Ark
// exports contain quoted fields with embedded commas and newlines (long
// company descriptions), which a naive line-split would corrupt.

const fs = require("fs");
const path = require("path");

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

function findEmailColumn(header) {
  const lower = header.map((h) => h.trim().toLowerCase());
  let idx = lower.findIndex(
    (h) => h.includes("email") && (h.includes("business") || h.includes("work"))
  );
  if (idx === -1) idx = lower.findIndex((h) => h.includes("email"));
  return idx;
}

function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node clean_csv.js "path/to/export.csv"');
    process.exit(1);
  }
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  let text = fs.readFileSync(inputPath, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // strip BOM

  const allRows = parseCSV(text).filter(
    (r) => !(r.length === 1 && r[0].trim() === "")
  );
  if (allRows.length === 0) {
    console.error("File appears to be empty.");
    process.exit(1);
  }

  const header = allRows[0];
  const dataRows = allRows.slice(1);

  const emailIdx = findEmailColumn(header);
  if (emailIdx === -1) {
    console.error(
      `Could not find an email column. Headers found: ${header.join(", ")}`
    );
    console.error(
      'Expected something like "Email Business" or any header containing "email".'
    );
    process.exit(1);
  }

  console.log(`Using "${header[emailIdx]}" as the email column.`);

  const cleanedHeader = header.slice();
  cleanedHeader[emailIdx] = "email";

  const kept = [];
  let blankCount = 0;
  for (const r of dataRows) {
    const val = (r[emailIdx] || "").trim();
    if (val) kept.push(r);
    else blankCount++;
  }

  const outRows = [cleanedHeader, ...kept];
  const outText = writeCSV(outRows);

  const inputDir = path.dirname(inputPath);
  const inputBase = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(inputDir, `${inputBase}_cleaned.csv`);

  fs.writeFileSync(outputPath, outText, "utf8");

  console.log(`Total leads in file: ${dataRows.length}`);
  console.log(`Blank emails removed: ${blankCount}`);
  console.log(`Leads in cleaned file: ${kept.length}`);
  console.log(`Saved to: ${outputPath}`);
}

main();
