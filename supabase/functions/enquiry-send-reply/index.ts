/**
 * Email a reply to an enquiry from the app (ELE-2022).
 *
 *   POST { enquiry_id, message }   (signed-in owner or co-admin)
 *
 * Same rules as every other customer-facing email (see send-customer-campaign,
 * send-booking-confirmation): From noreply@elec-mate.com with the company name,
 * Reply-To the electrician's own address (so the customer's answer lands in
 * their inbox), never to a suppressed address, branded shell, logged.
 *
 * Replying to an emailed enquiry threads under the customer's original message.
 * A booking link in the text becomes a "Pick a time" button.
 *
 * Afterwards: the enquiry counts as replied, the reply is kept on the card, and
 * a linked customer gets it on their timeline like any other CRM email.
 */

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import {
  sendEmail,
  clientFacingSender,
  htmlToPlainText,
  isSendableEmail,
} from '../_shared/mailer.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { buildReplyEmail } from './email.ts';
import { captureException } from '../_shared/sentry.ts';
import { corsHeaders } from '../_shared/cors.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const SOURCE_LABEL: Record<string, string> = {
  checkatrade: 'Checkatrade',
  mybuilder: 'MyBuilder',
  bark: 'Bark',
  ratedpeople: 'Rated People',
  trustatrader: 'TrustATrader',
  yell: 'Yell',
};

async function recipients(supabase: SupabaseClient, ownerId: string): Promise<string[]> {
  const { data } = await supabase
    .from('employer_admins')
    .select('user_id')
    .eq('employer_id', ownerId)
    .eq('status', 'active');
  return [ownerId, ...((data ?? []) as { user_id: string }[]).map((a) => a.user_id)];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
    const { data: who } = jwt ? await supabase.auth.getUser(jwt) : { data: null };
    const actor = who?.user?.id;
    if (!actor) return json({ error: 'Sign in again and retry.' }, 401);

    const { enquiry_id, message } = await req.json().catch(() => ({}));
    const text = typeof message === 'string' ? message.trim().slice(0, 3000) : '';
    if (typeof enquiry_id !== 'string' || text.length < 5) {
      return json({ error: 'Write a message first.' }, 400);
    }

    const { data: enq } = await supabase
      .from('enquiries')
      .select(
        'id, user_id, name, email, source, raw_from, raw_subject, message_id, customer_id, matched_customer_id, first_actioned_at, is_test, contact_hidden'
      )
      .eq('id', enquiry_id)
      .maybeSingle();
    if (!enq) return json({ error: 'Enquiry not found.' }, 404);
    const ownerId = enq.user_id as string;
    if (!(await recipients(supabase, ownerId)).includes(actor))
      return json({ error: 'forbidden' }, 403);

    const to = ((enq.email as string | null) ?? '').trim().toLowerCase();
    // Lead sites relay through their own system: an email to their relay address
    // (or with the details still hidden) would vanish
    // Checked whatever the source: a lead mis-read as plain email still has a relay address
    const site = SOURCE_LABEL[enq.source as string];
    const relay =
      /(^|\.)(checkatrade|mybuilder|bark|ratedpeople|trustatrader|yell)\.(com|co\.uk)$/i.test(
        to.split('@')[1] ?? ''
      );
    if (enq.contact_hidden || relay) {
      return json({ error: `Reply on ${site ?? 'the lead site'} so they get it.` }, 409);
    }
    if (!to || !isSendableEmail(to)) {
      return json(
        { error: "That email address doesn't look right. Check it in Contact details." },
        400
      );
    }
    // Escaped, case-insensitive, and fails closed (throws) if the list can't be read
    if (await isSuppressed(supabase, to)) {
      return json(
        {
          error:
            "That address can't be emailed (it unsubscribed or bounced before). Send a text or WhatsApp instead.",
          suppressed: true,
        },
        409
      );
    }

    // The business, as on every customer email
    const [{ data: company }, { data: owner }] = await Promise.all([
      supabase
        .from('company_profiles')
        .select(
          'company_name, company_email, company_phone, company_website, logo_url, accent_color'
        )
        .eq('user_id', ownerId)
        .maybeSingle(),
      supabase.auth.admin.getUserById(ownerId),
    ]);
    const companyName = (company?.company_name as string | null)?.trim() || 'Your electrician';
    const sender = clientFacingSender({
      companyName,
      companyEmail: company?.company_email as string | null,
      userEmail: owner?.user?.email ?? null,
    });

    const { subject, html } = buildReplyEmail({
      text,
      company: {
        name: companyName,
        logoUrl: company?.logo_url as string | null,
        primaryColor: company?.accent_color as string | null,
        email: sender.replyTo ?? null,
        phone: company?.company_phone as string | null,
        website: company?.company_website as string | null,
      },
      // A forward by hand ("Fwd: …") never reached the customer: don't echo it
      originalSubject:
        (enq.raw_subject as string | null)?.replace(/^\s*((fwd?|fw)\s*:\s*)+/i, '') ?? null,
      isEmailSource: enq.source === 'email',
    });

    // Threads under their original email when there was one
    // Only thread when the customer's own email reached the inbox (directly or by an
    // automatic forward). A forward by hand has its own id the customer never saw.
    const fromOwner = [company?.company_email, owner?.user?.email]
      .filter(Boolean)
      .some((a) =>
        ((enq.raw_from as string | null) ?? '').toLowerCase().includes(String(a).toLowerCase())
      );
    const threadId =
      enq.source === 'email' && !fromOwner ? (enq.message_id as string | null) : null;
    const result = await sendEmail({
      from: sender.from,
      replyTo: sender.replyTo,
      to,
      subject,
      html,
      text: htmlToPlainText(html),
      headers:
        threadId && threadId.includes('@')
          ? { 'In-Reply-To': threadId, References: threadId }
          : undefined,
      tags: [{ name: 'type', value: 'enquiry_reply' }],
      log: { template: 'enquiry_reply', entityId: enq.id as string, userId: actor },
    });
    if (result.error) throw new Error(result.error.message);

    // On the card, and on the customer's timeline
    const now = new Date().toISOString();
    const { error: logErr } = await supabase.rpc('log_enquiry_reply', {
      p_id: enq.id,
      p_via: 'email',
      p_text: text,
      p_to: to,
    });
    // The email has gone; a failed log is reported, not hidden
    if (logErr)
      await captureException(logErr, {
        functionName: 'enquiry-send-reply',
        extra: { step: 'log' },
      });
    const customerId = (enq.customer_id ?? enq.matched_customer_id) as string | null;
    if (customerId && !enq.is_test) {
      await supabase.from('customer_activity_log').insert({
        customer_id: customerId,
        user_id: ownerId,
        activity_type: 'email',
        title: 'Replied to their enquiry by email',
        description: text.slice(0, 1000),
        metadata: { enquiry_id: enq.id, to },
      });
    }

    return json({ ok: true, to });
  } catch (err) {
    console.error('[enquiry-send-reply] failed', err);
    await captureException(err, {
      functionName: 'enquiry-send-reply',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: "Couldn't send the email. Try again, or send a text instead." }, 500);
  }
});
