import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

interface SiteVisitRow {
  id: string;
  scheduled_at: string;
  property_address: string | null;
  customer_name: string | null;
}

/** Distinct site-visit colour — teal, visually separate from project indigo
 *  and task purple. */
const SITE_VISIT_COLOUR = '#14B8A6';

/**
 * Lightweight hook: fetches booked site visits with a scheduled_at in a given
 * range and converts them to CalendarEvent objects for display on the calendar.
 *
 * A visit only appears once it's been given a scheduled date/time on the Job
 * step — unbooked visits carry a null scheduled_at and stay off the calendar.
 * Events mirror the exact shape of useTasksForCalendar / useProjectsForCalendar
 * so they slot straight into the Month/Week/Day views + agenda with no changes.
 */
export function useSiteVisitsForCalendar(dateFrom: string, dateTo: string) {
  return useQuery({
    queryKey: ['site-visits-for-calendar', dateFrom, dateTo],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('site_visits')
        .select('id, scheduled_at, property_address, customer_name')
        .eq('user_id', user.id)
        .not('scheduled_at', 'is', null)
        .gte('scheduled_at', dateFrom)
        .lte('scheduled_at', dateTo);

      if (error) throw error;

      return (data || []).map((visit: SiteVisitRow): CalendarEvent => {
        const label = visit.property_address || visit.customer_name || 'Site visit';
        return {
          id: `visit-${visit.id}`,
          user_id: user.id,
          title: `Visit: ${label}`,
          description: visit.customer_name ? `Site visit for ${visit.customer_name}` : undefined,
          start_at: visit.scheduled_at,
          end_at: visit.scheduled_at,
          all_day: false,
          location: visit.property_address || undefined,
          event_type: 'site_visit',
          colour: SITE_VISIT_COLOUR,
          recurring: false,
          sync_status: 'local_only',
          reminder_minutes: 0,
          created_at: visit.scheduled_at,
          updated_at: visit.scheduled_at,
          job_id: visit.id,
        };
      });
    },
  });
}
