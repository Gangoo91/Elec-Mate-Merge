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

/**
 * The next thing that has not finished yet, in CLOCK order.
 *
 * Deliberately not `events[0]` off a `compareEvents` sort. That sort is display
 * order — all-day work first, because that is how a day is read top to bottom —
 * and taking its head as "what's next" meant an all-day job on Friday outranked
 * the callout you have in twenty minutes. Both the dashboard's "next up" and the
 * Business Hub's diary tile were doing exactly that.
 */
export function nextEventFrom(events: CalendarEvent[], from: Date = new Date()): CalendarEvent | null {
  let best: CalendarEvent | null = null;
  let bestStart = Infinity;
  for (const event of events) {
    if (effectiveEnd(event) < from) continue;
    const start = new Date(event.start_at).getTime();
    if (start < bestStart) {
      best = event;
      bestStart = start;
    }
  }
  return best;
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

/**
 * A stretch of a day at a constant level of load.
 *
 * `busy` means AT CAPACITY, not "something is on". With three jobs able to run
 * at once, an hour holding one job is still an hour you can book into, and a
 * calendar that calls it busy will lose its owner two thirds of their week.
 */
export interface DayBlock {
  kind: 'busy' | 'free';
  start: Date;
  end: Date;
  /** What is booked over it. A free block can still hold events. */
  events: CalendarEvent[];
  /** How many jobs run concurrently across this stretch. */
  running: number;
  /** How many more will fit before it is full. */
  spare: number;
}

export interface DayShape {
  /** All-day events — they colour the day rather than occupy an hour of it. */
  allDay: CalendarEvent[];
  /**
   * Deadlines landing on the day: task due times and project start/due dates.
   * They say something is owed, not that the time is spent, so they are listed
   * apart from the rail rather than blocking a slot (see `occupiesTime`).
   */
  markers: CalendarEvent[];
  /** Booked before the working day opens. */
  before: CalendarEvent[];
  /** The working day itself, busy and free in chronological order. */
  blocks: DayBlock[];
  /** Booked after the working day closes. */
  after: CalendarEvent[];
  /**
   * Wall-clock minutes with room for another job.
   *
   * Answers "when could I fit them in", which is the question asked on the
   * phone. NOT the same as spare capacity: on a day able to run three jobs at
   * once, an hour already holding two of them is still wall-clock free.
   */
  freeMinutes: number;
  /**
   * Spare LANE minutes — capacity that goes unsold if nothing else lands.
   *
   * A different question with a much bigger answer: an empty day at capacity
   * three has ten hours free and thirty lane-hours spare. Kept separate because
   * showing one and labelling it the other is how a diary starts lying.
   */
  spareLaneMinutes: number;
  /** Wall-clock minutes inside the working day that are at capacity. */
  busyMinutes: number;
  /** The most jobs running at once at any point in the day. */
  peakRunning: number;
  /** Jobs that can run at once — echoed back so callers can phrase it. */
  capacity: number;
}

/**
 * The shape of one day: what is booked, and — the part that matters when
 * someone rings asking for a slot — exactly where the gaps are.
 *
 * Built by walking the working day in `stepMinutes` and asking whether anything
 * occupies each step, then collapsing the run into blocks. A walk rather than an
 * interval merge because overlapping and back-to-back bookings both have to
 * collapse into one busy stretch, and the walk gets that for free.
 *
 * All-day events do NOT black out the rail. An electrician with an all-day job
 * on Tuesday can still take a 20-minute call at four o'clock, and a day sheet
 * that refuses to offer one is a day sheet they will stop opening. The all-day
 * event is stated at the top instead, and the clash warning on the event sheet
 * is what catches a genuine double-booking.
 */
export function buildDayShape(
  events: CalendarEvent[],
  day: Date,
  workStart: number,
  workEnd: number,
  stepMinutes = 30,
  capacity = 1
): DayShape {
  const onDay = eventsOnDay(events, day);

  /*
   * Split on what a thing IS, not on its all_day flag.
   *
   * `useTasksForCalendar` and `useProjectsForCalendar` both mint their events
   * with `all_day: true` — a due date has no hour to it. Filtering markers as
   * "not all_day and not occupying time" therefore matched nothing at all, and
   * every task deadline and project start date came out in the all-day banner
   * labelled "All day", which says the day is spoken for when it is not.
   */
  const markers = onDay.filter((e) => !occupiesTime(e));
  const allDay = onDay.filter((e) => e.all_day && occupiesTime(e));
  const timed = onDay.filter((e) => !e.all_day && occupiesTime(e));

  const windowStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), workStart, 0, 0);
  const windowEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), workEnd, 0, 0);

  // Clamped to the day first — a job running Mon–Wed occupies all of Tuesday,
  // and its raw start_at is on Monday.
  const spans = timed.map((event) => ({ event, ...clampToDay(event, day) }));

  const before = spans.filter((s) => s.end <= windowStart).map((s) => s.event);
  const after = spans.filter((s) => s.start >= windowEnd).map((s) => s.event);

  const seats = Math.max(1, Math.floor(capacity));
  const stepMs = stepMinutes * 60_000;
  const blocks: DayBlock[] = [];

  for (let t = windowStart.getTime(); t < windowEnd.getTime(); t += stepMs) {
    const stepStart = t;
    const stepEnd = Math.min(t + stepMs, windowEnd.getTime());
    const over = spans.filter(
      (s) => s.start.getTime() < stepEnd && s.end.getTime() > stepStart
    );
    const running = over.length;
    const kind: DayBlock['kind'] = running >= seats ? 'busy' : 'free';
    const last = blocks[blocks.length - 1];

    /*
     * Grouped by load, not just by kind.
     *
     * "09:00–11:00 free" and "11:00–12:00, one job on, one slot left" are
     * different offers and the person on the phone is being told which one they
     * can have. Merging them into one green stretch would hide the fact that
     * half of it is already spoken for.
     */
    if (last && last.kind === kind && last.running === running) {
      last.end = new Date(stepEnd);
      over.forEach((s) => {
        if (!last.events.includes(s.event)) last.events.push(s.event);
      });
    } else {
      blocks.push({
        kind,
        start: new Date(stepStart),
        end: new Date(stepEnd),
        events: over.map((s) => s.event),
        running,
        spare: Math.max(0, seats - running),
      });
    }
  }

  const minutesIn = (kind: DayBlock['kind']) =>
    blocks
      .filter((b) => b.kind === kind)
      .reduce((sum, b) => sum + (b.end.getTime() - b.start.getTime()) / 60_000, 0);

  return {
    allDay,
    markers,
    before,
    blocks,
    after,
    freeMinutes: minutesIn('free'),
    spareLaneMinutes: blocks.reduce(
      (sum, b) => sum + (b.spare * (b.end.getTime() - b.start.getTime())) / 60_000,
      0
    ),
    busyMinutes: minutesIn('busy'),
    peakRunning: blocks.reduce((peak, b) => Math.max(peak, b.running), 0),
    capacity: seats,
  };
}

