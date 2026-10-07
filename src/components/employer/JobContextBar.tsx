import { ChevronLeft } from 'lucide-react';
import { useJobContext } from '@/hooks/useJobContext';

/**
 * Shown at the top of a hub section opened from a job sheet shortcut
 * (`?job=<id>`, ELE-1960): says the list is filtered to one job and gives a
 * one-tap way back to that job's sheet, or out to every job's records.
 * Renders nothing when the section is not filtered.
 */
export function JobContextBar({ what }: { /** e.g. 'photos', 'snags' */ what: string }) {
  const { jobId, job, clearJob, backToJob } = useJobContext();
  if (!jobId) return null;

  return (
    <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-elec-yellow/40 bg-white/[0.025] px-4 py-3 space-y-3">
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          {what} for one job
        </p>
        <p className="mt-0.5 text-[15px] font-semibold text-white truncate">
          {job?.title ?? 'This job'}
        </p>
        {job && (
          <p className="text-[12.5px] text-white truncate">
            {[job.client, job.location].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-start">
        <button
          type="button"
          onClick={backToJob}
          className="h-11 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black inline-flex items-center justify-center gap-1 touch-manipulation active:scale-[0.98]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to job
        </button>
        <button
          type="button"
          onClick={clearJob}
          className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Show all jobs
        </button>
      </div>
    </div>
  );
}
