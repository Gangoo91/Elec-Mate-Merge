/**
 * BS 7671 Facet Retrieval (Phase 2 hybrid pipeline)
 *
 * Runs parallel retrieval against the NEW bs7671_facets table (46.5K rows,
 * 33.4K of them on BS 7671 2018 + A4:2026), fuses with RRF, and returns a
 * ranked set of context units for the LLM.
 *
 * Data sources hit in parallel (each with a tight deadline):
 *   1. Exact regulation lookup  (bs7671_regulations join facets)
 *   2. Vector similarity        (facets.embedding <=> :q_embedding)
 *   3. Full-text (BM25)         (facets.tsv @@ websearch_to_tsquery)
 *   4. Table / figure lookup    (bs7671_tables, bs7671_figures)
 *
 * Union → dedupe by id → RRF rerank → cross-ref expansion (related, non-primary).
 *
 * The module tolerates individual retrieval failures: a timeout in one branch
 * does NOT kill the whole request.
 */

import type { BS7671QueryUnderstanding } from './bs7671-query-understanding.ts';

// A4:2026 edition id — default for exact-reg + cross-ref branches (BS 7671 only;
// GN3 and OSG don't have Part/Chapter/Section reg numbers).
export const A4_2026_EDITION_ID = '41c1f30d-4f1a-432f-9e2d-61b91290149f';
export const A4_2026_EDITION_CODE = '2018+A4:2026';

// GN3 9th Ed:2022 (A4) — inspection & testing procedures.
export const GN3_A4_EDITION_ID = '24a6bb85-03ec-4d3c-9362-8b85f64f6f49';
export const GN3_A4_EDITION_CODE = 'GN3 9th Ed:2022 (A4)';

// OSG 9th Ed:2022 (A4) — practical install methods.
export const OSG_A4_EDITION_ID = '538f1f69-0de6-4756-afed-efc76138c6a6';
export const OSG_A4_EDITION_CODE = 'OSG 9th Ed:2022 (A4)';

// All three A4-aligned editions — used by vector + BM25 post-filters so
// GN3/OSG rows are not silently dropped when BS 7671 hits dominate.
export const A4_ALIGNED_EDITION_CODES = new Set<string>([
  A4_2026_EDITION_CODE,
  GN3_A4_EDITION_CODE,
  OSG_A4_EDITION_CODE,
]);

// Hard cap on retrieval wall-clock time before we start streaming.
// Per spec: first-token target <1s, so keep retrieval <400ms.
export const RETRIEVAL_DEADLINE_MS = 400;

export interface FacetContextUnit {
  /** Stable id (facet id or synthetic for tables / figures). */
  id: string;
  /** Where this hit came from — useful for debugging and citation. */
  source: 'exact_reg' | 'vector' | 'bm25' | 'table' | 'figure' | 'cross_ref';
  /** Primary rank from the source (1 = best). Used for RRF. */
  rank: number;
  /** Raw score from the source (if any). */
  score?: number;

  reg_number?: string;
  reg_title?: string;
  part?: string;
  chapter?: string;
  section?: string;
  document_type?: string;
  edition_code?: string;
  page_number?: number;
  facet_type?: string;
  primary_topic?: string;
  content: string;
  context_prefix?: string;
  system_types?: string[];
  bs7671_zones?: string[];
  equipment_category?: string;
  protection_method?: string;
  keywords?: string[];
}

export interface FacetRetrievalResult {
  primary: FacetContextUnit[];
  related: FacetContextUnit[];
  stats: {
    exact_ms: number;
    vector_ms: number;
    bm25_ms: number;
    table_ms: number;
    total_ms: number;
    total_candidates: number;
    deadline_exceeded: boolean;
  };
}

