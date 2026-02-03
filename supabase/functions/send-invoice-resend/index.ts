import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { captureException } from "../_shared/sentry.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

/**
 * Safely format currency - handles NaN, undefined, null, strings
 */
function formatCurrency(amount: any): string {
  let numAmount = 0;

  if (typeof amount === 'number' && !isNaN(amount)) {
    numAmount = amount;
  } else if (typeof amount === 'string') {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed)) numAmount = parsed;
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(numAmount);
}

/**
 * Safely format date - handles invalid dates
 */
function formatDate(dateInput: any): string {
  if (!dateInput) return 'N/A';

  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (e) {
    console.warn('⚠️ Date format failed:', e);
    return 'N/A';
  }
}

/**
 * Safely get nested property
 */
function safeGet(obj: any, path: string, fallback: any = ''): any {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result === null || result === undefined) return fallback;
      result = result[key];
    }
    return result ?? fallback;
  } catch (e) {
    return fallback;
  }
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
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
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
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error('❌ User authentication error:', userError);
      throw new Error('Session expired. Please log in again.');
    }

    console.log('✅ User authenticated:', user.id);
    const userEmail = user.email;

    // ========================================================================
    // STEP 3: Parse and validate request
    // ========================================================================
    let invoiceId: string;
    try {
      const body = await req.json();
      invoiceId = body.invoiceId;
    } catch (e) {
      console.error('❌ Failed to parse request body:', e);
      throw new Error('Invalid request format.');
    }

    if (!invoiceId || typeof invoiceId !== 'string') {
      throw new Error('Invoice ID is required.');
    }

    console.log('📄 Processing invoice:', invoiceId);

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
      throw new Error('Could not find this invoice. It may have been deleted.');
    }

    if (!invoice) {
      throw new Error('Invoice not found or you do not have permission to access it.');
    }

    const invoiceNumber = invoice.invoice_number || `INV-${invoiceId.substring(0, 8)}`;
    console.log(`✅ Invoice fetched: ${invoiceNumber}`);

    // ========================================================================
    // STEP 5: Parse client data safely
    // ========================================================================
    const clientData = safeJsonParse(invoice.client_data, {});
    console.log('📄 Client data keys:', Object.keys(clientData));

    const clientEmail = clientData?.email?.trim();
    const clientName = clientData?.name || 'Valued Client';

    if (!isValidEmail(clientEmail)) {
      console.error('❌ Invalid client email:', clientEmail);
      console.error('❌ Client data:', JSON.stringify(clientData).substring(0, 300));
      throw new Error(`Invalid client email address: "${clientEmail || 'missing'}". Please update the invoice with a valid email.`);
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
    const stripeConnectActive = companyProfile?.stripe_account_id &&
                                 companyProfile?.stripe_account_status === 'active';

    if (stripeConnectActive) {
      try {
        if (invoice.stripe_payment_link_url) {
          stripePaymentUrl = invoice.stripe_payment_link_url;
          console.log('✅ Using existing Stripe payment link');
        } else {
          console.log('💳 Generating Stripe payment link...');
          const paymentLinkResponse = await fetch(
            `${supabaseUrl}/functions/v1/create-invoice-payment-link`,
            {
              method: 'POST',
              headers: {
                'Authorization': authHeader,
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
        const pdfResponse = await fetch(
          `${supabaseUrl}/functions/v1/generate-pdf-monkey`,
          {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quote: invoice,
              companyProfile: companyProfile,
              invoice_mode: true,
              force_regenerate: true,
            }),
          }
        );

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
    // STEP 9: Parse settings and prepare invoice items safely
    // ========================================================================
    const settings = safeJsonParse(invoice.settings, {});
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    const showSummaryView = settings.showSummaryView || false;

    let itemsHtml: string;

    if (showSummaryView) {
      // Summary view: Group items by category
      const categoryTotals: Record<string, number> = {};
      const categoryLabels: Record<string, string> = {
        labour: 'Labour',
        materials: 'Materials',
        equipment: 'Equipment Hire',
        manual: 'Other'
      };

      for (const item of items) {
        const category = (item as any).category || 'manual';
        const qty = (item as any).actualQuantity ?? safeGet(item, 'quantity', 0);
        const unitPrice = safeGet(item, 'unitPrice', 0);
        const total = qty * unitPrice;
        if (!categoryTotals[category]) categoryTotals[category] = 0;
        categoryTotals[category] += total;
      }

      // Build summary rows
      const categoryOrder = ['labour', 'materials', 'equipment', 'manual'];
      itemsHtml = categoryOrder
        .filter(cat => categoryTotals[cat] && categoryTotals[cat] > 0)
        .map((category, index) => {
          const label = categoryLabels[category] || category;
          const total = categoryTotals[category];
          return `
            <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
              <td style="padding: 12px; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${label}</td>
              <td style="padding: 12px; text-align: center; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">1</td>
              <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap;">${formatCurrency(total)}</td>
              <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap; font-weight: 600;">${formatCurrency(total)}</td>
            </tr>
          `;
        }).join('');
    } else {
      // Detailed view: Show all items individually
      itemsHtml = items.map((item: any, index: number) => {
        const description = safeGet(item, 'description', 'Item');
        const quantity = safeGet(item, 'quantity', 0);
        const unitPrice = safeGet(item, 'unitPrice', 0);
        const lineTotal = item.total ?? item.totalPrice ?? (quantity * unitPrice);

        return `
          <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
            <td style="padding: 12px; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${description}</td>
            <td style="padding: 12px; text-align: center; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${quantity}</td>
            <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap;">${formatCurrency(unitPrice)}</td>
            <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap; font-weight: 600;">${formatCurrency(lineTotal)}</td>
          </tr>
        `;
      }).join('');
    }

    // ========================================================================
    // STEP 10: Extract payment settings
    // ========================================================================
    const bankDetails = settings.bankDetails;
    const paymentTerms = settings.paymentTerms || 'Due within 30 days';

    // ========================================================================
    // STEP 11: Build email HTML
    // ========================================================================
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Invoice from ${companyName}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; min-height: 100vh;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              ${companyProfile?.logo_url ? `<img src="${companyProfile.logo_url}" alt="${companyName}" style="max-height: 60px; max-width: 200px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />` : ''}
              <h1 style="margin: 0; color: #FFD700; font-size: 26px; font-weight: 700;">⚡ ${companyName}</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 24px 0;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Dear <strong style="color: #1f2937;">${clientName}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for your business. Please find your invoice details below:
              </p>
            </td>
          </tr>

          <!-- Invoice Card -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 2px solid #e5e7eb;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #1f2937;">Invoice #${invoiceNumber}</h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Invoice Date:</td><td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${formatDate(invoice.invoice_date)}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Due Date:</td><td style="text-align: right; font-size: 14px; color: #dc2626; font-weight: 600;">${formatDate(invoice.invoice_due_date)}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Payment Terms:</td><td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${paymentTerms}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View PDF Button -->
          ${pdfUrl ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <a href="${pdfUrl}" target="_blank" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 24px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                📄 View Invoice PDF
              </a>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #6b7280;">
                ${pdfAttachmentSuccess ? `Invoice_${invoiceNumber}.pdf is attached to this email` : 'Click above to view and download your invoice'}
              </p>
            </td>
          </tr>
          ` : ''}

          <!-- Pay Now Button -->
          ${stripePaymentUrl ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <a href="${stripePaymentUrl}" target="_blank" style="display: block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 20px 24px; border-radius: 12px; font-size: 18px; font-weight: 700; box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);">
                💳 Pay Now - Secure Card Payment
              </a>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #6b7280;">
                Fast, secure payment via Stripe
              </p>
            </td>
          </tr>
          ` : ''}

          <!-- Bank Details -->
          ${bankDetails ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #92400e;">💳 Payment Details (Bank Transfer)</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      ${bankDetails.bankName ? `<tr><td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Bank:</strong></td><td style="text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${bankDetails.bankName}</td></tr>` : ''}
                      ${bankDetails.accountName ? `<tr><td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Account:</strong></td><td style="text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${bankDetails.accountName}</td></tr>` : ''}
                      ${bankDetails.accountNumber ? `<tr><td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Acc No:</strong></td><td style="text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${bankDetails.accountNumber}</td></tr>` : ''}
                      ${bankDetails.sortCode ? `<tr><td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Sort Code:</strong></td><td style="text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${bankDetails.sortCode}</td></tr>` : ''}
                      <tr><td style="padding: 8px 0 0; font-size: 14px; color: #78350f;"><strong>Reference:</strong></td><td style="text-align: right; font-size: 14px; color: #92400e; font-weight: 700;">${invoiceNumber}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Items Table -->
          ${items.length > 0 ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <tr style="background: #f9fafb;">
                  <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb;">Description</th>
                  <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb;">Qty</th>
                  <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb;">Price</th>
                  <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb;">Total</th>
                </tr>
                ${itemsHtml}
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Totals -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left: auto;">
                <tr><td style="padding: 6px 12px 6px 0; font-size: 15px; color: #6b7280;">Subtotal:</td><td style="font-size: 15px; color: #1f2937; font-weight: 600; text-align: right;">${formatCurrency(invoice.subtotal)}</td></tr>
                <tr><td style="padding: 6px 12px 6px 0; font-size: 15px; color: #6b7280;">VAT (20%):</td><td style="font-size: 15px; color: #1f2937; font-weight: 600; text-align: right;">${formatCurrency(invoice.vat_amount)}</td></tr>
                <tr><td colspan="2" style="padding: 12px 0 0; border-top: 2px solid #e5e7eb;"></td></tr>
                <tr><td style="padding: 12px 12px 0 0; font-size: 16px; color: #374151; font-weight: 700;">Total:</td><td style="padding: 12px 0 0; font-size: 36px; color: #FFD700; font-weight: 700; text-align: right;">${formatCurrency(invoice.total)}</td></tr>
              </table>
            </td>
          </tr>

          <!-- Notes -->
          ${invoice.invoice_notes ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #fffbeb; border-left: 4px solid #FFD700; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #92400e;">📝 Notes:</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #78350f;">${invoice.invoice_notes}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #374151;">
                If you have any questions, please don't hesitate to contact us.
              </p>
              <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1f2937;">${companyName}</p>
              ${companyProfile?.company_phone ? `<p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">📞 <a href="tel:${companyProfile.company_phone}" style="color: #1f2937; text-decoration: none;">${companyProfile.company_phone}</a></p>` : ''}
              ${companyProfile?.company_email ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">✉️ <a href="mailto:${companyProfile.company_email}" style="color: #1f2937; text-decoration: none;">${companyProfile.company_email}</a></p>` : ''}
            </td>
          </tr>

          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ Powered by ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical contracting tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // ========================================================================
    // STEP 12: Send email via Resend
    // ========================================================================
    // Only use company email for Reply-To - never fall back to personal email
    const replyToEmail = companyProfile?.company_email || 'info@elec-mate.com';
    const subject = `Invoice ${invoiceNumber} - ${companyName}`;

    console.log(`📧 Sending to: ${clientEmail}`);
    console.log(`📧 Reply-to: ${replyToEmail}`);
    console.log(`📧 Company profile email: ${companyProfile?.company_email || 'NOT SET'}`);

    const emailOptions: {
      from: string;
      reply_to: string;
      to: string[];
      subject: string;
      html: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      from: `${companyName} <founder@elec-mate.com>`,
      reply_to: replyToEmail,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
    };

    if (pdfAttachmentSuccess && pdfBase64) {
      emailOptions.attachments = [{
        filename: `Invoice_${invoiceNumber}.pdf`,
        content: pdfBase64,
      }];
      console.log('📎 Invoice PDF attached');
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

          console.log(`📎 Certificate PDF attached: ${certFilename} (${certPdfArrayBuffer.byteLength} bytes)`);
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
        invoice_sent_at: new Date().toISOString()
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
        const syncResponse = await fetch(
          `${supabaseUrl}/functions/v1/accounting-sync-invoice`,
          {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              invoiceId,
              provider: connectedAccounting.provider,
            }),
          }
        );

        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          if (syncData.success) {
            accountingSynced = true;
            console.log(`✅ Invoice synced to ${connectedAccounting.provider}: ${syncData.externalInvoiceId}`);
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
        message: pdfAttachmentSuccess ? 'Invoice sent with PDF attachment' : 'Invoice sent (link only)',
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
      extra: { duration, hasResendKey: !!Deno.env.get("RESEND_API_KEY") }
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
