/**
 * MyJobsPage — Worker Tools › My Jobs (ELE-1999).
 *
 * Everything a sparky needs on site in one screen. The list comes from
 * get_my_jobs (filtered server-side over the CURRENT firm, so nothing falls off
 * the end) with a "New" badge until the job is opened. The job page comes from
 * get_my_job_detail: who to ask for on site and how to reach them (apprentices
 * see their supervisor), access notes, the office's instructions, photos and
 * drawings, packs to sign, the last crew notes with who wrote them, who else is
 * on the job, and "I've finished my part" (note + photos → office notified;
 * when everyone has finished the job moves to Testing).
 *
 * Phone first: one column, edge-to-edge grouped cards, 2×2 action tiles,
 * 48px primary buttons. On lg the selected job sits beside the list.
 */

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import {
  MapPin,
  ArrowLeft,
  Clock,
  ListChecks,
  NotebookPen,
  AlertTriangle,
  FileCheck2,
  Navigation,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ChevronRight,
  Undo2,
  Package,
  ClipboardCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { navigateToAddress, canNavigateTo } from '@/utils/navigate-to-address';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  SplitLayout,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  Field,
  textareaClass,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_JOBS_HELP } from '@/components/worker-tools/help/worker-help';
import { useMyJobs, type WorkerJob } from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import {
  useMyJobDetail,
  useFinishMyPart,
  useReopenMyPart,
  rpcErrorMessage,
  type MyJobDetail,
} from '@/hooks/useWorkerJobSite';
import {
  WorkerPanel,
  GroupLabel,
  SectionTitle,
  Verdict,
  SolidBadge,
  ActionTile,
  RowAction,
  Segmented,
} from '@/components/worker-tools/WorkerUi';
import { WorkerPhotoPicker, WorkerPhotoStrip } from '@/components/worker-tools/WorkerPhotos';
import { DictateButton } from '@/components/worker-tools/DictateButton';
import { WorkerJobHoursAndPay } from '@/components/worker-tools/WorkerJobHoursAndPay';
import { LastVisitPanel } from '@/components/worker-tools/LastVisitPanel';
import { OnMyWayButton } from '@/components/worker-tools/OnMyWaySheet';
import { StartCertificateSheet } from '@/components/worker-tools/StartCertificateSheet';

type JobFilter = 'active' | 'completed' | 'all';

const BASE = '/electrician/worker-tools';

/* ── Date helpers ─────────────────────────────────────────────────────── */

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function dayDiff(iso?: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return Math.round((startOfDay(d).getTime() - startOfDay(new Date()).getTime()) / 86_400_000);
}

function whenLabel(iso?: string | null): string | null {
  const diff = dayDiff(iso);
  if (diff == null) return null;
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Started yesterday';
  if (diff > 1 && diff <= 6) return format(new Date(iso!), 'EEEE');
  if (diff < -1) return `Started ${format(new Date(iso!), 'd MMM')}`;
  return format(new Date(iso!), 'EEE d MMM');
}

/** numeric columns arrive from jsonb as numbers or strings */
const toNum = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number(v) : (v as number | null);
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
};

const timeOf = (iso: string) => format(parseISO(iso), 'HH:mm');

