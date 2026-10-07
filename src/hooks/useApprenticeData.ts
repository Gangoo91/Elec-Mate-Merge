/**
 * useApprenticeData
 *
 * Unified hook for apprentice-specific data including OJT hours,
 * portfolio progress, study streaks, and qualification progress.
 *
 * Every stat here is computed from real sources. The previous version read
 * profiles columns that don't exist (ojt_hours_logged, overall_progress,
 * portfolio_evidence_count, …) so Progress showed 0% for every apprentice.
 *
 * Sources:
 * - OTJ hours      → useApprenticeOtj (same merge the OJT Hub shows) +
 *                    useOtjProgramme for the programme target
 * - Portfolio      → portfolio_items (count / supervisor-verified split)
 * - Progress %     → criteria PASSED (passed + IQA confirmed) over the
 *                    qualification's total, from get_portfolio_ac_state via
 *                    usePortfolioAcState (ELE-1862). The same function the
 *                    portfolio home, Student 360 and the assessor read. A claim
 *                    or a submission never counts as progress. Learners with
 *                    no college fall back to their own qualification inside
 *                    the function, so the maths is identical for both.
 * - Streaks        → useStudyStreak
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useOtjSummary } from '@/hooks/useOtjSummary';
import { useOtjProgramme } from '@/hooks/useOtjProgramme';
import { usePortfolioAcState } from '@/hooks/portfolio/usePortfolioAcState';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export interface ApprenticeStats {
  ojtHours: {
    logged: number;
    target: number;
    percentComplete: number;
  };
  portfolio: {
    evidenceCount: number;
    pendingReview: number;
    approved: number;
  };
  learning: {
    currentStreak: number;
    longestStreak: number;
    studiedToday: boolean;
    quizzesCompleted: number;
  };
  progress: {
    /** Criteria passed (passed + IQA confirmed) over total, as a percent. */
    overallPercent: number;
    currentModule: string;
    nextMilestone: string;
    criteriaPassed: number;
    criteriaTotal: number;
  };
}

export interface ApprenticeData {
  user: {
    name: string;
    firstName: string;
    avatarUrl: string | null;
    apprenticeYear: number;
    employer: string | null;
    college: string | null;
  };
  stats: ApprenticeStats;
  isLoading: boolean;
}

interface QualificationProgress {
  currentModule: string;
  evidenceCount: number;
  pendingReview: number;
  approved: number;
  loading: boolean;
}

const QP_DEFAULT: QualificationProgress = {
  currentModule: 'Getting started',
  evidenceCount: 0,
  pendingReview: 0,
  approved: 0,
  loading: true,
};

