import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.14.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * process-referral-reward
 *
 * Standalone edge function to process referral rewards for a user who just subscribed.
 * Called from:
 *   - CheckoutTrial.tsx after successful RevenueCat/native purchase
 *   - Can also be called manually for backfills
 *
 * The Stripe webhook has its own inline referral logic for web subscriptions.
 * This function handles native (App Store / Google Play) subscriptions.
 *
 * Input: { referred_user_id: string }
 * Output: { success: boolean, reward_applied?: boolean, credit_pence?: number }
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Auth: verify the caller is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { referred_user_id } = await req.json();
    if (!referred_user_id) {
      return new Response(JSON.stringify({ error: 'referred_user_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[process-referral-reward] Processing for user:', referred_user_id);

    // 1. Check if this user was referred
    const { data: profile } = await supabase
      .from('profiles')
      .select('referred_by, subscription_tier')
      .eq('id', referred_user_id)
      .single();

    if (!profile?.referred_by) {
      console.log('[process-referral-reward] User was not referred, skipping');
      return new Response(
        JSON.stringify({ success: true, reward_applied: false, reason: 'not_referred' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Find the referral row (pending or signed_up)
    const { data: referralRow } = await supabase
      .from('referrals')
      .update({ status: 'subscribed', updated_at: new Date().toISOString() })
      .eq('referred_id', referred_user_id)
      .eq('referrer_id', profile.referred_by)
      .in('status', ['pending', 'signed_up'])
      .select('id')
      .maybeSingle();

    if (!referralRow) {
      console.log(
        '[process-referral-reward] No eligible referral row found (already rewarded or missing)'
      );
      return new Response(
        JSON.stringify({ success: true, reward_applied: false, reason: 'no_eligible_referral' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[process-referral-reward] Found referral row:', referralRow.id);

    // 3. Get referrer's Stripe customer ID and stats
    const { data: referrerProfile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, successful_referrals, referral_credits_pence, subscription_tier')
      .eq('id', profile.referred_by)
      .single();

    if (!referrerProfile?.stripe_customer_id) {
      // Referrer doesn't have a Stripe customer — store reward as pending
      console.log('[process-referral-reward] Referrer has no Stripe customer, storing as pending');
      await supabase.from('referral_rewards').insert({
        user_id: profile.referred_by,
        referral_id: referralRow.id,
        reward_type: 'credit',
        amount_pence: 1299, // Default to electrician monthly price
        status: 'pending',
      });

      // Still update stats
      const successfulReferrals = (referrerProfile?.successful_referrals || 0) + 1;
      await supabase
        .from('profiles')
        .update({
          successful_referrals: successfulReferrals,
          total_referrals: successfulReferrals,
        })
        .eq('id', profile.referred_by);

      return new Response(
        JSON.stringify({
          success: true,
          reward_applied: false,
          reason: 'referrer_no_stripe',
          pending: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Calculate reward — 1 free month per successful referral, capped at 2
    const successfulReferrals = (referrerProfile.successful_referrals || 0) + 1;

    // Cap: max 2 free months total per referrer
    if (successfulReferrals > 2) {
      console.log(
        '[process-referral-reward] Referrer already claimed 2 free months, no more credit'
      );

      // Still update stats and mark as rewarded (for social proof)
      await supabase
        .from('referrals')
        .update({ status: 'rewarded', updated_at: new Date().toISOString() })
        .eq('id', referralRow.id);
      await supabase
        .from('profiles')
        .update({
          successful_referrals: successfulReferrals,
          total_referrals: successfulReferrals,
        })
        .eq('id', profile.referred_by);

      return new Response(
        JSON.stringify({ success: true, reward_applied: false, reason: 'cap_reached' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine credit amount based on referrer's own subscription price
    const tierPrices: Record<string, number> = {
      apprentice: 599,
      apprentice_yearly: 599,
      electrician: 1299,
      electrician_yearly: 1299,
      business_ai: 2999,
      business_ai_yearly: 2999,
      employer: 2999,
      employer_yearly: 2999,
    };
    const creditPence = tierPrices[referrerProfile.subscription_tier || ''] || 1299;

    // 5. Apply Stripe balance credit
    try {
      const balanceTx = await stripe.customers.createBalanceTransaction(
        referrerProfile.stripe_customer_id,
        {
          amount: -creditPence, // Negative = credit
          currency: 'gbp',
          description: `Referral reward: 1 free month credit`,
          metadata: {
            referral_id: referralRow.id,
            referred_user_id,
          },
        }
      );

      console.log(
        '[process-referral-reward] Stripe balance credit applied:',
        balanceTx.id,
        creditPence
      );

      // 6. Create referral_rewards audit row
      await supabase.from('referral_rewards').insert({
        user_id: profile.referred_by,
        referral_id: referralRow.id,
        reward_type: 'credit',
        amount_pence: creditPence,
        stripe_credit_note_id: balanceTx.id,
        status: 'applied',
        applied_at: new Date().toISOString(),
      });

      // 7. Update referral status to 'rewarded'
      await supabase
        .from('referrals')
        .update({ status: 'rewarded', updated_at: new Date().toISOString() })
        .eq('id', referralRow.id);

      // 8. Update referrer's profile stats
      await supabase
        .from('profiles')
        .update({
          successful_referrals: successfulReferrals,
          total_referrals: successfulReferrals,
          referral_credits_pence: (referrerProfile.referral_credits_pence || 0) + creditPence,
        })
        .eq('id', profile.referred_by);

      // 9. In-app notification for referrer
      const creditFormatted = `£${(creditPence / 100).toFixed(2)}`;
      await supabase.from('notifications').insert({
        user_id: profile.referred_by,
        type: 'referral_reward',
        title: 'Referral Reward!',
        message: `Your mate just subscribed! ${creditFormatted} credit has been applied to your account.`,
        data: {
          referral_id: referralRow.id,
          credit_pence: creditPence,
          referred_user_id,
        },
        read: false,
      });

      console.log('[process-referral-reward] Complete. Referrer credited:', creditFormatted);

      return new Response(
        JSON.stringify({
          success: true,
          reward_applied: true,
          credit_pence: creditPence,
          balance_tx_id: balanceTx.id,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (stripeErr: unknown) {
      console.error(
        '[process-referral-reward] Stripe credit failed:',
        (stripeErr as Error)?.message
      );

      // Store as pending so it can be retried
      await supabase.from('referral_rewards').insert({
        user_id: profile.referred_by,
        referral_id: referralRow.id,
        reward_type: 'credit',
        amount_pence: creditPence,
        status: 'failed',
      });

      return new Response(JSON.stringify({ success: false, error: 'stripe_credit_failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (err: unknown) {
    console.error('[process-referral-reward] Error:', (err as Error)?.message);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
