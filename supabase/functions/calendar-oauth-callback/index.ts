/**
 * Calendar OAuth Callback
 * Handles Google Calendar OAuth callback and exchanges code for tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { captureException } from '../_shared/sentry.ts';
import {
  calendarRedirectUri,
  grantedCalendarAccess,
  CALENDAR_SCOPE_DENIED_MESSAGE,
  OUTLOOK_CALENDAR_SCOPES,
} from '../_shared/calendar-oauth.ts';

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
    const provider: 'google' | 'outlook' = stateData.provider === 'outlook' ? 'outlook' : 'google';

    // Exchange code for tokens
    const tokenData = await withRetry(
      () =>
        withTimeout(
          provider === 'outlook' ? exchangeMicrosoftCode(code) : exchangeGoogleCode(code),
          Timeouts.STANDARD,
          `${provider} token exchange`
        ),
      RetryPresets.STANDARD
    );

    /*
     * Refuse a connection that cannot actually sync.
     *
     * Google's granular consent screen lets people untick the calendar
     * permission and still returns a valid token for what remains. Storing it
     * told the user they were connected and then failed every sync with
     * ACCESS_TOKEN_SCOPE_INSUFFICIENT — a state they can only escape by
     * disconnecting and guessing at what went wrong. Better to fail the connect
     * here and say which box to leave ticked.
     *
     * Checked BEFORE the upsert so a half-granted retry cannot overwrite a
     * working connection with a useless one.
     */
    if (provider === 'google' && !grantedCalendarAccess(tokenData.scope)) {
      console.warn('Google connect refused — calendar scope not granted', {
        user_id: userId,
        granted: tokenData.scope ?? '(none returned)',
      });
      await supabase.from('calendar_oauth_states').delete().eq('state', state);
      throw new ValidationError(CALENDAR_SCOPE_DENIED_MESSAGE);
    }

    // Encrypt tokens
    const encryptedAccessToken = await encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? await encryptToken(tokenData.refresh_token)
      : null;

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Get user email from token
    const emailAddress =
      provider === 'outlook'
        ? await getMicrosoftEmail(tokenData.access_token)
        : await getGoogleEmail(tokenData.access_token);

    // Store in database (upsert)
    const { error: upsertError } =
      provider === 'outlook'
        ? await supabase.from('outlook_calendar_tokens').upsert(
            {
              user_id: userId,
              encrypted_access_token: encryptedAccessToken,
              encrypted_refresh_token: encryptedRefreshToken,
              token_expires_at: expiresAt.toISOString(),
              outlook_email: emailAddress,
              sync_enabled: true,
            },
            { onConflict: 'user_id' }
          )
        : await supabase.from('google_calendar_tokens').upsert(
            {
              user_id: userId,
              encrypted_access_token: encryptedAccessToken,
              encrypted_refresh_token: encryptedRefreshToken,
              token_expires_at: expiresAt.toISOString(),
              google_email: emailAddress,
              calendar_id: 'primary',
              sync_enabled: true,
            },
            { onConflict: 'user_id' }
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

    // Redirect to frontend oauth-complete page which closes the popup
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${FRONTEND_URL}/oauth-complete?status=success&email=${encodeURIComponent(emailAddress)}`,
      },
    });
  } catch (error) {
    await captureException(error, { functionName: 'calendar-oauth-callback', requestUrl: req.url, requestMethod: req.method });
    console.error('Calendar OAuth callback error:', error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${FRONTEND_URL}/oauth-complete?status=error&message=${encodeURIComponent((error as Error).message)}`,
      },
    });
  }
});

async function exchangeGoogleCode(code: string) {
  // Must match the authorize call byte for byte — see calendarRedirectUri.
  const redirectUri = calendarRedirectUri();

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

async function exchangeMicrosoftCode(code: string) {
  // Must match the authorize call byte for byte — see calendarRedirectUri.
  const redirectUri = calendarRedirectUri();

  const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: Deno.env.get('MICROSOFT_CLIENT_ID')!,
      client_secret: Deno.env.get('MICROSOFT_CLIENT_SECRET')!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      scope: OUTLOOK_CALENDAR_SCOPES,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ExternalAPIError('Microsoft OAuth', { error: errorText });
  }

  return await response.json();
}

async function getMicrosoftEmail(accessToken: string): Promise<string> {
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.mail || data.userPrincipalName || 'connected';
}

async function getGoogleEmail(accessToken: string): Promise<string> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.email;
}

function closePage(title: string, message: string): string {
  return `<!DOCTYPE html><html><head><title>${title}</title></head><body><script>window.close();</script><p>${title}: ${message}</p><p>You can close this window.</p></body></html>`;
}
