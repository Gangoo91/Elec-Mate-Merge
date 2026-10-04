// describe-offer — what is this offer code actually worth?
//
// The subscriptions page needs to tell someone "30% off for 6 months" before
// they hand over a card. Every previous attempt at that hard-coded the number
// into the component, and every one of them went stale: the `?winback=` banner
// on that same page advertised £4.99 and £16.99 for months after the
// underlying prices moved, because nothing made the copy and the coupon agree.
//
// So the page asks Stripe instead. This resolves a promo_offers code to the
// real percentage and duration on the live coupon, and returns nothing at all
// if the code is unknown, inactive, expired or out of redemptions — in which
// case the page shows no banner rather than a promise we will not honour.
//
// Read-only and deliberately dull. It applies nothing; create-checkout does
// that, from the same promo_offers row, so the two cannot disagree.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { captureException } from '../_shared/sentry.ts';
import { offerSiblingCandidates } from '../_shared/offer-sibling.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const INVALID = { valid: false } as const;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    // Open to signed-out visitors (2 Oct 2026). The sign-up page needs to say
    // "25% off for 6 months — £14.99/mo" before an account exists; behind auth
    // it could only say "discount applied at checkout". Codes are printed on
    // posters and in posts, an exact code is required, and nothing is applied
    // here — create-checkout does that — so there is nothing to protect.
    const { code } = (await req.json().catch(() => ({}))) as { code?: string };
    const wanted = (code ?? '').trim().toUpperCase();
    if (!wanted) return json(INVALID);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    type OfferRow = {
      code: string;
      plan_id: string;
      price: string | null;
      is_active: boolean;
      expires_at: string | null;
      max_redemptions: number | null;
      redemptions: number | null;
      stripe_coupon_id: string | null;
    };
    const COLS =
      'code, plan_id, price, is_active, expires_at, max_redemptions, redemptions, stripe_coupon_id';

    // The live, redeemable description of one row — or null.
    const describe = async (offer: OfferRow | null) => {
      if (!offer || !offer.is_active || !offer.stripe_coupon_id) return null;
      if (offer.expires_at && new Date(offer.expires_at) < new Date()) return null;
      if (offer.max_redemptions && (offer.redemptions ?? 0) >= offer.max_redemptions) return null;
      const coupon = await stripe.coupons.retrieve(offer.stripe_coupon_id);
      // A coupon can be deleted or expired in Stripe while our row still says
      // active. Stripe is the one that decides at checkout, so Stripe decides here.
      if (!coupon || coupon.valid === false || !coupon.percent_off) return null;
      return {
        code: offer.code,
        plan_id: offer.plan_id,
        // Discounted monthly price as stored on the row, e.g. "14.99".
        price: offer.price,
        percent_off: coupon.percent_off,
        // null duration_in_months means "forever" — the page words that itself.
        duration_in_months: coupon.duration === 'repeating' ? coupon.duration_in_months : null,
        duration: coupon.duration,
      };
    };

    const { data: row } = await admin
      .from('promo_offers')
      .select(COLS)
      .eq('code', wanted)
      .maybeSingle();
    const main = await describe(row as OfferRow | null);
    if (!main) return json(INVALID);

    // The same offer for the other plan, so the sign-up page can keep the
    // discount when someone picks the plan the link was not for.
    let sibling = null;
    const candidates = offerSiblingCandidates(main.code);
    if (candidates.length) {
      const { data: rows } = await admin
        .from('promo_offers')
        .select(COLS)
        .in('code', candidates)
        .neq('plan_id', main.plan_id)
        .eq('is_active', true);
      const ordered = candidates
        .map((c) => (rows ?? []).find((r: OfferRow) => r.code === c))
        .filter(Boolean) as OfferRow[];
      for (const r of ordered) {
        sibling = await describe(r);
        if (sibling) break;
      }
    }

    return json({ valid: true, ...main, sibling });
  } catch (error) {
    await captureException(error, {
      functionName: 'describe-offer',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    // Never fail loudly: the page just shows no banner.
    return json(INVALID);
  }
});
