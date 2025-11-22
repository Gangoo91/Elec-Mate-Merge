import { supabase } from '@/integrations/supabase/client';

/**
 * Clear all cached circuit designs from ALL cache tables
 * Forces fresh designs with updated RAG data and field requirements
 */
export const clearDesignCache = async () => {
  try {
    console.log('🗑️ Clearing ALL circuit design cache tables...');
    
    const cacheTables = [
      'circuit_design_cache_v4',
      'circuit_design_cache_v3',
      'circuit_design_cache',
      'circuit_level_cache'
    ];
    
    let clearedCount = 0;
    const errors: string[] = [];
    
    for (const table of cacheTables) {
      console.log(`🗑️ Clearing ${table}...`);
      
      const { error } = await supabase
        .from(table as any)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (error) {
        console.error(`❌ Failed to clear ${table}:`, error);
        errors.push(`${table}: ${error.message}`);
      } else {
        console.log(`✅ Cleared ${table}`);
        clearedCount++;
      }
    }
    
    if (errors.length > 0) {
      console.error('❌ Some cache tables failed to clear:', errors);
      return { 
        success: false, 
        error: `Cleared ${clearedCount}/${cacheTables.length} tables. Errors: ${errors.join('; ')}` 
      };
    }
    
    console.log(`✅ All cache tables cleared successfully (${clearedCount}/${cacheTables.length})`);
    return { success: true, cleared: clearedCount, total: cacheTables.length };
  } catch (error) {
    console.error('❌ Cache clear failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Clear specific cached design by cache key
 */
export const clearDesignCacheByKey = async (cacheKey: string) => {
  try {
    console.log(`🗑️ Clearing cache for key: ${cacheKey}`);
    
    const { error } = await supabase
      .from('circuit_design_cache_v3')
      .delete()
      .eq('cache_key', cacheKey);
    
    if (error) {
      console.error('❌ Cache clear error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Cache entry cleared');
    return { success: true };
  } catch (error) {
    console.error('❌ Cache clear failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Expose to window for testing in console
if (typeof window !== 'undefined') {
  (window as any).clearDesignCache = clearDesignCache;
  (window as any).clearDesignCacheByKey = clearDesignCacheByKey;
}
