import { serve, createClient } from '../_shared/deps.ts';

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

    const { type, app_user_id, store, product_id, expiration_at_ms } = event;

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

    const inactiveEvents = ['CANCELLATION', 'EXPIRATION', 'BILLING_ISSUE', 'SUBSCRIPTION_PAUSED'];

    let subscribed: boolean | null = null;
    let subscriptionTier: string | null = null;
    let subscriptionEnd: string | null = null;

    if (activeEvents.includes(type)) {
      subscribed = true;
      subscriptionTier = resolveTierFromProduct(product_id, store);
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    } else if (inactiveEvents.includes(type)) {
      subscribed = false;
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    }

    if (subscribed !== null) {
      // Resolve whether this tier includes Business AI
      const isBusinessAiTier = subscriptionTier ? BUSINESS_AI_TIERS.has(subscriptionTier) : false;

      const updateData: Record<string, unknown> = {
        subscribed,
        subscription_end: subscriptionEnd,
      };

      if (subscribed) {
        updateData.onboarding_completed = true;
        updateData.business_ai_enabled = isBusinessAiTier;
      } else {
        // Inactive event — disable Business AI
        updateData.business_ai_enabled = false;
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
        `Updated profile ${app_user_id}: subscribed=${subscribed}, tier=${subscriptionTier}, business_ai=${isBusinessAiTier}`
      );
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
