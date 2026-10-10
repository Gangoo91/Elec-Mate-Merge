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
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { LoadingBlocks, SplitLayout, type Tone } from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_TASKS_HELP } from '@/components/worker-tools/help/worker-help';
import {
  useMyTasks,
  useUpForGrabsTasks,
  useUpdateTask,
  sendMyTaskStatus,
  useTaskComments,
  useAddTaskComment,
  uploadTaskPhoto,
  useTaskPhotoUrls,
  type JobTask,
  type TaskStatus,
  type TaskPriority,
} from '@/hooks/useJobTasks';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { OutboxRefusedError } from '@/lib/workerOutbox';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import {
  WorkerPanel,
  GroupLabel,
  Verdict,
  SolidBadge,
  RowAction,
  Segmented,
} from '@/components/worker-tools/WorkerUi';

/* ==========================================================================
   MyTasksPage — Worker Tools › My tasks (ELE-2007).

   Only tasks from the firm the worker is with NOW (active roster row) — a
   firm they've left never shows. Each row has its own next step (Start /
   Done) so the common case is one tap with a thumb. Tap a row for the full
   ticket: status, photos straight from the camera, updates to the office.
   The morning a task is due the worker gets a "Due today" notification
   (notify_task_due_reminders, daily cron).
   ========================================================================== */


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



/** ELE-1828: the change is on this phone, not with the office yet. */
function WaitingBadge() {
  return (
    <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.2] px-2.5 text-[11.5px] font-bold text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden />
      Waiting to send
    </span>
  );
}

