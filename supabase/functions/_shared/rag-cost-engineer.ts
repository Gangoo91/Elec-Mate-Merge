/**
 * RAG Module for Cost Engineer
 * Optimized hybrid search for pricing_embeddings table
 * - Query caching (60min TTL)
 * - Semantic caching (embedding reuse)
 * - Lower threshold (0.5) + more results (12)
 * - Parallel keyword + vector search
 */

import { createClient } from './deps.ts';
import { createLogger } from './logger.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface PricingResult {
  id: string;
  item_name: string;
  base_cost: number;
  wholesaler: string;
  price_per_unit: string;
  in_stock: boolean;
  category?: string;
  content?: string;
  similarity?: number;
}

interface CachedQuery {
  query_hash: string;
  results: PricingResult[];
  hit_count: number;
  created_at: string;
  expires_at: string;
}

/**
 * Generate cache key from query
 */
function generateCacheKey(query: string, jobType?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = jobType ? `${normalized}:${jobType}` : normalized;
  return btoa(key).substring(0, 32); // Base64 hash, first 32 chars
}

/**
 * Check query cache
 */
async function checkQueryCache(
  supabase: SupabaseClient,
  queryHash: string,
  logger: any
): Promise<PricingResult[] | null> {
  try {
    const { data, error } = await supabase
      .from('cost_query_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      logger.debug('Cache miss', { queryHash });
      return null;
    }

    // Update hit count
    await supabase
      .from('cost_query_cache')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('query_hash', queryHash);

    logger.info('Cache hit', { queryHash, hitCount: data.hit_count + 1 });
    return data.results as PricingResult[];
  } catch (err) {
    logger.warn('Cache check failed', { error: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

/**
 * Store query results in cache
 */
async function storeQueryCache(
  supabase: SupabaseClient,
  queryHash: string,
  query: string,
  results: PricingResult[],
  jobType: string | undefined,
  logger: any
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
    
    await supabase
      .from('cost_query_cache')
      .upsert({
        query_hash: queryHash,
        query,
        results,
        job_type: jobType,
        hit_count: 0,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString()
      });

    logger.debug('Stored in cache', { queryHash, resultCount: results.length });
  } catch (err) {
    logger.warn('Cache store failed', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Hybrid search: keyword + vector search combined
 */
export async function searchPricingKnowledge(
  query: string,
  embedding: number[],
  supabase: SupabaseClient,
  logger: any,
  jobType?: string
): Promise<PricingResult[]> {
  const searchStart = Date.now();
  
  // Check cache first
  const cacheKey = generateCacheKey(query, jobType);
  const cached = await checkQueryCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached;
  }

  logger.debug('Starting hybrid pricing search', { query, jobType });

  try {
    // Parallel execution: vector search + keyword search
    const [vectorResults, keywordResults] = await Promise.all([
      // Vector search with lower threshold
      supabase.rpc('search_pricing', {
        query_embedding: embedding,
        match_threshold: 0.5, // Lower from 0.7 → 0.5
        match_count: 12       // Increase from 8 → 12
      }),
      
      // Keyword search for common terms
      supabase
        .from('pricing_embeddings')
        .select('*')
        .or(`item_name.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(8)
    ]);

    // Merge results (dedupe by id)
    const allResults = [
      ...(vectorResults.data || []),
      ...(keywordResults.data || [])
    ];

    const uniqueResults = allResults
      .filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      )
      .slice(0, 15); // Top 15 results

    logger.info('Hybrid search complete', {
      duration: Date.now() - searchStart,
      vectorResults: vectorResults.data?.length || 0,
      keywordResults: keywordResults.data?.length || 0,
      totalUnique: uniqueResults.length
    });

    // Store in cache
    await storeQueryCache(supabase, cacheKey, query, uniqueResults, jobType, logger);

    return uniqueResults;
  } catch (error) {
    logger.error('Hybrid search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}

/**
 * Format pricing results for context
 */
export function formatPricingContext(results: PricingResult[]): string {
  if (!results || results.length === 0) {
    return 'No database pricing found. Use fallback market rates.';
  }

  return `DATABASE PRICES (${results.length} items, 15% markup applied):\n` +
    results.map(p => 
      `- ${p.item_name}: £${p.base_cost.toFixed(2)} (${p.wholesaler}${p.in_stock ? '' : ' - awaiting stock'})`
    ).join('\n');
}

/**
 * Search project management knowledge for labour time standards
 */
export async function searchLabourTimeKnowledge(
  query: string,
  embedding: number[],
  supabase: SupabaseClient,
  logger: any,
  jobType?: string
): Promise<any[]> {
  const searchStart = Date.now();
  
  // Check cache first
  const cacheKey = generateCacheKey(`labour_${query}`, jobType);
  const cached = await checkQueryCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('Labour time cache hit', { duration: Date.now() - searchStart });
    return cached as any[];
  }

  logger.debug('Starting labour time search', { query, jobType });

  try {
    // Parallel execution: vector search + keyword search on project_mgmt_knowledge
    const [vectorResults, keywordResults] = await Promise.all([
      // Vector search using the project_mgmt_hybrid RPC function
      supabase.rpc('search_project_mgmt_hybrid', {
        query_text: query,
        query_embedding: embedding,
        match_count: 10
      }),
      
      // Keyword search for labour/time/hours
      supabase
        .from('project_mgmt_knowledge')
        .select('*')
        .or(`topic.ilike.%labour%,topic.ilike.%time%,content.ilike.%hours%,content.ilike.%installation%`)
        .limit(8)
    ]);

    // Merge results (dedupe by id)
    const allResults = [
      ...(vectorResults.data || []),
      ...(keywordResults.data || [])
    ];

    const uniqueResults = allResults
      .filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      )
      .slice(0, 12); // Top 12 labour time results

    logger.info('Labour time search complete', {
      duration: Date.now() - searchStart,
      vectorResults: vectorResults.data?.length || 0,
      keywordResults: keywordResults.data?.length || 0,
      totalUnique: uniqueResults.length
    });

    // Store in cache (60 min TTL)
    await storeQueryCache(supabase, cacheKey, query, uniqueResults as any, jobType, logger);

    return uniqueResults;
  } catch (error) {
    logger.error('Labour time search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    return []; // Return empty array on error (fallback to hardcoded values)
  }
}

/**
 * Format labour time results for AI context
 */
export function formatLabourTimeContext(results: any[]): string {
  if (!results || results.length === 0) {
    return 'No labour time data found in handbook. Use fallback estimates.';
  }

  return `LABOUR TIME STANDARDS (from PROJECT-AND-COST-ENGINEERS-HANDBOOK):\n` +
    results.map(r => 
      `- ${r.topic}: ${r.content.substring(0, 150)}...`
    ).join('\n');
}