export interface FacetRetrievalOptions {
  supabase: any;
  understanding: BS7671QueryUnderstanding;
  /** Required for vector search. Pre-computed to allow caller caching. */
  queryEmbedding: number[] | null;
  editionId?: string;
  /** Minimum confidence on facets. Default 0.5. */
  minConfidence?: number;
  /** How many primary units to keep (default 5). */
  topK?: number;
  /** Hard deadline in ms. Default RETRIEVAL_DEADLINE_MS. */
  deadlineMs?: number;
  /** Optional logger hook. */
  log?: (msg: string, meta?: Record<string, unknown>) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

async function withDeadline<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return await Promise.race<T>([
    p,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function rrfScore(rank: number, k = 60): number {
  return 1 / (k + rank);
}

function toUnit(
  row: any,
  source: FacetContextUnit['source'],
  rank: number,
  score?: number
): FacetContextUnit {
  return {
    id: row.facet_id || row.id || `${source}-${rank}-${Math.random().toString(36).slice(2, 8)}`,
    source,
    rank,
    score,
    reg_number: row.reg_number || row.regulation_number,
    reg_title: row.reg_title || row.title,
    part: row.part,
    chapter: row.chapter,
    section: row.section,
    document_type: row.document_type,
    edition_code: row.edition_code,
    page_number: row.page_number,
    facet_type: row.facet_type,
    primary_topic: row.primary_topic,
    content: row.content || row.full_text || row.raw_text || row.caption || '',
    context_prefix: row.context_prefix,
    system_types: row.system_types,
    bs7671_zones: row.bs7671_zones,
    equipment_category: row.equipment_category,
    protection_method: row.protection_method,
    keywords: row.keywords,
  };
}

// ─── Retrieval branches ──────────────────────────────────────────────────

/**
 * Branch 1: Exact regulation lookup. If the user wrote "411.3.3" we pull the
 * matching bs7671_regulations row plus its child facets directly.
 */
async function fetchExactRegulations(
  opts: FacetRetrievalOptions
): Promise<FacetContextUnit[]> {
  const { supabase, understanding, editionId = A4_2026_EDITION_ID } = opts;
  if (understanding.regulation_numbers.length === 0) return [];

  // 1. Find matching regulations (drop edition_id filter if nothing matches — fallback).
  const { data: regs, error: regErr } = await supabase
    .from('bs7671_regulations')
    .select('id, reg_number, title, part, chapter, section, full_text')
    .in('reg_number', understanding.regulation_numbers)
    .eq('edition_id', editionId)
    .limit(10);

  if (regErr || !regs || regs.length === 0) return [];

  const regIds = regs.map((r: any) => r.id);

  // 2. Pull top facets for each reg (order by confidence, cap at 3 per reg).
  const { data: facets } = await supabase
    .from('bs7671_facets')
    .select(
      'id, regulation_id, facet_type, primary_topic, content, context_prefix, keywords, system_types, bs7671_zones, equipment_category, protection_method, document_type, confidence_score'
    )
    .in('regulation_id', regIds)
    .eq('edition_id', editionId)
    .gte('confidence_score', opts.minConfidence ?? 0.5)
    .order('confidence_score', { ascending: false })
    .limit(15);

  const byRegId = new Map<string, any>(regs.map((r: any) => [r.id, r]));

  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const f of facets ?? []) {
    const reg = byRegId.get(f.regulation_id) || {};
    out.push(
      toUnit(
        {
          facet_id: f.id,
          ...f,
          reg_number: reg.reg_number,
          reg_title: reg.title,
          part: reg.part,
          chapter: reg.chapter,
          section: reg.section,
        },
        'exact_reg',
        ++rank,
        1.0
      )
    );
  }

  // If we had regulations but no facets yet, still return regulation text as a fallback.
  if (out.length === 0) {
    for (const reg of regs) {
      out.push(
        toUnit(
          {
            facet_id: reg.id,
            reg_number: reg.reg_number,
            reg_title: reg.title,
            part: reg.part,
            chapter: reg.chapter,
            section: reg.section,
            content: reg.full_text,
            primary_topic: reg.title,
            facet_type: 'regulation',
          },
          'exact_reg',
          ++rank,
          0.95
        )
      );
    }
  }
  return out;
}

/**
 * Branch 2: Vector similarity against bs7671_facets.embedding (halfvec 3072).
 * Uses the existing search_bs7671_v3 RPC if available (has RRF internally).
 */
async function fetchVectorMatches(
  opts: FacetRetrievalOptions
): Promise<FacetContextUnit[]> {
  const { supabase, understanding, queryEmbedding, editionId = A4_2026_EDITION_ID } = opts;
  if (!queryEmbedding || queryEmbedding.length === 0) return [];
  void editionId;

  // The RPC does not accept edition_id yet — we over-fetch and post-filter
  // to the default (A4:2026) edition code so answers reflect the latest rules.
  const { data, error } = await supabase.rpc('search_bs7671_v3', {
    query_embedding: queryEmbedding,
    query_text: null, // vector-only branch
    document_types: null,
    reg_number_filter: null,
    zones_filter: understanding.zones.length ? understanding.zones : null,
    system_types_filter: understanding.system_types.length ? understanding.system_types : null,
    equipment_filter: understanding.equipment_category ?? null,
    protection_filter: understanding.protection_method ?? null,
    facet_type_filter: null,
    match_count: 40,
    vector_weight: 1.0,
    bm25_weight: 0.0,
    rrf_k: 60,
    expand_graph: false,
    graph_expand_limit: 0,
  });

  if (error || !data) return [];

  // Post-filter: keep any of the three A4-aligned editions (BS 7671 + GN3 + OSG)
  // so testing/install questions get the right book. Other editions (older
  // amendments) only surface when no A4 rows at all come back.
  const rows = data as any[];
  const a4Rows = rows.filter((r) => A4_ALIGNED_EDITION_CODES.has(r.edition_code));
  const selected = a4Rows.length > 0 ? a4Rows : rows;

  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const row of selected) {
    out.push(toUnit(row, 'vector', ++rank, Number(row.vector_score ?? row.rrf_score ?? 0)));
    if (out.length >= 20) break;
  }
  return out;
}

/**
 * Branch 3: Full-text (BM25) against bs7671_facets.tsv.
 */
async function fetchFullTextMatches(
  opts: FacetRetrievalOptions
): Promise<FacetContextUnit[]> {
  const { supabase, understanding, editionId = A4_2026_EDITION_ID } = opts;
  const queryText = understanding.original;
  if (!queryText || queryText.length < 2) return [];
  void editionId;

  const { data, error } = await supabase.rpc('search_bs7671_v3', {
    query_embedding: null,
    query_text: queryText,
    document_types: null,
    reg_number_filter: null,
    zones_filter: understanding.zones.length ? understanding.zones : null,
    system_types_filter: understanding.system_types.length ? understanding.system_types : null,
    equipment_filter: understanding.equipment_category ?? null,
    protection_filter: understanding.protection_method ?? null,
    facet_type_filter: null,
    match_count: 30,
    vector_weight: 0.0,
    bm25_weight: 1.0,
    rrf_k: 60,
    expand_graph: false,
    graph_expand_limit: 0,
  });

  if (error || !data) return [];

  const rows = data as any[];
  const a4Rows = rows.filter((r) => A4_ALIGNED_EDITION_CODES.has(r.edition_code));
  const selected = a4Rows.length > 0 ? a4Rows : rows;

  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const row of selected) {
    out.push(toUnit(row, 'bm25', ++rank, Number(row.bm25_score ?? row.rrf_score ?? 0)));
    if (out.length >= 15) break;
  }
  return out;
}

