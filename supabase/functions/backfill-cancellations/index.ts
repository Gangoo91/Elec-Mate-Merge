// backfill-cancellations — recover the churn history we threw away.
//
// `subscription_cancellations` starts empty and fills from `recordCancellation`
// in the Stripe webhook, which means the reasons only exist for subscriptions
// that end from 27 Sep 2026 onward. That is a month of waiting before anything
// can be decided — and the decision waiting on it is what to do about 305
// subscriptions that have ALREADY ended.
//
// There is no need to wait. Stripe keeps cancelled subscriptions indefinitely
// and keeps `cancellation_details` on them, so the answer for every historical
// leaver is sitting in Stripe right now. This walks them and writes the same
// rows the webhook would have written at the time.
//
// Read-only against Stripe. The only thing it writes is
// `subscription_cancellations`, and every insert is `on conflict do nothing` on
// `subscription_id`, so it cannot duplicate a row the webhook already recorded
// and it is safe to run more than once.
//
//   {}                      → dry run: counts only, writes nothing
//   { apply: true }         → write
//   { apply: true, limit }  → cap the pages walked (default 20 pages / 2,000 subs)
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { getSubscriptionPeriodEnd } from '../_shared/stripe-helpers.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PAGE_SIZE = 100;
const DEFAULT_MAX_PAGES = 20;

type Row = Record<string, unknown>;

