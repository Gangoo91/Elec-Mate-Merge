/**
 * Sage Business Cloud Accounting (API v3.1) payment status, for the two-way
 * sync (ELE-2077). The Sage counterpart of quickbooks-invoice-status.ts.
 *
 * GET /v3.1/sales_invoices/:id returns total_amount, outstanding_amount and
 * status.id (DRAFT, UNPAID, PART_PAID, PAID, VOID). Every request needs the
 * X-Site header (the connection's resource_owner_id, stored as tenant_id).
 * Access tokens last 5 minutes; the refresh token is exchanged at
 * https://oauth.accounting.sage.com/token with the client id and secret.
 */
import type { PullResult } from './xero-invoice-status.ts';

const SAGE_CLIENT_ID = Deno.env.get('SAGE_CLIENT_ID');
const SAGE_CLIENT_SECRET = Deno.env.get('SAGE_CLIENT_SECRET');
const round2 = (n: number) => Math.round((Number(n) || 0) * 100) / 100;

export async function pullInvoiceStatusFromSage(
  accessToken: string,
  resourceOwnerId: string,
  invoiceId: string
): Promise<PullResult> {
  const res = await fetch(
    `https://api.accounting.sage.com/v3.1/sales_invoices/${encodeURIComponent(invoiceId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Site': resourceOwnerId,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(15_000),
    }
  );
  if (!res.ok)
    throw new Error(`Sage ${res.status}: ${(await res.text().catch(() => '')).slice(0, 400)}`);
  const inv = (await res.json()) as {
    total_amount?: string | number;
    outstanding_amount?: string | number;
    status?: { id?: string };
    last_paid?: string | null;
    updated_at?: string;
  };
  const total = round2(Number(inv.total_amount));
  const due = round2(Number(inv.outstanding_amount));
  const status = String(inv.status?.id ?? '').toUpperCase();
  const isPaid = status === 'PAID' || (total > 0 && due <= 0.005);
  const when = inv.last_paid ?? inv.updated_at ?? null;
  return {
    isPaid,
    paidAt: isPaid && when ? new Date(when).toISOString() : null,
    externalStatus: status || 'UNKNOWN',
    amountPaid: round2(Math.max(0, total - due)),
    amountDue: due,
  };
}

export async function refreshSageToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken?: string; expiresIn: number }> {
  const res = await fetch('https://oauth.accounting.sage.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: SAGE_CLIENT_ID!,
      client_secret: SAGE_CLIENT_SECRET!,
    }),
  });
  if (!res.ok)
    throw new Error(`Failed to refresh Sage session: ${(await res.text()).slice(0, 200)}`);
  const d = await res.json();
  return { accessToken: d.access_token, refreshToken: d.refresh_token, expiresIn: d.expires_in };
}
