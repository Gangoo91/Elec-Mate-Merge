/**
 * Stripe Connect OAuth Callback
 * Handles the redirect from Stripe after user authorizes
 * Exchanges code for account and redirects back to app
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { captureException } from '../_shared/sentry.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const stateParam = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    // Parse state to get user_id and return_url
    let state: { user_id?: string; return_url?: string } = {};
    try {
      state = stateParam ? JSON.parse(stateParam) : {};
    } catch {
      state = {};
    }

    const returnUrl = state.return_url || 'https://www.elec-mate.com/electrician/invoices';
    const separator = returnUrl.includes('?') ? '&' : '?';

    // Handle errors from Stripe
    if (error) {
      console.error('❌ OAuth error from Stripe:', error, errorDescription);
      return Response.redirect(`${returnUrl}${separator}stripe=error&message=${encodeURIComponent(errorDescription || error)}`, 302);
    }

    if (!code) {
      console.error('❌ No authorization code received');
      return Response.redirect(`${returnUrl}${separator}stripe=error&message=No authorization code`, 302);
    }

    if (!state.user_id) {
      console.error('❌ No user_id in state');
      return Response.redirect(`${returnUrl}${separator}stripe=error&message=Invalid state`, 302);
    }

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!stripeSecretKey) {
      return Response.redirect(`${returnUrl}${separator}stripe=error&message=Stripe not configured`, 302);
    }

    // Exchange authorization code for access token and account ID
    console.log('🔄 Exchanging OAuth code for account...');

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
      console.error('❌ Token exchange failed:', tokenData.error_description);
      return Response.redirect(
        `${returnUrl}${separator}stripe=error&message=${encodeURIComponent(tokenData.error_description || 'Failed to connect')}`,
        302
      );
    }

    const stripeAccountId = tokenData.stripe_user_id;
    console.log('✅ Got Stripe account ID:', stripeAccountId);

    // Verify the account status
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

    console.log('🏦 Account status:', status, {
      charges_enabled: accountData.charges_enabled,
      payouts_enabled: accountData.payouts_enabled,
    });

    // Use service role to update database (callback doesn't have user auth)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from('company_profiles')
      .update({
        stripe_account_id: stripeAccountId,
        stripe_account_status: status,
      })
      .eq('user_id', state.user_id);

    if (updateError) {
      console.error('❌ Database update failed:', updateError);
      return Response.redirect(
        `${returnUrl}${separator}stripe=error&message=Failed to save account`,
        302
      );
    }

    console.log('✅ Successfully connected Stripe account for user:', state.user_id);

    // Redirect back to app with success
    return Response.redirect(`${returnUrl}${separator}stripe=success`, 302);

  } catch (error: any) {
    console.error('❌ Callback error:', error);
    await captureException(error, {
      functionName: 'stripe-connect-oauth-callback',
      requestUrl: req.url,
      requestMethod: req.method
    });

    // Try to redirect with error, fallback to default URL
    const fallbackUrl = 'https://www.elec-mate.com/electrician/invoices';
    return Response.redirect(`${fallbackUrl}?stripe=error&message=${encodeURIComponent(error.message)}`, 302);
  }
});
