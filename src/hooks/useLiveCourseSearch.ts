import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';

interface UseLiveCourseSearchParams {
  keywords?: string;
  location?: string;
  enabled?: boolean;
}

interface CourseSearchResponse {
  courses: EnhancedCareerCourse[];
  total: number;
  page: number;
  summary?: {
    totalCourses: number;
    originalCourses: number;
    duplicatesRemoved: number;
    sourceBreakdown: Array<{
      source: string;
      courseCount: number;
      success: boolean;
      error?: string;
    }>;
  };
}

export const useLiveCourseSearch = ({
  keywords = "electrician",
  location = "United Kingdom",
  enabled = true
}: UseLiveCourseSearchParams = {}) => {
  const [cachedData, setCachedData] = useState<EnhancedCareerCourse[]>([]);

  console.log(`useLiveCourseSearch: enabled=${enabled}, keywords=${keywords}, location=${location}`);

  const {
    data,
    isLoading,
    error,
    refetch,
    isError
  } = useQuery({
    queryKey: ['live-courses', keywords, location],
    queryFn: async (): Promise<CourseSearchResponse> => {
      console.log(`🚀 Making API call to live-course-aggregator with: ${keywords} in ${location}`);
      
      const { data, error } = await supabase.functions.invoke('live-course-aggregator', {
        body: { keywords, location, page: 1 }
      });

      console.log('🔍 API Response:', { data, error });

      if (error) {
        console.error('❌ Course search error:', error);
        throw new Error(error.message || 'Failed to fetch courses');
      }

      console.log(`✅ Successfully fetched ${data?.courses?.length || 0} courses`);
      return data;
    },
    enabled,
    staleTime: 1 * 60 * 1000, // 1 minute (reduced for testing)
    gcTime: 5 * 60 * 1000, // 5 minutes 
    retry: 2
  });

  // Cache successful data
  useEffect(() => {
    if (data?.courses?.length > 0) {
      setCachedData(data.courses);
      console.log(`Successfully fetched ${data.courses.length} live courses`);
    }
  }, [data]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error('Live course search failed:', error);
    }
  }, [error]);

  // Return cached data if live fetch fails and we have cached data
  const courses = data?.courses || cachedData;
  const total = data?.total || courses.length;
  const summary = data?.summary;

  // Enhanced search and filter functions
  const searchCourses = (searchTerm: string) => {
    if (!searchTerm.trim()) return courses;
    
    const term = searchTerm.toLowerCase();
    return courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.provider.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term)
    );
  };

  const filterCourses = (filters: {
    category?: string;
    level?: string;
    format?: string;
    priceRange?: string;
  }) => {
    return courses.filter(course => {
      if (filters.category && course.category !== filters.category) return false;
      if (filters.level && course.level !== filters.level) return false;
      if (filters.format && course.format !== filters.format) return false;
      
      if (filters.priceRange) {
        const price = course.price;
        if (price === 'Price on enquiry' || price === 'Free') {
          return filters.priceRange === 'enquiry';
        }
        
        const priceNum = parseInt(price.replace(/[£,]/g, ''));
        switch (filters.priceRange) {
          case 'under-500':
            return priceNum < 500;
          case '500-1000':
            return priceNum >= 500 && priceNum <= 1000;
          case '1000-2000':
            return priceNum >= 1000 && priceNum <= 2000;
          case 'over-2000':
            return priceNum > 2000;
          default:
            return true;
        }
      }
      
      return true;
    });
  };

  const getFeaturedCourses = (limit = 6) => {
    return courses
      .filter(course => course.industryDemand === 'High' || course.rating >= 4.5 || course.futureProofing >= 4)
      .sort((a, b) => {
        // Sort by industry demand first
        const demandOrder = { High: 3, Medium: 2, Low: 1 };
        const aDemand = demandOrder[a.industryDemand];
        const bDemand = demandOrder[b.industryDemand];
        if (bDemand !== aDemand) return bDemand - aDemand;
        
        // Then by rating
        if (b.rating !== a.rating) return b.rating - a.rating;
        
        // Finally by future proofing
        return b.futureProofing - a.futureProofing;
      })
      .slice(0, limit);
  };

  return {
    courses,
    total,
    summary,
    isLoading,
    error,
    isError,
    refetch,
    searchCourses,
    filterCourses,
    getFeaturedCourses,
    hasLiveData: !!(data as CourseSearchResponse)?.courses?.length,
    hasCachedData: cachedData.length > 0
  };
};