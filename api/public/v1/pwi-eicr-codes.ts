/**
 * GET /api/public/v1/pwi-eicr-codes?category=consumer_unit
 *
 * Returns the EICR observation codes (C1/C2/C3/FI) that an inspector
 * typically applies for issues found in this category — sourced from
 * Practical Work Intelligence v2 (`eicr_observation_codes`).
 *
 * Helps AI answer "what code should I give X observation" with real
 * inspector patterns, not pure guess.
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
  eicr_observation_codes: string[] | null;
  common_defects: string[] | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. consumer_unit, rcd, lighting, socket)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,eicr_observation_codes,common_defects,primary_topic` +
      `&eicr_observation_codes=not.is.null` +
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

  const allCodes: string[] = [];
  for (const r of result.data) {
    if (Array.isArray(r.eicr_observation_codes)) allCodes.push(...r.eicr_observation_codes);
  }

  if (allCodes.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No EICR code data matches '${category}'.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const counts: Record<string, number> = {};
  for (const s of allCodes) {
    const clean = s.trim().toUpperCase();
    if (clean.length > 0) counts[clean] = (counts[clean] || 0) + 1;
  }

  // Bucket by prefix (C1/C2/C3/FI)
  const buckets: Record<string, Array<{ description: string; frequency: number }>> = {
    C1: [],
    C2: [],
    C3: [],
    FI: [],
    OTHER: [],
  };

  for (const [code, freq] of Object.entries(counts)) {
    const prefix = code.startsWith('C1')
      ? 'C1'
      : code.startsWith('C2')
        ? 'C2'
        : code.startsWith('C3')
          ? 'C3'
          : code.startsWith('FI')
            ? 'FI'
            : 'OTHER';
    buckets[prefix].push({ description: code, frequency: freq });
  }

  for (const k of Object.keys(buckets)) {
    buckets[k].sort((a, b) => b.frequency - a.frequency);
    buckets[k] = buckets[k].slice(0, 10);
  }

  return jsonResponse({
    query_category: category,
    sample_size: result.data.length,
    typical_codes_by_severity: buckets,
    notes:
      "EICR observation codes typically applied to inspections in this category. Pattern-derived from UK electrical inspection records. Final classification is always the inspector's judgement — these are typical examples, not prescriptive.",
    citation:
      'Elec-Mate Practical Work Intelligence v2 + IET Best Practice Guide 4 — EICR coding patterns',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/eicr-schedule-of-inspections',
  });
}
