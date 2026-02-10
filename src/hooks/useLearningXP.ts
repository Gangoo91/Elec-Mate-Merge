/**
 * useLearningXP
 *
 * Core XP hook — single source of truth for all learning XP.
 * Reads user_xp_summary, provides logActivity() to insert to
 * learning_activity_log and update totals, resets xp_today on
 * date change.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  ActivityType,
  getLevelForXP,
  getXPToNextLevel,
  getLevelProgress,
  calculateXP,
  calculateDuration,
  XP_RULES,
} from '@/data/xpConfig';

export interface LogActivityParams {
  activityType: ActivityType;
  sourceId?: string;
  sourceTitle?: string;
  /** For flashcard sessions */
  cardsReviewed?: number;
  cardsMastered?: number;
  /** For quizzes / mock exams */
  scorePercent?: number;
  questionCount?: number;
  /** For videos / mock exams with actual duration */
  actualMinutes?: number;
  /** Extra metadata */
  metadata?: Record<string, unknown>;
}

interface XPSummary {
  totalXP: number;
  level: number;
  levelTitle: string;
  xpToNextLevel: number;
  xpProgress: number;
  xpToday: number;
  dailyGoal: number;
  dailyGoalMet: boolean;
}

const DEFAULT_SUMMARY: XPSummary = {
  totalXP: 0,
  level: 1,
  levelTitle: 'Apprentice',
  xpToNextLevel: 250,
  xpProgress: 0,
  xpToday: 0,
  dailyGoal: 100,
  dailyGoalMet: false,
};

export function useLearningXP() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<XPSummary>(DEFAULT_SUMMARY);
  const [loading, setLoading] = useState(true);

  // ─── Fetch summary ──────────────────────────────────────────
  const fetchSummary = useCallback(async () => {
    if (!user) {
      setSummary(DEFAULT_SUMMARY);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_xp_summary' as any)
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        // Table may not exist yet — fail silently
        setLoading(false);
        return;
      }

      if (data) {
        const row = data as any;
        const today = new Date().toLocaleDateString('en-CA');
        let xpToday = row.xp_today ?? 0;

        // Reset xp_today if date has changed
        if (row.xp_today_date !== today) {
          xpToday = 0;
          await supabase
            .from('user_xp_summary' as any)
            .update({ xp_today: 0, xp_today_date: today, updated_at: new Date().toISOString() } as any)
            .eq('user_id', user.id);
        }

        const totalXP = row.total_xp ?? 0;
        const levelDef = getLevelForXP(totalXP);
        const dailyGoal = row.daily_goal ?? 100;

        setSummary({
          totalXP,
          level: levelDef.level,
          levelTitle: levelDef.title,
          xpToNextLevel: getXPToNextLevel(totalXP),
          xpProgress: getLevelProgress(totalXP),
          xpToday,
          dailyGoal,
          dailyGoalMet: xpToday >= dailyGoal,
        });
      }
    } catch {
      // Fail silently
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // ─── Log activity ──────────────────────────────────────────
  const logActivity = useCallback(
    async (params: LogActivityParams) => {
      if (!user) return;

      const xpEarned = calculateXP(params.activityType, {
        cardsReviewed: params.cardsReviewed,
        scorePercent: params.scorePercent,
        cardsMastered: params.cardsMastered,
      });

      const durationMinutes = calculateDuration(params.activityType, {
        cardsReviewed: params.cardsReviewed,
        questionCount: params.questionCount,
        actualMinutes: params.actualMinutes,
      });

      try {
        // 1. Insert activity log entry
        await supabase.from('learning_activity_log' as any).insert({
          user_id: user.id,
          activity_type: params.activityType,
          source_id: params.sourceId ?? null,
          source_title: params.sourceTitle ?? null,
          xp_earned: xpEarned,
          duration_minutes: durationMinutes,
          metadata: params.metadata ?? {},
          counted_as_ojt: false,
        } as any);

        // 2. Upsert XP summary
        const today = new Date().toLocaleDateString('en-CA');
        const { data: existing } = await supabase
          .from('user_xp_summary' as any)
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (existing) {
          const row = existing as any;
          const currentXPToday =
            row.xp_today_date === today ? (row.xp_today ?? 0) : 0;
          const newTotalXP = (row.total_xp ?? 0) + xpEarned;
          const newXPToday = currentXPToday + xpEarned;
          const newLevel = getLevelForXP(newTotalXP).level;

          await supabase
            .from('user_xp_summary' as any)
            .update({
              total_xp: newTotalXP,
              level: newLevel,
              xp_today: newXPToday,
              xp_today_date: today,
              updated_at: new Date().toISOString(),
            } as any)
            .eq('user_id', user.id);
        } else {
          const newLevel = getLevelForXP(xpEarned).level;
          await supabase.from('user_xp_summary' as any).insert({
            user_id: user.id,
            total_xp: xpEarned,
            level: newLevel,
            xp_today: xpEarned,
            xp_today_date: today,
            daily_goal: 100,
          } as any);
        }

        // 3. Refresh local state
        await fetchSummary();
      } catch (err) {
        console.error('Error logging XP activity:', err);
      }
    },
    [user, fetchSummary]
  );

  // ─── Set daily goal ────────────────────────────────────────
  const setDailyGoal = useCallback(
    async (goal: number) => {
      if (!user) return;

      try {
        const { data: existing } = await supabase
          .from('user_xp_summary' as any)
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (existing) {
          await supabase
            .from('user_xp_summary' as any)
            .update({ daily_goal: goal, updated_at: new Date().toISOString() } as any)
            .eq('user_id', user.id);
        } else {
          await supabase.from('user_xp_summary' as any).insert({
            user_id: user.id,
            total_xp: 0,
            level: 1,
            xp_today: 0,
            xp_today_date: new Date().toLocaleDateString('en-CA'),
            daily_goal: goal,
          } as any);
        }

        setSummary((prev) => ({
          ...prev,
          dailyGoal: goal,
          dailyGoalMet: prev.xpToday >= goal,
        }));
      } catch (err) {
        console.error('Error setting daily goal:', err);
      }
    },
    [user]
  );

  return {
    ...summary,
    loading,
    logActivity,
    setDailyGoal,
    refetch: fetchSummary,
  };
}
