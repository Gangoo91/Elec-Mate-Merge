import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useEpaCalibration — track AI accuracy over time. Pulls every AI judgement
   that has been sealed with an actual_outcome and computes:
     • exact-match accuracy
     • near-miss rate (predicted within 1 band of actual)
     • last 30-day window
   Returns a frozen-in-time view; recompute on demand via refresh().
   ========================================================================== */

export interface EpaCalibrationStats {
  total: number;
  exact_matches: number;
  near_misses: number; // predicted off by exactly 1 band
  exact_pct: number;
  inclusive_pct: number; // exact + near
  by_grade: Record<string, { predicted: number; actual: number }>;
  recent: Array<{
    student_name: string;
    predicted_grade: string | null;
    actual_outcome: string | null;
    confidence: number | null;
    matched: boolean;
    sealed_at: string | null;
  }>;
  loading: boolean;
}

const GRADE_ORDER: Record<string, number> = {
  fail: 0,
  pass: 1,
  merit: 2,
  distinction: 3,
};

export function useEpaCalibration(args: { collegeId?: string | null }): EpaCalibrationStats & {
  refresh: () => Promise<void>;
} {
  const { collegeId } = args;
  const [stats, setStats] = useState<EpaCalibrationStats>({
    total: 0,
    exact_matches: 0,
    near_misses: 0,
    exact_pct: 0,
    inclusive_pct: 0,
    by_grade: {},
    recent: [],
    loading: true,
  });

  const refresh = async () => {
    setStats((s) => ({ ...s, loading: true }));
    let q = supabase
      .from('college_epa_judgements')
      .select('id, college_id, college_student_id, predicted_grade, actual_outcome, confidence, actual_recorded_at, source')
      .eq('source', 'ai')
      .not('actual_outcome', 'is', null)
      .order('actual_recorded_at', { ascending: false })
      .limit(50);
    if (collegeId) q = q.eq('college_id', collegeId);
    const { data: rows } = await q;
    const list = (rows ?? []) as Array<{
      id: string;
      college_student_id: string;
      predicted_grade: string | null;
      actual_outcome: string | null;
      confidence: number | null;
      actual_recorded_at: string | null;
    }>;

    if (list.length === 0) {
      setStats({
        total: 0,
        exact_matches: 0,
        near_misses: 0,
        exact_pct: 0,
        inclusive_pct: 0,
        by_grade: {},
        recent: [],
        loading: false,
      });
      return;
    }

    // Look up names in one go
    const ids = Array.from(new Set(list.map((r) => r.college_student_id)));
    const { data: students } = await supabase
      .from('college_students')
      .select('id, name')
      .in('id', ids);
    const nameMap = new Map<string, string>(
      ((students ?? []) as Array<{ id: string; name: string }>).map((s) => [s.id, s.name])
    );

    let exact = 0;
    let near = 0;
    const byGrade: Record<string, { predicted: number; actual: number }> = {};
    const recent: EpaCalibrationStats['recent'] = [];
    for (const r of list) {
      const p = r.predicted_grade?.toLowerCase() ?? '';
      const a = r.actual_outcome?.toLowerCase() ?? '';
      const matched = p && p === a;
      if (matched) exact += 1;
      else if (
        a in GRADE_ORDER &&
        p in GRADE_ORDER &&
        Math.abs(GRADE_ORDER[a] - GRADE_ORDER[p]) === 1
      ) {
        near += 1;
      }
      byGrade[p] = byGrade[p] ?? { predicted: 0, actual: 0 };
      byGrade[p].predicted += 1;
      byGrade[a] = byGrade[a] ?? { predicted: 0, actual: 0 };
      byGrade[a].actual += 1;
      recent.push({
        student_name: nameMap.get(r.college_student_id) ?? '—',
        predicted_grade: r.predicted_grade,
        actual_outcome: r.actual_outcome,
        confidence: r.confidence,
        matched: !!matched,
        sealed_at: r.actual_recorded_at,
      });
    }

    setStats({
      total: list.length,
      exact_matches: exact,
      near_misses: near,
      exact_pct: Math.round((exact / list.length) * 100),
      inclusive_pct: Math.round(((exact + near) / list.length) * 100),
      by_grade: byGrade,
      recent: recent.slice(0, 8),
      loading: false,
    });
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collegeId]);

  return { ...stats, refresh };
}
