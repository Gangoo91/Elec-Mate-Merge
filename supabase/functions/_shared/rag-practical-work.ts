/**
 * Practical Work Intelligence RAG Module
 * Primary data source for hands-on installation, commissioning, and maintenance guidance.
 *
 * Two surfaces:
 *   - searchPracticalWorkIntelligence — legacy keyword RPC, kept for back-compat
 *   - searchPracticalWorkV2           — new hybrid RRF (vector + tsvector)
 *
 * v2 mirrors `searchFacets` in `bs7671-facets-rag.ts`: caller-provided
 * embedding (text-embedding-3-large, dim 3072), filters pushed down,
 * RRF fusion. Rows the OSG/GN3 classifier marked for removal are
 * excluded automatically by the RPC.
 */

import { generateLargeEmbedding } from './ai-providers.ts';

export interface PracticalWorkResult {
  content: string;
  primary_topic?: string;
  keywords?: string[];
  equipment_category?: string;
  tools_required?: string[];
  bs7671_regulations?: string[];
  practical_work_id?: string;
  hybrid_score?: number;
  confidence_score?: number;
  source_table: string;
  applies_to?: string[];
  location_types?: string[];
  power_ratings?: string[];
  cable_sizes?: string[];
  expected_results?: string;
  maintenance_interval?: string;
}

export interface PracticalWorkSearchParams {
  query: string;
  tradeFilter?: 'installer' | 'maintenance' | 'commissioning';
  matchCount?: number;
}

export interface PracticalWorkSearchResult {
  results: PracticalWorkResult[];
  searchTimeMs: number;
  qualityScore: number; // 0-100
  meetsThreshold: boolean; // true if quality is sufficient
}

/**
 * Search Practical Work Intelligence with quality scoring
 */
export async function searchPracticalWorkIntelligence(
  supabase: any,
  params: PracticalWorkSearchParams
): Promise<PracticalWorkSearchResult> {
  const startTime = Date.now();
  const { query, tradeFilter, matchCount = 15 } = params;

  console.log(`🔍 Searching Practical Work Intelligence`, {
    query: query.substring(0, 50),
    tradeFilter,
    matchCount,
  });

  try {
    // Call ULTRA-FAST keyword search (GIN index - <1s vs 21s for hybrid)
    const { data, error } = await supabase.rpc('search_practical_work_fast', {
      query_text: query,
      match_count: matchCount,
    });

    if (error) {
      console.error('Practical Work search error:', error);
      return {
        results: [],
        searchTimeMs: Date.now() - startTime,
        qualityScore: 0,
        meetsThreshold: false,
      };
    }

    // Transform to PracticalWorkResult format with correct column mappings
    const results: PracticalWorkResult[] = (data || []).map((row: any) => ({
      content: row.description || row.primary_topic || '',
      primary_topic: row.primary_topic,
      keywords: row.keywords,
      equipment_category: row.equipment_category,
      tools_required: row.tools_required,
      bs7671_regulations: row.bs7671_regulations,
      practical_work_id: row.id,
      hybrid_score: row.confidence_score || 0,
      confidence_score: row.confidence_score,
      source_table: 'practical_work_intelligence',
      applies_to: row.applies_to,
      cable_sizes: row.cable_sizes,
      test_procedures: Array.isArray(row.test_procedures)
        ? row.test_procedures.map((t: any) => (typeof t === 'string' ? t : JSON.stringify(t)))
        : [],
      troubleshooting_steps: row.troubleshooting_steps,
      common_failures: Array.isArray(row.common_failures)
        ? row.common_failures.map((f: any) => (typeof f === 'string' ? f : JSON.stringify(f)))
        : [],
    }));

    // Calculate quality metrics
    const avgHybridScore =
      results.length > 0
        ? results.reduce((sum, r) => sum + (r.hybrid_score || 0), 0) / results.length
        : 0;

    const avgConfidenceScore =
      results.length > 0
        ? results.reduce((sum, r) => sum + (r.confidence_score || 0), 0) / results.length
        : 0;

    // Quality score: combination of result count, hybrid score, and confidence
    const countScore = Math.min(results.length / matchCount, 1) * 40; // Max 40 points
    const hybridScore = avgHybridScore * 30; // Max 30 points
    const confidenceScore = avgConfidenceScore * 30; // Max 30 points
    const qualityScore = countScore + hybridScore + confidenceScore;

    // Threshold: need at least 50/100 quality score
    const meetsThreshold = qualityScore >= 50 && results.length >= 3;

    const searchTimeMs = Date.now() - startTime;

    console.log(`✅ Practical Work search complete`, {
      resultCount: results.length,
      avgHybridScore: avgHybridScore.toFixed(2),
      avgConfidence: avgConfidenceScore.toFixed(2),
      qualityScore: qualityScore.toFixed(1),
      meetsThreshold,
      durationMs: searchTimeMs,
    });

    return {
      results,
      searchTimeMs,
      qualityScore,
      meetsThreshold,
    };
  } catch (error) {
    console.error('Practical Work search exception:', error);
    return {
      results: [],
      searchTimeMs: Date.now() - startTime,
      qualityScore: 0,
      meetsThreshold: false,
    };
  }
}

