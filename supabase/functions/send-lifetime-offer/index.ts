/**
 * Lifetime offer campaign — £300 one-off, lifetime access (Jul 2026 push).
 *
 * Actions (admin-only):
 *   get_eligible → { count, sample } — everyone who's ever had the app,
 *                  minus lifetime owners, free-access holders, suppressed
 *                  emails and anyone already sent this campaign
 *   send_test    → { testEmail } renders the real email with [TEST] prefix
 *   send_batch   → { limit? } claim-first send, deduped via trial_emails_sent
 *                  (email_type 'lifetime_offer_jul26')
 *
 * The June campaign's biggest objection was "is this real?" — the copy
 * tackles legitimacy head-on: real Stripe receipt, founder reply-to, the
 * exact fulfilment steps, and the existing owner count.
 *
 * Fulfilment is automated separately (lifetime-fulfilment fn + cron).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PAYMENT_LINK = 'https://buy.stripe.com/8x28wIbV0cvy5Q5gfQbjW0b';
const FROM = 'Andrew from Elec-Mate <founder@elec-mate.com>';
const REPLY_TO = 'founder@elec-mate.com';
const EMAIL_TYPE = 'lifetime_offer_jul26';
const UNSUBSCRIBE_MAILTO = 'mailto:info@elec-mate.com?subject=unsubscribe';
const UNSUBSCRIBE_SECRET = Deno.env.get('WINBACK_UNSUBSCRIBE_SECRET') ?? '';

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return b64urlEncode(new Uint8Array(sig));
}

async function buildUnsubscribeUrl(email: string): Promise<string> {
  if (!UNSUBSCRIBE_SECRET) return UNSUBSCRIBE_MAILTO;
  const payload = JSON.stringify({
    email: email.toLowerCase().trim(),
    issued_at: Math.floor(Date.now() / 1000),
  });
  const payloadB64 = b64urlEncode(new TextEncoder().encode(payload));
  const sig = await hmacSign(payloadB64, UNSUBSCRIBE_SECRET);
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!supabaseUrl) return UNSUBSCRIBE_MAILTO;
  return `${supabaseUrl}/functions/v1/unsubscribe?token=${payloadB64}.${sig}`;
}

function buildUnsubscribeHeaders(unsubscribeUrl: string): Record<string, string> {
  const isHttps = unsubscribeUrl.startsWith('https://');
  return {
    'List-Unsubscribe': isHttps
      ? `<${unsubscribeUrl}>, <${UNSUBSCRIBE_MAILTO}>`
      : `<${UNSUBSCRIBE_MAILTO}>`,
    ...(isHttps ? { 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } : {}),
  };
}

const SUBJECT = 'One payment, never again — lifetime Elec-Mate';

function plainText(firstName: string, unsubscribeUrl: string): string {
  return [
    `Hi ${firstName},`,
    '',
    "Andrew here — the working spark who built Elec-Mate. Straight to it:",
    '',
    'You can now buy Elec-Mate outright. £300, one payment, and the app is yours for good — every feature, every future update, no subscription, ever.',
    '',
    "At £19.99/month that pays for itself inside 15 months, and nine sparks have already taken it.",
    '',
    'Because a few people asked last time: yes, this is real.',
    '- Payment is a standard Stripe checkout — you get a proper receipt.',
    '- Within 24 hours your account flips to lifetime and any subscription you have is cancelled so you are never billed again.',
    '- This email comes from my real inbox. Hit reply with any question and I will answer it personally.',
    '',
    `Take it here: ${PAYMENT_LINK}`,
    '',
    'One thing: use the same email address you log in with, so it lands on the right account.',
    '',
    'Andrew',
    'Founder, Elec-Mate',
    '',
    `Unsubscribe: ${unsubscribeUrl.startsWith('https') ? unsubscribeUrl : 'reply with "unsubscribe"'}`,
  ].join('\n');
}

function htmlEmail(firstName: string, unsubscribeUrl: string): string {
  const unsubHref = unsubscribeUrl.startsWith('https') ? unsubscribeUrl : UNSUBSCRIBE_MAILTO;
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SUBJECT}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#F4F6F9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    £300 once and Elec-Mate is yours for good — no subscription, ever. Real offer, real Stripe receipt.
  </span>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;">
              <img src="https://www.elec-mate.com/logo.jpg" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Lifetime access</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">One payment.<br>Never again.</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${firstName},</p>
              <p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">Andrew here — the working spark who built Elec-Mate. Straight to it:</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">You can now buy Elec-Mate outright. <strong style="color: #0C1B2A;">£300, one payment</strong>, and the app is yours for good — every feature, every future update, no subscription, ever.</p>
            </td>
          </tr>

          <!-- Value card -->
          <tr>
            <td style="padding: 0 36px 26px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #0C1B2A; line-height: 1.55;"><strong style="color: #B5840A;">✓</strong>&nbsp;&nbsp;Pays for itself inside 15 months at £19.99/month</p>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #0C1B2A; line-height: 1.55;"><strong style="color: #B5840A;">✓</strong>&nbsp;&nbsp;Every future feature and update included — for good</p>
                    <p style="margin: 0; font-size: 14px; color: #0C1B2A; line-height: 1.55;"><strong style="color: #B5840A;">✓</strong>&nbsp;&nbsp;Nine sparks already own it outright</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Is this real -->
          <tr>
            <td align="left" style="padding: 0 36px 4px;">
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">"Is this real?" — yes. Here's how it works</p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #51606F; line-height: 1.6;"><strong style="color: #0C1B2A;">1.</strong>&nbsp; Payment is a standard <strong style="color: #0C1B2A;">Stripe checkout</strong> — you get a proper receipt.</p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #51606F; line-height: 1.6;"><strong style="color: #0C1B2A;">2.</strong>&nbsp; Within 24 hours your account flips to lifetime, and any subscription you have is <strong style="color: #0C1B2A;">cancelled so you're never billed again</strong>.</p>
            <p style="margin: 0 0 8px; font-size: 14px; color: #51606F; line-height: 1.6;"><strong style="color: #0C1B2A;">3.</strong>&nbsp; This email comes from my real inbox — <strong style="color: #0C1B2A;">hit reply</strong> with any question and I'll answer personally.</p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="left" style="padding: 18px 36px 10px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${PAYMENT_LINK}" style="height:52px;v-text-anchor:middle;width:260px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Get lifetime access — £300</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${PAYMENT_LINK}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Get lifetime access — £300 →</a>
              <!--<![endif]-->
              <p style="margin: 12px 0 24px; font-size: 12.5px; color: #51606F; line-height: 1.5;">Use the same email address you log in with, so it lands on the right account.</p>
              <p style="margin: 0 0 2px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Andrew</p>
              <p style="margin: 0 0 28px; font-size: 13px; color: #51606F; line-height: 1.5;">Founder, Elec-Mate</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #51606F; line-height: 1.55;">Questions? Just reply — it comes straight to Andrew and he reads every one.</p>
              <p style="margin: 0; font-size: 12px; color: #8A97A5; line-height: 1.5;">You're getting this because you have an Elec-Mate account. <a href="${unsubHref}" style="color: #8A97A5; text-decoration: underline;">Unsubscribe</a> · <a href="https://www.elec-mate.com" style="color: #8A97A5; text-decoration: underline;">elec-mate.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Top-100 campaign (Jul 2026, £299.99 vs public £499.99) ──────────────────
// Personalised send to the 100 most-engaged users: their own usage stats and
// price maths are passed in per recipient (built offline from real data).
// Dedupe via trial_emails_sent email_type 'lifetime_top100_jul2026'.

const SUBJECT_TOP100 = 'Own Elec-Mate for life — £299.99, invite only';
const EMAIL_TYPE_TOP100 = 'lifetime_top100_jul2026';

interface Top100Recipient {
  email: string;
  firstName: string;
  stat1: string;
  stat2?: string;
  stat3?: string;
  maths: string;
}

function top100PaymentLink(email: string): string {
  return `${PAYMENT_LINK}?prefilled_email=${encodeURIComponent(email)}`;
}

function plainTextTop100(r: Top100Recipient, unsubscribeUrl: string): string {
  const stats = [r.stat1, r.stat2, r.stat3].filter(Boolean).map((s) => `- ${s}`);
  return [
    `Hi ${r.firstName},`,
    '',
    "Out of thousands of sparks on Elec-Mate, you're in the small group who use it hardest. This offer is only going to them — nobody else.",
    '',
    'Own Elec-Mate outright — £299.99, one payment, yours for the rest of your career.',
    '',
    'Why you? Look at your numbers:',
    ...stats,
    '',
    'What you own:',
    '- Every tool you already use — all 19 certificate types, quotes, invoices, AI tools, 70+ calculators, the Study Centre',
    '- The Employer Hub, included — when you take people on: team, timesheets, job management, purchase orders, client CRM',
    '- Every feature we ever ship, forever — no renewal, no price rises, no subscription',
    '',
    `${r.maths}`,
    '',
    "And here's the part worth knowing: lifetime is about to go on our pricing page at £499.99. Your rate is £200 less, because you're one of the people who built this app with us. It's capped at the next 10 and closes Friday 1 August — whichever comes first.",
    '',
    `Own it for life — £299.99: ${top100PaymentLink(r.email)}`,
    '',
    'Secure Stripe checkout. Your account upgrades automatically and any Stripe subscription is cancelled for you. If you subscribe through the App Store or Google Play, cancel that subscription in your store settings after purchase.',
    '',
    'Any questions, just reply — it comes straight to me.',
    '',
    'Andrew',
    'Founder, Elec-Mate',
    '',
    `Unsubscribe: ${unsubscribeUrl.startsWith('https') ? unsubscribeUrl : 'reply with "unsubscribe"'}`,
  ].join('\n');
}

function htmlTop100(r: Top100Recipient, unsubscribeUrl: string): string {
  const unsubHref = unsubscribeUrl.startsWith('https') ? unsubscribeUrl : UNSUBSCRIBE_MAILTO;
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const link = top100PaymentLink(r.email);

  const statRow = (text: string, last = false) => `
                      <tr>
                        <td width="20" valign="top" style="padding-top: 5px;"><div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div></td>
                        <td valign="top" style="${last ? '' : 'padding-bottom: 10px;'}"><p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${text}</p></td>
                      </tr>`;
  const statList = [r.stat1, r.stat2, r.stat3].filter(Boolean) as string[];
  const statRows = statList.map((s, i) => statRow(s, i === statList.length - 1)).join('');

  const includeRow = (title: string, detail: string) => `
                <tr>
                  <td width="20" valign="top" style="padding-top: 5px;"><div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div></td>
                  <td valign="top" style="padding-bottom: 14px;">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${title}</p>
                    <p style="margin: 2px 0 0; font-size: 13px; color: #51606F; line-height: 1.5;">${detail}</p>
                  </td>
                </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${SUBJECT_TOP100}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#F4F6F9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    One payment, never again — and £200 under what everyone else is about to pay.
  </span>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;">
              <img src="https://www.elec-mate.com/logo.jpg" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Invitation &middot; Our most active members</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Own Elec-Mate.<br>For life.</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${r.firstName},</p>
              <p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">Out of thousands of sparks on Elec-Mate, you're in the small group who use it hardest. This email is only going to them — nobody else.</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">Own Elec-Mate outright &mdash; <strong style="color: #0C1B2A;">&pound;299.99, one payment</strong>, and it's yours for the rest of your career. No subscription. No renewal. Ever.</p>
            </td>
          </tr>

          <!-- Personal stats card -->
          <tr>
            <td style="padding: 0 36px 26px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">Why you &mdash; your numbers</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      ${statRows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What you own -->
          <tr>
            <td style="padding: 0 36px 4px;">
              <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">What you own</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${includeRow('Every tool you already use', 'All 19 certificate types, quotes, invoices, clients, AI tools, 70+ calculators and the full Study Centre — unlimited, forever')}
                ${includeRow('The Employer Hub — included', 'For when you take people on: team, timesheets, job management, purchase orders and client CRM. Yours as it rolls out, at no extra cost')}
                ${includeRow('Everything we ship next', 'Every new feature and every upgrade, for the rest of your career. Your toolkit only ever gets bigger — your price never does')}
              </table>
            </td>
          </tr>

          <!-- Price block -->
          <tr>
            <td style="padding: 8px 36px 26px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0C1B2A; border-radius: 14px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #F3B70A;">One payment. Never again.</p>
                    <p style="margin: 0 0 8px; font-size: 30px; font-weight: 800; color: #FFFFFF; line-height: 1.1;">&pound;299.99</p>
                    <p style="margin: 0 0 10px; font-size: 13px; color: #B9C3CE; line-height: 1.6;">${r.maths}</p>
                    <p style="margin: 0; font-size: 13px; color: #B9C3CE; line-height: 1.6;">Worth knowing: lifetime is about to go on our pricing page at <span style="text-decoration: line-through;">&pound;499.99</span>. <strong style="color: #FFFFFF;">Your rate is &pound;200 less</strong> because you're one of the people who built this app with us &mdash; capped at the next 10, closes Friday 1 August.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="left" style="padding: 0 36px 32px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:52px;v-text-anchor:middle;width:240px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Own it for life</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${link}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Own it for life &mdash; &pound;299.99</a>
              <!--<![endif]-->
              <p style="margin: 14px 0 0; font-size: 12px; color: #8B95A3; line-height: 1.55;">Secure Stripe checkout. Your account upgrades automatically and any Stripe subscription is cancelled for you &mdash; nothing else to do. If you subscribe through the App Store or Google Play, cancel that subscription in your store settings after purchase.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #51606F; line-height: 1.55;">Want to check anything before you decide? Just reply &mdash; it comes straight to Andrew, and he reads every one.</p>
              <p style="margin: 0; font-size: 12px; color: #8A97A5; line-height: 1.5;">You're getting this because you're one of the most active members on Elec-Mate. <a href="${unsubHref}" style="color: #8A97A5; text-decoration: underline;">Unsubscribe</a> &middot; <a href="https://www.elec-mate.com" style="color: #8A97A5; text-decoration: underline;">elec-mate.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ── Admin auth: admin-panel JWT, or the service-role key for
    //    server-side/cron invocation (same pattern as reconcile-revenuecat) ──
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    if (authHeader !== `Bearer ${serviceKey}`) {
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );
      const {
        data: { user },
        error: userErr,
      } = await supabaseAuth.auth.getUser();
      if (userErr || !user) throw new Error('Not authenticated');

      const { data: callerProfile } = await supabase
        .from('profiles')
        .select('admin_role, full_name')
        .eq('id', user.id)
        .single();
      if (!callerProfile?.admin_role) throw new Error('Unauthorized: Admin access required');
    }

    const { action, testEmail, limit, recipient, recipients } = await req.json();
    const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '');

    // ── Eligibility: everyone with an account, minus lifetime owners,
    //    free-access holders, suppressed emails and already-sent ──
    const getEligible = async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, free_access_granted')
        .eq('free_access_granted', false);

      const { data: authEmails } = await supabase.rpc('get_auth_user_emails');
      const emailMap = new Map<string, string>();
      (authEmails || []).forEach((u: { id: string; email: string | null }) => {
        if (u.email) emailMap.set(u.id, u.email.toLowerCase());
      });

      const { data: suppressed } = await supabase.from('email_suppressions').select('email');
      const suppressedSet = new Set((suppressed ?? []).map((s) => s.email.toLowerCase()));

      const { data: alreadySent } = await supabase
        .from('trial_emails_sent')
        .select('user_id')
        .eq('email_type', EMAIL_TYPE);
      const sentSet = new Set((alreadySent ?? []).map((r) => r.user_id));

      return (profiles ?? [])
        .filter((p) => !sentSet.has(p.id))
        .map((p) => ({ ...p, email: emailMap.get(p.id) }))
        .filter((p) => p.email && !suppressedSet.has(p.email));
    };

    let result: unknown;

    switch (action) {
      case 'get_eligible': {
        const eligible = await getEligible();
        result = {
          count: eligible.length,
          sample: eligible.slice(0, 10).map((p) => ({ name: p.full_name, email: p.email })),
        };
        break;
      }

      case 'send_test': {
        if (!testEmail) throw new Error('testEmail is required');
        const to = String(testEmail).trim().toLowerCase();
        const unsubscribeUrl = await buildUnsubscribeUrl(to);
        const { error: sendErr } = await resend.emails.send({
          from: FROM,
          replyTo: REPLY_TO,
          to,
          subject: `[TEST] ${SUBJECT}`,
          html: htmlEmail('Andrew', unsubscribeUrl),
          text: plainText('Andrew', unsubscribeUrl),
          headers: buildUnsubscribeHeaders(unsubscribeUrl),
          tags: [
            { name: 'campaign', value: 'lifetime_jul26' },
            { name: 'type', value: 'test' },
          ],
        });
        if (sendErr) throw new Error(`Test send failed: ${JSON.stringify(sendErr)}`);
        result = { sent: true, to };
        break;
      }

      case 'send_batch': {
        const cap = Math.min(Number(limit) || 400, 400);
        const eligible = await getEligible();
        const stats = { eligible: eligible.length, sent: 0, claimed_elsewhere: 0, failed: 0 };

        for (const p of eligible.slice(0, cap)) {
          // Claim-first: stamp the dedupe row before sending so an
          // overlapping run or retry can never double-send.
          const { error: claimErr } = await supabase
            .from('trial_emails_sent')
            .insert({ user_id: p.id, email_type: EMAIL_TYPE });
          if (claimErr) {
            stats.claimed_elsewhere++;
            continue;
          }

          const firstName = p.full_name?.trim().split(/\s+/)[0] || 'mate';
          const unsubscribeUrl = await buildUnsubscribeUrl(p.email!);
          const { error: sendErr } = await resend.emails.send({
            from: FROM,
            replyTo: REPLY_TO,
            to: p.email!,
            subject: SUBJECT,
            html: htmlEmail(firstName, unsubscribeUrl),
            text: plainText(firstName, unsubscribeUrl),
            headers: buildUnsubscribeHeaders(unsubscribeUrl),
            tags: [
              { name: 'campaign', value: 'lifetime_jul26' },
              { name: 'type', value: 'bulk' },
            ],
          });
          if (sendErr) {
            // Already claimed — deliberately NOT retried; a rare missed send
            // beats ever emailing the same person twice.
            stats.failed++;
            console.error('lifetime offer send failed (claimed, not retried)', {
              userId: p.id,
              error: sendErr,
            });
          } else {
            stats.sent++;
          }
          // Gentle rate limit for Brevo
          await new Promise((r) => setTimeout(r, 150));
        }

        result = stats;
        break;
      }

      case 'send_top100_test': {
        if (!testEmail) throw new Error('testEmail is required');
        if (!recipient?.email || !recipient?.firstName || !recipient?.stat1 || !recipient?.maths) {
          throw new Error('recipient {email, firstName, stat1, maths} is required');
        }
        const to = String(testEmail).trim().toLowerCase();
        const r = recipient as Top100Recipient;
        const unsubscribeUrl = await buildUnsubscribeUrl(to);
        const { error: sendErr } = await resend.emails.send({
          from: FROM,
          replyTo: REPLY_TO,
          to,
          subject: `[TEST] ${SUBJECT_TOP100}`,
          html: htmlTop100(r, unsubscribeUrl),
          text: plainTextTop100(r, unsubscribeUrl),
          headers: buildUnsubscribeHeaders(unsubscribeUrl),
          tags: [
            { name: 'campaign', value: 'lifetime_top100_jul26' },
            { name: 'type', value: 'test' },
          ],
        });
        if (sendErr) throw new Error(`Test send failed: ${JSON.stringify(sendErr)}`);
        result = { sent: true, to };
        break;
      }

      case 'send_top100_batch': {
        if (!Array.isArray(recipients) || recipients.length === 0) {
          throw new Error('recipients array is required');
        }

        // Map emails to user ids for the claim-first dedupe rows
        const { data: authEmails } = await supabase.rpc('get_auth_user_emails');
        const idByEmail = new Map<string, string>();
        (authEmails || []).forEach((u: { id: string; email: string | null }) => {
          if (u.email) idByEmail.set(u.email.toLowerCase(), u.id);
        });

        const { data: suppressed } = await supabase.from('email_suppressions').select('email');
        const suppressedSet = new Set((suppressed ?? []).map((s) => s.email.toLowerCase()));

        const stats = {
          requested: recipients.length,
          sent: 0,
          claimed_elsewhere: 0,
          suppressed: 0,
          no_account: 0,
          failed: 0,
        };

        for (const raw of recipients as Top100Recipient[]) {
          const email = (raw.email ?? '').trim().toLowerCase();
          if (!email || !raw.firstName || !raw.stat1 || !raw.maths) {
            stats.failed++;
            continue;
          }
          if (suppressedSet.has(email)) {
            stats.suppressed++;
            continue;
          }
          const userId = idByEmail.get(email);
          if (!userId) {
            stats.no_account++;
            continue;
          }

          // Claim-first: stamp the dedupe row before sending so an
          // overlapping run or retry can never double-send.
          const { error: claimErr } = await supabase
            .from('trial_emails_sent')
            .insert({ user_id: userId, email_type: EMAIL_TYPE_TOP100 });
          if (claimErr) {
            stats.claimed_elsewhere++;
            continue;
          }

          const unsubscribeUrl = await buildUnsubscribeUrl(email);
          const { error: sendErr } = await resend.emails.send({
            from: FROM,
            replyTo: REPLY_TO,
            to: email,
            subject: SUBJECT_TOP100,
            html: htmlTop100({ ...raw, email }, unsubscribeUrl),
            text: plainTextTop100({ ...raw, email }, unsubscribeUrl),
            headers: buildUnsubscribeHeaders(unsubscribeUrl),
            tags: [
              { name: 'campaign', value: 'lifetime_top100_jul26' },
              { name: 'type', value: 'bulk' },
            ],
          });
          if (sendErr) {
            // Already claimed — deliberately NOT retried; a rare missed send
            // beats ever emailing the same person twice.
            stats.failed++;
            console.error('top100 lifetime send failed (claimed, not retried)', {
              email,
              error: sendErr,
            });
          } else {
            stats.sent++;
          }
          // Gentle rate limit for Brevo
          await new Promise((r) => setTimeout(r, 150));
        }

        result = stats;
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'send-lifetime-offer',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
