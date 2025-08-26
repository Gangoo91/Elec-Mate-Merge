import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveCourse {
  id: string;
  courseTitle: string;
  provider: string;
  description: string;
  duration: string;
  level: string;
  learningMode: string;
  priceRange: string;
  detailsUrl: string;
  category: string;
  rating: number;
  locations: string[];
  upcomingDates: Array<{
    startDate: string;
    endDate?: string;
    location: string;
    availability: string;
    price?: string;
    bookingUrl?: string;
  }>;
  nextIntakeDate?: string;
  bookingInstructions?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    bookingUrl?: string;
  };
  hasAvailability: boolean;
  lastUpdated: string;
}

export interface LiveCourseSummary {
  totalCourses: number;
  originalCourses: number;
  duplicatesRemoved: number;
  sourceBreakdown: Array<{
    source: string;
    courseCount: number;
    success: boolean;
  }>;
  searchCriteria: {
    keywords: string;
    location: string;
  };
  liveCourses: number;
  lastUpdated: string;
}

interface UseLiveCoursesResult {
  courses: LiveCourse[];
  summary: LiveCourseSummary | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  refreshCourses: (forceRefresh?: boolean) => Promise<void>;
  getCourseDates: (courseUrl: string, courseId: string, provider: string) => Promise<any>;
}

export const useLiveCourses = (
  keywords: string = 'electrical course',
  location: string = 'United Kingdom'
): UseLiveCoursesResult => {
  const [courses, setCourses] = useState<LiveCourse[]>([]);
  const [summary, setSummary] = useState<LiveCourseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const fetchCourses = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching live courses...', { keywords, location, forceRefresh });

      // Check cache first if not force refreshing
      if (!forceRefresh) {
        const cacheKey = `${keywords}_${location}`.toLowerCase().replace(/\s+/g, '_');
        const { data: cachedData } = await supabase
          .from('live_course_cache')
          .select('*')
          .eq('search_query', cacheKey)
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (cachedData) {
          console.log('✅ Using cached course data');
          const courseData = cachedData.course_data as any;
          setCourses(courseData.courses || []);
          setSummary(courseData.summary || null);
          setLastUpdated(cachedData.created_at);
          setIsFromCache(true);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data from live course aggregator
      console.log('📡 Fetching fresh course data...');
      const { data, error: functionError } = await supabase.functions.invoke('live-course-aggregator', {
        body: { keywords, location, refresh: forceRefresh }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data.courses) {
        // Transform courses to match our interface
        const transformedCourses: LiveCourse[] = data.courses.map((course: any) => ({
          id: course.id || `${course.courseTitle}_${course.provider}`.replace(/\s+/g, '_'),
          courseTitle: course.courseTitle,
          provider: course.provider,
          description: course.description || '',
          duration: course.duration || 'Not specified',
          level: course.level || 'All levels',
          learningMode: course.learningMode || 'Mixed',
          priceRange: course.priceRange || 'Contact for pricing',
          detailsUrl: course.detailsUrl,
          category: course.category || 'General',
          rating: course.rating || 0,
          locations: course.locations || [],
          upcomingDates: course.upcomingDates || [],
          nextIntakeDate: course.nextIntakeDate,
          bookingInstructions: course.bookingInstructions,
          contactInfo: course.contactInfo,
          hasAvailability: (course.upcomingDates && course.upcomingDates.length > 0) || !!course.nextIntakeDate,
          lastUpdated: new Date().toISOString()
        }));

        setCourses(transformedCourses);
        setSummary(data.summary || null);
        setLastUpdated(data.summary?.lastUpdated || new Date().toISOString());
        setIsFromCache(data.cached || false);
        
        console.log(`✅ Loaded ${transformedCourses.length} live courses`);
      } else {
        setCourses([]);
        setSummary(null);
      }
    } catch (err) {
      console.error('❌ Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const getCourseDates = async (courseUrl: string, courseId: string, provider: string) => {
    try {
      console.log('🔍 Fetching course dates for:', courseUrl);
      
      const { data, error } = await supabase.functions.invoke('course-dates-scraper', {
        body: { courseUrl, courseId, provider }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      console.error('❌ Error fetching course dates:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to fetch dates' };
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [keywords, location]);

  const refreshCourses = async (forceRefresh: boolean = false) => {
    await fetchCourses(forceRefresh);
  };

  return {
    courses,
    summary,
    loading,
    error,
    lastUpdated,
    isFromCache,
    refreshCourses,
    getCourseDates
  };
};