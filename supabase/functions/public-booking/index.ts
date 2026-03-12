/**
 * Public Booking Portal — "Calendly for Sparkies"
 *
 * GET  ?electrician_id=<uuid>&days=14 → available slots + electrician info
 * POST { electrician_id, date, start_time, client_name, client_phone, client_email?, job_description? }
 *      → creates calendar event + upserts customer + creates task + logs action
 *
 * No auth required — this is a public endpoint for clients to book appointments.
 * Uses service_role key for all DB operations.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SLOT_DURATION_MINUTES = 60;
const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;

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

  // Fetch electrician profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, company_name')
    .eq('id', electricianId)
    .single();

  if (profileError || !profile) {
    return new Response(JSON.stringify({ error: 'Electrician not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

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

  // Find available 1-hour slots: 8am-6pm weekdays, skip past times for today
  const slots: Array<{ date: string; start: string; end: string }> = [];
  const durationMs = SLOT_DURATION_MINUTES * 60 * 1000;

  for (let d = new Date(dateFrom); d < dateTo; d.setUTCDate(d.getUTCDate() + 1)) {
    const day = d.getUTCDay();
    if (day === 0 || day === 6) continue; // Skip weekends

    const dateStr = d.toISOString().split('T')[0];
    const dayStartMs = new Date(
      `${dateStr}T${String(WORK_START_HOUR).padStart(2, '0')}:00:00Z`
    ).getTime();
    const dayEndMs = new Date(
      `${dateStr}T${String(WORK_END_HOUR).padStart(2, '0')}:00:00Z`
    ).getTime();

    // For today: require at least 1hr from now
    const isToday = dateStr === now.toISOString().split('T')[0];
    let effectiveStart = dayStartMs;
    if (isToday) {
      const earliest = now.getTime() + 60 * 60 * 1000;
      effectiveStart = Math.max(dayStartMs, earliest);
    }

    // Round cursor up to the next whole hour
    const cursorDate = new Date(effectiveStart);
    if (cursorDate.getUTCMinutes() > 0 || cursorDate.getUTCSeconds() > 0) {
      cursorDate.setUTCHours(cursorDate.getUTCHours() + 1, 0, 0, 0);
    }
    let cursor = cursorDate.getTime();

    // Get events for this specific day
    const dayEvents = (events || [])
      .filter((e) => (e.start_at as string).startsWith(dateStr))
      .map((e) => ({
        start: new Date(e.start_at as string).getTime(),
        end: new Date(e.end_at as string).getTime(),
      }))
      .sort((a, b) => a.start - b.start);

    // Walk through events and fill gaps
    for (const event of dayEvents) {
      while (cursor + durationMs <= event.start && cursor + durationMs <= dayEndMs) {
        slots.push({
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
      slots.push({
        date: dateStr,
        start: formatHHMM(new Date(cursor)),
        end: formatHHMM(new Date(cursor + durationMs)),
      });
      cursor += durationMs;
    }
  }

  return new Response(
    JSON.stringify({
      electrician: {
        name: profile.full_name || 'Electrician',
        company: profile.company_name || null,
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
      })
      .select('id')
      .single();

    if (custError) throw new Error(`Failed to create customer: ${custError.message}`);
    customerId = newCustomer.id;
  }

  // Create calendar event
  const { data: event, error: eventError } = await supabase
    .from('calendar_events')
    .insert({
      user_id: electrician_id,
      title: `Booking: ${client_name}`,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      event_type: 'site_visit',
      source: 'booking_portal',
      customer_id: customerId,
      notes: job_description || null,
      sync_status: 'local_only',
    })
    .select('id')
    .single();

  if (eventError) throw new Error(`Failed to create booking: ${eventError.message}`);

  // Create a task for the electrician so it shows in their task list
  const formattedDate = new Date(startAt).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  await supabase
    .from('spark_tasks')
    .insert({
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
    })
    .catch(() => {
      /* non-critical */
    });

  // Log the action
  await supabase
    .from('agent_action_log')
    .insert({
      user_id: electrician_id,
      action_type: 'booking_portal',
      description: `Client ${client_name} booked ${date} ${start_time} via booking portal`,
      metadata: { customer_id: customerId, event_id: event.id, phone: client_phone },
    })
    .catch(() => {
      /* non-critical */
    });

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
