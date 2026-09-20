import { serve } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// ── Linear: every "missing feature" / "found something else" / "bug" answer
// becomes a ticket the moment it is typed (retention plan, 20 Sep 2026). The
// weekly digest used to be the only place these surfaced; a fortnight is too
// long to learn the same gap three times. Same helper shape as
// weekly-churn-digest; no key configured means no ticket, never an error.
function linearGql(query: string, variables: Record<string, unknown>) {
  const key = Deno.env.get('LINEAR_API_KEY');
  if (!key) return Promise.resolve(null);
  return fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { Authorization: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // deno-lint-ignore no-explicit-any
  }).then((r) => r.json() as Promise<any>);
}
async function raiseCancelTicket(
  reason: string,
  detail: string,
  who: { name: string | null; email: string; tier: string | null; wasTrial: boolean }
): Promise<void> {
  try {
    const teams = await linearGql('query { teams(first: 10) { nodes { id key } } }', {});
    const teamId = teams?.data?.teams?.nodes?.find((t: { key: string }) => t.key === 'ELE')?.id;
    if (!teamId) return;
    const label =
      reason === 'missing_feature'
        ? 'Missing feature'
        : reason === 'switching'
          ? 'Switched to another app'
          : 'Bug on the way out';
    const title = `[Cancel] ${label}: ${detail.slice(0, 80)}`;
    const body = [
      `**${who.name ?? 'Unknown'}** ${who.email} · ${who.tier ?? 'tier unknown'} · ${who.wasTrial ? 'trial' : 'paying'}`,
      '',
      `Their words: *"${detail}"*`,
      '',
      `Raised automatically by the cancel flow on ${new Date().toISOString().slice(0, 10)}. Andrew replies within a day; the reply and outcome go in the comments.`,
    ].join('\n');
    await linearGql(
      `mutation($input: IssueCreateInput!) { issueCreate(input: $input) { issue { identifier } } }`,
      { input: { teamId, title, description: body, priority: 3 } }
    );
  } catch (e) {
    console.warn('[cancel] Linear ticket failed (non-fatal):', String(e));
  }
}

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
    // `reason` / `detail` come from the cancel flow's survey step and are
    // passed through to Stripe's cancellation_details so the Stripe dashboard
    // and cancel_survey_responses tell the same story (they disagreed on 58 of
    // 61 September cancellations: Stripe had nothing).
    let body: { subscriptionId?: string; reason?: string; detail?: string } = {};
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
    // Stripe's own vocabulary for cancellation_details.feedback.
    const FEEDBACK: Record<string, string> = {
      too_expensive: 'too_expensive',
      not_using: 'unused',
      missing_feature: 'missing_features',
      switching: 'switched_service',
      bug: 'low_quality',
      other: 'other',
    };
    const cancellation_details = body.reason
      ? {
          feedback: (FEEDBACK[body.reason] ??
            'other') as Stripe.SubscriptionCancelParams.CancellationDetails.Feedback,
          comment: (body.detail ?? '').slice(0, 500) || undefined,
        }
      : undefined;
    // Access runs to the end of what they have, the way the App Store and
    // Play Store already do it. Until 20 Sep 2026 a web cancel was immediate,
    // so someone who cancelled on day 2 of a 7-day trial — or on the 5th of a
    // month they had paid for — was locked out on the spot. past_due / unpaid /
    // incomplete still cancel immediately: there is nothing paid-for to keep.
    let accessUntil: string | null = null;
    for (const s of targets) {
      if (s.status === 'trialing' || s.status === 'active') {
        const done = await stripe.subscriptions.update(s.id, {
          cancel_at_period_end: true,
          ...(cancellation_details ? { cancellation_details } : {}),
        });
        cancelled.push(done.id);
        const endsAt =
          done.trial_end && done.status === 'trialing' ? done.trial_end : done.current_period_end;
        if (endsAt) accessUntil = new Date(endsAt * 1000).toISOString();
        continue;
      }
      const done = await stripe.subscriptions.cancel(s.id, {
        ...(cancellation_details ? { cancellation_details } : {}),
      });
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
    const canceledSubscription = {
      status: accessUntil ? 'cancel_at_period_end' : 'canceled',
      id: cancelled[0],
    };
    // Product losses become tickets on the spot (missing feature / switching / bug with words).
    const detail = (body.detail ?? '').trim();
    if (
      body.reason &&
      ['missing_feature', 'switching', 'bug'].includes(body.reason) &&
      detail.length > 3
    ) {
      const { data: prof } = await serviceClient
        .from('profiles')
        .select('full_name, subscription_tier, is_trial')
        .eq('id', user.id)
        .maybeSingle();
      await raiseCancelTicket(body.reason, detail, {
        name: prof?.full_name ?? null,
        email: user.email,
        tier: prof?.subscription_tier ?? null,
        wasTrial: !!prof?.is_trial || targets.some((s) => s.status === 'trialing'),
      });
    }
    logStep('Subscription(s) cancelled', { cancelled, accessUntil });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        status: canceledSubscription.status,
        access_until: accessUntil,
        message: 'Subscription cancelled successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'cancel-subscription',
      requestUrl: req.url,
      requestMethod: req.method,
    });
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
