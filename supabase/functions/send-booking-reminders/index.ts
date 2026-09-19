/**
 * The evening-before reminder to the customer.
 *
 * Runs once a day from pg_cron (18:00 UK). Finds tomorrow's bookings whose
 * electrician asked for a reminder when they emailed the confirmation
 * (`customer_reminder_opt_in`, set by send-booking-confirmation), and emails
 * each customer once — same branded template, "we're with you tomorrow".
 *
 * Opt-in per booking, never a default: nothing here can email a customer the
 * electrician did not already choose to email. Email only, because it is the
 * one channel the app sends itself; WhatsApp and text leave the phone by hand.
 *
 * Service-role only. The cron passes the service key; a user token is refused.
 * Every row is touched with an explicit user_id so a bug here could only ever
 * affect the booking it is looking at.
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
import { captureException } from '../_shared/sentry.ts';

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

/** Minutes east of UTC that Europe/London is at the given instant. */
function londonOffsetMinutes(at: number): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    timeZoneName: 'longOffset',
  }).formatToParts(new Date(at));
  const name = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const m = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!m) return 0;
  const sign = m[1] === '-' ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3]));
}

/** The London calendar date (y, m0, d) of an instant. */
function londonYmd(at: number): [number, number, number] {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(at));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return [get('year'), get('month') - 1, get('day')];
}

/** The instant London's local midnight falls on for a given London date. */
function londonMidnight(y: number, m0: number, d: number): Date {
  // Midday's offset is safe on DST-change days; midnight's is the one that moves.
  const offset = londonOffsetMinutes(Date.UTC(y, m0, d, 12));
  return new Date(Date.UTC(y, m0, d) - offset * 60_000);
}

interface DueRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  all_day: boolean;
  location: string | null;
  client_id: string;
  project_id: string | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const auth = req.headers.get('Authorization') ?? '';
  if (!serviceKey || auth !== `Bearer ${serviceKey}`) {
    return json({ error: 'Not authorised' }, 401);
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey);
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return json({ error: 'Email is not configured' }, 500);
  const resend = new Resend(apiKey);

  try {
    // Tomorrow, London time, whole day.
    const [y, m0, d] = londonYmd(Date.now());
    const from = londonMidnight(y, m0, d + 1);
    const to = londonMidnight(y, m0, d + 2);

    const { data: due, error: dueError } = await supabase
      .from('calendar_events')
      .select(
        'id, user_id, title, description, start_at, end_at, all_day, location, client_id, project_id'
      )
      .eq('customer_reminder_opt_in', true)
      .is('customer_reminder_sent_at', null)
      .not('client_id', 'is', null)
      .is('parent_event_id', null)
      .neq('sync_status', 'pending_delete')
      .gte('start_at', from.toISOString())
      .lt('start_at', to.toISOString())
      .order('start_at', { ascending: true })
      .limit(200);
    if (dueError) throw dueError;

    const rows = (due ?? []) as DueRow[];
    const { data: suppressedRows } = await supabase
      .from('email_suppressions')
      .select('email')
      .range(0, 49999);
    const suppressed = new Set(
      (suppressedRows ?? []).map((s) => (s.email || '').trim().toLowerCase()).filter(Boolean)
    );

    let sent = 0;
    let skipped = 0;
    const failures: Array<{ id: string; reason: string }> = [];

    for (const event of rows) {
      try {
        const { data: customer } = await supabase
          .from('customers')
          .select('id, name, email')
          .eq('id', event.client_id)
          .eq('user_id', event.user_id)
          .maybeSingle();
        const to = (customer?.email ?? '').trim().toLowerCase();
        if (!to || !isSendableEmail(to) || suppressed.has(to)) {
          // Not an error, and not a send: the opt-in is cleared so it is not
          // retried every evening, and nothing claims "Reminded" on the sheet.
          skipped++;
          await supabase
            .from('calendar_events')
            .update({ customer_reminder_opt_in: false })
            .eq('id', event.id)
            .eq('user_id', event.user_id);
          continue;
        }

        const [{ data: company }, { data: profile }, { data: owner }] = await Promise.all([
          supabase
            .from('company_profiles')
            .select('company_name, company_email, company_phone, company_website, logo_url, accent_color')
            .eq('user_id', event.user_id)
            .maybeSingle(),
          supabase.from('profiles').select('full_name').eq('id', event.user_id).maybeSingle(),
          supabase.auth.admin.getUserById(event.user_id),
        ]);

        // Same rule as the confirmation: the customer sees the job's name.
        let title = event.title;
        if (event.project_id) {
          const { data: job } = await supabase
            .from('spark_projects')
            .select('title')
            .eq('id', event.project_id)
            .eq('user_id', event.user_id)
            .maybeSingle();
          const jobTitle = (job?.title ?? '').trim();
          if (jobTitle) title = jobTitle;
        }

        const companyName = company?.company_name || profile?.full_name || 'Your electrician';
        const email = buildBookingConfirmationEmail({
          variant: 'reminder',
          company: {
            name: companyName,
            logoUrl: company?.logo_url ?? null,
            primaryColor: company?.accent_color ?? null,
            email: company?.company_email ?? null,
            phone: company?.company_phone ?? null,
            website: company?.company_website ?? null,
          },
          clientName: customer?.name || '',
          title,
          startIso: event.start_at,
          endIso: event.end_at,
          allDay: !!event.all_day,
          location: event.location,
          note: event.description,
        });

        const sender = clientFacingSender({
          companyName,
          companyEmail: company?.company_email ?? null,
          userEmail: owner?.user?.email ?? null,
        });

        const { error: sendError } = await resend.emails.send({
          from: sender.from,
          replyTo: sender.replyTo,
          to,
          subject: email.subject,
          html: email.html,
          text: htmlToPlainText(email.html),
          tags: [{ name: 'type', value: 'booking_reminder' }],
        });
        if (sendError) throw new Error(sendError.message);

        await supabase
          .from('calendar_events')
          .update({ customer_reminder_sent_at: new Date().toISOString() })
          .eq('id', event.id)
          .eq('user_id', event.user_id);
        sent++;
      } catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        failures.push({ id: event.id, reason });
        console.error(`booking reminder failed for ${event.id}:`, reason);
      }
    }

    return json({
      window: { from: from.toISOString(), to: to.toISOString() },
      due: rows.length,
      sent,
      skipped,
      failures,
    });
  } catch (e) {
    await captureException(e, { functionName: 'send-booking-reminders' });
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500);
  }
});
