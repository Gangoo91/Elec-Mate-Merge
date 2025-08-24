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

interface UseLiveEducationDataResult {
  educationData: LiveEducationData[];
  analytics: LiveEducationAnalytics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  refreshData: (forceRefresh?: boolean) => Promise<void>;
}

export const useLiveEducationData = (category: string = 'all'): UseLiveEducationDataResult => {
  const [educationData, setEducationData] = useState<LiveEducationData[]>([]);
  const [analytics, setAnalytics] = useState<LiveEducationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const fetchEducationData = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching live education data...');

      // Try to get cached data first
      if (!forceRefresh) {
        const { data: cachedData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .gt('expires_at', new Date().toISOString())
          .single();

        if (cachedData) {
          console.log('✅ Using cached education data');
          setEducationData((cachedData.education_data as unknown as LiveEducationData[]) || []);
          setAnalytics((cachedData.analytics_data as unknown as LiveEducationAnalytics) || null);
          setLastUpdated(cachedData.created_at);
          setIsFromCache(true);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data from edge function
      console.log('📡 Fetching fresh education data from edge function...');
      const { data, error: functionError } = await supabase.functions.invoke('live-education-aggregator', {
        body: { category, refresh: forceRefresh }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data.success) {
        setEducationData(data.data || []);
        setAnalytics(data.analytics || null);
        setLastUpdated(data.lastUpdated);
        setIsFromCache(data.cached || false);
        console.log(`✅ Loaded ${data.data?.length || 0} education programmes`);
      } else {
        throw new Error(data.error || 'Failed to fetch education data');
      }
    } catch (err) {
      console.error('❌ Error fetching education data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch education data');
      
      // Fallback to any available cached data (even if expired)
      try {
        const { data: fallbackData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (fallbackData) {
          console.log('⚠️ Using fallback cached data');
          setEducationData((fallbackData.education_data as unknown as LiveEducationData[]) || []);
          setAnalytics((fallbackData.analytics_data as unknown as LiveEducationAnalytics) || null);
          setLastUpdated(fallbackData.created_at);
          setIsFromCache(true);
        }
      } catch (fallbackError) {
        console.error('❌ No fallback data available:', fallbackError);
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
    refreshData
  };
};