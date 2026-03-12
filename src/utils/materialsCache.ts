import { supabase } from '@/integrations/supabase/client';

// Materials are refreshed automatically by the pipeline (weekly).
// This function just returns success — no manual scraping needed.
export const updateMaterialsCache = async () => {
  console.log('Materials are refreshed automatically by the pipeline');
  return { success: true, data: { message: 'Materials updated by pipeline' } };
};

// Check cache status and determine if refresh is allowed
export const getCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('category, total_products, created_at, expires_at, update_status')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching cache status:', error);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: true,
        cacheEntries: [],
        canRefresh: true,
        cacheAge: null,
        nextRefreshAvailable: null,
      };
    }

    const latestCache = data[0];
    const cacheAge = Date.now() - new Date(latestCache.created_at).getTime();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const canRefresh = cacheAge >= sevenDaysInMs;

    const nextRefreshAvailable = canRefresh
      ? null
      : new Date(new Date(latestCache.created_at).getTime() + sevenDaysInMs);

    return {
      success: true,
      cacheEntries: data,
      canRefresh,
      cacheAge: Math.floor(cacheAge / (24 * 60 * 60 * 1000)), // in days
      nextRefreshAvailable,
      isExpired: new Date() > new Date(latestCache.expires_at),
    };
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return { success: false, error: error.message };
  }
};

// Legacy function for backward compatibility
export const refreshMaterialsCache = updateMaterialsCache;
