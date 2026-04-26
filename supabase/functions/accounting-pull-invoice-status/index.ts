/**
 * Accounting Pull Invoice Status
 *
 * Manual "Sync from Xero" — given an Elec-Mate invoice ID, fetches the
 * latest payment status from the connected accounting provider and writes
 * it back to both `invoices` and the legacy `quotes` row.
 *
 * Phase 1: Xero only. The plumbing supports adding QuickBooks / Sage /
 * FreshBooks later — each provider just needs its own pullInvoiceStatusFromX
 * implementation that returns { isPaid, paidAt }.
 *
 * Why this exists (ELE-872): the existing accounting-sync-invoice function
 * is one-way (Elec-Mate → Xero). When a user marks an invoice paid in Xero,
 * Elec-Mate has no idea — there's no webhook receiver. This function gives
 * the user a manual "refresh" they can hit from the invoice detail screen.
 *
 * Body: { invoiceId: string }
 * Returns:
 *   200 { success: true, isPaid: bool, paidAt: string|null, provider: string,
 *         updated: bool, externalStatus: string }
 *   200 { success: false, error, detail, httpStatus }   // soft errors
 */

import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';
import { createClient } from '../_shared/deps.ts';
import { decryptToken, encryptToken } from '../_shared/encryption.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

const XERO_CLIENT_ID = Deno.env.get('XERO_CLIENT_ID');
const XERO_CLIENT_SECRET = Deno.env.get('XERO_CLIENT_SECRET');

type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'freshbooks';

interface PullResult {
  isPaid: boolean;
  paidAt: string | null; // ISO timestamp, or null if not paid
  externalStatus: string; // raw provider status for diagnostics
  amountPaid?: number;
  amountDue?: number;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Soft error — returned as 200 so the frontend always reads the body.
function errorResponse(error: string, detail?: string, httpStatus = 400) {
  return jsonResponse({ success: false, error, detail, httpStatus });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ─── 1. Auth ───────────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return errorResponse('Authorization header required', undefined, 401);

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: authData, error: authError } = await userClient.auth.getUser();
    if (authError || !authData.user) {
      return errorResponse('Authentication required', authError?.message, 401);
    }
    const user = authData.user;

