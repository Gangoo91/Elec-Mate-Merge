/**
 * BS 7671 facets RAG helper.
 *
 * Single source of truth for regulation grounding in the Cost Engineer
 * pipeline. Wraps the `search_bs7671_v3()` RPC, which performs hybrid
 * BM25 + vector retrieval with optional graph expansion across the
 * `bs7671_facets` corpus (BS 7671 main + OSG + GN3 + AM4:2026, ~40k rows).
 *
 * Returns top-K facets with regulation refs, clause text, page numbers,
 * and the retrieval source for traceability. Stage B injects these into
 * the AI annotation prompt so every compliance flag carries a regulation
 * reference rather than the model's training data.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateLargeEmbedding } from './ai-providers.ts';

export interface BS7671Facet {
  facetId: string;
  regNumber: string | null;
  regTitle: string | null;
  part: string | null;
  chapter: string | null;
  section: string | null;
  documentType: string;
  pageNumber: number | null;
  facetType: string | null;
  primaryTopic: string | null;
  content: string;
  contextPrefix: string | null;
  systemTypes: string[] | null;
  zones: string[] | null;
  equipmentCategory: string | null;
  protectionMethod: string | null;
  /** Final fused score after RRF + graph expansion. */
  score: number;
  /** 'hybrid' | 'vector' | 'bm25' | 'graph_expand'. */
  retrievalSource: string;
}

interface SearchArgs {
  query: string;
  /** Top-K facets to return. Default 5. */
  matchCount?: number;
  /** Optionally restrict to specific document types (e.g. ['bs7671', 'osg']). */
  documentTypes?: string[];
  systemTypes?: string[];
  equipmentCategory?: string | null;
  protectionMethod?: string | null;
  /** Skip vector retrieval if you don't want the embedding cost. */
  skipEmbedding?: boolean;
}

/**
 * Hybrid search across BS 7671 facets. Generates a 3072-dim embedding for
 * the query (halfvec), passes it alongside the raw text to the RPC for
 * BM25 + vector + graph fusion. Returns up to `matchCount` results with
 * retrieval-source tags for the UI.
 *
 * Failure modes are non-fatal: if the embedding call fails, we fall back
 * to BM25-only by passing query_embedding=NULL. If the RPC fails entirely,
 * we return an empty array and log — Cost Engineer continues without
 * compliance grounding rather than crashing the whole estimate.
 */
export async function searchFacets(
  supabase: any,
  args: SearchArgs
): Promise<BS7671Facet[]> {
  const {
    query,
    matchCount = 5,
    documentTypes = null,
    systemTypes = null,
    equipmentCategory = null,
    protectionMethod = null,
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
        console.warn('[bs7671-facets-rag] embedding failed, falling back to BM25-only:', err);
      }
    }
  }

  const { data, error } = await supabase.rpc('search_bs7671_v3', {
    query_embedding: embedding,
    query_text: query,
    document_types: documentTypes,
    system_types_filter: systemTypes,
    equipment_filter: equipmentCategory,
    protection_filter: protectionMethod,
    match_count: matchCount,
  });

  if (error) {
    console.error('[bs7671-facets-rag] search_bs7671_v3 failed:', error);
    return [];
  }

  return (data ?? []).map(rowToFacet);
}

/**
 * Format facets as a compact prompt block for Stage B. One line per facet,
 * no markdown noise, regulation ref + topic + content (truncated). Designed
 * to keep token cost low while preserving citability.
 */
export function formatFacetsForPrompt(facets: BS7671Facet[]): string {
  if (facets.length === 0) return '[no BS 7671 facets matched]';
  return facets
    .map((f, i) => {
      const ref = f.regNumber ? `Reg ${f.regNumber}` : f.documentType.toUpperCase();
      const topic = f.primaryTopic ? ` — ${f.primaryTopic}` : '';
      const content = (f.content ?? '').replace(/\s+/g, ' ').slice(0, 400);
      return `${i + 1}. [${ref}${topic}] ${content}`;
    })
    .join('\n');
}

/* ─── Internals ─────────────────────────────────────────────────────── */

function rowToFacet(row: any): BS7671Facet {
  return {
    facetId: row.facet_id,
    regNumber: row.reg_number,
    regTitle: row.reg_title,
    part: row.part,
    chapter: row.chapter,
    section: row.section,
    documentType: row.document_type,
    pageNumber: row.page_number,
    facetType: row.facet_type,
    primaryTopic: row.primary_topic,
    content: row.content ?? '',
    contextPrefix: row.context_prefix,
    systemTypes: row.system_types,
    zones: row.bs7671_zones,
    equipmentCategory: row.equipment_category,
    protectionMethod: row.protection_method,
    score: Number(row.rrf_score ?? 0),
    retrievalSource: row.retrieval_source ?? 'unknown',
  };
}
