/**
 * Drive time between consecutive bookings.
 *
 * The postcode is on most bookings. A grey sliver between two blocks saying
 * "40 min" stops a 13:00 in Bolton being booked after a 12:00 in Preston.
 *
 * Asks the `google-travel-time` function (server key, Distance Matrix) for
 * each leg and caches the answer per origin→destination pair for a day, so
 * paging through the week does not re-bill the same legs and a phone never
 * downloads the Maps script to draw a chip.
 */
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';
import { clampToDay, eventsOnDay, isSyntheticEvent, occupiesTime } from './eventUtils';

export interface TravelLeg {
  /** The booking this leg arrives at. */
  toEventId: string;
  fromEventId: string;
  origin: string;
  destination: string;
  /** Minutes of free time between the two bookings. */
  gapMinutes: number;
}

export interface TravelEstimate {
  minutes: number;
  text: string;
}

/** Somewhere a van can drive to — not a link, and not a video call. */
const isPlace = (s?: string | null) =>
  !!s &&
  s.trim().length > 3 &&
  !/^https?:\/\//i.test(s) &&
  !/\b(teams|zoom|meet\.google|google meet|webex|skype|video call|phone call)\b/i.test(s);

/** The legs on a day: each timed booking with an address, to the next one. */
export function travelLegs(events: CalendarEvent[], day: Date): TravelLeg[] {
  // THIS day's bookings only. Without the day filter, Wednesday's meeting was
  // clamped onto Friday and became Friday's first "leg".
  const timed = eventsOnDay(events, day)
    .filter((e) => !isSyntheticEvent(e) && occupiesTime(e) && !e.all_day && isPlace(e.location))
    .map((e) => ({ e, ...clampToDay(e, day) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const legs: TravelLeg[] = [];
  for (let i = 1; i < timed.length; i++) {
    const prev = timed[i - 1];
    const next = timed[i];
    if (prev.e.location!.trim().toLowerCase() === next.e.location!.trim().toLowerCase()) continue;
    legs.push({
      toEventId: next.e.id,
      fromEventId: prev.e.id,
      origin: prev.e.location!.trim(),
      destination: next.e.location!.trim(),
      gapMinutes: Math.round((next.start.getTime() - prev.end.getTime()) / 60_000),
    });
  }
  return legs;
}

async function driveMinutes(origin: string, destination: string): Promise<TravelEstimate> {
  const { data, error } = await supabase.functions.invoke('google-travel-time', {
    body: { origin, destination },
  });
  const payload = data as { minutes?: number; text?: string; error?: string } | null;
  if (error || !payload || typeof payload.minutes !== 'number') {
    throw new Error(payload?.error || error?.message || 'No estimate');
  }
  return { minutes: payload.minutes, text: payload.text || `${payload.minutes} min` };
}

/**
 * Estimates for every leg on a day, keyed by the booking the leg arrives at.
 * Absent while loading or when the service is unavailable — the rail draws
 * nothing rather than "unknown".
 */
export function useTravelTimes(events: CalendarEvent[], day: Date, enabled = true) {
  const legs = useMemo(() => travelLegs(events, day), [events, day]);

  const results = useQueries({
    queries: legs.map((leg) => ({
      queryKey: ['travel-time', leg.origin.toLowerCase(), leg.destination.toLowerCase()],
      enabled,
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      // A denied or unknown address will not fix itself by asking again.
      retry: false,
      queryFn: () => driveMinutes(leg.origin, leg.destination),
    })),
  });

  return useMemo(() => {
    const byEvent = new Map<string, TravelLeg & TravelEstimate>();
    legs.forEach((leg, i) => {
      const r = results[i];
      if (r?.data) byEvent.set(leg.toEventId, { ...leg, ...r.data });
    });
    return byEvent;
  }, [legs, results]);
}
