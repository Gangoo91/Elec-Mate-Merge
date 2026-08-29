/**
 * Public Booking Portal — "Calendly for Sparkies"
 *
 * GET  ?electrician_id=<uuid>&days=14 → available slots + electrician info
 * POST { electrician_id, date, start_time, client_name, client_phone, client_email?, job_description?, client_address? }
 *      → creates calendar event + upserts customer + creates task + logs action
 *
 * No auth required — this is a public endpoint for clients to book appointments.
 * Uses service_role key for all DB operations.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildBookingConfirmationEmail } from '../_shared/email-templates/booking-confirmation.ts';
import { buildBookingIcs, bookingIcsFilename } from '../_shared/booking-ics.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SLOT_DURATION_MINUTES = 60;

// Fallback working hours when the electrician hasn't set their schedule
// preferences yet. Matches the column DEFAULT on profiles.scheduling_working_hours.
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
type DayKey = (typeof DAY_KEYS)[number];
type DayWindow = { start: string; end: string } | null;
type WorkingHours = Record<DayKey, DayWindow>;

const DEFAULT_WORKING_HOURS: WorkingHours = {
  sun: null,
  mon: { start: '08:00', end: '18:00' },
  tue: { start: '08:00', end: '18:00' },
  wed: { start: '08:00', end: '18:00' },
  thu: { start: '08:00', end: '18:00' },
  fri: { start: '08:00', end: '18:00' },
  sat: null,
};

const DEFAULT_MIN_NOTICE_HOURS = 24;
const DEFAULT_BUFFER_MINUTES = 30;
const DEFAULT_MAX_BOOKINGS_PER_DAY = 4;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    if (req.method === 'GET') {
      return await handleGetSlots(req, supabase);
    }
    if (req.method === 'POST') {
      return await handleBookSlot(req, supabase);
    }
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, {
      functionName: 'public-booking',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('public-booking error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Minutes Europe/London is ahead of UTC at a given instant. 0 in winter,
 * 60 during BST.
 */
function ukOffsetMinutes(utcMs: number): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(new Date(utcMs))
      .filter((p) => p.type !== 'literal')
      .map((p) => [p.type, p.value])
  );
  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour === '24' ? '0' : parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return (asIfUtc - utcMs) / 60000;
}

/**
 * The true instant of a UK wall-clock time — `('2026-08-31', '09:00')` is
 * 08:00Z in summer, 09:00Z in winter.
 *
 * This is the seam the whole function used to get wrong: working hours and
 * booked times were built as `T09:00:00Z`, UK wall clock STORED AS UTC, while
 * the internal app writes true instants and renders them in local time. The
 * two conventions agree all winter and drift an hour apart every BST — a
 * portal "09:00" showed as 10:00 in the diary, the customer's .ics said
 * 10:00, and the availability grid compared real events against a grid that
 * was an hour out, leaving the electrician's genuinely busy hour bookable.
 */
function ukWallToInstant(dateStr: string, hhmm: string): number {
  const naive = Date.parse(`${dateStr}T${hhmm}:00Z`);
  return naive - ukOffsetMinutes(naive) * 60000;
}

/** UK wall-clock hour:minute of a true instant — the label a customer reads. */
function formatHHMM(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(date)
    .replace(/^24/, '00');
}

