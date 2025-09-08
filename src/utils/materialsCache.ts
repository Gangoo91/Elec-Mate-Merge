import { supabase } from '@/integrations/supabase/client';

// Trigger materials cache update using batch processing
export const updateMaterialsCache = async () => {
  try {
    console.log('🔄 Triggering materials cache update with batch processing...');
    
    const { data, error } = await supabase.functions.invoke('materials-cache-updater', {
      body: { refresh: true }
    });

    if (error) {
      console.error('❌ Failed to update materials cache:', error);
      throw error;
    }

    console.log('✅ Materials cache update triggered successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error updating materials cache:', error);
    throw error;
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
        canRefresh: true,
        age: 'No data available',
        nextRefreshAllowed: null,
        isEmpty: true
      };
    }

    const latestCache = data[0];
    const cacheAge = Date.now() - new Date(latestCache.created_at).getTime();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const canRefresh = cacheAge >= sevenDaysInMs;
    
    const nextRefreshAllowed = canRefresh 
      ? null 
      : new Date(new Date(latestCache.created_at).getTime() + sevenDaysInMs);
    
    const days = Math.floor(cacheAge / (24 * 60 * 60 * 1000));
    const hours = Math.floor((cacheAge % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    let ageString = '';
    if (days > 0) {
      ageString = `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      ageString = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      ageString = 'Less than an hour ago';
    }
    
    return { 
      canRefresh,
      age: ageString,
      nextRefreshAllowed,
      isEmpty: false
    };
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return { success: false, error: error.message };
  }
};

// Legacy function for backward compatibility
export const refreshMaterialsCache = updateMaterialsCache;