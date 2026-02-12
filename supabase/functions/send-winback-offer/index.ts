import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Rate limiting: 500ms between sends to stay within Resend limits (2/sec)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const SEND_DELAY_MS = 500;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Win-back offer configuration
const WINBACK_CONFIG = {
  monthlyPrice: 7.99,
  yearlyPrice: 79.99,
  standardMonthlyPrice: 9.99,
  standardYearlyPrice: 99.99,
  discountPercent: 20,
  // Payment links for Electrician Win-Back product (prod_TtTdELbwjYaZQn)
  monthlyPaymentLink: 'https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00',
  yearlyPaymentLink: 'https://buy.stripe.com/5kQ3cobV0anqguJe7IbjW01',
};

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  trial_ended_at: string;
}

// Generate win-back offer email HTML
function generateWinbackEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Fancy another look? - Andrew, Elec-Mate</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 500px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Opening -->
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Quick one from me. You tried Elec-Mate a while back and the app's come a long way since your trial. I've been building flat out and I wanted to show you what's actually in it now.
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                This isn't vague promises. Here's exactly what you get:
              </p>
            </td>
          </tr>

          <!-- SECTION HEADER -->
          <tr>
            <td style="padding: 0 20px 8px;">
              <p style="margin: 0; font-size: 15px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                Here's what you actually get
              </p>
            </td>
          </tr>

          <!-- CERTS & TESTING (green accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.02) 100%); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #22c55e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Certs &amp; Testing
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">7 certificate types:</strong> EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photo gallery, PDF export, defect coding, client sign-off
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Schedule of Tests</strong> with automated compliance checking
                </p>
              </div>
            </td>
          </tr>

          <!-- YOUR BUILD PARTNERS (yellow accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.02) 100%); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Your Build Partners
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Cost Engineer</strong> &mdash; quotes with live material pricing and labour data
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Installation Specialist</strong> &mdash; step-by-step methods and diagrams
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Health &amp; Safety</strong> &mdash; RAMS generated from a job description in 2 minutes
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Maintenance Specialist</strong> &mdash; inspection planning and fault diagnosis
                </p>
                <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.6; font-style: italic;">
                  Coming soon: Testing &amp; Commissioning, Project Manager, Training Tutor
                </p>
              </div>
            </td>
          </tr>

          <!-- AI VISION TOOLS (blue accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #3b82f6; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  AI Vision Tools
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph a component &rarr; get specs and BS 7671 requirements
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph wiring &rarr; get step-by-step instructions
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph a fault &rarr; get EICR codes and fix steps
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Installation verification &rarr; BS 7671 compliance check
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Client explainer &rarr; turn technical findings into plain English
                </p>
              </div>
            </td>
          </tr>

          <!-- BUSINESS TOOLS (amber accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #f59e0b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Business Tools
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Quote &amp; Invoice Builder</strong> with live material pricing
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Customer management
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop, solar PV, EV charging...
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">14 business calculators</strong> &mdash; hourly rate, job profit, tax/NI, cash flow...
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Materials marketplace with deals of the day
                </p>
              </div>
            </td>
          </tr>

          <!-- SITE SAFETY (red accent) -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.02) 100%); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #ef4444; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Site Safety
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  RAMS from a job description in 2 mins
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Team briefing templates
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Near-miss reporting
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Equipment tracker
                </p>
              </div>
            </td>
          </tr>

          <!-- Value Props -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <!-- TIME -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 10px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#9200;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">Your Time Back</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Certs, RAMS, quotes &mdash; done on-site in minutes. Your evenings are yours again.
                </p>
              </div>

              <!-- COMPLIANCE -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 10px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#9989;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">Compliance Sorted</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Everything BS 7671 backed. No guesswork, no second-guessing the regs.
                </p>
              </div>

              <!-- MONEY -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#128183;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">More Money in Your Pocket</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Ditch 5 separate apps &mdash; your cert software, RAMS tool, quoting spreadsheet, invoicing app, and that notes app. One subscription instead of five.
                </p>
              </div>
            </td>
          </tr>

          <!-- The Offer -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 2px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 24px 20px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #94a3b8;">
                  Lock in early-adopter pricing
                </p>
                <p style="margin: 0; font-size: 48px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size: 18px; font-weight: 600; color: #94a3b8;">/mo</span>
                </p>
                <p style="margin: 6px 0 12px; font-size: 14px; color: #94a3b8;">
                  <span style="text-decoration: line-through;">&pound;${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; <span style="color: #22c55e; font-weight: 600;">20% off</span> &middot; price locked forever
                </p>
                <p style="margin: 0 0 18px; font-size: 15px; color: #e2e8f0; line-height: 1.5;">
                  All of the above in your pocket for &pound;7.99. That's less than a bag of screwfix screws.
                </p>
                <a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display: block; padding: 16px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; margin-bottom: 12px;">
                  Get back in at &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo &rarr;
                </a>
                <a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display: block; padding: 14px 24px; background: rgba(251, 191, 36, 0.15); border: 2px solid rgba(251, 191, 36, 0.5); color: #fbbf24; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 12px; text-align: center;">
                  Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)
                </a>
              </div>
            </td>
          </tr>

          <!-- Free Trial Offer -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 16px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Not sure? Reply to this email and I'll give you <strong style="color: #60a5fa;">another free week</strong> to try it properly. No strings.
                </p>
              </div>
            </td>
          </tr>

          <!-- Something wasn't right? -->
          <tr>
            <td style="padding: 0 24px 28px;">
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6; text-align: center;">
                If something put you off last time, I'd genuinely like to know &mdash; I'm updating this thing every day. Just reply.
              </p>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 4px; font-size: 15px; color: #e2e8f0;">
                Cheers,
              </p>
              <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 600;">
                Andrew
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Founder, Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; text-align: center; background-color: rgba(15, 23, 42, 0.6); border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 12px; color: #475569;">
                &copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;
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
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new Error('No authorization header');
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the caller is an admin
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError) {
      console.error('Auth getUser error:', userError);
      throw new Error(`Unauthorized: ${userError.message}`);
    }
    if (!user) {
      console.error('No user returned from auth');
      throw new Error('Unauthorized: Could not get user');
    }

    console.log(`User ${user.id} attempting winback action`);

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('admin_role, full_name')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new Error(`Profile error: ${profileError.message}`);
    }

    if (!callerProfile?.admin_role) {
      console.error(`User ${user.id} does not have admin_role. Profile:`, callerProfile);
      throw new Error('Unauthorized: Admin access required');
    }

    const { action, userId, userIds, testEmail, manualEmail, recipientName } = await req.json();

    console.log(
      `Admin ${user.id} (${callerProfile.full_name}) authorized for winback, action: ${action}`
    );

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case 'get_eligible': {
        // Query to find eligible users for win-back offer
        // Electricians whose trial expired 48+ hours ago, not subscribed, not free access, not already sent
        console.log('get_eligible: Starting query for eligible users');

        // Direct query approach - get all electricians without winback offer sent
        // Then filter in code to properly exclude subscribed/free access users
        const { data: profiles, error: profilesError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, subscribed, free_access_granted')
          .eq('role', 'electrician')
          .is('winback_offer_sent_at', null)
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('get_eligible: profiles query error:', profilesError);
          throw profilesError;
        }

        console.log(`get_eligible: Found ${profiles?.length || 0} potential profiles`);

        // Filter to only include users who:
        // 1. Are NOT subscribed (subscribed is null or false)
        // 2. Do NOT have free access (free_access_granted is null or false)
        // 3. Trial ended 24+ hours ago (created_at + 7 days + 24 hours < now)
        const eligibleCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000;
        const filteredProfiles =
          profiles?.filter((p: any) => {
            // Exclude subscribed users
            if (p.subscribed === true) return false;
            // Exclude users with free access
            if (p.free_access_granted === true) return false;
            // Check trial expiry + 48 hours
            return new Date(p.created_at).getTime() < eligibleCutoff;
          }) || [];

        console.log(
          `get_eligible: ${filteredProfiles.length} after excluding subscribed/free access users`
        );

        console.log(`get_eligible: ${filteredProfiles.length} profiles after trial cutoff filter`);

        // Get emails from auth.users
        const userIdsToFetch = filteredProfiles.map((p: any) => p.id);
        if (userIdsToFetch.length === 0) {
          console.log('get_eligible: No eligible users found');
          result = { users: [] };
          break;
        }

        // Fetch auth users in batches to avoid issues
        console.log(`get_eligible: Fetching emails for ${userIdsToFetch.length} users`);
        const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });

        if (authError) {
          console.error('get_eligible: auth.admin.listUsers error:', authError);
          throw authError;
        }

        console.log(`get_eligible: Got ${authUsers.users?.length || 0} auth users`);

        const emailMap = new Map<string, string>();
        authUsers.users.forEach((u: any) => {
          if (u.email) emailMap.set(u.id, u.email);
        });

        const usersWithEmails =
          filteredProfiles
            .map((p: any) => ({
              id: p.id,
              full_name: p.full_name,
              username: p.username,
              email: emailMap.get(p.id) || null,
              created_at: p.created_at,
              trial_ended_at: new Date(
                new Date(p.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            }))
            .filter((u: any) => u.email) || [];

        console.log(`get_eligible: Returning ${usersWithEmails.length} users with emails`);
        result = { users: usersWithEmails };
        break;
      }

      case 'get_stats': {
        // Get campaign statistics
        console.log('get_stats: Fetching statistics');
        const { data: stats, error: statsError } = await supabaseAdmin
          .from('profiles')
          .select('id, winback_offer_sent_at, subscribed, free_access_granted, created_at')
          .eq('role', 'electrician');

        if (statsError) {
          console.error('get_stats: query error:', statsError);
          throw statsError;
        }

        console.log(`get_stats: Found ${stats?.length || 0} electrician profiles`);

        // Trial = 7 days from signup, so we need created_at + 7 days + 24 hours < now
        const eligibleCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000;

        const totalEligible =
          stats?.filter((s: any) => {
            // Must NOT be subscribed
            if (s.subscribed === true) return false;
            // Must NOT have free access
            if (s.free_access_granted === true) return false;
            // Must NOT have already been sent the offer
            if (s.winback_offer_sent_at) return false;
            // Trial must have ended 48+ hours ago
            return new Date(s.created_at).getTime() < eligibleCutoff;
          }).length || 0;

        const offersSent = stats?.filter((s: any) => s.winback_offer_sent_at).length || 0;

        // Count conversions (users who have winback_offer_sent_at AND are now subscribed)
        const conversions =
          stats?.filter((s: any) => s.winback_offer_sent_at && s.subscribed).length || 0;

        console.log(
          `get_stats: eligible=${totalEligible}, sent=${offersSent}, conversions=${conversions}`
        );

        result = {
          totalEligible,
          offersSent,
          conversions,
          conversionRate: offersSent > 0 ? ((conversions / offersSent) * 100).toFixed(1) : '0',
        };
        break;
      }

      case 'send_single': {
        if (!userId) {
          throw new Error('User ID is required');
        }

        // Get user details
        const { data: profile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, winback_offer_sent_at')
          .eq('id', userId)
          .single();

        if (profileError || !profile) {
          throw new Error('User not found');
        }

        if (profile.winback_offer_sent_at) {
          throw new Error('Win-back offer already sent to this user');
        }

        // Get user email
        const { data: authUser, error: authError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (authError || !authUser.user?.email) {
          throw new Error('Could not get user email');
        }

        const userWithEmail: EligibleUser = {
          id: profile.id,
          full_name: profile.full_name,
          username: profile.username,
          email: authUser.user.email,
          created_at: profile.created_at,
          trial_ended_at: new Date(
            new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        // Send email
        const emailHtml = generateWinbackEmailHTML(userWithEmail);
        const { error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [userWithEmail.email.trim().toLowerCase()],
          subject: 'Fancy another look?',
          html: emailHtml,
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update profile to mark offer as sent
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ winback_offer_sent_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          console.error('Failed to update winback_offer_sent_at:', updateError);
        }

        // Log to email_logs table (fixed: to_email, template instead of recipient_email, email_type)
        await supabaseAdmin.from('email_logs').insert({
          to_email: userWithEmail.email,
          subject: 'Fancy another look?',
          template: 'winback_offer',
          status: 'sent',
          metadata: { user_id: userId },
        });

        console.log(`Win-back offer sent to ${userWithEmail.email} by admin ${user.id}`);
        result = { success: true, email: userWithEmail.email };
        break;
      }

      case 'send_bulk': {
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
          throw new Error('User IDs array is required');
        }

        let sentCount = 0;
        let skippedCount = 0;
        const errors: string[] = [];

        for (const uid of userIds) {
          try {
            // Get user details
            const { data: profile, error: profileError } = await supabaseAdmin
              .from('profiles')
              .select('id, full_name, username, created_at, winback_offer_sent_at')
              .eq('id', uid)
              .single();

            if (profileError || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            if (profile.winback_offer_sent_at) {
              skippedCount++;
              continue;
            }

            // Get user email
            const { data: authUser, error: authError } =
              await supabaseAdmin.auth.admin.getUserById(uid);
            if (authError || !authUser.user?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const userWithEmail: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: authUser.user.email,
              created_at: profile.created_at,
              trial_ended_at: new Date(
                new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            };

            // Send email
            const emailHtml = generateWinbackEmailHTML(userWithEmail);
            const { error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <offers@elec-mate.com>',
              to: [userWithEmail.email.trim().toLowerCase()],
              subject: 'Fancy another look?',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${userWithEmail.email}: ${emailError.message}`);
              continue;
            }

            // Update profile
            await supabaseAdmin
              .from('profiles')
              .update({ winback_offer_sent_at: new Date().toISOString() })
              .eq('id', uid);

            // Log email (fixed: to_email, template)
            await supabaseAdmin.from('email_logs').insert({
              to_email: userWithEmail.email,
              subject: 'Fancy another look?',
              template: 'winback_offer',
              status: 'sent',
              metadata: { user_id: uid },
            });

            sentCount++;

            // Rate limit: wait between sends to avoid hitting Resend limits
            if (sentCount < userIds.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: any) {
            errors.push(`${uid}: ${err.message}`);
          }
        }

        console.log(
          `Win-back bulk send: ${sentCount} sent, ${skippedCount} skipped by admin ${user.id}`
        );
        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case 'get_sent_history': {
        // Get users who have been sent the win-back offer
        const { data: sentUsers, error: sentError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, winback_offer_sent_at, subscribed')
          .not('winback_offer_sent_at', 'is', null)
          .order('winback_offer_sent_at', { ascending: false })
          .limit(100);

        if (sentError) throw sentError;

        result = { users: sentUsers || [] };
        break;
      }

      case 'send_test': {
        // Send a test email to a specified address
        if (!testEmail) {
          throw new Error('Test email address is required');
        }

        // Create a mock user for the test email
        const testUser: EligibleUser = {
          id: 'test-user-id',
          full_name: 'Test User',
          username: 'testuser',
          email: testEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email
        const emailHtml = generateWinbackEmailHTML(testUser);
        const { error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [testEmail.trim().toLowerCase()],
          subject: '[TEST] Fancy another look?',
          html: emailHtml,
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Win-back test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail };
        break;
      }

      case 'send_manual': {
        // Send a real win-back email to any email address (manual entry)
        if (!manualEmail) {
          throw new Error('Email address is required');
        }

        // Create user object for the email
        const manualUser: EligibleUser = {
          id: 'manual-entry',
          full_name: recipientName || null,
          username: 'user',
          email: manualEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email (real, not test)
        const manualEmailHtml = generateWinbackEmailHTML(manualUser);
        const { error: manualEmailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [manualEmail.trim().toLowerCase()],
          subject: 'Fancy another look?',
          html: manualEmailHtml,
        });

        if (manualEmailError) {
          console.error('Manual email send error:', manualEmailError);
          throw new Error(`Failed to send email: ${manualEmailError.message}`);
        }

        // Log to email_logs table (fixed: to_email, template)
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail.trim().toLowerCase(),
          subject: 'Fancy another look?',
          template: 'winback_offer_manual',
          status: 'sent',
          metadata: { sent_by_admin: user.id, recipient_name: recipientName },
        });

        console.log(`Win-back offer manually sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail };
        break;
      }

      case 'reset_sent': {
        // Reset winback_offer_sent_at for users who were sent 24+ hours ago
        // and still haven't subscribed — allows resending the new email
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: resetUsers, error: resetErr } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('role', 'electrician')
          .eq('subscribed', false)
          .not('winback_offer_sent_at', 'is', null)
          .lt('winback_offer_sent_at', cutoff);

        if (resetErr) throw resetErr;

        const resetIds = resetUsers?.map((u: any) => u.id) || [];

        if (resetIds.length === 0) {
          result = {
            reset: 0,
            message: 'No users eligible for reset (all sent < 24h ago or already subscribed)',
          };
          break;
        }

        const { error: updateErr } = await supabaseAdmin
          .from('profiles')
          .update({ winback_offer_sent_at: null })
          .in('id', resetIds);

        if (updateErr) throw updateErr;

        console.log(`Admin ${user.id} reset winback_offer_sent_at for ${resetIds.length} users`);
        result = {
          reset: resetIds.length,
          message: `${resetIds.length} users reset and eligible for resend`,
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
    console.error('Error in send-winback-offer:', error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
