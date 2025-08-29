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

export interface JobSourceStatus {
  source: string;
  status: 'pending' | 'loading' | 'completed' | 'failed' | 'timeout';
  jobCount: number;
  error?: string;
}

export interface SearchProgress {
  sources: JobSourceStatus[];
  totalJobsFound: number;
  completedSources: number;
  totalSources: number;
  isSearching: boolean;
}

export const useUnifiedJobSearch = () => {
  const [jobs, setJobs] = useState<UnifiedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [searchProgress, setSearchProgress] = useState<SearchProgress>({
    sources: [],
    totalJobsFound: 0,
    completedSources: 0,
    totalSources: 0,
    isSearching: false
  });

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

  const searchLiveJobsWithProgress = async (keywords: string, location?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('live-job-aggregator', {
        body: {
          keywords: keywords.trim(),
          location: location?.trim() || undefined,
          page: 1,
          progressCallback: (progress: any) => {
            // Update progress state with partial results
            setSearchProgress(prev => {
              const updatedSources = prev.sources.map(source => {
                const update = progress.sources?.find((s: any) => s.source === source.source);
                return update ? { ...source, ...update } : source;
              });
              
              const totalJobs = updatedSources.reduce((sum, s) => sum + s.jobCount, 0);
              const completed = updatedSources.filter(s => s.status === 'completed' || s.status === 'failed' || s.status === 'timeout').length;
              
              return {
                ...prev,
                sources: updatedSources,
                totalJobsFound: totalJobs,
                completedSources: completed
              };
            });

            // Update jobs with partial results
            if (progress.partialJobs && progress.partialJobs.length > 0) {
              setJobs(prevJobs => {
                const newJobs = progress.partialJobs.filter((newJob: any) => 
                  !prevJobs.some(existingJob => existingJob.id === newJob.id)
                );
                return [...prevJobs, ...newJobs.map((job: any) => ({ ...job, is_fresh: true }))];
              });
            }
          }
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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeJobsPerPage = (value: string) => {
    const newJobsPerPage = value === "all" ? -1 : parseInt(value);
    setJobsPerPage(newJobsPerPage);
    setCurrentPage(1);
  };

  const searchAllJobs = async (keywords: string, location?: string) => {
    setLoading(true);
    setError(null);
    setJobs([]);
    setCurrentPage(1);
    
    // Initialize search progress
    const initialSources: JobSourceStatus[] = [
      { source: 'Reed', status: 'pending', jobCount: 0 },
      { source: 'Indeed', status: 'pending', jobCount: 0 },
      { source: 'TotalJobs', status: 'pending', jobCount: 0 },
      { source: 'CV Library', status: 'pending', jobCount: 0 },
      { source: 'Jobs.co.uk', status: 'pending', jobCount: 0 }
    ];
    
    setSearchProgress({
      sources: initialSources,
      totalJobsFound: 0,
      completedSources: 0,
      totalSources: initialSources.length,
      isSearching: true
    });

    try {
      // Search all job sources live via aggregator with progress tracking
      const { jobs: liveJobs, summary, sourceResults } = await searchLiveJobsWithProgress(keywords, location);

      // Sort by posted date (newest first)
      liveJobs.sort((a, b) => {
        return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
      });

      setJobs(liveJobs);

      // Final progress update
      const completedSources = sourceResults?.filter(s => s.success).length || 0;
      setSearchProgress(prev => ({
        ...prev,
        completedSources: prev.totalSources,
        isSearching: false
      }));

      const successfulSources = sourceResults?.filter(s => s.success).length || 0;
      const totalSources = sourceResults?.length || 0;

      toast({
        title: "Search Complete",
        description: `Found ${liveJobs.length} jobs from ${successfulSources}/${totalSources} sources`
      });

    } catch (error) {
      setSearchProgress(prev => ({ ...prev, isSearching: false }));
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
    searchProgress,
    searchAllJobs,
    triggerJobUpdate,
    currentPage,
    jobsPerPage,
    paginate,
    changeJobsPerPage
  };
};