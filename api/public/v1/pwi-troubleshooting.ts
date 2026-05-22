/**
 * GET /api/public/v1/pwi-troubleshooting?category=rcbo
 *
 * Returns step-by-step troubleshooting / diagnostic test sequences
 * for a UK electrical category — aggregated from Practical Work
 * Intelligence v2 (`troubleshooting_steps`, `diagnostic_tests`).
 *
 * Powers AI fault-diagnosis answers like "my RCBO keeps tripping,
 * where do I start?" with real inspector / electrician procedures.
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
  troubleshooting_steps: string[] | null;
  diagnostic_tests: string[] | null;
  test_equipment_required: string[] | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. rcbo, consumer_unit, lighting, shower)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,troubleshooting_steps,diagnostic_tests,test_equipment_required,primary_topic` +
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

  const allSteps: string[] = [];
  const allTests: string[] = [];
  const allEquipment: string[] = [];

  // Defensive: arrays can contain null elements.
  const pushStrings = (target: string[], src: unknown) => {
    if (!Array.isArray(src)) return;
    for (const item of src) {
      if (typeof item === 'string' && item.length > 0) target.push(item);
    }
  };

  for (const r of result.data) {
    pushStrings(allSteps, r.troubleshooting_steps);
    pushStrings(allTests, r.diagnostic_tests);
    pushStrings(allEquipment, r.test_equipment_required);
  }

  if (allSteps.length === 0 && allTests.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No troubleshooting data matches '${category}'.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

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
    troubleshooting_steps: topN(allSteps, 15),
    diagnostic_tests: topN(allTests, 12),
    test_equipment_required: Array.from(
      new Set(allEquipment.map((e) => e.trim()).filter(Boolean))
    ).slice(0, 12),
    notes:
      'Aggregated diagnostic procedures from UK electrical fault-finding records. Order is suggested — actual sequence depends on symptoms, access, and safe-isolation requirements.',
    citation:
      'Elec-Mate Practical Work Intelligence v2 — UK electrical fault diagnosis intelligence (2026)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/safe-isolation-procedure',
  });
}
