import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ═══════════════════════════════════════════════════════════════════════════
// ingest-bs7671-pdf — pipeline for the BS 7671 v2 knowledge schema
//
// Caller (admin UI) has already:
//   1. Uploaded an OCR'd PDF to the iet-docs bucket
//   2. Client-side extracted text + page_map via pdfjs-dist
//
// This function then:
//   - parses structure (Parts, Chapters, Sections, Regulations, Appendices)
//   - upserts bs7671_regulations
//   - stages multi-resolution chunks
//   - batch-embeds via OpenAI text-embedding-3-large
//   - extracts tables, figures, cross-refs
//   - promotes staging → bs7671_chunks with content_hash dedupe
//
// Actions (call via { action: ... }):
//   start_job        → create a new ingest job, returns job_id
//   parse_and_stage  → parse text, create regs, stage chunks
//   embed_batch      → embed next N staged chunks (loop until remaining=0)
//   extract_refs     → scan staged text for cross-refs / tables / figures
//   finalise         → mark job completed, cleanup staging
//   get_status       → poll job progress
//   cancel           → mark job cancelled
// ═══════════════════════════════════════════════════════════════════════════

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const EMBED_MODEL = 'text-embedding-3-large';
const EMBED_DIMS = 3072;
const EMBED_BATCH_SIZE = 50; // OpenAI accepts up to 2048, 50 keeps each call <~2s
const MAX_CHUNK_TOKENS = 2000;
const MIN_PARAGRAPH_CHUNK_TOKENS = 120;

// Vision model for page captioning. Matches the project convention
// (see /.claude/rules/edge-functions.md — "Model: gpt-5-mini-2025-08-07").
const VISION_MODEL = 'gpt-5-mini-2025-08-07';
const PAGE_IMAGES_BUCKET = 'iet-docs';

// Facet extraction — intelligence layer. GPT-5-mini with rigorous prompts +
// strict JSON schema. We tried full GPT-5 but at ~25s/call it'd take 10+ hours
// wall-time for 2k chunks, which is impractical. Mini at ~4s/call runs the
// whole corpus in ~1 hour with quality driven primarily by the prompt (which
// is comprehensive) + strict schema validation.
const FACET_MODEL = 'gpt-5-mini-2025-08-07';
// Edge-fn timeout is 150s. To stay safe: fire N chunks in parallel,
// each OpenAI call takes ~15-25s, one wave = ~30s total. Plus embeddings +
// DB writes ≈ 10s. Total budget ~40s per edge-fn call.
// Wall time: 2035 chunks / 8 per call × 40s ≈ 170 minutes ≈ 3 hours.
const FACET_BATCH_DEFAULT = 8;
const FACET_PARALLEL = 8;

// GPT-5-mini pricing ~$0.25/M input, ~$2/M output
const FACET_INPUT_PRICE_PER_M = 0.25;
const FACET_OUTPUT_PRICE_PER_M = 2.0;

// Table facet extraction — uses vision so stays conservative on parallelism
const TABLE_FACET_BATCH_DEFAULT = 4;
const TABLE_FACET_PARALLEL = 4;

// Prompt given to the vision model for each page. Focuses on visual content
// that plain OCR would miss, so the embedded summary complements (not duplicates)
// the already-extracted body text. Generous length budget — the AI downstream
// will use this text as its visual ground-truth when answering compliance
// questions, so depth + precision matters far more than brevity.
const VISION_PROMPT = `You are analysing a single page of BS 7671 (UK electrical installation regulations) for a compliance-grade RAG system. Electricians and AI assistants will rely on your description to answer safety-critical questions. The body text of this page has ALREADY been extracted via OCR and embedded separately — your job is to describe, exhaustively and precisely, the VISUAL content that OCR cannot capture.

For each visual element on the page, produce:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIGURES / DIAGRAMS / SCHEMATICS
For every figure:
  • Figure number and title exactly as shown (e.g. "Figure 2.1(i) — TN-C-S system")
  • What type of diagram (circuit schematic / physical layout / cross-section / block diagram / zone diagram / flowchart)
  • Every labelled element: components, terminals, conductors, enclosures, equipment
  • Conductor colour coding and cross-sectional area shown
  • Every arrow, flow direction, voltage / current / resistance annotation
  • Earthing arrangement type (TN-S / TN-C-S / TN-C / TT / IT) if applicable
  • Zone markings, dimensions, distances (with units)
  • Relationships between elements — "connected to", "bonded to", "isolated from"
  • Any callout boxes, notes, or legend entries embedded in the figure

TABLES
For every table:
  • Table number and title
  • Full list of column headers
  • For each row: the row label/identifier and the key values. List ALL numeric limits exactly (impedances, currents, voltages, times, temperatures). Include units.
  • Any footnotes, superscript references, conditional notes
  • Note whether rows are conditional (e.g. "for TN systems only") or universal

PHOTOGRAPHS
  • Equipment, installations, hazards depicted
  • Visible labels, part numbers, brands, colour codes
  • Scale / dimensions / installation context

WARNING LABELS, NOTICES, SIGNS, SYMBOLS
  • Exact wording verbatim
  • Colour, shape, symbol, icon
  • Required dimensions or placement if stated

MARGIN CALLOUTS / HIGHLIGHTED BOXES
  • Key compliance points, notes, cross-references
  • What regulation(s) they relate to

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rules:
  • Do NOT repeat body paragraphs / regulation text — captured separately.
  • Use precise electrical terminology: TN-C-S, PEN, SPD, RCBO, RCD, CPC, bonding, equipotential, Zs, Ze, Ia, Uo, ADS, SELV, PELV, FELV, BS EN 60898, etc.
  • Prefer exact quotes over paraphrase when wording is regulatory.
  • If a diagram shows multiple scenarios/variants, describe each.
  • Call out any inconsistencies or points where the visual contradicts or extends the body text.
  • If the page is ENTIRELY body text with no visual content, respond with the single word TEXT_ONLY on its own line, then the FLAGS line.

At the very end of your response, append a single line in this exact format (parsed programmatically):
FLAGS: figures=<true|false> tables=<true|false> diagrams=<true|false> warnings=<true|false>

Use up to ~2500 words of description before the FLAGS line. Depth and precision over brevity.`;

// ─── Utils ───────────────────────────────────────────────────────────────

