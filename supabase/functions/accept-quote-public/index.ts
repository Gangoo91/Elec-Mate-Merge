/**
 * accept-quote-public — JSON API for the public quote acceptance page.
 *
 * Why this exists (vs. accept_quote_by_token RPC):
 *   The RPC only flips quote.acceptance_status. It does NOT create the
 *   deposit invoice or the Stripe pay link that ELE-954 wires up. The
 *   existing `quote-action` edge function does, but it returns HTML for
 *   one-click email links — not usable from React.
 *
 * Flow:
 *   1. Validate token + load quote
 *   2. Guard: must be 'pending', not already actioned
 *   3. Compute deposit % (quote.settings.depositPercentage falls back to
 *      company_profiles.deposit_percentage)
 *   4. Update quote with signature + acceptance_status
 *      ('accepted_pending_deposit' if deposit > 0, else 'accepted')
 *   5. If deposit required: insert deposit invoice + mint Stripe pay link
 *   6. Fire-and-forget client confirmation email + sparky push/email/notif
 *   7. Return JSON with everything the React page needs to render the
 *      next step (pay deposit, or jump to slot picker)
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface AcceptBody {
  token: string;
  name: string;
  email: string;
  /** Data URL of the signature image */
  signature: string;
  /** Optional — browser-side fetch may include IP via api.ipify.org */
  ip?: string;
  userAgent?: string;
}

