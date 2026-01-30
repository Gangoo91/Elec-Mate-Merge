/**
 * Accounting OAuth Initialization
 * Starts the OAuth flow for Xero, Sage, QuickBooks, or FreshBooks
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { captureException } from '../_shared/sentry.ts';

// Provider credentials from environment
const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const SAGE_CLIENT_ID = Deno.env.get('SAGE_CLIENT_ID');
const FRESHBOOKS_CLIENT_ID = Deno.env.get('FRESHBOOKS_CLIENT_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

const VALID_PROVIDERS: AccountingProvider[] = ['xero', 'sage', 'quickbooks', 'freshbooks'];

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider } = await req.json();

    if (!provider || !VALID_PROVIDERS.includes(provider)) {
      throw new ValidationError(`Provider must be one of: ${VALID_PROVIDERS.join(', ')}`);
    }

    // Generate random state for CSRF protection
    const state = crypto.randomUUID();
    const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

    let authUrl: string;

    switch (provider) {
      case 'xero': {
        if (!XERO_CLIENT_ID) {
          throw new ValidationError('Xero integration not configured');
        }

        const params = new URLSearchParams({
          client_id: XERO_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: 'openid profile email accounting.transactions accounting.contacts offline_access',
          state,
        });

        authUrl = `https://login.xero.com/identity/connect/authorize?${params}`;
        break;
      }

      case 'quickbooks': {
        if (!QUICKBOOKS_CLIENT_ID) {
          throw new ValidationError('QuickBooks integration not configured');
        }

        const params = new URLSearchParams({
          client_id: QUICKBOOKS_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: 'com.intuit.quickbooks.accounting',
          state,
        });

        authUrl = `https://appcenter.intuit.com/connect/oauth2?${params}`;
        break;
      }

      case 'sage': {
        if (!SAGE_CLIENT_ID) {
          throw new ValidationError('Sage integration not configured');
        }

        // Sage Accounting OAuth - per developer.sage.com docs
        // Build URL manually to avoid encoding slash in client_id
        const encodedRedirectUri = encodeURIComponent(redirectUri);

        authUrl = `https://www.sageone.com/oauth2/auth/central?filter=apiv3.1&response_type=code&client_id=${SAGE_CLIENT_ID}&redirect_uri=${encodedRedirectUri}&scope=full_access&state=${state}`;

        console.log('Sage OAuth URL:', authUrl);
        break;
      }

      case 'freshbooks': {
        if (!FRESHBOOKS_CLIENT_ID) {
          throw new ValidationError('FreshBooks integration not configured');
        }

        const params = new URLSearchParams({
          client_id: FRESHBOOKS_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: 'user:profile:read user:invoices:read user:invoices:write',
          state,
        });

        authUrl = `https://auth.freshbooks.com/oauth/authorize?${params}`;
        break;
      }

      default:
        throw new ValidationError(`Provider "${provider}" not supported`);
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

    // Store state temporarily in accounting_oauth_states table
    const { error: insertError } = await supabase
      .from('accounting_oauth_states')
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

    console.log(`Accounting OAuth flow initiated for ${provider}`, { user_id: user.id });

    return new Response(
      JSON.stringify({ authUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'accounting-oauth-init',
      requestUrl: req.url,
      requestMethod: req.method
    });
    return handleError(error);
  }
});
