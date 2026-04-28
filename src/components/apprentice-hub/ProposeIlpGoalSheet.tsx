import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[88vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Propose ILP goal</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-amber-300">
              Propose a goal
            </div>
            <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight leading-tight">
              Send to your tutor for review
            </h2>
            <p className="mt-1 text-[12px] text-white/85 leading-snug">
              Edit anything before sending. Your tutor sees this in their next ILP review and can
              accept, edit, or come back to you with a tweak.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            <Field label="Title">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Master initial verification testing"
                maxLength={200}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>

            <Field
              label="Why this goal"
              hint="What you want to get better at — and why it matters."
            >
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                maxLength={4000}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none focus:border-white/30 touch-manipulation resize-none"
              />
            </Field>

            <Field
              label="What 'done' looks like"
              hint="The SMART bit — how you and your tutor will know you've hit it."
            >
              <textarea
                value={form.acceptance_criteria}
                onChange={(e) => setForm((f) => ({ ...f, acceptance_criteria: e.target.value }))}
                placeholder="e.g. Pass the next IV quiz with ≥80% and complete one site IV under supervision."
                rows={3}
                maxLength={2000}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none focus:border-white/30 touch-manipulation resize-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[hsl(0_0%_10%)]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Priority">
                <select
                  value={form.priority}
                  onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
                >
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value} className="bg-[hsl(0_0%_10%)]">
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              label="Target date"
              hint="When do you want to hit this by? Leave empty if open-ended."
            >
              <input
                type="date"
                value={form.target_date}
                onChange={(e) => setForm((f) => ({ ...f, target_date: e.target.value }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>
          </div>

          <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="h-11 px-4 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !form.title.trim() || !form.description.trim()}
              className={cn(
                'inline-flex items-center h-11 px-4 rounded-lg text-[13px] font-semibold text-black transition-colors touch-manipulation',
                saving || !form.title.trim() || !form.description.trim()
                  ? 'bg-white/[0.05] text-white/40'
                  : 'bg-amber-300 hover:bg-amber-200'
              )}
            >
              {savedTick ? 'Sent ✓' : saving ? 'Sending…' : 'Send to tutor'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/85">
        {label}
      </span>
      {hint && <span className="block mt-0.5 text-[11.5px] text-white/55">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
