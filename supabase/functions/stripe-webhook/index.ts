import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📣 Stripe webhook received');

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not set');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const signature = req.headers.get('stripe-signature');
    const body = await req.text();

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      // Parse event without verification (for testing)
      event = JSON.parse(body);
      console.warn('Webhook signature not verified - set STRIPE_WEBHOOK_SECRET for production');
    }

    console.log('Event type:', event.type);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Complete map of Stripe price IDs to tiers
    // Updated 2026-02-04 with all active prices
    const priceTierMap: Record<string, string> = {
      // ===== ELECTRICIAN PLANS =====
      // Current main electrician prices
      'price_1SqJVs2RKw5t5RAmVeD2QVsb': 'Electrician',  // £99.99/year - Mobile App Yearly
      'price_1SqJVr2RKw5t5RAmaiTGelLN': 'Electrician',  // £9.99/month - Mobile App Monthly
      'price_1RhteS2RKw5t5RAmzRbaTE8U': 'Electrician',  // £9.99/month
      'price_1RhtiS2RKw5t5RAmha0s6PJA': 'Electrician',  // £99.99/year
      // Win-back offer prices
      'price_1SvggR2RKw5t5RAmsrerSmdG': 'Electrician',  // £79.99/year - Win-Back
      'price_1SvggR2RKw5t5RAmDN29FBzx': 'Electrician',  // £7.99/month - Win-Back
      // Legacy electrician prices
      'price_1Rhtgl2RKw5t5RAmkQVKVnKn': 'Electrician',  // £69.99/year
      'price_1RhtdT2RKw5t5RAmv6b2xE6p': 'Electrician',  // £6.99/month
      'price_1RL25t2RKw5t5RAmXYxxJivo': 'Electrician',  // £59.99/year
      'price_1RL1zR2RKw5t5RAmVABR93Zy': 'Electrician',  // £5.99/month
      'price_1RIvv02RKw5t5RAmFni9q7Fo': 'Electrician',  // £5.99/month
      'price_1RGIdw2RKw5t5RAmEWjKbGx1': 'Electrician',  // £6.99/month
      // Founders offer (treated as Electrician)
      'price_1SPK8c2RKw5t5RAmRGJxXfjc': 'Electrician',  // £3.99/month - Founders

      // ===== APPRENTICE PLANS =====
      'price_1SmUef2RKw5t5RAmRIMTWTqU': 'Apprentice',   // £4.99/month
      'price_1SmUfK2RKw5t5RAml6bj1I77': 'Apprentice',   // £49.99/year
      'price_1RL2582RKw5t5RAm2qG45wK0': 'Apprentice',   // £39.99/year
      'price_1RL1wd2RKw5t5RAms8S0sLAt': 'Apprentice',   // £3.99/month
      'price_1RGIaQ2RKw5t5RAmh7lzac0R': 'Apprentice',   // £2.99/month

      // ===== EMPLOYER PLANS =====
      'price_1SlyAT2RKw5t5RAmUmTRGimH': 'Employer',     // £29.99/month
      'price_1SlyB82RKw5t5RAmN447YJUW': 'Employer',     // £299.99/year
      'price_1Svgmx2RKw5t5RAm6Q4KMCdG': 'Employer',     // £399.99/year
      'price_1Svgmx2RKw5t5RAmALVu3vkn': 'Employer',     // £39.99/month
    };

    // Helper to determine if price is yearly based on interval or amount
    function isYearlyPrice(priceId: string, subscription?: Stripe.Subscription): boolean {
      if (subscription) {
        const interval = subscription.items.data[0]?.price?.recurring?.interval;
        return interval === 'year';
      }
      // Fallback: yearly prices typically have higher amounts
      return false;
    }

    // Helper to get user by Stripe customer ID or email
    async function getUserByCustomer(customerId: string): Promise<string | null> {
      // First check if we have the customer ID stored
      const { data: profileByCustomerId } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profileByCustomerId) {
        return profileByCustomerId.id;
      }

      // Otherwise look up by email from Stripe
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted || !('email' in customer) || !customer.email) {
        return null;
      }

      // Find user by email via auth
      const { data: authData } = await supabase.auth.admin.listUsers();
      const authUser = authData?.users?.find(u => u.email === customer.email);
      
      if (!authUser) {
        console.log('No user found for email:', customer.email);
        return null;
      }

      // Update profile with stripe customer ID for future lookups
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', authUser.id);

      return authUser.id;
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', session.id);
        
        const userId = session.client_reference_id || session.metadata?.userId;
        const customerId = session.customer as string;
        
        if (!userId && !customerId) {
          console.log('No user identifier in session');
          break;
        }

        const targetUserId = userId || await getUserByCustomer(customerId);
        if (!targetUserId) {
          console.log('Could not find user for session');
          break;
        }

        // Get subscription details if this was a subscription checkout
        let tier = session.metadata?.planId || 'Electrician';
        let subscriptionEnd: Date | null = null;
        
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const priceId = subscription.items.data[0]?.price.id;
          tier = priceTierMap[priceId] || tier;
          
          // Calculate subscription end date
          if (subscription.current_period_end) {
            subscriptionEnd = new Date(subscription.current_period_end * 1000);
          }
          
          console.log('Subscription details:', { priceId, tier, subscriptionEnd });
        }

        // Update profile
        const updateData: Record<string, any> = {
          subscribed: true,
          subscription_tier: tier,
          subscription_start: new Date().toISOString(),
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString(),
        };
        
        if (subscriptionEnd) {
          updateData.subscription_end = subscriptionEnd.toISOString();
        }

        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', targetUserId);

        if (error) {
          console.error('Failed to update profile:', error);
        } else {
          console.log('Profile updated - subscribed:', targetUserId, tier);
        }

        // Check if this was a promo offer checkout
        const offerId = session.metadata?.offerId;
        if (offerId) {
          // Update offer redemptions count
          const { data: offer } = await supabase
            .from('promo_offers')
            .select('redemptions')
            .eq('id', offerId)
            .single();

          if (offer) {
            await supabase
              .from('promo_offers')
              .update({ redemptions: (offer.redemptions || 0) + 1 })
              .eq('id', offerId);
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        // Handle new subscription creation (in case checkout.session.completed doesn't fire)
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id, 'Status:', subscription.status);
        
        const customerId = subscription.customer as string;
        const userId = await getUserByCustomer(customerId);
        
        if (!userId) {
          console.log('Could not find user for new subscription');
          break;
        }

        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceTierMap[priceId] || 'Electrician';
        const isActive = subscription.status === 'active' || subscription.status === 'trialing';
        
        // Calculate subscription end date
        let subscriptionEnd: string | null = null;
        if (subscription.current_period_end) {
          subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
        }

        console.log('New subscription:', { priceId, tier, isActive, subscriptionEnd });

        const { error } = await supabase
          .from('profiles')
          .update({
            subscribed: isActive,
            subscription_tier: isActive ? tier : null,
            subscription_start: isActive ? new Date().toISOString() : null,
            subscription_end: subscriptionEnd,
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (error) {
          console.error('Failed to update profile for new subscription:', error);
        } else {
          console.log('Profile updated - new subscription:', userId, isActive, tier);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id, 'Status:', subscription.status);
        
        const customerId = subscription.customer as string;
        const userId = await getUserByCustomer(customerId);
        
        if (!userId) {
          console.log('Could not find user for subscription');
          break;
        }

        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceTierMap[priceId] || 'Electrician';
        const isActive = subscription.status === 'active' || subscription.status === 'trialing';
        
        // Calculate subscription end date
        let subscriptionEnd: string | null = null;
        if (subscription.current_period_end) {
          subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
        }

        console.log('Subscription update:', { priceId, tier, isActive, subscriptionEnd });

        const { error } = await supabase
          .from('profiles')
          .update({
            subscribed: isActive,
            subscription_tier: isActive ? tier : null,
            subscription_end: subscriptionEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (error) {
          console.error('Failed to update profile:', error);
        } else {
          console.log('Profile updated - subscription status:', userId, isActive, tier);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscription.id);
        
        const customerId = subscription.customer as string;
        const userId = await getUserByCustomer(customerId);
        
        if (!userId) {
          console.log('Could not find user for cancelled subscription');
          break;
        }

        // Check if they have admin-granted free access - don't revoke that
        const { data: profile } = await supabase
          .from('profiles')
          .select('free_access_granted')
          .eq('id', userId)
          .single();

        if (profile?.free_access_granted) {
          console.log('User has admin-granted free access, not revoking:', userId);
          break;
        }

        const { error } = await supabase
          .from('profiles')
          .update({
            subscribed: false,
            subscription_tier: null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (error) {
          console.error('Failed to update profile:', error);
        } else {
          console.log('Profile updated - subscription cancelled:', userId);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        // Handle successful payment - useful for renewals
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded:', invoice.id);
        
        if (invoice.subscription) {
          const customerId = invoice.customer as string;
          const userId = await getUserByCustomer(customerId);
          
          if (userId) {
            // Ensure user is marked as subscribed after successful payment
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
            const priceId = subscription.items.data[0]?.price.id;
            const tier = priceTierMap[priceId] || 'Electrician';
            
            let subscriptionEnd: string | null = null;
            if (subscription.current_period_end) {
              subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
            }

            await supabase
              .from('profiles')
              .update({
                subscribed: true,
                subscription_tier: tier,
                subscription_end: subscriptionEnd,
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);
              
            console.log('Profile confirmed subscribed after payment:', userId, tier);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed:', invoice.id);
        
        const customerId = invoice.customer as string;
        const userId = await getUserByCustomer(customerId);
        
        if (userId) {
          // Log the failed payment for admin visibility
          await supabase.from('admin_audit_logs').insert({
            admin_id: null,
            action: 'payment_failed',
            entity_type: 'subscription',
            entity_id: userId,
            details: {
              invoice_id: invoice.id,
              amount: invoice.amount_due,
              reason: invoice.last_finalization_error?.message || 'Unknown',
            },
          });
          console.log('Payment failure logged for user:', userId);
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
