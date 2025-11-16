import { supabase } from '@/integrations/supabase/client';

/**
 * Clear all cached circuit designs from circuit_design_cache_v3
 * Forces fresh designs with updated RAG data and field requirements
 */
export const clearDesignCache = async () => {
  try {
    console.log('🗑️ Clearing circuit design cache...');
    
    const { error } = await supabase
      .from('circuit_design_cache_v3')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    if (error) {
      console.error('❌ Cache clear error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Cache cleared successfully');
    return { success: true };
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
