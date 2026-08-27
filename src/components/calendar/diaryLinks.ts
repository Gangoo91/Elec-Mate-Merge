/**
 * Where a tap on the diary goes.
 *
 * The diary now appears in three places — the calendar page, the Business Hub
 * and the dashboard — and all three have to agree on what tapping a day, a free
 * slot or an event means. Keeping the URLs in one file means the day sheet can
 * change how it opens without three pages needing to hear about it.
 */
import { format } from 'date-fns';
import type { CalendarEvent } from '@/types/calendar';

export const CALENDAR_PATH = '/electrician/business/calendar';

/** `yyyy-MM-dd`, the form every date param on the calendar takes. */
export const dateParam = (date: Date): string => format(date, 'yyyy-MM-dd');

/** Open the calendar with a given day opened up. */
export const calendarDayUrl = (date: Date): string =>
  `${CALENDAR_PATH}?date=${dateParam(date)}&open=day`;

/** Open the calendar with the new-event sheet already up for a day, or a slot. */
export const calendarNewEventUrl = (date: Date, hour?: number): string => {
  const params = new URLSearchParams({ date: dateParam(date), new: '1' });
  if (hour != null) params.set('hour', String(hour));
  return `${CALENDAR_PATH}?${params.toString()}`;
};

/**
 * The record a synthetic event stands for.
 *
 * Tasks, projects and site visits are drawn on the calendar but do not live in
 * `calendar_events` — tapping one should open the thing itself, not an event
 * detail sheet describing it. Returns null for a real event, which the caller
 * handles by opening the sheet.
 *
 * `job_id` carries the underlying row id on synthetic events; see
 * `useProjectsForCalendar` and `useSiteVisitsForCalendar`.
 */
export function eventRecordHref(event: CalendarEvent): string | null {
  if (event.id.startsWith('task-')) return '/electrician/tasks';
  if (event.id.startsWith('project-')) {
    return event.job_id ? `/electrician/projects/${event.job_id}` : '/electrician/projects';
  }
  if (event.id.startsWith('visit-')) {
    return event.job_id ? `/electrician/site-visit/${event.job_id}` : '/electrician/site-visits';
  }
  return null;
}
