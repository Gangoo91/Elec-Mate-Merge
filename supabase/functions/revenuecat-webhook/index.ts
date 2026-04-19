import { serve, createClient } from '../_shared/deps.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { capturePostHogEvent } from '../_shared/posthog-server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * RevenueCat Server-to-Server Webhook
 *
 * Receives events from RevenueCat when IAP subscription status changes
 * and syncs the status to the Supabase profiles table.
 *
 * Configure in RevenueCat dashboard → Project → Integrations → Webhooks
 * URL: https://jtwygbeceundfgnkirof.supabase.co/functions/v1/revenuecat-webhook
 * Auth header: your REVENUECAT_WEBHOOK_SECRET
 */

// Tiers that include Business AI agent access (must match stripe-subscription-webhook)
const BUSINESS_AI_TIERS = new Set([
  'business_ai',
  'business_ai_yearly',
  'employer',
  'employer_yearly',
]);

// Map RevenueCat product IDs → internal tier IDs (matches stripe-subscription-webhook naming)
const PRODUCT_TIER_MAP: Record<string, string> = {
  // iOS products (match App Store Connect product IDs)
  elecmate_apprentice_monthly: 'apprentice',
  elecmate_apprentice_yearly: 'apprentice_yearly',
  elecmate_electrician_monthly: 'electrician',
  elecmate_electrician_yearly: 'electrician_yearly',
  elecmate_mate_monthly: 'business_ai',
  elecmate_mate_yearly: 'business_ai_yearly',
  elecmate_employer_monthly: 'employer',
  elecmate_employer_yearly: 'employer_yearly',
  // Android products (Google Play format: subscriptionId:basePlanId)
  'apprentice:monthly': 'apprentice',
  'apprentice:yearly': 'apprentice_yearly',
  'electrician:monthly': 'electrician',
  'electrician:yearly': 'electrician_yearly',
  'mate:monthly': 'business_ai',
  'mate:yearly': 'business_ai_yearly',
  'employer:monthly': 'employer',
  'employer:yearly': 'employer_yearly',
};

