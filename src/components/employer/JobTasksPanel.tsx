import { useMemo, useState } from 'react';
import {
  Plus,
  Loader2,
  Trash2,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Send,
  CalendarClock,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  useJobTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useTaskComments,
  useAddTaskComment,
  useTaskPhotoUrls,
  type JobTask,
  type TaskStatus,
  type TaskPriority,
} from '@/hooks/useJobTasks';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useJobAssignments } from '@/hooks/useJobAssignments';

/* ==========================================================================
   JobTasksPanel — Linear-style tickets inside the employer's job sheet.

   Status-grouped list (mobile first, no horizontal scroll). Tap the status
   pill to cycle a ticket forward; assign from the job's crew; workers see
   assigned tickets in Worker Tools and their updates land here in realtime.
   ========================================================================== */

const STATUS_ORDER: TaskStatus[] = ['Todo', 'In Progress', 'Blocked', 'Done'];

const statusStyles: Record<TaskStatus, string> = {
  Todo: 'bg-white/[0.08] text-white',
  'In Progress': 'bg-blue-500/20 text-blue-400',
  Blocked: 'bg-red-500/20 text-red-400',
  Done: 'bg-emerald-500/20 text-emerald-400',
};

const priorityDot: Record<TaskPriority, string> = {
  Low: 'bg-white/30',
  Medium: 'bg-blue-400',
  High: 'bg-amber-400',
  Urgent: 'bg-red-500',
};

const nextStatus = (s: TaskStatus): TaskStatus => {
  const i = STATUS_ORDER.indexOf(s);
  return STATUS_ORDER[(i + 1) % STATUS_ORDER.length];
};

const isOverdue = (t: JobTask) =>
  !!t.due_date && t.status !== 'Done' && t.due_date < new Date().toISOString().slice(0, 10);

/** Photo strip resolving private paths to signed URLs */
function TaskPhotoStrip({ photos }: { photos: string[] }) {
  const { data: urls = [] } = useTaskPhotoUrls(photos);
  if (urls.length === 0) return null;
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {urls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noreferrer" className="shrink-0">
          <img
            src={url}
            alt="Task photo"
            className="h-14 w-14 rounded-lg object-cover border border-white/[0.08]"
          />
        </a>
      ))}
    </div>
  );
}

