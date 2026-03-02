/**
 * Verify Phone OTP
 *
 * Verifies the 6-digit code sent to the user's phone.
 * On success, marks the phone as verified on the user's profile
 * and triggers Business AI provisioning.
 *
 * POST body: { phone_number: "+447...", code: "123456" }
 * Returns: { verified: true, agent_status: "provisioning" }
 *
 * Max 3 attempts per code. After 3 failures, code is invalidated.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
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

    // Parse body
    const { phone_number, code } = await req.json();
    if (!phone_number || !code) {
      throw new ValidationError('phone_number and code are required');
    }

    const cleaned = phone_number.replace(/\s/g, '');

    // Find the most recent unexpired, unverified code for this user + phone
    const { data: verification, error: fetchError } = await supabase
      .from('phone_verification_codes')
      .select('*')
      .eq('user_id', user.id)
      .eq('phone_number', cleaned)
      .is('verified_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !verification) {
      throw new ValidationError('No valid verification code found. Please request a new code.');
    }

    // Check max attempts
    if (verification.attempts >= verification.max_attempts) {
      // Invalidate this code
      await supabase.from('phone_verification_codes').delete().eq('id', verification.id);

      throw new ValidationError('Too many incorrect attempts. Please request a new code.');
    }

    // Check code using constant-time comparison to prevent timing attacks
    const codesMatch = timingSafeEqual(verification.code, code.trim());

    if (!codesMatch) {
      // Increment attempts
      await supabase
        .from('phone_verification_codes')
        .update({ attempts: verification.attempts + 1 })
        .eq('id', verification.id);

      const remaining = verification.max_attempts - verification.attempts - 1;
      throw new ValidationError(
        `Incorrect code. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`
      );
    }

    // Code is correct — mark as verified
    await supabase
      .from('phone_verification_codes')
      .update({ verified_at: new Date().toISOString() })
      .eq('id', verification.id);

    // Update user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        agent_whatsapp_number: cleaned,
        agent_phone_verified: true,
        agent_phone_verified_at: new Date().toISOString(),
        agent_status: 'provisioning',
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Failed to update profile:', profileError);
      throw new Error('Failed to update profile with verified phone');
    }

    // Register in phone_number_routing
    const { error: routeError } = await supabase.from('phone_number_routing').upsert(
      {
        phone_number: cleaned,
        owner_type: 'electrician',
        user_id: user.id,
        registered_at: new Date().toISOString(),
      },
      { onConflict: 'phone_number' }
    );

    if (routeError) {
      console.error('Failed to register phone routing:', routeError);
      // Non-fatal — provisioning can still proceed
    }

    console.log(`Phone ${cleaned.slice(0, 6)}*** verified for user ${user.id}`);

    return new Response(
      JSON.stringify({
        verified: true,
        phone_number: cleaned,
        agent_status: 'provisioning',
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
