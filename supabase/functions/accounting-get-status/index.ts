/**
 * Accounting Get Status
 * Returns the status of all accounting integrations for the current user
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Use service role for database operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get company profile with integrations
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('accounting_integrations')
      .eq('user_id', user.id)
      .single();

    // Get token expiry info for connected providers
    const { data: tokens } = await supabase
      .from('accounting_oauth_tokens')
      .select('provider, token_expires_at, tenant_id, tenant_name, updated_at')
      .eq('user_id', user.id);

    // Build status response
    const integrations = profile?.accounting_integrations || [];

    // Enrich integrations with token status
    const enrichedIntegrations = integrations.map((integration: any) => {
      const token = tokens?.find((t: any) => t.provider === integration.provider);

      if (token) {
        const isExpired = new Date(token.token_expires_at) < new Date();
        // Only mark as error if token is expired AND there's no refresh token
        // If we have a refresh token, the sync will auto-refresh - so still show as connected
        const hasRefreshToken = !!token.encrypted_refresh_token;
        const shouldMarkError = isExpired && !hasRefreshToken;

        return {
          ...integration,
          tenantId: token.tenant_id,
          tenantName: token.tenant_name,
          tokenExpired: isExpired,
          canAutoRefresh: hasRefreshToken,
          status: shouldMarkError ? 'error' : integration.status,
          error: shouldMarkError ? 'Session expired - please reconnect' : undefined,
        };
      }

      return integration;
    });

    return new Response(
      JSON.stringify({
        integrations: enrichedIntegrations,
        hasConnectedProvider: enrichedIntegrations.some((i: any) => i.status === 'connected'),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
