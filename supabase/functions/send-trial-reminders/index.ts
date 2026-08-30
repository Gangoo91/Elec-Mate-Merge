/**
 * Send Trial Reminder Emails
 * Runs daily via pg_cron to send, to REAL trialists (card on file,
 * profiles.subscribed=true, trial_end set by the Stripe webhook):
 * - 24 hour activation email ("ship your first cert")
 *
 * The end-of-trial conversion warning was removed 2026-06-11 (Andrew's
 * call) — trial terms are stated clearly at signup and checkout.
 *
 * RETARGETED 2026-06-11. The previous version selected subscribed=false
 * users — checkout ABANDONERS, who are covered by auto-reengage-trial's
 * 3-touch sequence — and told them their "trial" was ending when they'd
 * never started one. Meanwhile actual trialists got no warning before the
 * day-8 charge. (The cron had also been silently 401ing since 14 Apr.)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { sendEmail as brevoSendEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

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
  const ctaUrl =
    'https://www.elec-mate.com/electrician/inspection-testing?utm_source=email&utm_medium=lifecycle&utm_campaign=day1_activation';
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
      'Andrew',
      'Founder, Elec-Mate',
      '',
      'P.S. Most sparks who do their first cert in the first 48 hours stick around. The trick is getting that first one shipped before the trial ends — the rest takes care of itself.',
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

/**
 * Trial receipt — sent 24-48h before trial end, with the user's OWN numbers.
 * Loss aversion converts better than feature lists: "look what you'd be
 * giving up" beats "look what we have". Zero-activity trialists get a
 * last-chance activation nudge instead.
 */
interface ReceiptStats {
  certs: number;
  quotes: number;
  quotedTotal: number;
  invoices: number;
  quizzes: number;
  questions: number;
}

/**
 * "tomorrow" vs "in two days".
 *
 * The receipt job selects anyone whose trial ends 24-48h out, because the cron
 * runs once a day and a narrower window would drop people. But the copy said
 * "your trial ends tomorrow" to all of them, so roughly half were told the
 * wrong day — and this is an email about when money leaves their account. Say
 * what's actually true.
 */
function endsWhen(trialEnd: string | null, now: Date = new Date()): string {
  if (!trialEnd) return 'tomorrow';
  const hours = (new Date(trialEnd).getTime() - now.getTime()) / 3_600_000;
  return hours <= 36 ? 'tomorrow' : 'in two days';
}

