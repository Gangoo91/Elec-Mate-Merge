/**
 * Check Failed Payments — Dunning Email Sequence (Emails 2 & 3)
 * Runs daily at 10am UTC via pg_cron
 *
 * Email 2: Sent 3+ days after payment failure (amber "Payment Overdue")
 * Email 3: Sent 7+ days after payment failure (red "Final Notice")
 *
 * Stops when invoice is paid (resolved = true) or subscription is cancelled.
 *
 * Payday retry mode: invoked with body {"mode":"payday_retry"} by the
 * friday-payday-retry cron (Friday morning) — re-attempts collection on
 * every open subscription invoice. Most failures are "insufficient funds"
 * and trades get paid on Friday, so a Friday-morning retry lands when the
 * money is actually in the account. Hard declines (lost/stolen/expired
 * card) are skipped — retrying those can't succeed and burns goodwill
 * with the card networks.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { Resend } from '../_shared/mailer.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';
import { renderDunningEmail } from '../_shared/email-templates/dunning.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface FailedPaymentRow {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  stripe_customer_id: string;
  amount_due: number;
  hosted_invoice_url: string | null;
  emails_sent: number;
  created_at: string;
}

/**
 * Generate Email 2 — 3-day "Payment Overdue" reminder
 */
function generateEmail2Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return renderDunningEmail({ name, amount, payUrl: hostedInvoiceUrl, tone: 'overdue' }).html;
}

/**
 * Generate Email 3 — 7-day "Final Notice"
 */
function generateEmail3Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return renderDunningEmail({ name, amount, payUrl: hostedInvoiceUrl, tone: 'final' }).html;
}

