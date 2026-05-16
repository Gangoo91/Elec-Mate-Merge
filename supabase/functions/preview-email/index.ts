// Preview-email edge function. Sends a sample of any user→client email
// template to a chosen recipient using realistic sample data, so the
// founder can eyeball designs in their actual inbox before rolling out.
//
// Auth: requires the caller's JWT — only authenticated users can fire
// previews. The recipient must be explicitly provided (no defaulting),
// to avoid accidental sends.
//
// Usage:
//   POST /functions/v1/preview-email
//   Body: { template: 'quote-send' | ..., recipient: 'you@example.com', overrides?: {...} }

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildQuoteSendEmail } from '../_shared/email-templates/quote-send.ts';
import { buildInvoiceSendEmail } from '../_shared/email-templates/invoice-send.ts';
import { buildQuoteReminderEmail, type ReminderTone } from '../_shared/email-templates/quote-reminder.ts';
import { buildCertificateSendEmail } from '../_shared/email-templates/certificate-send.ts';
import { buildQuoteAcceptanceEmail } from '../_shared/email-templates/quote-acceptance.ts';
import { buildScopeSendEmail } from '../_shared/email-templates/scope-send.ts';
import { buildPhotosSendEmail } from '../_shared/email-templates/photos-send.ts';
import {
  buildPaymentReminderEmail,
  type PaymentReminderTone,
} from '../_shared/email-templates/payment-reminder.ts';
import { buildSignatureRequestEmail } from '../_shared/email-templates/signature-request.ts';
import {
  buildBriefingSignOffEmail,
  type BriefingRiskLevel,
} from '../_shared/email-templates/briefing-sign-off.ts';
import {
  buildCertExpiryReminderEmail,
  type ExpiryTier,
} from '../_shared/email-templates/cert-expiry-reminder.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── Sample data — realistic, one electrical job ─────────────────────
const SAMPLE_COMPANY = {
  name: 'Acme Electrical',
  logoUrl: null as string | null,
  primaryColor: '#786f07',
  email: 'hello@acmeelectrical.co.uk',
  phone: '020 7946 0123',
  website: 'acmeelectrical.co.uk',
  address: '14 Riverside Way, London SW18 4AB',
  vatNumber: 'GB 123 4567 89',
  registrationNumber: '12345678',
};

const SAMPLE_QUOTE = {
  number: 'QUO-2026-0142',
  total: 1487.5,
  validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  jobTitle: 'Full rewire — 2-bed flat',
  jobDescription:
    'Complete rewire of two-bedroom first-floor flat including consumer unit upgrade, new circuits for kitchen and bathroom, RCBO protection throughout, and replacement of all accessories. EICR on completion. All work to BS 7671:2018+A3:2024.',
  acceptUrl: 'https://www.elec-mate.com/public-quote/preview-token#accept',
  pdfAttached: true,
};

const SAMPLE_CLIENT = { name: 'Sarah Thompson', email: 'sample-client@example.com' };

