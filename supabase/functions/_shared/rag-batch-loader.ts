/**
 * Batch RAG Search Loader
 * Reduces RAG API calls by batching similar queries
 */

import { withRetry, RetryPresets } from './retry.ts';
import { withTimeout, Timeouts } from './timeout.ts';

export interface RAGSearchParams {
  keywords: string[];
  limit?: number;
  activity_filter?: string[];
}

export interface RAGResult {
  content: string;
  regulation_number?: string;
  source_table?: string;
  similarity?: number;
}

/**
 * Cache for RAG results to avoid redundant searches
 */
const ragCache = new Map<string, RAGResult[]>();

/**
 * Generate cache key from search parameters
 */
function getCacheKey(params: RAGSearchParams): string {
  const { keywords, limit = 10, activity_filter = [] } = params;
  return `${keywords.sort().join('|')}:${limit}:${activity_filter.sort().join(',')}`;
}

/**
 * Batch search practical work intelligence with caching
 */
export async function searchPracticalWorkBatch(
  supabase: any,
  params: RAGSearchParams
): Promise<RAGResult[]> {
  const cacheKey = getCacheKey(params);
  
  if (ragCache.has(cacheKey)) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return ragCache.get(cacheKey)!;
  }
  
  const { keywords, limit = 10, activity_filter } = params;
  
  try {
    // ✅ PHASE 2: Use hybrid keyword search with retry + 60s timeout
    const queryText = keywords.join(' ');
    
    const { data, error } = await withRetry(
      () => withTimeout(
        supabase.rpc('search_practical_work_intelligence_hybrid', {
          query_text: queryText,
          match_count: limit * 2,
          filter_trade: activity_filter && activity_filter.length > 0 ? activity_filter[0] : null
        }),
        Timeouts.LONG, // 60s timeout (was 20s)
        'Practical Work RPC'
      ),
      RetryPresets.STANDARD // 3 retries with exponential backoff
    );
    
    if (error) throw error;
    
    // Transform hybrid search results to RAGResult format
    const results: RAGResult[] = (data || []).map((row: any) => ({
      content: row.primary_topic || row.content || '',
      keywords: row.keywords,
      equipment_category: row.equipment_category,
      tools_required: row.tools_required,
      bs7671_regulations: row.bs7671_regulations,
      practical_work_id: row.practical_work_id,
      source_table: 'practical_work_intelligence',
      similarity: row.hybrid_score / 10 // Normalize score to 0-1 range
    }));
    
    ragCache.set(cacheKey, results);
    console.log(`✅ Practical Work hybrid search: ${keywords.join(', ')} → ${results.length} facets (avg score: ${(results.reduce((sum, r) => sum + (r.similarity || 0), 0) / results.length).toFixed(2)})`);
    
    return results;
  } catch (error: any) {
    // ✅ PHASE 2 & 3: Enhanced error logging, removed slow fallback
    console.error('⚠️ Practical work RPC failed after retries:', {
      error: error.message,
      keywords: keywords.join(', '),
      attemptsExhausted: true,
      returningEmpty: true
    });
    return [];
  }
}

/**
 * Batch search BS 7671 regulations with caching
 */
export async function searchBS7671Batch(
  supabase: any,
  params: RAGSearchParams
): Promise<RAGResult[]> {
  const cacheKey = `bs7671:${getCacheKey(params)}`;
  
  if (ragCache.has(cacheKey)) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return ragCache.get(cacheKey)!;
  }
  
  const { keywords, limit = 10 } = params;
  
  try {
    // ✅ PHASE 2: Use BS 7671 intelligence hybrid search RPC with retry + timeout
    const queryText = keywords.join(' ');
    const { data, error } = await withRetry(
      () => withTimeout(
        supabase.rpc('search_bs7671_intelligence_hybrid', {
          query_text: queryText,
          match_count: limit
        }),
        Timeouts.LONG, // 60s timeout
        'BS 7671 RPC'
      ),
      RetryPresets.STANDARD // 3 retries
    );
    
    if (error) throw error;
    
    const results = (data || []).map((row: any) => ({
      content: row.content || row.regulation_text || '',
      regulation_number: row.regulation_number,
      similarity: row.similarity
    }));
    
    ragCache.set(cacheKey, results);
    console.log(`✅ BS 7671 search: ${keywords.join(', ')} → ${results.length} results`);
    
    return results;
  } catch (error: any) {
    // ✅ PHASE 2: Enhanced error logging
    console.error('⚠️ BS 7671 RPC failed after retries:', {
      error: error.message,
      keywords: keywords.join(', '),
      attemptsExhausted: true,
      returningEmpty: true
    });
    return [];
  }
}

/**
 * Clear cache (use between batches or when memory is limited)
 */
export function clearRAGCache(): void {
  const size = ragCache.size;
  ragCache.clear();
  console.log(`🧹 Cleared RAG cache (${size} entries)`);
}

/**
 * Get cache statistics
 */
export function getRAGCacheStats(): { entries: number; keys: string[] } {
  return {
    entries: ragCache.size,
    keys: Array.from(ragCache.keys())
  };
}
