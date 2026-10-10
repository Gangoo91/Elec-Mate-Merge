/**
 * useLearningXP
 *
 * Core XP hook. Since 9 Oct 2026 the SERVER owns XP (migrations
 * 20261009170000/171000): learning_activity_log is the ledger, the server
 * decides every amount (award_xp), each item awards once per period, daily
 * caps apply, and users cannot write XP. This hook only:
 *   - reads live totals from get_my_xp (today/week/month in Europe/London),
 *   - reports what happened via award_xp (the server prices it),
 *   - (streaks are the server's too: my_streak, from the same ledger).
 */

import { useState, useEffect, useCallback } from 'react';
import { sharedFetch } from '@/lib/sharedFetch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  ActivityType,
  getLevelForXP,
  getXPToNextLevel,
  getLevelProgress,
  calculateDuration,
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
  /**
   * Skip inserting the learning_activity_log row — for activities whose log
   * entry is written by a trusted server path (e.g. log_study_activity RPC).
   * XP summary, streak and the activity event still update as normal.
   */
  skipLogRow?: boolean;
}

interface XPSummary {
  totalXP: number;
  level: number;
  levelTitle: string;
  xpToNextLevel: number;
  xpProgress: number;
  xpToday: number;
  /** This calendar week (from Monday) and month, Europe/London — what the boards rank. */
  xpWeek: number;
  xpMonth: number;
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
  xpWeek: 0,
  xpMonth: 0,
  dailyGoal: 100,
  dailyGoalMet: false,
};

/** What the server said about one award, for toasts and tests. */
export interface AwardResult {
  xp: number;
  awarded: boolean;
  reason?: 'awarded' | 'already_awarded' | 'daily_cap' | 'duplicate' | string;
}

export function useLearningXP() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<XPSummary>(DEFAULT_SUMMARY);
  const [loading, setLoading] = useState(true);

  // ─── Fetch summary ──────────────────────────────────────────
  // Live from the ledger. The stored summary is maintained by a trigger, but
  // get_my_xp also gives today/week/month on the London calendar, so a
  // "today" from yesterday can never show.
  const fetchSummary = useCallback(async (force = false) => {
    if (!user) {
      setSummary(DEFAULT_SUMMARY);
      setLoading(false);
      return;
    }

    try {
      // ELE-1912: a dozen components on the apprentice screens mount this
      // hook at once — they share one read; after a write it always refetches.
      const { data, error } = await sharedFetch(
        `xp_summary:${user.id}`,
        async () => await supabase.rpc('get_my_xp' as any),
        { force }
      );
      if (error || !data) return;

      const row = data as {
        total_xp?: number;
        xp_today?: number;
        xp_week?: number;
        xp_month?: number;
        daily_goal?: number;
      };
      const totalXP = Number(row.total_xp ?? 0);
      const xpToday = Number(row.xp_today ?? 0);
      const dailyGoal = Number(row.daily_goal ?? 100);
      const levelDef = getLevelForXP(totalXP);

      setSummary({
        totalXP,
        level: levelDef.level,
        levelTitle: levelDef.title,
        xpToNextLevel: getXPToNextLevel(totalXP),
        xpProgress: getLevelProgress(totalXP),
        xpToday,
        xpWeek: Number(row.xp_week ?? 0),
        xpMonth: Number(row.xp_month ?? 0),
        dailyGoal,
        dailyGoalMet: xpToday >= dailyGoal,
      });
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
  // Reports what happened; the server decides what it is worth, whether this
  // item has already earned today, and the daily caps. The minutes still
  // feed off-the-job time exactly as before.
  const logActivity = useCallback(
    async (params: LogActivityParams): Promise<AwardResult | null> => {
      if (!user) return null;

      const durationMinutes = calculateDuration(params.activityType, {
        cardsReviewed: params.cardsReviewed,
        questionCount: params.questionCount,
        actualMinutes: params.actualMinutes,
      });

      let award: AwardResult | null = null;
      try {
        // 1. Award (unless a trusted server path already wrote the row,
        //    e.g. log_study_activity for course sections)
        if (!params.skipLogRow) {
          const { data, error } = await supabase.rpc('award_xp' as any, {
            p_activity_type: params.activityType,
            p_source_id: params.sourceId ?? null,
            p_source_title: params.sourceTitle ?? null,
            p_score: params.scorePercent ?? null,
            p_cards: params.cardsReviewed ?? null,
            p_duration_minutes: durationMinutes,
            p_metadata: params.metadata ?? {},
          } as any);
          if (error) console.warn('[xp] award failed', error.message);
          else award = data as AwardResult;
        }

        // 2. Study streak: kept by the server from the ledger (since 10 Oct
        //    2026) — any activity row is a study day; nothing to write here.

        // 3. Trigger achievement check (global event — any listener can pick this up)
        window.dispatchEvent(new CustomEvent('elecmate:activity-logged'));

        // 4. Refresh local state from the server's figures
        await fetchSummary(true);
      } catch (err) {
        console.error('Error logging XP activity:', err);
      }
      return award;
    },
    [user, fetchSummary]
  );

  // ─── Set daily goal ────────────────────────────────────────
  const setDailyGoal = useCallback(
    async (goal: number) => {
      if (!user) return;

      try {
        // The one XP setting a user may change (50/100/200/300).
        const { error } = await supabase.rpc('set_xp_daily_goal' as any, { p_goal: goal } as any);
        if (error) throw error;

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
    refetch: () => fetchSummary(true),
  };
}
