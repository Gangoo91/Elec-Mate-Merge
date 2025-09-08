import { supabase } from '@/integrations/supabase/client';

// Trigger weekly materials cache update using the materials-weekly-cache function
export const updateMaterialsCache = async () => {
  try {
    console.log('🔄 Triggering materials weekly refresh with force refresh...');
    
    const { data, error } = await supabase.functions.invoke('materials-weekly-cache', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('Materials refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Materials refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Materials refresh failed:', error);
    return { success: false, error: error.message };
  }
};

// Trigger weekly tools cache update using the tools-weekly-refresh function
export const updateToolsCache = async () => {
  try {
    console.log('🔄 Triggering tools weekly refresh with force refresh...');
    
    const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('Tools refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Tools refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Tools refresh failed:', error);
    return { success: false, error: error.message };
  }
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
        nextRefreshAvailable: null
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
      isExpired: new Date() > new Date(latestCache.expires_at)
    };
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return { success: false, error: error.message };
  }
};

// Legacy function for backward compatibility
export const refreshMaterialsCache = updateMaterialsCache;

// Check tools cache status
export const getToolsCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('tools_weekly_cache')
      .select('category, total_products, created_at, expires_at, update_status')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error fetching tools cache status:', error);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { 
        success: true, 
        cacheEntries: [], 
        canRefresh: true,
        cacheAge: null,
        nextRefreshAvailable: null
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
      isExpired: new Date() > new Date(latestCache.expires_at)
    };
  } catch (error) {
    console.error('Failed to get tools cache status:', error);
    return { success: false, error: error.message };
  }
};