/**
 * Accounting OAuth Callback
 * Handles OAuth callback and exchanges code for tokens
 * Supports Xero, Sage, QuickBooks, and FreshBooks
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { encryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

// Provider credentials
const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');
const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const QUICKBOOKS_CLIENT_SECRET = Deno.env.get('QUICKBOOKS_CLIENT_SECRET');
const SAGE_CLIENT_ID = Deno.env.get('SAGE_CLIENT_ID');
const SAGE_CLIENT_SECRET = Deno.env.get('SAGE_CLIENT_SECRET');
const FRESHBOOKS_CLIENT_ID = Deno.env.get('FRESHBOOKS_CLIENT_ID');
const FRESHBOOKS_CLIENT_SECRET = Deno.env.get('FRESHBOOKS_CLIENT_SECRET');

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || 'https://elec-mate.com';

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

interface TenantInfo {
  tenantId: string;
  tenantName: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const realmId = url.searchParams.get('realmId'); // QuickBooks specific

    if (error) {
      throw new ValidationError(`OAuth error: ${error}`);
    }

    if (!code || !state) {
      throw new ValidationError('Missing code or state parameter');
    }

    // Use service role to verify state
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: stateData, error: stateError } = await supabase
      .from('accounting_oauth_states')
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

    const provider = stateData.provider as AccountingProvider;
    const userId = stateData.user_id;

    // Exchange code for tokens based on provider
    let tokenData: TokenResponse;
    let tenantInfo: TenantInfo | null = null;

    switch (provider) {
      case 'xero':
        tokenData = await withRetry(
          () => withTimeout(
            exchangeXeroCode(code),
            Timeouts.STANDARD,
            'Xero token exchange'
          ),
          RetryPresets.STANDARD
        );
        // Get Xero tenant info
        tenantInfo = await withRetry(
          () => withTimeout(
            getXeroTenants(tokenData.access_token),
            Timeouts.STANDARD,
            'Xero tenant fetch'
          ),
          RetryPresets.STANDARD
        );
        break;

      case 'quickbooks':
        tokenData = await withRetry(
          () => withTimeout(
            exchangeQuickBooksCode(code),
            Timeouts.STANDARD,
            'QuickBooks token exchange'
          ),
          RetryPresets.STANDARD
        );
        // QuickBooks provides realmId in callback
        if (realmId) {
          tenantInfo = await withRetry(
            () => withTimeout(
              getQuickBooksCompanyInfo(tokenData.access_token, realmId),
              Timeouts.STANDARD,
              'QuickBooks company fetch'
            ),
            RetryPresets.STANDARD
          );
        }
        break;

      case 'sage':
        tokenData = await withRetry(
          () => withTimeout(
            exchangeSageCode(code),
            Timeouts.STANDARD,
            'Sage token exchange'
          ),
          RetryPresets.STANDARD
        );
        tenantInfo = await withRetry(
          () => withTimeout(
            getSageBusinessInfo(tokenData.access_token),
            Timeouts.STANDARD,
            'Sage business fetch'
          ),
          RetryPresets.STANDARD
        );
        break;

      case 'freshbooks':
        tokenData = await withRetry(
          () => withTimeout(
            exchangeFreshBooksCode(code),
            Timeouts.STANDARD,
            'FreshBooks token exchange'
          ),
          RetryPresets.STANDARD
        );
        tenantInfo = await withRetry(
          () => withTimeout(
            getFreshBooksIdentity(tokenData.access_token),
            Timeouts.STANDARD,
            'FreshBooks identity fetch'
          ),
          RetryPresets.STANDARD
        );
        break;

      default:
        throw new ValidationError(`Provider "${provider}" not supported`);
    }

    // Encrypt tokens
    const encryptedAccessToken = await encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? await encryptToken(tokenData.refresh_token)
      : null;

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Store tokens in database (upsert)
    const { error: upsertError } = await supabase
      .from('accounting_oauth_tokens')
      .upsert({
        user_id: userId,
        provider,
        encrypted_access_token: encryptedAccessToken,
        encrypted_refresh_token: encryptedRefreshToken,
        token_expires_at: expiresAt.toISOString(),
        tenant_id: tenantInfo?.tenantId || realmId || null,
        tenant_name: tenantInfo?.tenantName || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,provider',
      });

    if (upsertError) {
      console.error('Failed to store accounting tokens:', upsertError);
      throw new Error('Failed to save accounting configuration');
    }

    // Update company_profiles with integration status
    const integration = {
      provider,
      status: 'connected',
      tenantId: tenantInfo?.tenantId || realmId || null,
      tenantName: tenantInfo?.tenantName || null,
      connectedAt: new Date().toISOString(),
      autoSyncEnabled: true,
    };

    // Get existing integrations and update
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('accounting_integrations')
      .eq('user_id', userId)
      .single();

    let integrations = profile?.accounting_integrations || [];

    // Remove existing integration for this provider if exists
    integrations = integrations.filter((i: any) => i.provider !== provider);
    integrations.push(integration);

    await supabase
      .from('company_profiles')
      .update({ accounting_integrations: integrations })
      .eq('user_id', userId);

    // Delete used state
    await supabase.from('accounting_oauth_states').delete().eq('state', state);

    console.log(`Accounting OAuth callback successful`, {
      user_id: userId,
      provider,
      tenant: tenantInfo?.tenantName,
    });

    // Redirect to settings business tab with success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/settings?tab=business&accounting=${provider}&success=true`,
      },
    });
  } catch (error) {
    console.error('Accounting OAuth callback error:', error);
    await captureException(error, {
      functionName: 'accounting-oauth-callback',
      requestUrl: req.url,
      requestMethod: req.method
    });
    // Redirect with error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/settings?tab=business&accounting_error=${encodeURIComponent((error as Error).message)}`,
      },
    });
  }
});

// Token exchange functions for each provider

async function exchangeXeroCode(code: string): Promise<TokenResponse> {
  const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

  const response = await fetch('https://identity.xero.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('Xero OAuth', { error });
  }

  return await response.json();
}

async function getXeroTenants(accessToken: string): Promise<TenantInfo> {
  const response = await fetch('https://api.xero.com/connections', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new ExternalAPIError('Xero Connections API', await response.text());
  }

  const tenants = await response.json();
  // Return first tenant (most users have one organisation)
  if (tenants.length > 0) {
    return {
      tenantId: tenants[0].tenantId,
      tenantName: tenants[0].tenantName,
    };
  }

  return { tenantId: '', tenantName: 'Unknown Organisation' };
}

async function exchangeQuickBooksCode(code: string): Promise<TokenResponse> {
  const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${QUICKBOOKS_CLIENT_ID}:${QUICKBOOKS_CLIENT_SECRET}`)}`,
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('QuickBooks OAuth', { error });
  }

  return await response.json();
}

async function getQuickBooksCompanyInfo(accessToken: string, realmId: string): Promise<TenantInfo> {
  const response = await fetch(
    `https://quickbooks.api.intuit.com/v3/company/${realmId}/companyinfo/${realmId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    // Return realmId as tenant if company info fails
    return { tenantId: realmId, tenantName: 'QuickBooks Company' };
  }

  const data = await response.json();
  return {
    tenantId: realmId,
    tenantName: data.CompanyInfo?.CompanyName || 'QuickBooks Company',
  };
}

async function exchangeSageCode(code: string): Promise<TokenResponse> {
  const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

  const response = await fetch('https://oauth.accounting.sage.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: SAGE_CLIENT_ID!,
      client_secret: SAGE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('Sage OAuth', { error });
  }

  return await response.json();
}

async function getSageBusinessInfo(accessToken: string): Promise<TenantInfo> {
  const response = await fetch('https://api.accounting.sage.com/v3.1/business', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return { tenantId: '', tenantName: 'Sage Business' };
  }

  const data = await response.json();
  return {
    tenantId: data.$key || '',
    tenantName: data.name || 'Sage Business',
  };
}

async function exchangeFreshBooksCode(code: string): Promise<TokenResponse> {
  const redirectUri = `${SUPABASE_URL}/functions/v1/accounting-oauth-callback`;

  const response = await fetch('https://api.freshbooks.com/auth/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: FRESHBOOKS_CLIENT_ID,
      client_secret: FRESHBOOKS_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new ExternalAPIError('FreshBooks OAuth', { error });
  }

  return await response.json();
}

async function getFreshBooksIdentity(accessToken: string): Promise<TenantInfo> {
  const response = await fetch('https://api.freshbooks.com/auth/api/v1/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return { tenantId: '', tenantName: 'FreshBooks Account' };
  }

  const data = await response.json();
  const businessMembership = data.response?.business_memberships?.[0];
  return {
    tenantId: businessMembership?.business?.id?.toString() || '',
    tenantName: businessMembership?.business?.name || 'FreshBooks Account',
  };
}
