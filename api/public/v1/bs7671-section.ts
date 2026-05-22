/**
 * GET /api/public/v1/bs7671-section?section=701
 *
 * Returns every BS 7671:2018+A4:2026 regulation in a specific section
 * (e.g. Section 701 bathrooms, 702 swimming pools, 722 EV charging).
 * Powered by `bs7671_regulations`.
 *
 * Designed for AI assistants answering "give me everything in Section X"
 * or "what are the rules for [special location]".
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
  chapter: string | null;
  section: string | null;
  section_number: string | null;
  full_text: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const section = (url.searchParams.get('section') || '').trim();

  if (!section) {
    return errorResponse(
      "Query param 'section' is required (e.g. section=701 for bathrooms, 722 for EV charging)"
    );
  }
  if (!/^\d{2,3}$/.test(section)) {
    return errorResponse(
      "Query param 'section' must be a 2-3 digit BS 7671 section number (e.g. 41, 411, 701, 722)"
    );
  }

  // Match all regs in this section: section_number=eq.701, OR reg_number starts with '701.'
  const result = await queryTable<RegRow>(
    'bs7671_regulations',
    `select=reg_number,title,part,chapter,section,section_number,full_text` +
      `&or=(section_number.eq.${encodeURIComponent(section)},reg_number.like.${encodeURIComponent(section)}.*)` +
      `&order=reg_number.asc` +
      `&limit=500`
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
        message: `No BS 7671 regulations found for section '${section}'. Common sections: 41 (protection), 411 (ADS), 415 (additional protection), 701 (bathrooms), 702 (pools), 705 (agricultural), 722 (EV charging), 743 (PV).`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const regs = result.data.map((r) => ({
    reg_number: r.reg_number,
    title: r.title,
    snippet:
      (r.full_text || '').slice(0, 200).replace(/\s+/g, ' ').trim() +
      ((r.full_text || '').length > 200 ? '…' : ''),
  }));

  // Derive section title from the first row (sections are normalised)
  const sectionTitle = result.data[0]?.section || `Section ${section}`;
  const part = result.data[0]?.part || null;
  const chapter = result.data[0]?.chapter || null;

  return jsonResponse({
    section,
    section_title: sectionTitle,
    part,
    chapter,
    regulation_count: regs.length,
    regulations: regs,
    edition: 'BS 7671:2018+A4:2026',
    notes:
      'Each result shows reg_number, title, and a snippet of the full text. Call /api/public/v1/bs7671-regulation?reg=<reg_number> to get the complete text of any specific regulation.',
    citation: `BS 7671:2018+A4:2026 Section ${section}${sectionTitle ? ' — ' + sectionTitle : ''}`,
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/bs-7671-18th-edition-guide',
  });
}
