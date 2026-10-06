// send-team-welcome
//
// Sent when an employer adds a team member with an email address. Tells the
// person exactly how the linkage works: sign in with THIS email and you're
// connected — jobs, clock-in, timesheets, expenses.
//
// Auth: the caller must be the employer who owns the roster row (prevents
// use as an email relay).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { sendEmail, htmlToPlainText } from '../_shared/mailer.ts';
import { buildTeamInviteEmail, teamCompany } from '../_shared/email-templates/team.ts';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SITE_URL = 'https://elec-mate.com';

const hexToken = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');


Deno.serve(withSentry('send-team-welcome', async (req) => {
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

    // The owner, or an active manager of the same firm (employer_admins).
    let allowed = !empError && !!employee && employee.employer_id === user.id;
    if (!allowed && employee?.employer_id) {
      const { data: mgr } = await admin
        .from('employer_admins')
        .select('id')
        .eq('employer_id', employee.employer_id)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();
      allowed = !!mgr;
    }
    if (!allowed || !employee) {
      return new Response(JSON.stringify({ error: 'Not authorised for this team member' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    // Everything below is the firm's, not the caller's.
    const firmId: string = employee.employer_id;
    // Abuse guard: cap welcome emails per employer per day (roster spam →
    // branded email relay). 50 covers any genuine onboarding burst.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentAdds } = await admin
      .from('employer_employees')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', firmId)
      .gte('created_at', since);
    if ((recentAdds ?? 0) > 50) {
      console.warn('send-team-welcome: daily cap reached for', firmId);
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
      .select('*')
      .eq('user_id', firmId)
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
      employer_id: firmId,
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

    // ELE-2013: the firm-branded house shell (logo/colour, one button).
    const branded = teamCompany(company, 'Your employer');
    const companyName = branded.name;
    const invite = buildTeamInviteEmail({
      company: branded,
      recipientName: employee.name,
      acceptUrl,
    });
    const html = invite.html;

    const result = await sendEmail({
      from: `${companyName} via Elec-Mate <founder@elec-mate.com>`,
      to: [employee.email],
      replyTo: company?.company_email || undefined,
      subject: invite.subject,
      html,
      text: htmlToPlainText(html),
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
}));
