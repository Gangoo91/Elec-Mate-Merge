/**
 * What the diary needs from him this fortnight.
 *
 * Two questions, both answered from the bookings ahead:
 *
 *   "looks like a job but isn't one yet" — no job on it, not personal or a
 *   meeting, and either an address or a postcode in the title. Sean's office
 *   books in Google Calendar, so every job arrives like this; the postcode
 *   filter keeps "Cancel icertifi subscription" and the Teams call out.
 *
 *   "customer not told" — a customer on the booking and no confirmation
 *   ever emailed. 26 such bookings sat in the future across the platform when
 *   this was written.
 *
 * Its own query rather than a filter over the grid's range: the grid shows a
 * month at a time, and this asks about the next fourteen days whatever the
 * grid is showing.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';
import { postcodeIn } from './useEventJobHub';

export const DIARY_TIDY_KEY = ['diary-tidy'] as const;
const DAYS_AHEAD = 14;

export interface DiaryTidy {
  notJobs: CalendarEvent[];
  untold: CalendarEvent[];
}

const NOT_WORK = new Set(['personal', 'meeting']);

/**
 * Only bookings that arrived from Google or were typed as a job. An
 * electrician who books in the app and has never used jobs would otherwise
 * be nagged about every booking in the diary — this is for the office-books-
 * in-Google workflow and for "I called it a job and never made one".
 */
export function looksLikeAJob(e: CalendarEvent): boolean {
  if (e.project_id) return false;
  if (NOT_WORK.has(e.event_type)) return false;
  if (!e.google_event_id && e.event_type !== 'job') return false;
  // "Releaf Video Consultation" with a https:// location was flagged as a
  // job with no job (20 Sep). A link is where a call happens, not a site.
  if (VIRTUAL_TITLE.test(e.title)) return false;
  const loc = (e.location ?? '').trim();
  const realPlace = !!loc && !/^https?:\/\//i.test(loc) && !VIRTUAL_PLACE.test(loc);
  return realPlace || !!postcodeIn(e.title);
}

const VIRTUAL_TITLE = /\b(video|zoom|teams|webinar|google meet|hangout)\b/i;
const VIRTUAL_PLACE = /\b(zoom|teams|meet\.google|webex|skype)\b/i;

export function useDiaryTidy(enabled = true) {
  return useQuery({
    queryKey: DIARY_TIDY_KEY,
    enabled,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<DiaryTidy> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { notJobs: [], untold: [] };

      const from = new Date();
      const to = new Date(from.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000);
      const { data, error } = await supabase
        .from('calendar_events')
        .select(
          `
          *,
          customer:customers(id, name),
          project:spark_projects!calendar_events_project_id_fkey(id, title)
        `
        )
        .eq('user_id', user.id)
        .neq('sync_status', 'pending_delete')
        // Anchors only — a split job's other days carry the anchor's job.
        .is('parent_event_id', null)
        .gte('start_at', from.toISOString())
        .lte('start_at', to.toISOString())
        .order('start_at', { ascending: true });
      if (error) throw error;

      const events = (data ?? []) as unknown as CalendarEvent[];
      return {
        notJobs: events.filter(looksLikeAJob),
        untold: events.filter((e) => !!e.client_id && !e.confirmation_sent_at),
      };
    },
  });
}