/**
 * The start times on offer inside a free block.
 *
 * Capped, because a nine-hour empty Monday would otherwise render eighteen
 * chips and bury the rest of the day underneath them. Tapping the block itself
 * always books at its start, so the chips are a shortcut rather than the only
 * way in.
 */
export function slotStarts(block: DayBlock, stepMinutes = 30, limit = 8): Date[] {
  const out: Date[] = [];
  const stepMs = stepMinutes * 60_000;
  for (let t = block.start.getTime(); t < block.end.getTime() && out.length < limit; t += stepMs) {
    out.push(new Date(t));
  }
  return out;
}

/**
 * `count` working days from `start`, inclusive of the start day.
 *
 * Weekends skipped: "book the week out" means Monday to Friday, and an all-day
 * event stretched over the Sunday says the job is on when nobody is on site.
 * A booking that starts on a Saturday keeps its Saturday — the electrician has
 * evidently chosen to work it — and counts forward from there.
 */
export function addWorkingDays(start: Date, count: number): Date {
  const out = new Date(start);
  let remaining = Math.max(1, Math.floor(count)) - 1;
  while (remaining > 0) {
    out.setDate(out.getDate() + 1);
    const day = out.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return out;
}

/** "3h", "45m", "2h 30m" — durations as an electrician would say them. */
export function humanMinutes(minutes: number): string {
  const m = Math.max(0, Math.round(minutes));
  const hours = Math.floor(m / 60);
  const rest = m % 60;
  if (hours === 0) return `${rest}m`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}m`;
}
