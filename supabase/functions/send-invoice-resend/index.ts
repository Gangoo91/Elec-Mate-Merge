import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildInvoiceSendEmail } from '../_shared/email-templates/invoice-send.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface InvoiceEmailRequest {
  invoiceId: string;
}

// ============================================================================
// HELPER FUNCTIONS - Bulletproof utilities
// ============================================================================

/**
 * Safely parse JSON - handles string, object, null, undefined
 */
function safeJsonParse(data: any, fallback: any = {}): any {
  if (data === null || data === undefined) return fallback;
  if (typeof data === 'object') return data;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('⚠️ JSON parse failed, using fallback:', e);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Validate email format
 */
function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('📧 Send Invoice via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // STEP 1: Validate environment
    // ========================================================================
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      throw new Error('Email service not configured. Please contact support.');
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase environment variables missing');
      throw new Error('Database service not configured. Please contact support.');
    }

    const resend = new Resend(resendApiKey);
    console.log('✅ Environment validated');

    // ========================================================================
    // STEP 2: Authenticate user
    // ========================================================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('❌ No Authorization header found');
      throw new Error('Please log in to send invoices.');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error('❌ User authentication error:', userError);
      const reason = userError?.message || (!user ? 'no_user_returned' : 'unknown');
      throw new Error(`Session expired. Please log in again. (${reason})`);
    }

    console.log('✅ User authenticated:', user.id);
    const userEmail = user.email;

    // ========================================================================
    // STEP 3: Parse and validate request
    // ========================================================================
    let invoiceId: string;
    let customSubject: string | undefined;
    let customMessage: string | undefined;
    try {
      const body = await req.json();
      invoiceId = body.invoiceId;
      customSubject =
        typeof body.customSubject === 'string' && body.customSubject.trim()
          ? body.customSubject.trim()
          : undefined;
      customMessage =
        typeof body.customMessage === 'string' && body.customMessage.trim()
          ? body.customMessage.trim()
          : undefined;
    } catch (e) {
      console.error('❌ Failed to parse request body:', e);
      throw new Error('Invalid request format.');
    }

    if (!invoiceId || typeof invoiceId !== 'string') {
      throw new Error('Invoice ID is required.');
    }

    console.log('Processing invoice:', invoiceId);

    // ========================================================================
    // STEP 4: Fetch invoice from database
    // ========================================================================
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .single();

    if (invoiceError) {
      console.error('❌ Database error fetching invoice:', invoiceError);
      // Expected user state (invoice deleted) — return 404 so the client toasts
      // without Sentry capture. Sentry: REACT-1T.
      return new Response(
        JSON.stringify({
          error: 'invoice_not_found',
          message: 'Could not find this invoice. It may have been deleted.',
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!invoice) {
      return new Response(
        JSON.stringify({
          error: 'invoice_not_found',
          message: 'Invoice not found or you do not have permission to access it.',
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const invoiceNumber = invoice.invoice_number || `INV-${invoiceId.substring(0, 8)}`;
    console.log(`✅ Invoice fetched: ${invoiceNumber}`);

    // ========================================================================
    // STEP 5: Parse client data safely
    // ========================================================================
    const clientData = safeJsonParse(invoice.client_data, {});
    console.log('Client data keys:', Object.keys(clientData));

    let clientEmail = clientData?.email?.trim();
    const clientName = clientData?.name || 'Valued Client';

    // If client_data has no valid email, look up the customer record
    if (!isValidEmail(clientEmail) && clientData?.id) {
      console.log('🔍 No email in client_data, looking up customer record:', clientData.id);
      const { data: customer } = await supabaseClient
        .from('customers')
        .select('email')
        .eq('id', clientData.id)
        .single();
      if (customer?.email) {
        clientEmail = customer.email.trim();
        console.log('✅ Found email from customer record:', clientEmail);
      }
    }

    // If still no email, try matching by name under this user
    if (!isValidEmail(clientEmail) && clientName && clientName !== 'Valued Client') {
      console.log('🔍 Trying name match for:', clientName);
      const { data: customer } = await supabaseClient
        .from('customers')
        .select('email')
        .eq('user_id', user.id)
        .ilike('name', clientName)
        .not('email', 'is', null)
        .limit(1)
        .single();
      if (customer?.email) {
        clientEmail = customer.email.trim();
        console.log('✅ Found email via name match:', clientEmail);
      }
    }

    if (!isValidEmail(clientEmail)) {
      console.error('❌ Invalid client email:', clientEmail);
      console.error('❌ Client data:', JSON.stringify(clientData).substring(0, 300));
      // Expected user-data state, not a server error — return 400. Sentry: REACT-1T.
      return new Response(
        JSON.stringify({
          error: 'invalid_client_email',
          message: `Invalid client email address: "${clientEmail || 'missing'}". Please update the client record with a valid email.`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Client: ${clientName} <${clientEmail}>`);

    // ========================================================================
    // STEP 6: Fetch company profile
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*, stripe_account_id, stripe_account_status')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';
    console.log(`✅ Company: ${companyName}`);

    // ========================================================================
    // STEP 7: Handle Stripe payment link (optional, non-blocking)
    // ========================================================================
    let stripePaymentUrl: string | null = null;
    const stripeConnectActive =
      companyProfile?.stripe_account_id && companyProfile?.stripe_account_status === 'active';

    if (stripeConnectActive) {
      try {
        if (invoice.stripe_payment_link_url) {
          stripePaymentUrl = invoice.stripe_payment_link_url;
          console.log('✅ Using existing Stripe payment link');
        } else {
          console.log('Generating Stripe payment link...');
          const paymentLinkResponse = await fetch(
            `${supabaseUrl}/functions/v1/create-invoice-payment-link`,
            {
              method: 'POST',
              headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ invoiceId }),
            }
          );

          if (paymentLinkResponse.ok) {
            const paymentData = await paymentLinkResponse.json();
            stripePaymentUrl = paymentData.url;
            console.log('✅ Payment link generated');
          } else {
            console.warn('⚠️ Payment link generation failed - continuing without it');
          }
        }
      } catch (paymentLinkError) {
        console.warn('⚠️ Payment link error (non-fatal):', paymentLinkError);
      }
    }

    // ========================================================================
    // STEP 8: Handle PDF generation (optional, non-blocking)
    // ========================================================================
    let pdfUrl = invoice.pdf_url;
    let pdfBase64: string | null = null;
    let pdfAttachmentSuccess = false;

    // Helper function to regenerate PDF
    const regeneratePdf = async (): Promise<string | null> => {
      console.log('🔄 Regenerating PDF...');
      try {
        const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quote: invoice,
            companyProfile: companyProfile,
            invoice_mode: true,
            force_regenerate: true,
          }),
        });

        if (pdfResponse.ok) {
          const pdfData = await pdfResponse.json();
          const newPdfUrl = pdfData.downloadUrl;

          if (newPdfUrl && pdfData.documentId) {
            await supabaseClient
              .from('quotes')
              .update({
                pdf_url: newPdfUrl,
                pdf_document_id: pdfData.documentId,
                pdf_generated_at: new Date().toISOString(),
                pdf_version: (invoice.pdf_version || 0) + 1,
              })
              .eq('id', invoiceId);
            console.log('✅ PDF regenerated');
            return newPdfUrl;
          }
        } else {
          console.warn('⚠️ PDF generation failed - continuing without attachment');
        }
      } catch (pdfGenError) {
        console.warn('⚠️ PDF generation error (non-fatal):', pdfGenError);
      }
      return null;
    };

    // Helper function to download PDF and convert to base64
    const downloadPdf = async (url: string): Promise<boolean> => {
      try {
        console.log('📥 Downloading PDF for attachment...');
        const pdfFileResponse = await fetch(url);
        if (pdfFileResponse.ok) {
          const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
          // Safer base64 encoding for large files
          const uint8Array = new Uint8Array(pdfArrayBuffer);
          let binary = '';
          const chunkSize = 0x8000; // 32KB chunks
          for (let i = 0; i < uint8Array.length; i += chunkSize) {
            const chunk = uint8Array.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          pdfBase64 = btoa(binary);
          console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);
          return true;
        } else {
          console.warn(`⚠️ PDF download failed with status: ${pdfFileResponse.status}`);
          return false;
        }
      } catch (pdfDownloadError) {
        console.warn('⚠️ PDF download error:', pdfDownloadError);
        return false;
      }
    };

    // If no PDF URL exists, generate one
    if (!pdfUrl || !invoice.pdf_document_id) {
      pdfUrl = await regeneratePdf();
    }

    // Try to download the PDF
    if (pdfUrl) {
      pdfAttachmentSuccess = await downloadPdf(pdfUrl);

      // If download failed (likely expired S3 URL), regenerate and try again
      if (!pdfAttachmentSuccess) {
        console.log('🔄 PDF URL may be expired, regenerating...');
        const newPdfUrl = await regeneratePdf();
        if (newPdfUrl) {
          pdfUrl = newPdfUrl;
          pdfAttachmentSuccess = await downloadPdf(newPdfUrl);
        }
      }
    }

    // ========================================================================
    // STEP 9: Parse settings + job details for email payload
    // ========================================================================
    const settings = safeJsonParse(invoice.settings, {});
    const bankDetails = settings.bankDetails || null;
    const paymentTerms = settings.paymentTerms || 'Due within 30 days';
    const jobDetails = safeJsonParse(invoice.job_details, {});
    const jobTitle = jobDetails?.title || null;

    // ========================================================================
    // STEP 10: Build email via shared template
    // ========================================================================
    const emailPayload = buildInvoiceSendEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyProfile?.company_email || null,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      clientName,
      invoiceNumber,
      total: Number(invoice.total) || 0,
      subtotal: typeof invoice.subtotal === 'number' ? invoice.subtotal : Number(invoice.subtotal) || null,
      vatAmount: typeof invoice.vat_amount === 'number' ? invoice.vat_amount : Number(invoice.vat_amount) || null,
      invoiceDate: invoice.invoice_date || null,
      dueDate: invoice.invoice_due_date || null,
      paymentTerms,
      payNowUrl: stripePaymentUrl,
      pdfUrl,
      pdfAttached: pdfAttachmentSuccess,
      bankDetails: bankDetails
        ? {
            bankName: bankDetails.bankName || null,
            accountName: bankDetails.accountName || null,
            accountNumber: bankDetails.accountNumber || null,
            sortCode: bankDetails.sortCode || null,
          }
        : null,
      notes: invoice.invoice_notes || null,
      jobTitle,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=invoice_send&id=${invoiceId}`,
      customSubject,
      customMessage,
    });
    const emailHtml = emailPayload.html;

    // ========================================================================
    // STEP 12: Send email via Resend
    // ========================================================================
    // ELE-662 — centralised sender. From: "<CompanyName> <invoices@elec-mate.com>"
    // (DMARC-aligned; Brevo signs elec-mate.com). Reply-To: company_email
    // or user.email. Never founder@. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail,
    });
    const subject = customSubject || `Invoice ${invoiceNumber} - ${companyName}`;

    console.log(`📧 Sending to: ${clientEmail}`);
    console.log(`📧 From: ${sender.from}`);
    console.log(`📧 Reply-to: ${sender.replyTo || '(none — no company_email or auth email)'}`);
    console.log(`📧 Company profile email: ${companyProfile?.company_email || 'NOT SET'}`);

    const emailOptions: {
      from: string;
      replyTo?: string;
      to: string[];
      subject: string;
      html: string;
      text?: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      ...sender,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
      text: htmlToPlainText(emailHtml),
    };

    if (pdfAttachmentSuccess && pdfBase64) {
      emailOptions.attachments = [
        {
          filename: `Invoice_${invoiceNumber}.pdf`,
          content: pdfBase64,
        },
      ];
      console.log('Invoice PDF attached');
    }

    // Check for linked certificate PDF (when invoice was created from EICR/EIC/Minor Works)
    if (invoice.linked_certificate_pdf_url) {
      console.log('🔗 Linked certificate found, downloading certificate PDF...');
      try {
        const certPdfResponse = await fetch(invoice.linked_certificate_pdf_url);
        if (certPdfResponse.ok) {
          const certPdfArrayBuffer = await certPdfResponse.arrayBuffer();
          // Safer base64 encoding for large files
          const certUint8Array = new Uint8Array(certPdfArrayBuffer);
          let certBinary = '';
          const certChunkSize = 0x8000; // 32KB chunks
          for (let i = 0; i < certUint8Array.length; i += certChunkSize) {
            const chunk = certUint8Array.subarray(i, i + certChunkSize);
            certBinary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          const certPdfBase64 = btoa(certBinary);

          // Generate certificate filename
          const certType = invoice.linked_certificate_type || 'Certificate';
          const certRef = invoice.linked_certificate_reference || 'CERT';
          const certFilename = `${certType.replace(/\s+/g, '_')}_${certRef}.pdf`;

          // Add certificate as additional attachment
          if (!emailOptions.attachments) {
            emailOptions.attachments = [];
          }
          emailOptions.attachments.push({
            filename: certFilename,
            content: certPdfBase64,
          });

          console.log(
            `Certificate PDF attached: ${certFilename} (${certPdfArrayBuffer.byteLength} bytes)`
          );
        } else {
          console.warn('⚠️ Failed to download certificate PDF, continuing without it');
        }
      } catch (certError) {
        console.warn('⚠️ Error downloading certificate PDF (non-fatal):', certError);
      }
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      console.error('❌ Resend API error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent:', emailData?.id);

    // ========================================================================
    // STEP 13: Update invoice status
    // ========================================================================
    await supabaseClient
      .from('quotes')
      .update({
        invoice_status: 'sent',
        invoice_sent_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    // ========================================================================
    // STEP 14: Auto-sync to accounting software (non-blocking)
    // ========================================================================
    let accountingSynced = false;
    const accountingIntegrations = companyProfile?.accounting_integrations || [];
    const connectedAccounting = accountingIntegrations.find(
      (i: any) => i.status === 'connected' && i.autoSyncEnabled !== false
    );

    if (connectedAccounting) {
      console.log(`📊 Auto-syncing to ${connectedAccounting.provider}...`);
      try {
        const syncResponse = await fetch(`${supabaseUrl}/functions/v1/accounting-sync-invoice`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoiceId,
            provider: connectedAccounting.provider,
          }),
        });

        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          if (syncData.success) {
            accountingSynced = true;
            console.log(
              `✅ Invoice synced to ${connectedAccounting.provider}: ${syncData.externalInvoiceId}`
            );
          } else {
            console.warn(`⚠️ Accounting sync returned error: ${syncData.error}`);
          }
        } else {
          const errorText = await syncResponse.text();
          console.warn(`⚠️ Accounting sync failed (${syncResponse.status}): ${errorText}`);
        }
      } catch (syncError) {
        console.warn('⚠️ Accounting sync error (non-fatal):', syncError);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: pdfAttachmentSuccess
          ? 'Invoice sent with PDF attachment'
          : 'Invoice sent (link only)',
        emailId: emailData?.id,
        pdfAttached: pdfAttachmentSuccess,
        payNowIncluded: !!stripePaymentUrl,
        accountingSynced,
        accountingProvider: accountingSynced ? connectedAccounting?.provider : undefined,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'send-invoice-resend',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { duration, hasResendKey: !!Deno.env.get('RESEND_API_KEY') },
    });

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to send invoice',
        hint: 'Check that the invoice has a valid client email address.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