/**
 * Filter results by confidence score threshold
 */
export function filterByConfidence(
  results: PracticalWorkResult[],
  minConfidence: number = 0.75
): PracticalWorkResult[] {
  return results.filter((r) => (r.confidence_score || 0) >= minConfidence);
}

/**
 * Format results for AI context
 */
export function formatForAIContext(results: PracticalWorkResult[]): string {
  return results
    .map((pw, index) => {
      let formatted = `**${pw.primary_topic || 'Practical Guidance'}**`;

      if (pw.equipment_category) {
        formatted += ` (${pw.equipment_category})`;
      }

      formatted += `\n${pw.content}\n`;

      // ⚡ PRIORITY: Flag equipment-specific test procedures prominently
      if (pw.test_procedures && pw.test_procedures.length > 0) {
        formatted += `\n⚡ SPECIFIC TEST PROCEDURES: ${pw.test_procedures.join('; ')}`;
      }

      if (pw.tools_required && pw.tools_required.length > 0) {
        formatted += `\nTools Required: ${pw.tools_required.join(', ')}`;
      }

      if (pw.bs7671_regulations && pw.bs7671_regulations.length > 0) {
        formatted += `\nBS 7671: ${pw.bs7671_regulations.join(', ')}`;
      }

      if (pw.maintenance_interval) {
        formatted += `\nMaintenance Interval: ${pw.maintenance_interval}`;
      }

      if (pw.expected_results) {
        formatted += `\nExpected Results: ${pw.expected_results}`;
      }

      if (pw.troubleshooting_steps && pw.troubleshooting_steps.length > 0) {
        formatted += `\nTroubleshooting: ${pw.troubleshooting_steps.join('; ')}`;
      }

      if (pw.common_failures && pw.common_failures.length > 0) {
        formatted += `\nCommon Failures: ${pw.common_failures.join('; ')}`;
      }

      return formatted;
    })
    .join('\n\n---\n\n');
}

/* ─── v2 ─ hybrid RRF search ────────────────────────────────────── */

export interface PracticalWorkFacet {
  id: string;
  primaryTopic: string;
  facetType: string | null;
  equipmentCategory: string | null;
  appliesTo: string[] | null;
  keywords: string[] | null;
  bs7671Regulations: string[] | null;
  toolsRequired: string[] | null;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  materialsNeeded: any[] | null;
  safetyRequirements: any | null;
  inspectionChecklist: any[] | null;
  commonMistakes: string[] | null;
  testProcedures: any[] | null;
  acceptanceCriteria: any | null;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  typicalDurationMinutes: number | null;
  skillLevel: string | null;
  confidenceScore: number | null;
  /** Cosine similarity vs query embedding, 0-1. */
  similarity: number;
  /** Reciprocal Rank Fusion score, vector + tsvector. */
  rrfScore: number;
}

