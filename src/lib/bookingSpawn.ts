/**
 * What a booking starts.
 *
 * A diary entry on its own is a note to self. "Rewire — 12 Elm Street, Tuesday"
 * is the beginning of a job with materials, photos, certificates and an invoice
 * behind it, and until now the electrician had to go and create every one of
 * those by hand from a different page, having already typed the customer, the
 * address and the date once.
 *
 * Both spawns write `calendar_event_id` back. That column is what stops the day
 * being drawn twice: `useProjectsForCalendar` and `useSiteVisitsForCalendar`
 * synthesise calendar entries out of `start_date` / `scheduled_at`, and the real
 * event is already on the grid — so those hooks skip any row that came from one.
 *
 * Failures are reported, never thrown past the caller: the booking itself is
 * saved by this point and must not be rolled back because a follow-on record
 * did not take.
 */
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

export interface SpawnResult {
  projectId?: string;
  siteVisitId?: string;
  /** Human-readable failures, for a toast. Empty when everything landed. */
  failures: string[];
}

interface SpawnOptions {
  createProject: boolean;
  createSiteVisit: boolean;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export async function spawnFromBooking(
  event: CalendarEvent,
  options: SpawnOptions
): Promise<SpawnResult> {
  const result: SpawnResult = { failures: [] };
  if (!options.createProject && !options.createSiteVisit) return result;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    result.failures.push('You are signed out.');
    return result;
  }

  const startsOn = new Date(event.start_at);
  /** `yyyy-MM-dd` in LOCAL time — `toISOString()` on a 00:30 start lands on the
   *  day before anywhere west of Greenwich. */
  const localDate = `${startsOn.getFullYear()}-${String(startsOn.getMonth() + 1).padStart(2, '0')}-${String(startsOn.getDate()).padStart(2, '0')}`;

  if (options.createProject) {
    const { data, error } = await supabase
      .from('spark_projects')
      .insert({
        user_id: user.id,
        title: event.title,
        description: event.description || null,
        customer_id: event.client_id || null,
        location: event.location || null,
        // The booked day is when the work starts. No due date is invented —
        // guessing one would put a deadline on the calendar nobody agreed to.
        start_date: localDate,
        status: 'open',
        priority: 'normal',
        /*
         * 'app', NOT 'calendar'.
         *
         * `spark_projects_source_check` allows exactly
         * whatsapp_forward | app | email | phone. Anything else is rejected by
         * the database, and because this function reports failures rather than
         * throwing, "Also create → a job" would have quietly never worked.
         * Provenance is not lost: `calendar_event_id` below says precisely
         * which booking it came from, which is more than `source` ever could.
         */
        source: 'app',
        calendar_event_id: event.id,
      } as never)
      .select('id')
      .single();

    if (error) result.failures.push(`job (${error.message})`);
    else result.projectId = (data as { id: string }).id;
  }

  if (options.createSiteVisit) {
    const { data, error } = await supabase
      .from('site_visits')
      .insert({
        user_id: user.id,
        customer_id: event.client_id || null,
        customer_name: options.customerName || null,
        customer_phone: options.customerPhone || null,
        customer_email: options.customerEmail || null,
        property_address: event.location || null,
        scheduled_at: event.start_at,
        /*
         * NOT the column default.
         *
         * `site_visits.status` defaults to 'in_progress', which on this table
         * means "captured, half-scoped, walk away and it is unfinished work".
         * A visit booked for next Thursday is none of those things, and letting
         * the default apply would add it to the Business Hub's "site visits
         * unfinished" count and hand it to the sync loop that uploads rooms
         * nobody has been in yet. 'scheduled' is added to the vocabulary in
         * SiteVisitsHubPage / SiteVisitEditPage alongside this.
         */
        status: 'scheduled',
        project_id: result.projectId || null,
        calendar_event_id: event.id,
      } as never)
      .select('id')
      .single();

    if (error) result.failures.push(`site visit (${error.message})`);
    else result.siteVisitId = (data as { id: string }).id;
  }

  return result;
}
