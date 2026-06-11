/**
 * Shared Xero invoice-status helpers.
 *
 * Used by both the manual "Sync from Xero" function
 * (accounting-pull-invoice-status) and the background auto-sync
 * (accounting-pull-all-invoices). Handles reading payment state from Xero,
 * refreshing OAuth tokens, and writing partial/full payment back to Elec-Mate.
 *
 * Key behaviour (ELE-1041): a deposit is a PARTIAL payment — Xero keeps the
 * invoice AUTHORISED with AmountPaid > 0. We persist `total_paid` so the app
 * shows the reduced outstanding balance, and only flip invoice_status to
 * 'paid' once the invoice is fully settled.
 */

import { decryptToken, encryptToken } from './encryption.ts';

const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');

// Loosely-typed Supabase client — the shared module avoids a hard dependency
// on the SDK's generated types.
// deno-lint-ignore no-explicit-any
type SupabaseLike = any;

export interface PullResult {
  isPaid: boolean;
  paidAt: string | null; // ISO timestamp, or null if not (fully) paid
  externalStatus: string; // raw Xero status for diagnostics
  amountPaid: number;
  amountDue: number;
}

export interface OAuthTokenRow {
  user_id: string;
  provider: string;
  encrypted_access_token: string;
  encrypted_refresh_token: string | null;
  token_expires_at: string;
  tenant_id: string | null;
}

const round2 = (n: number) => Math.round((Number(n) || 0) * 100) / 100;

// ── Read payment status from Xero ──────────────────────────────────────────
export async function pullInvoiceStatusFromXero(
  accessToken: string,
  tenantId: string,
  invoiceId: string
): Promise<PullResult> {
  const url = `https://api.xero.com/api.xro/2.0/Invoices/${invoiceId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Xero ${res.status}: ${txt.slice(0, 400)}`);
  }

  const json = await res.json();
  const inv = json?.Invoices?.[0];
  if (!inv) throw new Error('Xero returned no invoice for that ID');

  // Xero invoice statuses: DRAFT | SUBMITTED | AUTHORISED | PAID | VOIDED | DELETED
  const status = String(inv.Status || '').toUpperCase();
  const isPaid = status === 'PAID';
  const amountPaid = round2(inv.AmountPaid ?? 0);
  const amountDue = round2(inv.AmountDue ?? 0);

  let paidAt: string | null = null;
  if (isPaid && inv.FullyPaidOnDate) {
    paidAt = parseXeroDate(inv.FullyPaidOnDate);
  }

  return { isPaid, paidAt, externalStatus: status, amountPaid, amountDue };
}

