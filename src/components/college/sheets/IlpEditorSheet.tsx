import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  SuccessCheckmark,
} from '@/components/college/primitives';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Individual learning plan"
          title={existingIlp ? `Edit ${studentName.split(' ')[0]}'s ILP` : `New ILP for ${studentName.split(' ')[0]}`}
          description={existingIlp
            ? 'Updates appear live in the learner\'s app.'
            : 'Personalised plan visible to the learner — they can tick off goals and reply.'}
          footer={
            <>
              <SecondaryButton
                onClick={() => onOpenChange(false)}
                disabled={saving}
                fullWidth
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={!valid || saving}
                fullWidth
                className="relative"
              >
                {saving ? 'Saving…' : existingIlp ? 'Save changes' : 'Create ILP'}
                <SuccessCheckmark show={savedTick} />
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Narrative">
            <Field label="Focus" hint="One-line summary of what this plan is for.">
              <input
                type="text"
                value={form.headline_focus}
                onChange={(e) => setForm((f) => ({ ...f, headline_focus: e.target.value }))}
                placeholder="e.g. Build confidence in three-phase calculations"
                className={inputClass}
              />
            </Field>
            <Field label="Strengths">
              <textarea
                value={form.headline_strengths}
                rows={3}
                onChange={(e) => setForm((f) => ({ ...f, headline_strengths: e.target.value }))}
                placeholder="What are they doing well?"
                className={textareaClass}
              />
            </Field>
            <Field label="Areas for development">
              <textarea
                value={form.headline_areas}
                rows={3}
                onChange={(e) => setForm((f) => ({ ...f, headline_areas: e.target.value }))}
                placeholder="What needs the most attention?"
                className={textareaClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Support">
            <Field label="Support strategies">
              <textarea
                value={form.support_strategies}
                rows={3}
                onChange={(e) => setForm((f) => ({ ...f, support_strategies: e.target.value }))}
                placeholder="How will tutors / employer / peers support this plan?"
                className={textareaClass}
              />
            </Field>
            <Field label="Accessibility adjustments">
              <textarea
                value={form.accessibility_adjustments}
                rows={3}
                onChange={(e) => setForm((f) => ({ ...f, accessibility_adjustments: e.target.value }))}
                placeholder="Any reasonable adjustments — extra time, scribe, quiet space, etc."
                className={textareaClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Dates">
            <FormGrid cols={2}>
              <Field label="Target completion">
                <input
                  type="date"
                  value={form.target_completion_date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, target_completion_date: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Next review">
                <input
                  type="date"
                  value={form.review_date}
                  onChange={(e) => setForm((f) => ({ ...f, review_date: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
