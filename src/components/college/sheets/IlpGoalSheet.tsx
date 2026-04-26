import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Wand2, RotateCw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  IlpGoal,
  GoalCategory,
  GoalPriority,
  StudentIlpHook,
} from '@/hooks/useStudentIlp';
import { useSuggestIlpGoal, type IlpGoalProposal } from '@/hooks/useSuggestIlpGoal';

/* ==========================================================================
   IlpGoalSheet — add or edit a single ILP goal.
   ========================================================================== */

const CATEGORIES: { value: GoalCategory; label: string }[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'skills', label: 'Skills' },
  { value: 'employability', label: 'Employability' },
  { value: 'behavioural', label: 'Behaviour' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'wellbeing', label: 'Wellbeing' },
  { value: 'other', label: 'Other' },
];

const PRIORITIES: { value: GoalPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  goal: IlpGoal | null;
  addGoal: StudentIlpHook['addGoal'];
  updateGoal: StudentIlpHook['updateGoal'];
  removeGoal: StudentIlpHook['removeGoal'];
  /** Required for AI suggestions; if absent, AI buttons hide. */
  collegeStudentId?: string | null;
  /** When opening from a weak AC, pre-fill the AI in from_ac mode. */
  acContext?: { unit_code: string; ac_code: string } | null;
}

interface FormState {
  title: string;
  description: string;
  acceptance_criteria: string;
  category: GoalCategory;
  priority: GoalPriority;
  target_date: string;
  tutor_comment: string;
}

function fromGoal(g: IlpGoal | null): FormState {
  return {
    title: g?.title ?? '',
    description: g?.description ?? '',
    acceptance_criteria: g?.acceptance_criteria ?? '',
    category: g?.category ?? 'academic',
    priority: g?.priority ?? 'medium',
    target_date: g?.target_date ?? '',
    tutor_comment: g?.tutor_comment ?? '',
  };
}