    // ─── 2. Body ───────────────────────────────────────────────────────
    let invoiceId: string;
    try {
      const body = await req.json();
      invoiceId = body.invoiceId;
    } catch (e) {
      return errorResponse('Invalid JSON body', String(e), 400);
    }
    if (!invoiceId) return errorResponse('Invoice ID required', undefined, 400);

    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRe.test(invoiceId)) {
      return errorResponse('Invalid invoice ID format', `Got: ${invoiceId}`, 400);
    }

    // ─── 3. Load invoice ───────────────────────────────────────────────
    // Source of truth is the `quotes` table (where invoice_raised=true). The
    // newer `invoices` table mirrors the same external_invoice_* columns so
    // we'll write to both.
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: quote, error: quoteErr } = await supabase
      .from('quotes')
      .select(
        'id, invoice_number, invoice_status, invoice_paid_at, total, external_invoice_id, external_invoice_provider'
      )
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .single();

    if (quoteErr || !quote) {
      return errorResponse('Invoice not found or access denied', quoteErr?.message, 404);
    }

    if (!quote.external_invoice_id || !quote.external_invoice_provider) {
      return errorResponse(
        'This invoice was never synced to an accounting provider',
        'Use "Sync to Xero" first — there is no external invoice ID stored on this row, so we have nothing to look up.',
        409
      );
    }

    const provider = quote.external_invoice_provider as AccountingProvider;
    const externalId = quote.external_invoice_id;

    // ─── 4. Load + decrypt OAuth tokens ────────────────────────────────
    const { data: tokenRow, error: tokenErr } = await supabase
      .from('accounting_oauth_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', provider)
      .single();

    if (tokenErr || !tokenRow) {
      return errorResponse(
        `No ${provider} connection found. Please reconnect your account.`,
        tokenErr?.message,
        400
      );
    }

    const encKey = Deno.env.get('ENCRYPTION_KEY');
    if (!encKey || encKey.length !== 64) {
      return errorResponse(
        'ENCRYPTION_KEY misconfigured on server',
        `length=${encKey?.length ?? 0}`,
        500
      );
    }

    let accessToken: string;
    let refreshToken: string | undefined;
    try {
      accessToken = await decryptToken(tokenRow.encrypted_access_token);
      if (tokenRow.encrypted_refresh_token) {
        refreshToken = await decryptToken(tokenRow.encrypted_refresh_token);
      }
    } catch (decErr) {
      return errorResponse(
        'Token decryption failed — please reconnect your accounting software',
        String(decErr),
        500
      );
    }

    // ─── 5. Refresh token if expired ──────────────────────────────────
    const isExpired = new Date(tokenRow.token_expires_at) < new Date();
    if (isExpired) {
      if (!refreshToken) {
        return errorResponse(
          'Token expired and no refresh token available. Please reconnect.',
          undefined,
          401
        );
      }
      try {
        const refreshed = await refreshAccessToken(provider, refreshToken);
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
          .eq('user_id', user.id)
          .eq('provider', provider);
      } catch (refreshErr) {
        return errorResponse('Token refresh failed', String(refreshErr), 401);
      }
    }

    const tenantId = tokenRow.tenant_id;
    if (!tenantId) {
      return errorResponse(`No tenant ID stored for ${provider}`, undefined, 400);
    }

    // ─── 6. Pull from provider ────────────────────────────────────────
    let pulled: PullResult;
    try {
      switch (provider) {
        case 'xero':
          pulled = await pullInvoiceStatusFromXero(accessToken, tenantId, externalId);
          break;
        default:
          return errorResponse(
            `Pull-from-${provider} not yet supported`,
            'Phase 1 only supports Xero. Other providers will be added later.',
            501
          );
      }
    } catch (pullErr) {
      const msg = pullErr instanceof Error ? pullErr.message : String(pullErr);
      return errorResponse(`Failed to read from ${provider}`, msg, 502);
    }

    // ─── 7. Write back to Elec-Mate (if the status actually changed) ──
    const wasAlreadyPaidInElecMate = quote.invoice_status === 'paid';
    let updated = false;

    if (pulled.isPaid && !wasAlreadyPaidInElecMate) {
      const paidAtIso = pulled.paidAt ?? new Date().toISOString();
      const updatePatch = {
        invoice_status: 'paid',
        invoice_paid_at: paidAtIso,
      };

      // Update the legacy quotes row (source of truth for invoice display).
      const { error: qUpdErr } = await supabase
        .from('quotes')
        .update(updatePatch)
        .eq('id', invoiceId)
        .eq('user_id', user.id);
      if (qUpdErr) console.error('quotes update failed:', qUpdErr);

      // Mirror onto invoices (newer table — quote_id FK back to quotes.id).
      const { error: iUpdErr } = await supabase
        .from('invoices')
        .update(updatePatch)
        .eq('quote_id', invoiceId);
      // invoices may not have a row for older quotes — only log if real error
      if (iUpdErr && iUpdErr.code !== 'PGRST116') {
        console.error('invoices update failed:', iUpdErr);
      }

      updated = true;
    }

    return jsonResponse({
      success: true,
      isPaid: pulled.isPaid,
      paidAt: pulled.paidAt,
      provider,
      externalStatus: pulled.externalStatus,
      amountPaid: pulled.amountPaid,
      amountDue: pulled.amountDue,
      updated,
      wasAlreadyPaidInElecMate,
    });
  } catch (err) {
    console.error('[accounting-pull-invoice-status] handler error', err);
    await captureException(err, {
      functionName: 'accounting-pull-invoice-status',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const msg = err instanceof Error ? err.message : String(err);
    return errorResponse('Unexpected server error', msg, 500);
  }
});

// ════════════════════════════════════════════════════════════════════
// Xero
// ════════════════════════════════════════════════════════════════════

async function pullInvoiceStatusFromXero(
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
  const amountPaid = Number(inv.AmountPaid ?? 0);
  const amountDue = Number(inv.AmountDue ?? 0);

  // Xero gives FullyPaidOnDate for PAID invoices in /Date(...)/ ms format.
  let paidAt: string | null = null;
  if (isPaid && inv.FullyPaidOnDate) {
    paidAt = parseXeroDate(inv.FullyPaidOnDate);
  }

  return { isPaid, paidAt, externalStatus: status, amountPaid, amountDue };
}

function parseXeroDate(raw: string): string | null {
  // Xero date format: "/Date(1718323200000+0000)/"
  const match = /\/Date\((-?\d+)/.exec(raw);
  if (match) {
    const ms = Number(match[1]);
    if (!Number.isNaN(ms)) return new Date(ms).toISOString();
  }
  // Fallback: maybe ISO already
  const d = new Date(raw);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  return null;
}

// ════════════════════════════════════════════════════════════════════
// Token refresh (mirrors accounting-sync-invoice — Xero-only for now)
// ════════════════════════════════════════════════════════════════════

interface RefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

async function refreshAccessToken(
  provider: AccountingProvider,
  refreshToken: string
): Promise<RefreshResult> {
  switch (provider) {
    case 'xero':
      return refreshXeroToken(refreshToken);
    default:
      throw new Error(`Refresh not implemented for ${provider}`);
  }
}

async function refreshXeroToken(refreshToken: string): Promise<RefreshResult> {
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
