import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   useCohortEpaReadiness — every active apprentice in the staff's college,
   each with their current Learner / Tutor / AI verdicts. Fuel for the
   cohort EPA dashboard.
   ========================================================================== */

export interface CohortLearner {
  id: string;
  name: string;
  user_id: string | null;
  course_code: string | null;
  course_name: string | null;
  cohort_id: string | null;
  status: string | null;
  // Most recent judgement per source
  learner: EpaJudgement | null;
  tutor: EpaJudgement | null;
  ai: EpaJudgement | null;
  // Convenience aggregates for sorting / filtering
  best_position: number | null; // 0-100 readiness score (max across voices)
  worst_position: number | null;
  has_blocker: boolean;
  any_verdict: boolean;
}

const BAND_BOUNDS: Record<string, [number, number]> = {
  refer: [0, 25],
  not_yet: [25, 50],
  almost: [50, 75],
  ready: [75, 100],
};

function judgementPosition(j: EpaJudgement | null): number | null {
  if (!j?.verdict) return null;
  const [lo, hi] = BAND_BOUNDS[j.verdict] ?? [0, 100];
  const conf = j.confidence ?? 50;
  const t = Math.min(100, Math.max(0, conf)) / 100;
  return Math.round(lo + (hi - lo) * t);
}

export function useCohortEpaReadiness(args: { collegeId: string | null }) {
  const { collegeId } = args;
  const [learners, setLearners] = useState<CohortLearner[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!collegeId) {
      setLearners([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Active apprentices in this college
    const { data: students } = await supabase
      .from('college_students')
      .select('id, user_id, name, course_id, cohort_id, status')
      .eq('college_id', collegeId)
      .neq('status', 'withdrawn')
      .neq('status', 'completed');
    const list = ((students ?? []) as Array<{
      id: string;
      user_id: string | null;
      name: string;
      course_id: string | null;
      cohort_id: string | null;
      status: string | null;
    }>);

    if (list.length === 0) {
      setLearners([]);
      setLoading(false);
      return;
    }

    // Course names — minimise round-trips
    const courseIds = Array.from(new Set(list.map((s) => s.course_id).filter(Boolean) as string[]));
    const courseMap = new Map<string, { code: string | null; name: string | null }>();
    if (courseIds.length > 0) {
      const { data: courses } = await supabase
        .from('college_courses')
        .select('id, code, name')
        .in('id', courseIds);
      for (const c of (courses ?? []) as Array<{ id: string; code: string | null; name: string | null }>) {
        courseMap.set(c.id, { code: c.code, name: c.name });
      }
    }

    // All current judgements for these learners in one shot
    const ids = list.map((s) => s.id);
    const { data: js } = await supabase
      .from('college_epa_judgements')
      .select('*')
      .in('college_student_id', ids)
      .eq('is_current', true);
    const judgementsByStudent = new Map<string, EpaJudgement[]>();
    for (const row of ((js ?? []) as unknown) as EpaJudgement[]) {
      const arr = judgementsByStudent.get(row.college_student_id) ?? [];
      arr.push(row);
      judgementsByStudent.set(row.college_student_id, arr);
    }

    const out: CohortLearner[] = list.map((s) => {
      const arr = judgementsByStudent.get(s.id) ?? [];
      const learner = arr.find((j) => j.source === 'learner') ?? null;
      const tutor = arr.find((j) => j.source === 'tutor') ?? null;
      const ai = arr.find((j) => j.source === 'ai') ?? null;
      const positions = [judgementPosition(learner), judgementPosition(tutor), judgementPosition(ai)].filter(
        (p): p is number => p !== null
      );
      const best = positions.length ? Math.max(...positions) : null;
      const worst = positions.length ? Math.min(...positions) : null;
      const hasBlocker = arr.some((j) => (j.blockers?.length ?? 0) > 0);
      return {
        id: s.id,
        name: s.name,
        user_id: s.user_id,
        course_code: s.course_id ? courseMap.get(s.course_id)?.code ?? null : null,
        course_name: s.course_id ? courseMap.get(s.course_id)?.name ?? null : null,
        cohort_id: s.cohort_id,
        status: s.status,
        learner,
        tutor,
        ai,
        best_position: best,
        worst_position: worst,
        has_blocker: hasBlocker,
        any_verdict: positions.length > 0,
      };
    });

    setLearners(out);
    setLoading(false);
  }, [collegeId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — bump when any judgement in this college changes
  useEffect(() => {
    if (!collegeId) return;
    const ch = supabase
      .channel(`cohort_epa:${collegeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_epa_judgements',
          filter: `college_id=eq.${collegeId}`,
        },
        () => {
          void load();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [collegeId, load]);

  return { learners, loading, refresh: load };
}

export { judgementPosition };
