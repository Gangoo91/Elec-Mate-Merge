/**
 * ELE-1554 — "keep in touch" campaign to an electrician's own customer list.
 *
 *   POST { subject, body, customerIds: string[], templateId?, dailyCap? }
 *
 * Sends a templated check-in email to a batch of the caller's own customers,
 * for repeat work and referrals.
 *
 * The client proposes recipients; this function decides. Every limit is
 * enforced here rather than in the UI, because the UI is not a trust boundary
 * — a forged request must not be able to blast the whole customer list.
 *
 * Refusals, in order:
 *   1. Not the caller's customer          → skipped (ownership re-checked by user_id)
 *   2. No email address                   → skipped
 *   3. Opted out of THIS user's campaigns → skipped (customers.campaign_opted_out_at)
 *   4. On the global block list           → skipped (public.email_suppressions)
 *   5. Emailed within the dedupe window   → skipped (default 30 days)
 *   6. Over the daily cap                 → skipped, cap counted from today's send log
 *
 * Sender identity is NOT the electrician's own address. DMARC alignment
 * requires the From-domain to match the DKIM domain Brevo signs, so
 * clientFacingSender() locks From to noreply@elec-mate.com with the
 * electrician's company name as the display name and their real address as
 * Reply-To. See _shared/mailer.ts — do not roll your own `from:` here.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { sendEmail, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/** Hard ceiling regardless of what the caller asks for. Sender-reputation guard. */
const MAX_DAILY_CAP = 50;
const DEFAULT_DAILY_CAP = 10;
/** Don't hit the same client again inside this window. */
const DEDUPE_DAYS = 30;
/** Brevo is comfortable here and it keeps us well inside the CPU budget. */
const CONCURRENCY = 4;

interface CustomerRow {
  id: string;
  name: string;
  email: string | null;
  campaign_opted_out_at: string | null;
}

