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
