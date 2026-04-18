/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from '../_shared/mailer.ts';
import {
  generateV10HTML,
  generateV10PlainText,
  buildUnsubscribeUrl,
  buildUnsubscribeHeaders,
  isSuppressed,
  sendBatchWithRetry,
  TokenBucket,
  FROM_V10,
  REPLY_TO,
  RESEND_RPS,
  BATCH_MAX,
  type ResendBatchItem,
} from '../_shared/winback-v10.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const rateLimiter = new TokenBucket(RESEND_RPS, RESEND_RPS);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Early access £7.99 offer configuration (same Stripe product as winback: prod_TtTdELbwjYaZQn)
const EA_OFFER_CONFIG = {
  monthlyPrice: 7.99,
  yearlyPrice: 79.99,
  standardMonthlyPrice: 9.99,
  discountPercent: 20,
  monthlyPaymentLink: 'https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00',
  yearlyPaymentLink: 'https://buy.stripe.com/5kQ3cobV0anqguJe7IbjW01',
};

// Generate unique invite token with EA prefix
function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'EA-';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// ── Only V8 (App Store launch) template kept. Old versions (v1-v7) removed. ──

// Aliases — old callers get V8 automatically
function generateLaunchEmailHTML(_email: string, _inviteToken: string): string {
  return generateEarlyAccessV8AppStoreHTML();
}
function generateConversionEmailHTML(_email: string): string {
  return generateEarlyAccessV8AppStoreHTML();
}
function generateInviteEmailHTML(_email: string, _inviteToken: string): string {
  return generateEarlyAccessV8AppStoreHTML();
}
function generateEarlyAccessOfferHTML(_email: string): string {
  return generateEarlyAccessV8AppStoreHTML();
}
function generateEarlyAccessV6HTML(): string {
  return generateEarlyAccessV8AppStoreHTML();
}
function generateEarlyAccessV7HTML(_email: string, _inviteToken: string): string {
  return generateEarlyAccessV8AppStoreHTML();
}

function generateEarlyAccessV8AppStoreHTML(): string {
  const appStoreUrl = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
  const appStoreBadge =
    'https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-gb?size=250x83';
  const logoUrl = 'https://elec-mate.com/logo.jpg';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000000">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#000000"><tr><td style="padding:0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#000000">

<tr><td style="height:48px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block;text-decoration:none">
<img src="${logoUrl}" alt="Elec-Mate" width="120" height="120" style="display:block;border-radius:26px;margin:0 auto">
</a>
</td></tr>

<tr><td style="height:28px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<h1 style="margin:0;font-size:34px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Now on the App Store.</h1>
</td></tr>

<tr><td style="height:16px"></td></tr>

<tr><td style="text-align:center;padding:0 40px">
<p style="margin:0;font-size:17px;color:#ffffff;line-height:1.5;font-weight:400">The all-in-one app for UK electricians. Certificates, quotes, AI tools, and more.</p>
</td></tr>

<tr><td style="height:28px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block"><img src="${appStoreBadge}" alt="Download on the App Store" width="180" height="60" style="display:block"></a>
</td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.08)"></div></td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(251,191,36,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x26A1;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Certificates</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">EICR, EIC, minor works, PAT, fire alarm, solar PV, EV charging. Sign and send from your phone.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(59,130,246,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F916;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">AI Tools</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Cost engineer, circuit designer, RAMS generator, fault diagnosis, installation guide. 15 specialist agents.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(34,197,94,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F4B7;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Quotes &amp; Invoices</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Create, send, and get paid. Track everything in one place. No more spreadsheets.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(168,85,247,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F4DA;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Study Centre</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Level 2 &amp; 3 courses, AM2 simulator, flashcards, EPA prep. Over 2,000 practice questions.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(244,63,94,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F6E1;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Site Safety</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">RAMS, method statements, risk assessments, toolbox talks. 64+ electrical calculators built in.</p>
</td>
</tr>
</table>

</td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.08)"></div></td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="50%" style="text-align:center;padding:0 4px 0 0">
<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:16px;padding:20px 12px">
<p style="margin:0 0 4px;font-size:12px;color:#ffffff;letter-spacing:0.3px;text-transform:uppercase;font-weight:600">Apprentice</p>
<p style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-0.5px">&pound;6.99<span style="font-size:14px;font-weight:400">/mo</span></p>
</div>
</td>
<td width="50%" style="text-align:center;padding:0 0 0 4px">
<div style="background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:20px 12px">
<p style="margin:0 0 4px;font-size:12px;color:#fbbf24;letter-spacing:0.3px;text-transform:uppercase;font-weight:600">Electrician</p>
<p style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-0.5px">&pound;14.99<span style="font-size:14px;font-weight:400">/mo</span></p>
</div>
</td>
</tr></table>
</td></tr>

<tr><td style="height:24px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block"><img src="${appStoreBadge}" alt="Download on the App Store" width="200" style="display:block"></a>
</td></tr>

<tr><td style="height:32px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5">7-day free trial &middot; Cancel anytime</p>
</td></tr>

<tr><td style="height:24px"></td></tr>

<tr><td style="text-align:center;padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#ffffff">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4)">Founder, Elec-Mate</p>
</td></tr>

