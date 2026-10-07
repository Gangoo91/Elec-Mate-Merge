import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import type { Ilp, NewIlp, StudentIlpHook } from '@/hooks/useStudentIlp';

/* ==========================================================================
   IlpEditorSheet — set / edit headline narrative for the current ILP.
   Goals are managed separately via IlpGoalSheet.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingIlp: Ilp | null;
  collegeStudentId: string;
  studentName: string;
  upsertIlp: StudentIlpHook['upsertIlp'];
  updateIlp: StudentIlpHook['updateIlp'];
}

interface FormState {
  headline_focus: string;
  headline_strengths: string;
  headline_areas: string;
  support_strategies: string;
  accessibility_adjustments: string;
  target_completion_date: string;
  review_date: string;
}

function fromIlp(ilp: Ilp | null): FormState {
  return {
    headline_focus: ilp?.headline_focus ?? '',
    headline_strengths: ilp?.headline_strengths ?? '',
    headline_areas: ilp?.headline_areas ?? '',
    support_strategies: ilp?.support_strategies ?? '',
    accessibility_adjustments: ilp?.accessibility_adjustments ?? '',
    target_completion_date: ilp?.target_completion_date ?? '',
    review_date: ilp?.review_date ?? '',
  };
}

export function IlpEditorSheet({
  open,
  onOpenChange,
  existingIlp,
  studentName,
  upsertIlp,
  updateIlp,
}: Props) {
  const [form, setForm] = useState<FormState>(fromIlp(existingIlp));
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setForm(fromIlp(existingIlp));
      setSavedTick(false);
    }
  }, [open, existingIlp]);

  const valid =
    form.headline_focus.trim().length > 0 ||
    form.headline_strengths.trim().length > 0 ||
    form.headline_areas.trim().length > 0;

  const handleSave = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const patch: NewIlp = {
        headline_focus: form.headline_focus.trim() || null,
        headline_strengths: form.headline_strengths.trim() || null,
        headline_areas: form.headline_areas.trim() || null,
        support_strategies: form.support_strategies.trim() || null,
        accessibility_adjustments: form.accessibility_adjustments.trim() || null,
        target_completion_date: form.target_completion_date || null,
        review_date: form.review_date || null,
      };
      if (existingIlp) {
        await updateIlp(patch);
      } else {
        await upsertIlp({ ...patch, status: 'active' });
      }
      setSavedTick(true);
      toast({
        title: existingIlp ? 'ILP updated' : 'ILP created',
        description: `${studentName.split(' ')[0]}'s plan saved.`,
      });
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 700);
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

  const first = studentName.split(' ')[0];
  const set = (k: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Individual learning plan"
      title={existingIlp ? `Edit ${first}'s ILP` : `New ILP for ${first}`}
      description={
        existingIlp
          ? "Updates appear live in the learner's app."
          : 'Personalised plan visible to the learner. They can tick off goals and reply.'
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
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
            onClick={handleSave}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Saved' : saving ? 'Saving…' : existingIlp ? 'Save changes' : 'Create ILP'}
          </button>
        </div>
      }
    >
      <section className="min-w-0 space-y-4">
        <h3 className="text-[15px] font-semibold text-white">Narrative</h3>
        <div>
          <label className={labelCn} htmlFor="ilp-focus">
            Focus
          </label>
          <input
            id="ilp-focus"
            type="text"
            value={form.headline_focus}
            onChange={set('headline_focus')}
            placeholder="e.g. Build confidence in three-phase calculations"
            className={inputCn}
          />
          <p className="mt-1.5 text-[12px] text-white">One-line summary of what this plan is for.</p>
        </div>
        <div>
          <label className={labelCn} htmlFor="ilp-strengths">
            Strengths
          </label>
          <textarea
            id="ilp-strengths"
            value={form.headline_strengths}
            rows={3}
            onChange={set('headline_strengths')}
            placeholder="What are they doing well?"
            className={textareaCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="ilp-areas">
            Areas for development
          </label>
          <textarea
            id="ilp-areas"
            value={form.headline_areas}
            rows={3}
            onChange={set('headline_areas')}
            placeholder="What needs the most attention?"
            className={textareaCn}
          />
        </div>
        {!valid && (
          <p className="text-[12.5px] text-white">Add a focus, strengths or areas for development to save.</p>
        )}
      </section>

      <div className="min-w-0 space-y-6 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Support</h3>
          <div>
            <label className={labelCn} htmlFor="ilp-support">
              Support strategies
            </label>
            <textarea
              id="ilp-support"
              value={form.support_strategies}
              rows={3}
              onChange={set('support_strategies')}
              placeholder="How will tutors, the employer and peers support this plan?"
              className={textareaCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="ilp-access">
              Accessibility adjustments
            </label>
            <textarea
              id="ilp-access"
              value={form.accessibility_adjustments}
              rows={3}
              onChange={set('accessibility_adjustments')}
              placeholder="Any reasonable adjustments: extra time, scribe, quiet space, etc."
              className={textareaCn}
            />
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Dates</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className={labelCn} htmlFor="ilp-target">
                Target completion
              </label>
              <input
                id="ilp-target"
                type="date"
                value={form.target_completion_date}
                onChange={set('target_completion_date')}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="ilp-review">
                Next review
              </label>
              <input
                id="ilp-review"
                type="date"
                value={form.review_date}
                onChange={set('review_date')}
                className={inputCn}
              />
            </div>
          </div>
        </section>
      </div>
    </FormSheet>
  );
}
