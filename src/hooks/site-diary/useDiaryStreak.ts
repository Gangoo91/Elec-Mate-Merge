/**
 * useDiaryStreak
 *
 * Calculates the current diary streak (consecutive days with entries),
 * milestone detection, and total unique days logged.
 */

import { useMemo } from 'react';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';

const MILESTONES = [3, 7, 14, 30, 60, 100] as const;

export interface StreakMilestone {
  days: number;
  reached: boolean;
  label: string;
  icon: string;
}

export function useDiaryStreak(entries: SiteDiaryEntry[]) {
  return useMemo(() => {
    if (entries.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: entries.length,
        totalDaysLogged: 0,
        milestones: MILESTONES.map((d) => ({
          days: d,
          reached: false,
          label: `${d} days`,
          icon: milestoneIcon(d),
        })),
        nextMilestone: MILESTONES[0],
        daysToNextMilestone: MILESTONES[0],
        streakMessage: 'Start your streak today!',
      };
    }

    // Get unique dates sorted descending
    const uniqueDates = Array.from(new Set(entries.map((e) => e.date))).sort((a, b) =>
      b.localeCompare(a)
    );

    const totalDaysLogged = uniqueDates.length;

    if (uniqueDates.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: 0,
        totalDaysLogged: 0,
        milestones: MILESTONES.map((d) => ({
          days: d,
          reached: false,
          label: `${d} days`,
          icon: milestoneIcon(d),
        })),
        nextMilestone: MILESTONES[0],
        daysToNextMilestone: MILESTONES[0],
        streakMessage: 'Start your streak today!',
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Current streak: count consecutive days from today or yesterday backwards
    let currentStreak = 0;
    const latestDate = uniqueDates[0];

    if (latestDate === todayStr || latestDate === yesterdayStr) {
      currentStreak = 1;
      const checkDate = new Date(latestDate);

      for (let i = 1; i < uniqueDates.length; i++) {
        checkDate.setDate(checkDate.getDate() - 1);
        const checkStr = checkDate.toISOString().split('T')[0];
        if (uniqueDates[i] === checkStr) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Longest streak
    let longestStreak = 1;
    let streak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = new Date(uniqueDates[i - 1]);
      prev.setDate(prev.getDate() - 1);
      if (prev.toISOString().split('T')[0] === uniqueDates[i]) {
        streak++;
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    // Milestone detection
    const milestones: StreakMilestone[] = MILESTONES.map((d) => ({
      days: d,
      reached: longestStreak >= d,
      label: `${d} days`,
      icon: milestoneIcon(d),
    }));

    // Next milestone
    const nextMilestone = MILESTONES.find((m) => currentStreak < m) ?? null;
    const daysToNextMilestone = nextMilestone ? nextMilestone - currentStreak : 0;

    // Motivational message
    const streakMessage = getStreakMessage(currentStreak);

    return {
      currentStreak,
      longestStreak,
      totalEntries: entries.length,
      totalDaysLogged,
      milestones,
      nextMilestone,
      daysToNextMilestone,
      streakMessage,
    };
  }, [entries]);
}

function milestoneIcon(days: number): string {
  if (days >= 100) return '\u{1F451}'; // crown
  if (days >= 60) return '\u{2B50}'; // star
  if (days >= 30) return '\u{1F3C6}'; // trophy
  if (days >= 14) return '\u{26A1}'; // lightning
  if (days >= 7) return '\u{1F525}'; // fire
  return '\u{1F31F}'; // glowing star
}

function getStreakMessage(streak: number): string {
  if (streak === 0) return 'Start your streak today!';
  if (streak <= 2) return 'Great start \u2014 keep it going!';
  if (streak <= 6) return 'Building momentum!';
  if (streak <= 13) return "You're on fire!";
  if (streak <= 29) return 'Two weeks strong \u2014 incredible discipline!';
  if (streak <= 59) return 'Legendary consistency!';
  return 'Absolute champion \u2014 unstoppable!';
}
