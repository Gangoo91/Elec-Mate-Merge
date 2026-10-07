/**
 * Website build: pay through Stripe (ELE-2022 add-on).
 * £199 set-up + £39/month, hosting included, 12-month minimum.
 *
 *   POST { action: 'checkout', notes? }  → { url }  Stripe Checkout (both charges, one go)
 *   POST { action: 'card' }              → { url }  update the card on a website subscription
 *
 * 🔴 Billed on a SEPARATE Stripe customer tagged metadata.kind = 'website'.
 * Every subscription reader in this codebase assumes a subscription = an
 * Elec-Mate plan (stripe-subscription-webhook, sync-stripe-customers,
 * reconcile-stripe-flags, admin-stripe-stats). They all skip kind=website, and
 * keeping it off the account's own customer means the app's billing portal and
 * cancel flow never see it either (that is also what holds the 12-month minimum:
 * cancelling goes through Elec-Mate, not a button).
 */

import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { corsHeaders } from '../_shared/cors.ts';

const APP = 'https://www.elec-mate.com';
const RETURN_PATH = '/electrician/enquiries/setup';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
    const { data: who } = jwt ? await supabase.auth.getUser(jwt) : { data: null };
    const user = who?.user;
    if (!user) return json({ error: 'Sign in again and retry.' }, 401);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });
    const body = await req.json().catch(() => ({}));
    const action = body.action === 'card' ? 'card' : 'checkout';

    const { data: current } = await supabase
      .from('website_build_requests')
      .select('id, status, stripe_customer_id, stripe_subscription_id, notes')
      .eq('user_id', user.id)
      .in('status', ['new', 'contacted', 'paid', 'building', 'live'])
      .maybeSingle();

    // ── Update the card (payment failed, or just a new card) ─────────
    if (action === 'card') {
      if (!current?.stripe_customer_id || !current.stripe_subscription_id) {
        return json({ error: 'No website subscription found.' }, 404);
      }
      const portal = await stripe.billingPortal.sessions.create({
        customer: current.stripe_customer_id,
        return_url: `${APP}${RETURN_PATH}`,
        // Card only: cancelling is not offered here (12-month minimum)
        flow_data: { type: 'payment_method_update' },
      });
      return json({ url: portal.url });
    }

    // ── Pay for a website ─────────────────────────────────────────────
    if (current && ['paid', 'building', 'live'].includes(current.status)) {
      return json({ error: "You've already got a website with us.", already: true }, 409);
    }

    const [{ data: cp }, prices] = await Promise.all([
      supabase
        .from('company_profiles')
        .select('company_name, company_email, company_phone')
        .eq('user_id', user.id)
        .maybeSingle(),
      stripe.prices.list({
        lookup_keys: ['website_monthly_39', 'website_setup_199'],
        active: true,
      }),
    ]);
    const monthly = prices.data.find((p: Stripe.Price) => p.lookup_key === 'website_monthly_39');
    const setup = prices.data.find((p: Stripe.Price) => p.lookup_key === 'website_setup_199');
    if (!monthly || !setup) throw new Error('Website prices missing in Stripe');

    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 1000) : '';
    const email = (cp?.company_email as string | null) || user.email || undefined;
    const company = (cp?.company_name as string | null) || null;

    // The request row this payment belongs to (made now if they went straight to paying)
    let requestId = current?.id as string | undefined;
    if (!requestId) {
      const { data: made, error } = await supabase
        .from('website_build_requests')
        .insert({
          user_id: user.id,
          company_name: company,
          contact_email: email ?? null,
          contact_phone: (cp?.company_phone as string | null) ?? null,
          notes: notes || null,
          price_quoted: '£199 set-up, £39/month, 12-month minimum',
          origin: 'checkout',
        })
        .select('id')
        .single();
      if (error) throw error;
      requestId = made.id as string;
    } else if (notes && !current?.notes) {
      await supabase.from('website_build_requests').update({ notes }).eq('id', requestId);
    }

    // Its own Stripe customer (see header), reused if they come back to checkout
    let customerId = current?.stripe_customer_id as string | null | undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        name: company ?? undefined,
        metadata: { kind: 'website', user_id: user.id, request_id: requestId },
      });
      customerId = customer.id;
      await supabase
        .from('website_build_requests')
        .update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() })
        .eq('id', requestId);
    }

    const tag = { kind: 'website', user_id: user.id, request_id: requestId };
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
        { price: monthly.id, quantity: 1 },
        // One-off, on the first invoice only
        { price: setup.id, quantity: 1 },
      ],
      subscription_data: {
        metadata: tag,
        description: 'Elec-Mate Website: hosting £39/month, 12-month minimum',
      },
      metadata: tag,
      client_reference_id: user.id,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      custom_text: {
        submit: {
          message:
            'Today: £199 set-up plus your first month (£39). Then £39 a month, hosting included. 12-month minimum, then cancel any time by contacting us.',
        },
      },
      success_url: `${APP}${RETURN_PATH}?website=paid`,
      cancel_url: `${APP}${RETURN_PATH}?website=cancelled`,
    });

    await supabase
      .from('website_build_requests')
      .update({ checkout_session_id: session.id, updated_at: new Date().toISOString() })
      .eq('id', requestId);

    return json({ url: session.url });
  } catch (err) {
    console.error('[website-checkout] failed', err);
    await captureException(err, {
      functionName: 'website-checkout',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: "Couldn't open the payment page. Try again in a moment." }, 500);
  }
});