const estTokens = (s: string): number => Math.ceil(s.length / 4);

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normaliseForHash(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

// ─── Parser ──────────────────────────────────────────────────────────────
// Structural detection on OCR'd scanned text. Forgiving regexes because OCR
// introduces noise (stray spaces, occasional char substitutions).

interface ParsedRegulation {
  reg_number: string;
  title: string | null;
  part: string | null;
  part_number: number | null;
  chapter: string | null;
  chapter_number: number | null;
  section: string | null;
  section_number: string | null;
  content: string;
  char_start: number;
  char_end: number;
  page_number: number | null;
}

interface PageMapEntry {
  page: number;
  char_start: number;
  char_end: number;
}

function pageForOffset(pageMap: PageMapEntry[], offset: number): number | null {
  // Linear scan is fine for ≤1000-page docs. pageMap is sorted by char_start.
  for (const p of pageMap) {
    if (offset >= p.char_start && offset <= p.char_end) return p.page;
  }
  return pageMap.length > 0 ? pageMap[pageMap.length - 1].page : null;
}

// Regex catalogue
const RE_TABLE = /(?:^|\s|\n)(?:Table|TABLE)\s+([\dA-Z.()i]+)\s*[—\-–:]?\s*([^\n]{3,120})/g;
const RE_FIGURE = /(?:^|\s|\n)(?:Figure|FIGURE|Fig\.)\s+([\dA-Z.()i]+)\s*[—\-–:]?\s*([^\n]{3,120})/g;
const RE_CROSS_REF =
  /\b(?:see|refer(?:red)?\s+to|in\s+accordance\s+with|as\s+required\s+by|Regulation)\s+(?:Regulation\s+)?(\d{3}(?:\.\d+){1,4})\b/gi;

// Per-document parser configuration. Each IET document numbers its regulations
// differently, so we dispatch by document_type at parse time.
//
// BS 7671:  411.3.3     → 3-digit section, first digit = Part, first two = Chapter
// GN3:      2.6.14      → 1-2 digit chapter, flat section/subsection beneath
// OSG:      10.3.4      → 1-2 digit chapter, flat section/subsection beneath

interface Hierarchy {
  part_number: number | null;
  part: string | null;
  chapter_number: number | null;
  chapter: string | null;
  section_number: string;
}

interface DocTypeConfig {
  doc_type: string;
  // Global regex to find reg-number candidates in body text
  regPattern: () => RegExp; // returns fresh regex (stateful .exec)
  // First-digit plausibility check — discards cross-doc numeric refs (BS EN 60xxx etc.)
  minFirstDigit: number;
  maxFirstDigit: number;
  // Min/max segment count for a valid reg number, e.g. BS7671 needs ≥2 dotted parts
  minSegments: number;
  maxSegments: number;
  // Derive Part / Chapter / Section from the reg number string
  derive: (regNum: string) => Hierarchy;
}

const BS7671_PART_TITLES: Record<number, string> = {
  1: 'Part 1 — Scope, Object and Fundamental Principles',
  2: 'Part 2 — Definitions',
  3: 'Part 3 — Assessment of General Characteristics',
  4: 'Part 4 — Protection for Safety',
  5: 'Part 5 — Selection and Erection of Equipment',
  6: 'Part 6 — Inspection and Testing',
  7: 'Part 7 — Special Installations or Locations',
  8: 'Part 8 — Functional Requirements',
};

const BS7671_CONFIG: DocTypeConfig = {
  doc_type: 'bs7671',
  regPattern: () => /(?<![\d.])(\d{3}(?:\.\d+){1,4})(?![\d])/g,
  minFirstDigit: 1,
  maxFirstDigit: 8,
  minSegments: 2,
  maxSegments: 5,
  derive: (r) => {
    const [sectionRaw, ...rest] = r.split('.');
    const section_number = rest.length >= 1 ? `${sectionRaw}.${rest[0]}` : sectionRaw;
    const part_number = parseInt(sectionRaw.charAt(0), 10);
    const chapter_number = parseInt(sectionRaw.substring(0, 2), 10);
    return {
      part_number,
      part: BS7671_PART_TITLES[part_number] ?? null,
      chapter_number,
      chapter: `Chapter ${chapter_number}`,
      section_number,
    };
  },
};

// GN3 has 5 chapters (1-5). Numbering: 2.6.14, 2.6.11, 1.3.1, etc.
// Flat below chapter — no "Parts" concept.
const GN3_CONFIG: DocTypeConfig = {
  doc_type: 'gn3',
  regPattern: () => /(?<![\d.])(\d{1,2}\.\d+(?:\.\d+){0,3})(?![\d])/g,
  minFirstDigit: 1,
  maxFirstDigit: 9,
  minSegments: 2,
  maxSegments: 5,
  derive: (r) => {
    const segs = r.split('.');
    const chapter_number = parseInt(segs[0], 10);
    const section_number = segs.length >= 2 ? `${segs[0]}.${segs[1]}` : segs[0];
    return {
      part_number: null,
      part: null,
      chapter_number,
      chapter: `Chapter ${chapter_number}`,
      section_number,
    };
  },
};

// OSG (On-Site Guide) — chapter-based, 1-14 chapters in recent editions.
const OSG_CONFIG: DocTypeConfig = {
  doc_type: 'osg',
  regPattern: () => /(?<![\d.])(\d{1,2}\.\d+(?:\.\d+){0,2})(?![\d])/g,
  minFirstDigit: 1,
  maxFirstDigit: 14,
  minSegments: 2,
  maxSegments: 4,
  derive: (r) => {
    const segs = r.split('.');
    const chapter_number = parseInt(segs[0], 10);
    const section_number = segs.length >= 2 ? `${segs[0]}.${segs[1]}` : segs[0];
    return {
      part_number: null,
      part: null,
      chapter_number,
      chapter: `Chapter ${chapter_number}`,
      section_number,
    };
  },
};

const DOC_CONFIGS: Record<string, DocTypeConfig> = {
  bs7671: BS7671_CONFIG,
  gn3: GN3_CONFIG,
  osg: OSG_CONFIG,
};

// True if `content` reads like real regulation prose, NOT an index entry or
// table-of-contents row. Index/TOC content is mostly digits + cross-refs; real
// regs have actual sentences with letters.
function isSubstantialRegContent(content: string): boolean {
  const trimmed = content.trim();
  if (trimmed.length < 60) return false; // index entries are short
  const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const digits = (trimmed.match(/\d/g) || []).length;
  if (letters + digits === 0) return false;
  // Real prose has letters >> digits. Index entries are mostly digits.
  if (letters / (letters + digits) < 0.55) return false;
  // Must have at least some real words (avoid pure numeric/ref dumps)
  const words = trimmed.match(/\b[a-zA-Z]{4,}\b/g) || [];
  if (words.length < 4) return false;
  return true;
}

// Find the boundary where the body text ends and the back-matter (Index,
// Table of Tables, Table of Figures) begins. We truncate before parsing so
// the parser doesn't consume index cross-references as fake regulations.
function findBodyEndOffset(fullText: string): number {
  // Look in the last 25% of the document for a back-matter heading.
  // Headings are typically uppercase + on their own line.
  const lastQuarter = Math.floor(fullText.length * 0.75);
  const tailText = fullText.slice(lastQuarter);
  const headingPatterns = [
    /(?:^|\n)\s*INDEX\s*(?:\n|$)/g,
    /(?:^|\n)\s*TABLE\s+OF\s+TABLES\s*(?:\n|$)/gi,
    /(?:^|\n)\s*TABLE\s+OF\s+FIGURES\s*(?:\n|$)/gi,
    /(?:^|\n)\s*LIST\s+OF\s+(?:TABLES|FIGURES)\s*(?:\n|$)/gi,
  ];
  let earliest = fullText.length;
  for (const pattern of headingPatterns) {
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(tailText)) !== null) {
      const abs = lastQuarter + (m.index ?? 0);
      if (abs < earliest) earliest = abs;
    }
  }
  return earliest;
}

function parseStructure(
  fullText: string,
  pageMap: PageMapEntry[],
  docType: string
): {
  regulations: ParsedRegulation[];
  bodyEndOffset: number;
  rawHitCount: number;
  filteredOutCount: number;
  docTypeUsed: string;
} {
  const config = DOC_CONFIGS[docType] ?? BS7671_CONFIG;

  // Truncate before back-matter (INDEX, TABLE OF TABLES, etc.)
  const bodyEndOffset = findBodyEndOffset(fullText);
  const bodyText = fullText.slice(0, bodyEndOffset);

  type RegHit = { offset: number; regNum: string };
  const regHits: RegHit[] = [];
  const pattern = config.regPattern();
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(bodyText)) !== null) {
    const regNum = m[1];
    const segments = regNum.split('.').length;
    if (segments < config.minSegments || segments > config.maxSegments) continue;
    const firstDigit = parseInt(regNum.split('.')[0], 10);
    if (firstDigit < config.minFirstDigit || firstDigit > config.maxFirstDigit) continue;
    regHits.push({ offset: m.index, regNum });
  }

  // First-occurrence-wins de-dup (later mentions are cross-refs)
  const firstByReg = new Map<string, RegHit>();
  for (const h of regHits) {
    if (!firstByReg.has(h.regNum)) firstByReg.set(h.regNum, h);
  }
  const firstHits = Array.from(firstByReg.values()).sort((a, b) => a.offset - b.offset);

  const regulations: ParsedRegulation[] = [];
  let filteredOutCount = 0;

  for (let i = 0; i < firstHits.length; i++) {
    const hit = firstHits[i];
    const next = firstHits[i + 1];
    const startOffset = hit.offset;
    const endOffset = next ? next.offset : bodyText.length;
    const rawContent = bodyText.slice(startOffset, endOffset).trim();

    if (!isSubstantialRegContent(rawContent)) {
      filteredOutCount++;
      continue;
    }

    const afterReg = rawContent.slice(hit.regNum.length).trim();
    let title: string | null = null;
    const titleMatch = afterReg.match(/^([A-Z][^.\n]{5,119})(?:[.\n]|$)/);
    if (titleMatch) title = titleMatch[1].trim();

    const hierarchy = config.derive(hit.regNum);

    regulations.push({
      reg_number: hit.regNum,
      title,
      part: hierarchy.part,
      part_number: hierarchy.part_number,
      chapter: hierarchy.chapter,
      chapter_number: hierarchy.chapter_number,
      section: null,
      section_number: hierarchy.section_number,
      content: rawContent,
      char_start: startOffset,
      char_end: endOffset,
      page_number: pageForOffset(pageMap, startOffset),
    });
  }

  return {
    regulations,
    bodyEndOffset,
    rawHitCount: firstHits.length,
    filteredOutCount,
    docTypeUsed: config.doc_type,
  };
}

// Multi-resolution chunks derived from regulations
interface StagedChunk {
  regulation_index: number | null;
  chunk_type: 'regulation' | 'paragraph' | 'section' | 'preamble';
  content: string;
  page_number: number | null;
  char_start: number;
  char_end: number;
}

function buildChunks(regulations: ParsedRegulation[]): StagedChunk[] {
  const chunks: StagedChunk[] = [];

  // Regulation-level chunk (one per reg — primary retrieval unit)
  regulations.forEach((reg, idx) => {
    if (estTokens(reg.content) > MAX_CHUNK_TOKENS) {
      // Too big — force-split at paragraph boundaries, but still emit the full one
      // too (truncated to MAX if needed) for regulation-level lookups
      const truncated = reg.content.slice(0, MAX_CHUNK_TOKENS * 4);
      chunks.push({
        regulation_index: idx,
        chunk_type: 'regulation',
        content: truncated,
        page_number: reg.page_number,
        char_start: reg.char_start,
        char_end: reg.char_start + truncated.length,
      });
    } else {
      chunks.push({
        regulation_index: idx,
        chunk_type: 'regulation',
        content: reg.content,
        page_number: reg.page_number,
        char_start: reg.char_start,
        char_end: reg.char_end,
      });
    }

    // Paragraph-level chunks for fine-grained retrieval
    const paragraphs = reg.content.split(/\n\n+/).filter((p) => estTokens(p) >= MIN_PARAGRAPH_CHUNK_TOKENS);
    if (paragraphs.length > 1) {
      let offset = reg.char_start;
      for (const para of paragraphs) {
        const idxInReg = reg.content.indexOf(para, offset - reg.char_start);
        const absStart = reg.char_start + (idxInReg >= 0 ? idxInReg : 0);
        chunks.push({
          regulation_index: idx,
          chunk_type: 'paragraph',
          content: para.trim(),
          page_number: reg.page_number,
          char_start: absStart,
          char_end: absStart + para.length,
        });
        offset = absStart + para.length;
      }
    }
  });

  // Section-level chunks — concat all regs sharing a section_number
  const bySection: Record<string, { regs: ParsedRegulation[]; section: string | null }> = {};
  regulations.forEach((reg) => {
    const key = reg.section_number || 'NOSECTION';
    if (!bySection[key]) bySection[key] = { regs: [], section: reg.section };
    bySection[key].regs.push(reg);
  });
  for (const [sectionNum, { regs, section }] of Object.entries(bySection)) {
    if (regs.length < 2) continue; // Single-reg sections don't need a section chunk
    const combined = regs.map((r) => `${r.reg_number} ${r.content}`).join('\n\n');
    if (estTokens(combined) > MAX_CHUNK_TOKENS) continue; // Too big — skip, paragraphs cover it
    chunks.push({
      regulation_index: null,
      chunk_type: 'section',
      content: combined.slice(0, MAX_CHUNK_TOKENS * 4),
      page_number: regs[0].page_number,
      char_start: regs[0].char_start,
      char_end: regs[regs.length - 1].char_end,
    });
  }

  return chunks;
}

