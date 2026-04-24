import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudent360 — single fetch, single hook, one student's full profile.
   Keeps the page simple — everything loaded in parallel, surfaced as one
   object with per-slice `loading` flags so sections can render progressively.
   ========================================================================== */

export interface StudentCore {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  uln: string | null;
  photo_url: string | null;
  cohort_id: string | null;
  cohort_name: string | null;
  course_id: string | null;
  course_name: string | null;
  employer_id: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  status: string | null;
  progress_percent: number | null;
  risk_level: string | null;
}

export interface AttendanceRow {
  id: string;
  date: string;
  status: string;
  notes: string | null;
}

export interface GradeRow {
  id: string;
  unit_name: string | null;
  assessment_type: string | null;
  grade: string | null;
  score: number | null;
  assessed_at: string | null;
  feedback: string | null;
}

export interface AcCoverageRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  status: 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed';
  evidence_count: number;
  last_evidence_at: string | null;
}

export interface PastoralNote {
  id: string;
  kind: string;
  visibility: string;
  title: string | null;
  body: string;
  action_required: string | null;
  action_by_date: string | null;
  action_completed_at: string | null;
  author_id: string | null;
  author_name?: string | null;
  created_at: string;
}

export interface RiskSnapshot {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: { key: string; label: string; severity: number; detail?: string }[];
  signals: Record<string, unknown>;
  computed_at: string;
}

export interface Student360 {
  core: StudentCore | null;
  attendance: AttendanceRow[];
  grades: GradeRow[];
  acCoverage: AcCoverageRow[];
  notes: PastoralNote[];
  risk: RiskSnapshot | null;
  riskHistory: { computed_at: string; score: number; level: string }[];
  loading: {
    core: boolean;
    attendance: boolean;
    grades: boolean;
    acCoverage: boolean;
    notes: boolean;
    risk: boolean;
  };
  error: string | null;
  refresh: () => Promise<void>;
  /**
   * Optimistically insert a note at the top of the list — returns a token
   * the caller can use to `confirmOptimisticNote(token, serverRow)` or
   * `rollbackOptimisticNote(token)` after the server responds.
   */
  prependOptimisticNote: (draft: Omit<PastoralNote, 'id' | 'created_at'>) => string;
  confirmOptimisticNote: (token: string, serverRow: PastoralNote) => void;
  rollbackOptimisticNote: (token: string) => void;
}

