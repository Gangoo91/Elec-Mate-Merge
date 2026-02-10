/**
 * useAchievementChecker
 *
 * Called after each logActivity(). Checks cumulative stats against
 * achievement conditions, inserts to user_achievements on unlock,
 * and awards bonus XP.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ACHIEVEMENT_DEFINITIONS, type AchievementDef } from '@/data/achievementDefinitions';
import { toast } from 'sonner';

interface UnlockedAchievement {
  id: string;
  achievement_id: string;
  unlocked_at: string;
}

interface AchievementStats {
  totalCardsReviewed: number;
  totalQuizzes: number;
  bestQuizPercent: number;
  fastestQuizMinutes: number | null;
  currentStreak: number;
  longestStreak: number;
  ojtHoursLogged: number;
  portfolioCount: number;
  diaryCount: number;
  totalXP: number;
  level: number;
  quizCategoryScores: Record<string, number>;
  flashcardSetMastery: Record<string, number>;
}

export function useAchievementChecker() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [recentUnlock, setRecentUnlock] = useState<AchievementDef | null>(null);
  const hasLoadedRef = useRef(false);

  // Load already-unlocked achievements
  const loadUnlocked = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_achievements' as any)
        .select('achievement_id')
        .eq('user_id', user.id);

      if (error) return; // Table may not exist yet

      const ids = new Set((data as any[])?.map((d: any) => d.achievement_id) ?? []);
      setUnlocked(ids);
      hasLoadedRef.current = true;
    } catch {
      // Fail silently
    }
  }, [user]);

  useEffect(() => {
    loadUnlocked();
  }, [loadUnlocked]);

  // Gather stats from various sources
  const gatherStats = useCallback(async (): Promise<AchievementStats | null> => {
    if (!user) return null;

    try {
      // Run queries in parallel
      const [streakRes, quizRes, xpRes, activityRes] = await Promise.all([
        supabase
          .from('user_study_streaks')
          .select('current_streak, longest_streak, total_cards_reviewed')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('quiz_results')
          .select('percentage, time_spent')
          .eq('user_id', user.id),
        supabase
          .from('user_xp_summary' as any)
          .select('total_xp, level')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('learning_activity_log' as any)
          .select('activity_type')
          .eq('user_id', user.id),
      ]);

      const streakData = streakRes.data as any;
      const quizData = (quizRes.data ?? []) as any[];
      const xpData = xpRes.data as any;
      const activityData = (activityRes.data ?? []) as any[];

      // Count activities by type
      const activityCounts: Record<string, number> = {};
      activityData.forEach((a: any) => {
        activityCounts[a.activity_type] = (activityCounts[a.activity_type] || 0) + 1;
      });

      // Get OJT hours from time entries
      const { data: timeData } = await supabase
        .from('time_entries')
        .select('duration')
        .eq('user_id', user.id);

      const totalMinutes = (timeData ?? []).reduce((sum: number, t: any) => sum + (t.duration || 0), 0);

      return {
        totalCardsReviewed: streakData?.total_cards_reviewed ?? 0,
        totalQuizzes: quizData.length,
        bestQuizPercent: quizData.length > 0 ? Math.max(...quizData.map((q: any) => q.percentage)) : 0,
        fastestQuizMinutes: quizData.length > 0
          ? Math.min(...quizData.map((q: any) => q.time_spent / 60000))
          : null,
        currentStreak: streakData?.current_streak ?? 0,
        longestStreak: streakData?.longest_streak ?? 0,
        ojtHoursLogged: Math.floor(totalMinutes / 60),
        portfolioCount: activityCounts['portfolio_evidence'] ?? 0,
        diaryCount: activityCounts['site_diary_entry'] ?? 0,
        totalXP: xpData?.total_xp ?? 0,
        level: xpData?.level ?? 1,
        quizCategoryScores: {}, // TODO: populate from quiz_results category_breakdown
        flashcardSetMastery: {}, // TODO: populate from user_flashcard_progress
      };
    } catch {
      return null;
    }
  }, [user]);

  // Check a single condition
  const checkCondition = (def: AchievementDef, stats: AchievementStats): boolean => {
    const p = def.conditionParams;

    switch (def.conditionKey) {
      case 'total_cards_reviewed':
        return stats.totalCardsReviewed >= (p.count as number);

      case 'any_set_mastered':
        // Check if any set has 100% mastery
        return Object.values(stats.flashcardSetMastery).some((v) => v >= 100);

      case 'all_sets_mastered':
        return Object.keys(stats.flashcardSetMastery).length >= (p.setCount as number) &&
          Object.values(stats.flashcardSetMastery).every((v) => v >= 100);

      case 'total_quizzes':
        return stats.totalQuizzes >= (p.count as number);

      case 'perfect_quiz':
        return stats.bestQuizPercent >= 100;

      case 'fast_quiz':
        return stats.fastestQuizMinutes !== null &&
          stats.fastestQuizMinutes <= (p.maxMinutes as number);

      case 'all_categories_above':
        // Simplified: check if totalQuizzes >= 4 (one per category minimum)
        return stats.totalQuizzes >= 4 &&
          Object.values(stats.quizCategoryScores).length >= 4 &&
          Object.values(stats.quizCategoryScores).every((s) => s >= (p.minScore as number));

      case 'streak_days':
        return Math.max(stats.currentStreak, stats.longestStreak) >= (p.days as number);

      case 'ojt_hours':
        return stats.ojtHoursLogged >= (p.hours as number);

      case 'portfolio_count':
        return stats.portfolioCount >= (p.count as number);

      case 'all_portfolio_categories':
        // Simplified — check if portfolio count >= 8 (one per category)
        return stats.portfolioCount >= 8;

      case 'diary_count':
        return stats.diaryCount >= (p.count as number);

      case 'level_reached':
        return stats.level >= (p.level as number);

      case 'total_xp':
        return stats.totalXP >= (p.xp as number);

      case 'daily_goal_streak':
        // Simplified — use current streak as proxy
        return stats.currentStreak >= (p.days as number);

      case 'epa_mock_completed':
        return false; // TODO: wire up when EPA mock tracking is available

      case 'epa_distinction':
        return false; // TODO: wire up when EPA mock tracking is available

      default:
        return false;
    }
  };

  // Run all achievement checks
  const checkAchievements = useCallback(async () => {
    if (!user) return;
    if (!hasLoadedRef.current) return;

    const stats = await gatherStats();
    if (!stats) return;

    const newUnlocks: AchievementDef[] = [];

    for (const def of ACHIEVEMENT_DEFINITIONS) {
      // Skip already unlocked
      if (unlocked.has(def.id)) continue;

      if (checkCondition(def, stats)) {
        // Unlock it
        try {
          await supabase.from('user_achievements' as any).upsert(
            { user_id: user.id, achievement_id: def.id } as any,
            { onConflict: 'user_id,achievement_id', ignoreDuplicates: true }
          );

          // Award bonus XP
          if (def.xpBonus > 0) {
            const { data: xpRow } = await supabase
              .from('user_xp_summary' as any)
              .select('total_xp, xp_today, xp_today_date')
              .eq('user_id', user.id)
              .maybeSingle();

            if (xpRow) {
              const row = xpRow as any;
              const today = new Date().toLocaleDateString('en-CA');
              const currentXPToday = row.xp_today_date === today ? (row.xp_today ?? 0) : 0;

              await supabase
                .from('user_xp_summary' as any)
                .update({
                  total_xp: (row.total_xp ?? 0) + def.xpBonus,
                  xp_today: currentXPToday + def.xpBonus,
                  xp_today_date: today,
                  updated_at: new Date().toISOString(),
                } as any)
                .eq('user_id', user.id);
            }
          }

          newUnlocks.push(def);
          setUnlocked((prev) => new Set([...prev, def.id]));
        } catch {
          // Likely unique constraint — already unlocked
        }
      }
    }

    // Show toast for the first new unlock
    if (newUnlocks.length > 0) {
      setRecentUnlock(newUnlocks[0]);
      toast.success(`Achievement Unlocked: ${newUnlocks[0].title}`, {
        description: `${newUnlocks[0].description} (+${newUnlocks[0].xpBonus} XP)`,
        duration: 5000,
      });
    }
  }, [user, unlocked, gatherStats]);

  // Get all achievements with unlock state
  const getAllAchievements = useCallback(() => {
    return ACHIEVEMENT_DEFINITIONS.map((def) => ({
      ...def,
      isUnlocked: unlocked.has(def.id),
    }));
  }, [unlocked]);

  const getUnlockedCount = useCallback(() => unlocked.size, [unlocked]);

  const getTotalCount = () => ACHIEVEMENT_DEFINITIONS.length;

  return {
    checkAchievements,
    getAllAchievements,
    getUnlockedCount,
    getTotalCount,
    recentUnlock,
    clearRecentUnlock: () => setRecentUnlock(null),
  };
}
