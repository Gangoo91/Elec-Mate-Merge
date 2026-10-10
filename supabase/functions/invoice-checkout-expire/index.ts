/**
 * invoice-checkout-expire — close the card payment page on a cancelled
 * invoice (M4, ELE-2079).
 *
 * POST { invoiceId } from the database only (service-role key):
 * _expire_invoice_checkout, called by _expire_online_bookings and
 * decide_online_booking straight after they cancel a booking deposit.
 *
 * A Stripe Checkout session lives 24 hours, so a customer could still pay a
 * deposit after the booking was released or declined. This expires:
 *   - the session stored on the invoice (stripe_checkout_session_id, written
 *     by create-invoice-payment-link), and
 *   - any other session still open for the invoice (invoice-pay mints a new
 *     one each time the pay page is opened; only the latest is stored), found
 *     by metadata.invoice_id among open sessions from the last 24 hours.
 *
 * Only acts on an invoice that is cancelled or void. If a payment still gets
 * through (it was mid-checkout), stripe-connect-webhook records it for a
 * refund and never marks the invoice paid.
 */
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { captureException } from '../_shared/sentry.ts';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CANCELLED = /^(cancelled|canceled|void|voided)$/i;

function reply(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'service') return deny(corsHeaders);

  try {
    const body = await req.json().catch(() => ({}));
    const invoiceId = String(body?.invoiceId ?? '').trim();
    if (!UUID.test(invoiceId)) return reply({ ok: false, error: 'invoiceId required' }, 400);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let status: string | null = null;
    let stored: string | null = null;
    {
      const { data } = await admin
        .from('invoices')
        .select('status, stripe_checkout_session_id')
        .eq('id', invoiceId)
        .maybeSingle();
      if (data) {
        status = (data as { status: string | null }).status;
        stored = (data as { stripe_checkout_session_id: string | null }).stripe_checkout_session_id;
      } else {
        const { data: q } = await admin
          .from('quotes')
          .select('invoice_status, stripe_checkout_session_id')
          .eq('id', invoiceId)
          .maybeSingle();
        if (!q) return reply({ ok: false, error: 'not_found' }, 404);
        status = (q as { invoice_status: string | null }).invoice_status;
        stored = (q as { stripe_checkout_session_id: string | null }).stripe_checkout_session_id;
      }
    }
    if (!CANCELLED.test(status ?? '')) {
      return reply({ ok: true, skipped: 'invoice is not cancelled' });
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY not configured');
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    const expired: string[] = [];
    const tryExpire = async (id: string) => {
      if (expired.includes(id)) return;
      try {
        const s = await stripe.checkout.sessions.retrieve(id);
        if (s.status === 'open') {
          await stripe.checkout.sessions.expire(id);
          expired.push(id);
        }
      } catch (e) {
        // Already expired or completed: nothing to close.
        console.warn('[invoice-checkout-expire] could not expire', id, (e as Error).message);
      }
    };

    if (stored) await tryExpire(stored);

    // Other open sessions for this invoice from the last 24 hours.
    const since = Math.floor(Date.now() / 1000) - 24 * 3600;
    let startingAfter: string | undefined;
    for (let page = 0; page < 10; page++) {
      const list = await stripe.checkout.sessions.list({
        status: 'open',
        created: { gte: since },
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      for (const s of list.data) {
        if (s.metadata?.invoice_id === invoiceId) await tryExpire(s.id);
      }
      if (!list.has_more || list.data.length === 0) break;
      startingAfter = list.data[list.data.length - 1].id;
    }

    console.log(`[invoice-checkout-expire] ${invoiceId}: expired ${expired.length}`);
    return reply({ ok: true, expired: expired.length });
  } catch (error) {
    console.error('[invoice-checkout-expire] error', error);
    await captureException(error, {
      functionName: 'invoice-checkout-expire',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return reply({ ok: false, error: 'failed' }, 500);
  }
});