export function useApprenticeData(): ApprenticeData {
  const { user, profile, isLoading: authLoading } = useAuth();
  const { loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const programme = useOtjProgramme();
  // The one off-the-job figure (get_otj_summary) — what their tutor and
  // employer see. useApprenticeOtj's breakdown summed XP estimates, pending
  // and rejected entries, capped at 200 rows.
  const { data: otjSummary, loading: otjLoading } = useOtjSummary(user?.id ?? null);

  const [qp, setQp] = useState<QualificationProgress>(QP_DEFAULT);

  useEffect(() => {
    let cancelled = false;
    const uid = user?.id;
    if (!uid) {
      setQp({ ...QP_DEFAULT, loading: false });
      return;
    }

    (async () => {
      try {
        const [csRes, itemsRes, selRes] = await Promise.all([
          supabase
            .from('college_students')
            .select('id, course:college_courses(name)')
            .eq('user_id', uid)
            .maybeSingle(),
          supabase
            .from('portfolio_items')
            .select('is_supervisor_verified')
            .eq('user_id', uid),
          supabase
            .from('user_qualification_selections')
            .select('qualification_id')
            .eq('user_id', uid)
            .eq('is_active', true)
            // limit(1): maybeSingle() throws if a user somehow has two active
            // selections — the invite RPC reads with LIMIT 1 for the same reason.
            .limit(1)
            .maybeSingle(),
        ]);

        const items = (itemsRes.data ?? []) as Array<{
          is_supervisor_verified: boolean | null;
        }>;
        const evidenceCount = items.length;
        const approved = items.filter((i) => i.is_supervisor_verified).length;
        const pendingReview = evidenceCount - approved;

        let currentModule = QP_DEFAULT.currentModule;
        const courseName = (csRes.data as { course?: { name?: string } | null } | null)?.course
          ?.name;
        if (courseName) currentModule = courseName;
        else if (selRes.data?.qualification_id) {
          const { data: qual } = await supabase
            .from('qualifications')
            .select('title')
            .eq('id', selRes.data.qualification_id)
            .maybeSingle();
          if (qual?.title) currentModule = qual.title;
        }

        if (!cancelled) {
          setQp({
            currentModule,
            evidenceCount,
            pendingReview,
            approved,
            loading: false,
          });
        }
      } catch {
        if (!cancelled) setQp((prev) => ({ ...prev, loading: false }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // ELE-1862: the course figure is criteria PASSED, from the one state function.
  const ac = usePortfolioAcState(user?.id ?? null);
  const acRefresh = ac.refresh;
  useEffect(() => {
    const on = () => void acRefresh();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, [acRefresh]);
  const course = useMemo(() => {
    const total = ac.totals.total;
    const passed = ac.totals.passedAll;
    const overallPercent = total > 0 ? Math.round((passed / total) * 100) : 0;
    let nextMilestone = 'Add your first piece of evidence';
    if (total > 0) nextMilestone = `${passed} of ${total} assessment criteria passed`;
    else if (qp.evidenceCount > 0) nextMilestone = 'Choose your qualification to track criteria';
    return { overallPercent, nextMilestone, passed, total };
  }, [ac.totals, qp.evidenceCount]);

  const isLoading =
    authLoading || streakLoading || qp.loading || otjLoading || programme.loading || ac.loading;

  // User data
  const userData = useMemo(() => {
    const fullName = profile?.full_name || user?.user_metadata?.full_name || 'Apprentice';
    const firstName = fullName.split(' ')[0] || 'there';

    return {
      name: fullName,
      firstName,
      avatarUrl: profile?.avatar_url || null,
      apprenticeYear: profile?.apprentice_year || 1,
      employer: profile?.employer_name || null,
      college: profile?.college_name || null,
    };
  }, [user, profile]);

  // Stats data
  const stats = useMemo((): ApprenticeStats => {
    const streakDisplay = getStreakDisplay();

    const ojtLogged = Math.round(otjSummary?.counted_hours ?? 0);
    const ojtTarget = Math.round(otjSummary?.required_hours ?? programme.totalTargetHours) || 0;

    return {
      ojtHours: {
        logged: ojtLogged,
        target: ojtTarget,
        percentComplete:
          ojtTarget > 0 ? Math.min(100, Math.round((ojtLogged / ojtTarget) * 100)) : 0,
      },
      portfolio: {
        evidenceCount: qp.evidenceCount,
        // ELE-1917: criteria sitting with the assessor and criteria passed, from
        // the one state function; not portfolio_items.is_supervisor_verified,
        // which is a supervisor's tick and not an assessment.
        pendingReview: ac.totals.submitted,
        approved: ac.totals.passedAll,
      },
      learning: {
        currentStreak: streakDisplay.currentStreak,
        longestStreak: streakDisplay.longestStreak,
        studiedToday: streakDisplay.studiedToday,
        quizzesCompleted: streakDisplay.totalSessions,
      },
      progress: {
        overallPercent: course.overallPercent,
        currentModule: qp.currentModule,
        nextMilestone: course.nextMilestone,
        criteriaPassed: course.passed,
        criteriaTotal: course.total,
      },
    };
  }, [getStreakDisplay, otjSummary, programme.totalTargetHours, qp, course, ac.totals]);

  return {
    user: userData,
    stats,
    isLoading,
  };
}

export default useApprenticeData;
