import { supabase } from '@/integrations/supabase/client';

export const testCacheRefresh = async () => {
  try {
    console.log('🔄 Testing cache refresh via materials-weekly-cache...');
    
    const { data, error } = await supabase.functions.invoke('materials-weekly-cache', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('❌ Cache refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Cache refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Cache refresh failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error checking cache:', error);
      return { success: false, error: error.message };
    }
    
    console.log('📊 Current cache status:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to check cache:', error);
    return { success: false, error: error.message };
  }
};

// Temporarily add to window for testing
if (typeof window !== 'undefined') {
  (window as any).testCacheRefresh = testCacheRefresh;
  (window as any).checkCacheStatus = checkCacheStatus;
}