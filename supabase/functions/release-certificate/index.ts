/**
 * release-certificate — the payoff of "Hold certificate until paid".
 *
 * Fired by DB triggers (dispatch_certificate_release) the moment any paid-path
 * stamps an invoice: manual mark-as-paid, Stripe webhook, token link, Xero pull.
 * The trigger is a dumb poke; ALL the judgement lives here:
 *   opted in (certificate_release_mode = 'on_payment') → not yet released →
 *   atomic claim on certificate_released_at → email the certificate PDF to the
 *   customer → bell the electrician. If the PDF can't be attached, the claim is
 *   rolled back so a retry can succeed — a "released" cert that never arrived
 *   is the one failure mode this feature must not have.
 *
 * Auth: called with the anon bearer by pg_net. The request only carries
 * (source, id); every decision is re-derived from the DB, and the atomic claim
 * makes replays no-ops, so a forged call can at worst deliver a certificate the
 * electrician already chose to auto-deliver — once.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';
import {
  buildCertificateSendEmail,
  type CertificateSendData,
} from '../_shared/email-templates/certificate-send.ts';
import type { BrandedCompany } from '../_shared/email-template.ts';
import { clientFacingSender } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isValidEmail = (e: unknown): e is string =>
  typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get('SUPABASE_URL') as string,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
  );

  try {
    const { source, id, manual } = await req.json().catch(() => ({}));
    if (!id || (source !== 'quotes' && source !== 'invoices')) {
      return json({ error: 'Expected { source: "quotes"|"invoices", id }' }, 400);
    }

    // Manual override — the electrician chooses to send the held certificate
    // NOW, before payment. Only honoured when the bearer token resolves to a
    // real user who owns the quote (checked below); trigger calls arrive on
    // the anon key, fail getUser, and stay on the paid-only path.
    let manualUserId: string | null = null;
    if (manual === true) {
      const bearer = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
      if (bearer) {
        const {
          data: { user },
        } = await admin.auth.getUser(bearer);
        manualUserId = user?.id ?? null;
      }
      if (!manualUserId) return json({ error: 'Manual release requires a signed-in user' }, 401);
    }

    // ── Resolve the canonical quote row (app invoices live in quotes) ──────
    let quoteId: string | null = null;
    if (source === 'quotes') {
      quoteId = id;
    } else {
      const { data: inv } = await admin
        .from('invoices')
        .select('id, quote_id, paid_at')
        .eq('id', id)
        .maybeSingle();
      if (!inv?.quote_id) return json({ released: false, reason: 'no_linked_quote' });
      quoteId = inv.quote_id;
    }

    const { data: quote, error: quoteError } = await admin
      .from('quotes')
      .select(
        'id, user_id, invoice_number, invoice_paid_at, invoice_status, client_data, ' +
          'certificate_release_mode, certificate_released_at, ' +
          'linked_certificate_id, linked_certificate_type, linked_certificate_reference, linked_certificate_pdf_url'
      )
      .eq('id', quoteId)
      .maybeSingle();
    if (quoteError || !quote) return json({ released: false, reason: 'quote_not_found' });

    // ── Guards — the DB is the truth, the request proves nothing ───────────
    if (manualUserId && manualUserId !== quote.user_id) {
      return json({ error: 'Not your invoice' }, 403);
    }
    const paid =
      !!quote.invoice_paid_at || quote.invoice_status === 'paid' || source === 'invoices';
    if (!paid && !manualUserId) return json({ released: false, reason: 'not_paid' });
    if (quote.certificate_release_mode !== 'on_payment')
      return json({ released: false, reason: 'not_opted_in' });
    if (!quote.linked_certificate_id)
      return json({ released: false, reason: 'no_linked_certificate' });
    if (quote.certificate_released_at)
      return json({ released: false, reason: 'already_released' });

    // ── Atomic claim — twin triggers can both fire; only one send happens ──
    const { data: claimed } = await admin
      .from('quotes')
      .update({ certificate_released_at: new Date().toISOString() })
      .eq('id', quote.id)
      .is('certificate_released_at', null)
      .select('id')
      .maybeSingle();
    if (!claimed) return json({ released: false, reason: 'already_released' });

    // Roll the claim back on any failure past this point — an unstamped row
    // can be retried; a stamped row that never emailed cannot.
    const unclaim = async () => {
      try {
        await admin.from('quotes').update({ certificate_released_at: null }).eq('id', quote.id);
      } catch {
        /* best effort */
      }
    };

    try {
      // ── Recipient — same resolution order as send-invoice-resend ─────────
      const clientData = (quote.client_data || {}) as Record<string, unknown>;
      let clientEmail = typeof clientData.email === 'string' ? clientData.email.trim() : '';
      const clientName =
        (typeof clientData.name === 'string' && clientData.name) ||
        (typeof clientData.full_name === 'string' && clientData.full_name) ||
        'there';
      if (!isValidEmail(clientEmail) && clientData.id) {
        const { data: customer } = await admin
          .from('customers')
          .select('email')
          .eq('id', clientData.id as string)
          .eq('user_id', quote.user_id)
          .maybeSingle();
        if (customer?.email) clientEmail = customer.email.trim();
      }
      if (!isValidEmail(clientEmail)) {
        await unclaim();
        return json({ released: false, reason: 'no_client_email' });
      }

      // ── Certificate PDF — stored url, else re-resolve from the report ────
      const linkId = String(quote.linked_certificate_id);
      let pdfUrl: string | null = quote.linked_certificate_pdf_url || null;
      let report: {
        client_name?: string | null;
        installation_address?: string | null;
        inspection_date?: string | null;
        next_inspection_due?: string | null;
      } | null = null;
      {
        let { data: certReport } = await admin
          .from('reports')
          .select('pdf_url, client_name, installation_address, inspection_date, next_inspection_due')
          .eq('report_id', linkId)
          .maybeSingle();
        if (
          !certReport &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(linkId)
        ) {
          ({ data: certReport } = await admin
            .from('reports')
            .select(
              'pdf_url, client_name, installation_address, inspection_date, next_inspection_due'
            )
            .eq('id', linkId)
            .maybeSingle());
        }
        report = certReport ?? null;
        if (!pdfUrl && certReport?.pdf_url) pdfUrl = certReport.pdf_url;
      }
      if (!pdfUrl) {
        await unclaim();
        return json({ released: false, reason: 'no_certificate_pdf' });
      }

      const pdfResponse = await fetch(pdfUrl);
      if (!pdfResponse.ok) {
        await unclaim();
        return json({ released: false, reason: 'pdf_download_failed' }, 502);
      }
      const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
      let binary = '';
      for (let i = 0; i < pdfBytes.length; i += 0x8000) {
        binary += String.fromCharCode.apply(
          null,
          Array.from(pdfBytes.subarray(i, i + 0x8000))
        );
      }
      const pdfBase64 = btoa(binary);

      // ── Branding + email ──────────────────────────────────────────────────
      const { data: companyProfile } = await admin
        .from('company_profiles')
        .select('company_name, company_email, company_phone, logo_url, primary_color')
        .eq('user_id', quote.user_id)
        .maybeSingle();
      const company: BrandedCompany = {
        name: companyProfile?.company_name || 'Your electrician',
        email: companyProfile?.company_email || null,
        phone: companyProfile?.company_phone || null,
        logoUrl: companyProfile?.logo_url || null,
        primaryColor: companyProfile?.primary_color || null,
      };

      const certType = quote.linked_certificate_type || 'Certificate';
      const certRef = quote.linked_certificate_reference || linkId;
      const emailData: CertificateSendData = {
        company,
        clientName,
        certificateType: certType,
        certificateNumber: certRef,
        installationAddress: report?.installation_address ?? null,
        inspectionDate: report?.inspection_date ?? null,
        nextInspectionDue: report?.next_inspection_due ?? null,
        pdfUrl,
        pdfAttached: true,
        customMessage: manualUserId
          ? 'Your certificate is attached.'
          : `Thanks for your payment${
              quote.invoice_number ? ` of invoice ${quote.invoice_number}` : ''
            } — your certificate is attached.`,
      };
      const email = buildCertificateSendEmail(emailData);

      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        await unclaim();
        return json({ error: 'RESEND_API_KEY not configured' }, 500);
      }
      const resend = new Resend(resendApiKey);
      const sender = clientFacingSender({
        companyName: company.name,
        companyEmail: companyProfile?.company_email,
      });
      const { error: sendError } = await resend.emails.send({
        from: sender.from,
        reply_to: sender.replyTo,
        to: [clientEmail],
        subject: email.subject,
        html: email.html,
        attachments: [
          {
            filename: `${certType.replace(/\s+/g, '_')}_${certRef}.pdf`,
            content: pdfBase64,
          },
        ],
      });
      if (sendError) {
        await unclaim();
        return json({ released: false, reason: `send_failed: ${sendError.message}` }, 502);
      }

      // Mirror the stamp onto the invoices row when one exists.
      try {
        await admin
          .from('invoices')
          .update({ certificate_released_at: new Date().toISOString() })
          .eq('quote_id', quote.id);
      } catch {
        /* non-critical */
      }

      try {
        await admin.from('user_notifications').insert({
          user_id: quote.user_id,
          type: 'certificate_released',
          title: manualUserId
            ? `Certificate sent — ${quote.invoice_number || 'invoice'}`
            : `Certificate sent — ${quote.invoice_number || 'invoice'} paid`,
          message: manualUserId
            ? `${certType} ${certRef} emailed to ${clientName} — you sent it before payment.`
            : `${certType} ${certRef} emailed to ${clientName} automatically after payment.`,
          link: '/electrician/invoices',
          metadata: { quote_id: quote.id, certificate_id: linkId, manual: !!manualUserId },
        });
      } catch {
        /* non-critical */
      }

      console.log(
        `Certificate released: ${certType} ${certRef} → ${clientEmail} (invoice ${quote.invoice_number})`
      );
      return json({ released: true });
    } catch (innerError) {
      await unclaim();
      throw innerError;
    }
  } catch (error) {
    console.error('release-certificate error:', error);
    await captureException(error, {
      functionName: 'release-certificate',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'Internal error' }, 500);
  }
});
