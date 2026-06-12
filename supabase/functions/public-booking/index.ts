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
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
    await captureException(err, { functionName: 'public-booking', requestUrl: req.url, requestMethod: req.method });
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
      'full_name, scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates'
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
  const bufferMinutes: number =
    Number(profile.scheduling_buffer_minutes) || DEFAULT_BUFFER_MINUTES;
  const maxBookingsPerDay: number =
    Number(profile.scheduling_max_bookings_per_day) || DEFAULT_MAX_BOOKINGS_PER_DAY;
  const minNoticeHours: number =
    Number(profile.scheduling_min_notice_hours) || DEFAULT_MIN_NOTICE_HOURS;
  const blackoutDates = (profile.scheduling_blackout_dates as Array<{
    start?: string;
    end?: string;
  }>) || [];

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

  // Find available 1-hour slots using the electrician's working hours.
  // Skips: days with no window set (closed days), past times, days
  // already at their daily booking cap, and any blackout windows.
  const slots: Array<{ date: string; start: string; end: string }> = [];
  const durationMs = SLOT_DURATION_MINUTES * 60 * 1000;
  const bufferMs = bufferMinutes * 60 * 1000;
  const minNoticeMs = minNoticeHours * 60 * 60 * 1000;

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
    let effectiveStart = Math.max(dayStartMs, earliestBookable);
    // If even the day end is before the notice cutoff, skip the day
    if (effectiveStart >= dayEndMs) continue;

    // Round cursor up to the next whole hour
    const cursorDate = new Date(effectiveStart);
    if (cursorDate.getUTCMinutes() > 0 || cursorDate.getUTCSeconds() > 0) {
      cursorDate.setUTCHours(cursorDate.getUTCHours() + 1, 0, 0, 0);
    }
    let cursor = cursorDate.getTime();

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
    if ((events || []).filter((e) => (e.start_at as string).startsWith(dateStr)).length >= maxBookingsPerDay) {
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
      cursor = Math.max(cursor, event.end);
      // Round up to the next whole hour after event ends
      const postEvent = new Date(cursor);
      if (postEvent.getUTCMinutes() > 0) {
        postEvent.setUTCHours(postEvent.getUTCHours() + 1, 0, 0, 0);
        cursor = postEvent.getTime();
      }
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

  return new Response(
    JSON.stringify({
      electrician: {
        name: profile.full_name || 'Electrician',
        company: companyProfile?.company_name || null,
      },
      slots,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleBookSlot(req: Request, supabase: ReturnType<typeof createClient>) {
  const body = await req.json();
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

  // Don't allow booking in the past
  const startAt = new Date(`${date}T${start_time}:00Z`);
  const endAt = new Date(startAt.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

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
    await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`,
      {
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
      }
    );
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
