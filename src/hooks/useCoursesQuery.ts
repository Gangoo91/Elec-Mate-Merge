import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface CourseSearchParams {
  keywords: string;
  location: string;
}

interface CourseSearchResult {
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
}

// Extract course fetching logic from the original hook
async function fetchCourses({ keywords, location }: CourseSearchParams): Promise<CourseSearchResult> {
  console.log('Fetching live course data:', { keywords, location });
  
  const { data: liveData, error } = await supabase.functions.invoke('live-course-aggregator', {
    body: { keywords, location }
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
    
    return {
      courses: liveCourses,
      total: liveCourses.length,
      summary: liveData.summary
    };
  } else {
    // No live courses found - return empty result
    return {
      courses: [],
      total: 0,
      summary: liveData.summary
    };
  }
}

export function useCoursesQuery(keywords: string = '', location: string = 'United Kingdom', enabled: boolean = true) {
  const { toast } = useToast();
  
  const query = useQuery<CourseSearchResult>({
    queryKey: ['courses', keywords, location],
    queryFn: () => fetchCourses({ keywords, location }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes cache time
    enabled: enabled && keywords.trim().length > 0, // Auto-fetch when enabled and keywords exist
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true
  });

  // Handle success/error notifications
  useEffect(() => {
    if (query.isSuccess && query.data) {
      if (query.data.courses.length > 0) {
        toast({
          title: "Courses loaded",
          description: `Found ${query.data.courses.length} live course${query.data.courses.length === 1 ? '' : 's'}`,
          variant: "success"
        });
      } else {
        toast({
          title: "No courses found",
          description: "No live courses found matching your search criteria. Try different keywords.",
        });
      }
    }
  }, [query.isSuccess, query.data, toast]);

  useEffect(() => {
    if (query.isError && query.error) {
      console.error('Course search failed:', query.error);
      toast({
        title: "Search failed",
        description: query.error.message || "Unable to fetch live course data. Please try again later.",
        variant: "destructive"
      });
    }
  }, [query.isError, query.error, toast]);

  return query;
}

// Helper functions for intelligent data mapping (copied from original hook)
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
  
  if (text.includes('ev') || text.includes('electric vehicle')) {
    return ['High-demand EV installation skills', 'Future-proof career specialisation', 'Premium rate opportunities'];
  }
  
  if (text.includes('solar') || text.includes('renewable')) {
    return ['Renewable energy expertise', 'Growing market opportunities', 'Environmental impact contribution'];
  }
  
  return ['Enhanced electrical competency', 'Improved job prospects', 'Professional development'];
}

function getNextCourseDate(): string {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}