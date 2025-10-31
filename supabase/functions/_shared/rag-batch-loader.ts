/**
 * Batch RAG Search Loader
 * Reduces RAG API calls by batching similar queries
 */

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
  
  // Return cached results if available
  if (ragCache.has(cacheKey)) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return ragCache.get(cacheKey)!;
  }
  
  const { keywords, limit = 10, activity_filter } = params;
  
  try {
    // Use hybrid search function
    const { data, error } = await supabase.rpc(
      'search_practical_work_intelligence_hybrid',
      {
        keywords: keywords.join(' '),
        match_count: limit,
        activity_types_filter: activity_filter || null
      }
    );
    
    if (error) throw error;
    
    const results = (data || []).map((row: any) => ({
      content: row.content || row.description || '',
      source_table: row.source_table,
      similarity: row.similarity
    }));
    
    // Cache results
    ragCache.set(cacheKey, results);
    console.log(`✅ RAG search: ${keywords.join(', ')} → ${results.length} results (cached)`);
    
    return results;
  } catch (error) {
    console.error('RAG search failed:', error);
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
    const { data, error } = await supabase.rpc(
      'search_bs7671_intelligence_hybrid',
      {
        keywords: keywords.join(' '),
        match_count: limit
      }
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
  } catch (error) {
    console.error('BS 7671 search failed:', error);
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
