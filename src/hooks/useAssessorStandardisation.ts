import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CalibrationGrade } from '@/hooks/useCalibrationSessions';

/* ==========================================================================
   useAssessorStandardisation — the shared "assessor drift" signal.

   Computed from inter-rater calibration responses (college_calibration_*):
   for each assessor, how consistently do they match the consensus (modal) and
   the HoD reference grade across closed sessions, and in which direction do
   they drift (lenient = grades high, harsh = grades low).

   This is a CONNECTION-FIRST signal: one source consumed by many surfaces —
   the assessor profile, Student 360 (confidence on ACs they signed off), IQA
   sampling (risk weight), and the quality dashboard. Keyed by assessor user_id
   (= college_calibration_responses.tutor_id = ac_signoffs.assessor_signed_by =
   student_ac_coverage.assessor_id), so any surface can look an assessor up.
   ========================================================================== */

const GRADE_ORDINAL: Record<CalibrationGrade, number> = {
  fail: 0,
  pass: 1,
  merit: 2,
  distinction: 3,
};

const MIN_SESSIONS_FOR_ASSESSOR = 2; // need ≥2 data points before flagging
const ALIGNMENT_OUTLIER_PCT = 60; // below this consensus-match % → flag
const DRIFT_OUTLIER_LEVELS = 0.75; // |avg signed drift| at/above this → flag

export type DriftLabel = 'lenient' | 'harsh' | 'aligned';

export interface AssessorStandardisation {
  assessorId: string;
  assessorName: string | null;
  /** Closed calibration sessions this assessor responded to. */
  sessions: number;
  /** % of their grades that matched the session's modal (consensus) grade. */
  consensusAlignmentPct: number;
  /** % matching the HoD reference grade, across sessions where one was set. */
  referenceAccuracyPct: number | null;
  /** Average signed deviation in grade-levels: + = lenient, − = harsh. */
  avgSignedDrift: number;
  driftLabel: DriftLabel;
  /** Flagged as drifting from standard (enough data + off-consensus or drifting). */
  isOutlier: boolean;
}

