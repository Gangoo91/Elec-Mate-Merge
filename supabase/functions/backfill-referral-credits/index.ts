import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.14.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * One-off backfill: Apply pending referral_rewards as Stripe balance credits.
 * Finds all referral_rewards with status='pending' where the user has a stripe_customer_id,
 * creates the Stripe balance transaction, and marks as 'applied'.
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Find all pending rewards with a Stripe customer
    const { data: pendingRewards, error: fetchErr } = await supabase
      .from('referral_rewards')
      .select('id, user_id, referral_id, amount_pence')
      .eq('status', 'pending');

    if (fetchErr) throw fetchErr;
    if (!pendingRewards?.length) {
      return new Response(JSON.stringify({ message: 'No pending rewards', count: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = [];

    for (const reward of pendingRewards) {
      // Get user's stripe customer ID
      const { data: profile } = await supabase
        .from('profiles')
        .select('stripe_customer_id, full_name')
        .eq('id', reward.user_id)
        .single();

      if (!profile?.stripe_customer_id) {
        results.push({ id: reward.id, user: profile?.full_name, status: 'skipped_no_stripe' });
        continue;
      }

      try {
        const balanceTx = await stripe.customers.createBalanceTransaction(
          profile.stripe_customer_id,
          {
            amount: -reward.amount_pence,
            currency: 'gbp',
            description: `Referral reward backfill: £${(reward.amount_pence / 100).toFixed(2)} credit`,
            metadata: { referral_reward_id: reward.id, referral_id: reward.referral_id },
          }
        );

        await supabase
          .from('referral_rewards')
          .update({
            status: 'applied',
            stripe_credit_note_id: balanceTx.id,
            applied_at: new Date().toISOString(),
          })
          .eq('id', reward.id);

        results.push({
          id: reward.id,
          user: profile.full_name,
          amount: reward.amount_pence,
          status: 'applied',
          tx: balanceTx.id,
        });
      } catch (stripeErr: unknown) {
        results.push({
          id: reward.id,
          user: profile.full_name,
          status: 'failed',
          error: (stripeErr as Error)?.message,
        });
      }
    }

    return new Response(JSON.stringify({ results, count: results.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    return new Response(JSON.stringify({ error: (err as Error)?.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
