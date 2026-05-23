/**
 * Send Trial Reminder Emails
 * Runs daily via pg_cron to send:
 * - 24 hour welcome email (launch price)
 * - Day 5 reminder (2 days left)
 * - Day 7 trial ended email
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { sendEmail as brevoSendEmail } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const TRIAL_DAYS = 7;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'Elec-Mate <noreply@elec-mate.com>';

// Day-1 nudge is sent from the founder address so replies land in his
// inbox — the whole point of this email is to invite conversation, not
// to bounce off noreply@.
const FOUNDER_FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
const FOUNDER_REPLY_TO = 'founder@elec-mate.com';

interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

/**
 * Day-1 nudge.
 *
 * REWRITTEN 2026-05-23. The previous version pitched the launch price 24h
 * in. The new version pushes activation — the single biggest leak in the
 * funnel is that 80% of new signups never generate a single cert. Get them
 * to ship one and trial→paid follows naturally.
 *
 * Founder voice. One CTA. Plain text fallback. Reply-to inbox.
 */
function getWelcome24hEmail(firstName: string): EmailTemplate {
  // NB: ampersands are escaped (&amp;) when inlined into href attributes
  // below — raw & between query params makes Gmail strip the link.
  const ctaUrl = 'https://www.elec-mate.com/electrician/inspection-testing?utm_source=email&utm_medium=lifecycle&utm_campaign=day1_activation';
  const ctaHref = ctaUrl.replace(/&/g, '&amp;');
  const safeName = firstName?.trim() || 'mate';

  return {
    subject: 'Make your first cert in 90 seconds, ' + safeName,
    from: FOUNDER_FROM,
    replyTo: FOUNDER_REPLY_TO,
    text: [
      `Hi ${safeName},`,
      '',
      "Andrew here — I'm a working sparky and I built Elec-Mate because I was sick of bouncing between five apps to bill one job.",
      '',
      "You signed up yesterday. Today I want to help you generate your first certificate. It takes about 90 seconds. Once you've done one, you'll see how the whole app works:",
      '',
      ctaUrl,
      '',
      "If something's confusing or broken, just hit reply on this email. It goes straight to me. I read every one and usually reply the same day.",
      '',
      "Andrew",
      "Founder, Elec-Mate",
      '',
      "P.S. Most sparks who do their first cert in the first 48 hours stick around. The trick is getting that first one shipped before the trial ends — the rest takes care of itself.",
    ].join('\n'),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make your first cert in 90 seconds</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7;">
  <span style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; color:#0a0a0a; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    90 seconds to ship your first EICR — Andrew (Elec-Mate founder) shows you how.
  </span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #262626;">

          <!-- Header / Logo -->
          <tr>
            <td style="padding: 32px 28px 12px; text-align: center;">
              <img src="https://www.elec-mate.com/logo.jpg" alt="Elec-Mate" width="120" style="display: block; margin: 0 auto; max-width: 120px; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 16px 28px 8px;">
              <h1 style="margin: 0 0 20px; font-size: 26px; font-weight: 700; line-height: 1.2; color: #ffffff; letter-spacing: -0.01em;">
                Make your first cert in 90 seconds, ${safeName}.
              </h1>

              <p style="margin: 0 0 18px; font-size: 16px; line-height: 1.65; color: #ffffff;">
                Andrew here — I built Elec-Mate because I was sick of bouncing between five apps to bill one job.
              </p>

              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.65; color: #ffffff;">
                You signed up yesterday. Today I want to help you ship your first certificate. Takes about 90 seconds, and once you've done one you'll see how the whole app fits together.
              </p>

              <!-- Single CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="${ctaHref}" style="display: inline-block; padding: 16px 32px; background-color: #facc15; color: #0a0a0a; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; letter-spacing: -0.01em;">
                      Start my first cert →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Founder note -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 8px 0 24px;">
                <tr>
                  <td style="padding: 18px 20px; background-color: rgba(250, 204, 21, 0.06); border-left: 3px solid #facc15; border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #ffffff;">
                      <strong style="color: #facc15;">Stuck on anything?</strong> Just hit reply. This email goes straight to my inbox — I read every one and usually reply the same day.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 4px; font-size: 16px; line-height: 1.65; color: #ffffff;">
                Andrew
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.5; color: #ffffff;">
                Founder, Elec-Mate
              </p>

              <p style="margin: 0 0 4px; font-size: 14px; line-height: 1.65; color: #ffffff;">
                <strong style="color: #facc15;">P.S.</strong> Most sparks who ship their first cert in the first 48 hours stick around. The trick is getting that first one done before the trial ends — the rest takes care of itself.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 28px 28px;">
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #ffffff; text-align: center;">
                You're getting this because you started a 7-day free trial of Elec-Mate.<br>
                <a href="https://www.elec-mate.com" style="color: #ffffff; text-decoration: underline;">elec-mate.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

function getDay5ReminderEmail(firstName: string): EmailTemplate {
  return {
    subject: '⏰ Your Elec-Mate trial ends in 2 days',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; overflow: hidden; border: 1px solid #333;">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 24px; text-align: center; border-bottom: 1px solid #333;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #facc15;">⚡ Elec-Mate</h1>
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding: 16px 24px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); text-align: center;">
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #ffffff;">⏰ Only 2 Days Left!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #ffffff;">Hey ${firstName},</h2>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #a1a1aa;">
                Your free trial ends in <strong style="color: #f97316;">2 days</strong>. After that, you'll lose access to:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; background: rgba(249, 115, 22, 0.1); border-radius: 8px; border-left: 3px solid #f97316;">
                    <p style="margin: 0; font-size: 14px; color: #ffffff;">
                      🔒 All your saved certificates & reports<br>
                      🔒 AI tools & calculators<br>
                      🔒 Quote & invoice templates<br>
                      🔒 Study materials & training
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #a1a1aa;">
                Don't let your work disappear. Subscribe now and keep everything.
              </p>

              <div style="padding: 20px; background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%); border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #000000;">Launch Price</p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #000000;">£6.99<span style="font-size: 16px; font-weight: 400;">/month</span></p>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://elec-mate.com/subscriptions" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 10px;">
                      Upgrade Now - Keep Access
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; border-top: 1px solid #333; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #71717a;">
                Cancel anytime. 30-day money back guarantee.<br>
                <a href="https://elec-mate.com" style="color: #facc15; text-decoration: none;">elec-mate.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

function getTrialEndedEmail(firstName: string): EmailTemplate {
  return {
    subject: 'Your Elec-Mate trial has ended',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; overflow: hidden; border: 1px solid #333;">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 24px; text-align: center; border-bottom: 1px solid #333;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #facc15;">⚡ Elec-Mate</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #ffffff;">Your trial has ended, ${firstName}</h2>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #a1a1aa;">
                Your 7-day free trial is now over. Your account is currently locked, but all your data is safe and waiting for you.
              </p>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #a1a1aa;">
                Subscribe today to instantly restore access to everything you created during your trial.
              </p>

              <div style="padding: 20px; background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%); border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #000000;">Reactivate Your Account</p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #000000;">£6.99<span style="font-size: 16px; font-weight: 400;">/month</span></p>
                <p style="margin: 8px 0 0; font-size: 13px; color: #000000;">Cancel anytime</p>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://elec-mate.com/subscriptions" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%); color: #000000; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 10px;">
                      Reactivate My Account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; color: #71717a; text-align: center;">
                Need help? Just reply to this email and we'll sort you out.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; border-top: 1px solid #333; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #71717a;">
                We'd hate to see you go. Let us know if there's anything we can do.<br>
                <a href="https://elec-mate.com" style="color: #facc15; text-decoration: none;">elec-mate.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  // Brevo via _shared/mailer.ts shim. Resend was banned at domain level —
  // Brevo is the sole supported provider. Per-template from/replyTo still
  // honoured (founder-voice emails route replies to founder@elec-mate.com).
  const result = await brevoSendEmail({
    from: template.from ?? FROM_EMAIL,
    to,
    subject: template.subject,
    html: template.html,
    text: template.text,
    replyTo: template.replyTo,
  });
  if (result.error) {
    console.error('Brevo send error:', result.error.message);
    return false;
  }
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting trial reminder job...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const stats = {
      welcome24h: { found: 0, sent: 0 },
      day5Reminder: { found: 0, sent: 0 },
      trialEnded: { found: 0, sent: 0 },
    };

    // Helper to get unsubscribed users with emails within a date range
    async function getUnsubscribedUsersWithEmails(startDate: Date, endDate: Date) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, created_at, subscribed')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .eq('subscribed', false);

      if (!profiles || profiles.length === 0) return [];

      // Get emails from auth.users for each profile
      const usersWithEmails = [];
      for (const profile of profiles) {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
          if (authUser?.user?.email) {
            usersWithEmails.push({
              ...profile,
              email: authUser.user.email,
            });
          }
        } catch (e) {
          console.error(`Failed to get email for user ${profile.id}:`, e);
        }
      }
      return usersWithEmails;
    }

    // 1. Find users who signed up ~24 hours ago (18-30 hours window for daily job)
    // This gives us a 12-hour buffer on each side to ensure no one is missed
    const welcome24hStart = new Date(now.getTime() - 30 * 60 * 60 * 1000);
    const welcome24hEnd = new Date(now.getTime() - 18 * 60 * 60 * 1000);
    const welcomeUsers = await getUnsubscribedUsersWithEmails(welcome24hStart, welcome24hEnd);

    if (welcomeUsers.length > 0) {
      stats.welcome24h.found = welcomeUsers.length;
      for (const user of welcomeUsers) {
        // Check if already sent
        const { data: existing } = await supabase
          .from('trial_emails_sent')
          .select('id')
          .eq('user_id', user.id)
          .eq('email_type', 'welcome_24h')
          .single();

        if (!existing && user.email) {
          const firstName = user.full_name?.split(' ')[0] || 'there';
          const sent = await sendEmail(user.email, getWelcome24hEmail(firstName));

          if (sent) {
            await supabase.from('trial_emails_sent').insert({
              user_id: user.id,
              email_type: 'welcome_24h',
            });
            stats.welcome24h.sent++;
            console.log(`✅ Sent welcome email to ${user.email}`);
          }
        }
      }
    }

    // 2. Find users whose trial ends in ~2 days (Day 5, with 12-hour window)
    // Day 5 = 5 days after signup, so look for signups 4.5-5.5 days ago
    const day5Start = new Date(now.getTime() - 5.5 * 24 * 60 * 60 * 1000);
    const day5End = new Date(now.getTime() - 4.5 * 24 * 60 * 60 * 1000);
    const day5Users = await getUnsubscribedUsersWithEmails(day5Start, day5End);

    if (day5Users.length > 0) {
      stats.day5Reminder.found = day5Users.length;
      for (const user of day5Users) {
        const { data: existing } = await supabase
          .from('trial_emails_sent')
          .select('id')
          .eq('user_id', user.id)
          .eq('email_type', 'reminder_day5')
          .single();

        if (!existing && user.email) {
          const firstName = user.full_name?.split(' ')[0] || 'there';
          const sent = await sendEmail(user.email, getDay5ReminderEmail(firstName));

          if (sent) {
            await supabase.from('trial_emails_sent').insert({
              user_id: user.id,
              email_type: 'reminder_day5',
            });
            stats.day5Reminder.sent++;
            console.log(`✅ Sent Day 5 reminder to ${user.email}`);
          }
        }
      }
    }

    // 3. Find users whose trial just ended (Day 7, with 12-hour window)
    // Day 7 = 7 days after signup, so look for signups 6.5-7.5 days ago
    const day7Start = new Date(now.getTime() - 7.5 * 24 * 60 * 60 * 1000);
    const day7End = new Date(now.getTime() - 6.5 * 24 * 60 * 60 * 1000);
    const expiredUsers = await getUnsubscribedUsersWithEmails(day7Start, day7End);

    if (expiredUsers.length > 0) {
      stats.trialEnded.found = expiredUsers.length;
      for (const user of expiredUsers) {
        const { data: existing } = await supabase
          .from('trial_emails_sent')
          .select('id')
          .eq('user_id', user.id)
          .eq('email_type', 'trial_ended')
          .single();

        if (!existing && user.email) {
          const firstName = user.full_name?.split(' ')[0] || 'there';
          const sent = await sendEmail(user.email, getTrialEndedEmail(firstName));

          if (sent) {
            await supabase.from('trial_emails_sent').insert({
              user_id: user.id,
              email_type: 'trial_ended',
            });
            stats.trialEnded.sent++;
            console.log(`✅ Sent trial ended email to ${user.email}`);
          }
        }
      }
    }

    console.log('📊 Trial reminder job complete:', stats);

    return new Response(
      JSON.stringify({
        success: true,
        stats,
        timestamp: now.toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('❌ Error in trial reminder job:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
