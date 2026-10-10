/**
 * JobLinkField — reusable "link this safety document to a job" picker.
 * Anchors on the electrician's own jobs (`spark_projects` via useSparkProjects —
 * the Jobs page). Drop into any module's create/edit flow; persist the returned
 * jobId into the record's job_id column.
 *
 * A record started FROM a job arrives with the id but no title; the title is
 * resolved here so the field names the job rather than saying "Linked job".
 *
 * Site Safety in both hubs:
 *  - Firm scope (Employer Hub): lists the firm's jobs (employer_jobs) and hands
 *    the choice to `onSelectEmployerJob` — persist it into employer_job_id.
 *  - Personal scope, for a worker on a firm's roster: when the caller passes
 *    `onSelectEmployerJob`, the sheet also lists the firm jobs they are assigned
 *    to. Choosing one shares the record with the firm. Callers that do not pass
 *    it get exactly the picker they always had.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Field, SheetShell, EmptyState, LoadingState } from '@/components/college/primitives';
import { safetyInputCn } from './SafetyDocField';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useJobs } from '@/hooks/useJobs';
import { useMyJobs } from '@/hooks/useWorkerSelfService';
import { SafetyListCard, SafetyListRow } from './SafetyList';
import { isFirmScope, useSafetyScope } from './SafetyScope';

interface JobLinkFieldProps {
  jobId: string | null;
  jobTitle: string | null;
  onSelect: (jobId: string | null, jobTitle: string | null) => void;
  label?: string;
  hint?: string;
  /** The firm job (employer_jobs.id) the record is filed against. */
  employerJobId?: string | null;
  employerJobTitle?: string | null;
  /**
   * Persist a firm job into employer_job_id. Firm scope needs it to link at
   * all; in personal scope it adds the worker's assigned firm jobs to the list.
   */
  onSelectEmployerJob?: (employerJobId: string | null, title: string | null) => void;
}

export function JobLinkField(props: JobLinkFieldProps) {
  const scope = useSafetyScope();
  if (isFirmScope(scope)) return <FirmJobLinkField {...props} />;
  return <PersonalJobLinkField {...props} />;
}

