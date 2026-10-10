/**
 * ELE-2065 / ELE-2073 — the firm's chasing schedule: the customer-facing sender.
 *
 * Never called by a browser. The 30-minute tick (run_firm_money_chase) claims a
 * run in employer_automation_runs (unique per firm / rule / invoice:step, so a
 * step can never send twice), marks it `sending` and posts { run_id } here with
 * the service-role key.
 *
 *   invoice_chase   → the existing send-payment-reminder (it re-checks paid /
 *                     cancelled / balance and records the reminder on the
 *                     invoice), with the owner's wording when they wrote some.
 *   quote_followup  → a quote follow-up email (the shared quote-reminder
 *                     template, or the owner's wording), recorded on the quote
 *                     the same way quote-automated-followup does.
 *
 * firm_chase_run_check re-checks everything first (schedule still on, not
 * paused, not paid, not disputed, no promise to pay, customer not paused, quote
 * still unanswered). Every path ends in automation_finish_run, which only acts
 * on a `sending` run, so a repeated post is harmless.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { Resend, clientFacingSender, htmlToPlainText, isSendableEmail } from '../_shared/mailer.ts';
import { buildQuoteReminderEmail } from '../_shared/email-templates/quote-reminder.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { captureException } from '../_shared/sentry.ts';

type Outcome = {
  status: 'done' | 'skipped' | 'failed';
  summary: string;
  detail?: Record<string, unknown>;
};

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'service') return deny(corsHeaders);

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  let runId: string | null = null;

  const finish = async (o: Outcome) => {
    if (!runId) return;
    const { error } = await admin.rpc('automation_finish_run', {
      p_run: runId,
      p_status: o.status,
      p_summary: o.summary,
      p_detail: o.detail ?? {},
    });
    if (error) console.error('[firm-chase-send] finish failed', error.message);
  };

  try {
    const body = (await req.json().catch(() => ({}))) as { run_id?: string };
    runId = typeof body.run_id === 'string' ? body.run_id : null;
    if (!runId) return json({ error: 'run_id is required' }, 400);

    const { data: run } = await admin
      .from('employer_automation_runs')
      .select('id, employer_id, rule_key, ref, status, summary, detail, created_at')
      .eq('id', runId)
      .maybeSingle();
    if (!run || run.status !== 'sending') return json({ skipped: true, reason: 'not_sending' });

    const { data: reason, error: checkErr } = await admin.rpc('firm_chase_run_check', {
      p_run: runId,
    });
    if (checkErr) throw new Error(checkErr.message);
    if (reason === 'not_sending') return json({ skipped: true, reason });
    if (typeof reason === 'string' && reason) {
      await finish({ status: 'skipped', summary: reason });
      return json({ skipped: true, reason });
    }

    let outcome: Outcome;
    if (run.rule_key === 'invoice_chase') outcome = await chaseInvoice(run);
    else if (run.rule_key === 'quote_followup') outcome = await followUpQuote(admin, run);
    else outcome = { status: 'failed', summary: 'Did not run: this is not a chase.' };

    await finish(outcome);
    return json({ ok: true, status: outcome.status });
  } catch (err) {
    captureException(err, { functionName: 'firm-chase-send', extra: { runId } });
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

async function chaseInvoice(run: Run): Promise<Outcome> {
  const d = (run.detail ?? {}) as {
    invoice_id?: string;
    tone?: string;
    subject?: string | null;
    body?: string | null;
  };
  const invoiceId = d.invoice_id ?? String(run.ref).split(':')[0];
  const tone = d.tone === 'firm' || d.tone === 'final' ? d.tone : 'gentle';
  const res = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-payment-reminder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
    },
    body: JSON.stringify({
      invoiceId,
      reminderType: tone,
      // The owner's own wording (already filled in by the tick), else the
      // branded template for the tone.
      ...(d.body ? { customSubject: d.subject ?? undefined, customBody: d.body } : {}),
    }),
  });
  const out = await res.json().catch(() => ({}));
  const label = String(run.summary || '').replace(/^Chasing/, 'Chased');
  if (res.ok) {
    return {
      status: 'done',
      summary: `${label} by email (${tone === 'gentle' ? 'polite' : tone === 'firm' ? 'firm' : 'final'} reminder).`,
    };
  }
  const reason = typeof out?.error === 'string' ? out.error : `status ${res.status}`;
  if (res.status === 400 || res.status === 404) {
    return { status: 'skipped', summary: `Not sent: ${reason}.`, detail: { reason } };
  }
  return {
    status: 'failed',
    summary: 'Not sent: the reminder could not be sent. Try it by hand from Who owes me.',
    detail: { reason },
  };
}

async function followUpQuote(admin: Admin, run: Run): Promise<Outcome> {
  const d = (run.detail ?? {}) as {
    quote_id?: string;
    subject?: string | null;
    body?: string | null;
  };
  const { data: q } = await admin
    .from('quotes')
    .select(
      'id, user_id, quote_number, client_data, total, expiry_date, public_token, reminder_count, job_details'
    )
    .eq('id', d.quote_id)
    .maybeSingle();
  if (!q) return { status: 'skipped', summary: 'Not sent: the quote no longer exists.' };

  const client =
    (typeof q.client_data === 'string' ? JSON.parse(q.client_data) : q.client_data) ?? {};
  const to = String(client.email ?? '')
    .trim()
    .toLowerCase();
  if (!to || !isSendableEmail(to)) {
    return { status: 'skipped', summary: 'Not sent: the quote has no valid customer email.' };
  }
  if (await isSuppressed(admin, to)) {
    return {
      status: 'skipped',
      summary: 'Not sent: that address is on the do-not-send list (unsubscribed or bounced).',
    };
  }
  if (!q.public_token)
    return { status: 'skipped', summary: 'Not sent: the quote has no customer link yet.' };

  const [{ data: cp }, { data: owner }] = await Promise.all([
    admin
      .from('company_profiles')
      .select(
        'company_name, company_email, company_phone, company_website, company_address, logo_url, logo_data_url, primary_color, vat_number, company_registration'
      )
      .eq('user_id', q.user_id)
      .maybeSingle(),
    admin.auth.admin.getUserById(q.user_id),
  ]);
  const companyName = cp?.company_name || 'Your electrician';
  const acceptUrl = `https://www.elec-mate.com/quote/${q.public_token}#accept`;
  const reminderCount = Number(q.reminder_count) || 0;

  let subject: string;
  let html: string;
  if (d.body) {
    const fill = (s: string) =>
      s
        .replace(/\{customer\}/g, client.name || 'there')
        .replace(/\{quote\}/g, q.quote_number || '')
        .replace(/\{amount\}/g, gbp(Number(q.total) || 0))
        .replace(/\{company\}/g, companyName)
        .replace(/\{link\}/g, acceptUrl);
    subject = fill(d.subject || 'Your quote {quote} from {company}');
    const text = fill(d.body);
    html = `<div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px;">${escapeHtml(
      text
    ).replace(/\n/g, '<br>')}${
      text.includes(acceptUrl)
        ? ''
        : `<p style="margin-top:24px;"><a href="${escapeHtml(acceptUrl)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">View and accept the quote</a></p>`
    }</div>`;
  } else {
    const email = buildQuoteReminderEmail({
      company: {
        name: companyName,
        logoUrl: cp?.logo_url || cp?.logo_data_url || null,
        primaryColor: cp?.primary_color || null,
        email: cp?.company_email || null,
        phone: cp?.company_phone || null,
        website: cp?.company_website || null,
        address: cp?.company_address || null,
        vatNumber: cp?.vat_number || null,
        registrationNumber: cp?.company_registration || null,
      },
      clientName: client.name || 'there',
      quoteNumber: q.quote_number,
      total: Number(q.total) || 0,
      expiryDate: q.expiry_date,
      acceptUrl,
      tone: reminderCount >= 1 ? 'firm' : 'gentle',
      jobTitle: q.job_details?.title ?? null,
    });
    subject = email.subject;
    html = email.html;
  }

  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return { status: 'failed', summary: 'Not sent: email is not configured.' };
  const sender = clientFacingSender({
    companyName,
    companyEmail: cp?.company_email ?? null,
    userEmail: (owner?.user?.email as string | undefined) ?? null,
  });
  const { error } = await new Resend(apiKey).emails.send({
    from: sender.from,
    replyTo: sender.replyTo,
    to,
    subject,
    html,
    text: htmlToPlainText(html),
    tags: [{ name: 'type', value: 'firm_quote_followup' }],
    log: { template: 'quote_followup', entityId: q.id, userId: q.user_id },
  });
  if (error) {
    return {
      status: 'failed',
      summary: 'Not sent: the email provider refused it.',
      detail: { error: error.message },
    };
  }

  // Same record the built-in follow-up leaves, so the quote shows it was chased.
  await admin
    .from('quotes')
    .update({ reminder_count: reminderCount + 1, last_reminder_sent_at: new Date().toISOString() })
    .eq('id', q.id);
  await admin
    .from('quote_email_events')
    .insert({
      quote_id: q.id,
      event_type: 'sent',
      event_data: { type: 'firm_followup', reminder_number: reminderCount + 1, run_id: run.id },
    })
    .then(
      () => {},
      () => {}
    );

  return {
    status: 'done',
    summary: `Followed up quote ${q.quote_number || ''} with ${client.name || 'the customer'} by email.`,
    detail: { to },
  };
}
