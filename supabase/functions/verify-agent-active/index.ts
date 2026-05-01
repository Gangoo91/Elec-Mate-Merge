/**
 * verify-agent-active
 *
 * Self-healing readiness check used by the in-app DeepLinkActivationStep poller
 * (and admin tooling). Returns whether the caller's Mate agent is fully ready
 * to message — meaning BOTH:
 *   1. profile.agent_status === 'active'
 *   2. an unrevoked, unexpired row exists in agent_jwt_tokens
 *
 * If status is 'active' but the JWT is missing or expired, this function
 * auto-mints one by invoking provision-agent-vps (which is idempotent and
 * authenticates with the VPS API key). That stops users from being stranded
 * in the "WhatsApp linked but agent can't talk" half-provisioned state.
 *
 * Auth: caller's own JWT — only checks the caller's own profile.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, AuthenticationError } from '../_shared/errors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    const { data: profile } = await supabase
      .from('profiles')
      .select('agent_status, business_ai_enabled, agent_phone_verified')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return json({
        ok: false,
        agent_status: null,
        has_jwt: false,
        ready: false,
        reason: 'profile_not_found',
      });
    }

    const checkJwt = async () => {
      const { data } = await supabase
        .from('agent_jwt_tokens')
        .select('expires_at')
        .eq('user_id', user.id)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .order('expires_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      return (data as { expires_at: string } | null)?.expires_at ?? null;
    };

    let jwtExpiresAt = await checkJwt();
    let mintAttempted = false;

    // Auto-heal: if profile says active but JWT missing, mint one.
    if (
      profile.agent_status === 'active' &&
      profile.business_ai_enabled &&
      profile.agent_phone_verified &&
      !jwtExpiresAt
    ) {
      mintAttempted = true;
      const vpsKey = Deno.env.get('VPS_API_KEY');
      const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
      if (vpsKey) {
        try {
          await fetch(`${supabaseUrl}/functions/v1/provision-agent-vps`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-VPS-API-Key': vpsKey,
            },
            body: JSON.stringify({ user_id: user.id }),
          });
          jwtExpiresAt = await checkJwt();
        } catch (e) {
          console.error('[verify-agent-active] auto-mint failed:', e);
        }
      }
    }

    const hasJwt = !!jwtExpiresAt;
    const ready = profile.agent_status === 'active' && hasJwt;

    return json({
      ok: true,
      agent_status: profile.agent_status,
      has_jwt: hasJwt,
      jwt_expires_at: jwtExpiresAt,
      ready,
      mint_attempted: mintAttempted,
    });
  } catch (error) {
    return handleError(error);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
