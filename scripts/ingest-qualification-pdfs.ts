/**
 * ingest-qualification-pdfs.ts
 *
 * Extracts C&G and EAL qualification PDF content into the
 * qualification_requirements table for RAG-based portfolio/diary coaching.
 *
 * Schema: one row per Assessment Criterion (AC)
 *   qualification_code TEXT
 *   unit_code          TEXT
 *   unit_title         TEXT
 *   lo_number          INTEGER
 *   lo_text            TEXT
 *   ac_code            TEXT   (e.g. '1.1', '2.3')
 *   ac_text            TEXT
 *
 * Usage:
 *   npm install pdf-parse --save-dev
 *   npx tsx scripts/ingest-qualification-pdfs.ts              # insert to DB
 *   npx tsx scripts/ingest-qualification-pdfs.ts --dry-run    # JSON to stdout
 *   npx tsx scripts/ingest-qualification-pdfs.ts --only 5357  # single qual
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------- Config ---------------
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const DRY_RUN = process.argv.includes('--dry-run');
const JSON_OUT = (() => {
  const idx = process.argv.indexOf('--json-out');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();
const ONLY_QUAL = (() => {
  const idx = process.argv.indexOf('--only');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

if (!DRY_RUN && !JSON_OUT && !SUPABASE_KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY env var (or use --dry-run / --json-out)');
  process.exit(1);
}

const supabase = !DRY_RUN && !JSON_OUT && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const PDF_DIR = path.join(__dirname, '..', 'docs', 'qualification-pdfs');

// --------------- Types ---------------
interface QualificationRow {
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  lo_number: number;
  lo_text: string;
  ac_code: string;
  ac_text: string;
}

// --------------- PDF Source Definitions ---------------
interface PDFSource {
  file: string;
  qualCode: string;
  parser: 'cg-5357' | 'cg-2357' | 'cg-2346' | 'cg-8202' | 'eal-qs';
}

const PDF_SOURCES: PDFSource[] = [
  // C&G 5357-23 (post-Sep 2023 apprenticeship standard)
  {
    file: 'city-and-guilds/5357-23_electrotechnical_qualification_handbook_v1-6.pdf',
    qualCode: '5357',
    parser: 'cg-5357',
  },
  // C&G 2357 (NVQ Diploma)
  {
    file: 'city-and-guilds/2357_l3_nvq_diplomas_electrotechnical_technology_handbook_v6-1.pdf',
    qualCode: '2357',
    parser: 'cg-2357',
  },
  // C&G 2346-03 (Experienced Worker)
  {
    file: 'city-and-guilds/2346-03_l3_electrotechnical_experienced_worker_v1-9.pdf',
    qualCode: '2346-03',
    parser: 'cg-2346',
  },
  // C&G 8202-30 (T Level Advanced Technical Diploma)
  {
    file: 'city-and-guilds/8202-30_l3_adv_tech_dip_electrical_installation_v1-12.pdf',
    qualCode: '8202',
    parser: 'cg-8202',
  },
  // EAL 610/3907/X (Technical Occupational Entry)
  {
    file: 'eal/EAL_610-3907-X_QS_1.pdf',
    qualCode: '610/3907/X',
    parser: 'eal-qs',
  },
];

// --------------- C&G Content Unit Finder ---------------
// Identifies real content unit blocks (not TOC entries) by looking for
// "Unit XXX Title" followed by "Level:" / "GLH:" metadata within ~500 chars.
function findCGContentUnits(
  text: string,
  unitCodePattern: RegExp
): { code: string; title: string; bodyStart: number; bodyEnd: number }[] {
  const units: { code: string; title: string; bodyStart: number; bodyEnd: number }[] = [];

  let m;
  while ((m = unitCodePattern.exec(text)) !== null) {
    const code = m[1];
    const afterMatch = text.substring(m.index + m[0].length, m.index + m[0].length + 600);

    // Content blocks have "Level:" or "Level N\n" (on its own line) — TOC entries don't.
    // Exclude false positives like page footers "Level 3 Advanced Technical Diploma..."
    const hasLevelColon = /\bLevel:\s*\d/i.test(afterMatch);
    const hasLevelAlone = /\bLevel\s+\d+\s*\n/i.test(afterMatch);
    if (!hasLevelColon && !hasLevelAlone) continue;

    // Extract title: text between unit code and "Level:" or "Level N\n"
    const titleEnd = afterMatch.search(/\bLevel[:\s]+\d/i) !== -1
      ? afterMatch.search(/\bLevel[:\s]+\d/i)
      : afterMatch.search(/\bLevel\s+\d+\s*\n/i);
    const titleText = afterMatch
      .substring(0, titleEnd)
      .split('\n')
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length > 3 &&
          !/^\d+$/.test(l) && // skip page numbers
          !/^[A-Z]\/\d{3}\/\d{3,4}/.test(l) && // skip UAN codes like "A/507/0650"
          !/^UAN:/i.test(l)
      )
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    units.push({
      code,
      title: titleText || `Unit ${code}`,
      bodyStart: m.index,
      bodyEnd: text.length, // will be trimmed below
    });
  }

  // Set bodyEnd of each unit to bodyStart of the next
  for (let i = 0; i < units.length - 1; i++) {
    units[i].bodyEnd = units[i + 1].bodyStart;
  }

  // Deduplicate by code (keep first — the content block, skip supporting info)
  const seen = new Set<string>();
  return units.filter((u) => {
    if (seen.has(u.code)) return false;
    seen.add(u.code);
    return true;
  });
}

// --------------- C&G Unit Block AC Extractor ---------------
// Extracts LOs and ACs from a unit's body text.
// Pattern: LO1 text ... AC1.1 text ... AC1.2 text ... Range ... LO2 text ...
function extractCGACs(
  body: string,
  qualCode: string,
  unitCode: string,
  unitTitle: string
): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Clean page headers/footers that appear in the middle of content
  const cleaned = body
    .replace(/--\s*\d+\s+of\s+\d+\s*--/g, '')
    .replace(/Level\s+\d\s+Electrotechnical\s+Qualification.*?\d+$/gm, '')
    .replace(/Level\s+\d\s+NVQ\s+Diplomas?.*?\d+$/gm, '')
    .replace(/Level\s+\d\s+Electrotechnical\s+Experienced.*?\d+$/gm, '');

  // Build LO text map: LO number → LO description
  const loTexts = new Map<number, string>();
  const loPattern = /\bLO\s*(\d+)\s+([\s\S]*?)(?=\bLO\s*\d+\s|\bAC\d+\.\d+|\bSupporting\s+information|$)/gi;
  let loMatch;
  while ((loMatch = loPattern.exec(cleaned)) !== null) {
    const num = parseInt(loMatch[1], 10);
    if (loTexts.has(num)) continue;
    // Extract the LO description text (before "Assessment criteria" or "The learner can")
    const loBody = loMatch[2];
    const descLines: string[] = [];
    for (const line of loBody.split('\n')) {
      const t = line.trim();
      if (/^Assessment\s+criteria/i.test(t)) break;
      if (/^The\s+learner\s+(can|will)/i.test(t)) break;
      if (/^AC\d+\.\d+/i.test(t)) break;
      if (/^UAN:/i.test(t)) break;
      if (/^Level:/i.test(t)) break;
      if (/^GLH:/i.test(t)) break;
      if (/^City\s*&\s*Guilds/i.test(t)) break;
      if (/^Level\s+\d\s+(Electrotechnical|Award|Certificate|NVQ)/i.test(t)) break;
      if (t.length > 3) descLines.push(t);
    }
    loTexts.set(num, descLines.join(' ').replace(/\s+/g, ' ').trim());
  }

  // Find all ACs: AC1.1 text
  const acPattern =
    /\bAC(\d+)\.(\d+)\s+([\s\S]*?)(?=\bAC\d+\.\d+|\bRange\b|\bLO\s*\d+\s|\bLearning\s+outcome|\bSupporting\s+information|$)/gi;
  let acMatch;
  while ((acMatch = acPattern.exec(cleaned)) !== null) {
    const loNum = parseInt(acMatch[1], 10);
    const acNum = acMatch[2];
    const acText = acMatch[3]
      .split('\n')
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length > 0 &&
          !/^(Assessment\s+criteria|The\s+learner\s+can)/i.test(l) &&
          !/^--\s*\d+/i.test(l)
      )
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (acText.length > 3) {
      rows.push({
        qualification_code: qualCode,
        unit_code: unitCode,
        unit_title: unitTitle,
        lo_number: loNum,
        lo_text: loTexts.get(loNum) || '',
        ac_code: `${loNum}.${acNum}`,
        ac_text: acText,
      });
    }
  }

  return rows;
}

// --------------- C&G 5357 Parser ---------------
function parseCG5357(text: string): QualificationRow[] {
  // 5357 unit codes: "Unit 101/001", "Unit 102", "Unit 103/003", etc.
  const unitCodeRe = /\bUnit\s+(\d{2,3}(?:\/\d{2,3})?)\s+/gi;
  const units = findCGContentUnits(text, unitCodeRe);
  const rows: QualificationRow[] = [];

  for (const unit of units) {
    const body = text.substring(unit.bodyStart, unit.bodyEnd);
    rows.push(...extractCGACs(body, '5357', unit.code, unit.title));
  }
  return rows;
}

// --------------- C&G 2346 Parser (uses LO/AC prefixes like 5357) ---------------
function parseCG2346(text: string): QualificationRow[] {
  const unitCodeRe = /\bUnit\s+(\d{2,3}(?:\/\d{2,3})?)\s+/gi;
  const units = findCGContentUnits(text, unitCodeRe);
  const rows: QualificationRow[] = [];
  for (const unit of units) {
    const body = text.substring(unit.bodyStart, unit.bodyEnd);
    rows.push(...extractCGACs(body, '2346-03', unit.code, unit.title));
  }
  return rows;
}

// --------------- C&G 2357 Parser ---------------
// 2357 uses "Outcome N" instead of "LO", and numbered ACs "1.", "2." without "AC" prefix.
// Format: "Outcome 1 Title" → "Assessment Criteria" → "1. text" → "2. text" → "Range"
function parseCG2357(text: string): QualificationRow[] {
  const unitCodeRe = /\bUnit\s+(\d{2,3}(?:\/\d{2,3})?)\s+/gi;
  const units = findCGContentUnits(text, unitCodeRe);
  const rows: QualificationRow[] = [];

  for (const unit of units) {
    const body = text.substring(unit.bodyStart, unit.bodyEnd);
    rows.push(...extract2357ACs(body, unit.code, unit.title));
  }
  return rows;
}

function extract2357ACs(
  body: string,
  unitCode: string,
  unitTitle: string
): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Clean page headers/footers
  const cleaned = body
    .replace(/--\s*\d+\s+of\s+\d+\s*--/g, '')
    .replace(/City\s*&\s*Guilds\s+Level\s+\d.*?\d+$/gm, '');

  // Split into Outcome blocks: "Outcome N Title"
  const outcomePattern =
    /\bOutcome\s+(\d+)\s+([\s\S]*?)(?=\bOutcome\s+\d+\s|\bSupporting\s+information|$)/gi;

  let outcomeMatch;
  while ((outcomeMatch = outcomePattern.exec(cleaned)) !== null) {
    const loNum = parseInt(outcomeMatch[1], 10);
    const outcomeBody = outcomeMatch[2];

    // Extract LO text (the title after "Outcome N")
    const loTextLines: string[] = [];
    for (const line of outcomeBody.split('\n')) {
      const t = line.trim();
      if (/^Assessment\s+Criteria/i.test(t)) break;
      if (/^The\s+learner\s+can/i.test(t)) break;
      if (t.length > 3) loTextLines.push(t);
    }
    const loText = loTextLines.join(' ').replace(/\s+/g, ' ').trim();

    // Find ACs: numbered items "1. text", "2. text" after "Assessment Criteria"
    const acSection = outcomeBody.substring(
      outcomeBody.search(/Assessment\s+Criteria/i) || 0
    );

    // Pattern: "N. text" where N is 1-99 at start of line
    // Use /gi (not /gm) so $ only matches end of string, not end of each line
    const acPattern =
      /(?:^|\n)\s*(\d{1,2})\.\s+([\s\S]*?)(?=\n\s*\d{1,2}\.\s+[a-zA-Z]|\bRange\b|\bOutcome\s+\d|$)/gi;
    let acMatch;
    while ((acMatch = acPattern.exec(acSection)) !== null) {
      const acNum = acMatch[1];
      const acText = acMatch[2]
        .split('\n')
        .map((l) => l.trim())
        .filter(
          (l) =>
            l.length > 0 &&
            !/^Range/i.test(l) &&
            !/^--\s*\d+/i.test(l) &&
            !/^City\s*&\s*Guilds/i.test(l)
        )
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (acText.length > 3) {
        rows.push({
          qualification_code: '2357',
          unit_code: unitCode,
          unit_title: unitTitle,
          lo_number: loNum,
          lo_text: loText,
          ac_code: `${loNum}.${acNum}`,
          ac_text: acText,
        });
      }
    }
  }

  return rows;
}

// --------------- C&G 8202 Parser ---------------
// 8202 uses "Learning outcome N: Title" and "Topic N.M" patterns.
// We treat each Topic as an AC, extracting its description text.
function parseCG8202(text: string): QualificationRow[] {
  const unitCodeRe = /\bUnit\s+(\d{2,3}(?:\/\d{2,3})?)\s+/gi;
  const units = findCGContentUnits(text, unitCodeRe);
  const rows: QualificationRow[] = [];

  for (const unit of units) {
    const body = text.substring(unit.bodyStart, unit.bodyEnd);
    rows.push(...extract8202ACs(body, unit.code, unit.title));
  }
  return rows;
}

function extract8202ACs(
  body: string,
  unitCode: string,
  unitTitle: string
): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Clean page headers/footers
  const cleaned = body
    .replace(/--\s*\d+\s+of\s+\d+\s*--/g, '')
    .replace(/Level\s+\d\s+Advanced\s+Technical.*?\d+$/gm, '');

  // Extract LO texts from the "Learning outcomes" section
  // Format: "N. LO text" in the outcomes list
  const loTexts = new Map<number, string>();
  const loListSection = cleaned.match(
    /Learning\s+outcomes[\s\S]*?(?=Scope\s+of\s+content|$)/i
  );
  if (loListSection) {
    const loItemPattern = /(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=\n\s*\d+\.\s+|$)/gi;
    let loMatch;
    while ((loMatch = loItemPattern.exec(loListSection[0])) !== null) {
      const num = parseInt(loMatch[1], 10);
      const text = loMatch[2].split('\n').map((l) => l.trim()).filter((l) => l.length > 3).join(' ').replace(/\s+/g, ' ').trim();
      if (!loTexts.has(num) && text.length > 5) {
        loTexts.set(num, text);
      }
    }
  }

  // Also extract from "Learning outcome N: Title" headers
  const loHeaderPattern = /Learning\s+outcome\s+(\d+):\s*([\s\S]*?)(?=Learning\s+outcome\s+\d+:|Topic\s+\d+\.\d+|$)/gi;
  let loHeaderMatch;
  while ((loHeaderMatch = loHeaderPattern.exec(cleaned)) !== null) {
    const num = parseInt(loHeaderMatch[1], 10);
    const titleText = loHeaderMatch[2].split('\n')[0].trim();
    if (!loTexts.has(num) && titleText.length > 5) {
      loTexts.set(num, titleText);
    }
  }

  // Extract Topics: "Topic N.M" → treat as ACs
  // Skip bullet-list items like "• Topic 1.1: Title" (Scope section) — only match
  // standalone "Topic N.M\n" (content section) by requiring \n after optional whitespace.
  const topicPattern =
    /(?:^|\n)Topic\s+(\d+)\.(\d+)\s*\n([\s\S]*?)(?=(?:^|\n)Topic\s+\d+\.\d+|\bLearning\s+outcome\s+\d+|$)/gi;
  let topicMatch;
  while ((topicMatch = topicPattern.exec(cleaned)) !== null) {
    const loNum = parseInt(topicMatch[1], 10);
    const acNum = topicMatch[2];
    const topicBody = topicMatch[3];

    // Extract the topic description — first meaningful paragraph
    const descLines: string[] = [];
    for (const line of topicBody.split('\n')) {
      const t = line.trim();
      if (t.length < 3) continue;
      if (/^Topic\s+\d+/i.test(t)) break;
      if (/^Learning\s+outcome/i.test(t)) break;
      // Include the description lines (stop at bullet lists or next section)
      if (t.startsWith('•') && descLines.length > 0) break;
      descLines.push(t);
    }
    let acText = descLines.join(' ').replace(/\s+/g, ' ').trim();
    // Strip leading colon from "Topic N.M: Title" format
    acText = acText.replace(/^:\s*/, '');

    if (acText.length > 3) {
      rows.push({
        qualification_code: '8202',
        unit_code: unitCode,
        unit_title: unitTitle,
        lo_number: loNum,
        lo_text: loTexts.get(loNum) || '',
        ac_code: `${loNum}.${acNum}`,
        ac_text: acText,
      });
    }
  }

  return rows;
}

