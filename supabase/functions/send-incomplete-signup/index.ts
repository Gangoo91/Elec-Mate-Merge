import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
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

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  role: string | null;
  created_at: string;
}

// Generate electrician email HTML
function generateElectricianEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;line-height:1.7">It's Andrew from Elec-Mate. I noticed you created an account but didn't finish setting up your subscription. Just wanted to clear something up:</p>
</td></tr>

<!-- Reassurance block (green accent) -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:2px solid rgba(34,197,94,0.35);border-radius:14px;padding:18px;text-align:center">
<p style="margin:0 0 8px;font-size:20px">&#x2705;</p>
<p style="margin:0 0 6px;font-size:16px;color:#22c55e;font-weight:700">Your card won't be charged for 7 days</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Cancel anytime with one tap &mdash; no questions asked, no hidden fees. If you cancel during the trial you pay absolutely nothing.</p>
</div>
</td></tr>

<!-- Setup guidance -->
<tr><td style="padding:0 20px 16px">
<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:18px">
<p style="${h};color:#60a5fa">&#x1F6E0; Getting Started Tip</p>
<p style="${t}"><strong style="${b}">Allow yourself an hour.</strong> Start with <strong style="${b}">Settings &rarr; Business Settings</strong> to personalise your experience.</p>
<p style="${t}">This is where you set up your company details, logo, worker rates, and bank details &mdash; so your invoices and quotes go out looking professional from day one.</p>
</div>
</td></tr>

<!-- Section header -->
<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Here's what's waiting for you</p></td></tr>

