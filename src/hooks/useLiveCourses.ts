import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LiveCourse {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  format: string;
  nextDates: string[];
  rating: number | null;
  locations: string[];
  category: string;
  industryDemand: 'High' | 'Medium' | 'Low';
  futureProofing: 'Good' | 'Excellent';
  salaryImpact: string;
  careerOutcomes: string[];
  accreditation: string;
  employerSupport: string;
  prerequisites: string[];
  courseOutline: string[];
  assessmentMethod: string;
  continuousAssessment: boolean;
  source: string;
  isLive: boolean;
  tags?: string[];
  visitLink?: string;
  image_url?: string;
}

export interface LiveCoursesResponse {
  success: boolean;
  cached: boolean;
  data: LiveCourse[];
  lastUpdated: string;
  totalCourses?: number;
  error?: string;
}

export const useLiveCourses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLiveCourses = useCallback(async (): Promise<LiveCoursesResponse | null> => {
    setIsLoading(true);
    try {
      // Read from live_education_cache (populated by pipeline)
      const { data: cacheData, error } = await supabase
        .from('live_education_cache')
        .select('education_data, last_refreshed')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching cached courses:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch course data.',
          variant: 'destructive',
        });
        return null;
      }

      if (cacheData?.education_data) {
        const courses = cacheData.education_data as unknown as LiveCourse[];
        setLastUpdated(cacheData.last_refreshed);
        toast({
          title: 'Courses Loaded',
          description: `Loaded ${courses.length} courses`,
          variant: 'success',
        });
        return {
          success: true,
          cached: true,
          data: courses,
          lastUpdated: cacheData.last_refreshed || new Date().toISOString(),
          totalCourses: courses.length,
        };
      }

      toast({
        title: 'No Courses Available',
        description: 'Course data is being updated. Please try again later.',
      });
      return null;
    } catch (error) {
      console.error('Error in fetchLiveCourses:', error);
      toast({
        title: 'Connection Error',
        description: 'Unable to load course data. Please try again later.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    fetchLiveCourses,
    isLoading,
    lastUpdated,
  };
};
