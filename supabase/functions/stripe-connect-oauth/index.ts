/**
 * Stripe Connect OAuth
 * Allows users with existing Stripe accounts to connect via OAuth
 * This is MUCH faster than Express account creation
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Try multiple possible secret names
    const stripeClientId = Deno.env.get('STRIPE_CLIENT_ID') || Deno.env.get('STRIPE_CONNECT_CLIENT_ID');
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    console.log('🔍 Checking env vars:', {
      hasClientId: !!stripeClientId,
      hasSecretKey: !!stripeSecretKey,
      clientIdPrefix: stripeClientId?.substring(0, 5),
    });

    if (!stripeClientId) {
      console.error('❌ STRIPE_CLIENT_ID not found in env');
      return new Response(
        JSON.stringify({ error: 'STRIPE_CLIENT_ID not configured. Add it in Supabase Dashboard > Edge Functions > Secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await req.json().catch(() => ({}));
    const { action, code, returnUrl } = body;

    // Check if user already has a connected account
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status')
      .eq('user_id', user.id)
      .single();

    if (profile?.stripe_account_status === 'active') {
      return new Response(
        JSON.stringify({
          error: 'Stripe account already connected',
          status: 'active'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ACTION: Get OAuth authorization URL
    if (action === 'get_oauth_url' || !code) {
      const baseUrl = returnUrl || 'https://www.elec-mate.com/electrician/invoices';

      // Build OAuth authorization URL
      const params = new URLSearchParams({
        client_id: stripeClientId,
        response_type: 'code',
        scope: 'read_write',
        redirect_uri: `${supabaseUrl}/functions/v1/stripe-connect-oauth-callback`,
        state: JSON.stringify({
          user_id: user.id,
          return_url: baseUrl
        }),
      });

      const oauthUrl = `https://connect.stripe.com/oauth/authorize?${params.toString()}`;

      console.log('🔗 Generated OAuth URL for user:', user.id);

      return new Response(
        JSON.stringify({
          url: oauthUrl,
          type: 'oauth'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ACTION: Exchange authorization code for account
    if (action === 'exchange_code' && code) {
      if (!stripeSecretKey) {
        return new Response(
          JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Exchange authorization code for access token and account ID
      const tokenResponse = await fetch('https://connect.stripe.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_secret: stripeSecretKey,
          code: code,
          grant_type: 'authorization_code',
        }).toString(),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        console.error('❌ OAuth token exchange failed:', tokenData.error_description);
        return new Response(
          JSON.stringify({
            error: tokenData.error_description || 'Failed to connect Stripe account',
            details: tokenData.error
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const stripeAccountId = tokenData.stripe_user_id;
      console.log('✅ OAuth successful, account ID:', stripeAccountId);

      // Verify the account has charges enabled
      const accountResponse = await fetch(`https://api.stripe.com/v1/accounts/${stripeAccountId}`, {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
        },
      });

      const accountData = await accountResponse.json();

      let status = 'pending';
      if (accountData.charges_enabled && accountData.payouts_enabled) {
        status = 'active';
      }

      console.log('🏦 Account status:', {
        charges_enabled: accountData.charges_enabled,
        payouts_enabled: accountData.payouts_enabled,
        status
      });

      // Save to database
      const { error: updateError } = await supabase
        .from('company_profiles')
        .update({
          stripe_account_id: stripeAccountId,
          stripe_account_status: status,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('❌ Failed to save account:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to save Stripe account' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          accountId: stripeAccountId,
          status,
          chargesEnabled: accountData.charges_enabled,
          payoutsEnabled: accountData.payouts_enabled,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
