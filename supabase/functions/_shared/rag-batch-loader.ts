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
  
  if (ragCache.has(cacheKey)) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return ragCache.get(cacheKey)!;
  }
  
  const { keywords, limit = 10, activity_filter } = params;
  
  try {
    // Fetch 3x to get multiple facets per procedure
    const { data, error } = await supabase.rpc(
      'search_practical_work_intelligence_hybrid',
      {
        keywords: keywords.join(' '),
        match_count: limit * 3, // Get multiple facets per procedure
        activity_types_filter: activity_filter || null
      }
    );
    
    if (error) throw error;
    
    // Group results by practical_work_id, keeping all facets
    const groupedResults = new Map<string, RAGResult[]>();
    
    (data || []).forEach((row: any) => {
      const key = row.practical_work_id || row.id;
      if (!groupedResults.has(key)) {
        groupedResults.set(key, []);
      }
      groupedResults.get(key)!.push({
        content: `[${row.facet_type || 'primary'}] ${row.content || row.description || ''}`,
        facet_type: row.facet_type,
        practical_work_id: row.practical_work_id,
        source_table: row.source_table,
        similarity: row.similarity
      });
    });
    
    // Flatten back to array, with all facets for top procedures
    const results = Array.from(groupedResults.values())
      .slice(0, limit) // Take top N procedures
      .flat(); // Include all facets for those procedures
    
    ragCache.set(cacheKey, results);
    console.log(`✅ Practical Work search: ${results.length} facets from ${groupedResults.size} procedures`);
    
    return results;
  } catch (error) {
    console.error('Practical Work search failed:', error);
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
