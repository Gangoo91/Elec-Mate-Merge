import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  ILR_COMP_STATUS,
  ILR_EMP_STAT,
  ILR_LLDD,
  ILR_SEX,
  ULN_RE,
} from '@/lib/college/interchange';

/* ==========================================================================
   IlrFieldsSheet (ELE-1884): the ILR fields for one learner, so the MIS
   export is a report, not a project. ULN, date of birth and NI number live on
   the learner record; the rest in college_student_ilr. Saved in one call
   (save_learner_ilr), which checks the learners.edit capability.

   Codes and lengths follow the ILR 2026 to 2027 specification (DfE, Submit
   learner data guidance). Nothing here submits an ILR.
   ========================================================================== */

export interface IlrLearner {
  id: string;
  name: string | null;
  uln: string | null;
  date_of_birth: string | null;
  ni_number: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  otj_required_hours: number | null;
  ilr: Record<string, string | number | null> | null;
}

type Field = {
  key: string;
  label: string;
  hint?: string;
  type?: 'text' | 'date' | 'number';
  max?: number;
  options?: { value: string; label: string }[];
};

const GROUPS: Array<{ title: string; fields: Field[] }> = [
  {
    title: 'Identity',
    fields: [
      { key: 'uln', label: 'ULN', hint: '10 digits', max: 10 },
      {
        key: 'learn_ref_number',
        label: 'Learner reference (LearnRefNumber)',
        hint: 'Up to 12 letters, digits or spaces',
        max: 12,
      },
      { key: 'family_name', label: 'Family name', max: 100 },
      { key: 'given_names', label: 'Given names', max: 100 },
      { key: 'date_of_birth', label: 'Date of birth', type: 'date' },
      { key: 'ni_number', label: 'NI number', max: 9 },
      { key: 'sex', label: 'Sex', options: ILR_SEX },
      { key: 'ethnicity', label: 'Ethnicity code', hint: '31 to 47, 98 or 99', type: 'number' },
      { key: 'lldd_health_prob', label: 'LLDDHealthProb', options: ILR_LLDD },
      {
        key: 'prior_level',
        label: 'Prior attainment level',
        hint: '1 to 10, 97, 98 or 99',
        type: 'number',
      },
      { key: 'postcode_prior', label: 'Postcode prior to enrolment', max: 8 },
      { key: 'postcode', label: 'Current postcode', max: 8 },
    ],
  },
  {
    title: 'Programme',
    fields: [
      {
        key: 'learn_aim_ref',
        label: 'Learning aim reference',
        hint: 'From LARS, up to 8 characters',
        max: 8,
      },
      { key: 'aim_type', label: 'Aim type', hint: '1 programme aim, 3 component', type: 'number' },
      {
        key: 'prog_type',
        label: 'Programme type',
        hint: '25 for an apprenticeship standard',
        type: 'number',
      },
      { key: 'std_code', label: 'Standard code (StdCode)', hint: 'From LARS', type: 'number' },
      { key: 'fund_model', label: 'Funding model', hint: '36 for apprenticeships', type: 'number' },
      {
        key: 'orig_learn_start_date',
        label: 'Original start date',
        hint: 'Only if it differs',
        type: 'date',
      },
      { key: 'comp_status', label: 'Completion status', options: ILR_COMP_STATUS },
      { key: 'outcome', label: 'Outcome', hint: '1, 2, 3 or 8', type: 'number' },
      { key: 'withdraw_reason', label: 'Withdrawal reason code', type: 'number' },
      { key: 'ach_date', label: 'Achievement date', type: 'date' },
      { key: 'del_loc_postcode', label: 'Delivery location postcode', max: 8 },
      {
        key: 'epa_org_id',
        label: 'Assessment organisation ID (EPAOrgID)',
        hint: 'Up to 8 characters',
        max: 8,
      },
    ],
  },
  {
    title: 'Employment and price',
    fields: [
      { key: 'emp_stat', label: 'Employment status', options: ILR_EMP_STAT },
      { key: 'emp_id', label: 'Employer identifier (EmpId)', hint: '9-digit ERN', type: 'number' },
      {
        key: 'agreem_id',
        label: 'Agreement ID (AgreemId)',
        hint: 'Up to 7 characters, new for 2026/27',
        max: 7,
      },
      {
        key: 'hrs_planned_reduction',
        label: 'Planned hours reduced for prior learning (HRS4)',
        type: 'number',
      },
      { key: 'tnp1_price', label: 'Training price (TNP1, £)', type: 'number' },
      { key: 'tnp2_price', label: 'End-point assessment price (TNP2, £)', type: 'number' },
    ],
  },
  {
    // ELE-2087: what the ILR XML return needs beyond the flat export.
    title: 'For the ILR return',
    fields: [
      {
        key: 'date_emp_stat_app',
        label: 'Employment status applies from',
        hint: 'Before the start date. Blank uses the day before',
        type: 'date',
      },
      {
        key: 'esm_eii',
        label: 'Employment intensity code (EII)',
        hint: 'The code your MIS uses',
        type: 'number',
      },
      {
        key: 'esm_loe',
        label: 'Length of employment code (LOE)',
        hint: 'The code your MIS uses',
        type: 'number',
      },
      {
        key: 'prior_level_date',
        label: 'Prior attainment applies from',
        hint: 'On or before the start date. Blank uses the start date',
        type: 'date',
      },
      {
        key: 'lldd_cats',
        label: 'LLDD and health problem categories',
        hint: 'Codes separated by commas, for example 12, 94',
      },
      {
        key: 'primary_lldd',
        label: 'Primary LLDD category',
        hint: 'One of the codes above',
        type: 'number',
      },
    ],
  },
];