// ─── OpenAI embeddings ───────────────────────────────────────────────────

async function embedBatch(openAiKey: string, texts: string[]): Promise<number[][]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: texts,
      dimensions: EMBED_DIMS,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI embed failed ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = await res.json();
  return j.data.map((d: { embedding: number[] }) => d.embedding);
}

// ─── Vision captioning ───────────────────────────────────────────────────

interface VisionResult {
  summary: string;
  has_figures: boolean;
  has_tables: boolean;
  has_diagrams: boolean;
  has_warnings: boolean;
  input_tokens: number;
  output_tokens: number;
  cost_usd: number;
}

// Parse "FLAGS: figures=true tables=false ..." line
function parseVisionFlags(summary: string): {
  has_figures: boolean;
  has_tables: boolean;
  has_diagrams: boolean;
  has_warnings: boolean;
  cleanSummary: string;
} {
  const flagsMatch = summary.match(/FLAGS:\s*figures=(\w+)\s+tables=(\w+)\s+diagrams=(\w+)\s+warnings=(\w+)/i);
  if (!flagsMatch) {
    return {
      has_figures: false,
      has_tables: false,
      has_diagrams: false,
      has_warnings: false,
      cleanSummary: summary.trim(),
    };
  }
  const cleanSummary = summary.replace(flagsMatch[0], '').trim();
  return {
    has_figures: flagsMatch[1].toLowerCase() === 'true',
    has_tables: flagsMatch[2].toLowerCase() === 'true',
    has_diagrams: flagsMatch[3].toLowerCase() === 'true',
    has_warnings: flagsMatch[4].toLowerCase() === 'true',
    cleanSummary,
  };
}

async function captionPageWithVision(
  openAiKey: string,
  imageSignedUrl: string
): Promise<VisionResult> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      max_completion_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: VISION_PROMPT },
            { type: 'image_url', image_url: { url: imageSignedUrl, detail: 'high' } },
          ],
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Vision call failed ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = await res.json();
  const rawSummary = j.choices?.[0]?.message?.content?.trim() || '';
  const input_tokens = j.usage?.prompt_tokens ?? 0;
  const output_tokens = j.usage?.completion_tokens ?? 0;

  // GPT-5-mini pricing ballpark (varies over time — stored for audit/reporting)
  // Input: ~$0.25/M, Output: ~$2/M (approximate)
  const cost_usd = (input_tokens * 0.25 + output_tokens * 2) / 1_000_000;

  const parsed = parseVisionFlags(rawSummary);
  return {
    summary: parsed.cleanSummary || 'TEXT_ONLY',
    has_figures: parsed.has_figures,
    has_tables: parsed.has_tables,
    has_diagrams: parsed.has_diagrams,
    has_warnings: parsed.has_warnings,
    input_tokens,
    output_tokens,
    cost_usd,
  };
}

// ─── Facet extraction (intelligence layer) ──────────────────────────────────

interface FacetOutput {
  facet_type: string;
  primary_topic: string;
  content: string;
  system_types?: string[];
  bs7671_zones?: string[];
  equipment_category?: string | null;
  protection_method?: string | null;
  disconnection_time_s?: number | null;
  test_equipment?: string[];
  keywords?: string[];
  confidence_score: number;
}

// JSON schema shown to GPT-5-mini for structured output. Constraining enums
// dramatically improves filterability downstream (self-querying retriever
// relies on these values being normalised).
// OpenAI strict-mode rules:
// 1. Every property must be listed in `required`
// 2. `additionalProperties: false` on every object
// 3. Optional fields use `type: ['T', 'null']` — nulls go IN the type array,
//    NOT in enum arrays (enum with null mixed is flaky across providers)
const FACET_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['facets'],
  properties: {
    facets: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'facet_type',
          'primary_topic',
          'content',
          'system_types',
          'bs7671_zones',
          'equipment_category',
          'protection_method',
          'disconnection_time_s',
          'test_equipment',
          'keywords',
          'confidence_score',
        ],
        properties: {
          facet_type: {
            type: 'string',
            enum: [
              'purpose',
              'requirement',
              'test',
              'scope',
              'note',
              'condition',
              'exception',
              'procedure',
              'acceptance_criterion',
              'reference',
              'example',
              'definition',
            ],
          },
          primary_topic: { type: 'string' },
          content: { type: 'string' },
          system_types: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['TN-S', 'TN-C-S', 'TN-C', 'TT', 'IT', 'PNB', 'reduced-low-voltage'],
            },
          },
          bs7671_zones: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'bathroom',
                'shower',
                'outdoor',
                'swimming-pool',
                'sauna',
                'marina',
                'caravan-park',
                'ev-charging',
                'medical',
                'solar-pv',
                'construction-site',
                'agricultural',
                'exhibition',
                'fairground',
                'generic',
              ],
            },
          },
          // Nullable fields use type union with 'null' — no null inside enum
          equipment_category: {
            type: ['string', 'null'],
            enum: [
              'RCBO',
              'RCD',
              'MCB',
              'MCCB',
              'SPD',
              'AFDD',
              'cable',
              'consumer-unit',
              'isolator',
              'switch',
              'socket-outlet',
              'luminaire',
              'transformer',
              'generator',
              'motor',
              'fuse',
              'busbar',
              'conductor',
              'enclosure',
              'earthing-electrode',
            ],
          },
          protection_method: {
            type: ['string', 'null'],
            enum: [
              'ADS',
              'SELV',
              'PELV',
              'FELV',
              'double-insulation',
              'electrical-separation',
              'non-conducting-location',
              'earth-free-bonding',
              'obstacle',
              'placing-out-of-reach',
            ],
          },
          disconnection_time_s: { type: ['number', 'null'] },
          test_equipment: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'insulation-resistance-tester',
                'loop-impedance-tester',
                'rcd-tester',
                'continuity-tester',
                'multifunction-tester',
                'clamp-meter',
                'earth-electrode-tester',
                'phase-rotation-tester',
                'voltage-indicator',
                'thermal-imager',
                'power-quality-analyser',
              ],
            },
          },
          keywords: { type: 'array', items: { type: 'string' } },
          confidence_score: { type: 'number', minimum: 0, maximum: 1 },
        },
      },
    },
  },
};

// Splits long content into ~500-800 char segments on sentence boundaries.
// Short chunks (<=800 chars) pass through untouched. Long chunks (GN3/OSG
// guidance paragraphs, BS7671 section preambles) get broken up so each LLM
// call sees a right-sized input and returns properly dense facets.
function splitIntoSegments(content: string, maxSize = 800, minSize = 400): string[] {
  const trimmed = content.trim();
  if (trimmed.length <= maxSize) return [trimmed];

  // Prefer splitting on double newlines first (paragraph breaks)
  const paragraphs = trimmed.split(/\n\s*\n+/);
  const segments: string[] = [];
  let current = '';

  const flush = () => {
    if (current.trim()) segments.push(current.trim());
    current = '';
  };

  const pushPiece = (piece: string) => {
    if (piece.length > maxSize) {
      // Paragraph itself too big — split on sentences
      const sentences = piece.split(/(?<=[.!?])\s+/);
      for (const s of sentences) {
        if (s.length > maxSize) {
          // Sentence itself too big (rare) — hard-split on char count
          for (let i = 0; i < s.length; i += maxSize) {
            if (current.length + (s.length - i) > maxSize && current.length >= minSize) flush();
            current += (current ? ' ' : '') + s.slice(i, i + maxSize);
          }
        } else {
          if ((current + ' ' + s).length > maxSize && current.length >= minSize) flush();
          current = current ? current + ' ' + s : s;
        }
      }
    } else {
      if ((current + '\n\n' + piece).length > maxSize && current.length >= minSize) flush();
      current = current ? current + '\n\n' + piece : piece;
    }
  };

  for (const p of paragraphs) pushPiece(p.trim());
  flush();
  return segments.length > 0 ? segments : [trimmed];
}

// Density hint the LLM sees — scales with segment length. Over-extracting is
// the desired bias; under-extraction is the main failure mode.
function targetFacetRange(contentLength: number): string {
  if (contentLength < 200) return '4-8 facets';
  if (contentLength < 500) return '8-15 facets';
  if (contentLength < 1000) return '15-25 facets';
  if (contentLength < 1500) return '25-35 facets';
  return '30-45 facets';
}

