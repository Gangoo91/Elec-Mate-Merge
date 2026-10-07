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
import {
  Resend,
  clientFacingSender,
  htmlToPlainText,
  isSendableEmail,
} from '../_shared/mailer.ts';
import { buildBookingConfirmationEmail } from '../_shared/email-templates/booking-confirmation.ts';
import { buildBookingIcs, bookingIcsFilename } from '../_shared/booking-ics.ts';
import { captureException } from '../_shared/sentry.ts';
import { isSuppressed } from '../_shared/suppressions.ts';

interface Body {
  eventId?: string;
  /**
   * ELE-1822 — a FIRM job (employer_jobs) instead of a personal booking. The
   * caller may be the owner or any manager acting for the firm; the database
   * decides (get_firm_job_message is firm-scoped), and the email goes to the
   * job's own customer address, sent as the firm.
   */
  jobId?: string;
  /** Present when the booking moved — switches the email to "was / now". */
  movedFrom?: { startIso: string; endIso: string; allDay: boolean } | null;
  /**
   * Email them again the evening before. Stamped on the booking with the
   * confirmation so `send-booking-reminders` knows which bookings asked for it.
   */
  remindDayBefore?: boolean;
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
    if (body?.jobId) return await sendForFirmJob(supabase, body, user.email ?? null);
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
        'id, user_id, title, description, start_at, end_at, all_day, location, client_id, project_id, updated_at, parent_event_id'
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
     * Check the address is sendable BEFORE handing it to Brevo.
     *
     * Nothing validates the email on a customer record, so a typo ("j.smith@",
     * a stray space, a name typed into the wrong field) reached the provider
     * and came back as `Brevo (400): email is not valid in to`. That threw,
     * which meant the electrician saw a generic send failure with no idea which
     * field was wrong, and Sentry logged it as a server error when it is a data
     * entry problem (JAVASCRIPT-REACT-H0).
     *
     * `isSendableEmail` is the mailer's own check, imported rather than
     * re-written, so this can never drift from what the shim will actually
     * accept. The shim rejects these too; catching it here is what turns
     * "something went wrong" into a message naming the record to fix.
     */
    if (!isSendableEmail(to)) {
      return json(
        {
          error: `"${customer?.email}" is not a valid email address. Update it on the customer's record and try again.`,
        },
        400
      );
    }

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
    // 🔴 Read as the SERVER. This client is the signed-in electrician, who (rightly)
    // can't read the do-not-send list, so the check used to see an empty list and
    // never blocked anyone. Proved live 7 Oct with a suppressed test address.
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    if (await isSuppressed(admin, to)) {
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

    /*
     * ELE-1755 — the customer sees the JOB's name, not the office's reference.
     *
     * Bookings that sync in from Google are titled however the office types
     * them ("ACT-050947-SC544 - PC-BB7 9JT"). Once the electrician has started
     * that booking as a job he has given it a title fit for a customer
     * ("Zappi install"), and that is what should head the email and the
     * calendar file. The booking's own title stays as the office wrote it.
     */
    let bookingTitle = event.title;
    if (event.project_id) {
      const { data: job } = await supabase
        .from('spark_projects')
        .select('title')
        .eq('id', event.project_id)
        .eq('user_id', user.id)
        .maybeSingle();
      const jobTitle = (job?.title ?? '').trim();
      if (jobTitle) bookingTitle = jobTitle;
    }

    const icsFilename = bookingIcsFilename(bookingTitle, event.start_at);

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
      title: bookingTitle,
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
      title: bookingTitle,
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
        .update({
          confirmation_sent_at: new Date().toISOString(),
          confirmation_sent_to: to,
          // Only when the sheet offered the switch. A "moved" email sends no
          // choice, and must not turn off a reminder that was asked for.
          ...(typeof body.remindDayBefore === 'boolean'
            ? { customer_reminder_opt_in: body.remindDayBefore }
            : {}),
          // A booking that moved needs reminding again about its NEW date.
          ...(body.movedFrom ? { customer_reminder_sent_at: null } : {}),
        })
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

/* ── ELE-1822: a firm job ────────────────────────────────────────────────── */

interface FirmJobMessage {
  job_id: string;
  firm_id: string;
  title: string;
  client: string | null;
  client_email: string | null;
  location: string | null;
  crew: string[];
  business_name: string | null;
  event: { id: string; start_at: string; end_at: string; all_day: boolean } | null;
}

/** "Dan and Priya will be with you." — the people, not the firm's diary notes. */
function crewLine(crew: string[]): string | null {
  const names = crew.filter(Boolean);
  if (!names.length) return null;
  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `${list} will be with you.`;
}

// deno-lint-ignore no-explicit-any
async function sendForFirmJob(userClient: any, body: Body, callerEmail: string | null): Promise<Response> {
  const { data, error } = await userClient.rpc('get_firm_job_message', { p_job: body.jobId });
  if (error || !data) return json({ error: 'Job not found' }, 404);
  const m = data as FirmJobMessage;
  if (!m.event) {
    return json(
      { error: 'Put the job in the diary first: give it a date and set it to Confirmed or Scheduled.' },
      400
    );
  }
  const to = (m.client_email ?? '').trim().toLowerCase();
  if (!to) return json({ error: 'This job has no customer email. Add it on the job and try again.' }, 400);
  if (!isSendableEmail(to)) {
    return json({ error: `"${m.client_email}" is not a valid email address. Fix it on the job and try again.` }, 400);
  }

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  if (await isSuppressed(admin, to)) {
    return json(
      {
        error:
          'That address is on the do-not-send list — it has unsubscribed or previously bounced. Send them a text or a WhatsApp instead.',
        suppressed: true,
      },
      409
    );
  }

  const [{ data: company }, { data: owner }] = await Promise.all([
    admin
      .from('company_profiles')
      .select('company_name, company_email, company_phone, company_website, logo_url, accent_color')
      .eq('user_id', m.firm_id)
      .maybeSingle(),
    admin.auth.admin.getUserById(m.firm_id),
  ]);
  const companyName = company?.company_name || m.business_name || 'Your electrician';
  const icsFilename = bookingIcsFilename(m.title, m.event.start_at);

  const email = buildBookingConfirmationEmail({
    company: {
      name: companyName,
      logoUrl: company?.logo_url ?? null,
      primaryColor: company?.accent_color ?? null,
      email: company?.company_email ?? null,
      phone: company?.company_phone ?? null,
      website: company?.company_website ?? null,
    },
    clientName: m.client || '',
    title: m.title,
    startIso: m.event.start_at,
    endIso: m.event.end_at,
    allDay: !!m.event.all_day,
    location: m.location,
    note: crewLine(m.crew),
    movedFrom: body.movedFrom ?? null,
    icsFilename,
  });
  const ics = buildBookingIcs({
    uid: `booking-${m.event.id}@elec-mate.com`,
    title: m.title,
    startIso: m.event.start_at,
    endIso: m.event.end_at,
    allDay: !!m.event.all_day,
    location: m.location,
    description: crewLine(m.crew),
    organiserName: companyName,
    sequence: Math.floor(Date.now() / 60_000),
  });
  const sender = clientFacingSender({
    companyName,
    companyEmail: company?.company_email ?? null,
    userEmail: owner?.user?.email ?? callerEmail,
  });

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
    attachments: [{ filename: icsFilename, content: btoa(unescape(encodeURIComponent(ics))) }],
    tags: [{ name: 'type', value: 'booking_confirmation' }],
  });
  if (sendError) throw new Error(sendError.message);

  // Bookkeeping after the send, never fatal: better to under-record than to double-send.
  try {
    await admin
      .from('calendar_events')
      .update({
        confirmation_sent_at: new Date().toISOString(),
        confirmation_sent_to: to,
        ...(typeof body.remindDayBefore === 'boolean' ? { customer_reminder_opt_in: body.remindDayBefore } : {}),
        ...(body.movedFrom ? { customer_reminder_sent_at: null } : {}),
      })
      .eq('id', m.event.id)
      .eq('user_id', m.firm_id);
    await userClient.rpc('log_customer_contact', {
      p_job: m.job_id,
      p_kind: 'confirmation',
      p_channel: 'email',
      p_text: body.remindDayBefore ? `Sent to ${to}, with a reminder the evening before` : `Sent to ${to}`,
    });
  } catch (stampErr) {
    console.warn('firm confirmation stamp failed (non-fatal):', stampErr);
  }
  return json({ sent: true, to, id: sent?.id ?? null, moved: !!body.movedFrom });
}
