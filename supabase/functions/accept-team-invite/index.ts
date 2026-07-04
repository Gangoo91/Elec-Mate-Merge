// accept-team-invite
//
// New-user path of the team onboarding. The invite email proves the person owns
// the address, so we create their account ALREADY CONFIRMED, link them to the
// exact roster row the token points to, and let the seat trigger flip the seat
// active. LINK-ONLY: never creates a team member (the employer already added the
// row). Existing users don't hit this — the accept page signs them in and calls
// the accept_team_invite RPC directly.
//
// verify_jwt = false: the caller is anonymous (creating their account).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const { token, password, fullName } = await req.json();
    if (!token || !password || String(password).length < 8) {
      return json({ error: 'A token and a password of at least 8 characters are required.' }, 400);
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1) Validate the invite
    const { data: invite } = await admin
      .from('employer_team_invites')
      .select('id, employee_id, employer_id, email, status, expires_at')
      .eq('token', token)
      .maybeSingle();
    if (!invite || invite.status !== 'pending' || new Date(invite.expires_at) < new Date()) {
      return json({ error: 'This invite is no longer valid. Ask your employer to resend it.' }, 410);
    }

    // 2) Roster row must still be unclaimed
    const { data: employee } = await admin
      .from('employer_employees')
      .select('id, user_id, name')
      .eq('id', invite.employee_id)
      .maybeSingle();
    if (!employee) return json({ error: 'Team member record missing.' }, 404);
    if (employee.user_id) return json({ error: 'This invite has already been used.' }, 409);

    // 3) Create the account, already confirmed (the invite proves email
    //    ownership). If it already exists, that's the sign-in path — tell them.
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: invite.email,
      password,
      email_confirm: true,
      user_metadata: { full_name: (fullName ?? employee.name ?? '').trim() },
    });
    if (createErr || !created?.user) {
      const msg = (createErr?.message ?? '').toLowerCase();
      if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
        return json(
          { error: 'You already have an Elec-Mate account with this email. Please sign in to join.', code: 'account_exists' },
          409
        );
      }
      return json({ error: createErr?.message ?? 'Could not create your account.' }, 500);
    }
    const newUserId = created.user.id;

    // 5) Link — fill user_id on the row the token points to. The seat trigger
    //    flips the seat pending->active and marks the invite accepted.
    const { error: linkErr } = await admin
      .from('employer_employees')
      .update({ user_id: newUserId, updated_at: new Date().toISOString() })
      .eq('id', invite.employee_id)
      .is('user_id', null);
    if (linkErr) {
      console.error('accept-team-invite: link failed', linkErr);
      return json({ error: 'Your account was created — please sign in to finish joining.' }, 500);
    }

    // Sync the EMPLOYER's Stripe seat quantity (best-effort; no-op while billing
    // is dormant). Service-role invoke → manage-employer-seats trusts employer_id.
    admin.functions
      .invoke('manage-employer-seats', { body: { employer_id: invite.employer_id } })
      .catch((e) => console.error('seat sync failed (non-fatal):', e));

    // Founder alert fires from the seat-activation trigger (notify-team-join) so
    // it covers every join path — no inline duplicate here.

    return json({
      success: true,
      email: invite.email,
      employer_id: invite.employer_id,
    });
  } catch (error) {
    console.error('accept-team-invite error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});
