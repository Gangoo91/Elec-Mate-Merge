/**
 * Sync Stripe Customers
 * Reconciles ALL active Stripe subscriptions with Supabase profiles.
 * - Matches by stripe_customer_id first, then case-insensitive email
 * - Uses correct PRICE_TO_TIER mapping (not hardcoded 'founder')
 * - Reports orphaned subscriptions (no matching Supabase user)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { getSubscriptionPeriodEnd } from '../_shared/stripe-helpers.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Must match stripe-subscription-webhook PRICE_TO_TIER
const PRICE_TO_TIER: Record<string, string> = {
  // Apprentice
  price_1TKlA22RKw5t5RAmpvhojy0b: 'apprentice', // £5.99/month (current — Apr 2026)
  price_1SmUef2RKw5t5RAmRIMTWTqU: 'apprentice', // £4.99/month (legacy)
  price_1TKlKK2RKw5t5RAmGVR5EcF9: 'apprentice_yearly', // £59.99/year (current — Apr 2026)
  price_1SmUfK2RKw5t5RAml6bj1I77: 'apprentice_yearly', // £49.99/year (legacy)
  // Electrician Pro
  price_1TKlA12RKw5t5RAmdhZyhX1I: 'electrician', // £12.99/month (current — Apr 2026)
  price_1SqJVr2RKw5t5RAmaiTGelLN: 'electrician', // £9.99/month (legacy)
  price_1TKlKL2RKw5t5RAmpD8FH7qp: 'electrician_yearly', // £129.99/year (current — Apr 2026)
  price_1SqJVs2RKw5t5RAmVeD2QVsb: 'electrician_yearly', // £99.99/year (legacy)
  // Business AI
  price_1T6DUx2RKw5t5RAmpb177NJV: 'business_ai',
  price_1T6DUy2RKw5t5RAmo9HgAukW: 'business_ai_yearly',
  // Employer
  price_1SlyAT2RKw5t5RAmUmTRGimH: 'employer',
  price_1SlyB82RKw5t5RAmN447YJUW: 'employer_yearly',
  // Founders Offer (employer access)
  price_1SPK8c2RKw5t5RAmRGJxXfjc: 'employer',
  // Win-Back
  price_1SvggR2RKw5t5RAmDN29FBzx: 'electrician',
  price_1SvggR2RKw5t5RAmsrerSmdG: 'electrician_yearly',
  // Legacy
  price_1RhtdT2RKw5t5RAmv6b2xE6p: 'apprentice',
  price_1Rhtgl2RKw5t5RAmkQVKVnKn: 'apprentice_yearly',
  price_1RhteS2RKw5t5RAmzRbaTE8U: 'electrician',
  price_1RhtiS2RKw5t5RAmha0s6PJA: 'electrician_yearly',
  // Early Access
  price_1RL1wd2RKw5t5RAms8S0sLAt: 'apprentice',
  price_1RL1zR2RKw5t5RAmVABR93Zy: 'electrician',
  price_1RL2582RKw5t5RAm2qG45wK0: 'electrician_yearly',
  price_1RL25t2RKw5t5RAmXYxxJivo: 'employer',
  // Desktop
  price_1RGIaQ2RKw5t5RAmh7lzac0R: 'desktop',
  price_1RGIdw2RKw5t5RAmEWjKbGx1: 'desktop_yearly',
  // Discounted
  price_1RIvv02RKw5t5RAmFni9q7Fo: 'electrician',
  price_1Svgmx2RKw5t5RAmALVu3vkn: 'employer',
  price_1Svgmx2RKw5t5RAm6Q4KMCdG: 'employer_yearly',
};

const BUSINESS_AI_TIERS = new Set([
  'business_ai',
  'business_ai_yearly',
  'employer',
  'employer_yearly',
]);

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

    // Fetch ALL auth users upfront (avoid repeated calls)
    const allUsers: { id: string; email: string }[] = [];
    let page = 1;
    while (true) {
      const { data } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
      if (!data?.users?.length) break;
      for (const u of data.users) {
        if (u.email) allUsers.push({ id: u.id, email: u.email.toLowerCase() });
      }
      if (data.users.length < 1000) break;
      page++;
    }
    console.log(`Loaded ${allUsers.length} auth users`);

    // Fetch all profiles with stripe_customer_id for quick lookup
    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('id, stripe_customer_id, subscribed, subscription_tier');
    const profileByStripeId = new Map<
      string,
      { id: string; subscribed: boolean; subscription_tier: string | null }
    >();
    const profileById = new Map<
      string,
      { stripe_customer_id: string | null; subscribed: boolean; subscription_tier: string | null }
    >();
    for (const p of allProfiles || []) {
      if (p.stripe_customer_id) {
        profileByStripeId.set(p.stripe_customer_id, p);
      }
      profileById.set(p.id, p);
    }

    // Paginate through ALL active + trialing Stripe subscriptions
    const allSubs: Stripe.Subscription[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    for (const status of ['active', 'trialing'] as const) {
      hasMore = true;
      startingAfter = undefined;
      while (hasMore) {
        const params: Stripe.SubscriptionListParams = {
          status,
          limit: 100,
          expand: ['data.customer'],
        };
        if (startingAfter) params.starting_after = startingAfter;
        const batch = await stripe.subscriptions.list(params);
        allSubs.push(...batch.data);
        hasMore = batch.has_more;
        if (batch.data.length > 0) {
          startingAfter = batch.data[batch.data.length - 1].id;
        }
      }
    }

    console.log(`Found ${allSubs.length} active/trialing subscriptions in Stripe`);

    const results = {
      total: allSubs.length,
      alreadyLinked: 0,
      synced: 0,
      tierUpdated: 0,
      orphaned: [] as {
        customerId: string;
        email: string | null;
        name: string | null;
        priceId: string;
        tier: string;
      }[],
      errors: [] as { customerId: string; error: string }[],
    };

    for (const sub of allSubs) {
      const customer = sub.customer as Stripe.Customer;
      if (!customer || customer.deleted) continue;

      const customerId = customer.id;
      const customerEmail = customer.email?.toLowerCase() || null;
      const customerName = customer.name || null;
      const priceId = sub.items.data[0]?.price?.id || '';
      const tier = PRICE_TO_TIER[priceId] || 'electrician';
      const periodEnd = getSubscriptionPeriodEnd(sub);

      // Priority 1: Already linked by stripe_customer_id
      const existing = profileByStripeId.get(customerId);
      if (existing) {
        // Check if tier needs updating
        if (existing.subscription_tier?.toLowerCase() !== tier || !existing.subscribed) {
          const updateData: Record<string, unknown> = {
            subscribed: true,
            subscription_tier: tier,
            business_ai_enabled: BUSINESS_AI_TIERS.has(tier),
          };
          if (periodEnd) updateData.subscription_end = periodEnd.toISOString();

          await supabase.from('profiles').update(updateData).eq('id', existing.id);
          results.tierUpdated++;
        } else {
          results.alreadyLinked++;
        }
        continue;
      }

      // Priority 2: Match by metadata userId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const metadataUserId = (sub as any).metadata?.userId;
      if (metadataUserId && profileById.has(metadataUserId)) {
        const updateData: Record<string, unknown> = {
          stripe_customer_id: customerId,
          subscribed: true,
          subscription_tier: tier,
          onboarding_completed: true,
          business_ai_enabled: BUSINESS_AI_TIERS.has(tier),
        };
        if (periodEnd) {
          updateData.subscription_end = periodEnd.toISOString();
          updateData.subscription_start = new Date().toISOString();
        }

        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', metadataUserId);
        if (error) {
          results.errors.push({ customerId, error: error.message });
        } else {
          results.synced++;
          console.log(`Synced via metadata: ${customerEmail} -> ${customerId} (${tier})`);
        }
        continue;
      }

      // Priority 3: Case-insensitive email match
      if (customerEmail) {
        const authUser = allUsers.find((u) => u.email === customerEmail);
        if (authUser) {
          const profile = profileById.get(authUser.id);
          // Only update if not already linked to a DIFFERENT stripe customer
          if (profile && !profile.stripe_customer_id) {
            const updateData: Record<string, unknown> = {
              stripe_customer_id: customerId,
              subscribed: true,
              subscription_tier: tier,
              onboarding_completed: true,
              business_ai_enabled: BUSINESS_AI_TIERS.has(tier),
            };
            if (periodEnd) {
              updateData.subscription_end = periodEnd.toISOString();
              if (!profile.subscribed) {
                updateData.subscription_start = new Date().toISOString();
              }
            }

            const { error } = await supabase
              .from('profiles')
              .update(updateData)
              .eq('id', authUser.id);
            if (error) {
              results.errors.push({ customerId, error: error.message });
            } else {
              results.synced++;
              console.log(`Synced via email: ${customerEmail} -> ${customerId} (${tier})`);
            }
            continue;
          } else if (profile?.stripe_customer_id && profile.stripe_customer_id !== customerId) {
            // User already has a different stripe customer — update to the one with the active sub
            const updateData: Record<string, unknown> = {
              stripe_customer_id: customerId,
              subscribed: true,
              subscription_tier: tier,
              onboarding_completed: true,
              business_ai_enabled: BUSINESS_AI_TIERS.has(tier),
            };
            if (periodEnd) {
              updateData.subscription_end = periodEnd.toISOString();
            }

            const { error } = await supabase
              .from('profiles')
              .update(updateData)
              .eq('id', authUser.id);
            if (error) {
              results.errors.push({ customerId, error: error.message });
            } else {
              results.synced++;
              console.log(
                `Re-linked: ${customerEmail} old=${profile.stripe_customer_id} new=${customerId} (${tier})`
              );
            }
            continue;
          }
        }
      }

      // No match found — orphaned subscription
      results.orphaned.push({
        customerId,
        email: customerEmail,
        name: customerName,
        priceId,
        tier,
      });
    }

    // Store orphaned subscriptions for manual review
    if (results.orphaned.length > 0) {
      for (const orphan of results.orphaned) {
        await supabase
          .from('orphaned_stripe_subscriptions')
          .upsert(
            {
              stripe_customer_id: orphan.customerId,
              customer_email: orphan.email,
              customer_name: orphan.name,
              price_id: orphan.priceId,
              tier: orphan.tier,
              detected_at: new Date().toISOString(),
            },
            { onConflict: 'stripe_customer_id' }
          )
          .then(({ error }) => {
            if (error) {
              console.warn(`Failed to store orphan ${orphan.customerId}: ${error.message}`);
            }
          });
      }
    }

    console.log('Sync complete:', JSON.stringify(results, null, 2));

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
