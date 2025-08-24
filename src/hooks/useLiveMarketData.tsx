import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MarketInsights {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  averageEmploymentRate: number;
  averageStartingSalary: string;
  highDemandPrograms: number;
  fundingOptionsAvailable: number;
  professionalRange: string;
  careerpathways: number;
  industryTrends: {
    salaryGrowth: string;
    jobGrowth: string;
    skillDemand: string[];
    emergingFields: string[];
  };
  regionalData: {
    london: { minSalary: number; maxSalary: number; demandLevel: string };
    manchester: { minSalary: number; maxSalary: number; demandLevel: string };
    birmingham: { minSalary: number; maxSalary: number; demandLevel: string };
    glasgow: { minSalary: number; maxSalary: number; demandLevel: string };
  };
}

export interface UseLiveMarketDataResult {
  marketData: MarketInsights | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  isStale: boolean;
  refreshData: (forceRefresh?: boolean) => Promise<void>;
}

export const useLiveMarketData = (): UseLiveMarketDataResult => {
  const { toast } = useToast();
  const [marketData, setMarketData] = useState<MarketInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [isStale, setIsStale] = useState(false);

  const fetchMarketData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Fetching market insights data...');
      
      const { data: response, error: fnError } = await supabase.functions.invoke('live-market-insights', {
        body: { forceRefresh }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (response?.success) {
        setMarketData(response.data);
        setLastUpdated(response.lastUpdated);
        setIsFromCache(response.cached || false);
        setIsStale(response.stale || false);
        
        if (forceRefresh && !response.cached) {
          toast({
            title: 'Market Data Updated',
            description: 'Latest market insights have been refreshed',
          });
        }
      } else {
        throw new Error(response?.error || 'Failed to fetch market data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market data';
      console.error('Market data error:', errorMessage);
      setError(errorMessage);
      
      if (forceRefresh) {
        toast({
          title: 'Update Failed',
          description: errorMessage,
          variant: 'destructive'
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Auto-refresh every 30 minutes if data is stale
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated && !loading) {
        const dataAge = Date.now() - new Date(lastUpdated).getTime();
        const thirtyMinutes = 30 * 60 * 1000;
        
        if (dataAge > thirtyMinutes) {
          console.log('Auto-refreshing stale market data');
          fetchMarketData(false);
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [lastUpdated, loading, fetchMarketData]);

  // Initial load
  useEffect(() => {
    fetchMarketData(false);
  }, [fetchMarketData]);

  const refreshData = useCallback(async (forceRefresh = true) => {
    await fetchMarketData(forceRefresh);
  }, [fetchMarketData]);

  return {
    marketData,
    loading,
    error,
    lastUpdated,
    isFromCache,
    isStale,
    refreshData
  };
};