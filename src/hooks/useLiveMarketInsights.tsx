import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MarketInsightsData {
  salaryStats: { median: number; q1: number; q3: number; min: number; max: number; count: number };
  salaryBuckets: { label: string; count: number }[];
  jobTypeMix: { label: string; count: number }[];
  experienceMix: { label: string; count: number }[];
  workingPattern: { label: string; count: number }[];
  freshness: { last48hPct: number; recent7dPct: number; medianDays: number };
  topCompanies: { name: string; count: number }[];
  topSkills: { name: string; count: number }[];
  topCerts: { name: string; count: number }[];
  jobsCount: number;
}

interface MarketInsightsCacheEntry {
  id: string;
  keywords: string;
  location: string;
  data: MarketInsightsData;
  data_source: string;
  last_updated: string;
  expires_at: string;
  created_at: string;
}

export const useLiveMarketInsights = (keywords = 'electrician', location = 'UK') => {
  const { toast } = useToast();
  const [data, setData] = useState<MarketInsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('');

  // Check for cached data first, then fetch live if needed
  const fetchMarketInsights = useCallback(async (forceLive = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // First check cache if not forcing live
      if (!forceLive) {
        const { data: cachedData, error: cacheError } = await supabase
          .from('market_insights_cache')
          .select('*')
          .eq('keywords', keywords)
          .eq('location', location)
          .gte('expires_at', new Date().toISOString())
          .maybeSingle();

        if (cacheError) {
          console.error('Cache query error:', cacheError);
        } else if (cachedData) {
          console.log('Using cached market insights data');
          setData(cachedData.data as unknown as MarketInsightsData);
          setLastUpdated(cachedData.last_updated);
          setDataSource(cachedData.data_source);
          setIsLive(true);
          setIsLoading(false);
          return cachedData.data as unknown as MarketInsightsData;
        }
      }

      // If no valid cache or forcing live, update via scheduler
      console.log('Fetching fresh market insights data');
      const { data: updateResult, error: updateError } = await supabase.functions.invoke('market-insights-scheduler', {
        body: { keywords, location, isScheduled: false }
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      if (!updateResult.success) {
        throw new Error('Failed to update market insights');
      }

      // Now fetch the updated data
      const { data: freshData, error: fetchError } = await supabase
        .from('market_insights_cache')
        .select('*')
        .eq('keywords', keywords)
        .eq('location', location)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setData(freshData.data as unknown as MarketInsightsData);
      setLastUpdated(freshData.last_updated);
      setDataSource(freshData.data_source);
      setIsLive(true);

      if (forceLive) {
        toast({
          title: 'Market Insights Updated',
          description: 'Latest market data has been refreshed',
        });
      }

      return freshData.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market insights';
      console.error('Market insights error:', errorMessage);
      setError(errorMessage);
      setIsLive(false);
      
      if (forceLive) {
        toast({
          title: 'Update Failed',
          description: errorMessage,
          variant: 'destructive'
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [keywords, location, toast]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('market-insights-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'market_insights_cache',
          filter: `keywords=eq.${keywords},location=eq.${location}`
        },
        (payload) => {
          console.log('Real-time market insights update:', payload);
          
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const newData = payload.new as any;
            setData(newData.data as unknown as MarketInsightsData);
            setLastUpdated(newData.last_updated);
            setDataSource(newData.data_source);
            setIsLive(true);
            
            toast({
              title: 'Live Update',
              description: 'Market insights automatically refreshed',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [keywords, location, toast]);

  // Auto-refresh weekly if data is stale
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const dataAge = Date.now() - new Date(lastUpdated).getTime();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        if (dataAge > oneWeek) {
          console.log('Auto-refreshing weekly market insights data');
          fetchMarketInsights(false);
        }
      }
    }, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, [lastUpdated, fetchMarketInsights]);

  // Initial load
  useEffect(() => {
    fetchMarketInsights(false);
  }, [fetchMarketInsights]);

  const refreshLive = useCallback(() => {
    return fetchMarketInsights(true);
  }, [fetchMarketInsights]);

  const getDataAge = useCallback(() => {
    if (!lastUpdated) return null;
    const age = Date.now() - new Date(lastUpdated).getTime();
    const minutes = Math.floor(age / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }, [lastUpdated]);

  const isDataFresh = useCallback(() => {
    if (!lastUpdated) return false;
    const age = Date.now() - new Date(lastUpdated).getTime();
    return age < 7 * 24 * 60 * 60 * 1000; // Fresh if less than 7 days old
  }, [lastUpdated]);

  return {
    data,
    isLoading,
    isLive,
    lastUpdated,
    error,
    dataSource,
    refreshLive,
    getDataAge,
    isDataFresh
  };
};