import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useIqaSamplingPlans } from '@/hooks/useIqaSamplingPlans';

/* ==========================================================================
   AddIqaSamplingPlanDialog — IQA creates a sampling plan against an
   assessor for a given period and qualification.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  iqa_id: string;
  assessor_id: string;
  qualification_code: string;
  unit_code: string;
  period_start: string;
  period_end: string;
  target_sample_percent: string;
  notes: string;
}

const todayIso = () => new Date().toISOString().slice(0, 10);
const NONE = '__none';

const EMPTY: FormState = {
  iqa_id: NONE,
  assessor_id: NONE,
  qualification_code: '',
  unit_code: '',
  period_start: '',
  period_end: '',
  target_sample_percent: '20',
  notes: '',
};

export function AddIqaSamplingPlanDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const { staff } = useCollegeSupabase();
  const { create } = useIqaSamplingPlans();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  const update = (patch: Partial<FormState>) =>
    setForm((p) => ({ ...p, ...patch }));

  const iqaCandidates = useMemo(
    () =>
      staff.filter(
        (s) =>
          s.role === 'tutor' ||
          s.role === 'head_of_department' ||
          s.role === 'admin'
      ),
    [staff]
  );

  const assessorCandidates = useMemo(
    () => staff.filter((s) => s.role === 'tutor' || s.role === 'head_of_department'),
    [staff]
  );

  const handleSave = async () => {
    if (!form.period_start || !form.period_end) {
      toast({ title: 'Pick a period', variant: 'destructive' });
      return;
    }
    if (form.period_end < form.period_start) {
      toast({
        title: 'Invalid period',
        description: 'End date must be after start date.',
        variant: 'destructive',
      });
      return;
    }
    const target = Number(form.target_sample_percent);
    if (!Number.isFinite(target) || target < 0 || target > 100) {
      toast({
        title: 'Target must be 0–100',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      await create({
        iqa_id: form.iqa_id !== NONE ? form.iqa_id : null,
        assessor_id: form.assessor_id !== NONE ? form.assessor_id : null,
        qualification_code: form.qualification_code.trim() || null,
        unit_code: form.unit_code.trim() || null,
        period_start: form.period_start,
        period_end: form.period_end,
        target_sample_percent: target,
        notes: form.notes.trim() || null,
      });
      toast({ title: 'Sampling plan created' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[88vh] sm:h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="New sampling plan"
          title="Plan IQA sampling"
          description="Sets the IQA target % for an assessor's work over a period. Once saved, you'll tick which observations to sample."
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSave}
                disabled={submitting || !form.period_start || !form.period_end}
              >
                {submitting ? 'Saving…' : 'Create plan →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Who">
            <FormGrid cols={2}>
              <Field label="IQA">
                <Select
                  value={form.iqa_id}
                  onValueChange={(v) => update({ iqa_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Assign…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value={NONE}>Unassigned</SelectItem>
                    {iqaCandidates.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Assessor (subject of sampling)">
                <Select
                  value={form.assessor_id}
                  onValueChange={(v) => update({ assessor_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Pick assessor…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value={NONE}>Department-wide</SelectItem>
                    {assessorCandidates.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Scope">
            <FormGrid cols={2}>
              <Field label="Qualification code" hint="e.g. C&G 2365-03">
                <input
                  value={form.qualification_code}
                  onChange={(e) =>
                    update({ qualification_code: e.target.value })
                  }
                  className={inputClass}
                  placeholder="—"
                />
              </Field>
              <Field label="Unit code" hint="Leave blank for all units">
                <input
                  value={form.unit_code}
                  onChange={(e) => update({ unit_code: e.target.value })}
                  className={inputClass}
                  placeholder="—"
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Period & target">
            <FormGrid cols={2}>
              <Field label="Period start" required>
                <input
                  type="date"
                  value={form.period_start}
                  max={todayIso()}
                  onChange={(e) => update({ period_start: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Period end" required>
                <input
                  type="date"
                  value={form.period_end}
                  min={form.period_start || undefined}
                  onChange={(e) => update({ period_end: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field
              label="Target sample %"
              hint="Awarding body usually expects 10–20% for routine sampling, 100% for new assessors"
            >
              <input
                type="number"
                min="0"
                max="100"
                step="5"
                value={form.target_sample_percent}
                onChange={(e) =>
                  update({ target_sample_percent: e.target.value })
                }
                className={inputClass}
                placeholder="20"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Notes">
            <Field label="Plan notes (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[80px]')}
                placeholder="Why this period, focus areas, EQA visit prep…"
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