function stageLabel(job: WorkerJob): { label: string; tone: 'green' | 'neutral' | 'yellow' } {
  if (job.status === 'Completed') return { label: 'Completed', tone: 'green' };
  if (job.status === 'Cancelled') return { label: 'Cancelled', tone: 'neutral' };
  if (job.board_stage === 'Testing') return { label: 'Testing', tone: 'neutral' };
  if (job.status === 'Active') return { label: 'On', tone: 'neutral' };
  return { label: 'Booked', tone: 'neutral' };
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function MyJobsPage() {
  // ?job=<id> deep link — a push, a notification or browser-back lands on the
  // same job. Kept in the URL so refresh keeps the selection.
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<JobFilter>('active');
  const selectedId = searchParams.get('job');
  const setSelectedId = (id: string | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id) next.set('job', id);
        else next.delete('job');
        return next;
      },
      { replace: !id }
    );
    if (id) window.scrollTo({ top: 0 });
  };

  const { data: jobs = [], isLoading, isError, refetch } = useMyJobs(filter);
  const { data: employee } = useMyEmployeeRecord();
  const employeeId = employee?.id;

  // Live: the office assigning or changing this worker's jobs.
  useRealtimeInvalidate(
    'worker-jobs',
    [{ table: 'employer_job_assignments', filter: `employee_id=eq.${employeeId}` }],
    [['my-jobs', employeeId], ['my-job-detail']],
    Boolean(employeeId)
  );

  // The selected job may not be in the current filter (deep link to a
  // finished job) — fall back to the "all" list for its summary.
  const { data: allJobs = [] } = useMyJobs('all');
  const selectedJob = useMemo(
    () =>
      selectedId
        ? (jobs.find((j) => j.id === selectedId) ??
          allJobs.find((j) => j.id === selectedId) ??
          null)
        : null,
    [jobs, allJobs, selectedId]
  );

  const counts = useMemo(() => {
    const open = allJobs.filter((j) => !j.closed);
    return {
      open: open.length,
      fresh: open.filter((j) => j.is_new).length,
      today: open.filter((j) => {
        const d = dayDiff(j.scheduled_date);
        return d != null && d <= 0;
      }).length,
      closed: allJobs.length - open.length,
    };
  }, [allJobs]);

  const list = (
    <JobsList
      jobs={jobs}
      filter={filter}
      setFilter={setFilter}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      counts={counts}
      selectedId={selectedId}
      onOpen={setSelectedId}
    />
  );

  if (selectedId) {
    const detail = (
      <JobDetail jobId={selectedId} job={selectedJob} onBack={() => setSelectedId(null)} />
    );
    return (
      <WorkerToolPage eyebrow="Work" title="My Jobs" help={WT_JOBS_HELP}>
        <div className="lg:hidden">{detail}</div>
        <div className="hidden lg:block">
          <SplitLayout
            ratio="1-1"
            primary={list}
            secondary={<div className="lg:sticky lg:top-16">{detail}</div>}
          />
        </div>
      </WorkerToolPage>
    );
  }

  return (
    <WorkerToolPage
      eyebrow="Work"
      title="My Jobs"
      help={WT_JOBS_HELP}
      actions={
        // ELE-1820: the office's Diary, as your seven days.
        <Link
          to="/electrician/worker-tools/my-week"
          className="h-11 px-5 inline-flex items-center rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-medium touch-manipulation active:scale-[0.98]"
        >
          My week
        </Link>
      }
    >
      <Verdict
        headline={
          isLoading
            ? 'Loading your jobs…'
            : counts.open === 0
              ? 'No jobs on your list'
              : counts.open === 1
                ? '1 job on your list'
                : `${counts.open} jobs on your list`
        }
        detail={
          isLoading
            ? undefined
            : counts.fresh > 0
              ? `${counts.fresh} new from the office. Open ${counts.fresh === 1 ? 'it' : 'them'} to see the site details.`
              : counts.today > 0
                ? `${counts.today} on today. Tap a job for directions, the site contact and drawings.`
                : counts.open > 0
                  ? 'Tap a job for directions, the site contact and drawings.'
                  : 'When the office puts you on a job it lands here with a notification.'
        }
      />
      {list}
    </WorkerToolPage>
  );
}

/* ── List ─────────────────────────────────────────────────────────────── */

