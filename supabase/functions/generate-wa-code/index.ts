/**
 * Generate WhatsApp activation code for a Business-AI-enabled user.
 *
 * Auth: Bearer JWT (the user's own login token).
 * Body: optional `{ regenerate?: boolean }` — defaults to false. If a non-expired
 *       code already exists and `regenerate` is false, returns it instead of creating
 *       a new one. If true, the prior code is soft-revoked and a fresh one is issued.
 *
 * Pre-conditions:
 *   - User is authenticated.
 *   - profiles.business_ai_enabled = true.
 *   - phone_number_routing has no active mapping for this user (already onboarded users
 *     don't need a new code).
 *
 * Returns: { code, deeplink, expires_at, expires_in_seconds }.
 *
 * Companion: `_shared/wa-onboarding.ts` holds the actual code-issuance logic so
 * the Stripe webhook can call the same helper without going through HTTP.
 */

import { captureException } from '../_shared/sentry.ts';
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import {
  buildDeeplink,
  generateWaCodeForUser,
  VERIFICATION_METHOD_WA,
} from '../_shared/wa-onboarding.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
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

    let regenerate = false;
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        regenerate = body?.regenerate === true;
      } catch {
        // empty body is fine
      }
    }

    // Gate: must have an active Business AI subscription.
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('business_ai_enabled, agent_status')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      throw new ValidationError('Profile not found');
    }
    if (!profile.business_ai_enabled) {
      throw new ValidationError(
        'Business AI subscription is not active. Please subscribe first.'
      );
    }

    // If the user is already provisioned with a working agent we don't need
    // a new activation code — they're already in.
    const { data: existingRoute } = await supabase
      .from('phone_number_routing')
      .select('phone_number')
      .eq('user_id', user.id)
      .eq('owner_type', 'electrician')
      .maybeSingle();

    if (existingRoute && profile.agent_status === 'active' && !regenerate) {
      return new Response(
        JSON.stringify({
          already_active: true,
          message: 'Your WhatsApp is already linked. No new code needed.',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // If a pending code already exists and the caller didn't ask for a new one,
    // return that one — gives the welcome page idempotency on refresh.
    if (!regenerate) {
      const { data: pending } = await supabase
        .from('phone_verification_codes')
        .select('code, expires_at')
        .eq('user_id', user.id)
        .eq('verification_method', VERIFICATION_METHOD_WA)
        .is('verified_at', null)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (pending) {
        const expiresInSeconds = Math.max(
          0,
          Math.floor((new Date(pending.expires_at).getTime() - Date.now()) / 1000)
        );
        return new Response(
          JSON.stringify({
            code: pending.code,
            deeplink: buildDeeplink(pending.code),
            expires_at: pending.expires_at,
            expires_in_seconds: expiresInSeconds,
            reused: true,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    let result;
    try {
      result = await generateWaCodeForUser(supabase, user.id);
    } catch (err) {
      const code = (err as Error & { code?: string }).code;
      if (code === 'RATE_LIMIT_ERROR') {
        return new Response(
          JSON.stringify({
            error: (err as Error).message,
            code: 'RATE_LIMITED',
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      throw err;
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'generate-wa-code', requestUrl: req.url, requestMethod: req.method });
    return handleError(error);
  }
});