function PersonalJobLinkField({
  jobId,
  jobTitle,
  onSelect,
  label = 'Job',
  hint = "Adds this record to the job's safety pack.",
  employerJobId,
  employerJobTitle,
  onSelectEmployerJob,
}: JobLinkFieldProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  // 'all' so a record can still be filed against a finished job — but only
  // live jobs are listed until the user searches, which keeps the list short.
  const { projects: allJobs = [], isLoading } = useSparkProjects('all');
  const jobs = allJobs.filter((j) => j.status !== 'completed');
  const resolvedTitle =
    jobTitle || (jobId ? allJobs.find((j) => j.id === jobId)?.title || null : null);

  const filtered = (q ? allJobs : jobs).filter(
    (j) =>
      !q ||
      (j.title || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.customerName || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.location || '').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Field label={label} hint={hint}>
        {onSelectEmployerJob && employerJobId && !jobId ? (
          <div className="flex items-center justify-between gap-2 px-3 h-11 rounded-xl border-b border-white/[0.15]">
            <span className="text-[13px] text-white truncate">
              {employerJobTitle || 'Firm job'} · shared with your firm
            </span>
            <button
              type="button"
              onClick={() => onSelectEmployerJob(null, null)}
              className="text-[11.5px] text-white hover:text-white shrink-0 touch-manipulation"
            >
              Remove
            </button>
          </div>
        ) : jobId ? (
          <div className="flex items-center justify-between gap-2 px-3 h-11 rounded-xl border-b border-white/[0.15]">
            <span className="text-[13px] text-white truncate">{resolvedTitle || 'Linked job'}</span>
            <button
              type="button"
              onClick={() => onSelect(null, null)}
              className="text-[11.5px] text-white hover:text-white shrink-0 touch-manipulation"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(safetyInputCn, 'flex items-center text-white')}
          >
            Link to a job…
          </button>
        )}
      </Field>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[70vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
        >
          <SheetShell eyebrow="Job" title="Link to a job">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs…"
              className={cn(safetyInputCn, 'rounded-full')}
            />
            {isLoading ? (
              <LoadingState />
            ) : allJobs.length === 0 ? (
              <EmptyState
                touch
                title="No jobs yet"
                description="Add a job on the Jobs page, then link safety records to it. You can save this record without one."
              />
            ) : filtered.length === 0 ? (
              <EmptyState touch title="No matching jobs" description="Try a different search." />
            ) : (
              <SafetyListCard>
                {filtered.map((j) => (
                  <SafetyListRow
                    key={j.id}
                    onClick={() => {
                      onSelect(j.id, j.title || 'Job');
                      setOpen(false);
                    }}
                    title={j.title || 'Untitled job'}
                    subtitle={[j.customerName, j.location].filter(Boolean).join(' · ') || undefined}
                    trailing={
                      jobId === j.id ? (
                        <span className="text-[11px] text-elec-yellow">Linked</span>
                      ) : (
                        <span aria-hidden className="text-elec-yellow/70">
                          →
                        </span>
                      )
                    }
                  />
                ))}
              </SafetyListCard>
            )}
            {onSelectEmployerJob && (
              <AssignedFirmJobs
                q={q}
                selectedId={employerJobId ?? null}
                onPick={(id, title) => {
                  onSelectEmployerJob(id, title);
                  setOpen(false);
                }}
              />
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}

/** A linked worker's assigned firm jobs. Picking one shares the record with the firm. */
function AssignedFirmJobs({
  q,
  selectedId,
  onPick,
}: {
  q: string;
  selectedId: string | null;
  onPick: (id: string, title: string) => void;
}) {
  const { data: firmJobs = [] } = useMyJobs('active');
  const list = firmJobs.filter(
    (j) =>
      !q ||
      (j.title || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.address || '').toLowerCase().includes(q.toLowerCase())
  );
  if (list.length === 0) return null;
  return (
    <div className="space-y-2 pt-2">
      <p className="text-[13px] font-semibold text-white">Your firm's jobs</p>
      <p className="text-[12px] text-white">Choosing one shares this record with your firm.</p>
      <SafetyListCard>
        {list.map((j) => (
          <SafetyListRow
            key={j.id}
            onClick={() => onPick(j.id, j.title || 'Firm job')}
            title={j.title || 'Untitled job'}
            subtitle={[j.client_name, j.address].filter(Boolean).join(' · ') || undefined}
            trailing={
              selectedId === j.id ? (
                <span className="text-[11px] text-elec-yellow">Linked</span>
              ) : (
                <span aria-hidden className="text-elec-yellow/70">
                  →
                </span>
              )
            }
          />
        ))}
      </SafetyListCard>
    </div>
  );
}

/** Firm scope: the firm's jobs (employer_jobs), written to employer_job_id. */
function FirmJobLinkField({
  label = 'Job',
  hint = "Adds this record to the job's safety pack.",
  employerJobId,
  employerJobTitle,
  onSelectEmployerJob,
}: JobLinkFieldProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { data: allJobs = [], isLoading } = useJobs();
  // A tool that cannot store a firm job yet has nothing to link here.
  if (!onSelectEmployerJob) return null;
  const live = allJobs.filter((j) => j.status !== 'Completed' && j.status !== 'Cancelled');
  const resolvedTitle =
    employerJobTitle ||
    (employerJobId ? allJobs.find((j) => j.id === employerJobId)?.title || null : null);
  const filtered = (q ? allJobs : live).filter(
    (j) =>
      !q ||
      (j.title || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.client || '').toLowerCase().includes(q.toLowerCase()) ||
      (j.location || '').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Field label={label} hint={hint}>
        {employerJobId ? (
          <div className="flex items-center justify-between gap-2 px-3 h-11 rounded-xl border-b border-white/[0.15]">
            <span className="text-[13px] text-white truncate">{resolvedTitle || 'Linked job'}</span>
            <button
              type="button"
              onClick={() => onSelectEmployerJob(null, null)}
              className="text-[11.5px] text-white hover:text-white shrink-0 touch-manipulation"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(safetyInputCn, 'flex items-center text-white')}
          >
            Link to a firm job…
          </button>
        )}
      </Field>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[70vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
        >
          <SheetShell eyebrow="Job" title="Link to a firm job">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs…"
              className={cn(safetyInputCn, 'rounded-full')}
            />
            {isLoading ? (
              <LoadingState />
            ) : allJobs.length === 0 ? (
              <EmptyState
                touch
                title="No jobs yet"
                description="Add a job in Jobs, then link safety records to it. You can save this record without one."
              />
            ) : filtered.length === 0 ? (
              <EmptyState touch title="No matching jobs" description="Try a different search." />
            ) : (
              <SafetyListCard>
                {filtered.map((j) => (
                  <SafetyListRow
                    key={j.id}
                    onClick={() => {
                      onSelectEmployerJob(j.id, j.title || 'Job');
                      setOpen(false);
                    }}
                    title={j.title || 'Untitled job'}
                    subtitle={[j.client, j.location].filter(Boolean).join(' · ') || undefined}
                    trailing={
                      employerJobId === j.id ? (
                        <span className="text-[11px] text-elec-yellow">Linked</span>
                      ) : (
                        <span aria-hidden className="text-elec-yellow/70">
                          →
                        </span>
                      )
                    }
                  />
                ))}
              </SafetyListCard>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default JobLinkField;
