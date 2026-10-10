import { useState, useEffect, useCallback, useRef } from 'react';
import { sharedFetch } from '@/lib/sharedFetch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from './useLearningXP';

/**
 * Streaks are the server's since 10 Oct 2026 (migrations 20261010170000/
 * 171000): worked out from the activity ledger on UK days, with streak
 * freezes (one per 7 days in a row, up to 2, spent automatically on a missed
 * day). The app only reads them (my_streak) — it can no longer write the table.
 */
interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalSessions: number;
  totalCardsReviewed: number;
  freezesAvailable: number;
  frozenDays: string[];
  studiedToday: boolean;
}

const EMPTY_STREAK: StudyStreak = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  totalSessions: 0,
  totalCardsReviewed: 0,
  freezesAvailable: 0,
  frozenDays: [],
  studiedToday: false,
};

export function useStudyStreak() {
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [streak, setStreak] = useState<StudyStreak>(EMPTY_STREAK);
  const [loading, setLoading] = useState(true);

  // Fetch streak data — from the server, rebuilt on read so it's never stale.
  const fetchStreak = useCallback(async (force = false) => {
    if (!user) {
      setStreak(EMPTY_STREAK);
      setLoading(false);
      return;
    }
    try {
      // ELE-1912: many cards mount this hook together — one shared read.
      const { data, error } = await sharedFetch(
        `study_streak:${user.id}`,
        async () => await supabase.rpc('my_streak' as never),
        { force }
      );
      if (error || !data) return;
      const r = data as Record<string, unknown>;
      setStreak({
        currentStreak: Number(r.current_streak ?? 0),
        longestStreak: Number(r.longest_streak ?? 0),
        lastStudyDate: (r.last_study_date as string | null) ?? null,
        totalSessions: Number(r.total_sessions ?? 0),
        totalCardsReviewed: Number(r.total_cards_reviewed ?? 0),
        freezesAvailable: Number(r.freezes_available ?? 0),
        frozenDays: (r.frozen_days as string[] | null) ?? [],
        studiedToday: Boolean(r.studied_today),
      });
    } catch (error) {
      console.error('Error fetching study streak:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  /**
   * Record a study session: keep the streak alive, and log the flashcard
   * activity when the session actually was flashcards.
   *
   * `logFlashcardActivity` defaults to true so the flashcard caller is
   * unchanged. Quiz and mock exam callers pass false — they keep the streak
   * (a paper sat is a day studied) without filing themselves as card practice.
   */
  const recordSession = useCallback(
    async (cardsReviewed: number, logFlashcardActivity = true) => {
      if (!user) return;

      // The streak itself is the server's (any activity row keeps it); here
      // we only log the flashcards, then re-read the streak.
      try {
        // Refresh streak data once the activity has landed.
        setTimeout(() => void fetchStreak(true), 1200);

        /*
         * Log the flashcard session — but only when it WAS one.
         *
         * `useQuizCompletion` also calls this to keep the streak alive, which
         * is right: sitting a mock exam is a study session. It was passing the
         * question count as `cardsReviewed` and getting a row logged as
         * `flashcard_session`, titled "Flashcard Study Session", with XP that
         * scales by card count — so every quiz was also filed as flashcard
         * practice. Measured 23 Sep: 144 of the 209 people with flashcard
         * activity had never turned over a single card, the quiz already logs
         * its own `quiz_completed` row in `useQuizResults`, and the weekly
         * recap and activity feed both showed those quizzes as flashcards.
         */
        if (logFlashcardActivity) {
          logActivity({
            activityType: 'flashcard_session',
            sourceTitle: 'Flashcard Study Session',
            cardsReviewed: cardsReviewed,
            metadata: { cardsReviewed },
          });
        }
      } catch {
        // Table may not exist - fail silently
      }
    },
    [user, fetchStreak, logActivity]
  );

  // Get formatted streak info
  const getStreakDisplay = useCallback(() => {
    const studiedToday = streak.studiedToday;

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      studiedToday,
      totalSessions: streak.totalSessions,
      totalCardsReviewed: streak.totalCardsReviewed,
      lastStudiedFormatted: streak.lastStudyDate
        ? formatRelativeDate(streak.lastStudyDate)
        : 'Never',
    };
  }, [streak]);

  return {
    streak,
    loading,
    recordSession,
    getStreakDisplay,
    refetch: () => fetchStreak(true),
  };
}

// Helper function to format relative dates
function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}