serve(async (req: Request) => {
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'check-failed-payments' });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // ── Payday retry mode (Friday-morning cron) ─────────────────────────────
    let bodyMode: string | undefined;
    try {
      const body = await req.json();
      bodyMode = body?.mode;
    } catch {
      // empty/malformed body — normal for the daily dunning cron
    }
    if (bodyMode === 'payday_retry') {
      const paydayStripeKey = Deno.env.get('STRIPE_SECRET_KEY');
      if (!paydayStripeKey) {
        return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const stripe = new Stripe(paydayStripeKey, { apiVersion: '2023-10-16' });

      // Hard declines that a retry can never fix — do not reattempt these.
      const HARD_DECLINES = new Set([
        'stolen_card',
        'lost_card',
        'pickup_card',
        'expired_card',
        'fraudulent',
        'do_not_honor',
        'restricted_card',
        'revocation_of_all_authorizations',
      ]);

      const openInvoices = await stripe.invoices.list({
        status: 'open',
        limit: 100,
        expand: ['data.charge'],
      });

      const results = { attempted: 0, recovered: 0, declined: 0, skipped: 0 };
      const recoveredIds: string[] = [];
      // Age cap: past ~30 days the card is dead and the user has churned —
      // retrying forever gets 0% recovery, pings churned users' banking apps
      // weekly, and looks like card-testing to Stripe Radar. (2026-07-05: a
      // manual run attempted 42 invoices, 31 of them 31-137 days old, and
      // recovered none. The 16 worst were voided the same night.)
      const MAX_RETRY_AGE_DAYS = 30;
      const oldestRetryable = Date.now() / 1000 - MAX_RETRY_AGE_DAYS * 24 * 60 * 60;
      for (const invoice of openInvoices.data) {
        // Subscription invoices only; skip anything already scheduled for
        // collection in the next hour (Stripe is about to retry it anyway).
        if (!invoice.subscription) {
          results.skipped++;
          continue;
        }
        if (invoice.created < oldestRetryable) {
          results.skipped++;
          continue;
        }
        const lastFailure = (invoice.charge as Stripe.Charge | null)?.failure_code;
        if (lastFailure && HARD_DECLINES.has(lastFailure)) {
          results.skipped++;
          logger.info('Payday retry skipping hard decline', {
            invoiceId: invoice.id,
            failureCode: lastFailure,
          });
          continue;
        }
        results.attempted++;
        try {
          await stripe.invoices.pay(invoice.id);
          results.recovered++;
          recoveredIds.push(invoice.id);
          logger.info('Payday retry recovered invoice', {
            invoiceId: invoice.id,
            amount: invoice.amount_due,
          });
        } catch (payError: unknown) {
          results.declined++;
          logger.info('Payday retry declined', {
            invoiceId: invoice.id,
            error: payError instanceof Error ? payError.message : String(payError),
          });
        }
      }

      // Mark recovered invoices resolved so the dunning email sequence stops.
      if (recoveredIds.length > 0) {
        await supabase
          .from('failed_payment_emails')
          .update({ resolved: true })
          .in('stripe_invoice_id', recoveredIds)
          .eq('resolved', false);
      }

      logger.info('Payday retry sweep complete', results);
      return new Response(JSON.stringify({ mode: 'payday_retry', ...results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      logger.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);

    // ── Step 0: Backfill missed failed payments from Stripe ─────────────────
    // Catches any invoice.payment_failed webhooks that were missed
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (stripeKey) {
      try {
        const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

        // Build customer → user_id map
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, stripe_customer_id')
          .not('stripe_customer_id', 'is', null);

        const customerToUser = new Map<string, string>();
        for (const p of profiles ?? []) {
          if (p.stripe_customer_id) customerToUser.set(p.stripe_customer_id, p.id);
        }

        // Get existing invoice IDs to skip duplicates
        const { data: existingRows } = await supabase
          .from('failed_payment_emails')
          .select('stripe_invoice_id');
        const existingIds = new Set((existingRows ?? []).map((r) => r.stripe_invoice_id));

        // Pull open invoices from Stripe (failed payments that Stripe is still retrying)
        let backfilled = 0;
        const openInvoices = await stripe.invoices.list({
          status: 'open',
          limit: 100,
          expand: ['data.subscription'],
        });

        for (const invoice of openInvoices.data) {
          if (!invoice.subscription || existingIds.has(invoice.id)) continue;

          const customerId = invoice.customer as string;
          let userId = customerToUser.get(customerId) || null;

          // Fallback: match by email
          if (!userId) {
            try {
              const customer = await stripe.customers.retrieve(customerId);
              if (!customer.deleted && 'email' in customer && customer.email) {
                const { data: usersData } = await supabase.auth.admin.listUsers({
                  page: 1,
                  perPage: 1000,
                });
                const authUser = usersData?.users?.find(
                  (u: { email?: string }) =>
                    u.email?.toLowerCase() === customer.email!.toLowerCase()
                );
                if (authUser?.id) {
                  userId = authUser.id;
                  await supabase
                    .from('profiles')
                    .update({ stripe_customer_id: customerId })
                    .eq('id', authUser.id);
                  customerToUser.set(customerId, authUser.id);
                }
              }
            } catch {
              /* non-fatal */
            }
          }

          if (!userId) continue;

          const subscriptionId =
            typeof invoice.subscription === 'string'
              ? invoice.subscription
              : (invoice.subscription as Stripe.Subscription)?.id || null;

          const { error: insertErr } = await supabase.from('failed_payment_emails').insert({
            user_id: userId,
            stripe_invoice_id: invoice.id,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            amount_due: invoice.amount_due,
            hosted_invoice_url: invoice.hosted_invoice_url || null,
            emails_sent: 0,
          });

          if (!insertErr) {
            backfilled++;
            existingIds.add(invoice.id);
          }
        }

        // Also check for invoices that were paid since last run — resolve them
        const { data: unresolvedRows } = await supabase
          .from('failed_payment_emails')
          .select('id, stripe_invoice_id')
          .eq('resolved', false);

        let autoResolved = 0;
        for (const row of unresolvedRows ?? []) {
          try {
            const inv = await stripe.invoices.retrieve(row.stripe_invoice_id);
            if (inv.status === 'paid') {
              await supabase
                .from('failed_payment_emails')
                .update({ resolved: true, resolved_at: new Date().toISOString() })
                .eq('id', row.id);
              autoResolved++;
            }
          } catch {
            /* invoice may have been deleted */
          }
        }

        if (backfilled > 0 || autoResolved > 0) {
          logger.info('Stripe sync complete', { backfilled, autoResolved });
        }
      } catch (syncErr: unknown) {
        // Non-fatal — continue with dunning emails even if sync fails
        logger.warn('Stripe sync failed (non-fatal)', { error: (syncErr as Error)?.message });
      }
    } else {
      logger.warn('STRIPE_SECRET_KEY not set — skipping Stripe sync');
    }

    // Fetch unresolved rows that still need emails (< 3 sent)
    const { data: rows, error: queryError } = await supabase
      .from('failed_payment_emails')
      .select(
        'id, user_id, stripe_invoice_id, stripe_customer_id, amount_due, hosted_invoice_url, emails_sent, created_at'
      )
      .eq('resolved', false)
      .lt('emails_sent', 3)
      .order('created_at', { ascending: true });

    if (queryError) {
      logger.error('Failed to query failed_payment_emails', { error: queryError.message });
      return new Response(JSON.stringify({ error: 'Query failed', details: queryError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!rows || rows.length === 0) {
      logger.info('No unresolved failed payments needing follow-up');
      return new Response(
        JSON.stringify({ message: 'No failed payments to process', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    logger.info('Processing failed payment rows', { count: rows.length });

    let emailsSent = 0;
    let skipped = 0;
    const results: Array<{ id: string; status: string; emailNumber?: number; reason?: string }> =
      [];

    for (const row of rows as FailedPaymentRow[]) {
      const now = new Date();
      const createdAt = new Date(row.created_at);
      const daysSinceFailure = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Determine which email to send
      let emailNumber: 2 | 3 | null = null;

      if (row.emails_sent < 3 && daysSinceFailure >= 7) {
        emailNumber = 3;
      } else if (row.emails_sent < 2 && daysSinceFailure >= 3) {
        emailNumber = 2;
      }

      if (!emailNumber) {
        skipped++;
        results.push({ id: row.id, status: 'skipped', reason: 'not yet due' });
        continue;
      }

      // Get user email
      let userEmail: string | null = null;
      let userName = 'there';

      try {
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
          row.user_id
        );

        if (userError || !userData?.user?.email) {
          logger.warn('Could not get user email', {
            userId: row.user_id,
            error: userError?.message,
          });
          skipped++;
          results.push({ id: row.id, status: 'skipped', reason: 'no user email' });
          continue;
        }

        userEmail = userData.user.email;
        userName =
          userData.user.user_metadata?.full_name ||
          userData.user.user_metadata?.name ||
          userEmail.split('@')[0];
      } catch (userErr: unknown) {
        logger.warn('Error fetching user', {
          userId: row.user_id,
          error: (userErr as Error)?.message,
        });
        skipped++;
        results.push({ id: row.id, status: 'skipped', reason: 'user fetch error' });
        continue;
      }

      // Format amount
      const amountFormatted = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format((row.amount_due || 0) / 100);

      const payUrl = row.hosted_invoice_url || 'https://www.elec-mate.com/subscriptions';

      // Generate and send email
      try {
        let subject: string;
        let html: string;

        if (emailNumber === 2) {
          subject = 'Your Elec-Mate payment is overdue';
          html = generateEmail2Html(userName, amountFormatted, payUrl);
        } else {
          subject = 'Final notice — your Elec-Mate subscription';
          html = generateEmail3Html(userName, amountFormatted, payUrl);
        }

        const { error: sendError } = await resend.emails.send({
          from: 'ElecMate <founder@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
          to: [userEmail],
          subject,
          html,
        });

        if (sendError) {
          logger.warn(`Failed to send Email ${emailNumber}`, {
            trackingId: row.id,
            error: JSON.stringify(sendError),
          });
          results.push({
            id: row.id,
            status: 'failed',
            emailNumber,
            reason: JSON.stringify(sendError),
          });
          continue;
        }

        // Update tracking row
        const updateData: Record<string, unknown> = {
          emails_sent: emailNumber,
        };
        if (emailNumber === 2) {
          updateData.email_2_sent_at = new Date().toISOString();
        } else {
          updateData.email_3_sent_at = new Date().toISOString();
        }

        await supabase.from('failed_payment_emails').update(updateData).eq('id', row.id);

        emailsSent++;
        results.push({ id: row.id, status: 'sent', emailNumber });

        logger.info(`Dunning Email ${emailNumber} sent`, {
          trackingId: row.id,
          email: userEmail,
          daysSinceFailure,
        });

        // 2-second delay between sends (Resend rate limiting)
        await new Promise((r) => setTimeout(r, 2000));
      } catch (emailErr: unknown) {
        logger.warn(`Error sending Email ${emailNumber} (non-fatal)`, {
          trackingId: row.id,
          error: (emailErr as Error)?.message,
        });
        results.push({
          id: row.id,
          status: 'error',
          emailNumber,
          reason: (emailErr as Error)?.message,
        });
      }
    }

    logger.info('Check failed payments completed', {
      total: rows.length,
      emailsSent,
      skipped,
    });

    return new Response(
      JSON.stringify({
        success: true,
        total: rows.length,
        emailsSent,
        skipped,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId } }
    );
  } catch (error: unknown) {
    logger.error('Check failed payments error', { error: (error as Error).message });
    await captureException(error, {
      functionName: 'check-failed-payments',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