<!-- CERTS & TESTING (green accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Certs &amp; Testing</p>
<p style="${t}"><strong style="${b}">7 certificate types:</strong> EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV</p>
<p style="${t}"><strong style="${b}">Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping</p>
<p style="${t}"><strong style="${b}">Schedule of Tests</strong> with automated compliance checking</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Photo gallery, PDF export, defect coding, client sign-off</p>
</div>
</td></tr>

<!-- AI BUILD PARTNERS (yellow accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#fbbf24">AI Build Partners</p>
<p style="${t}"><strong style="${b}">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts</p>
<p style="${t}"><strong style="${b}">Cost Engineer</strong> &mdash; quotes with live material pricing and labour data</p>
<p style="${t}"><strong style="${b}">Installation Specialist</strong> &mdash; step-by-step methods and diagrams</p>
<p style="${t}"><strong style="${b}">Health &amp; Safety</strong> &mdash; RAMS generated from a job description in 2 minutes</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">Maintenance Specialist</strong> &mdash; inspection planning and fault diagnosis</p>
</div>
</td></tr>

<!-- AI VISION TOOLS (blue accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(59,130,246,0.02));border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">AI Vision Tools</p>
<p style="${t}">Photograph a component &rarr; get specs and BS 7671 requirements</p>
<p style="${t}">Photograph wiring &rarr; get step-by-step instructions</p>
<p style="${t}">Photograph a fault &rarr; get EICR codes and fix steps</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Installation verification &rarr; BS 7671 compliance check</p>
</div>
</td></tr>

<!-- BUSINESS TOOLS (amber accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02));border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#f59e0b">Business Tools</p>
<p style="${t}"><strong style="${b}">Quote &amp; Invoice Builder</strong> with live material pricing</p>
<p style="${t}"><strong style="${b}">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop, solar PV, EV charging</p>
<p style="${t}"><strong style="${b}">14 business calculators</strong> &mdash; hourly rate, job profit, tax/NI, cash flow</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Customer management &middot; Materials marketplace &middot; Deals of the day</p>
</div>
</td></tr>

<!-- SITE SAFETY (red accent) -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#ef4444">Site Safety</p>
<p style="${t}">RAMS from a job description in 2 mins</p>
<p style="${t}">Team briefing templates</p>
<p style="${t}">Near-miss reporting</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Equipment tracker</p>
</div>
</td></tr>

<!-- Pricing -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this from just</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;9.99<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:8px 0 16px;font-size:14px;color:#94a3b8">7-day free trial &middot; Cancel anytime &middot; No risk</p>
<a href="https://elec-mate.com" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center">Start Your Free Trial &rarr;</a>
</div>
</td></tr>

<!-- Sign off -->
<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Got questions? Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// Generate apprentice email HTML
function generateApprenticeEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(168,85,247,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;line-height:1.7">It's Andrew from Elec-Mate. I noticed you created an account but didn't finish setting up your subscription. Just wanted to clear something up:</p>
</td></tr>

<!-- Reassurance block (green accent) -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:2px solid rgba(34,197,94,0.35);border-radius:14px;padding:18px;text-align:center">
<p style="margin:0 0 8px;font-size:20px">&#x2705;</p>
<p style="margin:0 0 6px;font-size:16px;color:#22c55e;font-weight:700">Your card won't be charged for 7 days</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Cancel anytime with one tap &mdash; no questions asked, no hidden fees. If you cancel during the trial you pay absolutely nothing.</p>
</div>
</td></tr>

<!-- Setup guidance -->
<tr><td style="padding:0 20px 16px">
<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:18px">
<p style="${h};color:#a855f7">&#x1F393; Getting Started Tip</p>
<p style="${t}"><strong style="${b}">Jump straight into the Study Centre.</strong> Pick your level (2 or 3) and start with the first module &mdash; everything's laid out in order so you can work through it at your own pace.</p>
</div>
</td></tr>

<!-- Section header -->
<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#a855f7;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Here's what's waiting for you</p></td></tr>

<!-- STUDY CENTRE (purple accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(168,85,247,0.08),rgba(168,85,247,0.02));border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#a855f7">Study Centre</p>
<p style="${t}"><strong style="${b}">60+ video lessons</strong> across Level 2 &amp; Level 3</p>
<p style="${t}"><strong style="${b}">780 flash cards</strong> &mdash; test yourself on the go</p>
<p style="${t}"><strong style="${b}">36 study courses</strong> covering every topic you need</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">BS 7671 regulation search</strong> &mdash; look up any reg instantly</p>
</div>
</td></tr>

<!-- AM2 & EPA (green accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Exam Preparation</p>
<p style="${t}"><strong style="${b}">AM2 Simulator</strong> &mdash; practice the practical assessment before the real thing</p>
<p style="${t}"><strong style="${b}">EPA Simulator</strong> &mdash; end-point assessment practice questions</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Timed mock exams with instant marking and explanations</p>
</div>
</td></tr>

<!-- PORTFOLIO HUB (blue accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(59,130,246,0.02));border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">Portfolio Hub</p>
<p style="${t}"><strong style="${b}">Portfolio Builder</strong> with AI that reads your work and auto-assigns assessment criteria</p>
<p style="${t}"><strong style="${b}">Evidence upload</strong> &mdash; photos, write-ups, supervisor sign-off</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Track your progress against every unit requirement</p>
</div>
</td></tr>

<!-- LEARNING TOOLS (amber accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02));border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#f59e0b">Learning Tools</p>
<p style="${t}"><strong style="${b}">Elec-AI</strong> &mdash; like ChatGPT but trained for electricians. Ask it anything.</p>
<p style="${t}"><strong style="${b}">AI Vision</strong> &mdash; photograph a component or wiring and get instant identification</p>
<p style="${t}"><strong style="${b}">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">Rights &amp; Pay guide</strong> &middot; <strong style="${b}">Mental health support</strong></p>
</div>
</td></tr>

<!-- SITE SAFETY (red accent) -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#ef4444">Site Safety</p>
<p style="${t}">Safety briefing templates</p>
<p style="${t}">Near-miss reporting</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Equipment tracker &amp; inspection checklists</p>
</div>
</td></tr>

<!-- Pricing -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05));border:2px solid rgba(168,85,247,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this from just</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#a855f7;line-height:1">&pound;4.99<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:8px 0 16px;font-size:14px;color:#94a3b8">7-day free trial &middot; Cancel anytime &middot; No risk</p>
<a href="https://elec-mate.com" style="display:block;padding:16px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center">Start Your Free Trial &rarr;</a>
</div>
</td></tr>

<!-- Sign off -->
<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Got questions? Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
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

    console.log(`User ${user.id} attempting incomplete-signup action`);

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
      `Admin ${user.id} (${callerProfile.full_name}) authorized for incomplete-signup, action: ${action}`
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
        // Users signed up 1-10 days ago (card checkout era), not subscribed, not free access, not already sent
        console.log('get_eligible: Starting query for eligible users');

        const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();

        const { data: profiles, error: profilesError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, subscribed, free_access_granted')
          .is('incomplete_signup_sent_at', null)
          .gte('created_at', tenDaysAgo)
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('get_eligible: profiles query error:', profilesError);
          throw profilesError;
        }

        console.log(`get_eligible: Found ${profiles?.length || 0} potential profiles`);

        // Filter: not subscribed, no free access, signed up 1+ hour ago
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        const filteredProfiles =
          profiles?.filter((p: Record<string, unknown>) => {
            if (p.subscribed === true) return false;
            if (p.free_access_granted === true) return false;
            return new Date(p.created_at).getTime() < oneHourAgo;
          }) || [];

        console.log(`get_eligible: ${filteredProfiles.length} after filtering`);

        // Get emails from auth.users
        const userIdsToFetch = filteredProfiles.map((p: Record<string, unknown>) => p.id);
        if (userIdsToFetch.length === 0) {
          console.log('get_eligible: No eligible users found');
          result = { users: [] };
          break;
        }

        console.log(`get_eligible: Fetching emails for ${userIdsToFetch.length} users`);
        const { data: authUsers, error: authError } =
          await supabaseAdmin.rpc('get_auth_user_emails');

        if (authError) {
          console.error('get_eligible: get_auth_user_emails RPC error:', authError);
          throw authError;
        }

        const authUsersList = authUsers || [];
        console.log(`get_eligible: Got ${authUsersList.length} auth users`);

        const emailMap = new Map<string, string>();
        authUsersList.forEach((u: Record<string, unknown>) => {
          if (u.email) emailMap.set(u.id as string, u.email as string);
        });

        const usersWithEmails =
          filteredProfiles
            .map((p: Record<string, unknown>) => ({
              id: p.id as string,
              full_name: p.full_name,
              username: p.username,
              email: emailMap.get(p.id as string) || null,
              role: p.role,
              created_at: p.created_at,
            }))
            .filter((u: Record<string, unknown>) => u.email) || [];

        console.log(`get_eligible: Returning ${usersWithEmails.length} users with emails`);
        result = { users: usersWithEmails };
        break;
      }

      case 'get_stats': {
        console.log('get_stats: Fetching statistics');
        const tenDaysAgoStats = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
        const { data: stats, error: statsError } = await supabaseAdmin
          .from('profiles')
          .select('id, incomplete_signup_sent_at, subscribed, free_access_granted, created_at')
          .gte('created_at', tenDaysAgoStats);

        if (statsError) {
          console.error('get_stats: query error:', statsError);
          throw statsError;
        }

        console.log(`get_stats: Found ${stats?.length || 0} profiles (last 10 days)`);

        const oneHourAgo = Date.now() - 60 * 60 * 1000;

        const totalEligible =
          stats?.filter((s: Record<string, unknown>) => {
            if (s.subscribed === true) return false;
            if (s.free_access_granted === true) return false;
            if (s.incomplete_signup_sent_at) return false;
            return new Date(s.created_at as string).getTime() < oneHourAgo;
          }).length || 0;

        const offersSent =
          stats?.filter((s: Record<string, unknown>) => s.incomplete_signup_sent_at).length || 0;

        // Conversions: users who have incomplete_signup_sent_at AND are now subscribed
        const conversions =
          stats?.filter((s: Record<string, unknown>) => s.incomplete_signup_sent_at && s.subscribed)
            .length || 0;

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

        const { data: profile, error: profileErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, incomplete_signup_sent_at')
          .eq('id', userId)
          .single();

        if (profileErr || !profile) {
          throw new Error('User not found');
        }

        if (profile.incomplete_signup_sent_at) {
          throw new Error('Incomplete signup email already sent to this user');
        }

        const { data: authUser, error: authError } = await supabaseAdmin.rpc(
          'get_auth_user_email_by_id',
          { user_id: userId }
        );
        if (authError || !authUser?.email) {
          throw new Error('Could not get user email');
        }

        const userWithEmail: EligibleUser = {
          id: profile.id,
          full_name: profile.full_name,
          username: profile.username,
          email: authUser.email,
          role: profile.role,
          created_at: profile.created_at,
        };

        const isApprentice = profile.role === 'apprentice';
        const emailHtml = isApprentice
          ? generateApprenticeEmailHTML(userWithEmail)
          : generateElectricianEmailHTML(userWithEmail);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [userWithEmail.email.trim().toLowerCase()],
          subject: 'Your Elec-Mate account is waiting for you',
          reply_to: 'founder@elec-mate.com',
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup' },
            { name: 'role', value: profile.role || 'unknown' },
            { name: 'user_id', value: userId },
          ],
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update profile
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ incomplete_signup_sent_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          console.error('Failed to update incomplete_signup_sent_at:', updateError);
        }

        // Log to email_logs table
        await supabaseAdmin.from('email_logs').insert({
          to_email: userWithEmail.email,
          subject: 'Your Elec-Mate account is waiting for you',
          template: isApprentice ? 'incomplete_signup_apprentice' : 'incomplete_signup_electrician',
          status: 'sent',
          metadata: { user_id: userId, role: profile.role, resend_id: emailData?.id },
        });

        console.log(`Incomplete signup email sent to ${userWithEmail.email} by admin ${user.id}`);
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
            const { data: profile, error: profileErr } = await supabaseAdmin
              .from('profiles')
              .select('id, full_name, username, role, created_at, incomplete_signup_sent_at')
              .eq('id', uid)
              .single();

            if (profileErr || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            if (profile.incomplete_signup_sent_at) {
              skippedCount++;
              continue;
            }

            const { data: authUser, error: authError } = await supabaseAdmin.rpc(
              'get_auth_user_email_by_id',
              { user_id: uid }
            );
            if (authError || !authUser?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const userWithEmail: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: authUser.email,
              role: profile.role,
              created_at: profile.created_at,
            };

            const isApprentice = profile.role === 'apprentice';
            const emailHtml = isApprentice
              ? generateApprenticeEmailHTML(userWithEmail)
              : generateElectricianEmailHTML(userWithEmail);

            const { data: bulkEmailData, error: emailError } = await resend.emails.send({
              from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
              to: [userWithEmail.email.trim().toLowerCase()],
              subject: 'Your Elec-Mate account is waiting for you',
              reply_to: 'founder@elec-mate.com',
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'incomplete_signup' },
                { name: 'role', value: profile.role || 'unknown' },
                { name: 'user_id', value: uid },
              ],
            });

            if (emailError) {
              errors.push(`${userWithEmail.email}: ${emailError.message}`);
              continue;
            }

            // Update profile
            await supabaseAdmin
              .from('profiles')
              .update({ incomplete_signup_sent_at: new Date().toISOString() })
              .eq('id', uid);

            // Log email
            await supabaseAdmin.from('email_logs').insert({
              to_email: userWithEmail.email,
              subject: 'Your Elec-Mate account is waiting for you',
              template: isApprentice
                ? 'incomplete_signup_apprentice'
                : 'incomplete_signup_electrician',
              status: 'sent',
              metadata: { user_id: uid, role: profile.role, resend_id: bulkEmailData?.id },
            });

            sentCount++;

            // Rate limit
            if (sentCount < userIds.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: unknown) {
            errors.push(`${uid}: ${err instanceof Error ? err.message : String(err)}`);
          }
        }

        console.log(
          `Incomplete signup bulk send: ${sentCount} sent, ${skippedCount} skipped by admin ${user.id}`
        );
        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case 'send_test': {
        if (!testEmail) {
          throw new Error('Test email address is required');
        }

        // Default to electrician template for test, unless role specified
        const testUser: EligibleUser = {
          id: 'test-user-id',
          full_name: recipientName || 'Test User',
          username: 'testuser',
          email: testEmail,
          role: 'electrician',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        };

        const emailHtml = generateElectricianEmailHTML(testUser);
        const { error: emailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [testEmail.trim().toLowerCase()],
          subject: '[TEST] Your Elec-Mate account is waiting for you',
          reply_to: 'founder@elec-mate.com',
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup' },
            { name: 'type', value: 'test' },
          ],
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Incomplete signup test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail };
        break;
      }

      case 'send_manual': {
        if (!manualEmail) {
          throw new Error('Email address is required');
        }

        const manualUser: EligibleUser = {
          id: 'manual-entry',
          full_name: recipientName || null,
          username: 'user',
          email: manualEmail,
          role: 'electrician',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        };

        const manualEmailHtml = generateElectricianEmailHTML(manualUser);
        const { data: manualEmailData, error: manualEmailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [manualEmail.trim().toLowerCase()],
          subject: 'Your Elec-Mate account is waiting for you',
          reply_to: 'founder@elec-mate.com',
          html: manualEmailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup' },
            { name: 'type', value: 'manual' },
          ],
        });

        if (manualEmailError) {
          console.error('Manual email send error:', manualEmailError);
          throw new Error(`Failed to send email: ${manualEmailError.message}`);
        }

        // Log to email_logs table
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail.trim().toLowerCase(),
          subject: 'Your Elec-Mate account is waiting for you',
          template: 'incomplete_signup_manual',
          status: 'sent',
          metadata: {
            sent_by_admin: user.id,
            recipient_name: recipientName,
            resend_id: manualEmailData?.id,
          },
        });

        console.log(`Incomplete signup email manually sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail };
        break;
      }

      case 'get_sent_history': {
        const { data: sentUsers, error: sentError } = await supabaseAdmin
          .from('profiles')
          .select(
            'id, full_name, username, role, created_at, incomplete_signup_sent_at, subscribed'
          )
          .not('incomplete_signup_sent_at', 'is', null)
          .order('incomplete_signup_sent_at', { ascending: false })
          .limit(100);

        if (sentError) throw sentError;

        result = { users: sentUsers || [] };
        break;
      }

      case 'reset_sent': {
        // Reset incomplete_signup_sent_at for users sent 24+ hours ago who haven't subscribed
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: resetUsers, error: resetErr } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .or('subscribed.is.null,subscribed.eq.false')
          .not('incomplete_signup_sent_at', 'is', null)
          .lt('incomplete_signup_sent_at', cutoff);

        if (resetErr) throw resetErr;

        const resetIds = resetUsers?.map((u: Record<string, unknown>) => u.id) || [];

        if (resetIds.length === 0) {
          result = {
            reset: 0,
            message: 'No users eligible for reset (all sent < 24h ago or already subscribed)',
          };
          break;
        }

        const { error: updateErr } = await supabaseAdmin
          .from('profiles')
          .update({ incomplete_signup_sent_at: null })
          .in('id', resetIds);

        if (updateErr) throw updateErr;

        console.log(
          `Admin ${user.id} reset incomplete_signup_sent_at for ${resetIds.length} users`
        );
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
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error('Error in send-incomplete-signup:', errMsg, errStack);
    return new Response(
      JSON.stringify({
        error: errMsg,
        stack: errStack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
