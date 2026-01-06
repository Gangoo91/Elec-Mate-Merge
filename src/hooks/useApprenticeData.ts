/**
 * useApprenticeData
 *
 * Unified hook for apprentice-specific data including OJT hours,
 * portfolio progress, study streaks, and achievements.
 */

import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStudyStreak } from '@/hooks/useStudyStreak';

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

export function useApprenticeData(): ApprenticeData {
  const { user, profile, isLoading: authLoading } = useAuth();
  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();

  const isLoading = authLoading || streakLoading;

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

    // OJT hours - would come from real data in production
    const ojtLogged = profile?.ojt_hours_logged || 0;
    const ojtTarget = profile?.ojt_hours_target || 3000;

    return {
      ojtHours: {
        logged: ojtLogged,
        target: ojtTarget,
        percentComplete: ojtTarget > 0 ? Math.round((ojtLogged / ojtTarget) * 100) : 0,
      },
      portfolio: {
        evidenceCount: profile?.portfolio_evidence_count || 0,
        pendingReview: profile?.portfolio_pending || 0,
        approved: profile?.portfolio_approved || 0,
      },
      learning: {
        currentStreak: streakDisplay.currentStreak,
        longestStreak: streakDisplay.longestStreak,
        studiedToday: streakDisplay.studiedToday,
        quizzesCompleted: streakDisplay.totalSessions,
      },
      progress: {
        overallPercent: profile?.overall_progress || 0,
        currentModule: profile?.current_module || 'Getting Started',
        nextMilestone: profile?.next_milestone || 'Complete onboarding',
      },
    };
  }, [profile, getStreakDisplay]);

  return {
    user: userData,
    stats,
    isLoading,
  };
}

export default useApprenticeData;
