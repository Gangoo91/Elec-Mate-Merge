/**
 * Get Stripe Connect Status
 * Checks if electrician's Stripe account is ready for payments
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Get profile with Stripe account ID
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status')
      .eq('user_id', user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return new Response(
        JSON.stringify({
          connected: false,
          status: 'not_connected',
          chargesEnabled: false,
          payoutsEnabled: false,
          detailsSubmitted: false,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Retrieve account from Stripe
    const account = await stripe.accounts.retrieve(profile.stripe_account_id);

    // Determine status
    let status = 'pending';
    if (account.charges_enabled && account.payouts_enabled) {
      status = 'active';
    } else if (account.requirements?.disabled_reason) {
      status = 'restricted';
    }

    // Update status in database if changed
    if (status !== profile.stripe_account_status) {
      await supabase
        .from('company_profiles')
        .update({ stripe_account_status: status })
        .eq('user_id', user.id);
    }

    return new Response(
      JSON.stringify({
        connected: true,
        status,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        accountId: profile.stripe_account_id,
        requirements: account.requirements?.currently_due || [],
        disabledReason: account.requirements?.disabled_reason || null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Error getting Stripe Connect status:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
