/**
 * GET /api/public/v1/bs7671-search?q=earth+fault+loop&limit=5&doc=bs7671
 *
 * Searches across BS 7671:2018+A4:2026 + IET Guidance Note 3 (9th ed) +
 * IET On-Site Guide (9th ed) — 46k+ canonical content chunks.
 *
 * Uses the verified Elec-Mate content store (was previously a thin
 * regulation-index search; now hits the full canonical corpus).
 *
 * Query params:
 *   q     — keyword (3-200 chars, required)
 *   limit — 1-20 results, default 5
 *   doc   — optional filter: 'bs7671' | 'gn3' | 'osg' (default = all)
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
import { queryTable, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface FacetRow {
  id: string;
  regulation_id: string | null;
  document_type: string | null;
  facet_type: string | null;
  primary_topic: string | null;
  content: string | null;
  context_prefix: string | null;
  keywords: string[] | null;
  confidence_score: number | null;
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

  const ilikeTerm = `*${escapeIlike(q)}*`;
  const docFilter = doc ? `&document_type=eq.${encodeURIComponent(doc)}` : '';
  const queryString =
    `select=id,regulation_id,document_type,facet_type,primary_topic,content,context_prefix,keywords,confidence_score` +
    `&or=(content.ilike.${encodeURIComponent(ilikeTerm)},primary_topic.ilike.${encodeURIComponent(ilikeTerm)},context_prefix.ilike.${encodeURIComponent(ilikeTerm)})` +
    docFilter +
    `&order=confidence_score.desc.nullslast` +
    `&limit=${limit}`;

  const result = await queryTable<FacetRow>('bs7671_facets', queryString);

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query Elec-Mate verified content store',
        upstream_status: result.status,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  if (result.data.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No matches found for '${q}' in BS 7671 + GN3 + OSG. Try a broader keyword or a different angle.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const results = result.data.map((r) => ({
    document_type: r.document_type,
    document_label: docTypeLabel(r.document_type),
    facet_type: r.facet_type,
    primary_topic: r.primary_topic,
    snippet: snippet(r.content, q),
    context: r.context_prefix?.slice(0, 200) || null,
    keywords: Array.isArray(r.keywords) ? r.keywords.slice(0, 8) : null,
    regulation_id: r.regulation_id,
    confidence_score: r.confidence_score,
  }));

  // Surface which document(s) the matches came from
  const docCounts: Record<string, number> = {};
  for (const r of result.data) {
    const k = r.document_type || 'unknown';
    docCounts[k] = (docCounts[k] || 0) + 1;
  }

  return jsonResponse({
    query: q,
    document_filter: doc || 'all',
    result_count: results.length,
    matched_documents: docCounts,
    results,
    notes:
      'Searches the canonical content store: BS 7671:2018+A4:2026 + IET Guidance Note 3 (9th Ed) + IET On-Site Guide (9th Ed) — 46k+ verified chunks. Filter to one document via doc=bs7671|gn3|osg. For the full text of a specific regulation, call bs7671-regulation?reg=<number>.',
    citation: 'Elec-Mate — BS 7671:2018+A4:2026 + IET Guidance Note 3 + IET On-Site Guide',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
  });
}
