import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CachedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
  postedDate: string;
  applyUrl: string;
  source: string;
}

export interface JobsWeeklyCacheResult {
  jobs: CachedJob[];
  regions: string[];
  sources: string[];
  lastUpdated: string | null;
}

export const useJobsWeeklyCache = (region?: string) => {
  return useQuery({
    queryKey: ['jobs-weekly-cache', region],
    queryFn: async (): Promise<JobsWeeklyCacheResult> => {
      let query = supabase
        .from("jobs_weekly_cache")
        .select("jobs_data, region, source, created_at")
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (region) {
        query = query.eq('region', region);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching jobs weekly cache:", error);
        throw error;
      }

      // Merge all jobs from different regions/sources
      const allJobs: CachedJob[] = data?.flatMap(row => row.jobs_data || []) || [];

      // Deduplicate by title + company
      const seen = new Set();
      const uniqueJobs = allJobs.filter(job => {
        const key = `${job.title?.toLowerCase()}_${job.company?.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Get unique regions and sources
      const regions = [...new Set(data?.map(row => row.region) || [])];
      const sources = [...new Set(data?.map(row => row.source) || [])];
      const lastUpdated = data?.[0]?.created_at || null;

      return {
        jobs: uniqueJobs,
        regions,
        sources,
        lastUpdated,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to trigger a job cache refresh
export const useRefreshJobsCache = () => {
  const refreshJobs = async (forceRefresh = false) => {
    try {
      const { data, error } = await supabase.functions.invoke('jobs-weekly-refresh', {
        body: { forceRefresh }
      });

      if (error) {
        console.error("Error refreshing jobs cache:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Failed to refresh jobs cache:", error);
      throw error;
    }
  };

  return { refreshJobs };
};
