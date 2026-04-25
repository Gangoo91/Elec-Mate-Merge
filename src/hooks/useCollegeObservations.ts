import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeObservations — list + create + delete observation records for
   one student. Realtime-subscribed.
   ========================================================================== */

export type ObservationOutcome = 'passed' | 'partial' | 'referred' | 'not_yet';
export type ObservationLocationType =
  | 'classroom'
  | 'workshop'
  | 'employer_site'
  | 'remote'
  | 'other';

export interface CollegeObservation {
  id: string;
  college_id: string;
  college_student_id: string | null;
  student_name_snapshot: string | null;
  college_staff_id: string | null;
  assessor_name_snapshot: string | null;
  observed_at: string;
  observed_time: string | null;
  duration_minutes: number | null;
  location: string | null;
  location_type: ObservationLocationType | null;
  activity_title: string;
  activity_summary: string | null;
  qualification_code: string | null;
  unit_code: string | null;
  acs_evidenced: string[];
  ksbs_observed: string[];
  outcome: ObservationOutcome;
  grade: string | null;
  feedback_strengths: string | null;
  feedback_areas: string | null;
  action_points: string[];
  follow_up_required: boolean;
  follow_up_date: string | null;
  evidence_path: string | null;
  assessor_signed: boolean;
  assessor_signed_at: string | null;
  learner_acknowledged: boolean;
  learner_acknowledged_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewObservationInput {
  college_student_id: string;
  observed_at: string;
  observed_time?: string | null;
  duration_minutes?: number | null;
  location?: string | null;
  location_type?: ObservationLocationType | null;
  activity_title: string;
  activity_summary?: string | null;
  qualification_code?: string | null;
  unit_code?: string | null;
  acs_evidenced?: string[];
  ksbs_observed?: string[];
  outcome: ObservationOutcome;
  grade?: string | null;
  feedback_strengths?: string | null;
  feedback_areas?: string | null;
  action_points?: string[];
  follow_up_required?: boolean;
  follow_up_date?: string | null;
  evidence_path?: string | null;
  assessor_signed?: boolean;
}

const COLS =
  'id, college_id, college_student_id, student_name_snapshot, college_staff_id, assessor_name_snapshot, observed_at, observed_time, duration_minutes, location, location_type, activity_title, activity_summary, qualification_code, unit_code, acs_evidenced, ksbs_observed, outcome, grade, feedback_strengths, feedback_areas, action_points, follow_up_required, follow_up_date, evidence_path, assessor_signed, assessor_signed_at, learner_acknowledged, learner_acknowledged_at, created_at, updated_at';

export function useCollegeObservations(studentId: string | null) {
  const [observations, setObservations] = useState<CollegeObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!studentId) {
      setObservations([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_observations')
      .select(COLS)
      .eq('college_student_id', studentId)
      .order('observed_at', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setObservations((data ?? []) as CollegeObservation[]);
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (!studentId) return;
    const channel = supabase
      .channel(`college_observations:${studentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_observations',
          filter: `college_student_id=eq.${studentId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [studentId, fetch]);

  const create = useCallback(async (input: NewObservationInput) => {
    // Find the assessor's college_staff row by current auth user
    const userRes = await supabase.auth.getUser();
    const userId = userRes.data.user?.id ?? null;
    let assessorStaffId: string | null = null;
    if (userId) {
      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', userId)
        .is('archived_at', null)
        .maybeSingle();
      assessorStaffId = (staff?.id as string | null) ?? null;
    }

    const signed = input.assessor_signed ?? false;
    const { error: insErr } = await supabase.from('college_observations').insert({
      college_student_id: input.college_student_id,
      college_staff_id: assessorStaffId,
      observed_at: input.observed_at,
      observed_time: input.observed_time ?? null,
      duration_minutes: input.duration_minutes ?? null,
      location: input.location ?? null,
      location_type: input.location_type ?? null,
      activity_title: input.activity_title,
      activity_summary: input.activity_summary ?? null,
      qualification_code: input.qualification_code ?? null,
      unit_code: input.unit_code ?? null,
      acs_evidenced: input.acs_evidenced ?? [],
      ksbs_observed: input.ksbs_observed ?? [],
      outcome: input.outcome,
      grade: input.grade ?? null,
      feedback_strengths: input.feedback_strengths ?? null,
      feedback_areas: input.feedback_areas ?? null,
      action_points: input.action_points ?? [],
      follow_up_required: input.follow_up_required ?? false,
      follow_up_date: input.follow_up_date ?? null,
      evidence_path: input.evidence_path ?? null,
      assessor_signed: signed,
      assessor_signed_at: signed ? new Date().toISOString() : null,
      created_by: userId,
    });
    if (insErr) throw insErr;
  }, []);

  const remove = useCallback(async (id: string, evidence_path?: string | null) => {
    const { error: delErr } = await supabase.from('college_observations').delete().eq('id', id);
    if (delErr) throw delErr;
    if (evidence_path) {
      await supabase.storage.from('compliance-evidence').remove([evidence_path]);
    }
  }, []);

  return { observations, loading, error, refresh: fetch, create, remove };
}
