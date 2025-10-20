/**
 * Smart Query Caching for RAG System
 * Caches repeat queries for <100ms responses
 * TTL: 7 days
 */

import { createClient } from './deps.ts';
import { normalizeQuery } from './query-normalizer.ts';

export interface CachedQuery {
  queryHash: string;
  regulations: any[];
  response: string;
  structuredData: any;
  enrichment: any;
  citations: any[];
  rendering: any;
  timestamp: number;
}

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days - optimized for recent relevance

/**
 * Get cached query response
 * Increments hit counter on cache hit
 */
export async function getCachedQuery(
  supabase: any,
  queryHash: string
): Promise<CachedQuery | null> {
  const { data, error } = await supabase
    .from('query_cache')
    .select('*')
    .eq('query_hash', queryHash)
    .gte('timestamp', Date.now() - CACHE_TTL)
    .single();
  
  if (error || !data) return null;
  
  // Increment hit counter asynchronously
  supabase
    .from('query_cache')
    .update({ hit_count: (data.hit_count || 0) + 1 })
    .eq('query_hash', queryHash)
    .then(() => {})
    .catch(() => {}); // Fire and forget
  
  return data;
}

/**
 * Store query response in cache
 */
export async function cacheQuery(
  supabase: any,
  cache: CachedQuery
): Promise<void> {
  try {
    await supabase
      .from('query_cache')
      .upsert({
        ...cache,
        hit_count: 1
      });
  } catch (error) {
    console.error('Failed to cache query:', error);
    // Don't throw - caching is non-critical
  }
}

/**
 * Generate semantic hash from circuit parameters
 * Same electrical parameters = same hash
 * UPGRADED: Now uses query normalization for better cache hits
 */
export function hashQuery(userMessage: string, circuitParams: any): string {
  // Normalize user message for consistent caching
  const normalizedMessage = normalizeQuery(userMessage);
  
  // Normalize circuit parameters to canonical form
  const canonical = {
    type: circuitParams.circuitType || 'general',
    power: circuitParams.power ? Math.round(circuitParams.power / 100) * 100 : null,
    distance: circuitParams.cableLength ? Math.round(circuitParams.cableLength) : null,
    voltage: circuitParams.voltage || 230,
    phases: circuitParams.phases || 'single'
  };
  
  // Combine normalized message + params for hash
  const str = normalizedMessage + JSON.stringify(canonical);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}
