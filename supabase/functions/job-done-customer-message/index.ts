/**
 * Gap #3 (ELE-2068): the customer's "job done" email.
 *
 * Posted { message_id } by:
 *   - the 5-minute tick (job_done_messages_tick, service role), once it is scheduled;
 *   - the office, right after they tap Send on the job (their JWT);
 *   - the worker's phone, right after a Job done lands, when the firm sends
 *     automatically (their JWT).
 * A signed-in caller must be in the firm or be the worker who finished the
 * job (job_done_message_can_poke). Whoever calls, only a message that is
 * `queued` is sent: job_done_message_claim moves it to `sending` once, so a
 * repeated post can never send twice. Every path ends in
 * job_done_message_finish (sent / skipped / failed), which writes the job
 * feed and, on failure, tells the office.
 *
 * Reuses the shared mailer (_shared/mailer.ts) and email shell. No new provider.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { Resend, clientFacingSender, htmlToPlainText, isSendableEmail } from '../_shared/mailer.ts';
import {
  buildJobDoneSummaryEmail,
  type JobDoneCertificateLink,
} from '../_shared/email-templates/job-done-summary.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { captureException } from '../_shared/sentry.ts';

const PHOTO_LINK_SECONDS = 30 * 24 * 60 * 60;

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface Claim {
  claimed: boolean;
  skipped?: string;
  id: string;
  firm_id: string;
  job_id: string;
  title: string | null;
  client: string | null;
  to: string;
  summary: string | null;
  photos: string[];
  completed_at: string;
  by: string | null;
  signed_by: string | null;
  extras: Array<{ description: string; quantity: number }>;
  certificates: Array<{ type: string; number: string | null; issued: boolean; pdf_url: string | null }>;
  invoice: {
    number: string | null;
    paid: boolean;
    balance: number | null;
    pdf_url: string | null;
    pay_url: string | null;
  } | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const caller = await identifyCaller(req);
  if (!caller) return deny(corsHeaders);

  const body = (await req.json().catch(() => ({}))) as { message_id?: string };
  const messageId = typeof body.message_id === 'string' ? body.message_id : null;
  if (!messageId || !/^[0-9a-f-]{36}$/i.test(messageId)) {
    return json({ error: 'message_id is required' }, 400);
  }

  const url = Deno.env.get('SUPABASE_URL')!;
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  // A person may only poke a message on their own firm's job (or the one they finished).
  if (caller.kind === 'user') {
    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '').trim();
    const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    });
    const { data: ok, error } = await asUser.rpc('job_done_message_can_poke', { p_msg: messageId });
    if (error || ok !== true) return deny(corsHeaders, 403, 'Not your firm’s job');
  }

  const finish = async (status: 'sent' | 'skipped' | 'failed', summary: string, detail: Record<string, unknown> = {}) => {
    const { error } = await admin.rpc('job_done_message_finish', {
      p_msg: messageId,
      p_status: status,
      p_summary: summary,
      p_detail: detail,
    });
    if (error) console.error('[job-done-customer-message] finish failed', error.message);
  };

  let claimed = false;
  try {
    const { data, error } = await admin.rpc('job_done_message_claim', { p_msg: messageId });
    if (error) throw error;
    const m = data as Claim;
    if (!m?.claimed) {
      return json({ sent: false, reason: m?.skipped ?? 'not_queued' });
    }
    claimed = true;

    const to = (m.to ?? '').trim().toLowerCase();
    if (!isSendableEmail(to)) {
      await finish('skipped', 'Not sent: the customer email on the job is not a valid address.');
      return json({ sent: false, reason: 'bad_email' });
    }
    if (await isSuppressed(admin, to)) {
      await finish(
        'skipped',
        'Not sent: that address is on the do-not-send list (unsubscribed or bounced).'
      );
      return json({ sent: false, reason: 'suppressed' });
    }

    const [{ data: cp }, { data: owner }] = await Promise.all([
      admin
        .from('company_profiles')
        .select('company_name, company_email, company_phone, company_website, logo_url, accent_color')
        .eq('user_id', m.firm_id)
        .maybeSingle(),
      admin.auth.admin.getUserById(m.firm_id),
    ]);
    const companyName = cp?.company_name || 'Your electrician';

    // Photos: private bucket, so 30-day signed links.
    let photoUrls: string[] = [];
    const paths = (m.photos ?? []).filter((p) => typeof p === 'string' && p.length > 0).slice(0, 6);
    if (paths.length) {
      const { data: signed } = await admin.storage
        .from('visual-uploads')
        .createSignedUrls(paths, PHOTO_LINK_SECONDS);
      photoUrls = (signed ?? [])
        .map((s: { signedUrl?: string | null }) => s?.signedUrl ?? '')
        .filter((u: string) => /^https:\/\//.test(u));
    }

    const certs: JobDoneCertificateLink[] = (m.certificates ?? [])
      .filter((c) => c.issued && c.pdf_url)
      .map((c) => ({ type: c.type, number: c.number, url: c.pdf_url as string }));
    const certToFollow = (m.certificates ?? []).some((c) => !(c.issued && c.pdf_url));

    const email = buildJobDoneSummaryEmail({
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
      completedAt: m.completed_at,
      engineer: m.by,
      signedBy: m.signed_by,
      summary: m.summary,
      extras: m.extras,
      photos: photoUrls.map((u) => ({ url: u })),
      certificates: certs,
      certificateToFollow: certToFollow,
      invoice: m.invoice
        ? {
            number: m.invoice.number,
            paid: !!m.invoice.paid,
            balance: m.invoice.balance == null ? null : Number(m.invoice.balance),
            url: m.invoice.pdf_url,
            payUrl: m.invoice.pay_url,
          }
        : null,
    });

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      await finish('failed', 'Not sent: email is not set up. Nothing reached the customer.');
      return json({ sent: false, reason: 'not_configured' }, 500);
    }
    const sender = clientFacingSender({
      companyName,
      companyEmail: cp?.company_email ?? null,
      userEmail: (owner?.user?.email as string | undefined) ?? null,
    });
    const { error: sendErr } = await new Resend(apiKey).emails.send({
      from: sender.from,
      replyTo: sender.replyTo,
      to,
      subject: email.subject,
      html: email.html,
      text: htmlToPlainText(email.html),
      tags: [{ name: 'type', value: 'job_done_summary' }],
      log: { template: 'job_done_summary', entityId: m.job_id, userId: m.firm_id },
    });
    if (sendErr) {
      await finish('failed', 'Not sent: the email provider refused it. Check the address and send again.', {
        error: sendErr.message,
      });
      return json({ sent: false, reason: 'provider' }, 502);
    }

    const extrasLine = [
      photoUrls.length ? `${photoUrls.length} ${photoUrls.length === 1 ? 'photo' : 'photos'}` : null,
      certs.length ? (certs.length === 1 ? 'the certificate' : `${certs.length} certificates`) : null,
      m.invoice ? `invoice ${m.invoice.number ?? ''}`.trim() + (m.invoice.pay_url ? ' with a pay link' : '') : null,
    ].filter(Boolean) as string[];
    await finish(
      'sent',
      `Emailed ${m.client || 'the customer'} the job summary` +
        (extrasLine.length ? `, with ${extrasLine.join(', ').replace(/, ([^,]*)$/, ' and $1')}.` : '.'),
      { to, photos: photoUrls.length, certificates: certs.length, invoice: !!m.invoice }
    );
    return json({ sent: true });
  } catch (err) {
    captureException(err, { functionName: 'job-done-customer-message', extra: { messageId } });
    if (claimed) {
      await finish('failed', 'Not sent: something went wrong. Nothing reached the customer.', {
        error: err instanceof Error ? err.message.slice(0, 300) : 'unknown',
      });
    }
    return json({ error: 'failed' }, 500);
  }
});
