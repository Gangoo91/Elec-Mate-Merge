/**
 * Admin Stripe Stats
 * Fetches live subscription and revenue data directly from Stripe
 * Returns accurate counts that can be compared with Supabase data
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

// Known price IDs and their tiers - ACTUAL STRIPE PRICES
const PRICE_TIER_MAP: Record<string, { tier: string; amount: number }> = {
  // Founder pricing (£3.99/mo) - MAIN PRICE USED BY ALL REAL USERS
  'price_1SPK8c2RKw5t5RAmRGJxXfjc': { tier: 'founder', amount: 3.99 },
  'price_1RL1wd2RKw5t5RAms8S0sLAt': { tier: 'founder', amount: 3.99 },
  // Apprentice pricing (£4.99/mo, £49.99/yr) - FUTURE
  'price_1SmUef2RKw5t5RAmRIMTWTqU': { tier: 'apprentice', amount: 4.99 },
  'price_1SmUfK2RKw5t5RAml6bj1I77': { tier: 'apprentice', amount: 49.99 / 12 },
  // Electrician pricing (£9.99/mo, £99.99/yr) - FUTURE
  'price_1SqJVr2RKw5t5RAmaiTGelLN': { tier: 'electrician', amount: 9.99 },
  'price_1SqJVs2RKw5t5RAmVeD2QVsb': { tier: 'electrician', amount: 99.99 / 12 },
  'price_1RhteS2RKw5t5RAmzRbaTE8U': { tier: 'electrician', amount: 9.99 },
  'price_1Rhti2RKw5t5RAmha0s6PJA': { tier: 'electrician', amount: 99.99 / 12 },
  // Employer pricing (£29.99/mo, £299.99/yr) - FUTURE
  'price_1SlyAT2RKw5t5RAmUmTRGimH': { tier: 'employer', amount: 29.99 },
  'price_1SlyB82RKw5t5RAmN447YJUW': { tier: 'employer', amount: 299.99 / 12 },
  // LEGACY TEST PRICES (Andrew's old test subscriptions) - count as founder
  'price_1RhtdT2RKw5t5RAmv6b2xE6p': { tier: 'founder', amount: 6.99 },  // Desktop £6.99 - ANDREW TEST
  'price_1Rhtgl2RKw5t5RAmkQVKVnKn': { tier: 'founder', amount: 69.99 / 12 },
  'price_1RL1zR2RKw5t5RAmVABR93Zy': { tier: 'founder', amount: 5.99 },  // Legacy £5.99 - ANDREW TEST
  'price_1RL25t2RKw5t5RAmXYxxJivo': { tier: 'founder', amount: 59.99 / 12 },
  'price_1RL2582RKw5t5RAm2qG45wK0': { tier: 'founder', amount: 39.99 / 12 },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Authentication failed');
    }

    // Check if user has admin access
    // Admin access: role = 'admin' OR role = 'employer' (Andrew's account) OR is in admin list
    const ADMIN_USER_IDS = [
      'aa69361d-dad9-4841-84e4-25ee41568594', // Andrew Moore
      'b0113c59-8611-4c5e-8503-1797a75bb64f', // ANDREW MOORE
    ];

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const hasAdminAccess =
      profile?.role === 'admin' ||
      profile?.role === 'employer' ||
      ADMIN_USER_IDS.includes(user.id);

    if (!hasAdminAccess) {
      console.log('[ADMIN-STRIPE-STATS] Access denied for user:', user.id, 'role:', profile?.role);
      throw new Error('Admin access required');
    }

    console.log('[ADMIN-STRIPE-STATS] Access granted for user:', user.id);

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Fetch all active subscriptions from Stripe
    const activeSubscriptions: Stripe.Subscription[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const batch = await stripe.subscriptions.list({
        status: 'active',
        limit: 100,
        expand: ['data.customer', 'data.items.data.price'],
        ...(startingAfter && { starting_after: startingAfter }),
      });

      activeSubscriptions.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) {
        startingAfter = batch.data[batch.data.length - 1].id;
      }
    }

    // Fetch canceled subscriptions (last 30 days for churn tracking)
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);
    const canceledSubscriptions = await stripe.subscriptions.list({
      status: 'canceled',
      limit: 100,
      created: { gte: thirtyDaysAgo },
    });

    // Calculate tier counts and MRR from live Stripe data
    const tierCounts = {
      founder: 0,
      apprentice: 0,
      electrician: 0,
      employer: 0,
      unknown: 0,
    };

    let mrr = 0;
    const subscriptionDetails: any[] = [];

    for (const sub of activeSubscriptions) {
      const customer = sub.customer as Stripe.Customer;
      const priceItem = sub.items.data[0];
      const priceId = priceItem.price.id;
      const priceAmount = (priceItem.price.unit_amount || 0) / 100;
      const interval = priceItem.price.recurring?.interval;

      // Determine tier from price ID or amount
      let tier = 'unknown';
      let monthlyAmount = priceAmount;

      if (PRICE_TIER_MAP[priceId]) {
        tier = PRICE_TIER_MAP[priceId].tier;
        monthlyAmount = PRICE_TIER_MAP[priceId].amount;
      } else {
        // Infer tier from price amount
        if (priceAmount <= 5 || (interval === 'year' && priceAmount <= 50)) {
          tier = 'founder';
          monthlyAmount = interval === 'year' ? priceAmount / 12 : priceAmount;
        } else if (priceAmount <= 10 || (interval === 'year' && priceAmount <= 100)) {
          tier = 'electrician';
          monthlyAmount = interval === 'year' ? priceAmount / 12 : priceAmount;
        } else {
          tier = 'employer';
          monthlyAmount = interval === 'year' ? priceAmount / 12 : priceAmount;
        }
      }

      tierCounts[tier as keyof typeof tierCounts]++;
      mrr += monthlyAmount;

      subscriptionDetails.push({
        subscriptionId: sub.id,
        customerId: customer?.id,
        customerEmail: customer?.email || 'N/A',
        customerName: customer?.name || 'N/A',
        tier,
        priceId,
        priceAmount,
        monthlyAmount,
        interval,
        status: sub.status,
        created: new Date(sub.created * 1000).toISOString(),
      });
    }

    // Fetch Supabase data for comparison
    const { data: supabaseSubscribers, error: subError } = await supabase
      .from('profiles')
      .select('id, full_name, email, subscription_tier, subscribed, stripe_customer_id, free_access_granted')
      .eq('subscribed', true);

    const supabaseTierCounts = {
      founder: 0,
      apprentice: 0,
      electrician: 0,
      employer: 0,
      free: 0,
    };

    for (const user of supabaseSubscribers || []) {
      if (user.free_access_granted) {
        supabaseTierCounts.free++;
      } else {
        const tier = user.subscription_tier?.toLowerCase() || 'unknown';
        if (tier in supabaseTierCounts) {
          supabaseTierCounts[tier as keyof typeof supabaseTierCounts]++;
        }
      }
    }

    // Find discrepancies
    const stripeCustomerIds = new Set(subscriptionDetails.map(s => s.customerId));
    const supabaseCustomerIds = new Set((supabaseSubscribers || []).filter(u => u.stripe_customer_id).map(u => u.stripe_customer_id));

    const inStripeNotSupabase = subscriptionDetails.filter(s => !supabaseCustomerIds.has(s.customerId));
    const inSupabaseNotStripe = (supabaseSubscribers || []).filter(u => u.stripe_customer_id && !stripeCustomerIds.has(u.stripe_customer_id) && !u.free_access_granted);

    const response = {
      stripe: {
        activeSubscriptions: activeSubscriptions.length,
        canceledLast30Days: canceledSubscriptions.data.length,
        tierCounts,
        mrr: Math.round(mrr * 100) / 100,
        // Include breakdown by actual price amount
        subscriptionsByPrice: subscriptionDetails.reduce((acc, sub) => {
          const key = `£${sub.priceAmount}/${sub.interval}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      },
      supabase: {
        subscribedUsers: (supabaseSubscribers || []).length,
        tierCounts: supabaseTierCounts,
        withStripeId: (supabaseSubscribers || []).filter(u => u.stripe_customer_id).length,
        withoutStripeId: (supabaseSubscribers || []).filter(u => !u.stripe_customer_id && !u.free_access_granted).length,
      },
      discrepancies: {
        inStripeNotSupabase: inStripeNotSupabase.length,
        inSupabaseNotStripe: inSupabaseNotStripe.length,
        details: {
          stripeOnly: inStripeNotSupabase.map(s => ({
            email: s.customerEmail,
            tier: s.tier,
            amount: `£${s.priceAmount}`,
          })),
          supabaseOnly: inSupabaseNotStripe.map(u => ({
            email: u.email,
            name: u.full_name,
            tier: u.subscription_tier,
          })),
        },
      },
      // Full subscription list for detailed view
      subscriptions: subscriptionDetails,
      generatedAt: new Date().toISOString(),
    };

    console.log('[ADMIN-STRIPE-STATS] Generated stats:', {
      stripeActive: response.stripe.activeSubscriptions,
      stripeMRR: response.stripe.mrr,
      supabaseSubscribed: response.supabase.subscribedUsers,
      discrepancies: response.discrepancies.inStripeNotSupabase + response.discrepancies.inSupabaseNotStripe,
    });

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[ADMIN-STRIPE-STATS] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
