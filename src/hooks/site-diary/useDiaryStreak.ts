/**
 * useDiaryStreak
 *
 * Calculates the current diary streak, milestone detection, and total unique
 * days logged.
 *
 * 🔴 The streak counts WORKING days, not consecutive calendar days. A weekend
 * with no entry is stepped over rather than breaking it — otherwise anyone on
 * a normal Mon-Fri could never pass 5, which made every milestone above that
 * (7, 14, 30, 60, 100) unreachable. A weekend entry still counts if you
 * worked it.
 */

import { useMemo } from 'react';
import { toLocalISODate, parseLocalISODate } from '@/lib/localDate';
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
        streakMessage: 'Log today to start a streak — weekends off will not break it.',
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
        streakMessage: 'Log today to start a streak — weekends off will not break it.',
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = toLocalISODate(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toLocalISODate(yesterday);

    /*
     * Current streak, counted in WORKING days.
     *
     * This used to require consecutive calendar days, which made the whole
     * feature unreachable: an apprentice on site Monday to Friday has their
     * streak broken every Saturday, so it could never exceed 5 — while the
     * milestones ask for 7, 14, 30, 60 and 100. A work diary should not punish
     * someone for not working the weekend.
     *
     * Walking back a day at a time: an entry continues the streak; a missing
     * weekend day is stepped over; a missing weekday ends it. Anyone who does
     * work weekends still gets credit, because the entry itself is what counts
     * — the skip only applies to a weekend with no entry.
     */
    let currentStreak = 0;
    const latestDate = uniqueDates[0];
    const entryDates = new Set(uniqueDates);

    if (latestDate === todayStr || latestDate === yesterdayStr) {
      const cursor = parseLocalISODate(latestDate);
      currentStreak = 1;

      // Bounded by the entries we have; each step moves back exactly one day.
      for (let guard = 0; guard < 400; guard++) {
        cursor.setDate(cursor.getDate() - 1);
        const key = toLocalISODate(cursor);
        if (entryDates.has(key)) {
          currentStreak++;
          continue;
        }
        const day = cursor.getDay(); // 0 Sun, 6 Sat
        if (day === 0 || day === 6) continue; // weekend off — streak survives
        break; // a working day with nothing logged ends it
      }
    }

    /* Longest streak — same working-day rule, or it would contradict the
       current one (a live 8-day streak against an all-time best of 5). */
    let longestStreak = 1;
    let streak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const cursor = parseLocalISODate(uniqueDates[i - 1]);
      let linked = false;
      for (let guard = 0; guard < 7; guard++) {
        cursor.setDate(cursor.getDate() - 1);
        const key = toLocalISODate(cursor);
        if (key === uniqueDates[i]) {
          linked = true;
          break;
        }
        const day = cursor.getDay();
        if (day === 0 || day === 6) continue; // stepped over a weekend
        break;
      }
      if (linked) {
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
  if (streak === 0) return 'Log today to start a streak — weekends off will not break it.';
  if (streak <= 2) return 'Great start \u2014 keep it going!';
  if (streak <= 6) return 'Building momentum!';
  if (streak <= 13) return "You're on fire!";
  if (streak <= 29) return 'Two weeks strong \u2014 incredible discipline!';
  if (streak <= 59) return 'Legendary consistency!';
  return 'Absolute champion \u2014 unstoppable!';
}