export interface StandardisationSignal {
  /** Lookup by assessor user_id (= profiles.id) — e.g. portfolio_submissions.assessor_id. */
  byAssessor: Map<string, AssessorStandardisation>;
  /**
   * Lookup by college_staff.id — e.g. student_ac_coverage.assessor_id, which FKs
   * to college_staff.id NOT the user_id. Provided so consumers never trip the
   * college_staff.id vs auth.uid mismatch.
   */
  byStaffId: Map<string, AssessorStandardisation>;
  /** Flagged assessors, most concerning first — for the QA / Tutors views. */
  outliers: AssessorStandardisation[];
  closedSessionCount: number;
  /** True once there's enough calibration history to be meaningful. */
  hasEnoughData: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
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

export function driftLabelFor(avgSignedDrift: number): DriftLabel {
  if (avgSignedDrift >= 0.5) return 'lenient';
  if (avgSignedDrift <= -0.5) return 'harsh';
  return 'aligned';
}

export function useAssessorStandardisation(): StandardisationSignal {
  const [byAssessor, setByAssessor] = useState<Map<string, AssessorStandardisation>>(new Map());
  const [byStaffId, setByStaffId] = useState<Map<string, AssessorStandardisation>>(new Map());
  const [outliers, setOutliers] = useState<AssessorStandardisation[]>([]);
  const [closedSessionCount, setClosedSessionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setByAssessor(new Map());
        setByStaffId(new Map());
        setOutliers([]);
        setClosedSessionCount(0);
        return;
      }

      const { data: sessions, error: sErr } = await supabase
        .from('college_calibration_sessions')
        .select('id, reference_grade')
        .eq('college_id', collegeId)
        .eq('status', 'closed');
      if (sErr) throw sErr;

      const sessionList = (sessions ?? []) as Array<{
        id: string;
        reference_grade: CalibrationGrade | null;
      }>;
      setClosedSessionCount(sessionList.length);
      if (sessionList.length === 0) {
        setByAssessor(new Map());
        setByStaffId(new Map());
        setOutliers([]);
        return;
      }

      const refBySession = new Map(sessionList.map((s) => [s.id, s.reference_grade]));
      const sessionIds = sessionList.map((s) => s.id);

      const { data: responses, error: rErr } = await supabase
        .from('college_calibration_responses')
        .select('session_id, tutor_id, predicted_grade')
        .in('session_id', sessionIds);
      if (rErr) throw rErr;
      const respList = (responses ?? []) as Array<{
        session_id: string;
        tutor_id: string;
        predicted_grade: CalibrationGrade;
      }>;

      // Modal (consensus) grade per session.
      const gradesBySession = new Map<string, CalibrationGrade[]>();
      for (const r of respList) {
        const arr = gradesBySession.get(r.session_id) ?? [];
        arr.push(r.predicted_grade);
        gradesBySession.set(r.session_id, arr);
      }
      const modalBySession = new Map<string, CalibrationGrade | null>();
      for (const [sid, grades] of gradesBySession) {
        const counts: Partial<Record<CalibrationGrade, number>> = {};
        let modal: CalibrationGrade | null = null;
        let modalCount = 0;
        for (const g of grades) {
          const c = (counts[g] ?? 0) + 1;
          counts[g] = c;
          if (c > modalCount) {
            modal = g;
            modalCount = c;
          }
        }
        modalBySession.set(sid, modal);
      }

      // Per-assessor aggregation.
      interface Acc {
        n: number;
        consensusMatch: number;
        refMatch: number;
        refN: number;
        signedSum: number;
      }
      const acc = new Map<string, Acc>();
      for (const r of respList) {
        const a = acc.get(r.tutor_id) ?? {
          n: 0,
          consensusMatch: 0,
          refMatch: 0,
          refN: 0,
          signedSum: 0,
        };
        a.n += 1;
        const modal = modalBySession.get(r.session_id) ?? null;
        const ref = refBySession.get(r.session_id) ?? null;
        const target = ref ?? modal; // prefer the HoD reference grade
        if (modal && r.predicted_grade === modal) a.consensusMatch += 1;
        if (ref) {
          a.refN += 1;
          if (r.predicted_grade === ref) a.refMatch += 1;
        }
        if (target) a.signedSum += GRADE_ORDINAL[r.predicted_grade] - GRADE_ORDINAL[target];
        acc.set(r.tutor_id, a);
      }

      // Assessor names + the user_id → college_staff.id map (so the signal can be
      // looked up by either id — see byStaffId).
      const ids = [...acc.keys()];
      const nameMap = new Map<string, string>();
      const staffIdByUser = new Map<string, string>();
      if (ids.length > 0) {
        const { data: staff } = await supabase
          .from('college_staff')
          .select('id, user_id, name')
          .in('user_id', ids);
        for (const s of (staff ?? []) as Array<{ id: string; user_id: string; name: string }>) {
          nameMap.set(s.user_id, s.name);
          staffIdByUser.set(s.user_id, s.id);
        }
      }

      const map = new Map<string, AssessorStandardisation>();
      for (const [id, a] of acc) {
        const consensusAlignmentPct = a.n ? Math.round((a.consensusMatch / a.n) * 100) : 0;
        const referenceAccuracyPct = a.refN ? Math.round((a.refMatch / a.refN) * 100) : null;
        const avgSignedDrift = a.n ? a.signedSum / a.n : 0;
        const isOutlier =
          a.n >= MIN_SESSIONS_FOR_ASSESSOR &&
          (consensusAlignmentPct < ALIGNMENT_OUTLIER_PCT ||
            Math.abs(avgSignedDrift) >= DRIFT_OUTLIER_LEVELS);
        map.set(id, {
          assessorId: id,
          assessorName: nameMap.get(id) ?? null,
          sessions: a.n,
          consensusAlignmentPct,
          referenceAccuracyPct,
          avgSignedDrift,
          driftLabel: driftLabelFor(avgSignedDrift),
          isOutlier,
        });
      }

      const flagged = [...map.values()]
        .filter((x) => x.isOutlier)
        .sort(
          (x, y) =>
            x.consensusAlignmentPct - y.consensusAlignmentPct ||
            Math.abs(y.avgSignedDrift) - Math.abs(x.avgSignedDrift)
        );

      const byStaff = new Map<string, AssessorStandardisation>();
      for (const [userId, profile] of map) {
        const staffId = staffIdByUser.get(userId);
        if (staffId) byStaff.set(staffId, profile);
      }

      setByAssessor(map);
      setByStaffId(byStaff);
      setOutliers(flagged);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return {
    byAssessor,
    byStaffId,
    outliers,
    closedSessionCount,
    hasEnoughData: closedSessionCount >= 2,
    loading,
    error,
    refetch: fetch,
  };
}
