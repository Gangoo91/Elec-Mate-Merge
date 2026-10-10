/* ==========================================================================
   useLearnerEpao — ELE-2041. The end-point assessment organisation for a
   learner, when it is due, and whether it was chosen on time.

   Source: Apprenticeship funding rules 2026/27 (v3), verified against the PDF:
     143    select the EPAO and negotiate a price at least 6 months before gateway;
     100.2.1 the plan names it no later than 6 months before the planned end;
     145.1  the selected EPAO is recorded on the ILR (EPAOrgID);
     382    revised assessment plans: engage the assessment organisation at the start.
   2025/26 equivalents: 115, 96.2.1, 117.1, 346. The due date and status come
   from _epao_due (supabase/migrations/20261010220100_learner_epao_ele2041.sql).
   ========================================================================== */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type EpaoStatus = 'ok' | 'ok_late' | 'overdue' | 'due_soon' | 'not_yet_due' | 'unknown';

export interface EpaoDue {
  due_date: string | null;
  basis: 'revised_start' | 'six_months_before_end' | 'no_end_date';
  assessment_plan: 'current' | 'revised';
  assessment_plan_source: 'recorded' | 'derived';
  standard_code: string | null;
  rules_year: string | null;
  para: string | null;
  para_verified: boolean | null;
  chosen: boolean;
  chosen_on: string | null;
  status: EpaoStatus;
  days_left: number | null;
}

export interface EpaoRecord {
  student_id: string;
  epao_name: string;
  epao_org_id: string | null;
  assessment_plan: 'current' | 'revised' | null;
  chosen_on: string;
  price: number | null;
  agreement_signed_on: string | null;
  notes: string | null;
  recorded_by_name: string | null;
  updated_at: string;
}

export function useLearnerEpao(studentId: string | null | undefined) {
  const [record, setRecord] = useState<EpaoRecord | null>(null);
  const [due, setDue] = useState<EpaoDue | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.rpc(
      'get_learner_epao' as never,
      { p_student: studentId } as never
    );
    if (!error && data) {
      const d = data as unknown as { record: EpaoRecord | null; due: EpaoDue | null };
      setRecord(d.record);
      setDue(d.due);
    }
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { record, due, loading, refresh };
}

export async function setLearnerEpao(args: {
  studentId: string;
  name: string;
  orgId: string | null;
  plan: 'current' | 'revised' | null;
  chosenOn: string;
  price: number | null;
  agreementSignedOn: string | null;
  notes: string | null;
}): Promise<{ ok: boolean; due: EpaoDue }> {
  const { data, error } = await supabase.rpc(
    'set_learner_epao' as never,
    {
      p_student: args.studentId,
      p_name: args.name,
      p_org_id: args.orgId,
      p_plan: args.plan,
      p_chosen_on: args.chosenOn,
      p_price: args.price,
      p_agreement_signed_on: args.agreementSignedOn,
      p_notes: args.notes,
    } as never
  );
  if (error) throw new Error(error.message);
  return data as unknown as { ok: boolean; due: EpaoDue };
}

/** One plain sentence for the due state. */
export function epaoDueSentence(due: EpaoDue | null, fmt: (d: string) => string): string {
  if (!due) return '';
  const by = due.due_date ? fmt(due.due_date) : null;
  switch (due.status) {
    case 'ok':
      return `Chosen ${due.chosen_on ? fmt(due.chosen_on) : ''}${by ? `, due by ${by}` : ''}.`;
    case 'ok_late':
      return `Chosen ${due.chosen_on ? fmt(due.chosen_on) : ''}, after it was due (${by}).`;
    case 'overdue':
      return `Overdue: it was due by ${by}.`;
    case 'due_soon':
      return `Due by ${by}, ${due.days_left} days from now.`;
    case 'not_yet_due':
      return `Due by ${by}.`;
    default:
      return 'Set the planned end date to work out when it is due.';
  }
}
