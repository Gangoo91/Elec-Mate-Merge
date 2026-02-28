/**
 * Backfill Failed Payments — One-time import from Stripe
 *
 * Pulls all open + uncollectible subscription invoices from Stripe,
 * matches them to users, and inserts into failed_payment_emails.
 * Idempotent — skips invoices that already exist in the table.
 *
 * Auth: JWT → profiles.admin_role check
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'backfill-failed-payments' });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

    // ── Verify admin auth ──────────────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAnon = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') as string, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabaseAnon.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!adminProfile?.admin_role) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Init Stripe ────────────────────────────────────────────────────────
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── Build a customer → user_id map from profiles ───────────────────────
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, stripe_customer_id')
      .not('stripe_customer_id', 'is', null);

    const customerToUser = new Map<string, string>();
    for (const p of profiles ?? []) {
      if (p.stripe_customer_id) {
        customerToUser.set(p.stripe_customer_id, p.id);
      }
    }

    logger.info('Customer map built', { count: customerToUser.size });

    // ── Get existing invoice IDs to skip duplicates ────────────────────────
    const { data: existingRows } = await supabase
      .from('failed_payment_emails')
      .select('stripe_invoice_id');

    const existingInvoiceIds = new Set((existingRows ?? []).map((r) => r.stripe_invoice_id));
    logger.info('Existing rows in table', { count: existingInvoiceIds.size });

    // ── Fetch failed invoices from Stripe ──────────────────────────────────
    const results: Array<{
      invoiceId: string;
      status: string;
      action: string;
      reason?: string;
    }> = [];

    let inserted = 0;
    let skipped = 0;
    let noUser = 0;

    // Pull open invoices (unpaid, Stripe still retrying)
    // and uncollectible invoices (Stripe gave up)
    for (const invoiceStatus of ['open', 'uncollectible'] as const) {
      let hasMore = true;
      let startingAfter: string | undefined;

      while (hasMore) {
        const params: Stripe.InvoiceListParams = {
          status: invoiceStatus,
          limit: 100,
          expand: ['data.subscription'],
        };
        if (startingAfter) params.starting_after = startingAfter;

        const invoices = await stripe.invoices.list(params);

        for (const invoice of invoices.data) {
          // Only subscription invoices
          if (!invoice.subscription) {
            results.push({
              invoiceId: invoice.id,
              status: invoiceStatus,
              action: 'skipped',
              reason: 'not a subscription invoice',
            });
            skipped++;
            continue;
          }

          // Skip if already in table
          if (existingInvoiceIds.has(invoice.id)) {
            results.push({
              invoiceId: invoice.id,
              status: invoiceStatus,
              action: 'skipped',
              reason: 'already exists',
            });
            skipped++;
            continue;
          }

          const customerId = invoice.customer as string;
          let userId = customerToUser.get(customerId) || null;

          // Fallback: try to find user by email via auth
          if (!userId) {
            try {
              const customer = await stripe.customers.retrieve(customerId);
              if (!customer.deleted && 'email' in customer && customer.email) {
                const { data: usersData } = await supabase.auth.admin.listUsers({
                  page: 1,
                  perPage: 1000,
                });
                const authUser = usersData?.users?.find(
                  (u: { email?: string }) => u.email === customer.email
                );
                if (authUser?.id) {
                  userId = authUser.id;
                  // Backfill stripe_customer_id
                  await supabase
                    .from('profiles')
                    .update({ stripe_customer_id: customerId })
                    .eq('id', authUser.id);
                  customerToUser.set(customerId, authUser.id);
                }
              }
            } catch {
              // Non-fatal
            }
          }

          if (!userId) {
            results.push({
              invoiceId: invoice.id,
              status: invoiceStatus,
              action: 'skipped',
              reason: 'no matching user',
            });
            noUser++;
            continue;
          }

          // Determine subscription ID
          const subscriptionId =
            typeof invoice.subscription === 'string'
              ? invoice.subscription
              : (invoice.subscription as Stripe.Subscription)?.id || null;

          // Insert the row
          const isUncollectible = invoiceStatus === 'uncollectible';

          const { error: insertError } = await supabase.from('failed_payment_emails').insert({
            user_id: userId,
            stripe_invoice_id: invoice.id,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            amount_due: invoice.amount_due,
            hosted_invoice_url: invoice.hosted_invoice_url || null,
            emails_sent: 0,
            resolved: isUncollectible,
            resolved_at: isUncollectible ? new Date().toISOString() : null,
          });

          if (insertError) {
            results.push({
              invoiceId: invoice.id,
              status: invoiceStatus,
              action: 'error',
              reason: insertError.message,
            });
          } else {
            inserted++;
            existingInvoiceIds.add(invoice.id);
            results.push({
              invoiceId: invoice.id,
              status: invoiceStatus,
              action: 'inserted',
            });
          }
        }

        hasMore = invoices.has_more;
        if (invoices.data.length > 0) {
          startingAfter = invoices.data[invoices.data.length - 1].id;
        }
      }
    }

    logger.info('Backfill complete', { inserted, skipped, noUser });

    return new Response(
      JSON.stringify({
        success: true,
        inserted,
        skipped,
        noUser,
        results,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'x-request-id': requestId,
        },
      }
    );
  } catch (error: unknown) {
    logger.error('Backfill error', { error: (error as Error).message });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