function resolveTierFromProduct(productId: string | null, _store: string | null): string {
  if (productId && PRODUCT_TIER_MAP[productId]) {
    return PRODUCT_TIER_MAP[productId];
  }
  // Fallback: pattern matching on product ID
  if (productId) {
    const id = productId.toLowerCase();
    if (id.includes('mate')) return 'business_ai';
    if (id.includes('employer')) return 'employer';
    if (id.includes('electrician')) return 'electrician';
    if (id.includes('apprentice')) return 'apprentice';
  }
  // Last resort
  return 'electrician';
}
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify webhook auth (set in RevenueCat dashboard)
    const authHeader = req.headers.get('authorization');
    const webhookSecret = Deno.env.get('REVENUECAT_WEBHOOK_SECRET');

    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      console.error('Webhook auth failed');
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const event = body.event;

    if (!event) {
      return new Response(JSON.stringify({ error: 'No event in body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      type,
      app_user_id,
      store,
      product_id,
      expiration_at_ms,
      period_type,
      price_in_purchased_currency,
      currency,
      transaction_id,
    } = event;

    console.log(
      `RevenueCat event: ${type} for user ${app_user_id}, store: ${store}, product: ${product_id}`
    );

    // app_user_id should be the Supabase user ID (set during Purchases.configure)
    if (!app_user_id || app_user_id.startsWith('$RCAnonymousID')) {
      console.log('Skipping anonymous user event');
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Determine subscription state based on event type
    // See: https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields
    const activeEvents = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'UNCANCELLATION'];

    const inactiveEvents = ['EXPIRATION', 'BILLING_ISSUE', 'SUBSCRIPTION_PAUSED'];

    let subscribed: boolean | null = null;
    let subscriptionTier: string | null = null;
    let subscriptionEnd: string | null = null;
    let isTrialCancelled: boolean | null = null;
    // period_type from RevenueCat: "TRIAL", "INTRO", or "NORMAL"
    const isTrial = period_type === 'TRIAL';

    if (type === 'CANCELLATION') {
      // CANCELLATION during trial = user turned off auto-renewal but still has access until trial_end
      // CANCELLATION on paid = immediate loss of access at period end
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
      if (isTrial && expiration_at_ms && expiration_at_ms > Date.now()) {
        // Trial cancelled but not expired yet — keep access, mark as cancelled trial
        subscribed = true;
        isTrialCancelled = true;
        subscriptionTier = resolveTierFromProduct(product_id, store);
        console.log(`Trial cancellation — still has access until ${subscriptionEnd}`);
      } else {
        // Paid cancellation or expired trial cancellation — revoke access
        subscribed = false;
        isTrialCancelled = false;
      }
    } else if (type === 'UNCANCELLATION') {
      // User re-enabled auto-renewal
      subscribed = true;
      isTrialCancelled = false;
      subscriptionTier = resolveTierFromProduct(product_id, store);
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    } else if (activeEvents.includes(type)) {
      subscribed = true;
      isTrialCancelled = false;
      subscriptionTier = resolveTierFromProduct(product_id, store);
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    } else if (inactiveEvents.includes(type)) {
      subscribed = false;
      isTrialCancelled = false;
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    }

    if (subscribed !== null) {
      // Resolve whether this tier includes Business AI
      const isBusinessAiTier = subscriptionTier ? BUSINESS_AI_TIERS.has(subscriptionTier) : false;

      // Resolve subscription source from RC store field
      const subscriptionSource =
        store === 'APP_STORE' || store === 'MAC_APP_STORE'
          ? 'app_store'
          : store === 'PLAY_STORE'
            ? 'play_store'
            : store || 'app_store';

      const updateData: Record<string, unknown> = {
        subscribed,
        subscription_end: subscriptionEnd,
        subscription_source: subscriptionSource,
      };

      if (isTrialCancelled !== null) {
        updateData.is_trial_cancelled = isTrialCancelled;
      }

      if (subscribed) {
        updateData.onboarding_completed = true;
        updateData.business_ai_enabled = isBusinessAiTier;
        // Track trial state
        updateData.is_trial = isTrial;
        updateData.trial_end = isTrial && subscriptionEnd ? subscriptionEnd : null;
      } else {
        // Inactive event — disable Business AI, clear trial
        updateData.business_ai_enabled = false;
        updateData.is_trial = false;
        updateData.trial_end = null;
      }

      if (subscriptionTier) {
        updateData.subscription_tier = subscriptionTier;
      }

      // Check if user previously had Business AI before we update
      let previouslyHadBusinessAI = false;
      if (!subscribed) {
        const { data: preProfile } = await supabase
          .from('profiles')
          .select('business_ai_enabled')
          .eq('id', app_user_id)
          .single();
        previouslyHadBusinessAI = preProfile?.business_ai_enabled === true;
      }

      const { error } = await supabase.from('profiles').update(updateData).eq('id', app_user_id);

      if (error) {
        console.error('Failed to update profile:', error);
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Deactivate agent and revoke JWT when user loses Business AI
      if (!subscribed && previouslyHadBusinessAI) {
        console.log(`Deprovisioning Business AI agent for cancelled user ${app_user_id}`);

        await supabase
          .from('profiles')
          .update({ agent_status: 'deactivated' })
          .eq('id', app_user_id);

        await supabase
          .from('agent_jwt_tokens')
          .update({ revoked_at: new Date().toISOString() })
          .eq('user_id', app_user_id)
          .is('revoked_at', null);

        await supabase.from('agent_action_log').insert({
          user_id: app_user_id,
          action_type: 'agent_deprovisioned',
          description: `Business AI agent deactivated via RevenueCat ${type} event. JWT revoked.`,
          outcome: 'success',
        });

        // Best-effort VPS notification to remove OpenClaw binding
        const vpsApiKey = Deno.env.get('VPS_API_KEY');
        if (vpsApiKey) {
          try {
            const vpsRes = await fetch('https://agent.elec-mate.com/api/deprovision-agent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-API-Key': vpsApiKey },
              body: JSON.stringify({ user_id: app_user_id }),
            });
            if (vpsRes.ok) {
              console.log(`VPS agent deprovisioned for ${app_user_id}`);
            } else {
              console.warn(`VPS deprovision returned ${vpsRes.status} (non-fatal)`);
            }
          } catch (vpsErr) {
            console.warn('VPS deprovision call failed (non-fatal)', vpsErr);
          }
        }

        console.log(`Agent deprovisioned — status set to deactivated, JWT revoked`);
      }

      console.log(
        `Updated profile ${app_user_id}: subscribed=${subscribed}, tier=${subscriptionTier}, business_ai=${isBusinessAiTier}, is_trial=${isTrial}`
      );

      // Fire Meta CAPI event for in-app purchase events (iOS/Android)
      // INITIAL_PURCHASE = Subscribe (or StartTrial if period_type === TRIAL)
      // RENEWAL = Subscribe
      if (type === 'INITIAL_PURCHASE' || type === 'RENEWAL') {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(app_user_id);
          const email = authUser?.user?.email;
          const { data: capiProfile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', app_user_id)
            .single();
          const [firstName, ...rest] = (capiProfile?.full_name || '').trim().split(/\s+/);
          const isYearly = subscriptionTier?.endsWith('_yearly') || false;
          const eventName = type === 'INITIAL_PURCHASE' && isTrial ? 'StartTrial' : 'Subscribe';
          if (type === 'INITIAL_PURCHASE') {
            capturePostHogEvent({
              distinct_id: app_user_id,
              event: 'subscription_started',
              properties: {
                tier: subscriptionTier,
                source: 'revenuecat',
                store,
                is_trial: !!isTrial,
                is_yearly: isYearly,
                value:
                  typeof price_in_purchased_currency === 'number'
                    ? price_in_purchased_currency
                    : undefined,
                currency: (currency || 'GBP').toUpperCase(),
                subscription_id: transaction_id || undefined,
              },
            });
          }
          fireCapiEvent({
            event_name: eventName,
            event_id: `rc_${type}_${transaction_id || product_id}_${app_user_id}`,
            action_source: 'app',
            email: email || undefined,
            external_id: app_user_id,
            first_name: firstName || undefined,
            last_name: rest.join(' ') || undefined,
            country: 'gb',
            custom_data: {
              currency: (currency || 'GBP').toUpperCase(),
              value:
                typeof price_in_purchased_currency === 'number'
                  ? price_in_purchased_currency
                  : undefined,
              subscription_id: transaction_id || undefined,
              content_name: subscriptionTier || product_id,
              content_category: type === 'RENEWAL' ? 'renewal' : isYearly ? 'yearly' : 'monthly',
            },
          });
        } catch (capiErr) {
          console.warn('[revenuecat-webhook] Meta CAPI fire failed (non-fatal)', capiErr);
        }
      }
    } else {
      console.log(`Unhandled event type: ${type}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