function JobsList({
  jobs,
  filter,
  setFilter,
  isLoading,
  isError,
  onRetry,
  counts,
  selectedId,
  onOpen,
}: {
  jobs: WorkerJob[];
  filter: JobFilter;
  setFilter: (f: JobFilter) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  counts: { open: number; closed: number };
  selectedId: string | null;
  onOpen: (id: string) => void;
}) {
  const groups = useMemo(() => {
    if (filter !== 'active') {
      return [{ key: 'all', label: filter === 'completed' ? 'Finished' : 'All jobs', items: jobs }];
    }
    const fresh: WorkerJob[] = [];
    const now: WorkerJob[] = [];
    const next: WorkerJob[] = [];
    const unscheduled: WorkerJob[] = [];
    for (const j of jobs) {
      const d = dayDiff(j.scheduled_date);
      if (j.is_new) fresh.push(j);
      else if (d == null) unscheduled.push(j);
      else if (d <= 0) now.push(j);
      else next.push(j);
    }
    return [
      { key: 'new', label: 'New from the office', items: fresh },
      { key: 'now', label: 'Today and on now', items: now },
      { key: 'next', label: 'Coming up', items: next },
      { key: 'none', label: 'No date yet', items: unscheduled },
    ].filter((g) => g.items.length > 0);
  }, [jobs, filter]);

  return (
    <div className="space-y-5">
      <div data-help="wt-jobs.filter">
        <Segmented<JobFilter>
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'active', label: 'On my list', count: counts.open },
            { value: 'completed', label: 'Finished', count: counts.closed },
            { value: 'all', label: 'All' },
          ]}
        />
      </div>

      {isLoading ? (
        <LoadingState className="py-12" />
      ) : isError ? (
        <WorkerPanel className="px-4 py-5 sm:px-5">
          <p className="text-[15px] font-semibold text-white">Couldn’t load your jobs</p>
          <p className="mt-1 text-[13px] text-white">
            Probably no signal. Your list will be back when you are.
          </p>
          <div className="mt-3">
            <RowAction onClick={onRetry}>Try again</RowAction>
          </div>
        </WorkerPanel>
      ) : groups.length === 0 ? (
        <WorkerPanel className="px-4 py-6 sm:px-5">
          <p className="text-[15px] font-semibold text-white">
            {filter === 'completed' ? 'Nothing finished yet' : 'Nothing on your list'}
          </p>
          <p className="mt-1 text-[13px] text-white">
            {filter === 'completed'
              ? 'Jobs you have finished, or that the office has closed, show here.'
              : 'When the office puts you on a job it lands here with a notification.'}
          </p>
        </WorkerPanel>
      ) : (
        <div className="space-y-5" data-help="wt-jobs.list">
          {groups.map((g) => (
            <WorkerPanel key={g.key} className="overflow-hidden">
              <GroupLabel
                right={
                  <span className="text-[12px] font-semibold tabular-nums text-white">
                    {g.items.length}
                  </span>
                }
              >
                {g.label}
              </GroupLabel>
              <ul className="divide-y divide-white/[0.07]">
                {g.items.map((job) => (
                  <JobRow
                    key={job.assignment_id ?? job.id}
                    job={job}
                    selected={job.id === selectedId}
                    onOpen={() => onOpen(job.id)}
                  />
                ))}
              </ul>
            </WorkerPanel>
          ))}
        </div>
      )}
    </div>
  );
}

