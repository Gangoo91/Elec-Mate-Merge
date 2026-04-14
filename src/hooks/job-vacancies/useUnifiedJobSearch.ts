import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  image_url?: string;
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

// Keywords that indicate electrical industry jobs (case-insensitive matching)
const ELECTRICAL_KEYWORDS = [
  // Core electrical roles
  'electrician',
  'electrical',
  'sparky',
  'spark',
  // Specific electrical work
  'wiring',
  'rewire',
  'cable',
  'cabling',
  // Green/renewable
  'ev ',
  'ev-',
  'solar',
  'renewable',
  'battery storage',
  'heat pump',
  // Testing & compliance
  'commissioning',
  'testing',
  'inspection',
  'eicr',
  'eic',
  '18th edition',
  'bs7671',
  // Design & engineering
  'electrical design',
  'electrical engineer',
  'building services',
  'm&e',
  'mep',
  // Installation types
  'fire alarm',
  'security system',
  'intruder alarm',
  'cctv',
  'access control',
  'data install',
  'network install',
  'fibre',
  // Sectors
  'industrial electric',
  'commercial electric',
  'domestic electric',
  // Apprenticeships
  'electrical apprentice',
  'apprentice electric',
  // Maintenance
  'electrical maintenance',
  'building maintenance electric',
  // Management/progression roles
  'electrical project',
  'electrical supervisor',
  'electrical manager',
  'contracts manager electric',
  'site manager electric',
  'foreman electric',
  // Related trades that electricians do
  'pat testing',
  'emergency lighting',
  'led',
  'lighting',
];

// Titles to explicitly exclude (non-electrical trades)
const EXCLUDED_TITLES = [
  'joiner',
  'carpenter',
  'plumber',
  'plumbing',
  'gas engineer',
  'gas fitter',
  'bricklayer',
  'plasterer',
  'painter',
  'decorator',
  'roofer',
  'scaffolder',
  'groundworker',
  'labourer',
  'cleaner',
  'driver',
  'warehouse',
  'forklift',
  'chef',
  'cook',
  'retail',
  'sales assistant',
  'receptionist',
  'admin',
  'nurse',
  'carer',
  'teacher',
  'accountant',
  'solicitor',
];

