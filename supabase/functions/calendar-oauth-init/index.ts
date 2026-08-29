/**
 * Calendar OAuth Initialization
 * Starts the OAuth flow for Google Calendar or Outlook (Microsoft 365)
 * calendar sync. Provider comes from the request body: {} or
 * { provider: 'google' } → Google (original behaviour); { provider:
 * 'outlook' } → Microsoft Graph with Calendars.ReadWrite.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { captureException } from '../_shared/sentry.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const MICROSOFT_CLIENT_ID = Deno.env.get('MICROSOFT_CLIENT_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}) as Record<string, unknown>);
    const provider = body?.provider === 'outlook' ? 'outlook' : 'google';

    // Generate random state for CSRF protection
    const state = crypto.randomUUID();
    // Public-facing redirect — a Vercel rewrite proxies this to the Supabase fn.
    // Google shows this domain on the consent screen; the project ref stays
    // out of sight. MUST match the token-exchange redirect_uri byte for byte.
    // Prefer the public elec-mate.com redirect (set CALENDAR_OAUTH_REDIRECT once
    // the Vercel rewrite is live — i.e. at THE PUSH); until then fall back to
    // the Supabase URL so connects made today actually complete. Both URIs are
    // registered on the Google client. Must match authorize + token exchange.
    const redirectUri =
      Deno.env.get('CALENDAR_OAUTH_REDIRECT') ||
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/calendar-oauth-callback`;

    let authUrl: string;
    if (provider === 'outlook') {
      if (!MICROSOFT_CLIENT_ID) {
        throw new ValidationError('Microsoft OAuth not configured');
      }
      const params = new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        // User.Read gives /me for the connected address; offline_access = refresh token.
        scope: 'Calendars.ReadWrite User.Read offline_access',
        state,
        prompt: 'consent',
      });
      authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`;
    } else {
      if (!GOOGLE_CLIENT_ID) {
        throw new ValidationError('Google OAuth not configured');
      }
      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email openid',
        state,
        access_type: 'offline',
        prompt: 'consent',
      });
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    }

    console.log(`🔐 Calendar OAuth (${provider}) redirect URI:`, redirectUri);

    // Store state in database with 10-minute expiry
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Store state temporarily
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: insertError } = await serviceClient.from('calendar_oauth_states').insert({
      state,
      user_id: user.id,
      provider,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    });

    if (insertError) {
      console.error('Failed to store OAuth state:', insertError);
      throw new Error('Failed to initialise OAuth flow');
    }

    console.log(`✅ Calendar OAuth flow initiated (${provider})`, { user_id: user.id });

    return new Response(JSON.stringify({ authUrl, provider }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'calendar-oauth-init',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});
