import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { epaJudgementPosition } from '@/lib/epaBands';

/* ==========================================================================
   useEpaCohortContext — given a college_student id, returns where they sit
   relative to their cohort on EPA readiness, and a recent trajectory of
   their own verdicts so we can draw a sparkline.
   ========================================================================== */

export interface EpaCohortContext {
  loading: boolean;
  /** 0–100 readiness for THIS learner (best across voices), null if no verdicts */
  selfPosition: number | null;
  /** Cohort size used for percentile (only learners with at least one verdict) */
  cohortSize: number;
  /** 1 = top of cohort, cohortSize = bottom. Null if not enough data. */
  rank: number | null;
  /** "Top 25%" / "Bottom 30%" / etc. */
  percentileLabel: string | null;
  /** Last 8 readiness positions for this learner, oldest → newest */
  trajectory: number[];
}

export function useEpaCohortContext(args: { collegeStudentId: string | null }): EpaCohortContext {
  const { collegeStudentId } = args;
  const { settings } = useCollegeSettings();
  const bands = settings.epa_verdict_bands;
  const [state, setState] = useState<EpaCohortContext>({
    loading: true,
    selfPosition: null,
    cohortSize: 0,
    rank: null,
    percentileLabel: null,
    trajectory: [],
  });

  useEffect(() => {
    if (!collegeStudentId) {
      setState({
        loading: false,
        selfPosition: null,
        cohortSize: 0,
        rank: null,
        percentileLabel: null,
        trajectory: [],
      });
      return;
    }
    let cancelled = false;
    (async () => {
      // Resolve college + cohort scope
      const { data: cs } = await supabase
        .from('college_students')
        .select('id, college_id, cohort_id')
        .eq('id', collegeStudentId)
        .maybeSingle();
      if (cancelled) return;
      const row = cs as { college_id: string | null; cohort_id: string | null } | null;
      if (!row?.college_id) return;

      // Pull all current judgements for the cohort/college
      const cohortFilter = row.cohort_id;
      let studentsQuery = supabase
        .from('college_students')
        .select('id')
        .eq('college_id', row.college_id)
        .neq('status', 'withdrawn')
        .neq('status', 'completed');
      if (cohortFilter) studentsQuery = studentsQuery.eq('cohort_id', cohortFilter);
      const { data: peers } = await studentsQuery;
      const peerIds = ((peers ?? []) as Array<{ id: string }>).map((p) => p.id);
      if (peerIds.length === 0 || cancelled) return;

      const [{ data: currentJudgements }, { data: historyJudgements }] = await Promise.all([
        supabase
          .from('college_epa_judgements')
          .select('college_student_id, verdict, confidence, source')
          .in('college_student_id', peerIds)
          .eq('is_current', true),
        supabase
          .from('college_epa_judgements')
          .select('verdict, confidence, source, created_at')
          .eq('college_student_id', collegeStudentId)
          .order('created_at', { ascending: true })
          .limit(40),
      ]);
      if (cancelled) return;

      // Best position per learner
      const byStudent = new Map<string, number>();
      for (const j of (currentJudgements ?? []) as Array<{
        college_student_id: string;
        verdict: string;
        confidence: number | null;
      }>) {
        const p = epaJudgementPosition({ verdict: j.verdict, confidence: j.confidence }, bands);
        if (p == null) continue;
        const prev = byStudent.get(j.college_student_id);
        if (prev == null || p > prev) byStudent.set(j.college_student_id, p);
      }

      const positions = Array.from(byStudent.values()).sort((a, b) => b - a); // desc
      const cohortSize = positions.length;
      const self = byStudent.get(collegeStudentId) ?? null;
      const rank = self != null ? positions.findIndex((p) => p <= self) + 1 : null;
      const percentileLabel = (() => {
        if (self == null || rank == null || cohortSize === 0) return null;
        const ratio = rank / cohortSize;
        if (ratio <= 0.25) return `Top 25% of cohort`;
        if (ratio <= 0.5) return `Top 50% of cohort`;
        if (ratio <= 0.75) return `Bottom 50% of cohort`;
        return `Bottom 25% of cohort`;
      })();

      // Trajectory (oldest → newest, AI judgements preferred for consistency)
      const traj: number[] = [];
      for (const j of (historyJudgements ?? []) as Array<{
        verdict: string;
        confidence: number | null;
        source: string;
      }>) {
        const p = epaJudgementPosition({ verdict: j.verdict, confidence: j.confidence }, bands);
        if (p != null) traj.push(p);
      }

      setState({
        loading: false,
        selfPosition: self,
        cohortSize,
        rank,
        percentileLabel,
        trajectory: traj.slice(-8),
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [collegeStudentId, bands]);

  return state;
}
