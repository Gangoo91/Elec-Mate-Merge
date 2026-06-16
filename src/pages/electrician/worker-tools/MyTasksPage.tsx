import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  Loader2,
  Camera,
  Send,
  ChevronLeft,
  CheckCircle2,
  PlayCircle,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  StatStrip,
  FilterBar,
  ListCard,
  ListBody,
  ListRow,
  Pill,
  Dot,
  Divider,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  SplitLayout,
  type Tone,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  useMyTasks,
  useUpForGrabsTasks,
  useUpdateTask,
  useTaskComments,
  useAddTaskComment,
  uploadTaskPhoto,
  useTaskPhotoUrls,
  type JobTask,
  type TaskStatus,
  type TaskPriority,
} from '@/hooks/useJobTasks';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';

/* ==========================================================================
   MyTasksPage — the sparky's ticket list, as a routed page.

   Tasks grouped by job; tap one for the in-page detail view: flip status (In
   Progress / Blocked / Done), write back what the craic was, attach photos
   straight from the camera. Everything lands on the employer's board in
   realtime and rings their bell on Done/Blocked.

   Improvements over the old sheet: status filter tabs with live counts, a
   group-by toggle (job / status), search, relative timestamps, claim-with
   per-row in-flight state, and a ?task deep-link that opens a ticket directly.
   ========================================================================== */

const statusTone: Record<TaskStatus, Tone> = {
  Todo: 'amber',
  'In Progress': 'blue',
  Blocked: 'red',
  Done: 'emerald',
};

