// send-team-welcome
//
// Sent when an employer adds a team member with an email address. Tells the
// person exactly how the linkage works: sign in with THIS email and you're
// connected — jobs, clock-in, timesheets, expenses.
//
// Auth: the caller must be the employer who owns the roster row (prevents
// use as an email relay).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { sendEmail } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SITE_URL = 'https://elec-mate.com';
const LOGO_URL = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const hexToken = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

// Light-palette invite email — matches the welcome email (#F4F6F9 canvas, white
// rounded card, #51606F body, #F3B70A gold accent). Mobile-responsive.
function buildInviteHtml(companyName: string, firstName: string, acceptUrl: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin:0; padding:0; width:100%; background-color:#F4F6F9; }
  @media screen and (max-width:480px){ .pad{ padding-left:24px !important; padding-right:24px !important; } .btn{ display:block !important; } }
</style></head>
<body style="margin:0;padding:0;background-color:#F4F6F9;font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F4F6F9;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:520px;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E6E9EE;">
        <tr><td align="left" style="padding:36px 36px 8px;" class="pad">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display:block;border-radius:13px;border:1px solid #E6E9EE;">
        </td></tr>
        <tr><td align="left" style="padding:18px 36px 0;" class="pad">
          <h1 style="margin:0 0 6px;font-size:22px;line-height:1.3;color:#1B2733;font-weight:700;">${companyName} added you to their team</h1>
          <p style="margin:0 0 22px;font-size:15px;color:#51606F;line-height:1.62;">Hi ${firstName}, ${companyName} runs their jobs, timesheets and site paperwork on Elec-Mate — and they've added you to the team. Set up your account below and you're in.</p>
        </td></tr>
        <tr><td style="padding:0 36px 8px;" class="pad">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#EAF7EE;border:1px solid #BFE6CC;border-radius:14px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-size:14px;color:#1E5B34;line-height:1.55;"><strong>It's free for you.</strong> ${companyName} covers your access — nothing to pay, no card needed.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td align="left" style="padding:22px 36px 6px;" class="pad">
          <a href="${acceptUrl}" class="btn" style="background-color:#F3B70A;color:#1B2733;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:12px;display:inline-block;">Set up your account</a>
        </td></tr>
        <tr><td align="left" style="padding:14px 36px 4px;" class="pad">
          <p style="margin:0 0 8px;font-size:13px;color:#8A97A6;line-height:1.5;">Once you're in, open <strong style="color:#51606F;">Worker Tools</strong> to see your jobs, clock in and out, and submit timesheets, leave and expenses.</p>
        </td></tr>
        <tr><td style="padding:18px 36px 30px;" class="pad">
          <p style="margin:0;font-size:12px;color:#A6B0BC;line-height:1.55;">This invite is just for you and expires in 14 days. Questions? Reply to this email — it reaches Andrew, the founder.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Identify the caller from their JWT
    const authHeader = req.headers.get('Authorization') ?? '';
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await callerClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { employeeId } = await req.json();
    if (!employeeId) {
      return new Response(JSON.stringify({ error: 'employeeId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // The roster row must belong to the caller
    const { data: employee, error: empError } = await admin
      .from('employer_employees')
      .select('id, name, email, employer_id')
      .eq('id', employeeId)
      .single();

    if (empError || !employee || employee.employer_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not authorised for this team member' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    // Abuse guard: cap welcome emails per employer per day (roster spam →
    // branded email relay). 50 covers any genuine onboarding burst.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentAdds } = await admin
      .from('employer_employees')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', user.id)
      .gte('created_at', since);
    if ((recentAdds ?? 0) > 50) {
      console.warn('send-team-welcome: daily cap reached for', user.id);
      return new Response(JSON.stringify({ success: false, error: 'Daily invite limit reached' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!employee.email) {
      return new Response(JSON.stringify({ error: 'Team member has no email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: company } = await admin
      .from('company_profiles')
      .select('company_name, company_email')
      .eq('user_id', user.id)
      .maybeSingle();

    // Mint a fresh single-use invite token for THIS person (retire any prior
    // pending — one live invite per person). The link carries the token.
    await admin
      .from('employer_team_invites')
      .update({ status: 'revoked' })
      .eq('employee_id', employee.id)
      .eq('status', 'pending');
    const token = hexToken();
    const { error: inviteError } = await admin.from('employer_team_invites').insert({
      employer_id: user.id,
      employee_id: employee.id,
      email: employee.email.toLowerCase(),
      token,
    });
    if (inviteError) {
      console.error('send-team-welcome: invite mint failed', inviteError);
      return new Response(JSON.stringify({ success: false, error: 'Could not create invite' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const acceptUrl = `${SITE_URL}/team/accept/${token}`;

    const companyName = company?.company_name?.trim() || 'Your employer';
    const firstName = (employee.name || '').split(' ')[0] || 'there';
    const html = buildInviteHtml(companyName, firstName, acceptUrl);

    const result = await sendEmail({
      from: `${companyName} via Elec-Mate <founder@elec-mate.com>`,
      to: [employee.email],
      replyTo: company?.company_email || undefined,
      subject: `${companyName} added you to their team on Elec-Mate`,
      html,
    });

    if (result.error) {
      console.error('send-team-welcome: email failed', result.error);
      return new Response(JSON.stringify({ success: false, error: result.error.message }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('send-team-welcome error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
