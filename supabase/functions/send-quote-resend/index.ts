import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteEmailRequest {
  quoteId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('📧 Send Quote via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log environment check
    const hasResendKey = !!Deno.env.get("RESEND_API_KEY");
    console.log(`🔑 RESEND_API_KEY configured: ${hasResendKey}`);

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

    const { quoteId }: QuoteEmailRequest = await req.json();

    if (!quoteId) {
      throw new Error('Quote ID is required');
    }

    // Fetch quote details
    const { data: quote, error: quoteError } = await supabaseClient
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .eq('user_id', user.id)
      .single();

    if (quoteError || !quote) {
      console.error('❌ Quote not found:', quoteError);
      console.error('❌ Quote ID attempted:', quoteId);
      console.error('❌ User ID:', user.id);
      throw new Error(`Quote not found: ${quoteError?.message || 'No matching quote for this user'}`);
    }

    console.log(`📄 Quote fetched: ${quote.quote_number}`);
    console.log(`📄 Quote client_data type: ${typeof quote.client_data}`);
    console.log(`📄 Quote client_data:`, JSON.stringify(quote.client_data).substring(0, 200));

    // Fetch company profile for sender details
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const clientData = typeof quote.client_data === 'string'
      ? JSON.parse(quote.client_data)
      : quote.client_data;
    console.log(`📄 Parsed clientData:`, JSON.stringify(clientData).substring(0, 200));

    const clientEmail = clientData?.email;
    if (!clientEmail) {
      console.error('❌ Client email not found in client_data');
      console.error('❌ Available keys:', Object.keys(clientData || {}));
      throw new Error('Client email not found - please add client email to the quote');
    }

    const clientName = clientData?.name || 'Valued Client';
    const companyName = companyProfile?.company_name || 'ElecMate';

    console.log(`📧 Client email: ${clientEmail}`);

    // Get or create public token for accept/reject buttons
    let publicToken = quote.public_token;

    if (!publicToken) {
      // Check if quote_views entry exists
      const { data: existingView } = await supabaseClient
        .from('quote_views')
        .select('public_token')
        .eq('quote_id', quoteId)
        .single();

      if (existingView?.public_token) {
        publicToken = existingView.public_token;
      } else {
        // Create new quote_views entry with token
        publicToken = crypto.randomUUID();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 days expiry

        await supabaseClient
          .from('quote_views')
          .insert({
            quote_id: quoteId,
            public_token: publicToken,
            expires_at: expiryDate.toISOString(),
            is_active: true
          });

        // Update quote with public_token
        await supabaseClient
          .from('quotes')
          .update({ public_token: publicToken })
          .eq('id', quoteId);
      }
    }

    // Generate accept/reject URLs
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const acceptUrl = `${supabaseUrl}/functions/v1/quote-action?token=${publicToken}&action=accept`;
    const rejectUrl = `${supabaseUrl}/functions/v1/quote-action?token=${publicToken}&action=reject`;

    console.log(`🔗 Accept/Reject URLs generated with token: ${publicToken.substring(0, 8)}...`);

    // Ensure we have a fresh PDF - regenerate if missing or stale
    let pdfUrl = quote.pdf_url;
    const pdfNeedsRegeneration = !pdfUrl || !quote.pdf_document_id;

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
        console.log(`✅ PDF regenerated: ${pdfUrl?.substring(0, 100)}...`);

        // Update database with new PDF metadata
        if (pdfUrl && pdfData.documentId) {
          const newVersion = (quote.pdf_version || 0) + 1;
          await supabaseClient
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_document_id: pdfData.documentId,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion,
            })
            .eq('id', quoteId);
        }
      } else {
        const errorText = await pdfResponse.text();
        console.error(`❌ PDF generation failed: ${pdfResponse.status} - ${errorText.substring(0, 500)}`);
      }
    }

    // Download PDF as binary data for attachment (with fallback)
    let pdfBase64: string | null = null;
    let pdfAttachmentSuccess = false;

    if (pdfUrl) {
      try {
        console.log('📥 Downloading PDF for attachment...');
        const pdfFileResponse = await fetch(pdfUrl);
        if (pdfFileResponse.ok) {
          const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
          pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfArrayBuffer)));
          pdfAttachmentSuccess = true;
          console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);
        } else {
          console.warn(`⚠️ PDF download failed: ${pdfFileResponse.status} - will send email with link only`);
        }
      } catch (pdfError) {
        console.warn(`⚠️ PDF download error: ${pdfError} - will send email with link only`);
      }
    } else {
      console.warn('⚠️ No PDF URL available - will send email with link only');
    }

    // Format dates
    const quoteDate = new Date(quote.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const expiryDate = quote.expiry_date
      ? new Date(quote.expiry_date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    };

    const jobDetails = typeof quote.job_details === 'string'
      ? JSON.parse(quote.job_details)
      : quote.job_details;
    const jobTitle = jobDetails?.title || 'Electrical Work';
    const jobDescription = jobDetails?.description || '';

    // Generate professional mobile-first HTML email
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
                      ⚡ ${companyName}
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
                Dear <strong style="color: #1f2937;">${clientName}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for the opportunity to provide this quote. Please find the details below:
              </p>
            </td>
          </tr>

          <!-- Quote Hero Card -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 2px solid #e5e7eb; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #1f2937; letter-spacing: -0.5px;">
                      Quote #${quote.quote_number}
                    </h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Quote Date:</td>
                              <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${quoteDate}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Valid Until:</td>
                              <td style="text-align: right; font-size: 14px; color: #dc2626; font-weight: 600;">${expiryDate}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${jobTitle ? `
                      <tr>
                        <td style="padding: 6px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; color: #6b7280; font-weight: 500;">Job:</td>
                              <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${jobTitle}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
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
                          <span style="font-size: 32px; font-weight: 700; color: #1f2937; letter-spacing: -1px;">${formatCurrency(parseFloat(quote.total))}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Quote Button -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${pdfUrl}" target="_blank" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 24px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); -webkit-tap-highlight-color: transparent;">
                      📄 View Quote PDF
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #6b7280; line-height: 1.4;">
                ${pdfAttachmentSuccess ? `Quote_${quote.quote_number}.pdf is attached to this email` : 'Click above to view and download your quote'}
              </p>
            </td>
          </tr>

          <!-- Accept/Reject Buttons -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; text-align: center; font-size: 15px; color: #374151; font-weight: 600;">
                Ready to proceed? Let us know:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-right: 8px; width: 50%;">
                    <a href="${acceptUrl}" style="display: block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-align: center; text-decoration: none; padding: 16px 12px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                      ✓ Accept Quote
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
                Click once to respond - you'll see a confirmation page
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

          <!-- Closing Message -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #374151;">
                If you have any questions about this quote, please don't hesitate to contact us.
              </p>
              <p style="margin: 0 0 4px; font-size: 15px; line-height: 1.6; color: #374151;">
                Kind regards,
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1f2937;">
                ${companyName}
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
    const subject = `Quote ${quote.quote_number} - ${companyName}`;
    const pdfFilename = `Quote_${quote.quote_number}.pdf`;

    // Build reply-to: company email → user email → support fallback
    const replyToEmail = companyProfile?.company_email || userEmail || 'support@elec-mate.com';

    console.log(`📧 Sending quote via Resend to: ${clientEmail}`);
    console.log(`📧 Reply-to set to: ${replyToEmail}`);

    // Build email options with optional attachment
    const emailOptions: {
      from: string;
      replyTo: string;
      to: string[];
      subject: string;
      html: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      from: `${companyName} <${replyToEmail}>`,
      replyTo: replyToEmail,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
    };

    // Add PDF attachment if available
    if (pdfAttachmentSuccess && pdfBase64) {
      emailOptions.attachments = [{
        filename: pdfFilename,
        content: pdfBase64,
      }];
      console.log('📎 Including PDF attachment');
    } else {
      console.log('📧 Sending email without PDF attachment (link only)');
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      console.error('❌ Resend API error:', emailError);
      throw emailError;
    }

    console.log('✅ Email sent successfully:', emailData);

    // Update quote status to sent
    await supabaseClient
      .from('quotes')
      .update({
        status: 'sent',
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteId);

    return new Response(
      JSON.stringify({
        success: true,
        message: pdfAttachmentSuccess ? 'Quote sent successfully with PDF attachment' : 'Quote sent successfully (link only, PDF attachment unavailable)',
        emailId: emailData.id,
        pdfAttached: pdfAttachmentSuccess,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in send-quote-resend function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send quote' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
