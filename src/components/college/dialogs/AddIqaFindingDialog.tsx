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
import {
  useIqaFindings,
  type FindingType,
  type FindingSeverity,
} from '@/hooks/useIqaFindings';

/* ==========================================================================
   AddIqaFindingDialog — IQA raises a finding against an assessor (and
   optionally a specific observation).
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NONE = '__none';

interface FormState {
  iqa_id: string;
  assessor_id: string;
  finding_type: FindingType;
  severity: FindingSeverity | '';
  description: string;
  action_plan: string;
  due_date: string;
}

const FINDING_TYPES: { value: FindingType; label: string; tone: 'emerald' | 'blue' | 'amber' | 'red' }[] = [
  { value: 'commendation', label: 'Commendation', tone: 'emerald' },
  { value: 'observation', label: 'Observation', tone: 'blue' },
  { value: 'action', label: 'Action required', tone: 'amber' },
  { value: 'concern', label: 'Concern', tone: 'red' },
];

const SEVERITIES: { value: FindingSeverity; label: string; tone: 'amber' | 'red' }[] = [
  { value: 'minor', label: 'Minor', tone: 'amber' },
  { value: 'major', label: 'Major', tone: 'amber' },
  { value: 'critical', label: 'Critical', tone: 'red' },
];

const EMPTY: FormState = {
  iqa_id: NONE,
  assessor_id: NONE,
  finding_type: 'action',
  severity: '',
  description: '',
  action_plan: '',
  due_date: '',
};

export function AddIqaFindingDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const { staff } = useCollegeSupabase();
  const { create } = useIqaFindings();
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

  const selectedAssessor = useMemo(
    () => staff.find((s) => s.id === form.assessor_id),
    [staff, form.assessor_id]
  );

  const handleSave = async () => {
    if (!form.description.trim()) {
      toast({
        title: 'Description required',
        description: 'Describe the finding so an EQA / Ofsted inspector can read it cold.',
        variant: 'destructive',
      });
      return;
    }
    if (form.finding_type === 'action' && !form.action_plan.trim()) {
      toast({
        title: 'Action plan required',
        description: 'Findings of type "Action required" need a written action plan.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      await create({
        iqa_id: form.iqa_id !== NONE ? form.iqa_id : null,
        assessor_id: form.assessor_id !== NONE ? form.assessor_id : null,
        assessor_name: selectedAssessor?.name ?? 'Unassigned',
        finding_type: form.finding_type,
        severity: (form.severity || null) as FindingSeverity | null,
        description: form.description.trim(),
        action_plan: form.action_plan.trim() || null,
        due_date: form.due_date || null,
      });
      toast({ title: 'Finding logged' });
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
        className="h-[90vh] sm:h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="New finding"
          title="Raise an IQA finding"
          description="Logged with your name + timestamp as audit-grade evidence."
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
                disabled={submitting || !form.description.trim()}
              >
                {submitting ? 'Saving…' : 'Log finding →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Type">
            <Field label="Finding type" required>
              <div className="flex flex-wrap gap-1.5">
                {FINDING_TYPES.map((t) => {
                  const active = form.finding_type === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => update({ finding_type: t.value })}
                      className={cn(
                        'h-9 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation',
                        active
                          ? t.tone === 'emerald'
                            ? 'bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-200'
                            : t.tone === 'amber'
                              ? 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                              : t.tone === 'red'
                                ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                                : 'bg-blue-500/[0.12] border-blue-500/40 text-blue-200'
                          : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Severity (optional)">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => update({ severity: '' })}
                  className={cn(
                    'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                    form.severity === ''
                      ? 'bg-elec-yellow text-black border-elec-yellow'
                      : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
                  )}
                >
                  Unspecified
                </button>
                {SEVERITIES.map((s) => {
                  const active = form.severity === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update({ severity: s.value })}
                      className={cn(
                        'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                        active
                          ? s.tone === 'red'
                            ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                            : 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                          : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </Field>
          </FormCard>

          <FormCard eyebrow="Who">
            <FormGrid cols={2}>
              <Field label="Raised by (IQA)">
                <Select
                  value={form.iqa_id}
                  onValueChange={(v) => update({ iqa_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="—" />
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
              <Field label="About assessor">
                <Select
                  value={form.assessor_id}
                  onValueChange={(v) => update({ assessor_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="—" />
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

          <FormCard eyebrow="Detail">
            <Field label="Description" required>
              <textarea
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                rows={4}
                className={cn(textareaClass, 'min-h-[100px]')}
                placeholder="What was found? Be specific — quote the AC code, observation date, etc."
              />
            </Field>
            <Field
              label="Action plan"
              hint="Required if the finding is an action — specify what needs to happen"
            >
              <textarea
                value={form.action_plan}
                onChange={(e) => update({ action_plan: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[70px]')}
                placeholder="Concrete steps the assessor / department will take to resolve."
              />
            </Field>
            <Field label="Due date (optional)">
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => update({ due_date: e.target.value })}
                className={inputClass}
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
