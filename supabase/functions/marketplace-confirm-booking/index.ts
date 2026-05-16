/**
 * marketplace-confirm-booking
 *
 * Confirms a held slot → creates a calendar_events row → links the quote
 * with booked_slot_* + booking_calendar_event_id → emits an .ics
 * confirmation email to the client → sparky push/email/WhatsApp notification.
 *
 * Atomic: only confirms if the hold is still active (not expired, not
 * released, not already confirmed).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

function buildIcs(opts: {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  location?: string;
  organizerEmail?: string;
  attendeeEmail?: string;
}): string {
  const dt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elec-Mate//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${opts.uid}`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(opts.start)}`,
    `DTEND:${dt(opts.end)}`,
    `SUMMARY:${(opts.summary || '').replace(/[\r\n]+/g, ' ')}`,
  ];
  if (opts.description)
    lines.push(`DESCRIPTION:${opts.description.replace(/[\r\n]+/g, '\\n')}`);
  if (opts.location) lines.push(`LOCATION:${opts.location.replace(/[\r\n]+/g, ' ')}`);
  if (opts.organizerEmail)
    lines.push(`ORGANIZER:mailto:${opts.organizerEmail}`);
  if (opts.attendeeEmail)
    lines.push(`ATTENDEE;CN=Client;RSVP=TRUE:mailto:${opts.attendeeEmail}`);
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.join('\r\n');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { hold_id } = body as { hold_id?: string };
    if (!hold_id) {
      return new Response(JSON.stringify({ error: 'hold_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Atomically confirm the hold
    const nowIso = new Date().toISOString();
    const { data: hold, error: holdErr } = await supabase
      .from('calendar_slot_holds')
      .update({ confirmed_at: nowIso })
      .eq('id', hold_id)
      .is('confirmed_at', null)
      .is('released_at', null)
      .gt('expires_at', nowIso)
      .select('id, user_id, quote_id, slot_start, slot_end')
      .maybeSingle();

    if (holdErr || !hold) {
      return new Response(
        JSON.stringify({ error: 'Hold expired or already confirmed. Pick another slot.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pull quote + client + sparky for the booking metadata.
    // (Columns are snake_case: client_data + job_details, not client/jobDetails.)
    const { data: quote } = await supabase
      .from('quotes')
      .select('id, user_id, quote_number, total, client_data, job_details, accepted_by_email, accepted_by_name')
      .eq('id', hold.quote_id)
      .maybeSingle();

    if (!quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('company_name, company_email')
      .eq('user_id', hold.user_id)
      .maybeSingle();

    const clientName: string =
      quote.accepted_by_name ||
      (quote.client_data && (quote.client_data as Record<string, string>).name) ||
      'Client';
    const clientEmail: string =
      quote.accepted_by_email ||
      (quote.client_data && (quote.client_data as Record<string, string>).email) ||
      '';
    const jobTitle: string =
      (quote.job_details && (quote.job_details as Record<string, string>).title) ||
      `Quote ${quote.quote_number || ''}`.trim() ||
      'Electrical work';
    const jobLocation: string =
      (quote.job_details && (quote.job_details as Record<string, string>).location) || '';

    // Create calendar_events row for the sparky
    const { data: calEvent, error: calErr } = await supabase
      .from('calendar_events')
      .insert({
        user_id: hold.user_id,
        title: `${jobTitle} · ${clientName}`,
        description: `Booking from accepted quote ${quote.quote_number || ''}`.trim(),
        start_time: hold.slot_start,
        end_time: hold.slot_end,
        event_type: 'job',
        location: jobLocation,
        related_quote_id: quote.id,
      })
      .select('id')
      .single();

    if (calErr) {
      console.error('calendar_events insert failed:', calErr);
      // Roll back the hold confirmation so user can retry
      await supabase
        .from('calendar_slot_holds')
        .update({ confirmed_at: null })
        .eq('id', hold_id);
      throw calErr;
    }

    // Link quote → booking
    await supabase
      .from('quotes')
      .update({
        booked_slot_start: hold.slot_start,
        booked_slot_end: hold.slot_end,
        booking_calendar_event_id: calEvent.id,
      })
      .eq('id', quote.id);

    // Compose ICS file
    const icsContent = buildIcs({
      uid: `booking-${calEvent.id}@elec-mate.com`,
      start: new Date(hold.slot_start),
      end: new Date(hold.slot_end),
      summary: `${jobTitle} (booked via Elec-Mate)`,
      description: `Quote ${quote.quote_number || ''} — £${(quote.total || 0).toFixed(2)}`.trim(),
      location: jobLocation,
      organizerEmail: companyProfile?.company_email || undefined,
      attendeeEmail: clientEmail || undefined,
    });

    // Email confirmation to client (if email available) — best effort
    if (clientEmail) {
      try {
        const resendKey = Deno.env.get('RESEND_API_KEY');
        if (resendKey) {
          const fromName = companyProfile?.company_name || 'Elec-Mate';
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: `${fromName} <bookings@elec-mate.com>`,
              to: clientEmail,
              subject: `Booking confirmed — ${jobTitle}`,
              html: `<p>Hi ${clientName},</p><p>Your booking is confirmed for <strong>${new Date(hold.slot_start).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</strong>.</p><p>${jobTitle}${jobLocation ? ' · ' + jobLocation : ''}</p><p>A calendar invite is attached.</p>`,
              attachments: [
                {
                  filename: 'booking.ics',
                  content: btoa(icsContent),
                  content_type: 'text/calendar; charset=UTF-8; method=REQUEST',
                },
              ],
            }),
          });
        }
      } catch (emailErr) {
        console.error('Booking email failed (non-fatal):', emailErr);
      }
    }

    // Push notification to sparky
    try {
      await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: hold.user_id,
          title: '📅 New booking confirmed',
          body: `${clientName} booked ${new Date(hold.slot_start).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`,
          type: 'booking',
          data: {
            quoteId: quote.id,
            calendarEventId: calEvent.id,
            slotStart: hold.slot_start,
          },
        },
      });
    } catch (pushErr) {
      console.error('Push notification failed (non-fatal):', pushErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking_id: calEvent.id,
        slot_start: hold.slot_start,
        slot_end: hold.slot_end,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('marketplace-confirm-booking error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message || 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
