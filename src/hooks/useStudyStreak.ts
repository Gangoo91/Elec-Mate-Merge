import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalSessions: number;
  totalCardsReviewed: number;
}

export function useStudyStreak() {
  const { user } = useAuth();
  const [streak, setStreak] = useState<StudyStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    totalSessions: 0,
    totalCardsReviewed: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch streak data
  const fetchStreak = useCallback(async () => {
    if (!user) {
      setStreak({
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        totalSessions: 0,
        totalCardsReviewed: 0
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_study_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine for new users
        throw error;
      }

      if (data) {
        // Check if streak should be reset (missed a day)
        // Use local timezone to avoid UTC conversion issues
        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toLocaleDateString('en-CA');

        let currentStreak = data.current_streak;
        if (data.last_study_date &&
            data.last_study_date !== today &&
            data.last_study_date !== yesterday) {
          // Streak broken - reset it
          currentStreak = 0;
          await supabase
            .from('user_study_streaks')
            .update({ current_streak: 0 })
            .eq('user_id', user.id);
        }

        setStreak({
          currentStreak,
          longestStreak: data.longest_streak,
          lastStudyDate: data.last_study_date,
          totalSessions: data.total_sessions,
          totalCardsReviewed: data.total_cards_reviewed
        });
      }
    } catch (error) {
      console.error('Error fetching study streak:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  // Record a study session
  const recordSession = useCallback(async (cardsReviewed: number) => {
    if (!user) return;

    // Use local timezone to avoid UTC conversion issues
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString('en-CA');

    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from('user_study_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existing) {
        // Calculate new streak
        let newStreak = existing.current_streak;
        if (existing.last_study_date === today) {
          // Already studied today, just update cards count
          newStreak = existing.current_streak;
        } else if (existing.last_study_date === yesterday) {
          // Continued streak
          newStreak = existing.current_streak + 1;
        } else {
          // Streak broken or first day
          newStreak = 1;
        }

        const newLongestStreak = Math.max(newStreak, existing.longest_streak);

        await supabase
          .from('user_study_streaks')
          .update({
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            last_study_date: today,
            total_sessions: existing.total_sessions + 1,
            total_cards_reviewed: existing.total_cards_reviewed + cardsReviewed
          })
          .eq('user_id', user.id);
      } else {
        // Create new record
        await supabase
          .from('user_study_streaks')
          .insert({
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_study_date: today,
            total_sessions: 1,
            total_cards_reviewed: cardsReviewed
          });
      }

      // Refresh streak data
      fetchStreak();
    } catch (error) {
      console.error('Error recording study session:', error);
    }
  }, [user, fetchStreak]);

  // Get formatted streak info
  const getStreakDisplay = useCallback(() => {
    const today = new Date().toLocaleDateString('en-CA'); // Local timezone
    const studiedToday = streak.lastStudyDate === today;

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      studiedToday,
      totalSessions: streak.totalSessions,
      totalCardsReviewed: streak.totalCardsReviewed,
      lastStudiedFormatted: streak.lastStudyDate
        ? formatRelativeDate(streak.lastStudyDate)
        : 'Never'
    };
  }, [streak]);

  return {
    streak,
    loading,
    recordSession,
    getStreakDisplay,
    refetch: fetchStreak
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
