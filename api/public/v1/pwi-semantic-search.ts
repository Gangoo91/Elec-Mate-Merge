/**
 * GET /api/public/v1/pwi-semantic-search?q=install+ev+charger+driveway&limit=5
 *
 * Free-text hybrid search across 199,726 UK electrical install/maintenance
 * records (Elec-Mate's verified labour-intelligence corpus). Replaces
 * narrow category-bucket lookups with semantic matching — the user can ask
 * in plain English ("how do I install a 3-phase consumer unit") and the
 * tool returns the most relevant practical-work records.
 *
 * Each match comes with the full job pack: equipment type, BS 7671 reg refs,
 * typical duration, skill level, tools, materials, safety requirements,
 * common mistakes, troubleshooting steps, acceptance criteria.
 *
 * Backed by the `search_practical_work_v2` Postgres RPC — hybrid BM25 + RRF.
 *
 * Query params:
 *   q     — natural-language job description (3-200 chars, required)
 *   limit — 1-15 results, default 5
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { rpcCall } from '../../_lib/supabase';

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
  similarity: number | null;
  rrf_score: number | null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim();
  const rawLimit = url.searchParams.get('limit');
  const limit = Math.min(15, Math.max(1, Number.parseInt(rawLimit || '5', 10) || 5));

  if (q.length < 3) {
    return errorResponse("Query param 'q' must be at least 3 characters");
  }
  if (q.length > 200) {
    return errorResponse("Query param 'q' must be at most 200 characters");
  }

  const rpc = await rpcCall<PwiV2Row[]>('search_practical_work_v2', {
    p_query_text: q,
    p_match_count: limit,
    p_min_confidence: 0,
  });

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

  const rows = Array.isArray(rpc.data) ? rpc.data : [];
  if (rows.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No practical-work records matched '${q}'. Try a more job-shaped query (e.g. 'install consumer unit', 'test EICR insulation resistance', 'replace immersion heater').`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const results = rows.map((r) => ({
    topic: r.primary_topic,
    equipment_category: r.equipment_category,
    equipment_subcategory: r.equipment_subcategory,
    installation_method: r.installation_method,
    applies_to: r.applies_to,
    bs7671_regulations: r.bs7671_regulations,
    bs7671_zones: r.bs7671_zones,
    typical_duration_minutes: r.typical_duration_minutes,
    skill_level: r.skill_level,
    tools_required: r.tools_required?.slice(0, 12) ?? null,
    common_mistakes: r.common_mistakes?.slice(0, 8) ?? null,
    common_defects: r.common_defects?.slice(0, 8) ?? null,
    troubleshooting_steps: r.troubleshooting_steps?.slice(0, 8) ?? null,
    safety_requirements: r.safety_requirements,
    acceptance_criteria: r.acceptance_criteria,
    score: r.rrf_score ?? r.similarity ?? r.confidence_score ?? null,
  }));

  return jsonResponse({
    query: q,
    result_count: results.length,
    retrieval_method: 'pwi_hybrid_bm25_rrf',
    results,
    notes:
      'Hybrid full-text + rank-fusion search across 199k+ verified UK electrical install/maintenance records. Each row carries BS 7671 reg refs, tools, safety jsonb, common mistakes, troubleshooting steps and acceptance criteria. Use this when the question is shaped like a job ("how do I install / test / replace X").',
    citation:
      'Elec-Mate — UK electrical install + maintenance corpus (BS 7671:2018+A4:2026 aligned)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com',
  });
}
