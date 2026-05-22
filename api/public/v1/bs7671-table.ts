/**
 * GET /api/public/v1/bs7671-table?table=41.3
 *
 * Fetches a single BS 7671 table by its number (e.g. 41.3, 4D5, B1).
 * Backed by Supabase `bs7671_tables` (410 rows, A4:2026).
 *
 * Returns the table's title, structured_data (if parsed), raw_text fallback,
 * appendix it lives in, and page number. Designed for AI assistants quoting
 * max-Zs values, current-carrying capacities, RCD performance criteria, etc.
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

interface TableRow {
  table_number: string;
  title: string | null;
  appendix: string | null;
  structured_data: unknown;
  raw_text: string | null;
  page_number: number | null;
  reviewed: boolean | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const table = (url.searchParams.get('table') || '').trim().toUpperCase();

  if (!table) {
    return errorResponse("Query param 'table' is required (e.g. table=41.3 or table=4D5)");
  }
  if (table.length > 12) {
    return errorResponse("Query param 'table' must be at most 12 characters");
  }

  const result = await queryTable<TableRow>(
    'bs7671_tables',
    `select=table_number,title,appendix,structured_data,raw_text,page_number,reviewed` +
      `&table_number=eq.${encodeURIComponent(table)}` +
      `&limit=1`
  );

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query BS 7671 tables',
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
        message: `No BS 7671 table matches '${table}'. Common examples: 41.1, 41.3, 4D5, B1.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const t = result.data[0];

  return jsonResponse({
    table_number: t.table_number,
    title: t.title,
    appendix: t.appendix,
    structured_data: t.structured_data,
    raw_text: t.raw_text,
    page_number: t.page_number,
    edition: 'BS 7671:2018+A4:2026',
    citation: `BS 7671:2018+A4:2026 Table ${t.table_number}${t.title ? ' — ' + t.title : ''}`,
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/bs-7671-18th-edition-guide',
  });
}