// ─── Handler ─────────────────────────────────────────────────────────
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    // Auth gate. Accept either a real user JWT or the service_role key
    // (the latter for ops-driven previews from SQL / MCP).
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const bearer = authHeader.replace(/^Bearer\s+/i, '').trim();
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const isServiceRole = !!serviceKey && bearer === serviceKey;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      isServiceRole ? serviceKey : (Deno.env.get('SUPABASE_ANON_KEY') ?? ''),
      isServiceRole
        ? undefined
        : { global: { headers: { Authorization: authHeader } } }
    );

    let user: { id: string; email?: string } | null = null;
    if (!isServiceRole) {
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError || !data?.user) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      user = { id: data.user.id, email: data.user.email };
    }

    const body = await req.json().catch(() => ({}));
    const template = String(body?.template || '').trim();
    const recipient = String(body?.recipient || '').trim();
    const overrides = body?.overrides && typeof body.overrides === 'object' ? body.overrides : {};

    if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      return new Response(JSON.stringify({ error: 'recipient required (valid email)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If the caller has a real company profile, prefer that for the
    // sample — so the preview shows their actual brand colour + logo.
    // For service-role calls, the body may provide `user_id` to pull a
    // specific profile; otherwise we fall back to SAMPLE_COMPANY.
    const profileUserId = user?.id || (overrides as { user_id?: string })?.user_id || body?.user_id;
    let realProfile: Record<string, unknown> | null = null;
    if (profileUserId) {
      const { data } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, company_phone, company_website, company_address, company_postcode, logo_url, logo_data_url, primary_color, vat_number, company_registration')
        .eq('user_id', profileUserId)
        .maybeSingle();
      realProfile = data as Record<string, unknown> | null;
    }

    const company = {
      name: realProfile?.company_name || overrides.companyName || SAMPLE_COMPANY.name,
      logoUrl: realProfile?.logo_url || realProfile?.logo_data_url || SAMPLE_COMPANY.logoUrl,
      primaryColor: realProfile?.primary_color || SAMPLE_COMPANY.primaryColor,
      email: realProfile?.company_email || SAMPLE_COMPANY.email,
      phone: realProfile?.company_phone || SAMPLE_COMPANY.phone,
      website: realProfile?.company_website || SAMPLE_COMPANY.website,
      address: realProfile?.company_address || SAMPLE_COMPANY.address,
      vatNumber: realProfile?.vat_number || SAMPLE_COMPANY.vatNumber,
      registrationNumber: realProfile?.company_registration || SAMPLE_COMPANY.registrationNumber,
    };

    // ── Build the preview email by template ────────────────────────
    let subject = '';
    let html = '';

    // Sample data shared across templates.
    const sampleInvoice = {
      number: 'INV-2026-0091',
      total: 2185.0,
      subtotal: 1820.83,
      vatAmount: 364.17,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      invoiceDate: new Date().toISOString(),
      paymentTerms: '14 days',
      payNowUrl: 'https://www.elec-mate.com/pay/preview',
      pdfUrl: 'https://www.elec-mate.com/invoice/preview.pdf',
    };
    const sampleBank = {
      accountName: company.name || 'Acme Electrical Ltd',
      sortCode: '12-34-56',
      accountNumber: '12345678',
      bankName: 'Lloyds Bank',
    };

    if (template === 'quote-send') {
      const payload = buildQuoteSendEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        quoteNumber: overrides.quoteNumber || SAMPLE_QUOTE.number,
        total: typeof overrides.total === 'number' ? overrides.total : SAMPLE_QUOTE.total,
        validUntil: overrides.validUntil || SAMPLE_QUOTE.validUntil,
        jobTitle: overrides.jobTitle || SAMPLE_QUOTE.jobTitle,
        jobDescription: overrides.jobDescription || SAMPLE_QUOTE.jobDescription,
        acceptUrl: overrides.acceptUrl || SAMPLE_QUOTE.acceptUrl,
        pdfAttached: typeof overrides.pdfAttached === 'boolean' ? overrides.pdfAttached : SAMPLE_QUOTE.pdfAttached,
        trackingPixelUrl: null,
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'invoice-send') {
      const payload = buildInvoiceSendEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        invoiceNumber: overrides.invoiceNumber || sampleInvoice.number,
        total: typeof overrides.total === 'number' ? overrides.total : sampleInvoice.total,
        subtotal: sampleInvoice.subtotal,
        vatAmount: sampleInvoice.vatAmount,
        invoiceDate: sampleInvoice.invoiceDate,
        dueDate: sampleInvoice.dueDate,
        paymentTerms: sampleInvoice.paymentTerms,
        payNowUrl: overrides.payNowUrl ?? sampleInvoice.payNowUrl,
        pdfUrl: overrides.pdfUrl ?? sampleInvoice.pdfUrl,
        pdfAttached: typeof overrides.pdfAttached === 'boolean' ? overrides.pdfAttached : true,
        bankDetails: overrides.bankDetails ?? sampleBank,
        notes: overrides.notes ?? null,
        jobTitle: overrides.jobTitle || SAMPLE_QUOTE.jobTitle,
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'quote-reminder') {
      const tone: ReminderTone = (overrides.tone as ReminderTone) || 'firm';
      const payload = buildQuoteReminderEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        quoteNumber: overrides.quoteNumber || SAMPLE_QUOTE.number,
        total: typeof overrides.total === 'number' ? overrides.total : SAMPLE_QUOTE.total,
        expiryDate: overrides.expiryDate || SAMPLE_QUOTE.validUntil,
        acceptUrl: overrides.acceptUrl || SAMPLE_QUOTE.acceptUrl,
        tone,
        jobTitle: overrides.jobTitle || SAMPLE_QUOTE.jobTitle,
      });
      subject = `[Preview · ${tone}] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'certificate-send') {
      const payload = buildCertificateSendEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        certificateType: overrides.certificateType || 'EICR',
        certificateNumber: overrides.certificateNumber || 'EICR-2026-001234',
        installationAddress: overrides.installationAddress || '47 Riverside Gardens, Putney, London, SW15 2JQ',
        inspectionDate: overrides.inspectionDate || new Date().toISOString(),
        overallAssessment: overrides.overallAssessment || 'Satisfactory',
        nextInspectionDue: overrides.nextInspectionDue || new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        pdfUrl: overrides.pdfUrl ?? 'https://www.elec-mate.com/cert/preview.pdf',
        pdfAttached: typeof overrides.pdfAttached === 'boolean' ? overrides.pdfAttached : true,
        customMessage: overrides.customMessage ?? null,
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'quote-acceptance') {
      const payload = buildQuoteAcceptanceEmail({
        company,
        acceptedByName: overrides.acceptedByName || SAMPLE_CLIENT.name,
        quoteNumber: overrides.quoteNumber || SAMPLE_QUOTE.number,
        total: typeof overrides.total === 'number' ? overrides.total : SAMPLE_QUOTE.total,
        acceptedAt: overrides.acceptedAt || new Date().toISOString(),
        jobTitle: overrides.jobTitle || SAMPLE_QUOTE.jobTitle,
        viewQuoteUrl: overrides.viewQuoteUrl ?? 'https://www.elec-mate.com/public-quote/preview-token',
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'scope-send') {
      const payload = buildScopeSendEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        propertyAddress: overrides.propertyAddress || '47 Riverside Gardens, Putney, London, SW15 2JQ',
        scopeSummary: overrides.scopeSummary || SAMPLE_QUOTE.jobTitle,
        signUrl: overrides.signUrl || 'https://www.elec-mate.com/scope/preview-token',
        scopeReference: overrides.scopeReference || 'SCO-2026-0042',
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'photos-send') {
      const payload = buildPhotosSendEmail({
        company,
        recipientName: overrides.recipientName || SAMPLE_CLIENT.name,
        projectName: overrides.projectName || '47 Riverside Gardens — rewire',
        message: overrides.message ?? null,
        photos: (overrides.photos as { thumbnailUrl: string; fullSizeUrl: string; caption?: string }[]) || [
          { thumbnailUrl: 'https://placehold.co/520x320/0f172a/ffffff?text=Before+(Consumer+Unit)', fullSizeUrl: 'https://placehold.co/1200x800', caption: 'Old consumer unit — original install, 1980s' },
          { thumbnailUrl: 'https://placehold.co/520x320/0f172a/ffffff?text=After+(New+RCBO+Board)', fullSizeUrl: 'https://placehold.co/1200x800', caption: 'New 18-way RCBO consumer unit installed and tested' },
          { thumbnailUrl: 'https://placehold.co/520x320/0f172a/ffffff?text=Kitchen+Ring', fullSizeUrl: 'https://placehold.co/1200x800', caption: 'Kitchen ring tested and labelled' },
        ],
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'payment-reminder') {
      const tone: PaymentReminderTone = (overrides.tone as PaymentReminderTone) || 'firm';
      const payload = buildPaymentReminderEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        invoiceNumber: overrides.invoiceNumber || sampleInvoice.number,
        total: typeof overrides.total === 'number' ? overrides.total : sampleInvoice.total,
        dueDate: overrides.dueDate || new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        payNowUrl: overrides.payNowUrl ?? sampleInvoice.payNowUrl,
        bankDetails: overrides.bankDetails ?? sampleBank,
        tone,
        markPaidUrl: overrides.markPaidUrl ?? 'https://www.elec-mate.com/invoices/preview-token/mark-paid',
      });
      subject = `[Preview · ${tone}] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'signature-request') {
      const payload = buildSignatureRequestEmail({
        company,
        signerName: overrides.signerName || SAMPLE_CLIENT.name,
        documentTitle: overrides.documentTitle || 'Quote QUO-2026-0142 — Full rewire, 2-bed flat',
        documentType: overrides.documentType || 'Quote',
        senderName: overrides.senderName || 'Andrew Moore',
        message:
          overrides.message ??
          'Hi Sarah — please give this a once-over and sign at the bottom when you\'re happy. Any questions, just reply to this email.',
        signingUrl: overrides.signingUrl || 'https://www.elec-mate.com/sign/preview-token',
      });
      subject = `[Preview] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'briefing-sign-off') {
      const risk = (overrides.riskLevel as BriefingRiskLevel) || 'high';
      const payload = buildBriefingSignOffEmail({
        company,
        recipientName: overrides.recipientName || 'Tom Wilson',
        briefingName: overrides.briefingName || 'Pre-start RAMS — 47 Riverside Gardens',
        location: overrides.location || '47 Riverside Gardens, Putney, London, SW15 2JQ',
        briefingDate: overrides.briefingDate || new Date().toISOString(),
        briefingTime: overrides.briefingTime || '08:00',
        presentedBy: overrides.presentedBy || 'Andrew Moore',
        hazards: (overrides.hazards as string[]) || [
          'Electrical',
          'Working at heights',
          'Manual handling',
          'Asbestos (suspected)',
        ],
        riskLevel: risk,
        signingUrl: overrides.signingUrl || 'https://www.elec-mate.com/briefing/sign/preview-token',
      });
      subject = `[Preview · ${risk} risk] ${payload.subject}`;
      html = payload.html;
    } else if (template === 'cert-expiry-reminder') {
      const tier = (overrides.tier as ExpiryTier) || '14-day';
      const days = tier === '7-day' ? 5 : tier === '14-day' ? 12 : 28;
      const payload = buildCertExpiryReminderEmail({
        company,
        clientName: overrides.clientName || SAMPLE_CLIENT.name,
        certificateType: overrides.certificateType || 'EICR',
        certificateNumber: overrides.certificateNumber || 'EICR-2021-001234',
        installationAddress: overrides.installationAddress || '47 Riverside Gardens, Putney, London, SW15 2JQ',
        expiryDate: overrides.expiryDate || new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        daysUntilExpiry: typeof overrides.daysUntilExpiry === 'number' ? overrides.daysUntilExpiry : days,
        tier,
        bookingUrl: overrides.bookingUrl ?? null,
      });
      subject = `[Preview · ${tier}] ${payload.subject}`;
      html = payload.html;
    } else {
      return new Response(
        JSON.stringify({
          error: `unknown template "${template}". Supported: quote-send, invoice-send, quote-reminder, certificate-send, quote-acceptance, scope-send, photos-send, payment-reminder, signature-request, briefing-sign-off, cert-expiry-reminder`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Send via Brevo using the centralised sender helper ─────────
    const sender = clientFacingSender({
      companyName: company.name,
      companyEmail: company.email,
      userEmail: user?.email,
    });

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const { data, error } = await resend.emails.send({
      ...sender,
      to: [recipient],
      subject,
      html,
      text: htmlToPlainText(html),
    });

    if (error) {
      console.error('Preview send error:', error);
      return new Response(JSON.stringify({ error: `Send failed: ${error.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, template, recipient, messageId: data?.id, from: sender.from, replyTo: sender.replyTo }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('preview-email error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
