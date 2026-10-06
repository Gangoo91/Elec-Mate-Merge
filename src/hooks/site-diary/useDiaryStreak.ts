/**
 * useDiaryStreak — the diary's working-day streak, ONE rule for every screen.
 *
 * 🔴 The streak counts WORKING days (Mon–Fri), not calendar days, so a
 * weekend off never breaks it — and a weekend entry still counts if you
 * worked it.
 *
 * 6 Oct 2026 rebuild. Two bugs and a duplicate are gone:
 *   - It only counted if the latest entry was today or yesterday, so on a
 *     Monday with Friday logged it read 0 — the opposite of "weekends won't
 *     break it". It now steps back over the weekend to the last working day.
 *   - A future-dated entry (the form allowed them) became the "latest" and
 *     zeroed it. Future dates are ignored.
 *   - The hub's insights hook had its own consecutive-calendar-day count that
 *     reset every Saturday; it now uses `workingDayStreak` from here.
 * Today not being logged yet never breaks it — the day isn't over.
 * A day marked college / off / holiday / sick (useDiaryDayMarks) is stepped
 * over like a weekend: it neither breaks the streak nor adds to it.
 * The milestone badges are gone (Andrew's design audit): one gentle line, and
 * only from a streak of 2.
 */
import { useMemo } from 'react';
import { toLocalISODate, parseLocalISODate } from '@/lib/localDate';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

/** Current streak in working days from a set of logged ISO dates. */
export function workingDayStreak(
  dates: Iterable<string>,
  now: Date = new Date(),
  covered: ReadonlySet<string> = new Set()
): number {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const todayKey = toLocalISODate(today);
  const logged = new Set([...dates].filter((d) => d <= todayKey));
  if (!logged.size) return 0;

  const cursor = new Date(today);
  let streak = 0;
  // Today: counts if logged; if not, it doesn't break anything yet.
  if (logged.has(todayKey)) streak = 1;
  for (let guard = 0; guard < 800; guard++) {
    cursor.setDate(cursor.getDate() - 1);
    const key = toLocalISODate(cursor);
    if (logged.has(key)) {
      streak++;
      continue;
    }
    if (isWeekend(cursor) || covered.has(key)) continue; // weekend / marked day — stepped over
    break; // a working day with nothing logged ends it
  }
  return streak;
}

/** Longest working-day streak ever, on the same rule. */
export function longestWorkingDayStreak(
  dates: Iterable<string>,
  now: Date = new Date(),
  covered: ReadonlySet<string> = new Set()
): number {
  const todayKey = toLocalISODate(now);
  const sorted = [...new Set([...dates].filter((d) => d <= todayKey))].sort();
  if (!sorted.length) return 0;
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const cursor = parseLocalISODate(sorted[i - 1]);
    let linked = false;
    for (let guard = 0; guard < 31; guard++) {
      cursor.setDate(cursor.getDate() + 1);
      const key = toLocalISODate(cursor);
      if (key === sorted[i]) {
        linked = true;
        break;
      }
      if (isWeekend(cursor) || covered.has(key)) continue;
      break;
    }
    run = linked ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}

export function useDiaryStreak(entries: SiteDiaryEntry[], markedDays: string[] = []) {
  const markedKey = markedDays.join(',');
  return useMemo(() => {
    const dates = entries.map((e) => e.date);
    const covered = new Set(markedKey ? markedKey.split(',') : []);
    const currentStreak = workingDayStreak(dates, new Date(), covered);
    const longestStreak = Math.max(
      longestWorkingDayStreak(dates, new Date(), covered),
      currentStreak
    );
    const todayKey = toLocalISODate(new Date());
    const totalDaysLogged = new Set(dates.filter((d) => d <= todayKey)).size;
    return {
      currentStreak,
      longestStreak,
      totalEntries: entries.length,
      totalDaysLogged,
      /** One gentle line, only from 2 working days in a row. */
      streakMessage:
        currentStreak >= 2
          ? `${currentStreak} working days in a row — weekends don’t break it.`
          : null,
    };
  }, [entries, markedKey]);
}
