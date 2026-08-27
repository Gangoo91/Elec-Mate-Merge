/**
 * Everything that lands on a day, from all four places it can come from.
 *
 * The calendar page has always merged real `calendar_events` with three sets of
 * synthetic ones — task due dates, project start/due dates and booked site
 * visits. Anything else showing "what's on today" has, until now, gone straight
 * to `calendar_events` and quietly disagreed with it: the Business Hub's diary
 * tile counted only real events, so a day holding two site visits and a job
 * deadline reported "nothing booked in".
 *
 * One hook, so a day can only ever have one answer.
 */
import { useMemo } from 'react';
import { useCalendarEvents } from './useCalendarEvents';
import { useTasksForCalendar } from './useTasksForCalendar';
import { useProjectsForCalendar } from './useProjectsForCalendar';
import { useSiteVisitsForCalendar } from './useSiteVisitsForCalendar';
import { compareEvents } from '@/components/calendar/eventUtils';
import type { CalendarEvent } from '@/types/calendar';

export function useDiaryEvents(dateFrom: string, dateTo: string, enabled = true) {
  const events = useCalendarEvents(dateFrom, dateTo, enabled);
  const tasks = useTasksForCalendar(dateFrom, dateTo, enabled);
  const projects = useProjectsForCalendar(dateFrom, dateTo, enabled);
  const visits = useSiteVisitsForCalendar(dateFrom, dateTo, enabled);

  const all = useMemo(
    () =>
      [
        ...(events.data ?? []),
        ...(tasks.data ?? []),
        ...(projects.data ?? []),
        ...(visits.data ?? []),
      ].sort(compareEvents),
    [events.data, tasks.data, projects.data, visits.data]
  );

  return {
    events: all,
    /*
     * Loading only while the real events are still in flight.
     *
     * The three synthetic sources are garnish — a panel that waits for all four
     * shows a skeleton for as long as the slowest query takes, and the diary is
     * the thing an electrician opens the app to see. The extras appear as they
     * arrive.
     */
    isLoading: events.isLoading,
  };
}

/**
 * How far ahead the diary looks.
 *
 * Shared, and worth keeping shared: two callers asking for the same days with
 * different window lengths produce two different React Query keys, so the
 * second one is a full extra set of round trips rather than a cache hit.
 */
export const DIARY_WINDOW_DAYS = 7;

/**
 * The half-open range covering `days` days from midnight on `from`.
 *
 * `from` is a parameter rather than an internal `new Date()` so a caller can
 * memoise on the date it passed in. Memoising on `[]` instead pinned the window
 * to whenever the component mounted, and an app left open on a van seat
 * overnight went on drawing yesterday as "Today" until it was reloaded.
 */
export function diaryRange(days: number, from: Date = new Date()): {
  dateFrom: string;
  dateTo: string;
} {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + days);
  end.setMilliseconds(-1);
  return { dateFrom: start.toISOString(), dateTo: end.toISOString() };
}
