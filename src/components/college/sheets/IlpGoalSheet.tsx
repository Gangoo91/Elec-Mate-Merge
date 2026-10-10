import { useEffect, useState, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  fieldFullCn,
  grid2Cn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SuccessCheckmark } from '@/components/college/primitives';
import type { IlpGoal, GoalCategory, GoalPriority, StudentIlpHook } from '@/hooks/useStudentIlp';
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
      const tutorCommentChanged = (goal?.tutor_comment ?? '') !== form.tutor_comment.trim();
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
    const ok = window.confirm(
      `Remove the goal "${goal.title}"? The learner will no longer see it.`
    );
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

  const showAi = mode === 'add' && !!collegeStudentId;
  const canRefine = showAi && form.title.trim().length > 4;
  const hasAside = showAi || (mode === 'edit' && !!goal);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName={cn(
        'grid grid-cols-1 items-start gap-x-10 gap-y-7',
        hasAside && 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'
      )}
      eyebrow={mode === 'add' ? 'New goal' : 'Edit goal'}
      title={mode === 'add' ? 'Add ILP goal' : (goal?.title ?? 'Goal')}
      description="Goals appear in the learner's app. They can tick them off and reply."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          {mode === 'edit' && goal ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className={cn(buttonSecondaryCn, 'text-red-300 hover:border-red-400/50')}
            >
              Delete goal
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!valid || saving}
            className={cn(buttonPrimaryCn, 'relative')}
          >
            {saving ? 'Saving…' : !valid ? 'Add a title' : mode === 'add' ? 'Add goal' : 'Save'}
          </button>
        </div>
      }
    >
      {/* ── The goal ── */}
      <div className="space-y-7">
        <Section title="The goal">
          <div>
            <label htmlFor="ilp-title" className={labelCn}>
              Title *
            </label>
            <div className="flex items-end gap-3">
              <input
                id="ilp-title"
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Submit Unit 4 portfolio evidence"
                className={inputCn}
              />
              {canRefine && (
                <button
                  type="button"
                  onClick={handleRefine}
                  disabled={refining}
                  title="Rewrite as a SMART goal"
                  className="inline-flex h-11 shrink-0 items-center px-1 text-[13px] font-semibold text-elec-yellow disabled:opacity-50 touch-manipulation"
                >
                  {refining ? 'Rewriting…' : 'Make it SMART'}
                </button>
              )}
            </div>
            {canRefine && (
              <p className={hintCn}>
                Make it SMART rewrites your title as a specific, dated goal you can edit.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ilp-desc" className={labelCn}>
              Description
            </label>
            <textarea
              id="ilp-desc"
              value={form.description}
              rows={3}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What does success look like? The learner sees this in their app."
              className={textareaCn}
            />
          </div>
          <div>
            <label htmlFor="ilp-criteria" className={labelCn}>
              Acceptance criteria (optional)
            </label>
            <textarea
              id="ilp-criteria"
              value={form.acceptance_criteria}
              rows={2}
              onChange={(e) => setForm((f) => ({ ...f, acceptance_criteria: e.target.value }))}
              placeholder="e.g. 3 photos and a reflection, signed by supervisor"
              className={textareaCn}
            />
            <p className={hintCn}>How you will both know it is done.</p>
          </div>
        </Section>

        <Section title="Classification">
          <div className={grid2Cn}>
            <div>
              <span className={labelCn}>Category *</span>
              <MobileSelectPicker
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v as GoalCategory }))}
                options={CATEGORIES}
                title="Category"
                triggerClassName={selectTriggerCn}
              />
            </div>
            <div>
              <label htmlFor="ilp-target" className={labelCn}>
                Target date
              </label>
              <input
                id="ilp-target"
                type="date"
                value={form.target_date}
                onChange={(e) => setForm((f) => ({ ...f, target_date: e.target.value }))}
                className={inputCn}
              />
            </div>
            <div className={fieldFullCn}>
              <span className={labelCn}>Priority</span>
              <div className="grid grid-cols-3 gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    aria-pressed={form.priority === p.value}
                    onClick={() => setForm((f) => ({ ...f, priority: p.value }))}
                    className={cn(chipBase, form.priority === p.value ? chipOn : chipOff)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Aside: AI ideas when adding, the conversation when editing ── */}
      {showAi && (
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

      {mode === 'edit' && goal && (
        <Section top title="Conversation">
          {goal.student_comment ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3">
              <p className="text-[12px] font-semibold text-white">
                Learner reply
                {goal.student_comment_at && (
                  <span className="ml-2 font-normal tabular-nums text-white">
                    {new Date(goal.student_comment_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                )}
              </p>
              <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-white">
                {goal.student_comment}
              </p>
            </div>
          ) : (
            <p className="text-[13px] leading-relaxed text-white">
              The learner has not replied on this goal yet.
            </p>
          )}
          <div>
            <label htmlFor="ilp-comment" className={labelCn}>
              Your comment
            </label>
            <textarea
              id="ilp-comment"
              value={form.tutor_comment}
              rows={4}
              onChange={(e) => setForm((f) => ({ ...f, tutor_comment: e.target.value }))}
              placeholder="Reply to the learner, set expectations, or leave guidance."
              className={textareaCn}
            />
            <p className={hintCn}>The learner sees this on the goal in their app.</p>
          </div>
        </Section>
      )}
      <SuccessCheckmark show={savedTick} />
    </FormSheet>
  );
}

const hintCn = 'mt-1.5 text-[12px] leading-relaxed text-white';

/** A plain section inside the sheet: white heading over a hairline. */
function Section({
  title,
  aside,
  top,
  children,
}: {
  title: string;
  aside?: ReactNode;
  /** Heads the right-hand column on desktop, so no rule above it there. */
  top?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0',
        top && 'lg:border-t-0 lg:pt-0'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   ProposalsPanel — the AI ideas, beside the form on desktop
   and above the save on a phone.
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

const PRIORITY_LABEL: Record<string, string> = { high: 'High', medium: 'Medium', low: 'Low' };

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
      <Section top title="Need a starting point?">
        <p className="text-[13px] leading-relaxed text-white">
          Three SMART goals proposed from this learner's data. Pick one and edit it before you save.
        </p>
        <button type="button" onClick={onSuggest} className={cn(buttonSecondaryCn, 'w-full')}>
          Suggest three goals
        </button>
      </Section>
    );
  }

  return (
    <Section
      top
      title="Suggested goals"
      aside={
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
        >
          Hide
        </button>
      }
    >
      {status === 'loading' && (
        <div className="space-y-2.5 animate-pulse" aria-label="Thinking">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-4"
            >
              <div className="h-2.5 w-1/3 rounded bg-white/[0.08]" />
              <div className="mt-2 h-2 w-2/3 rounded bg-white/[0.06]" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13px] text-orange-300">
          {error ?? 'Could not generate proposals.'}
        </p>
      )}

      {status === 'done' && proposals.length === 0 && (
        <p className="text-[13px] text-white">
          No proposals came back. Try again, or write the goal yourself.
        </p>
      )}

      {status === 'done' && proposals.length > 0 && (
        <ul className="space-y-2.5">
          {proposals.map((p, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => onAccept(p)}
                className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-left transition-colors touch-manipulation hover:border-elec-yellow"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white">
                  <span>{CATEGORY_LABEL[p.category] ?? p.category}</span>
                  <span aria-hidden>·</span>
                  <span className={cn(p.priority === 'high' && 'font-semibold text-orange-300')}>
                    {PRIORITY_LABEL[p.priority] ?? p.priority} priority
                  </span>
                  {p.ac_link && (
                    <>
                      <span aria-hidden>·</span>
                      <span>AC {p.ac_link}</span>
                    </>
                  )}
                  {p.target_date && (
                    <span className="ml-auto tabular-nums">Due {p.target_date}</span>
                  )}
                </div>
                <h4 className="mt-1.5 text-[14.5px] font-semibold leading-snug text-white">
                  {p.title}
                </h4>
                {p.description && (
                  <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-white">
                    {p.description}
                  </p>
                )}
                {p.rationale && (
                  <p className="mt-2 border-t border-white/[0.06] pt-2 text-[12px] leading-snug text-white">
                    Why: {p.rationale}
                  </p>
                )}
                <span className="mt-2 block text-[12.5px] font-semibold text-elec-yellow">
                  Use this goal
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {status === 'done' && (
        <button type="button" onClick={onSuggest} className={cn(buttonSecondaryCn, 'w-full')}>
          Suggest again
        </button>
      )}
    </Section>
  );
}