// Check if a job is electrical-related
const isElectricalJob = (job: UnifiedJob): boolean => {
  const titleLower = (job.title || '').toLowerCase();
  const descLower = (job.description || '').toLowerCase();
  const combined = `${titleLower} ${descLower}`;

  // Check if title starts with or primarily mentions electrical
  const hasElectricalInTitle =
    titleLower.includes('electric') ||
    titleLower.includes('sparky') ||
    titleLower.startsWith('ev ') ||
    titleLower.includes('solar') ||
    titleLower.includes('fire alarm') ||
    titleLower.includes('security engineer');

  // If title clearly starts with electrical term, include it even if other trades mentioned
  if (hasElectricalInTitle) {
    // Find position of electrical term vs excluded term
    const electricPos = Math.min(
      titleLower.indexOf('electric') >= 0 ? titleLower.indexOf('electric') : 999,
      titleLower.indexOf('sparky') >= 0 ? titleLower.indexOf('sparky') : 999,
      titleLower.indexOf('solar') >= 0 ? titleLower.indexOf('solar') : 999
    );

    // Check if any excluded term comes BEFORE the electrical term
    for (const excluded of EXCLUDED_TITLES) {
      const excludedPos = titleLower.indexOf(excluded);
      if (excludedPos >= 0 && excludedPos < electricPos) {
        // Excluded term comes first - this is primarily a non-electrical job
        return false;
      }
    }
    return true;
  }

  // For jobs without clear electrical title, check exclusions strictly
  for (const excluded of EXCLUDED_TITLES) {
    if (titleLower.includes(excluded)) {
      return false;
    }
  }

  // Then check if it contains electrical keywords in title or description
  for (const keyword of ELECTRICAL_KEYWORDS) {
    if (combined.includes(keyword)) {
      return true;
    }
  }

  return false;
};

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
    isSearching: false,
  });

  // Fetch initial jobs on mount - filtered to electrical industry only.
  // Sorted by created_at DESC (scrape time) then posted_date DESC so the
  // freshest scraper output always surfaces first.
  const fetchInitialJobs = async () => {
    try {
      setLoading(true);
      console.log('📋 Fetching electrical jobs from job_listings...');

      // Fetch up to 2000 rows so the DB's ~6,300 cached listings can properly
      // flow through the client-side electrical filter. The previous 500 cap
      // was clipping the feed before the keyword match even ran.
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .or(
          'title.ilike.%electric%,title.ilike.%sparky%,title.ilike.%wiring%,title.ilike.%solar%,title.ilike.%ev %,title.ilike.%commissioning%,title.ilike.%fire alarm%,title.ilike.%cable%,title.ilike.%testing%,description.ilike.%electrician%,description.ilike.%electrical%'
        )
        .order('created_at', { ascending: false, nullsFirst: false })
        .order('posted_date', { ascending: false })
        .limit(2000);

      if (error) throw error;

      // Apply additional client-side filtering for precision. No hard cap —
      // show every electrical job we can find.
      const rawJobs = (data || [])
        .map((job) => ({
          ...job,
          is_fresh: isJobFresh(job.updated_at),
        }))
        .filter(isElectricalJob);

      // Deduplicate: the same job often appears from reed, adzuna, gumtree
      // and indeed scrapers. Reed/Gumtree frequently have empty descriptions
      // while Adzuna pulls the full posting. Group by a stable key and keep
      // the version with the richest data (longest real description, then
      // freshest scrape).
      const descLen = (d: string | null | undefined) =>
        d ? d.trim().length : 0;
      const makeKey = (job: UnifiedJob): string => {
        const title = (job.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
        const company = (job.company || '').toLowerCase().replace(/\s+/g, ' ').trim();
        const locPart = (job.location || '')
          .toLowerCase()
          .split(/,|-|\//)[0]
          .trim();
        return `${title}|${company}|${locPart}`;
      };
      const byKey = new Map<string, UnifiedJob>();
      for (const job of rawJobs) {
        const key = makeKey(job);
        const existing = byKey.get(key);
        if (!existing) {
          byKey.set(key, job);
          continue;
        }
        // Pick the better version:
        //   1) longer real description wins
        //   2) otherwise the one with more data fields populated
        //   3) otherwise the fresher updated_at
        const existingScore =
          descLen(existing.description) * 100 +
          (existing.salary ? 10 : 0) +
          (existing.image_url ? 5 : 0);
        const newScore =
          descLen(job.description) * 100 +
          (job.salary ? 10 : 0) +
          (job.image_url ? 5 : 0);
        if (newScore > existingScore) {
          byKey.set(key, job);
        } else if (newScore === existingScore) {
          const existingT = new Date(existing.updated_at || 0).getTime();
          const newT = new Date(job.updated_at || 0).getTime();
          if (newT > existingT) byKey.set(key, job);
        }
      }
      const electricalJobs = Array.from(byKey.values()).sort((a, b) => {
        const ta = new Date(a.updated_at || 0).getTime();
        const tb = new Date(b.updated_at || 0).getTime();
        return tb - ta;
      });

      console.log(
        `✅ Loaded ${electricalJobs.length} electrical jobs (deduped from ${rawJobs.length}, pre-filter ${data?.length || 0})`
      );
      setJobs(electricalJobs);

      setSearchProgress({
        sources: [{ source: 'Database', status: 'completed', jobCount: electricalJobs.length }],
        totalJobsFound: electricalJobs.length,
        completedSources: 1,
        totalSources: 1,
        isSearching: false,
      });
    } catch (error) {
      console.error('Error fetching initial jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load jobs on mount
  useEffect(() => {
    fetchInitialJobs();
  }, []);

  const searchDatabaseJobs = async (keywords: string, location?: string) => {
    try {
      let query = supabase
        .from('job_listings')
        .select('*')
        .order('updated_at', { ascending: false });

      // Add text search across title, description, and company
      if (keywords.trim()) {
        query = query.or(
          `title.ilike.%${keywords}%,description.ilike.%${keywords}%,company.ilike.%${keywords}%`
        );
      }

      // Add location filter
      if (location && location.trim() && location.toLowerCase() !== 'uk') {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query.limit(500);

      if (error) throw error;

      // Filter to electrical jobs only and apply freshness indicator
      const electricalJobs = (data || [])
        .map((job) => ({
          ...job,
          is_fresh: isJobFresh(job.updated_at),
        }))
        .filter(isElectricalJob);

      return electricalJobs;
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
            setSearchProgress((prev) => {
              const updatedSources = prev.sources.map((source) => {
                const update = progress.sources?.find((s: any) => s.source === source.source);
                return update ? { ...source, ...update } : source;
              });

              const totalJobs = updatedSources.reduce((sum, s) => sum + s.jobCount, 0);
              const completed = updatedSources.filter(
                (s) => s.status === 'completed' || s.status === 'failed' || s.status === 'timeout'
              ).length;

              return {
                ...prev,
                sources: updatedSources,
                totalJobsFound: totalJobs,
                completedSources: completed,
              };
            });

            // Update jobs with partial results
            if (progress.partialJobs && progress.partialJobs.length > 0) {
              setJobs((prevJobs) => {
                const newJobs = progress.partialJobs.filter(
                  (newJob: any) => !prevJobs.some((existingJob) => existingJob.id === newJob.id)
                );
                return [...prevJobs, ...newJobs.map((job: any) => ({ ...job, is_fresh: true }))];
              });
            }
          },
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      return {
        jobs:
          data.jobs?.map((job: any) => ({
            ...job,
            is_fresh: true,
          })) || [],
        summary: data.summary,
        sourceResults: data.sourceResults,
      };
    } catch (error) {
      console.error('Error searching live jobs:', error);
      return {
        jobs: [],
        summary: null,
        sourceResults: [],
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
          title: 'Job database updated',
          description: 'Fresh jobs are being fetched in the background',
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
    return allJobs.filter((job) => {
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
    const newJobsPerPage = value === 'all' ? -1 : parseInt(value);
    setJobsPerPage(newJobsPerPage);
    setCurrentPage(1);
  };

  const searchAllJobs = async (keywords: string, location?: string) => {
    setLoading(true);
    setError(null);
    setJobs([]);
    setCurrentPage(1);

    // Show quick progress indicator
    setSearchProgress({
      sources: [{ source: 'Database', status: 'loading', jobCount: 0 }],
      totalJobsFound: 0,
      completedSources: 0,
      totalSources: 1,
      isSearching: true,
    });

    try {
      // Use fast database search instead of slow live aggregator
      const dbJobs = await searchDatabaseJobs(keywords || 'electrician', location);

      // Sort by posted date (newest first)
      dbJobs.sort((a, b) => {
        return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
      });

      setJobs(dbJobs);

      // Update progress
      setSearchProgress({
        sources: [{ source: 'Database', status: 'completed', jobCount: dbJobs.length }],
        totalJobsFound: dbJobs.length,
        completedSources: 1,
        totalSources: 1,
        isSearching: false,
      });

      toast({
        title: 'Search Complete',
        description: `Found ${dbJobs.length} jobs matching your search`,
      });
    } catch (error) {
      setSearchProgress((prev) => ({ ...prev, isSearching: false }));
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setError(errorMessage);
      toast({
        title: 'Search Failed',
        description: errorMessage,
        variant: 'destructive',
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
    refetch: fetchInitialJobs,
    currentPage,
    jobsPerPage,
    paginate,
    changeJobsPerPage,
  };
};
