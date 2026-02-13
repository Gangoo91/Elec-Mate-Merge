/**
 * useOJTInsights
 *
 * Pure computation hook for OJT analytics.
 * All data is derived from entries via useMemo — no side effects, no fetching.
 */

import { useMemo } from 'react';
import type { TimeEntry } from '@/types/time-tracking';

/* ─── Interfaces ─── */

export interface WeekChartData {
  label: string;
  hours: number;
  target: number;
}

export interface CategoryData {
  name: string;
  hours: number;
  percentage: number;
  colour: string;
}

export interface OJTStreak {
  current: number;
  longest: number;
  isActiveToday: boolean;
}

export interface SmartSuggestion {
  activity: string;
  duration: number; // minutes
  dayName: string;
}

export interface MonthlySummary {
  key: string; // YYYY-MM
  label: string; // "January 2026"
  totalHours: number;
  sessionCount: number;
  topCategory: string;
}

export interface Milestone {
  hours: number;
  label: string;
  reached: boolean;
}

/* ─── Constants ─── */

const CATEGORY_COLOURS: Record<string, string> = {
  'Workshop Training': '#EAB308',
  'College Session': '#3B82F6',
  'Online Learning': '#8B5CF6',
  'Practical Assessment': '#10B981',
  'Self Study': '#14B8A6',
  'Site Visit/Tour': '#F97316',
  'Mentoring Session': '#EC4899',
  'Safety Training': '#EF4444',
};

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MILESTONE_VALUES = [50, 100, 150, 200, 250, 300, 350, 400];

/* ─── Hook ─── */

