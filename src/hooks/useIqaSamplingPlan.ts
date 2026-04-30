import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { IqaSamplingPlan } from '@/hooks/useIqaSamplingPlans';

/* ==========================================================================
   useIqaSamplingPlan — single plan + its samples + eligible observations.
   ========================================================================== */

export type SampleVerdict = 'pending' | 'agree' | 'disagree' | 'refer';

/** Sample row covers BOTH observation- and OTJ-targeted IQA samples.
    A row sets exactly one of observation_id / otj_id (DB check enforces this). */
export interface IqaSampleRow {
  id: string;
  sampling_plan_id: string;
  /** Set when sample is an observation review. Null for OTJ samples. */
  observation_id: string | null;
  observation_title_snapshot: string | null;
  observation_date_snapshot: string | null;
  /** Set when sample is an OTJ entry review. Null for observation samples. */
  otj_id: string | null;
  otj_title_snapshot: string | null;
  otj_date_snapshot: string | null;
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

export interface EligibleOtjEntry {
  id: string;
  activity_date: string;
  title: string;
  duration_minutes: number | null;
  verification_status: string | null;
  verified_at: string | null;
  unit_codes: string[] | null;
  /** auth.uid of the apprentice — the OTJ table keys on this. */
  student_id: string;
  /** Verifier college_staff.id — set when an assessor signed it off. */
  verified_by: string | null;
}

export interface PlanData {
  plan: IqaSamplingPlan | null;
  samples: IqaSampleRow[];
  eligible: EligibleObservation[];
  eligibleOtj: EligibleOtjEntry[];
  loading: boolean;
  error: string | null;
}

const PLAN_COLS =
  'id, college_id, iqa_id, iqa_name_snapshot, assessor_id, qualification_code, unit_code, period_start, period_end, target_sample_percent, sampled_count, total_assessments, notes, created_at, updated_at';

const SAMPLE_COLS =
  'id, sampling_plan_id, observation_id, observation_title_snapshot, observation_date_snapshot, otj_id, otj_title_snapshot, otj_date_snapshot, iqa_id, iqa_name_snapshot, sampled_at, verdict, comments, created_at, updated_at';

const OBS_COLS =
  'id, observed_at, activity_title, outcome, college_student_id, student_name_snapshot, college_staff_id, assessor_name_snapshot, qualification_code, unit_code, acs_evidenced';

const OTJ_COLS =
  'id, activity_date, title, duration_minutes, verification_status, verified_at, unit_codes, student_id, verified_by';

export function useIqaSamplingPlan(planId: string | null) {
  const [plan, setPlan] = useState<IqaSamplingPlan | null>(null);
  const [samples, setSamples] = useState<IqaSampleRow[]>([]);
  const [eligible, setEligible] = useState<EligibleObservation[]>([]);
  const [eligibleOtj, setEligibleOtj] = useState<EligibleOtjEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!planId) {
      setPlan(null);
      setSamples([]);
      setEligible([]);
      setEligibleOtj([]);
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
      setEligibleOtj([]);
      setLoading(false);
      return;
    }

    // Load samples + eligible observations + eligible OTJ in parallel
    const samplesQuery = supabase
      .from('college_iqa_samples')
      .select(SAMPLE_COLS)
      .eq('sampling_plan_id', planId)
      .order('sampled_at', { ascending: false });

    // Eligible observations: within plan period, narrowed by assessor /
    // qualification / unit when set on the plan.
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

