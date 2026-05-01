/**
 * admin-mate-actions
 *
 * Admin-gated per-user actions on a Mate (Elec-AI) agent.
 *
 * Auth: caller's JWT must belong to a profile with admin_role set.
 *
 * Body: { action: 'rotate_jwt' | 'set_status', user_id: string, status?: 'active'|'paused' }
 *
 * Returns: { ok: boolean, action, user_id, ...action-specific fields }
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { signJwt, buildAgentJwtPayload } from '../_shared/jwt-signer.ts';

const JWT_EXPIRY_DAYS = 90;

type Action = 'rotate_jwt' | 'set_status';

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
      data: { user: caller },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !caller) throw new AuthenticationError('Invalid token');

    const { data: callerProfile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', caller.id)
      .single();
    if (!callerProfile?.admin_role) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json().catch(() => ({}))) as {
      action?: Action;
      user_id?: string;
      status?: 'active' | 'paused';
    };
    const { action, user_id, status } = body;
    if (!action) throw new ValidationError('action is required');
    if (!user_id) throw new ValidationError('user_id is required');

    // Confirm target exists
    const { data: target, error: targetErr } = await supabase
      .from('profiles')
      .select('id, full_name, role, business_ai_enabled, agent_status, agent_whatsapp_number')
      .eq('id', user_id)
      .single();
    if (targetErr || !target) throw new ValidationError('Target user not found');

    // email lives on auth.users, not profiles
    const { data: authUser } = await supabase.auth.admin.getUserById(user_id);
    const targetEmail = authUser?.user?.email ?? '';

    if (action === 'rotate_jwt') {
      if (!target.business_ai_enabled) {
        throw new ValidationError('Cannot rotate JWT — Business AI not enabled for this user');
      }

      const jwtSecret = Deno.env.get('JWT_SECRET') ?? Deno.env.get('SUPABASE_JWT_SECRET');
      if (!jwtSecret) throw new Error('JWT_SECRET is not configured');

      const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRY_DAYS * 24 * 60 * 60;
      const payload = buildAgentJwtPayload({
        userId: user_id,
        email: targetEmail,
        userRole: target.role ?? 'electrician',
        expiresAt,
      });
      const newJwt = await signJwt(payload, jwtSecret);
      const expiresAtDate = new Date(expiresAt * 1000).toISOString();
      const encryptedToken = await encryptToken(newJwt);

      // Upsert because the user might not have an existing token row
      const { error: upsertErr } = await supabase.from('agent_jwt_tokens').upsert(
        {
          user_id,
          token_encrypted: encryptedToken,
          expires_at: expiresAtDate,
          revoked_at: null,
          rotated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );
      if (upsertErr) throw new Error(`Failed to store new JWT: ${upsertErr.message}`);

      // If the user was stuck in 'provisioning' (e.g. legacy half-completed provision)
      // a successful JWT rotation means the agent is now fully alive — flip to 'active'.
      // Don't override 'paused' — that's a deliberate admin state.
      if (target.agent_status === 'provisioning' || target.agent_status === 'inactive') {
        await supabase
          .from('profiles')
          .update({ agent_status: 'active', agent_health_status: 'healthy' })
          .eq('id', user_id);
      }

      await supabase.from('agent_action_log').insert({
        user_id,
        action_type: 'jwt_rotated',
        description: `JWT rotated by admin ${caller.email ?? caller.id}. New expiry: ${expiresAtDate}`,
        outcome: 'success',
        detail: { admin_id: caller.id, via: 'admin-panel' },
      });

      return new Response(
        JSON.stringify({
          ok: true,
          action: 'rotate_jwt',
          user_id,
          new_expires_at: expiresAtDate,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (action === 'set_status') {
      if (status !== 'active' && status !== 'paused') {
        throw new ValidationError('status must be "active" or "paused"');
      }
      const { error: updateErr } = await supabase
        .from('profiles')
        .update({
          agent_status: status,
          ...(status === 'active' ? { agent_health_status: 'healthy' } : {}),
        })
        .eq('id', user_id);
      if (updateErr) throw new Error(`Failed to update status: ${updateErr.message}`);

      await supabase.from('agent_action_log').insert({
        user_id,
        action_type: status === 'paused' ? 'agent_paused' : 'agent_resumed',
        description: `Agent ${status} by admin ${caller.email ?? caller.id}`,
        outcome: 'success',
        detail: { admin_id: caller.id, via: 'admin-panel' },
      });

      return new Response(
        JSON.stringify({
          ok: true,
          action: 'set_status',
          user_id,
          status,
          note:
            status === 'paused'
              ? 'Profile marked paused. WhatsApp routing still active until binding is removed (Slice 2-C).'
              : undefined,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    throw new ValidationError(`Unknown action: ${action}`);
  } catch (error) {
    return handleError(error);
  }
});
