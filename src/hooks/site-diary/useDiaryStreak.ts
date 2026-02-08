/**
 * useDiaryStreak
 *
 * Calculates the current diary streak (consecutive days with entries).
 */

import { useMemo } from 'react';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';

export function useDiaryStreak(entries: SiteDiaryEntry[]) {
  return useMemo(() => {
    if (entries.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalEntries: entries.length };
    }

    // Get unique dates sorted descending
    const uniqueDates = Array.from(
      new Set(entries.map(e => e.date))
    ).sort((a, b) => b.localeCompare(a));

    if (uniqueDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalEntries: 0 };
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
      let checkDate = new Date(latestDate);

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
      const curr = new Date(uniqueDates[i]);
      prev.setDate(prev.getDate() - 1);
      if (prev.toISOString().split('T')[0] === uniqueDates[i]) {
        streak++;
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 1;
      }
    }

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      totalEntries: entries.length,
    };
  }, [entries]);
}
