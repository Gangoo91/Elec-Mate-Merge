import { supabase } from '@/integrations/supabase/client';

export const testMarketInsightsCache = async () => {
  try {
    console.log('🔄 Testing market insights cache refresh...');
    
    const { data, error } = await supabase.functions.invoke('market-insights-scheduler', {
      body: { 
        keywords: 'electrician', 
        location: 'UK',
        isScheduled: false 
      }
    });
    
    if (error) {
      console.error('❌ Market insights refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Market insights refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Market insights refresh failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkMarketInsightsCacheStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('market_insights_cache')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error checking market insights cache:', error);
      return { success: false, error: error.message };
    }
    
    console.log('📊 Current market insights cache status:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to check market insights cache:', error);
    return { success: false, error: error.message };
  }
};

export const forceRefreshMarketInsights = async () => {
  try {
    console.log('🔄 Force refreshing market insights...');
    
    const { data, error } = await supabase.functions.invoke('live-market-insights', {
      body: { 
        keywords: 'electrician', 
        location: 'UK',
        forceRefresh: true 
      }
    });
    
    if (error) {
      console.error('❌ Force refresh error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Force refresh completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Force refresh failed:', error);
    return { success: false, error: error.message };
  }
};

// Temporarily add to window for testing
if (typeof window !== 'undefined') {
  (window as any).testMarketInsightsCache = testMarketInsightsCache;
  (window as any).checkMarketInsightsCacheStatus = checkMarketInsightsCacheStatus;
  (window as any).forceRefreshMarketInsights = forceRefreshMarketInsights;
}