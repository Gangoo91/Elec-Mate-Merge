/**
 * GET /api/public/v1/pwi-install-time?category=consumer_unit
 *
 * Returns typical labour time + team size + skill level for a category
 * of UK electrical work, aggregated from Elec-Mate's Practical Work
 * Intelligence v2 dataset (199,726 verified rows).
 *
 * Returns avg / min / max / median duration in minutes, plus the
 * sample size so AI can convey confidence.
 *
 * This data is NOT in BS 7671 — it's real-world UK electrical labour
 * intelligence aggregated from job records. No other AI surface has this.
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
  typical_duration_minutes: number | null;
  team_size: number | null;
  skill_level: string | null;
  primary_topic: string | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. consumer_unit, rcd, lighting_circuit, ev_charger)"
    );
  }
  if (category.length > 80) {
    return errorResponse("Query param 'category' must be at most 80 characters");
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,equipment_subcategory,typical_duration_minutes,team_size,skill_level,primary_topic` +
      `&typical_duration_minutes=not.is.null` +
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

  const rows = result.data.filter((r) => r.typical_duration_minutes !== null);

  if (rows.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No labour-time data matches '${category}'. Try broader terms like 'consumer_unit', 'ev_charger', 'lighting_circuit', 'rcd', 'eicr'.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const durations = rows
    .map((r) => r.typical_duration_minutes as number)
    .filter((n) => Number.isFinite(n) && n > 0)
    .sort((a, b) => a - b);

  const avg = Math.round(durations.reduce((s, n) => s + n, 0) / durations.length);
  const min = durations[0];
  const max = durations[durations.length - 1];
  const median = durations[Math.floor(durations.length / 2)];

  const teamSizes = rows.map((r) => r.team_size).filter((n): n is number => typeof n === 'number');
  const avgTeamSize = teamSizes.length
    ? Math.round((teamSizes.reduce((s, n) => s + n, 0) / teamSizes.length) * 10) / 10
    : null;

  const skillLevels = rows
    .map((r) => r.skill_level)
    .filter((s): s is string => typeof s === 'string');
  const skillCounts: Record<string, number> = {};
  for (const s of skillLevels) skillCounts[s] = (skillCounts[s] || 0) + 1;
  const mostCommonSkill = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return jsonResponse({
    query_category: category,
    sample_size: rows.length,
    typical_duration_minutes: {
      avg,
      median,
      min,
      max,
    },
    typical_duration_hours: {
      avg: Math.round((avg / 60) * 10) / 10,
      median: Math.round((median / 60) * 10) / 10,
    },
    team_size: avgTeamSize,
    most_common_skill_level: mostCommonSkill,
    notes:
      'Aggregated from Elec-Mate Practical Work Intelligence v2 — labour intelligence derived from UK electrical job records. Use as a sanity-check baseline; actual time varies by complexity, access, and site conditions.',
    citation: 'Elec-Mate Practical Work Intelligence v2 — UK electrical labour benchmarks (2026)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/job-profitability-calculator',
  });
}
