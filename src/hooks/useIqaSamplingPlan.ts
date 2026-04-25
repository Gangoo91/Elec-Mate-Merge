import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { IqaSamplingPlan } from '@/hooks/useIqaSamplingPlans';

/* ==========================================================================
   useIqaSamplingPlan — single plan + its samples + eligible observations.
   ========================================================================== */

export type SampleVerdict = 'pending' | 'agree' | 'disagree' | 'refer';

export interface IqaSampleRow {
  id: string;
  sampling_plan_id: string;
  observation_id: string | null;
  observation_title_snapshot: string | null;
  observation_date_snapshot: string | null;
  iqa_id: string | null;
  iqa_name_snapshot: string | null;
  sampled_at: string;
  verdict: SampleVerdict;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

export interface EligibleObservation {
  id: string;
  observed_at: string;
  activity_title: string;
  outcome: string;
  college_student_id: string | null;
  student_name_snapshot: string | null;
  college_staff_id: string | null;
  assessor_name_snapshot: string | null;
  qualification_code: string | null;
  unit_code: string | null;
  acs_evidenced: string[];
}

export interface PlanData {
  plan: IqaSamplingPlan | null;
  samples: IqaSampleRow[];
  eligible: EligibleObservation[];
  loading: boolean;
  error: string | null;
}

const PLAN_COLS =
  'id, college_id, iqa_id, iqa_name_snapshot, assessor_id, qualification_code, unit_code, period_start, period_end, target_sample_percent, sampled_count, total_assessments, notes, created_at, updated_at';

const SAMPLE_COLS =
  'id, sampling_plan_id, observation_id, observation_title_snapshot, observation_date_snapshot, iqa_id, iqa_name_snapshot, sampled_at, verdict, comments, created_at, updated_at';

const OBS_COLS =
  'id, observed_at, activity_title, outcome, college_student_id, student_name_snapshot, college_staff_id, assessor_name_snapshot, qualification_code, unit_code, acs_evidenced';

export function useIqaSamplingPlan(planId: string | null) {
  const [plan, setPlan] = useState<IqaSamplingPlan | null>(null);
  const [samples, setSamples] = useState<IqaSampleRow[]>([]);
  const [eligible, setEligible] = useState<EligibleObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!planId) {
      setPlan(null);
      setSamples([]);
      setEligible([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const planRes = await supabase
      .from('college_iqa_sampling')
      .select(PLAN_COLS)
      .eq('id', planId)
      .maybeSingle();
    if (planRes.error) {
      setError(planRes.error.message);
      setLoading(false);
      return;
    }
    const planData = planRes.data as IqaSamplingPlan | null;
    setPlan(planData);
    if (!planData) {
      setSamples([]);
      setEligible([]);
      setLoading(false);
      return;
    }

    // Load samples + eligible observations in parallel
    const samplesQuery = supabase
      .from('college_iqa_samples')
      .select(SAMPLE_COLS)
      .eq('sampling_plan_id', planId)
      .order('sampled_at', { ascending: false });

    // Eligible: observations within the plan's period; if assessor is set,
    // narrow to that assessor; if qualification/unit is set, narrow further.
    let obsQuery = supabase
      .from('college_observations')
      .select(OBS_COLS)
      .gte('observed_at', planData.period_start)
      .lte('observed_at', planData.period_end);
    if (planData.assessor_id) {
      obsQuery = obsQuery.eq('college_staff_id', planData.assessor_id);
    }
    if (planData.qualification_code) {
      obsQuery = obsQuery.eq('qualification_code', planData.qualification_code);
    }
    if (planData.unit_code) {
      obsQuery = obsQuery.eq('unit_code', planData.unit_code);
    }
    obsQuery = obsQuery.order('observed_at', { ascending: false });

    const [samplesRes, obsRes] = await Promise.all([samplesQuery, obsQuery]);

    setSamples((samplesRes.data ?? []) as IqaSampleRow[]);

    // Filter out observations already sampled
    const sampledObsIds = new Set(
      ((samplesRes.data ?? []) as IqaSampleRow[])
        .map((s) => s.observation_id)
        .filter((id): id is string => !!id)
    );
    const eligibleList = ((obsRes.data ?? []) as EligibleObservation[]).filter(
      (o) => !sampledObsIds.has(o.id)
    );
    setEligible(eligibleList);

    // If total_assessments has drifted from the eligible+sampled total,
    // reconcile silently — useful for the plan stats.
    const total = eligibleList.length + (samplesRes.data ?? []).length;
    if (total !== (planData.total_assessments ?? 0)) {
      await supabase
        .from('college_iqa_sampling')
        .update({ total_assessments: total })
        .eq('id', planId);
    }

    setLoading(false);
  }, [planId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime: any change to samples or observations refetches
  useEffect(() => {
    if (!planId) return;
    const channel = supabase
      .channel(`iqa_plan:${planId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_iqa_samples',
          filter: `sampling_plan_id=eq.${planId}`,
        },
        () => fetch()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_observations' },
        () => fetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_iqa_sampling',
          filter: `id=eq.${planId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [planId, fetch]);

  /* ─── Mutations ─── */

  const addSample = useCallback(
    async (observationId: string) => {
      if (!planId) throw new Error('No plan id');
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;
      let iqaStaffId: string | null = null;
      if (userId) {
        const { data: staff } = await supabase
          .from('college_staff')
          .select('id')
          .eq('user_id', userId)
          .is('archived_at', null)
          .maybeSingle();
        iqaStaffId = (staff?.id as string | null) ?? null;
      }
      const { error: insErr } = await supabase
        .from('college_iqa_samples')
        .insert({
          sampling_plan_id: planId,
          observation_id: observationId,
          iqa_id: iqaStaffId,
          verdict: 'pending',
        });
      if (insErr) throw insErr;
    },
    [planId]
  );

  const setVerdict = useCallback(
    async (sampleId: string, verdict: SampleVerdict, comments?: string) => {
      const { error: updErr } = await supabase
        .from('college_iqa_samples')
        .update({
          verdict,
          comments: comments?.trim() || null,
        })
        .eq('id', sampleId);
      if (updErr) throw updErr;
    },
    []
  );

  const removeSample = useCallback(async (sampleId: string) => {
    const { error: delErr } = await supabase
      .from('college_iqa_samples')
      .delete()
      .eq('id', sampleId);
    if (delErr) throw delErr;
  }, []);

  return {
    plan,
    samples,
    eligible,
    loading,
    error,
    refresh: fetch,
    addSample,
    setVerdict,
    removeSample,
  };
}