export interface SearchPracticalWorkV2Args {
  query: string;
  matchCount?: number;
  /** Optional facet_type filter (e.g. ['installation', 'testing']). */
  facetTypes?: string[] | null;
  /** Optional installation context (['domestic'], ['commercial', 'industrial']). */
  appliesTo?: string[] | null;
  equipmentCategory?: string | null;
  minConfidence?: number;
  /** Skip the embedding round-trip if you only want keyword search. */
  skipEmbedding?: boolean;
}

/**
 * Hybrid RRF search across `practical_work_intelligence`.
 *
 * Generates a 3072-dim halfvec embedding for the query, passes it
 * alongside the raw text to `search_practical_work_v2`. The RPC fuses
 * vector cosine + tsvector relevance via RRF and applies any filter
 * push-downs. Rows flagged by the OSG classifier as 'delete' are
 * skipped server-side.
 *
 * Failure modes are non-fatal: if the embedding call fails, falls back
 * to text-only ranking. If the RPC fails, returns an empty array and
 * logs — the caller continues without practical-work grounding rather
 * than crashing the whole job.
 */
export async function searchPracticalWorkV2(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  args: SearchPracticalWorkV2Args
): Promise<PracticalWorkFacet[]> {
  const {
    query,
    matchCount = 10,
    facetTypes = null,
    appliesTo = null,
    equipmentCategory = null,
    minConfidence = 0,
    skipEmbedding = false,
  } = args;

  if (!query || query.trim().length === 0) return [];

  let embedding: number[] | null = null;
  if (!skipEmbedding) {
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (openAiKey) {
      try {
        embedding = await generateLargeEmbedding(query, openAiKey);
      } catch (err) {
        console.warn('[rag-practical-work] embedding failed, falling back to text-only:', err);
      }
    }
  }

  const { data, error } = await supabase.rpc('search_practical_work_v2', {
    p_query_text: query,
    p_query_embedding: embedding,
    p_match_count: matchCount,
    p_facet_types: facetTypes,
    p_applies_to: appliesTo,
    p_equipment_category: equipmentCategory,
    p_min_confidence: minConfidence,
  });

  if (error) {
    console.error('[rag-practical-work] search_practical_work_v2 failed:', error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    id: row.id,
    primaryTopic: row.primary_topic ?? '',
    facetType: row.facet_type,
    equipmentCategory: row.equipment_category,
    appliesTo: row.applies_to,
    keywords: row.keywords,
    bs7671Regulations: row.bs7671_regulations,
    toolsRequired: row.tools_required,
    materialsNeeded: row.materials_needed,
    safetyRequirements: row.safety_requirements,
    inspectionChecklist: row.inspection_checklist,
    commonMistakes: row.common_mistakes,
    testProcedures: row.test_procedures,
    acceptanceCriteria: row.acceptance_criteria,
    typicalDurationMinutes: row.typical_duration_minutes,
    skillLevel: row.skill_level,
    confidenceScore: row.confidence_score !== null ? Number(row.confidence_score) : null,
    similarity: Number(row.similarity ?? 0),
    rrfScore: Number(row.rrf_score ?? 0),
  }));
}

/**
 * Compact prompt block for AI annotation. One line per facet, regulation
 * cites first, content truncated. Designed to keep token cost low while
 * preserving citability.
 */
export function formatPracticalWorkForPrompt(facets: PracticalWorkFacet[]): string {
  if (facets.length === 0) return '[no practical work facets matched]';
  return facets
    .map((f, i) => {
      const regs = (f.bs7671Regulations ?? []).slice(0, 3).join(', ');
      const equip = f.equipmentCategory ? ` [${f.equipmentCategory}]` : '';
      const tools = (f.toolsRequired ?? []).slice(0, 4).join(', ');
      const topic = (f.primaryTopic || '').replace(/\s+/g, ' ').slice(0, 360);
      const lines = [`${i + 1}. ${topic}${equip}`];
      if (regs) lines.push(`   regs: ${regs}`);
      if (tools) lines.push(`   tools: ${tools}`);
      return lines.join('\n');
    })
    .join('\n');
}
