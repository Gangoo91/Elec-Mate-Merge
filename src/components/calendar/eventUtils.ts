/**
 * Shared event maths for the calendar views.
 *
 * The reason this file exists: every view used to key events off their START
 * day alone —
 *
 *   const key = format(new Date(event.start_at), 'yyyy-MM-dd');
 *
 * — so a job running Monday to Wednesday appeared on Monday and nowhere else.
 * On live data that is not an edge case: `general` events average 28.7 hours
 * and jobs 6.6, and a two-day job that shows on one day is a missed second day.
 *
 * Everything here works in LOCAL date components (via date-fns `startOfDay` /
 * `differenceInCalendarDays`) rather than on the ISO string, so an event that
 * runs 23:00–01:00 spans the two days the electrician actually experienced,
 * not the two UTC days.
 */
import {
  differenceInCalendarDays,
  endOfDay,
  format,
  isSameDay,
  max as maxDate,
  min as minDate,
  startOfDay,
} from 'date-fns';
import type { CalendarEvent } from '@/types/calendar';

/** `yyyy-MM-dd` for a date, in local time. The key every day map uses. */
export const dayKey = (date: Date): string => format(date, 'yyyy-MM-dd');

/**
 * The last instant an event actually occupies.
 *
 * An event ending at exactly midnight belongs to the day before it: 09:00–00:00
 * is a Monday event, not a Monday-and-Tuesday one. Without this, every evening
 * job painted a bar across the following morning.
 */
export function effectiveEnd(event: CalendarEvent): Date {
  const start = new Date(event.start_at);
  const end = new Date(event.end_at ?? event.start_at);
  if (end <= start) return start;
  const isMidnight =
    end.getHours() === 0 && end.getMinutes() === 0 && end.getSeconds() === 0;
  return isMidnight ? new Date(end.getTime() - 1) : end;
}

/** How many calendar days the event touches. 1 for anything inside one day. */
export function eventDaySpan(event: CalendarEvent): number {
  return differenceInCalendarDays(effectiveEnd(event), new Date(event.start_at)) + 1;
}

/** True when the event covers more than one calendar day. */
export const isMultiDay = (event: CalendarEvent): boolean => eventDaySpan(event) > 1;

/**
 * Index every event under each day it covers.
 *
 * A three-day job lands in three buckets, so the month grid, the agenda and the
 * day view all see it on every day it runs rather than only on day one.
 */
export function buildEventsByDay(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const start = startOfDay(new Date(event.start_at));
    const span = eventDaySpan(event);
    for (let i = 0; i < span; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const key = dayKey(day);
      const bucket = map.get(key);
      if (bucket) bucket.push(event);
      else map.set(key, [event]);
    }
  }
  for (const bucket of map.values()) bucket.sort(compareEvents);
  return map;
}

/** Every event touching `date`, in display order. */
export function eventsOnDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return events
    .filter((e) => new Date(e.start_at) <= end && effectiveEnd(e) >= start)
    .sort(compareEvents);
}

/**
 * Display order: things that own the whole day first (all-day, then multi-day),
 * then timed events by start. Matches how a day is actually read — the banner
 * across the top, then the schedule underneath.
 */
export function compareEvents(a: CalendarEvent, b: CalendarEvent): number {
  const rank = (e: CalendarEvent) => (e.all_day ? 0 : isMultiDay(e) ? 1 : 2);
  const byRank = rank(a) - rank(b);
  if (byRank !== 0) return byRank;
  return new Date(a.start_at).getTime() - new Date(b.start_at).getTime();
}

/** Where a given day sits within a multi-day run — drives the bar's shape. */
export interface DaySegment {
  isStart: boolean;
  isEnd: boolean;
  /** Spans the whole of this day, so it draws as a bar rather than a chip. */
  spansDay: boolean;
}

export function segmentForDay(event: CalendarEvent, day: Date): DaySegment {
  const start = new Date(event.start_at);
  const end = effectiveEnd(event);
  const isStart = isSameDay(start, day);
  const isEnd = isSameDay(end, day);
  return { isStart, isEnd, spansDay: event.all_day || isMultiDay(event) };
}

