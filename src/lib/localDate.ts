/**
 * localDate — calendar-date helpers that respect the user's LOCAL timezone.
 *
 * The bug these prevent: `new Date().toISOString().split('T')[0]` returns the
 * UTC date. After ~23:00 in BST (UTC+1) that's already TOMORROW, so "today" is
 * computed as the wrong calendar day — which silently breaks streaks (logged
 * tonight, streak says 0), calendars (wrong cell marked today; today disabled
 * as "future"), and weekly windows. Entries are stored with the LOCAL date the
 * user picked, so every "today/yesterday/this-week" comparison must be local
 * too. These helpers format and parse using local fields throughout — never
 * toISOString() for a calendar date.
 */

/** A Date → 'YYYY-MM-DD' using LOCAL year/month/day (never UTC). */
export function toLocalISODate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Today's LOCAL calendar date as 'YYYY-MM-DD'. */
export function todayLocalISO(): string {
  return toLocalISODate(new Date());
}

/** Parse a 'YYYY-MM-DD' string as LOCAL midnight (never UTC midnight). */
export function parseLocalISODate(s: string): Date {
  return new Date(`${s}T00:00:00`);
}

/** Whole-day difference (a − b) between two 'YYYY-MM-DD' strings, local. */
export function daysBetweenISO(a: string, b: string): number {
  return Math.round((parseLocalISODate(a).getTime() - parseLocalISODate(b).getTime()) / 86_400_000);
}
