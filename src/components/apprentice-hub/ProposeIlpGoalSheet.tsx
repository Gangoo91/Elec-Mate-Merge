import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  infoPanelCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useSheetDraft } from '@/hooks/useSheetDraft';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ==========================================================================
   ProposeIlpGoalSheet — apprentice-side. Confirm-and-send an AI-drafted
   SMART learning goal to the tutor for review. Uses the propose_ilp_goal
   SECURITY DEFINER RPC which forces source='student' so the tutor's
   existing ILP UI distinguishes apprentice-proposed goals from tutor-set
   ones. The apprentice keeps full edit control over every field.
   ========================================================================== */

interface Prefill {
  title?: string;
  description?: string;
  acceptance_criteria?: string;
  category?: string;
  priority?: string;
  target_date?: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired after the RPC succeeds. Receives the new goal id. */
  onSubmitted?: (insertedId: string | null) => void;
  prefill?: Prefill;
}

const CATEGORY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'academic', label: 'Academic' },
  { value: 'skills', label: 'Skills' },
  { value: 'employability', label: 'Employability' },
  { value: 'behavioural', label: 'Behavioural' },
  { value: 'wellbeing', label: 'Wellbeing' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'other', label: 'Other' },
];

const PRIORITY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

interface FormState {
  title: string;
  description: string;
  acceptance_criteria: string;
  category: string;
  priority: string;
  target_date: string;
}

function emptyForm(): FormState {
  return {
    title: '',
    description: '',
    acceptance_criteria: '',
    category: 'academic',
    priority: 'medium',
    target_date: '',
  };
}

