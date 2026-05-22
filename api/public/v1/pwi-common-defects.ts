/**
 * GET /api/public/v1/pwi-common-defects?category=consumer_unit
 *
 * Returns the most-frequent defects an inspector typically finds for
 * a given UK electrical category, aggregated from Practical Work
 * Intelligence v2 (199,726 rows).
 *
 * Powers AI answers like "what do EICR inspectors usually find wrong
 * with kitchen circuits?" — with real defects, not hallucinations.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { queryTable, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface PwiRow {
  equipment_category: string | null;
  equipment_subcategory: string | null;
  common_defects: string[] | null;
  common_mistakes: string[] | null;
  common_failures: string[] | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. consumer_unit, ev_charger, lighting_circuit, rcd)"
    );
  }
  if (category.length > 80) {
    return errorResponse("Query param 'category' must be at most 80 characters");
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,common_defects,common_mistakes,common_failures,primary_topic` +
      `&or=(equipment_category.ilike.${encodeURIComponent(ilikeTerm)},equipment_subcategory.ilike.${encodeURIComponent(ilikeTerm)},primary_topic.ilike.${encodeURIComponent(ilikeTerm)})` +
      `&limit=500`
  );

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query Practical Work Intelligence',
        upstream_status: result.status,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  const allDefects: string[] = [];
  const allMistakes: string[] = [];
  const allFailures: string[] = [];

  // Defensive: array columns can contain null elements that crash s.trim() later.
  const pushStrings = (target: string[], src: unknown) => {
    if (!Array.isArray(src)) return;
    for (const item of src) {
      if (typeof item === 'string' && item.length > 0) target.push(item);
    }
  };

  for (const r of result.data) {
    pushStrings(allDefects, r.common_defects);
    pushStrings(allMistakes, r.common_mistakes);
    pushStrings(allFailures, r.common_failures);
  }

  if (allDefects.length === 0 && allMistakes.length === 0 && allFailures.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No defect data matches '${category}'. Try broader terms.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  // Rank by frequency (top 15 most common in each list)
  function topN(arr: string[], n: number): Array<{ item: string; frequency: number }> {
    const counts: Record<string, number> = {};
    for (const s of arr) {
      const clean = s.trim();
      if (clean.length > 2) counts[clean] = (counts[clean] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([item, frequency]) => ({ item, frequency }));
  }

  return jsonResponse({
    query_category: category,
    sample_size: result.data.length,
    top_defects: topN(allDefects, 15),
    top_mistakes: topN(allMistakes, 10),
    top_failures: topN(allFailures, 10),
    notes:
      'Aggregated from Elec-Mate Practical Work Intelligence v2. "Defects" are conditions observed during inspection; "mistakes" are installer-introduced errors; "failures" are in-service breakdowns.',
    citation: 'Elec-Mate Practical Work Intelligence v2 — UK electrical defect intelligence (2026)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/eicr-schedule-of-inspections',
  });
}