// --------------- EAL QS Parser ---------------
// EAL 610/3907/X uses 3-column tables:
// Col 1: LO number + text (e.g. "1. Know how relevant legislation applies in the workplace")
// Col 2: AC number + text (e.g. "1.1  Identify roles and responsibilities...")
// Col 3: Coverage and depth
// Units: "Unit: TE3-01 Health, Safety and Environmental Considerations"
//
// Line-by-line state machine approach to avoid multiline regex issues.
function parseEALQS(text: string): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Split into unit sections
  const unitPattern =
    /Unit:\s*((?:TE3|18ED3)-\d+)\s+([\s\S]*?)(?=Unit:\s*(?:TE3|18ED3)-\d+|Appendix\s+\d|$)/gi;

  let unitMatch;
  while ((unitMatch = unitPattern.exec(text)) !== null) {
    const unitCode = unitMatch[1];
    const unitBody = unitMatch[2];

    // Extract title: first meaningful lines before "GLH:" or "Relationship"
    const titleLines: string[] = [];
    for (const line of unitBody.split('\n')) {
      const t = line.trim();
      if (/^GLH:/i.test(t)) break;
      if (/^Relationship/i.test(t)) break;
      if (t.length > 3 && !/^\d+$/.test(t)) titleLines.push(t);
    }
    const unitTitle = titleLines.join(' ').replace(/\s+/g, ' ').trim();

    // Parse LOs and ACs line by line
    const loTexts = new Map<number, string>();
    const lines = unitBody.split('\n');

    // First pass: find LOs (lines matching "N. Uppercase text" where N is single digit)
    // and ACs (lines matching "N.M \t Text")
    interface ParsedLO { num: number; textLines: string[] }
    interface ParsedAC { loNum: number; acNum: string; textLines: string[] }

    const parsedLOs: ParsedLO[] = [];
    const parsedACs: ParsedAC[] = [];
    let currentLO: ParsedLO | null = null;
    let currentAC: ParsedAC | null = null;

    for (const line of lines) {
      const t = line.trim();

      // Skip page headers/footers
      if (/^--\s*\d+\s+of\s+\d+/i.test(t)) continue;
      if (/^EAL-/i.test(t)) continue;
      if (/^Page\s+\d/i.test(t)) continue;
      if (/^\u00a9/i.test(t)) continue;
      if (/^Learning\s+Outcomes$/i.test(t)) continue;
      if (/^The\s+learner\s+(will|can)/i.test(t)) continue;
      if (/^Assessment\s+Cri/i.test(t)) continue;
      if (/^Coverage\s+and\s+depth/i.test(t)) continue;

      // Check for AC pattern: "N.M \t text" or "N.M text"
      const acMatch = t.match(/^(\d+)\.(\d+)\s+(.+)/);
      if (acMatch) {
        // Save previous AC
        if (currentAC) parsedACs.push(currentAC);
        // Save current LO before switching to AC mode
        if (currentLO) { parsedLOs.push(currentLO); currentLO = null; }
        currentAC = {
          loNum: parseInt(acMatch[1], 10),
          acNum: acMatch[2],
          textLines: [acMatch[3].trim()],
        };
        continue;
      }

      // Check for LO pattern: "N. Uppercase text" (single digit, not N.M)
      const loMatch = t.match(/^(\d+)\.\s+([A-Z].+)/);
      if (loMatch) {
        // Save previous AC
        if (currentAC) { parsedACs.push(currentAC); currentAC = null; }
        // Save previous LO
        if (currentLO) parsedLOs.push(currentLO);
        currentLO = {
          num: parseInt(loMatch[1], 10),
          textLines: [loMatch[2].trim()],
        };
        continue;
      }

      // Check for "Cover:" — marks start of coverage section, stop collecting AC text
      if (/^Cover:/i.test(t)) {
        if (currentAC) { parsedACs.push(currentAC); currentAC = null; }
        currentLO = null;
        continue;
      }

      // Bullet points — part of coverage, skip
      if (t.startsWith('•')) {
        if (currentAC) { parsedACs.push(currentAC); currentAC = null; }
        currentLO = null;
        continue;
      }

      // Continuation line
      if (t.length > 0) {
        if (currentAC) {
          currentAC.textLines.push(t);
        } else if (currentLO) {
          currentLO.textLines.push(t);
        }
      }
    }
    // Save final items
    if (currentAC) parsedACs.push(currentAC);
    if (currentLO) parsedLOs.push(currentLO);

    // Build LO text map (deduplicate by LO number, keep first)
    for (const lo of parsedLOs) {
      if (!loTexts.has(lo.num)) {
        loTexts.set(lo.num, lo.textLines.join(' ').replace(/\s+/g, ' ').trim());
      }
    }

    // Build AC rows (deduplicate by ac_code)
    const seenACs = new Set<string>();
    for (const ac of parsedACs) {
      const acCode = `${ac.loNum}.${ac.acNum}`;
      if (seenACs.has(acCode)) continue;
      seenACs.add(acCode);

      const acText = ac.textLines.join(' ').replace(/\s+/g, ' ').trim();
      if (acText.length > 3) {
        rows.push({
          qualification_code: '610/3907/X',
          unit_code: unitCode,
          unit_title: unitTitle,
          lo_number: ac.loNum,
          lo_text: loTexts.get(ac.loNum) || '',
          ac_code: acCode,
          ac_text: acText,
        });
      }
    }
  }

  return rows;
}

