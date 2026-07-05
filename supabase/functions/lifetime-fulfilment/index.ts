/**
 * Lifetime purchase auto-fulfilment (ELE-1253 loop, automated Jul 2026).
 *
 * Polls Stripe every 15 minutes (pg_cron) for completed checkout sessions on
 * the £300 lifetime payment link and, for each new one:
 *   1. Records it in lifetime_purchases (session id = idempotency key)
 *   2. Matches the buyer to a profile by checkout email
 *   3. Cancels their active Stripe subscription(s) at period end
 *   4. Grants lifetime access (free_access_granted, never expires) with the
 *      "lifetime" reason convention the admin panel counts on
 *   5. Emails Andrew — fulfilled automatically, or flagged for manual match
 *      (email mismatch / native App Store sub that only the user can cancel)
 *
 * Poll-based rather than a webhook branch so the shared
 * stripe-subscription-webhook doesn't need touching.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const LIFETIME_PAYMENT_LINK_ID = 'plink_1TdVTV2RKw5t5RAmrj3CgMmH';
const NOTIFY_EMAIL = 'andrewgangoo91@gmail.com';
const FROM = 'Elec-Mate <info@elec-mate.com>';
const LIFETIME_REASON = 'Lifetime purchase (£300 one-off, Jul 2026 campaign) — auto-fulfilled';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });
    const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '');

    // Completed sessions on the lifetime payment link, last 7 days
    const since = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const sessions = await stripe.checkout.sessions.list({
      payment_link: LIFETIME_PAYMENT_LINK_ID,
      created: { gte: since },
      limit: 100,
    });

    const stats = { seen: 0, fulfilled: 0, needs_manual: 0, already_processed: 0 };

    for (const session of sessions.data) {
      if (session.status !== 'complete' || session.payment_status !== 'paid') continue;
      stats.seen++;

      const email = (session.customer_details?.email ?? '').toLowerCase().trim();

      // Idempotency: the unique session id insert is the claim
      const { error: claimErr } = await supabase.from('lifetime_purchases').insert({
        stripe_session_id: session.id,
        email,
        amount_pence: session.amount_total,
        status: 'pending',
      });
      if (claimErr) {
        stats.already_processed++;
        continue;
      }

      // Match buyer to a profile by auth email
      const { data: authEmails } = await supabase.rpc('get_auth_user_emails');
      const match = (authEmails || []).find(
        (u: { id: string; email: string | null }) => (u.email ?? '').toLowerCase() === email
      );

      if (!match) {
        stats.needs_manual++;
        await supabase
          .from('lifetime_purchases')
          .update({
            status: 'needs_manual',
            notes: 'No account matches the checkout email — match and fulfil manually.',
          })
          .eq('stripe_session_id', session.id);

        await resend.emails.send({
          from: FROM,
          to: NOTIFY_EMAIL,
          subject: `💷 Lifetime purchase — MANUAL MATCH NEEDED (${email})`,
          html: `<p>Someone paid <strong>£${((session.amount_total ?? 0) / 100).toFixed(2)}</strong> for lifetime access but <strong>${email}</strong> doesn't match any account email.</p><p>Find their account, cancel any subscription, and set free access (never expires) with a reason containing "lifetime".</p><p>Stripe session: ${session.id}</p>`,
        });
        continue;
      }

      // Cancel any active Stripe subscriptions at period end
      const cancelled: string[] = [];
      let nativeSubWarning = '';
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('stripe_customer_id, subscription_source, subscription_tier')
          .eq('id', match.id)
          .single();

        const customerIds = new Set<string>();
        if (profile?.stripe_customer_id) customerIds.add(profile.stripe_customer_id);
        const custList = await stripe.customers.list({ email, limit: 10 });
        custList.data.forEach((c) => customerIds.add(c.id));

        for (const custId of customerIds) {
          const subs = await stripe.subscriptions.list({ customer: custId, status: 'active' });
          for (const sub of subs.data) {
            await stripe.subscriptions.update(sub.id, { cancel_at_period_end: true });
            cancelled.push(sub.id);
          }
          const trialing = await stripe.subscriptions.list({ customer: custId, status: 'trialing' });
          for (const sub of trialing.data) {
            await stripe.subscriptions.update(sub.id, { cancel_at_period_end: true });
            cancelled.push(sub.id);
          }
        }

        if (profile?.subscription_source === 'app_store' || profile?.subscription_source === 'play_store') {
          nativeSubWarning = `⚠️ They may have a native ${profile.subscription_source} subscription — only the user can cancel that (App Store / Play Store settings). Worth a quick message.`;
        }
      } catch (cancelErr) {
        nativeSubWarning = `⚠️ Subscription cancellation hit an error — check Stripe manually: ${cancelErr instanceof Error ? cancelErr.message : String(cancelErr)}`;
      }

      // Grant lifetime access — reason must contain "lifetime" (admin count)
      await supabase
        .from('profiles')
        .update({
          free_access_granted: true,
          free_access_expires_at: null,
          free_access_reason: LIFETIME_REASON,
          subscribed: true,
          is_trial: false,
          is_trial_cancelled: false,
          trial_end: null,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', match.id);

      await supabase
        .from('lifetime_purchases')
        .update({
          status: 'fulfilled',
          user_id: match.id,
          fulfilled_at: new Date().toISOString(),
          notes: cancelled.length
            ? `Cancelled at period end: ${cancelled.join(', ')}`
            : 'No active Stripe subscription to cancel.',
        })
        .eq('stripe_session_id', session.id);

      stats.fulfilled++;

      await resend.emails.send({
        from: FROM,
        to: NOTIFY_EMAIL,
        subject: `💷 Lifetime purchase fulfilled — ${email} (£${((session.amount_total ?? 0) / 100).toFixed(2)})`,
        html: `<p><strong>${email}</strong> bought lifetime access and has been fulfilled automatically:</p><ul><li>Lifetime access granted (never expires)</li><li>${cancelled.length ? `${cancelled.length} Stripe subscription(s) cancelled at period end` : 'No active Stripe subscription found'}</li></ul>${nativeSubWarning ? `<p>${nativeSubWarning}</p>` : ''}<p>Stripe session: ${session.id}</p>`,
      });
    }

    console.log('lifetime-fulfilment:', JSON.stringify(stats));
    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, {
      functionName: 'lifetime-fulfilment',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