// Mirrors the server-side ordering so the most pressing work floats up.
const statusRank: Record<TaskStatus, number> = {
  Blocked: 0,
  'In Progress': 1,
  Todo: 2,
  Done: 3,
};
const priorityRank: Record<TaskPriority, number> = {
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const priorityTone: Record<TaskPriority, Tone> = {
  Urgent: 'red',
  High: 'orange',
  Medium: 'amber',
  Low: 'blue',
};

type StatusFilter = 'all' | 'open' | 'In Progress' | 'Blocked' | 'Done';
type GroupBy = 'job' | 'status';

const STATUS_ORDER: TaskStatus[] = ['Blocked', 'In Progress', 'Todo', 'Done'];

function StatusPill({ status }: { status: TaskStatus }) {
  return <Pill tone={statusTone[status]}>{status}</Pill>;
}

/** Glanceable, urgency-aware due-date label derived from existing due_date. */
function dueMeta(due: string | null, isDone: boolean): { label: string; tone: Tone } | null {
  if (!due) return null;
  const dueDate = new Date(due);
  if (Number.isNaN(dueDate.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  const date = dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  if (isDone) return { label: `Due ${date}`, tone: 'emerald' };
  if (days < 0) return { label: `Overdue · ${date}`, tone: 'red' };
  if (days === 0) return { label: 'Due today', tone: 'red' };
  if (days === 1) return { label: 'Due tomorrow', tone: 'amber' };
  if (days <= 7) return { label: `Due in ${days} days`, tone: 'amber' };
  return { label: `Due ${date}`, tone: 'blue' };
}

function TaskPhotoGrid({ photos }: { photos: string[] }) {
  const { data: urls = [] } = useTaskPhotoUrls(photos);
  return (
    <div className="grid grid-cols-3 gap-2">
      {urls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noreferrer" className="touch-manipulation">
          <img
            src={url}
            alt="Task photo"
            className="aspect-square w-full rounded-lg object-cover border border-white/[0.08]"
          />
        </a>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Row used in both the job-grouped and status-grouped lists.
   ────────────────────────────────────────────────────────────────────────── */
function TaskRow({
  task,
  showJob,
  selected,
  onSelect,
}: {
  task: JobTask;
  showJob?: boolean;
  selected?: boolean;
  onSelect: (t: JobTask) => void;
}) {
  const due = dueMeta(task.due_date, task.status === 'Done');
  const isDone = task.status === 'Done';
  return (
    <ListRow
      onClick={() => onSelect(task)}
      accent={statusTone[task.status]}
      className={cn(selected && 'bg-[hsl(0_0%_15%)]')}
      title={
        <span className={cn('block truncate', isDone && 'line-through text-white/50')}>
          {task.title}
        </span>
      }
      subtitle={
        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className="inline-flex items-center gap-1">
            <Dot tone={priorityTone[task.priority]} />
            {task.priority}
          </span>
          {showJob && task.job?.title && (
            <>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <span className="truncate">{task.job.title}</span>
            </>
          )}
          {due && (
            <>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <span
                className={cn(
                  due.tone === 'red' && 'text-red-400',
                  due.tone === 'amber' && 'text-amber-400'
                )}
              >
                {due.label}
              </span>
            </>
          )}
          {task.photos.length > 0 && (
            <>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <span>
                {task.photos.length} {task.photos.length === 1 ? 'photo' : 'photos'}
              </span>
            </>
          )}
        </span>
      }
      trailing={<StatusPill status={task.status} />}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Detail view — same behaviour as the old sheet's detail step, in-page.
   ══════════════════════════════════════════════════════════════════════════ */
function TaskDetail({
  task,
  me,
  onBack,
}: {
  task: JobTask;
  me: { id?: string; name?: string } | undefined;
  onBack: () => void;
}) {
  const updateTask = useUpdateTask();
  const addComment = useAddTaskComment();
  const queryClientForPhotos = useQueryClient();
  const { data: comments = [] } = useTaskComments(task.id);
  const [comment, setComment] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setStatus = async (status: TaskStatus) => {
    try {
      await updateTask.mutateAsync({ id: task.id, updates: { status } });
      toast.success(
        status === 'Done' ? 'Nice one — marked done' : `Marked ${status.toLowerCase()}`
      );
    } catch {
      toast.error('Could not update the task');
    }
  };

  const handleComment = async () => {
    if (!comment.trim() || !me?.name) return;
    try {
      await addComment.mutateAsync({
        taskId: task.id,
        jobId: task.job_id,
        authorName: me.name,
        content: comment,
      });
      setComment('');
    } catch {
      toast.error('Could not send the comment');
    }
  };

  const handlePhoto = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadTaskPhoto(task.id, file); // appends server-side, no clobber
      queryClientForPhotos.invalidateQueries({ queryKey: ['my-tasks'] });
      toast.success('Photo added');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload the photo');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const due = dueMeta(task.due_date, task.status === 'Done');

  return (
    <div className="space-y-6">
      {/* In-page back + title */}
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="h-11 w-11 -ml-1 flex items-center justify-center rounded-full text-white hover:bg-white/[0.08] touch-manipulation shrink-0"
          aria-label="Back to task list"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1 pt-1.5">
          <p className="text-[17px] font-semibold text-white leading-snug">{task.title}</p>
          <p className="mt-0.5 text-[12.5px] text-white/70 truncate">
            {task.job?.title}
            {task.job?.location ? ` · ${task.job.location}` : ''}
          </p>
        </div>
        <div className="shrink-0 pt-1.5">
          <StatusPill status={task.status} />
        </div>
      </div>

      {/* Meta strip — priority + due at a glance */}
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={priorityTone[task.priority]}>{task.priority} priority</Pill>
        {due && <Pill tone={due.tone}>{due.label}</Pill>}
      </div>

      {task.description && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
          <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
            {task.description}
          </p>
        </div>
      )}

      {/* Status actions */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/55 font-medium px-0.5">
          Update status
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setStatus('In Progress')}
            disabled={updateTask.isPending || task.status === 'In Progress'}
            aria-label="Mark in progress"
            className="h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[12px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <PlayCircle className="h-[18px] w-[18px]" />
            Start
          </button>
          <button
            type="button"
            onClick={() => setStatus('Blocked')}
            disabled={updateTask.isPending || task.status === 'Blocked'}
            aria-label="Mark blocked"
            className="h-14 rounded-2xl bg-red-500/15 border border-red-500/25 text-red-400 text-[12px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <AlertTriangle className="h-[18px] w-[18px]" />
            Blocked
          </button>
          <button
            type="button"
            onClick={() => setStatus('Done')}
            disabled={updateTask.isPending || task.status === 'Done'}
            aria-label="Mark done"
            className="h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[12px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <CheckCircle2 className="h-[18px] w-[18px]" />
            Done
          </button>
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/55 font-medium px-0.5">
            Photos
            {task.photos.length > 0 && (
              <span className="ml-1.5 text-white/40 tabular-nums">{task.photos.length}</span>
            )}
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="h-11 px-3.5 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[12px] font-semibold touch-manipulation active:scale-[0.98] transition-transform flex items-center gap-1.5 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Camera className="h-3.5 w-3.5" />
            )}
            {uploading ? 'Adding…' : 'Add photo'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handlePhoto(e.target.files?.[0])}
          />
        </div>
        {task.photos.length === 0 ? (
          <p className="text-[12px] text-white/60 px-0.5">
            Show the office what the craic is — snap it as you go.
          </p>
        ) : (
          <TaskPhotoGrid photos={task.photos} />
        )}
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/55 font-medium px-0.5">
          Updates
          {comments.length > 0 && (
            <span className="ml-1.5 text-white/40 tabular-nums">{comments.length}</span>
          )}
        </p>
        {comments.length === 0 ? (
          <p className="text-[12px] text-white/60 px-0.5">No updates yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3.5">
              <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
                <span className="font-semibold text-white truncate">{c.author_name}</span>
                <span className="text-white/60 shrink-0">
                  {formatDistanceToNow(parseISO(c.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                {c.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Comment composer */}
      <div className="flex gap-2 pt-1">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write back what the craic is…"
          rows={1}
          aria-label="Write an update"
          className="touch-manipulation text-base min-h-[44px] max-h-28 resize-none bg-white/[0.05] border-white/[0.10] text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow/15"
        />
        <button
          type="button"
          onClick={handleComment}
          disabled={!comment.trim() || addComment.isPending}
          className="h-11 w-11 shrink-0 rounded-xl bg-elec-yellow text-black flex items-center justify-center touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40"
          aria-label="Send update"
        >
          {addComment.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════════════════════════ */
export default function MyTasksPage() {
  const { data: tasks = [], isLoading } = useMyTasks();
  const { data: grabsPool = [] } = useUpForGrabsTasks();
  const { data: me } = useMyEmployeeRecord();
  const updateTask = useUpdateTask();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [groupBy, setGroupBy] = useState<GroupBy>('job');
  const [search, setSearch] = useState('');
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // ?task deep-link — open the ticket if an id is passed (once tasks load).
  const deepLinkTask = searchParams.get('task');
  useEffect(() => {
    if (deepLinkTask && tasks.some((t) => t.id === deepLinkTask)) {
      setSelectedId(deepLinkTask);
    }
  }, [deepLinkTask, tasks]);

  // Keep the selected task fresh as realtime updates arrive.
  const liveSelected = useMemo(
    () => (selectedId ? (tasks.find((t) => t.id === selectedId) ?? null) : null),
    [selectedId, tasks]
  );

  const openSelected = (t: JobTask) => {
    setSelectedId(t.id);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('task', t.id);
      return next;
    });
  };

  const backToList = () => {
    setSelectedId(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('task');
      return next;
    });
  };

  const handleClaim = async (task: JobTask) => {
    if (!me?.id) return;
    setClaimingId(task.id);
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { assignee_employee_id: me.id, status: 'In Progress' },
      });
      toast.success(`You're on it — "${task.title}"`);
    } catch {
      toast.error('Could not claim the task');
    } finally {
      setClaimingId(null);
    }
  };

  // Counts off the full task set (filter-independent).
  const openCount = tasks.filter((t) => t.status !== 'Done').length;
  const doneCount = tasks.length - openCount;
  const blockedCount = tasks.filter((t) => t.status === 'Blocked').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;

  const stats: { label: string; value: number; tone?: Tone; accent?: boolean }[] = [
    { label: 'Open', value: openCount, accent: openCount > 0 },
    { label: 'Done', value: doneCount, tone: 'emerald' },
    {
      label: blockedCount > 0 ? 'Blocked' : 'Up for grabs',
      value: blockedCount > 0 ? blockedCount : grabsPool.length,
      tone: blockedCount > 0 ? 'red' : 'yellow',
    },
  ];

  const sortTasks = (a: JobTask, b: JobTask) =>
    (statusRank[a.status] ?? 9) - (statusRank[b.status] ?? 9) ||
    (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9) ||
    (a.due_date ? Date.parse(a.due_date) : Infinity) -
      (b.due_date ? Date.parse(b.due_date) : Infinity);

  // Apply status filter + search before grouping.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      if (statusFilter === 'open' && t.status === 'Done') return false;
      if (statusFilter === 'In Progress' && t.status !== 'In Progress') return false;
      if (statusFilter === 'Blocked' && t.status !== 'Blocked') return false;
      if (statusFilter === 'Done' && t.status !== 'Done') return false;
      if (q) {
        const hay = `${t.title} ${t.description ?? ''} ${t.job?.title ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, statusFilter, search]);

  // Group by job, then sort each job's tickets by urgency and bubble jobs with
  // open work to the top — stable keys off job_id.
  const byJob = useMemo(() => {
    const groups = new Map<string, { jobId: string; jobTitle: string; items: JobTask[] }>();
    filtered.forEach((t) => {
      const key = t.job_id;
      if (!groups.has(key)) {
        groups.set(key, { jobId: t.job_id, jobTitle: t.job?.title || 'Job', items: [] });
      }
      groups.get(key)!.items.push(t);
    });
    const list = Array.from(groups.values());
    list.forEach((g) => g.items.sort(sortTasks));
    const openInGroup = (g: { items: JobTask[] }) =>
      g.items.some((t) => t.status !== 'Done') ? 0 : 1;
    list.sort((a, b) => openInGroup(a) - openInGroup(b));
    return list;
  }, [filtered]);

  // Group by status — fixed ordering, only non-empty buckets.
  const byStatus = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      items: filtered.filter((t) => t.status === status).sort(sortTasks),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const filterTabs = [
    { value: 'open', label: 'Open', count: openCount },
    { value: 'In Progress', label: 'Active', count: inProgressCount },
    { value: 'Blocked', label: 'Blocked', count: blockedCount },
    { value: 'Done', label: 'Done', count: doneCount },
    { value: 'all', label: 'All', count: tasks.length },
  ];

  /* ─── Grouped task lists — laid out across the width on lg ─── */
  const groupedLists =
    filtered.length === 0 ? (
      <EmptyState
        title="Nothing here"
        description={
          search.trim()
            ? 'No tasks match your search.'
            : 'No tasks in this view — try a different filter.'
        }
        action="Show open"
        onAction={() => {
          setSearch('');
          setStatusFilter('open');
        }}
      />
    ) : groupBy === 'job' ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {byJob.map((group) => {
          const open = group.items.filter((t) => t.status !== 'Done').length;
          return (
            <ListCard key={group.jobId || group.jobTitle}>
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
                <div className="min-w-0 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 truncate">
                  {group.jobTitle}
                </div>
                <Pill tone={open > 0 ? 'amber' : 'emerald'}>
                  {open > 0 ? `${open} open` : 'All done'}
                </Pill>
              </div>
              <ListBody>
                {group.items.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    selected={task.id === selectedId}
                    onSelect={openSelected}
                  />
                ))}
              </ListBody>
            </ListCard>
          );
        })}
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {byStatus.map((group) => (
          <ListCard key={group.status}>
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
              <div className="min-w-0">
                <StatusPill status={group.status} />
              </div>
              <span className="text-[11px] text-white/55 tabular-nums">{group.items.length}</span>
            </div>
            <ListBody>
              {group.items.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  showJob
                  selected={task.id === selectedId}
                  onSelect={openSelected}
                />
              ))}
            </ListBody>
          </ListCard>
        ))}
      </div>
    );

  /* ─── Up for grabs — claim with per-row in-flight state ─── */
  const upForGrabs = grabsPool.length > 0 && (
    <>
      <Divider label="Up for grabs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {grabsPool.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl bg-elec-yellow/[0.05] border border-elec-yellow/20 p-3.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-white leading-snug truncate">
                  {task.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/70 truncate">
                  <Dot tone={priorityTone[task.priority]} />
                  {task.job?.title} · {task.priority} priority
                </p>
              </div>
              <PrimaryButton
                onClick={() => handleClaim(task)}
                disabled={claimingId === task.id}
                size="md"
                className="shrink-0 rounded-full"
              >
                {claimingId === task.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "I'll take it"
                )}
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  /* ─── Mobile detail — full-screen in-page view (tap row → detail) ─── */
  if (liveSelected) {
    return (
      <>
        {/* Mobile: dedicated full-width detail view */}
        <div className="lg:hidden">
          <WorkerToolPage eyebrow="Tasks" title="My Tasks">
            <TaskDetail task={liveSelected} me={me} onBack={backToList} />
          </WorkerToolPage>
        </div>

        {/* Desktop: master list on the left, detail on the right */}
        <div className="hidden lg:block">
          <WorkerToolPage
            eyebrow="Tasks"
            title="My Tasks"
            description="Your job tickets, sorted by what needs doing first."
          >
            <div className="space-y-6">
              {tasks.length > 0 && <StatStrip stats={stats} columns={3} />}
              {tasks.length > 0 && (
                <FilterBar
                  tabs={filterTabs}
                  activeTab={statusFilter}
                  onTabChange={(v) => setStatusFilter(v as StatusFilter)}
                  search={search}
                  onSearchChange={setSearch}
                  searchPlaceholder="Search tasks…"
                  actions={
                    <SecondaryButton
                      size="sm"
                      onClick={() => setGroupBy((g) => (g === 'job' ? 'status' : 'job'))}
                    >
                      {groupBy === 'job' ? 'Group: Job' : 'Group: Status'}
                    </SecondaryButton>
                  }
                />
              )}
              <SplitLayout
                ratio="1-1"
                primary={
                  <div className="space-y-6">
                    {groupedLists}
                    {upForGrabs}
                  </div>
                }
                secondary={
                  <div className="lg:sticky lg:top-[4.5rem] rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-5">
                    <TaskDetail task={liveSelected} me={me} onBack={backToList} />
                  </div>
                }
              />
            </div>
          </WorkerToolPage>
        </div>
      </>
    );
  }

  /* ─── List view (nothing selected) ─── */
  return (
    <WorkerToolPage
      eyebrow="Tasks"
      title="My Tasks"
      description="Your job tickets, sorted by what needs doing first."
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : tasks.length === 0 && grabsPool.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="When the office gives you a ticket it lands here with a push to your phone."
        />
      ) : (
        <div className="space-y-6">
          {tasks.length > 0 && <StatStrip stats={stats} columns={3} />}

          {tasks.length > 0 && (
            <FilterBar
              tabs={filterTabs}
              activeTab={statusFilter}
              onTabChange={(v) => setStatusFilter(v as StatusFilter)}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search tasks…"
              actions={
                <SecondaryButton
                  size="sm"
                  onClick={() => setGroupBy((g) => (g === 'job' ? 'status' : 'job'))}
                >
                  {groupBy === 'job' ? 'Group: Job' : 'Group: Status'}
                </SecondaryButton>
              }
            />
          )}

          {groupedLists}
          {upForGrabs}
        </div>
      )}
    </WorkerToolPage>
  );
}