/** The portion of an event that falls inside one day — used by day/week views. */
export function clampToDay(event: CalendarEvent, day: Date): { start: Date; end: Date } {
  return {
    start: maxDate([new Date(event.start_at), startOfDay(day)]),
    end: minDate([effectiveEnd(event), endOfDay(day)]),
  };
}

/**
 * The time to show against an event on a given day.
 *
 * Continuation days say so rather than repeating a start time that already
 * passed — "09:00" on day two of a three-day job is a lie about that day.
 */
export function eventTimeLabel(event: CalendarEvent, day?: Date): string {
  if (event.all_day) return 'All day';
  const start = new Date(event.start_at);
  if (day && !isSameDay(start, day)) return 'Continues';
  return format(start, 'HH:mm');
}

/** One event's slot in a column layout: which column, out of how many. */
export interface PositionedEvent {
  event: CalendarEvent;
  start: Date;
  end: Date;
  column: number;
  columns: number;
}

/**
 * Lay overlapping events out side by side.
 *
 * Two jobs at the same time used to be drawn at the same coordinates, so the
 * second one covered the first completely — a double booking looked identical
 * to a single booking, which is the one thing a diary must never do.
 *
 * Events are grouped into clusters that transitively overlap, given the first
 * free column within their cluster, and every event in a cluster is told the
 * cluster's width so the columns line up.
 */
export function layoutDayEvents(events: CalendarEvent[], day: Date): PositionedEvent[] {
  const timed = events
    .filter((e) => !e.all_day)
    .map((e) => ({ event: e, ...clampToDay(e, day) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime() || b.end.getTime() - a.end.getTime());

  const positioned: PositionedEvent[] = [];
  let cluster: PositionedEvent[] = [];
  let clusterEnd = 0;

  const closeCluster = () => {
    const width = cluster.reduce((max, p) => Math.max(max, p.column + 1), 0);
    for (const p of cluster) p.columns = width;
    positioned.push(...cluster);
    cluster = [];
    clusterEnd = 0;
  };

  for (const item of timed) {
    // A gap with nothing running through it ends the cluster — what follows
    // can start again from column zero.
    if (cluster.length > 0 && item.start.getTime() >= clusterEnd) closeCluster();

    // Lowest column not occupied by something still running.
    const taken = new Set(
      cluster.filter((p) => p.end.getTime() > item.start.getTime()).map((p) => p.column)
    );
    let column = 0;
    while (taken.has(column)) column++;

    cluster.push({ ...item, column, columns: 1 });
    clusterEnd = Math.max(clusterEnd, item.end.getTime());
  }
  if (cluster.length > 0) closeCluster();

  return positioned;
}

/** Total booked hours across a set of events, all-day counted as a working day. */
export function totalHours(events: CalendarEvent[], workingDayHours = 8): number {
  return events.reduce((sum, e) => {
    if (e.all_day) return sum + workingDayHours;
    const ms = effectiveEnd(e).getTime() - new Date(e.start_at).getTime();
    return sum + Math.max(0, ms) / 3_600_000;
  }, 0);
}

/**
 * Events that read as real work rather than diary noise.
 *
 * The month/agenda views merge in synthetic events built from tasks, projects
 * and site visits (see `useTasksForCalendar` and friends), whose ids carry a
 * prefix. Counting a task due-date as a booked job would inflate every figure
 * on the summary strip.
 */
export const isSyntheticEvent = (event: CalendarEvent): boolean =>
  event.id.startsWith('task-') ||
  event.id.startsWith('project-') ||
  event.id.startsWith('visit-');

/**
 * Does this event take up time on the day, or is it only a marker on it?
 *
 * Tasks and project start/due dates are deadlines — they say something is owed
 * that day, not that the day is spent. A site visit is booked time and counts.
 * The summary strip totals hours off this, so getting it wrong would tell an
 * electrician a free day is full.
 */
export const occupiesTime = (event: CalendarEvent): boolean =>
  !event.id.startsWith('task-') && !event.id.startsWith('project-');