function JobRow({
  job,
  selected,
  onOpen,
}: {
  job: WorkerJob;
  selected: boolean;
  onOpen: () => void;
}) {
  const when = whenLabel(job.scheduled_date);
  const stage = stageLabel(job);
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
        className={cn(
          'flex items-center gap-3 px-4 py-3.5 sm:px-5 cursor-pointer touch-manipulation',
          selected && 'bg-white/[0.06]'
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-semibold leading-snug text-white">{job.title}</span>
            {job.is_new && <SolidBadge>New</SolidBadge>}
            {job.finished_at && <SolidBadge tone="green">Your part done</SolidBadge>}
            {!job.is_new &&
              !job.finished_at &&
              stage.label !== 'On' &&
              stage.label !== 'Booked' && <SolidBadge tone={stage.tone}>{stage.label}</SolidBadge>}
          </p>
          {(job.client_name || job.address) && (
            <p className="mt-0.5 text-[13px] text-white line-clamp-2">
              {[job.client_name, job.address].filter(Boolean).join(' · ')}
            </p>
          )}
          {(when || job.role_on_job) && (
            <p className="mt-0.5 text-[12.5px] font-medium text-elec-yellow">
              {[when, job.role_on_job].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <RowAction onClick={onOpen} quiet={!job.is_new}>
          Open
        </RowAction>
      </div>
    </li>
  );
}

/* ── Job page ─────────────────────────────────────────────────────────── */

function JobDetail({
  jobId,
  job,
  onBack,
}: {
  jobId: string;
  job: WorkerJob | null;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const { data: detail, isLoading, isError, error, refetch } = useMyJobDetail(jobId);
  const [finishOpen, setFinishOpen] = useState(false);
  const reopen = useReopenMyPart();
  const [certOpen, setCertOpen] = useState(false);

  const backButton = (
    <button
      type="button"
      onClick={onBack}
      className="-ml-1 flex h-11 items-center gap-1.5 px-1 text-[14px] font-semibold text-white touch-manipulation lg:hidden"
    >
      <ArrowLeft className="h-5 w-5" />
      All jobs
    </button>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {backButton}
        <LoadingState className="py-16" />
      </div>
    );
  }

  if (isError || !detail) {
    const msg = rpcErrorMessage(error, 'Couldn’t open this job.');
    return (
      <div className="space-y-4">
        {backButton}
        <WorkerPanel className="px-4 py-5 sm:px-5">
          <p className="text-[15px] font-semibold text-white">
            {/not one of yours/i.test(msg)
              ? 'This job isn’t on your list'
              : 'Couldn’t open this job'}
          </p>
          <p className="mt-1 text-[13px] text-white">
            {/not one of yours/i.test(msg)
              ? 'The office may have taken you off it, or it belongs to a firm you are no longer with.'
              : msg}
          </p>
          <div className="mt-3 flex gap-2">
            {!/not one of yours/i.test(msg) && (
              <RowAction onClick={() => refetch()}>Try again</RowAction>
            )}
            <RowAction quiet onClick={onBack}>
              Back to my jobs
            </RowAction>
          </div>
        </WorkerPanel>
      </div>
    );
  }

  const title = job?.title ?? 'Job';
  const address = job?.address ?? null;
  const canNavigate = canNavigateTo({
    address,
    latitude: toNum(detail.lat),
    longitude: toNum(detail.lng),
  });
  const when = whenLabel(job?.scheduled_date);
  const until = job?.end_date ? format(new Date(job.end_date), 'EEE d MMM') : null;
  const mine = detail.mine;
  const others = detail.crew.filter((c) => !c.me);

  return (
    <div className="space-y-6">
      {backButton}

      {/* Title + where/when */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          {[when, job?.role_on_job].filter(Boolean).join(' · ') || 'Job'}
        </p>
        <h3 className="mt-1.5 text-[24px] sm:text-[28px] font-semibold leading-tight tracking-tight text-white">
          {title}
        </h3>
        {job?.client_name && <p className="mt-1 text-[14px] text-white">{job.client_name}</p>}
        {until && <p className="mt-0.5 text-[13px] text-white">Until {until}</p>}
      </div>

      {/* Address + directions */}
      {(address || canNavigate) && (
        <WorkerPanel className="overflow-hidden">
          <div className="flex items-stretch">
            <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
              <p className="text-[15px] leading-snug text-white">
                {address || 'Pinned on the map'}
              </p>
            </div>
            {canNavigate && (
              <button
                type="button"
                onClick={() =>
                  navigateToAddress({
                    address,
                    latitude: toNum(detail.lat),
                    longitude: toNum(detail.lng),
                  })
                }
                className="flex w-[104px] shrink-0 flex-col items-center justify-center gap-1 border-l border-white/[0.08] bg-elec-yellow text-black touch-manipulation"
              >
                <Navigation className="h-5 w-5" />
                <span className="text-[13px] font-bold">Directions</span>
              </button>
            )}
          </div>
        </WorkerPanel>
      )}

      {/* Who to ask for */}
      <ContactPanel detail={detail} />

      {/* "On my way" to the customer or site contact, from the van (ELE-1822) */}
      {detail.contact?.phone && detail.contact.kind !== 'supervisor' && !mine.finished_at && (
        <OnMyWayButton
          jobId={jobId}
          contactName={detail.contact.name}
          phone={detail.contact.phone}
          lat={detail.lat}
          lng={detail.lng}
        />
      )}

      {/* Access + office instructions + about */}
      {(detail.access_notes || job?.assignment_notes || job?.description) && (
        <WorkerPanel className="divide-y divide-white/[0.07]">
          {detail.access_notes && <TextBlock label="Getting in">{detail.access_notes}</TextBlock>}
          {job?.assignment_notes && (
            <TextBlock label="From the office">{job.assignment_notes}</TextBlock>
          )}
          {job?.description && <TextBlock label="About the job">{job.description}</TextBlock>}
        </WorkerPanel>
      )}

      {/* Repeat jobs: what the last crew found (ELE-1821) */}
      <LastVisitPanel jobId={jobId} />

      {/* My part */}
      {mine.finished_at ? (
        <WorkerPanel className="px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-white">
                You finished your part at {timeOf(mine.finished_at)}
                {dayDiff(mine.finished_at) !== 0 &&
                  ` on ${format(parseISO(mine.finished_at), 'd MMM')}`}
              </p>
              <p className="mt-0.5 text-[13px] text-white">
                {detail.board_stage === 'Testing'
                  ? 'Everyone has finished, so the office has it in Testing.'
                  : 'The office has been told.'}
              </p>
              {mine.finished_note && (
                <p className="mt-1.5 text-[13px] text-white whitespace-pre-wrap">
                  “{mine.finished_note}”
                </p>
              )}
            </div>
          </div>
          {mine.can_finish && (
            <button
              type="button"
              disabled={reopen.isPending}
              onClick={() =>
                reopen.mutate(jobId, {
                  onSuccess: () => toast.success('Back on the job. The office has been told'),
                  onError: (e) => toast.error(rpcErrorMessage(e, 'Couldn’t undo that')),
                })
              }
              className="mt-3 flex h-11 items-center gap-2 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-50"
            >
              {reopen.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Undo2 className="h-4 w-4" />
              )}
              Not finished after all
            </button>
          )}
        </WorkerPanel>
      ) : mine.can_finish ? (
        <PrimaryButton
          data-help="wt-jobs.finish"
          fullWidth
          size="lg"
          onClick={() => setFinishOpen(true)}
          className="h-14 rounded-2xl text-[16px]"
        >
          <CheckCircle2 className="mr-2 h-5 w-5" />
          I’ve finished my part
        </PrimaryButton>
      ) : null}

      {/* Hours against quoted + the customer's invoice (ELE-1824 / ELE-1823) */}
      <WorkerJobHoursAndPay jobId={jobId} />

      {/* On this job */}
      <div>
        <SectionTitle title="On this job" />
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
          data-help="wt-jobs.actions"
        >
          <ActionTile
            icon={Clock}
            label="Clock in"
            hint="Hours on this job"
            onClick={() => navigate(`${BASE}/timesheets?job=${jobId}`)}
          />
          <ActionTile
            icon={ListChecks}
            label="My tasks"
            hint="Tickets on this job"
            onClick={() => navigate(`${BASE}/tasks?job=${jobId}`)}
          />
          <ActionTile
            icon={NotebookPen}
            label="Progress note"
            hint="Words and photos"
            onClick={() => navigate(`${BASE}/progress-notes?job=${jobId}`)}
          />
          <ActionTile
            icon={AlertTriangle}
            label="Report an issue"
            hint="Snag or near miss"
            onClick={() => navigate(`${BASE}/reports?job=${jobId}`)}
          />
          <ActionTile
            icon={Package}
            label="Materials used"
            hint="Off your van"
            onClick={() => navigate(`${BASE}/equipment?job=${jobId}`)}
          />
          <ActionTile
            icon={ClipboardCheck}
            label="Certificate"
            hint="EICR, EIC, Minor Works"
            onClick={() => setCertOpen(true)}
          />
        </div>
      </div>
      <StartCertificateSheet
        open={certOpen}
        onOpenChange={setCertOpen}
        jobId={jobId}
        clientName={job?.client_name}
        address={job?.address}
        phone={detail.contact?.kind === 'client' ? detail.contact.phone : null}
      />

      <JobPacks jobId={jobId} />

      {/* Photos and drawings from the office */}
      {detail.files.length > 0 && (
        <div>
          <SectionTitle
            title="Photos and drawings"
            right={
              <span className="text-[13px] font-semibold tabular-nums text-white">
                {detail.files.length}
              </span>
            }
          />
          <WorkerPhotoStrip bucket="job-photos" paths={detail.files.map((f) => f.path)} />
        </div>
      )}

      {/* Last notes on the job */}
      <div>
        <SectionTitle
          title="Latest notes"
          right={
            <button
              type="button"
              onClick={() => navigate(`${BASE}/progress-notes?job=${jobId}`)}
              className="-my-3 flex h-11 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Add a note
              <ChevronRight className="h-4 w-4" />
            </button>
          }
        />
        {detail.notes.length === 0 ? (
          <WorkerPanel className="px-4 py-4 sm:px-5">
            <p className="text-[13.5px] text-white">
              No notes yet. Whoever is here next will see what you write.
            </p>
          </WorkerPanel>
        ) : (
          <WorkerPanel className="divide-y divide-white/[0.07]">
            {detail.notes.map((n) => (
              <div key={n.id} className="px-4 py-3.5 sm:px-5">
                <p className="flex flex-wrap items-baseline gap-x-2 text-[13px]">
                  <span className="font-semibold text-white">
                    {n.mine
                      ? 'You'
                      : n.author_name || (n.from_office ? 'The office' : 'Team member')}
                  </span>
                  <span className="text-white">
                    {format(parseISO(n.created_at), 'EEE d MMM, HH:mm')}
                    {n.edited_at && ' · edited'}
                  </span>
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-white whitespace-pre-wrap break-words">
                  {n.content}
                </p>
                {n.photos.length > 0 && (
                  <WorkerPhotoStrip
                    bucket="visual-uploads"
                    paths={n.photos}
                    columns={4}
                    className="mt-2.5"
                  />
                )}
              </div>
            ))}
          </WorkerPanel>
        )}
      </div>

      {/* Crew */}
      {others.length > 0 && (
        <div>
          <SectionTitle title="Also on this job" />
          <WorkerPanel className="divide-y divide-white/[0.07]">
            {others.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
              >
                <div className="min-w-0">
                  <p className="text-[14.5px] font-semibold text-white">{c.name}</p>
                  {c.role_on_job && <p className="text-[12.5px] text-white">{c.role_on_job}</p>}
                </div>
                {c.finished_at ? (
                  <SolidBadge tone="green">Done {timeOf(c.finished_at)}</SolidBadge>
                ) : (
                  <SolidBadge tone="neutral">On it</SolidBadge>
                )}
              </div>
            ))}
          </WorkerPanel>
        </div>
      )}

      <FinishSheet
        open={finishOpen}
        onOpenChange={setFinishOpen}
        jobId={jobId}
        jobTitle={title}
        othersLeft={others.filter((c) => !c.finished_at).length}
      />
    </div>
  );
}

function TextBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-4 py-3.5 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        {label}
      </p>
      <p className="mt-1 text-[14.5px] leading-relaxed text-white whitespace-pre-wrap break-words">
        {children}
      </p>
    </div>
  );
}

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const smsHref = (phone: string) => `sms:${phone.replace(/[^\d+]/g, '')}`;

