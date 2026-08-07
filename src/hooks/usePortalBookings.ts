import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PortalBooking {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  location: string | null;
  description: string | null;
  created_at: string;
  client: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
  } | null;
}

/**
 * Bookings that arrived through the public booking link.
 *
 * There is no `source` column on `calendar_events`, so the marker is the note
 * the edge function writes on every portal booking — `'Booked via portal'`, or
 * `'Booked via portal\n\n<job description>'` when the client described the job.
 * Both start with `Booked via`, and nothing else in the app writes that prefix.
 *
 * Matching on the note rather than the `Booking: ` title prefix is deliberate:
 * a title is editable from the calendar, so an electrician who renames a
 * booking to the job name would drop it off this page. The note is not exposed
 * for editing anywhere.
 */
export function usePortalBookings() {
  return useQuery({
    queryKey: ['portal-bookings'],
    staleTime: 30_000,
    queryFn: async (): Promise<PortalBooking[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('calendar_events')
        .select(
          'id, title, start_at, end_at, location, description, created_at, client:customers(id, name, phone, email)'
        )
        .eq('user_id', user.id)
        .like('notes', 'Booked via%')
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as unknown as PortalBooking[];
    },
  });
}

/** Split into what is still to come and what has already happened. */
export function splitBookings(bookings: PortalBooking[]) {
  const now = Date.now();
  const upcoming: PortalBooking[] = [];
  const past: PortalBooking[] = [];

  for (const b of bookings) {
    // Judged on the END of the slot — a job that started an hour ago is still
    // today's work, not history.
    if (new Date(b.end_at).getTime() >= now) upcoming.push(b);
    else past.push(b);
  }

  // Most recent first for the past, soonest first for what is coming.
  past.reverse();
  return { upcoming, past };
}