function buildFacetPrompt(params: {
  docType: string;
  editionCode: string;
  regNumber: string | null;
  regTitle: string | null;
  part: string | null;
  chapter: string | null;
  section: string | null;
  content: string;
  segmentInfo?: { index: number; total: number };
}): string {
  const docFull =
    params.docType === 'bs7671'
      ? 'BS 7671 — Requirements for Electrical Installations (the UK Wiring Regulations)'
      : params.docType === 'gn3'
        ? 'IET Guidance Note 3 — Inspection & Testing (the practical companion to BS 7671 Part 6)'
        : params.docType === 'osg'
          ? 'IET On-Site Guide — the practical installer handbook aligned with BS 7671'
          : params.docType.toUpperCase();

  const loc = [
    params.editionCode,
    params.part,
    params.chapter,
    params.section,
    params.regNumber ? `Regulation ${params.regNumber}` : null,
    params.regTitle,
  ]
    .filter(Boolean)
    .join(' · ');

  const density = targetFacetRange(params.content.length);
  const segTag = params.segmentInfo
    ? ` (segment ${params.segmentInfo.index + 1} of ${params.segmentInfo.total})`
    : '';

  return `# DOCUMENT
${docFull}

# SOURCE LOCATION
${loc || '(preamble / un-numbered)'}${segTag}

# CONTENT TO DECOMPOSE
\`\`\`
${params.content}
\`\`\`

# TASK
Decompose this content into atomic compliance facets. Each facet is a
self-contained retrieval unit — an electrician, cert validator, or AI
assistant must be able to retrieve it alone and act on it without reading
surrounding text.

**Target density for THIS content (${params.content.length} chars): ${density}.**
Err deliberately on the side of MORE. A rich intelligence layer is the whole
point of this exercise — under-extracting is the single biggest failure mode.
Every distinct requirement, permission, condition, exception, definition,
numeric limit, test procedure, cross-reference and note must become its own
facet.

## DECOMPOSITION RULES

Produce ONE facet per:
  1. Numbered sub-clause (a), (b), (c), (i), (ii)...
  2. Distinct requirement, obligation, or prohibition ("shall", "must",
     "shall not")
  3. Distinct permission or allowance ("may", "is permitted")
  4. Distinct condition or qualifier ("where...", "provided that...",
     "except where...")
  5. Distinct exception, exemption, or special case
  6. Distinct numeric limit, threshold, time, or value (put the value in
     primary_topic, e.g. "0.4 s disconnection time for 230 V TN final
     circuits ≤ 32 A")
  7. Distinct test method, measurement, or verification step
  8. Distinct acceptance criterion / pass-fail rule
  9. Distinct definition of a term
  10. NOTE: or Note: annotation → facet_type='note' (don't skip these —
      compliance answers often hinge on notes)
  11. Every "see Regulation X.Y.Z" or "in accordance with BS EN ..." →
      facet_type='reference'
  12. Example or worked scenario → facet_type='example'

## STYLE RULES FOR EACH FACET

- **primary_topic**: 6-15 word one-line searchable summary. Include specific
  terms ("TN-C-S", "RCBO", "bathroom zone 1", "0.4 s") so semantic AND
  keyword search hit. Think: what a worried electrician would type into
  Google.
- **content**: 40-250 words. Self-contained. Restate enough context that it
  reads without the parent text. Quote numeric values verbatim. Keep
  regulatory wording ("shall", "may", "is permitted") — don't paraphrase
  normatively into "must/can".
- **facet_type**: choose the most specific of: purpose, requirement, test,
  scope, note, condition, exception, procedure, acceptance_criterion,
  reference, example, definition.
- **confidence_score**: 0.9+ when the facet is a clear standalone claim;
  0.7-0.8 when it's a fragment you've had to stitch context into; <0.7 if
  you're uncertain.

## METADATA RULES (populate ALL required fields — empty arrays OK, null OK)

- **system_types**: only populate if the facet is about conductor
  arrangement / earthing topology. Values: TN-S, TN-C-S, TN-C, TT, IT, PNB
  (protective neutral bonding), reduced-low-voltage. Empty array if the
  facet is system-agnostic.
- **bs7671_zones**: only for Part 7 special locations. Empty for body regs.
  Values as in schema enum.
- **equipment_category**: the ONE piece of equipment this facet is most
  about, or null. Don't list multiple — pick the primary.
- **protection_method**: ADS / SELV / PELV / FELV / double-insulation /
  electrical-separation / etc., or null.
- **disconnection_time_s**: only when the facet specifies a maximum
  disconnection time. Otherwise null.
- **test_equipment**: only when the facet is about performing a specific
  test. Empty otherwise.
- **keywords**: 3-8 searchable synonyms and alt-phrasings an electrician
  might type. Examples: "earth fault loop impedance", "Zs", "loop test",
  "Megger", "PSC", "prospective fault current". Include common UK-trade
  shorthand.

## WHAT TO SKIP (don't generate facets for these)

- Table-of-contents entries ("CHAPTER 41 ... 69")
- Bibliographic reference lists ("BS EN 60898-1:2003+A1:2015")
- Page headers / footers / "© IET" boilerplate
- Index entries (pure lists of numbers with trailing page refs)
- Figure captions where the caption is purely decorative ("Figure 2.1")

## FEW-SHOT EXAMPLES

GOOD — atomic, self-contained, well-tagged:
\`\`\`
{
  "facet_type": "requirement",
  "primary_topic": "0.4 s max disconnection time for 230 V TN final circuits up to 63 A",
  "content": "In a TN system, for final circuits not exceeding 63 A with one or more socket-outlets, and final circuits not exceeding 32 A supplying only fixed connected current-using equipment, the maximum disconnection time required by Regulation 411.3.2.2 shall not exceed 0.4 s at a nominal voltage U0 of 230 V to earth.",
  "system_types": ["TN-S","TN-C-S"],
  "bs7671_zones": [],
  "equipment_category": null,
  "protection_method": "ADS",
  "disconnection_time_s": 0.4,
  "test_equipment": [],
  "keywords": ["disconnection time","ADS","TN system","230V final circuit","socket-outlet","32A","63A","411.3.2.2"],
  "confidence_score": 0.95
}
\`\`\`

BAD — too vague, no metadata, not standalone:
\`\`\`
{
  "facet_type": "requirement",
  "primary_topic": "Automatic disconnection",
  "content": "See the regulation for disconnection times.",
  "system_types": [],
  "bs7671_zones": [],
  "equipment_category": null,
  "protection_method": null,
  "disconnection_time_s": null,
  "test_equipment": [],
  "keywords": ["disconnection"],
  "confidence_score": 0.3
}
\`\`\`

## OUTPUT

Return strictly valid JSON matching the provided schema. Populate every
required field on every facet. Use only the enum values exactly as spelled.
Generate as many facets as the content justifies — typical density
15-25 per regulation, but longer / denser content warrants more.`;
}

async function extractFacetsFromChunk(
  openAiKey: string,
  prompt: string
): Promise<{ facets: FacetOutput[]; cost_usd: number; input_tokens: number; output_tokens: number }> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: FACET_MODEL,
      max_completion_tokens: 12000,
      reasoning_effort: 'minimal',
      messages: [
        {
          role: 'system',
          content: `You are a principal UK electrical installation compliance expert with 25+ years on site and in committee work. You have deep working knowledge of:

• BS 7671:2018+A4:2026 — the UK Wiring Regulations, every Part 1-8, every Chapter, every Appendix. You know which regs changed in A1, A2, A3, A4.
• IET Guidance Note series (1-8) — selection & erection, isolation & switching, inspection & testing, protection against fire, electric shock, overcurrent, special locations, earthing & bonding.
• IET On-Site Guide — practical installer workflows, standard circuits, domestic CCC shortcuts.
• System earthing: TN-S, TN-C-S (PNB), TN-C, TT, IT — their bonding, disconnection requirements, RCD/RCBO selection.
• Protection strategies: ADS, SELV, PELV, FELV, double insulation, electrical separation, non-conducting location.
• Devices: MCBs, RCBOs, RCDs (Types AC/A/F/B), SPDs (Types 1/2/3), AFDDs, MCCBs, fuse characteristics.
• Special locations (Part 7): bathrooms & zones, swimming pools, saunas, construction sites, agricultural, medical, marinas, exhibitions, EV charging, solar PV, BESS.
• Testing: continuity, insulation resistance, earth fault loop impedance Zs/Ze/Zref, PFC, RCD trip tests, polarity, phase rotation, functional tests.
• Certification: EIC, EICR coding (C1/C2/C3/FI), Minor Works, Schedules of Tests, Departures, Limitations.
• UK statutory context: EAWR 1989, CDM 2015, Building Regulations Part P.

Your job is to decompose regulation, guidance, and installer-guide content into dense, atomic, retrieval-ready compliance facets for a vector+BM25 hybrid RAG system used by electricians, cert validators, and an AI assistant called Mate (by Elec-Mate).

PRINCIPLES:
1. Every facet stands alone — the reader must not need the parent text.
2. Every numeric limit, exception, condition, and note gets its OWN facet.
3. Use precise regulatory wording ("shall", "may", "is permitted") — never paraphrase into softer "must/can".
4. Tag metadata aggressively — system_types, zones, equipment, disconnection times — because the self-querying retriever relies on them.
5. When uncertain about a metadata field, use null/empty array. Never fabricate.
6. Err on the side of MORE facets — under-extraction is the single biggest failure mode of this pipeline.
7. Output strictly valid JSON matching the provided schema. Every required field populated on every facet.`,
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'facet_extraction',
          strict: true,
          schema: FACET_SCHEMA,
        },
      },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Facet extraction failed ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = await res.json();
  const raw = j.choices?.[0]?.message?.content || '{"facets":[]}';
  let parsed: { facets: FacetOutput[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { facets: [] };
  }
  const input_tokens = j.usage?.prompt_tokens ?? 0;
  const output_tokens = j.usage?.completion_tokens ?? 0;
  const cost_usd =
    (input_tokens * FACET_INPUT_PRICE_PER_M + output_tokens * FACET_OUTPUT_PRICE_PER_M) /
    1_000_000;
  return {
    facets: parsed.facets ?? [],
    cost_usd,
    input_tokens,
    output_tokens,
  };
}

// ═════════════════════════════════════════════════════════════════════════
// Vision-based table facet extraction
//
// OCR'd table text in bs7671_tables.raw_text is mostly garbage because
// tabular content doesn't survive pdftotext. Instead we send the actual page
// PNG to GPT-5-mini vision and have it READ the table row-by-row directly
// from the image, producing atomic compliance facts.
// ═════════════════════════════════════════════════════════════════════════