/** Same derivation as the webhook's recordCancellation, deliberately. */
function buildRow(
  sub: Stripe.Subscription,
  userId: string | null,
  paid?: { everPaid: boolean; firstPaidAt: number | null }
): Row {
  const details =
    (
      sub as Stripe.Subscription & {
        cancellation_details?: {
          reason?: string | null;
          feedback?: string | null;
          comment?: string | null;
        } | null;
      }
    ).cancellation_details ?? null;

  const reason = details?.reason ?? null;
  const voluntary =
    reason === 'cancellation_requested'
      ? true
      : reason === 'payment_failed' || reason === 'payment_disputed'
        ? false
        : null;

  const price = sub.items?.data?.[0]?.price;
  const trialEnd = sub.trial_end ? new Date(sub.trial_end * 1000) : null;
  const canceledAt = sub.canceled_at ? new Date(sub.canceled_at * 1000) : null;
  const diedInTrial = !trialEnd
    ? false
    : canceledAt
      ? trialEnd.getTime() >= canceledAt.getTime()
      : null;

  const discounts = (sub as Stripe.Subscription & { discounts?: unknown[] | null }).discounts;
  const hadDiscount = Array.isArray(discounts)
    ? discounts.length > 0
    : sub.discount
      ? true
      : null;

  return {
    user_id: userId,
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : (sub.customer?.id ?? null),
    subscription_id: sub.id,
    source: 'stripe',
    stripe_reason: reason,
    feedback: details?.feedback ?? null,
    comment: details?.comment ?? null,
    voluntary,
    tier: sub.metadata?.planId ?? price?.nickname ?? null,
    price_id: price?.id ?? null,
    amount_pence: typeof price?.unit_amount === 'number' ? price.unit_amount : null,
    currency: price?.currency ?? sub.currency ?? null,
    cancel_at_period_end: sub.cancel_at_period_end ?? null,
    canceled_at: canceledAt ? canceledAt.toISOString() : null,
    period_end: getSubscriptionPeriodEnd(sub)?.toISOString() ?? null,
    trial_end: trialEnd ? trialEnd.toISOString() : null,
    died_in_trial: diedInTrial,
    started_at: sub.start_date ? new Date(sub.start_date * 1000).toISOString() : null,
    had_discount: hadDiscount,
    // The churn test. A paid invoice with amount_paid > 0 or it is not churn —
    // a £0.00 trial invoice is not a payment, so a subscription that ends
    // without one is a failed conversion, not a lost customer.
    ever_paid: paid ? paid.everPaid : null,
    first_paid_at: paid?.firstPaidAt ? new Date(paid.firstPaidAt * 1000).toISOString() : null,
    // Marked so a backfilled row can always be told from one the webhook saw
    // live. They are built by identical logic, but one is a reconstruction.
    detail: { cancellation_details: details, metadata: sub.metadata ?? null, backfilled: true },
  };
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const auth = req.headers.get('Authorization') ?? '';
    if (!serviceKey || auth !== `Bearer ${serviceKey}`) {
      return json({ error: 'Unauthorized' }, 401);
    }

    let body: { apply?: boolean; limit?: number } = {};
    try {
      body = await req.json();
    } catch {
      // no body → dry run
    }
    const apply = body.apply === true;
    const maxPages = Math.max(1, Math.min(body.limit ?? DEFAULT_MAX_PAGES, 100));

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    // Which subscriptions ever took real money, and when they first did.
    //
    // Walked once up front rather than one lookup per cancellation: 486
    // cancellations would otherwise be 486 round trips. This is the same source
    // and the same `amount_paid > 0` test that `admin-stripe-stats` uses to build
    // `paidSubscriptionIds`, so `ever_paid` here and
    // `admin_metric_daily.stripe_churned_paid` cannot disagree by construction.
    const firstPaidAt = new Map<string, number>();
    {
      let cursor: string | undefined;
      for (let guard = 0; guard < 200; guard++) {
        const page = await stripe.invoices.list({
          status: 'paid',
          limit: 100,
          ...(cursor ? { starting_after: cursor } : {}),
        });
        for (const inv of page.data) {
          const subId =
            typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
          // The £0.00 trial invoice is status 'paid' too. Only a non-zero
          // amount_paid makes someone a customer.
          if (subId && (inv.amount_paid || 0) > 0) {
            const paidAt = inv.status_transitions?.paid_at ?? inv.created;
            const prev = firstPaidAt.get(subId);
            if (prev == null || paidAt < prev) firstPaidAt.set(subId, paidAt);
          }
        }
        if (!page.has_more || !page.data.length) break;
        cursor = page.data[page.data.length - 1].id;
      }
    }

    // customer id → our user id, in one query rather than one per subscription.
    const customerToUser = new Map<string, string>();
    {
      const { data } = await db
        .from('profiles')
        .select('id, stripe_customer_id')
        .not('stripe_customer_id', 'is', null);
      for (const r of data ?? []) {
        if (r.stripe_customer_id) customerToUser.set(r.stripe_customer_id as string, r.id as string);
      }
    }

    const stats = {
      scanned: 0,
      pages: 0,
      written: 0,
      already_present: 0,
      unmatched_customer: 0,
      with_a_reason: 0,
      with_a_comment: 0,
      involuntary: 0,
      died_in_trial: 0,
      ever_paid: 0,
      never_paid: 0,
      paid_flag_filled_in: 0,
    };
    const sample: Array<Record<string, unknown>> = [];

    let startingAfter: string | undefined;
    for (let page = 0; page < maxPages; page++) {
      const res = await stripe.subscriptions.list({
        status: 'canceled',
        limit: PAGE_SIZE,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      stats.pages++;
      if (!res.data.length) break;

      const rows: Row[] = [];
      for (const sub of res.data) {
        stats.scanned++;
        const customerId =
          typeof sub.customer === 'string' ? sub.customer : (sub.customer?.id ?? null);
        const userId = customerId ? (customerToUser.get(customerId) ?? null) : null;
        if (!userId) stats.unmatched_customer++;

        const firstPaid = firstPaidAt.get(sub.id) ?? null;
        const row = buildRow(sub, userId, { everPaid: firstPaid !== null, firstPaidAt: firstPaid });
        if (firstPaid !== null) stats.ever_paid++;
        else stats.never_paid++;
        if (row.stripe_reason) stats.with_a_reason++;
        if (row.comment) stats.with_a_comment++;
        if (row.voluntary === false) stats.involuntary++;
        if (row.died_in_trial === true) stats.died_in_trial++;
        rows.push(row);

        if (sample.length < 10 && (row.comment || row.feedback)) {
          sample.push({
            subscription_id: row.subscription_id,
            reason: row.stripe_reason,
            feedback: row.feedback,
            comment: row.comment,
            died_in_trial: row.died_in_trial,
          });
        }
      }

      if (apply && rows.length) {
        // ignoreDuplicates → ON CONFLICT DO NOTHING against the unique on
        // subscription_id, so a row the webhook already wrote live is never
        // overwritten by a reconstruction of it.
        const { data: ins, error } = await db
          .from('subscription_cancellations')
          .upsert(rows, { onConflict: 'subscription_id', ignoreDuplicates: true })
          .select('id');
        if (error) throw new Error(`insert failed: ${error.message}`);
        const wrote = ins?.length ?? 0;
        stats.written += wrote;
        stats.already_present += rows.length - wrote;

        // `ignoreDuplicates` above deliberately refuses to touch a row that
        // already exists, so it cannot clobber one the webhook saw live. But
        // rows written before `ever_paid` existed are sitting there null, and
        // those two columns are pure ground truth from Stripe's invoices — so
        // they are safe to fill in, and only ever where still unset.
        for (const r of rows) {
          if (r.ever_paid === null) continue;
          const { data: patched } = await db
            .from('subscription_cancellations')
            .update({ ever_paid: r.ever_paid, first_paid_at: r.first_paid_at })
            .eq('subscription_id', r.subscription_id as string)
            .is('ever_paid', null)
            .select('id');
          stats.paid_flag_filled_in += patched?.length ?? 0;
        }
      }

      if (!res.has_more) break;
      startingAfter = res.data[res.data.length - 1].id;
    }

    return json({ success: true, apply, stats, sample });
  } catch (error) {
    await captureException(error, {
      functionName: 'backfill-cancellations',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
