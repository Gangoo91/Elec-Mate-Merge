/**
 * Refresh Email Token
 * Refreshes expired OAuth tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { encryptToken, decryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const MICROSOFT_CLIENT_ID = Deno.env.get('MICROSOFT_CLIENT_ID');
const MICROSOFT_CLIENT_SECRET = Deno.env.get('MICROSOFT_CLIENT_SECRET');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { configId } = await req.json();

    if (!configId) {
      throw new ValidationError('configId required');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Get config
    const { data: config, error: configError } = await supabase
      .from('user_email_configs')
      .select('*')
      .eq('id', configId)
      .eq('user_id', user.id)
      .single();

    if (configError || !config) {
      throw new ValidationError('Email config not found');
    }

    if (!config.encrypted_refresh_token) {
      throw new ValidationError('No refresh token available. Please reconnect your email.');
    }

    // Decrypt refresh token
    const refreshToken = await decryptToken(config.encrypted_refresh_token);

    // Refresh token
    let tokenData: any;

    if (config.email_provider === 'gmail') {
      tokenData = await withRetry(
        () => withTimeout(
          refreshGoogleToken(refreshToken),
          Timeouts.STANDARD,
          'Google token refresh'
        ),
        RetryPresets.AGGRESSIVE
      );
    } else {
      tokenData = await withRetry(
        () => withTimeout(
          refreshMicrosoftToken(refreshToken),
          Timeouts.STANDARD,
          'Microsoft token refresh'
        ),
        RetryPresets.AGGRESSIVE
      );
    }

    // Encrypt new tokens
    const encryptedAccessToken = await encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? await encryptToken(tokenData.refresh_token)
      : config.encrypted_refresh_token;

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Update database
    const { error: updateError } = await supabase
      .from('user_email_configs')
      .update({
        encrypted_access_token: encryptedAccessToken,
        encrypted_refresh_token: encryptedRefreshToken,
        token_expires_at: expiresAt.toISOString(),
      })
      .eq('id', configId);

    if (updateError) {
      throw new Error('Failed to update tokens');
    }

    console.log(`✅ Token refreshed`, { 
      config_id: configId, 
      provider: config.email_provider 
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function refreshGoogleToken(refreshToken: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('Google OAuth', { error, hint: 'Token refresh failed. User may need to re-authorize.' });
  }

  return await response.json();
}

async function refreshMicrosoftToken(refreshToken: string) {
  const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: MICROSOFT_CLIENT_ID!,
      client_secret: MICROSOFT_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('Microsoft OAuth', { error, hint: 'Token refresh failed. User may need to re-authorize.' });
  }

  return await response.json();
}
