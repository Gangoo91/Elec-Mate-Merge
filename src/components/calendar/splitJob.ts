/**
 * Split jobs — one job, several non-contiguous days (ELE-1649).
 *
 * Sparks are rarely on one job until it's done. Alex Gibbons, 30 Aug 2026:
 *
 *   "When you schedule a job lets say for a week, then you try to remove say
 *    thursday as you now have to go and chase another job... You cant set a
 *    job in seperate blocks from what i can see."
 *
 * ## The model: the first day IS the job
 *
 * A split job is N ordinary `calendar_events` rows, one per day worked. The
 * earliest row is the ANCHOR; every other row carries `parent_event_id` =
 * the anchor's id. There is deliberately no separate parent row.
 *
 * That choice is the whole point. A child is an ordinary event, so the month
 * grid, week view, agenda, capacity check, reminders and the Google sync all
 * keep working with no knowledge of this file — a phantom parent row would
 * have had to be filtered out of every one of them, and the first place anyone
 * forgot would show the customer a booking that does not exist.
 *
 * It also makes the thing Alex actually asked for a one-row delete: removing
 * Thursday is deleting Thursday, not editing a recurrence rule. Which is why
 * `recurrence_rule` stays unused — RRULE would need a parser, EXDATE handling
 * for the removed day, and it still could not express "Mon, Wed, and that one
 * Saturday".
 *
 * ## 🔴 `parent_event_id` is ON DELETE CASCADE
 *
 * Verified against the live schema, 30 Aug 2026:
 * `calendar_events_parent_event_id_fkey ... ON DELETE CASCADE`.
 *
 * So deleting the ANCHOR row deletes every other day of the job with it —
 * measured: a three-day job went to zero rows from one `delete`. Removing
 * Thursday, the exact thing this feature exists for, would silently destroy
 * the whole booking whenever Thursday happened to be the first day.
 *
 * Every delete path must therefore **detach the survivors BEFORE removing the
 * anchor**: promote the earliest survivor to `parent_event_id = null`, re-point
 * the others at it, and only then delete. `reanchor` computes that move; the
 * ORDER is the caller's responsibility and is not optional.
 */
import { differenceInCalendarDays, startOfDay } from 'date-fns';
import type { CalendarEvent } from '@/types/calendar';

/**
 * The id that identifies the JOB an event belongs to.
 *
 * A standalone event is its own job, so this is safe to call on anything and
 * is the key to group by whenever "per job" is meant rather than "per day".
 */
export const jobKey = (event: Pick<CalendarEvent, 'id' | 'parent_event_id'>): string =>
  event.parent_event_id ?? event.id;

/** True when this event is one day of a job spread across several. */
export const isSplitDay = (event: Pick<CalendarEvent, 'parent_event_id'>): boolean =>
  !!event.parent_event_id;

/**
 * Every day-entry of the job this event belongs to, earliest first.
 *
 * Needs the full event list because a child knows its parent but not its
 * siblings. Returns `[event]` for an ordinary booking, so callers never have
 * to special-case the common shape.
 */
export function jobDays(event: CalendarEvent, all: readonly CalendarEvent[]): CalendarEvent[] {
  const key = jobKey(event);
  const days = all.filter((e) => jobKey(e) === key);
  if (days.length === 0) return [event];
  return days.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
}

/** Group a flat event list into jobs, keyed by anchor id, each sorted by date. */
export function groupIntoJobs(all: readonly CalendarEvent[]): Map<string, CalendarEvent[]> {
  const jobs = new Map<string, CalendarEvent[]>();
  for (const event of all) {
    const key = jobKey(event);
    const bucket = jobs.get(key);
    if (bucket) bucket.push(event);
    else jobs.set(key, [event]);
  }
  for (const bucket of jobs.values()) {
    bucket.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  }
  return jobs;
}

/**
 * Which of these days should be the anchor, and how the rest re-point at it.
 *
 * Used after a day is removed. If the day deleted was the anchor, its children
 * are orphaned — every one of them still carrying a `parent_event_id` pointing
 * at a row that no longer exists, which would read as several unrelated
 * bookings. The earliest survivor is promoted and the others re-point to it.
 *
 * Returns null when nothing needs changing, so the caller can skip the write.
 */
export function reanchor(
  remaining: readonly CalendarEvent[]
): { anchorId: string; childIds: string[] } | null {
  if (remaining.length === 0) return null;
  const sorted = [...remaining].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );
  const [anchor, ...rest] = sorted;
  // Already correctly anchored: the earliest owns itself and the rest point at it.
  if (!anchor.parent_event_id && rest.every((e) => e.parent_event_id === anchor.id)) return null;
  return { anchorId: anchor.id, childIds: rest.map((e) => e.id) };
}

/** Distinct calendar days a set of day-entries covers, earliest first. */
export function datesOf(days: readonly CalendarEvent[]): Date[] {
  const seen = new Map<number, Date>();
  for (const day of days) {
    const d = startOfDay(new Date(day.start_at));
    seen.set(d.getTime(), d);
  }
  return [...seen.values()].sort((a, b) => a.getTime() - b.getTime());
}

/**
 * True when these dates are consecutive calendar days.
 *
 * A "split" job booked on Mon, Tue, Wed is really just a three-day block, and
 * saying "3 days" reads better than listing them. Lets the UI describe a job
 * the way its owner thinks about it rather than the way it is stored.
 */
export function isContiguous(dates: readonly Date[]): boolean {
  if (dates.length < 2) return true;
  for (let i = 1; i < dates.length; i++) {
    if (differenceInCalendarDays(dates[i], dates[i - 1]) !== 1) return false;
  }
  return true;
}
