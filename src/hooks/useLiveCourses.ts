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
      const { data, error } = await supabase.functions.invoke('live-courses-scraper');

      if (error) {
        console.error('Error fetching live courses:', error);
        toast({
          title: "Error",
          description: "Failed to fetch live course data. Using cached data if available.",
          variant: "destructive",
        });
        return null;
      }

      if (data.success) {
        setLastUpdated(data.lastUpdated);
        toast({
          title: data.cached ? "Cached Data Loaded" : "Fresh Data Loaded",
          description: `Loaded ${data.data.length} courses from providers`,
          variant: "success",
        });
        return data;
      } else {
        console.error('API returned error:', data.error);
        toast({
          title: "Error",
          description: data.error || "Failed to fetch course data",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Error in fetchLiveCourses:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to course providers. Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    fetchLiveCourses,
    isLoading,
    lastUpdated
  };
};