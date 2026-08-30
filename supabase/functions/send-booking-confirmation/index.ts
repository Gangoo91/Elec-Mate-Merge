/**
 * Send a customer their booking, with a calendar file attached.
 *
 * The WhatsApp and SMS routes open the electrician's own app with the message
 * written and leave the sending to them. Email is the one channel the app can
 * genuinely send itself, and the only one that can carry an .ics — which is the
 * whole point: the customer taps the attachment and the job is in their diary,
 * rather than being retyped from a text and getting the day wrong.
 *
 * NOT automatic. Fired by the "Send email" button in TellCustomerSheet, one
 * booking at a time, by someone looking at the message.
 *
 * Despite the `Resend` symbol, `_shared/mailer.ts` is a Brevo-backed shim
 * (ELE-765 — Resend banned the domain at domain level after a bulk send). Every
 * send here goes out through Brevo.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildBookingConfirmationEmail } from '../_shared/email-templates/booking-confirmation.ts';
import { buildBookingIcs, bookingIcsFilename } from '../_shared/booking-ics.ts';
import { captureException } from '../_shared/sentry.ts';

interface Body {
  eventId: string;
  /** Present when the booking moved — switches the email to "was / now". */
  movedFrom?: { startIso: string; endIso: string; allDay: boolean } | null;
}

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return json({ error: 'Not authenticated' }, 401);

    const body = (await req.json()) as Body;
    if (!body?.eventId) return json({ error: 'eventId is required' }, 400);

    /*
     * Scoped to the caller.
     *
     * `eventId` arrives from the client and must never be trusted to belong to
     * whoever sent it — without the user_id predicate, any valid event id would
     * let one electrician email another's customer.
     */
    const { data: event, error: eventError } = await supabase
      .from('calendar_events')
      .select(
        'id, user_id, title, description, start_at, end_at, all_day, location, client_id, updated_at, parent_event_id'
      )
      .eq('id', body.eventId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (eventError) throw eventError;
    if (!event) return json({ error: 'Booking not found' }, 404);
    if (!event.client_id) return json({ error: 'That booking has no customer on it' }, 400);

    /*
     * ELE-1648 — every day of the job, not just the one that was clicked.
     *
     * A job split across non-contiguous days is stored as one row per day, the
     * earliest anchoring the rest via `parent_event_id` (see splitJob.ts).
     * Loading only the row we were handed would email the customer about
     * Monday and say nothing about Wednesday and Friday — and attach an .ics
     * that blocks Monday alone.
     *
     * Resolved from the ANCHOR so this is correct whichever day-entry the send
     * was triggered from. Still filtered by user_id: an id from the client is
     * never trusted to belong to whoever sent it.
     */
    const anchorId = (event as { parent_event_id?: string | null }).parent_event_id ?? event.id;
    const { data: siblingRows } = await supabase
      .from('calendar_events')
      .select('id, start_at, end_at, all_day')
      .eq('user_id', user.id)
      .or(`id.eq.${anchorId},parent_event_id.eq.${anchorId}`)
      .neq('sync_status', 'pending_delete')
      .order('start_at', { ascending: true });

    const jobDays = (siblingRows ?? []) as Array<{
      id: string;
      start_at: string;
      end_at: string;
      all_day: boolean;
    }>;
    const isSplitJob = jobDays.length > 1;

    const { data: customer } = await supabase
      .from('customers')
      .select('id, name, email')
      .eq('id', event.client_id)
      .eq('user_id', user.id)
      .maybeSingle();

    const to = (customer?.email ?? '').trim().toLowerCase();
    if (!to) return json({ error: 'That customer has no email address on file' }, 400);

    /*
     * Suppression list.
     *
     * Read whole and compared lower-cased rather than filtered with `.in()`,
     * which is case-SENSITIVE — a stored `Foo@Bar.com` would never match a
     * queued `foo@bar.com` and the suppression would silently do nothing. Same
     * reasoning as winback-send.
     *
     * A booking confirmation is transactional and someone who asked to be
     * booked in plainly wants it, but an address on this list is often on it
     * because it hard-bounced. Sending anyway would damage the sending domain
     * for everybody, so the caller is told to use WhatsApp or a text instead.
     */
    const { data: suppressedRows } = await supabase
      .from('email_suppressions')
      .select('email')
      .range(0, 49999);
    const suppressed = new Set(
      (suppressedRows ?? []).map((s) => (s.email || '').trim().toLowerCase()).filter(Boolean)
    );
    if (suppressed.has(to)) {
      return json(
        {
          error:
            'That address is on the do-not-send list — it has unsubscribed or previously bounced. Send them a text or a WhatsApp instead.',
          suppressed: true,
        },
        409
      );
    }

    const { data: company } = await supabase
      .from('company_profiles')
      .select(
        'company_name, company_email, company_phone, company_website, logo_url, accent_color'
      )
      .eq('user_id', user.id)
      .maybeSingle();

    /*
     * `profiles` has NO email column — only `full_name`.
     *
     * Selecting one would throw and take the whole send down. The electrician's
     * address comes off the auth user, which is where it actually lives.
     */
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    const companyName = company?.company_name || profile?.full_name || 'Your electrician';

    const icsFilename = bookingIcsFilename(event.title, event.start_at);

    const email = buildBookingConfirmationEmail({
      company: {
        name: companyName,
        logoUrl: company?.logo_url ?? null,
        primaryColor: company?.accent_color ?? null,
        email: company?.company_email ?? null,
        phone: company?.company_phone ?? null,
        website: company?.company_website ?? null,
      },
      clientName: customer?.name || '',
      title: event.title,
      startIso: event.start_at,
      endIso: event.end_at,
      allDay: !!event.all_day,
      location: event.location,
      note: event.description,
      movedFrom: body.movedFrom ?? null,
      icsFilename,
      // ELE-1648 — one message naming every day, never one email per day.
      jobDayIsos: isSplitJob ? jobDays.map((d) => d.start_at) : undefined,
    });

    const ics = buildBookingIcs({
      // The event id IS the UID, so a reschedule updates the customer's diary
      // entry instead of adding a second one.
      uid: `booking-${event.id}@elec-mate.com`,
      title: event.title,
      startIso: event.start_at,
      endIso: event.end_at,
      allDay: !!event.all_day,
      // One VEVENT per day, so the customer's diary blocks Mon/Wed/Fri rather
      // than Monday only — or the whole week including days we are elsewhere.
      days: isSplitJob
        ? jobDays.map((d) => ({
            uid: `booking-${d.id}@elec-mate.com`,
            startIso: d.start_at,
            endIso: d.end_at,
          }))
        : undefined,
      location: event.location,
      description: event.description,
      organiserName: companyName,
      /*
       * Derived from `updated_at`, not from "is this a reschedule".
       *
       * It was `movedFrom ? 1 : 0`, which is the same value for the second
       * reschedule as for the first — and a calendar client ignores an update
       * whose SEQUENCE has not increased. Move a job twice and the customer's
       * diary would silently keep the first new time.
       *
       * Minutes since the epoch: monotonic, increases on every save, and about
       * 29 million today so there is no danger of overflowing the 32-bit
       * integer RFC 5545 expects.
       */
      sequence: Math.floor(new Date(event.updated_at ?? Date.now()).getTime() / 60_000),
    });

    /*
     * Replies go to the electrician, not to us.
     *
     * The email says "just reply and we will sort another time", and that has
     * to be true — a confirmation the customer cannot answer is how a
     * reschedule request gets lost.
     */
    const sender = clientFacingSender({
      companyName,
      companyEmail: company?.company_email ?? null,
      userEmail: user.email ?? null,
    });

    /*
     * Still `RESEND_API_KEY`, and it holds the BREVO key.
     *
     * The shim kept the old variable name so the 37 call sites migrated in
     * ELE-765 did not each need a secret rotating. Renaming it here would just
     * read an unset variable.
     */
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) return json({ error: 'Email is not configured' }, 500);
    const resend = new Resend(apiKey);
    const { data: sent, error: sendError } = await resend.emails.send({
      from: sender.from,
      replyTo: sender.replyTo,
      to,
      subject: email.subject,
      html: email.html,
      text: htmlToPlainText(email.html),
      attachments: [
        {
          filename: icsFilename,
          content: btoa(unescape(encodeURIComponent(ics))),
        },
      ],
      tags: [{ name: 'type', value: 'booking_confirmation' }],
    });

    if (sendError) throw new Error(sendError.message);

    /*
     * Stamped only after a successful send, and non-fatally.
     *
     * The email has already gone by this point — failing the request because
     * the bookkeeping did not stick would have the electrician send a second
     * one. Better to under-record than to double-send.
     */
    try {
      await supabase
        .from('calendar_events')
        .update({ confirmation_sent_at: new Date().toISOString(), confirmation_sent_to: to })
        .eq('id', event.id)
        .eq('user_id', user.id);
    } catch (stampErr) {
      console.warn('confirmation stamp failed (non-fatal):', stampErr);
    }

    return json({ sent: true, to, id: sent?.id ?? null, moved: !!body.movedFrom });
  } catch (err) {
    await captureException(err, {
      functionName: 'send-booking-confirmation',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('send-booking-confirmation error:', err);
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500);
  }
});
