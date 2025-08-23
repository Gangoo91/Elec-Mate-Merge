import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
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
    courses: [],
    total: 0,
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
        
        setData({
          courses: liveCourses,
          total: liveCourses.length,
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
        // No live courses found - show empty state
        setData({
          courses: [],
          total: 0,
          isLiveData: true,
          loading: false,
          error: null
        });
        
        toast({
          title: "No courses found",
          description: "No live courses found matching your search criteria. Try different keywords.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error fetching live course data:', error);
      
      // Show error state instead of fallback to static data
      setData({
        courses: [],
        total: 0,
        isLiveData: true,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live data'
      });

      toast({
        title: "Course search failed",
        description: "Unable to fetch live course data. Please try again later.",
        variant: "destructive"
      });
    }
  }, [enableLiveData, lastSearchParams, data.isLiveData, toast]);

  const refreshCourses = useCallback(async () => {
    console.log('🔄 Refreshing course data...');
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Clear cache by resetting search params
      setLastSearchParams('');
      
      // Set a timeout for the entire refresh operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Refresh operation timed out')), 180000); // 3 minutes
      });
      
      const refreshPromise = async () => {
        // Make the API call with retry logic
        let retryCount = 0;
        const maxRetries = 2;
        
        while (retryCount < maxRetries) {
          try {
            console.log(`📡 Making refresh API call (attempt ${retryCount + 1}/${maxRetries + 1})`);
            
            const { data: liveData, error } = await supabase.functions.invoke('live-course-aggregator', {
              body: {
                keywords: keywords || 'electrical course',
                location: location || 'United Kingdom'
              }
            });
            
            if (error) {
              console.error('Refresh API error:', error);
              throw new Error(error.message || 'API call failed');
            }
            
            if (liveData?.error) {
              console.error('Service error:', liveData.error, liveData.technical_error);
              
              // If it's a timeout or service error, show user-friendly message
              if (liveData.technical_error?.includes('timeout') || liveData.technical_error?.includes('timed out')) {
                throw new Error('The search is taking longer than expected. Try searching for more specific course terms.');
              } else if (liveData.technical_error?.includes('API key') || liveData.technical_error?.includes('configuration')) {
                throw new Error('Service temporarily unavailable. Please try again in a few minutes.');
              }
              
              throw new Error(liveData.error);
            }
            
            console.log('✅ Data refreshed successfully:', liveData);
            
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
              
              setData({
                courses: liveCourses,
                total: liveCourses.length,
                summary: liveData.summary,
                isLiveData: true,
                loading: false,
                error: null
              });
              
              toast({
                title: "Data Refreshed",
                description: `Found ${liveCourses.length} courses from live search`,
              });
            } else {
              setData({
                courses: [],
                total: 0,
                isLiveData: true,
                loading: false,
                error: null
              });
              
              toast({
                title: "No courses found",
                description: "No live courses found matching your search criteria. Try different keywords.",
              });
            }
            
            return; // Success, exit retry loop
            
          } catch (error) {
            retryCount++;
            if (retryCount < maxRetries) {
              console.log(`⏳ Retrying refresh in 2 seconds... (${retryCount}/${maxRetries})`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
              throw error; // Final retry failed
            }
          }
        }
      };
      
      // Race the refresh against the timeout
      await Promise.race([refreshPromise(), timeoutPromise]);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to refresh data";
      console.error('❌ Refresh failed:', errorMessage);
      
      setData(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      
      toast({
        title: "Refresh Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [keywords, location, toast]);

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