function getReceiptEmail(
  firstName: string,
  stats: ReceiptStats,
  role: string,
  price: string,
  when: string
): EmailTemplate {
  const safeName = firstName?.trim() || 'mate';
  const isApprentice = role === 'apprentice';
  const hasActivity = isApprentice
    ? stats.quizzes > 0
    : stats.certs + stats.quotes + stats.invoices > 0;

  const minutesSaved = stats.certs * 45 + stats.quotes * 20 + stats.invoices * 10;
  const hoursSaved = Math.round((minutesSaved / 60) * 10) / 10;

  const statLines = isApprentice
    ? [
        `${stats.quizzes} ${stats.quizzes === 1 ? 'quiz' : 'quizzes'} completed`,
        `${stats.questions} exam questions answered`,
      ]
    : [
        `${stats.certs} ${stats.certs === 1 ? 'certificate' : 'certificates'} created`,
        `£${Math.round(stats.quotedTotal).toLocaleString('en-GB')} quoted`,
        `roughly ${hoursSaved} hours of paperwork saved`,
      ];

  const statRows = statLines
    .map(
      (line) => `
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #EFD489;">
            <span style="color: #B5840A; font-weight: 700;">&#10003;</span>
            <span style="margin-left: 10px; font-size: 15px; color: #0C1B2A;">${line}</span>
          </td>
        </tr>`
    )
    .join('');

  const ctaUrl = hasActivity
    ? 'https://www.elec-mate.com/dashboard?utm_source=email&utm_medium=lifecycle&utm_campaign=trial_receipt'
    : isApprentice
      ? 'https://www.elec-mate.com/study-centre/apprentice?utm_source=email&utm_medium=lifecycle&utm_campaign=trial_receipt'
      : 'https://www.elec-mate.com/electrician/inspection-testing/new?utm_source=email&utm_medium=lifecycle&utm_campaign=trial_receipt';
  const ctaHref = ctaUrl.replace(/&/g, '&amp;');

  const subject = hasActivity
    ? `Your first week on Elec-Mate, ${safeName} — the numbers`
    : `Your trial ends ${when}, ${safeName}`;

  const intro = hasActivity
    ? isApprentice
      ? `Your trial ends ${when}, so here’s what your first week looked like:`
      : `Your trial ends ${when}, so I pulled your numbers from the week:`
    : isApprentice
      ? `Your trial ends ${when} — there’s still time to sit one mock exam and see where you stand before it does.`
      : `Your trial ends ${when} — there’s still time to put one real job through it and see what it saves you.`;

  const keepLine = hasActivity
    ? `All of it stays with you for ${price}/month. Do nothing and your plan continues — or cancel before ${when === 'tomorrow' ? 'then' : 'it ends'} and you pay nothing at all.`
    : `If it’s not for you, cancel before it ends and you pay nothing. If you keep it, it’s ${price}/month and everything stays unlocked.`;

  return {
    subject,
    from: FOUNDER_FROM,
    replyTo: FOUNDER_REPLY_TO,
    text: [
      `Hi ${safeName},`,
      '',
      intro,
      '',
      ...(hasActivity ? statLines.map((l) => `- ${l}`) : []),
      '',
      keepLine,
      '',
      ctaUrl,
      '',
      'Any questions, hit reply — it comes straight to me.',
      '',
      'Andrew',
      'Founder, Elec-Mate',
    ].join('\n'),
    // Light, branded — the same palette as send-welcome-email and the
    // lead-list campaign (ink #0C1B2A, gold #F3B70A, cream #FFFAEC on a
    // #F4F6F9 page). This was black-on-black, which meant a trialist got a
    // bright branded welcome, then a black email on day six, from what read
    // as a different company. Buttons carry the Outlook VML fallback.
    html: `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
  <!--[if mso]>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) { .pad { padding-left: 24px !important; padding-right: 24px !important; } }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;" />
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">${hasActivity ? 'Your first week' : `Ends ${when}`}</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; line-height: 1.12; color: #0C1B2A; letter-spacing: -0.5px;">
                ${hasActivity ? `Your first week, ${safeName}.` : `Your trial ends ${when}, ${safeName}.`}
              </h1>
              <p style="margin: 0 0 22px; font-size: 15px; line-height: 1.62; color: #51606F;">
                ${intro}
              </p>
              ${
                hasActivity
                  ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px; background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px; overflow: hidden;">
                ${statRows}
              </table>`
                  : ''
              }
              <p style="margin: 0 0 26px; font-size: 15px; line-height: 1.62; color: #51606F;">
                ${keepLine}
              </p>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 0 36px 8px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${ctaHref}" style="height:52px;v-text-anchor:middle;width:240px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${hasActivity ? 'Open my dashboard' : isApprentice ? 'Start a mock exam' : 'Start my first cert'}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${ctaHref}" style="display: inline-block; padding: 15px 30px; background-color: #F3B70A; color: #0C1B2A; text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 11px;">
                ${hasActivity ? 'Open my dashboard &rarr;' : isApprentice ? 'Start a mock exam &rarr;' : 'Start my first cert &rarr;'}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 22px 36px 30px;" class="pad">
              <p style="margin: 0 0 2px; font-size: 15px; color: #0C1B2A;">Cheers,</p>
              <p style="margin: 0 0 14px; font-size: 15px; font-weight: 700; color: #0C1B2A;">Andrew <span style="font-weight: 400; color: #51606F;">&middot; Founder, Elec-Mate</span></p>
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.62;">Hit reply and it comes straight to me &mdash; not a support desk.</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 36px 26px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: #8B95A3; line-height: 1.5;">
                You're getting this because your 7-day free trial of Elec-Mate is ending.<br>
                <a href="https://www.elec-mate.com" style="color: #8B95A3; text-decoration: underline;">elec-mate.com</a>
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
      receipt48h: { found: 0, sent: 0 },
    };

    // Resolve auth emails for a list of profiles (profiles has no email column)
    async function withEmails(
      profiles: {
        id: string;
        full_name: string | null;
        trial_end: string | null;
        subscription_tier: string | null;
        subscription_source: string | null;
      }[]
    ) {
      const out = [];
      for (const profile of profiles) {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
          if (authUser?.user?.email) out.push({ ...profile, email: authUser.user.email });
        } catch (e) {
          console.error(`Failed to get email for user ${profile.id}:`, e);
        }
      }
      return out;
    }

    async function alreadySent(userId: string, emailType: string): Promise<boolean> {
      const { data } = await supabase
        .from('trial_emails_sent')
        .select('id')
        .eq('user_id', userId)
        .eq('email_type', emailType)
        .maybeSingle();
      return Boolean(data);
    }

    const PROFILE_COLS = 'id, full_name, trial_end, subscription_tier, subscription_source';

    // 1. Activation email — REAL trialists (card on file) who signed up
    //    ~24h ago (18-30h window gives 12h of slack for a daily job).
    const welcome24hStart = new Date(now.getTime() - 30 * 60 * 60 * 1000);
    const welcome24hEnd = new Date(now.getTime() - 18 * 60 * 60 * 1000);
    const { data: welcomeProfiles } = await supabase
      .from('profiles')
      .select(PROFILE_COLS)
      .eq('subscribed', true)
      .gt('trial_end', now.toISOString())
      .gte('created_at', welcome24hStart.toISOString())
      .lte('created_at', welcome24hEnd.toISOString());

    const welcomeUsers = await withEmails(welcomeProfiles ?? []);
    stats.welcome24h.found = welcomeUsers.length;
    for (const user of welcomeUsers) {
      if (await alreadySent(user.id, 'welcome_24h')) continue;
      const firstName = user.full_name?.split(' ')[0] || 'there';
      if (await sendEmail(user.email, getWelcome24hEmail(firstName))) {
        await supabase.from('trial_emails_sent').insert({
          user_id: user.id,
          email_type: 'welcome_24h',
        });
        stats.welcome24h.sent++;
        console.log(`✅ Sent 24h activation email to ${user.email}`);
      }
    }

    // 2. Receipt email — trialists whose trial ends in the next 24-48h.
    //    Their own numbers (certs, £ quoted, hours saved) or a last-chance
    //    activation nudge when they've made nothing yet.
    const receiptStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const receiptEnd = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const { data: receiptProfiles } = await supabase
      .from('profiles')
      .select(PROFILE_COLS + ', role, created_at')
      .eq('subscribed', true)
      .eq('is_trial', true)
      .gt('trial_end', receiptStart.toISOString())
      .lte('trial_end', receiptEnd.toISOString());

    const receiptUsers = await withEmails((receiptProfiles ?? []) as never[]);
    stats.receipt48h.found = receiptUsers.length;
    for (const user of receiptUsers) {
      if (await alreadySent(user.id, 'receipt_48h')) continue;

      const u = user as typeof user & { role: string | null };
      const isApprentice = u.role === 'apprentice';
      const receipt: ReceiptStats = {
        certs: 0,
        quotes: 0,
        quotedTotal: 0,
        invoices: 0,
        quizzes: 0,
        questions: 0,
      };

      try {
        if (isApprentice) {
          const { data: quizRows } = await supabase
            .from('quiz_results')
            .select('total_questions')
            .eq('user_id', user.id);
          receipt.quizzes = quizRows?.length ?? 0;
          receipt.questions = (quizRows ?? []).reduce(
            (sum: number, r: { total_questions: number | null }) =>
              sum + (r.total_questions ?? 0),
            0
          );
        } else {
          const [certsRes, quotesRes, invoicesRes] = await Promise.all([
            // `deleted_at is null` is NOT optional on any cert count. Without it
            // this email tells someone they made five certificates in the week
            // when they binned two of them — the one number in here they can
            // check against their own screen, and the one we'd have got wrong.
            supabase
              .from('reports')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', user.id)
              .is('deleted_at', null),
            supabase.from('quotes').select('total').eq('user_id', user.id).is('deleted_at', null),
            supabase
              .from('invoices')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', user.id)
              .is('deleted_at', null),
          ]);
          receipt.certs = certsRes.count ?? 0;
          receipt.quotes = quotesRes.data?.length ?? 0;
          receipt.quotedTotal = (quotesRes.data ?? []).reduce(
            (sum: number, q: { total: number | string | null }) => sum + (Number(q.total) || 0),
            0
          );
          receipt.invoices = invoicesRes.count ?? 0;
        }
      } catch (statsErr) {
        console.error(`Receipt stats failed for ${user.id} (sending nudge variant):`, statsErr);
      }

      const firstName = user.full_name?.split(' ')[0] || 'there';
      const price = isApprentice ? '£6.99' : '£19.99';
      const when = endsWhen((u as { trial_end: string | null }).trial_end, now);
      if (
        await sendEmail(
          user.email,
          getReceiptEmail(firstName, receipt, u.role ?? 'electrician', price, when)
        )
      ) {
        await supabase.from('trial_emails_sent').insert({
          user_id: user.id,
          email_type: 'receipt_48h',
        });
        stats.receipt48h.sent++;
        console.log(`✅ Sent trial receipt email to ${user.email}`);
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
    await captureException(error, {
      functionName: 'send-trial-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('❌ Error in trial reminder job:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
