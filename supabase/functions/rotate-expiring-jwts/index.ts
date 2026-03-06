/**
 * Rotate Expiring JWTs (Batch)
 *
 * Cron-triggered function that finds all agent JWTs expiring within 7 days
 * and rotates them automatically. Uses service role key for DB access.
 *
 * POST body: {} (no body needed)
 * Auth: X-VPS-API-Key header + Authorization: Bearer <anon-key>
 * Returns: { rotated: number, errors: number, details: [...] }
 *
 * ELE-216 — JWT auto-rotation
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, AuthenticationError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { signJwt, buildAgentJwtPayload } from '../_shared/jwt-signer.ts';

const JWT_EXPIRY_DAYS = 90;
const ROTATION_WINDOW_DAYS = 7;

function verifyApiKey(req: Request): void {
  const apiKey = req.headers.get('X-VPS-API-Key') || req.headers.get('x-vps-api-key');
  const expectedKey = Deno.env.get('VPS_API_KEY');

  if (!expectedKey) throw new AuthenticationError('VPS_API_KEY not configured');
  if (!apiKey || apiKey !== expectedKey) throw new AuthenticationError('Invalid API key');
}

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
    verifyApiKey(req);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const jwtSecret = Deno.env.get('JWT_SECRET') ?? Deno.env.get('SUPABASE_JWT_SECRET');
    if (!jwtSecret) throw new Error('JWT_SECRET is not configured');

    // Find tokens expiring within the rotation window
    const cutoffDate = new Date(
      Date.now() + ROTATION_WINDOW_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: expiringTokens, error: queryError } = await supabase
      .from('agent_jwt_tokens')
      .select('id, user_id, expires_at')
      .is('revoked_at', null)
      .lt('expires_at', cutoffDate);

    if (queryError) {
      console.error('Failed to query expiring tokens:', queryError);
      throw new Error('Failed to query expiring tokens');
    }

    if (!expiringTokens || expiringTokens.length === 0) {
      return new Response(
        JSON.stringify({ rotated: 0, errors: 0, message: 'No tokens need rotation' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${expiringTokens.length} tokens to rotate`);

    const details: Array<{
      user_id: string;
      status: string;
      new_expires_at?: string;
      error?: string;
    }> = [];
    let rotated = 0;
    let errors = 0;

    for (const token of expiringTokens) {
      try {
        // Fetch user profile for JWT claims
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, email, agent_status, business_ai_enabled')
          .eq('id', token.user_id)
          .single();

        if (profileError || !profile) {
          console.warn(`Skipping user ${token.user_id}: profile not found`);
          details.push({ user_id: token.user_id, status: 'skipped', error: 'Profile not found' });
          errors++;
          continue;
        }

        if (!profile.business_ai_enabled || profile.agent_status !== 'active') {
          console.log(`Skipping user ${token.user_id}: agent not active`);
          details.push({ user_id: token.user_id, status: 'skipped', error: 'Agent not active' });
          continue;
        }

        // Get user email from auth.users (profiles may not have it)
        const { data: authUser } = await supabase.auth.admin.getUserById(token.user_id);
        const email = profile.email || authUser?.user?.email || '';

        // Generate new JWT
        const expiresAt = Math.floor(Date.now() / 1000) + JWT_EXPIRY_DAYS * 24 * 60 * 60;
        const payload = buildAgentJwtPayload({
          userId: token.user_id,
          email,
          userRole: profile.role || 'electrician',
          expiresAt,
        });

        const newJwt = await signJwt(payload, jwtSecret);
        const expiresAtDate = new Date(expiresAt * 1000).toISOString();

        // Encrypt and update
        const encryptedToken = await encryptToken(newJwt);

        const { error: updateError } = await supabase
          .from('agent_jwt_tokens')
          .update({
            token_encrypted: encryptedToken,
            expires_at: expiresAtDate,
            rotated_at: new Date().toISOString(),
          })
          .eq('id', token.id);

        if (updateError) {
          console.error(`Failed to update token for user ${token.user_id}:`, updateError);
          details.push({ user_id: token.user_id, status: 'error', error: 'DB update failed' });
          errors++;
          continue;
        }

        // Log rotation
        await supabase.from('agent_action_log').insert({
          user_id: token.user_id,
          action_type: 'jwt_rotated',
          description: `Agent JWT auto-rotated by cron. New expiry: ${expiresAtDate}`,
          outcome: 'success',
        });

        console.log(`Rotated JWT for user ${token.user_id}, new expiry ${expiresAtDate}`);
        details.push({ user_id: token.user_id, status: 'rotated', new_expires_at: expiresAtDate });
        rotated++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Error rotating token for user ${token.user_id}:`, msg);
        details.push({ user_id: token.user_id, status: 'error', error: msg });
        errors++;
      }
    }

    return new Response(
      JSON.stringify({ rotated, errors, total: expiringTokens.length, details }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
