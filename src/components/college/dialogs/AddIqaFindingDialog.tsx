import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, selectTriggerCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useIqaFindings, type FindingType, type FindingSeverity } from '@/hooks/useIqaFindings';

/* ==========================================================================
   AddIqaFindingDialog — IQA raises a finding against an assessor (and
   optionally a specific observation).
   ========================================================================== */

export interface AddIqaFindingPrefill {
  iqa_id?: string;
  assessor_id?: string;
  /** Hard link back to the sample row that triggered this finding. Lets
   *  the plan detail page list "findings raised from this sample" + gives
   *  EQA verifiers a click-through audit trail. */
  sample_id?: string;
  finding_type?: FindingType;
  severity?: FindingSeverity | '';
  description?: string;
  action_plan?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Pre-fill the form on open. Used to "promote" a sampling-verdict
   * disagreement into a formal finding without re-typing the rationale.
   * Form resets to EMPTY when the sheet closes.
   */
  prefill?: AddIqaFindingPrefill;
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

// Labels match the IQA dashboard's list (FINDING_TYPE_LABEL). The DB values
// ('Good Practice', 'Area for Improvement', …) are mapped in useIqaFindings,
// never here.
const FINDING_TYPES: { value: FindingType; label: string; explain: string }[] = [
  {
    value: 'commendation',
    label: 'Good practice',
    explain: 'Worth sharing at the next standardisation meeting.',
  },
  {
    value: 'observation',
    label: 'For improvement',
    explain: 'Not wrong, but could be better. No formal action needed.',
  },
  {
    value: 'action',
    label: 'Action required',
    explain: 'Needs a written action plan, and ideally a due date.',
  },
  {
    value: 'concern',
    label: 'Concern',
    explain: 'A risk to a decision or to the learner. Escalate if serious.',
  },
];

const SEVERITIES: { value: FindingSeverity; label: string }[] = [
  { value: 'minor', label: 'Minor' },
  { value: 'major', label: 'Major' },
  { value: 'critical', label: 'Critical' },
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

export function AddIqaFindingDialog({ open, onOpenChange, prefill }: Props) {
  const { toast } = useToast();
  const { staff } = useCollegeSupabase();
  const { create } = useIqaFindings();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Merge prefill on top of EMPTY so the caller can seed any subset of
    // fields (assessor_id + description + finding_type is the typical
    // "promote sampling verdict to finding" case).
    setForm({
      ...EMPTY,
      ...(prefill?.iqa_id != null && { iqa_id: prefill.iqa_id }),
      ...(prefill?.assessor_id != null && { assessor_id: prefill.assessor_id }),
      ...(prefill?.finding_type != null && { finding_type: prefill.finding_type }),
      ...(prefill?.severity != null && { severity: prefill.severity }),
      ...(prefill?.description != null && { description: prefill.description }),
      ...(prefill?.action_plan != null && { action_plan: prefill.action_plan }),
    });
  }, [open, prefill]);

  const update = (patch: Partial<FormState>) => setForm((p) => ({ ...p, ...patch }));

  const iqaCandidates = useMemo(
    () =>
      staff.filter(
        (s) => s.role === 'tutor' || s.role === 'head_of_department' || s.role === 'admin'
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
        sample_id: prefill?.sample_id ?? null,
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

  const needsPlan = form.finding_type === 'action';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="IQA finding"
      title="Log a finding"
      description="Saved with your name and the time, as evidence for EQA and Ofsted."
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(COLLEGE_BTN, 'flex-1 sm:flex-none')}
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(COLLEGE_BTN_PRIMARY, 'flex-1 sm:flex-none')}
            onClick={handleSave}
            disabled={submitting || !form.description.trim()}
          >
            {submitting ? 'Saving…' : 'Log finding'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
        <section className="space-y-5">
          <div>
            <p className={labelCn}>Finding type</p>
            {/* Four equal tiles, each saying what the type means; the
                chosen one is white (Andrew, 10 Oct: no chip rows). */}
            <div className="mt-1 grid grid-cols-2 gap-2">
              {FINDING_TYPES.map((t) => {
                const on = form.finding_type === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => update({ finding_type: t.value })}
                    className={cn(
                      'flex min-h-[88px] flex-col items-start rounded-xl border p-3 text-left transition-colors touch-manipulation',
                      on
                        ? 'border-white bg-white text-black'
                        : 'border-white/[0.14] text-white hover:border-white/[0.3] active:bg-white/[0.06]'
                    )}
                  >
                    <span className="text-[14px] font-semibold leading-snug">{t.label}</span>
                    <span className="mt-1 text-[12.5px] leading-snug">{t.explain}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className={labelCn}>Severity (optional)</p>
            {/* A joined toggle: four short choices. */}
            <div
              role="group"
              aria-label="Severity"
              className="mt-1 grid grid-cols-4 gap-0.5 rounded-xl border border-white/[0.14] p-0.5"
            >
              {[{ value: '' as const, label: 'Not set' }, ...SEVERITIES].map((s) => {
                const on = form.severity === s.value;
                return (
                  <button
                    key={s.label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => update({ severity: s.value })}
                    className={cn(
                      'h-11 rounded-[10px] px-1 text-[13px] transition-colors touch-manipulation',
                      on
                        ? 'bg-white font-semibold text-black'
                        : 'font-medium text-white hover:bg-white/[0.06]'
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
            <div>
              <p className={labelCn}>Raised by (IQA)</p>
              <MobileSelectPicker
                triggerClassName={selectTriggerCn}
                value={form.iqa_id}
                onValueChange={(v) => update({ iqa_id: v })}
                title="Raised by"
                placeholder="Unassigned"
                options={[
                  { value: NONE, label: 'Unassigned' },
                  ...iqaCandidates.map((s) => ({ value: s.id, label: s.name })),
                ]}
              />
            </div>
            <div>
              <p className={labelCn}>About assessor</p>
              <MobileSelectPicker
                triggerClassName={selectTriggerCn}
                value={form.assessor_id}
                onValueChange={(v) => update({ assessor_id: v })}
                title="About assessor"
                placeholder="Department-wide"
                options={[
                  { value: NONE, label: 'Department-wide' },
                  ...assessorCandidates.map((s) => ({ value: s.id, label: s.name })),
                ]}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="iqa-finding-due">
                Due date (optional)
              </label>
              <input
                id="iqa-finding-due"
                type="date"
                value={form.due_date}
                onChange={(e) => update({ due_date: e.target.value })}
                className={inputCn}
              />
            </div>
          </div>
          {prefill?.sample_id && (
            <p className="text-[12.5px] text-white">Linked to the sample it was raised from.</p>
          )}
        </section>

        <section className="space-y-5">
          <div>
            <label className={labelCn} htmlFor="iqa-finding-desc">
              What was found
            </label>
            <textarea
              id="iqa-finding-desc"
              value={form.description}
              onChange={(e) => update({ description: e.target.value })}
              rows={5}
              className={cn(textareaCn, 'min-h-[130px]')}
              placeholder="Be specific: the AC code, the observation date, what the evidence showed"
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="iqa-finding-plan">
              {needsPlan ? 'Action plan (required)' : 'Action plan (optional)'}
            </label>
            <textarea
              id="iqa-finding-plan"
              value={form.action_plan}
              onChange={(e) => update({ action_plan: e.target.value })}
              rows={4}
              className={cn(textareaCn, 'min-h-[110px]')}
              placeholder="The steps the assessor or department will take to put it right"
            />
          </div>
        </section>
      </div>
    </FormSheet>
  );
}
