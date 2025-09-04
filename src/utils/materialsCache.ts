import { supabase } from '@/integrations/supabase/client';

// Manual cache refresh utility for testing and administration
export const refreshMaterialsCache = async () => {
  try {
    console.log('🔄 Manually triggering materials cache refresh...');
    
    const { data, error } = await supabase.functions.invoke('materials-cache-updater', {
      body: { manual: true }
    });
    
    if (error) {
      console.error('Cache refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Cache refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Cache refresh failed:', error);
    return { success: false, error: error.message };
  }
};

// Check cache status utility
export const getCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('category, total_products, created_at, expires_at, update_status')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching cache status:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, cacheEntries: data };
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return { success: false, error: error.message };
  }
};