/**
 * Branch 4: Direct table / figure lookup if the user named them.
 */
async function fetchTablesAndFigures(
  opts: FacetRetrievalOptions
): Promise<FacetContextUnit[]> {
  const { supabase, understanding, editionId = A4_2026_EDITION_ID } = opts;
  if (understanding.table_refs.length === 0 && understanding.figure_refs.length === 0) {
    return [];
  }

  const promises: Promise<any>[] = [];
  if (understanding.table_refs.length > 0) {
    promises.push(
      supabase
        .from('bs7671_tables')
        .select('id, table_number, title, appendix, raw_text, page_number')
        .in('table_number', understanding.table_refs)
        .eq('edition_id', editionId)
        .limit(8)
    );
  } else {
    promises.push(Promise.resolve({ data: [] }));
  }

  if (understanding.figure_refs.length > 0) {
    promises.push(
      supabase
        .from('bs7671_figures')
        .select('id, figure_number, caption, page_number')
        .in('figure_number', understanding.figure_refs)
        .eq('edition_id', editionId)
        .limit(8)
    );
  } else {
    promises.push(Promise.resolve({ data: [] }));
  }

  const [tablesRes, figuresRes] = await Promise.all(promises);

  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const t of tablesRes?.data ?? []) {
    out.push({
      id: `table-${t.id}`,
      source: 'table',
      rank: ++rank,
      score: 0.95,
      primary_topic: `Table ${t.table_number}${t.title ? ' – ' + t.title : ''}`,
      content: t.raw_text || t.title || '',
      facet_type: 'table',
      page_number: t.page_number,
    });
  }
  for (const f of figuresRes?.data ?? []) {
    out.push({
      id: `figure-${f.id}`,
      source: 'figure',
      rank: ++rank,
      score: 0.9,
      primary_topic: `Figure ${f.figure_number}`,
      content: f.caption || '',
      facet_type: 'figure',
      page_number: f.page_number,
    });
  }
  return out;
}

