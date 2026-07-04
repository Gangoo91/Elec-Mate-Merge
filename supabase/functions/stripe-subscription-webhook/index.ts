/**
 * Stripe Subscription Webhook
 * Handles subscription lifecycle events
 * Updates user subscription status in real-time
 * Sends welcome emails to new subscribers
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { Resend } from '../_shared/mailer.ts';
import { renderDunningEmail } from '../_shared/email-templates/dunning.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException, captureMessage } from '../_shared/sentry.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { capturePostHogEvent } from '../_shared/posthog-server.ts';
import { getSubscriptionPeriodEnd } from '../_shared/stripe-helpers.ts';
import { generateWaCodeForUser } from '../_shared/wa-onboarding.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, stripe-signature, x-request-id',
};

// Tier display names
const TIER_NAMES: Record<string, string> = {
  apprentice: 'Apprentice',
  apprentice_yearly: 'Apprentice (Annual)',
  electrician: 'Electrician Pro',
  electrician_yearly: 'Electrician Pro (Annual)',
  business_ai: 'Business AI',
  business_ai_yearly: 'Business AI (Annual)',
  desktop: 'Desktop',
  desktop_yearly: 'Desktop (Annual)',
  employer: 'Employer',
  employer_yearly: 'Employer (Annual)',
  college: 'College',
  college_yearly: 'College (Annual)',
  Founder: 'Founder',
};

// Tiers that include Business AI agent access
const BUSINESS_AI_TIERS = new Set([
  'business_ai',
  'business_ai_yearly',
  'employer',
  'employer_yearly',
]);

// Tier-specific feature lists for welcome email
const TIER_FEATURES: Record<
  string,
  { icon: string; iconColor: string; title: string; subtitle: string }[]
> = {
  apprentice: [
    {
      icon: '&#128218;',
      iconColor: '#3b82f6',
      title: '2,000+ Practice Questions',
      subtitle: 'AM2 prep, mock exams, flashcards & progress tracking',
    },
    {
      icon: '&#128161;',
      iconColor: '#22c55e',
      title: 'Full Study Centre',
      subtitle: 'Level 2 & 3 courses, BS 7671 18th Edition guides',
    },
    {
      icon: '&#9889;',
      iconColor: '#fbbf24',
      title: '50+ Electrical Calculators',
      subtitle: 'Cable sizing, Zs, voltage drop, conduit fill & more',
    },
  ],
  electrician: [
    {
      icon: '&#128203;',
      iconColor: '#22c55e',
      title: 'Unlimited Certificates',
      subtitle: 'EICR, EIC, minor works, PAT, fire alarm, solar PV & EV',
    },
    {
      icon: '&#129302;',
      iconColor: '#3b82f6',
      title: '8 AI Specialist Agents',
      subtitle: 'Cost engineer, circuit designer, installer, RAMS & more',
    },
    {
      icon: '&#128176;',
      iconColor: '#fbbf24',
      title: 'Quoting & Invoicing',
      subtitle: 'Create quotes, raise invoices, send & track from your phone',
    },
  ],
  business_ai: [
    {
      icon: '&#128172;',
      iconColor: '#22c55e',
      title: 'Mate on WhatsApp',
      subtitle: 'Quote jobs, raise invoices, look up BS 7671 — all via chat',
    },
    {
      icon: '&#9728;',
      iconColor: '#fbbf24',
      title: 'Morning Briefings',
      subtitle: 'Daily schedule, weather, outstanding quotes & overdue invoices',
    },
    {
      icon: '&#128640;',
      iconColor: '#3b82f6',
      title: 'Automated Admin',
      subtitle: 'Invoice chasing, email lead monitoring, certificate delivery',
    },
  ],
  employer: [
    {
      icon: '&#128101;',
      iconColor: '#a855f7',
      title: 'Team Management',
      subtitle: 'GPS tracking, job packs, assignments & timesheets',
    },
    {
      icon: '&#128172;',
      iconColor: '#22c55e',
      title: 'Mate AI for Your Team',
      subtitle: 'WhatsApp AI assistant for you and your engineers',
    },
    {
      icon: '&#128200;',
      iconColor: '#fbbf24',
      title: 'Business Intelligence',
      subtitle: 'Finance hub, safety hub, reporting & talent pool',
    },
  ],
};

// Getting Started guide — same hosted asset the signup welcome attaches.
const GETTING_STARTED_PDF_URL =
  'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/onboarding/Elec-Mate-Getting-Started.pdf';
const GETTING_STARTED_PDF_FILENAME = 'Elec-Mate-Getting-Started.pdf';

// Fetch the Getting Started PDF as base64 for attachment. Never throws — a failed
// fetch must not block the welcome email (the download button still works).
async function fetchGettingStartedPdfBase64(): Promise<string | null> {
  try {
    const res = await fetch(GETTING_STARTED_PDF_URL);
    if (!res.ok) {
      console.error(`Getting Started PDF fetch failed: ${res.status}`);
      return null;
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    let bin = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  } catch (err) {
    console.error('Getting Started PDF fetch error:', err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Send welcome email to new subscriber
 */
