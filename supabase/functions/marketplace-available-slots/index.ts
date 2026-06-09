/**
 * marketplace-available-slots
 *
 * Returns the next 14 days of available booking slots for a sparky, taking
 * into account:
 *  - The sparky's `scheduling_working_hours` (per-day open/close)
 *  - The sparky's `scheduling_buffer_minutes` (gap between jobs)
 *  - The sparky's `scheduling_max_bookings_per_day` cap
 *  - The sparky's `scheduling_min_notice_hours` (no same-day-at-9am bookings)
 *  - The sparky's `scheduling_blackout_dates` (holidays / off days)
 *  - Existing `calendar_events` (already-booked time)
 *  - Active `calendar_slot_holds` (provisional 10-min holds during pick → confirm)
 *
 * The slot duration matches the requested duration (default 60 min). Slots
 * are returned as a flat list, sorted ascending; client groups by day.
 *
 * Public endpoint — called from the public quote acceptance page after
 * deposit. No auth required (the quote token is the auth surface).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SLOT_GRANULARITY_MINUTES = 30;
const DEFAULT_DURATION_MINUTES = 60;
const LOOK_AHEAD_DAYS = 14;

type WorkingHoursDay = { start: string; end: string } | null;
type WorkingHours = Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', WorkingHoursDay>;
type BlackoutEntry = { start: string; end: string; reason?: string };

const DAY_KEYS: Array<keyof WorkingHours> = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function combine(date: Date, hhmm: string): Date {
  const [h, m] = hhmm.split(':').map((v) => parseInt(v, 10));
  const out = new Date(date);
  out.setHours(h || 0, m || 0, 0, 0);
  return out;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const quoteId = url.searchParams.get('quote_id');
    const durationMinutes =
      Number(url.searchParams.get('duration_minutes')) || DEFAULT_DURATION_MINUTES;

    if (!quoteId) {
      return new Response(JSON.stringify({ error: 'quote_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Resolve quote → user_id (the sparky)
    const { data: quote, error: quoteErr } = await supabase
      .from('quotes')
      .select('id, user_id, jobDetails')
      .eq('id', quoteId)
      .maybeSingle();

    if (quoteErr || !quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = quote.user_id;

    // Pull sparky's scheduling preferences from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select(
        'scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates'
      )
      .eq('id', userId)
      .maybeSingle();

    const hours: WorkingHours = (profile?.scheduling_working_hours as WorkingHours) || {
      mon: { start: '08:00', end: '18:00' },
      tue: { start: '08:00', end: '18:00' },
      wed: { start: '08:00', end: '18:00' },
      thu: { start: '08:00', end: '18:00' },
      fri: { start: '08:00', end: '18:00' },
      sat: null,
      sun: null,
    };
    const bufferMin = profile?.scheduling_buffer_minutes ?? 30;
    const maxPerDay = profile?.scheduling_max_bookings_per_day ?? 4;
    const minNoticeHours = profile?.scheduling_min_notice_hours ?? 24;
    const blackouts: BlackoutEntry[] = (profile?.scheduling_blackout_dates as BlackoutEntry[]) || [];

    // Window of interest
    const now = new Date();
    const windowStart = new Date(now.getTime() + minNoticeHours * 3600_000);
    const windowEnd = new Date(now.getTime() + LOOK_AHEAD_DAYS * 86400_000);

    // Existing calendar events for this sparky in the window
    const { data: events } = await supabase
      .from('calendar_events')
      .select('start_time, end_time')
      .eq('user_id', userId)
      .gte('start_time', now.toISOString())
      .lte('start_time', windowEnd.toISOString());

    // Active slot holds in the window (provisional locks)
    const { data: holds } = await supabase
      .from('calendar_slot_holds')
      .select('slot_start, slot_end')
      .eq('user_id', userId)
      .gte('slot_start', now.toISOString())
      .lte('slot_start', windowEnd.toISOString())
      .is('confirmed_at', null)
      .is('released_at', null)
      .gt('expires_at', now.toISOString());

    // Build a list of busy intervals (events + holds + blackouts)
    type Busy = { start: number; end: number };
    const busy: Busy[] = [];
    for (const e of events || []) {
      busy.push({
        start: new Date(e.start_time).getTime() - bufferMin * 60_000,
        end: new Date(e.end_time).getTime() + bufferMin * 60_000,
      });
    }
    for (const h of holds || []) {
      busy.push({
        start: new Date(h.slot_start).getTime() - bufferMin * 60_000,
        end: new Date(h.slot_end).getTime() + bufferMin * 60_000,
      });
    }
    for (const bo of blackouts) {
      const bs = new Date(bo.start).getTime();
      const be = new Date(bo.end).getTime();
      if (Number.isFinite(bs) && Number.isFinite(be)) busy.push({ start: bs, end: be });
    }

    // Track bookings-per-day to enforce maxPerDay
    const bookingsPerDay = new Map<string, number>();
    for (const e of events || []) {
      const k = e.start_time.slice(0, 10);
      bookingsPerDay.set(k, (bookingsPerDay.get(k) || 0) + 1);
    }

    // Generate slot candidates
    const slots: Array<{ start: string; end: string }> = [];

    for (let d = 0; d < LOOK_AHEAD_DAYS; d++) {
      const day = new Date(now);
      day.setDate(day.getDate() + d);
      day.setHours(0, 0, 0, 0);
      const dayKey = DAY_KEYS[day.getDay()];
      const dayConfig = hours[dayKey];
      if (!dayConfig) continue;
      const dayStartIso = day.toISOString().slice(0, 10);
      if ((bookingsPerDay.get(dayStartIso) || 0) >= maxPerDay) continue;

      const dayOpen = combine(day, dayConfig.start);
      const dayClose = combine(day, dayConfig.end);

      // Step through candidate slots at SLOT_GRANULARITY_MINUTES intervals
      for (
        let cursor = dayOpen.getTime();
        cursor + durationMinutes * 60_000 <= dayClose.getTime();
        cursor += SLOT_GRANULARITY_MINUTES * 60_000
      ) {
        const slotStart = cursor;
        const slotEnd = cursor + durationMinutes * 60_000;

        // Must be after windowStart (min-notice gate)
        if (slotStart < windowStart.getTime()) continue;

        // Check no overlap with any busy interval
        const conflicts = busy.some((b) => slotStart < b.end && slotEnd > b.start);
        if (conflicts) continue;

        slots.push({
          start: new Date(slotStart).toISOString(),
          end: new Date(slotEnd).toISOString(),
        });
      }
    }

    return new Response(
      JSON.stringify({
        slots,
        duration_minutes: durationMinutes,
        timezone: 'Europe/London',
        window: { start: windowStart.toISOString(), end: windowEnd.toISOString() },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    await captureException(err, { functionName: 'marketplace-available-slots', requestUrl: req.url, requestMethod: req.method });
    console.error('marketplace-available-slots error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message || 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
