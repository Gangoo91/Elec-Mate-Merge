/**
 * Accounting Pull All Invoices (background auto-sync)
 *
 * Cron-driven counterpart to accounting-pull-invoice-status. For every user
 * with a connected Xero OR QuickBooks account, refreshes the payment status
 * of their open (not fully paid) synced invoices and writes back deposits /
 * full payments.
 *
 * This is what makes a Xero/QuickBooks deposit show up in Elec-Mate WITHOUT
 * the user manually tapping "Pull status" (ELE-1041). Service-role only —
 * intended to be invoked by pg_cron with the service-role bearer token.
 *
 * Bounded for provider rate limits (Xero 60/min/tenant is the tighter one):
 * a capped number of invoices per tenant, with a short pause between calls.
 */

import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from '../_shared/deps.ts';
import {
  pullInvoiceStatusFromXero,
  getValidXeroAccess,
  applyPaymentStatus,
  type OAuthTokenRow,
} from '../_shared/xero-invoice-status.ts';
import {
  pullInvoiceStatusFromQuickBooks,
  getValidQuickBooksAccess,
} from '../_shared/quickbooks-invoice-status.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const MAX_INVOICES_PER_TENANT = 40; // Xero allows 60 calls/min/tenant
const CALL_SPACING_MS = 250;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const summary = { tenants: 0, checked: 0, updated: 0, errors: 0 };

  try {
    // All connected accounts with a two-way pull implementation.
    const { data: tokens, error: tokenErr } = await supabase
      .from('accounting_oauth_tokens')
      .select(
        'user_id, provider, encrypted_access_token, encrypted_refresh_token, token_expires_at, tenant_id'
      )
      .in('provider', ['xero', 'quickbooks']);

    if (tokenErr) throw tokenErr;

    for (const tokenRow of (tokens ?? []) as OAuthTokenRow[]) {
      summary.tenants++;

      // Open, synced invoices for this user (source of truth = quotes).
      const { data: invoices, error: invErr } = await supabase
        .from('quotes')
        .select('id, total, total_paid, partial_payments, invoice_status, external_invoice_id')
        .eq('user_id', tokenRow.user_id)
        .eq('invoice_raised', true)
        .eq('external_invoice_provider', tokenRow.provider)
        .not('external_invoice_id', 'is', null)
        .or('invoice_status.is.null,invoice_status.neq.paid')
        .limit(MAX_INVOICES_PER_TENANT);

      if (invErr) {
        console.error(`[pull-all] invoice query failed for ${tokenRow.user_id}:`, invErr);
        summary.errors++;
        continue;
      }
      if (!invoices || invoices.length === 0) continue;

      // Get a valid access token once per tenant (refreshing/persisting if needed).
      let accessToken: string;
      let tenantId: string;
      try {
        ({ accessToken, tenantId } =
          tokenRow.provider === 'quickbooks'
            ? await getValidQuickBooksAccess(supabase, tokenRow)
            : await getValidXeroAccess(supabase, tokenRow));
      } catch (authErr) {
        console.error(`[pull-all] token unusable for ${tokenRow.user_id}:`, authErr);
        summary.errors++;
        continue;
      }

      for (const inv of invoices) {
        summary.checked++;
        try {
          const pulled =
            tokenRow.provider === 'quickbooks'
              ? await pullInvoiceStatusFromQuickBooks(
                  accessToken,
                  tenantId,
                  inv.external_invoice_id as string
                )
              : await pullInvoiceStatusFromXero(
                  accessToken,
                  tenantId,
                  inv.external_invoice_id as string
                );
          const applied = await applyPaymentStatus(
            supabase,
            inv.id as string,
            {
              total: Number(inv.total ?? 0),
              currentStatus: inv.invoice_status,
              currentTotalPaid: Number(inv.total_paid ?? 0),
              currentPartialPayments: (inv.partial_payments as unknown[] | null) ?? null,
            },
            pulled
          );
          if (applied.updated) summary.updated++;
        } catch (pullErr) {
          console.error(`[pull-all] pull failed for quote ${inv.id}:`, pullErr);
          summary.errors++;
        }
        await sleep(CALL_SPACING_MS);
      }
    }

    return new Response(JSON.stringify({ success: true, ...summary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[accounting-pull-all-invoices] handler error', err);
    await captureException(err, { functionName: 'accounting-pull-all-invoices' });
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ success: false, error: msg, ...summary }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