async function sendWelcomeEmail(
  email: string,
  name: string,
  tierName: string,
  isYearly: boolean,
  tier: string,
  isReturning: boolean = false
): Promise<void> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping welcome email');
    return;
  }

  const resend = new Resend(resendApiKey);

  const billingLabel = isYearly ? 'Billed yearly' : 'Billed monthly';
  const tierBase = tier.replace(/_yearly$/, '');
  const features = TIER_FEATURES[tierBase] || TIER_FEATURES['electrician'];
  const logoUrl =
    'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png';
  const year = new Date().getFullYear();

  // Returning win-back customers get a "welcome back" framing rather than being
  // greeted like a brand-new signup.
  const eyebrow = isReturning ? 'Welcome back' : 'Subscription active';
  const heading = isReturning ? 'Good to have you back' : 'You&rsquo;re all set';
  const intro = isReturning
    ? `Your <strong style="color: #B5840A;">${tierName}</strong> subscription is active again — welcome back. Your data, certificates and quotes are exactly where you left them.`
    : `Your <strong style="color: #B5840A;">${tierName}</strong> subscription is active. Here&rsquo;s everything it unlocks.`;

  // Getting Started guide card — same for everyone. Returners don't need a
  // "what's new" spiel; they're back in and will pick it up themselves.
  const guideEyebrow = 'Getting Started guide';
  const guideTitle = 'Set it up once. It follows you everywhere.';
  const guideLine =
    'A quick walkthrough to get the most out of Elec-Mate. It&rsquo;s attached, or download it below.';

  // Light editorial feature rows — matches the signup welcome email.
  const featureRowsHtml = features
    .map(
      (f) => `
                <tr>
                  <td valign="top" style="padding: 0 0 14px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="20" valign="top" style="padding-top: 5px;">
                          <div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div>
                        </td>
                        <td valign="top">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${f.title}</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: #51606F; line-height: 1.5;">${f.subtitle}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
    )
    .join('');

  const emailHtml = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your Elec-Mate subscription is active</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${logoUrl}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">${eyebrow}</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">${heading}</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${name},</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${intro}</p>
            </td>
          </tr>

          <!-- Subscription confirmation card -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 18px 22px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #51606F;">Plan</td>
                        <td style="text-align: right; padding: 4px 0; font-size: 14px; color: #0C1B2A; font-weight: 700;">${tierName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #51606F;">Billing</td>
                        <td style="text-align: right; padding: 4px 0; font-size: 14px; color: #0C1B2A; font-weight: 600;">${billingLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #51606F;">Status</td>
                        <td style="text-align: right; padding: 4px 0; font-size: 14px; color: #1E874B; font-weight: 700;">&#10003; Active</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What you've unlocked -->
          <tr>
            <td style="padding: 0 36px 4px;" class="pad">
              <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">What you&rsquo;ve unlocked</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${featureRowsHtml}
              </table>
            </td>
          </tr>

          <!-- Getting Started guide card -->
          <tr>
            <td style="padding: 18px 36px 4px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">${guideEyebrow}</p>
                    <p style="margin: 0 0 6px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">${guideTitle}</p>
                    <p style="margin: 0 0 18px; font-size: 13px; color: #51606F; line-height: 1.55;">${guideLine}</p>
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${GETTING_STARTED_PDF_URL}" style="height:46px;v-text-anchor:middle;width:230px;" arcsize="24%" fillcolor="#0C1B2A">
                      <w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">Download the guide (PDF)</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${GETTING_STARTED_PDF_URL}" style="display: inline-block; padding: 13px 24px; background-color: #0C1B2A; color: #FFFFFF; font-size: 14px; font-weight: 700; border-radius: 10px;">Download the guide (PDF)</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="left" style="padding: 12px 36px 32px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.elec-mate.com" style="height:52px;v-text-anchor:middle;width:200px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Open Elec-Mate</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="https://www.elec-mate.com" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Open Elec-Mate</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions, or not sure where something is? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 18px 36px 26px; background-color: #F8FAFC;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  const pdfBase64 = await fetchGettingStartedPdfBase64();
  const attachments = pdfBase64
    ? [{ filename: GETTING_STARTED_PDF_FILENAME, content: pdfBase64 }]
    : undefined;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      replyTo: 'founder@elec-mate.com',
      to: [email],
      attachments,
      subject: isReturning
        ? `Welcome back to Elec-Mate — your ${tierName} subscription is active`
        : `Welcome to Elec-Mate — your ${tierName} subscription is active`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Failed to send welcome email:', error);
    } else {
      console.log(`✅ Welcome email sent to ${email}:`, data?.id);
    }
  } catch (err) {
    console.error('❌ Error sending welcome email:', err);
  }
}

/**
 * Send payment failed email (Email 1 in dunning sequence)
 */
async function sendPaymentFailedEmail(
  email: string,
  name: string,
  amount: string,
  hostedInvoiceUrl: string
): Promise<void> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping payment failed email');
    return;
  }

  const resend = new Resend(resendApiKey);

  const emailHtml = renderDunningEmail({
    name,
    amount,
    payUrl: hostedInvoiceUrl,
    tone: 'failed',
  }).html;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ElecMate <founder@elec-mate.com>',
      replyTo: 'founder@elec-mate.com',
      to: [email],
      subject: "Your Elec-Mate payment didn't go through",
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Failed to send payment failed email:', error);
    } else {
      console.log(`✅ Payment failed email sent to ${email}:`, data?.id);
    }
  } catch (err) {
    console.error('❌ Error sending payment failed email:', err);
  }
}

/**
 * Notify the founder (founder@elec-mate.com) every time someone new signs up.
 * Fired once on `customer.subscription.created` for every tier. For Mate
 * signups it also reports the live founder-slot count (X of 100) so the
 * founder gets the dopamine hit of seeing the slots fill up.
 *
 * Fire-and-forget — never blocks the webhook response.
 */
async function sendFounderSignupNotification(args: {
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  tier: string;
  tierName: string;
  isTrial: boolean;
  isFounder: boolean;
  amountPence: number;
  currency: string;
  isYearly: boolean;
  subscriptionId: string;
  userId: string;
  founderSlotsLeft: number | null;
  founderSlotsCap: number | null;
}): Promise<void> {
  const brevoApiKey = Deno.env.get('BREVO_API_KEY');
  if (!brevoApiKey) {
    console.warn('⚠️ BREVO_API_KEY not configured — skipping founder signup notification');
    return;
  }
  const amount = (args.amountPence / 100).toFixed(2);
  const period = args.isYearly ? '/yr' : '/mo';
  const cur = args.currency.toUpperCase() === 'GBP' ? '£' : args.currency.toUpperCase() + ' ';
  const firstName = args.customerName.trim().split(/\s+/)[0] || 'them';

  // Subject — what hits the lock screen. Yellow squares, the name, the tier.
  // Format: "🎉 Sarah Mitchell · Mate Founder · TRIAL"
  const founderTag = args.isFounder ? ' Founder' : '';
  const stateTag = args.isTrial ? ' · TRIAL' : ' · PAID';
  const subject = `🎉 ${args.customerName} · ${args.tierName}${founderTag}${stateTag}`;

  // Single status line that compresses tier + trial/paid + founder slot.
  // Examples:
  //   "Mate · 3-day trial · founder slot 14 of 100"
  //   "Mate · paid"
  //   "Apprentice · 7-day trial"
  const slotsClaimed =
    args.isFounder && args.founderSlotsLeft !== null && args.founderSlotsCap !== null
      ? args.founderSlotsCap - args.founderSlotsLeft
      : null;
  const trialDaysForTier = args.tier.startsWith('business_ai') ? 3 : 7;
  const statusBits: string[] = [args.tierName];
  if (args.isTrial) statusBits.push(`${trialDaysForTier}-day trial`);
  else statusBits.push('paid');
  if (args.isFounder && slotsClaimed !== null && args.founderSlotsCap !== null) {
    statusBits.push(`founder slot ${slotsClaimed} of ${args.founderSlotsCap}`);
  }
  const statusLine = statusBits.join(' · ');

  // Founder progress visual — only when this signup *is* a founder claim.
  const slotPct =
    args.isFounder && slotsClaimed !== null && args.founderSlotsCap !== null
      ? Math.round((slotsClaimed * 100) / args.founderSlotsCap)
      : 0;
  const slotBar =
    args.isFounder && slotsClaimed !== null && args.founderSlotsCap !== null
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
  <tr><td style="padding:18px 20px;background:#FFFAEC;border:1px solid #EFD489;border-radius:14px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-size:11px;font-weight:700;letter-spacing:0.18em;color:#B5840A;text-transform:uppercase;">Founder programme</td>
        <td align="right" style="font-size:13px;color:#0C1B2A;font-weight:700;">${slotsClaimed}<span style="color:#8B95A3;font-weight:400;">/${args.founderSlotsCap}</span></td>
      </tr>
    </table>
    <div style="height:6px;background:#F0E6C8;border-radius:999px;overflow:hidden;margin-top:10px;">
      <div style="height:100%;width:${slotPct}%;background:linear-gradient(90deg,#F3B70A,#E0A800);border-radius:999px;"></div>
    </div>
    <div style="font-size:13px;color:#51606F;margin-top:10px;line-height:1.5;">
      ${args.founderSlotsLeft} spots left. ${args.customerName.split(/\s+/)[0]} locked in <span style="color:#B5840A;font-weight:700;">${cur}${amount}${period} forever</span>.
    </div>
  </td></tr>
</table>`
      : '';

  const phoneLine = args.customerPhone
    ? `<tr><td style="padding:7px 0;color:#8B95A3;">Phone</td><td style="padding:7px 0;color:#0C1B2A;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${args.customerPhone}</td></tr>`
    : '';

  const emailHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/><meta name="supported-color-schemes" content="light"/></head>
<body style="margin:0;padding:0;background:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#0C1B2A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F6F9;">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

      <tr><td style="padding:0 6px 20px 6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td align="left" valign="middle"><img src="https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png" alt="Elec-Mate" width="40" height="40" style="display:inline-block;vertical-align:middle;border-radius:10px;border:1px solid #E6E9EE;"/></td>
          <td align="right" valign="middle" style="font-size:11px;font-weight:700;letter-spacing:0.2em;color:#B5840A;text-transform:uppercase;">Founder alert</td>
        </tr></table>
      </td></tr>

      <tr><td style="background:#FFFFFF;border:1px solid #E6E9EE;border-radius:18px;padding:34px 32px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;color:#B5840A;text-transform:uppercase;">New signup ⚡</div>
        <h1 style="margin:12px 0 6px 0;font-size:38px;line-height:1.07;font-weight:800;letter-spacing:-0.02em;color:#0C1B2A;">${args.customerName}</h1>
        <p style="margin:0 0 8px 0;font-size:20px;line-height:1.3;font-weight:500;color:#51606F;">just joined <span style="color:#B5840A;font-weight:700;">${args.tierName}</span>.</p>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#8B95A3;">${statusLine}</p>
        ${slotBar}
        <div style="height:1px;background:#EAEDF1;margin:28px 0 22px 0;"></div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;color:#0C1B2A;text-transform:uppercase;margin-bottom:12px;">Details</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;line-height:1.5;">
          <tr><td style="padding:7px 0;color:#8B95A3;width:90px;">Email</td><td style="padding:7px 0;color:#0C1B2A;"><a href="mailto:${args.customerEmail}" style="color:#B5840A;text-decoration:none;font-weight:600;">${args.customerEmail}</a></td></tr>
          ${phoneLine}
          <tr><td style="padding:7px 0;color:#8B95A3;">Tier</td><td style="padding:7px 0;color:#0C1B2A;">${args.tierName}${args.isFounder ? ' · founder price locked in' : ''}</td></tr>
          <tr><td style="padding:7px 0;color:#8B95A3;">Amount</td><td style="padding:7px 0;color:#0C1B2A;font-weight:700;">${cur}${amount}${period}${args.isTrial ? ` <span style="color:#8B95A3;font-weight:400;">(after ${trialDaysForTier}-day trial)</span>` : ''}</td></tr>
          <tr><td style="padding:7px 0;color:#8B95A3;">User ID</td><td style="padding:7px 0;color:#51606F;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;">${args.userId}</td></tr>
          <tr><td style="padding:7px 0;color:#8B95A3;">Sub ID</td><td style="padding:7px 0;color:#51606F;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;">${args.subscriptionId}</td></tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
          <tr>
            <td style="padding-right:6px;width:50%;">
              <a href="https://elec-mate.com/admin/mate/${args.userId}" style="display:block;text-align:center;padding:14px;border-radius:12px;background:#F3B70A;color:#0C1B2A;font-weight:700;font-size:14px;text-decoration:none;letter-spacing:-0.01em;">View in admin →</a>
            </td>
            <td style="padding-left:6px;width:50%;">
              <a href="mailto:${args.customerEmail}" style="display:block;text-align:center;padding:14px;border-radius:12px;background:#FFFFFF;border:1px solid #D8DEE6;color:#0C1B2A;font-weight:600;font-size:14px;text-decoration:none;">Reply to ${firstName}</a>
            </td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:20px 8px 0 8px;font-size:11px;line-height:1.6;color:#8B95A3;">
        Sent ${new Date().toISOString()}. Founder signup notifications are on for this account.
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: 'founder@elec-mate.com', name: 'Elec-Mate Signups' },
        to: [{ email: 'founder@elec-mate.com', name: 'Elec-Mate Founder' }],
        replyTo: { email: args.customerEmail, name: args.customerName },
        subject,
        htmlContent: emailHtml,
        tags: ['founder-notification', args.tier],
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `❌ Founder signup notification failed: Brevo ${res.status}: ${body.slice(0, 200)}`
      );
    } else {
      console.log(`✅ Founder signup notification sent (${args.tierName} — ${args.customerName})`);
    }
  } catch (err) {
    console.error('❌ Error sending founder signup notification:', err);
  }
}

