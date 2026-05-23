/**
 * GET /api/public/v1/bs7671-search?q=earth+fault+loop&limit=5&doc=bs7671
 *
 * Searches Elec-Mate's canonical UK electrical content store:
 *   BS 7671:2018+A4:2026 + IET Guidance Note 3 (9th ed) + IET On-Site Guide
 *   (9th ed) — 46,745 verified chunks, all with full-text + vector embeddings.
 *
 * Primary path: `search_bs7671_v3` RPC — hybrid BM25 + RRF over the facets
 * corpus. Far better recall than ILIKE substring matching: catches
 * morphological variants, term frequency, related concepts.
 *
 * Fallback path: if the RPC fails (timeout, permissions), drops back to ILIKE
 * across content / primary_topic / context_prefix so the endpoint stays up.
 *
 * Query params:
 *   q     — keyword / natural-language query (3-200 chars, required)
 *   limit — 1-20 results, default 5
 *   doc   — optional filter: 'bs7671' | 'gn3' | 'osg' (default = all three)
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
  parseEnum,
} from '../../_lib/util';
import { queryTable, rpcCall, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface FacetRow {
  facet_id?: string;
  id?: string;
  regulation_id: string | null;
  reg_number?: string | null;
  reg_title?: string | null;
  document_type: string | null;
  facet_type: string | null;
  primary_topic: string | null;
  content: string | null;
  context_prefix: string | null;
  keywords: string[] | null;
  bs7671_zones?: string[] | null;
  equipment_category?: string | null;
  protection_method?: string | null;
  confidence_score?: number | null;
  rrf_score?: number | null;
  vector_score?: number | null;
  bm25_score?: number | null;
  retrieval_source?: string | null;
}

const DOC_TYPES = ['bs7671', 'gn3', 'osg'] as const;

function snippet(text: string | null, q: string, maxLen = 280): string {
  if (!text) return '';
  const firstWord = q.toLowerCase().split(/\s+/)[0] || '';
  const idx = text.toLowerCase().indexOf(firstWord);
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, start + maxLen);
  const out = text.slice(start, end).replace(/\s+/g, ' ').trim();
  return (start > 0 ? '…' : '') + out + (end < text.length ? '…' : '');
}

function docTypeLabel(d: string | null): string {
  switch (d) {
    case 'bs7671':
      return 'BS 7671:2018+A4:2026';
    case 'gn3':
      return 'IET Guidance Note 3 (9th Edition)';
    case 'osg':
      return 'IET On-Site Guide (9th Edition)';
    default:
      return 'BS 7671:2018+A4:2026';
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim();
  const rawLimit = url.searchParams.get('limit');
  const limit = Math.min(20, Math.max(1, Number.parseInt(rawLimit || '5', 10) || 5));
  const doc = parseEnum(url.searchParams.get('doc'), DOC_TYPES, { caseInsensitive: true });

  if (q.length < 3) {
    return errorResponse("Query param 'q' must be at least 3 characters");
  }
  if (q.length > 200) {
    return errorResponse("Query param 'q' must be at most 200 characters");
  }

  // ── Primary: hybrid BM25 + RRF via search_bs7671_v3 ───────────────────────
  const rpcResult = await rpcCall<FacetRow[]>('search_bs7671_v3', {
    query_text: q,
    document_types: doc ? [doc] : null,
    match_count: limit,
    expand_graph: false,
  });

  let rows: FacetRow[];
  let retrieval = 'hybrid_bm25_rrf';

  if (rpcResult.ok && Array.isArray(rpcResult.data) && rpcResult.data.length > 0) {
    rows = rpcResult.data;
  } else {
    // ── Fallback: ILIKE substring across content / topic / prefix ────────
    retrieval = 'ilike_fallback';
    const ilikeTerm = `*${escapeIlike(q)}*`;
    const docFilter = doc ? `&document_type=eq.${encodeURIComponent(doc)}` : '';
    const fallback = await queryTable<FacetRow>(
      'bs7671_facets',
      `select=id,regulation_id,document_type,facet_type,primary_topic,content,context_prefix,keywords,confidence_score` +
        `&or=(content.ilike.${encodeURIComponent(ilikeTerm)},primary_topic.ilike.${encodeURIComponent(ilikeTerm)},context_prefix.ilike.${encodeURIComponent(ilikeTerm)})` +
        docFilter +
        `&order=confidence_score.desc.nullslast` +
        `&limit=${limit}`
    );

    if (!fallback.ok) {
      return jsonResponse(
        {
          error: 'upstream_error',
          message: 'Failed to query Elec-Mate verified content store',
          upstream_status: fallback.status,
          source: CITATION_SOURCE,
        },
        502
      );
    }
    rows = fallback.data;
  }

  if (rows.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No matches found for '${q}' in BS 7671 + GN3 + OSG. Try a broader keyword or a different angle.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const results = rows.map((r) => ({
    document_type: r.document_type,
    document_label: docTypeLabel(r.document_type),
    facet_type: r.facet_type,
    primary_topic: r.primary_topic,
    reg_number: r.reg_number ?? null,
    reg_title: r.reg_title ?? null,
    snippet: snippet(r.content, q),
    context: r.context_prefix?.slice(0, 200) || null,
    keywords: Array.isArray(r.keywords) ? r.keywords.slice(0, 8) : null,
    equipment_category: r.equipment_category ?? null,
    bs7671_zones: Array.isArray(r.bs7671_zones) ? r.bs7671_zones : null,
    regulation_id: r.regulation_id,
    score: r.rrf_score ?? r.confidence_score ?? null,
  }));

  const docCounts: Record<string, number> = {};
  for (const r of rows) {
    const k = r.document_type || 'unknown';
    docCounts[k] = (docCounts[k] || 0) + 1;
  }

  return jsonResponse({
    query: q,
    document_filter: doc || 'all',
    retrieval_method: retrieval,
    result_count: results.length,
    matched_documents: docCounts,
    results,
    notes:
      'Hybrid BM25 + reciprocal rank fusion across the canonical content store: BS 7671:2018+A4:2026 + IET Guidance Note 3 (9th Ed) + IET On-Site Guide (9th Ed) — 46k+ verified chunks. Filter to one document via doc=bs7671|gn3|osg. For the full text of a specific regulation, call bs7671-regulation?reg=<number>.',
    citation: 'Elec-Mate — BS 7671:2018+A4:2026 + IET Guidance Note 3 + IET On-Site Guide',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
  });
}
