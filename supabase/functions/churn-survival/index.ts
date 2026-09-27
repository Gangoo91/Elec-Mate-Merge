// churn-survival — the real tenure hazard curve, measured.
//
// The business plan prices everything off `HAZ = [0.150, 0.125, 0.078, 0.074,
// 0.083, 0.057]` with a 7% tail (`Business-Plan/model_tiered.py`). Those are the
// single most load-bearing numbers in the model: they set LTV, they set the
// funded case, and a point of monthly churn compounds into a very different
// ARR. They were derived from "507 paying subs" and never re-measured.
//
// Two things make re-measuring worth the trouble:
//   1. Of 486 ended Stripe subscriptions, 282 had NEVER PAID US A PENNY. If the
//      original curve counted those, it is measuring failed conversion, not
//      churn, and the plan is carrying roughly twice the churn it should.
//   2. Tenure has to be counted from the FIRST REAL PAYMENT, not from
//      `subscription_start` (which resets every billing period — 320 of 366
//      active subscribers read as "under 30 days old" by that column) and not
//      from signup (which includes the free trial).
//
// Method. Walk every paid Stripe invoice to find when each subscription first
// paid real money (the same `amount_paid > 0` test `admin-stripe-stats` uses).
// Anything with a row in `subscription_cancellations` ended; anything else is
// still running and is right-censored at today. Then a standard discrete-time
// hazard per paid month: leavers in month m ÷ subscriptions that reached month m.
//
// Read-only. Writes nothing, changes nothing.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const DAYS_PER_MONTH = 30.44;
const MAX_MONTH = 12;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), {
      status: s,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    if ((req.headers.get('Authorization') ?? '') !== `Bearer ${serviceKey}`) {
      return json({ error: 'Unauthorized' }, 401);
    }

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    // ── When did each subscription first take real money ────────────────
    const firstPaid = new Map<string, number>();
    let cursor: string | undefined;
    for (let page = 0; page < 200; page++) {
      const res = await stripe.invoices.list({
        status: 'paid',
        limit: 100,
        ...(cursor ? { starting_after: cursor } : {}),
      });
      for (const inv of res.data) {
        const subId =
          typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
        // The £0.00 trial invoice is also status 'paid'; only a non-zero
        // amount makes someone a paying customer.
        if (subId && (inv.amount_paid || 0) > 0) {
          const at = inv.status_transitions?.paid_at ?? inv.created;
          const prev = firstPaid.get(subId);
          if (prev == null || at < prev) firstPaid.set(subId, at);
        }
      }
      if (!res.has_more || !res.data.length) break;
      cursor = res.data[res.data.length - 1].id;
    }

    // ── Which of those ended, and when ──────────────────────────────────
    const endedAt = new Map<string, number>();
    {
      let from = 0;
      for (;;) {
        const { data, error } = await db
          .from('subscription_cancellations')
          .select('subscription_id, canceled_at, ever_paid')
          .eq('source', 'stripe')
          .range(from, from + 999);
        if (error) throw new Error(error.message);
        for (const r of data ?? []) {
          if (r.subscription_id && r.canceled_at && r.ever_paid) {
            endedAt.set(r.subscription_id, new Date(r.canceled_at).getTime() / 1000);
          }
        }
        if (!data || data.length < 1000) break;
        from += 1000;
      }
    }

    // ── Discrete-time hazard per paid month ─────────────────────────────
    const now = Math.floor(Date.now() / 1000);
    const leavers = new Array(MAX_MONTH + 2).fill(0);
    const reached = new Array(MAX_MONTH + 2).fill(0);
    let payers = 0;
    let stillRunning = 0;

    for (const [subId, paidAt] of firstPaid) {
      payers++;
      const end = endedAt.get(subId);
      const churned = end != null;
      if (!churned) stillRunning++;
      const days = ((churned ? end! : now) - paidAt) / 86400;
      const monthsLived = Math.max(0, Math.floor(days / DAYS_PER_MONTH));

      // Reached the start of every month up to the one it died in (or the one
      // it is currently living through).
      const cap = Math.min(monthsLived, MAX_MONTH + 1);
      for (let m = 0; m <= cap; m++) reached[m]++;
      if (churned && monthsLived <= MAX_MONTH + 1) leavers[monthsLived]++;
    }

    const curve = [];
    for (let m = 0; m <= MAX_MONTH; m++) {
      curve.push({
        paid_month: m + 1,
        reached: reached[m],
        left: leavers[m],
        hazard: reached[m] ? Number((leavers[m] / reached[m]).toFixed(4)) : null,
      });
    }

    // The "tail" the plan uses is the steady-state rate once the early
    // cliff is past — months 7+ pooled.
    let tailLeft = 0;
    let tailReached = 0;
    for (let m = 6; m <= MAX_MONTH; m++) {
      tailLeft += leavers[m];
      tailReached += reached[m];
    }

    return json({
      success: true,
      basis: 'paying Stripe subscriptions only; tenure measured from first invoice with amount_paid > 0',
      payers,
      churned: payers - stillRunning,
      still_running: stillRunning,
      curve,
      measured_tail_month7plus: tailReached ? Number((tailLeft / tailReached).toFixed(4)) : null,
      plan_assumption: { HAZ: [0.15, 0.125, 0.078, 0.074, 0.083, 0.057], TAIL_M: 0.07 },
    });
  } catch (error) {
    await captureException(error, { functionName: 'churn-survival', requestUrl: req.url });
    return json({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