function buildTableVisionPrompt(params: {
  docTypeShort: string;
  editionCode: string;
  tableNumber: string;
  title: string | null;
  rawTextHint: string | null;
  pageNumber: number;
}): string {
  const titleLine = params.title && params.title.length > 2 ? `\nTitle hint (may be noisy OCR): "${params.title}"` : '';
  const rawHint = params.rawTextHint
    ? `\n\nRAW OCR TEXT (often garbled — use ONLY as a locating hint, trust the image):\n---\n${params.rawTextHint.slice(0, 400)}\n---`
    : '';

  return `# TASK
You are a precision ${params.docTypeShort} table interpreter. This PDF page image
contains **${params.docTypeShort} ${params.editionCode} — Table ${params.tableNumber}** on page ${params.pageNumber}.${titleLine}${rawHint}

Find Table ${params.tableNumber} on this page and decompose EVERY cell / row / column
into atomic retrievable compliance facts. Ignore any prose, figures, or other
tables on the same page.

# EXTRACTION RULES

1. **One facet per cell × dimension intersection.** A table with device types
   (rows) × ratings (columns) × Zs values (cells) produces ONE FACET PER CELL
   that fully states every dimension. A 10-row × 4-column table = ~40 facets.

2. **Every facet is SELF-CONTAINED.** Never reference "row X" or "this column".
   Good: "For a 32A Type B MCB to BS EN 60898 on a TN system, the maximum
   earth fault loop impedance Zs for 0.4s disconnection = 1.15 Ω (Table ${params.tableNumber})."
   Bad: "Row 12 col 4 is 1.15."

3. **Include Table ${params.tableNumber} in every facet's primary_topic** so
   retrieval surfaces this table specifically.

4. **Footnotes, conditions, asterisks, units** get their own facets.
   e.g. "Values marked * apply only to circuits with overcurrent protection
   characteristic k·I² ≤ S²·k²" — one facet per condition.

5. **Units matter.** Always include units (Ω, A, mm², °C, ms, V).

6. **Precise vocabulary.** Use exact device terminology (BS 88-3 gG fuse, BS EN
   60898 Type B MCB, BS EN 61009-1 RCBO Type A, etc). Never paraphrase.

7. **Uncertain values**: if a cell is unreadable in the image, set
   confidence_score ≤ 0.5 and state the uncertainty in content.

8. **Metadata tags** — every facet MUST populate relevant fields:
   - \`system_types\` (TN-S, TN-C-S, TN-C, TT, IT) if the row/col implies one
   - \`equipment_category\` (MCB, RCBO, RCD, fuse, cable, conduit, earthing)
   - \`protection_method\` (ADS, SELV, PELV, double_insulation, separation)
   - \`disconnection_time_s\` (0.2, 0.4, 1.0, 5.0) if disconnection is stated
   - \`keywords\` — all relevant technical terms

9. **Facet type** — use these from the schema enum:
   - \`acceptance_criterion\` — for data-cell facets (Zs values, k-values, current ratings, voltage drops, disconnection times — anything with a specific compliance value)
   - \`note\` — for footnote / asterisk / condition-qualifier facets
   - \`definition\` — for column/row-header clarifications (e.g. "Column 'Ib' means design current of the circuit")
   - \`condition\` — for "only applies if..." / "where..." / "provided that..." clauses
   - \`reference\` — for any cross-reference the table points to (e.g. "see Regulation 411.X")

# OUTPUT
Strict JSON matching the schema. Populate every required field on every facet.
Density: aim for AT LEAST one facet per visible data cell. Err on the side of
MORE. Under-extraction is the failure mode we've been fighting.`;
}

async function extractTableFacetsWithVision(
  openAiKey: string,
  imageSignedUrl: string,
  prompt: string
): Promise<{
  facets: FacetOutput[];
  cost_usd: number;
  input_tokens: number;
  output_tokens: number;
}> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: FACET_MODEL,
      max_completion_tokens: 12000,
      reasoning_effort: 'minimal',
      messages: [
        {
          role: 'system',
          content: `You are a principal UK electrical compliance expert. You read
BS 7671, IET GN3 and IET OSG tables row-by-row and convert each cell into
precise, self-contained compliance facts for a vector+BM25 hybrid RAG system.
Never hallucinate values. Never paraphrase. Trust the image over garbled OCR.`,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageSignedUrl, detail: 'high' } },
          ],
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'facet_extraction',
          strict: true,
          schema: FACET_SCHEMA,
        },
      },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Table vision extraction failed ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = await res.json();
  const choice = j.choices?.[0];
  const raw = choice?.message?.content;
  const refusal = choice?.message?.refusal;
  const finishReason = choice?.finish_reason;

  let parsed: { facets: FacetOutput[] } = { facets: [] };
  let parseError: string | null = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parseError = e instanceof Error ? e.message : 'JSON.parse failed';
    }
  }

  const input_tokens = j.usage?.prompt_tokens ?? 0;
  const output_tokens = j.usage?.completion_tokens ?? 0;
  const cost_usd =
    (input_tokens * FACET_INPUT_PRICE_PER_M + output_tokens * FACET_OUTPUT_PRICE_PER_M) /
    1_000_000;

  const facets = parsed.facets ?? [];

  // Diagnostic: if we got zero facets, throw a detailed error so the UI shows WHY
  if (facets.length === 0) {
    const detail = [
      `finish=${finishReason ?? 'unknown'}`,
      `in=${input_tokens}`,
      `out=${output_tokens}`,
      refusal ? `refusal="${refusal.slice(0, 80)}"` : null,
      parseError ? `parse_err="${parseError.slice(0, 80)}"` : null,
      raw ? `raw_len=${raw.length} raw_head="${raw.slice(0, 120).replace(/\n/g, ' ')}"` : 'no content',
    ]
      .filter(Boolean)
      .join(' · ');
    throw new Error(`Vision returned 0 facets (${detail})`);
  }

  return {
    facets,
    cost_usd,
    input_tokens,
    output_tokens,
  };
}

function buildContextPrefix(params: {
  docTypeShort: string;
  editionCode: string;
  part: string | null;
  chapter: string | null;
  section: string | null;
  regNumber: string | null;
  regTitle: string | null;
  facetType: string;
  primaryTopic: string;
}): string {
  const bits: string[] = [
    `[${params.docTypeShort}]`,
    params.editionCode,
  ];
  if (params.part) bits.push(params.part);
  if (params.chapter) bits.push(params.chapter);
  if (params.regNumber) bits.push(`Reg ${params.regNumber}`);
  if (params.regTitle) bits.push(params.regTitle);
  bits.push(`[${params.facetType}]`);
  bits.push(params.primaryTopic);
  return bits.filter(Boolean).join(' · ');
}

