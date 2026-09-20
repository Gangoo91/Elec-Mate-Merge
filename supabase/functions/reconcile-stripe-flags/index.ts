// reconcile-stripe-flags — the safety net under profiles.subscribed for
// web (Stripe) customers, the way reconcile-revenuecat already is for the
// stores.
//
// Why (20 Sep 2026): 24 profiles carried subscribed=true with no live
// subscription behind them — one had been on free access for five months
// after a trial Stripe cancelled in April — and the "paying" cohort emails
// reached them. The webhook has since been hardened, but a flag that only a
// webhook can clear is one missed event away from lying again. This runs
// daily and asks Stripe directly.
//
// Rule: a Stripe-billed profile stays subscribed only if its customer holds
// at least one subscription whose status is active, trialing, past_due,
// unpaid or paused. If Stripe holds none of those, the flag is cleared and
// a billing_events row (source 'reconcile-stripe', event_type
// 'FLAG_CLEARED') records it. Profiles touched by anything in the last
// 3 days are left alone so this can never race a webhook.
//
// Safety: a POST without `{ "apply": true }` is a DRY RUN — it reports what
// it would clear and clears nothing. Store-billed and free-access profiles
// are never considered here.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const LIVE = new Set(['active', 'trialing', 'past_due', 'unpaid', 'paused']);
const QUIET_DAYS = 3;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    let body: { apply?: boolean; limit?: number } = {};
    try {
      body = await req.json();
    } catch {
      // no body → dry run
    }
    const apply = body.apply === true;
    const limit = Math.min(Math.max(Number(body.limit) || 500, 1), 1000);

    const quietBefore = new Date(Date.now() - QUIET_DAYS * 86_400_000).toISOString();
    const { data: profiles, error: pErr } = await db
      .from('profiles')
      .select(
        'id, stripe_customer_id, subscription_source, subscription_end, updated_at, full_name, subscription_tier'
      )
      .eq('subscribed', true)
      .in('role', ['electrician', 'apprentice'])
      .or('free_access_granted.is.null,free_access_granted.eq.false')
      .not('stripe_customer_id', 'is', null)
      .or('subscription_source.eq.stripe,subscription_source.is.null')
      .lt('updated_at', quietBefore)
      .limit(limit);
    if (pErr) throw pErr;

    type Row = {
      id: string;
      stripe_customer_id: string;
      subscription_source: string | null;
      subscription_end: string | null;
      updated_at: string;
      full_name: string | null;
    };
    // Employer, Business AI and College accounts can be Stripe-INVOICED with
    // no Subscription object at all; "no live subscription" means nothing for
    // them. Only individual electrician/apprentice plans are judged here.
    const rows = ((profiles ?? []) as (Row & { subscription_tier?: string | null })[]).filter(
      (p) => !/^(employer|business|college|mate)/i.test(p.subscription_tier ?? '')
    );

    const stale: Array<{ id: string; name: string | null; customer: string; statuses: string[] }> =
      [];
    let checked = 0;
    let stripeErrors = 0;
    for (const p of rows) {
      try {
        const subs = await stripe.subscriptions.list({
          customer: p.stripe_customer_id,
          status: 'all',
          limit: 20,
        });
        checked++;
        const statuses = subs.data.map((s: Stripe.Subscription) => s.status);
        if (!statuses.some((s: string) => LIVE.has(s))) {
          stale.push({ id: p.id, name: p.full_name, customer: p.stripe_customer_id, statuses });
        }
      } catch (e) {
        stripeErrors++;
        console.warn(`[reconcile-stripe] Stripe lookup failed for ${p.id}: ${String(e)}`);
      }
    }

    let cleared = 0;
    if (apply) {
      for (const s of stale) {
        const { error: uErr } = await db
          .from('profiles')
          .update({ subscribed: false, is_trial: false, updated_at: new Date().toISOString() })
          .eq('id', s.id)
          .eq('subscribed', true);
        if (uErr) {
          console.warn(`[reconcile-stripe] clear failed for ${s.id}: ${uErr.message}`);
          continue;
        }
        cleared++;
        await db.from('billing_events').insert({
          user_id: s.id,
          source: 'reconcile-stripe',
          event_type: 'FLAG_CLEARED',
          store: 'stripe',
          product_id: s.statuses.join(',') || 'none',
        });
      }
    }

    const summary = {
      success: true,
      apply,
      candidates: rows.length,
      checked,
      stripe_errors: stripeErrors,
      stale: stale.length,
      cleared,
      stale_sample: stale.slice(0, 10),
    };
    console.log('[reconcile-stripe]', JSON.stringify({ ...summary, stale_sample: undefined }));
    if (stale.length > 0 && !apply) {
      // Surface a dry-run finding where it will be seen without anyone polling logs.
      await captureException(
        new Error(
          `reconcile-stripe-flags: ${stale.length} stale subscribed flag(s) found (dry run)`
        ),
        {
          functionName: 'reconcile-stripe-flags',
          requestUrl: req.url,
          requestMethod: req.method,
        }
      );
    }
    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'reconcile-stripe-flags',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'reconcile failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
