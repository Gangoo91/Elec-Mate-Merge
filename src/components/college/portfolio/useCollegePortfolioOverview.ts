import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useCollegePortfolioOverview — the College Hub "Portfolios" home (7 Oct 2026).

   One call to college_portfolio_overview(): every learner at the college with
   their criteria state counts (worked out by get_portfolio_ac_state on the
   server, so the six-state rules live in one place), last evidence date and
   open submissions, plus every open submission, oldest first.

   Replaces useCollegePortfolios on this screen. That hook only read
   college_student_assignments rows naming the caller as tutor, assessor or
   IQA, so a tutor whose learners come from their cohort saw nobody.
   ========================================================================== */

export interface CriteriaCounts {
  total: number;
  not_started: number;
  suggested: number;
  claimed: number;
  submitted: number;
  /** referred + not_yet */
  referred: number;
  passed: number;
  iqa_confirmed: number;
  iqa_rejected: number;
}

export interface PortfolioLearner {
  student_id: string;
  user_id: string | null;
  name: string;
  cohort_id: string | null;
  cohort_name: string | null;
  status: string | null;
  qualification_code: string | null;
  qualification_id: string | null;
  qualification_title: string | null;
  /** null when the learner has not joined, or the viewer cannot assess. */
  criteria: CriteriaCounts | null;
  items: number;
  last_evidence_at: string | null;
  witness_signed: number;
  waiting: number;
  oldest_waiting_at: string | null;
}

export interface WaitingSubmission {
  submission_id: string;
  student_id: string;
  user_id: string;
  name: string;
  cohort_id: string | null;
  cohort_name: string | null;
  status: 'submitted' | 'resubmitted' | 'under_review' | string;
  submitted_at: string;
  submission_count: number;
  /** Older category-level submissions only; item-level ones have none. */
  category_name: string | null;
  notes: string | null;
  item_count: number;
  first_title: string | null;
}

export interface PortfolioOverview {
  college_id: string | null;
  learners: PortfolioLearner[];
  waiting: WaitingSubmission[];
}

type Rpc = (
  fn: string,
  params: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this`.
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export function useCollegePortfolioOverview() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['college-portfolio-overview', user?.id],
    enabled: !!user?.id,
    staleTime: 30_000,
    queryFn: async (): Promise<PortfolioOverview> => {
      const { data, error } = await rpc('college_portfolio_overview', {});
      if (error) throw new Error(error.message);
      const d = (data ?? {}) as Partial<PortfolioOverview>;
      return {
        college_id: d.college_id ?? null,
        learners: Array.isArray(d.learners) ? d.learners : [],
        waiting: Array.isArray(d.waiting) ? d.waiting : [],
      };
    },
  });
}

/** Passed or IQA confirmed: the criteria that count as achieved. */
export const passedOf = (c: CriteriaCounts | null) => (c ? c.passed + c.iqa_confirmed : 0);
