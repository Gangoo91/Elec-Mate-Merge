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
        // Enhanced mapping of live data with intelligent property inference
        const liveCourses = liveData.courses.map((course: any) => ({
          ...course,
          isLive: true,
          // Ensure all required properties exist with intelligent defaults
          id: course.id || `live-${Math.random().toString(36).substr(2, 9)}`,
          title: course.title || 'Course Title Not Available',
          provider: course.provider || course.organization || 'External Provider',
          description: course.description || course.summary || 'Course description not available',
          duration: course.duration || course.length || 'Duration varies',
          level: course.level || inferLevelFromTitle(course.title) || 'Intermediate',
          price: course.price || course.cost || 'Contact for pricing',
          format: course.format || course.delivery_method || 'Mixed delivery',
          nextDates: course.nextDates || course.start_dates || [getNextCourseDate()],
          rating: course.rating || generateIntelligentRating(course),
          locations: course.locations || [course.location] || ['Various UK locations'],
          category: inferCategoryFromCourse(course),
          industryDemand: inferIndustryDemand(course),
          futureProofing: inferFutureProofing(course),
          salaryImpact: inferSalaryImpact(course),
          careerOutcomes: course.careerOutcomes || generateCareerOutcomes(course),
          accreditation: course.accreditation || [],
          employerSupport: course.employerSupport || true,
          prerequisites: course.prerequisites || ['Basic electrical knowledge'],
          courseOutline: course.courseOutline || [],
          assessmentMethod: course.assessmentMethod || 'Assessment varies',
          continuousAssessment: course.continuousAssessment || false,
          external_url: course.external_url || course.url,
          source: course.source || 'Live API'
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

// Helper functions for intelligent data mapping
function inferLevelFromTitle(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('level 1') || titleLower.includes('basic') || titleLower.includes('foundation')) return 'Beginner';
  if (titleLower.includes('level 2') || titleLower.includes('intermediate')) return 'Intermediate';
  if (titleLower.includes('level 3') || titleLower.includes('level 4') || titleLower.includes('advanced') || titleLower.includes('diploma')) return 'Advanced';
  return 'Intermediate';
}

function inferCategoryFromCourse(course: any): string {
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  if (text.includes('18th edition') || text.includes('wiring reg') || text.includes('bs 7671')) return 'Essential Qualifications';
  if (text.includes('ev') || text.includes('electric vehicle') || text.includes('solar') || text.includes('smart') || text.includes('automation')) return 'Emerging Technologies';
  if (text.includes('safety') || text.includes('health') || text.includes('compliance') || text.includes('regulation')) return 'Safety & Compliance';
  if (text.includes('fire') || text.includes('security') || text.includes('maintenance') || text.includes('testing')) return 'Specialised Skills';
  if (text.includes('management') || text.includes('business') || text.includes('leadership')) return 'Business & Management';
  
  return 'Essential Qualifications';
}

function inferIndustryDemand(course: any): "High" | "Medium" | "Low" {
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  // High demand keywords
  if (text.includes('ev') || text.includes('solar') || text.includes('smart') || 
      text.includes('18th edition') || text.includes('testing') || text.includes('inspection')) {
    return 'High';
  }
  
  // Medium demand by default for electrical courses
  return 'Medium';
}

function inferFutureProofing(course: any): number {
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  if (text.includes('ev') || text.includes('solar') || text.includes('smart') || text.includes('automation')) return 5;
  if (text.includes('18th edition') || text.includes('regulation') || text.includes('compliance')) return 5;
  if (text.includes('testing') || text.includes('inspection') || text.includes('maintenance')) return 4;
  
  return 3;
}

function inferSalaryImpact(course: any): string {
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  if (text.includes('ev') || text.includes('smart') || text.includes('automation')) return '£4,000 - £8,000 annual increase';
  if (text.includes('18th edition') || text.includes('testing') || text.includes('inspection')) return '£2,000 - £5,000 annual increase';
  if (text.includes('solar') || text.includes('renewable')) return '£3,000 - £6,000 annual increase';
  
  return '£1,500 - £3,500 annual increase';
}

function generateIntelligentRating(course: any): number {
  // Generate rating based on course characteristics
  let rating = 4.0;
  
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  // Boost rating for in-demand courses
  if (text.includes('18th edition') || text.includes('ev') || text.includes('solar')) rating += 0.5;
  if (text.includes('practical') || text.includes('hands-on')) rating += 0.2;
  if (course.provider && course.provider.includes('NICEIC')) rating += 0.3;
  
  return Math.min(Math.round(rating * 10) / 10, 5.0);
}

function generateCareerOutcomes(course: any): string[] {
  const text = `${course.title} ${course.description}`.toLowerCase();
  
  if (text.includes('18th edition')) {
    return ['Meet legal requirements for electrical work', 'Enhanced professional credibility', 'Access to higher-paid roles'];
  }
  
  if (text.includes('ev')) {
    return ['EV charging specialist certification', 'Access to growing EV market', 'Future-proof career specialization'];
  }
  
  return ['Enhanced technical skills', 'Improved career prospects', 'Professional certification'];
}

function getNextCourseDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30); // Add 30 days
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

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