async function handleGetSlots(req: Request, supabase: ReturnType<typeof createClient>) {
  const url = new URL(req.url);
  const electricianId = url.searchParams.get('electrician_id');
  const days = Math.min(parseInt(url.searchParams.get('days') || '14', 10), 56);

  /*
   * How long a booking the visitor wants. A fixed vocabulary, never raw
   * minutes — the client is a public page and must not name its own duration.
   *   slot     — the electrician's configured slot length (default 60)
   *   half_day — four hours
   *   full_day — the whole working window for that day
   */
  const durationParam = url.searchParams.get('duration');
  const durationKind: 'slot' | 'half_day' | 'full_day' =
    durationParam === 'half_day' || durationParam === 'full_day' ? durationParam : 'slot';

  if (!electricianId) {
    return new Response(JSON.stringify({ error: 'electrician_id is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate UUID format
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(electricianId)) {
    return new Response(JSON.stringify({ error: 'Invalid electrician ID' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Fetch electrician profile + scheduling preferences (working hours,
  // buffer, daily cap, min notice, blackouts) — set on profiles via the
  // ELE-955 migration. Falls back to sensible defaults if unset.
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(
      'full_name, scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates, scheduling_slot_minutes, scheduling_jobs_at_once'
    )
    .eq('id', electricianId)
    .single();

  if (profileError || !profile) {
    return new Response(JSON.stringify({ error: 'Electrician not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workingHours: WorkingHours = {
    ...DEFAULT_WORKING_HOURS,
    ...((profile.scheduling_working_hours as Partial<WorkingHours>) || {}),
  };
  const bufferMinutes: number = Number(profile.scheduling_buffer_minutes) || DEFAULT_BUFFER_MINUTES;
  const maxBookingsPerDay: number =
    Number(profile.scheduling_max_bookings_per_day) || DEFAULT_MAX_BOOKINGS_PER_DAY;
  const minNoticeHours: number =
    Number(profile.scheduling_min_notice_hours) || DEFAULT_MIN_NOTICE_HOURS;
  const blackoutDates =
    (profile.scheduling_blackout_dates as Array<{
      start?: string;
      end?: string;
    }>) || [];
  /*
   * Slot length.
   *
   * Was the module constant SLOT_DURATION_MINUTES, which fixed every booking
   * at an hour — on the public booking page AND on the post-acceptance quote
   * slot picker, since ELE-955 routed both through this function. Guarded
   * against a bad value so a null or a zero can never produce a zero-length
   * slot and an infinite walk below.
   */
  const slotMinutes: number =
    Number(profile.scheduling_slot_minutes) > 0
      ? Number(profile.scheduling_slot_minutes)
      : SLOT_DURATION_MINUTES;

  /*
   * How many jobs can run at once — the capacity model the internal diary has
   * used since the day-sheet rebuild, now honoured publicly. A slot is busy
   * only when the concurrent count reaches capacity; for a firm running three
   * vans, "any overlap blocks" was throwing away two thirds of their bookable
   * time. Clamped exactly as the client clamps it.
   */
  const capacity: number = Math.min(
    10,
    Math.max(1, Number(profile.scheduling_jobs_at_once) || 1)
  );

  // company_profiles is keyed by user_id, not id (long-standing bug
  // returning null here — preserved profile lookup above is what
  // actually drives the response).
  const { data: companyProfile } = await supabase
    .from('company_profiles')
    .select('company_name, logo_url, logo_data_url, primary_color')
    .eq('user_id', electricianId)
    .maybeSingle();

  // Compute date range (UK dates — we work in UTC as a proxy since all our times are UK)
  const now = new Date();
  const dateFrom = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dateTo = new Date(dateFrom.getTime() + days * 24 * 60 * 60 * 1000);

  /*
   * Existing diary entries, by OVERLAP with the window rather than by start.
   *
   * `.gte('start_at', dateFrom)` missed anything that began earlier and runs
   * into the range — which for an all-day job is the common case, because an
   * all-day event is stored from 23:00 UTC the previous evening (UK midnight
   * during BST). A two-day booking starting yesterday occupies today and was
   * invisible here.
   *
   * `all_day` is selected because the slot walker has to treat those events
   * differently: they block the whole working day, not a gap in it.
   */
  const { data: events } = await supabase
    .from('calendar_events')
    .select('start_at, end_at, all_day')
    .eq('user_id', electricianId)
    .lte('start_at', dateTo.toISOString())
    .gte('end_at', dateFrom.toISOString())
    .order('start_at', { ascending: true });

  /*
   * Booked site visits are diary time too.
   *
   * The internal calendar has merged them in since the diary rebuild
   * (useSiteVisitsForCalendar), but this walker only ever saw
   * `calendar_events` — so a customer could book straight over a visit the
   * electrician was already committed to. Same shape as the client: an hour
   * long (site_visits has no duration column), and rows spawned FROM a
   * booking are skipped because their calendar event is already in the set.
   */
  const { data: visitRows } = await supabase
    .from('site_visits')
    .select('scheduled_at')
    .eq('user_id', electricianId)
    .is('calendar_event_id', null)
    .not('scheduled_at', 'is', null)
    .gte('scheduled_at', new Date(dateFrom.getTime() - 24 * 3600 * 1000).toISOString())
    .lte('scheduled_at', dateTo.toISOString());

  const visitEvents = (visitRows || []).map((v) => {
    const start = new Date(v.scheduled_at as string);
    return {
      start_at: start.toISOString(),
      end_at: new Date(start.getTime() + 60 * 60 * 1000).toISOString(),
      all_day: false,
    };
  });

  const busyEvents = [...(events || []), ...visitEvents];

  // Find available slots using the electrician's working hours.
  // Skips: days with no window set (closed days), past times, days
  // already at their daily booking cap, and any blackout windows.
  const slots: Array<{ date: string; start: string; end: string }> = [];
  const durationMs = slotMinutes * 60 * 1000;
  const bufferMs = bufferMinutes * 60 * 1000;
  const minNoticeMs = minNoticeHours * 60 * 60 * 1000;

  /**
   * The next point on the slot grid at or after `ms`.
   *
   * `anchorMs` is the day's opening time, so slots always line up with when
   * the electrician actually starts rather than with midnight.
   */
  const alignUp = (ms: number, anchorMs: number, stepMs: number): number => {
    if (ms <= anchorMs) return anchorMs;
    return anchorMs + Math.ceil((ms - anchorMs) / stepMs) * stepMs;
  };

  /** The instant UK-local midnight begins on `dateStr`. */
  const ukDayStartMs = (dateStr: string): number => ukWallToInstant(dateStr, '00:00');

  /**
   * The events occupying a given UK calendar date.
   *
   * Was `start_at.startsWith(dateStr)`, a string comparison against a UTC
   * timestamp. All-day events are stored from 23:00 UTC the previous evening
   * (UK midnight in BST), so that test filed every one of them under the day
   * BEFORE the day it blocks, and saw only the first day of a multi-day job.
   * A real example from the diary: a booking covering 26-27 August is stored
   * as `2026-08-25T23:00:00Z`, so it was counted against the 25th and neither
   * of the days it actually occupies.
   *
   * Half-open interval overlap: an event ending exactly at midnight does not
   * occupy the next day.
   */
  const eventsOnDate = (dateStr: string) => {
    const dayStart = ukDayStartMs(dateStr);
    const dayEnd = ukDayStartMs(
      new Date(Date.parse(`${dateStr}T00:00:00Z`) + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    );
    return busyEvents.filter((e) => {
      const start = new Date(e.start_at as string).getTime();
      const end = new Date(e.end_at as string).getTime();
      return start < dayEnd && end > dayStart;
    });
  };

  const isBlackedOut = (dateStr: string): boolean => {
    if (!Array.isArray(blackoutDates) || blackoutDates.length === 0) return false;
    return blackoutDates.some((b) => {
      if (!b?.start) return false;
      const start = b.start.slice(0, 10);
      const end = (b.end || b.start).slice(0, 10);
      return dateStr >= start && dateStr <= end;
    });
  };

  for (let d = new Date(dateFrom); d < dateTo; d.setUTCDate(d.getUTCDate() + 1)) {
    const day = d.getUTCDay();
    const dayKey = DAY_KEYS[day];
    const window = workingHours[dayKey];
    if (!window) continue; // Day closed in working hours

    const dateStr = d.toISOString().split('T')[0];
    if (isBlackedOut(dateStr)) continue;

    // Working window for the day — true instants, so real diary events land
    // on the grid positions a customer sees, in BST and out of it.
    const dayStartMs = ukWallToInstant(dateStr, window.start);
    const dayEndMs = ukWallToInstant(dateStr, window.end);

    // Apply min-notice for today (or future days within notice window)
    const earliestBookable = now.getTime() + minNoticeMs;
    const effectiveStart = Math.max(dayStartMs, earliestBookable);
    // If even the day end is before the notice cutoff, skip the day
    if (effectiveStart >= dayEndMs) continue;

    /*
     * The day's occupations, ready for counting.
     *
     * Timed events are padded by the travel buffer on either side. An all-day
     * event occupies one LANE for the whole window — it used to strike the
     * entire day from the list, which is only correct at capacity one. With
     * three vans, one all-day job leaves two lanes bookable; at capacity one
     * the count test below reproduces the old behaviour exactly.
     */
    const occupations = eventsOnDate(dateStr)
      .map((e) =>
        e.all_day === true
          ? { start: dayStartMs, end: dayEndMs }
          : {
              start: new Date(e.start_at as string).getTime() - bufferMs,
              end: new Date(e.end_at as string).getTime() + bufferMs,
            }
      )
      .sort((a, b) => a.start - b.start);

    // Daily booking cap — if the day already has the max number of
    // calendar events, surface zero slots for it.
    if (eventsOnDate(dateStr).length >= maxBookingsPerDay) continue;

    /*
     * The length being offered on THIS day. `full_day` is the whole working
     * window, so it varies with the day's hours; the others are fixed.
     */
    const dayDurationMs =
      durationKind === 'full_day'
        ? dayEndMs - dayStartMs
        : durationKind === 'half_day'
          ? 4 * 60 * 60 * 1000
          : durationMs;

    // A full day is only honest if the notice period hasn't already eaten
    // into the morning.
    if (durationKind === 'full_day' && effectiveStart > dayStartMs) continue;

    /*
     * Grid scan, not gap walk. The old walker filled gaps between events,
     * which is inherently one-lane logic — the moment two jobs may run at
     * once, "the gap between events" stops being the question. Instead, every
     * grid-aligned start is tested: how many occupations overlap this span?
     * Fewer than capacity → bookable.
     */
    const daySlots: Array<{ date: string; start: string; end: string }> = [];
    let cursor = alignUp(effectiveStart, dayStartMs, dayDurationMs);
    while (cursor + dayDurationMs <= dayEndMs) {
      const slotEnd = cursor + dayDurationMs;
      let concurrent = 0;
      for (const occ of occupations) {
        if (occ.start < slotEnd && occ.end > cursor) concurrent++;
      }
      if (concurrent < capacity) {
        daySlots.push({
          date: dateStr,
          start: formatHHMM(new Date(cursor)),
          end: formatHHMM(new Date(slotEnd)),
        });
      }
      cursor += dayDurationMs;
    }

    slots.push(...daySlots);
  }

  /*
   * Days a client may ask to START on.
   *
   * This is a looser test than the slot walker: the quote-acceptance flow asks
   * for a start DATE rather than an hour, so a day with a couple of hours
   * already booked is still a fair day to begin a multi-week job on. The
   * electrician confirms either way.
   *
   * But it previously ignored the diary ENTIRELY, by design — and that is the
   * bug Dan reported. A day he has already committed to a full-day job is not
   * a day a customer can start on, and offering it invites a double booking
   * that only surfaces when someone turns up. A full-day job, and a day
   * already at the daily cap, now come out of the list.
   */
  const openDates: string[] = [];
  for (let d = new Date(dateFrom); d < dateTo; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (!workingHours[DAY_KEYS[d.getUTCDay()]]) continue;
    if (isBlackedOut(dateStr)) continue;
    // All-day jobs close the day only once they use every lane.
    if (eventsOnDate(dateStr).filter((e) => e.all_day === true).length >= capacity) continue;
    /*
     * Deliberately NOT excluding days that are merely at the daily slot cap.
     *
     * The cap governs how many one-hour appointments fit in a day; this list
     * is about which day a job may BEGIN on, which is a different question —
     * a morning already holding two callouts is still a fair Monday to start
     * a rewire. Only a full-day commitment genuinely takes the day off the
     * table, and that is what was reported.
     */
    // Respect the same notice period the slot walker applies.
    if (ukWallToInstant(dateStr, '23:59') < now.getTime() + minNoticeMs) continue;
    openDates.push(dateStr);
  }

  return new Response(
    JSON.stringify({
      electrician: {
        name: profile.full_name || 'Electrician',
        company: companyProfile?.company_name || null,
      },
      slots,
      open_dates: openDates,
      slot_minutes: slotMinutes,
      duration: durationKind,
      capacity,
      // The page wears the electrician's brand, not ours — same rule as every
      // client-facing email.
      branding: {
        logo_url:
          (companyProfile?.logo_url as string) ||
          (companyProfile?.logo_data_url as string) ||
          null,
        primary_color: (companyProfile?.primary_color as string) || null,
      },
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * A client asking to start the work on a given date.
 *
 * ELE-1513. Deliberately NOT a booking: no calendar event is written and
 * nothing is reserved, because the client cannot know how long the job takes
 * and neither, reliably, can we — 63% of accepted quotes carry no hour-priced
 * labour at all, and where hours exist they are a cost measure rather than
 * elapsed time. The electrician confirms, and that confirmation is what puts
 * anything in the diary.
 */
async function handleStartDateRequest(
  // deno-lint-ignore no-explicit-any
  body: any,
  supabase: ReturnType<typeof createClient>
) {
  const {
    electrician_id,
    quote_id,
    requested_date,
    time_preference,
    client_name,
    client_phone,
    client_email,
    client_address,
    job_description,
  } = body;

  if (!electrician_id || !quote_id || !requested_date || !client_name || !client_phone) {
    return new Response(
      JSON.stringify({
        error:
          'electrician_id, quote_id, requested_date, client_name and client_phone are required',
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(requested_date)) {
    return new Response(JSON.stringify({ error: 'Invalid date format (expected YYYY-MM-DD)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Today is allowed; yesterday is not. Compared on the date string so a
  // request made at 23:50 for "tomorrow" is not rejected by a UTC rollover.
  const todayStr = new Date().toISOString().split('T')[0];
  if (requested_date < todayStr) {
    return new Response(JSON.stringify({ error: 'That date has already passed' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const preference = ['morning', 'afternoon', 'flexible'].includes(time_preference)
    ? time_preference
    : 'flexible';

  /*
   * Scoped to the electrician as well as the quote.
   *
   * `quote_id` arrives from a public page and is attacker-controlled. Without
   * the user_id predicate, a valid quote id belonging to someone else would
   * let anyone write a start date onto that stranger's quote.
   */
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .update({
      requested_start_date: requested_date,
      requested_time_preference: preference,
      requested_at: new Date().toISOString(),
    })
    .eq('id', quote_id)
    .eq('user_id', electrician_id)
    .select('quote_number, customer_id')
    .maybeSingle();

  if (quoteError) throw new Error(`Could not save the request: ${quoteError.message}`);
  if (!quote) {
    return new Response(JSON.stringify({ error: 'Quote not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const prettyDate = new Date(`${requested_date}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const prefLabel =
    preference === 'morning' ? 'morning' : preference === 'afternoon' ? 'afternoon' : 'any time';
  const ref = quote.quote_number ? `Quote ${quote.quote_number}` : 'Quote';

  // Everything below is non-critical: the request itself is already saved and
  // must not fail because a notification did.
  try {
    await supabase.from('spark_tasks').insert({
      user_id: electrician_id,
      title: `Confirm start date: ${client_name} — ${prettyDate}`,
      details: [
        `${ref}`,
        `Client would like to start: ${prettyDate} (${prefLabel})`,
        '',
        `Client: ${client_name}`,
        `Phone: ${client_phone}`,
        client_email ? `Email: ${client_email}` : null,
        client_address ? `Address: ${client_address}` : null,
        job_description ? `\n${job_description}` : null,
        '',
        'Requested from the quote acceptance page. Nothing is in the diary until you confirm.',
      ]
        .filter(Boolean)
        .join('\n'),
      status: 'open',
      // Higher than a plain booking: a client is waiting on an answer.
      priority: 'high',
      due_at: new Date(`${requested_date}T09:00:00Z`).toISOString(),
      customer_id: quote.customer_id || null,
      tags: ['booking', 'start-date-request'],
    });
  } catch {
    /* non-critical */
  }

  try {
    await supabase.from('user_notifications').insert({
      user_id: electrician_id,
      type: 'booking_received',
      title: `Start date requested — ${client_name}`,
      message: `${ref}: ${client_name} would like to start ${prettyDate} (${prefLabel}). Confirm to put it in your diary.`,
      link: '/electrician/quotes',
      metadata: {
        quote_id,
        quote_number: quote.quote_number,
        requested_date,
        time_preference: preference,
        client_name,
        client_phone,
        client_email: client_email || null,
      },
      is_read: false,
    });
  } catch {
    /* non-critical */
  }

  try {
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({
        userId: electrician_id,
        title: `📅 ${ref} — start date requested`,
        body: `${client_name} · ${prettyDate} · ${prefLabel}`,
        type: 'default',
        data: {
          deep_link: '/electrician/quotes',
          category: 'start_date_requested',
          quote_id,
        },
        // A client is sitting waiting to hear back.
        skipQuietHours: true,
      }),
    });
  } catch {
    /* non-critical */
  }

  return new Response(
    JSON.stringify({
      requested: true,
      quote_number: quote.quote_number,
      requested_date,
      time_preference: preference,
    }),
    { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleBookSlot(req: Request, supabase: ReturnType<typeof createClient>) {
  const body = await req.json();

  // A client accepting a quote asks for a start date instead of reserving an
  // hour. Different enough — no calendar event, nothing to double-book — to
  // be its own path rather than a flag threaded through the booking one.
  if (body?.mode === 'request') {
    return await handleStartDateRequest(body, supabase);
  }

  const {
    electrician_id,
    date,
    start_time,
    client_name,
    client_phone,
    client_email,
    job_description,
    // Optional site address — populates the event location so it syncs as a
    // tappable map pin (ELE-1042) and is saved against the customer record.
    client_address,
    // ELE-955 — optional. When the booking is for an accepted quote
    // (post-acceptance / post-deposit handoff), the quote_id is passed
    // through so we can link the calendar event back to the quote and
    // mark booked_slot_start/end on the quote row.
    quote_id,
    // Optional loop-closers from reminder emails: a renewal reminder carries
    // its ledger row id (?rid=…), a maintenance visit reminder its visit id
    // (?visit=…). Booking from the email then marks the pipeline entry
    // BOOKED / links the diary event, instead of leaving it to be chased.
    renewal_id,
    visit_id,
  } = body;

  if (!electrician_id || !date || !start_time || !client_name || !client_phone) {
    return new Response(
      JSON.stringify({
        error: 'electrician_id, date, start_time, client_name, and client_phone are required',
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Response(JSON.stringify({ error: 'Invalid date format (expected YYYY-MM-DD)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate time format
  if (!/^\d{2}:\d{2}$/.test(start_time)) {
    return new Response(JSON.stringify({ error: 'Invalid time format (expected HH:MM)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  /*
   * The slot length this electrician offers.
   *
   * Read again here rather than trusted from the request: the client is a
   * public page and must not be able to name its own duration. Without this
   * lookup a 90-minute slot would be written as a 60-minute event, and the
   * overlap check above would then happily let a second client book into the
   * half hour that was really still occupied.
   */
  const { data: slotProfile } = await supabase
    .from('profiles')
    .select(
      'scheduling_slot_minutes, scheduling_auto_confirm, full_name, scheduling_working_hours, scheduling_jobs_at_once'
    )
    .eq('id', electrician_id)
    .maybeSingle();

  const slotLen =
    Number(slotProfile?.scheduling_slot_minutes) > 0
      ? Number(slotProfile?.scheduling_slot_minutes)
      : SLOT_DURATION_MINUTES;

  /*
   * Duration re-derived server-side from the same fixed vocabulary the GET
   * offers — the client names a KIND, never a number of minutes. `full_day`
   * is that weekday's working window, so it needs the hours the slots were
   * generated from.
   */
  const durationKind: 'slot' | 'half_day' | 'full_day' =
    body?.duration === 'half_day' || body?.duration === 'full_day' ? body.duration : 'slot';

  const postHours: WorkingHours = {
    ...DEFAULT_WORKING_HOURS,
    ...((slotProfile?.scheduling_working_hours as Partial<WorkingHours>) || {}),
  };
  const capacity = Math.min(10, Math.max(1, Number(slotProfile?.scheduling_jobs_at_once) || 1));

  let bookedMinutes = slotLen;
  if (durationKind === 'half_day') bookedMinutes = 240;
  if (durationKind === 'full_day') {
    const weekday = DAY_KEYS[new Date(`${date}T12:00:00Z`).getUTCDay()];
    const win = postHours[weekday];
    if (!win) {
      return new Response(JSON.stringify({ error: 'That day is outside working hours' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const winStart = ukWallToInstant(date, win.start);
    const winEnd = ukWallToInstant(date, win.end);
    bookedMinutes = Math.max(60, Math.round((winEnd - winStart) / 60000));
  }

  /*
   * Whether to confirm to the customer, read from the same row.
   *
   * Strict `=== true`: the column is NOT NULL DEFAULT false, but reading it as
   * truthy would mean a future null or a string from a hand-edited row started
   * emailing customers on its own. An opt-in has to fail closed.
   */
  const autoConfirm = slotProfile?.scheduling_auto_confirm === true;
  const profileRow = slotProfile;

  /*
   * The customer's wall-clock choice as a TRUE instant — the same convention
   * every internal writer uses, which is what makes the diary, the
   * confirmation email and the .ics all read back "09:00" instead of a
   * summer hour's drift.
   */
  const startAt = new Date(ukWallToInstant(date, start_time));
  const endAt = new Date(startAt.getTime() + bookedMinutes * 60 * 1000);

  if (startAt.getTime() < Date.now()) {
    return new Response(JSON.stringify({ error: 'Cannot book a time slot in the past' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  /*
   * Still-available check, by the same rules the slots were offered under:
   * capacity-aware, and site visits count as diary time. The old check
   * refused on ANY overlapping event — which double-rejects for a multi-van
   * firm — and never saw site visits at all, so the one clash it should have
   * caught could sail through.
   */
  const { data: overlapEvents } = await supabase
    .from('calendar_events')
    .select('id')
    .eq('user_id', electrician_id)
    .lt('start_at', endAt.toISOString())
    .gt('end_at', startAt.toISOString());

  const { data: overlapVisits } = await supabase
    .from('site_visits')
    .select('scheduled_at')
    .eq('user_id', electrician_id)
    .is('calendar_event_id', null)
    .not('scheduled_at', 'is', null)
    .gte('scheduled_at', new Date(startAt.getTime() - 60 * 60 * 1000).toISOString())
    .lt('scheduled_at', endAt.toISOString());

  const concurrent = (overlapEvents?.length ?? 0) + (overlapVisits?.length ?? 0);
  if (concurrent >= capacity) {
    return new Response(
      JSON.stringify({ error: 'This time slot is no longer available. Please choose another.' }),
      { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Upsert customer (find by phone, create if new)
  const { data: existingCustomer } = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', electrician_id)
    .eq('phone', client_phone)
    .maybeSingle();

  let customerId: string;

  if (existingCustomer) {
    customerId = existingCustomer.id;
    await supabase
      .from('customers')
      .update({
        name: client_name,
        ...(client_email ? { email: client_email } : {}),
        ...(client_address ? { address: client_address } : {}),
      })
      .eq('id', customerId);
  } else {
    const { data: newCustomer, error: custError } = await supabase
      .from('customers')
      .insert({
        user_id: electrician_id,
        name: client_name,
        phone: client_phone,
        email: client_email || null,
        address: client_address || null,
      })
      .select('id')
      .single();

    if (custError) throw new Error(`Failed to create customer: ${custError.message}`);
    customerId = newCustomer.id;
  }

  // A self-booked customer must land in the electrician's Google Calendar
  // too — otherwise the one diary they actually look at is the one that
  // doesn't know they're booked. pending_push + an immediate sync below.
  const { data: gcalToken } = await supabase
    .from('google_calendar_tokens')
    .select('sync_enabled')
    .eq('user_id', electrician_id)
    .maybeSingle();
  const bookingSyncStatus = gcalToken?.sync_enabled ? 'pending_push' : 'local_only';

  // Create calendar event (matches MCP calendar.ts createCalendarEvent fields)
  const { data: event, error: eventError } = await supabase
    .from('calendar_events')
    .insert({
      user_id: electrician_id,
      title: `Booking: ${client_name}`,
      description: job_description || null,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      all_day: false,
      event_type: 'site_visit',
      colour: '#F59E0B',
      location: client_address || null,
      client_id: customerId,
      notes: job_description
        ? `Booked via portal\n\n${job_description}`
        : 'Booked via booking portal',
      sync_status: bookingSyncStatus,
      reminder_minutes: 30,
    })
    .select('id')
    .single();

  if (eventError) throw new Error(`Failed to create booking: ${eventError.message}`);

  // Push the booking into Google straight away — fire-and-forget, the
  // 15-minute sweep covers any miss.
  if (bookingSyncStatus === 'pending_push') {
    fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/sync-google-calendar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: electrician_id }),
    }).catch((syncError) => console.warn('Post-booking sync kick failed:', syncError));
  }

  // ELE-955 — if this booking is tied to an accepted quote, persist the
  // link both ways so the quote detail view shows "Booked for ..." and
  // the calendar event can be traced back. Non-fatal — the booking
  // itself is already saved.
  let quoteForPush: { quote_number?: string | null } | null = null;
  if (quote_id) {
    try {
      const { data: linkedQuote } = await supabase
        .from('quotes')
        .update({
          booked_slot_start: startAt.toISOString(),
          booked_slot_end: endAt.toISOString(),
          booking_calendar_event_id: event.id,
        })
        .eq('id', quote_id)
        .eq('user_id', electrician_id)
        .select('quote_number')
        .maybeSingle();
      quoteForPush = linkedQuote || null;
    } catch (linkErr) {
      console.warn('quote ↔ booking link failed (non-fatal):', linkErr);
    }
  }

  /*
   * Close the loop the reminder opened. Non-fatal — the booking itself is
   * already saved — and guarded on the electrician id so a tampered id in
   * the email link can't touch anyone else's pipeline.
   */
  if (renewal_id) {
    try {
      await supabase
        .from('certificate_expiry_reminders')
        .update({
          reminder_status: 'booked',
          booked_for_date: startAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', renewal_id)
        .eq('user_id', electrician_id)
        .not('reminder_status', 'in', '("completed","cancelled")');
    } catch (loopErr) {
      console.warn('renewal loop-close failed (non-fatal):', loopErr);
    }
  }
  if (visit_id) {
    try {
      await supabase
        .from('maintenance_contract_visits')
        .update({ booked_event_id: event.id, booked_at: new Date().toISOString() })
        .eq('id', visit_id)
        .eq('user_id', electrician_id);
    } catch (loopErr) {
      console.warn('visit loop-close failed (non-fatal):', loopErr);
    }
  }

  // Create a task for the electrician so it shows in their task list
  const formattedDate = new Date(startAt).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  // Non-critical: create task + log action (don't fail the booking if these error)
  try {
    await supabase.from('spark_tasks').insert({
      user_id: electrician_id,
      title: `Booking: ${client_name} — ${formattedDate} at ${start_time}`,
      details: [
        `Client: ${client_name}`,
        `Phone: ${client_phone}`,
        client_email ? `Email: ${client_email}` : null,
        job_description ? `\nJob description:\n${job_description}` : null,
        `\nBooked via booking portal`,
      ]
        .filter(Boolean)
        .join('\n'),
      status: 'open',
      priority: 'normal',
      due_at: startAt.toISOString(),
      customer_id: customerId,
      tags: ['booking'],
    });
  } catch {
    /* non-critical */
  }

  try {
    await supabase.from('agent_action_log').insert({
      user_id: electrician_id,
      action_type: 'booking_portal',
      description: `Client ${client_name} booked ${date} ${start_time} via booking portal`,
      metadata: { customer_id: customerId, event_id: event.id, phone: client_phone },
    });
  } catch {
    /* non-critical */
  }

  // In-app notification for the electrician
  try {
    await supabase.from('user_notifications').insert({
      user_id: electrician_id,
      type: 'booking_received',
      title: `New Booking: ${client_name}`,
      message: `${client_name} booked ${formattedDate} at ${start_time}${job_description ? ` — ${job_description}` : ''}`,
      link: '/electrician/business/calendar',
      metadata: {
        customer_id: customerId,
        event_id: event.id,
        client_name,
        client_phone,
        client_email: client_email || null,
        date,
        start_time,
        // ELE-1471 — carried so the "Convert to project" action on the
        // notification can pre-fill the new-project sheet without another
        // round trip. See src/lib/bookingToProject.ts.
        job_description: job_description || null,
      },
      is_read: false,
    });
  } catch {
    /* non-critical */
  }

  /*
   * Confirm it to the CUSTOMER — if the electrician has asked for that.
   *
   * The gap this closes: someone fills in the public booking form, presses
   * submit, and gets a web page saying "confirmed" and nothing else. The
   * electrician gets a push, a task and a diary entry; the customer gets
   * nothing they can keep, nothing in their calendar, and no way to check what
   * they agreed to.
   *
   * Gated on `scheduling_auto_confirm`, which is off for everyone until they
   * turn it on. Every other confirmation in the product is written by the app
   * and sent by the electrician; this is the one case where the customer has
   * just asked for the slot themselves, so confirming it is transactional
   * rather than the app speaking for them — but it is still their call.
   *
   * Non-critical throughout. The booking is already saved and must never fail
   * because an email did.
   */
  try {
    if (autoConfirm && client_email) {
      const to = String(client_email).trim().toLowerCase();

      // Read whole and compared lower-cased — `.in()` is case-SENSITIVE, so a
      // stored `Foo@Bar.com` would never match a queued `foo@bar.com`.
      const { data: suppressedRows } = await supabase
        .from('email_suppressions')
        .select('email')
        .range(0, 49999);
      const suppressed = new Set(
        (suppressedRows ?? [])
          .map((r) => String(r.email || '').trim().toLowerCase())
          .filter(Boolean)
      );

      if (!suppressed.has(to)) {
        const { data: companyRow } = await supabase
          .from('company_profiles')
          .select(
            'company_name, company_email, company_phone, company_website, logo_url, accent_color'
          )
          .eq('user_id', electrician_id)
          .maybeSingle();

        const brandName =
          (companyRow?.company_name as string) || (profileRow?.full_name as string) || 'Your electrician';
        const title = `Booking: ${client_name}`;
        const icsFilename = bookingIcsFilename(title, startAt.toISOString());

        const built = buildBookingConfirmationEmail({
          company: {
            name: brandName,
            logoUrl: (companyRow?.logo_url as string) ?? null,
            primaryColor: (companyRow?.accent_color as string) ?? null,
            email: (companyRow?.company_email as string) ?? null,
            phone: (companyRow?.company_phone as string) ?? null,
            website: (companyRow?.company_website as string) ?? null,
          },
          clientName: client_name,
          title,
          startIso: startAt.toISOString(),
          endIso: endAt.toISOString(),
          allDay: false,
          location: client_address || null,
          note: job_description || null,
          icsFilename,
        });

        const ics = buildBookingIcs({
          // Same UID scheme as send-booking-confirmation, so a later
          // reschedule sent from the app UPDATES this entry rather than
          // adding a second one to the customer's calendar.
          uid: `booking-${event.id as string}@elec-mate.com`,
          title,
          startIso: startAt.toISOString(),
          endIso: endAt.toISOString(),
          allDay: false,
          location: client_address || null,
          description: job_description || null,
          organiserName: brandName,
          sequence: 0,
        });

        const sender = clientFacingSender({
          companyName: brandName,
          companyEmail: (companyRow?.company_email as string) ?? null,
          userEmail: null,
        });

        const apiKey = Deno.env.get('RESEND_API_KEY');
        if (apiKey) {
          const { error: mailErr } = await new Resend(apiKey).emails.send({
            from: sender.from,
            replyTo: sender.replyTo,
            to,
            subject: built.subject,
            html: built.html,
            text: htmlToPlainText(built.html),
            attachments: [
              { filename: icsFilename, content: btoa(unescape(encodeURIComponent(ics))) },
            ],
          });
          if (!mailErr) {
            // `event.id` is `unknown` off the untyped service-role client —
            // the same reason the surrounding code casts. Narrowed at the
            // boundary rather than reaching for `any`.
            await supabase
              .from('calendar_events')
              .update({ confirmation_sent_at: new Date().toISOString(), confirmation_sent_to: to })
              .eq('id', event.id as string);
          } else {
            console.warn('portal confirmation failed (non-fatal):', mailErr.message);
          }
        }
      }
    }
  } catch (confirmErr) {
    console.warn('portal confirmation threw (non-fatal):', confirmErr);
  }

  // Push notification for the electrician — fires immediately, bypasses quiet hours
  // because a new booking is time-sensitive (client is waiting for confirmation).
  try {
    const jobLine = job_description ? `\n${job_description}` : '';
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({
        userId: electrician_id,
        // ELE-955 — quote-context push title is more useful for the
        // sparky than a generic "New booking" when this came from
        // a quote-acceptance handoff.
        title: quoteForPush?.quote_number
          ? `📅 Quote ${quoteForPush.quote_number} — booked`
          : `📅 New booking — ${client_name}`,
        body: `${client_name} · ${formattedDate} at ${start_time}${jobLine}`,
        type: 'default',
        data: {
          deep_link: '/electrician/business/calendar',
          category: 'booking_received',
          event_id: event.id,
          quote_id: quote_id || null,
        },
        skipQuietHours: true,
      }),
    });
  } catch {
    /* non-critical — booking is confirmed regardless */
  }

  return new Response(
    JSON.stringify({
      booking_id: event.id,
      confirmed: true,
      date,
      time: start_time,
      electrician_id,
    }),
    { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