// Map Stripe price IDs to subscription tiers
// CURRENT ACTIVE PRICES (as of Jan 2026)
const PRICE_TO_TIER: Record<string, string> = {
  // Apprentice - £6.99/month (current, new customers), £69.99/year
  price_1TnbOk2RKw5t5RAmiOCTkqS3: 'apprentice', // £6.99/month (current — Jun 2026, new customers)
  price_1TnbOl2RKw5t5RAmmNsVstDW: 'apprentice_yearly', // £69.99/year (current — Jun 2026, new customers)
  price_1TKlA22RKw5t5RAmpvhojy0b: 'apprentice', // £5.99/month (prior — keep for existing subs)
  price_1SmUef2RKw5t5RAmRIMTWTqU: 'apprentice', // £4.99/month (legacy — keep for existing subs)
  price_1TKlKK2RKw5t5RAmGVR5EcF9: 'apprentice_yearly', // £59.99/year (prior — keep for existing subs)
  price_1SmUfK2RKw5t5RAml6bj1I77: 'apprentice_yearly', // £49.99/year (legacy — keep for existing subs)

  // Electrician Pro - £19.99/month (current, new customers), £199.99/year
  price_1TnbOh2RKw5t5RAmsf2KcHT6: 'electrician', // £19.99/month (current — Jun 2026, new customers)
  price_1TnbOj2RKw5t5RAmEIXS6oyV: 'electrician_yearly', // £199.99/year (current — Jun 2026, new customers)
  price_1TKlA12RKw5t5RAmdhZyhX1I: 'electrician', // £12.99/month (prior — keep for existing subs)
  price_1SqJVr2RKw5t5RAmaiTGelLN: 'electrician', // £9.99/month (legacy — keep for existing subs)
  price_1TKlKL2RKw5t5RAmpD8FH7qp: 'electrician_yearly', // £129.99/year (prior — keep for existing subs)
  price_1SqJVs2RKw5t5RAmVeD2QVsb: 'electrician_yearly', // £99.99/year (legacy — keep for existing subs)

  // Business AI - £39.99/month, £399.99/year (current — Apr 2026)
  price_1TRGZo2RKw5t5RAmRl2hc0ru: 'business_ai', // £39.99/month (current)
  price_1TRGZo2RKw5t5RAmzY50EzaE: 'business_ai_yearly', // £399.99/year (current)
  price_1T6DUx2RKw5t5RAmpb177NJV: 'business_ai', // £29.99/month (legacy — keep for existing subs)
  price_1T6DUy2RKw5t5RAmo9HgAukW: 'business_ai_yearly', // £299.99/year (legacy — keep for existing subs)

  // Employer - £49.99/month, £499.99/year (Business AI + Team features)
  price_1SlyAT2RKw5t5RAmUmTRGimH: 'employer', // £29.99/month (legacy/inactive — kept for existing subs)
  price_1Tm6eF2RKw5t5RAm0nG7ujWw: 'employer', // £49.99/month (CURRENT employer base)
  price_1SlyB82RKw5t5RAmN447YJUW: 'employer_yearly', // £299.99/year (legacy — kept for existing subs)
  price_1Tm6qA2RKw5t5RAmitPj2yF9: 'employer_yearly', // £499.99/year (CURRENT employer base annual)
  // £9.99/mo SEAT add-on — map to 'employer' so a multi-item employer sub is never
  // mis-read as 'unknown'/downgraded if the seat item happens to be items.data[0].
  price_1TkfWZ2RKw5t5RAmBPSZzc6X: 'employer',

  // Founders Offer - £3.99/month (gets Employer access - full access to all areas)
  price_1SPK8c2RKw5t5RAmRGJxXfjc: 'employer', // £3.99/month founders offer (employer access)

  // Electrician Win-Back - £7.99/month, £79.99/year (20% discount win-back offer)
  price_1SvggR2RKw5t5RAmDN29FBzx: 'electrician', // £7.99/month win-back offer
  price_1SvggR2RKw5t5RAmsrerSmdG: 'electrician_yearly', // £79.99/year win-back offer

  // Legacy prices (for existing subscribers)
  price_1RhtdT2RKw5t5RAmv6b2xE6p: 'apprentice', // £6.99/month (legacy)
  price_1Rhtgl2RKw5t5RAmkQVKVnKn: 'apprentice_yearly', // £69.99/year (legacy)
  price_1RhteS2RKw5t5RAmzRbaTE8U: 'electrician', // £9.99/month (legacy)
  price_1RhtiS2RKw5t5RAmha0s6PJA: 'electrician_yearly', // £99.99/year (legacy)
};

/**
 * Get monthly price in pence from a Stripe price ID
 */
async function getMonthlyPrice(stripe: Stripe, priceId: string): Promise<number> {
  try {
    const price = await stripe.prices.retrieve(priceId);
    if (price.recurring?.interval === 'year' && price.unit_amount) {
      return Math.round(price.unit_amount / 12); // Convert yearly to monthly equivalent
    }
    return price.unit_amount || 999; // Default to £9.99 if can't determine
  } catch {
    return 999; // Default fallback: £9.99
  }
}