<tr><td style="padding:14px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      action,
      emails,
      inviteId,
      token,
      testEmail,
      segment,
      manualEmail,
      recipientName,
      email_version,
    } = await req.json();

    // Actions that don't require any auth (for unauthenticated users)
    // send_test_launch_email included for quick testing from CLI
    const noAuthActions = ['validate_token', 'send_test_launch_email'];

    // Create admin client for operations (always available)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let user: any = null;
    let supabaseClient: any = null;

    // Only require auth for actions that need it
    if (!noAuthActions.includes(action)) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        throw new Error('No authorization header');
      }

      // Create Supabase client with user's token
      supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );

      // Get the authenticated user
      const {
        data: { user: authUser },
        error: userError,
      } = await supabaseClient.auth.getUser();
      if (userError || !authUser) {
        throw new Error('Unauthorized: Could not get user');
      }
      user = authUser;

      // Actions allowed for any authenticated user (not just admins)
      const authenticatedActions = ['claim'];

      // All other actions require admin access
      if (!authenticatedActions.includes(action)) {
        const { data: callerProfile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('admin_role, full_name')
          .eq('id', user.id)
          .single();

        if (profileError || !callerProfile?.admin_role) {
          throw new Error('Unauthorized: Admin access required');
        }
      }
    }

    let result;

    switch (action) {
      case 'list': {
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        result = { invites: data };
        break;
      }

      case 'stats': {
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'status, opened_at, claimed_at, clicked_at, delivered_at, bounced_at, last_send_attempt_at, resend_email_id, send_count'
          );
        if (error) throw error;

        const total = data?.length || 0;
        const pending = data?.filter((i) => i.status === 'pending').length || 0;
        const sent = data?.filter((i) => i.status === 'sent').length || 0;
        const claimed = data?.filter((i) => i.status === 'claimed').length || 0;
        const expired = data?.filter((i) => i.status === 'expired').length || 0;
        const delivered = data?.filter((i) => i.delivered_at !== null).length || 0;
        const bounced = data?.filter((i) => i.bounced_at !== null).length || 0;
        const opened = data?.filter((i) => i.opened_at !== null).length || 0;
        const clicked = data?.filter((i) => i.clicked_at !== null).length || 0;
        const unopenedSent =
          data?.filter((i) => i.status === 'sent' && !i.opened_at && !i.claimed_at).length || 0;

        // Failed sends: attempted but no resend_email_id (email wasn't actually sent)
        // Using simpler truthy/falsy checks for reliability
        const failedSends =
          data?.filter(
            (i) =>
              i.status === 'sent' &&
              !i.opened_at &&
              !i.claimed_at &&
              i.last_send_attempt_at && // has been attempted
              !i.resend_email_id // but no resend ID = email never sent
          ).length || 0;

        // Calculate conversion rates
        // Note: Many signups came from early access before we added click tracking
        // So signup rate is based on sent, not clicked
        const openRate = sent > 0 ? ((opened / sent) * 100).toFixed(1) : '0';
        const clickRate = opened > 0 ? ((clicked / opened) * 100).toFixed(1) : '0';
        const signupRate = sent > 0 ? ((claimed / sent) * 100).toFixed(1) : '0';

        const stats = {
          total,
          pending,
          sent,
          delivered,
          bounced,
          opened,
          clicked,
          claimed,
          expired,
          unopened_sent: unopenedSent,
          failed_sends: failedSends,
          rates: {
            open_rate: `${openRate}%`,
            click_rate: `${clickRate}%`,
            signup_rate: `${signupRate}%`,
          },
        };
        result = { stats };
        break;
      }

      case 'bulk_create': {
        if (!emails || !Array.isArray(emails) || emails.length === 0) {
          throw new Error('Email list is required');
        }

        // Clean and validate emails
        const cleanEmails = emails
          .map((e: string) => e.trim().toLowerCase())
          .filter((e: string) => e && e.includes('@'));

        // Check for existing invites
        const { data: existing } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .in('email', cleanEmails);

        const existingEmails = new Set(existing?.map((e) => e.email) || []);
        const newEmails = cleanEmails.filter((e: string) => !existingEmails.has(e));

        if (newEmails.length === 0) {
          result = {
            created: 0,
            skipped: cleanEmails.length,
            message: 'All emails already have invites',
          };
          break;
        }

        // Create invites for new emails
        const invites = newEmails.map((email: string) => ({
          email,
          invite_token: generateToken(),
          status: 'pending',
        }));

        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .insert(invites)
          .select();

        if (error) throw error;

        console.log(`${data?.length} early access invites created by admin ${user.id}`);
        result = {
          created: data?.length || 0,
          skipped: existingEmails.size,
          message: `Created ${data?.length} invites`,
        };
        break;
      }

      case 'send_invite': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('id', inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invite not found');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Send the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [invite.email],
          subject: "You're Invited! Early Access to Elec-Mate",
          html: emailHtml,
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update invite status with Resend email ID for webhook tracking
        await supabaseAdmin
          .from('early_access_invites')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq('id', inviteId);

        console.log(`Early access invite sent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case 'send_all_pending': {
        // Get all pending invites
        const { data: pendingInvites, error: pendingError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'pending');

        if (pendingError) throw pendingError;

        if (!pendingInvites || pendingInvites.length === 0) {
          result = { sent: 0, message: 'No pending invites to send' };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of pendingInvites) {
          try {
            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: "You're Invited! Early Access to Elec-Mate",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                status: 'sent',
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} early access invites by admin ${user.id}`);
        result = { sent: sentCount, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      case 'validate_token': {
        if (!token) {
          throw new Error('Token is required');
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('invite_token', token)
          .single();

        if (inviteError || !invite) {
          result = { valid: false, reason: 'Invalid token' };
          break;
        }

        if (invite.status === 'claimed') {
          result = { valid: false, reason: 'This invite has already been claimed' };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          result = { valid: false, reason: 'This invite has expired' };
          break;
        }

        result = { valid: true, email: invite.email, invite };
        break;
      }

      case 'claim': {
        // Called after user signup to mark invite as claimed
        if (!token) {
          throw new Error('Token is required');
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('invite_token', token)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invalid token');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Mark as claimed
        const { error: updateError } = await supabaseAdmin
          .from('early_access_invites')
          .update({
            status: 'claimed',
            claimed_at: new Date().toISOString(),
            user_id: user.id,
          })
          .eq('id', invite.id);

        if (updateError) throw updateError;

        console.log(`Early access invite claimed by ${invite.email} (user ${user.id})`);
        result = { success: true, email: invite.email };
        break;
      }

      case 'resend': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('id', inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invite not found');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Resend the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [invite.email],
          subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
          html: emailHtml,
        });

        if (emailError) {
          throw new Error('Failed to resend email');
        }

        // Update sent_at and tracking info
        await supabaseAdmin
          .from('early_access_invites')
          .update({
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq('id', inviteId);

        console.log(`Early access invite resent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case 'delete': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        const { error } = await supabaseAdmin
          .from('early_access_invites')
          .delete()
          .eq('id', inviteId);

        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'resend_all_unopened': {
        // Batch size - process this many per request to avoid timeout
        const BATCH_SIZE = 50;

        // Get count of all unopened invites first
        const { count: totalUnopenedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null);

        // Get next batch - invites not attempted in the last hour
        // This ensures we can retry failed sends and continue where we left off
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

        const { data: unopenedInvites, error: unopenedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`)
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (unopenedError) throw unopenedError;

        if (!unopenedInvites || unopenedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unopened: totalUnopenedCount || 0,
            message: 'No more unopened invites to resend',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of unopenedInvites) {
          try {
            // Mark attempt BEFORE sending (so if we timeout, we know we tried)
            await supabaseAdmin
              .from('early_access_invites')
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq('id', invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success data
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining (not yet attempted in this batch run)
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Resent ${sentCount}/${unopenedInvites.length} unopened invites by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: unopenedInvites.length,
          remaining,
          total_unopened: totalUnopenedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'detailed_list': {
        // Get invites with joined profile data for claimed invites
        const { data: invites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            `
            id,
            email,
            invite_token,
            status,
            sent_at,
            delivered_at,
            opened_at,
            clicked_at,
            claimed_at,
            bounced_at,
            bounce_type,
            expires_at,
            created_at,
            user_id,
            send_count,
            launch_email_sent_at,
            launch_email_opened_at,
            launch_email_clicked_at
          `
          )
          .order('created_at', { ascending: false });

        if (invitesError) throw invitesError;

        // Get profile and subscription data for claimed invites
        const claimedUserIds = invites?.filter((i) => i.user_id).map((i) => i.user_id) || [];

        let profilesMap: Record<string, any> = {};
        let subscriptionsMap: Record<string, any> = {};

        if (claimedUserIds.length > 0) {
          const { data: profiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', claimedUserIds);

          if (profiles) {
            profilesMap = profiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }

          const { data: subscriptions } = await supabaseAdmin
            .from('subscriptions')
            .select('user_id, status, trial_end, plan_name')
            .in('user_id', claimedUserIds);

          if (subscriptions) {
            subscriptionsMap = subscriptions.reduce(
              (acc, s) => {
                acc[s.user_id] = s;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Build detailed list
        const detailedInvites = invites?.map((invite) => {
          const profile = invite.user_id ? profilesMap[invite.user_id] : null;
          const subscription = invite.user_id ? subscriptionsMap[invite.user_id] : null;

          // Determine derived status based on funnel progression
          let derivedStatus = invite.status;
          if (invite.bounced_at) {
            derivedStatus = 'bounced';
          } else if (invite.claimed_at) {
            derivedStatus = 'claimed';
          } else if (invite.clicked_at) {
            derivedStatus = 'clicked';
          } else if (invite.opened_at) {
            derivedStatus = 'opened';
          } else if (invite.delivered_at) {
            derivedStatus = 'delivered';
          }

          return {
            id: invite.id,
            email: invite.email,
            status: derivedStatus,
            raw_status: invite.status,
            sent_at: invite.sent_at,
            delivered_at: invite.delivered_at,
            opened_at: invite.opened_at,
            clicked_at: invite.clicked_at,
            claimed_at: invite.claimed_at,
            bounced_at: invite.bounced_at,
            bounce_type: invite.bounce_type,
            expires_at: invite.expires_at,
            created_at: invite.created_at,
            send_count: invite.send_count || 1,
            // Launch campaign tracking
            launch_email_sent_at: invite.launch_email_sent_at,
            launch_email_opened_at: invite.launch_email_opened_at,
            launch_email_clicked_at: invite.launch_email_clicked_at,
            user: profile
              ? {
                  id: invite.user_id,
                  full_name: profile.full_name,
                  role: profile.role,
                  signed_up_at: profile.created_at,
                }
              : null,
            subscription: subscription
              ? {
                  status: subscription.status,
                  plan_name: subscription.plan_name,
                  trial_end: subscription.trial_end,
                }
              : null,
          };
        });

        result = { invites: detailedInvites };
        break;
      }

      case 'send_test_launch_email': {
        // Send a test launch email to a specific address (for previewing)
        if (!testEmail) {
          throw new Error('testEmail is required');
        }

        // Generate a test token
        const testToken = `TEST-${Date.now()}`;

        // Use V8 App Store template if requested, otherwise default launch template
        const emailHtml =
          email_version === 'v8'
            ? generateEarlyAccessV8AppStoreHTML()
            : generateLaunchEmailHTML(testEmail, testToken);

        const testSubject =
          email_version === 'v8'
            ? "[TEST] We're on the App Store."
            : '⚡ [TEST] What would you do with 5 extra hours a week?';

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [testEmail],
          subject: testSubject,
          html: emailHtml,
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Test launch email sent to ${testEmail}${user ? ` by admin ${user.id}` : ''}`);
        result = {
          success: true,
          email: testEmail,
          resendId: emailData?.id,
          message: `Test launch email sent to ${testEmail}`,
        };
        break;
      }

      case 'send_launch_campaign': {
        // Send launch emails to people who haven't signed up yet
        // Send in batches — 500ms between emails, 50 per function call
        const BATCH_SIZE = 50;
        const DELAY_BETWEEN_EMAILS_MS = 500;

        // Get count of all unclaimed, non-bounced invites that haven't received launch email
        const { count: totalUnclaimedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null);

        // Get next batch
        const { data: unclaimedInvites, error: unclaimedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null)
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (unclaimedError) throw unclaimedError;

        if (!unclaimedInvites || unclaimedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unclaimed: totalUnclaimedCount || 0,
            message: 'All launch emails have been sent!',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (let i = 0; i < unclaimedInvites.length; i++) {
          const invite = unclaimedInvites[i];

          try {
            const emailHtml =
              email_version === 'v8'
                ? generateEarlyAccessV8AppStoreHTML()
                : generateLaunchEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject:
                email_version === 'v8'
                  ? "We're on the App Store."
                  : '⚡ What would you do with 5 extra hours a week?',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with launch email tracking
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                launch_email_sent_at: new Date().toISOString(),
                launch_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Rate limit: wait between emails (except after the last one)
            if (i < unclaimedInvites.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_EMAILS_MS));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Launch campaign: Sent ${sentCount}/${unclaimedInvites.length} emails by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: unclaimedInvites.length,
          remaining,
          total_unclaimed: totalUnclaimedCount || 0,
          sent_to: sentEmails,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          estimated_time_remaining: complete
            ? null
            : `~${Math.ceil(remaining / BATCH_SIZE)} more calls needed`,
          message: complete
            ? `Launch campaign complete! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'launch_campaign_stats': {
        // Get stats specifically for the launch campaign
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'status, claimed_at, bounced_at, launch_email_sent_at, launch_email_opened_at, launch_email_clicked_at'
          );

        if (error) throw error;

        const total = data?.length || 0;
        const claimed = data?.filter((i) => i.claimed_at !== null).length || 0;
        const bounced = data?.filter((i) => i.bounced_at !== null).length || 0;
        const eligibleForLaunch = data?.filter((i) => !i.claimed_at && !i.bounced_at).length || 0;
        const launchEmailSent = data?.filter((i) => i.launch_email_sent_at !== null).length || 0;
        const launchEmailOpened =
          data?.filter((i) => i.launch_email_opened_at !== null).length || 0;
        const launchEmailClicked =
          data?.filter((i) => i.launch_email_clicked_at !== null).length || 0;
        const pendingLaunchEmail = eligibleForLaunch - launchEmailSent;

        result = {
          stats: {
            total_invites: total,
            already_signed_up: claimed,
            bounced: bounced,
            eligible_for_launch: eligibleForLaunch,
            launch_emails_sent: launchEmailSent,
            launch_emails_pending: pendingLaunchEmail,
            launch_emails_opened: launchEmailOpened,
            launch_emails_clicked: launchEmailClicked,
            rates: {
              signup_rate_early_access:
                total > 0 ? `${((claimed / total) * 100).toFixed(1)}%` : '0%',
              launch_open_rate:
                launchEmailSent > 0
                  ? `${((launchEmailOpened / launchEmailSent) * 100).toFixed(1)}%`
                  : '0%',
              launch_click_rate:
                launchEmailOpened > 0
                  ? `${((launchEmailClicked / launchEmailOpened) * 100).toFixed(1)}%`
                  : '0%',
            },
          },
        };
        break;
      }

      case 'get_segmented_leads': {
        // Get leads segmented by engagement level for the new Early Access page design
        // Signed Up: converted users (success!) - cross-referenced against auth.users
        // Hot: clicked at least one email but didn't sign up
        // Warm: opened but never clicked
        // Cold: never opened any email

        const { data: allInvites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            `
            id,
            email,
            status,
            sent_at,
            delivered_at,
            opened_at,
            clicked_at,
            claimed_at,
            bounced_at,
            bounce_type,
            created_at,
            invite_token,
            send_count,
            user_id,
            launch_email_sent_at,
            launch_email_opened_at,
            launch_email_clicked_at
          `
          )
          .order('created_at', { ascending: false });

        if (invitesError) throw invitesError;

        // Get ALL user emails from auth.users to definitively identify who has signed up
        // This catches users who signed up directly (not through invite link)
        const { data: authUsersData, error: authUsersError } =
          await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000, // Get all users
          });

        if (authUsersError) {
          console.error('Error fetching auth users:', authUsersError);
        }

        // Create a Set of lowercase, trimmed emails for fast lookup
        const signedUpEmails = new Set(
          authUsersData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        console.log(`Found ${signedUpEmails.size} registered users in auth.users`);
        console.log(`Signed up emails: ${Array.from(signedUpEmails).join(', ')}`);

        // Get profile data for signed up users (for display purposes)
        const signedUpUserIds = allInvites?.filter((i) => i.user_id).map((i) => i.user_id) || [];
        let profilesMap: Record<string, any> = {};

        if (signedUpUserIds.length > 0) {
          const { data: profiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', signedUpUserIds);

          if (profiles) {
            profilesMap = profiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Segment all leads
        const signedUp: typeof allInvites = [];
        const hot: typeof allInvites = [];
        const warm: typeof allInvites = [];
        const cold: typeof allInvites = [];
        const bounced: typeof allInvites = [];

        for (const invite of allInvites || []) {
          const emailLower = invite.email.toLowerCase().trim();

          // Bounced emails go to their own category
          if (invite.bounced_at) {
            bounced.push(invite);
            continue;
          }

          // Check if this email exists in auth.users (actually signed up)
          // This is the definitive check - catches direct signups too
          const hasSignedUp = signedUpEmails.has(emailLower);

          if (hasSignedUp) {
            console.log(`✓ ${emailLower} has signed up - moving to signed_up segment`);
          }

          if (hasSignedUp) {
            signedUp.push(invite);
            continue;
          }

          // Has clicked any email?
          const hasClicked = invite.clicked_at || invite.launch_email_clicked_at;
          // Has opened any email?
          const hasOpened = invite.opened_at || invite.launch_email_opened_at;

          if (hasClicked) {
            hot.push(invite);
          } else if (hasOpened) {
            warm.push(invite);
          } else {
            cold.push(invite);
          }
        }

        // Helper to get last activity description
        const getLastActivity = (invite: (typeof allInvites)[0]) => {
          if (invite.claimed_at) {
            return { type: 'signed_up', date: invite.claimed_at };
          }
          if (invite.clicked_at) {
            return { type: 'clicked', date: invite.clicked_at };
          }
          if (invite.launch_email_clicked_at) {
            return { type: 'clicked_launch', date: invite.launch_email_clicked_at };
          }
          if (invite.opened_at) {
            return { type: 'opened', date: invite.opened_at };
          }
          if (invite.launch_email_opened_at) {
            return { type: 'opened_launch', date: invite.launch_email_opened_at };
          }
          if (invite.delivered_at) {
            return { type: 'delivered', date: invite.delivered_at };
          }
          if (invite.sent_at) {
            return { type: 'sent', date: invite.sent_at };
          }
          return { type: 'created', date: invite.created_at };
        };

        // Sort each segment by most recent activity
        const sortByActivity = (a: (typeof allInvites)[0], b: (typeof allInvites)[0]) => {
          const aActivity = getLastActivity(a);
          const bActivity = getLastActivity(b);
          return new Date(bActivity.date).getTime() - new Date(aActivity.date).getTime();
        };

        signedUp.sort(sortByActivity);
        hot.sort(sortByActivity);
        warm.sort(sortByActivity);
        cold.sort(sortByActivity);

        // Add last_activity and user profile to each lead for display
        const addActivity = (leads: typeof allInvites) =>
          leads.map((lead) => ({
            ...lead,
            last_activity: getLastActivity(lead),
            user:
              lead.user_id && profilesMap[lead.user_id]
                ? {
                    id: lead.user_id,
                    full_name: profilesMap[lead.user_id].full_name,
                    role: profilesMap[lead.user_id].role,
                    signed_up_at: profilesMap[lead.user_id].created_at,
                  }
                : null,
          }));

        const totalInvites = allInvites?.length || 0;

        result = {
          segments: {
            signed_up: addActivity(signedUp),
            hot: addActivity(hot),
            warm: addActivity(warm),
            cold: addActivity(cold),
            bounced: addActivity(bounced),
          },
          stats: {
            total: totalInvites,
            total_unconverted: hot.length + warm.length + cold.length,
            signed_up: signedUp.length,
            bounced: bounced.length,
            hot_count: hot.length,
            warm_count: warm.length,
            cold_count: cold.length,
            conversion_rate:
              totalInvites > 0 ? `${((signedUp.length / totalInvites) * 100).toFixed(0)}%` : '0%',
          },
        };
        break;
      }

      case 'send_to_segment': {
        // Send targeted email to a specific segment with rate limiting
        // Processes in batches to avoid Resend rate limits and function timeouts
        // Note: segment is already parsed from req.json() at the top of the function

        if (!segment || !['hot', 'warm', 'cold'].includes(segment)) {
          throw new Error('Valid segment (hot, warm, cold) is required');
        }

        // Batch configuration — 50 per call, 500ms between
        const BATCH_SIZE = 50;
        const DELAY_BETWEEN_EMAILS_MS = 500;

        // 24-hour cooldown - can re-send to leads after 1 day
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        // Get ALL user emails from auth.users to definitively identify who has signed up
        // This catches users who signed up directly (not through invite link)
        const { data: authUsersData, error: authUsersError } =
          await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000,
          });

        if (authUsersError) {
          console.error('Error fetching auth users:', authUsersError);
        }

        // Create a Set of lowercase emails for fast lookup
        const signedUpEmails = new Set(
          authUsersData?.users?.map((u) => u.email?.toLowerCase()).filter(Boolean) || []
        );

        console.log(
          `Found ${signedUpEmails.size} registered users - will exclude from segment sends`
        );

        // Get leads for the specified segment - exclude bounced
        // Allow re-sending if launch_email_sent_at is null OR older than 24 hours
        const { data: allInvites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .is('bounced_at', null);

        if (invitesError) throw invitesError;

        // Filter by segment AND exclude anyone who has actually signed up (in auth.users)
        // Also exclude anyone who received an email in the last 24 hours
        const segmentLeads =
          allInvites?.filter((invite) => {
            const emailLower = invite.email.toLowerCase().trim();

            // Skip if this email exists in auth.users (they've signed up)
            if (signedUpEmails.has(emailLower)) {
              console.log(`Excluding ${emailLower} - already signed up`);
              return false;
            }

            // Skip if email was sent in the last 24 hours
            if (invite.launch_email_sent_at && invite.launch_email_sent_at > oneDayAgo) {
              return false;
            }

            const hasClicked = invite.clicked_at || invite.launch_email_clicked_at;
            const hasOpened = invite.opened_at || invite.launch_email_opened_at;

            if (segment === 'hot') return hasClicked;
            if (segment === 'warm') return hasOpened && !hasClicked;
            if (segment === 'cold') return !hasOpened;
            return false;
          }) || [];

        const totalInSegment = segmentLeads.length;

        if (totalInSegment === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_in_segment: 0,
            complete: true,
            message: `No leads in ${segment} segment need emails (all already sent or signed up)`,
          };
          break;
        }

        // Take only a batch to process this call
        const batchToProcess = segmentLeads.slice(0, BATCH_SIZE);
        const remaining = totalInSegment - batchToProcess.length;

        // Send emails (using launch email template as it's the current campaign)
        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (let i = 0; i < batchToProcess.length; i++) {
          const invite = batchToProcess[i];

          try {
            const emailHtml =
              email_version === 'v8'
                ? generateEarlyAccessV8AppStoreHTML()
                : generateLaunchEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject:
                email_version === 'v8'
                  ? "We're on the App Store."
                  : '⚡ What would you do with 5 extra hours a week?',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                launch_email_sent_at: new Date().toISOString(),
                launch_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Rate limit: wait between emails (except after the last one)
            if (i < batchToProcess.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_EMAILS_MS));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        const complete = remaining === 0;
        console.log(
          `Sent ${sentCount} emails to ${segment} segment by admin ${user.id}. ${remaining} remaining.`
        );

        result = {
          sent: sentCount,
          segment,
          total_in_segment: totalInSegment,
          remaining,
          complete,
          sent_to: sentEmails,
          errors: errors.length > 0 ? errors : undefined,
          estimated_calls_remaining: complete ? 0 : Math.ceil(remaining / BATCH_SIZE),
          message: complete
            ? `${segment.toUpperCase()} segment complete! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails to ${segment} segment. ${remaining} remaining - click again to continue.`,
        };
        break;
      }

      case 'retry_failed': {
        // Retry ONLY the failed sends - people who never actually received the email
        // Failed = attempted but no resend_email_id (email wasn't actually sent)
        const BATCH_SIZE = 50;

        // Get count of all failed sends
        const { count: totalFailedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0');

        // Get next batch of failed sends
        const { data: failedInvites, error: failedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0')
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (failedError) throw failedError;

        if (!failedInvites || failedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_failed: totalFailedCount || 0,
            message: 'No more failed sends to retry',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of failedInvites) {
          try {
            // Mark attempt
            await supabaseAdmin
              .from('early_access_invites')
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq('id', invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0');

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Retried ${sentCount}/${failedInvites.length} failed sends by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: failedInvites.length,
          remaining,
          total_failed: totalFailedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'send_test_conversion_email': {
        // Send a test conversion email to preview the template
        if (!testEmail) {
          throw new Error('testEmail is required');
        }

        const convTestHtml = generateConversionEmailHTML(testEmail);

        const { data: convTestData, error: convTestError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: '[TEST] Your Sunday Round-Up ⚡',
          html: convTestHtml,
          tags: [
            { name: 'campaign', value: 'conversion' },
            { name: 'type', value: 'test' },
          ],
        });

        if (convTestError) {
          throw new Error(`Failed to send test email: ${convTestError.message}`);
        }

        console.log(
          `Conversion test email sent to ${testEmail}${user ? ` by admin ${user.id}` : ''}`
        );
        result = { success: true, email: testEmail, resendId: convTestData?.id };
        break;
      }

      case 'get_conversion_leads': {
        // Get all invites for the conversion campaign view
        const { data: allConvInvites, error: convInvitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'id, email, created_at, conversion_email_sent_at, conversion_email_id, bounced_at, claimed_at, user_id'
          )
          .order('created_at', { ascending: false });

        if (convInvitesError) throw convInvitesError;

        // Get auth users to identify who signed up
        const { data: convAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const convSignedUpEmails = new Set(
          convAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get tracking events for conversion emails
        const convEmailIds = (allConvInvites || [])
          .filter((i) => i.conversion_email_id)
          .map((i) => i.conversion_email_id);

        const convTrackingMap = new Map<string, Set<string>>();
        const convLinkCounts = new Map<string, number>();
        let convDelivered = 0;
        let convEmailBounced = 0;

        if (convEmailIds.length > 0) {
          const { data: convEvents } = await supabaseAdmin
            .from('email_tracking_events')
            .select('email_id, event_type, link_url')
            .in('email_id', convEmailIds);

          const deliveredSet = new Set<string>();
          const bouncedSet = new Set<string>();

          (convEvents || []).forEach((e: any) => {
            if (!convTrackingMap.has(e.email_id)) convTrackingMap.set(e.email_id, new Set());
            convTrackingMap.get(e.email_id)!.add(e.event_type);

            if (e.event_type === 'email.delivered') deliveredSet.add(e.email_id);
            if (e.event_type === 'email.bounced') bouncedSet.add(e.email_id);
            if (e.event_type === 'email.clicked' && e.link_url) {
              convLinkCounts.set(e.link_url, (convLinkCounts.get(e.link_url) || 0) + 1);
            }
          });

          convDelivered = deliveredSet.size;
          convEmailBounced = bouncedSet.size;
        }

        // Get profiles for converted users
        const convUserIds = (allConvInvites || []).filter((i) => i.user_id).map((i) => i.user_id);
        let convProfilesMap: Record<string, any> = {};
        if (convUserIds.length > 0) {
          const { data: convProfiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', convUserIds);
          if (convProfiles) {
            convProfilesMap = convProfiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Segment into unconverted and converted
        const unconverted: any[] = [];
        const converted: any[] = [];
        let convUnsent = 0;
        let convSent = 0;
        let convOpened = 0;
        let convClicked = 0;
        let convInviteBounced = 0;

        for (const invite of allConvInvites || []) {
          if (invite.bounced_at) {
            convInviteBounced++;
            continue;
          }

          const emailLower = invite.email.toLowerCase().trim();
          const hasSignedUp = convSignedUpEmails.has(emailLower);

          if (hasSignedUp) {
            const profile =
              invite.user_id && convProfilesMap[invite.user_id]
                ? convProfilesMap[invite.user_id]
                : null;
            converted.push({
              id: invite.id,
              email: invite.email,
              claimed_at: invite.claimed_at,
              user: profile
                ? {
                    full_name: profile.full_name,
                    role: profile.role,
                    signed_up_at: profile.created_at,
                  }
                : null,
            });
            continue;
          }

          // Determine conversion status from tracking events
          let convStatus = 'unsent';
          if (invite.conversion_email_sent_at) {
            convStatus = 'sent';
            const events = convTrackingMap.get(invite.conversion_email_id) || new Set();
            if (events.has('email.clicked')) {
              convStatus = 'clicked';
              convClicked++;
            } else if (events.has('email.opened')) {
              convStatus = 'opened';
              convOpened++;
            } else {
              convSent++;
            }
          } else {
            convUnsent++;
          }

          unconverted.push({
            id: invite.id,
            email: invite.email,
            created_at: invite.created_at,
            conversion_status: convStatus,
            conversion_email_sent_at: invite.conversion_email_sent_at,
            conversion_email_opened_at: null,
            conversion_email_clicked_at: null,
          });
        }

        // Top clicked links
        const convTopLinks = Array.from(convLinkCounts.entries())
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Compute rates
        const convTotalSent = convSent + convOpened + convClicked;
        const convBase = convDelivered || 1;

        result = {
          unconverted,
          converted,
          stats: {
            total_unconverted: unconverted.length,
            unsent: convUnsent,
            sent: convSent,
            totalSent: convTotalSent,
            delivered: convDelivered,
            opened: convOpened,
            clicked: convClicked,
            emailBounced: convEmailBounced,
            total_converted: converted.length,
            bounced: convInviteBounced,
            openRate: ((convOpened / convBase) * 100).toFixed(1),
            clickRate: ((convClicked / convBase) * 100).toFixed(1),
            bounceRate: ((convEmailBounced / convBase) * 100).toFixed(1),
            topLinks: convTopLinks,
          },
        };
        break;
      }

      case 'send_manual_conversion_email': {
        // Send conversion email to any email address (manual entry)
        if (!manualEmail) {
          throw new Error('manualEmail is required');
        }

        const convManualHtml = generateConversionEmailHTML(manualEmail);
        const { data: convManualData, error: convManualError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [manualEmail.trim().toLowerCase()],
          subject: 'Your Sunday Round-Up ⚡',
          html: convManualHtml,
          tags: [
            { name: 'campaign', value: 'conversion' },
            { name: 'version', value: 'v1' },
            { name: 'type', value: 'manual' },
          ],
        });

        if (convManualError) {
          throw new Error(`Failed to send: ${convManualError.message}`);
        }

        // Log to email_logs
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail,
          subject: 'Your Sunday Round-Up ⚡',
          template: 'conversion_v1',
          status: 'sent',
          metadata: { type: 'manual_conversion', resend_id: convManualData?.id },
        });

        console.log(`Manual conversion email sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail, resendId: convManualData?.id };
        break;
      }

      case 'send_conversion_campaign': {
        // Batch send conversion emails — called repeatedly by frontend until complete
        const CONV_BATCH_SIZE = 50;
        const CONV_DELAY_MS = 500;

        // Get auth users to exclude signed-up
        const { data: convCampAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const convCampSignedUp = new Set(
          convCampAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get ALL unsent, non-bounced invites (only ~200-300 rows, tiny payload)
        const { data: convUnsent2, error: convUnsentError } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email, invite_token')
          .is('conversion_email_sent_at', null)
          .is('bounced_at', null)
          .order('created_at', { ascending: true });

        if (convUnsentError) throw convUnsentError;

        // Filter out signed-up users then take first batch
        const convEligible = (convUnsent2 || []).filter(
          (i) => !convCampSignedUp.has(i.email.toLowerCase().trim())
        );
        const convBatch = convEligible.slice(0, CONV_BATCH_SIZE);

        if (convBatch.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            complete: true,
            message: 'All conversion emails sent!',
          };
          break;
        }

        let convSentCount = 0;
        const convErrors: string[] = [];

        for (let i = 0; i < convBatch.length; i++) {
          const invite = convBatch[i];
          try {
            const emailHtml = generateConversionEmailHTML(invite.email);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <offers@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email.trim().toLowerCase()],
              subject: 'Your Sunday Round-Up ⚡',
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'conversion' },
                { name: 'version', value: 'v1' },
              ],
            });

            if (emailError) {
              convErrors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                conversion_email_sent_at: new Date().toISOString(),
                conversion_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            convSentCount++;

            // Rate limit between sends
            if (i < convBatch.length - 1) {
              await new Promise((r) => setTimeout(r, CONV_DELAY_MS));
            }
          } catch (err: any) {
            convErrors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Count remaining — fetch actual unsent emails and exclude signed-up properly
        const { data: convRemainingRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .is('conversion_email_sent_at', null)
          .is('bounced_at', null);

        const convRemaining = (convRemainingRows || []).filter(
          (r) => !convCampSignedUp.has(r.email.toLowerCase().trim())
        ).length;
        const convComplete = convRemaining === 0;

        console.log(
          `Conversion campaign: Sent ${convSentCount}/${convBatch.length} by admin ${user.id}. ~${convRemaining} remaining.`
        );

        result = {
          sent: convSentCount,
          remaining: convRemaining,
          complete: convComplete,
          errors: convErrors.length > 0 ? convErrors : undefined,
          message: convComplete
            ? `All done! Sent ${convSentCount} emails.`
            : `Sent ${convSentCount}. ~${convRemaining} remaining.`,
        };
        break;
      }

      // ── Early Access £7.99 Offer Campaign ──────────────────────────────

      case 'get_ea_offer_status': {
        // Get offer campaign stats — how many sent, remaining, total
        const { data: allInvites, error: eaErr } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email, offer_sent_at, bounced_at, user_id');
        if (eaErr) throw eaErr;

        // Get auth users to exclude signed-up
        const { data: eaAuthData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        const eaSignedUp = new Set(
          eaAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        let eaTotal = 0;
        let eaSent = 0;
        let eaRemaining = 0;

        for (const invite of allInvites || []) {
          if (invite.bounced_at) continue;
          if (eaSignedUp.has(invite.email.toLowerCase().trim())) continue;
          eaTotal++;
          if (invite.offer_sent_at) {
            eaSent++;
          } else {
            eaRemaining++;
          }
        }

        result = { total: eaTotal, sent: eaSent, remaining: eaRemaining };
        break;
      }

      case 'send_ea_offer_test': {
        // Send a test offer email to a specific address
        if (!testEmail) throw new Error('testEmail is required');

        const testRecipient = testEmail.trim().toLowerCase();

        // V10 test path — best-in-class, with real unsubscribe headers
        if (!email_version || email_version === 'v10') {
          const unsubscribeUrl = await buildUnsubscribeUrl(testRecipient);
          const html = generateV10HTML('early_access', 'Test', unsubscribeUrl);
          const text = generateV10PlainText('early_access', 'Test', unsubscribeUrl);
          const subject = "[TEST] We've shipped.";

          await rateLimiter.acquire(1);
          const { data: v10TestData, error: v10TestErr } = await resend.emails.send({
            from: FROM_V10,
            replyTo: REPLY_TO,
            to: [testRecipient],
            subject,
            html,
            text,
            headers: buildUnsubscribeHeaders(unsubscribeUrl),
            tags: [
              { name: 'campaign', value: 'early_access_offer' },
              { name: 'version', value: 'v10' },
              { name: 'type', value: 'test' },
            ],
          });

          if (v10TestErr) throw new Error(`Failed to send: ${v10TestErr.message}`);

          console.log(`EA V10 test sent to ${testRecipient} by admin ${user.id}`);
          result = {
            success: true,
            email: testRecipient,
            version: 'v10',
            resendId: v10TestData?.id,
          };
          break;
        }

        let eaTestHtml: string;
        let eaTestSubject: string;
        let eaTestVersion: string;
        if (email_version === 'v8') {
          eaTestHtml = generateEarlyAccessV8AppStoreHTML();
          eaTestSubject = "[TEST] We're on the App Store.";
          eaTestVersion = 'v8';
        } else if (email_version === 'v7') {
          const testToken = generateToken();
          eaTestHtml = generateEarlyAccessV7HTML(testEmail, testToken);
          eaTestSubject = '[TEST] 7 weeks. No App Store. Just electricians getting shit done.';
          eaTestVersion = 'v7';
        } else if (email_version === 'v6') {
          eaTestHtml = generateEarlyAccessV6HTML();
          eaTestSubject = "[TEST] You signed up early. Here's what that gets you.";
          eaTestVersion = 'v6';
        } else {
          eaTestHtml = generateEarlyAccessV8AppStoreHTML();
          eaTestSubject = "[TEST] We're on the App Store.";
          eaTestVersion = 'v8';
        }
        const { data: eaTestData, error: eaTestErr } = await resend.emails.send({
          from: 'Elec-Mate <founder@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: eaTestSubject,
          html: eaTestHtml,
          tags: [
            { name: 'campaign', value: 'early_access_offer' },
            { name: 'version', value: eaTestVersion },
            { name: 'type', value: 'test' },
          ],
        });

        if (eaTestErr) throw new Error(`Failed to send: ${eaTestErr.message}`);

        console.log(
          `EA offer test email (${eaTestVersion}) sent to ${testEmail} by admin ${user.id}`
        );
        result = { success: true, email: testEmail, resendId: eaTestData?.id };
        break;
      }

      case 'send_ea_offer_manual': {
        // Real (non-test) V10 send to a specific address — goes through suppression check,
        // sets List-Unsubscribe headers, gets logged. No [TEST] prefix. Doesn't mark anyone
        // in early_access_invites — intended for one-off sends outside the bulk campaign.
        if (!manualEmail) throw new Error('manualEmail is required');

        const manualRecipient = manualEmail.trim().toLowerCase();

        if (await isSuppressed(supabaseAdmin, manualRecipient)) {
          throw new Error('Recipient is in the suppression list — unsubscribed previously');
        }

        const firstName = recipientName?.split(' ')[0] || 'mate';
        const manualUnsubUrl = await buildUnsubscribeUrl(manualRecipient);
        const manualHtml = generateV10HTML('early_access', firstName, manualUnsubUrl);
        const manualText = generateV10PlainText('early_access', firstName, manualUnsubUrl);
        const manualSubject = "We've shipped.";

        await rateLimiter.acquire(1);
        const { data: v10ManualData, error: v10ManualErr } = await resend.emails.send({
          from: FROM_V10,
          replyTo: REPLY_TO,
          to: [manualRecipient],
          subject: manualSubject,
          html: manualHtml,
          text: manualText,
          headers: buildUnsubscribeHeaders(manualUnsubUrl),
          tags: [
            { name: 'campaign', value: 'early_access_offer' },
            { name: 'version', value: 'v10' },
            { name: 'type', value: 'manual' },
          ],
        });

        if (v10ManualErr) throw new Error(`Failed to send: ${v10ManualErr.message}`);

        console.log(`EA V10 manual sent to ${manualRecipient} by admin ${user.id}`);
        result = {
          success: true,
          email: manualRecipient,
          version: 'v10',
          resendId: v10ManualData?.id,
        };
        break;
      }

      case 'send_ea_offer_campaign': {
        // V10 path — batch API, suppression check, retries, idempotency
        if (!email_version || email_version === 'v10') {
          // Exclude anyone who's already signed up
          const { data: eaV10AuthData } = await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000,
          });
          const eaV10SignedUp = new Set(
            eaV10AuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
          );

          const { data: eaV10Unsent, error: eaV10Err } = await supabaseAdmin
            .from('early_access_invites')
            .select('id, email')
            .is('offer_sent_at', null)
            .is('bounced_at', null)
            .order('created_at', { ascending: true });
          if (eaV10Err) throw eaV10Err;

          const eaV10Eligible = (eaV10Unsent || []).filter(
            (i) => !eaV10SignedUp.has(i.email.toLowerCase().trim())
          );

          if (eaV10Eligible.length === 0) {
            result = { sent: 0, remaining: 0, complete: true, message: 'All done.' };
            break;
          }

          // Pre-check suppression list for the whole batch
          const allEaEmails = eaV10Eligible.map((i) => i.email.toLowerCase().trim());
          const { data: eaSuppressed } = await supabaseAdmin
            .from('email_suppressions')
            .select('email')
            .in('email', allEaEmails);
          const eaSuppressedSet = new Set<string>(
            (eaSuppressed || []).map((r: any) => (r.email as string).toLowerCase())
          );

          const eaQueue = eaV10Eligible.filter(
            (i) => !eaSuppressedSet.has(i.email.toLowerCase().trim())
          );
          const eaSkipped = eaV10Eligible.length - eaQueue.length;

          // Take ONE batch up to BATCH_MAX (100) — frontend loops until complete
          const eaBatchV10 = eaQueue.slice(0, BATCH_MAX);

          if (eaBatchV10.length === 0) {
            result = {
              sent: 0,
              skipped: eaSkipped,
              remaining: 0,
              complete: true,
              message: 'All eligible recipients are in suppression list.',
            };
            break;
          }

          // Build unsubscribe URLs per recipient
          const eaWithUnsub = await Promise.all(
            eaBatchV10.map(async (i) => ({
              ...i,
              email: i.email.trim().toLowerCase(),
              unsubscribeUrl: await buildUnsubscribeUrl(i.email),
            }))
          );

          const eaSubject = "We've shipped.";
          const eaBatchItems: ResendBatchItem[] = eaWithUnsub.map((r) => ({
            from: FROM_V10,
            replyTo: REPLY_TO,
            to: [r.email],
            subject: eaSubject,
            html: generateV10HTML('early_access', 'mate', r.unsubscribeUrl),
            text: generateV10PlainText('early_access', 'mate', r.unsubscribeUrl),
            headers: buildUnsubscribeHeaders(r.unsubscribeUrl),
            tags: [
              { name: 'campaign', value: 'early_access_offer' },
              { name: 'version', value: 'v10' },
            ],
          }));

          const dateStr = new Date().toISOString().slice(0, 10);
          const idHash = eaWithUnsub
            .map((r) => r.id)
            .sort()
            .join('')
            .slice(0, 40);
          const idempotencyKey = `ea-v10-${dateStr}-${idHash}`;

          const { ids, error: batchErr } = await sendBatchWithRetry(
            resend,
            rateLimiter,
            eaBatchItems,
            idempotencyKey
          );

          const eaV10Errors: string[] = [];
          let eaV10Sent = 0;
          const sentNow = new Date().toISOString();

          for (let i = 0; i < eaWithUnsub.length; i++) {
            const recipient = eaWithUnsub[i];
            const resendId = ids[i];
            if (resendId) {
              await supabaseAdmin
                .from('early_access_invites')
                .update({ offer_sent_at: sentNow, offer_email_id: resendId })
                .eq('id', recipient.id);
              eaV10Sent++;
            } else {
              eaV10Errors.push(`${recipient.email}: ${batchErr || 'no resend id'}`);
            }
          }

          // Count remaining for next round
          const { data: eaV10RemRows } = await supabaseAdmin
            .from('early_access_invites')
            .select('email')
            .is('offer_sent_at', null)
            .is('bounced_at', null);
          const eaV10RemCount = (eaV10RemRows || []).filter(
            (r) =>
              !eaV10SignedUp.has(r.email.toLowerCase().trim()) &&
              !eaSuppressedSet.has(r.email.toLowerCase().trim())
          ).length;

          console.log(
            `EA V10 campaign: sent ${eaV10Sent}, skipped ${eaSkipped}, ${eaV10RemCount} remaining`
          );

          result = {
            sent: eaV10Sent,
            skipped: eaSkipped,
            remaining: eaV10RemCount,
            complete: eaV10RemCount === 0,
            errors: eaV10Errors.length ? eaV10Errors : undefined,
            message:
              eaV10RemCount === 0
                ? `All done! Sent ${eaV10Sent} emails.`
                : `Sent ${eaV10Sent}. ${eaV10RemCount} remaining.`,
          };
          break;
        }

        // Legacy V8 path — batch of 50 with 300ms delay
        const EA_BATCH_SIZE = 50;
        const EA_SEND_DELAY_MS = 300;

        // Get auth users to exclude signed-up
        const { data: eaCampAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const eaCampSignedUp = new Set(
          eaCampAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get ALL unsent, non-bounced invites
        const { data: eaUnsent, error: eaUnsentErr } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email')
          .is('offer_sent_at', null)
          .is('bounced_at', null)
          .order('created_at', { ascending: true });

        if (eaUnsentErr) throw eaUnsentErr;

        // Filter out signed-up users
        const eaEligible = (eaUnsent || []).filter(
          (i) => !eaCampSignedUp.has(i.email.toLowerCase().trim())
        );

        const eaBatch = eaEligible.slice(0, EA_BATCH_SIZE);

        if (eaBatch.length === 0) {
          result = { sent: 0, remaining: 0, complete: true, message: 'All offer emails sent!' };
          break;
        }

        let eaSentCount = 0;
        const eaErrors: string[] = [];

        for (const invite of eaBatch) {
          try {
            const emailHtml = generateEarlyAccessV8AppStoreHTML();

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <founder@elec-mate.com>',
              replyTo: 'founder@elec-mate.com',
              to: [invite.email.trim().toLowerCase()],
              subject: "We're on the App Store.",
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'early_access_offer' },
                { name: 'version', value: 'v8' },
              ],
            });

            if (emailError) {
              eaErrors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                offer_sent_at: new Date().toISOString(),
                offer_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            eaSentCount++;
            await new Promise((r) => setTimeout(r, EA_SEND_DELAY_MS));
          } catch (err: any) {
            eaErrors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Count remaining
        const { data: eaRemRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .is('offer_sent_at', null)
          .is('bounced_at', null);
        const eaRemCount = (eaRemRows || []).filter(
          (r) => !eaCampSignedUp.has(r.email.toLowerCase().trim())
        ).length;

        console.log(`EA campaign: Sent ${eaSentCount}. ${eaRemCount} remaining.`);

        result = {
          sent: eaSentCount,
          remaining: eaRemCount,
          complete: eaRemCount === 0,
          errors: eaErrors.length > 0 ? eaErrors : undefined,
          message:
            eaRemCount === 0
              ? `All done! Sent ${eaSentCount} emails.`
              : `Sent ${eaSentCount}. ${eaRemCount} remaining.`,
        };
        break;
      }

      case 'reset_ea_offer_campaign': {
        // Clears offer_sent_at + offer_email_id so the campaign can be re-sent.
        // Bounced rows are left untouched — they can never receive email again.
        // Signed-up users are excluded at send-time regardless, so resetting their
        // rows is harmless — they will just be skipped again on the next send.
        const { error: resetErr } = await supabaseAdmin
          .from('early_access_invites')
          .update({ offer_sent_at: null, offer_email_id: null })
          .not('offer_sent_at', 'is', null); // only touch rows that have actually been sent

        if (resetErr) throw resetErr;

        // Re-compute how many are now eligible so the UI can update immediately
        const { data: postResetAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const postResetSignedUp = new Set(
          postResetAuthData?.users
            ?.map((u: any) => u.email?.toLowerCase().trim())
            .filter(Boolean) || []
        );
        const { data: postResetRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email, bounced_at')
          .is('bounced_at', null);

        const nowEligible = (postResetRows || []).filter(
          (r: any) => !postResetSignedUp.has(r.email.toLowerCase().trim())
        ).length;

        console.log(
          `EA offer campaign reset by admin ${user.id}. ${nowEligible} records now eligible.`
        );
        result = {
          success: true,
          remaining: nowEligible,
          message: `Campaign reset — ${nowEligible} eligible recipients ready to send`,
        };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in send-early-access-invite:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