export function useStudent360(studentId: string | null): Student360 {
  const [core, setCore] = useState<StudentCore | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [grades, setGrades] = useState<GradeRow[]>([]);
  const [acCoverage, setAcCoverage] = useState<AcCoverageRow[]>([]);
  const [notes, setNotes] = useState<PastoralNote[]>([]);
  const [risk, setRisk] = useState<RiskSnapshot | null>(null);
  const [riskHistory, setRiskHistory] = useState<
    { computed_at: string; score: number; level: string }[]
  >([]);

  const [loading, setLoading] = useState<Student360['loading']>({
    core: true,
    attendance: true,
    grades: true,
    acCoverage: true,
    notes: true,
    risk: true,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!studentId) return;
    setError(null);
    setLoading({
      core: true,
      attendance: true,
      grades: true,
      acCoverage: true,
      notes: true,
      risk: true,
    });

    const corePromise = supabase
      .from('college_students')
      .select(
        'id, name, email, phone, uln, photo_url, cohort_id, course_id, employer_id, start_date, expected_end_date, status, progress_percent, risk_level, college_cohorts(name), college_courses(title)'
      )
      .eq('id', studentId)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err) throw err;
        if (!data) {
          setCore(null);
          return;
        }
        setCore({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          uln: data.uln,
          photo_url: data.photo_url,
          cohort_id: data.cohort_id,
          cohort_name:
            (data.college_cohorts as { name?: string } | null)?.name ?? null,
          course_id: data.course_id,
          course_name:
            (data.college_courses as { title?: string } | null)?.title ?? null,
          employer_id: data.employer_id,
          start_date: data.start_date,
          expected_end_date: data.expected_end_date,
          status: data.status,
          progress_percent: data.progress_percent,
          risk_level: data.risk_level,
        });
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading((l) => ({ ...l, core: false })));

    const attendancePromise = supabase
      .from('college_attendance')
      .select('id, date, status, notes')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
      .limit(60)
      .then(({ data }) => {
        setAttendance((data ?? []) as AttendanceRow[]);
      })
      .finally(() => setLoading((l) => ({ ...l, attendance: false })));

    const gradesPromise = supabase
      .from('college_grades')
      .select('id, unit_name, assessment_type, grade, score, assessed_at, feedback')
      .eq('student_id', studentId)
      .order('assessed_at', { ascending: false, nullsFirst: false })
      .limit(20)
      .then(({ data }) => {
        setGrades((data ?? []) as GradeRow[]);
      })
      .finally(() => setLoading((l) => ({ ...l, grades: false })));

    const coveragePromise = supabase
      .from('student_ac_coverage')
      .select(
        'qualification_code, unit_code, ac_code, status, evidence_count, last_evidence_at'
      )
      .eq('student_id', studentId)
      .then(({ data }) => {
        setAcCoverage((data ?? []) as AcCoverageRow[]);
      })
      .finally(() => setLoading((l) => ({ ...l, acCoverage: false })));

    const notesPromise = supabase
      .from('pastoral_notes')
      .select(
        'id, kind, visibility, title, body, action_required, action_by_date, action_completed_at, author_id, created_at, college_staff(name)'
      )
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setNotes(
          ((data ?? []) as unknown as Array<
            PastoralNote & { college_staff: { name: string } | null }
          >).map((n) => ({
            ...n,
            author_name: n.college_staff?.name ?? null,
          }))
        );
      })
      .finally(() => setLoading((l) => ({ ...l, notes: false })));

    const riskCurrentPromise = supabase
      .from('student_risk_scores')
      .select('score, level, factors, signals, computed_at')
      .eq('student_id', studentId)
      .eq('is_current', true)
      .order('computed_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setRisk({
            score: Number(data.score),
            level: data.level as RiskSnapshot['level'],
            factors: (data.factors as RiskSnapshot['factors']) ?? [],
            signals: (data.signals as Record<string, unknown>) ?? {},
            computed_at: data.computed_at,
          });
        } else {
          setRisk(null);
        }
      });

    const riskHistoryPromise = supabase
      .from('student_risk_scores')
      .select('computed_at, score, level')
      .eq('student_id', studentId)
      .order('computed_at', { ascending: false })
      .limit(14)
      .then(({ data }) => {
        setRiskHistory(
          ((data ?? []) as { computed_at: string; score: number; level: string }[])
            .slice()
            .reverse()
        );
      });

    await Promise.all([
      corePromise,
      attendancePromise,
      gradesPromise,
      coveragePromise,
      notesPromise,
      Promise.all([riskCurrentPromise, riskHistoryPromise]).finally(() =>
        setLoading((l) => ({ ...l, risk: false }))
      ),
    ]);
  }, [studentId]);

  useEffect(() => {
    if (studentId) fetchAll();
  }, [studentId, fetchAll]);

  // Realtime: listen for new pastoral notes for this student and merge them
  // into local state. Skips rows we already have (e.g. when the optimistic
  // bubble + confirm already happened).
  useEffect(() => {
    if (!studentId) return;
    const channel = supabase
      .channel(`pastoral_notes:${studentId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pastoral_notes',
          filter: `student_id=eq.${studentId}`,
        },
        (payload) => {
          const row = payload.new as PastoralNote;
          setNotes((prev) => {
            if (prev.some((n) => n.id === row.id)) return prev;
            return [row, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'pastoral_notes',
          filter: `student_id=eq.${studentId}`,
        },
        (payload) => {
          const row = payload.new as PastoralNote;
          setNotes((prev) => prev.map((n) => (n.id === row.id ? { ...n, ...row } : n)));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [studentId]);

  const prependOptimisticNote = useCallback(
    (draft: Omit<PastoralNote, 'id' | 'created_at'>) => {
      const token = `optimistic-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const optimistic: PastoralNote = {
        ...draft,
        id: token,
        created_at: new Date().toISOString(),
      };
      setNotes((prev) => [optimistic, ...prev]);
      return token;
    },
    []
  );

  const confirmOptimisticNote = useCallback((token: string, serverRow: PastoralNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === token ? serverRow : n))
    );
  }, []);

  const rollbackOptimisticNote = useCallback((token: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== token));
  }, []);

  return useMemo(
    () => ({
      core,
      attendance,
      grades,
      acCoverage,
      notes,
      risk,
      riskHistory,
      loading,
      error,
      refresh: fetchAll,
      prependOptimisticNote,
      confirmOptimisticNote,
      rollbackOptimisticNote,
    }),
    [
      core,
      attendance,
      grades,
      acCoverage,
      notes,
      risk,
      riskHistory,
      loading,
      error,
      fetchAll,
      prependOptimisticNote,
      confirmOptimisticNote,
      rollbackOptimisticNote,
    ]
  );
}
