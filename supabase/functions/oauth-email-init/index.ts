/**
 * OAuth Email Initialization
 * Starts the OAuth flow for Gmail or Outlook
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const MICROSOFT_CLIENT_ID = Deno.env.get('MICROSOFT_CLIENT_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider } = await req.json();

    if (!provider || !['gmail', 'outlook'].includes(provider)) {
      throw new ValidationError('Provider must be "gmail" or "outlook"');
    }

    // Generate random state for CSRF protection
    const state = crypto.randomUUID();
    const redirectUri = `${SUPABASE_URL}/functions/v1/oauth-email-callback`;

    let authUrl: string;

    if (provider === 'gmail') {
      if (!GOOGLE_CLIENT_ID) {
        throw new ValidationError('Google OAuth not configured');
      }

      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/gmail.send',
        state,
        access_type: 'offline',
        prompt: 'consent',
      });

      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    } else {
      // Outlook
      if (!MICROSOFT_CLIENT_ID) {
        throw new ValidationError('Microsoft OAuth not configured');
      }

      const params = new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'Mail.Send offline_access',
        state,
        prompt: 'consent',
      });

      authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`;
    }

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

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Store state temporarily
    const { error: insertError } = await supabase
      .from('oauth_states')
      .insert({
        state,
        user_id: user.id,
        provider,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      });

    if (insertError) {
      console.error('Failed to store OAuth state:', insertError);
      throw new Error('Failed to initialize OAuth flow');
    }

    console.log(`✅ OAuth flow initiated for ${provider}`, { user_id: user.id });

    return new Response(
      JSON.stringify({ authUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
