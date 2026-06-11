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
 * - Progress %     → student_ac_coverage when college-linked, otherwise
 *                    distinct claimed ACs vs the selected qualification's
 *                    ac_count for standalone apprentices
 * - Streaks        → useStudyStreak
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useApprenticeOtj } from '@/hooks/useApprenticeOtj';
import { useOtjProgramme } from '@/hooks/useOtjProgramme';

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
    overallPercent: number;
    currentModule: string;
    nextMilestone: string;
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
  overallPercent: number;
  currentModule: string;
  nextMilestone: string;
  evidenceCount: number;
  pendingReview: number;
  approved: number;
  loading: boolean;
}

const QP_DEFAULT: QualificationProgress = {
  overallPercent: 0,
  currentModule: 'Getting started',
  nextMilestone: 'Add your first piece of evidence',
  evidenceCount: 0,
  pendingReview: 0,
  approved: 0,
  loading: true,
};

const COVERED_STATUSES = ['evidenced', 'assessed', 'confirmed'];

export function useApprenticeData(): ApprenticeData {
  const { user, profile, isLoading: authLoading } = useAuth();
  const { loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const programme = useOtjProgramme();
  const otj = useApprenticeOtj(
    user?.id ?? null,
    Math.max(60, Math.round(programme.weeklyTargetHours * 60))
  );

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
            .select('status, is_supervisor_verified, assessment_criteria_met')
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
          status: string | null;
          is_supervisor_verified: boolean | null;
          assessment_criteria_met: unknown;
        }>;
        const evidenceCount = items.length;
        const approved = items.filter((i) => i.is_supervisor_verified).length;
        const pendingReview = evidenceCount - approved;

        let overallPercent = 0;
        let currentModule = QP_DEFAULT.currentModule;
        let nextMilestone = QP_DEFAULT.nextMilestone;

        const csId = (csRes.data?.id as string | undefined) ?? null;
        const courseName = (csRes.data as { course?: { name?: string } | null } | null)?.course
          ?.name;
        if (courseName) currentModule = courseName;

        if (csId) {
          // College-linked: the server-seeded AC coverage matrix is canonical.
          const { data: cov } = await supabase
            .from('student_ac_coverage')
            .select('status')
            .eq('student_id', csId);
          if (cov && cov.length > 0) {
            const done = cov.filter((r) =>
              COVERED_STATUSES.includes((r.status as string) ?? '')
            ).length;
            overallPercent = Math.round((done / cov.length) * 100);
            nextMilestone = `${done} of ${cov.length} assessment criteria evidenced`;
          }
        } else if (selRes.data?.qualification_id) {
          // Standalone: distinct claimed ACs vs the qualification's AC count.
          const { data: qual } = await supabase
            .from('qualifications')
            .select('title, ac_count')
            .eq('id', selRes.data.qualification_id)
            .maybeSingle();

          if (qual?.title) currentModule = qual.title;
          const claimed = new Set<string>();
          for (const item of items) {
            const acs = item.assessment_criteria_met;
            if (Array.isArray(acs)) {
              for (const ac of acs) if (typeof ac === 'string' && ac) claimed.add(ac);
            }
          }
          const total = qual?.ac_count ?? 0;
          if (total > 0) {
            overallPercent = Math.min(100, Math.round((claimed.size / total) * 100));
            nextMilestone = `${claimed.size} of ${total} assessment criteria evidenced`;
          }
        }

        if (evidenceCount > 0 && overallPercent === 0) {
          nextMilestone = 'Map your evidence to assessment criteria';
        }

        if (!cancelled) {
          setQp({
            overallPercent,
            currentModule,
            nextMilestone,
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

  const isLoading =
    authLoading || streakLoading || qp.loading || otj.loading || programme.loading;

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

    const ojtLogged = Math.round(otj.breakdown.total_hours);
    const ojtTarget = Math.round(programme.totalTargetHours) || 0;

    return {
      ojtHours: {
        logged: ojtLogged,
        target: ojtTarget,
        percentComplete:
          ojtTarget > 0 ? Math.min(100, Math.round((ojtLogged / ojtTarget) * 100)) : 0,
      },
      portfolio: {
        evidenceCount: qp.evidenceCount,
        pendingReview: qp.pendingReview,
        approved: qp.approved,
      },
      learning: {
        currentStreak: streakDisplay.currentStreak,
        longestStreak: streakDisplay.longestStreak,
        studiedToday: streakDisplay.studiedToday,
        quizzesCompleted: streakDisplay.totalSessions,
      },
      progress: {
        overallPercent: qp.overallPercent,
        currentModule: qp.currentModule,
        nextMilestone: qp.nextMilestone,
      },
    };
  }, [getStreakDisplay, otj.breakdown.total_hours, programme.totalTargetHours, qp]);

  return {
    user: userData,
    stats,
    isLoading,
  };
}

export default useApprenticeData;
