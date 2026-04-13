/**
 * Admin Cancel Failed Subscription
 *
 * Cancels a user's Stripe subscription immediately (admin-initiated),
 * marks the failed_payment_emails record as resolved, and clears the
 * subscribed flag on the user's profile.
 *
 * Used from the Failed Payments admin screen at final dunning stage when
 * the admin decides to pull the plug on behalf of the customer.
 *
 * Auth: JWT → profiles.admin_role check
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    const { data: profile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!profile || !['super_admin', 'admin'].includes(profile.admin_role)) {
      throw new Error('Admin access required');
    }

    const { recordId } = await req.json();
    if (!recordId) throw new Error('recordId is required');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Load the record
    const { data: record, error: recordErr } = await supabaseAdmin
      .from('failed_payment_emails')
      .select('*')
      .eq('id', recordId)
      .single();

    if (recordErr || !record) throw new Error('Failed payment record not found');
    if (!record.stripe_subscription_id) throw new Error('No Stripe subscription ID on this record');

    // Cancel in Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY not set');
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    let cancelledStatus = 'unknown';
    try {
      const cancelled = await stripe.subscriptions.cancel(record.stripe_subscription_id);
      cancelledStatus = cancelled.status;
    } catch (e) {
      // If the sub is already cancelled, Stripe returns an error — treat as success
      const msg = (e as Error).message || '';
      if (!msg.toLowerCase().includes('canceled') && !msg.toLowerCase().includes('cancelled')) {
        throw new Error(`Stripe cancel failed: ${msg}`);
      }
      cancelledStatus = 'already_canceled';
    }

    // Mark record resolved
    const { data: updatedRecord } = await supabaseAdmin
      .from('failed_payment_emails')
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq('id', recordId)
      .select('*')
      .single();

    // Clear profile subscription flags
    await supabaseAdmin
      .from('profiles')
      .update({
        subscribed: false,
        is_trial: false,
        is_trial_cancelled: true,
      })
      .eq('id', record.user_id);

    return new Response(
      JSON.stringify({
        success: true,
        stripeStatus: cancelledStatus,
        record: updatedRecord,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
