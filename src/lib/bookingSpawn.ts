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
import { EVENT_COLOURS, type CalendarEvent } from '@/types/calendar';

export interface SpawnResult {
  projectId?: string;
  /** The per-user reference (JOB-015) the DB trigger assigned — for the toast. */
  jobNumber?: string | null;
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
  /**
   * ELE-1755 — overrides for a job started from the event sheet. A Google
   * event's title is whatever the office typed ("ACT-050947-SC544 - PC-BB7
   * 9JT"), so the electrician gets to fix the title, pick the customer and
   * confirm the address before the job exists. Absent = take the booking's.
   */
  title?: string;
  customerId?: string | null;
  location?: string | null;
}

/**
 * A booking that has become a job should look like one on the grid.
 *
 * Google-synced events arrive as grey "general" and stayed grey after
 * getting a job, so the week view could not tell a job from a dentist's
 * appointment. Only a general booking is recoloured — an EICR booked as an
 * inspection keeps its own type. The sync's update path never touches
 * event_type or colour, so a later edit in Google will not undo this.
 */
export function jobLookFor(event: Pick<CalendarEvent, 'event_type'>) {
  return event.event_type === 'general' ? { event_type: 'job', colour: EVENT_COLOURS.job } : {};
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
        title: (options.title ?? event.title).trim() || event.title,
        description: event.description || null,
        // A chosen customer wins; "none chosen" never erases one the booking
        // already knows about.
        customer_id: options.customerId ?? event.client_id ?? null,
        location:
          options.location !== undefined
            ? options.location?.trim() || null
            : event.location || null,
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
      .select('id, job_number')
      .single();

    if (error) result.failures.push(`job (${error.message})`);
    else {
      const created = data as { id: string; job_number: string | null };
      result.projectId = created.id;
      result.jobNumber = created.job_number ?? null;
      /*
       * Link the booking BACK to the job. ELE-1755.
       *
       * Only the job knew about the booking (`calendar_event_id` above); the
       * booking never learnt about the job. Every action on the event sheet —
       * Start job, Open job, Put on hold — is gated on `project_id`, so the one
       * booking a job was created FROM was the one booking it could never be
       * started from. 74 jobs had been spawned this way by 15 users and 62 of
       * their bookings still showed no job when this was found; those were
       * backfilled on 19 Sep 2026.
       *
       * A failure here is reported, not thrown: the job exists and the booking
       * exists, and the edit sheet can still link them by hand.
       */
      // A customer chosen for the job is the booking's customer too — it is
      // what "Tell the customer" and the invoice both read.
      const customerForEvent =
        options.customerId && !event.client_id ? { client_id: options.customerId } : {};
      const { error: linkError } = await supabase
        .from('calendar_events')
        .update({
          project_id: result.projectId,
          ...customerForEvent,
          ...jobLookFor(event),
        } as never)
        .eq('id', event.id)
        .eq('user_id', user.id);
      if (linkError) result.failures.push(`link to the job (${linkError.message})`);
    }
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
