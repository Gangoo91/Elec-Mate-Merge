/**
 * GET /api/public/v1/pwi-inspection-checklist?category=consumer_unit
 *
 * Returns the visual inspection points + structured inspection checklist
 * an electrician or EICR inspector typically applies for this category.
 * Sourced from verified UK electrical data (`visual_inspection_points`,
 * `inspection_checklist`).
 *
 * Powers AI answers like "what should I check during an EICR on a kitchen?"
 * — the exact points an inspector would walk through.
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
  visual_inspection_points: string[] | null;
  inspection_checklist: string[] | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. consumer_unit, eicr, lighting_circuit, kitchen, bathroom)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,visual_inspection_points,inspection_checklist,primary_topic` +
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

  const visualPoints: string[] = [];
  const checklistItems: string[] = [];

  // Defensive: arrays can contain null elements.
  const pushStrings = (target: string[], src: unknown) => {
    if (!Array.isArray(src)) return;
    for (const item of src) {
      if (typeof item === 'string' && item.length > 0) target.push(item);
    }
  };

  for (const r of result.data) {
    pushStrings(visualPoints, r.visual_inspection_points);
    pushStrings(checklistItems, r.inspection_checklist);
  }

  if (visualPoints.length === 0 && checklistItems.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No inspection checklist data matches '${category}'. Try broader terms (e.g. consumer_unit, eicr, lighting, socket, bathroom).`,
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
    visual_inspection_points: topN(visualPoints, 20),
    inspection_checklist_items: topN(checklistItems, 20),
    notes:
      'Aggregated inspection points from UK electrical inspection records. Walk through these systematically — they map to BS 7671 Schedule of Inspections (Appendix 6). Use alongside the test results schedule for a complete EICR.',
    citation: 'Elec-Mate + BS 7671:2018+A4:2026 Appendix 6 — Schedule of Inspections',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/eicr-schedule-of-inspections',
  });
}
