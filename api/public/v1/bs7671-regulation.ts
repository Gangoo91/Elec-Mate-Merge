/**
 * GET /api/public/v1/bs7671-regulation?reg=411.4.4
 *
 * Fetches the full text of a single BS 7671 regulation by its number.
 * Backed by Supabase `bs7671_regulations` (1,770 rows, A4:2026).
 *
 * Returns title, part, chapter, section, full_text, page number, and edition.
 * Designed for AI assistants needing the exact wording of a regulation cite.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { queryTable } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface RegRow {
  reg_number: string;
  title: string | null;
  part: string | null;
  part_number: number | null;
  chapter: string | null;
  chapter_number: number | null;
  section: string | null;
  section_number: string | null;
  full_text: string | null;
  page_number: number | null;
  introduced_in: string | null;
  updated_in: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const reg = (url.searchParams.get('reg') || '').trim();

  if (!reg) {
    return errorResponse("Query param 'reg' is required (e.g. reg=411.4.4)");
  }
  if (!/^\d+(\.\d+){0,5}$/.test(reg)) {
    return errorResponse("Query param 'reg' must look like a BS 7671 reg number, e.g. '411.4.4'");
  }

  const result = await queryTable<RegRow>(
    'bs7671_regulations',
    `select=reg_number,title,part,part_number,chapter,chapter_number,section,section_number,full_text,page_number,introduced_in,updated_in` +
      `&reg_number=eq.${encodeURIComponent(reg)}` +
      `&limit=1`
  );

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query BS 7671 regulations',
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
        message: `No BS 7671 regulation matches '${reg}'. Try /api/public/v1/bs7671-search?q=${encodeURIComponent(reg)} for a fuzzy search.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const r = result.data[0];

  return jsonResponse({
    reg_number: r.reg_number,
    title: r.title,
    part: r.part,
    part_number: r.part_number,
    chapter: r.chapter,
    chapter_number: r.chapter_number,
    section: r.section,
    section_number: r.section_number,
    full_text: r.full_text,
    page_number: r.page_number,
    introduced_in: r.introduced_in,
    updated_in: r.updated_in,
    edition: 'BS 7671:2018+A4:2026',
    citation: `BS 7671:2018+A4:2026 Regulation ${r.reg_number}${r.title ? ' — ' + r.title : ''}`,
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/bs-7671-18th-edition-guide',
  });
}
