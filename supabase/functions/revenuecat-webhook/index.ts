import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
      subscriptionTier = store === 'APP_STORE' ? 'Pro (iOS)' : 'Pro (Android)';
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    } else if (inactiveEvents.includes(type)) {
      subscribed = false;
      subscriptionEnd = expiration_at_ms ? new Date(expiration_at_ms).toISOString() : null;
    }

    if (subscribed !== null) {
      const updateData: Record<string, unknown> = {
        subscribed,
        subscription_end: subscriptionEnd,
      };

      if (subscriptionTier) {
        updateData.subscription_tier = subscriptionTier;
      }

      const { error } = await supabase.from('profiles').update(updateData).eq('id', app_user_id);

      if (error) {
        console.error('Failed to update profile:', error);
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log(
        `Updated profile ${app_user_id}: subscribed=${subscribed}, tier=${subscriptionTier}`
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
