import { supabase } from '@/integrations/supabase/client';

export const testToolsRefresh = async () => {
  try {
    console.log('🔄 Force refreshing tools data via tools-weekly-refresh...');
    console.log('⏱️ This may take 1-2 minutes to complete...');
    
    const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('❌ Tools refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Tools refresh completed successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Tools refresh failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkToolsCache = async () => {
  try {
    const { data, error } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error checking tools cache:', error);
      return { success: false, error: error.message };
    }
    
    console.log('📊 Current tools cache status:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to check tools cache:', error);
    return { success: false, error: error.message };
  }
};

// Temporarily add to window for testing
if (typeof window !== 'undefined') {
  (window as any).testToolsRefresh = testToolsRefresh;
  (window as any).checkToolsCache = checkToolsCache;
}