    // Eligible OTJ: only ASSESSOR-VERIFIED entries within plan period — IQA
    // is sampling the assessor's verification verdict, so unverified entries
    // aren't yet in scope.
    //
    // ID-mapping gotcha: `plan.assessor_id` is a `college_staff.id`, but
    // `college_otj_entries.verified_by` is an `auth.uid` (profiles.id).
    // We resolve staff → user_id first, then filter — directly comparing
    // would silently return zero matches.
    let assessorAuthUid: string | null = null;
    if (planData.assessor_id) {
      const { data: staff } = await supabase
        .from('college_staff')
        .select('user_id')
        .eq('id', planData.assessor_id)
        .maybeSingle();
      assessorAuthUid = (staff as { user_id?: string | null } | null)?.user_id ?? null;
    }
    let otjQuery = supabase
      .from('college_otj_entries')
      .select(OTJ_COLS)
      .eq('verification_status', 'verified')
      .gte('activity_date', planData.period_start)
      .lte('activity_date', planData.period_end);
    if (assessorAuthUid) {
      otjQuery = otjQuery.eq('verified_by', assessorAuthUid);
    } else if (planData.assessor_id) {
      // Plan targets a specific assessor but we couldn't resolve their user_id —
      // return no eligible OTJ rather than leaking other assessors' verdicts.
      otjQuery = otjQuery.eq('verified_by', '00000000-0000-0000-0000-000000000000');
    }
    otjQuery = otjQuery.order('activity_date', { ascending: false });

    const [samplesRes, obsRes, otjRes] = await Promise.all([samplesQuery, obsQuery, otjQuery]);

    const sampleRows = (samplesRes.data ?? []) as IqaSampleRow[];
    setSamples(sampleRows);

    // Filter out observations already sampled in this plan
    const sampledObsIds = new Set(
      sampleRows.map((s) => s.observation_id).filter((id): id is string => !!id)
    );
    const eligibleList = ((obsRes.data ?? []) as EligibleObservation[]).filter(
      (o) => !sampledObsIds.has(o.id)
    );
    setEligible(eligibleList);

    // Filter out OTJ entries already sampled in this plan
    const sampledOtjIds = new Set(
      sampleRows.map((s) => s.otj_id).filter((id): id is string => !!id)
    );
    const eligibleOtjList = ((otjRes.data ?? []) as EligibleOtjEntry[]).filter(
      (o) => !sampledOtjIds.has(o.id)
    );
    setEligibleOtj(eligibleOtjList);

    // Reconcile plan total_assessments — sum across both target types.
    const total = eligibleList.length + eligibleOtjList.length + sampleRows.length;
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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_observations' }, () =>
        fetch()
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_otj_entries' }, () =>
        fetch()
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

  /** Resolve the caller's college_staff.id once per mutation. The samples
      table records IQA identity for audit; the verdict chain is invalid if
      we don't know who sampled. */
  const resolveIqaStaffId = useCallback(async (): Promise<string | null> => {
    const userRes = await supabase.auth.getUser();
    const userId = userRes.data.user?.id ?? null;
    if (!userId) return null;
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', userId)
      .is('archived_at', null)
      .maybeSingle();
    return (staff?.id as string | null) ?? null;
  }, []);

  const addSample = useCallback(
    async (observationId: string) => {
      if (!planId) throw new Error('No plan id');
      const iqaStaffId = await resolveIqaStaffId();
      const { error: insErr } = await supabase.from('college_iqa_samples').insert({
        sampling_plan_id: planId,
        observation_id: observationId,
        iqa_id: iqaStaffId,
        verdict: 'pending',
      });
      if (insErr) throw insErr;
    },
    [planId, resolveIqaStaffId]
  );

  /** Add an OTJ entry to the sampling pool. Snapshots title + date so the
      audit chain survives any later edits to the source OTJ row. */
  const addOtjSample = useCallback(
    async (otj: { id: string; title: string; activity_date: string }) => {
      if (!planId) throw new Error('No plan id');
      const iqaStaffId = await resolveIqaStaffId();
      const { error: insErr } = await supabase.from('college_iqa_samples').insert({
        sampling_plan_id: planId,
        otj_id: otj.id,
        otj_title_snapshot: otj.title.slice(0, 240),
        otj_date_snapshot: otj.activity_date,
        iqa_id: iqaStaffId,
        verdict: 'pending',
      });
      if (insErr) throw insErr;
    },
    [planId, resolveIqaStaffId]
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
    eligibleOtj,
    loading,
    error,
    refresh: fetch,
    addSample,
    addOtjSample,
    setVerdict,
    removeSample,
  };
}
