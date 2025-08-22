import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface UnifiedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string;
  updated_at?: string;
  is_fresh?: boolean;
}

export const useUnifiedJobSearch = () => {
  const [jobs, setJobs] = useState<UnifiedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDatabaseJobs = async (keywords: string, location?: string) => {
    try {
      let query = supabase
        .from('job_listings')
        .select('*')
        .order('updated_at', { ascending: false });

      // Add text search across title, description, and company
      if (keywords.trim()) {
        query = query.or(`title.ilike.%${keywords}%,description.ilike.%${keywords}%,company.ilike.%${keywords}%`);
      }

      // Add location filter
      if (location && location.trim() && location.toLowerCase() !== 'uk') {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;

      return data?.map(job => ({
        ...job,
        is_fresh: isJobFresh(job.updated_at)
      })) || [];
    } catch (error) {
      console.error('Error searching database jobs:', error);
      return [];
    }
  };

  const searchLiveJobs = async (keywords: string, location?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('live-job-aggregator', {
        body: {
          keywords: keywords.trim(),
          location: location?.trim() || undefined,
          page: 1
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      return {
        jobs: data.jobs?.map((job: any) => ({
          ...job,
          is_fresh: true
        })) || [],
        summary: data.summary,
        sourceResults: data.sourceResults
      };
    } catch (error) {
      console.error('Error searching live jobs:', error);
      return {
        jobs: [],
        summary: null,
        sourceResults: []
      };
    }
  };

  const triggerJobUpdate = async () => {
    try {
      const { error } = await supabase.functions.invoke('fetch-job-listings');
      if (error) {
        console.error('Error triggering job update:', error);
      } else {
        toast({
          title: "Job database updated",
          description: "Fresh jobs are being fetched in the background"
        });
      }
    } catch (error) {
      console.error('Error triggering job update:', error);
    }
  };

  const isJobFresh = (updatedAt?: string) => {
    if (!updatedAt) return false;
    const jobDate = new Date(updatedAt);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return jobDate > oneDayAgo;
  };

  const isDatabaseStale = (jobs: UnifiedJob[]) => {
    if (jobs.length === 0) return true;
    const latestJob = jobs[0];
    return !isJobFresh(latestJob.updated_at);
  };

  const removeDuplicates = (allJobs: UnifiedJob[]) => {
    const seen = new Set();
    return allJobs.filter(job => {
      const key = `${job.title.toLowerCase().trim()}-${job.company.toLowerCase().trim()}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const searchAllJobs = async (keywords: string, location?: string) => {
    setLoading(true);
    setError(null);
    setJobs([]);

    try {
      // Search all job sources live via aggregator
      const { jobs: liveJobs, summary, sourceResults } = await searchLiveJobs(keywords, location);

      // Sort by posted date (newest first)
      liveJobs.sort((a, b) => {
        return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
      });

      setJobs(liveJobs);

      const successfulSources = sourceResults?.filter(s => s.success).length || 0;
      const totalSources = sourceResults?.length || 0;

      toast({
        title: "Live Search Complete",
        description: `Found ${liveJobs.length} jobs from ${successfulSources}/${totalSources} sources: ${sourceResults?.filter(s => s.success).map(s => s.source).join(', ') || 'Reed, Indeed, TotalJobs, CV Library, Jobs.co.uk'}`
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Search failed";
      setError(errorMessage);
      toast({
        title: "Search Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    searchAllJobs,
    triggerJobUpdate
  };
};