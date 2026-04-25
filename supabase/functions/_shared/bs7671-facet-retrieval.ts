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
  source:
    | 'exact_reg'
    | 'vector'
    | 'bm25'
    | 'table'
    | 'figure'
    | 'cross_ref'
    | 'practical';
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
  equipment_subcategory?: string;
  protection_method?: string;
  keywords?: string[];

  /** Practical-intelligence-only fields (only set when source === 'practical'). */
  bs7671_regulations?: string[];
  test_procedures?: unknown;
  common_defects?: string[];
  troubleshooting_steps?: string[];
  inspection_checklist?: string[];
  typical_duration_minutes?: number;
  skill_level?: string;
  tools_required?: string[];
  /** Marker — true when this unit is from practical_work_intelligence. */
  is_practical?: boolean;
}

export interface FacetRetrievalResult {
  primary: FacetContextUnit[];
  related: FacetContextUnit[];
  practical: FacetContextUnit[];
  stats: {
    exact_ms: number;
    vector_ms: number;
    bm25_ms: number;
    table_ms: number;
    practical_ms: number;
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

/**
 * Branch 5: Practical Work Intelligence — vector + BM25 hybrid over the
 * separate `practical_work_intelligence` corpus (industrial, EV, solar, fire,
 * emergency lighting, data-centre, BMS, HVAC etc.). Mirrors the BS 7671
 * branches but goes through `search_practical_v1` and tags every result as
 * `source: 'practical'` so the prompt formatter labels it as practitioner
 * guidance, not regulation.
 *
 * Cap is intentionally smaller (5) so practical context never dominates the
 * BS 7671 regulatory results — it complements them.
 */
async function fetchPracticalIntelligence(
  opts: FacetRetrievalOptions
): Promise<FacetContextUnit[]> {
  const { supabase, understanding, queryEmbedding } = opts;
  const queryText = understanding.original;

  // Bail early if neither vector nor text query is usable.
  if (
    (!queryEmbedding || queryEmbedding.length === 0) &&
    (!queryText || queryText.length < 3)
  ) {
    return [];
  }

  // Optional equipment filter when the query understanding pinned a domain.
  // We keep it loose — the topic tag may not exactly match the stored
  // equipment_category, so prefer null (let RRF rank) unless we're confident.
  const equipmentFilter: string | null = null;

  const { data, error } = await supabase.rpc('search_practical_v1', {
    query_embedding: queryEmbedding ?? null,
    query_text: queryText || null,
    equipment_filter: equipmentFilter,
    facet_type_filter: null,
    reg_filter: null,
    min_confidence: 0.6,
    match_count: 8,
    vector_weight: queryEmbedding ? 1.0 : 0.0,
    bm25_weight: queryText ? 1.0 : 0.0,
    rrf_k: 60,
  });

  if (error || !data) return [];
  const rows = data as Array<{
    facet_id: string;
    primary_topic: string | null;
    equipment_category: string | null;
    equipment_subcategory: string | null;
    facet_type: string | null;
    installation_method: string | null;
    bs7671_regulations: string[] | null;
    bs7671_zones: string[] | null;
    keywords: string[] | null;
    test_procedures: unknown;
    common_defects: string[] | null;
    troubleshooting_steps: string[] | null;
    inspection_checklist: string[] | null;
    typical_duration_minutes: number | null;
    skill_level: string | null;
    tools_required: string[] | null;
    confidence_score: number | null;
    rrf_score: number | null;
    retrieval_source: string | null;
  }>;

  const out: FacetContextUnit[] = [];
  let rank = 0;
  for (const r of rows.slice(0, 8)) {
    out.push({
      id: `pwi-${r.facet_id}`,
      source: 'practical',
      rank: ++rank,
      score: Number(r.rrf_score ?? r.confidence_score ?? 0),
      primary_topic: r.primary_topic ?? undefined,
      equipment_category: r.equipment_category ?? undefined,
      equipment_subcategory: r.equipment_subcategory ?? undefined,
      facet_type: r.facet_type ?? undefined,
      bs7671_zones: r.bs7671_zones ?? undefined,
      keywords: r.keywords ?? undefined,
      bs7671_regulations: r.bs7671_regulations ?? undefined,
      test_procedures: r.test_procedures,
      common_defects: r.common_defects ?? undefined,
      troubleshooting_steps: r.troubleshooting_steps ?? undefined,
      inspection_checklist: r.inspection_checklist ?? undefined,
      typical_duration_minutes: r.typical_duration_minutes ?? undefined,
      skill_level: r.skill_level ?? undefined,
      tools_required: r.tools_required ?? undefined,
      content: r.primary_topic ?? '',
      is_practical: true,
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
    practical: 0.85, // intentionally below regulatory branches so regs win on ties
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
    practical: Date.now(),
  };

  // Kick off all branches in parallel — including the new practical_work
  // branch which queries the separate corpus and is RRF-merged into primary.
  const [exactResults, vectorResults, bm25Results, tableResults, practicalResults] =
    await Promise.all([
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
      deadlinePromise(fetchPracticalIntelligence(opts), 'practical').then((v) => {
        t.practical = Date.now() - t.practical;
        return v as FacetContextUnit[];
      }),
    ]);

  const total_candidates =
    exactResults.length +
    vectorResults.length +
    bm25Results.length +
    tableResults.length +
    practicalResults.length;

  // Practical results are kept as a SEPARATE bucket (returned in `practical`)
  // AND fused into the primary list at a lower weight, so the regulatory
  // branches always win on rank ties. This gives the AI both:
  //   - regulatory primary (which wins on compliance claims)
  //   - practical context (cited as practitioner guidance)
  const primary = fuseUnits(
    [exactResults, tableResults, vectorResults, bm25Results, practicalResults],
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
    practical: practicalResults.slice(0, 5), // separate bucket so caller can render distinctly
    stats: {
      exact_ms: t.exact,
      vector_ms: t.vector,
      bm25_ms: t.bm25,
      table_ms: t.table,
      practical_ms: t.practical,
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
  related: FacetContextUnit[],
  practical: FacetContextUnit[] = []
): string {
  if (primary.length === 0 && related.length === 0 && practical.length === 0) return '';
  const lines: string[] = [];

  const bookLabel = (docType?: string): string => {
    if (docType === 'gn3') return 'GN3';
    if (docType === 'osg') return 'OSG';
    return 'BS 7671 A4:2026';
  };

  // Filter regulatory primary down to non-practical units.
  const regulatoryPrimary = primary.filter((u) => u.source !== 'practical');

  if (regulatoryPrimary.length > 0) {
    lines.push('[RELEVANT BS 7671 A4:2026 / GN3 / OSG CONTEXT]');
    regulatoryPrimary.forEach((u, i) => {
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

  // Practical Work Intelligence — practitioner guidance, never regulation.
  // Render as a distinct section so the model cites it as practice, not law.
  // Compact format: equipment / type / topic / 1-line procedures / defects.
  if (practical.length > 0) {
    lines.push('');
    lines.push(
      '[PRACTICAL WORK INTELLIGENCE — PRACTITIONER GUIDANCE, NOT REGULATION]'
    );
    lines.push(
      'Cite as "common practice" or "practical guidance"; never quote as a BS 7671 requirement. If this conflicts with a BS 7671 reg above, the regulation wins.'
    );
    practical.forEach((u, i) => {
      const eq = [u.equipment_category, u.equipment_subcategory]
        .filter(Boolean)
        .join(' / ');
      const eqLine = eq ? `[${eq}] ` : '';
      const typeTag = u.facet_type ? `(${u.facet_type})` : '';
      const topic = (u.primary_topic || '').trim().slice(0, 400);
      const linkedRegs = (u.bs7671_regulations ?? []).slice(0, 4).join(', ');

      const detailParts: string[] = [];
      if (Array.isArray(u.test_procedures) && u.test_procedures.length > 0) {
        const tasks = u.test_procedures
          .slice(0, 3)
          .map((p: any) => (typeof p === 'string' ? p : p?.task || ''))
          .filter(Boolean)
          .join(' | ');
        if (tasks) detailParts.push(`Procedure: ${tasks.slice(0, 300)}`);
      }
      if (u.common_defects && u.common_defects.length) {
        detailParts.push(`Common defects: ${u.common_defects.slice(0, 5).join(', ')}`);
      }
      if (u.typical_duration_minutes) {
        detailParts.push(`Typical: ${u.typical_duration_minutes} min`);
      }
      if (linkedRegs) detailParts.push(`Refs: ${linkedRegs}`);

      const detail = detailParts.length ? `\n   ${detailParts.join(' · ')}` : '';
      lines.push(`P${i + 1}. ${eqLine}${topic} ${typeTag}${detail}`);
    });
  }

  return lines.join('\n');
}