export function parseXeroDate(raw: string): string | null {
  // Xero date format: "/Date(1718323200000+0000)/"
  const match = /\/Date\((-?\d+)/.exec(raw);
  if (match) {
    const ms = Number(match[1]);
    if (!Number.isNaN(ms)) return new Date(ms).toISOString();
  }
  const d = new Date(raw);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  return null;
}

// ── OAuth: decrypt, refresh-if-expired (persisting), return a usable token ──
export async function getValidXeroAccess(
  supabase: SupabaseLike,
  tokenRow: OAuthTokenRow
): Promise<{ accessToken: string; tenantId: string }> {
  let accessToken = await decryptToken(tokenRow.encrypted_access_token);
  const refreshToken = tokenRow.encrypted_refresh_token
    ? await decryptToken(tokenRow.encrypted_refresh_token)
    : undefined;

  if (new Date(tokenRow.token_expires_at) < new Date()) {
    if (!refreshToken) throw new Error('Token expired and no refresh token available');
    const refreshed = await refreshXeroToken(refreshToken);
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

  if (!tokenRow.tenant_id) throw new Error('No tenant ID stored for this connection');
  return { accessToken, tenantId: tokenRow.tenant_id };
}

interface RefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export async function refreshXeroToken(refreshToken: string): Promise<RefreshResult> {
  const response = await fetch('https://identity.xero.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Xero token refresh failed:', error);
    throw new Error('Failed to refresh Xero session');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export interface RecordPaymentResult {
  alreadyPaid: boolean;
  amountRecorded: number;
  externalPaymentId: string | null;
}

/**
 * Record a payment against a Xero invoice (Elec-Mate "Mark as paid" →
 * provider). Pays off the invoice's remaining AmountDue into the first
 * payments-enabled bank account. Idempotent in effect: if Xero already
 * shows the invoice settled, returns alreadyPaid without writing.
 */
export async function recordXeroPayment(
  accessToken: string,
  tenantId: string,
  invoiceId: string,
  paidAtISO?: string | null
): Promise<RecordPaymentResult> {
  const current = await pullInvoiceStatusFromXero(accessToken, tenantId, invoiceId);
  if (current.isPaid || current.amountDue <= 0.005) {
    return { alreadyPaid: true, amountRecorded: 0, externalPaymentId: null };
  }

  // Find an account that can receive payments (prefer a bank account).
  const accRes = await fetch(
    'https://api.xero.com/api.xro/2.0/Accounts?where=' +
      encodeURIComponent('EnablePaymentsToAccount==true'),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
    }
  );
  if (!accRes.ok) {
    const txt = await accRes.text().catch(() => '');
    throw new Error(`Xero accounts lookup ${accRes.status}: ${txt.slice(0, 300)}`);
  }
  const accJson = await accRes.json();
  // deno-lint-ignore no-explicit-any
  const accounts: any[] = accJson?.Accounts ?? [];
  const account =
    accounts.find((a) => String(a.Type).toUpperCase() === 'BANK') ?? accounts[0];
  if (!account?.AccountID) {
    throw new Error(
      'No payments-enabled account found in Xero. Enable "payments to this account" on a bank account in Xero, then try again.'
    );
  }

  const dateISO = (paidAtISO ? new Date(paidAtISO) : new Date()).toISOString().split('T')[0];
  const payRes = await fetch('https://api.xero.com/api.xro/2.0/Payments', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Payments: [
        {
          Invoice: { InvoiceID: invoiceId },
          Account: { AccountID: account.AccountID },
          Date: dateISO,
          Amount: current.amountDue,
        },
      ],
    }),
  });
  if (!payRes.ok) {
    const txt = await payRes.text().catch(() => '');
    throw new Error(`Xero payment ${payRes.status}: ${txt.slice(0, 400)}`);
  }
  const payJson = await payRes.json();
  const paymentId = payJson?.Payments?.[0]?.PaymentID ?? null;
  return { alreadyPaid: false, amountRecorded: current.amountDue, externalPaymentId: paymentId };
}

export interface ApplyResult {
  updated: boolean;
  totalPaid: number;
  status: string;
  partiallyPaid: boolean;
  fullyPaid: boolean;
}

// ── Write partial/full payment back to quotes + invoices ───────────────────
export async function applyPaymentStatus(
  supabase: SupabaseLike,
  quoteId: string,
  current: { total: number; currentStatus: string | null; currentTotalPaid: number | null },
  pulled: PullResult
): Promise<ApplyResult> {
  const total = round2(current.total);
  const amountPaid = round2(pulled.amountPaid);
  // Fully paid if Xero says PAID, or AmountPaid covers the total (within a penny).
  const fullyPaid = pulled.isPaid || (total > 0 && amountPaid >= total - 0.005);
  const partiallyPaid = !fullyPaid && amountPaid > 0;

  // deno-lint-ignore no-explicit-any
  const patch: Record<string, any> = {};

  // Record the deposit/partial payment when the figure has actually changed.
  if (amountPaid > 0 && Math.abs(amountPaid - round2(current.currentTotalPaid ?? 0)) > 0.005) {
    patch.total_paid = amountPaid;
  }

  if (fullyPaid && current.currentStatus !== 'paid') {
    patch.invoice_status = 'paid';
    patch.invoice_paid_at = pulled.paidAt ?? new Date().toISOString();
    patch.total_paid = total; // settle to the full amount
  }

  if (Object.keys(patch).length === 0) {
    return {
      updated: false,
      totalPaid: round2(current.currentTotalPaid ?? 0),
      status: current.currentStatus ?? 'unknown',
      partiallyPaid,
      fullyPaid,
    };
  }

  // Source of truth is the legacy quotes row; mirror onto the newer invoices row.
  const { error: qErr } = await supabase.from('quotes').update(patch).eq('id', quoteId);
  if (qErr) console.error('[xero] quotes update failed:', qErr);

  const { error: iErr } = await supabase.from('invoices').update(patch).eq('quote_id', quoteId);
  if (iErr && iErr.code !== 'PGRST116') console.error('[xero] invoices update failed:', iErr);

  return {
    updated: true,
    totalPaid: round2(patch.total_paid ?? current.currentTotalPaid ?? amountPaid),
    status: patch.invoice_status ?? current.currentStatus ?? 'unknown',
    partiallyPaid,
    fullyPaid,
  };
}
