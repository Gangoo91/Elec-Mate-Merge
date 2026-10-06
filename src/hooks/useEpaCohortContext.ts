import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { epaJudgementPosition } from '@/lib/epaBands';
import { fetchEpaReadinessModels } from '@/hooks/college/epaReadinessModels';

/* ==========================================================================
   useEpaCohortContext — given a college_student id, returns where they sit
   relative to their cohort on EPA readiness, and a recent trajectory of
   their tutor/AI verdicts so we can draw a sparkline.

   6 Oct 2026: rank is on the shared readiness score (AM2 practice +
   portfolio + sign-offs — what the learner sees), not the best of three
   voices' verdicts. Every exit sets loading:false (two early returns left
   the spinner on for ever). The trajectory is tutor and AI verdicts only — the
   learner's own self-assessment mixed in made it zig-zag. The percentile
   label no longer ends "of cohort": the gauge adds that.
   ========================================================================== */

export interface EpaCohortContext {
  loading: boolean;
  /** 0–100 readiness score for THIS learner, null if no linked account. */
  selfPosition: number | null;
  /** Learners in the cohort with a readiness score. */
  cohortSize: number;
  /** 1 = top of cohort, cohortSize = bottom. Null if not enough data. */
  rank: number | null;
  /** "Top 25%" / "Bottom 25%" / etc. */
  percentileLabel: string | null;
  /** Last 8 tutor/AI verdict positions for this learner, oldest → newest. */
  trajectory: number[];
}

const EMPTY: EpaCohortContext = {
  loading: false,
  selfPosition: null,
  cohortSize: 0,
  rank: null,
  percentileLabel: null,
  trajectory: [],
};

export function useEpaCohortContext(args: { collegeStudentId: string | null }): EpaCohortContext {
  const { collegeStudentId } = args;
  const { settings } = useCollegeSettings();
  const bands = settings.epa_verdict_bands;
  const [state, setState] = useState<EpaCohortContext>({ ...EMPTY, loading: true });

  useEffect(() => {
    if (!collegeStudentId) {
      setState(EMPTY);
      return;
    }
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    (async () => {
      try {
        const { data: cs } = await supabase
          .from('college_students')
          .select('id, college_id, cohort_id')
          .eq('id', collegeStudentId)
          .maybeSingle();
        if (cancelled) return;
        const row = cs as { college_id: string | null; cohort_id: string | null } | null;
        if (!row?.college_id) {
          setState(EMPTY);
          return;
        }

        let studentsQuery = supabase
          .from('college_students')
          .select('id, user_id, course_id')
          .eq('college_id', row.college_id)
          .not('status', 'ilike', 'withdrawn')
          .not('status', 'ilike', 'completed');
        if (row.cohort_id) studentsQuery = studentsQuery.eq('cohort_id', row.cohort_id);
        const { data: peers } = await studentsQuery;
        if (cancelled) return;
        const peerRows = (peers ?? []) as Array<{
          id: string;
          user_id: string | null;
          course_id: string | null;
        }>;
        if (peerRows.length === 0) {
          setState(EMPTY);
          return;
        }

        const courseIds = Array.from(
          new Set(peerRows.map((p) => p.course_id).filter((x): x is string => !!x))
        );
        const { data: courses } = courseIds.length
          ? await supabase.from('college_courses').select('id, code').in('id', courseIds)
          : { data: [] };
        const codeById = new Map(
          ((courses ?? []) as Array<{ id: string; code: string | null }>).map((c) => [c.id, c.code])
        );

        const [{ models }, { data: history }] = await Promise.all([
          fetchEpaReadinessModels(
            peerRows
              .filter((p) => p.user_id)
              .map((p) => ({
                userId: p.user_id as string,
                studentId: p.id,
                qualificationCode: p.course_id ? (codeById.get(p.course_id) ?? null) : null,
              }))
          ),
          supabase
            .from('college_epa_judgements')
            .select('verdict, confidence, source, created_at')
            .eq('college_student_id', collegeStudentId)
            .in('source', ['tutor', 'ai'])
            .order('created_at', { ascending: true })
            .limit(40),
        ]);
        if (cancelled) return;

        const scoreByStudent = new Map<string, number>();
        for (const p of peerRows) {
          const m = p.user_id ? models.get(p.user_id) : null;
          if (m) scoreByStudent.set(p.id, m.score);
        }
        const positions = Array.from(scoreByStudent.values()).sort((a, b) => b - a);
        const cohortSize = positions.length;
        const self = scoreByStudent.get(collegeStudentId) ?? null;
        const rank = self != null ? positions.findIndex((p) => p <= self) + 1 : null;
        const percentileLabel = (() => {
          if (self == null || rank == null || cohortSize < 2) return null;
          const ratio = rank / cohortSize;
          if (ratio <= 0.25) return 'Top 25%';
          if (ratio <= 0.5) return 'Top 50%';
          if (ratio <= 0.75) return 'Bottom 50%';
          return 'Bottom 25%';
        })();

        const traj: number[] = [];
        for (const j of (history ?? []) as Array<{ verdict: string; confidence: number | null }>) {
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
      } catch {
        if (!cancelled) setState(EMPTY);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [collegeStudentId, bands]);

  return state;
}