function StatusPill({ status }: { status: TaskStatus }) {
  return (
    <SolidBadge tone={status === 'Blocked' ? 'red' : status === 'Done' ? 'green' : 'neutral'}>
      {status === 'Todo' ? 'To do' : status}
    </SolidBadge>
  );
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
      // ELE-1828: through the outbox, so a tick works with no signal.
      const result = await sendMyTaskStatus(task, status);
      const msg = status === 'Done' ? 'Nice one. Marked done' : `Marked ${status.toLowerCase()}`;
      if (result === 'sent') toast.success(msg);
      else queuedToast(msg);
    } catch (e) {
      toast.error(e instanceof OutboxRefusedError ? e.message : 'Could not update the task');
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
          <p className="mt-0.5 text-[13px] text-white truncate">
            {task.job?.title}
            {task.job?.location ? ` · ${task.job.location}` : ''}
          </p>
        </div>
        <div className="shrink-0 pt-1.5">
          <span className="flex flex-col items-end gap-1.5">
            <StatusPill status={task.status} />
            {task.offline_pending && <WaitingBadge />}
          </span>
        </div>
      </div>

      {/* Meta strip — priority + due at a glance */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Solid or outlined only — tinted amber renders brown on dark. */}
        <SolidBadge tone={task.priority === 'Urgent' ? 'red' : 'neutral'}>{task.priority} priority</SolidBadge>
        {due && <SolidBadge tone={due.tone === 'red' ? 'red' : due.tone === 'emerald' ? 'green' : 'neutral'}>{due.label}</SolidBadge>}
      </div>

      {task.description && (
        <div className="rounded-2xl bg-white/[0.05] border border-white/[0.12] p-4">
          <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
            {task.description}
          </p>
        </div>
      )}

      {/* Status actions */}
      <div className="space-y-2" data-help="wt-tasks.status">
        <p className="text-[11px] uppercase tracking-[0.16em] text-elec-yellow font-semibold px-0.5">
          Update status
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setStatus('In Progress')}
            disabled={updateTask.isPending || task.status === 'In Progress'}
            aria-label="Mark in progress"
            className="h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-white text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <PlayCircle className="h-[18px] w-[18px]" />
            Start
          </button>
          <button
            type="button"
            onClick={() => setStatus('Blocked')}
            disabled={updateTask.isPending || task.status === 'Blocked'}
            aria-label="Mark blocked"
            className="h-14 rounded-2xl bg-red-500/15 border border-red-500/25 text-white text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <AlertTriangle className="h-[18px] w-[18px]" />
            Blocked
          </button>
          <button
            type="button"
            onClick={() => setStatus('Done')}
            disabled={updateTask.isPending || task.status === 'Done'}
            aria-label="Mark done"
            className="h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 text-white text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-40 flex flex-col items-center justify-center gap-1"
          >
            <CheckCircle2 className="h-[18px] w-[18px]" />
            Done
          </button>
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-elec-yellow font-semibold px-0.5">
            Photos
            {task.photos.length > 0 && (
              <span className="ml-1.5 text-white tabular-nums">{task.photos.length}</span>
            )}
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.18] text-white text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-transform flex items-center gap-1.5 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4 text-elec-yellow" />
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
          <p className="text-[13px] text-white px-0.5">
            Add a photo so the office can see how it's going.
          </p>
        ) : (
          <TaskPhotoGrid photos={task.photos} />
        )}
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-elec-yellow font-semibold px-0.5">
          Updates
          {comments.length > 0 && (
            <span className="ml-1.5 text-white tabular-nums">{comments.length}</span>
          )}
        </p>
        {comments.length === 0 ? (
          <p className="text-[13px] text-white px-0.5">No updates yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white/[0.05] border border-white/[0.12] p-3.5">
              <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
                <span className="font-semibold text-white truncate">{c.author_name}</span>
                <span className="text-white shrink-0">
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
          className="h-11 w-11 shrink-0 rounded-xl bg-elec-yellow text-black flex items-center justify-center touch-manipulation active:scale-[0.98] transition-transform disabled:bg-white/[0.08] disabled:text-white/70"
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

type View = 'open' | 'done' | 'all';

const sortTasks = (a: JobTask, b: JobTask) =>
  (statusRank[a.status] ?? 9) - (statusRank[b.status] ?? 9) ||
  (a.due_date ? Date.parse(a.due_date) : Infinity) - (b.due_date ? Date.parse(b.due_date) : Infinity) ||
  (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9);

function nextStep(task: JobTask): { label: string; status: TaskStatus } | null {
  if (task.status === 'Todo') return { label: 'Start', status: 'In Progress' };
  if (task.status === 'In Progress') return { label: 'Done', status: 'Done' };
  return null;
}

function TaskRow({
  task,
  showJob,
  selected,
  busy,
  onOpen,
  onStep,
}: {
  task: JobTask;
  showJob?: boolean;
  selected?: boolean;
  busy?: boolean;
  onOpen: () => void;
  onStep: (status: TaskStatus) => void;
}) {
  const due = dueMeta(task.due_date, task.status === 'Done');
  const step = nextStep(task);
  const isDone = task.status === 'Done';
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
            <span className={cn('text-[15px] font-semibold leading-snug text-white', isDone && 'line-through')}>
              {task.title}
            </span>
            {task.status === 'Blocked' && <SolidBadge tone="red">Blocked</SolidBadge>}
            {task.status === 'In Progress' && <SolidBadge tone="neutral">On it</SolidBadge>}
            {task.offline_pending && <WaitingBadge />}
            {(task.priority === 'Urgent' || task.priority === 'High') && !isDone && (
              <SolidBadge tone={task.priority === 'Urgent' ? 'red' : 'neutral'}>{task.priority} priority</SolidBadge>
            )}
          </p>
          <p className="mt-0.5 text-[13px] text-white line-clamp-1">
            {[showJob ? task.job?.title : null, task.photos.length ? `${task.photos.length} photo${task.photos.length === 1 ? '' : 's'}` : null]
              .filter(Boolean)
              .join(' · ') ||
              task.description ||
              (task.priority === 'Urgent' || task.priority === 'High' ? '' : `${task.priority} priority`)}
          </p>
          {due && !isDone && (
            <p
              className={cn(
                'mt-0.5 text-[12.5px] font-semibold',
                due.tone === 'red' ? 'text-red-300' : 'text-elec-yellow'
              )}
            >
              {due.label}
            </p>
          )}
        </div>
        {step ? (
          <RowAction onClick={() => onStep(step.status)} disabled={busy} quiet={step.status === 'In Progress'}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : step.label}
          </RowAction>
        ) : (
          <RowAction quiet onClick={onOpen}>
            Open
          </RowAction>
        )}
      </div>
    </li>
  );
}

