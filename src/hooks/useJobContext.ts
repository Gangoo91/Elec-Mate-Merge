import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useJobs } from '@/hooks/useJobs';

/* ==========================================================================
   Job context (ELE-1960) — the job sheet is the centre of everything.

   A shortcut on the job sheet opens a hub section with `?job=<id>`; the
   section reads it here, shows only that job's records, and offers a way
   straight back to the job (`?section=jobs&job=<id>` reopens its sheet).
   ========================================================================== */

export function useJobContext() {
  const [searchParams, setSearchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  const { data: jobs = [] } = useJobs();
  const job = useMemo(() => (jobId ? (jobs.find((j) => j.id === jobId) ?? null) : null), [
    jobs,
    jobId,
  ]);

  /** Drop the filter and see every job's records in this section. */
  const clearJob = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('job');
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  /** Back to the job's own sheet. */
  const backToJob = useCallback(() => {
    if (!jobId) return;
    setSearchParams({ section: 'jobs', job: jobId });
  }, [jobId, setSearchParams]);

  return { jobId, job, clearJob, backToJob };
}

export interface JobSheetCounts {
  quotes: number;
  invoices: number;
  packs: number;
  rams: number;
  photos: number;
  snags_open: number;
  snags_total: number;
  issues_open: number;
  issues_total: number;
  /** Site diary entries: office logs + team notes (ELE-1964). */
  progress_logs: number;
  /** Variation orders on the job (ELE-1967). */
  variations?: number;
  tests: number;
  tests_failed: number;
  hours: number;
  timesheets: number;
  team: number;
  checklist_total: number;
  checklist_done: number;
  completed_at: string | null;
}

/** One call for the job sheet's shortcut tiles (counts only — no money). */
export function useJobSheetCounts(jobId: string | null | undefined) {
  return useQuery({
    queryKey: ['job-sheet-counts', jobId],
    enabled: !!jobId,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<JobSheetCounts | null> => {
      // Cast: RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_job_sheet_counts' as never, {
        p_job_id: jobId,
      } as never);
      if (error) throw error;
      const row = data as unknown as (JobSheetCounts & { error?: string }) | null;
      if (!row || row.error) return null;
      return row;
    },
  });
}
