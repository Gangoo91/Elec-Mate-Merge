import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTutorObservations — observations OF tutors (peer / IQA / HoD / learning
   walk / standardisation). 360 view per tutor + create + acknowledge.
   ELE-935 (K3).
   ========================================================================== */

export type ObservationKind =
  | 'peer'
  | 'iqa'
  | 'hod'
  | 'learning_walk'
  | 'standardisation'
  | 'self'
  | 'external';

export type ObservationGrade =
  | 'outstanding'
  | 'good'
  | 'requires_improvement'
  | 'inadequate'
  | 'developmental';

export interface TutorObservation {
  id: string;
  college_id: string;
  tutor_staff_id: string;
  tutor_name_snapshot: string | null;
  observer_staff_id: string | null;
  observer_name_snapshot: string | null;
  observer_role: string | null;
  observation_kind: ObservationKind;
  observed_at: string;
  observed_time: string | null;
  duration_minutes: number | null;
  lesson_plan_id: string | null;
  cohort_id: string | null;
  location: string | null;
  focus_area: string | null;
  strengths: string | null;
  areas_for_development: string | null;
  agreed_actions: Array<{ action: string; owner?: string; target_date?: string }>;
  grade: ObservationGrade | null;
  evidence_url: string | null;
  tutor_acknowledged: boolean;
  tutor_acknowledged_at: string | null;
  tutor_response: string | null;
  created_at: string;
  updated_at: string;
}

export interface TutorObsRollup {
  college_id: string;
  tutor_staff_id: string;
  tutor_name: string;
  total_obs_12m: number;
  peer_count: number;
  iqa_count: number;
  hod_count: number;
  walk_count: number;
  standardisation_count: number;
  last_observed_at: string | null;
  latest_grade: ObservationGrade | null;
}

export function useTutorObservations(tutorStaffId?: string | null) {
  const [observations, setObservations] = useState<TutorObservation[]>([]);
  const [rollup, setRollup] = useState<TutorObsRollup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let q = supabase
        .from('college_tutor_observations')
        .select('*')
        .order('observed_at', { ascending: false })
        .limit(200);
      if (tutorStaffId) q = q.eq('tutor_staff_id', tutorStaffId);
      const [obsRes, rollupRes] = await Promise.all([
        q,
        supabase.from('college_tutor_obs_rollup').select('*'),
      ]);
      if (obsRes.error) throw obsRes.error;
      if (rollupRes.error) throw rollupRes.error;
      setObservations((obsRes.data ?? []) as TutorObservation[]);
      setRollup((rollupRes.data ?? []) as TutorObsRollup[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [tutorStaffId]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const create = useCallback(
    async (
      input: Partial<TutorObservation> & {
        college_id: string;
        tutor_staff_id: string;
        observation_kind: ObservationKind;
        observed_at: string;
      }
    ) => {
      const { data: userRes } = await supabase.auth.getUser();
      const { error: insErr } = await supabase.from('college_tutor_observations').insert({
        ...input,
        created_by: userRes.user?.id ?? null,
      });
      if (insErr) throw insErr;
      await fetchAll();
    },
    [fetchAll]
  );

  const acknowledge = useCallback(
    async (id: string, response?: string) => {
      const { error: updErr } = await supabase
        .from('college_tutor_observations')
        .update({
          tutor_acknowledged: true,
          tutor_acknowledged_at: new Date().toISOString(),
          tutor_response: response ?? null,
        })
        .eq('id', id);
      if (updErr) throw updErr;
      await fetchAll();
    },
    [fetchAll]
  );

  return { observations, rollup, loading, error, create, acknowledge, refetch: fetchAll };
}
