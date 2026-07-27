import { serve } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CANCEL-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Function started');

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');
    logStep('Stripe key verified');

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header provided');
    logStep('Authorization header found');

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error('User not authenticated or email not available');
    logStep('User authenticated', { userId: user.id, email: user.email });

    // Body is optional now — see below. A malformed body is not fatal.
    let body: { subscriptionId?: string } = {};
    try {
      body = await req.json();
    } catch {
      // no body — "cancel my subscription", resolved server-side
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── Resolve the caller's OWN subscription, server-side ──────────────────
    // This endpoint used to cancel whatever subscriptionId the body contained,
    // with no check that it belonged to the caller: any signed-in user who knew
    // or obtained a sub_… id could cancel a stranger's subscription. Stripe
    // subscription ids are not secrets — they travel in invoices, webhooks and
    // support threads.
    //
    // The client no longer needs to say WHICH subscription; it says "cancel
    // mine" and the server works it out. An id may still be supplied, but it is
    // treated as a request that must be proven to belong to the caller, never
    // as an instruction.
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle();

    // Customers can exist under the profile id or, for older accounts, only
    // under the billing email — check both before concluding there is nothing.
    const customerIds = new Set<string>();
    if (profile?.stripe_customer_id) customerIds.add(profile.stripe_customer_id as string);
    const byEmail = await stripe.customers.list({ email: user.email, limit: 10 });
    for (const c of byEmail.data) customerIds.add(c.id);

    if (customerIds.size === 0) {
      logStep('No Stripe customer for caller');
      return new Response(
        JSON.stringify({ error: 'no_subscription', message: 'No billing account found.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // Anything Stripe can still bill for. past_due and unpaid are included
    // deliberately: a failing subscription is exactly the one a user is trying
    // to stop, and excluding it is how people end up unable to cancel.
    const CANCELLABLE = new Set(['active', 'trialing', 'past_due', 'unpaid', 'incomplete']);
    const owned: Stripe.Subscription[] = [];
    for (const cid of customerIds) {
      const subs = await stripe.subscriptions.list({ customer: cid, status: 'all', limit: 20 });
      owned.push(...subs.data.filter((s: Stripe.Subscription) => CANCELLABLE.has(s.status)));
    }

    if (owned.length === 0) {
      logStep('No cancellable subscription for caller', { customers: [...customerIds] });
      return new Response(
        JSON.stringify({
          error: 'no_subscription',
          message: 'No active subscription found to cancel.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // If the client named one, it must be one of theirs.
    const requestedId: string | undefined = body?.subscriptionId;
    if (requestedId && !owned.some((s) => s.id === requestedId)) {
      logStep('SECURITY: subscription does not belong to caller', {
        requestedId,
        userId: user.id,
      });
      return new Response(
        JSON.stringify({ error: 'forbidden', message: 'That subscription is not yours.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Cancel every cancellable subscription the caller has, not just one.
    // Duplicates happen (a resubscribe over a past_due original), and leaving
    // one alive means "I cancelled" followed by another charge.
    const targets = requestedId ? owned.filter((s) => s.id === requestedId) : owned;
    const cancelled: string[] = [];
    for (const s of targets) {
      const done = await stripe.subscriptions.cancel(s.id);
      cancelled.push(done.id);
      // Void anything still open so neither Stripe's retries nor our payday
      // sweep can chase a subscription the customer has just cancelled.
      try {
        const open = await stripe.invoices.list({ customer: s.customer as string, status: 'open' });
        for (const inv of open.data) {
          if (inv.subscription === s.id) await stripe.invoices.voidInvoice(inv.id);
        }
      } catch (voidErr) {
        logStep('Could not void open invoice (non-fatal)', { error: String(voidErr) });
      }
    }
    const canceledSubscription = { status: 'canceled', id: cancelled[0] };
    logStep('Subscription(s) cancelled', { cancelled });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        status: canceledSubscription.status,
        message: 'Subscription cancelled successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'cancel-subscription', requestUrl: req.url, requestMethod: req.method });
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep('ERROR in cancel-subscription', { message: errorMessage });

    // Return a detailed error response
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        message: 'There was an issue cancelling your subscription.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
