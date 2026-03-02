/**
 * Rotate Agent JWT
 *
 * Generates a fresh 90-day JWT for a user's agent, replacing the old one.
 * Called automatically when a token is within 7 days of expiry, or manually
 * by the user from the app.
 *
 * POST body: {} (no body needed)
 * Returns: { rotated: true, new_expires_at: "..." }
 *
 * Security: Old token is immediately overwritten. The encrypted token in
 * agent_jwt_tokens is the single source of truth — if it changes, the old
 * token becomes orphaned (it will still validate against Supabase until its
 * exp claim, but OpenClaw will use the new one).
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { signJwt, buildAgentJwtPayload } from '../_shared/jwt-signer.ts';

const JWT_EXPIRY_DAYS = 90;

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

    // Check agent is active
    const { data: profile } = await supabase
      .from('profiles')
      .select('agent_status, business_ai_enabled, role, email')
      .eq('id', user.id)
      .single();

    if (!profile?.business_ai_enabled) {
      throw new ValidationError('Business AI subscription is not active');
    }

    if (profile.agent_status !== 'active') {
      throw new ValidationError('Agent is not active. Provision first.');
    }

    // Check existing token exists
    const { data: existingToken } = await supabase
      .from('agent_jwt_tokens')
      .select('id, expires_at')
      .eq('user_id', user.id)
      .is('revoked_at', null)
      .single();

    if (!existingToken) {
      throw new ValidationError('No active agent token found. Re-provision the agent.');
    }

    // Generate new JWT using shared signer
    const jwtSecret = Deno.env.get('JWT_SECRET') ?? Deno.env.get('SUPABASE_JWT_SECRET');
    if (!jwtSecret) throw new Error('JWT_SECRET is not configured');

    const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRY_DAYS * 24 * 60 * 60;

    const payload = buildAgentJwtPayload({
      userId: user.id,
      email: profile.email || user.email || '',
      userRole: profile.role || 'electrician',
      expiresAt,
    });

    const newJwt = await signJwt(payload, jwtSecret);

    const expiresAtDate = new Date(expiresAt * 1000).toISOString();

    // Encrypt and update
    const encryptedToken = await encryptToken(newJwt);

    await supabase
      .from('agent_jwt_tokens')
      .update({
        token_encrypted: encryptedToken,
        expires_at: expiresAtDate,
        rotated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    // Log rotation
    await supabase.from('agent_action_log').insert({
      user_id: user.id,
      action_type: 'jwt_rotated',
      description: `Agent JWT rotated. New expiry: ${expiresAtDate}`,
      outcome: 'success',
    });

    console.log(`JWT rotated for user ${user.id}, new expiry ${expiresAtDate}`);

    return new Response(
      JSON.stringify({
        rotated: true,
        new_expires_at: expiresAtDate,
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