function CallButtons({ phone }: { phone: string }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <a
        href={telHref(phone)}
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation"
      >
        <Phone className="h-5 w-5" />
        Call
      </a>
      <a
        href={smsHref(phone)}
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.18] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation"
      >
        <MessageSquare className="h-5 w-5" />
        Text
      </a>
    </div>
  );
}

function ContactPanel({ detail }: { detail: MyJobDetail }) {
  const c = detail.contact;
  const label =
    c?.kind === 'supervisor'
      ? 'Your supervisor'
      : c?.kind === 'client'
        ? 'The customer'
        : 'Ask for on site';
  return (
    <WorkerPanel className="divide-y divide-white/[0.07]">
      {c ? (
        <div className="px-4 py-4 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            {label}
          </p>
          <p className="mt-1 text-[17px] font-semibold text-white">{c.name || 'Site contact'}</p>
          {c.phone ? (
            <>
              <p className="text-[14px] tabular-nums text-white">{c.phone}</p>
              <CallButtons phone={c.phone} />
            </>
          ) : (
            <p className="mt-0.5 text-[13px] text-white">No number given. Ask the office.</p>
          )}
        </div>
      ) : (
        <div className="px-4 py-4 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            {detail.is_apprentice ? 'Your supervisor' : 'Ask for on site'}
          </p>
          <p className="mt-1 text-[14px] text-white">
            {detail.is_apprentice
              ? 'No supervisor is set for you yet. Ask the office who you are working with.'
              : 'The office hasn’t added a site contact for this job.'}
          </p>
        </div>
      )}
      {detail.office_phone && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[14.5px] font-semibold text-white">The office</p>
            <p className="text-[13px] tabular-nums text-white">{detail.office_phone}</p>
          </div>
          <a
            href={telHref(detail.office_phone)}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>
      )}
    </WorkerPanel>
  );
}

