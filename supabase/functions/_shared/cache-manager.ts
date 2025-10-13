/**
 * Smart Cache Manager
 * Handles cache invalidation and warming
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

/**
 * Invalidate cache entries that reference specific regulations
 */
export async function invalidateCacheForAmendment(
  supabase: SupabaseClient,
  regulationNumbers: string[]
): Promise<void> {
  console.log(`Invalidating cache for ${regulationNumbers.length} regulations...`);
  
  // Delete cache entries that might reference these regulations
  for (const regNumber of regulationNumbers) {
    await supabase
      .from('rag_cache')
      .delete()
      .ilike('query_text', `%${regNumber}%`);
  }
  
  console.log(`✅ Cache invalidated for ${regulationNumbers.length} regulations`);
}

/**
 * Warm cache with common queries
 */
export async function warmCache(
  supabase: SupabaseClient,
  queries: string[]
): Promise<{ warmed: number; failed: number }> {
  let warmed = 0;
  let failed = 0;
  
  for (const query of queries) {
    try {
      // This will populate the cache
      await supabase.functions.invoke('designer-v3', {
        body: { 
          query, 
          systemContext: { cacheWarming: true } 
        }
      });
      warmed++;
    } catch (error) {
      console.error(`Failed to warm cache for: ${query}`, error);
      failed++;
    }
    
    // Rate limit: 1 request per second
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return { warmed, failed };
}

/**
 * Get cache statistics
 */
export async function getCacheStats(supabase: SupabaseClient): Promise<{
  totalEntries: number;
  hitRate: number;
  avgAge: number;
}> {
  const { data, error } = await supabase
    .from('rag_cache')
    .select('created_at, cache_hits');
  
  if (error || !data) {
    return { totalEntries: 0, hitRate: 0, avgAge: 0 };
  }
  
  const totalEntries = data.length;
  const totalHits = data.reduce((sum, entry) => sum + (entry.cache_hits || 0), 0);
  const hitRate = totalEntries > 0 ? totalHits / totalEntries : 0;
  
  // Calculate average age in hours
  const now = new Date().getTime();
  const avgAge = data.reduce((sum, entry) => {
    const created = new Date(entry.created_at).getTime();
    return sum + (now - created);
  }, 0) / (data.length * 1000 * 60 * 60); // Convert to hours
  
  return { totalEntries, hitRate, avgAge };
}
