/**
 * GET /api/public/v1/pwi-installation-procedure?category=ev_charger
 *
 * Returns the installation method + fixing intervals + cable routes +
 * termination methods + test procedures + acceptance criteria typically
 * used for this category. Sourced from verified UK electrical data.
 *
 * Powers AI answers like "how do I install an EV charger?" — with real
 * UK installation patterns from job records, not generic advice.
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
  installation_method: string | null;
  fixing_intervals: unknown;
  cable_routes: string[] | null;
  termination_methods: string[] | null;
  test_procedures: string[] | null;
  acceptance_criteria: unknown;
  safety_requirements: unknown;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. ev_charger, consumer_unit, shower, lighting_circuit)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,installation_method,fixing_intervals,cable_routes,termination_methods,test_procedures,acceptance_criteria,safety_requirements,primary_topic` +
      `&or=(equipment_category.ilike.${encodeURIComponent(ilikeTerm)},equipment_subcategory.ilike.${encodeURIComponent(ilikeTerm)},primary_topic.ilike.${encodeURIComponent(ilikeTerm)})` +
      `&limit=500`
  );

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query Elec-Mate verified data',
        upstream_status: result.status,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  const installMethods: string[] = [];
  const cableRoutes: string[] = [];
  const terminations: string[] = [];
  const testProcs: string[] = [];

  // Defensive: arrays can contain null elements.
  const pushStrings = (target: string[], src: unknown) => {
    if (!Array.isArray(src)) return;
    for (const item of src) {
      if (typeof item === 'string' && item.length > 0) target.push(item);
    }
  };

  for (const r of result.data) {
    if (typeof r.installation_method === 'string' && r.installation_method.trim()) {
      installMethods.push(r.installation_method.trim());
    }
    pushStrings(cableRoutes, r.cable_routes);
    pushStrings(terminations, r.termination_methods);
    pushStrings(testProcs, r.test_procedures);
  }

  if (
    installMethods.length === 0 &&
    cableRoutes.length === 0 &&
    terminations.length === 0 &&
    testProcs.length === 0
  ) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No installation-procedure data matches '${category}'. Try broader terms.`,
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

  // Capture a single representative fixing_intervals jsonb and acceptance_criteria
  // (these are typically structured per installation method; we surface the first
  // non-null example so the LLM can reason about it).
  const fixingExample = result.data.find((r) => r.fixing_intervals)?.fixing_intervals ?? null;
  const acceptanceExample =
    result.data.find((r) => r.acceptance_criteria)?.acceptance_criteria ?? null;
  const safetyExample = result.data.find((r) => r.safety_requirements)?.safety_requirements ?? null;

  return jsonResponse({
    query_category: category,
    sample_size: result.data.length,
    installation_methods: topN(installMethods, 10),
    cable_routes: topN(cableRoutes, 10),
    termination_methods: topN(terminations, 10),
    test_procedures: topN(testProcs, 12),
    fixing_intervals_example: fixingExample,
    acceptance_criteria_example: acceptanceExample,
    safety_requirements_example: safetyExample,
    notes:
      'Installation procedures aggregated from UK electrical job records. Verify against the equipment manufacturer instructions and BS 7671:2018+A4:2026 for the specific installation. Safety isolation per HSE GS 38 always takes precedence.',
    citation: 'Elec-Mate — UK electrical installation procedures (BS 7671:2018+A4:2026 aligned)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/first-fix-electrical',
  });
}
