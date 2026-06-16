/**
 * MyJobsPage
 *
 * Routed Worker Tools page (replaces MyJobsSheet). Workers view the jobs their
 * team has assigned to them. Carries the data layer from the sheet unchanged:
 * useMyJobs(filter) + the same sort, summary, status-pill and relative-date
 * helpers. The pop-up chrome is replaced by the shared WorkerToolPage shell, and
 * the sheet's single "list" step is extended with an in-page job detail view
 * driven by local state (no new route).
 */

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, ArrowLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import {
  Pill,
  StatStrip,
  ListCard,
  SplitLayout,
  EmptyState,
  LoadingState,
  SecondaryButton,
  toneDot,
  rowVariants,
  type Tone,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { useMyJobs, type WorkerJob } from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';

type JobFilter = 'active' | 'completed' | 'all';

const FILTERS: { value: JobFilter; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'all', label: 'All' },
];

function statusPill(status: string): { tone: Tone; label: string } {
  switch (status) {
    case 'Active':
      return { tone: 'emerald', label: 'In progress' };
    case 'Pending':
    case 'On Hold':
      return { tone: 'blue', label: 'Scheduled' };
    case 'Completed':
      return { tone: 'emerald', label: 'Completed' };
    default:
      return { tone: 'amber', label: status };
  }
}

/** Accent tone for a job's status — keeps list + detail visuals consistent. */
function statusAccent(status: string): Tone {
  if (status === 'Active') return 'emerald';
  if (status === 'Pending' || status === 'On Hold') return 'blue';
  if (status === 'Completed') return 'emerald';
  return 'amber';
}

/** Sort weight so live work floats to the top of every list. */
const STATUS_ORDER: Record<string, number> = {
  Active: 0,
  Pending: 1,
  'On Hold': 2,
  Completed: 3,
};

/** Human-friendly relative date for a scheduled start. */
function scheduleLabel(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffDays = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(target.getFullYear() !== today.getFullYear() ? { year: 'numeric' } : {}),
  });
}

