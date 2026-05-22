/**
 * GET /api/public/v1/bs7671-search?q=earth+fault+loop&limit=5
 *
 * Keyword search across BS 7671:2018+A4:2026 regulations.
 * Uses Supabase PostgREST (anon key, RLS-enforced) against the
 * public `bs7671_regulations` table. Returns up to 20 matches.
 *
 * Future: this endpoint will proxy to the existing `bs7671-rag-search`
 * Supabase edge function for semantic (embedding) search instead of
 * keyword ILIKE. For now: keyword search is bulletproof + cheap.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { queryTable, escapeIlike, snippet } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface RegRow {
  reg_number: string;
  title: string | null;
  full_text: string | null;
  part: string | null;
  chapter: string | null;
  section: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim();
  const rawLimit = url.searchParams.get('limit');
  const limit = Math.min(20, Math.max(1, Number.parseInt(rawLimit || '5', 10) || 5));

  if (q.length < 3) {
    return errorResponse("Query param 'q' must be at least 3 characters");
  }
  if (q.length > 200) {
    return errorResponse("Query param 'q' must be at most 200 characters");
  }

  const ilikeTerm = `*${escapeIlike(q)}*`;
  const queryString =
    `select=reg_number,title,full_text,part,chapter,section` +
    `&or=(reg_number.ilike.${encodeURIComponent(ilikeTerm)},` +
    `title.ilike.${encodeURIComponent(ilikeTerm)},` +
    `full_text.ilike.${encodeURIComponent(ilikeTerm)})` +
    `&limit=${limit}`;

  const result = await queryTable<RegRow>('bs7671_regulations', queryString);

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query BS 7671 regulations',
        upstream_status: result.status,
        detail: result.error,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  const results = result.data.map((r) => ({
    reg_number: r.reg_number,
    title: r.title || null,
    part: r.part || null,
    chapter: r.chapter || null,
    section: r.section || null,
    snippet: snippet(r.full_text || '', q),
    edition: 'BS 7671:2018+A4:2026',
    url: 'https://www.elec-mate.com/guides/bs-7671-18th-edition-guide',
  }));

  return jsonResponse({
    query: q,
    result_count: results.length,
    results,
    citation: 'BS 7671:2018+A4:2026 — IET Wiring Regulations, Amendment 4 (January 2026)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
  });
}
