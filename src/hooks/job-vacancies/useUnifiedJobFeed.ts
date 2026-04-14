/**
 * useUnifiedJobFeed - Combines employer jobs and external job board listings
 * Employer jobs appear first (priority placement), then external jobs
 */

import { useState, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useInternalVacancies, type VacancyFilters } from '@/hooks/useInternalVacancies';
import { useUnifiedJobSearch, type SearchProgress } from './useUnifiedJobSearch';
import {
  UnifiedJobListing,
  employerVacancyToUnified,
  externalJobToUnified,
} from '@/types/unified-jobs';

export interface UnifiedFeedFilters extends VacancyFilters {
  source?: 'all' | 'employer' | 'external';
}

export interface UnifiedJobFeedResult {
  // Combined job list (employer first, then external)
  jobs: UnifiedJobListing[];

  // Separate lists for UI flexibility
  employerJobs: UnifiedJobListing[];
  externalJobs: UnifiedJobListing[];

  // Counts
  employerJobCount: number;
  externalJobCount: number;
  totalJobCount: number;

  // Loading states
  isLoadingEmployer: boolean;
  isLoadingExternal: boolean;
  isLoading: boolean;

  // Error states
  employerError: Error | null;
  externalError: string | null;

  // Search progress for external jobs
  searchProgress: SearchProgress;

  // Actions
  searchExternalJobs: (keywords: string, location?: string) => Promise<void>;
  refetchEmployerJobs: () => void;
  refetchExternalJobs: () => Promise<void>;
  refetchAll: () => Promise<void>;

  // Pagination for external jobs
  currentPage: number;
  jobsPerPage: number;
  paginate: (page: number) => void;
  changeJobsPerPage: (value: string) => void;
}

export function useUnifiedJobFeed(filters?: UnifiedFeedFilters): UnifiedJobFeedResult {
  const [hasSearchedExternal, setHasSearchedExternal] = useState(false);

  // Employer jobs from database (internal vacancies)
  const {
    data: employerVacancies,
    isLoading: isLoadingEmployer,
    error: employerError,
    refetch: refetchEmployerJobs,
  } = useInternalVacancies({
    location: filters?.location,
    type: filters?.type,
    minSalary: filters?.minSalary,
    maxSalary: filters?.maxSalary,
    searchQuery: filters?.searchQuery,
  });

  // External jobs from job boards (live search)
  const {
    jobs: rawExternalJobs,
    loading: isLoadingExternal,
    error: externalError,
    searchProgress,
    searchAllJobs,
    refetch: refetchExternalJobs,
    currentPage,
    jobsPerPage,
    paginate,
    changeJobsPerPage,
  } = useUnifiedJobSearch();

  // Convert employer vacancies to unified format
  const employerJobs = useMemo(() => {
    if (!employerVacancies) return [];
    return employerVacancies.map((vacancy) =>
      employerVacancyToUnified({
        ...vacancy,
        employer_id: vacancy.employer?.id || '',
      })
    );
  }, [employerVacancies]);

  // Convert external jobs to unified format
  const externalJobs = useMemo(() => {
    return rawExternalJobs.map((job) => externalJobToUnified(job));
  }, [rawExternalJobs]);

  // Combined job list with employer jobs first (priority placement)
  const jobs = useMemo(() => {
    const sourceFilter = filters?.source || 'all';

    if (sourceFilter === 'employer') {
      return employerJobs;
    }

    if (sourceFilter === 'external') {
      return externalJobs;
    }

    // All jobs: employer first, then external
    return [...employerJobs, ...externalJobs];
  }, [employerJobs, externalJobs, filters?.source]);

  // Search external jobs (wrapper to track state)
  const searchExternalJobs = useCallback(
    async (keywords: string, location?: string) => {
      setHasSearchedExternal(true);
      await searchAllJobs(keywords, location);
    },
    [searchAllJobs]
  );

  // Refetch both sources and also kick the background scraper.
  const refetchAll = useCallback(async () => {
    // Fire the scraper in the background (non-blocking) — it takes ~60s+ to
    // complete a full pull. We refetch the DB immediately to show whatever
    // the last cron run already wrote, then invalidate again after a delay
    // to pick up new rows from the in-flight scrape.
    supabase.functions
      .invoke('comprehensive-job-scraper', { body: { mergeAll: true } })
      .catch((e) => {
        console.warn('comprehensive-job-scraper trigger failed (non-fatal)', e);
      });

    await Promise.allSettled([
      Promise.resolve(refetchEmployerJobs()),
      refetchExternalJobs(),
    ]);
  }, [refetchEmployerJobs, refetchExternalJobs]);

  return {
    jobs,
    employerJobs,
    externalJobs,

    employerJobCount: employerJobs.length,
    externalJobCount: externalJobs.length,
    totalJobCount: jobs.length,

    isLoadingEmployer,
    isLoadingExternal,
    isLoading: isLoadingEmployer || isLoadingExternal,

    employerError: employerError as Error | null,
    externalError,

    searchProgress,

    searchExternalJobs,
    refetchEmployerJobs,
    refetchExternalJobs,
    refetchAll,

    currentPage,
    jobsPerPage,
    paginate,
    changeJobsPerPage,
  };
}

// Export types for convenience
export type { UnifiedJobListing } from '@/types/unified-jobs';
