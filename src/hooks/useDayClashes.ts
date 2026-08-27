import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

/**
 * What is already booked over a stretch of time, so a new event can say what it
 * runs alongside before it is saved rather than after.
 *
 * Overlap is no longer an error in itself — someone with people working for
 * them runs three or four jobs at once, and the event sheet counts these
 * against their `jobsAtOnce` setting rather than crying "clash" at every one.
 * The mistake worth preventing is the booking that takes them past what they
 * can cover, and that cannot be spotted without knowing what is already on.
 *
 * A RANGE, not a day. It used to take a single date and switch itself off
 * entirely for all-day events — which was survivable while everything was an
 * appointment, and became a hole the moment "Book out 2 weeks" existed: a
 * fortnight could be blocked out over six already-booked jobs and nothing
 * anywhere would mention them.
 */
export function useDayClashes(from: Date | null, to?: Date | null, enabled = true) {
  const fromIso = from ? startOfDay(from).toISOString() : '';
  // A single date behaves exactly as before — the range collapses to that day.
  const toIso = from ? endOfDay(to ?? from).toISOString() : '';

  return useQuery({
    queryKey: ['calendar-day-clashes', fromIso, toIso],
    enabled: enabled && !!from,
    staleTime: 15_000,
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('calendar_events')
        // `crew` so the sheet can say WHO the overlapping job is on. Without a
        // name, "runs alongside 2 other jobs" gives no way to judge whether
        // there is genuinely a spare pair of hands.
        .select('id, title, start_at, end_at, all_day, colour, crew')
        .eq('user_id', user.id)
        .lte('start_at', toIso)
        .gte('end_at', fromIso)
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as CalendarEvent[];
    },
  });
}
