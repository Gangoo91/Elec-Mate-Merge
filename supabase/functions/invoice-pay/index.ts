/**
 * invoice-pay — what the permanent Pay now link opens (ELE-1705).
 *
 * POST { invoiceId } → { state, ... }. No JWT: the caller is the client who
 * received the invoice, on the public `/pay/:invoiceId` page.
 *
 * Why it exists: the link in every invoice email, PDF and reminder used to BE
 * a Stripe Checkout session URL, and Stripe expires those after 24 hours
 * (verified on a live session, 4 Oct 2026: expires_at − created = 86,399s).
 * Every card payment on record landed within 17 hours of the send; a client
 * who opened the email on day two met a dead page. Now the email carries
 * `www.elec-mate.com/pay/<id>`, and this mints a fresh session each time it
 * is opened — at the outstanding balance, via the same
 * `create-invoice-payment-link` that has always done the money maths.
 *
 * Always answers 200 with a `state`, so the page can say something useful
 * rather than handle transport errors: ready | paid | adjusted | unavailable |
 * not_found.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function reply(body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  let invoiceId = '';
  try {
    const body = await req.json().catch(() => ({}));
    invoiceId = String(body?.invoiceId ?? '').trim();
    if (!UUID.test(invoiceId)) return reply({ state: 'not_found' });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Deposit invoices live in `invoices`; everything else in legacy `quotes`.
    // Only what the page shows is read — never the line items or the client.
    let row: {
      user_id: string;
      invoice_number: string | null;
      paid: boolean;
    } | null = null;
    {
      const { data } = await admin
        .from('invoices')
        .select('user_id, invoice_number, status, paid_at')
        .eq('id', invoiceId)
        .maybeSingle();
      if (data) {
        row = {
          user_id: data.user_id,
          invoice_number: data.invoice_number,
          paid: data.status === 'paid' || !!data.paid_at,
        };
      }
    }
    if (!row) {
      const { data } = await admin
        .from('quotes')
        .select('user_id, invoice_number, invoice_status, invoice_paid_at')
        .eq('id', invoiceId)
        .maybeSingle();
      if (data?.invoice_number) {
        row = {
          user_id: data.user_id,
          invoice_number: data.invoice_number,
          paid: data.invoice_status === 'paid' || !!data.invoice_paid_at,
        };
      }
    }
    if (!row) return reply({ state: 'not_found' });

    const { data: company } = await admin
      .from('company_profiles')
      .select('company_name, company_email, company_phone')
      .eq('user_id', row.user_id)
      .maybeSingle();
    // The electrician's own business contact — what the page offers when card
    // payment is not possible, so the client is never left with nowhere to go.
    const shown = {
      invoiceNumber: row.invoice_number,
      businessName: company?.company_name ?? null,
      businessEmail: company?.company_email ?? null,
      businessPhone: company?.company_phone ?? null,
    };

    if (row.paid) return reply({ state: 'paid', ...shown });

    /*
     * An issued credit note changes what is owed, and the balance maths in
     * create-invoice-payment-link knows nothing about credit notes (ELE-1704).
     * The old 24-hour links limited that to a day; a permanent link would let
     * a fully credited invoice be paid weeks later. So no card payment here —
     * the page sends the client to the business for the right figure.
     */
    const { count: credits } = await admin
      .from('credit_notes')
      .select('id', { count: 'exact', head: true })
      .eq('invoice_id', invoiceId)
      .eq('status', 'issued');
    if (credits && credits > 0) return reply({ state: 'adjusted', ...shown });

    // Same money path as every other caller: balance-aware, grant-aware,
    // 1% platform fee, destination charge to the electrician's account.
    const res = await fetch(`${supabaseUrl}/functions/v1/create-invoice-payment-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${serviceRoleKey}` },
      body: JSON.stringify({ invoiceId }),
    });
    const minted = await res.json().catch(() => ({}));

    // `checkoutUrl` from the current link function; the version before it
    // returned the session as `url`, so either order of deploy works.
    const checkoutUrl: string | null =
      minted?.checkoutUrl ??
      (typeof minted?.url === 'string' && minted.url.startsWith('https://checkout.stripe.com/')
        ? minted.url
        : null);
    if (res.ok && checkoutUrl) {
      return reply({
        state: 'ready',
        checkoutUrl,
        amount: minted.amount,
        ...shown,
      });
    }
    if (minted?.error === 'stripe_not_connected') return reply({ state: 'unavailable', ...shown });
    if (typeof minted?.error === 'string' && /fully paid/i.test(minted.error)) {
      return reply({ state: 'paid', ...shown });
    }
    console.error('[invoice-pay] mint failed', res.status, minted?.error);
    return reply({ state: 'unavailable', ...shown });
  } catch (error) {
    console.error('[invoice-pay] error', error);
    await captureException(error, {
      functionName: 'invoice-pay',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return reply({ state: 'unavailable' });
  }
});
