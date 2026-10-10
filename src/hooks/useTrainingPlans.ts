/* ==========================================================================
   useTrainingPlans — ELE-2039. The structured training plan, versioned, with
   three-party signatures and the end-of-programme "plan delivered" agreement.

   Source: Apprenticeship funding rules 2026/27 (v3), verified against the PDF:
     99      the provider agrees the plan with the apprentice and employer;
     99.1.1  fully signed by the end of the 42-day qualifying period;
     100     what the plan must include (100.1 to 100.14);
     101     at the end all three agree the plan was delivered;
     103.4.1 re-signed when content, the end date or re-planned hours change;
     346–347 electronic signatures must be irrefutable; renewed documents show
             when each took effect and both are kept.
   Writes go only through the security-definer functions in
   supabase/migrations/20261010220200_training_plan_builder_ele2039.sql.
   ========================================================================== */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type PlanRole = 'apprentice' | 'employer' | 'provider';
export type PlanPurpose = 'plan' | 'delivered';
export type PlanStatus = 'draft' | 'awaiting_signatures' | 'in_force' | 'superseded' | 'withdrawn';
export type EmStatus = 'exempt' | 'achieved' | 'to_deliver';

export interface TrainingRow {
  content: string;
  activity?: string;
  hours?: number | null;
  in_otj: boolean | null;
  when: string;
  who: string;
}

export interface TrainingPlanContent {
  apprentice: { name: string | null; job_role: string | null; weekly_hours: number | null };
  parties: {
    provider: string | null;
    employer: string | null;
    subcontractors: string;
    epao: string | null;
  };
  initial_assessment_summary: string | null;
  programme: {
    standard: string | null;
    level: string | null;
    start_date: string | null;
    end_date: string | null;
    practical_start: string | null;
    practical_end: string | null;
  };
  planned_otj_hours: number | null;
  delivery_model: string | null;
  occupational_training: TrainingRow[];
  english_maths: {
    english: EmStatus | null;
    maths: EmStatus | null;
    not_in_otj: boolean | null;
    details: string | null;
  };
  prior_learning: { recorded: boolean | null; hours_reduced: number; summary: string | null };
  support: string | null;
  employer_otj_confirmation: boolean | null;
  reviews: { frequency_months: number | null; format: string | null };
  complaints: string | null;
}

export interface PlanSignature {
  id: string;
  purpose: PlanPurpose;
  role: PlanRole;
  signer_name: string;
  signer_title: string | null;
  signer_company: string | null;
  method: 'signed_in' | 'personal_link';
  statement: string;
  content_hash: string;
  signature_hash: string;
  signed_at: string;
}

export interface TrainingPlanVersion {
  id: string;
  version: number;
  status: PlanStatus;
  content: TrainingPlanContent;
  content_hash: string | null;
  planned_otj_hours: number | null;
  change_reason: string | null;
  created_by_name: string | null;
  created_at: string;
  issued_at: string | null;
  in_force_from: string | null;
  superseded_at: string | null;
  delivered_requested_at: string | null;
  delivered_at: string | null;
  missing: string[];
  signatures: PlanSignature[];
}

export interface TrainingPlansData {
  can_edit: boolean;
  prefill: TrainingPlanContent;
  versions: TrainingPlanVersion[];
}

export const ROLE_LABEL: Record<PlanRole, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  provider: 'College',
};

export const planSignLink = (token: string) =>
  `${typeof window !== 'undefined' && window.location.origin.startsWith('http') ? window.location.origin : 'https://elec-mate.com'}/training-plan/sign/${token}`;

export function useTrainingPlans(studentId: string | null | undefined) {
  const [data, setData] = useState<TrainingPlansData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!studentId) {
      setData(null);
      setLoading(false);
      return;
    }
    const { data: d, error: e } = await supabase.rpc(
      'get_training_plans' as never,
      { p_student: studentId } as never
    );
    if (e) setError(e.message);
    else {
      setError(null);
      setData(d as unknown as TrainingPlansData);
    }
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const inForce = data?.versions.find((v) => v.status === 'in_force') ?? null;
  const waiting = data?.versions.find((v) => v.status === 'awaiting_signatures') ?? null;
  const draft = data?.versions.find((v) => v.status === 'draft') ?? null;

  return { data, loading, error, refresh, inForce, waiting, draft };
}

async function call<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw new Error(error.message);
  return data as unknown as T;
}

export const saveTrainingPlanDraft = (
  studentId: string,
  content: TrainingPlanContent,
  changeReason: string | null
) =>
  call<{ ok: boolean; id: string; version: number; missing: string[] }>(
    'save_training_plan_draft',
    {
      p_student: studentId,
      p_content: content,
      p_change_reason: changeReason,
    }
  );

export const discardTrainingPlanDraft = (planId: string) =>
  call<{ ok: boolean }>('discard_training_plan_draft', { p_plan: planId });

export const issueTrainingPlan = (planId: string) =>
  call<{ ok?: boolean; error?: string; missing?: string[] }>('issue_training_plan', {
    p_plan: planId,
  });

export const signTrainingPlanAsProvider = (
  planId: string,
  purpose: PlanPurpose,
  name: string,
  title: string | null
) =>
  call<{ ok?: boolean; error?: string; complete?: boolean }>('sign_training_plan_as_provider', {
    p_plan: planId,
    p_purpose: purpose,
    p_name: name,
    p_title: title,
  });

export const requestTrainingPlanDelivered = (planId: string) =>
  call<{ ok: boolean }>('request_training_plan_delivered', { p_plan: planId });

export const getTrainingPlanLinks = (planId: string) =>
  call<Array<{ purpose: PlanPurpose; role: 'apprentice' | 'employer'; token: string }>>(
    'get_training_plan_links',
    { p_plan: planId }
  );

export const verifyTrainingPlan = (planId: string) =>
  call<{ content_unchanged: boolean; signatures_intact: boolean; content_hash: string | null }>(
    'verify_training_plan',
    { p_plan: planId }
  );
