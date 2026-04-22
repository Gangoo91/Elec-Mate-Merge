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
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException, captureMessage } from '../_shared/sentry.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { capturePostHogEvent } from '../_shared/posthog-server.ts';
import { getSubscriptionPeriodEnd } from '../_shared/stripe-helpers.ts';

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

/**
 * Send welcome email to new subscriber
 */
async function sendWelcomeEmail(
  email: string,
  name: string,
  tierName: string,
  isYearly: boolean,
  tier: string
): Promise<void> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping welcome email');
    return;
  }

  const resend = new Resend(resendApiKey);

  const billingPeriod = isYearly ? 'year' : 'month';
  const tierBase = tier.replace(/_yearly$/, '');
  const features = TIER_FEATURES[tierBase] || TIER_FEATURES['electrician'];
  const logoUrl = 'https://elec-mate.com/logo.jpg';
  const year = new Date().getFullYear();

  const featureCardsHtml = features
    .map(
      (f) => `
                <!-- Feature card -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
                  <tr>
                    <td style="padding: 14px 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td width="48" valign="middle">
                            <div style="width: 40px; height: 40px; background-color: rgba(${f.iconColor === '#22c55e' ? '34,197,94' : f.iconColor === '#3b82f6' ? '59,130,246' : f.iconColor === '#fbbf24' ? '251,191,36' : '168,85,247'}, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                              <span style="color: ${f.iconColor}; font-size: 18px;">${f.icon}</span>
                            </div>
                          </td>
                          <td style="padding-left: 14px;" valign="middle">
                            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">${f.title}</p>
                            <p style="margin: 4px 0 0; font-size: 13px; color: #ffffff;">${f.subtitle}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>`
    )
    .join('\n');

  const emailHtml = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Welcome to Elec-Mate</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table {border-collapse: collapse;}
    td, th, div, p, a, h1, h2, h3, h4, h5, h6 {font-family: Arial, sans-serif;}
  </style>
  <![endif]-->
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body { margin: 0; padding: 0; width: 100%; background-color: #0a0a0a; }
    @media screen and (max-width: 480px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; background-color: #111111; border-radius: 20px; overflow: hidden; border: 1px solid #262626;">

          <!-- Logo & Header -->
          <tr>
            <td align="center" style="padding: 40px 32px 24px;" class="mobile-padding">
              <img src="${logoUrl}" alt="Elec-Mate" width="72" height="72" style="display: block; border-radius: 14px; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Welcome to Elec-Mate
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              <p style="margin: 0 0 12px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                Hi ${name},
              </p>
              <p style="margin: 0; font-size: 15px; color: #ffffff; line-height: 1.6;">
                Your <strong style="color: #fbbf24;">${tierName}</strong> subscription is now active.
              </p>
            </td>
          </tr>

          <!-- Subscription card -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 14px; border: 1px solid #262626;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">Subscription</td>
                        <td style="text-align: right; font-size: 15px; color: #fbbf24; font-weight: 700;">${tierName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">Billing</td>
                        <td style="text-align: right; font-size: 14px; color: #ffffff; font-weight: 600;">Every ${billingPeriod}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">Status</td>
                        <td style="text-align: right; font-size: 14px; color: #22c55e; font-weight: 700;">&#10003; Active</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Feature section header -->
          <tr>
            <td style="padding: 0 32px 16px;" class="mobile-padding">
              <p style="margin: 0; font-size: 12px; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                Here's what you've unlocked
              </p>
            </td>
          </tr>

          <!-- Feature cards -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              ${featureCardsHtml}
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 32px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.elec-mate.com" style="height:56px;v-text-anchor:middle;width:100%;" arcsize="21%" fillcolor="#fbbf24">
                      <w:anchorlock/>
                      <center style="color:#0a0a0a;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Open Elec-Mate</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="https://www.elec-mate.com" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; text-align: center;">
                      Open Elec-Mate
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;" class="mobile-padding">
              <p style="margin: 0 0 4px; font-size: 13px; color: #ffffff;">
                Questions? Reply to this email — we're here to help.
              </p>
            </td>
          </tr>

          <!-- Copyright -->
          <tr>
            <td align="center" style="padding: 16px 32px 24px; background-color: #0a0a0a;">
              <p style="margin: 0; font-size: 12px; color: #ffffff;">
                &copy; ${year} Elec-Mate &middot; Made in the UK
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [email],
      subject: `Welcome to Elec-Mate — Your ${tierName} subscription is active`,
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

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Issue</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <!-- Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-weight: 700; font-size: 14px; padding: 8px 20px; border-radius: 20px; border: 1px solid #fecaca;">Payment Issue</span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                We tried to process your subscription payment of <strong>${amount}</strong>, but it didn't go through. This can happen if your card has expired or there were insufficient funds.
              </p>

              <!-- Amount Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef2f2; border-radius: 12px; border: 2px solid #fecaca; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #991b1b;">Amount due:</td>
                        <td style="text-align: right; font-size: 16px; color: #991b1b; font-weight: 700;">${amount}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 14px; color: #991b1b;">Status:</td>
                        <td style="text-align: right; padding-top: 8px; font-size: 14px; color: #dc2626; font-weight: 700;">Payment failed</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                To keep your subscription active, please update your payment details:
              </p>

              <!-- CTA Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="${hostedInvoiceUrl}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">Pay Now</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="https://www.elec-mate.com/subscriptions" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">Manage Subscription</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                If you have any questions, just reply to this email — we're here to help!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ElecMate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [email],
      subject: "Your ElecMate payment didn't go through",
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

// Map Stripe price IDs to subscription tiers
// CURRENT ACTIVE PRICES (as of Jan 2026)
const PRICE_TO_TIER: Record<string, string> = {
  // Apprentice - £5.99/month (new), £49.99/year
  price_1TKlA22RKw5t5RAmpvhojy0b: 'apprentice', // £5.99/month (current — Apr 2026)
  price_1SmUef2RKw5t5RAmRIMTWTqU: 'apprentice', // £4.99/month (legacy — keep for existing subs)
  price_1TKlKK2RKw5t5RAmGVR5EcF9: 'apprentice_yearly', // £59.99/year (current — Apr 2026)
  price_1SmUfK2RKw5t5RAml6bj1I77: 'apprentice_yearly', // £49.99/year (legacy — keep for existing subs)

  // Electrician Pro - £12.99/month (new), £129.99/year (new)
  price_1TKlA12RKw5t5RAmdhZyhX1I: 'electrician', // £12.99/month (current — Apr 2026)
  price_1SqJVr2RKw5t5RAmaiTGelLN: 'electrician', // £9.99/month (legacy — keep for existing subs)
  price_1TKlKL2RKw5t5RAmpD8FH7qp: 'electrician_yearly', // £129.99/year (current — Apr 2026)
  price_1SqJVs2RKw5t5RAmVeD2QVsb: 'electrician_yearly', // £99.99/year (legacy — keep for existing subs)

  // Business AI - £29.99/month, £299.99/year (Electrician + AI Agent)
  price_1T6DUx2RKw5t5RAmpb177NJV: 'business_ai', // £29.99/month
  price_1T6DUy2RKw5t5RAmo9HgAukW: 'business_ai_yearly', // £299.99/year

  // Employer - £49.99/month, £499.99/year (Business AI + Team features)
  price_1SlyAT2RKw5t5RAmUmTRGimH: 'employer', // £29.99/month (current — will become £49.99)
  price_1SlyB82RKw5t5RAmN447YJUW: 'employer_yearly', // £299.99/year (current — will become £499.99)

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
      // Priority 1: Use userId from subscription/event metadata (most reliable)
      if (metadataUserId) {
        logger.info('Found userId in metadata', { metadataUserId });
        // Backfill stripe_customer_id if missing
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', metadataUserId)
          .is('stripe_customer_id', null);
        return metadataUserId;
      }

      // Priority 2: Check if we have the stripe_customer_id stored in profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile?.id) {
        return profile.id;
      }

      // Priority 3: Look up customer email in Stripe, then find auth user
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted || !('email' in customer) || !customer.email) {
          return null;
        }

        // Look up user by email via auth admin API (single user, not full scan)
        const { data: usersData } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 1,
          filter: `email.eq.${customer.email}`,
        });
        const authUser = usersData?.users?.[0];

        if (authUser?.id) {
          // Backfill stripe_customer_id for future lookups
          await supabase
            .from('profiles')
            .update({ stripe_customer_id: customerId })
            .eq('id', authUser.id);
          logger.info('Backfilled stripe_customer_id via email lookup', {
            userId: authUser.id,
            customerId,
          });
          return authUser.id;
        }

        return null;
      } catch (err) {
        console.error('Error finding user by customer:', err);
        return null;
      }
    }

    // Helper: Update user subscription status
    async function updateSubscriptionStatus(
      userId: string,
      subscribed: boolean,
      customerId: string,
      tier: string | null,
      periodEnd: Date | null,
      setOnboardingCompleted: boolean = false
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

      // Set business_ai_enabled based on tier (triggers agent provisioning/deprovisioning)
      if (tier && subscribed) {
        updateData.business_ai_enabled = BUSINESS_AI_TIERS.has(tier);
      } else if (!subscribed) {
        updateData.business_ai_enabled = false;
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
        await updateSubscriptionStatus(
          userId,
          isActive,
          customerId,
          tier,
          periodEnd,
          isNewSubscription && isActive
        );

        // Cancel any previous subscriptions for this customer (upgrade scenario)
        // e.g. user upgrading from Electrician (£9.99) to Business AI (£29.99)
        if (isNewSubscription && isActive) {
          try {
            const existingSubs = await stripe.subscriptions.list({
              customer: customerId,
              limit: 10,
            });

            for (const oldSub of existingSubs.data) {
              if (oldSub.id !== subscription.id && ['active', 'trialing'].includes(oldSub.status)) {
                await stripe.subscriptions.cancel(oldSub.id);
                logger.info('Cancelled previous subscription (upgrade)', {
                  cancelledSubId: oldSub.id,
                  newSubId: subscription.id,
                  oldPriceId: oldSub.items.data[0]?.price?.id,
                  newPriceId: priceId,
                });
              }
            }
          } catch (cancelErr: unknown) {
            logger.warn('Failed to cancel previous subscriptions (non-fatal)', {
              error: (cancelErr as Error)?.message,
            });
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
              const userName = customer.name || customer.email.split('@')[0];

              // Fire-and-forget — don't block webhook response for email
              sendWelcomeEmail(customer.email, userName, tierName, isYearly, tier).catch(
                (err: Error) =>
                  logger.warn('Welcome email failed (non-fatal)', { error: err.message })
              );

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
          // Check if user previously had Business AI before deactivating
          const { data: preProfile } = await supabase
            .from('profiles')
            .select('business_ai_enabled, agent_status')
            .eq('id', userId)
            .single();

          const previouslyHadBusinessAI = preProfile?.business_ai_enabled === true;

          await updateSubscriptionStatus(userId, false, customerId, null, null);

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

        // Try to find the user by: client_reference_id > customer_email > customer_details.email
        let linkedUserId: string | null = null;

        // Priority 1: client_reference_id (if pay link was generated with userId)
        if (session.client_reference_id) {
          const { data: refProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.client_reference_id)
            .maybeSingle();
          if (refProfile) {
            linkedUserId = refProfile.id;
            logger.info('Linked via client_reference_id', { userId: linkedUserId });
          }
        }

        // Priority 2: customer_email or customer_details.email (case-insensitive)
        if (!linkedUserId) {
          const checkoutEmail = (
            session.customer_email ||
            session.customer_details?.email ||
            null
          )?.toLowerCase();

          if (checkoutEmail) {
            const { data: usersData } = await supabase.auth.admin.listUsers({
              page: 1,
              perPage: 1,
              filter: `email.eq.${checkoutEmail}`,
            });
            const authUser = usersData?.users?.[0];

            if (authUser) {
              linkedUserId = authUser.id;
              logger.info('Linked via checkout email', {
                userId: linkedUserId,
                email: checkoutEmail,
              });
            }
          }
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

          await updateSubscriptionStatus(
            linkedUserId,
            true,
            sessionCustomerId,
            tier,
            periodEnd,
            true
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