interface SkipRecord {
  customerId: string;
  name: string;
  reason: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ── Unsubscribe token ────────────────────────────────────────────────
// Same HMAC scheme as the `unsubscribe` function, plus a scope + user_id so
// the click opts the client out of THIS electrician only rather than the
// global Elec-Mate block list. Verified there, not here.

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function makeUnsubToken(
  email: string,
  userId: string,
  secret: string
): Promise<string> {
  const payload = {
    email,
    user_id: userId,
    scope: 'customer_campaign',
    // Seconds, matching send-winback-offer — the unsubscribe endpoint stores
    // this verbatim in metadata and the two streams should be comparable.
    issued_at: Math.floor(Date.now() / 1000),
  };
  const payloadB64 = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${b64urlEncode(new Uint8Array(sig))}`;
}

// ── Templating ───────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Merge fields are escaped as they are substituted, not after — the template
 * body is authored by the user and may legitimately contain markup, but a
 * customer NAME containing "<" must never become a tag.
 */
function applyMergeFields(
  template: string,
  vars: Record<string, string>,
  escape: boolean
): string {
  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (whole, rawKey: string) => {
    const key = rawKey.toLowerCase();
    if (!(key in vars)) return whole; // leave unknown placeholders visible
    const value = vars[key] ?? '';
    return escape ? escapeHtml(value) : value;
  });
}

/** First name only — "Hi Dave" reads warmer than "Hi Dave Thompson". */
function firstName(full: string): string {
  return (full || '').trim().split(/\s+/)[0] || 'there';
}

function buildHtml(bodyText: string, companyName: string, unsubUrl: string): string {
  // The user writes plain text with blank lines between paragraphs. Convert
  // to <p> so it renders with real spacing in every client.
  const paragraphs = bodyText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 16px;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#18181b;">
<tr><td>
${paragraphs}
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;line-height:1.5;">
<p style="margin:0 0 6px;">You're receiving this because you're a customer of ${escapeHtml(companyName)}.</p>
<p style="margin:0;"><a href="${unsubUrl}" style="color:#71717a;">Unsubscribe from these emails</a></p>
</div>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

// ── Handler ──────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No authorization header' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) return json({ error: 'Unauthorized' }, 401);

    const body = await req.json().catch(() => ({}));
    const { subject, body: messageBody, customerIds, templateId } = body ?? {};

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return json({ error: 'subject is required' }, 400);
    }
    if (!messageBody || typeof messageBody !== 'string' || !messageBody.trim()) {
      return json({ error: 'body is required' }, 400);
    }
    if (!Array.isArray(customerIds) || customerIds.length === 0) {
      return json({ error: 'customerIds must be a non-empty array' }, 400);
    }

    const requestedCap = Number(body?.dailyCap);
    const dailyCap = Math.min(
      MAX_DAILY_CAP,
      Number.isFinite(requestedCap) && requestedCap > 0
        ? Math.floor(requestedCap)
        : DEFAULT_DAILY_CAP
    );

    const secret = Deno.env.get('WINBACK_UNSUBSCRIBE_SECRET');
    if (!secret) {
      // Refuse rather than send marketing with no working opt-out link.
      return json({ error: 'Unsubscribe signing key not configured' }, 500);
    }

    // ── Sender identity ────────────────────────────────────────────
    // company_profiles, keyed on user_id — NOT `profiles`, which has neither
    // company_name nor company_email. Same lookup send-invoice-resend uses, so
    // a client sees the identical From name on a campaign and an invoice.
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('company_name, company_email')
      .eq('user_id', user.id)
      .maybeSingle();

    const companyName = companyProfile?.company_name?.trim() || 'Your electrician';
    const { from, replyTo } = clientFacingSender({
      companyName: companyProfile?.company_name,
      companyEmail: companyProfile?.company_email,
      userEmail: user.email,
    });

    // ── Today's usage, for the cap ─────────────────────────────────
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const { count: sentToday } = await supabase
      .from('customer_campaign_sends')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'sent')
      .gte('sent_at', startOfDay.toISOString());

    const remaining = Math.max(0, dailyCap - (sentToday ?? 0));
    if (remaining === 0) {
      return json({
        sent: 0,
        skipped: [],
        failed: [],
        remainingToday: 0,
        message: `Daily limit of ${dailyCap} already reached. Try again tomorrow.`,
      });
    }

    // ── Candidate recipients — ownership re-checked here ───────────
    const { data: customers, error: custError } = await supabase
      .from('customers')
      .select('id, name, email, campaign_opted_out_at')
      .eq('user_id', user.id)
      .in('id', customerIds.slice(0, 500));

    if (custError) {
      console.error('[send-customer-campaign] customer fetch failed:', custError);
      return json({ error: custError.message }, 500);
    }

    const skipped: SkipRecord[] = [];
    const found = new Map<string, CustomerRow>();
    for (const c of (customers ?? []) as CustomerRow[]) found.set(c.id, c);

    // Anything the caller asked for that isn't theirs never reaches the queue.
    for (const id of customerIds) {
      if (!found.has(id)) {
        skipped.push({ customerId: id, name: '—', reason: 'Not one of your customers' });
      }
    }

    const withEmail: CustomerRow[] = [];
    for (const c of found.values()) {
      if (!c.email || !c.email.includes('@')) {
        skipped.push({ customerId: c.id, name: c.name, reason: 'No email address' });
        continue;
      }
      if (c.campaign_opted_out_at) {
        skipped.push({ customerId: c.id, name: c.name, reason: 'Opted out of your emails' });
        continue;
      }
      withEmail.push(c);
    }

    // Everyone was filtered out already — bail before issuing `.in()` queries
    // with an empty array, which PostgREST renders as `in.()` and rejects.
    if (withEmail.length === 0) {
      return json({ sent: 0, skipped, failed: [], remainingToday: remaining, dailyCap });
    }

    // ── Global block list ──────────────────────────────────────────
    const emails = withEmail.map((c) => c.email!.toLowerCase().trim());
    const { data: suppressed } = await supabase
      .from('email_suppressions')
      .select('email')
      .in('email', emails);

    const blocked = new Set((suppressed ?? []).map((s: { email: string }) => s.email.toLowerCase()));

    // ── Dedupe window ──────────────────────────────────────────────
    const dedupeCutoff = new Date(Date.now() - DEDUPE_DAYS * 86_400_000).toISOString();
    const { data: recent } = await supabase
      .from('customer_campaign_sends')
      .select('customer_id')
      .eq('user_id', user.id)
      .eq('status', 'sent')
      .gte('sent_at', dedupeCutoff)
      .in(
        'customer_id',
        withEmail.map((c) => c.id)
      );

    const recentlyEmailed = new Set(
      (recent ?? []).map((r: { customer_id: string | null }) => r.customer_id).filter(Boolean)
    );

    const eligible: CustomerRow[] = [];
    for (const c of withEmail) {
      if (blocked.has(c.email!.toLowerCase().trim())) {
        skipped.push({ customerId: c.id, name: c.name, reason: 'Unsubscribed or bounced' });
        continue;
      }
      if (recentlyEmailed.has(c.id)) {
        skipped.push({
          customerId: c.id,
          name: c.name,
          reason: `Already emailed in the last ${DEDUPE_DAYS} days`,
        });
        continue;
      }
      eligible.push(c);
    }

    // Cap last, so a customer bumped by the cap is reported as "tomorrow"
    // rather than being confused with a permanent refusal.
    const overCap = eligible.slice(remaining);
    const queue = eligible.slice(0, remaining);
    for (const c of overCap) {
      skipped.push({ customerId: c.id, name: c.name, reason: 'Over your daily limit — try tomorrow' });
    }

    // ── Send ───────────────────────────────────────────────────────
    const sentRecords: Array<Record<string, unknown>> = [];
    const failed: SkipRecord[] = [];
    const siteUrl = Deno.env.get('SUPABASE_URL')!;

    for (let i = 0; i < queue.length; i += CONCURRENCY) {
      const slice = queue.slice(i, i + CONCURRENCY);
      await Promise.all(
        slice.map(async (customer) => {
          const email = customer.email!.trim();
          const vars = {
            customer_name: firstName(customer.name),
            customer_full_name: customer.name,
            company_name: companyName,
          };

          try {
            const token = await makeUnsubToken(email.toLowerCase(), user.id, secret);
            const unsubUrl = `${siteUrl}/functions/v1/unsubscribe?token=${encodeURIComponent(token)}`;

            const mergedSubject = applyMergeFields(subject, vars, false);
            const mergedBody = applyMergeFields(messageBody, vars, true);
            const html = buildHtml(mergedBody, companyName, unsubUrl);

            const result = await sendEmail({
              from,
              to: email,
              subject: mergedSubject,
              html,
              text: htmlToPlainText(html),
              replyTo,
              headers: {
                // RFC 8058 — Gmail and Yahoo render a native unsubscribe
                // control from these, which keeps complaints off the spam
                // button and protects the shared sending domain.
                'List-Unsubscribe': `<${unsubUrl}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
              },
              tags: [{ name: 'stream', value: 'customer_campaign' }],
            });

            if (result.error) {
              failed.push({ customerId: customer.id, name: customer.name, reason: result.error.message });
              sentRecords.push({
                user_id: user.id,
                customer_id: customer.id,
                template_id: templateId ?? null,
                email,
                subject: mergedSubject,
                status: 'failed',
                error_message: result.error.message.slice(0, 500),
              });
              return;
            }

            sentRecords.push({
              user_id: user.id,
              customer_id: customer.id,
              template_id: templateId ?? null,
              email,
              subject: mergedSubject,
              status: 'sent',
              provider_message_id: result.data?.id ?? null,
            });
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            failed.push({ customerId: customer.id, name: customer.name, reason: msg });
            sentRecords.push({
              user_id: user.id,
              customer_id: customer.id,
              template_id: templateId ?? null,
              email,
              status: 'failed',
              error_message: msg.slice(0, 500),
            });
          }
        })
      );
    }

    if (sentRecords.length > 0) {
      const { error: logError } = await supabase
        .from('customer_campaign_sends')
        .insert(sentRecords);
      // A logging failure is serious: the cap and the dedupe window are both
      // computed FROM this table, so a silent failure here would let the next
      // run re-send to everyone. Surface it rather than swallow it.
      if (logError) {
        console.error('[send-customer-campaign] send log insert failed:', logError);
        await captureException(new Error(`campaign send log failed: ${logError.message}`), {
          functionName: 'send-customer-campaign',
          userId: user.id,
        });
      }
    }

    const sentCount = sentRecords.filter((r) => r.status === 'sent').length;

    // NOTE: deliberately does NOT touch customers.last_activity_at.
    //
    // An earlier cut of this did, to keep the activity dot green. That was
    // wrong: last_activity_at drives the "Follow-ups due" count and the
    // no-activity-in-90-days filter, both of which mean "this relationship has
    // gone quiet". Sending a bulk email you initiated is not the customer
    // coming back — marking them active would quietly empty the follow-up list
    // and destroy the very signal that told you to email them.
    //
    // customer_campaign_sends is the record of the send, and the 30-day dedupe
    // window reads from it.

    return json({
      sent: sentCount,
      skipped,
      failed,
      remainingToday: Math.max(0, remaining - sentCount),
      dailyCap,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[send-customer-campaign] fatal:', msg);
    await captureException(err, {
      functionName: 'send-customer-campaign',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: msg }, 500);
  }
});