const APP_URL = 'https://www.elec-mate.com';

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    let body: AcceptBody;
    try {
      body = (await req.json()) as AcceptBody;
    } catch {
      return jsonError(400, 'Invalid request body');
    }

    const { token, name, email, signature } = body;
    if (!token || !name || !email || !signature) {
      return jsonError(400, 'token, name, email and signature are required');
    }

    // Load quote by public_token (the same surface the page already uses).
    const { data: quote, error: quoteErr } = await supabase
      .from('quotes')
      .select('*')
      .eq('public_token', token)
      .maybeSingle();

    if (quoteErr || !quote) {
      return jsonError(404, 'Quote not found or token expired');
    }

    // Idempotency — anything other than 'pending' means the quote has already
    // been actioned (accepted, declined, or waiting on a deposit that's
    // already been minted). Re-running the accept flow would mint a second
    // deposit invoice or double-up the audit trail.
    if (quote.acceptance_status && quote.acceptance_status !== 'pending') {
      return jsonError(409, `Quote already ${quote.acceptance_status.replace(/_/g, ' ')}`);
    }

    // ── Compute deposit ────────────────────────────────────────────────
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('deposit_percentage')
      .eq('user_id', quote.user_id)
      .maybeSingle();

    const quoteSettings = (quote.settings || {}) as Record<string, unknown>;
    const settingsDepositPct = Number(quoteSettings.depositPercentage);
    const profileDepositPct = Number(companyProfile?.deposit_percentage);
    const depositPct =
      Number.isFinite(settingsDepositPct) && settingsDepositPct > 0
        ? settingsDepositPct
        : Number.isFinite(profileDepositPct) && profileDepositPct > 0
          ? profileDepositPct
          : 0;

    let depositRequired = false;
    let depositAmountPennies = 0;
    if (depositPct > 0 && (quote.total || 0) > 0) {
      depositRequired = true;
      depositAmountPennies = Math.round(Number(quote.total) * 100 * (depositPct / 100));
    }

    // ── Mark quote accepted ────────────────────────────────────────────
    const ip = body.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const userAgent = body.userAgent || req.headers.get('user-agent') || '';
    const newAcceptanceStatus = depositRequired ? 'accepted_pending_deposit' : 'accepted';

    const { error: updateErr } = await supabase
      .from('quotes')
      .update({
        acceptance_status: newAcceptanceStatus,
        acceptance_method: 'in_app_signature',
        accepted_at: new Date().toISOString(),
        accepted_by_name: name,
        accepted_by_email: email,
        accepted_ip: ip,
        accepted_user_agent: userAgent,
        signature_url: signature,
        status: 'approved',
        deposit_required: depositRequired,
        deposit_amount_pennies: depositRequired ? depositAmountPennies : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', quote.id);

    if (updateErr) {
      console.error('Quote update failed:', updateErr);
      return jsonError(500, 'Could not record your acceptance — please try again');
    }

    // ── Create deposit invoice + Stripe pay link ───────────────────────
    let depositPayUrl: string | null = null;
    let depositInvoiceId: string | null = null;

    if (depositRequired) {
      try {
        const depositAmount = depositAmountPennies / 100;
        const depositInvoiceNumber = `DEP-${quote.quote_number || quote.id.slice(0, 8)}`;
        const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000);

        // The `invoices` table doesn't have a separate `client_id` column —
        // client info is stored in the `client_data` JSONB blob copied
        // straight from the quote. `quote_id` links to the parent quote;
        // `parent_quote_id` is the explicit deposit-flow marker so the
        // webhook can tell deposits apart from regular invoices.
        const { data: depositInvoice, error: invoiceErr } = await supabase
          .from('invoices')
          .insert({
            user_id: quote.user_id,
            client_data: quote.client_data,
            quote_id: quote.id,
            parent_quote_id: quote.id,
            deposit_for_quote: true,
            invoice_number: depositInvoiceNumber,
            status: 'sent',
            invoice_date: new Date().toISOString(),
            due_date: dueDate.toISOString(),
            subtotal: depositAmount,
            total: depositAmount,
            items: [
              {
                id: crypto.randomUUID(),
                description: `Deposit · Quote ${quote.quote_number || ''}`.trim(),
                quantity: 1,
                unit: 'each',
                unitPrice: depositAmount,
                totalPrice: depositAmount,
                category: 'manual',
              },
            ],
            settings: { vatRegistered: false, paymentTerms: '48 hours' },
          })
          .select('id')
          .single();

        if (invoiceErr) {
          console.error('Deposit invoice insert failed (non-fatal):', invoiceErr);
        } else if (depositInvoice?.id) {
          depositInvoiceId = depositInvoice.id;
          await supabase
            .from('quotes')
            .update({ deposit_invoice_id: depositInvoice.id })
            .eq('id', quote.id);

          const linkRes = await fetch(`${supabaseUrl}/functions/v1/create-invoice-payment-link`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${serviceRoleKey}`,
            },
            body: JSON.stringify({ invoiceId: depositInvoice.id }),
          });
          if (linkRes.ok) {
            const json = await linkRes.json();
            if (json?.url) depositPayUrl = json.url;
          } else {
            console.error('Stripe pay link generation failed:', await linkRes.text());
          }
        }
      } catch (depErr) {
        console.error('Deposit creation failed (non-fatal):', depErr);
      }
    }

    // ── Notifications ──────────────────────────────────────────────────
    // 1) Bell-icon feed log. Writes to `push_notification_log` — the
    //    table NotificationProvider reads + subscribes to. Previously
    //    wrote to `ojt_notifications` which has check constraints
    //    rejecting non-OJT types and silently dropped the row.
    const pushTitle = `Quote ${quote.quote_number} accepted`;
    const pushBody = depositRequired
      ? `${name} accepted · awaiting £${(depositAmountPennies / 100).toFixed(2)} deposit`
      : `${name} accepted your quote · £${(quote.total || 0).toFixed(2)}`;

    await supabase
      .from('push_notification_log')
      .insert({
        user_id: quote.user_id,
        type: 'quote_accepted',
        reference_id: quote.id,
        title: pushTitle,
        body: pushBody,
      })
      .then(({ error }) => {
        if (error) console.warn('push_notification_log insert failed:', error);
      });

    // 1b) In-app bell (user_notifications) so the accepted quote shows in the
    //     notification centre, not only as a device push.
    await supabase
      .from('user_notifications')
      .insert({
        user_id: quote.user_id,
        type: 'quote_accepted',
        title: pushTitle,
        message: pushBody,
        link: `/electrician/quote-builder/${quote.id}`,
        metadata: { quote_id: quote.id, quote_number: quote.quote_number },
        is_read: false,
      })
      .then(({ error }) => {
        if (error) console.warn('user_notifications insert failed:', error);
      });

    // 2) Device push — direct fetch with explicit service-role auth.
    //    `supabase.functions.invoke` from inside an edge fn doesn't
    //    forward auth reliably and was silently 401'ing.
    fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        userId: quote.user_id,
        title: pushTitle,
        body: pushBody,
        type: 'default',
        data: {
          deep_link: `/electrician/quote-builder/${quote.id}`,
          category: 'quote_accepted',
          quote_id: quote.id,
          quote_number: quote.quote_number,
        },
        skipQuietHours: true,
      }),
    }).catch((e) => console.warn('Push notification fetch threw:', e));

    // 3) Confirmation email to client (the shared template — looks like the
    //    same brand they saw on the page)
    supabase.functions
      .invoke('quote-acceptance-confirmation', {
        body: {
          quoteId: quote.id,
          quoteNumber: quote.quote_number,
          clientEmail: email,
          clientName: name,
          total: quote.total,
        },
      })
      .catch((e) => console.error('Acceptance confirmation email failed:', e));

    return new Response(
      JSON.stringify({
        success: true,
        acceptanceStatus: newAcceptanceStatus,
        depositRequired,
        depositAmount: depositRequired ? depositAmountPennies / 100 : 0,
        depositPayUrl,
        depositInvoiceId,
        // Booking handoff goes to the existing PublicBooking page so we
        // share one availability source. Pre-fill comes from
        // get_public_quote_for_booking RPC; the booking links back to
        // the quote via the quote_id query string.
        bookingUrl: depositRequired ? null : `${APP_URL}/book/${quote.user_id}?quote=${quote.id}`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('accept-quote-public error:', error);
    await captureException(error instanceof Error ? error : new Error(String(error)), {
      functionName: 'accept-quote-public',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return jsonError(500, 'Something went wrong — please try again');
  }
};

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

serve(handler);
