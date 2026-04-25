import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
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
}: Props) {
  const [form, setForm] = useState<FormState>(fromGoal(goal));
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setForm(fromGoal(goal));
      setSavedTick(false);
    }
  }, [open, goal]);

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
          <FormCard>
            <Field label="Title" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Submit Unit 4 portfolio evidence"
                className={inputClass}
              />
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
