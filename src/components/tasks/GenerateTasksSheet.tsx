import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SaveTaskInput } from '@/hooks/useSparkTasks';

/**
 * Generate a task list for a job (ELE-1073 follow-up).
 *
 * The `breakdown-job-tasks` edge function has existed since ELE-1073 but was
 * only ever wired into the Employer Hub, so an electrician working on their own
 * — the larger group — had no way to reach it and typed every task by hand.
 *
 * This matters beyond convenience. 224 of 265 open tasks carry no project, so
 * the task list cannot be organised by job however it is laid out. Tasks
 * generated here arrive already attached to one, which is what makes a
 * job-grouped view possible later.
 *
 * AI proposes, the electrician disposes: nothing is written until they have
 * seen the list and unticked what they do not want.
 */

interface Proposal {
  title: string;
  description?: string;
  priority?: string;
  include: boolean;
}

interface GenerateTasksSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Attach everything created to this project, when opened from one. */
  projectId?: string;
  projectTitle?: string;
  /** Pre-fills the description so an existing job needs no typing at all. */
  initialDescription?: string;
  /** Extra job facts passed to the planner — customer, site, value, dates.
   *  Without these it plans a generic job of that type rather than this one. */
  jobContext?: string;
  onCreate: (tasks: SaveTaskInput[]) => Promise<void>;
}

const EXAMPLES = [
  'EV charger install, 7kW, detached house, existing board',
  'Consumer unit replacement, 1930s semi, 8 circuits',
  'EICR on a 3-bed rental, full test and report',
];

export function GenerateTasksSheet({
  open,
  onOpenChange,
  projectId,
  projectTitle,
  initialDescription,
  jobContext,
  onCreate,
}: GenerateTasksSheetProps) {
  const [description, setDescription] = useState(initialDescription ?? '');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const chosen = proposals.filter((p) => p.include);

  const handlePropose = async () => {
    if (description.trim().length < 10) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('breakdown-job-tasks', {
        body: {
          description: description.trim(),
          jobTitle: projectTitle,
          jobContext,
        },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      const list = (data?.tasks ?? []) as { title: string; description?: string; priority?: string }[];
      if (list.length === 0) {
        toast({
          title: 'Nothing came back',
          description: 'Try describing the job with a bit more detail.',
        });
        return;
      }
      setProposals(list.map((t) => ({ ...t, include: true })));
    } catch (err) {
      toast({
        title: 'Could not break the job down',
        description: err instanceof Error ? err.message : 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (chosen.length === 0) return;
    setCreating(true);
    try {
      await onCreate(
        chosen.map((p) => ({
          title: p.title,
          details: p.description || undefined,
          // The function returns Capitalised employer-side priorities
          // ('Low' | 'Medium' | 'High' | 'Urgent'), so this has to lower-case
          // before comparing — matching on 'high' against 'High' silently made
          // every generated task normal. Anything we do not recognise becomes
          // normal rather than guessing at urgency.
          priority:
            (p.priority ?? '').toLowerCase() === 'urgent'
              ? 'urgent'
              : (p.priority ?? '').toLowerCase() === 'high'
                ? 'high'
                : 'normal',
          projectId,
        })) as SaveTaskInput[]
      );
      toast({
        title: `${chosen.length} ${chosen.length === 1 ? 'task' : 'tasks'} added`,
        description: projectTitle ? `Attached to ${projectTitle}` : undefined,
      });
      handleClose();
    } catch {
      toast({ title: 'Some tasks could not be created', variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    setProposals([]);
    setDescription(initialDescription ?? '');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => (o ? onOpenChange(true) : handleClose())}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl bg-[#111114] p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-4">
            <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">
              Plan this job
            </SheetTitle>
            {projectTitle && <p className="text-[13px] text-white">{projectTitle}</p>}
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">
                Describe the job
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="e.g. EV charger install, 7kW, detached house, existing board"
                className="w-full rounded-xl border border-white/[0.14] bg-white/[0.04] p-3 text-[15px] text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
              {proposals.length === 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setDescription(ex)}
                      className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-left text-[12px] text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {proposals.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">
                    Suggested tasks
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setProposals((prev) => {
                        const allOn = prev.every((p) => p.include);
                        return prev.map((p) => ({ ...p, include: !allOn }));
                      })
                    }
                    className="text-[13px] font-semibold text-elec-yellow underline underline-offset-2 touch-manipulation"
                  >
                    {proposals.every((p) => p.include) ? 'Clear all' : 'Select all'}
                  </button>
                </div>
                <p className="text-[12px] text-white">
                  Untick anything that does not apply. You can edit them afterwards.
                </p>
                <div className="divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/[0.14] bg-white/[0.04]">
                  {proposals.map((p, i) => (
                    <button
                      key={`${p.title}-${i}`}
                      type="button"
                      onClick={() =>
                        setProposals((prev) =>
                          prev.map((q, j) => (i === j ? { ...q, include: !q.include } : q))
                        )
                      }
                      className="flex w-full items-start gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.04] touch-manipulation"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[11px] font-bold transition-colors',
                          p.include
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/40 text-transparent'
                        )}
                      >
                        ✓
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn('block text-[14px] font-semibold text-white', !p.include && 'opacity-50')}>
                          {p.title}
                        </span>
                        {p.description && (
                          <span className={cn('mt-0.5 block text-[12px] text-white', !p.include && 'opacity-50')}>
                            {p.description}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 border-t border-white/[0.08] px-4 pb-6 pt-3">
            {proposals.length === 0 ? (
              <button
                type="button"
                onClick={handlePropose}
                disabled={description.trim().length < 10 || loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Working it out…
                  </>
                ) : (
                  'Suggest tasks'
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProposals([])}
                  className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.99]"
                >
                  Start again
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={chosen.length === 0 || creating}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding…
                    </>
                  ) : (
                    `Add ${chosen.length} ${chosen.length === 1 ? 'task' : 'tasks'}`
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
