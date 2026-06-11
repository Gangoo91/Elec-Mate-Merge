import { useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  useMyTasks,
  useUpForGrabsTasks,
  useUpdateTask,
  useTaskComments,
  useAddTaskComment,
  uploadTaskPhoto,
  useTaskPhotoUrls,
  type JobTask,
  type TaskStatus,
} from '@/hooks/useJobTasks';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';

/* ==========================================================================
   MyTasksSheet — the sparky's ticket list.

   Tasks grouped by job; tap one for the detail view: flip status (In
   Progress / Blocked / Done), write back what the craic was, attach photos
   straight from the camera. Everything lands on the employer's board in
   realtime and rings their bell on Done/Blocked.
   ========================================================================== */

const statusStyles: Record<TaskStatus, string> = {
  Todo: 'bg-white/[0.08] text-white',
  'In Progress': 'bg-blue-500/20 text-blue-400',
  Blocked: 'bg-red-500/20 text-red-400',
  Done: 'bg-emerald-500/20 text-emerald-400',
};

function TaskPhotoGrid({ photos }: { photos: string[] }) {
  const { data: urls = [] } = useTaskPhotoUrls(photos);
  return (
    <div className="grid grid-cols-3 gap-2">
      {urls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noreferrer">
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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MyTasksSheet({ open, onOpenChange }: Props) {
  const { data: tasks = [], isLoading } = useMyTasks();
  const { data: grabsPool = [] } = useUpForGrabsTasks();
  const { data: me } = useMyEmployeeRecord();
  const updateTask = useUpdateTask();
  const addComment = useAddTaskComment();
  const [selected, setSelected] = useState<JobTask | null>(null);
  const [comment, setComment] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: comments = [] } = useTaskComments(selected?.id);

  // Keep the selected task fresh as realtime updates arrive
  const liveSelected = useMemo(
    () => (selected ? (tasks.find((t) => t.id === selected.id) ?? selected) : null),
    [selected, tasks]
  );

  const byJob = useMemo(() => {
    const groups = new Map<string, { jobTitle: string; items: JobTask[] }>();
    tasks.forEach((t) => {
      const key = t.job_id;
      if (!groups.has(key)) {
        groups.set(key, { jobTitle: t.job?.title || 'Job', items: [] });
      }
      groups.get(key)!.items.push(t);
    });
    return Array.from(groups.values());
  }, [tasks]);

  const openCount = tasks.filter((t) => t.status !== 'Done').length;

  const handleClaim = async (task: JobTask) => {
    if (!me?.id) return;
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { assignee_employee_id: me.id, status: 'In Progress' },
      });
      toast.success(`You're on it — "${task.title}"`);
    } catch {
      toast.error('Could not claim the task');
    }
  };

  const setStatus = async (task: JobTask, status: TaskStatus) => {
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
    if (!liveSelected || !comment.trim() || !me?.name) return;
    try {
      await addComment.mutateAsync({
        taskId: liveSelected.id,
        jobId: liveSelected.job_id,
        authorName: me.name,
        content: comment,
      });
      setComment('');
    } catch {
      toast.error('Could not send the comment');
    }
  };

  const queryClientForPhotos = useQueryClient();
  const handlePhoto = async (file: File | undefined) => {
    if (!file || !liveSelected) return;
    setUploading(true);
    try {
      await uploadTaskPhoto(liveSelected.id, file); // appends server-side, no clobber
      queryClientForPhotos.invalidateQueries({ queryKey: ['my-tasks'] });
      toast.success('Photo added');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload the photo');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) setSelected(null);
        onOpenChange(v);
      }}
    >
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {!liveSelected ? (
            <>
              <SheetHeader className="px-4 pb-3 flex-shrink-0">
                <SheetTitle className="text-left text-base">
                  My Tasks{openCount > 0 ? ` · ${openCount} open` : ''}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-5">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-10 w-10 text-white/30 mx-auto mb-3" />
                    <p className="text-sm text-white/60">
                      No tasks assigned. When the office gives you a ticket it lands here with a
                      push to your phone.
                    </p>
                  </div>
                ) : (
                  byJob.map((group) => (
                    <div key={group.jobTitle} className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                        {group.jobTitle}
                      </p>
                      {group.items.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => setSelected(task)}
                          className="w-full text-left rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5 touch-manipulation active:scale-[0.99] transition-transform"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={cn(
                                'text-[13.5px] font-medium text-white leading-snug',
                                task.status === 'Done' && 'line-through text-white/50'
                              )}
                            >
                              {task.title}
                            </p>
                            <Badge
                              className={cn(
                                'border-0 text-[10.5px] shrink-0',
                                statusStyles[task.status]
                              )}
                            >
                              {task.status}
                            </Badge>
                          </div>
                          {task.description && (
                            <p className="text-[11.5px] text-white/50 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-white/40">
                            <span>{task.priority} priority</span>
                            {task.due_date && (
                              <span>
                                · due{' '}
                                {new Date(task.due_date).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            )}
                            {task.photos.length > 0 && <span>· {task.photos.length} photos</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  ))
                )}

                {grabsPool.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-elec-yellow/70 font-medium">
                      Up for grabs
                    </p>
                    {grabsPool.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-xl bg-elec-yellow/[0.04] border border-elec-yellow/20 p-3.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[13.5px] font-medium text-white leading-snug">
                              {task.title}
                            </p>
                            <p className="text-[11px] text-white/50 mt-0.5">
                              {task.job?.title} · {task.priority} priority
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleClaim(task)}
                            disabled={updateTask.isPending}
                            className="h-9 px-3.5 shrink-0 rounded-full bg-elec-yellow text-black text-[11.5px] font-semibold touch-manipulation disabled:opacity-50"
                          >
                            I'll take it
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="px-4 pb-3 flex-shrink-0 flex items-center gap-2 border-b border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="h-10 w-10 -ml-2 flex items-center justify-center rounded-full text-white touch-manipulation"
                  aria-label="Back to list"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white truncate">
                    {liveSelected.title}
                  </p>
                  <p className="text-[11px] text-white/50 truncate">
                    {liveSelected.job?.title}
                    {liveSelected.job?.location ? ` · ${liveSelected.job.location}` : ''}
                  </p>
                </div>
                <Badge className={cn('border-0 text-[10.5px]', statusStyles[liveSelected.status])}>
                  {liveSelected.status}
                </Badge>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                {liveSelected.description && (
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    {liveSelected.description}
                  </p>
                )}

                {/* Status actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus(liveSelected, 'In Progress')}
                    disabled={updateTask.isPending || liveSelected.status === 'In Progress'}
                    className="h-12 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[12px] font-semibold touch-manipulation disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Start
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(liveSelected, 'Blocked')}
                    disabled={updateTask.isPending || liveSelected.status === 'Blocked'}
                    className="h-12 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-[12px] font-semibold touch-manipulation disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Blocked
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(liveSelected, 'Done')}
                    disabled={updateTask.isPending || liveSelected.status === 'Done'}
                    className="h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[12px] font-semibold touch-manipulation disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Done
                  </button>
                </div>

                {/* Photos */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                      Photos
                    </p>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="h-9 px-3 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[11.5px] font-semibold touch-manipulation flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {uploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Camera className="h-3.5 w-3.5" />
                      )}
                      Add photo
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
                  {liveSelected.photos.length === 0 ? (
                    <p className="text-[11.5px] text-white/30">
                      Show the office what the craic is — snap it as you go.
                    </p>
                  ) : (
                    <TaskPhotoGrid photos={liveSelected.photos} />
                  )}
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                    Updates
                  </p>
                  {comments.length === 0 ? (
                    <p className="text-[11.5px] text-white/30">No updates yet.</p>
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
                        <p className="text-[12.5px] text-white/80 whitespace-pre-wrap">
                          {c.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Comment composer */}
              <div className="flex-shrink-0 border-t border-white/[0.06] p-3 pb-safe flex gap-2">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write back what the craic is…"
                  rows={1}
                  className="touch-manipulation text-base min-h-[44px] max-h-28 resize-none border-white/30 focus:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={handleComment}
                  disabled={!comment.trim() || addComment.isPending}
                  className="h-11 w-11 shrink-0 rounded-xl bg-elec-yellow text-black flex items-center justify-center touch-manipulation disabled:opacity-40"
                  aria-label="Send update"
                >
                  {addComment.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MyTasksSheet;
