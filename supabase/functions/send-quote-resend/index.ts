import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface QuoteEmailRequest {
  quoteId: string;
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

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('📧 Send Quote via Resend | Started:', new Date().toISOString());

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
      throw new Error('Please log in to send quotes.');
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
    let quoteId: string;
    try {
      const body = await req.json();
      quoteId = body.quoteId;
    } catch (e) {
      console.error('❌ Failed to parse request body:', e);
      throw new Error('Invalid request format.');
    }

    if (!quoteId || typeof quoteId !== 'string') {
      throw new Error('Quote ID is required.');
    }

    console.log('📄 Processing quote:', quoteId);

    // ========================================================================
    // STEP 4: Fetch quote from database
    // ========================================================================
    const { data: quote, error: quoteError } = await supabaseClient
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .eq('user_id', user.id)
      .single();

    if (quoteError) {
      console.error('❌ Database error fetching quote:', quoteError);
      throw new Error('Could not find this quote. It may have been deleted.');
    }

    if (!quote) {
      throw new Error('Quote not found or you do not have permission to access it.');
    }

    const quoteNumber = quote.quote_number || `QTE-${quoteId.substring(0, 8)}`;
    console.log(`✅ Quote fetched: ${quoteNumber}`);

    // ========================================================================
    // STEP 5: Parse client data safely
    // ========================================================================
    const clientData = safeJsonParse(quote.client_data, {});
    console.log('📄 Client data keys:', Object.keys(clientData));

    const clientEmail = clientData?.email?.trim();
    const clientName = clientData?.name || 'Valued Client';

    if (!isValidEmail(clientEmail)) {
      console.error('❌ Invalid client email:', clientEmail);
      console.error('❌ Client data:', JSON.stringify(clientData).substring(0, 300));
      throw new Error(`Invalid client email address: "${clientEmail || 'missing'}". Please update the quote with a valid email.`);
    }

    console.log(`✅ Client: ${clientName} <${clientEmail}>`);

    // ========================================================================
    // STEP 6: Fetch company profile
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';
    console.log(`✅ Company: ${companyName}`);

    // ========================================================================
    // STEP 7: Get or create public token for accept/reject
    // ========================================================================
    let publicToken = quote.public_token;

    if (!publicToken) {
      try {
        const { data: existingView } = await supabaseClient
          .from('quote_views')
          .select('public_token')
          .eq('quote_id', quoteId)
          .single();

        if (existingView?.public_token) {
          publicToken = existingView.public_token;
        } else {
          publicToken = crypto.randomUUID();
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);

          await supabaseClient
            .from('quote_views')
            .insert({
              quote_id: quoteId,
              public_token: publicToken,
              expires_at: expiryDate.toISOString(),
              is_active: true
            });

          await supabaseClient
            .from('quotes')
            .update({ public_token: publicToken })
            .eq('id', quoteId);
        }
        console.log('✅ Public token ready');
      } catch (tokenError) {
        console.warn('⚠️ Token generation error (non-fatal):', tokenError);
        publicToken = crypto.randomUUID(); // Fallback
      }
    }

    // Use the web portal for accept/reject (with signature capture)
    // instead of direct edge function (one-click without signature)
    // IMPORTANT: Always use www.elec-mate.com (non-www has no SSL certificate)
    const appUrl = 'https://www.elec-mate.com';
    const acceptUrl = `${appUrl}/public-quote/${publicToken}#accept`;
    const rejectUrl = `${appUrl}/public-quote/${publicToken}#reject`;
    console.log(`🔗 Accept URL: ${acceptUrl}`);

    // ========================================================================
    // STEP 8: Handle PDF generation (optional, non-blocking)
    // ========================================================================
    let pdfUrl = quote.pdf_url;
    let pdfBase64: string | null = null;
    let pdfAttachmentSuccess = false;

    if (!pdfUrl || !quote.pdf_document_id) {
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
              quote: quote,
              companyProfile: companyProfile,
              invoice_mode: false,
              force_regenerate: true,
            }),
          }
        );

        if (pdfResponse.ok) {
          const pdfData = await pdfResponse.json();
          pdfUrl = pdfData.downloadUrl;

          if (pdfUrl && pdfData.documentId) {
            await supabaseClient
              .from('quotes')
              .update({
                pdf_url: pdfUrl,
                pdf_document_id: pdfData.documentId,
                pdf_generated_at: new Date().toISOString(),
                pdf_version: (quote.pdf_version || 0) + 1,
              })
              .eq('id', quoteId);
            console.log('✅ PDF regenerated');
          }
        } else {
          console.warn('⚠️ PDF generation failed - continuing without attachment');
        }
      } catch (pdfGenError) {
        console.warn('⚠️ PDF generation error (non-fatal):', pdfGenError);
      }
    }

    // Try to download PDF for attachment
    if (pdfUrl) {
      try {
        console.log('📥 Downloading PDF for attachment...');
        const pdfFileResponse = await fetch(pdfUrl);
        if (pdfFileResponse.ok) {
          const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
          const uint8Array = new Uint8Array(pdfArrayBuffer);
          let binary = '';
          const chunkSize = 0x8000;
          for (let i = 0; i < uint8Array.length; i += chunkSize) {
            const chunk = uint8Array.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          pdfBase64 = btoa(binary);
          pdfAttachmentSuccess = true;
          console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);
        }
      } catch (pdfDownloadError) {
        console.warn('⚠️ PDF download error (non-fatal):', pdfDownloadError);
      }
    }

    // ========================================================================
    // STEP 9: Parse job details safely
    // ========================================================================
    const jobDetails = safeJsonParse(quote.job_details, {});
    const jobTitle = jobDetails?.title || 'Electrical Work';
    const jobDescription = jobDetails?.description || '';

    // ========================================================================
    // STEP 10: Build email HTML
    // ========================================================================
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Quote from ${companyName}</title>
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
                Thank you for the opportunity to provide this quote. Please find the details below:
              </p>
            </td>
          </tr>

          <!-- Quote Card -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 2px solid #e5e7eb;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #1f2937;">Quote #${quoteNumber}</h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Quote Date:</td><td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${formatDate(quote.created_at)}</td></tr>
                      <tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Valid Until:</td><td style="text-align: right; font-size: 14px; color: #dc2626; font-weight: 600;">${formatDate(quote.expiry_date)}</td></tr>
                      ${jobTitle ? `<tr><td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Job:</td><td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${jobTitle}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Total Amount -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-left: 4px solid #FFD700; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #92400e; font-weight: 500;">Total Quote Amount</td>
                        <td style="text-align: right;">
                          <span style="font-size: 32px; font-weight: 700; color: #1f2937;">${formatCurrency(quote.total)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PDF Attachment Notice -->
          ${pdfAttachmentSuccess ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-align: center; padding: 16px 24px; border-radius: 10px; font-size: 16px; font-weight: 600;">
                📎 Quote PDF Attached
              </div>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #6b7280;">
                Quote_${quoteNumber}.pdf is attached to this email
              </p>
            </td>
          </tr>
          ` : ''}

          <!-- Accept/Reject Buttons -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; text-align: center; font-size: 15px; color: #374151; font-weight: 600;">
                Ready to proceed?
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-right: 8px; width: 50%;">
                    <a href="${acceptUrl}" style="display: block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 12px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                      ✓ Accept & Sign
                    </a>
                  </td>
                  <td style="padding-left: 8px; width: 50%;">
                    <a href="${rejectUrl}" style="display: block; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 12px; border-radius: 10px; font-size: 16px; font-weight: 600;">
                      ✗ Decline
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 12px; color: #9ca3af;">
                You'll be taken to a secure page to review and sign
              </p>
            </td>
          </tr>

          ${jobDescription ? `
          <!-- Job Description -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #f9fafb; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #374151;">📝 Scope of Work:</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6b7280;">${jobDescription}</p>
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
                If you have any questions about this quote, please don't hesitate to contact us.
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

  <!-- Email tracking pixel - invisible 1x1 image to track opens -->
  <img src="${supabaseUrl}/functions/v1/quote-email-tracking?t=${publicToken}&q=${quoteId}" width="1" height="1" style="display:none;visibility:hidden;width:1px;height:1px;opacity:0;" alt="" />

</body>
</html>
    `;

    // ========================================================================
    // STEP 11: Send email via Resend
    // ========================================================================
    // Only use company email for Reply-To - never fall back to personal email
    const replyToEmail = companyProfile?.company_email || 'info@elec-mate.com';
    const subject = `Quote ${quoteNumber} - ${companyName}`;

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
        filename: `Quote_${quoteNumber}.pdf`,
        content: pdfBase64,
      }];
      console.log('📎 PDF attached');
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      console.error('❌ Resend API error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent:', emailData?.id);

    // ========================================================================
    // STEP 12: Update quote status and track first send
    // ========================================================================

    // Check if this is the first send (for follow-up tracking)
    const isFirstSend = quote.status !== 'sent' || !quote.first_sent_at;

    const quoteUpdateData: any = {
      status: 'sent',
      updated_at: new Date().toISOString()
    };

    // Set first_sent_at only on first send (for automated follow-up tracking)
    if (isFirstSend) {
      quoteUpdateData.first_sent_at = new Date().toISOString();
      console.log('📅 First send - setting first_sent_at for follow-up tracking');
    }

    await supabaseClient
      .from('quotes')
      .update(quoteUpdateData)
      .eq('id', quoteId);

    // Update quote_views with email_sent_at for tracking
    await supabaseClient
      .from('quote_views')
      .update({
        email_sent_at: new Date().toISOString()
      })
      .eq('quote_id', quoteId)
      .eq('public_token', publicToken);

    // Record email sent event for analytics
    try {
      await supabaseClient
        .from('quote_email_events')
        .insert({
          quote_id: quoteId,
          event_type: 'sent',
          event_data: {
            type: 'initial',
            pdf_attached: pdfAttachmentSuccess,
            email_id: emailData?.id,
          },
        });
    } catch (eventError) {
      console.warn('⚠️ Failed to record email event (non-blocking):', eventError);
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: pdfAttachmentSuccess ? 'Quote sent with PDF attachment' : 'Quote sent (link only)',
        emailId: emailData?.id,
        pdfAttached: pdfAttachmentSuccess,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to send quote',
        hint: 'Check that the quote has a valid client email address.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
