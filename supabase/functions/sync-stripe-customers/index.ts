/**
 * Sync Stripe Customers
 * Matches Stripe customers to Supabase users by email
 * Updates profiles with stripe_customer_id
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
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      status: 'active',
      limit: 100,
      expand: ['data.customer'],
    });

    console.log(`Found ${subscriptions.data.length} active subscriptions`);

    const results: any[] = [];
    let synced = 0;
    let alreadySynced = 0;
    let notFound = 0;

    for (const sub of subscriptions.data) {
      const customer = sub.customer as Stripe.Customer;

      if (!customer || customer.deleted || !customer.email) {
        console.log(`Skipping subscription ${sub.id} - no customer email`);
        continue;
      }

      const email = customer.email.toLowerCase();
      const customerId = customer.id;
      const customerName = customer.name || '';

      // Check if already synced
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, full_name, stripe_customer_id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (existingProfile) {
        alreadySynced++;
        continue;
      }

      // Find user by email in auth.users
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const authUser = usersData?.users?.find(
        (u: any) => u.email?.toLowerCase() === email
      );

      if (!authUser) {
        console.log(`No auth user found for email: ${email}`);
        notFound++;
        results.push({
          email,
          customerId,
          customerName,
          status: 'not_found',
          message: 'No matching user in Supabase auth',
        });
        continue;
      }

      // Update profile with stripe_customer_id
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          stripe_customer_id: customerId,
          subscribed: true,
          subscription_tier: 'founder', // They're on founder price
        })
        .eq('id', authUser.id);

      if (updateError) {
        console.error(`Error updating profile for ${email}:`, updateError);
        results.push({
          email,
          customerId,
          customerName,
          status: 'error',
          message: updateError.message,
        });
      } else {
        synced++;
        console.log(`✅ Synced ${email} -> ${customerId}`);
        results.push({
          email,
          customerId,
          customerName,
          status: 'synced',
        });
      }
    }

    const summary = {
      totalActiveSubscriptions: subscriptions.data.length,
      synced,
      alreadySynced,
      notFound,
      details: results,
    };

    console.log('Sync complete:', summary);

    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
