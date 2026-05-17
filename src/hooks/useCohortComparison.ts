import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCohortComparison — side-by-side cohort stats for the HoD's
   "compare 2-3 cohorts" page.

   For each cohort_id passed in, builds:
     - apprentice count (active)
     - avg progress %
     - avg attendance %
     - total OTJ hours (and verified)
     - EPA verdict counts (ready / almost / not_yet / no_verdict)
     - at-risk count (from student_risk_scores)

   One round-trip per data source (students, attendance, OTJ, EPA,
   risk) — keyed by cohort_id so the consumer can render columns.
   ========================================================================== */

export interface CohortStats {
  cohort_id: string;
  cohort_name: string | null;
  apprentice_count: number;
  avg_progress_pct: number | null;
  avg_attendance_pct: number | null;
  otj_total_hours: number;
  otj_verified_hours: number;
  epa_ready: number;
  epa_almost: number;
  epa_not_yet: number;
  epa_no_verdict: number;
  at_risk: number;
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

export interface CohortLite {
  id: string;
  name: string;
}

export function useAvailableCohorts() {
  const [cohorts, setCohorts] = useState<CohortLite[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setCohorts([]);
        return;
      }
      const { data } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .eq('college_id', collegeId)
        .order('name', { ascending: true });
      setCohorts((data ?? []) as CohortLite[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { cohorts, loading };
}

export function useCohortComparison(cohortIds: string[]) {
  const [rows, setRows] = useState<CohortStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (cohortIds.length === 0) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 1. Cohort labels
      const { data: cohorts } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .in('id', cohortIds);
      const cohortNameMap = new Map(
        ((cohorts ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name])
      );

      // 2. All active students in these cohorts
      const { data: students } = await supabase
        .from('college_students')
        .select('id, user_id, cohort_id, progress_percent, status')
        .in('cohort_id', cohortIds)
        .neq('status', 'withdrawn')
        .neq('status', 'completed');
      const studentList = ((students ?? []) as Array<{
        id: string;
        user_id: string | null;
        cohort_id: string | null;
        progress_percent: number | null;
        status: string | null;
      }>).filter((s) => s.cohort_id);

      const studentIds = studentList.map((s) => s.id);
      const userIds = studentList.map((s) => s.user_id).filter((v): v is string => !!v);

      // 3. Pull attendance, OTJ, EPA judgements, risk in parallel
      const [
        { data: attendance },
        { data: otjEntries },
        { data: judgements },
        { data: riskRows },
      ] = await Promise.all([
        studentIds.length > 0
          ? supabase
              .from('college_attendance')
              .select('student_id, status')
              .in('student_id', studentIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        userIds.length > 0
          ? supabase
              .from('college_otj_entries')
              .select('student_id, duration_minutes, verification_status')
              .in('student_id', userIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        studentIds.length > 0
          ? supabase
              .from('college_epa_judgements')
              .select('college_student_id, source, verdict')
              .in('college_student_id', studentIds)
              .eq('is_current', true)
          : Promise.resolve({ data: [] as any[], error: null }),
        studentIds.length > 0
          ? supabase
              .from('student_risk_scores')
              .select('student_id, level, is_current')
              .in('student_id', studentIds)
              .eq('is_current', true)
          : Promise.resolve({ data: [] as any[], error: null }),
      ]);

      // 4. Roll up per cohort
      const studentToCohort = new Map<string, string>();
      const userToCohort = new Map<string, string>();
      for (const s of studentList) {
        if (s.cohort_id) {
          studentToCohort.set(s.id, s.cohort_id);
          if (s.user_id) userToCohort.set(s.user_id, s.cohort_id);
        }
      }

      // Per-cohort accumulator
      type Acc = {
        progressVals: number[];
        attendancePresent: number;
        attendanceTotal: number;
        otjMin: number;
        otjVerifiedMin: number;
        verdictByStudent: Map<string, { learner?: string; tutor?: string; ai?: string }>;
        atRisk: number;
        apprenticeCount: number;
      };
      const acc = new Map<string, Acc>();
      const ensure = (cohortId: string): Acc => {
        let a = acc.get(cohortId);
        if (!a) {
          a = {
            progressVals: [],
            attendancePresent: 0,
            attendanceTotal: 0,
            otjMin: 0,
            otjVerifiedMin: 0,
            verdictByStudent: new Map(),
            atRisk: 0,
            apprenticeCount: 0,
          };
          acc.set(cohortId, a);
        }
        return a;
      };

      // Students themselves contribute progress + count
      for (const s of studentList) {
        if (!s.cohort_id) continue;
        const a = ensure(s.cohort_id);
        a.apprenticeCount += 1;
        if (typeof s.progress_percent === 'number') a.progressVals.push(s.progress_percent);
      }

      // Attendance
      for (const row of (attendance ?? []) as Array<{ student_id: string; status: string }>) {
        const cohortId = studentToCohort.get(row.student_id);
        if (!cohortId) continue;
        const a = ensure(cohortId);
        a.attendanceTotal += 1;
        if (row.status === 'Present' || row.status === 'Late') a.attendancePresent += 1;
      }

      // OTJ
      for (const row of (otjEntries ?? []) as Array<{
        student_id: string;
        duration_minutes: number;
        verification_status: string | null;
      }>) {
        const cohortId = userToCohort.get(row.student_id);
        if (!cohortId) continue;
        const a = ensure(cohortId);
        a.otjMin += row.duration_minutes ?? 0;
        if (row.verification_status?.startsWith('verified')) {
          a.otjVerifiedMin += row.duration_minutes ?? 0;
        }
      }

      // EPA verdicts — most-recent verdict per (student, source). Verdict
      // taxonomy: ready / almost / not_yet / refer. We bucket per learner
      // using tutor verdict first, then ai, then learner — same precedence
      // as CohortEpaPage.
      for (const row of (judgements ?? []) as Array<{
        college_student_id: string;
        source: 'learner' | 'tutor' | 'ai';
        verdict: string | null;
      }>) {
        const cohortId = studentToCohort.get(row.college_student_id);
        if (!cohortId) continue;
        const a = ensure(cohortId);
        const slot = a.verdictByStudent.get(row.college_student_id) ?? {};
        if (row.source === 'learner') slot.learner = row.verdict ?? undefined;
        if (row.source === 'tutor') slot.tutor = row.verdict ?? undefined;
        if (row.source === 'ai') slot.ai = row.verdict ?? undefined;
        a.verdictByStudent.set(row.college_student_id, slot);
      }

      // Risk
      for (const row of (riskRows ?? []) as Array<{ student_id: string; level: string | null }>) {
        const cohortId = studentToCohort.get(row.student_id);
        if (!cohortId) continue;
        if (row.level && ['high', 'critical', 'amber', 'medium'].includes(row.level.toLowerCase())) {
          ensure(cohortId).atRisk += 1;
        }
      }

      const out: CohortStats[] = cohortIds.map((id) => {
        const a = acc.get(id);
        if (!a) {
          return {
            cohort_id: id,
            cohort_name: cohortNameMap.get(id) ?? null,
            apprentice_count: 0,
            avg_progress_pct: null,
            avg_attendance_pct: null,
            otj_total_hours: 0,
            otj_verified_hours: 0,
            epa_ready: 0,
            epa_almost: 0,
            epa_not_yet: 0,
            epa_no_verdict: 0,
            at_risk: 0,
          };
        }
        let ready = 0;
        let almost = 0;
        let notYet = 0;
        let noVerdict = 0;
        // Iterate by enrolled apprentice count (so silent students show as no_verdict)
        const studentsInCohort = studentList.filter((s) => s.cohort_id === id);
        for (const s of studentsInCohort) {
          const slot = a.verdictByStudent.get(s.id);
          const v = slot?.tutor ?? slot?.ai ?? slot?.learner;
          if (!v) noVerdict += 1;
          else if (v === 'ready') ready += 1;
          else if (v === 'almost') almost += 1;
          else if (v === 'not_yet' || v === 'refer') notYet += 1;
          else noVerdict += 1;
        }

        return {
          cohort_id: id,
          cohort_name: cohortNameMap.get(id) ?? null,
          apprentice_count: a.apprenticeCount,
          avg_progress_pct:
            a.progressVals.length > 0
              ? Math.round(a.progressVals.reduce((s, v) => s + v, 0) / a.progressVals.length)
              : null,
          avg_attendance_pct:
            a.attendanceTotal > 0
              ? Math.round((a.attendancePresent / a.attendanceTotal) * 100)
              : null,
          otj_total_hours: Math.round((a.otjMin / 60) * 10) / 10,
          otj_verified_hours: Math.round((a.otjVerifiedMin / 60) * 10) / 10,
          epa_ready: ready,
          epa_almost: almost,
          epa_not_yet: notYet,
          epa_no_verdict: noVerdict,
          at_risk: a.atRisk,
        };
      });

      setRows(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [cohortIds.join(',')]);

  useEffect(() => {
    void load();
  }, [load]);

  return { rows, loading, error, refresh: load };
}