/** Full, unambiguous date for the detail view. */
function fullDateLabel(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function MyJobsPage() {
  const [filter, setFilter] = useState<JobFilter>('active');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: jobs, isLoading } = useMyJobs(filter);

  // Worker's own employee id — the same record useMyJobs derives its filter and
  // query key from — used to scope the realtime subscription below.
  const { data: employee } = useMyEmployeeRecord();
  const employeeId = employee?.id;
  const queryClient = useQueryClient();

  // Live: the employer assigning or updating a job for this worker refreshes the
  // job list instantly — no manual reload. Filtered to this worker's rows;
  // invalidates the my-jobs prefix so all filter variants (active/completed/all)
  // refetch.
  useEffect(() => {
    if (!employeeId) return;
    const channel = supabase
      .channel(realtimeChannelName('worker-jobs'))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_job_assignments',
          filter: `employee_id=eq.${employeeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my-jobs', employeeId] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [employeeId, queryClient]);

  const filterLabel = filter === 'all' ? '' : filter;

  // Sort live work first, then by soonest scheduled date.
  const sortedJobs = useMemo<WorkerJob[]>(() => {
    if (!jobs) return [];
    return [...jobs].sort((a, b) => {
      const orderDelta = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
      if (orderDelta !== 0) return orderDelta;
      const aTime = a.scheduled_date ? new Date(a.scheduled_date).getTime() : Infinity;
      const bTime = b.scheduled_date ? new Date(b.scheduled_date).getTime() : Infinity;
      return aTime - bTime;
    });
  }, [jobs]);

  // Glanceable summary derived from the data already fetched for this filter.
  const summary = useMemo(() => {
    const list = jobs ?? [];
    return {
      total: list.length,
      active: list.filter((j) => j.status === 'Active').length,
      scheduled: list.filter((j) => j.status === 'Pending' || j.status === 'On Hold').length,
    };
  }, [jobs]);

  const hasJobs = sortedJobs.length > 0;
  const selectedJob = useMemo(
    () => sortedJobs.find((j) => j.id === selectedId) ?? null,
    [sortedJobs, selectedId]
  );

  // ── Mobile detail view ─────────────────────────────────────────────────────
  // On mobile a tapped job replaces the list (in-page view state, no route). On
  // lg the same selection drives the master-detail panel below instead, so this
  // early return is gated to below-lg only.
  if (selectedJob) {
    return (
      <WorkerToolPage eyebrow="Work" title="My Jobs" description="Job details.">
        <div className="space-y-6 lg:hidden">
          <SecondaryButton
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            All jobs
          </SecondaryButton>

          <JobDetailCard job={selectedJob} />
        </div>

        {/* lg: never reached as a standalone screen — fall through to the
            master-detail list so the selection sits beside the list. */}
        <div className="hidden lg:block">
          <JobsListView
            filter={filter}
            setFilter={setFilter}
            isLoading={isLoading}
            hasJobs={hasJobs}
            summary={summary}
            sortedJobs={sortedJobs}
            filterLabel={filterLabel}
            selectedJob={selectedJob}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
      </WorkerToolPage>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────
  return (
    <WorkerToolPage
      eyebrow="Work"
      title="My Jobs"
      description="Work your team has assigned to you."
    >
      <JobsListView
        filter={filter}
        setFilter={setFilter}
        isLoading={isLoading}
        hasJobs={hasJobs}
        summary={summary}
        sortedJobs={sortedJobs}
        filterLabel={filterLabel}
        selectedJob={selectedJob}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </WorkerToolPage>
  );
}

/** Full list view — filter tabs + summary + responsive job-card grid. On lg with
 *  a selected job it splits into a master-detail (grid left, detail right). */
function JobsListView({
  filter,
  setFilter,
  isLoading,
  hasJobs,
  summary,
  sortedJobs,
  filterLabel,
  selectedJob,
  selectedId,
  setSelectedId,
}: {
  filter: JobFilter;
  setFilter: (f: JobFilter) => void;
  isLoading: boolean;
  hasJobs: boolean;
  summary: { total: number; active: number; scheduled: number };
  sortedJobs: WorkerJob[];
  filterLabel: string;
  selectedJob: WorkerJob | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) {
  // On lg, a selected job narrows the grid to one column so the detail panel can
  // sit beside it. Below lg the grid keeps its full 1/2-col responsive spread.
  const gridCols = selectedJob
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const grid = (
    <div className="space-y-6">
      {/* Filter tabs — full-width */}
      <div className="relative flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
        {FILTERS.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={isActive}
              className="relative flex-1 h-11 rounded-full text-[13px] font-medium touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60"
            >
              {isActive && (
                <motion.span
                  layoutId="my-jobs-filter-tab"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 bg-elec-yellow rounded-full"
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-black' : 'text-white'}`}>
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary stats — full-width, only meaningful with data */}
      {!isLoading && hasJobs && (
        <StatStrip
          columns={3}
          stats={[
            { label: 'Jobs', value: summary.total, accent: true },
            { label: 'In progress', value: summary.active, tone: 'emerald' },
            { label: 'Scheduled', value: summary.scheduled, tone: 'blue' },
          ]}
        />
      )}

      {/* Content */}
      {isLoading ? (
        <LoadingState />
      ) : !hasJobs ? (
        <EmptyState
          title={`No ${filterLabel} jobs`.replace('  ', ' ').trim()}
          description={
            filter === 'active'
              ? 'You have no active assignments right now. New jobs your team assigns to you will appear here.'
              : filter === 'completed'
                ? 'Jobs you have finished will be listed here.'
                : 'Nothing to show yet. Assigned jobs will appear here.'
          }
        />
      ) : (
        <div className={cn('grid gap-3 sm:gap-4', gridCols)}>
          {sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={selectedId === job.id}
              onSelect={() => setSelectedId(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  // No selection (or below lg) — just the grid spanning the full width.
  if (!selectedJob) return grid;

  // lg master-detail: grid left, sticky detail panel right.
  return (
    <SplitLayout
      ratio="3-2"
      primary={grid}
      secondary={
        <div className="lg:sticky lg:top-20 space-y-4">
          <SecondaryButton
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-2 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            All jobs
          </SecondaryButton>
          <JobDetailCard job={selectedJob} />
        </div>
      }
    />
  );
}

/** A single job as a self-contained card. Each client/address/date line wraps
 *  freely (no truncation). Tapping opens the in-page detail. */
function JobCard({
  job,
  isSelected,
  onSelect,
}: {
  job: WorkerJob;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const pill = statusPill(job.status);
  const when = scheduleLabel(job.scheduled_date);
  const accent = statusAccent(job.status);

  return (
    <motion.button
      type="button"
      variants={rowVariants}
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'group w-full h-full flex items-start gap-3.5 rounded-xl border bg-white/[0.02] px-4 sm:px-5 py-4 text-left touch-manipulation transition-colors hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        isSelected ? 'border-elec-yellow/60 bg-white/[0.05]' : 'border-white/[0.06]'
      )}
    >
      <span
        aria-hidden
        className={cn('w-[3px] h-10 rounded-full shrink-0 mt-0.5', toneDot[accent])}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[14px] font-medium text-white leading-snug break-words">
            {job.title}
          </div>
          <Pill tone={pill.tone}>{pill.label}</Pill>
        </div>
        <div className="mt-1.5 space-y-0.5 text-[11.5px] text-white">
          {job.client_name && <div className="break-words">{job.client_name}</div>}
          {job.address && (
            <div className="flex items-start gap-1 text-white/70">
              <MapPin className="h-3.5 w-3.5 text-white/45 shrink-0 mt-0.5" />
              <span className="break-words">{job.address}</span>
            </div>
          )}
          {when && (
            <div className="flex items-center gap-1 text-white/70 tabular-nums">
              <Calendar className="h-3.5 w-3.5 text-white/45 shrink-0" />
              {when}
            </div>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors shrink-0 mt-0.5" />
    </motion.button>
  );
}

/** Job detail card — title, status and the full client/address/schedule lines. */
function JobDetailCard({ job }: { job: WorkerJob }) {
  const pill = statusPill(job.status);
  const accent = statusAccent(job.status);
  const relative = scheduleLabel(job.scheduled_date);
  const full = fullDateLabel(job.scheduled_date);

  return (
    <ListCard>
      <div className="flex items-start gap-3.5 px-4 sm:px-5 py-4">
        <span
          aria-hidden
          className={cn('w-[3px] h-12 rounded-full shrink-0 mt-1', toneDot[accent])}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[17px] font-semibold text-white leading-snug break-words">
            {job.title}
          </div>
          <div className="mt-2">
            <Pill tone={pill.tone}>{pill.label}</Pill>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-4 sm:px-5 py-4 space-y-4">
        <DetailRow icon={User} label="Client">
          {job.client_name || '—'}
        </DetailRow>
        <DetailRow icon={MapPin} label="Address">
          {job.address || '—'}
        </DetailRow>
        <DetailRow icon={Calendar} label="Scheduled">
          {full ? (
            <span>
              {full}
              {relative && <span className="text-white/55"> · {relative}</span>}
            </span>
          ) : (
            'Not scheduled'
          )}
        </DetailRow>
      </div>
    </ListCard>
  );
}

/** Labelled detail line for the job detail view. */
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-white/45 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-wider text-white/55">{label}</div>
        <div className="mt-0.5 text-[13.5px] text-white break-words leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
