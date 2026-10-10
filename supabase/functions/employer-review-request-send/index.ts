/**
 * Gap #9 — review requests after payment: the sender.
 *
 *   POST { request_id }     Authorization: the service-role key (pg_cron only)
 *
 * Never called by a browser. run_review_requests (every 10 minutes) has
 * already decided the request may go: the firm has it on, the invoice is paid
 * and not imported, the customer has not been asked inside the firm's period
 * and has not opted out. It marks the row `sending` and posts its id here.
 *
 * This function re-reads the row (anything not `sending` is a repeat and is
 * ignored, so a second post can never send twice), checks the do-not-send
 * list again, sends ONE email or text, and records the outcome with
 * finish_review_request (which also writes the audit log and the job feed).
 *
 * Texts go through the customer inbox (review_record_sms), so they appear in
 * the customer's thread and count against the allowance. While a firm's
 * provider is the sandbox, run_review_requests never picks text.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import {
  clientFacingSender,
  htmlToPlainText,
  isSendableEmail,
  sendEmail,
} from '../_shared/mailer.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { adapterFor } from '../_shared/messaging/adapters.ts';
import { buildReviewRequestEmail } from '../_shared/email-templates/review-request-after-payment.ts';
import { captureException } from '../_shared/sentry.ts';

type Status = 'sent' | 'skipped' | 'failed';

interface ReviewMessage {
  id: string;
  employer_id: string;
  token: string;
  channel: 'email' | 'sms';
  to: string | null;
  job_id: string | null;
  job_title: string | null;
  client_name: string | null;
  first_name: string | null;
  paragraph: string;
  sms_body: string;
  links: Array<{ key: string; label: string; url: string }>;
  company: {
    name: string;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    logo_url: string | null;
    color: string | null;
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'service') return deny(corsHeaders);

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const admin = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });

  let id: string | null = null;
  const finish = async (status: Status, summary: string, detail: Record<string, unknown> = {}) => {
    if (!id) return;
    const { error } = await admin.rpc('finish_review_request', {
      p_id: id,
      p_status: status,
      p_summary: summary,
      p_detail: detail,
    });
    if (error) console.error('[employer-review-request-send] finish failed', error.message);
  };

  try {
    const body = (await req.json().catch(() => ({}))) as { request_id?: string };
    id = typeof body.request_id === 'string' && UUID.test(body.request_id) ? body.request_id : null;
    if (!id) return json({ error: 'request_id is required' }, 400);

    const { data, error } = await admin.rpc('review_request_message', { p_id: id });
    if (error) throw new Error(error.message);
    // Only a row the tick has just handed over. Anything else is a repeat.
    if (!data) return json({ skipped: true, reason: 'not_sending' });
    const m = data as ReviewMessage;

    const who = m.client_name?.trim() || 'the customer';
    const links = (m.links ?? []).filter((l) => /^https:\/\//i.test(l.url ?? ''));
    if (!links.length) {
      await finish('skipped', 'Not sent: there is no review link in the settings.');
      return json({ skipped: true });
    }
    const linkBase = `${supabaseUrl}/functions/v1/review-link?t=${m.token}`;

    if (m.channel === 'sms') {
      if (!m.to) {
        await finish('skipped', 'Not sent: there is no mobile number for them.');
        return json({ skipped: true });
      }
      const { data: rec, error: recErr } = await admin.rpc('review_record_sms', {
        p_id: id,
        p_body: m.sms_body,
      });
      if (recErr || !rec) throw new Error(recErr?.message ?? 'could not record the text');
      const r = rec as {
        message_id: string;
        status: string;
        provider: string;
        from: string | null;
        body?: string | null;
        whatsapp_phone_number_id: string | null;
      };
      if (r.status === 'sandbox') {
        await finish('skipped', 'Not sent: texts are not live yet. Nothing reached the customer.');
        return json({ skipped: true, reason: 'sandbox' });
      }
      const adapter = adapterFor(r.provider, 'sms', r.whatsapp_phone_number_id);
      if (!adapter) {
        await admin
          .from('firm_customer_messages')
          .update({
            status: 'failed',
            error: `${r.provider} cannot send texts yet`,
            updated_at: new Date().toISOString(),
          })
          .eq('id', r.message_id);
        await finish('failed', 'Not sent: texts could not be sent. Nothing reached the customer.');
        return json({ ok: false });
      }
      const result = await adapter.send({
        id: r.message_id,
        channel: 'sms',
        to: m.to,
        from: r.from,
        // M8: the body review_record_sms recorded (an opt-out link instead of
        // "Reply STOP" when the sender is a name, not a number).
        body: r.body ?? m.sms_body,
        templateKey: 'review_request',
      });
      await admin
        .from('firm_customer_messages')
        .update({
          status: result.ok ? 'sent' : result.status === 'sandbox' ? 'sandbox' : 'failed',
          provider_message_id: result.providerMessageId,
          error: result.ok ? null : (result.error ?? '').slice(0, 300) || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', r.message_id);
      if (!result.ok) {
        await finish('failed', 'Not sent: the text provider refused it.', {
          error: result.error ?? null,
        });
        return json({ ok: false });
      }
      await finish('sent', `Asked ${who} for a review by text.`, { to: m.to });
      return json({ ok: true, status: 'sent' });
    }

    // Email
    const to = (m.to ?? '').trim().toLowerCase();
    if (!to || !isSendableEmail(to)) {
      await finish('skipped', 'Not sent: there is no valid email address for them.');
      return json({ skipped: true });
    }
    if (await isSuppressed(admin, to)) {
      await finish('skipped', 'Not sent: their address is on the do-not-send list.');
      return json({ skipped: true });
    }

    const { data: owner } = await admin.auth.admin.getUserById(m.employer_id);
    const stopUrl = `${linkBase}&a=stop`;
    const email = buildReviewRequestEmail({
      company: {
        name: m.company.name,
        logoUrl: m.company.logo_url,
        primaryColor: m.company.color,
        email: m.company.email,
        phone: m.company.phone,
        website: m.company.website,
        address: m.company.address,
      },
      firstName: m.first_name,
      paragraph: m.paragraph,
      jobTitle: m.job_title,
      links: links.map((l) => ({
        label: l.label,
        url: `${linkBase}&p=${encodeURIComponent(l.key)}`,
      })),
      stopUrl,
    });
    const sender = clientFacingSender({
      companyName: m.company.name,
      companyEmail: m.company.email,
      userEmail: (owner?.user?.email as string | undefined) ?? null,
    });
    const res = await sendEmail({
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
      tags: [{ name: 'type', value: 'review_request_after_payment' }],
      log: { template: 'review_request_after_payment', entityId: m.id, userId: m.employer_id },
    });
    if (res.error) {
      await finish('failed', 'Not sent: the email provider refused it.', {
        error: res.error.message,
      });
      return json({ ok: false });
    }
    await finish('sent', `Asked ${who} for a review by email.`, { to });
    return json({ ok: true, status: 'sent' });
  } catch (err) {
    captureException(err, { functionName: 'employer-review-request-send', extra: { id } });
    await finish('failed', 'Not sent: something went wrong. Nothing reached the customer.', {
      error: err instanceof Error ? err.message.slice(0, 300) : 'unknown',
    });
    return json({ error: 'failed' }, 500);
  }
});