export default function MyTasksPage() {
  const { data: tasks = [], isLoading } = useMyTasks();
  const { data: grabsPool = [] } = useUpForGrabsTasks();
  const { data: me } = useMyEmployeeRecord();
  const updateTask = useUpdateTask();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>('open');
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const deepLinkTask = searchParams.get('task');
  const deepLinkJob = searchParams.get('job');
  useEffect(() => {
    if (deepLinkTask && tasks.some((t) => t.id === deepLinkTask)) setSelectedId(deepLinkTask);
  }, [deepLinkTask, tasks]);

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
    window.scrollTo({ top: 0 });
  };

  const backToList = () => {
    setSelectedId(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('task');
      return next;
    });
  };

  const step = async (task: JobTask, status: TaskStatus) => {
    setBusyId(task.id);
    try {
      // ELE-1828: through the outbox, so a tick works with no signal.
      const result = await sendMyTaskStatus(task, status);
      const msg = status === 'Done' ? `Done: “${task.title}”` : `Started “${task.title}”`;
      if (result === 'sent') toast.success(msg);
      else queuedToast(msg);
    } catch (e) {
      toast.error(
        e instanceof OutboxRefusedError ? e.message : 'Couldn’t update the task. Try again'
      );
    } finally {
      setBusyId(null);
    }
  };

  const claim = async (task: JobTask) => {
    if (!me?.id) return;
    setBusyId(task.id);
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { assignee_employee_id: me.id, status: 'In Progress' },
      });
      toast.success(`You’re on it: “${task.title}”`);
    } catch {
      toast.error('Couldn’t take that task. Someone may have beaten you to it');
    } finally {
      setBusyId(null);
    }
  };

  const open = tasks.filter((t) => t.status !== 'Done');
  const blocked = open.filter((t) => t.status === 'Blocked').length;
  const dueToday = open.filter((t) => {
    const d = dueMeta(t.due_date, false);
    return d && (d.label === 'Due today' || d.label.startsWith('Overdue'));
  }).length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks
      .filter((t) => (view === 'open' ? t.status !== 'Done' : view === 'done' ? t.status === 'Done' : true))
      .filter((t) => !q || `${t.title} ${t.description ?? ''} ${t.job?.title ?? ''}`.toLowerCase().includes(q))
      .sort(sortTasks);
  }, [tasks, view, search]);

  // Grouped by job; the job you came from (?job=) first, then jobs with open work.
  const byJob = useMemo(() => {
    const groups = new Map<string, { jobId: string; jobTitle: string; items: JobTask[] }>();
    filtered.forEach((t) => {
      if (!groups.has(t.job_id)) groups.set(t.job_id, { jobId: t.job_id, jobTitle: t.job?.title || 'Job', items: [] });
      groups.get(t.job_id)!.items.push(t);
    });
    return Array.from(groups.values()).sort(
      (a, b) =>
        (deepLinkJob && a.jobId === deepLinkJob ? 0 : 1) - (deepLinkJob && b.jobId === deepLinkJob ? 0 : 1) ||
        (a.items.some((t) => t.status !== 'Done') ? 0 : 1) - (b.items.some((t) => t.status !== 'Done') ? 0 : 1)
    );
  }, [filtered, deepLinkJob]);

  const headline =
    open.length === 0
      ? 'Nothing on your list'
      : `${open.length} ${open.length === 1 ? 'task' : 'tasks'} to do`;
  const detail =
    blocked > 0
      ? `${blocked} blocked. The office has been told.${dueToday ? ` ${dueToday} due today.` : ''}`
      : dueToday > 0
        ? `${dueToday} due today or overdue.`
        : open.length > 0
          ? 'Tap Start when you pick one up and Done when it’s finished. The office sees it straight away.'
          : 'When the office gives you a task it lands here with a notification.';

  const list = (
    <div className="space-y-5">
      {tasks.length > 0 && (
        <>
          <div data-help="wt-tasks.filter">
            <Segmented<View>
              value={view}
              onChange={setView}
              options={[
                { value: 'open', label: 'To do', count: open.length },
                { value: 'done', label: 'Done', count: tasks.length - open.length },
                { value: 'all', label: 'All' },
              ]}
            />
          </div>
          {tasks.length > 6 && (
            <label className="flex items-center gap-2 border-b border-white/[0.15] focus-within:border-elec-yellow">
              <Search className="h-4 w-4 shrink-0 text-white" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a task"
                className="h-11 w-full bg-transparent text-base text-white placeholder:text-white/40 caret-elec-yellow focus:outline-none touch-manipulation"
              />
            </label>
          )}
        </>
      )}

      {filtered.length === 0 && tasks.length > 0 ? (
        <WorkerPanel className="px-4 py-4 sm:px-5">
          <p className="text-[14px] text-white">
            {search.trim() ? 'No tasks match that.' : view === 'done' ? 'Nothing finished yet.' : 'All done. Nice.'}
          </p>
        </WorkerPanel>
      ) : (
        <div className="space-y-5" data-help="wt-tasks.list">
        {byJob.map((g) => (
          <WorkerPanel key={g.jobId} className="overflow-hidden">
            <GroupLabel
              right={
                <span className="text-[12px] font-semibold tabular-nums text-white">{g.items.length}</span>
              }
            >
              {g.jobTitle}
            </GroupLabel>
            <ul className="divide-y divide-white/[0.07]">
              {g.items.map((t) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  selected={t.id === selectedId}
                  busy={busyId === t.id}
                  onOpen={() => openSelected(t)}
                  onStep={(s) => step(t, s)}
                />
              ))}
            </ul>
          </WorkerPanel>
        ))}
        </div>
      )}

      {grabsPool.length > 0 && (
        <div data-help="wt-tasks.grabs">
        <WorkerPanel className="overflow-hidden">
          <GroupLabel>Up for grabs on your jobs</GroupLabel>
          <ul className="divide-y divide-white/[0.07]">
            {grabsPool.map((task) => (
              <li key={task.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-snug text-white">{task.title}</p>
                  <p className="mt-0.5 text-[13px] text-white line-clamp-1">
                    {[task.job?.title, `${task.priority} priority`].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <RowAction onClick={() => claim(task)} disabled={busyId === task.id}>
                  {busyId === task.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'I’ll take it'}
                </RowAction>
              </li>
            ))}
          </ul>
        </WorkerPanel>
        </div>
      )}
    </div>
  );

  if (liveSelected) {
    return (
      <WorkerToolPage eyebrow="Tasks" title="My Tasks" help={WT_TASKS_HELP}>
        <div className="lg:hidden">
          <TaskDetail task={liveSelected} me={me} onBack={backToList} />
        </div>
        <div className="hidden lg:block">
          <SplitLayout
            ratio="1-1"
            primary={list}
            secondary={
              <div className="lg:sticky lg:top-16">
                <WorkerPanel className="p-5">
                  <TaskDetail task={liveSelected} me={me} onBack={backToList} />
                </WorkerPanel>
              </div>
            }
          />
        </div>
      </WorkerToolPage>
    );
  }

  return (
    <WorkerToolPage eyebrow="Tasks" title="My Tasks" help={WT_TASKS_HELP}>
      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <Verdict headline={headline} detail={detail} />
          {list}
        </>
      )}
    </WorkerToolPage>
  );
}
