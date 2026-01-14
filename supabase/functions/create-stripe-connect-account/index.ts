/**
 * Create Stripe Connect Account
 * Creates an Express account for electricians and returns onboarding URL
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
    console.log('🚀 Starting create-stripe-connect-account function');

    // Check environment variables first
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const appUrl = Deno.env.get('APP_URL') || 'https://elec-mate.com';

    console.log('🔧 Environment check:', {
      hasStripeKey: !!stripeKey,
      stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 10) + '...' : 'MISSING',
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseAnonKey: !!supabaseAnonKey,
      appUrl
    });

    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }),
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

    console.log('🔐 Auth header present, creating Supabase client...');

    const supabase = createClient(
      supabaseUrl!,
      supabaseAnonKey!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log('👤 Auth result:', {
      hasUser: !!user,
      userId: user?.id,
      authError: authError?.message
    });

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: authError?.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📱 Fetching profile for user: ${user.id}`);

    // Check if user has a company profile
    const { data: profiles, error: profileError } = await supabase
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status, company_name, company_email')
      .eq('user_id', user.id)
      .limit(1);

    console.log('📋 Profile query result:', {
      hasProfiles: !!profiles,
      profileCount: profiles?.length,
      profileError: profileError?.message,
      firstProfile: profiles?.[0] ? {
        hasStripeId: !!profiles[0].stripe_account_id,
        status: profiles[0].stripe_account_status,
        name: profiles[0].company_name
      } : null
    });

    if (profileError) {
      return new Response(
        JSON.stringify({ error: 'Error fetching profile', details: profileError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const profile = profiles?.[0] || null;

    // If no profile, user needs to create one first
    if (!profile) {
      return new Response(
        JSON.stringify({
          error: 'Please complete your company profile first before connecting Stripe.',
          action: 'Go to Settings > Company Profile'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If already has an active account, return dashboard link
    if (profile.stripe_account_id && profile.stripe_account_status === 'active') {
      console.log('📊 User has active Stripe account, creating login link...');

      const loginResponse = await fetch(`https://api.stripe.com/v1/accounts/${profile.stripe_account_id}/login_links`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const loginData = await loginResponse.json();
      console.log('🔗 Login link response:', { ok: loginResponse.ok, hasUrl: !!loginData.url });

      if (!loginResponse.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to create Stripe dashboard link', details: loginData.error?.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          url: loginData.url,
          type: 'dashboard',
          message: 'Stripe account already connected'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If pending account exists, create new onboarding link
    if (profile.stripe_account_id) {
      console.log('🔄 User has pending Stripe account, creating onboarding link...');

      const linkParams = new URLSearchParams();
      linkParams.append('account', profile.stripe_account_id);
      linkParams.append('refresh_url', `${appUrl}/electrician/settings?tab=billing&refresh=true`);
      linkParams.append('return_url', `${appUrl}/electrician/settings?tab=billing&success=true`);
      linkParams.append('type', 'account_onboarding');

      const linkResponse = await fetch('https://api.stripe.com/v1/account_links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: linkParams.toString(),
      });

      const linkData = await linkResponse.json();
      console.log('🔗 Account link response:', { ok: linkResponse.ok, hasUrl: !!linkData.url });

      if (!linkResponse.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to create onboarding link', details: linkData.error?.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          url: linkData.url,
          type: 'onboarding',
          accountId: profile.stripe_account_id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create new Express account
    console.log('🆕 Creating new Stripe Express account...');

    const accountParams = new URLSearchParams();
    accountParams.append('type', 'express');
    accountParams.append('country', 'GB');
    accountParams.append('email', profile.company_email || user.email || '');
    accountParams.append('business_type', 'individual');
    accountParams.append('capabilities[card_payments][requested]', 'true');
    accountParams.append('capabilities[transfers][requested]', 'true');
    accountParams.append('business_profile[name]', profile.company_name || 'Electrical Contractor');
    accountParams.append('business_profile[mcc]', '1711');
    accountParams.append('metadata[user_id]', user.id);
    accountParams.append('metadata[platform]', 'elecmate');

    console.log('📤 Account creation params:', accountParams.toString());

    const accountResponse = await fetch('https://api.stripe.com/v1/accounts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: accountParams.toString(),
    });

    const accountData = await accountResponse.json();
    console.log('💳 Account creation response:', {
      ok: accountResponse.ok,
      accountId: accountData.id,
      error: accountData.error?.message
    });

    if (!accountResponse.ok) {
      // Check if this is a platform profile/review error
      const errorMessage = accountData.error?.message || '';
      const isPlatformReviewError =
        errorMessage.includes('platform profile') ||
        errorMessage.includes('questionnaire') ||
        errorMessage.includes('review');

      if (isPlatformReviewError) {
        return new Response(
          JSON.stringify({
            error: 'Card payments coming soon! Our payment system is being set up and will be available shortly.',
            details: 'Platform under review',
            isPlatformSetup: true
          }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          error: 'Failed to create Stripe account',
          details: accountData.error?.message,
          stripeError: accountData.error
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Stripe account created: ${accountData.id}`);

    // Save account ID to database
    const { error: updateError } = await supabase
      .from('company_profiles')
      .update({
        stripe_account_id: accountData.id,
        stripe_account_status: 'pending',
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('⚠️ Error updating profile (non-fatal):', updateError);
    }

    // Create onboarding link
    console.log('🔗 Creating onboarding link...');

    const onboardingParams = new URLSearchParams();
    onboardingParams.append('account', accountData.id);
    onboardingParams.append('refresh_url', `${appUrl}/electrician/settings?tab=billing&refresh=true`);
    onboardingParams.append('return_url', `${appUrl}/electrician/settings?tab=billing&success=true`);
    onboardingParams.append('type', 'account_onboarding');

    const onboardingResponse = await fetch('https://api.stripe.com/v1/account_links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: onboardingParams.toString(),
    });

    const onboardingData = await onboardingResponse.json();
    console.log('🔗 Onboarding link response:', { ok: onboardingResponse.ok, hasUrl: !!onboardingData.url });

    if (!onboardingResponse.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to create onboarding link',
          details: onboardingData.error?.message,
          accountId: accountData.id // Return the account ID so we know it was created
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🎉 Success! Returning onboarding URL');

    return new Response(
      JSON.stringify({
        url: onboardingData.url,
        type: 'onboarding',
        accountId: accountData.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Unexpected error:', error.message);
    console.error('❌ Stack:', error.stack);

    return new Response(
      JSON.stringify({
        error: error.message || 'Unknown error',
        type: error.name,
        stack: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
