/**
 * ELE-1987 — Employer automations: the customer-facing sender.
 *
 * Never called by a browser. The 10-minute tick (run_employer_automations)
 * queues a run, waits at least two minutes, re-checks the rule is still on and
 * the firm has not paused automations, marks the run `sending`, and posts
 * { run_id } here with the service-role key.
 *
 * Three rules land here, each one switched on by the firm's owner or an admin:
 *   job_assigned_tell_customer   booking email naming who is coming, with .ics
 *   job_complete_review_request  one short "how did we do?" email
 *   invoice_unpaid_reminder      the gentle payment reminder (send-payment-reminder)
 *
 * Every path ends in automation_finish_run (done / skipped / failed), which
 * writes the run log, the audit log and, for a job, the job feed. A run that is
 * not `sending` is ignored, so a repeated post can never send twice.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { Resend, clientFacingSender, htmlToPlainText, isSendableEmail } from '../_shared/mailer.ts';
import { buildBookingConfirmationEmail } from '../_shared/email-templates/booking-confirmation.ts';
import { buildJobReviewRequestEmail } from '../_shared/email-templates/job-review-request.ts';
import { buildBookingIcs, bookingIcsFilename } from '../_shared/booking-ics.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { captureException } from '../_shared/sentry.ts';

type Outcome = { status: 'done' | 'skipped' | 'failed'; summary: string; detail?: Record<string, unknown> };

interface JobMessage {
  job_id: string;
  firm_id: string;
  title: string | null;
  client: string | null;
  client_email: string | null;
  location: string | null;
  business_name: string | null;
  crew: string[];
  event: {
    id: string;
    start_at: string;
    end_at: string;
    all_day: boolean;
    confirmation_sent_at: string | null;
  } | null;
  review: { links: Array<{ url: string; label?: string }>; message: string | null };
}

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const crewLine = (crew: string[]): string | null => {
  const names = (crew ?? []).filter(Boolean);
  if (!names.length) return null;
  const list =
    names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `${list} will be with you.`;
};

const ukDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'service') return deny(corsHeaders);

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  let runId: string | null = null;

  const finish = async (o: Outcome) => {
    if (!runId) return;
    const { error } = await admin.rpc('automation_finish_run', {
      p_run: runId,
      p_status: o.status,
      p_summary: o.summary,
      p_detail: o.detail ?? {},
    });
    if (error) console.error('[employer-automation-send] finish failed', error.message);
  };

  try {
    const body = (await req.json().catch(() => ({}))) as { run_id?: string };
    runId = typeof body.run_id === 'string' ? body.run_id : null;
    if (!runId) return json({ error: 'run_id is required' }, 400);

    const { data: run } = await admin
      .from('employer_automation_runs')
      .select('id, employer_id, rule_key, ref, job_id, status, detail, created_at')
      .eq('id', runId)
      .maybeSingle();
    // Only a run the tick has just handed over. Anything else is a repeat.
    if (!run || run.status !== 'sending') return json({ skipped: true, reason: 'not_sending' });

    // Belt and braces: the rule may have been switched off a moment ago.
    const [{ data: rule }, { data: settings }] = await Promise.all([
      admin
        .from('employer_automation_rules')
        .select('enabled')
        .eq('employer_id', run.employer_id)
        .eq('rule_key', run.rule_key)
        .maybeSingle(),
      admin
        .from('employer_automation_settings')
        .select('paused')
        .eq('employer_id', run.employer_id)
        .maybeSingle(),
    ]);
    if (!rule?.enabled || settings?.paused) {
      await finish({ status: 'skipped', summary: 'Not sent: the rule was turned off or paused before it ran.' });
      return json({ skipped: true });
    }

    let outcome: Outcome;
    if (run.rule_key === 'job_assigned_tell_customer') {
      outcome = await tellCustomer(admin, run);
    } else if (run.rule_key === 'job_complete_review_request') {
      outcome = await askForReview(admin, run);
    } else if (run.rule_key === 'invoice_unpaid_reminder') {
      outcome = await chaseInvoice(run);
    } else {
      outcome = { status: 'failed', summary: 'Did not run: this rule does not send email.' };
    }
    await finish(outcome);
    return json({ ok: true, status: outcome.status });
  } catch (err) {
    captureException(err, { functionName: 'employer-automation-send', extra: { runId } });
    await finish({
      status: 'failed',
      summary: 'Did not send: something went wrong. Nothing reached the customer.',
      detail: { error: err instanceof Error ? err.message.slice(0, 300) : 'unknown' },
    });
    return json({ error: 'failed' }, 500);
  }
});

// deno-lint-ignore no-explicit-any
type Admin = any;
// deno-lint-ignore no-explicit-any
type Run = any;

async function loadJob(admin: Admin, jobId: string | null): Promise<JobMessage | null> {
  if (!jobId) return null;
  const { data, error } = await admin.rpc('automation_job_message', { p_job: jobId });
  if (error || !data) return null;
  return data as JobMessage;
}

async function checkAddress(admin: Admin, raw: string | null): Promise<string | Outcome> {
  const to = (raw ?? '').trim().toLowerCase();
  if (!to) return { status: 'skipped', summary: 'Not sent: there is no customer email on the job.' };
  if (!isSendableEmail(to)) {
    return { status: 'skipped', summary: `Not sent: "${raw}" is not a valid email address. Fix it on the job.` };
  }
  if (await isSuppressed(admin, to)) {
    return {
      status: 'skipped',
      summary: 'Not sent: that address is on the do-not-send list (unsubscribed or bounced). Send a text instead.',
    };
  }
  return to;
}

async function company(admin: Admin, firmId: string) {
  const [{ data: cp }, { data: owner }] = await Promise.all([
    admin
      .from('company_profiles')
      .select('company_name, company_email, company_phone, company_website, logo_url, accent_color')
      .eq('user_id', firmId)
      .maybeSingle(),
    admin.auth.admin.getUserById(firmId),
  ]);
  return { cp, ownerEmail: (owner?.user?.email as string | undefined) ?? null };
}

async function tellCustomer(admin: Admin, run: Run): Promise<Outcome> {
  const m = await loadJob(admin, run.job_id);
  if (!m) return { status: 'skipped', summary: 'Not sent: the job no longer exists.' };
  if (!m.event) return { status: 'skipped', summary: 'Not sent: the job is no longer in the diary.' };
  if (new Date(m.event.start_at).getTime() < Date.now()) {
    return { status: 'skipped', summary: 'Not sent: the booking has already started.' };
  }
  // Someone told them by hand while the run waited.
  if (m.event.confirmation_sent_at && new Date(m.event.confirmation_sent_at) > new Date(run.created_at)) {
    return { status: 'skipped', summary: 'Not sent: the customer was told about this booking by hand already.' };
  }
  const to = await checkAddress(admin, m.client_email);
  if (typeof to !== 'string') return to;

  const { cp, ownerEmail } = await company(admin, m.firm_id);
  const companyName = cp?.company_name || m.business_name || 'Your electrician';
  const note = crewLine(m.crew);
  const title = m.title || 'Your booking';
  const icsFilename = bookingIcsFilename(title, m.event.start_at);
  const email = buildBookingConfirmationEmail({
    company: {
      name: companyName,
      logoUrl: cp?.logo_url ?? null,
      primaryColor: cp?.accent_color ?? null,
      email: cp?.company_email ?? null,
      phone: cp?.company_phone ?? null,
      website: cp?.company_website ?? null,
    },
    clientName: m.client || '',
    title,
    startIso: m.event.start_at,
    endIso: m.event.end_at,
    allDay: !!m.event.all_day,
    location: m.location,
    note,
    movedFrom: null,
    icsFilename,
  });
  const ics = buildBookingIcs({
    uid: `booking-${m.event.id}@elec-mate.com`,
    title,
    startIso: m.event.start_at,
    endIso: m.event.end_at,
    allDay: !!m.event.all_day,
    location: m.location,
    description: note,
    organiserName: companyName,
    sequence: Math.floor(Date.now() / 60_000),
  });
  const sender = clientFacingSender({ companyName, companyEmail: cp?.company_email ?? null, userEmail: ownerEmail });
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return { status: 'failed', summary: 'Not sent: email is not configured.' };
  const { error } = await new Resend(apiKey).emails.send({
    from: sender.from,
    replyTo: sender.replyTo,
    to,
    subject: email.subject,
    html: email.html,
    text: htmlToPlainText(email.html),
    attachments: [{ filename: icsFilename, content: btoa(unescape(encodeURIComponent(ics))) }],
    tags: [{ name: 'type', value: 'automation_booking_confirmation' }],
  });
  if (error) return { status: 'failed', summary: 'Not sent: the email provider refused it. Send it by text instead.', detail: { error: error.message } };

  // Same stamp the manual Send email button leaves, so nobody sends it twice.
  await admin
    .from('calendar_events')
    .update({ confirmation_sent_at: new Date().toISOString(), confirmation_sent_to: to })
    .eq('id', m.event.id)
    .eq('user_id', m.firm_id)
    .then(() => {}, () => {});

  return {
    status: 'done',
    summary:
      `Emailed ${m.client || 'the customer'} the booking for ${ukDate(m.event.start_at)}` +
      (m.crew?.length ? `, saying ${m.crew.join(' and ')} ${m.crew.length === 1 ? 'is' : 'are'} coming.` : '.'),
    detail: { to },
  };
}

/** L3: the hosts review-link allows (SQL _review_url_allowed), for any platform. */
function reviewUrlAllowed(raw: string): boolean {
  const url = raw.trim();
  if (/[\s\\]/.test(url)) return false;
  const m = /^https:\/\/([^/?#]+)/i.exec(url);
  if (!m) return false;
  const host = m[1].toLowerCase();
  if (/[@:]/.test(host)) return false;
  return (
    /^(([a-z0-9-]+\.)*google\.[a-z]{2,3}(\.[a-z]{2})?|g\.page|([a-z0-9-]+\.)*goo\.gl|g\.co)$/.test(host) ||
    /^([a-z0-9-]+\.)*(checkatrade|trustatrader)\.com$/.test(host) ||
    /^([a-z0-9-]+\.)*(facebook\.com|fb\.com|fb\.me)$/.test(host)
  );
}

async function askForReview(admin: Admin, run: Run): Promise<Outcome> {
  const m = await loadJob(admin, run.job_id);
  if (!m) return { status: 'skipped', summary: 'Not sent: the job no longer exists.' };
  // Gap #9: with "Review requests after payment" on, the customer is asked
  // once, after they pay, so this older on-completion rule stands aside.
  const { data: afterPayment } = await admin
    .from('employer_review_settings')
    .select('enabled')
    .eq('employer_id', m.firm_id)
    .maybeSingle();
  if (afterPayment?.enabled) {
    return {
      status: 'skipped',
      summary: 'Not sent: review requests after payment are on, so the customer is asked once they have paid.',
    };
  }
  // L3: the same safeguards as review requests after payment. https links on
  // the four review sites only, the CMA wording check, the customer's "do not
  // ask me again", and a stop link in the email.
  const links = (m.review?.links ?? []).filter((l) => l && reviewUrlAllowed(String(l.url ?? '')));
  if (!links.length) {
    return {
      status: 'skipped',
      summary:
        'Not sent: add a secure (https) Google, Checkatrade, TrustATrader or Facebook review link in Settings first.',
    };
  }
  if (m.review?.message) {
    const { data: problem } = await admin.rpc('_review_wording_problem', { p: m.review.message });
    if (typeof problem === 'string' && problem) {
      return { status: 'skipped', summary: `Not sent: ${problem}` };
    }
  }
  const to = await checkAddress(admin, m.client_email);
  if (typeof to !== 'string') return to;
  const [{ data: optedOut }, { data: msgOptOut }] = await Promise.all([
    admin
      .from('employer_review_opt_outs')
      .select('address')
      .eq('employer_id', m.firm_id)
      .eq('address', to)
      .maybeSingle(),
    admin
      .from('firm_message_opt_outs')
      .select('address')
      .eq('firm_id', m.firm_id)
      .eq('channel', 'email')
      .eq('address', to)
      .is('opted_back_in_at', null)
      .limit(1)
      .maybeSingle(),
  ]);
  if (optedOut || msgOptOut) {
    return { status: 'skipped', summary: 'Not sent: they asked not to be contacted about reviews.' };
  }
  const { data: stopToken, error: stopErr } = await admin.rpc('review_stop_token', {
    p_firm: m.firm_id,
    p_address: to,
    p_job: run.job_id,
  });
  if (stopErr || typeof stopToken !== 'string') {
    return { status: 'failed', summary: 'Not sent: could not make the stop link. Nothing reached the customer.' };
  }
  const stopUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/review-link?t=${stopToken}&a=stop`;

  const { cp, ownerEmail } = await company(admin, m.firm_id);
  const companyName = cp?.company_name || m.business_name || 'Your electrician';
  const email = buildJobReviewRequestEmail({
    company: {
      name: companyName,
      logoUrl: cp?.logo_url ?? null,
      primaryColor: cp?.accent_color ?? null,
      email: cp?.company_email ?? null,
      phone: cp?.company_phone ?? null,
      website: cp?.company_website ?? null,
    },
    clientName: m.client || '',
    jobTitle: m.title || 'your job',
    reviewLinks: links,
    reviewMessage: m.review?.message ?? null,
    stopUrl,
  });
  const sender = clientFacingSender({ companyName, companyEmail: cp?.company_email ?? null, userEmail: ownerEmail });
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return { status: 'failed', summary: 'Not sent: email is not configured.' };
  const { error } = await new Resend(apiKey).emails.send({
    from: sender.from,
    replyTo: sender.replyTo,
    to,
    subject: email.subject,
    html: email.html,
    text: htmlToPlainText(email.html),
    headers: {
      'List-Unsubscribe': `<${stopUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    tags: [{ name: 'type', value: 'automation_review_request' }],
  });
  if (error) return { status: 'failed', summary: 'Not sent: the email provider refused it.', detail: { error: error.message } };
  return { status: 'done', summary: `Asked ${m.client || 'the customer'} for a review by email.`, detail: { to } };
}

async function chaseInvoice(run: Run): Promise<Outcome> {
  const invoiceId = (run.detail?.invoice_id as string | undefined) ?? run.ref;
  // The existing reminder: it re-checks paid / cancelled / balance, chases the
  // BALANCE not the total, and records the reminder on the invoice.
  const res = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-payment-reminder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({ invoiceId, reminderType: 'gentle' }),
  });
  const out = await res.json().catch(() => ({}));
  if (res.ok) return { status: 'done', summary: run.summary.replace(/^Reminding/, 'Sent a polite reminder to') + '.' };
  const reason = typeof out?.error === 'string' ? out.error : `status ${res.status}`;
  if (res.status === 400 || res.status === 404) {
    return { status: 'skipped', summary: `Not sent: ${reason}.`, detail: { reason } };
  }
  return { status: 'failed', summary: 'Not sent: the reminder could not be sent. Try it by hand from the invoice.', detail: { reason } };
}
