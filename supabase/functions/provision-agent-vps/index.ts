/**
 * Provision Agent (VPS-initiated)
 *
 * Called by the VPS/OpenClaw infrastructure to provision a user's agent JWT.
 * This is the production flow: VPS authenticates with VPS_API_KEY,
 * provides a user_id, and receives confirmation that the agent is active.
 *
 * Auth: X-VPS-API-Key header (not user JWT — this is infra-to-infra)
 *
 * POST body: { user_id: "uuid" }
 * Returns: { provisioned: true, agent_status: "active", expires_at: "..." }
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { signJwt, buildAgentJwtPayload, timingSafeEqual } from '../_shared/jwt-signer.ts';

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
    // Auth: VPS API key only
    const vpsApiKey = req.headers.get('X-VPS-API-Key');
    const expectedKey = Deno.env.get('VPS_API_KEY');

    if (!vpsApiKey || !expectedKey || !timingSafeEqual(vpsApiKey, expectedKey)) {
      throw new AuthenticationError('Unauthorised — valid VPS API key required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Parse body
    const { user_id } = await req.json();
    if (!user_id) {
      throw new ValidationError('user_id is required');
    }

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(
        'business_ai_enabled, agent_phone_verified, agent_whatsapp_number, agent_status, role, full_name'
      )
      .eq('id', user_id)
      .single();

    if (profileError || !profile) {
      throw new ValidationError('Profile not found');
    }

    // Fetch email from auth.users
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.admin.getUserById(user_id);
    if (userError || !user) {
      throw new ValidationError('Auth user not found');
    }

    // Check subscription
    if (!profile.business_ai_enabled) {
      throw new ValidationError('Business AI subscription is not active');
    }

    // Check phone verified
    if (!profile.agent_phone_verified || !profile.agent_whatsapp_number) {
      throw new ValidationError('Phone number must be verified before provisioning');
    }

    // Idempotent — if already active AND has valid JWT, return existing status
    if (profile.agent_status === 'active') {
      const { data: existingToken } = await supabase
        .from('agent_jwt_tokens')
        .select('expires_at')
        .eq('user_id', user_id)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (existingToken) {
        return new Response(
          JSON.stringify({
            provisioned: true,
            agent_status: 'active',
            expires_at: existingToken.expires_at,
            message: 'Agent is already active',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      // JWT missing or expired — fall through to create one
      console.log(`Agent ${user_id} is active but JWT missing/expired — re-provisioning JWT`);
    }

    // Generate custom JWT
    const jwtSecret = Deno.env.get('JWT_SECRET') ?? Deno.env.get('SUPABASE_JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRY_DAYS * 24 * 60 * 60;

    const payload = buildAgentJwtPayload({
      userId: user_id,
      email: user.email || '',
      userRole: profile.role || 'electrician',
      expiresAt,
    });

    const customJwt = await signJwt(payload, jwtSecret);
    const expiresAtDate = new Date(expiresAt * 1000).toISOString();

    // Encrypt and store
    const encryptedToken = await encryptToken(customJwt);

    const { error: upsertError } = await supabase.from('agent_jwt_tokens').upsert(
      {
        user_id,
        token_encrypted: encryptedToken,
        expires_at: expiresAtDate,
        revoked_at: null,
        rotated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

    if (upsertError) {
      console.error('Failed to store agent JWT:', upsertError);
      throw new Error('Failed to store agent credentials');
    }

    // Activate the agent
    const { error: activateError } = await supabase
      .from('profiles')
      .update({
        agent_status: 'active',
        agent_provisioned_at: new Date().toISOString(),
        agent_last_active: new Date().toISOString(),
        agent_health_status: 'healthy',
      })
      .eq('id', user_id);

    if (activateError) {
      console.error('Failed to activate agent:', activateError);
      throw new Error('Failed to activate agent');
    }

    // Log the provisioning action
    await supabase.from('agent_action_log').insert({
      user_id,
      action_type: 'agent_provisioned',
      description: `Business AI agent provisioned via VPS. JWT expires: ${expiresAtDate}`,
      outcome: 'success',
    });

    console.log(`Agent provisioned for user ${user_id}, JWT expires ${expiresAtDate}`);

    return new Response(
      JSON.stringify({
        provisioned: true,
        agent_status: 'active',
        expires_at: expiresAtDate,
        phone_number: profile.agent_whatsapp_number,
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
