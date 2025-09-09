import { supabase } from '@/integrations/supabase/client';

export const testMaterialsCacheRefresh = async () => {
  try {
    console.log('🔄 Testing materials cache refresh...');
    
    const { data, error } = await supabase.functions.invoke('materials-cache-updater', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('❌ Materials cache refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Materials cache refresh response:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Materials cache refresh failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkMaterialsCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error checking materials cache:', error);
      return { success: false, error: error.message };
    }
    
    console.log('📊 Current materials cache status:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to check materials cache:', error);
    return { success: false, error: error.message };
  }
};

// Add to window for testing
if (typeof window !== 'undefined') {
  (window as any).testMaterialsCacheRefresh = testMaterialsCacheRefresh;
  (window as any).checkMaterialsCacheStatus = checkMaterialsCacheStatus;
}