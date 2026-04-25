import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useIqaSamplingPlans — list + create + delete IQA sampling plans for the
   user's college. Realtime-subscribed.
   ========================================================================== */

export interface IqaSamplingPlan {
  id: string;
  college_id: string | null;
  iqa_id: string | null;
  iqa_name_snapshot: string | null;
  assessor_id: string | null;
  qualification_code: string | null;
  unit_code: string | null;
  period_start: string;
  period_end: string;
  target_sample_percent: number | null;
  sampled_count: number | null;
  total_assessments: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface NewIqaSamplingPlan {
  iqa_id?: string | null;
  assessor_id?: string | null;
  qualification_code?: string | null;
  unit_code?: string | null;
  period_start: string;
  period_end: string;
  target_sample_percent?: number | null;
  notes?: string | null;
}

const COLS =
  'id, college_id, iqa_id, iqa_name_snapshot, assessor_id, qualification_code, unit_code, period_start, period_end, target_sample_percent, sampled_count, total_assessments, notes, created_at, updated_at';

export function useIqaSamplingPlans() {
  const [plans, setPlans] = useState<IqaSamplingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_iqa_sampling')
      .select(COLS)
      .order('period_start', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setPlans((data ?? []) as IqaSamplingPlan[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel('iqa_sampling_plans')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_iqa_sampling' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  const create = useCallback(async (input: NewIqaSamplingPlan) => {
    const { data: userData } = await supabase.auth.getUser();
    let collegeId: string | null = null;
    if (userData.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userData.user.id)
        .maybeSingle();
      collegeId = (profile?.college_id as string | null) ?? null;
    }
    const { error: insErr } = await supabase
      .from('college_iqa_sampling')
      .insert({
        college_id: collegeId,
        iqa_id: input.iqa_id ?? null,
        assessor_id: input.assessor_id ?? null,
        qualification_code: input.qualification_code ?? null,
        unit_code: input.unit_code ?? null,
        period_start: input.period_start,
        period_end: input.period_end,
        target_sample_percent: input.target_sample_percent ?? null,
        notes: input.notes ?? null,
      });
    if (insErr) throw insErr;
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error: delErr } = await supabase
      .from('college_iqa_sampling')
      .delete()
      .eq('id', id);
    if (delErr) throw delErr;
  }, []);

  return { plans, loading, error, refresh: fetch, create, remove };
}
