/**
 * Get Agent JWT
 *
 * Returns the decrypted agent JWT for a user, identified by phone number.
 * Called by the OpenClaw gateway on the VPS when routing an inbound message.
 *
 * Security: This function MUST be called with the service role key or a
 * special VPS API key — it is NOT user-facing. The VPS_API_KEY env var
 * must match the X-VPS-API-Key header.
 *
 * POST body: { phone_number: "+447..." }
 * Returns: { user_id: "...", jwt: "...", role: "electrician", expires_at: "..." }
 *
 * If the token is expired or revoked, returns { error: "token_expired" } or
 * { error: "token_revoked" } so the caller knows to trigger rotation or
 * re-provisioning.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { timingSafeEqual } from '../_shared/jwt-signer.ts';

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
    // Authenticate: VPS API key OR service role key
    const vpsApiKey = req.headers.get('X-VPS-API-Key');
    const authHeader = req.headers.get('Authorization');
    const expectedKey = Deno.env.get('VPS_API_KEY');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    // Use constant-time comparison to prevent timing attacks
    const isVpsAuth = !!(vpsApiKey && expectedKey && timingSafeEqual(vpsApiKey, expectedKey));

    // Parse Bearer token properly — exact match, not substring
    let isServiceRole = false;
    if (authHeader && serviceRoleKey) {
      const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
      isServiceRole = bearerToken.length > 0 && timingSafeEqual(bearerToken, serviceRoleKey);
    }

    if (!isVpsAuth && !isServiceRole) {
      throw new AuthenticationError('Unauthorised — VPS API key or service role required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Parse body
    const { phone_number } = await req.json();
    if (!phone_number) {
      throw new ValidationError('phone_number is required');
    }

    const cleaned = phone_number.replace(/\s/g, '');

    // Look up phone in routing table
    const { data: route, error: routeError } = await supabase
      .from('phone_number_routing')
      .select('user_id, owner_type, customer_id')
      .eq('phone_number', cleaned)
      .single();

    if (routeError || !route) {
      return new Response(
        JSON.stringify({
          error: 'phone_not_registered',
          message: 'This phone number is not registered with any agent',
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // If it's a client's number, find the electrician who owns the route
    const targetUserId = route.user_id;

    // Fetch the agent JWT token
    const { data: tokenRecord, error: tokenError } = await supabase
      .from('agent_jwt_tokens')
      .select('token_encrypted, expires_at, revoked_at')
      .eq('user_id', targetUserId)
      .single();

    if (tokenError || !tokenRecord) {
      return new Response(
        JSON.stringify({
          error: 'no_agent_token',
          user_id: targetUserId,
          message: 'User has no agent token — needs provisioning',
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if revoked
    if (tokenRecord.revoked_at) {
      return new Response(
        JSON.stringify({
          error: 'token_revoked',
          user_id: targetUserId,
          message: 'Agent token has been revoked',
        }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if expired
    if (new Date(tokenRecord.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({
          error: 'token_expired',
          user_id: targetUserId,
          expires_at: tokenRecord.expires_at,
          message: 'Agent token has expired — needs rotation',
        }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Decrypt the JWT
    const jwt = await decryptToken(tokenRecord.token_encrypted);

    // Fetch user role for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email, agent_status')
      .eq('id', targetUserId)
      .single();

    // Update last_used_at
    await supabase
      .from('agent_jwt_tokens')
      .update({ last_used_at: new Date().toISOString() })
      .eq('user_id', targetUserId);

    return new Response(
      JSON.stringify({
        user_id: targetUserId,
        jwt,
        role: profile?.role || 'electrician',
        email: profile?.email || '',
        agent_status: profile?.agent_status || 'unknown',
        owner_type: route.owner_type,
        customer_id: route.customer_id || null,
        expires_at: tokenRecord.expires_at,
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
