import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logCollegeAction } from '@/services/college/collegeActivityService';

async function audit(
  collegeId: string,
  actorId: string,
  action: string,
  entityId: string,
  details: Record<string, unknown>
) {
  try {
    await logCollegeAction(collegeId, actorId, action, 'calibration_session', entityId, details);
  } catch {
    /* audit log failures must not block the user */
  }
}

/* ==========================================================================
   useCalibrationSessions / useCalibrationSession — inter-rater
   calibration. A HoD posts an anonymised sample, every tutor submits a
   grade + rationale, the hook computes agreement vs the modal grade (and
   vs the reference grade if the HoD provided one).
   ========================================================================== */

export type CalibrationSampleKind =
  | 'portfolio_evidence'
  | 'mock_recording'
  | 'practical_observation'
  | 'professional_discussion'
  | 'knowledge_review';

export type CalibrationGrade = 'distinction' | 'merit' | 'pass' | 'fail';

export interface CalibrationSession {
  id: string;
  college_id: string;
  created_by: string;
  title: string;
  sample_kind: CalibrationSampleKind;
  anonymised_brief: string;
  reference_grade: CalibrationGrade | null;
  status: 'open' | 'closed';
  closed_at: string | null;
  created_at: string;
  response_count?: number;
}

export interface CalibrationResponse {
  id: string;
  session_id: string;
  tutor_id: string;
  predicted_grade: CalibrationGrade;
  predicted_score: number | null;
  rationale: string | null;
  submitted_at: string;
  tutor_name?: string | null;
}

export interface CalibrationStats {
  responseCount: number;
  modalGrade: CalibrationGrade | null;
  agreementPct: number;
  referenceMatchPct: number | null;
  breakdown: Record<CalibrationGrade, number>;
}

async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

export function useCalibrationSessions() {
  const [sessions, setSessions] = useState<CalibrationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setSessions([]);
        return;
      }
      const { data, error: e } = await supabase
        .from('college_calibration_sessions')
        .select('*, college_calibration_responses(count)')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (e) throw e;
      setSessions(
        ((data ?? []) as Array<CalibrationSession & {
          college_calibration_responses?: Array<{ count: number }>;
        }>).map((s) => ({
          ...s,
          response_count: s.college_calibration_responses?.[0]?.count ?? 0,
        }))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const create = useCallback(
    async (input: {
      title: string;
      sample_kind: CalibrationSampleKind;
      anonymised_brief: string;
      reference_grade: CalibrationGrade | null;
    }): Promise<CalibrationSession | null> => {
      const collegeId = await callerCollegeId();
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!collegeId || !userId) throw new Error('No college / not signed in');
      const { data, error: e } = await supabase
        .from('college_calibration_sessions')
        .insert({
          college_id: collegeId,
          created_by: userId,
          title: input.title.trim(),
          sample_kind: input.sample_kind,
          anonymised_brief: input.anonymised_brief.trim(),
          reference_grade: input.reference_grade,
          status: 'open',
        })
        .select('*')
        .single();
      if (e) throw e;
      const created = data as CalibrationSession;
      void audit(collegeId, userId, 'calibration_session_created', created.id, {
        title: created.title,
        sample_kind: created.sample_kind,
        reference_grade: created.reference_grade,
      });
      await fetch();
      return created;
    },
    [fetch]
  );

  const close = useCallback(
    async (id: string) => {
      const { data, error: e } = await supabase
        .from('college_calibration_sessions')
        .update({ status: 'closed', closed_at: new Date().toISOString() })
        .eq('id', id)
        .select('id, college_id')
        .single();
      if (e) throw e;
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      const collegeId = (data as { college_id?: string | null } | null)?.college_id;
      if (collegeId && userId) {
        void audit(collegeId, userId, 'calibration_session_closed', id, {});
      }
      await fetch();
    },
    [fetch]
  );

  return { sessions, loading, error, refetch: fetch, create, close };
}

export function useCalibrationSession(sessionId: string | null) {
  const [session, setSession] = useState<CalibrationSession | null>(null);
  const [responses, setResponses] = useState<CalibrationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!sessionId) {
      setSession(null);
      setResponses([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      setMe(userRes.user?.id ?? null);

      const [{ data: s, error: sErr }, { data: rs, error: rErr }] = await Promise.all([
        supabase
          .from('college_calibration_sessions')
          .select('*')
          .eq('id', sessionId)
          .maybeSingle(),
        supabase
          .from('college_calibration_responses')
          .select('*')
          .eq('session_id', sessionId)
          .order('submitted_at', { ascending: true }),
      ]);
      if (sErr) throw sErr;
      if (rErr) throw rErr;

      const tutorIds = Array.from(
        new Set(((rs ?? []) as CalibrationResponse[]).map((r) => r.tutor_id))
      );
      const nameMap = new Map<string, string>();
      if (tutorIds.length > 0) {
        const { data: staffRows } = await supabase
          .from('college_staff')
          .select('user_id, name')
          .in('user_id', tutorIds);
        for (const r of (staffRows ?? []) as Array<{ user_id: string; name: string }>) {
          nameMap.set(r.user_id, r.name);
        }
      }
      setSession((s ?? null) as CalibrationSession | null);
      setResponses(
        ((rs ?? []) as CalibrationResponse[]).map((r) => ({
          ...r,
          tutor_name: nameMap.get(r.tutor_id) ?? null,
        }))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const submit = useCallback(
    async (input: {
      predicted_grade: CalibrationGrade;
      predicted_score: number | null;
      rationale: string | null;
    }) => {
      if (!sessionId) throw new Error('No session');
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) throw new Error('Not signed in');
      const { error: e } = await supabase
        .from('college_calibration_responses')
        .upsert(
          {
            session_id: sessionId,
            tutor_id: userId,
            predicted_grade: input.predicted_grade,
            predicted_score: input.predicted_score,
            rationale: input.rationale,
          },
          { onConflict: 'session_id,tutor_id' }
        );
      if (e) throw e;
      if (session?.college_id) {
        void audit(session.college_id, userId, 'calibration_response_submitted', sessionId, {
          predicted_grade: input.predicted_grade,
          predicted_score: input.predicted_score,
        });
      }
      await fetch();
    },
    [sessionId, fetch, session]
  );

  const stats: CalibrationStats = useMemo(() => {
    const breakdown: Record<CalibrationGrade, number> = {
      distinction: 0,
      merit: 0,
      pass: 0,
      fail: 0,
    };
    for (const r of responses) breakdown[r.predicted_grade] += 1;
    let modal: CalibrationGrade | null = null;
    let modalCount = 0;
    for (const [grade, count] of Object.entries(breakdown) as Array<[CalibrationGrade, number]>) {
      if (count > modalCount) {
        modal = grade;
        modalCount = count;
      }
    }
    const total = responses.length;
    const agreement = total > 0 && modal ? Math.round((modalCount / total) * 100) : 0;
    const refMatch =
      session?.reference_grade && total > 0
        ? Math.round((breakdown[session.reference_grade] / total) * 100)
        : null;
    return {
      responseCount: total,
      modalGrade: modal,
      agreementPct: agreement,
      referenceMatchPct: refMatch,
      breakdown,
    };
  }, [responses, session]);

  const myResponse = useMemo(
    () => responses.find((r) => r.tutor_id === me) ?? null,
    [responses, me]
  );

  return { session, responses, stats, loading, error, refetch: fetch, submit, myResponse, me };
}
