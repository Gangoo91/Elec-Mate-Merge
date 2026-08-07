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

/** Format hour:minute from a Date in UTC (our dates are stored as UTC-equivalent UK times) */
function formatHHMM(date: Date): string {
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
}

async function handleGetSlots(req: Request, supabase: ReturnType<typeof createClient>) {
  const url = new URL(req.url);
  const electricianId = url.searchParams.get('electrician_id');
  const days = Math.min(parseInt(url.searchParams.get('days') || '14', 10), 30);

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
      'full_name, scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates, scheduling_slot_minutes'
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

  // company_profiles is keyed by user_id, not id (long-standing bug
  // returning null here — preserved profile lookup above is what
  // actually drives the response).
  const { data: companyProfile } = await supabase
    .from('company_profiles')
    .select('company_name')
    .eq('user_id', electricianId)
    .maybeSingle();

  // Compute date range (UK dates — we work in UTC as a proxy since all our times are UK)
  const now = new Date();
  const dateFrom = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dateTo = new Date(dateFrom.getTime() + days * 24 * 60 * 60 * 1000);

  // Fetch existing calendar events in range
  const { data: events } = await supabase
    .from('calendar_events')
    .select('start_at, end_at')
    .eq('user_id', electricianId)
    .gte('start_at', dateFrom.toISOString())
    .lte('start_at', dateTo.toISOString())
    .order('start_at', { ascending: true });

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

    // Working window for the day
    const dayStartMs = new Date(`${dateStr}T${window.start}:00Z`).getTime();
    const dayEndMs = new Date(`${dateStr}T${window.end}:00Z`).getTime();

    // Apply min-notice for today (or future days within notice window)
    const earliestBookable = now.getTime() + minNoticeMs;
    const effectiveStart = Math.max(dayStartMs, earliestBookable);
    // If even the day end is before the notice cutoff, skip the day
    if (effectiveStart >= dayEndMs) continue;

    /*
     * Align the cursor to the slot grid, not to the clock hour.
     *
     * This rounded up to the next whole hour. That was invisible while every
     * slot was 60 minutes and every working day opened on the hour, but it
     * silently breaks any other length: with 30-minute slots the cursor would
     * still land only on the hour, so choosing 30 would have produced exactly
     * the same slots as 60 and the setting would have looked dead.
     *
     * The grid is anchored to the day's opening time, so a 90-minute day from
     * 08:00 offers 08:00, 09:30, 11:00 — not 08:00, 09:00, 10:00.
     */
    let cursor = alignUp(effectiveStart, dayStartMs, durationMs);

    // Get events for this specific day. Pad each event by the
    // configured buffer on either side so the sparky has travel time
    // between jobs.
    const dayEvents = (events || [])
      .filter((e) => (e.start_at as string).startsWith(dateStr))
      .map((e) => ({
        start: new Date(e.start_at as string).getTime() - bufferMs,
        end: new Date(e.end_at as string).getTime() + bufferMs,
      }))
      .sort((a, b) => a.start - b.start);

    // Daily booking cap — if the day already has the max number of
    // calendar events, surface zero slots for it.
    if (
      (events || []).filter((e) => (e.start_at as string).startsWith(dateStr)).length >=
      maxBookingsPerDay
    ) {
      continue;
    }

    const daySlots: Array<{ date: string; start: string; end: string }> = [];

    // Walk through events and fill gaps
    for (const event of dayEvents) {
      while (cursor + durationMs <= event.start && cursor + durationMs <= dayEndMs) {
        daySlots.push({
          date: dateStr,
          start: formatHHMM(new Date(cursor)),
          end: formatHHMM(new Date(cursor + durationMs)),
        });
        cursor += durationMs;
      }
      // Back onto the slot grid after the event, for the same reason.
      cursor = alignUp(Math.max(cursor, event.end), dayStartMs, durationMs);
    }

    // Remaining slots after last event
    while (cursor + durationMs <= dayEndMs) {
      daySlots.push({
        date: dateStr,
        start: formatHHMM(new Date(cursor)),
        end: formatHHMM(new Date(cursor + durationMs)),
      });
      cursor += durationMs;
    }

    slots.push(...daySlots);
  }

  /*
   * Days the electrician works, independent of what is already in the diary.
   *
   * The quote-acceptance flow asks for a START DATE rather than an hour, so it
   * needs the days that are plausible at all — a working day, not a holiday.
   * It deliberately ignores existing events and the daily cap: those govern
   * whether a one-hour slot is free, which has no bearing on whether a client
   * may ask to begin a multi-week job that week. The electrician confirms.
   */
  const openDates: string[] = [];
  for (let d = new Date(dateFrom); d < dateTo; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (!workingHours[DAY_KEYS[d.getUTCDay()]]) continue;
    if (isBlackedOut(dateStr)) continue;
    // Respect the same notice period the slot walker applies.
    if (new Date(`${dateStr}T23:59:59Z`).getTime() < now.getTime() + minNoticeMs) continue;
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
    .select('scheduling_slot_minutes')
    .eq('id', electrician_id)
    .maybeSingle();

  const bookedMinutes =
    Number(slotProfile?.scheduling_slot_minutes) > 0
      ? Number(slotProfile.scheduling_slot_minutes)
      : SLOT_DURATION_MINUTES;

  // Don't allow booking in the past
  const startAt = new Date(`${date}T${start_time}:00Z`);
  const endAt = new Date(startAt.getTime() + bookedMinutes * 60 * 1000);

  if (startAt.getTime() < Date.now()) {
    return new Response(JSON.stringify({ error: 'Cannot book a time slot in the past' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate slot is still available (race condition check)
  const { data: conflicts } = await supabase
    .from('calendar_events')
    .select('id')
    .eq('user_id', electrician_id)
    .lt('start_at', endAt.toISOString())
    .gt('end_at', startAt.toISOString())
    .limit(1);

  if (conflicts && conflicts.length > 0) {
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
      sync_status: 'local_only',
      reminder_minutes: 30,
    })
    .select('id')
    .single();

  if (eventError) throw new Error(`Failed to create booking: ${eventError.message}`);

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
      link: '/electrician?tab=calendar',
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
          deep_link: '/electrician?tab=calendar',
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