export function useOJTInsights(entries: TimeEntry[], yearlyTarget = 400) {
  const safeEntries = entries || [];

  /* Total hours */
  const totalHours = useMemo(() => {
    return safeEntries.reduce((sum, e) => sum + (e.duration || 0), 0) / 60;
  }, [safeEntries]);

  /* Weekly chart — last 4 weeks (Mon–Sun), most recent on right */
  const weeklyChartData = useMemo((): WeekChartData[] => {
    const now = new Date();
    const result: WeekChartData[] = [];

    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      // Monday of target week
      weekStart.setDate(
        now.getDate() - ((now.getDay() + 6) % 7) - i * 7
      );
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekHours = safeEntries
        .filter((e) => {
          const d = new Date(e.date);
          return d >= weekStart && d <= weekEnd;
        })
        .reduce((sum, e) => sum + (e.duration || 0), 0) / 60;

      result.push({
        label: weekStart.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        }),
        hours: parseFloat(weekHours.toFixed(1)),
        target: 7.5,
      });
    }

    return result;
  }, [safeEntries]);

  /* Category breakdown */
  const categoryData = useMemo((): CategoryData[] => {
    const categoryMap = new Map<string, number>();

    for (const entry of safeEntries) {
      const name = entry.activity || 'Other';
      categoryMap.set(name, (categoryMap.get(name) || 0) + entry.duration);
    }

    const totalMins = Array.from(categoryMap.values()).reduce(
      (a, b) => a + b,
      0
    );

    return Array.from(categoryMap.entries())
      .map(([name, mins]) => ({
        name,
        hours: parseFloat((mins / 60).toFixed(1)),
        percentage: totalMins > 0 ? Math.round((mins / totalMins) * 100) : 0,
        colour: CATEGORY_COLOURS[name] || '#6B7280',
      }))
      .sort((a, b) => b.hours - a.hours);
  }, [safeEntries]);

  /* OJT streak */
  const streak = useMemo((): OJTStreak => {
    if (safeEntries.length === 0)
      return { current: 0, longest: 0, isActiveToday: false };

    const dateSet = new Set(safeEntries.map((e) => e.date.slice(0, 10)));
    const sortedDates = [...dateSet].sort().reverse();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const isActiveToday = dateSet.has(todayStr);

    // Current streak: consecutive days back from today (or yesterday if not logged today)
    let current = 0;
    let checkDate = isActiveToday
      ? new Date(today)
      : dateSet.has(yesterdayStr)
        ? new Date(yesterday)
        : null;

    if (checkDate) {
      while (dateSet.has(checkDate.toISOString().slice(0, 10))) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    // Longest streak: scan all sorted dates
    let longest = 0;
    let tempStreak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const curr = new Date(sortedDates[i] + 'T00:00:00');
      const next = new Date(sortedDates[i + 1] + 'T00:00:00');
      const diffDays =
        (curr.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diffDays) === 1) {
        tempStreak++;
      } else {
        longest = Math.max(longest, tempStreak);
        tempStreak = 1;
      }
    }
    longest = Math.max(longest, tempStreak, current);

    return { current, longest, isActiveToday };
  }, [safeEntries]);

  /* Smart suggestion — based on day-of-week patterns */
  const smartSuggestion = useMemo((): SmartSuggestion | null => {
    const todayDay = new Date().getDay();
    const sameDayEntries = safeEntries.filter(
      (e) => new Date(e.date).getDay() === todayDay
    );

    if (sameDayEntries.length < 2) return null;

    const activityCounts = new Map<string, number>();
    const durationSums = new Map<string, number>();
    const durationCounts = new Map<string, number>();

    for (const e of sameDayEntries) {
      activityCounts.set(
        e.activity,
        (activityCounts.get(e.activity) || 0) + 1
      );
      durationSums.set(
        e.activity,
        (durationSums.get(e.activity) || 0) + e.duration
      );
      durationCounts.set(
        e.activity,
        (durationCounts.get(e.activity) || 0) + 1
      );
    }

    let topActivity = '';
    let topCount = 0;
    for (const [activity, count] of activityCounts) {
      if (count > topCount) {
        topActivity = activity;
        topCount = count;
      }
    }

    if (!topActivity) return null;

    const avgDuration = Math.round(
      (durationSums.get(topActivity) || 0) /
        (durationCounts.get(topActivity) || 1)
    );

    return {
      activity: topActivity,
      duration: avgDuration,
      dayName: DAY_NAMES[todayDay],
    };
  }, [safeEntries]);

  /* Monthly summaries — last 6 months with entries */
  const monthlySummaries = useMemo((): MonthlySummary[] => {
    const monthMap = new Map<string, TimeEntry[]>();

    for (const entry of safeEntries) {
      const monthKey = entry.date.slice(0, 7);
      const existing = monthMap.get(monthKey) || [];
      existing.push(entry);
      monthMap.set(monthKey, existing);
    }

    return Array.from(monthMap.entries())
      .map(([key, monthEntries]) => {
        const totalMins = monthEntries.reduce(
          (sum, e) => sum + e.duration,
          0
        );

        // Top category by time
        const catCounts = new Map<string, number>();
        for (const e of monthEntries) {
          catCounts.set(
            e.activity,
            (catCounts.get(e.activity) || 0) + e.duration
          );
        }
        let topCat = '';
        let topMins = 0;
        for (const [cat, mins] of catCounts) {
          if (mins > topMins) {
            topCat = cat;
            topMins = mins;
          }
        }

        const d = new Date(key + '-01');
        return {
          key,
          label: d.toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          }),
          totalHours: parseFloat((totalMins / 60).toFixed(1)),
          sessionCount: monthEntries.length,
          topCategory: topCat,
        };
      })
      .sort((a, b) => b.key.localeCompare(a.key))
      .slice(0, 6);
  }, [safeEntries]);

  /* Milestones */
  const milestones = useMemo(
    (): Milestone[] =>
      MILESTONE_VALUES.map((hours) => ({
        hours,
        label: `${hours}h`,
        reached: totalHours >= hours,
      })),
    [totalHours]
  );

  const nextMilestone = milestones.find((m) => !m.reached) || null;

  /* Forecast helpers (raw data — component formats the message) */
  const forecastData = useMemo(() => {
    if (safeEntries.length === 0)
      return { weeklyRate: 0, weeksElapsed: 0 };

    const dates = safeEntries
      .map((e) => new Date(e.date))
      .sort((a, b) => a.getTime() - b.getTime());
    const firstDate = dates[0];
    const now = new Date();

    const weeksElapsed = Math.max(
      1,
      (now.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    const weeklyRate = totalHours / weeksElapsed;

    return {
      weeklyRate: parseFloat(weeklyRate.toFixed(1)),
      weeksElapsed: parseFloat(weeksElapsed.toFixed(1)),
    };
  }, [safeEntries, totalHours]);

  return {
    totalHours,
    weeklyChartData,
    categoryData,
    streak,
    smartSuggestion,
    monthlySummaries,
    milestones,
    nextMilestone,
    forecastData,
  };
}

export default useOJTInsights;
