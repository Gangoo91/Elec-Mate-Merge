import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceEmailRequest {
  invoiceId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('📧 Send Invoice via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if Authorization header is present
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('❌ No Authorization header found');
      throw new Error('No Authorization header provided');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Extract JWT token and authenticate user using it
    const jwt = authHeader.replace('Bearer ', '').trim();

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error('❌ User authentication error:', userError);
      throw new Error('Unauthorized');
    }
    
    console.log('✅ User authenticated:', user.id);

    // Get user email for reply-to fallback
    const userEmail = user.email;

    const { invoiceId }: InvoiceEmailRequest = await req.json();

    if (!invoiceId) {
      throw new Error('Invoice ID is required');
    }

    // Fetch invoice details
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .single();

    if (invoiceError || !invoice) {
      console.error('❌ Invoice not found:', invoiceError);
      throw new Error('Invoice not found');
    }

    console.log(`📄 Invoice fetched: ${invoice.invoice_number}`);

    // Fetch company profile for sender details
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const clientEmail = invoice.client_data?.email;
    if (!clientEmail) {
      throw new Error('Client email not found');
    }

    console.log(`📧 Client email: ${clientEmail}`);

    // Ensure we have a fresh PDF - regenerate if missing or stale
    let pdfUrl = invoice.pdf_url;
    const pdfNeedsRegeneration = !pdfUrl || !invoice.pdf_document_id;

    if (pdfNeedsRegeneration) {
      console.log('🔄 Regenerating PDF for email attachment...');
      
      // Call generate-pdf-monkey edge function to create fresh PDF
      const pdfResponse = await fetch(
        `${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-pdf-monkey`,
        {
          method: 'POST',
          headers: {
            'Authorization': req.headers.get('Authorization') || '',
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
        pdfUrl = pdfData.downloadUrl;
        
        // Update database with new PDF metadata
        if (pdfUrl && pdfData.documentId) {
          const newVersion = (invoice.pdf_version || 0) + 1;
          await supabaseClient
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_document_id: pdfData.documentId,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion,
            })
            .eq('id', invoiceId);
        }
      }
    }

    // Download PDF as binary data for attachment
    if (!pdfUrl) {
      throw new Error('PDF URL is missing - cannot send invoice without PDF');
    }
    
    console.log('📥 Downloading PDF for attachment...');
    const pdfFileResponse = await fetch(pdfUrl);
    if (!pdfFileResponse.ok) {
      throw new Error('Failed to download PDF from PDF Monkey');
    }
    const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfArrayBuffer)));
    console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    };

    // Generate brilliant mobile-first HTML email
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Invoice from ${companyProfile?.company_name || 'ElecMate'}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; min-height: 100vh;">
    <tr>
      <td style="padding: 20px 10px;">

        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <h1 style="margin: 0; color: #FFD700; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">
                      ⚡ ${companyProfile?.company_name || 'ElecMate Professional'}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 24px 0;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Dear <strong style="color: #1f2937;">${invoice.client_data?.name || 'Valued Client'}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for your business. Please find your invoice details below:
              </p>
            </td>
          </tr>

          <!-- Invoice Hero Card -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 2px solid #e5e7eb; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #1f2937; letter-spacing: -0.5px;">
                      Invoice #${invoice.invoice_number}
                    </h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Invoice Date:</td>
                              <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${new Date(invoice.invoice_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Due Date:</td>
                              <td style="text-align: right; font-size: 14px; color: #dc2626; font-weight: 600;">${new Date(invoice.invoice_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Payment Terms:</td>
                              <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${invoice.settings?.paymentTerms || 'Due within 30 days'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Invoice Button (Mobile-optimized, touch-friendly) -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${pdfUrl}" target="_blank" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 24px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); -webkit-tap-highlight-color: transparent;">
                      📄 View Invoice PDF
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #6b7280; line-height: 1.4;">
                Invoice_${invoice.invoice_number}.pdf is attached to this email
              </p>
            </td>
          </tr>

          ${invoice.settings?.bankDetails ? `
          <!-- Bank Details (Highlighted) -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #92400e;">
                      💳 Payment Details (Bank Transfer)
                    </h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Bank Name:</strong></td>
                        <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${invoice.settings.bankDetails.bankName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Account Name:</strong></td>
                        <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${invoice.settings.bankDetails.accountName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Account Number:</strong></td>
                        <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${invoice.settings.bankDetails.accountNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #78350f;"><strong>Sort Code:</strong></td>
                        <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #78350f; font-weight: 600;">${invoice.settings.bankDetails.sortCode}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0 0; font-size: 14px; color: #78350f;"><strong>Reference:</strong></td>
                        <td style="padding: 8px 0 0; text-align: right; font-size: 14px; color: #92400e; font-weight: 700;">${invoice.invoice_number}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Invoice Items Table -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <!-- Table Header -->
                <tr style="background: #f9fafb;">
                  <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb;">Description</th>
                  <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; white-space: nowrap;">Qty</th>
                  <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; white-space: nowrap;">Price</th>
                  <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; white-space: nowrap;">Total</th>
                </tr>
                <!-- Table Body -->
                ${invoice.items.map((item: any, index: number) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                  <td style="padding: 12px; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
                  <td style="padding: 12px; text-align: center; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap;">${formatCurrency(item.unitPrice)}</td>
                  <td style="padding: 12px; text-align: right; font-size: 14px; color: #1f2937; border-bottom: 1px solid #e5e7eb; white-space: nowrap; font-weight: 600;">${formatCurrency(item.total)}</td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Totals Section -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: right; padding: 8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left: auto;">
                      <tr>
                        <td style="padding: 6px 12px 6px 0; font-size: 15px; color: #6b7280; text-align: right;">Subtotal:</td>
                        <td style="padding: 6px 0; font-size: 15px; color: #1f2937; font-weight: 600; text-align: right; min-width: 100px;">${formatCurrency(parseFloat(invoice.subtotal))}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 12px 6px 0; font-size: 15px; color: #6b7280; text-align: right;">VAT (20%):</td>
                        <td style="padding: 6px 0; font-size: 15px; color: #1f2937; font-weight: 600; text-align: right;">${formatCurrency(parseFloat(invoice.vat_amount))}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 12px 0 0; border-top: 2px solid #e5e7eb;"></td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 12px 0 0; font-size: 16px; color: #374151; font-weight: 700; text-align: right;">Total Amount:</td>
                        <td style="padding: 12px 0 0; font-size: 36px; color: #FFD700; font-weight: 700; text-align: right; line-height: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">£${parseFloat(invoice.total).toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${invoice.invoice_notes ? `
          <!-- Notes Section -->
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

          <!-- Closing Message -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #374151;">
                If you have any questions about this invoice, please don't hesitate to contact us.
              </p>
              <p style="margin: 0 0 4px; font-size: 15px; line-height: 1.6; color: #374151;">
                Thank you for your business!
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1f2937;">
                ${companyProfile?.company_name || 'ElecMate Professional'}
              </p>
              ${companyProfile?.company_phone ? `
              <p style="margin: 0 0 4px; font-size: 14px; color: #6b7280;">
                📞 <a href="tel:${companyProfile.company_phone}" style="color: #1f2937; text-decoration: none; font-weight: 500;">${companyProfile.company_phone}</a>
              </p>
              ` : ''}
              ${companyProfile?.company_email ? `
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                ✉️ <a href="mailto:${companyProfile.company_email}" style="color: #1f2937; text-decoration: none; font-weight: 500;">${companyProfile.company_email}</a>
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700; letter-spacing: 0.5px;">
                ⚡ Powered by ElecMate Professional Suite
              </p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.5;">
                Professional electrical contracting tools for modern electricians
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Send email via Resend with reply-to header
    const subject = `Invoice ${invoice.invoice_number} - ${companyProfile?.company_name || 'ElecMate'}`;
    const pdfFilename = `Invoice_${invoice.invoice_number}.pdf`;

    // Build reply-to: company email → user email → support fallback
    const replyToEmail = companyProfile?.company_email || userEmail || 'support@elec-mate.com';

    console.log(`📧 Sending invoice via Resend to: ${clientEmail}`);
    console.log(`📧 Reply-to set to: ${replyToEmail}`);

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'ElecMate <Founder@elec-mate.com>',
      replyTo: replyToEmail,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
      attachments: [{
        filename: pdfFilename,
        content: pdfBase64,
      }],
    });

    if (emailError) {
      console.error('❌ Resend API error:', emailError);
      throw emailError;
    }

    console.log('✅ Email sent successfully:', emailData);

    // Update invoice status to sent
    await supabaseClient
      .from('quotes')
      .update({ 
        invoice_status: 'sent',
        invoice_sent_at: new Date().toISOString()
      })
      .eq('id', invoiceId);

    return new Response(
      JSON.stringify({ success: true, message: 'Invoice sent successfully', emailId: emailData.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in send-invoice-resend function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send invoice' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
