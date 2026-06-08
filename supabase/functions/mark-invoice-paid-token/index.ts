/**
 * Mark Invoice Paid via Token  (ELE-880)
 *
 * Single-shot endpoint hit by the public confirmation page when the
 * electrician taps "Mark as Paid" from a payment-reminder email. No JWT
 * required — the random URL-safe token in invoice_action_tokens is the
 * auth.
 *
 * GET  /functions/v1/mark-invoice-paid-token?token=...
 *      → { invoice: { id, invoice_number, client_name, total, currency,
 *          invoice_status, invoice_paid_at }, alreadyPaid: bool }
 *      Used by the confirmation page to render the "Are you sure?" view.
 *
 * POST /functions/v1/mark-invoice-paid-token  { token }
 *      → { success: true, invoice_status: 'paid', paid_at }
 *      Consumes the token (single-use), marks invoice paid in both quotes
 *      and invoices tables.
 *
 * Errors are returned as 200 with { success: false, error, detail } so the
 * page can render them inline.
 */

import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function errorResponse(error: string, detail?: string, httpStatus = 400) {
  return jsonResponse({ success: false, error, detail, httpStatus });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ─── Resolve token from query (GET) or body (POST) ──────────────
    let token: string | null = null;
    if (req.method === 'GET') {
      token = new URL(req.url).searchParams.get('token');
    } else if (req.method === 'POST') {
      try {
        const body = await req.json();
        token = body?.token ?? null;
      } catch {
        token = new URL(req.url).searchParams.get('token');
      }
    } else {
      return errorResponse('Method not allowed', undefined, 405);
    }

    if (!token || typeof token !== 'string' || token.length < 10) {
      return errorResponse('Missing or invalid token', undefined, 400);
    }

    // ─── Look up the token + invoice ────────────────────────────────
    const { data: tokenRow, error: tokenErr } = await supabase
      .from('invoice_action_tokens')
      .select('id, invoice_id, user_id, action, expires_at, consumed_at')
      .eq('public_token', token)
      .eq('action', 'mark_paid')
      .maybeSingle();

    if (tokenErr) {
      console.error('[mark-invoice-paid-token] token lookup failed', tokenErr);
      return errorResponse('Token lookup failed', tokenErr.message, 500);
    }
    if (!tokenRow) {
      return errorResponse(
        'Invalid link',
        'This mark-paid link is not valid. It may have been mistyped or expired.',
        404
      );
    }

    const isExpired = new Date(tokenRow.expires_at) < new Date();
    const wasConsumed = !!tokenRow.consumed_at;

    // Pull the invoice — single source of truth is `quotes` (invoice_raised).
    const { data: invoice, error: invErr } = await supabase
      .from('quotes')
      .select(
        'id, invoice_number, invoice_status, invoice_paid_at, total, settings, client_data'
      )
      .eq('id', tokenRow.invoice_id)
      .eq('invoice_raised', true)
      .maybeSingle();

    if (invErr || !invoice) {
      return errorResponse('Invoice not found', invErr?.message, 404);
    }

    const clientName =
      (invoice.client_data as { name?: string } | null)?.name ?? 'Customer';
    const currency =
      (invoice.settings as { currency?: string } | null)?.currency ?? 'GBP';

    const summary = {
      id: invoice.id,
      invoice_number: invoice.invoice_number,
      client_name: clientName,
      total: invoice.total,
      currency,
      invoice_status: invoice.invoice_status,
      invoice_paid_at: invoice.invoice_paid_at,
    };

    // ─── GET: just describe the invoice (preview view) ──────────────
    if (req.method === 'GET') {
      return jsonResponse({
        success: true,
        invoice: summary,
        token: {
          consumed: wasConsumed,
          expired: isExpired,
          consumedAt: tokenRow.consumed_at,
          expiresAt: tokenRow.expires_at,
        },
        alreadyPaid: invoice.invoice_status === 'paid',
      });
    }

    // ─── POST: consume the token + mark paid ────────────────────────
    if (isExpired) {
      return errorResponse(
        'This link has expired',
        'Mark-paid links are valid for 30 days. Generate a fresh one from the invoice in Elec-Mate.',
        410
      );
    }
    if (wasConsumed) {
      return jsonResponse({
        success: true,
        alreadyDone: true,
        invoice: summary,
      });
    }

    const paidAtIso = new Date().toISOString();

    // Update legacy quotes row (display source of truth).
    const { error: qErr } = await supabase
      .from('quotes')
      .update({
        invoice_status: 'paid',
        invoice_paid_at: paidAtIso,
      })
      .eq('id', invoice.id);
    if (qErr) {
      console.error('[mark-invoice-paid-token] quotes update failed', qErr);
      return errorResponse('Could not mark paid', qErr.message, 500);
    }

    // Mirror onto invoices (newer table — quote_id FK back to quotes.id).
    const { error: iErr } = await supabase
      .from('invoices')
      .update({
        invoice_status: 'paid',
        invoice_paid_at: paidAtIso,
      })
      .eq('quote_id', invoice.id);
    if (iErr && iErr.code !== 'PGRST116') {
      // PGRST116 = no row, not a real error (older quotes have no invoices row)
      console.error('[mark-invoice-paid-token] invoices update failed', iErr);
    }

    // Mark token consumed.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('cf-connecting-ip') ||
      null;
    const ua = req.headers.get('user-agent')?.slice(0, 500) || null;

    await supabase
      .from('invoice_action_tokens')
      .update({
        consumed_at: paidAtIso,
        consumed_by_ip: ip,
        consumed_by_ua: ua,
      })
      .eq('id', tokenRow.id);

    // Send the payment-received / review-request email (internal call; no-ops
    // unless the user has review requests enabled). Non-blocking on failure.
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/send-payment-received-resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });
    } catch (e) {
      console.warn('[mark-invoice-paid-token] review email skipped:', e);
    }

    return jsonResponse({
      success: true,
      invoice: { ...summary, invoice_status: 'paid', invoice_paid_at: paidAtIso },
    });
  } catch (err) {
    await captureException(err, { functionName: 'mark-invoice-paid-token', requestUrl: req.url, requestMethod: req.method });
    console.error('[mark-invoice-paid-token] handler error', err);
    const msg = err instanceof Error ? err.message : String(err);
    return errorResponse('Unexpected server error', msg, 500);
  }
});
