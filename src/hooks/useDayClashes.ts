import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

/**
 * What is already booked on a day, so a new event can say it clashes before it
 * is saved rather than after.
 *
 * Double-booking is the one mistake a diary exists to prevent, and until now
 * nothing stopped it: the create sheet knew the date the user had picked and
 * nothing at all about what was already on it. `BookJobSheet` had worked this
 * out for its own flow — this is the same idea where every event is made.
 */
export function useDayClashes(date: Date | null, enabled = true) {
  const from = date ? startOfDay(date).toISOString() : '';
  const to = date ? endOfDay(date).toISOString() : '';

  return useQuery({
    queryKey: ['calendar-day-clashes', from],
    enabled: enabled && !!date,
    staleTime: 15_000,
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('calendar_events')
        .select('id, title, start_at, end_at, all_day, colour')
        .eq('user_id', user.id)
        .lte('start_at', to)
        .gte('end_at', from)
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as CalendarEvent[];
    },
  });
}
