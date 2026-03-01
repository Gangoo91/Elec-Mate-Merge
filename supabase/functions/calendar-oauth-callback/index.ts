/**
 * Calendar OAuth Callback
 * Handles Google Calendar OAuth callback and exchanges code for tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const FRONTEND_URL = Deno.env.get('FRONTEND_URL');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      throw new ValidationError(`OAuth error: ${error}`);
    }

    if (!code || !state) {
      throw new ValidationError('Missing code or state parameter');
    }

    // Verify state and get user
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: stateData, error: stateError } = await supabase
      .from('calendar_oauth_states')
      .select('*')
      .eq('state', state)
      .single();

    if (stateError || !stateData) {
      throw new ValidationError('Invalid or expired OAuth state');
    }

    // Check expiry
    if (new Date(stateData.expires_at) < new Date()) {
      throw new ValidationError('OAuth state expired');
    }

    const userId = stateData.user_id;

    // Exchange code for tokens
    const tokenData = await withRetry(
      () => withTimeout(exchangeGoogleCode(code), Timeouts.STANDARD, 'Google token exchange'),
      RetryPresets.STANDARD
    );

    // Encrypt tokens
    const encryptedAccessToken = await encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? await encryptToken(tokenData.refresh_token)
      : null;

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Get user email from token
    const emailAddress = await getGoogleEmail(tokenData.access_token);

    // Store in database (upsert)
    const { error: upsertError } = await supabase.from('google_calendar_tokens').upsert(
      {
        user_id: userId,
        encrypted_access_token: encryptedAccessToken,
        encrypted_refresh_token: encryptedRefreshToken,
        token_expires_at: expiresAt.toISOString(),
        google_email: emailAddress,
        calendar_id: 'primary',
        sync_enabled: true,
      },
      {
        onConflict: 'user_id',
      }
    );

    if (upsertError) {
      console.error('Failed to store calendar tokens:', upsertError);
      throw new Error('Failed to save calendar configuration');
    }

    // Delete used state
    await supabase.from('calendar_oauth_states').delete().eq('state', state);

    console.log(`✅ Calendar OAuth callback successful`, {
      user_id: userId,
      email: emailAddress,
    });

    // Redirect to calendar page with success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/electrician/business/calendar?google_connected=true`,
      },
    });
  } catch (error) {
    console.error('Calendar OAuth callback error:', error);
    // Redirect with error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/electrician/business/calendar?error=${encodeURIComponent((error as Error).message)}`,
      },
    });
  }
});

async function exchangeGoogleCode(code: string) {
  const redirectUri = `${SUPABASE_URL}/functions/v1/calendar-oauth-callback`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ExternalAPIError('Google OAuth', { error: errorText });
  }

  return await response.json();
}

async function getGoogleEmail(accessToken: string): Promise<string> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.email;
}