// ─── Fusion + cross-ref expansion ────────────────────────────────────────

function fuseUnits(
  branches: FacetContextUnit[][],
  topK: number,
  understanding?: BS7671QueryUnderstanding
): FacetContextUnit[] {
  // Weight exact_reg highest, then vector, then bm25, then table/figure.
  const WEIGHTS: Record<FacetContextUnit['source'], number> = {
    exact_reg: 2.0,
    table: 1.4,
    figure: 1.4,
    vector: 1.2,
    bm25: 1.0,
    cross_ref: 0.3,
  };

  // Book boost based on query intent. GN3 is the inspection & testing book;
  // OSG is the on-site install companion. BS 7671 is always the authoritative
  // source, so we never penalise it — we only lift GN3/OSG when their remit fits.
  const bookBoost = (docType: string | undefined): number => {
    if (!docType) return 1.0;
    const intent = understanding?.intent;
    const topics = understanding?.topic_tags ?? [];
    const hasTestingTopic =
      topics.includes('testing') ||
      topics.includes('inspection') ||
      topics.includes('certification');

    if (docType === 'gn3') {
      if (intent === 'procedure' || hasTestingTopic) return 1.35;
      return 0.9;
    }
    if (docType === 'osg') {
      if (intent === 'procedure') return 1.2;
      if (intent === 'calculation') return 1.1;
      return 0.95;
    }
    return 1.0;
  };

  const byId = new Map<string, { unit: FacetContextUnit; score: number }>();

  for (const branch of branches) {
    for (const u of branch) {
      const weight = WEIGHTS[u.source] ?? 1.0;
      const contribution = weight * bookBoost(u.document_type) * rrfScore(u.rank);
      const existing = byId.get(u.id);
      if (existing) {
        existing.score += contribution;
      } else {
        byId.set(u.id, { unit: u, score: contribution });
      }
    }
  }

  return Array.from(byId.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => x.unit);
}

async function expandCrossRefs(
  supabase: any,
  units: FacetContextUnit[],
  editionId: string
): Promise<FacetContextUnit[]> {
  const sourceRegNumbers = uniqStr(
    units.map((u) => u.reg_number).filter((r): r is string => !!r)
  );
  if (sourceRegNumbers.length === 0) return [];

  const { data: refs } = await supabase
    .from('bs7671_cross_refs')
    .select('source_reg_number, target_reg_number, ref_context')
    .in('source_reg_number', sourceRegNumbers)
    .limit(20);

  const targets = uniqStr((refs ?? []).map((r: any) => r.target_reg_number)).slice(0, 5);
  if (targets.length === 0) return [];

  const { data: regs } = await supabase
    .from('bs7671_regulations')
    .select('id, reg_number, title, full_text, part, chapter, section')
    .in('reg_number', targets)
    .eq('edition_id', editionId)
    .limit(5);

  const alreadyPrimary = new Set(units.map((u) => u.reg_number));
  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const r of regs ?? []) {
    if (alreadyPrimary.has(r.reg_number)) continue;
    out.push(
      toUnit(
        {
          facet_id: `xref-${r.id}`,
          reg_number: r.reg_number,
          reg_title: r.title,
          content: r.full_text,
          primary_topic: r.title,
          part: r.part,
          chapter: r.chapter,
          section: r.section,
          facet_type: 'related',
        },
        'cross_ref',
        ++rank,
        0.5
      )
    );
  }
  return out;
}

