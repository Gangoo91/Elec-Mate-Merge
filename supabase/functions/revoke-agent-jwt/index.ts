/**
 * Revoke Agent JWT
 *
 * Immediately revokes a user's agent JWT and deactivates their agent.
 * Called when:
 * - User cancels Business AI subscription
 * - User manually disconnects the agent
 * - Admin triggers kill switch for a specific user
 *
 * POST body: { reason?: "user_cancelled" | "admin_kill" | "subscription_expired" | "manual" }
 * Returns: { revoked: true, agent_status: "inactive" }
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';

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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new AuthenticationError('No authorisation header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) throw new AuthenticationError('Invalid token');

    // Parse optional reason
    let reason = 'manual';
    try {
      const body = await req.json();
      if (body.reason) reason = body.reason;
    } catch {
      // No body is fine — default to 'manual'
    }

    // Revoke the token
    const { error: revokeError } = await supabase
      .from('agent_jwt_tokens')
      .update({ revoked_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('revoked_at', null);

    if (revokeError) {
      console.error('Failed to revoke JWT:', revokeError);
      // Continue anyway — deactivating the agent is more important
    }

    // Deactivate agent on profile
    await supabase
      .from('profiles')
      .update({
        agent_status: 'inactive',
        agent_health_status: 'unknown',
      })
      .eq('id', user.id);

    // Remove phone routing (so messages stop being delivered)
    const { data: profile } = await supabase
      .from('profiles')
      .select('agent_whatsapp_number')
      .eq('id', user.id)
      .single();

    if (profile?.agent_whatsapp_number) {
      await supabase
        .from('phone_number_routing')
        .delete()
        .eq('phone_number', profile.agent_whatsapp_number)
        .eq('user_id', user.id);
    }

    // Log the revocation
    await supabase.from('agent_action_log').insert({
      user_id: user.id,
      action_type: 'agent_revoked',
      description: `Business AI agent revoked. Reason: ${reason}`,
      outcome: 'success',
    });

    console.log(`Agent revoked for user ${user.id}, reason: ${reason}`);

    return new Response(
      JSON.stringify({
        revoked: true,
        agent_status: 'inactive',
        reason,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return handleError(error);
  }
});
