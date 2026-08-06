import { useMemo } from 'react';
import { addDays, isSameDay, max as maxDate, min as minDate, startOfDay } from 'date-fns';
import { useUpcomingEvents } from '@/hooks/useCalendarEvents';
import { useSiteVisitsForCalendar } from '@/hooks/useSiteVisitsForCalendar';
import {
  effectiveEnd,
  eventsOnDay,
  occupiesTime,
  totalHours,
} from '@/components/calendar/eventUtils';
import type { CalendarEvent } from '@/types/calendar';

/** How far ahead the strip looks. Long enough to find a free day in a busy
 *  diary, short enough to stay one cheap query. */
const HORIZON_DAYS = 30;
const WEEK_DAYS = 7;

export interface CalendarPulse {
  /** Events taking up time today. */
  todayCount: number;
  /** Hours booked across today and the next six days. */
  weekHours: number;
  /** First day from today with nothing booked on it, or null if the horizon is full. */
  nextFreeDay: Date | null;
  /** The next event still to come, today included. */
  nextEvent: CalendarEvent | null;
  loading: boolean;
}

/**
 * The state of the diary, independent of what the grid is showing.
 *
 * The summary strip has to read the same whether you are looking at this month
 * or scrolling through next March, so it cannot be computed from the events the
 * view happens to have loaded.
 *
 * Site visits are folded in because they are booked time like any other — a day
 * with a visit on it is not a free day, and a strip that said otherwise would
 * be worse than no strip at all. Tasks and project due-dates are deliberately
 * left out: they are deadlines falling on a day, not hours spent (see
 * `occupiesTime`).
 */
export function useCalendarPulse(): CalendarPulse {
  const today = startOfDay(new Date());
  const from = today.toISOString();
  const to = addDays(today, HORIZON_DAYS).toISOString();

  const { data: events = [], isLoading } = useUpcomingEvents(HORIZON_DAYS);
  const { data: visits = [], isLoading: visitsLoading } = useSiteVisitsForCalendar(from, to);

  return useMemo(() => {
    const booked = [...events, ...visits].filter(occupiesTime);

    const todayEvents = eventsOnDay(booked, today);

    // Hours are counted only for the part of an event that falls inside the
    // week. A job that started last Thursday and runs to next Friday must not
    // report all eleven of its days against the seven ahead.
    const weekEnd = addDays(today, WEEK_DAYS);
    const weekEvents = booked
      .filter((e) => new Date(e.start_at) < weekEnd && effectiveEnd(e) >= today)
      .map((e) => ({
        ...e,
        start_at: maxDate([new Date(e.start_at), today]).toISOString(),
        end_at: minDate([effectiveEnd(e), weekEnd]).toISOString(),
      }));

    let nextFreeDay: Date | null = null;
    for (let i = 0; i < HORIZON_DAYS; i++) {
      const day = addDays(today, i);
      if (eventsOnDay(booked, day).length === 0) {
        nextFreeDay = day;
        break;
      }
    }

    const now = new Date();
    const nextEvent =
      booked
        .filter((e) => new Date(e.start_at) >= now || isSameDay(new Date(e.start_at), now))
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())[0] ?? null;

    return {
      todayCount: todayEvents.length,
      weekHours: Math.round(totalHours(weekEvents)),
      nextFreeDay,
      nextEvent,
      loading: isLoading || visitsLoading,
    };
    // `today` is derived from the clock; keying on its timestamp keeps the memo
    // stable within a day instead of recomputing on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, visits, today.getTime(), isLoading, visitsLoading]);
}
