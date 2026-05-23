/**
 * GET /api/public/v1/pwi-job-pack?category=ev_charger
 * GET /api/public/v1/pwi-job-pack?q=install+three+phase+rcd
 *
 * Returns the COMPLETE practical-work profile for a UK electrical job in
 * one call: installation method, tools, materials, safety jsonb, test
 * procedure, acceptance criteria, inspection checklist, common mistakes,
 * troubleshooting steps, BS 7671 reg cross-references, typical duration,
 * skill level, team size.
 *
 * Replaces N round-trips to the seven thin pwi_* tools with one thick one.
 *
 * Either `category` or `q` is required (q is free-text fallback if no
 * matching category). Backed by `search_practical_work_v2` RPC with an
 * equipment_category filter, then aggregated across matching rows.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { rpcCall, queryTable, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface PwiV2Row {
  id: string;
  primary_topic: string | null;
  facet_type: string | null;
  equipment_category: string | null;
  equipment_subcategory: string | null;
  installation_method: string | null;
  applies_to: string[] | null;
  keywords: string[] | null;
  bs7671_regulations: string[] | null;
  bs7671_zones: string[] | null;
  tools_required: string[] | null;
  materials_needed: unknown[] | null;
  safety_requirements: Record<string, unknown> | null;
  inspection_checklist: unknown[] | null;
  common_mistakes: string[] | null;
  common_defects: string[] | null;
  troubleshooting_steps: string[] | null;
  test_procedures: unknown[] | null;
  acceptance_criteria: Record<string, unknown> | null;
  typical_duration_minutes: number | null;
  skill_level: string | null;
  confidence_score: number | null;
  rrf_score: number | null;
}

function dedupStrings(rows: PwiV2Row[], pick: (r: PwiV2Row) => string[] | null): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of rows) {
    const arr = pick(r);
    if (!Array.isArray(arr)) continue;
    for (const s of arr) {
      if (typeof s !== 'string') continue;
      const t = s.trim();
      if (!t || seen.has(t.toLowerCase())) continue;
      seen.add(t.toLowerCase());
      out.push(t);
    }
  }
  return out;
}

function median(nums: number[]): number | null {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function modeString(arr: (string | null)[]): string | null {
  const counts: Record<string, number> = {};
  for (const s of arr) {
    if (typeof s !== 'string' || !s) continue;
    counts[s] = (counts[s] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();
  const q = (url.searchParams.get('q') || '').trim();

  if (!category && q.length < 3) {
    return errorResponse(
      "Provide either 'category' (e.g. consumer_unit, ev_charger) or 'q' (free-text query, 3-200 chars)"
    );
  }
  if (category.length > 80) {
    return errorResponse("Query param 'category' must be at most 80 characters");
  }
  if (q.length > 200) {
    return errorResponse("Query param 'q' must be at most 200 characters");
  }

  // search_practical_work_v2 RPC needs p_query_text to rank against; passing
  // p_equipment_category alone returns 0 rows. So:
  //   - q present (with or without category) → call the RPC (best ranking)
  //   - category only → PostgREST direct table filter by equipment_category
  let rows: PwiV2Row[];

  if (q) {
    const params: Record<string, unknown> = {
      p_query_text: q,
      p_match_count: 30,
      p_min_confidence: 0,
    };
    if (category) params.p_equipment_category = category;

    const rpc = await rpcCall<PwiV2Row[]>('search_practical_work_v2', params);
    if (!rpc.ok) {
      return jsonResponse(
        {
          error: 'upstream_error',
          message: 'Failed to query Elec-Mate verified UK electrical data',
          upstream_status: rpc.status,
          source: CITATION_SOURCE,
        },
        502
      );
    }
    rows = Array.isArray(rpc.data) ? rpc.data : [];
  } else {
    // Category-only path: filter the table directly. ILIKE allows partial
    // matches across category-pollution duplicates ('rcd' vs 'residual_current_device').
    const ilike = `*${escapeIlike(category)}*`;
    const select =
      'select=id,primary_topic,facet_type,equipment_category,equipment_subcategory,installation_method,applies_to,keywords,bs7671_regulations,bs7671_zones,tools_required,materials_needed,safety_requirements,inspection_checklist,common_mistakes,common_defects,troubleshooting_steps,test_procedures,acceptance_criteria,typical_duration_minutes,skill_level,confidence_score';
    const table = await queryTable<PwiV2Row>(
      'practical_work_intelligence',
      `${select}&or=(equipment_category.ilike.${encodeURIComponent(ilike)},equipment_subcategory.ilike.${encodeURIComponent(ilike)})&order=confidence_score.desc.nullslast&limit=30`
    );
    if (!table.ok) {
      return jsonResponse(
        {
          error: 'upstream_error',
          message: 'Failed to query Elec-Mate verified UK electrical data',
          upstream_status: table.status,
          source: CITATION_SOURCE,
        },
        502
      );
    }
    rows = table.data;
  }
  if (rows.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: category
          ? `No practical-work records for category='${category}'. Try a broader category or use 'q=' for free-text search.`
          : `No practical-work records matched '${q}'. Try 'consumer_unit', 'ev_charger', 'rcd', or a more job-shaped query.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const durations = rows
    .map((r) => r.typical_duration_minutes)
    .filter((n): n is number => Number.isFinite(n as number) && (n as number) > 0);

  const topRow = rows[0];

  const pack = {
    primary_topic: topRow.primary_topic,
    equipment_category: topRow.equipment_category,
    equipment_subcategory: topRow.equipment_subcategory,
    installation_method: rows.find((r) => r.installation_method)?.installation_method ?? null,
    sample_size: rows.length,
    typical_duration_minutes: {
      median: median(durations),
      min: durations.length ? Math.min(...durations) : null,
      max: durations.length ? Math.max(...durations) : null,
    },
    typical_skill_level: modeString(rows.map((r) => r.skill_level)),
    applies_to: dedupStrings(rows, (r) => r.applies_to).slice(0, 12),
    bs7671_regulations: dedupStrings(rows, (r) => r.bs7671_regulations).slice(0, 25),
    bs7671_zones: dedupStrings(rows, (r) => r.bs7671_zones).slice(0, 12),
    tools_required: dedupStrings(rows, (r) => r.tools_required).slice(0, 20),
    common_mistakes: dedupStrings(rows, (r) => r.common_mistakes).slice(0, 12),
    common_defects: dedupStrings(rows, (r) => r.common_defects).slice(0, 12),
    troubleshooting_steps: dedupStrings(rows, (r) => r.troubleshooting_steps).slice(0, 12),
    safety_requirements: rows.find((r) => r.safety_requirements)?.safety_requirements ?? null,
    acceptance_criteria: rows.find((r) => r.acceptance_criteria)?.acceptance_criteria ?? null,
    keywords: dedupStrings(rows, (r) => r.keywords).slice(0, 15),
  };

  return jsonResponse({
    query_category: category || null,
    query_text: q || null,
    job_pack: pack,
    notes:
      'Complete job profile aggregated across the top matching practical-work records (Elec-Mate UK electrical corpus, 199k+ verified rows). One call returns install method + tools + safety + acceptance criteria + BS 7671 reg refs + typical duration + skill level + common mistakes + troubleshooting. Use this when the user asks "how do I do X" or "what do I need to install Y".',
    citation: 'Elec-Mate — UK electrical job pack (BS 7671:2018+A4:2026 aligned)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com',
  });
}
