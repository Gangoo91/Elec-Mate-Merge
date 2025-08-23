import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCareerCourse, enhancedCareerCourses } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { useToast } from '@/hooks/use-toast';

interface LiveCourseSearchParams {
  keywords?: string;
  location?: string;
  enableLiveData?: boolean;
}

interface LiveCourseData {
  courses: EnhancedCareerCourse[];
  total: number;
  summary?: {
    totalCourses: number;
    liveCourses: number;
    sourceBreakdown: Array<{
      source: string;
      courseCount: number;
      success: boolean;
      error: string | null;
    }>;
    lastUpdated: string;
  };
  isLiveData: boolean;
  loading: boolean;
  error: string | null;
}

export const useLiveCourseSearch = (params: LiveCourseSearchParams = {}) => {
  const { keywords = '', location = 'United Kingdom', enableLiveData = true } = params;
  const { toast } = useToast();
  
  const [data, setData] = useState<LiveCourseData>({
    courses: enhancedCareerCourses,
    total: enhancedCareerCourses.length,
    isLiveData: false,
    loading: false,
    error: null
  });

  const [lastSearchParams, setLastSearchParams] = useState<string>('');

  const fetchLiveCourses = useCallback(async (searchKeywords: string, searchLocation: string) => {
    if (!enableLiveData) {
      return;
    }

    const searchParamsKey = `${searchKeywords}-${searchLocation}`;
    if (searchParamsKey === lastSearchParams && data.isLiveData) {
      return; // Avoid duplicate requests
    }

    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('Fetching live course data:', { keywords: searchKeywords, location: searchLocation });
      
      const { data: liveData, error } = await supabase.functions.invoke('live-course-aggregator', {
        body: { keywords: searchKeywords, location: searchLocation }
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch live course data');
      }

      if (liveData && liveData.courses && liveData.courses.length > 0) {
        // Merge live data with static data
        const liveCourses = liveData.courses.map((course: any) => ({
          ...course,
          isLive: true
        }));
        
        // Combine with static courses, prioritizing live data
        const allCourses = [...liveCourses, ...enhancedCareerCourses];
        const uniqueCourses = removeDuplicatesByTitle(allCourses);
        
        setData({
          courses: uniqueCourses,
          total: uniqueCourses.length,
          summary: liveData.summary,
          isLiveData: true,
          loading: false,
          error: null
        });

        setLastSearchParams(searchParamsKey);
        
        if (liveData.summary && liveData.summary.liveCourses > 0) {
          toast({
            title: "Live course data loaded",
            description: `Found ${liveData.summary.liveCourses} live courses from ${liveData.summary.sourceBreakdown.filter((s: any) => s.success).length} sources`,
            variant: "success"
          });
        }
      } else {
        // Fallback to static data
        setData(prev => ({
          ...prev,
          courses: enhancedCareerCourses,
          total: enhancedCareerCourses.length,
          isLiveData: false,
          loading: false,
          error: null
        }));
      }
    } catch (error) {
      console.error('Error fetching live course data:', error);
      
      // Fallback to static data on error
      setData({
        courses: enhancedCareerCourses,
        total: enhancedCareerCourses.length,
        isLiveData: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live data'
      });

      toast({
        title: "Using static course data",
        description: "Live data temporarily unavailable. Showing cached course information.",
        variant: "default"
      });
    }
  }, [enableLiveData, lastSearchParams, data.isLiveData, toast]);

  const refreshCourses = useCallback(() => {
    setLastSearchParams(''); // Reset to force refresh
    fetchLiveCourses(keywords, location);
  }, [keywords, location, fetchLiveCourses]);

  // Initial load and when search params change
  useEffect(() => {
    if (enableLiveData && keywords) {
      const debounceTimer = setTimeout(() => {
        fetchLiveCourses(keywords, location);
      }, 500); // Debounce to avoid too many API calls

      return () => clearTimeout(debounceTimer);
    }
  }, [keywords, location, enableLiveData, fetchLiveCourses]);

  return {
    ...data,
    refreshCourses,
    isSearching: data.loading
  };
};

function removeDuplicatesByTitle(courses: EnhancedCareerCourse[]): EnhancedCareerCourse[] {
  const seen = new Map();
  return courses.filter(course => {
    const key = course.title.toLowerCase().trim();
    if (seen.has(key)) {
      // Keep the live version if available
      const existing = seen.get(key);
      if (course.isLive && !existing.isLive) {
        seen.set(key, course);
        return true;
      }
      return false;
    }
    seen.set(key, course);
    return true;
  });
}
