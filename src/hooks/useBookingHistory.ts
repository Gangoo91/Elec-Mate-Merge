/**
 * What you actually book, learned from what you have booked.
 *
 * Two frictions, one query.
 *
 * The form would not let you save without typing a title, and an electrician
 * books the same eight things over and over — EICR, consumer unit change,
 * fault find, quote visit. Typing "EICR" for the four hundredth time is the
 * app making you tell it something it already knows.
 *
 * And every new booking defaulted to an hour regardless. If your EICRs are
 * always three hours, defaulting to one means every single one gets corrected
 * by hand, and the ones that do not get corrected quietly make the diary wrong.
 *
 * Nothing is inferred from anyone else's data — this is only ever the caller's
 * own history, so it is right for them from the fourth or fifth booking and
 * silent before that.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEventType } from '@/types/calendar';

export interface BookingSuggestion {
  title: string;
  /** How often it has been booked — drives the order. */
  count: number;
  /** Typical length in minutes, or null for all-day work. */
  minutes: number | null;
  /** The type most often used with it, so the chip sets that too. */
  eventType: CalendarEventType | null;
}

/** How far back to learn from. A year covers the annual jobs. */
const LOOKBACK_DAYS = 365;
/** Enough to cover what someone genuinely repeats, without becoming a list. */
const MAX_SUGGESTIONS = 8;

interface Row {
  title: string | null;
  start_at: string;
  end_at: string;
  all_day: boolean | null;
  event_type: string | null;
}

/**
 * The middle value, not the mean.
 *
 * One rewire logged as a fortnight would drag the average for "rewire" into
 * nonsense; the median ignores it. With an even count this takes the lower of
 * the two middles, which errs toward the shorter booking — easier to extend a
 * job than to explain why you are still there at seven.
 */
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor((sorted.length - 1) / 2)];
}

export function useBookingHistory(enabled = true) {
  return useQuery({
    queryKey: ['booking-history'],
    enabled,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<BookingSuggestion[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const since = new Date();
      since.setDate(since.getDate() - LOOKBACK_DAYS);

      const { data, error } = await supabase
        .from('calendar_events')
        .select('title, start_at, end_at, all_day, event_type')
        .eq('user_id', user.id)
        .gte('start_at', since.toISOString())
        .order('start_at', { ascending: false })
        .limit(500);

      if (error) throw error;

      const buckets = new Map<
        string,
        { title: string; durations: number[]; allDay: number; types: Map<string, number> }
      >();

      for (const row of (data ?? []) as Row[]) {
        const title = (row.title ?? '').trim();
        if (!title) continue;
        /*
         * Bookings named after the customer are not a kind of work.
         *
         * The booking portal writes "Booking: John Smith" on every slot a
         * client takes, and on a busy diary those would otherwise be the most
         * frequent "titles" by a mile — filling the suggestion row with the
         * names of people you have already been to see.
         */
        if (/^booking:/i.test(title)) continue;

        const key = title.toLowerCase();
        const bucket = buckets.get(key) ?? {
          title,
          durations: [],
          allDay: 0,
          types: new Map<string, number>(),
        };

        if (row.all_day) {
          bucket.allDay += 1;
        } else {
          const mins = (new Date(row.end_at).getTime() - new Date(row.start_at).getTime()) / 60_000;
          // Anything beyond a working day is a mis-entry or a job that should
          // have been all-day; either way it must not set the default.
          if (mins > 0 && mins <= 12 * 60) bucket.durations.push(Math.round(mins));
        }

        if (row.event_type) {
          bucket.types.set(row.event_type, (bucket.types.get(row.event_type) ?? 0) + 1);
        }
        buckets.set(key, bucket);
      }

      return [...buckets.values()]
        .map((b) => {
          const count = b.durations.length + b.allDay;
          const commonest = [...b.types.entries()].sort((x, y) => y[1] - x[1])[0]?.[0];
          return {
            title: b.title,
            count,
            // All-day wins only when it is genuinely the usual shape of the job.
            minutes:
              b.allDay > b.durations.length
                ? null
                : b.durations.length > 0
                  ? median(b.durations)
                  : null,
            eventType: (commonest as CalendarEventType) ?? null,
          };
        })
        // Once is not a habit. Suggesting a one-off makes the row noise.
        .filter((s) => s.count >= 2)
        .sort((a, b) => b.count - a.count)
        .slice(0, MAX_SUGGESTIONS);
    },
  });
}
