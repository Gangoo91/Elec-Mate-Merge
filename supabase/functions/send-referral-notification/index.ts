/**
 * send-referral-notification
 * Sends email notifications for referral events via Resend.
 * Types: 'signup' (someone signed up via referral), 'subscription' (referral converted),
 *        'tier_milestone' (referrer hit a new tier)
 */

import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { Resend } from '../_shared/mailer.ts';

interface NotificationRequest {
  type: 'signup' | 'subscription' | 'tier_milestone';
  referrer_id: string;
  referred_name?: string;
  credit_amount?: string;
  new_tier?: string;
  total_referrals?: number;
}

const TIER_LABELS: Record<string, string> = {
  bronze: 'Bronze',
  silver: 'Silver — 2x rewards!',
  gold: 'Gold — free tier upgrades!',
  platinum: 'Platinum — 20% off forever + Community Champion!',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);

    const body: NotificationRequest = await req.json();
    const { type, referrer_id, referred_name, credit_amount, new_tier, total_referrals } = body;

    if (!type || !referrer_id) {
      throw new ValidationError('Missing required: type, referrer_id');
    }

    logger.info('Processing referral notification', { type, referrer_id });

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      logger.warn('RESEND_API_KEY not configured — skipping');
      return new Response(JSON.stringify({ sent: false, reason: 'no_api_key' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get referrer email
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: referrerProfile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', referrer_id)
      .single();

    if (!referrerProfile?.email) {
      logger.warn('Referrer email not found', { referrer_id });
      return new Response(JSON.stringify({ sent: false, reason: 'no_email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);
    const referrerName = referrerProfile.full_name || referrerProfile.email.split('@')[0];
    let subject = '';
    let bodyHtml = '';

    switch (type) {
      case 'signup':
        subject = `${referred_name || 'Someone'} just signed up with your referral link!`;
        bodyHtml = buildEmail(
          referrerName,
          `Great news! <strong>${referred_name || 'A new user'}</strong> just signed up using your referral link.`,
          "Once they subscribe, you'll both get a free month. Keep sharing to earn more rewards!",
          'View Your Referrals',
          'https://www.elec-mate.com/settings?tab=referrals'
        );
        break;

      case 'subscription':
        subject = `Referral reward: ${credit_amount || '£9.99'} credit added to your account!`;
        bodyHtml = buildEmail(
          referrerName,
          `Your mate <strong>${referred_name || 'a referred user'}</strong> just subscribed! As a thank you, <strong>${credit_amount || '£9.99'}</strong> has been credited to your account.`,
          'This credit will automatically be applied to your next invoice. Keep referring — the more mates you bring, the bigger the rewards!',
          'View Your Rewards',
          'https://www.elec-mate.com/settings?tab=referrals'
        );
        break;

      case 'tier_milestone':
        subject = `You've reached ${TIER_LABELS[new_tier || 'bronze']} referral tier!`;
        bodyHtml = buildEmail(
          referrerName,
          `Congratulations! With <strong>${total_referrals || 0} successful referrals</strong>, you've unlocked the <strong>${TIER_LABELS[new_tier || 'bronze']}</strong> tier.`,
          new_tier === 'platinum'
            ? "You're now a Community Champion! Enjoy a permanent 20% discount and your badge on your Elec-ID."
            : 'Keep referring to unlock even bigger rewards at the next tier!',
          'View Your Tier',
          'https://www.elec-mate.com/settings?tab=referrals'
        );
        break;
    }

    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: 'ElecMate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [referrerProfile.email],
      subject,
      html: bodyHtml,
    });

    if (emailError) {
      logger.error('Failed to send referral email', { error: emailError });
      return new Response(JSON.stringify({ sent: false, error: emailError }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    logger.info('Referral notification sent', { emailId: emailResult?.id, type });

    return new Response(JSON.stringify({ sent: true, emailId: emailResult?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
});

function buildEmail(
  name: string,
  headline: string,
  subtext: string,
  ctaLabel: string,
  ctaUrl: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ElecMate Referral</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ Referral Reward</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                ${headline}
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #6b7280;">
                ${subtext}
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 16px 0;">
                    <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1a1a1a; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">${ctaLabel}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical contracting tools</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
