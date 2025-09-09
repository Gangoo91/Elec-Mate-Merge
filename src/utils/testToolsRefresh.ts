import { supabase } from '@/integrations/supabase/client';

export const testToolsRefresh = async () => {
  try {
    console.log('🔄 Testing tools refresh via tools-weekly-refresh...');
    
    const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
      body: { forceRefresh: true }
    });
    
    if (error) {
      console.error('❌ Tools refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Tools refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Tools refresh failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkToolsCache = async () => {
  try {
    const { data, error } = await supabase
      .from('tools_weekly_cache' as any)
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

export const clearToolsCache = async () => {
  try {
    console.log('🗑️ Clearing tools cache...');
    
    const { error } = await supabase
      .from('tools_weekly_cache' as any)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
    if (error) {
      console.error('Error clearing tools cache:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Tools cache cleared successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to clear tools cache:', error);
    return { success: false, error: error.message };
  }
};

// Temporarily add to window for testing
if (typeof window !== 'undefined') {
  (window as any).testToolsRefresh = testToolsRefresh;
  (window as any).checkToolsCache = checkToolsCache;
  (window as any).clearToolsCache = clearToolsCache;
}