serve(async (req) => {
  // Generate request ID for tracing
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'stripe-subscription-webhook' });

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_SUBSCRIPTION_WEBHOOK_SECRET');

    if (!stripeKey) {
      logger.error('STRIPE_SECRET_KEY not configured');
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      try {
        // Use constructEventAsync for Deno Deploy compatibility (async SubtleCrypto)
        event = await stripe.webhooks.constructEventAsync(
          body,
          signature,
          webhookSecret,
          undefined,
          Stripe.createSubtleCryptoProvider()
        );
        logger.info('Webhook signature verified');
      } catch (err: unknown) {
        logger.error('Webhook signature verification failed', {
          error: (err as Error).message,
          signaturePresent: !!signature,
          secretLength: webhookSecret.length,
        });
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      event = JSON.parse(body);
      logger.warn('Processing webhook without signature verification (no secret configured)');
    }

    logger.info('Webhook event received', { eventType: event.type, eventId: event.id });

    // Initialize Supabase with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Helper: Find user by Stripe customer ID or email
    async function findUserByCustomer(
      customerId: string,
      metadataUserId?: string | null
    ): Promise<string | null> {
      // The ACTUAL payer is whoever owns the Stripe customer's email — that is
      // the card that was charged. `metadata.user_id` can be stale or carried
      // over from a *different* / abandoned checkout (e.g. a half-finished
      // sign-up minutes earlier), so it must NEVER be trusted over the paying
      // customer. Trusting it blindly caused paid sign-ups + win-backs to land
      // on the wrong account.
      let emailUserId: string | null = null;
      let customerEmail: string | null = null;
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted && 'email' in customer && customer.email) {
          customerEmail = customer.email;
          // Reliable email -> auth user id. supabase-js admin.listUsers() has NO
          // email filter, so the old call returned null and the payer check fell
          // through to trusting the checkout tag (cross-account mis-attribution).
          const { data: rpcId } = await supabase.rpc('user_id_for_email', {
            p_email: customer.email,
          });
          emailUserId = (rpcId as string | null) ?? null;
        }
      } catch (err) {
        console.error('Error retrieving Stripe customer for payer verification:', err);
      }

      // Priority 1: metadata.user_id — but ONLY when it does not contradict the payer.
      if (metadataUserId) {
        if (emailUserId && emailUserId !== metadataUserId) {
          // CONFLICT: the paying customer's email belongs to a different user
          // than the metadata claims. Trust the payer, never the metadata.
          logger.warn('metadata.userId conflicts with paying customer — using the payer', {
            metadataUserId,
            payerUserId: emailUserId,
            customerId,
            customerEmail,
          });
          await supabase
            .from('profiles')
            .update({ stripe_customer_id: customerId })
            .eq('id', emailUserId);
          return emailUserId;
        }
        // No conflict (metadata agrees with the payer, or the payer's email is
        // not a registered user — e.g. paid under a different email).
        logger.info('Using userId from metadata (matches payer)', { metadataUserId });
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', metadataUserId)
          .is('stripe_customer_id', null);
        return metadataUserId;
      }

      // Priority 2: stripe_customer_id already stored against a profile (unique id).
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile?.id) {
        return profile.id;
      }

      // Priority 3: the payer resolved from the Stripe customer's email.
      if (emailUserId) {
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', emailUserId);
        logger.info('Resolved user via customer email', { userId: emailUserId, customerId });
        return emailUserId;
      }

      return null;
    }

    // Helper: Update user subscription status
    async function updateSubscriptionStatus(
      userId: string,
      subscribed: boolean,
      customerId: string,
      tier: string | null,
      periodEnd: Date | null,
      setOnboardingCompleted: boolean = false,
      founderHints?: {
        subscriptionMeta?: Record<string, string> | null;
        checkoutMeta?: Record<string, string> | null;
        subscriptionDiscounts?: Array<{ coupon?: { id?: string } | null }>;
      }
    ) {
      const updateData: Record<string, unknown> = {
        subscribed,
        stripe_customer_id: customerId,
        subscription_tier: tier,
        subscription_source: 'stripe',
      };

      if (subscribed && periodEnd) {
        updateData.subscription_end = periodEnd.toISOString();
        if (!updateData.subscription_start) {
          updateData.subscription_start = new Date().toISOString();
        }
      }

      if (!subscribed) {
        updateData.subscription_end = new Date().toISOString();
      }

      // Mark onboarding as completed when user gets their first subscription
      if (setOnboardingCompleted) {
        updateData.onboarding_completed = true;
      }

      // Set business_ai_enabled by querying Stripe for ALL of the customer's
      // active subs — NOT based on the single event firing. This is critical
      // because users often have multiple subs (e.g. Founder £3.99 + Mate £29.99),
      // and a renewal/update event for the non-Mate sub used to overwrite the
      // flag to false even though they still had an active Mate sub. Same fix
      // covers the cancel-and-rejoin path: when their old Mate sub gets a
      // cancellation event, we re-check what's still active before deciding.
      try {
        const allSubs = await stripe.subscriptions.list({
          customer: customerId,
          status: 'all',
          limit: 50,
        });
        const activeOrTrialing = allSubs.data.filter(
          (s) => s.status === 'active' || s.status === 'trialing'
        );
        const hasActiveMateSub = activeOrTrialing.some((s) => {
          const priceId = s.items.data[0]?.price?.id;
          if (!priceId) return false;
          const subTier = PRICE_TO_TIER[priceId];
          return subTier ? BUSINESS_AI_TIERS.has(subTier) : false;
        });
        updateData.business_ai_enabled = hasActiveMateSub;
        logger.info('Mate access decision (from full sub list)', {
          userId,
          customerId,
          activeOrTrialingCount: activeOrTrialing.length,
          hasActiveMateSub,
        });
      } catch (stripeErr) {
        // Fall back to event-based logic if the Stripe API call fails — same
        // as the old behaviour, just isolated to the failure case.
        logger.warn('Failed to list customer subs — falling back to event tier', {
          userId,
          error: (stripeErr as Error).message,
        });
        if (tier && subscribed) {
          updateData.business_ai_enabled = BUSINESS_AI_TIERS.has(tier);
        } else if (!subscribed) {
          updateData.business_ai_enabled = false;
        }
      }

      const { error } = await supabase.from('profiles').update(updateData).eq('id', userId);

      if (error) {
        logger.error('Error updating subscription status', { userId, error: error.message });
        throw error;
      }

      logger.info('Subscription status updated', {
        userId,
        subscribed,
        tier,
        businessAiEnabled: updateData.business_ai_enabled,
      });

      // ── Mate Founder grant ────────────────────────────────────────
      // If this subscription was created with the Mate founder coupon
      // (auto-applied by create-checkout for the first 100 buyers), set
      // is_founder=true and stamp founder_at. Idempotent — never downgrades
      // someone who is already a founder.
      const founderCouponId = Deno.env.get('MATE_FOUNDER_COUPON_ID') || '6fuVPsKN';
      const subMeta = founderHints?.subscriptionMeta ?? null;
      const coMeta = founderHints?.checkoutMeta ?? null;
      const discountsList = founderHints?.subscriptionDiscounts ?? [];
      const isFounderEvent =
        subMeta?.mate_founder === 'true' ||
        coMeta?.mate_founder === 'true' ||
        discountsList.some((d) => d?.coupon?.id === founderCouponId);
      if (updateData.business_ai_enabled === true && isFounderEvent) {
        const { data: existing } = await supabase
          .from('profiles')
          .select('is_founder')
          .eq('id', userId)
          .single();
        if (!existing?.is_founder) {
          await supabase
            .from('profiles')
            .update({ is_founder: true, founder_at: new Date().toISOString() })
            .eq('id', userId);
          logger.info('Mate founder granted', { userId });
        }
      }

      // If Business AI just became enabled, pre-generate a WhatsApp activation
      // code so the user lands on the welcome page with a ready-to-tap deeplink.
      // Idempotent: helper returns the existing code if one is still valid, so
      // Stripe webhook retries don't churn codes.
      if (updateData.business_ai_enabled === true) {
        try {
          const result = await generateWaCodeForUser(supabase, userId);
          logger.info('WA activation code ready for user', {
            userId,
            expiresAt: result.expires_at,
            reused: false, // helper doesn't expose this distinction; always log as ready
          });
        } catch (waErr) {
          // Non-fatal: user can still hit the welcome page and the frontend
          // will fall back to calling generate-wa-code directly.
          logger.warn('Failed to pre-generate WA activation code (non-fatal)', {
            userId,
            error: waErr instanceof Error ? waErr.message : String(waErr),
          });
        }
      }
    }

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        logger.info('Processing subscription event', {
          eventType: event.type,
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId,
        });

        const metadataUserId =
          (subscription as Stripe.Subscription & { metadata?: { userId?: string } }).metadata
            ?.userId || null;
        const userId = await findUserByCustomer(customerId, metadataUserId);
        if (!userId) {
          logger.error('No user found for customer — subscription will not activate', {
            customerId,
            subscriptionId: subscription.id,
          });

          // Store orphaned subscription for reconciliation
          try {
            const stripeCustomer = await stripe.customers.retrieve(customerId);
            const orphanEmail =
              !stripeCustomer.deleted && 'email' in stripeCustomer ? stripeCustomer.email : null;
            const orphanName =
              !stripeCustomer.deleted && 'name' in stripeCustomer ? stripeCustomer.name : null;
            const orphanPriceId = subscription.items.data[0]?.price?.id || null;
            await supabase.from('orphaned_stripe_subscriptions').upsert(
              {
                stripe_customer_id: customerId,
                stripe_subscription_id: subscription.id,
                customer_email: orphanEmail,
                customer_name: orphanName,
                price_id: orphanPriceId,
                tier: orphanPriceId ? PRICE_TO_TIER[orphanPriceId] || 'unknown' : null,
                event_type: event.type,
                detected_at: new Date().toISOString(),
              },
              { onConflict: 'stripe_customer_id' }
            );
            logger.info('Stored orphaned subscription for manual review', {
              customerId,
              email: orphanEmail,
            });
          } catch (orphanErr) {
            logger.warn('Failed to store orphaned subscription (non-fatal)', {
              error: (orphanErr as Error)?.message,
            });
          }

          break;
        }

        // Determine if subscription is active
        const isActive = ['active', 'trialing', 'past_due'].includes(subscription.status);

        // Get the price/tier
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? PRICE_TO_TIER[priceId] || 'unknown' : null;

        // Get period end (handles both legacy root and new items-level field)
        const periodEnd = getSubscriptionPeriodEnd(subscription, logger, {
          subscriptionId: subscription.id,
          eventType: event.type,
        });

        // Alert if we can't determine period end for an active sub — signals Stripe schema drift
        if (!periodEnd && ['active', 'trialing'].includes(subscription.status)) {
          await captureMessage(
            'Stripe active subscription has no current_period_end — schema may have changed',
            'error',
            {
              functionName: 'stripe-subscription-webhook',
              extra: {
                subscriptionId: subscription.id,
                eventType: event.type,
                customerId,
                status: subscription.status,
              },
              tags: { error_type: 'stripe_period_end_missing' },
            }
          );
        }

        // Pass setOnboardingCompleted=true for new subscriptions to mark signup flow as done
        const isNewSubscription = event.type === 'customer.subscription.created';

        // Founder hints — pulled off the subscription itself; no extra Stripe call
        const subscriptionDiscounts = (
          (subscription.discounts ?? subscription.discount)
            ? [subscription.discount as { coupon?: { id?: string } | null }].filter(Boolean)
            : []
        ) as Array<{ coupon?: { id?: string } | null }>;
        const founderHints = {
          subscriptionMeta: (subscription.metadata ?? null) as Record<string, string> | null,
          subscriptionDiscounts,
        };

        await updateSubscriptionStatus(
          userId,
          isActive,
          customerId,
          tier,
          periodEnd,
          isNewSubscription && isActive,
          founderHints
        );

        // Cancel any previous subscriptions for this customer (upgrade scenario)
        // e.g. user upgrading from Electrician (£9.99) to Business AI (£29.99)
        if (isNewSubscription && isActive) {
          // When upgrading, retire the customer's *other* active subscriptions —
          // but with two safeguards learned from a real incident where a paid sub
          // was wiped seconds after a trial started:
          //   • If the NEW sub is only trialing, leave existing subs untouched —
          //     never trade paid service for an unpaid trial.
          //   • Otherwise cancel at period end (not immediately) so the customer
          //     keeps the time they already paid for.
          const newSubIsTrialing =
            subscription.status === 'trialing' ||
            (subscription.trial_end && subscription.trial_end * 1000 > Date.now());

          if (newSubIsTrialing) {
            logger.info('New subscription is trialing — leaving existing subscriptions untouched', {
              newSubId: subscription.id,
            });
          } else {
            try {
              const existingSubs = await stripe.subscriptions.list({
                customer: customerId,
                limit: 10,
              });

              for (const oldSub of existingSubs.data) {
                if (
                  oldSub.id !== subscription.id &&
                  ['active', 'trialing'].includes(oldSub.status) &&
                  !oldSub.cancel_at_period_end
                ) {
                  await stripe.subscriptions.update(oldSub.id, {
                    cancel_at_period_end: true,
                  });
                  logger.info('Scheduled previous subscription to cancel at period end (upgrade)', {
                    cancelledSubId: oldSub.id,
                    newSubId: subscription.id,
                    oldPriceId: oldSub.items.data[0]?.price?.id,
                    newPriceId: priceId,
                  });
                }
              }
            } catch (cancelErr: unknown) {
              logger.warn(
                'Failed to schedule previous subscriptions for cancellation (non-fatal)',
                {
                  error: (cancelErr as Error)?.message,
                }
              );
            }
          }
        }

        // Handle founder invite completion (mark as claimed)
        // Check if this is a founder subscription by looking at the price ID
        const isFounderSubscription = priceId === 'price_1SPK8c2RKw5t5RAmRGJxXfjc';
        if (event.type === 'customer.subscription.created' && isActive && isFounderSubscription) {
          try {
            // Get the checkout session to find founder invite ID
            const sessions = await stripe.checkout.sessions.list({
              subscription: subscription.id,
              limit: 1,
            });

            const session = sessions.data[0];
            const inviteId = session?.metadata?.invite_id;

            if (inviteId) {
              const { error: inviteError } = await supabase
                .from('founder_invites')
                .update({
                  status: 'claimed',
                  claimed_at: new Date().toISOString(),
                  user_id: userId,
                })
                .eq('id', inviteId);

              if (inviteError) {
                logger.error('Failed to mark founder invite as claimed', {
                  inviteId,
                  error: inviteError.message,
                });
              } else {
                logger.info('Founder invite claimed', { inviteId });
              }
            }
          } catch (inviteErr: unknown) {
            logger.warn('Error processing founder invite (non-fatal)', {
              error: (inviteErr as Error)?.message,
            });
          }
        }

        // Process referral rewards for new subscriptions
        if (event.type === 'customer.subscription.created' && isActive) {
          try {
            // Check if this user was referred
            const { data: profile } = await supabase
              .from('profiles')
              .select('referred_by')
              .eq('id', userId)
              .single();

            if (profile?.referred_by) {
              logger.info('Processing referral reward', {
                referredUser: userId,
                referrerId: profile.referred_by,
              });

              // Update referral status to 'subscribed'
              const { data: referralRow } = await supabase
                .from('referrals')
                .update({ status: 'subscribed', updated_at: new Date().toISOString() })
                .eq('referred_id', userId)
                .eq('referrer_id', profile.referred_by)
                .in('status', ['pending', 'signed_up'])
                .select('id')
                .maybeSingle();

              if (referralRow) {
                // Get referrer's Stripe customer ID
                const { data: referrerProfile } = await supabase
                  .from('profiles')
                  .select(
                    'stripe_customer_id, successful_referrals, referral_credits_pence, subscription_tier'
                  )
                  .eq('id', profile.referred_by)
                  .single();

                if (referrerProfile?.stripe_customer_id) {
                  // Calculate reward — 1 free month, one-time only
                  const successfulReferrals = (referrerProfile.successful_referrals || 0) + 1;

                  if (successfulReferrals > 1) {
                    // Already claimed free month — update stats only, no more credit
                    logger.info('Referrer already claimed free month, updating stats only', {
                      referrerId: profile.referred_by,
                      successfulReferrals,
                    });
                    await supabase
                      .from('referrals')
                      .update({ status: 'rewarded', updated_at: new Date().toISOString() })
                      .eq('id', referralRow.id);
                    await supabase
                      .from('profiles')
                      .update({
                        successful_referrals: successfulReferrals,
                        total_referrals: successfulReferrals,
                      })
                      .eq('id', profile.referred_by);
                  } else {
                    // 1 month credit based on referrer's subscription tier
                    const tierPrices: Record<string, number> = {
                      apprentice: 599,
                      apprentice_yearly: 599,
                      electrician: 1299,
                      electrician_yearly: 1299,
                      business_ai: 2999,
                      business_ai_yearly: 2999,
                      employer: 2999,
                      employer_yearly: 2999,
                    };
                    const creditPence =
                      tierPrices[referrerProfile.subscription_tier || ''] ||
                      (priceId ? await getMonthlyPrice(stripe, priceId) : 1299);

                    // Apply Stripe balance credit (negative amount = credit to customer)
                    try {
                      const balanceTx = await stripe.customers.createBalanceTransaction(
                        referrerProfile.stripe_customer_id,
                        {
                          amount: -creditPence, // Negative = credit
                          currency: 'gbp',
                          description: `Referral reward: 1 free month credit`,
                          metadata: {
                            referral_id: referralRow.id,
                            referred_user_id: userId,
                          },
                        }
                      );

                      logger.info('Stripe balance credit applied', {
                        referrerId: profile.referred_by,
                        creditPence,
                        balanceTxId: balanceTx.id,
                      });

                      // Create referral_rewards row
                      await supabase.from('referral_rewards').insert({
                        user_id: profile.referred_by,
                        referral_id: referralRow.id,
                        reward_type: 'credit',
                        amount_pence: creditPence,
                        stripe_credit_note_id: balanceTx.id,
                        status: 'applied',
                        applied_at: new Date().toISOString(),
                      });

                      // Update referral status to 'rewarded'
                      await supabase
                        .from('referrals')
                        .update({ status: 'rewarded', updated_at: new Date().toISOString() })
                        .eq('id', referralRow.id);

                      // Update referrer's profile stats
                      await supabase
                        .from('profiles')
                        .update({
                          successful_referrals: successfulReferrals,
                          total_referrals: successfulReferrals,
                          referral_credits_pence:
                            (referrerProfile.referral_credits_pence || 0) + creditPence,
                        })
                        .eq('id', profile.referred_by);

                      // In-app notification for referrer
                      const creditFormatted = `£${(creditPence / 100).toFixed(2)}`;
                      await supabase.from('notifications').insert({
                        user_id: profile.referred_by,
                        type: 'referral_reward',
                        title: 'Referral Reward!',
                        message: `Your mate just subscribed! ${creditFormatted} credit has been applied to your account.`,
                        data: {
                          referral_id: referralRow.id,
                          credit_pence: creditPence,
                          referred_user_id: userId,
                        },
                        read: false,
                      });
                    } catch (balanceErr: unknown) {
                      logger.warn('Failed to apply Stripe balance credit (non-fatal)', {
                        error: (balanceErr as Error)?.message,
                      });
                    }
                  } // end else (under cap)
                }
              }
            }
          } catch (referralErr: unknown) {
            logger.warn('Referral reward processing failed (non-fatal)', {
              error: (referralErr as Error)?.message,
            });
          }
        }

        // Send welcome email for NEW subscriptions only
        if (event.type === 'customer.subscription.created' && isActive && tier) {
          try {
            // Get user email and name
            const customer = await stripe.customers.retrieve(customerId);
            if (!customer.deleted && 'email' in customer && customer.email) {
              const tierName = TIER_NAMES[tier] || tier;
              const isYearly = tier.includes('yearly');

              // Prefer the ACCOUNT email + name (what they signed up with) over
              // the Stripe billing email — pay links often carry a personal/card
              // email that differs from the Elec-Mate account.
              let recipientEmail = customer.email;
              let userName = customer.name || customer.email.split('@')[0];
              try {
                const { data: acct } = await supabase.auth.admin.getUserById(userId);
                if (acct?.user?.email) recipientEmail = acct.user.email;
                const metaName = (acct?.user?.user_metadata?.full_name as string) || '';
                if (metaName) userName = metaName;
              } catch (acctErr) {
                logger.warn('Account email lookup failed — using Stripe billing email', {
                  error: (acctErr as Error)?.message,
                });
              }

              // Returning customer? Any earlier subscription on this Stripe customer.
              let isReturning = false;
              try {
                const priorSubs = await stripe.subscriptions.list({
                  customer: customerId,
                  status: 'all',
                  limit: 3,
                });
                isReturning = priorSubs.data.some((s) => s.id !== subscription.id);
              } catch {
                /* non-fatal — default to the new-customer welcome */
              }

              // Fire-and-forget — don't block webhook response for email
              sendWelcomeEmail(
                recipientEmail,
                userName,
                tierName,
                isYearly,
                tier,
                isReturning
              ).catch((err: Error) =>
                logger.warn('Welcome email failed (non-fatal)', { error: err.message })
              );

              // Founder signup notification — pings founder@elec-mate.com on every
              // new subscription (every tier). For Mate signups it also reports
              // the live founder slot count so the founder sees the slots fill up.
              try {
                const subPriceForNotify = subscription.items.data[0]?.price;
                const amountPence = subPriceForNotify?.unit_amount || 0;
                const currency = (subPriceForNotify?.currency || 'gbp').toUpperCase();
                const isTrialing =
                  subscription.status === 'trialing' ||
                  (subscription.trial_end && subscription.trial_end * 1000 > Date.now());
                const isFounderSignup =
                  isFounderSubscription ||
                  (typeof tier === 'string' && tier.startsWith('business_ai'));

                // Pull the user's profile to grab their phone (Mate users have
                // an `agent_whatsapp_number` set during signup) and to surface
                // the slot count for Mate tier emails.
                let customerPhone: string | null = null;
                let founderSlotsLeft: number | null = null;
                let founderSlotsCap: number | null = null;
                try {
                  const { data: profileRow } = await supabase
                    .from('profiles')
                    .select('agent_whatsapp_number')
                    .eq('id', userId)
                    .maybeSingle();
                  customerPhone = profileRow?.agent_whatsapp_number ?? null;
                } catch {
                  /* non-fatal */
                }
                if (isFounderSignup) {
                  try {
                    const { data: counts } = await supabase.rpc('mate_founder_count');
                    const row = Array.isArray(counts) ? counts[0] : counts;
                    if (row && typeof row.slots_left === 'number') {
                      founderSlotsLeft = row.slots_left;
                      founderSlotsCap = row.cap;
                    }
                  } catch {
                    /* non-fatal */
                  }
                }

                sendFounderSignupNotification({
                  customerEmail: customer.email,
                  customerName: userName,
                  customerPhone,
                  tier,
                  tierName,
                  isTrial: !!isTrialing,
                  isFounder: !!isFounderSignup,
                  amountPence,
                  currency,
                  isYearly,
                  subscriptionId: subscription.id,
                  userId,
                  founderSlotsLeft,
                  founderSlotsCap,
                }).catch((err: Error) =>
                  logger.warn('Founder signup notification failed (non-fatal)', {
                    error: err.message,
                  })
                );
              } catch (notifyErr: unknown) {
                logger.warn('Founder signup notification setup failed (non-fatal)', {
                  error: (notifyErr as Error)?.message,
                });
              }

              // Also create in-app notification
              await supabase.from('notifications').insert({
                user_id: userId,
                type: 'subscription_welcome',
                title: 'Welcome to ElecMate!',
                message: `Your ${tierName} subscription is now active. Enjoy full access to all features!`,
                data: { tier, tierName },
                read: false,
              });

              // Fire Meta CAPI event (Subscribe or StartTrial) + PostHog event
              try {
                const subPrice = subscription.items.data[0]?.price;
                const amountPence = subPrice?.unit_amount || 0;
                const currency = (subPrice?.currency || 'gbp').toUpperCase();
                const isTrial =
                  subscription.status === 'trialing' ||
                  (subscription.trial_end && subscription.trial_end * 1000 > Date.now());
                capturePostHogEvent({
                  distinct_id: userId,
                  event: 'subscription_started',
                  properties: {
                    tier,
                    source: 'stripe',
                    is_trial: !!isTrial,
                    is_yearly: isYearly,
                    amount_pence: amountPence,
                    currency,
                    subscription_id: subscription.id,
                  },
                });
                const [firstName, ...rest] = (customer.name || '').trim().split(/\s+/);
                const lastName = rest.join(' ');
                fireCapiEvent({
                  event_name: isTrial ? 'StartTrial' : 'Subscribe',
                  event_id: `stripe_sub_${subscription.id}_${event.id}`,
                  action_source: 'website',
                  email: customer.email,
                  external_id: userId,
                  first_name: firstName || undefined,
                  last_name: lastName || undefined,
                  country: 'gb',
                  custom_data: {
                    currency,
                    value: amountPence / 100,
                    subscription_id: subscription.id,
                    content_name: tier,
                    content_category: isYearly ? 'yearly' : 'monthly',
                  },
                });
              } catch (capiErr) {
                logger.warn('Meta CAPI fire failed (non-fatal)', {
                  error: (capiErr as Error)?.message,
                });
              }
            }
          } catch (emailError: unknown) {
            logger.warn('Failed to send welcome email (non-fatal)', {
              error: (emailError as Error)?.message,
            });
          }
        }

        // Create notification for status changes
        if (event.type === 'customer.subscription.updated') {
          const previousStatus = (event.data.previous_attributes as { status?: string } | undefined)
            ?.status;
          if (previousStatus && previousStatus !== subscription.status) {
            await supabase.from('notifications').insert({
              user_id: userId,
              type: 'subscription_status',
              title: 'Subscription Updated',
              message: `Your subscription status changed from ${previousStatus} to ${subscription.status}.`,
              data: { status: subscription.status, tier },
              read: false,
            });
          }
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        logger.info('Subscription cancelled', { subscriptionId: subscription.id, customerId });

        const metadataUserId =
          (subscription as Stripe.Subscription & { metadata?: { userId?: string } }).metadata
            ?.userId || null;
        const userId = await findUserByCustomer(customerId, metadataUserId);
        if (!userId) {
          logger.error('No user found for customer — cannot process cancellation', { customerId });
          break;
        }

        // Check if customer has another active subscription (upgrade scenario)
        // When upgrading, we cancel the old sub — but the new sub is already active.
        // Without this check, the old sub's deletion event would incorrectly deactivate the user.
        let hasOtherActiveSub = false;
        try {
          const existingSubs = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
            limit: 10,
          });
          hasOtherActiveSub = existingSubs.data.some((s) => s.id !== subscription.id);
          if (hasOtherActiveSub) {
            logger.info(
              'Skipping deactivation — customer has another active subscription (upgrade)',
              {
                deletedSubId: subscription.id,
                activeSubId: existingSubs.data.find((s) => s.id !== subscription.id)?.id,
              }
            );
          }
        } catch (listErr: unknown) {
          logger.warn('Failed to check for other subscriptions (proceeding with deactivation)', {
            error: (listErr as Error)?.message,
          });
        }

        if (!hasOtherActiveSub) {
          // Read pre-cancel profile state. We need:
          //   - business_ai_enabled → deprovision agent below
          //   - subscription_tier   → pick the right win-back coupon/copy
          //   - full_name           → personalise win-back emails
          const { data: preProfile } = await supabase
            .from('profiles')
            .select('business_ai_enabled, agent_status, subscription_tier, full_name')
            .eq('id', userId)
            .single();

          const previouslyHadBusinessAI = preProfile?.business_ai_enabled === true;
          const cancelledTier = preProfile?.subscription_tier ?? null;
          const cancelledFullName = preProfile?.full_name ?? null;

          await updateSubscriptionStatus(userId, false, customerId, null, null);

          // ── Win-back queue enqueue ─────────────────────────────────────
          // Fire-and-forget: 3 touches (day +1, +7, +30). Failure here must
          // not break the webhook — that would leave Stripe retrying us
          // forever. We try, log, and move on.
          try {
            const trialEnd = subscription.trial_end
              ? new Date(subscription.trial_end * 1000)
              : null;
            const cancelledAt = subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000)
              : new Date();
            const wasTrial = !!trialEnd && cancelledAt < trialEnd;

            // Email lives on auth.users, not profiles
            const { data: authUserData } = await supabase.auth.admin.getUserById(userId);
            const email = authUserData?.user?.email ?? null;

            if (!email) {
              logger.warn('Win-back skipped — no email on auth user', { userId });
            } else {
              const now = cancelledAt.getTime();
              const ONE_DAY = 24 * 60 * 60 * 1000;
              const rows = [
                { touch: 1, delayDays: 1 },
                { touch: 2, delayDays: 7 },
                { touch: 3, delayDays: 30 },
              ].map((t) => ({
                user_id: userId,
                email,
                full_name: cancelledFullName,
                tier: cancelledTier ?? 'unknown',
                stripe_customer_id: customerId,
                was_trial: wasTrial,
                cancelled_at: cancelledAt.toISOString(),
                touch_number: t.touch,
                scheduled_for: new Date(now + t.delayDays * ONE_DAY).toISOString(),
                status: 'pending',
              }));

              const { error: enqueueError } = await supabase.from('winback_queue').insert(rows);

              if (enqueueError) {
                logger.warn('Win-back enqueue failed (non-fatal)', {
                  userId,
                  error: enqueueError.message,
                });
              } else {
                logger.info('Win-back queued — 3 touches', {
                  userId,
                  tier: cancelledTier,
                  wasTrial,
                });
              }
            }
          } catch (winbackErr) {
            logger.warn('Win-back enqueue threw (non-fatal)', {
              userId,
              error: (winbackErr as Error)?.message,
            });
          }

          // Deactivate WhatsApp agent and revoke JWT if user had Business AI
          if (previouslyHadBusinessAI) {
            logger.info('Deprovisioning Business AI agent for cancelled user', { userId });

            await supabase
              .from('profiles')
              .update({ agent_status: 'deactivated' })
              .eq('id', userId);

            await supabase
              .from('agent_jwt_tokens')
              .update({ revoked_at: new Date().toISOString() })
              .eq('user_id', userId)
              .is('revoked_at', null);

            // Best-effort VPS notification to remove OpenClaw binding
            const vpsApiKey = Deno.env.get('VPS_API_KEY');
            if (vpsApiKey) {
              try {
                const vpsRes = await fetch('https://agent.elec-mate.com/api/deprovision-agent', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'X-API-Key': vpsApiKey },
                  body: JSON.stringify({ user_id: userId }),
                });
                if (vpsRes.ok) {
                  logger.info('VPS agent deprovisioned', { userId });
                } else {
                  logger.warn('VPS deprovision returned non-OK (non-fatal)', {
                    userId,
                    status: vpsRes.status,
                  });
                }
              } catch (vpsErr) {
                logger.warn('VPS deprovision call failed (non-fatal)', {
                  userId,
                  error: (vpsErr as Error)?.message,
                });
              }
            }

            logger.info('Agent deprovisioned — status set to deactivated, JWT revoked', { userId });
          }

          // Notify user
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'subscription_cancelled',
            title: 'Subscription Ended',
            message:
              'Your subscription has ended. Subscribe again to regain access to premium features.',
            data: {},
            read: false,
          });
        }

        // Resolve any active dunning sequences for this subscription
        // Prevents further emails being sent for a cancelled subscription
        const { error: resolveSubError } = await supabase
          .from('failed_payment_emails')
          .update({ resolved: true, resolved_at: new Date().toISOString() })
          .eq('stripe_subscription_id', subscription.id)
          .eq('resolved', false);

        if (resolveSubError) {
          logger.warn('Failed to resolve dunning sequences on subscription deletion (non-fatal)', {
            subscriptionId: subscription.id,
            error: resolveSubError.message,
          });
        } else {
          logger.info('Resolved dunning sequences for cancelled subscription', {
            subscriptionId: subscription.id,
          });
        }

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;

        // Finder's fee (a one-off invoice, no subscription) — settle the hire
        // record. Must run BEFORE the subscription-only skip below.
        if (invoice.metadata?.kind === 'finder_fee') {
          const hireId = invoice.metadata.hire_record_id;
          if (hireId) {
            const { error: feeErr } = await supabase
              .from('elec_id_hire_records')
              .update({ fee_status: 'paid', paid_at: new Date().toISOString() })
              .eq('id', hireId)
              .eq('fee_status', 'invoiced');
            if (feeErr) {
              logger.warn('Finder fee mark-paid failed (non-fatal)', {
                hireId,
                invoiceId: invoice.id,
                error: feeErr.message,
              });
            } else {
              logger.info('Finder fee invoice paid', { hireId, invoiceId: invoice.id });
            }
          }
          break;
        }

        // Only handle subscription invoices
        if (!invoice.subscription) {
          logger.debug('Not a subscription invoice, skipping', { invoiceId: invoice.id });
          break;
        }

        const customerId = invoice.customer as string;
        logger.info('Subscription invoice paid', { invoiceId: invoice.id, customerId });

        const invoiceMetadataUserId =
          (
            invoice as Stripe.Invoice & {
              subscription_details?: { metadata?: { userId?: string } };
            }
          ).subscription_details?.metadata?.userId || null;
        const userId = await findUserByCustomer(customerId, invoiceMetadataUserId);
        if (!userId) {
          logger.error('No user found for customer — cannot process invoice', {
            customerId,
            invoiceId: invoice.id,
          });
          break;
        }

        // Ensure subscription is marked active
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? PRICE_TO_TIER[priceId] || 'unknown' : null;
        const periodEnd = getSubscriptionPeriodEnd(subscription, logger, {
          subscriptionId: subscription.id,
          invoiceId: invoice.id,
          eventType: 'invoice.paid',
        });

        // Alert on missing period end — invoice.paid is the renewal path, critical to catch
        if (!periodEnd && ['active', 'trialing'].includes(subscription.status)) {
          await captureMessage(
            'invoice.paid: active sub has no current_period_end — renewals will leak',
            'error',
            {
              functionName: 'stripe-subscription-webhook',
              extra: {
                subscriptionId: subscription.id,
                invoiceId: invoice.id,
                customerId,
                status: subscription.status,
              },
              tags: { error_type: 'stripe_period_end_missing' },
            }
          );
        }

        await updateSubscriptionStatus(userId, true, customerId, tier, periodEnd);

        // Fire Meta CAPI Subscribe event for RENEWAL invoices only
        // (initial subscription is tracked by customer.subscription.created — avoid double-count)
        if (invoice.billing_reason === 'subscription_cycle' && tier) {
          try {
            const renewCustomer = await stripe.customers.retrieve(customerId);
            if (!renewCustomer.deleted && 'email' in renewCustomer && renewCustomer.email) {
              const [rFirst, ...rRest] = (renewCustomer.name || '').trim().split(/\s+/);
              fireCapiEvent({
                event_name: 'Subscribe',
                event_id: `stripe_invoice_${invoice.id}`,
                action_source: 'website',
                email: renewCustomer.email,
                external_id: userId,
                first_name: rFirst || undefined,
                last_name: rRest.join(' ') || undefined,
                country: 'gb',
                custom_data: {
                  currency: (invoice.currency || 'gbp').toUpperCase(),
                  value: (invoice.amount_paid || 0) / 100,
                  subscription_id: invoice.subscription as string,
                  content_name: tier,
                  content_category: 'renewal',
                },
              });
            }
          } catch (capiErr) {
            logger.warn('Meta CAPI renewal fire failed (non-fatal)', {
              error: (capiErr as Error)?.message,
            });
          }
        }

        // Resolve any active dunning sequence for this invoice
        const { data: resolvedRow, error: resolveError } = await supabase
          .from('failed_payment_emails')
          .update({ resolved: true, resolved_at: new Date().toISOString() })
          .eq('stripe_invoice_id', invoice.id)
          .eq('resolved', false)
          .select('id')
          .maybeSingle();

        if (resolveError) {
          logger.warn('Failed to resolve dunning sequence on invoice paid (non-fatal)', {
            invoiceId: invoice.id,
            error: resolveError.message,
          });
        } else if (resolvedRow) {
          logger.info('Resolved dunning sequence — payment recovered', {
            invoiceId: invoice.id,
            trackingId: resolvedRow.id,
          });

          // Create a payment recovered notification
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'payment_recovered',
            title: 'Payment Successful',
            message:
              'Your subscription payment has been processed successfully. Thank you for updating your payment details!',
            data: { invoice_id: invoice.id },
            read: false,
          });
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        // Finder's fee — mark the hire record failed and nudge the employer.
        // Must run BEFORE the subscription-only skip below.
        if (invoice.metadata?.kind === 'finder_fee') {
          const hireId = invoice.metadata.hire_record_id;
          const employerId = invoice.metadata.employer_id;
          if (hireId) {
            await supabase
              .from('elec_id_hire_records')
              .update({ fee_status: 'failed', failed_at: new Date().toISOString() })
              .eq('id', hireId)
              .eq('fee_status', 'invoiced');
            logger.warn('Finder fee payment failed', { hireId, invoiceId: invoice.id });
            if (employerId) {
              await supabase.from('notifications').insert({
                user_id: employerId,
                type: 'finder_fee_failed',
                title: "Finder's fee payment failed",
                message:
                  "We couldn't collect the finder's fee for your recent hire. Please update your payment method.",
                data: { invoice_id: invoice.id, hire_record_id: hireId },
                read: false,
              });
            }
          }
          break;
        }

        // Only handle subscription invoices
        if (!invoice.subscription) {
          logger.debug('Not a subscription invoice, skipping', { invoiceId: invoice.id });
          break;
        }

        const customerId = invoice.customer as string;
        logger.warn('Subscription payment failed', { invoiceId: invoice.id, customerId });

        const failedInvoiceMetadataUserId =
          (
            invoice as Stripe.Invoice & {
              subscription_details?: { metadata?: { userId?: string } };
            }
          ).subscription_details?.metadata?.userId || null;
        const userId = await findUserByCustomer(customerId, failedInvoiceMetadataUserId);
        if (!userId) {
          logger.error('No user found for customer — cannot notify of failed payment', {
            customerId,
            invoiceId: invoice.id,
          });
          break;
        }

        // Don't immediately revoke access - Stripe will retry
        // But notify the user
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'payment_failed',
          title: 'Payment Failed',
          message:
            'Your subscription payment failed. Please update your payment method to avoid losing access.',
          data: {
            invoice_id: invoice.id,
            amount: invoice.amount_due / 100,
          },
          read: false,
        });

        // --- Dunning email sequence: Email 1 (immediate) ---

        // Check if we already have a tracking row for this invoice (idempotency — Stripe retries)
        const { data: existingRow } = await supabase
          .from('failed_payment_emails')
          .select('id, emails_sent')
          .eq('stripe_invoice_id', invoice.id)
          .maybeSingle();

        if (!existingRow) {
          // Insert new tracking row
          const { error: insertError } = await supabase.from('failed_payment_emails').insert({
            user_id: userId,
            stripe_invoice_id: invoice.id,
            stripe_customer_id: customerId,
            stripe_subscription_id: invoice.subscription as string,
            amount_due: invoice.amount_due,
            hosted_invoice_url: invoice.hosted_invoice_url || null,
            emails_sent: 0,
          });

          if (insertError) {
            logger.warn('Failed to insert dunning tracking row (non-fatal)', {
              invoiceId: invoice.id,
              error: insertError.message,
            });
          }
        }

        // Send Email 1 if not already sent
        const emailsSentSoFar = existingRow?.emails_sent ?? 0;
        if (emailsSentSoFar < 1) {
          try {
            // Get customer email from Stripe
            const failedCustomer = await stripe.customers.retrieve(customerId);
            if (!failedCustomer.deleted && 'email' in failedCustomer && failedCustomer.email) {
              const userName = failedCustomer.name || failedCustomer.email.split('@')[0];
              const amountFormatted = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format((invoice.amount_due || 0) / 100);

              const payUrl =
                invoice.hosted_invoice_url || 'https://www.elec-mate.com/subscriptions';

              // Fire-and-forget — don't block webhook response for email
              sendPaymentFailedEmail(failedCustomer.email, userName, amountFormatted, payUrl).catch(
                (err: Error) =>
                  logger.warn('Dunning email failed (non-fatal)', { error: err.message })
              );

              // Update tracking row
              await supabase
                .from('failed_payment_emails')
                .update({
                  emails_sent: 1,
                  email_1_sent_at: new Date().toISOString(),
                })
                .eq('stripe_invoice_id', invoice.id);

              logger.info('Dunning Email 1 sent', {
                invoiceId: invoice.id,
                email: failedCustomer.email,
              });
            }
          } catch (emailErr: unknown) {
            logger.warn('Failed to send dunning Email 1 (non-fatal)', {
              invoiceId: invoice.id,
              error: (emailErr as Error)?.message,
            });
          }
        }

        break;
      }

      case 'checkout.session.completed': {
        // Pay links and external checkouts fire this event.
        // Use it to link Stripe customers to Supabase users BEFORE the subscription event fires.
        const session = event.data.object as Stripe.Checkout.Session;

        // Only handle subscription checkouts
        if (session.mode !== 'subscription' || !session.customer || !session.subscription) {
          logger.debug('Non-subscription checkout session, skipping', { sessionId: session.id });
          break;
        }

        const sessionCustomerId = session.customer as string;
        const sessionSubId = session.subscription as string;

        logger.info('Checkout session completed (subscription)', {
          sessionId: session.id,
          customerId: sessionCustomerId,
          subscriptionId: sessionSubId,
        });

        // Check if we already have this customer linked
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', sessionCustomerId)
          .maybeSingle();

        if (existingProfile) {
          logger.info('Customer already linked to profile, skipping checkout handler', {
            customerId: sessionCustomerId,
            userId: existingProfile.id,
          });
          break;
        }

        // The PAYER is whoever entered their email at checkout — that is the card
        // that was charged. `client_reference_id` can belong to a DIFFERENT user
        // (e.g. a checkout opened on a shared device / stale session and then paid
        // by someone else). It must never override the payer, or the paid sub
        // lands on the wrong account (this is what mis-credited win-back payments).
        let linkedUserId: string | null = null;

        // Resolve the payer from the checkout email first.
        const checkoutEmail =
          (session.customer_email || session.customer_details?.email || null)?.toLowerCase() ||
          null;
        let payerUserId: string | null = null;
        if (checkoutEmail) {
          // Reliable email -> auth user id (see note in findUserByCustomer).
          const { data: rpcId } = await supabase.rpc('user_id_for_email', {
            p_email: checkoutEmail,
          });
          payerUserId = (rpcId as string | null) ?? null;
        }

        const refId = session.client_reference_id || null;
        if (refId && payerUserId && refId !== payerUserId) {
          // CONFLICT: the checkout was tagged with one user but paid by another.
          // Trust the payer, never the tag.
          logger.warn('client_reference_id conflicts with the paying email — using the payer', {
            clientReferenceId: refId,
            payerUserId,
            checkoutEmail,
            customerId: sessionCustomerId,
          });
          linkedUserId = payerUserId;
        } else if (refId) {
          // No conflict — matches the payer, or the payer's email isn't a known user.
          const { data: refProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', refId)
            .maybeSingle();
          if (refProfile) {
            linkedUserId = refProfile.id;
            logger.info('Linked via client_reference_id', { userId: linkedUserId });
          }
        }

        // Fall back to the payer resolved from the checkout email.
        if (!linkedUserId && payerUserId) {
          linkedUserId = payerUserId;
          logger.info('Linked via checkout email', { userId: linkedUserId, email: checkoutEmail });
        }

        if (linkedUserId) {
          // Retrieve the subscription to get tier info
          const sub = await stripe.subscriptions.retrieve(sessionSubId);
          const priceId = sub.items.data[0]?.price?.id;
          const tier = priceId ? PRICE_TO_TIER[priceId] || 'electrician' : 'electrician';
          const periodEnd = getSubscriptionPeriodEnd(sub, logger, {
            subscriptionId: sub.id,
            sessionId: session.id,
            eventType: 'checkout.session.completed',
          });

          // Founder hints from the checkout session metadata
          const checkoutFounderHints = {
            checkoutMeta: (session.metadata ?? null) as Record<string, string> | null,
            subscriptionMeta: (sub.metadata ?? null) as Record<string, string> | null,
            subscriptionDiscounts: (sub.discount
              ? [sub.discount as { coupon?: { id?: string } | null }]
              : []) as Array<{ coupon?: { id?: string } | null }>,
          };

          await updateSubscriptionStatus(
            linkedUserId,
            true,
            sessionCustomerId,
            tier,
            periodEnd,
            true,
            checkoutFounderHints
          );

          logger.info('Subscription activated via checkout.session.completed', {
            userId: linkedUserId,
            customerId: sessionCustomerId,
            tier,
          });

          // Clear any orphaned record for this customer
          await supabase
            .from('orphaned_stripe_subscriptions')
            .delete()
            .eq('stripe_customer_id', sessionCustomerId);
        } else {
          // Store as orphaned for manual review
          const stripeCustomer = await stripe.customers.retrieve(sessionCustomerId);
          const orphanEmail =
            !stripeCustomer.deleted && 'email' in stripeCustomer ? stripeCustomer.email : null;
          const orphanName =
            !stripeCustomer.deleted && 'name' in stripeCustomer ? stripeCustomer.name : null;
          const sub = await stripe.subscriptions.retrieve(sessionSubId);
          const orphanPriceId = sub.items.data[0]?.price?.id || null;

          await supabase.from('orphaned_stripe_subscriptions').upsert(
            {
              stripe_customer_id: sessionCustomerId,
              stripe_subscription_id: sessionSubId,
              customer_email: orphanEmail,
              customer_name: orphanName,
              price_id: orphanPriceId,
              tier: orphanPriceId ? PRICE_TO_TIER[orphanPriceId] || 'unknown' : null,
              event_type: 'checkout.session.completed',
              detected_at: new Date().toISOString(),
            },
            { onConflict: 'stripe_customer_id' }
          );
          logger.warn('Checkout session completed but no matching user found', {
            customerId: sessionCustomerId,
            email: orphanEmail,
          });
        }

        break;
      }

      default:
        logger.debug('Unhandled event type', { eventType: event.type });
    }

    logger.info('Webhook processed successfully', { eventType: event.type });
    return new Response(JSON.stringify({ received: true, type: event.type }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  } catch (error: unknown) {
    logger.error('Webhook error', { error: (error as Error).message });
    await captureException(error, {
      functionName: 'stripe-subscription-webhook',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
