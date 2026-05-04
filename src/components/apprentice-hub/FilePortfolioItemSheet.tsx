import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ==========================================================================
   FilePortfolioItemSheet — apprentice-side. Confirm-and-file an AI-drafted
   portfolio entry into portfolio_items. Distinct from OTJ entries: this is
   COMPETENCY EVIDENCE against ACs, not training-hours. The apprentice keeps
   full edit control over every field — this sheet is just a starting point
   from the AI's draft.
   ========================================================================== */

interface Prefill {
  title?: string;
  description?: string;
  reflection_notes?: string;
  category?: string;
  assessment_criteria_met?: string[];
  date_completed?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired after a successful insert. Receives the new row's id so callers
      can persist filed-state (e.g. AI write-back proposal tracking). */
  onSubmitted?: (insertedId: string | null) => void;
  prefill?: Prefill;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

interface FormState {
  date_completed: string;
  title: string;
  category: string;
  description: string;
  reflection_notes: string;
  acs_text: string;
}

function emptyForm(): FormState {
  return {
    date_completed: todayIso(),
    title: '',
    category: 'Practical work evidence',
    description: '',
    reflection_notes: '',
    acs_text: '',
  };
}

export function FilePortfolioItemSheet({ open, onOpenChange, onSubmitted, prefill }: Props) {
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
          date_completed: prefill.date_completed || todayIso(),
          title: prefill.title ?? '',
          category: prefill.category ?? 'Practical work evidence',
          description: prefill.description ?? '',
          reflection_notes: prefill.reflection_notes ?? '',
          acs_text:
            prefill.assessment_criteria_met && prefill.assessment_criteria_met.length > 0
              ? prefill.assessment_criteria_met.join(', ')
              : '',
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
        description: 'Add a quick title and a body before saving.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id;
      if (!uid) throw new Error('Not signed in');

      const acs = form.acs_text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const { data: inserted, error: insErr } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: uid,
          title: form.title.trim().slice(0, 120),
          description: form.description.trim(),
          category: form.category.trim().slice(0, 80) || 'Practical work evidence',
          reflection_notes: form.reflection_notes.trim() || null,
          assessment_criteria_met: acs.length > 0 ? acs : null,
          date_completed: form.date_completed,
        })
        .select('id')
        .maybeSingle();
      if (insErr) throw insErr;

      setSavedTick(true);
      toast({
        title: 'Added to your portfolio',
        description: form.title.trim(),
      });
      onSubmitted?.((inserted as { id?: string } | null)?.id ?? null);
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 800);
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[88vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">File portfolio item</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/85">
              Add to portfolio
            </div>
            <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight leading-tight">
              Review &amp; file evidence
            </h2>
            <p className="mt-1 text-[12px] text-white/85 leading-snug">
              Edit anything before saving. Goes straight into your portfolio under the category you
              pick — your tutor sees it next time they review.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            <Field label="Date">
              <input
                type="date"
                value={form.date_completed}
                onChange={(e) => setForm((f) => ({ ...f, date_completed: e.target.value }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>

            <Field label="Title">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Tested ring final on flat refurb"
                maxLength={120}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>

            <Field label="Category">
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Initial Verification — site work"
                maxLength={80}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>

            <Field label="What you did" hint="The work itself — process, observations, results.">
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={6}
                maxLength={4000}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none focus:border-white/30 touch-manipulation resize-none"
              />
            </Field>

            <Field label="Reflection (optional)" hint="What you learnt — for IQA evidence.">
              <textarea
                value={form.reflection_notes}
                onChange={(e) => setForm((f) => ({ ...f, reflection_notes: e.target.value }))}
                rows={4}
                maxLength={6000}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none focus:border-white/30 touch-manipulation resize-none"
              />
            </Field>

            <Field label="AC codes" hint="Comma-separated, e.g. 303.1.4, 303.2.1.">
              <input
                type="text"
                value={form.acs_text}
                onChange={(e) => setForm((f) => ({ ...f, acs_text: e.target.value }))}
                placeholder="303.1.4, 303.2.1"
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 font-mono touch-manipulation"
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
              className={cn('inline-flex items-center h-11 px-4 rounded-lg text-[13px] font-semibold text-black transition-colors touch-manipulation',
                saving || !form.title.trim() || !form.description.trim()
                  ? 'bg-white/[0.05] text-white/40'
                  : 'bg-white/[0.02] hover:bg-white/[0.02]'
              )}
            >
              {savedTick ? 'Saved ✓' : saving ? 'Saving…' : 'Save to portfolio'}
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
