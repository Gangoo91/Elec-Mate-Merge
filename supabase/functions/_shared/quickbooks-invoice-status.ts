/**
 * Shared QuickBooks invoice-status helpers.
 *
 * QuickBooks counterpart to xero-invoice-status.ts — used by the manual
 * "Pull status" function (accounting-pull-invoice-status) and the background
 * auto-sync (accounting-pull-all-invoices) so QuickBooks gets the same
 * two-way payment sync as Xero (deposits included).
 *
 * QB models payment state on the Invoice itself: TotalAmt is the invoiced
 * total and Balance is what's still owed. A deposit shows as
 * 0 < Balance < TotalAmt; fully paid is Balance == 0. There is no
 * "FullyPaidOnDate" — we use MetaData.LastUpdatedTime as the best available
 * paid timestamp (applyPaymentStatus falls back to now() when null).
 */

import { decryptToken, encryptToken } from './encryption.ts';
import type { OAuthTokenRow, PullResult } from './xero-invoice-status.ts';

const QUICKBOOKS_CLIENT_ID = Deno.env.get('QUICKBOOKS_CLIENT_ID');
const QUICKBOOKS_CLIENT_SECRET = Deno.env.get('QUICKBOOKS_CLIENT_SECRET');
const QUICKBOOKS_ENVIRONMENT = Deno.env.get('QUICKBOOKS_ENVIRONMENT') || 'sandbox';
const QB_BASE_URL =
  QUICKBOOKS_ENVIRONMENT === 'production'
    ? 'https://quickbooks.api.intuit.com'
    : 'https://sandbox-quickbooks.api.intuit.com';

// deno-lint-ignore no-explicit-any
type SupabaseLike = any;

const round2 = (n: number) => Math.round((Number(n) || 0) * 100) / 100;

// ── Read payment status from QuickBooks ────────────────────────────────────
export async function pullInvoiceStatusFromQuickBooks(
  accessToken: string,
  realmId: string,
  invoiceId: string
): Promise<PullResult> {
  const url = `${QB_BASE_URL}/v3/company/${realmId}/invoice/${invoiceId}?minorversion=70`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`QuickBooks ${res.status}: ${txt.slice(0, 400)}`);
  }

  const json = await res.json();
  const inv = json?.Invoice;
  if (!inv) throw new Error('QuickBooks returned no invoice for that ID');

  const total = round2(inv.TotalAmt ?? 0);
  const balance = round2(inv.Balance ?? 0);
  const isPaid = total > 0 && balance <= 0.005;

  // ELE-1316 (Mark Glowacki) — TotalAmt − Balance is NOT "amount the customer
  // paid". QuickBooks reduces Balance for CIS withholding (its CIS module
  // posts the 20% labour deduction automatically on CIS invoices) and for
  // credit notes — neither is money received, but the old inference showed
  // them as a phantom "deposit paid" in the app, re-applied by every 3h sync.
  // Only count money backed by actual Payment transactions linked to this
  // invoice: fetch them and sum the amounts applied to this invoice.
  let amountPaid = 0;
  // deno-lint-ignore no-explicit-any
  const linkedPaymentIds: string[] = (((inv.LinkedTxn as any[]) ?? []) as any[])
    .filter((t) => t?.TxnType === 'Payment' && t?.TxnId)
    .map((t) => String(t.TxnId));

  if (linkedPaymentIds.length > 0) {
    try {
      const idList = linkedPaymentIds.map((id) => `'${id.replace(/'/g, '')}'`).join(',');
      const q = `SELECT * FROM Payment WHERE Id IN (${idList})`;
      const payRes = await fetch(
        `${QB_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(q)}&minorversion=70`,
        { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } }
      );
      if (payRes.ok) {
        const payJson = await payRes.json();
        // deno-lint-ignore no-explicit-any
        const payments: any[] = payJson?.QueryResponse?.Payment ?? [];
        for (const p of payments) {
          // deno-lint-ignore no-explicit-any
          for (const line of ((p.Line as any[]) ?? []) as any[]) {
            // deno-lint-ignore no-explicit-any
            const linksInvoice = (((line.LinkedTxn as any[]) ?? []) as any[]).some(
              (lt) => lt?.TxnType === 'Invoice' && String(lt?.TxnId) === String(invoiceId)
            );
            if (linksInvoice) amountPaid += Number(line.Amount) || 0;
          }
        }
        amountPaid = round2(amountPaid);
      } else {
        console.warn(
          `[quickbooks-invoice-status] Payment lookup failed (${payRes.status}) — not inferring a paid amount`
        );
      }
    } catch (e) {
      console.warn('[quickbooks-invoice-status] Payment lookup error — not inferring:', e);
    }
  }
  // No linked Payment transactions → nothing received (a zero balance with
  // no payments means the invoice was settled by credits/CIS, not money).

  let paidAt: string | null = null;
  if (isPaid && inv.MetaData?.LastUpdatedTime) {
    const d = new Date(inv.MetaData.LastUpdatedTime);
    if (!Number.isNaN(d.getTime())) paidAt = d.toISOString();
  }

  return {
    isPaid,
    paidAt,
    externalStatus: isPaid ? 'PAID' : amountPaid > 0 ? `PARTIAL (balance ${balance})` : 'OPEN',
    amountPaid,
    amountDue: balance,
  };
}

