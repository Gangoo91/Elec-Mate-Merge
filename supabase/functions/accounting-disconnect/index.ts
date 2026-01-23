/**
 * Accounting Disconnect
 * Removes accounting integration and revokes tokens
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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

    // Delete OAuth tokens
    const { error: tokenError } = await supabase
      .from('accounting_oauth_tokens')
      .delete()
      .eq('user_id', user.id)
      .eq('provider', provider);

    if (tokenError) {
      console.error('Failed to delete accounting tokens:', tokenError);
    }

    // Update company_profiles to remove this integration
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('accounting_integrations')
      .eq('user_id', user.id)
      .single();

    if (profile?.accounting_integrations) {
      // Remove this provider's integration
      const integrations = profile.accounting_integrations.filter(
        (i: any) => i.provider !== provider
      );

      await supabase
        .from('company_profiles')
        .update({ accounting_integrations: integrations })
        .eq('user_id', user.id);
    }

    console.log(`Accounting disconnected`, { user_id: user.id, provider });

    return new Response(
      JSON.stringify({
        success: true,
        message: `${provider} disconnected successfully`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