export function ProposeIlpGoalSheet({ open, onOpenChange, onSubmitted, prefill }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // A half-written goal survives the phone going in a pocket; restoring is
  // offered, never forced, and only when nothing was prefilled by the AI.
  const draft = useSheetDraft<FormState>(user?.id ? `ilp-goal:${user.id}` : null, form, {
    // Never let an AI prefill overwrite the apprentice's own half-written draft.
    enabled: open && !saving && !prefill,
    isEmpty: (f) => !f.title.trim() && !f.description.trim(),
  });

  // Single open-time effect: hydrate from prefill if present, else empty.
  // Gated by wasOpenRef so it fires only on the false → true transition,
  // protecting the apprentice's edits from being wiped by parent re-renders.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      if (prefill) {
        setForm({
          title: prefill.title ?? '',
          description: prefill.description ?? '',
          acceptance_criteria: prefill.acceptance_criteria ?? '',
          category: prefill.category ?? 'academic',
          priority: prefill.priority ?? 'medium',
          target_date: prefill.target_date ?? '',
        });
      } else {
        setForm(emptyForm());
      }
      setSavedTick(false);
    }
    wasOpenRef.current = open;
  }, [open, prefill]);

  const handleSubmit = async () => {
    if (saving) return;
    if (!form.title.trim() || !form.description.trim()) {
      toast({
        title: 'Title and description required',
        description: 'Add a quick title and a body before sending.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data, error } = await supabase.rpc('propose_ilp_goal', {
        p_title: form.title.trim(),
        p_description: form.description.trim(),
        p_acceptance_criteria: form.acceptance_criteria.trim(),
        p_category: form.category,
        p_priority: form.priority,
        p_target_date: form.target_date || null,
      });
      if (error) throw error;

      draft.clear();
      setSavedTick(true);
      toast({
        title: 'Sent to your tutor',
        description: form.title.trim(),
      });
      onSubmitted?.((data as string | null) ?? null);
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 800);
    } catch (e) {
      toast({
        title: 'Could not send',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const canSend = !saving && !!form.title.trim() && !!form.description.trim();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Suggest a goal"
      title="Send to your tutor for review"
      description="Edit anything before sending. Your tutor sees it in your learning plan and can accept it, change it, or come back to you."
      width="wide"
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-10 lg:space-y-0"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSend}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Sent ✓' : saving ? 'Sending…' : 'Send to tutor'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {draft.hasDraft && draft.draft && !prefill && (
          <div className="space-y-3 rounded-2xl border border-elec-yellow/35 bg-white/[0.05] p-4">
            <p className="text-[13px] leading-snug text-white">
              <span className="font-semibold">Unfinished goal:</span>{' '}
              {draft.draft.title.trim() || 'one you started earlier'}. Pick up where you left off?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={draft.clear} className={cn(buttonSecondaryCn, 'h-11')}>
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  if (draft.draft) setForm(draft.draft);
                  draft.dismiss();
                }}
                className={cn(buttonPrimaryCn, 'h-11')}
              >
                Resume
              </button>
            </div>
          </div>
        )}

        <div>
          <label className={labelCn} htmlFor="ilp-title">
            Title
          </label>
          <Input
            id="ilp-title"
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Master initial verification testing"
            maxLength={200}
            className={inputCn}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="ilp-description">
            Why this goal
          </label>
          <textarea
            id="ilp-description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What you want to get better at, and why it matters"
            rows={4}
            maxLength={4000}
            className={cn(textareaCn, 'w-full resize-none')}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="ilp-criteria">
            What &lsquo;done&rsquo; looks like
          </label>
          <textarea
            id="ilp-criteria"
            value={form.acceptance_criteria}
            onChange={(e) => setForm((f) => ({ ...f, acceptance_criteria: e.target.value }))}
            placeholder="e.g. Pass the next IV quiz with 80% or more and complete one site IV under supervision"
            rows={3}
            maxLength={2000}
            className={cn(textareaCn, 'w-full resize-none')}
          />
          <p className="mt-1.5 text-[12px] leading-snug text-white">
            How you and your tutor will both know you have done it.
          </p>
        </div>

        <div className={grid2Cn}>
          <div>
            <label className={labelCn}>Category</label>
            <SelectField
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              title="Category"
              options={CATEGORY_OPTIONS}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="ilp-date">
              Target date
            </label>
            <Input
              id="ilp-date"
              type="date"
              value={form.target_date}
              onChange={(e) => setForm((f) => ({ ...f, target_date: e.target.value }))}
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <label className={labelCn}>Priority</label>
          {/* Three choices: one joined toggle, the chosen option white. */}
          <div className="flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5">
            {PRIORITY_OPTIONS.map((p) => (
              <button
                key={p.value}
                type="button"
                aria-pressed={form.priority === p.value}
                onClick={() => setForm((f) => ({ ...f, priority: p.value }))}
                className={cn(
                  'h-11 min-w-0 flex-1 rounded-[10px] px-2 text-[13.5px] font-semibold transition-colors touch-manipulation',
                  form.priority === p.value
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-4" aria-label="Preview and tips">
        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
          <p className="text-[13px] font-medium text-elec-yellow">What your tutor will see</p>
          <p className="mt-2 text-[16px] font-semibold leading-snug text-white">
            {form.title.trim() || 'Your goal title'}
          </p>
          <p className="mt-1.5 whitespace-pre-line text-[13px] leading-snug text-white">
            {form.description.trim() || 'Why this goal matters to you.'}
          </p>
          {form.acceptance_criteria.trim() ? (
            <p className="mt-3 text-[13px] leading-snug text-white">
              <span className="font-semibold">Done when: </span>
              {form.acceptance_criteria.trim()}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex h-7 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-medium text-white">
              {CATEGORY_OPTIONS.find((c) => c.value === form.category)?.label ?? 'Other'}
            </span>
            <span className="inline-flex h-7 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-medium text-white">
              {PRIORITY_OPTIONS.find((p) => p.value === form.priority)?.label ?? 'Medium'} priority
            </span>
            <span className="inline-flex h-7 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-medium text-white">
              {form.target_date
                ? `By ${new Date(`${form.target_date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : 'No target date'}
            </span>
          </div>
        </div>
        <div className={infoPanelCn}>
          <p className="text-[13px] font-semibold text-white">A goal your tutor will accept</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[13px] leading-snug text-white">
            <li>One clear thing, not three in one</li>
            <li>Something you can show, like a test result or a signed-off job</li>
            <li>A date that is realistic, usually within the next term</li>
          </ul>
        </div>
      </aside>
    </FormSheet>
  );
}
