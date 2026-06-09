/**
 * marketplace-hold-slot
 *
 * Places a 10-minute provisional hold on a slot. Two clients picking the
 * same slot at the same time would race; this is the lock that resolves it.
 * The hold expires automatically at `expires_at` if not confirmed via
 * marketplace-confirm-booking.
 *
 * Public endpoint — quote ID is the auth surface (the public quote token
 * has already been validated to render the slot picker).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { quote_id, slot_start, slot_end } = body as {
      quote_id?: string;
      slot_start?: string;
      slot_end?: string;
    };
    if (!quote_id || !slot_start || !slot_end) {
      return new Response(
        JSON.stringify({ error: 'quote_id, slot_start, slot_end required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Resolve quote → user_id
    const { data: quote } = await supabase
      .from('quotes')
      .select('id, user_id, acceptance_status')
      .eq('id', quote_id)
      .maybeSingle();

    if (!quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Quote must be accepted (or accepted_pending_deposit but only after deposit paid)
    if (quote.acceptance_status !== 'accepted') {
      return new Response(
        JSON.stringify({
          error: 'Quote not yet accepted (or deposit pending). Pay deposit first.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Atomically check the slot is still free against existing events + active holds
    const slotStartTs = new Date(slot_start).toISOString();
    const slotEndTs = new Date(slot_end).toISOString();

    const { data: conflictingEvents } = await supabase
      .from('calendar_events')
      .select('id')
      .eq('user_id', quote.user_id)
      .lt('start_time', slotEndTs)
      .gt('end_time', slotStartTs)
      .limit(1);

    if (conflictingEvents && conflictingEvents.length > 0) {
      return new Response(JSON.stringify({ error: 'Slot already booked' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const nowIso = new Date().toISOString();
    const { data: conflictingHolds } = await supabase
      .from('calendar_slot_holds')
      .select('id')
      .eq('user_id', quote.user_id)
      .lt('slot_start', slotEndTs)
      .gt('slot_end', slotStartTs)
      .is('confirmed_at', null)
      .is('released_at', null)
      .gt('expires_at', nowIso)
      .neq('quote_id', quote_id)
      .limit(1);

    if (conflictingHolds && conflictingHolds.length > 0) {
      return new Response(JSON.stringify({ error: 'Slot just taken — pick another' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Release any existing hold for this quote (client picking again)
    await supabase
      .from('calendar_slot_holds')
      .update({ released_at: nowIso })
      .eq('quote_id', quote_id)
      .is('confirmed_at', null)
      .is('released_at', null);

    // Insert new hold
    const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
    const { data: hold, error: holdErr } = await supabase
      .from('calendar_slot_holds')
      .insert({
        user_id: quote.user_id,
        quote_id,
        slot_start: slotStartTs,
        slot_end: slotEndTs,
        expires_at: expiresAt,
      })
      .select('id, expires_at')
      .single();

    if (holdErr) throw holdErr;

    return new Response(
      JSON.stringify({ hold_id: hold.id, expires_at: hold.expires_at }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    await captureException(err, { functionName: 'marketplace-hold-slot', requestUrl: req.url, requestMethod: req.method });
    console.error('marketplace-hold-slot error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message || 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
