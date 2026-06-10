// ELE-1027 — Automatic abandoned-signup trial re-engagement (3-touch sequence).
//
// Cohort: electrician/apprentice who created an account but never subscribed and
// never got free access — i.e. they bailed at the card step. A 30-min cron calls
// this and walks each eligible user through up to three emails:
//
//   Touch 1 (30 min – 48 h after signup)  — "the trial is genuinely free", feature
//            sheet attached. Stamps profiles.reengage_email_sent_at.
//   Touch 2 (day 3–10, ≥2 days after touch 1) — what's inside the app, role-aware
//            feature list + App Store trust. Stamps reengage_email_2_sent_at.
//   Touch 3 (day 7–21, ≥3 days after touch 2) — personal note from Andrew, "what
//            put you off? hit reply". Final touch, says so honestly. Stamps
//            reengage_email_3_sent_at.
//
// Anyone who cards up (trial/subscription) mid-sequence drops out automatically:
// every touch re-checks the full never-carded filter at send time. Each touch
// requires the previous one, so the touches are mutually exclusive within a run —
// nobody can ever get two emails in one pass. Windows are bounded so a dead cron
// can never sweep ancient signups back in.
//
// Design mirrors send-welcome-email (light theme, gold/navy). Email via Brevo
// through the _shared/mailer.ts shim.
//
// Test mode: POST { "test": true, "email": "you@x", "name": "Andrew",
// "touch": 1|2|3, "role": "electrician"|"apprentice" } sends a single preview to
// that address and ignores eligibility / dedupe entirely.

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
const APP_STORE_URL = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const FROM = 'Elec-Mate <founder@elec-mate.com>';

// Touch timing. Each touch is windowed on signup date (so a dead cron can't
// sweep ancient accounts) AND spaced from the previous touch (so a backlog can
// never stack two emails close together).
const TOUCH1_MIN_MINUTES = 30; // give them a chance to come back on their own first
const TOUCH1_MAX_HOURS = 48; // don't email ancient signups
const TOUCH2_MIN_DAYS = 3;
const TOUCH2_MAX_DAYS = 10;
const TOUCH2_GAP_DAYS = 2; // at least this long after touch 1
const TOUCH3_MIN_DAYS = 7;
const TOUCH3_MAX_DAYS = 21;
const TOUCH3_GAP_DAYS = 3; // at least this long after touch 2

const MAX_PER_RUN = 100; // shared across all three touches
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

