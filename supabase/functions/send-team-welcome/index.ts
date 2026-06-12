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

    // Active team invite code, if one exists — covers the wrong-email case
    const { data: invite } = await admin
      .from('employer_invites')
      .select('invite_code')
      .eq('employer_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const companyName = company?.company_name?.trim() || 'Your employer';
    const firstName = (employee.name || '').split(' ')[0] || 'there';

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1a1a1a;">${companyName} has added you to their team on Elec-Mate</h2>
        <p>Hi ${firstName},</p>
        <p><strong>${companyName}</strong> uses Elec-Mate to run their jobs, timesheets and site paperwork — and they've added you to their team.</p>
        <p style="background: #fff8e1; border-left: 4px solid #f5b800; padding: 12px 16px;">
          <strong>One thing matters:</strong> sign in to Elec-Mate with <strong>this email address</strong>
          (${employee.email}). Your account links to the team automatically the first time you do.
        </p>
        <p>Once you're in, open <strong>Worker Tools</strong> to:</p>
        <ul>
          <li>See the jobs you're assigned to</li>
          <li>Clock in and out on site</li>
          <li>Submit timesheets, leave and expenses</li>
          <li>Report site issues straight to the office</li>
        </ul>
        <p style="margin: 24px 0;">
          <a href="https://elec-mate.com/sign-in"
             style="background: #f5b800; color: #1a1a1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Sign in to Elec-Mate
          </a>
        </p>
        ${
          invite?.invite_code
            ? `<p style="color: #444; font-size: 14px;">Using a different email? No problem — sign in with any account, open <strong>Worker Tools</strong>, and enter the team code <strong style="letter-spacing: 2px;">${invite.invite_code}</strong>.</p>`
            : ''
        }
        <p style="color: #666; font-size: 13px;">
          New to Elec-Mate? Create your account with ${employee.email} and everything above applies.
          Questions? Contact info@elec-mate.com.
        </p>
      </div>`;

    const result = await sendEmail({
      from: `${companyName} via Elec-Mate <noreply@elec-mate.com>`,
      to: [employee.email],
      reply_to: company?.company_email || undefined,
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
