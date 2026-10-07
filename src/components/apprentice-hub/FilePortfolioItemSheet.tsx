import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { parseAcRef, acRefString, type AcRef } from '@/lib/portfolio/acRef';
import { notifyPortfolioChanged } from '@/hooks/portfolio/usePortfolio';

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

/** "113 AC 1.1", "Unit 113 AC 1.1" or the notebook's "113.1.1" → a typed ref. */
function toRef(t: string): AcRef | null {
  const r = parseAcRef(t);
  if (r) return r;
  const m = /^([A-Za-z0-9/_-]+)\.(\d+\.\d+)$/.exec(t.trim());
  return m ? { unit_code: m[1], ac_code: m[2] } : null;
}

export function FilePortfolioItemSheet({ open, onOpenChange, onSubmitted, prefill }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm());
  // The notebook's proposed criteria, kept as suggestions (ELE-1864).
  const suggestions: AcRef[] = (prefill?.assessment_criteria_met ?? [])
    .map(toRef)
    .filter((r): r is AcRef => !!r)
    .filter((r, i, all) => all.findIndex((x) => x.unit_code === r.unit_code && x.ac_code === r.ac_code) === i);
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
          // ELE-1864: the notebook's criteria are AI suggestions. They are shown
          // to tap, never pre-filled as claims.
          acs_text: '',
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

      const typed = form.acs_text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const claimedRefs = typed.map(toRef).filter((r): r is AcRef => !!r);
      // Typed refs are written in the canonical "UNIT AC x.y" form so they
      // count; anything we cannot read is kept as the learner wrote it.
      const acs = typed.map((t) => {
        const r = toRef(t);
        return r ? acRefString(r) : t;
      });

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
      const newId = (inserted as { id?: string } | null)?.id;
      const leftSuggestions = suggestions.filter(
        (r) => !claimedRefs.some((c) => c.unit_code === r.unit_code && c.ac_code === r.ac_code)
      );
      if (newId && leftSuggestions.length) {
        await supabase.rpc(
          'set_portfolio_item_criteria' as never,
          {
            p_item_id: newId,
            p_claimed: claimedRefs,
            p_suggested: leftSuggestions.map((r) => ({ ...r, reason: 'Suggested by the notebook' })),
          } as never
        );
      }
      notifyPortfolioChanged();

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

  const canSave = !saving && !!form.title.trim() && !!form.description.trim();
  const typedRefs = form.acs_text
    .split(',')
    .map((x) => toRef(x.trim()))
    .filter((r): r is AcRef => !!r);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Add to portfolio"
      title="Review & file evidence"
      description="Edit anything before saving. It goes straight into your portfolio under the category you pick — your tutor sees it next time they review."
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
            disabled={!canSave}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Saved ✓' : saving ? 'Saving…' : 'Save to portfolio'}
          </button>
        </div>
      }
    >
      <div className={grid2Cn}>
        <div>
          <label className={labelCn} htmlFor="fpi-date">
            Date
          </label>
          <Input
            id="fpi-date"
            type="date"
            value={form.date_completed}
            onChange={(e) => setForm((f) => ({ ...f, date_completed: e.target.value }))}
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="fpi-category">
            Category
          </label>
          <Input
            id="fpi-category"
            type="text"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            placeholder="e.g. Initial verification"
            maxLength={80}
            className={inputCn}
          />
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="fpi-title">
          Title
        </label>
        <Input
          id="fpi-title"
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Tested ring final on flat refurb"
          maxLength={120}
          className={inputCn}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="fpi-description">
          What you did
        </label>
        <textarea
          id="fpi-description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="The work itself — process, observations, results"
          rows={6}
          maxLength={4000}
          className={cn(textareaCn, 'w-full resize-none')}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="fpi-reflection">
          Reflection (optional)
        </label>
        <textarea
          id="fpi-reflection"
          value={form.reflection_notes}
          onChange={(e) => setForm((f) => ({ ...f, reflection_notes: e.target.value }))}
          placeholder="What you learnt — this is what an IQA reads"
          rows={4}
          maxLength={6000}
          className={cn(textareaCn, 'w-full resize-none')}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="fpi-acs">
          AC codes
        </label>
        <Input
          id="fpi-acs"
          type="text"
          value={form.acs_text}
          onChange={(e) => setForm((f) => ({ ...f, acs_text: e.target.value }))}
          placeholder="303.1.4, 303.2.1"
          className={cn(inputCn, 'font-mono')}
        />
        <p className="mt-1.5 text-[11.5px] leading-snug text-white">
          The criteria you are claiming, comma-separated, e.g. 303.1.4, 303.2.1.
        </p>
        {suggestions.length > 0 && (
          <div className="mt-3">
            <p className="text-[12px] font-medium text-white">
              Suggested from your notes. Tap the ones this really shows to claim them.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((r) => {
                const on = typedRefs.some((c) => c.unit_code === r.unit_code && c.ac_code === r.ac_code);
                return (
                  <button
                    key={`${r.unit_code}-${r.ac_code}`}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setForm((f) => {
                        const parts = f.acs_text.split(',').map((x) => x.trim()).filter(Boolean);
                        const label = acRefString(r);
                        const next = on
                          ? parts.filter((x) => {
                              const t = toRef(x);
                              return !(t && t.unit_code === r.unit_code && t.ac_code === r.ac_code);
                            })
                          : [...parts, label];
                        return { ...f, acs_text: next.join(', ') };
                      })
                    }
                    className={cn(
                      'h-10 rounded-full border px-3.5 font-mono text-[12.5px] touch-manipulation',
                      on
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-dashed border-white/[0.3] text-white'
                    )}
                  >
                    {acRefString(r)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FormSheet>
  );
}
