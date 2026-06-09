// ELE-1027 — Automatic abandoned-signup trial re-engagement.
//
// Cohort: electrician/apprentice who created an account but never subscribed and
// never got free access — i.e. they bailed at the card step. A 30-min cron calls
// this; it emails each eligible user ONCE (within 30 min – 48 h of signup),
// reassures them the trial is genuinely free, attaches the feature sheet, and
// stamps profiles.reengage_email_sent_at to dedupe.
//
// Design mirrors send-welcome-email (light theme, gold/navy). Email via Brevo
// through the _shared/mailer.ts shim.
//
// Test mode: POST { "test": true, "email": "you@x", "name": "Andrew" } sends a
// single preview to that address and ignores eligibility / dedupe entirely.

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const SITE_URL = Deno.env.get('SITE_URL') || 'https://elec-mate.com';

const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding`;
const LOGO_URL = `${ASSET_BASE}/elec-mate-logo.png`;
const SHEET_URL = `${ASSET_BASE}/Elec-Mate-Marketing-Feature-Sheet.pdf`;
const SHEET_FILENAME = 'Elec-Mate-Feature-Sheet.pdf';
const LOGIN_URL = `${SITE_URL}/auth/signin`;
const FROM = 'Elec-Mate <founder@elec-mate.com>';

// Eligibility window + send pacing.
const WINDOW_MIN_MINUTES = 30; // give them a chance to come back on their own first
const WINDOW_MAX_HOURS = 48; // don't email ancient signups
const MAX_PER_RUN = 100;
const SEND_DELAY_MS = 500; // ~2/sec, within Brevo limits

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Fetch the hosted feature sheet → base64 for attachment. Never throws: a failed
// fetch must not block the email (the "view it" button is the fallback).
async function fetchSheetBase64(): Promise<string | null> {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    let bin = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  } catch (_e) {
    return null;
  }
}

const FEATURES: Array<{ t: string; d: string }> = [
  {
    t: 'AI Cost Engineer',
    d: 'Snap the job and AI prices the materials at live trade rates, ready to send as a quote.',
  },
  {
    t: 'Every BS 7671 certificate',
    d: 'EICR, EIC, Minor Works, EV, solar, fire alarm — plus an AI board scanner. Signed in the van.',
  },
  {
    t: '70+ trade calculators',
    d: 'Cable sizing, voltage drop, Zs, RCD trip times, loop impedance.',
  },
  { t: 'RAMS in two minutes', d: 'Risk assessments and method statements, ready for the site.' },
  {
    t: 'Invoices that get paid',
    d: 'One tap from quote to invoice, with Stripe payment links — card, Apple/Google Pay and bank transfer.',
  },
];

function reengageHTML(firstName: string, loginUrl: string): string {
  const year = new Date().getFullYear();
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  const featureRows = FEATURES.map(
    (item) => `
      <tr>
        <td valign="top" style="padding: 0 0 14px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="20" valign="top" style="padding-top: 5px;">
                <div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div>
              </td>
              <td valign="top">
                <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${item.t}</p>
                <p style="margin: 2px 0 0; font-size: 13px; color: #51606F; line-height: 1.5;">${item.d}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    @media only screen and (max-width: 600px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">
          <!-- logo -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>
          <!-- headline -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Your free week is waiting</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">You're one step away, ${firstName}</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">You created your Elec-Mate account but didn't quite get started — so here's the important bit:</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;"><strong style="color:#0C1B2A;">It's genuinely free for 7 days.</strong> We don't take a penny today, you get every feature with no limits, and you can cancel anytime in two taps. The card just holds your place — nothing is charged until day 8, and we'll remind you before then.</p>
            </td>
          </tr>
          <!-- reassurance / sheet card -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">What you get</p>
                    <p style="margin: 0 0 6px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">The whole job, in one app.</p>
                    <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">The full feature sheet is <strong style="color:#0C1B2A;">attached to this email as a PDF</strong> — open it to see everything inside before you commit a thing.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- feature list -->
          <tr>
            <td style="padding: 0 36px 4px;" class="pad">
              <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">A few of the tools you'll use every day</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${featureRows}
              </table>
            </td>
          </tr>
          <!-- primary CTA -->
          <tr>
            <td align="left" style="padding: 12px 36px 32px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${loginUrl}" style="height:52px;v-text-anchor:middle;width:230px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Start your free 7 days</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${loginUrl}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px; text-decoration: none;">Start your free 7 days</a>
              <!--<![endif]-->
              <p style="margin: 14px 0 0; font-size: 12.5px; color: #8B95A3; line-height: 1.5;">No charge today · cancel anytime · 7 days free</p>
            </td>
          </tr>
          <!-- founder note -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Not sure about something, or hit a snag signing up? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
            </td>
          </tr>
          <!-- footer -->
          <tr>
            <td align="center" style="padding: 18px 36px 26px; background-color: #F8FAFC;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
            </td>
          </tr>
        </table>
        <!-- unsubscribe -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px;">
          <tr>
            <td align="center" style="padding: 14px 36px 0;">
              <p style="margin: 0; font-size: 11px; color: #A8B0BC; line-height: 1.5;">You're receiving this because you started signing up at elec-mate.com. <a href="${SITE_URL}/unsubscribe" style="color:#8B95A3;">Unsubscribe</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const SUBJECT = "Your 7 days free is still here — we don't charge you today";

async function sendOne(
  to: string,
  firstName: string,
  sheetB64: string | null
): Promise<{ ok: boolean; error?: string }> {
  const attachments = sheetB64 ? [{ filename: SHEET_FILENAME, content: sheetB64 }] : undefined;
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: SUBJECT,
      html: reengageHTML(firstName, LOGIN_URL),
      attachments,
    });
    if (error) return { ok: false, error: String(error) };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));

    // ── TEST MODE — single preview, no eligibility, no dedupe ──
    if (body?.test === true) {
      const to = body.email;
      if (!to) {
        return new Response(JSON.stringify({ error: 'test mode needs an "email"' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const firstName = (body.name || '').toString().split(' ')[0] || 'there';
      const sheetB64 = await fetchSheetBase64();
      const r = await sendOne(to, firstName, sheetB64);
      return new Response(
        JSON.stringify({ tested: true, to, attached: !!sheetB64, ok: r.ok, error: r.error }),
        {
          status: r.ok ? 200 : 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ── CRON MODE — find eligible abandoned signups and email once ──
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const now = Date.now();
    const createdBefore = new Date(now - WINDOW_MIN_MINUTES * 60 * 1000).toISOString();
    const createdAfter = new Date(now - WINDOW_MAX_HOURS * 60 * 60 * 1000).toISOString();

    const { data: profiles, error: qErr } = await supabase
      .from('profiles')
      .select('id, full_name, role, created_at')
      .or('role.eq.electrician,role.eq.apprentice')
      .eq('subscribed', false)
      .eq('free_access_granted', false)
      // Abandoned checkout = never put card details in. Anyone who started a
      // subscription or trial (carded) is winback's job, not this email.
      .is('subscription_start', null)
      .is('subscription_end', null)
      .not('is_trial', 'is', true)
      .not('is_trial_cancelled', 'is', true)
      .is('reengage_email_sent_at', null)
      .lte('created_at', createdBefore)
      .gte('created_at', createdAfter)
      .order('created_at', { ascending: true })
      .limit(MAX_PER_RUN);

    if (qErr) throw qErr;
    if (!profiles || profiles.length === 0) {
      return new Response(JSON.stringify({ eligible: 0, sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Emails live in auth.users — resolve via the existing RPC.
    const { data: authEmails } = await supabase.rpc('get_auth_user_emails');
    const emailMap = new Map<string, string>();
    (authEmails || []).forEach((u: { id: string; email: string | null }) => {
      if (u.email) emailMap.set(u.id, u.email);
    });

    const sheetB64 = await fetchSheetBase64();
    let sent = 0;
    let skippedNoEmail = 0;
    let skippedAlreadyClaimed = 0;
    let failed = 0;

    for (const p of profiles) {
      const email = emailMap.get(p.id as string);
      if (!email) {
        skippedNoEmail++;
        continue;
      }
      const firstName = ((p.full_name as string) || '').split(' ')[0] || 'there';

      // CLAIM FIRST — atomically stamp the row, but only if it's still unsent
      // (.is(...null)). This guarantees one email per person: an overlapping run,
      // a retry, or a crash mid-batch can never send to someone already claimed.
      const { data: claimed, error: claimErr } = await supabase
        .from('profiles')
        .update({ reengage_email_sent_at: new Date().toISOString() })
        .eq('id', p.id)
        .is('reengage_email_sent_at', null)
        .select('id');

      if (claimErr || !claimed || claimed.length === 0) {
        // already claimed by another run (or claim failed) — skip, never double-send
        skippedAlreadyClaimed++;
        continue;
      }

      const r = await sendOne(email, firstName, sheetB64);
      if (r.ok) {
        sent++;
      } else {
        // Already marked sent, so we deliberately do NOT retry — a rare missed
        // send is preferable to ever emailing the same person twice.
        failed++;
        console.error('reengage send failed (marked, will not retry)', {
          id: p.id,
          error: r.error,
        });
      }
      await sleep(SEND_DELAY_MS);
    }

    return new Response(
      JSON.stringify({
        eligible: profiles.length,
        sent,
        skippedNoEmail,
        skippedAlreadyClaimed,
        failed,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    captureException(err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