/** Two-way comment thread — the employer's side of "what the craic is" */
function TaskCommentsSheet({
  task,
  onClose,
  authorName,
}: {
  task: JobTask | null;
  onClose: () => void;
  authorName: string;
}) {
  const { data: comments = [] } = useTaskComments(task?.id);
  const addComment = useAddTaskComment();
  const [text, setText] = useState('');

  const send = async () => {
    if (!task || !text.trim()) return;
    try {
      await addComment.mutateAsync({
        taskId: task.id,
        jobId: task.job_id,
        authorName,
        content: text,
      });
      setText('');
    } catch {
      toast({ title: 'Could not send', variant: 'destructive' });
    }
  };

  return (
    <Sheet open={!!task} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-white/[0.06]">
            <SheetTitle className="text-left text-base truncate">{task?.title}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {comments.length === 0 ? (
              <p className="text-[12px] text-white/40 text-center py-6">
                No updates yet — your assignee gets a push when you comment.
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3"
                >
                  <div className="flex items-center justify-between text-[10.5px] text-white/40 mb-1">
                    <span className="font-medium text-white/60">{c.author_name}</span>
                    <span>
                      {new Date(c.created_at).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-white/80 whitespace-pre-wrap">{c.content}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex-shrink-0 border-t border-white/[0.06] p-3 pb-safe flex gap-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Reply to your assignee…"
              rows={1}
              className="touch-manipulation text-base min-h-[44px] max-h-28 resize-none border-white/30 focus:border-yellow-500"
            />
            <button
              type="button"
              onClick={send}
              disabled={!text.trim() || addComment.isPending}
              className="h-11 w-11 shrink-0 rounded-xl bg-elec-yellow text-black flex items-center justify-center touch-manipulation disabled:opacity-40"
              aria-label="Send"
            >
              {addComment.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface Props {
  jobId: string;
}

export function JobTasksPanel({ jobId }: Props) {
  const { data: tasks = [], isLoading } = useJobTasks(jobId);
  const { data: assignments = [] } = useJobAssignments(jobId);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { companyProfile } = useCompanyProfile();
  const employerAuthorName = companyProfile?.company_name?.trim() || 'The office';

  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState<string>('unassigned');
  const [newPriority, setNewPriority] = useState<TaskPriority>('Medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [showDone, setShowDone] = useState(false);
  const [commentsFor, setCommentsFor] = useState<JobTask | null>(null);

  // AI breakdown: describe → propose → review → create
  const [aiOpen, setAiOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCreating, setAiCreating] = useState(false);
  const [proposals, setProposals] = useState<
    {
      title: string;
      description: string;
      priority: TaskPriority;
      suggested_role: string;
      include: boolean;
      assignee: string;
    }[]
  >([]);

  const crew = useMemo(
    () => assignments.map((a) => a.employee).filter((e): e is NonNullable<typeof e> => !!e),
    [assignments]
  );

  const grouped = useMemo(() => {
    const g: Record<TaskStatus, JobTask[]> = {
      Todo: [],
      'In Progress': [],
      Blocked: [],
      Done: [],
    };
    tasks.forEach((t) => g[t.status]?.push(t));
    return g;
  }, [tasks]);

  const openCount = tasks.length - grouped.Done.length;

  // Real team_role values → the AI's {Supervisor, Operative, Apprentice}
  const roleBucket = (teamRole: string | null | undefined): string => {
    if (['Supervisor', 'QS', 'Project Manager'].includes(teamRole || '')) return 'Supervisor';
    if (teamRole === 'Apprentice') return 'Apprentice';
    return 'Operative'; // Operative, Electrician, blank — all site hands
  };

  const suggestAssignee = (role: string): string => {
    const match = crew.find(
      (c) => roleBucket((c as { team_role?: string | null }).team_role) === role
    );
    return match?.id || 'unassigned';
  };

  const handleAiPropose = async () => {
    if (aiDescription.trim().length < 10) return;
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('breakdown-job-tasks', {
        body: { description: aiDescription },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      setProposals(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data.tasks || []).map((t: any) => ({
          ...t,
          include: true,
          assignee: suggestAssignee(t.suggested_role),
        }))
      );
    } catch (err) {
      toast({
        title: 'Could not break the job down',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiCreate = async () => {
    const chosen = proposals.filter((p) => p.include);
    if (chosen.length === 0) return;
    setAiCreating(true);
    try {
      for (let i = 0; i < chosen.length; i++) {
        const p = chosen[i];
        await createTask.mutateAsync({
          job_id: jobId,
          title: p.title,
          description: p.description,
          priority: p.priority,
          assignee_employee_id: p.assignee === 'unassigned' ? null : p.assignee,
          position: tasks.length + i,
        });
      }
      toast({ title: `${chosen.length} tasks created` });
      setAiOpen(false);
      setProposals([]);
      setAiDescription('');
    } catch {
      toast({ title: 'Some tasks failed to create', variant: 'destructive' });
    } finally {
      setAiCreating(false);
    }
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      await createTask.mutateAsync({
        job_id: jobId,
        title: newTitle,
        priority: newPriority,
        assignee_employee_id: newAssignee === 'unassigned' ? null : newAssignee,
        due_date: newDueDate || null,
        position: tasks.length,
      });
      setNewTitle('');
      setNewAssignee('unassigned');
      setNewPriority('Medium');
      setNewDueDate('');
    } catch {
      toast({ title: 'Could not add task', variant: 'destructive' });
    }
  };

  const handleCycle = async (task: JobTask) => {
    try {
      await updateTask.mutateAsync({ id: task.id, updates: { status: nextStatus(task.status) } });
    } catch {
      toast({ title: 'Could not update task', variant: 'destructive' });
    }
  };

  const handleAssign = async (task: JobTask, employeeId: string) => {
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { assignee_employee_id: employeeId === 'unassigned' ? null : employeeId },
      });
    } catch {
      toast({ title: 'Could not assign task', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-white/40" />
      </div>
    );
  }

  const renderTask = (task: JobTask) => (
    <div
      key={task.id}
      className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3 space-y-2"
    >
      <div className="flex items-start gap-2">
        <span className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', priorityDot[task.priority])} />
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-[13px] font-medium text-white leading-snug',
              task.status === 'Done' && 'line-through text-white/50'
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-[11.5px] text-white/50 mt-0.5 line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => deleteTask.mutate(task.id)}
          className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full text-white/40 hover:text-red-400 hover:bg-red-500/10 touch-manipulation"
          aria-label="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleCycle(task)}
          className={cn(
            'h-8 px-3 rounded-full text-[11px] font-semibold touch-manipulation transition-colors',
            statusStyles[task.status]
          )}
        >
          {task.status}
        </button>
        <Select
          value={task.assignee_employee_id || 'unassigned'}
          onValueChange={(v) => handleAssign(task, v)}
        >
          <SelectTrigger className="h-8 w-auto min-w-[110px] px-3 rounded-full text-[11px] bg-white/[0.04] border-white/[0.08] touch-manipulation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {crew.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isOverdue(task) && (
          <Badge className="border-0 text-[10px] bg-red-500/20 text-red-400">
            <CalendarClock className="h-3 w-3 mr-0.5" />
            Overdue
          </Badge>
        )}
        <button
          type="button"
          onClick={() => setCommentsFor(task)}
          className="ml-auto h-8 w-8 flex items-center justify-center rounded-full text-white/50 hover:text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
          aria-label="Comments"
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </button>
      </div>
      <TaskPhotoStrip photos={task.photos} />
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Add ticket */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className="h-9 px-3 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[11.5px] font-semibold touch-manipulation flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Break the job down
          </button>
        </div>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a task…"
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
        />
        {newTitle.trim() && (
          <div className="flex gap-2">
            <Select value={newAssignee} onValueChange={setNewAssignee}>
              <SelectTrigger className="h-10 flex-1 touch-manipulation bg-elec-gray border-elec-gray text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {crew.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={newPriority} onValueChange={(v) => setNewPriority(v as TaskPriority)}>
              <SelectTrigger className="h-10 w-28 touch-manipulation bg-elec-gray border-elec-gray text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                {(['Low', 'Medium', 'High', 'Urgent'] as TaskPriority[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="h-10 w-36 touch-manipulation bg-elec-gray border-elec-gray text-[12.5px]"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={createTask.isPending}
              className="h-10 px-4 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold touch-manipulation disabled:opacity-50"
            >
              {createTask.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {tasks.length === 0 ? (
        <p className="text-[12px] text-white/40 text-center py-3">
          No tasks yet — break the job down and assign the crew.
        </p>
      ) : (
        <>
          {(['Todo', 'In Progress', 'Blocked'] as TaskStatus[]).map(
            (status) =>
              grouped[status].length > 0 && (
                <div key={status} className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                    {status} · {grouped[status].length}
                  </p>
                  {grouped[status].map(renderTask)}
                </div>
              )
          )}
          {grouped.Done.length > 0 && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowDone((v) => !v)}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium touch-manipulation"
              >
                Done · {grouped.Done.length}
                <ChevronDown
                  className={cn('h-3 w-3 transition-transform', showDone && 'rotate-180')}
                />
              </button>
              {showDone && grouped.Done.map(renderTask)}
            </div>
          )}
          <p className="text-[11px] text-white/30">
            {openCount} open · workers see their tickets in Worker Tools and get a push when
            assigned
          </p>
        </>
      )}

      <TaskCommentsSheet
        task={commentsFor}
        onClose={() => setCommentsFor(null)}
        authorName={employerAuthorName}
      />

      <Sheet open={aiOpen} onOpenChange={setAiOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="px-4 pt-4 pb-3 flex-shrink-0">
              <SheetTitle className="text-left text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                Break the job down
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              <Textarea
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
                placeholder={
                  'Describe the job — e.g. "Full rewire of a 3-bed semi. First fix week one, second fix week two, board change, then test and certify. Two operatives and an apprentice."'
                }
                rows={4}
                className="touch-manipulation text-base min-h-[110px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
              <button
                type="button"
                onClick={handleAiPropose}
                disabled={aiLoading || aiDescription.trim().length < 10}
                className="h-11 w-full rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {aiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {proposals.length > 0 ? 'Propose again' : 'Propose tasks'}
              </button>

              {proposals.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                    Proposed · untick anything you don't want
                  </p>
                  {proposals.map((p, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'rounded-xl border p-3 space-y-2 transition-opacity',
                        p.include
                          ? 'bg-[hsl(0_0%_11%)] border-white/[0.08]'
                          : 'bg-[hsl(0_0%_9%)] border-white/[0.04] opacity-50'
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <Checkbox
                          checked={p.include}
                          onCheckedChange={(v) =>
                            setProposals((prev) =>
                              prev.map((x, i) => (i === idx ? { ...x, include: !!v } : x))
                            )
                          }
                          className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium text-white leading-snug">
                            {idx + 1}. {p.title}
                          </p>
                          <p className="text-[11.5px] text-white/50 mt-0.5">{p.description}</p>
                        </div>
                        <span
                          className={cn(
                            'shrink-0 mt-1 h-2 w-2 rounded-full',
                            priorityDot[p.priority] || 'bg-blue-400'
                          )}
                        />
                      </div>
                      {p.include && (
                        <Select
                          value={p.assignee}
                          onValueChange={(v) =>
                            setProposals((prev) =>
                              prev.map((x, i) => (i === idx ? { ...x, assignee: v } : x))
                            )
                          }
                        >
                          <SelectTrigger className="h-9 w-full touch-manipulation bg-elec-gray border-elec-gray text-[12px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="unassigned">
                              Unassigned ({p.suggested_role} suggested)
                            </SelectItem>
                            {crew.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {proposals.length > 0 && (
              <div className="flex-shrink-0 border-t border-white/[0.06] p-4 pb-safe">
                <button
                  type="button"
                  onClick={handleAiCreate}
                  disabled={aiCreating || proposals.filter((p) => p.include).length === 0}
                  className="h-12 w-full rounded-xl bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {aiCreating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Create {proposals.filter((p) => p.include).length} task
                  {proposals.filter((p) => p.include).length === 1 ? '' : 's'}
                </button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default JobTasksPanel;
