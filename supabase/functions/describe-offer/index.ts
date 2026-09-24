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
    // Signed-in users only. The discount itself is not secret, but there is no
    // reason to let anyone enumerate every code we have ever issued.
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!authHeader) return json(INVALID, 401);
    const asUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
    } = await asUser.auth.getUser();
    if (!user) return json(INVALID, 401);

    const { code } = (await req.json().catch(() => ({}))) as { code?: string };
    const wanted = (code ?? '').trim().toUpperCase();
    if (!wanted) return json(INVALID);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { data: offer } = await admin
      .from('promo_offers')
      .select(
        'code, plan_id, is_active, expires_at, max_redemptions, redemptions, stripe_coupon_id'
      )
      .eq('code', wanted)
      .maybeSingle();

    if (!offer || !offer.is_active || !offer.stripe_coupon_id) return json(INVALID);
    if (offer.expires_at && new Date(offer.expires_at) < new Date()) return json(INVALID);
    if (offer.max_redemptions && (offer.redemptions ?? 0) >= offer.max_redemptions) {
      return json(INVALID);
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });
    const coupon = await stripe.coupons.retrieve(offer.stripe_coupon_id);
    // A coupon can be deleted or expired in Stripe while our row still says
    // active. Stripe is the one that decides at checkout, so Stripe decides here.
    if (!coupon || coupon.valid === false || !coupon.percent_off) return json(INVALID);

    return json({
      valid: true,
      code: offer.code,
      plan_id: offer.plan_id,
      percent_off: coupon.percent_off,
      // null duration_in_months means "forever" — the page words that itself.
      duration_in_months: coupon.duration === 'repeating' ? coupon.duration_in_months : null,
      duration: coupon.duration,
    });
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
