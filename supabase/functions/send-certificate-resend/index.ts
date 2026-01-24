/**
 * Send Certificate via Resend
 *
 * Sends EICR/EIC/Minor Works certificates via Resend email service.
 * No Gmail/Outlook connection required - uses company's Resend account.
 */

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface CertificateEmailRequest {
  reportId: string;
  recipientEmail?: string;
  customMessage?: string;
  testMode?: boolean;  // For sending test emails without full auth
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

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
    return 'N/A';
  }
}

// ============================================================================
// EMAIL HTML BUILDER
// ============================================================================

function buildCertificateEmailHtml(data: {
  certificateType: string;
  certificateNumber?: string;
  clientName?: string;
  installationAddress?: string;
  inspectionDate?: string;
  overallAssessment?: string;
  companyName?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyAddress?: string;
  companyLogo?: string;
  customMessage?: string;
}): string {
  const isPass = data.overallAssessment === 'satisfactory';
  const assessmentColor = isPass ? '#10b981' : '#ef4444';
  const assessmentText = isPass ? 'SATISFACTORY' : (data.overallAssessment?.toUpperCase() || '');

  const formattedDate = data.inspectionDate ? formatDate(data.inspectionDate) : '';

  const certificateTitles: Record<string, string> = {
    'EICR': 'Electrical Installation Condition Report',
    'EIC': 'Electrical Installation Certificate',
    'Minor Works': 'Minor Electrical Installation Works Certificate',
  };
  const certificateTitle = certificateTitles[data.certificateType] || 'Electrical Certificate';

  const firstName = data.clientName?.split(' ')[0] || 'there';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${data.certificateType} Certificate</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 540px;">

          <!-- Company Header -->
          <tr>
            <td style="padding-bottom: 32px; text-align: center;">
              ${data.companyLogo ? `
                <img src="${data.companyLogo}" alt="${data.companyName}" style="max-height: 56px; max-width: 180px; margin-bottom: 12px;" />
              ` : `
                <div style="font-size: 28px; margin-bottom: 8px;">⚡</div>
              `}
              <h1 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #0f172a;">
                ${data.companyName || 'Your Electrician'}
              </h1>
              ${data.companyPhone || data.companyEmail ? `
                <p style="margin: 0; font-size: 14px; color: #64748b;">
                  ${data.companyPhone ? data.companyPhone : ''}${data.companyPhone && data.companyEmail ? ' · ' : ''}${data.companyEmail ? data.companyEmail : ''}
                </p>
              ` : ''}
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td>
              <!-- Greeting -->
              <p style="margin: 0 0 24px 0; font-size: 17px; line-height: 1.6; color: #334155;">
                Hi ${firstName},
              </p>

              <p style="margin: 0 0 24px 0; font-size: 17px; line-height: 1.6; color: #334155;">
                Thank you for choosing us for your electrical work. We've attached your official certificate for the completed installation.
              </p>

              <!-- Certificate Summary -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px; background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 16px; border: 1px solid #fde047;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background-color: #fbbf24; color: #78350f; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                            ${data.certificateType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 12px;">
                          <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
                            ${certificateTitle}
                          </p>
                        </td>
                      </tr>
                      ${data.certificateNumber ? `
                      <tr>
                        <td style="padding-top: 8px;">
                          <p style="margin: 0; font-size: 13px; color: #64748b; font-family: 'SF Mono', Monaco, 'Courier New', monospace;">
                            Ref: ${data.certificateNumber}
                          </p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details Grid -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                ${data.installationAddress ? `
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Property</p>
                    <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.5;">${data.installationAddress}</p>
                  </td>
                </tr>
                ` : ''}
                ${formattedDate ? `
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Inspection Date</p>
                    <p style="margin: 0; font-size: 15px; color: #334155;">${formattedDate}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.overallAssessment ? `
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Result</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: ${assessmentColor};">
                      ${isPass ? '✓' : '✗'} ${assessmentText}
                    </p>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${data.customMessage ? `
              <!-- Custom Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 16px 20px; background-color: #f1f5f9; border-radius: 12px; border-left: 4px solid #fbbf24;">
                    <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6; font-style: italic;">
                      "${data.customMessage}"
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- PDF Attachment Notice -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 20px; background-color: #eff6ff; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 24px;">📎</p>
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #1e40af;">
                      Your certificate is attached
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #3b82f6;">
                      Download the PDF for your records
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p style="margin: 0 0 8px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                If you have any questions about your certificate or need any further electrical work, please don't hesitate to get in touch.
              </p>

              <p style="margin: 24px 0 0 0; font-size: 15px; color: #334155;">
                Many thanks,<br>
                <strong>${data.companyName || 'Your Electrician'}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #94a3b8;">
                      This certificate complies with BS 7671:2018+A3:2024
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 10px 20px; background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 8px; border: 1px solid #fde047;">
                          <a href="https://elec-mate.com" style="text-decoration: none;">
                            <span style="font-size: 16px; vertical-align: middle;">⚡</span>
                            <span style="font-size: 13px; font-weight: 600; color: #78350f; vertical-align: middle; margin-left: 4px;">Powered by Elec-Mate</span>
                          </a>
                        </td>
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
  </table>

</body>
</html>
  `.trim();
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('📧 Send Certificate via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight
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
    // STEP 1.5: Check for test mode
    // ========================================================================
    let body: any;
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }

    if (body.testMode && body.recipientEmail) {
      console.log('🧪 TEST MODE - Sending sample certificate email');

      const testEmailHtml = buildCertificateEmailHtml({
        certificateType: 'EICR',
        certificateNumber: 'EICR-2026-001234',
        clientName: 'Sarah Thompson',
        installationAddress: '47 Riverside Gardens, Putney, London, SW15 2JQ',
        inspectionDate: new Date().toISOString(),
        overallAssessment: 'satisfactory',
        companyName: 'Spark & Sons Electrical',
        companyPhone: '020 7123 4567',
        companyEmail: 'info@sparkandsons.co.uk',
        customMessage: undefined,
      });

      const { data: testEmailData, error: testEmailError } = await resend.emails.send({
        from: 'Spark & Sons Electrical <founder@elec-mate.com>',
        reply_to: 'info@elec-mate.com',
        to: [body.recipientEmail],
        subject: 'Your EICR Certificate - 47 Riverside Gardens',
        html: testEmailHtml,
      });

      if (testEmailError) {
        throw new Error(`Test email failed: ${testEmailError.message}`);
      }

      console.log('✅ Test email sent:', testEmailData?.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Test certificate email sent successfully',
          emailId: testEmailData?.id,
          testMode: true,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ========================================================================
    // STEP 2: Authenticate user
    // ========================================================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('❌ No Authorization header found');
      throw new Error('Please log in to send certificates.');
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

    // ========================================================================
    // STEP 3: Parse and validate request
    // ========================================================================
    const reportId = body.reportId;
    const recipientEmail = body.recipientEmail;
    const customMessage = body.customMessage;

    if (!reportId || typeof reportId !== 'string') {
      throw new Error('Report ID is required.');
    }

    console.log('📄 Processing report:', reportId);

    // ========================================================================
    // STEP 4: Fetch report from database
    // Try by 'id' first (UUID primary key), then by 'report_id' (certificate number)
    // ========================================================================
    let report: any = null;

    // First try: Query by 'id' (UUID)
    const { data: reportById, error: errorById } = await supabaseClient
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .eq('user_id', user.id)
      .single();

    if (reportById) {
      report = reportById;
      console.log('✅ Found report by id (UUID)');
    } else {
      // Second try: Query by 'report_id' (certificate number like MW-2024-001234)
      console.log('⏳ Not found by id, trying report_id...');
      const { data: reportByReportId, error: errorByReportId } = await supabaseClient
        .from('reports')
        .select('*')
        .eq('report_id', reportId)
        .eq('user_id', user.id)
        .single();

      if (reportByReportId) {
        report = reportByReportId;
        console.log('✅ Found report by report_id');
      } else {
        console.error('❌ Report not found by either id or report_id:', errorById, errorByReportId);
        throw new Error('Could not find this report. It may have been deleted or you may need to save it first.');
      }
    }

    const certificateNumber = report.certificate_number || report.report_id || `CERT-${reportId.substring(0, 8)}`;
    console.log(`✅ Report fetched: ${certificateNumber}`);

    // ========================================================================
    // STEP 5: Determine recipient email
    // ========================================================================
    const reportData = report.data || {};
    const clientEmail = recipientEmail || reportData.clientEmail;

    if (!isValidEmail(clientEmail)) {
      console.error('❌ Invalid client email:', clientEmail);
      throw new Error(`Invalid client email address: "${clientEmail || 'missing'}". Please update the report with a valid email.`);
    }

    console.log(`✅ Recipient: ${report.client_name || 'Client'} <${clientEmail}>`);

    // ========================================================================
    // STEP 6: Fetch company profile
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Electrical Services';
    console.log(`✅ Company: ${companyName}`);

    // ========================================================================
    // STEP 7: Determine report type and generate PDF
    // ========================================================================
    const reportType = (report.report_type || '').toLowerCase().replace(/\s+/g, '-');
    let edgeFunctionName = '';

    if (reportType === 'eic') {
      edgeFunctionName = 'generate-eic-pdf';
    } else if (reportType === 'eicr') {
      edgeFunctionName = 'generate-eicr-pdf';
    } else if (reportType === 'minor-works' || reportType === 'minor works') {
      edgeFunctionName = 'generate-minor-works-pdf';
    } else {
      console.error('❌ Unsupported report type:', reportType);
      throw new Error(`Unsupported certificate type: "${report.report_type}"`);
    }

    console.log(`📄 Generating ${reportType.toUpperCase()} PDF via ${edgeFunctionName}...`);

    let pdfUrl = report.pdf_url;
    let pdfBase64: string | null = null;
    let pdfAttachmentSuccess = false;

    // Try to use cached PDF first, or regenerate
    const pdfGeneratedAt = report.pdf_generated_at ? new Date(report.pdf_generated_at) : null;
    const dataUpdatedAt = new Date(report.updated_at);
    const isPdfStale = pdfGeneratedAt && dataUpdatedAt > pdfGeneratedAt;

    if (!pdfUrl || isPdfStale) {
      console.log('🔄 Generating fresh PDF...');
      try {
        const pdfResponse = await fetch(
          `${supabaseUrl}/functions/v1/${edgeFunctionName}`,
          {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formData: report.data,
              reportId: report.report_id,
            }),
          }
        );

        if (pdfResponse.ok) {
          const pdfData = await pdfResponse.json();
          if (pdfData.success && pdfData.pdfUrl) {
            pdfUrl = pdfData.pdfUrl;

            // Update report with new PDF URL (use report.id which is the actual UUID)
            await supabaseClient
              .from('reports')
              .update({
                pdf_url: pdfUrl,
                pdf_generated_at: new Date().toISOString(),
              })
              .eq('id', report.id);

            console.log('✅ PDF generated successfully');
          } else {
            console.warn('⚠️ PDF generation returned no URL:', pdfData);
          }
        } else {
          console.warn('⚠️ PDF generation request failed:', pdfResponse.status);
        }
      } catch (pdfGenError) {
        console.warn('⚠️ PDF generation error (non-fatal):', pdfGenError);
      }
    }

    // Download PDF for attachment
    if (pdfUrl) {
      try {
        console.log('📥 Downloading PDF for attachment...');
        const pdfFileResponse = await fetch(pdfUrl);
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
          pdfAttachmentSuccess = true;
          console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);
        }
      } catch (pdfDownloadError) {
        console.warn('⚠️ PDF download error (non-fatal):', pdfDownloadError);
      }
    }

    // ========================================================================
    // STEP 8: Build email HTML
    // ========================================================================
    const certificateTypeDisplay = reportType === 'minor-works' ? 'Minor Works' : reportType.toUpperCase();

    const emailHtml = buildCertificateEmailHtml({
      certificateType: certificateTypeDisplay,
      certificateNumber: report.certificate_number,
      clientName: report.client_name || reportData.clientName,
      installationAddress: report.installation_address || reportData.installationAddress,
      inspectionDate: report.inspection_date || reportData.inspectionDate,
      overallAssessment: reportData.overallAssessment,
      companyName: companyName,
      companyPhone: companyProfile?.company_phone,
      companyEmail: companyProfile?.company_email,
      companyLogo: companyProfile?.logo_url,
      customMessage: customMessage,
    });

    // ========================================================================
    // STEP 9: Send email via Resend
    // ========================================================================
    const replyToEmail = companyProfile?.company_email || 'info@elec-mate.com';
    const subject = `Your ${certificateTypeDisplay} Certificate - ${report.installation_address || report.certificate_number}`;

    console.log(`📧 Sending to: ${clientEmail}`);
    console.log(`📧 Reply-to: ${replyToEmail}`);

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
      const filename = `${certificateTypeDisplay.replace(/\s+/g, '-')}_${certificateNumber}.pdf`;
      emailOptions.attachments = [{
        filename: filename,
        content: pdfBase64,
      }];
      console.log('📎 PDF attached:', filename);
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      console.error('❌ Resend API error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent:', emailData?.id);

    const duration = Date.now() - startTime;
    console.log(`✅ Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: pdfAttachmentSuccess ? 'Certificate sent with PDF attachment' : 'Certificate sent (link only)',
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
        error: error.message || 'Failed to send certificate',
        hint: 'Check that the report has a valid client email address.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