/** Saved by save_learner_ilr_return (ELE-2087); the rest by save_learner_ilr. */
const RETURN_KEYS = new Set([
  'date_emp_stat_app',
  'esm_eii',
  'esm_loe',
  'prior_level_date',
  'lldd_cats',
  'primary_lldd',
]);

function initial(l: IlrLearner | null): Record<string, string> {
  if (!l) return {};
  const out: Record<string, string> = {
    uln: l.uln ?? '',
    date_of_birth: l.date_of_birth ?? '',
    ni_number: l.ni_number ?? '',
  };
  for (const [k, v] of Object.entries(l.ilr ?? {})) out[k] = v == null ? '' : String(v);
  return out;
}

export function IlrFieldsSheet({
  learner,
  open,
  onOpenChange,
  onSaved,
  focusField,
}: {
  learner: IlrLearner | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved: () => void;
  /** ELE-2087: the field to scroll to and focus, from an ILR return error. */
  focusField?: string | null;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState<Record<string, string>>({});
  const [start, setStart] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      const v = initial(learner);
      setForm(v);
      setStart(v);
    }
  }, [open, learner]);

  useEffect(() => {
    if (!open || !focusField) return;
    const t = setTimeout(() => {
      const box = document.getElementById(`ilr-field-${focusField}`);
      box?.scrollIntoView({ block: 'center' });
      document.getElementById(`ilr-${focusField}`)?.focus({ preventScroll: true });
    }, 350);
    return () => clearTimeout(t);
  }, [open, focusField]);

  const ulnBad = !!form.uln && !ULN_RE.test(form.uln.trim());

  const save = async () => {
    if (!learner) return;
    const changed: Record<string, string> = {};
    for (const [k, v] of Object.entries(form)) if ((start[k] ?? '') !== v) changed[k] = v;
    if (!Object.keys(changed).length) return onOpenChange(false);
    setSaving(true);
    const core: Record<string, string> = {};
    const ret: Record<string, string> = {};
    for (const [k, v] of Object.entries(changed)) (RETURN_KEYS.has(k) ? ret : core)[k] = v;
    let error: { message: string } | null = null;
    if (Object.keys(core).length)
      ({ error } = await supabase.rpc(
        'save_learner_ilr' as never,
        { p_student: learner.id, p_fields: core } as never
      ));
    if (!error && Object.keys(ret).length)
      ({ error } = await supabase.rpc(
        'save_learner_ilr_return' as never,
        { p_student: learner.id, p_fields: ret } as never
      ));
    setSaving(false);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'ILR fields saved' });
    onSaved();
    onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="ILR fields"
      title={learner?.name ?? 'Learner'}
      description="Codes and lengths follow the ILR 2026 to 2027 specification. The ILR return on this page builds the XML file from them; nothing is submitted for you."
      footer={
        <div className="flex w-full gap-2">
          <button
            type="button"
            className={`${buttonSecondaryCn} flex-1 px-4`}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${buttonPrimaryCn} flex-1 px-4`}
            onClick={() => void save()}
            disabled={saving || ulnBad}
          >
            {saving ? 'Saving…' : 'Save ILR fields'}
          </button>
        </div>
      }
    >
      <div className="space-y-8 pb-4">
        <p className="text-[13px] leading-relaxed text-white">
          Start date {learner?.start_date ?? 'not set'}, planned end{' '}
          {learner?.expected_end_date ?? 'not set'} and planned off-the-job hours{' '}
          {learner?.otj_required_hours ?? 'not set'} come from the learner record and go out as
          LearnStartDate, LearnPlanEndDate and HRS1.
        </p>
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{g.title}</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.fields.map((f) => (
                <div
                  key={f.key}
                  id={`ilr-field-${f.key}`}
                  className={cn(
                    'scroll-mt-24 rounded-lg',
                    focusField === f.key &&
                      'ring-1 ring-elec-yellow/70 ring-offset-4 ring-offset-transparent'
                  )}
                >
                  <label className={labelCn} htmlFor={`ilr-${f.key}`}>
                    {f.label}
                  </label>
                  {f.options ? (
                    <MobileSelectPicker
                      value={form[f.key] ?? ''}
                      onValueChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))}
                      options={f.options}
                      placeholder="Not set"
                      title={f.label}
                      triggerClassName={selectTriggerCn}
                    />
                  ) : (
                    <input
                      id={`ilr-${f.key}`}
                      type={f.type === 'date' ? 'date' : 'text'}
                      inputMode={f.type === 'number' ? 'numeric' : undefined}
                      maxLength={f.max}
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      className={inputCn}
                    />
                  )}
                  {f.key === 'uln' && ulnBad ? (
                    <p className="mt-1 text-[12px] text-orange-300">
                      A ULN is 10 digits and does not start with 0.
                    </p>
                  ) : f.hint ? (
                    <p className="mt-1 text-[12px] text-white">{f.hint}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </FormSheet>
  );
}