const ELECTRICIAN_FEATURES: Array<{ t: string; d: string }> = [
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

const APPRENTICE_FEATURES: Array<{ t: string; d: string }> = [
  {
    t: 'AM2 simulator',
    d: 'Timed mocks with worked explanations — practise the assessment before the real thing.',
  },
  {
    t: '2,000+ practice questions',
    d: 'Level 2 & 3, sorted by topic. Quiz yourself on a break or in the van.',
  },
  {
    t: 'Full Level 2 & 3 courses',
    d: 'Structured lessons that match what college covers, with videos for every topic.',
  },
  {
    t: 'Portfolio & OTJ logbook',
    d: 'Log jobs, hours and evidence against your standard — audit-ready when your assessor asks.',
  },
  {
    t: '50+ electrical calculators',
    d: 'Zs, volt drop, cable sizing — learn by doing, with worked answers.',
  },
];

function featureRowsHTML(features: Array<{ t: string; d: string }>): string {
  return features
    .map(
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
    )
    .join('');
}

const SHARED_HEAD = `<!DOCTYPE html>
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
</head>`;

function unsubscribeFooter(): string {
  return `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px;">
          <tr>
            <td align="center" style="padding: 14px 36px 0;">
              <p style="margin: 0; font-size: 11px; color: #A8B0BC; line-height: 1.5;">You're receiving this because you started signing up at elec-mate.com. <a href="${SITE_URL}/unsubscribe" style="color:#8B95A3;">Unsubscribe</a></p>
            </td>
          </tr>
        </table>`;
}

function ctaButton(label: string): string {
  return `
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${LOGIN_URL}" style="height:52px;v-text-anchor:middle;width:230px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${LOGIN_URL}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px; text-decoration: none;">${label}</a>
              <!--<![endif]-->`;
}

// ── Touch 1 — "the trial is genuinely free" ──
function touch1HTML(firstName: string): string {
  const year = new Date().getFullYear();
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";

  return `${SHARED_HEAD}
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
                ${featureRowsHTML(ELECTRICIAN_FEATURES)}
              </table>
            </td>
          </tr>
          <!-- primary CTA -->
          <tr>
            <td align="left" style="padding: 12px 36px 32px;" class="pad">
              ${ctaButton('Start your free 7 days')}
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
        ${unsubscribeFooter()}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Touch 2 — what's actually inside, role-aware ──
function touch2HTML(firstName: string, role: string): string {
  const year = new Date().getFullYear();
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  const features = role === 'apprentice' ? APPRENTICE_FEATURES : ELECTRICIAN_FEATURES;
  const intro =
    role === 'apprentice'
      ? 'Everything you need to get through your apprenticeship — courses, AM2 prep, your portfolio — lives in the account you already made.'
      : 'Certs, quoting, RAMS, calculators — the whole working day lives in the account you already made.';

  return `${SHARED_HEAD}
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
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Your account is still there</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Here's what's inside, ${firstName}</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${intro} Your free week hasn't started yet — it only begins when you do.</p>
            </td>
          </tr>
          <!-- feature list -->
          <tr>
            <td style="padding: 0 36px 4px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${featureRowsHTML(features)}
              </table>
            </td>
          </tr>
          <!-- App Store trust card -->
          <tr>
            <td style="padding: 10px 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">Prefer the app?</p>
                    <p style="margin: 0 0 6px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">On the App Store and Google Play.</p>
                    <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Subscribe through <a href="${APP_STORE_URL}" style="color:#B5840A; font-weight:600;">Apple</a> if you'd rather — they handle billing, refunds and cancellation, and you can cancel in your phone settings with one tap.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- primary CTA -->
          <tr>
            <td align="left" style="padding: 0 36px 32px;" class="pad">
              ${ctaButton('Start your free 7 days')}
              <p style="margin: 14px 0 0; font-size: 12.5px; color: #8B95A3; line-height: 1.5;">No charge today · cancel anytime · 7 days free</p>
            </td>
          </tr>
          <!-- founder note -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
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
        ${unsubscribeFooter()}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Touch 3 — personal note from Andrew, reply-driven, honest final touch ──
function touch3HTML(firstName: string): string {
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  const p = `margin: 0 0 16px; font-size: 15px; color: #0C1B2A; line-height: 1.65;`;

  return `${SHARED_HEAD}
<body style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFFFF;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px;">
          <tr>
            <td align="left" style="padding: 0 12px;">
              <p style="${p}">Hey ${firstName},</p>
              <p style="${p}">Andrew here — I'm the founder of Elec-Mate.</p>
              <p style="${p}">You signed up a week or two back but never got started, and this is the last email I'll send you about it. Before I leave you alone, can I ask one thing: <strong>what put you off?</strong></p>
              <p style="${p}">Was it the price? Couldn't find the feature you actually needed? Something feel off? Or did life just get in the way?</p>
              <p style="${p}">Hit reply and tell me — even one line. It comes straight to my inbox and I read every single one. Whatever the reason, it helps me build something better for the trade.</p>
              <p style="${p}">Cheers,<br>Andrew<br><span style="color:#51606F; font-size: 13px;">Founder, Elec-Mate</span></p>
              <p style="margin: 24px 0 0; font-size: 13px; color: #51606F; line-height: 1.6; font-style: italic;">P.S. Your 7-day free trial is still there if you fancy a proper look — <a href="${LOGIN_URL}" style="color:#B5840A;">sign in here</a>. Nothing is charged until day 8.</p>
            </td>
          </tr>
        </table>
        ${unsubscribeFooter()}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const TOUCH1_SUBJECT = "Your 7 days free is still here — we don't charge you today";
const TOUCH2_SUBJECT = "Your Elec-Mate account is still sitting there — here's what's inside";
const TOUCH3_SUBJECT = 'Quick question';

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  sheetB64?: string | null;
}

async function sendOne({ to, subject, html, sheetB64 }: SendArgs): Promise<{
  ok: boolean;
  error?: string;
}> {
  const attachments = sheetB64 ? [{ filename: SHEET_FILENAME, content: sheetB64 }] : undefined;
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html, attachments });
    if (error) return { ok: false, error: String(error) };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

interface TouchProfile {
  id: string;
  full_name: string | null;
  role: string | null;
  created_at: string;
}

interface TouchStats {
  eligible: number;
  sent: number;
  skippedNoEmail: number;
  skippedAlreadyClaimed: number;
  failed: number;
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
      const touch = Number(body.touch) || 1;
      const role = body.role === 'apprentice' ? 'apprentice' : 'electrician';

      let args: SendArgs;
      if (touch === 3) {
        args = { to, subject: TOUCH3_SUBJECT, html: touch3HTML(firstName) };
      } else if (touch === 2) {
        args = { to, subject: TOUCH2_SUBJECT, html: touch2HTML(firstName, role) };
      } else {
        args = {
          to,
          subject: TOUCH1_SUBJECT,
          html: touch1HTML(firstName),
          sheetB64: await fetchSheetBase64(),
        };
      }
      const r = await sendOne(args);
      return new Response(JSON.stringify({ tested: true, to, touch, ok: r.ok, error: r.error }), {
        status: r.ok ? 200 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── CRON MODE — walk the three touches, oldest obligation first ──
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const now = Date.now();
    const iso = (msAgo: number) => new Date(now - msAgo).toISOString();
    const MIN = 60 * 1000;
    const HOUR = 60 * MIN;
    const DAY = 24 * HOUR;

    // Abandoned checkout = never put card details in. Anyone who started a
    // subscription or trial (carded) is winback's job, not this sequence —
    // re-checked at EVERY touch so mid-sequence converts drop out.
    const neverCarded = () =>
      supabase
        .from('profiles')
        .select('id, full_name, role, created_at')
        .or('role.eq.electrician,role.eq.apprentice')
        .eq('subscribed', false)
        .eq('free_access_granted', false)
        .is('subscription_start', null)
        .is('subscription_end', null)
        .not('is_trial', 'is', true)
        .not('is_trial_cancelled', 'is', true)
        .order('created_at', { ascending: true });

    // Emails live in auth.users — resolve via the existing RPC.
    const { data: authEmails } = await supabase.rpc('get_auth_user_emails');
    const emailMap = new Map<string, string>();
    (authEmails || []).forEach((u: { id: string; email: string | null }) => {
      if (u.email) emailMap.set(u.id, u.email);
    });

    let budget = MAX_PER_RUN;

    // Claim-first send loop, shared by all touches. Atomically stamps the
    // touch's dedupe column (only if still null), so an overlapping run, a
    // retry, or a crash mid-batch can never send to someone already claimed.
    const processTouch = async (
      profiles: TouchProfile[],
      dedupeColumn: string,
      buildArgs: (p: TouchProfile, email: string) => SendArgs
    ): Promise<TouchStats> => {
      const stats: TouchStats = {
        eligible: profiles.length,
        sent: 0,
        skippedNoEmail: 0,
        skippedAlreadyClaimed: 0,
        failed: 0,
      };
      for (const p of profiles) {
        if (budget <= 0) break;
        const email = emailMap.get(p.id);
        if (!email) {
          stats.skippedNoEmail++;
          continue;
        }

        const { data: claimed, error: claimErr } = await supabase
          .from('profiles')
          .update({ [dedupeColumn]: new Date().toISOString() })
          .eq('id', p.id)
          .is(dedupeColumn, null)
          .select('id');

        if (claimErr || !claimed || claimed.length === 0) {
          stats.skippedAlreadyClaimed++;
          continue;
        }

        budget--;
        const r = await sendOne(buildArgs(p, email));
        if (r.ok) {
          stats.sent++;
        } else {
          // Already marked sent, so we deliberately do NOT retry — a rare missed
          // send is preferable to ever emailing the same person twice.
          stats.failed++;
          console.error('reengage send failed (marked, will not retry)', {
            id: p.id,
            touch: dedupeColumn,
            error: r.error,
          });
        }
        await sleep(SEND_DELAY_MS);
      }
      return stats;
    };

    const firstNameOf = (p: TouchProfile) => (p.full_name || '').split(' ')[0] || 'there';

    // Touch 1 — 30 min to 48 h after signup, nothing sent yet.
    const { data: t1, error: t1Err } = await neverCarded()
      .is('reengage_email_sent_at', null)
      .lte('created_at', iso(TOUCH1_MIN_MINUTES * MIN))
      .gte('created_at', iso(TOUCH1_MAX_HOURS * HOUR))
      .limit(MAX_PER_RUN);
    if (t1Err) throw t1Err;

    const sheetB64 = t1 && t1.length > 0 ? await fetchSheetBase64() : null;
    const touch1 = await processTouch(
      (t1 || []) as TouchProfile[],
      'reengage_email_sent_at',
      (p, email) => ({
        to: email,
        subject: TOUCH1_SUBJECT,
        html: touch1HTML(firstNameOf(p)),
        sheetB64,
      })
    );

    // Touch 2 — day 3–10, touch 1 sent at least 2 days ago, touch 2 unsent.
    const { data: t2, error: t2Err } = await neverCarded()
      .not('reengage_email_sent_at', 'is', null)
      .lte('reengage_email_sent_at', iso(TOUCH2_GAP_DAYS * DAY))
      .is('reengage_email_2_sent_at', null)
      .lte('created_at', iso(TOUCH2_MIN_DAYS * DAY))
      .gte('created_at', iso(TOUCH2_MAX_DAYS * DAY))
      .limit(MAX_PER_RUN);
    if (t2Err) throw t2Err;

    const touch2 = await processTouch(
      (t2 || []) as TouchProfile[],
      'reengage_email_2_sent_at',
      (p, email) => ({
        to: email,
        subject: TOUCH2_SUBJECT,
        html: touch2HTML(firstNameOf(p), p.role || 'electrician'),
      })
    );

    // Touch 3 — day 7–21, touch 2 sent at least 3 days ago, touch 3 unsent.
    const { data: t3, error: t3Err } = await neverCarded()
      .not('reengage_email_2_sent_at', 'is', null)
      .lte('reengage_email_2_sent_at', iso(TOUCH3_GAP_DAYS * DAY))
      .is('reengage_email_3_sent_at', null)
      .lte('created_at', iso(TOUCH3_MIN_DAYS * DAY))
      .gte('created_at', iso(TOUCH3_MAX_DAYS * DAY))
      .limit(MAX_PER_RUN);
    if (t3Err) throw t3Err;

    const touch3 = await processTouch(
      (t3 || []) as TouchProfile[],
      'reengage_email_3_sent_at',
      (p, email) => ({
        to: email,
        subject: TOUCH3_SUBJECT,
        html: touch3HTML(firstNameOf(p)),
      })
    );

    return new Response(JSON.stringify({ touch1, touch2, touch3 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    captureException(err, { functionName: 'auto-reengage-trial' });
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
