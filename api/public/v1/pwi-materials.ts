/**
 * GET /api/public/v1/pwi-materials?category=ev_charger
 *
 * Returns the materials + tools typically required for a UK electrical job,
 * aggregated from verified UK electrical data (`materials_needed`,
 * `tools_required`, `cable_sizes`).
 *
 * Powers AI answers like "what do I need to install an EV charger?" with
 * the actual kit list electricians use.
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
  materials_needed: string[] | null;
  tools_required: string[] | null;
  cable_sizes: string[] | null;
  power_ratings: string[] | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. ev_charger, consumer_unit, shower, lighting)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,materials_needed,tools_required,cable_sizes,power_ratings,primary_topic` +
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

  const allMaterials: string[] = [];
  const allTools: string[] = [];
  const allCableSizes: string[] = [];
  const allPowerRatings: string[] = [];

  // Defensive: arrays can contain null elements.
  const pushStrings = (target: string[], src: unknown) => {
    if (!Array.isArray(src)) return;
    for (const item of src) {
      if (typeof item === 'string' && item.length > 0) target.push(item);
    }
  };

  for (const r of result.data) {
    pushStrings(allMaterials, r.materials_needed);
    pushStrings(allTools, r.tools_required);
    pushStrings(allCableSizes, r.cable_sizes);
    pushStrings(allPowerRatings, r.power_ratings);
  }

  if (allMaterials.length === 0 && allTools.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No materials data matches '${category}'.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  function topN(arr: string[], n: number): Array<{ item: string; frequency: number }> {
    const counts: Record<string, number> = {};
    for (const s of arr) {
      const clean = s.trim();
      if (clean.length > 1) counts[clean] = (counts[clean] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([item, frequency]) => ({ item, frequency }));
  }

  return jsonResponse({
    query_category: category,
    sample_size: result.data.length,
    materials_needed: topN(allMaterials, 20),
    tools_required: topN(allTools, 15),
    cable_sizes_observed: Array.from(
      new Set(allCableSizes.map((s) => s.trim()).filter(Boolean))
    ).slice(0, 10),
    power_ratings_observed: Array.from(
      new Set(allPowerRatings.map((s) => s.trim()).filter(Boolean))
    ).slice(0, 10),
    notes:
      'Aggregated kit list from UK electrical installation records. Frequency = how often this material/tool appears in similar jobs. Always verify against the specific spec for your project.',
    citation: 'Elec-Mate — UK electrical materials data (BS 7671:2018+A4:2026 aligned)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/cable-sizing-calculator',
  });
}
