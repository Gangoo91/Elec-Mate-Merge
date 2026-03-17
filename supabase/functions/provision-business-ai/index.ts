/**
 * Provision Business AI
 *
 * Called after phone verification succeeds. Generates a long-lived custom JWT
 * for the user's MCP server authentication, stores it encrypted, and activates
 * the agent.
 *
 * This function:
 * 1. Verifies the user has business_ai_enabled = true (active subscription)
 * 2. Verifies the user's phone is verified
 * 3. Generates a custom Supabase-compatible JWT (90-day expiry)
 * 4. Encrypts and stores it in agent_jwt_tokens
 * 5. Registers the phone in phone_number_routing (if not already)
 * 6. Updates agent_status to 'active'
 *
 * POST body: {} (no body needed — everything from auth + profile)
 * Returns: { provisioned: true, agent_status: "active", expires_at: "..." }
 *
 * Security: The JWT secret MUST be set as SUPABASE_JWT_SECRET env var.
 * The generated JWT has the same claims as a normal Supabase auth JWT,
 * so RLS policies work identically.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { signJwt, buildAgentJwtPayload } from '../_shared/jwt-signer.ts';

// JWT expiry: 90 days
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
    // Auth
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

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(
        'business_ai_enabled, agent_phone_verified, agent_whatsapp_number, agent_status, role'
      )
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      throw new ValidationError('Profile not found');
    }

    // Check subscription
    if (!profile.business_ai_enabled) {
      throw new ValidationError('Business AI subscription is not active. Please subscribe first.');
    }

    // Check phone verified
    if (!profile.agent_phone_verified || !profile.agent_whatsapp_number) {
      throw new ValidationError(
        'Phone number must be verified before provisioning. Complete the verification step first.'
      );
    }

    // Check not already active — but only skip if JWT actually exists
    if (profile.agent_status === 'active') {
      const { data: existingToken } = await supabase
        .from('agent_jwt_tokens')
        .select('expires_at')
        .eq('user_id', user.id)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (existingToken) {
        // Truly idempotent — agent active AND valid JWT exists
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
      console.log(`Agent ${user.id} is active but JWT missing/expired — re-provisioning JWT`);
    }

    // Pre-check VPS_API_KEY before doing any work — fail fast
    const vpsApiKey = Deno.env.get('VPS_API_KEY');
    if (!vpsApiKey) {
      throw new Error(
        'Agent activation failed — VPS configuration missing. Please contact support.'
      );
    }

    // Generate custom JWT using shared signer
    const jwtSecret = Deno.env.get('JWT_SECRET') ?? Deno.env.get('SUPABASE_JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRY_DAYS * 24 * 60 * 60;

    const payload = buildAgentJwtPayload({
      userId: user.id,
      email: user.email || '',
      userRole: profile.role || 'electrician',
      expiresAt,
    });

    const customJwt = await signJwt(payload, jwtSecret);

    const expiresAtDate = new Date(expiresAt * 1000).toISOString();

    // Encrypt and store the JWT
    const encryptedToken = await encryptToken(customJwt);

    const { error: upsertError } = await supabase.from('agent_jwt_tokens').upsert(
      {
        user_id: user.id,
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

    // Ensure phone routing exists
    await supabase.from('phone_number_routing').upsert(
      {
        phone_number: profile.agent_whatsapp_number,
        owner_type: 'electrician',
        user_id: user.id,
        registered_at: new Date().toISOString(),
      },
      { onConflict: 'phone_number' }
    );

    // Activate the agent
    const { error: activateError } = await supabase
      .from('profiles')
      .update({
        agent_status: 'active',
        agent_provisioned_at: new Date().toISOString(),
        agent_last_active: new Date().toISOString(),
        agent_health_status: 'healthy',
      })
      .eq('id', user.id);

    if (activateError) {
      console.error('Failed to activate agent:', activateError);
      throw new Error('Failed to activate agent');
    }

    // Log the provisioning action
    await supabase.from('agent_action_log').insert({
      user_id: user.id,
      action_type: 'agent_provisioned',
      description: `Business AI agent provisioned. Phone: ${profile.agent_whatsapp_number.slice(0, 6)}***. JWT expires: ${expiresAtDate}`,
      outcome: 'success',
    });

    console.log(`Agent provisioned for user ${user.id}, JWT expires ${expiresAtDate}`);

    // Notify VPS to create OpenClaw agent workspace + binding
    let vpsProvisioned = false;
    try {
      const vpsRes = await fetch('https://agent.elec-mate.com/api/provision-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': vpsApiKey,
        },
        body: JSON.stringify({
          user_id: user.id,
          phone_number: profile.agent_whatsapp_number,
          full_name: user.user_metadata?.full_name || '',
          role: profile.role || 'electrician',
        }),
      });
      if (vpsRes.ok) {
        vpsProvisioned = true;
        console.log(`VPS agent provisioned for user ${user.id}`);
      } else {
        const vpsErr = await vpsRes.text();
        console.error(`VPS provisioning failed (${vpsRes.status}): ${vpsErr}`);
        throw new Error(`VPS returned ${vpsRes.status}`);
      }
    } catch (vpsError) {
      // Roll back agent_status so user can retry
      await supabase.from('profiles').update({ agent_status: 'provisioning' }).eq('id', user.id);

      await supabase.from('agent_action_log').insert({
        user_id: user.id,
        action_type: 'agent_provision_failed',
        description: `VPS provisioning failed: ${vpsError instanceof Error ? vpsError.message : 'Unknown error'}`,
        outcome: 'failure',
      });

      console.error('VPS provisioning error — rolled back agent_status:', vpsError);
      throw new Error(
        'Agent activation failed — could not set up WhatsApp connection. Please try again in a moment.'
      );
    }

    return new Response(
      JSON.stringify({
        provisioned: true,
        agent_status: 'active',
        expires_at: expiresAtDate,
        phone_number: profile.agent_whatsapp_number,
        vps_provisioned: vpsProvisioned,
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