export interface RecordPaymentResult {
  alreadyPaid: boolean;
  amountRecorded: number;
  externalPaymentId: string | null;
}

/**
 * Record a payment against a QuickBooks invoice (Elec-Mate "Mark as paid" →
 * provider). Pays the invoice's remaining Balance, linked to the invoice so
 * QB closes it; deposits to QB's default Undeposited Funds. If QB already
 * shows it settled, returns alreadyPaid without writing.
 */
export async function recordQuickBooksPayment(
  accessToken: string,
  realmId: string,
  invoiceId: string,
  paidAtISO?: string | null
): Promise<RecordPaymentResult> {
  // Read the invoice for its balance + customer (required on Payment).
  const invRes = await fetch(
    `${QB_BASE_URL}/v3/company/${realmId}/invoice/${invoiceId}?minorversion=70`,
    { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } }
  );
  if (!invRes.ok) {
    const txt = await invRes.text().catch(() => '');
    throw new Error(`QuickBooks invoice lookup ${invRes.status}: ${txt.slice(0, 300)}`);
  }
  const inv = (await invRes.json())?.Invoice;
  if (!inv) throw new Error('QuickBooks returned no invoice for that ID');

  const balance = Math.round((Number(inv.Balance) || 0) * 100) / 100;
  if (balance <= 0.005) {
    return { alreadyPaid: true, amountRecorded: 0, externalPaymentId: null };
  }
  if (!inv.CustomerRef?.value) {
    throw new Error('QuickBooks invoice has no customer reference — cannot record a payment');
  }

  const dateISO = (paidAtISO ? new Date(paidAtISO) : new Date()).toISOString().split('T')[0];
  const payRes = await fetch(
    `${QB_BASE_URL}/v3/company/${realmId}/payment?minorversion=70`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CustomerRef: { value: inv.CustomerRef.value },
        TotalAmt: balance,
        TxnDate: dateISO,
        Line: [
          {
            Amount: balance,
            LinkedTxn: [{ TxnId: invoiceId, TxnType: 'Invoice' }],
          },
        ],
      }),
    }
  );
  if (!payRes.ok) {
    const txt = await payRes.text().catch(() => '');
    throw new Error(`QuickBooks payment ${payRes.status}: ${txt.slice(0, 400)}`);
  }
  const payJson = await payRes.json();
  const paymentId = payJson?.Payment?.Id ?? null;
  return { alreadyPaid: false, amountRecorded: balance, externalPaymentId: paymentId };
}

// ── OAuth: decrypt, refresh-if-expired (persisting), return a usable token ──
export async function getValidQuickBooksAccess(
  supabase: SupabaseLike,
  tokenRow: OAuthTokenRow
): Promise<{ accessToken: string; tenantId: string }> {
  let accessToken = await decryptToken(tokenRow.encrypted_access_token);
  const refreshToken = tokenRow.encrypted_refresh_token
    ? await decryptToken(tokenRow.encrypted_refresh_token)
    : undefined;

  if (new Date(tokenRow.token_expires_at) < new Date()) {
    if (!refreshToken) throw new Error('Token expired and no refresh token available');
    const refreshed = await refreshQuickBooksToken(refreshToken);
    accessToken = refreshed.accessToken;

    const newAccessEnc = await encryptToken(refreshed.accessToken);
    const newRefreshEnc = refreshed.refreshToken
      ? await encryptToken(refreshed.refreshToken)
      : tokenRow.encrypted_refresh_token;

    await supabase
      .from('accounting_oauth_tokens')
      .update({
        encrypted_access_token: newAccessEnc,
        encrypted_refresh_token: newRefreshEnc,
        token_expires_at: new Date(Date.now() + refreshed.expiresIn * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', tokenRow.user_id)
      .eq('provider', tokenRow.provider);
  }

  if (!tokenRow.tenant_id) throw new Error('No realm ID stored for this connection');
  return { accessToken, tenantId: tokenRow.tenant_id };
}

interface RefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export async function refreshQuickBooksToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${QUICKBOOKS_CLIENT_ID}:${QUICKBOOKS_CLIENT_SECRET}`)}`,
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('QuickBooks token refresh failed:', error);
    throw new Error('Failed to refresh QuickBooks session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}
