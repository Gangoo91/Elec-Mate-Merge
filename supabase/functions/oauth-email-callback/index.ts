/**
 * OAuth Email Callback
 * Handles OAuth callback and exchanges code for tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const MICROSOFT_CLIENT_ID = Deno.env.get('MICROSOFT_CLIENT_ID');
const MICROSOFT_CLIENT_SECRET = Deno.env.get('MICROSOFT_CLIENT_SECRET');
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
      .from('oauth_states')
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

    const provider = stateData.provider;
    const userId = stateData.user_id;

    // Exchange code for tokens
    let tokenData: any;

    if (provider === 'gmail') {
      tokenData = await withRetry(
        () => withTimeout(
          exchangeGoogleCode(code),
          Timeouts.STANDARD,
          'Google token exchange'
        ),
        RetryPresets.STANDARD
      );
    } else {
      tokenData = await withRetry(
        () => withTimeout(
          exchangeMicrosoftCode(code),
          Timeouts.STANDARD,
          'Microsoft token exchange'
        ),
        RetryPresets.STANDARD
      );
    }

    // Encrypt tokens
    const encryptedAccessToken = await encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token 
      ? await encryptToken(tokenData.refresh_token)
      : null;

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Get user email from token
    const emailAddress = await getUserEmail(provider, tokenData.access_token);

    // Store in database (upsert)
    const { error: upsertError } = await supabase
      .from('user_email_configs')
      .upsert({
        user_id: userId,
        email_provider: provider,
        email_address: emailAddress,
        encrypted_access_token: encryptedAccessToken,
        encrypted_refresh_token: encryptedRefreshToken,
        token_expires_at: expiresAt.toISOString(),
        is_active: true,
      }, {
        onConflict: 'user_id,email_provider',
      });

    if (upsertError) {
      console.error('Failed to store email config:', upsertError);
      throw new Error('Failed to save email configuration');
    }

    // Delete used state
    await supabase.from('oauth_states').delete().eq('state', state);

    console.log(`✅ OAuth callback successful`, { 
      user_id: userId, 
      provider, 
      email: emailAddress 
    });

    // Redirect to settings page with success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/settings?tab=email&success=true`,
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    // Redirect to settings with error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/settings?tab=email&error=${encodeURIComponent(error.message)}`,
      },
    });
  }
});

async function exchangeGoogleCode(code: string) {
  const redirectUri = `${SUPABASE_URL}/functions/v1/oauth-email-callback`;
  
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
    const error = await response.text();
    throw new ExternalAPIError('Google OAuth', { error });
  }

  return await response.json();
}

async function exchangeMicrosoftCode(code: string) {
  const redirectUri = `${SUPABASE_URL}/functions/v1/oauth-email-callback`;
  
  const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: MICROSOFT_CLIENT_ID!,
      client_secret: MICROSOFT_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('Microsoft OAuth', { error });
  }

  return await response.json();
}

async function getUserEmail(provider: string, accessToken: string): Promise<string> {
  if (provider === 'gmail') {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.email;
  } else {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.mail || data.userPrincipalName;
  }
}
