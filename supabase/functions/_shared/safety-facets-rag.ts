/**
 * Safety Facets RAG helper.
 *
 * Single source of truth for H&S grounding in the Health & Safety
 * Specialist pipeline. Wraps the `search_safety_facets_v2()` RPC, which
 * performs hybrid vector + tsvector RRF retrieval over the
 * `safety_facets` corpus (HSG documents, CDM 2015, EAW, PUWER, LOLER,
 * WAHR, COSHH, MHSWR, NEBOSH theory, electrical H&S guidance).
 *
 * Mirrors `bs7671-facets-rag.ts` and `rag-practical-work.ts` so the
 * specialist core can use all three as peer sources.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateLargeEmbedding } from './ai-providers.ts';

export interface SafetyFacet {
  id: string;
  primaryTopic: string;
  content: string;
  documentType: string;
  documentCode: string | null;
  regNumber: string | null;
  section: string | null;
  paragraph: string | null;
  pageNumber: number | null;
  sourceUrl: string | null;
  hazardCategory: string | null;
  appliesTo: string[] | null;
  controlType: string | null;
  severityIndicator: string | null;
  industries: string[] | null;
  metadata: Record<string, unknown> | null;
  similarity: number;
  rrfScore: number;
}

export interface SearchSafetyFacetsArgs {
  query: string;
  matchCount?: number;
  documentTypes?: string[] | null;
  hazardCategories?: string[] | null;
  controlTypes?: string[] | null;
  appliesTo?: string[] | null;
  industries?: string[] | null;
  /** Skip the embedding round-trip if you only want keyword search. */
  skipEmbedding?: boolean;
}

/**
 * Hybrid RRF search across `safety_facets`. Generates a 3072-dim halfvec
 * embedding for the query, passes it alongside the raw text to the RPC,
 * which fuses vector cosine + tsvector relevance via RRF and applies any
 * filter push-downs.
 *
 * Failure modes are non-fatal: if the embedding call fails, falls back
 * to text-only ranking. If the RPC fails, returns an empty array and
 * logs — the caller continues without H&S grounding rather than crashing
 * the whole job.
 */
export async function searchSafetyFacets(
  supabase: any,
  args: SearchSafetyFacetsArgs
): Promise<SafetyFacet[]> {
  const {
    query,
    matchCount = 10,
    documentTypes = null,
    hazardCategories = null,
    controlTypes = null,
    appliesTo = null,
    industries = null,
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
        console.warn('[safety-facets-rag] embedding failed, falling back to text-only:', err);
      }
    }
  }

  const { data, error } = await supabase.rpc('search_safety_facets_v2', {
    p_query_text: query,
    p_query_embedding: embedding,
    p_match_count: matchCount,
    p_document_types: documentTypes,
    p_hazard_categories: hazardCategories,
    p_control_types: controlTypes,
    p_applies_to: appliesTo,
    p_industries: industries,
  });

  if (error) {
    console.error('[safety-facets-rag] search_safety_facets_v2 failed:', error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    primaryTopic: row.primary_topic ?? '',
    content: row.content ?? '',
    documentType: row.document_type ?? 'other',
    documentCode: row.document_code,
    regNumber: row.reg_number,
    section: row.section,
    paragraph: row.paragraph,
    pageNumber: row.page_number,
    sourceUrl: row.source_url,
    hazardCategory: row.hazard_category,
    appliesTo: row.applies_to,
    controlType: row.control_type,
    severityIndicator: row.severity_indicator,
    industries: row.industries,
    metadata: row.metadata,
    similarity: Number(row.similarity ?? 0),
    rrfScore: Number(row.rrf_score ?? 0),
  }));
}

/**
 * Compact prompt block for AI annotation. One line per facet, citation
 * first, content truncated. Designed to keep token cost low while
 * preserving citability.
 */
export function formatSafetyFacetsForPrompt(facets: SafetyFacet[]): string {
  if (facets.length === 0) return '[no safety facets matched]';
  return facets
    .map((f, i) => {
      const docCode = f.documentCode || f.documentType.toUpperCase();
      const reg = f.regNumber ? ` reg ${f.regNumber}` : '';
      const haz = f.hazardCategory ? ` [${f.hazardCategory}]` : '';
      const ctrl = f.controlType && f.controlType !== 'general' ? ` (${f.controlType})` : '';
      const topic = (f.primaryTopic || '').replace(/\s+/g, ' ').slice(0, 360);
      const body = (f.content || '').replace(/\s+/g, ' ').slice(0, 420);
      return `${i + 1}. [${docCode}${reg}]${haz}${ctrl} ${topic}\n   ${body}`;
    })
    .join('\n\n');
}