// --------------- Main ---------------
async function main() {
  console.log('=== Qualification PDF Ingestion ===\n');
  if (DRY_RUN) console.log('DRY RUN MODE - no database changes\n');
  if (ONLY_QUAL) console.log(`Filtering to qualification: ${ONLY_QUAL}\n`);

  const sources = ONLY_QUAL
    ? PDF_SOURCES.filter((s) => s.qualCode === ONLY_QUAL)
    : PDF_SOURCES;

  if (sources.length === 0) {
    console.error(`No sources found for qualification: ${ONLY_QUAL}`);
    process.exit(1);
  }

  const allResults: Record<string, QualificationRow[]> = {};

  for (const source of sources) {
    const filePath = path.join(PDF_DIR, source.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP: ${source.file} not found at ${filePath}`);
      continue;
    }

    console.log(`\nProcessing: ${source.file}`);
    const buffer = fs.readFileSync(filePath);
    const uint8 = new Uint8Array(buffer);
    const pdf = new PDFParse(uint8);
    const result = await pdf.getText();
    const text = result.text;
    console.log(`  Pages: ${result.total}, Characters: ${text.length}`);

    let rows: QualificationRow[];
    switch (source.parser) {
      case 'cg-5357':
        rows = parseCG5357(text);
        break;
      case 'cg-2357':
        rows = parseCG2357(text);
        break;
      case 'cg-2346':
        rows = parseCG2346(text);
        break;
      case 'cg-8202':
        rows = parseCG8202(text);
        break;
      case 'eal-qs':
        rows = parseEALQS(text);
        break;
      default:
        console.warn(`  Unknown parser: ${source.parser}`);
        rows = [];
    }

    console.log(`  Extracted ${rows.length} AC rows`);

    if (rows.length === 0) {
      console.warn(`  WARNING: No rows extracted from ${source.file}`);
    }

    // Log unit breakdown
    const unitCounts = new Map<string, number>();
    for (const r of rows) {
      unitCounts.set(r.unit_code, (unitCounts.get(r.unit_code) || 0) + 1);
    }
    for (const [unit, count] of Array.from(unitCounts.entries()).sort()) {
      console.log(`    ${unit}: ${count} ACs`);
    }

    allResults[source.qualCode] = rows;
  }

  if (JSON_OUT) {
    // Write all rows to a JSON file for SQL import
    const allRows: QualificationRow[] = [];
    for (const rows of Object.values(allResults)) {
      allRows.push(...rows);
    }
    fs.writeFileSync(JSON_OUT, JSON.stringify(allRows));
    console.log(`\nWrote ${allRows.length} rows to ${JSON_OUT}`);
    return;
  }

  if (DRY_RUN) {
    // Output JSON for review
    for (const [qualCode, rows] of Object.entries(allResults)) {
      console.log(`\n=== ${qualCode}: ${rows.length} rows ===`);
      // Show first 5 rows as sample
      for (const row of rows.slice(0, 5)) {
        console.log(JSON.stringify(row, null, 2));
      }
      if (rows.length > 5) console.log(`  ... and ${rows.length - 5} more`);
    }
    console.log('\n=== Dry run complete ===');
    return;
  }

  // Insert to database
  for (const [qualCode, rows] of Object.entries(allResults)) {
    if (rows.length === 0) continue;

    // Delete existing data for this qualification code only
    console.log(`\nDeleting existing ${qualCode} data...`);
    const { error: deleteError } = await supabase!
      .from('qualification_requirements')
      .delete()
      .eq('qualification_code', qualCode);

    if (deleteError) {
      console.error(`  Delete error for ${qualCode}:`, deleteError);
    }

    // Insert in batches of 50
    let inserted = 0;
    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50);
      const { error: insertError } = await supabase!
        .from('qualification_requirements')
        .insert(batch);

      if (insertError) {
        console.error(
          `  Insert error (batch ${Math.floor(i / 50) + 1}):`,
          insertError
        );
      } else {
        inserted += batch.length;
      }
    }

    console.log(`  Inserted ${inserted}/${rows.length} rows for ${qualCode}`);
  }

  // Verify counts
  console.log('\n=== Verification ===');
  const { data: counts } = await supabase!
    .from('qualification_requirements')
    .select('qualification_code')
    .then(({ data }) => {
      const grouped: Record<string, number> = {};
      for (const row of data || []) {
        grouped[row.qualification_code] =
          (grouped[row.qualification_code] || 0) + 1;
      }
      return { data: grouped };
    });

  console.log('Row counts by qualification:');
  for (const [code, count] of Object.entries(counts || {}).sort()) {
    console.log(`  ${code}: ${count}`);
  }

  console.log('\n=== Done! ===');
}

main().catch(console.error);
