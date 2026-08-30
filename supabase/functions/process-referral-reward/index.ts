import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.14.0';
import { captureException } from '../_shared/sentry.ts';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import {
  liveMonthlyPence,
  referralCreditPence,
  tierMonthlyPence,
} from '../_shared/referral-reward.ts';

/**
 * Pay a store-billed referrer with a one-time free-month promo code.
 *
 * Codes live in referral_store_codes (Apple offer codes / Play promo codes,
 * imported quarterly — Apple's expire every quarter end). The referrer's
 * store comes from their latest billing_events row; the code tier matches
 * their plan. Returns false when no code could be issued — the caller then
 * falls back to the legacy 'pending' IOU.
 */
async function issueStoreCode(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  args: { referrerId: string; referralId: string; referrerTier: string | null }
): Promise<boolean> {
  const tierRaw = (args.referrerTier ?? '').trim().toLowerCase();
  const tier = tierRaw.startsWith('apprentice')
    ? 'apprentice'
    : tierRaw.startsWith('electrician')
      ? 'electrician'
      : null;
  if (!tier) return false;

  const { data: lastEvent } = await supabase
    .from('billing_events')
    .select('store')
    .eq('user_id', args.referrerId)
    .not('store', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const store = lastEvent?.store;
  if (store !== 'APP_STORE' && store !== 'PLAY_STORE') return false;

  const { data: au } = await supabase.auth.admin.getUserById(args.referrerId);
  const email = au?.user?.email;
  if (!email) return false;
  const { data: suppressed } = await supabase
    .from('email_suppressions')
    .select('email')
    .eq('email', email.toLowerCase())
    .limit(1);
  if (suppressed && suppressed.length > 0) return false;

  // Optimistic allocation — two attempts covers the realistic race window.
  let code: { code: string; expires_at: string } | null = null;
  for (let attempt = 0; attempt < 2 && !code; attempt++) {
    const { data: candidate } = await supabase
      .from('referral_store_codes')
      .select('code, expires_at')
      .eq('store', store)
      .eq('tier', tier)
      .eq('status', 'available')
      .gte('expires_at', new Date().toISOString().slice(0, 10))
      .order('expires_at', { ascending: true })
      .limit(1)
      .maybeSingle();
    if (!candidate) return false;
    const { data: claimed } = await supabase
      .from('referral_store_codes')
      .update({
        status: 'assigned',
        assigned_user_id: args.referrerId,
        referral_id: args.referralId,
        assigned_at: new Date().toISOString(),
      })
      .eq('code', candidate.code)
      .eq('status', 'available')
      .select('code, expires_at')
      .maybeSingle();
    if (claimed) code = claimed;
  }
  if (!code) return false;

  const redeemUrl =
    store === 'APP_STORE'
      ? `https://apps.apple.com/redeem?ctx=offercodes&id=6758948665&code=${code.code}`
      : `https://play.google.com/redeem?code=${code.code}`;
  const storeName = store === 'APP_STORE' ? 'the App Store' : 'Google Play';
  const expires = new Date(code.expires_at + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });

  const { data: prof } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', args.referrerId)
    .maybeSingle();
  const firstName = (prof?.full_name ?? '').trim().split(/\s+/)[0] ?? '';

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      <p style="margin:0 0 14px;">Hi${firstName ? ` ${firstName}` : ''},</p>
      <p style="margin:0 0 14px;">Your mate just subscribed to Elec-Mate — so here&rsquo;s your free month, as promised.</p>
      <p style="margin:0 0 6px;">Because you subscribe through ${storeName}, it comes as a one-time code:</p>
      <p style="margin:0 0 14px; font-size:22px; font-weight:700; letter-spacing:0.08em;">${code.code}</p>
      <p style="margin:0 0 18px;"><a href="${redeemUrl}" style="display:inline-block; padding:12px 22px; background-color:#facc15; color:#111111; text-decoration:none; font-weight:700; border-radius:10px;">Redeem your free month</a></p>
      <p style="margin:0 0 14px; color:#555555; font-size:13.5px;">One tap on your phone applies it to your subscription. It needs redeeming by ${expires} — after that Apple and Google kill the code, so don&rsquo;t sit on it.</p>
      <p style="margin:0;">Cheers, and thanks for spreading the word.<br/>Andrew<br/><span style="color:#555555; font-size:13px;">Founder, Elec-Mate</span></p>
    </div>`;

  const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
  const { error: mailErr } = await resend.emails.send({
    from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
    to: email,
    subject: firstName ? `${firstName} — your free month is here` : 'Your free month is here',
    html,
    text: htmlToPlainText(html),
  });
  if (mailErr) {
    // Release the code so the reward falls back to pending rather than
    // burning a code nobody received.
    await supabase
      .from('referral_store_codes')
      .update({ status: 'available', assigned_user_id: null, referral_id: null, assigned_at: null })
      .eq('code', code.code);
    console.warn('[process-referral-reward] code email failed, released code:', mailErr.message);
    return false;
  }
  return true;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
      .select('referred_by, subscription_tier, stripe_customer_id')
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

    // Reward value = one month free, capped at what the referral actually
    // brought in: min(referrer's month, referee's month). An employer referring
    // an apprentice earns £6.99 of MRR, so £6.99 is the credit — it used to pay
    // £49.99 off the referrer's tier string alone. The live subscription is
    // preferred over that string because the string lies (founders on £3.99/mo
    // carry tier 'employer'). Computed before the Stripe check so the pending
    // App Store / Play Store path banks the right amount too.
    const [referrerMonthly, refereeMonthly] = await Promise.all([
      liveMonthlyPence(stripe, referrerProfile?.stripe_customer_id).then(
        (live) => live ?? tierMonthlyPence(referrerProfile?.subscription_tier)
      ),
      liveMonthlyPence(stripe, profile.stripe_customer_id).then(
        (live) => live ?? tierMonthlyPence(profile.subscription_tier)
      ),
    ]);
    const creditPence = referralCreditPence(referrerMonthly, refereeMonthly);

    console.log('[process-referral-reward] Credit sized', {
      referrerMonthly,
      refereeMonthly,
      creditPence,
    });

    if (!referrerProfile?.stripe_customer_id) {
      // No Stripe customer — the referrer is billed by Apple or Google, so a
      // Stripe balance credit is impossible. Pay them with a one-time store
      // promo code instead (referral_store_codes, imported per quarter). Only
      // if no code can be issued does the reward fall back to the old
      // 'pending' IOU for manual payout.
      const successfulReferrals = (referrerProfile?.successful_referrals || 0) + 1;
      await supabase
        .from('profiles')
        .update({
          successful_referrals: successfulReferrals,
          total_referrals: successfulReferrals,
        })
        .eq('id', profile.referred_by);

      const issued = await issueStoreCode(supabase, {
        referrerId: profile.referred_by,
        referralId: referralRow.id,
        referrerTier: referrerProfile?.subscription_tier ?? null,
      });

      if (!issued) {
        console.log('[process-referral-reward] No store code available, storing as pending');
        await supabase.from('referral_rewards').insert({
          user_id: profile.referred_by,
          referral_id: referralRow.id,
          reward_type: 'credit',
          amount_pence: creditPence,
          status: 'pending',
        });
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

      await supabase.from('referral_rewards').insert({
        user_id: profile.referred_by,
        referral_id: referralRow.id,
        reward_type: 'store_code',
        amount_pence: creditPence,
        status: 'applied',
        applied_at: new Date().toISOString(),
      });
      await supabase
        .from('referrals')
        .update({ status: 'rewarded', updated_at: new Date().toISOString() })
        .eq('id', referralRow.id);
      await supabase.from('user_notifications').insert({
        user_id: profile.referred_by,
        type: 'referral_reward',
        title: 'Referral reward — free month!',
        message: `Your mate just subscribed! A free-month code is on its way to your email.`,
        metadata: { referral_id: referralRow.id, referred_user_id, reward: 'store_code' },
        is_read: false,
      });

      console.log('[process-referral-reward] Store code issued for referrer');
      return new Response(
        JSON.stringify({ success: true, reward_applied: true, reward: 'store_code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Calculate reward — 1 free month per successful referral.
    // The 2-referral cap was removed for the August Referral Race: the campaign
    // promises "every mate who subscribes is a free month for both of you", and
    // a cap silently paid nothing from the third mate onwards — exactly the
    // people the race is trying to create.
    const successfulReferrals = (referrerProfile.successful_referrals || 0) + 1;

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
      await supabase.from('user_notifications').insert({
        user_id: profile.referred_by,
        type: 'referral_reward',
        title: 'Referral Reward!',
        message: `Your mate just subscribed! ${creditFormatted} credit has been applied to your account.`,
        metadata: {
          referral_id: referralRow.id,
          credit_pence: creditPence,
          referred_user_id,
        },
        is_read: false,
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
    await captureException(err, { functionName: 'process-referral-reward', requestUrl: req.url, requestMethod: req.method });
    console.error('[process-referral-reward] Error:', (err as Error)?.message);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