// ─── Handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Auth — admin required
    const authHeader = req.headers.get('authorization');
    if (!authHeader) throw new Error('No authorization header');
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const token = authHeader.replace('Bearer ', '');
    let callerId: string | null = null;
    if (token !== serviceRoleKey) {
      const userClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user }, error: uErr } = await userClient.auth.getUser();
      if (uErr || !user) throw new Error('Unauthorized');
      const { data: p } = await userClient.from('profiles').select('admin_role').eq('id', user.id).single();
      if (!p?.admin_role) throw new Error('Admin required');
      callerId = user.id;
    }

    const body = await req.json();
    const { action } = body;
    const openAiKey = Deno.env.get('OPENAI_API_KEY');

    let result: unknown;

    switch (action) {
      // ─── start_job ─────────────────────────────────────────────────
      case 'start_job': {
        const { edition_id, total_pages } = body;
        if (!edition_id) throw new Error('edition_id required');
        const { data, error } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .insert({
            edition_id,
            status: 'parsing',
            total_pages: total_pages ?? null,
            started_by: callerId,
          })
          .select('id')
          .single();
        if (error) throw error;
        result = { job_id: data.id };
        break;
      }

      // ─── parse_and_stage ──────────────────────────────────────────
      case 'parse_and_stage': {
        const { job_id, full_text, page_map } = body as {
          job_id: string;
          full_text: string;
          page_map: PageMapEntry[];
        };
        if (!job_id || !full_text) throw new Error('job_id and full_text required');

        const { data: job } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .select('edition_id')
          .eq('id', job_id)
          .single();
        if (!job) throw new Error('Job not found');

        // Fetch edition's doc_type + amendment — doc_type drives parser choice,
        // amendment stamps each reg's updated_in column
        const { data: edRow } = await supabaseAdmin
          .from('bs7671_editions')
          .select('amendment, document_type')
          .eq('id', job.edition_id)
          .single();
        const docType = edRow?.document_type ?? 'bs7671';

        const pageMap = Array.isArray(page_map) ? page_map : [];
        const { regulations, bodyEndOffset, rawHitCount, filteredOutCount, docTypeUsed } =
          parseStructure(full_text, pageMap, docType);
        console.log(
          `[parse_and_stage] doc_type=${docTypeUsed} body_end=${bodyEndOffset}/${full_text.length} ` +
            `raw_hits=${rawHitCount} kept=${regulations.length} filtered=${filteredOutCount}`
        );
        const editionAmendment = edRow?.amendment ?? null;

        // Upsert regulations, get back ids
        const regRows = regulations.map((r) => ({
          edition_id: job.edition_id,
          reg_number: r.reg_number,
          title: r.title,
          part: r.part,
          part_number: r.part_number,
          chapter: r.chapter,
          chapter_number: r.chapter_number,
          section: r.section,
          section_number: r.section_number,
          full_text: r.content,
          page_number: r.page_number,
          updated_in: editionAmendment,
        }));

        const regIdByNumber: Record<string, string> = {};
        // Batch upsert 200 at a time
        for (let i = 0; i < regRows.length; i += 200) {
          const batch = regRows.slice(i, i + 200);
          const { data: inserted, error: rErr } = await supabaseAdmin
            .from('bs7671_regulations')
            .upsert(batch, { onConflict: 'edition_id,reg_number' })
            .select('id, reg_number');
          if (rErr) throw rErr;
          for (const row of inserted || []) regIdByNumber[row.reg_number] = row.id;
        }

        // Build + stage chunks
        const chunks = buildChunks(regulations);
        const stagingRows: Record<string, unknown>[] = [];
        for (const c of chunks) {
          const reg = c.regulation_index !== null ? regulations[c.regulation_index] : null;
          const regulation_id = reg ? regIdByNumber[reg.reg_number] : null;
          const hash = await sha256Hex(normaliseForHash(c.content));
          stagingRows.push({
            job_id,
            edition_id: job.edition_id,
            regulation_id,
            chunk_type: c.chunk_type,
            content: c.content,
            content_hash: hash,
            page_number: c.page_number,
            char_start: c.char_start,
            char_end: c.char_end,
            metadata: reg ? { reg_number: reg.reg_number, title: reg.title } : {},
          });
        }
        for (let i = 0; i < stagingRows.length; i += 500) {
          const batch = stagingRows.slice(i, i + 500);
          const { error: sErr } = await supabaseAdmin.from('bs7671_chunks_staging').insert(batch);
          if (sErr) throw sErr;
        }

        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({
            status: 'embedding',
            regulations_created: Object.keys(regIdByNumber).length,
            chunks_staged: stagingRows.length,
          })
          .eq('id', job_id);

        result = {
          regulations_created: Object.keys(regIdByNumber).length,
          chunks_staged: stagingRows.length,
        };
        break;
      }

      // ─── caption_page ──────────────────────────────────────────────
      // Client has rendered a page to PNG and uploaded to
      // iet-docs/page-images/{edition_id}/page-{N}.png.
      // We sign a URL, send to OpenAI Vision, store the summary + embedding.
      case 'caption_page': {
        const { job_id, edition_id, page_number, image_path } = body as {
          job_id: string;
          edition_id: string;
          page_number: number;
          image_path: string;
        };
        if (!job_id || !edition_id || !page_number || !image_path) {
          throw new Error('job_id, edition_id, page_number, image_path required');
        }
        if (!openAiKey) throw new Error('OPENAI_API_KEY not configured');

        // Skip if this page is already captioned — saves money on re-ingests
        const { data: existing } = await supabaseAdmin
          .from('bs7671_page_summaries')
          .select('id, visual_summary')
          .eq('edition_id', edition_id)
          .eq('page_number', page_number)
          .maybeSingle();
        if (existing && existing.visual_summary && existing.visual_summary.length > 20) {
          const { data: jobRow } = await supabaseAdmin
            .from('bs7671_ingest_jobs')
            .select('pages_captioned')
            .eq('id', job_id)
            .single();
          await supabaseAdmin
            .from('bs7671_ingest_jobs')
            .update({ pages_captioned: (jobRow?.pages_captioned || 0) + 1 })
            .eq('id', job_id);
          result = { page_number, skipped: true, reason: 'already_captioned' };
          break;
        }

        // Signed URL for OpenAI Vision to fetch the image (bucket is private)
        const { data: signed, error: signErr } = await supabaseAdmin.storage
          .from(PAGE_IMAGES_BUCKET)
          .createSignedUrl(image_path, 600);
        if (signErr || !signed?.signedUrl) {
          throw new Error(`Could not sign image URL: ${signErr?.message || 'unknown'}`);
        }

        const vision = await captionPageWithVision(openAiKey, signed.signedUrl);

        // Embed the visual summary so it's retrievable via search_bs7671_visuals
        let visionEmbedding: number[] | null = null;
        if (vision.summary && vision.summary !== 'TEXT_ONLY') {
          const [vec] = await embedBatch(openAiKey, [vision.summary]);
          visionEmbedding = vec;
        }

        // Upsert — allows idempotent re-runs
        const { error: upErr } = await supabaseAdmin
          .from('bs7671_page_summaries')
          .upsert(
            {
              edition_id,
              page_number,
              visual_summary: vision.summary,
              has_figures: vision.has_figures,
              has_tables: vision.has_tables,
              has_diagrams: vision.has_diagrams,
              has_warnings: vision.has_warnings,
              image_path,
              embedding: visionEmbedding,
              vision_model: VISION_MODEL,
              vision_cost_usd: vision.cost_usd,
              metadata: { input_tokens: vision.input_tokens, output_tokens: vision.output_tokens },
            },
            { onConflict: 'edition_id,page_number' }
          );
        if (upErr) throw upErr;

        // Update job counters
        const { data: job } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .select('pages_captioned, vision_cost_total_usd')
          .eq('id', job_id)
          .single();
        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({
            pages_captioned: (job?.pages_captioned || 0) + 1,
            vision_cost_total_usd: Number(job?.vision_cost_total_usd || 0) + vision.cost_usd,
          })
          .eq('id', job_id);

        result = {
          page_number,
          summary_preview: vision.summary.slice(0, 160),
          has_figures: vision.has_figures,
          has_tables: vision.has_tables,
          has_diagrams: vision.has_diagrams,
          cost_usd: vision.cost_usd,
        };
        break;
      }

      // ─── embed_batch ───────────────────────────────────────────────
      // Enrichment strategy: when embedding each chunk, if the chunk's page has
      // a vision summary in bs7671_page_summaries, prepend a [VISUAL_CONTEXT: ...]
      // preamble onto the text before embedding. The stored content stays clean
      // (for display), but the embedding encodes both text AND visual context.
      case 'embed_batch': {
        const { job_id } = body;
        if (!job_id) throw new Error('job_id required');
        if (!openAiKey) throw new Error('OPENAI_API_KEY not configured');

        const { data: pending } = await supabaseAdmin
          .from('bs7671_chunks_staging')
          .select('id, edition_id, regulation_id, chunk_type, content, content_hash, page_number, char_start, char_end, ocr_confidence, metadata')
          .eq('job_id', job_id)
          .eq('embed_status', 'pending')
          .limit(EMBED_BATCH_SIZE);

        if (!pending || pending.length === 0) {
          const { count: remaining } = await supabaseAdmin
            .from('bs7671_chunks_staging')
            .select('id', { count: 'exact', head: true })
            .eq('job_id', job_id)
            .eq('embed_status', 'pending');
          result = { embedded: 0, remaining: remaining || 0, completed: remaining === 0 };
          break;
        }

        // Build enriched embedding input: chunk text + its page's visual
        // summary. Stored content stays clean (just the body text); the
        // embedding encodes both text AND visual context so queries like
        // "TN-C-S earthing diagram" retrieve chunks on pages that have that
        // diagram even when the body text only says "see Figure 2.1(i)".
        const uniquePages = Array.from(
          new Set(
            pending
              .map((p: { edition_id: string; page_number: number | null }) =>
                p.page_number ? `${p.edition_id}::${p.page_number}` : null
              )
              .filter((x): x is string => x !== null)
          )
        );
        const pageSummaries = new Map<string, string>(); // key "edition_id::page" → summary
        if (uniquePages.length > 0) {
          const { data: summaries } = await supabaseAdmin
            .from('bs7671_page_summaries')
            .select('edition_id, page_number, visual_summary')
            .in('edition_id', uniquePages.map((k) => k.split('::')[0]))
            .in('page_number', uniquePages.map((k) => parseInt(k.split('::')[1], 10)));
          for (const s of summaries || []) {
            const key = `${s.edition_id}::${s.page_number}`;
            if (s.visual_summary && s.visual_summary !== 'TEXT_ONLY') {
              pageSummaries.set(key, s.visual_summary);
            }
          }
        }

        const texts = pending.map((p: {
          content: string;
          edition_id: string;
          page_number: number | null;
        }) => {
          const key = p.page_number ? `${p.edition_id}::${p.page_number}` : '';
          const visual = pageSummaries.get(key);
          if (visual) {
            return `[VISUAL_CONTEXT on page ${p.page_number}] ${visual}\n\n[REGULATION_TEXT]\n${p.content}`;
          }
          return p.content;
        });
        let embeddings: number[][];
        try {
          embeddings = await embedBatch(openAiKey, texts);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          await supabaseAdmin
            .from('bs7671_chunks_staging')
            .update({ embed_status: 'failed' })
            .in('id', pending.map((p: { id: string }) => p.id));
          throw new Error(`Embedding batch failed: ${msg}`);
        }

        // Insert into bs7671_chunks with content_hash dedup
        const chunkRows = pending.map((p: {
          id: string;
          edition_id: string;
          regulation_id: string | null;
          chunk_type: string;
          content: string;
          content_hash: string;
          page_number: number | null;
          char_start: number | null;
          char_end: number | null;
          ocr_confidence: number | null;
          metadata: Record<string, unknown>;
        }, i: number) => ({
          edition_id: p.edition_id,
          regulation_id: p.regulation_id,
          chunk_type: p.chunk_type,
          content: p.content,
          content_hash: p.content_hash,
          embedding: embeddings[i],
          page_number: p.page_number,
          char_start: p.char_start,
          char_end: p.char_end,
          ocr_confidence: p.ocr_confidence,
          metadata: p.metadata,
        }));

        const { error: iErr } = await supabaseAdmin
          .from('bs7671_chunks')
          .upsert(chunkRows, { onConflict: 'edition_id,content_hash', ignoreDuplicates: true });
        if (iErr) throw iErr;

        // Mark staged rows embedded
        await supabaseAdmin
          .from('bs7671_chunks_staging')
          .update({ embed_status: 'embedded' })
          .in('id', pending.map((p: { id: string }) => p.id));

        // Update job counter
        const { data: job } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .select('chunks_embedded')
          .eq('id', job_id)
          .single();
        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({ chunks_embedded: (job?.chunks_embedded || 0) + pending.length })
          .eq('id', job_id);

        const { count: remaining } = await supabaseAdmin
          .from('bs7671_chunks_staging')
          .select('id', { count: 'exact', head: true })
          .eq('job_id', job_id)
          .eq('embed_status', 'pending');

        result = {
          embedded: pending.length,
          remaining: remaining || 0,
          completed: remaining === 0,
        };
        break;
      }

      // ─── extract_refs ──────────────────────────────────────────────
      // Scan the full_text for tables, figures, and cross-references. Runs after
      // embedding so we have all chunks/regs in place to FK back to.
      case 'extract_refs': {
        const { job_id, full_text, page_map } = body as {
          job_id: string;
          full_text: string;
          page_map: PageMapEntry[];
        };
        if (!job_id || !full_text) throw new Error('job_id and full_text required');

        const { data: job } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .select('edition_id')
          .eq('id', job_id)
          .single();
        if (!job) throw new Error('Job not found');

        const pageMap = Array.isArray(page_map) ? page_map : [];
        const edition_id = job.edition_id;

        // Tables
        const tableRows: Record<string, unknown>[] = [];
        for (const m of full_text.matchAll(RE_TABLE)) {
          const table_number = m[1].trim();
          const title = m[2].trim().replace(/[.:;]\s*$/, '');
          const offset = m.index ?? 0;
          tableRows.push({
            edition_id,
            table_number,
            title,
            raw_text: full_text.slice(offset, offset + 600),
            page_number: pageForOffset(pageMap, offset),
            auto_parse_confidence: 30, // heuristic only — needs admin review
            reviewed: false,
          });
        }
        if (tableRows.length > 0) {
          for (let i = 0; i < tableRows.length; i += 100) {
            const batch = tableRows.slice(i, i + 100);
            await supabaseAdmin
              .from('bs7671_tables')
              .upsert(batch, { onConflict: 'edition_id,table_number', ignoreDuplicates: true });
          }
        }

        // Figures
        const figureRows: Record<string, unknown>[] = [];
        for (const m of full_text.matchAll(RE_FIGURE)) {
          const figure_number = m[1].trim();
          const caption = m[2].trim().replace(/[.:;]\s*$/, '');
          const offset = m.index ?? 0;
          figureRows.push({
            edition_id,
            figure_number,
            caption,
            page_number: pageForOffset(pageMap, offset),
          });
        }
        if (figureRows.length > 0) {
          for (let i = 0; i < figureRows.length; i += 100) {
            const batch = figureRows.slice(i, i + 100);
            await supabaseAdmin
              .from('bs7671_figures')
              .upsert(batch, { onConflict: 'edition_id,figure_number', ignoreDuplicates: true });
          }
        }

        // Cross-refs — scan chunks (they have reg_number in metadata) for `see 411.3.3`
        const { data: chunks } = await supabaseAdmin
          .from('bs7671_chunks')
          .select('id, content, regulation_id, metadata')
          .eq('edition_id', edition_id);

        const refRows: Record<string, unknown>[] = [];
        for (const c of chunks || []) {
          const sourceReg = (c.metadata as { reg_number?: string } | null)?.reg_number || null;
          const seen = new Set<string>();
          for (const m of (c.content as string).matchAll(RE_CROSS_REF)) {
            const target = m[1];
            if (target === sourceReg) continue; // self-ref
            if (seen.has(target)) continue;
            seen.add(target);
            const contextStart = Math.max(0, (m.index ?? 0) - 40);
            const contextEnd = Math.min((c.content as string).length, (m.index ?? 0) + m[0].length + 40);
            refRows.push({
              source_chunk_id: c.id,
              source_reg_number: sourceReg,
              target_reg_number: target,
              target_document_type: 'bs7671',
              ref_context: (c.content as string).slice(contextStart, contextEnd),
            });
          }
        }
        if (refRows.length > 0) {
          for (let i = 0; i < refRows.length; i += 500) {
            const batch = refRows.slice(i, i + 500);
            await supabaseAdmin.from('bs7671_cross_refs').insert(batch);
          }
        }

        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({
            tables_created: tableRows.length,
            figures_created: figureRows.length,
            cross_refs_created: refRows.length,
          })
          .eq('id', job_id);

        result = {
          tables: tableRows.length,
          figures: figureRows.length,
          cross_refs: refRows.length,
        };
        break;
      }

      // ─── finalise ──────────────────────────────────────────────────
      case 'finalise': {
        const { job_id } = body;
        if (!job_id) throw new Error('job_id required');
        // Drop staging rows — we don't need them after embedding is complete
        await supabaseAdmin.from('bs7671_chunks_staging').delete().eq('job_id', job_id);
        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({ status: 'completed', completed_at: new Date().toISOString() })
          .eq('id', job_id);
        result = { completed: true };
        break;
      }

      // ─── get_status ────────────────────────────────────────────────
      case 'get_status': {
        const { job_id } = body;
        if (!job_id) throw new Error('job_id required');
        const { data, error } = await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .select('*')
          .eq('id', job_id)
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      // ─── cancel ────────────────────────────────────────────────────
      case 'cancel': {
        const { job_id } = body;
        if (!job_id) throw new Error('job_id required');
        await supabaseAdmin.from('bs7671_chunks_staging').delete().eq('job_id', job_id);
        await supabaseAdmin
          .from('bs7671_ingest_jobs')
          .update({ status: 'cancelled', completed_at: new Date().toISOString() })
          .eq('id', job_id);
        result = { cancelled: true };
        break;
      }

      // ─── generate_facets_batch ─────────────────────────────────────
      // Process the next N chunks that have no facets yet. Decomposes each
      // chunk into 5-15 atomic facets via GPT-5-mini structured output,
      // embeds each with contextual prefix, upserts into bs7671_facets.
      //
      // Designed to be called repeatedly by the admin UI until remaining = 0.
      case 'generate_facets_batch': {
        const { edition_id, batch_size = FACET_BATCH_DEFAULT } = body;
        if (!edition_id) throw new Error('edition_id required');
        if (!openAiKey) throw new Error('OPENAI_API_KEY not configured');

        // Fetch edition meta once — used for context prefix on every facet
        const { data: edition } = await supabaseAdmin
          .from('bs7671_editions')
          .select('edition_code, document_type, amendment')
          .eq('id', edition_id)
          .single();
        if (!edition) throw new Error('Edition not found');

        const docTypeShort =
          edition.document_type === 'bs7671'
            ? 'BS 7671'
            : edition.document_type === 'gn3'
              ? 'GN3'
              : edition.document_type === 'osg'
                ? 'OSG'
                : edition.document_type.toUpperCase();

        // Pull next batch via RPC (server-side NOT EXISTS). The previous
        // client-side filter broke past 1000 facets because PostgREST caps
        // SELECT at 1000 rows by default — resulting in the same handful of
        // chunks being re-processed hundreds of times and generating
        // thousands of duplicate facets.
        const { data: pendingChunks, error: pendingErr } = await supabaseAdmin.rpc(
          'get_pending_facet_chunks',
          { p_edition_id: edition_id, p_limit: batch_size }
        );
        if (pendingErr) throw pendingErr;

        if (!pendingChunks || pendingChunks.length === 0) {
          result = { processed: 0, facets_created: 0, remaining: 0, completed: true };
          break;
        }

        // Look up reg metadata in one go
        const regIds = pendingChunks
          .map((c: { regulation_id: string | null }) => c.regulation_id)
          .filter((x: string | null): x is string => !!x);
        const { data: regRows } = regIds.length
          ? await supabaseAdmin
              .from('bs7671_regulations')
              .select('id, reg_number, title, part, chapter, section')
              .in('id', regIds)
          : { data: [] };
        const regById = new Map(
          (regRows || []).map((r: {
            id: string;
            reg_number: string;
            title: string | null;
            part: string | null;
            chapter: string | null;
            section: string | null;
          }) => [r.id, r])
        );

        let totalFacetsCreated = 0;
        let totalCostUsd = 0;
        let chunksProcessed = 0;
        const errors: string[] = [];

        // Process chunks with bounded concurrency
        const queue = [...pendingChunks];
        const workers: Promise<void>[] = [];
        for (let w = 0; w < Math.min(FACET_PARALLEL, queue.length); w++) {
          workers.push(
            (async () => {
              while (queue.length > 0) {
                const chunk = queue.shift();
                if (!chunk) return;
                try {
                  const reg = chunk.regulation_id ? regById.get(chunk.regulation_id) : null;

                  // Split long chunks into 500-800 char segments so each LLM
                  // call sees a right-sized input. Segments run in parallel
                  // and all resulting facets get stored under the parent
                  // chunk_id — retrieval remains reg-level accurate.
                  const segments = splitIntoSegments(chunk.content);
                  const extractionResults = await Promise.all(
                    segments.map((seg, idx) => {
                      const prompt = buildFacetPrompt({
                        docType: edition.document_type,
                        editionCode: edition.edition_code,
                        regNumber: reg?.reg_number ?? null,
                        regTitle: reg?.title ?? null,
                        part: reg?.part ?? null,
                        chapter: reg?.chapter ?? null,
                        section: reg?.section ?? null,
                        content: seg,
                        segmentInfo:
                          segments.length > 1
                            ? { index: idx, total: segments.length }
                            : undefined,
                      });
                      return extractFacetsFromChunk(openAiKey, prompt);
                    })
                  );

                  const allFacets: FacetOutput[] = [];
                  let segInTokens = 0;
                  let segOutTokens = 0;
                  for (const ext of extractionResults) {
                    totalCostUsd += ext.cost_usd;
                    segInTokens += ext.input_tokens;
                    segOutTokens += ext.output_tokens;
                    allFacets.push(...ext.facets);
                  }

                  if (allFacets.length === 0) {
                    throw new Error(
                      `Empty facets across ${segments.length} segment(s) (in=${segInTokens} out=${segOutTokens})`
                    );
                  }

                  // Build embedding inputs: context_prefix + content
                  const facetRows: Record<string, unknown>[] = [];
                  const embedInputs: string[] = [];
                  for (const f of allFacets) {
                    const contextPrefix = buildContextPrefix({
                      docTypeShort,
                      editionCode: edition.edition_code,
                      part: reg?.part ?? null,
                      chapter: reg?.chapter ?? null,
                      section: reg?.section ?? null,
                      regNumber: reg?.reg_number ?? null,
                      regTitle: reg?.title ?? null,
                      facetType: f.facet_type,
                      primaryTopic: f.primary_topic,
                    });
                    const embedInput = `${contextPrefix}\n\n${f.content}`;
                    embedInputs.push(embedInput);

                    const hashKey = `${f.facet_type}::${f.primary_topic}::${f.content}`.slice(
                      0,
                      2000
                    );
                    const hash = await sha256Hex(normaliseForHash(hashKey));

                    facetRows.push({
                      chunk_id: chunk.id,
                      edition_id: chunk.edition_id,
                      regulation_id: chunk.regulation_id,
                      document_type: edition.document_type,
                      facet_type: f.facet_type,
                      primary_topic: f.primary_topic,
                      content: f.content,
                      context_prefix: contextPrefix,
                      system_types: f.system_types ?? [],
                      bs7671_zones: f.bs7671_zones ?? [],
                      equipment_category: f.equipment_category ?? null,
                      protection_method: f.protection_method ?? null,
                      disconnection_time_s: f.disconnection_time_s ?? null,
                      test_equipment: f.test_equipment ?? [],
                      keywords: f.keywords ?? [],
                      confidence_score: f.confidence_score ?? 0.75,
                      facet_hash: hash,
                    });
                  }

                  // Embed in one batch call
                  const vectors = await embedBatch(openAiKey, embedInputs);
                  for (let i = 0; i < facetRows.length; i++) {
                    facetRows[i].embedding = vectors[i];
                  }

                  const { error: upErr } = await supabaseAdmin
                    .from('bs7671_facets')
                    .upsert(facetRows, {
                      onConflict: 'chunk_id,facet_hash',
                      ignoreDuplicates: true,
                    });
                  if (upErr) throw upErr;

                  totalFacetsCreated += facetRows.length;
                  chunksProcessed += 1;

                  // On success, clear any prior failure record for this chunk
                  await supabaseAdmin
                    .from('bs7671_facet_failures')
                    .update({ resolved: true, resolved_at: new Date().toISOString() })
                    .eq('chunk_id', chunk.id)
                    .eq('resolved', false);
                } catch (err) {
                  const msg = err instanceof Error ? err.message : String(err);
                  console.warn(`[generate_facets] chunk ${chunk.id} failed: ${msg}`);
                  errors.push(`${chunk.id}: ${msg.slice(0, 120)}`);

                  // Upsert failure record — increments attempts via prior lookup
                  const { data: prior } = await supabaseAdmin
                    .from('bs7671_facet_failures')
                    .select('attempts')
                    .eq('chunk_id', chunk.id)
                    .maybeSingle();
                  await supabaseAdmin
                    .from('bs7671_facet_failures')
                    .upsert(
                      {
                        chunk_id: chunk.id,
                        edition_id: chunk.edition_id,
                        error_message: msg.slice(0, 500),
                        attempts: (prior?.attempts ?? 0) + 1,
                        last_failed_at: new Date().toISOString(),
                        resolved: false,
                        resolved_at: null,
                      },
                      { onConflict: 'chunk_id' }
                    );
                }
              }
            })()
          );
        }
        await Promise.all(workers);

        // True remaining via RPC — counts chunks with no facet rows at all
        const { data: progress } = await supabaseAdmin
          .rpc('get_facet_progress', { p_edition_id: edition_id });
        const remaining = progress?.[0]?.chunks_remaining ?? 0;

        result = {
          processed: chunksProcessed,
          facets_created: totalFacetsCreated,
          cost_usd: Number(totalCostUsd.toFixed(4)),
          remaining: Math.max(0, Number(remaining)),
          completed: Number(remaining) <= 0,
          errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
        };
        break;
      }

      // ─── generate_table_facets_batch ─────────────────────────────────
      // Vision-based table extraction: sends each table's page PNG to
      // GPT-5-mini which reads the table directly from the image and
      // decomposes every cell into atomic compliance facts. Bypasses the
      // garbled OCR in bs7671_tables.raw_text.
      case 'generate_table_facets_batch': {
        const { edition_id, batch_size = TABLE_FACET_BATCH_DEFAULT } = body;
        if (!edition_id) throw new Error('edition_id required');
        if (!openAiKey) throw new Error('OPENAI_API_KEY not configured');

        const { data: edition } = await supabaseAdmin
          .from('bs7671_editions')
          .select('edition_code, document_type')
          .eq('id', edition_id)
          .single();
        if (!edition) throw new Error('Edition not found');

        const docTypeShort =
          edition.document_type === 'bs7671'
            ? 'BS 7671'
            : edition.document_type === 'gn3'
              ? 'GN3'
              : edition.document_type === 'osg'
                ? 'OSG'
                : edition.document_type.toUpperCase();

        const { data: pendingTables, error: pendingErr } = await supabaseAdmin.rpc(
          'get_pending_facet_tables',
          { p_edition_id: edition_id, p_limit: batch_size }
        );
        if (pendingErr) throw pendingErr;

        if (!pendingTables || pendingTables.length === 0) {
          result = {
            processed: 0,
            facets_created: 0,
            remaining: 0,
            completed: true,
            cost_usd: 0,
          };
          break;
        }

        let tablesProcessed = 0;
        let totalFacetsCreated = 0;
        let totalCostUsd = 0;
        const errors: string[] = [];

        const queue = [...pendingTables];
        const workers: Promise<void>[] = [];
        for (let w = 0; w < Math.min(TABLE_FACET_PARALLEL, queue.length); w++) {
          workers.push(
            (async () => {
              while (queue.length > 0) {
                const tbl = queue.shift();
                if (!tbl) return;
                try {
                  // Sign the page image URL for OpenAI vision fetch
                  const { data: signed, error: signErr } = await supabaseAdmin.storage
                    .from(PAGE_IMAGES_BUCKET)
                    .createSignedUrl(tbl.image_path, 900);
                  if (signErr || !signed?.signedUrl) {
                    throw new Error(
                      `Could not sign image URL for table ${tbl.table_number}: ${signErr?.message || 'unknown'}`
                    );
                  }

                  const prompt = buildTableVisionPrompt({
                    docTypeShort,
                    editionCode: edition.edition_code,
                    tableNumber: tbl.table_number,
                    title: tbl.title,
                    rawTextHint: tbl.raw_text,
                    pageNumber: tbl.page_number,
                  });

                  const extraction = await extractTableFacetsWithVision(
                    openAiKey,
                    signed.signedUrl,
                    prompt
                  );
                  totalCostUsd += extraction.cost_usd;

                  if (extraction.facets.length === 0) {
                    throw new Error(
                      `Empty facets for table ${tbl.table_number} (in=${extraction.input_tokens} out=${extraction.output_tokens})`
                    );
                  }

                  const facetRows: Record<string, unknown>[] = [];
                  const embedInputs: string[] = [];
                  for (const f of extraction.facets) {
                    const contextPrefix = `[${docTypeShort}] ${edition.edition_code} · Table ${tbl.table_number} · ${f.facet_type} · ${f.primary_topic}`;
                    const embedInput = `${contextPrefix}\n\n${f.content}`;
                    embedInputs.push(embedInput);

                    const hashKey = `${f.facet_type}::${f.primary_topic}::${f.content}`.slice(
                      0,
                      2000
                    );
                    const hash = await sha256Hex(normaliseForHash(hashKey));

                    facetRows.push({
                      chunk_id: null,
                      edition_id: tbl.edition_id,
                      regulation_id: null,
                      document_type: edition.document_type,
                      source_type: 'table',
                      source_id: tbl.id,
                      facet_type: f.facet_type,
                      primary_topic: f.primary_topic,
                      content: f.content,
                      context_prefix: contextPrefix,
                      system_types: f.system_types ?? [],
                      bs7671_zones: f.bs7671_zones ?? [],
                      equipment_category: f.equipment_category ?? null,
                      protection_method: f.protection_method ?? null,
                      disconnection_time_s: f.disconnection_time_s ?? null,
                      test_equipment: f.test_equipment ?? [],
                      keywords: f.keywords ?? [],
                      confidence_score: f.confidence_score ?? 0.75,
                      facet_hash: hash,
                      metadata: {
                        table_number: tbl.table_number,
                        page_number: tbl.page_number,
                      },
                    });
                  }

                  const vectors = await embedBatch(openAiKey, embedInputs);
                  for (let i = 0; i < facetRows.length; i++) {
                    facetRows[i].embedding = vectors[i];
                  }

                  const { error: upErr } = await supabaseAdmin
                    .from('bs7671_facets')
                    .upsert(facetRows, {
                      onConflict: 'source_id,facet_hash',
                      ignoreDuplicates: true,
                    });
                  if (upErr) throw upErr;

                  totalFacetsCreated += facetRows.length;
                  tablesProcessed += 1;
                } catch (err) {
                  const msg = err instanceof Error ? err.message : String(err);
                  console.warn(`[generate_table_facets] table ${tbl.table_number} failed: ${msg}`);
                  errors.push(`${tbl.table_number}: ${msg.slice(0, 120)}`);
                }
              }
            })()
          );
        }
        await Promise.all(workers);

        const { data: prog } = await supabaseAdmin.rpc('get_table_facet_progress', {
          p_edition_id: edition_id,
        });
        const remaining = prog?.[0]?.tables_remaining ?? 0;

        result = {
          processed: tablesProcessed,
          facets_created: totalFacetsCreated,
          cost_usd: Number(totalCostUsd.toFixed(4)),
          remaining: Math.max(0, Number(remaining)),
          completed: Number(remaining) <= 0,
          errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
        };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('ingest-bs7671-pdf error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
