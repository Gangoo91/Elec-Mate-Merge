/**
 * Multi-Vector Search - Parallel searches with result fusion
 * Executes multiple vector searches in parallel and intelligently fuses results
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Logger } from './v3-core.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import { QueryComponents } from './query-decomposer.ts';

export interface RegulationResult {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  metadata?: any;
  similarity?: number;
  hybrid_score?: number;
}

/**
 * Execute multiple vector searches in parallel and fuse results
 * Use case: "9.5kW shower in bathroom" → 
 *   Search 1: "9.5kW electrical load cable sizing"
 *   Search 2: "bathroom electrical installation zones"
 *   Search 3: "RCD protection requirements"
 */
export async function multiVectorSearch(
  components: QueryComponents,
  openAiKey: string,
  supabase: SupabaseClient,
  logger: Logger
): Promise<RegulationResult[]> {
  const searches: Promise<any>[] = [];
  
  // Primary search (always present)
  const primaryQuery = buildPrimaryQuery(components);
  
  searches.push(
    generateEmbeddingWithRetry(primaryQuery, openAiKey).then(emb => 
      supabase.rpc('search_bs7671_hybrid', {
        query_text: primaryQuery,
        query_embedding: emb,
        match_count: 10
      })
    )
  );
  
  // Secondary searches (location, safety, etc.)
  for (const concern of components.secondary.slice(0, 2)) { // Top 2 concerns
    const concernQuery = concern.keywords.join(' ');
    searches.push(
      generateEmbeddingWithRetry(concernQuery, openAiKey).then(emb =>
        supabase.rpc('search_bs7671_hybrid', {
          query_text: concernQuery,
          query_embedding: emb,
          match_count: 5
        })
      )
    );
  }
  
  // Execute all searches in parallel
  const results = await Promise.all(searches);
  
  // Fuse results with weighted scoring
  const fusedResults = fuseSearchResults(
    results.map((r, idx) => ({
      results: r.data || [],
      weight: idx === 0 ? 1.0 : 0.5 // Primary search gets full weight
    }))
  );
  
  logger.info('Multi-vector search complete', {
    searchCount: searches.length,
    totalResults: fusedResults.length,
    avgScore: fusedResults.length > 0 
      ? (fusedResults.reduce((sum, r) => sum + (r.hybrid_score || 0), 0) / fusedResults.length).toFixed(3)
      : 0
  });
  
  return fusedResults.slice(0, 15); // Top 15 most relevant
}

function buildPrimaryQuery(components: QueryComponents): string {
  const entities = components.primary.entities;
  
  if (entities.loadType && entities.power) {
    return `${entities.loadType} ${entities.power}W design requirements`;
  }
  
  if (entities.jobType) {
    return `${entities.jobType} electrical installation requirements`;
  }
  
  return entities.toString() || 'electrical installation regulations';
}

function fuseSearchResults(
  searchResults: Array<{ results: RegulationResult[]; weight: number }>
): RegulationResult[] {
  const scoreMap = new Map<string, { result: RegulationResult; score: number }>();
  
  for (const { results, weight } of searchResults) {
    for (const result of results) {
      const existing = scoreMap.get(result.id);
      const weightedScore = (result.hybrid_score || result.similarity || 0) * weight;
      
      if (existing) {
        existing.score += weightedScore; // Accumulate scores
      } else {
        scoreMap.set(result.id, { result, score: weightedScore });
      }
    }
  }
  
  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .map(item => ({ ...item.result, hybrid_score: item.score }));
}