/* ── Packs to sign for this job ───────────────────────────────────────── */

function useMyPacksForJob(jobId: string) {
  const { data: me } = useMyEmployeeRecord();
  return useQuery({
    queryKey: ['my-job-packs', me?.id, jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .select(
          'id, job_pack_id, acknowledged_at, pack:employer_job_packs!inner(id, title, job_id)'
        )
        .eq('employee_id', me!.id)
        .eq('pack.job_id', jobId);
      if (error) throw error;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data || []).map((a: any) => ({
        ackId: a.id as string,
        title: (a.pack?.title as string) || 'Job pack',
        signedAt: (a.acknowledged_at as string | null) ?? null,
      }));
    },
    enabled: !!me?.id && !!jobId,
    staleTime: 30 * 1000,
  });
}

function JobPacks({ jobId }: { jobId: string }) {
  const navigate = useNavigate();
  const { data: packs = [] } = useMyPacksForJob(jobId);
  if (packs.length === 0) return null;
  const awaiting = packs.filter((p) => !p.signedAt).length;
  return (
    <div>
      <SectionTitle
        title="To read and sign"
        right={
          awaiting > 0 ? (
            <SolidBadge tone="red">{awaiting} to sign</SolidBadge>
          ) : (
            <SolidBadge tone="green">All signed</SolidBadge>
          )
        }
      />
      <WorkerPanel className="divide-y divide-white/[0.07]">
        {packs.map((p) => (
          <div key={p.ackId} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <FileCheck2
              className={cn(
                'h-5 w-5 shrink-0',
                p.signedAt ? 'text-emerald-400' : 'text-elec-yellow'
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-semibold text-white">{p.title}</p>
              <p className="text-[12.5px] text-white">
                {p.signedAt
                  ? `Signed ${format(parseISO(p.signedAt), 'd MMM')}`
                  : 'Read and sign before you start'}
              </p>
            </div>
            <RowAction
              quiet={!!p.signedAt}
              onClick={() => navigate(`${BASE}/signoffs?job=${jobId}&signoff=${p.ackId}`)}
            >
              {p.signedAt ? 'View' : 'Sign'}
            </RowAction>
          </div>
        ))}
      </WorkerPanel>
    </div>
  );
}

/* ── "I've finished my part" ──────────────────────────────────────────── */

function FinishSheet({
  open,
  onOpenChange,
  jobId,
  jobTitle,
  othersLeft,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  jobId: string;
  jobTitle: string;
  othersLeft: number;
}) {
  const finish = useFinishMyPart();
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);

  useEffect(() => {
    if (open) {
      setNote('');
      setPhotos([]);
      setPickerKey((k) => k + 1);
    }
  }, [open]);

  const submit = () => {
    finish.mutate(
      { jobId, note: note.trim(), photos },
      {
        onSuccess: (r) => {
          toast.success(
            r?.moved_to_testing
              ? 'Done. Everyone has finished, the office has it for testing'
              : 'Done. The office has been told'
          );
          onOpenChange(false);
        },
        onError: (e) => toast.error(rpcErrorMessage(e, 'Couldn’t save that. Try again')),
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-0">
        <SheetTitle className="sr-only">I’ve finished my part</SheetTitle>
        <SheetDescription className="sr-only">
          Tell the office your part of {jobTitle} is done
        </SheetDescription>
        <SheetShell
          eyebrow="Your part"
          title="I’ve finished my part"
          description={
            othersLeft > 0
              ? `${jobTitle}. The office gets a notification now. ${othersLeft === 1 ? '1 other person is' : `${othersLeft} others are`} still on the job.`
              : `${jobTitle}. The office gets a notification now, and as you’re the last one on it the job moves to Testing.`
          }
          footer={
            <>
              <SecondaryButton size="lg" onClick={() => onOpenChange(false)} className="px-5">
                Cancel
              </SecondaryButton>
              <PrimaryButton
                data-help="wt-jobs.finish-send"
                size="lg"
                fullWidth
                onClick={submit}
                disabled={finish.isPending || uploading}
              >
                {finish.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : uploading ? (
                  'Photos uploading…'
                ) : (
                  'Tell the office'
                )}
              </PrimaryButton>
            </>
          }
        >
          <Field label="What’s done, anything left (optional)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Second fix done, board tested and labelled. Bathroom fan needs the joiner back."
              className={cn(textareaClass, 'min-h-[120px]')}
              maxLength={4000}
            />
          </Field>
          <DictateButton
            className="w-full"
            onText={(t) => setNote((n) => (n ? `${n.trimEnd()} ${t}` : t))}
          />
          <Field label="Photos of the finished work">
            <WorkerPhotoPicker
              key={pickerKey}
              jobId={jobId}
              onChange={setPhotos}
              onBusyChange={setUploading}
              label="Take or add photos"
            />
          </Field>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
