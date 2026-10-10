import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Criteria gaps by cohort (8 Oct 2026).

   One server call, get_cohort_criteria_gaps(p_cohort), reads every learner's
   get_portfolio_ac_state (the one source of truth for a criterion's state)
   and returns, per criterion of each qualification in the cohort, how many
   learners have it passed, with the assessor, sent back, claimed or nothing
   yet, plus each learner's raw state in learner order. p_cohort null means
   every cohort the signed-in tutor teaches.

   get_college_epa_pace() is the Quality dashboard's "on pace for EPA": the
   share of a learner's criteria passed against the share of their time on
   programme gone, with a tolerance the server returns.
   ========================================================================== */

export type AcState =
  | 'not_started'
  | 'suggested'
  | 'claimed'
  | 'submitted'
  | 'referred'
  | 'not_yet'
  | 'passed'
  | 'iqa_confirmed'
  | 'iqa_rejected';

export type GapBucket = 'passed' | 'with_assessor' | 'sent_back' | 'claimed' | 'nothing';

/** Server mapping, kept identical here for the learner drill-down. */
export function bucketOf(state: string): GapBucket {
  switch (state) {
    case 'passed':
    case 'iqa_confirmed':
      return 'passed';
    case 'submitted':
    case 'iqa_rejected':
      return 'with_assessor';
    case 'referred':
    case 'not_yet':
      return 'sent_back';
    case 'claimed':
      return 'claimed';
    default:
      return 'nothing';
  }
}

export const BUCKETS: GapBucket[] = ['passed', 'with_assessor', 'sent_back', 'claimed', 'nothing'];

export const BUCKET_LABEL: Record<GapBucket, string> = {
  passed: 'Passed',
  with_assessor: 'With the assessor',
  sent_back: 'Sent back',
  claimed: 'Claimed',
  nothing: 'Nothing yet',
};

/** Solid fills for the stacked bars (never translucent yellow). */
export const BUCKET_FILL: Record<GapBucket, string> = {
  passed: 'bg-emerald-500',
  with_assessor: 'bg-sky-400',
  sent_back: 'bg-orange-400',
  claimed: 'bg-white/70',
  nothing: 'bg-white/[0.12]',
};

export const STATE_WORDS: Record<string, string> = {
  not_started: 'Nothing yet',
  suggested: 'Only an AI suggestion',
  claimed: 'Claimed, not sent',
  submitted: 'With the assessor',
  referred: 'Sent back (referred)',
  not_yet: 'Sent back (not yet)',
  passed: 'Passed',
  iqa_confirmed: 'Passed, IQA confirmed',
  iqa_rejected: 'IQA queried the pass',
};

export interface GapCriterion {
  ac_code: string;
  ac_text: string;
  lo_number: number;
  lo_text: string;
  passed: number;
  with_assessor: number;
  sent_back: number;
  claimed: number;
  nothing: number;
  states: string[];
}

export interface GapUnit {
  unit_code: string;
  unit_title: string | null;
  criteria: GapCriterion[];
}

export interface GapLearner {
  user_id: string;
  roll_id: string;
  name: string;
  cohort_id: string | null;
}

export interface GapQualification {
  code: string;
  title: string | null;
  learners: GapLearner[];
  units: GapUnit[];
}

export interface CohortCriteriaGaps {
  cohorts: { id: string; name: string; college_id: string }[];
  hidden: number;
  no_qualification: number;
  qualifications: GapQualification[];
}

/** Per-unit figures, worked out from the criteria the server returned. */
export interface UnitSummary {
  unit: GapUnit;
  learners: number;
  criteria: number;
  /** Passed criterion-learner pairs out of every pair in the unit. */
  passedShare: number;
  /** Criteria nobody in the group has started (every learner "nothing"). */
  untouched: number;
  /** Learner-criterion pairs with nothing yet. */
  nothingPairs: number;
}

export function summariseUnit(unit: GapUnit, learners: number): UnitSummary {
  let passed = 0;
  let nothing = 0;
  let untouched = 0;
  for (const c of unit.criteria) {
    passed += c.passed;
    nothing += c.nothing;
    if (learners > 0 && c.nothing === learners) untouched++;
  }
  const pairs = unit.criteria.length * learners;
  return {
    unit,
    learners,
    criteria: unit.criteria.length,
    passedShare: pairs > 0 ? passed / pairs : 0,
    untouched,
    nothingPairs: nothing,
  };
}

/** Weakest first: the lowest passed share, then the most untouched criteria. */
export function weakestFirst(a: UnitSummary, b: UnitSummary): number {
  if (a.passedShare !== b.passedShare) return a.passedShare - b.passedShare;
  if (a.untouched !== b.untouched) return b.untouched - a.untouched;
  return a.unit.unit_code.localeCompare(b.unit.unit_code, 'en-GB', { numeric: true });
}

export function useCohortCriteriaGaps(cohortId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['college', 'criteria-gaps', cohortId ?? 'mine'],
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<CohortCriteriaGaps> => {
      const { data, error } = await supabase.rpc(
        'get_cohort_criteria_gaps' as never,
        { p_cohort: cohortId } as never
      );
      if (error) throw new Error(error.message);
      const d = (data ?? {}) as Partial<CohortCriteriaGaps>;
      return {
        cohorts: d.cohorts ?? [],
        hidden: d.hidden ?? 0,
        no_qualification: d.no_qualification ?? 0,
        qualifications: d.qualifications ?? [],
      };
    },
  });
}

export interface EpaPaceLearner {
  roll_id: string;
  user_id: string;
  name: string;
  cohort_id: string | null;
  elapsed_pct?: number;
  passed_pct?: number;
  passed?: number;
  total?: number;
  on_pace: boolean | null;
  reason: 'no_dates' | 'no_qualification' | null;
}

export interface EpaPace {
  college_id: string;
  tolerance_pct: number;
  measured: number;
  on_pace: number;
  unmeasured: number;
  hidden: number;
  learners: EpaPaceLearner[];
}

export function useCollegeEpaPace(enabled = true) {
  return useQuery({
    queryKey: ['college', 'epa-pace'],
    enabled,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<EpaPace> => {
      const { data, error } = await supabase.rpc('get_college_epa_pace' as never);
      if (error) throw new Error(error.message);
      return data as unknown as EpaPace;
    },
  });
}