export function IlpGoalSheet({
  open,
  onOpenChange,
  mode,
  goal,
  addGoal,
  updateGoal,
  removeGoal,
  collegeStudentId,
  acContext,
}: Props) {
  const [form, setForm] = useState<FormState>(fromGoal(goal));
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [refining, setRefining] = useState(false);
  const ai = useSuggestIlpGoal();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setForm(fromGoal(goal));
      setSavedTick(false);
      setShowProposals(false);
      ai.reset();
      // Auto-trigger from_ac mode when opened with AC context and no existing goal
      if (mode === 'add' && acContext && collegeStudentId) {
        setShowProposals(true);
        void ai.suggest({
          collegeStudentId,
          mode: 'from_ac',
          ac_code: acContext.ac_code,
          unit_code: acContext.unit_code,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, goal, mode, acContext?.ac_code, acContext?.unit_code, collegeStudentId]);

  const handleSuggestFresh = () => {
    if (!collegeStudentId) return;
    setShowProposals(true);
    void ai.suggest({ collegeStudentId, mode: 'fresh', count: 3 });
  };

  const handleRefine = async () => {
    if (!collegeStudentId || !form.title.trim()) return;
    setRefining(true);
    try {
      await ai.suggest({ collegeStudentId, mode: 'refine', draft: form.title.trim() });
    } finally {
      setRefining(false);
    }
  };

  // When refine returns a single proposal, auto-apply it inline + close any
  // stale Suggest panel.
  useEffect(() => {
    if (ai.status !== 'done' || ai.meta?.mode !== 'refine') return;
    const p = ai.proposals[0];
    if (!p) return;
    setForm((f) => ({
      ...f,
      title: p.title,
      description: p.description,
      acceptance_criteria: p.acceptance_criteria ?? f.acceptance_criteria,
      target_date: p.target_date || f.target_date,
      category: p.category ?? f.category,
      priority: p.priority ?? f.priority,
    }));
    setShowProposals(false);
    toast({ title: 'Refined', description: 'Goal rewritten as a SMART draft.' });
    ai.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.status]);

  const acceptProposal = (p: IlpGoalProposal) => {
    setForm({
      title: p.title,
      description: p.description,
      acceptance_criteria: p.acceptance_criteria ?? '',
      category: p.category,
      priority: p.priority,
      target_date: p.target_date ?? '',
      tutor_comment: '',
    });
    setShowProposals(false);
    ai.reset();
  };

  const valid = form.title.trim().length > 0;

  const handleSave = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const tutorCommentChanged =
        (goal?.tutor_comment ?? '') !== form.tutor_comment.trim();
      if (mode === 'add') {
        await addGoal({
          title: form.title.trim(),
          description: form.description.trim() || null,
          acceptance_criteria: form.acceptance_criteria.trim() || null,
          category: form.category,
          priority: form.priority,
          target_date: form.target_date || null,
        });
      } else if (goal) {
        await updateGoal(goal.id, {
          title: form.title.trim(),
          description: form.description.trim() || null,
          acceptance_criteria: form.acceptance_criteria.trim() || null,
          category: form.category,
          priority: form.priority,
          target_date: form.target_date || null,
          ...(tutorCommentChanged
            ? {
                tutor_comment: form.tutor_comment.trim() || null,
                tutor_comment_at: new Date().toISOString(),
              }
            : {}),
        });
      }
      setSavedTick(true);
      toast({
        title: mode === 'add' ? 'Goal added' : 'Goal updated',
        description: form.title.trim(),
      });
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 600);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!goal) return;
    const ok = window.confirm(`Remove the goal "${goal.title}"? The learner will no longer see it.`);
    if (!ok) return;
    try {
      await removeGoal(goal.id);
      toast({ title: 'Goal removed' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not delete',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow={mode === 'add' ? 'New goal' : 'Edit goal'}
          title={mode === 'add' ? 'Add ILP goal' : (goal?.title ?? 'Goal')}
          description="Goals appear in the learner's app. They can tick them off and reply."
          footer={
            <>
              {mode === 'edit' && goal ? (
                <DestructiveButton onClick={handleDelete} disabled={saving} fullWidth>
                  Delete
                </DestructiveButton>
              ) : (
                <SecondaryButton
                  onClick={() => onOpenChange(false)}
                  disabled={saving}
                  fullWidth
                >
                  Cancel
                </SecondaryButton>
              )}
              <PrimaryButton
                onClick={handleSave}
                disabled={!valid || saving}
                fullWidth
                className="relative"
              >
                {saving ? 'Saving…' : mode === 'add' ? 'Add goal' : 'Save'}
                <SuccessCheckmark show={savedTick} />
              </PrimaryButton>
            </>
          }
        >
          {mode === 'add' && collegeStudentId && (
            <ProposalsPanel
              open={showProposals}
              onClose={() => {
                setShowProposals(false);
                ai.reset();
              }}
              onSuggest={handleSuggestFresh}
              status={ai.status}
              proposals={ai.status === 'done' && ai.meta?.mode !== 'refine' ? ai.proposals : []}
              error={ai.error}
              onAccept={acceptProposal}
            />
          )}

          <FormCard>
            <Field
              label="Title"
              required
              hint={
                mode === 'add' && collegeStudentId && form.title.trim().length > 4
                  ? 'Use AI to rewrite as a SMART goal.'
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Submit Unit 4 portfolio evidence"
                  className={inputClass}
                />
                {mode === 'add' && collegeStudentId && form.title.trim().length > 4 && (
                  <button
                    type="button"
                    onClick={handleRefine}
                    disabled={refining}
                    title="Rewrite as a SMART goal"
                    className="inline-flex items-center justify-center h-10 px-3 rounded-xl bg-elec-yellow/[0.10] border border-elec-yellow/30 text-elec-yellow text-[11.5px] font-semibold hover:bg-elec-yellow/[0.18] disabled:opacity-50 transition-colors touch-manipulation flex-shrink-0"
                  >
                    {refining ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" strokeWidth={2.5} />}
                  </button>
                )}
              </div>
            </Field>
            <Field label="Description" hint="What does success look like?">
              <textarea
                value={form.description}
                rows={3}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Detail for the learner. They'll see this in their app."
                className={textareaClass}
              />
            </Field>
            <Field label="Acceptance criteria" hint="Optional — how we'll know it's done.">
              <textarea
                value={form.acceptance_criteria}
                rows={2}
                onChange={(e) =>
                  setForm((f) => ({ ...f, acceptance_criteria: e.target.value }))
                }
                placeholder="e.g. 3 photos + reflection, signed by supervisor"
                className={textareaClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Classification">
            <FormGrid cols={3}>
              <Field label="Category" required>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, category: v as GoalCategory }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Priority">
                <Select
                  value={form.priority}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, priority: v as GoalPriority }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Target date">
                <input
                  type="date"
                  value={form.target_date}
                  onChange={(e) => setForm((f) => ({ ...f, target_date: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          {mode === 'edit' && goal && (
            <FormCard eyebrow="Conversation">
              {goal.student_comment && (
                <div className="bg-blue-500/[0.05] border border-blue-500/[0.18] rounded-xl px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-blue-300/85 mb-1">
                    Learner reply
                    {goal.student_comment_at && (
                      <span className="ml-2 text-white/45 normal-case tracking-normal tabular-nums">
                        {new Date(goal.student_comment_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">
                    {goal.student_comment}
                  </p>
                </div>
              )}
              <Field
                label="Your comment"
                hint="The learner will see this on the goal in their app."
              >
                <textarea
                  value={form.tutor_comment}
                  rows={3}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tutor_comment: e.target.value }))
                  }
                  placeholder="Reply to the learner, set expectations, or leave guidance."
                  className={textareaClass}
                />
              </Field>
            </FormCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ────────────────────────────────────────────────────────
   ProposalsPanel — sits at the top of the form when the
   tutor opts to use AI suggestions.
   ──────────────────────────────────────────────────────── */

const CATEGORY_LABEL: Record<string, string> = {
  academic: 'Academic',
  skills: 'Skills',
  employability: 'Employability',
  behavioural: 'Behaviour',
  attendance: 'Attendance',
  wellbeing: 'Wellbeing',
  other: 'Other',
};

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-elec-yellow',
  low: 'bg-white/40',
};

function ProposalsPanel({
  open,
  onClose,
  onSuggest,
  status,
  proposals,
  error,
  onAccept,
}: {
  open: boolean;
  onClose: () => void;
  onSuggest: () => void;
  status: 'idle' | 'loading' | 'done' | 'error';
  proposals: IlpGoalProposal[];
  error: string | null;
  onAccept: (p: IlpGoalProposal) => void;
}) {
  if (!open) {
    return (
      <div className="rounded-2xl border border-elec-yellow/[0.18] bg-elec-yellow/[0.04] px-5 py-4 flex items-center gap-3">
        <Wand2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            AI suggest
          </div>
          <p className="mt-0.5 text-[12px] text-white/85 leading-snug">
            Let AI propose 3 SMART goals from this learner's data — pick one and edit before saving.
          </p>
        </div>
        <button
          type="button"
          onClick={onSuggest}
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation flex-shrink-0"
        >
          <Wand2 className="h-3 w-3" strokeWidth={2.5} />
          Suggest
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-elec-yellow/[0.20] bg-elec-yellow/[0.05] px-5 py-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 inline-flex items-center gap-1.5">
          <Wand2 className="h-3 w-3" strokeWidth={2.5} />
          AI proposals
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/55 hover:text-white touch-manipulation"
          aria-label="Close proposals"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {status === 'loading' && (
        <div className="space-y-2.5 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-white/[0.04] bg-[hsl(0_0%_12%)] px-4 py-3">
              <div className="h-2.5 w-1/3 rounded bg-white/[0.06]" />
              <div className="mt-2 h-2 w-2/3 rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-200">
          {error ?? 'Could not generate proposals.'}
        </div>
      )}

      {status === 'done' && proposals.length === 0 && (
        <p className="text-[12px] text-white/65">
          No proposals returned. Try again, or write a goal manually below.
        </p>
      )}

      {status === 'done' &&
        proposals.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAccept(p)}
            className="w-full text-left rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-white/[0.04] hover:border-elec-yellow/40 px-4 py-3 transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span aria-hidden className={cn('inline-block h-1.5 w-1.5 rounded-full', PRIORITY_DOT[p.priority] ?? 'bg-white/40')} />
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/65">
                {CATEGORY_LABEL[p.category] ?? p.category} · {p.priority}
              </span>
              {p.target_date && (
                <span className="text-[10.5px] text-white/55 tabular-nums ml-auto">Due {p.target_date}</span>
              )}
              {p.ac_link && (
                <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-blue-200">
                  AC {p.ac_link}
                </span>
              )}
            </div>
            <h4 className="mt-1 text-[13.5px] font-semibold text-white leading-tight">{p.title}</h4>
            {p.description && (
              <p className="mt-1 text-[11.5px] text-white/85 leading-snug line-clamp-3">{p.description}</p>
            )}
            {p.rationale && (
              <p className="mt-2 pt-2 border-t border-white/[0.04] text-[10.5px] text-white/55 leading-snug italic">
                Why: {p.rationale}
              </p>
            )}
          </button>
        ))}

      {status === 'done' && (
        <button
          type="button"
          onClick={onSuggest}
          className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-full bg-white/[0.04] border border-white/[0.10] text-white/85 text-[11.5px] font-semibold hover:bg-white/[0.08] touch-manipulation"
        >
          <RotateCw className="h-3 w-3" />
          Re-suggest
        </button>
      )}
    </div>
  );
}