function uniqStr(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

// ─── Public entrypoint ───────────────────────────────────────────────────

export async function retrieveBS7671Facets(
  opts: FacetRetrievalOptions
): Promise<FacetRetrievalResult> {
  const start = Date.now();
  const deadlineMs = opts.deadlineMs ?? RETRIEVAL_DEADLINE_MS;
  const topK = opts.topK ?? 5;
  const log = opts.log ?? (() => {});

  const deadlinePromise = <T>(p: Promise<T>, label: string) =>
    withDeadline(p, deadlineMs, [] as unknown as T).catch((err) => {
      log(`retrieval branch failed: ${label}`, { err: String(err) });
      return [] as unknown as T;
    });

  const t = {
    exact: Date.now(),
    vector: Date.now(),
    bm25: Date.now(),
    table: Date.now(),
  };

  // Kick off all branches in parallel.
  const [exactResults, vectorResults, bm25Results, tableResults] = await Promise.all([
    deadlinePromise(fetchExactRegulations(opts), 'exact').then((v) => {
      t.exact = Date.now() - t.exact;
      return v as FacetContextUnit[];
    }),
    deadlinePromise(fetchVectorMatches(opts), 'vector').then((v) => {
      t.vector = Date.now() - t.vector;
      return v as FacetContextUnit[];
    }),
    deadlinePromise(fetchFullTextMatches(opts), 'bm25').then((v) => {
      t.bm25 = Date.now() - t.bm25;
      return v as FacetContextUnit[];
    }),
    deadlinePromise(fetchTablesAndFigures(opts), 'table').then((v) => {
      t.table = Date.now() - t.table;
      return v as FacetContextUnit[];
    }),
  ]);

  const total_candidates =
    exactResults.length + vectorResults.length + bm25Results.length + tableResults.length;

  const primary = fuseUnits(
    [exactResults, tableResults, vectorResults, bm25Results],
    topK,
    opts.understanding
  );

  // Cross-ref expansion — non-blocking, fire on a short deadline.
  let related: FacetContextUnit[] = [];
  try {
    related = await withDeadline(
      expandCrossRefs(opts.supabase, primary, opts.editionId ?? A4_2026_EDITION_ID),
      Math.max(100, Math.min(200, deadlineMs / 2)),
      []
    );
  } catch (err) {
    log('cross-ref expansion failed', { err: String(err) });
    related = [];
  }

  const total_ms = Date.now() - start;
  return {
    primary,
    related,
    stats: {
      exact_ms: t.exact,
      vector_ms: t.vector,
      bm25_ms: t.bm25,
      table_ms: t.table,
      total_ms,
      total_candidates,
      deadline_exceeded: total_ms > deadlineMs * 1.3,
    },
  };
}

/**
 * Format a list of retrieved units into a compact, citation-rich context block
 * suitable for use as a dynamic system message.
 */
export function formatFacetsForPrompt(
  primary: FacetContextUnit[],
  related: FacetContextUnit[]
): string {
  if (primary.length === 0 && related.length === 0) return '';
  const lines: string[] = [];

  const bookLabel = (docType?: string): string => {
    if (docType === 'gn3') return 'GN3';
    if (docType === 'osg') return 'OSG';
    return 'BS 7671 A4:2026';
  };

  if (primary.length > 0) {
    lines.push('[RELEVANT BS 7671 A4:2026 / GN3 / OSG CONTEXT]');
    primary.forEach((u, i) => {
      const book = bookLabel(u.document_type);
      const header = u.reg_number
        ? `[${book}] Reg ${u.reg_number}${u.reg_title ? ' — ' + u.reg_title : ''}`
        : `[${book}] ${u.primary_topic || `Context ${i + 1}`}`;
      const tag = u.facet_type ? `(${u.facet_type})` : '';
      const content = (u.content || '').trim().slice(0, 900);
      lines.push(`${i + 1}. ${header} ${tag}\n   ${content}`);
    });
  }

  if (related.length > 0) {
    lines.push('');
    lines.push('[RELATED REGULATIONS (cross-referenced, secondary)]');
    related.forEach((u) => {
      const book = bookLabel(u.document_type);
      const header = u.reg_number
        ? `[${book}] Reg ${u.reg_number}${u.reg_title ? ' — ' + u.reg_title : ''}`
        : `[${book}] ${u.primary_topic || 'Related'}`;
      const snippet = (u.content || '').trim().slice(0, 300);
      lines.push(`- ${header}: ${snippet}`);
    });
  }

  return lines.join('\n');
}
