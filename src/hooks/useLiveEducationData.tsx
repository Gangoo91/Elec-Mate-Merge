import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveEducationData {
  id: string;
  title: string;
  institution: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  studyMode: string;
  locations: string[];
  entryRequirements: string[];
  keyTopics: string[];
  progressionOptions: string[];
  fundingOptions: string[];
  tuitionFees: string;
  applicationDeadline: string;
  nextIntake: string;
  rating: number;
  employmentRate: number;
  averageStartingSalary: string;
  courseUrl: string;
  lastUpdated: string;
}

export interface LiveEducationAnalytics {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  averageEmploymentRate: number;
  averageStartingSalary: string;
  highDemandPrograms: number;
  fundingOptionsAvailable: number;
  topCategories: Array<{ name: string; count: number }>;
  trends: {
    growthAreas: string[];
    industryPartnerships: string[];
  };
}

interface CacheInfo {
  nextRefresh: string;
  cacheVersion: number;
  refreshStatus: string;
  daysUntilRefresh: number;
}

interface UseLiveEducationDataResult {
  educationData: LiveEducationData[];
  analytics: LiveEducationAnalytics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  cacheInfo: CacheInfo | null;
  refreshData: (forceRefresh?: boolean) => Promise<void>;
}

export const useLiveEducationData = (category: string = 'all'): UseLiveEducationDataResult => {
  const [educationData, setEducationData] = useState<LiveEducationData[]>([]);
  const [analytics, setAnalytics] = useState<LiveEducationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);

  const fetchEducationData = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching live education data...');

      // Check for cached data first (if not forcing refresh)
      if (!forceRefresh) {
        const { data: cachedData, error: cacheError } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .gte('expires_at', new Date().toISOString())
          .maybeSingle();

        if (!cacheError && cachedData?.education_data && cachedData?.analytics_data) {
          const educationArray = cachedData.education_data as unknown as LiveEducationData[];
          console.log(`⚡ Using cached education data (${educationArray.length} programmes)`);
          setEducationData(educationArray || []);
          setAnalytics(cachedData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(cachedData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: cachedData.next_refresh_date,
            cacheVersion: cachedData.cache_version,
            refreshStatus: cachedData.refresh_status,
            daysUntilRefresh: Math.ceil((new Date(cachedData.next_refresh_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          });
          setLoading(false);
          return;
        }
      }

      // If no cache or force refresh, fetch fresh data with timeout
      console.log('📡 Fetching fresh education data from edge function...');
      
      const fetchWithTimeout = async (timeoutMs: number) => {
        return Promise.race([
          supabase.functions.invoke('live-education-aggregator', {
            body: { 
              category, 
              refresh: forceRefresh, 
              limit: 50 
            }
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
          )
        ]);
      };

      let data, functionError;
      try {
        const result = await fetchWithTimeout(15000) as any; // 15 second timeout
        data = result.data;
        functionError = result.error;
      } catch (timeoutError) {
        console.warn('⏰ Request timed out, using cached data');
        functionError = timeoutError;
      }

      if (functionError) {
        console.error('❌ Function error:', functionError);
        
        // Try to get latest cached data as fallback
        const { data: fallbackData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (fallbackData?.education_data) {
          const fallbackArray = fallbackData.education_data as unknown as LiveEducationData[];
          console.log(`🔄 Using fallback cached data (${fallbackArray.length} programmes)`);
          setEducationData(fallbackArray || []);
          setAnalytics(fallbackData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(fallbackData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: fallbackData.next_refresh_date,
            cacheVersion: fallbackData.cache_version,
            refreshStatus: 'expired',
            daysUntilRefresh: 0
          });
        }
        
        setError('Unable to fetch fresh data - showing cached results if available');
        setLoading(false);
        return;
      }

      if (data?.success && data?.data && data?.analytics) {
        console.log(`✅ Loaded ${data.data.length} education programmes`);
        setEducationData(data.data);
        setAnalytics(data.analytics);
        setLastUpdated(new Date().toISOString());
        setIsFromCache(false);
        setCacheInfo(data.cacheInfo || null);
        setError(null);
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        setError('Unexpected response format from education service');
      }

    } catch (error) {
      console.error('❌ Error fetching education data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch education data');
      
      // Try to get latest cached data as fallback
      try {
        const { data: fallbackData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (fallbackData?.education_data) {
          const errorFallbackArray = fallbackData.education_data as unknown as LiveEducationData[];
          console.log(`🔄 Using fallback cached data after error (${errorFallbackArray.length} programmes)`);
          setEducationData(errorFallbackArray || []);
          setAnalytics(fallbackData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(fallbackData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: fallbackData.next_refresh_date,
            cacheVersion: fallbackData.cache_version,
            refreshStatus: 'error',
            daysUntilRefresh: 0
          });
        }
      } catch (fallbackError) {
        console.error('❌ Failed to get fallback data:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, [category]);

  const refreshData = async (forceRefresh: boolean = false) => {
    await fetchEducationData(forceRefresh);
  };

  return {
    educationData,
    analytics,
    loading,
    error,
    lastUpdated,
    isFromCache,
    cacheInfo,
    refreshData
  };
};