/**
 * Send Certificate via Resend
 *
 * Sends EICR/EIC/Minor Works certificates via Resend email service.
 * No Gmail/Outlook connection required - uses company's Resend account.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildCertificateSendEmail } from '../_shared/email-templates/certificate-send.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface CertificateEmailRequest {
  reportId: string;
  recipientEmail?: string;
  customMessage?: string;
  testMode?: boolean; // For sending test emails without full auth
  cc?: string[]; // Optional carbon-copy recipients (e.g. the installer's own address)
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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
  console.log('📧 Send Certificate via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight
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
      console.error('RESEND_API_KEY not configured');
      throw new Error('Email service not configured. Please contact support.');
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables missing');
      throw new Error('Database service not configured. Please contact support.');
    }

    const resend = new Resend(resendApiKey);
    console.log('Environment validated');

    // ========================================================================
    // STEP 1.5: Check for test mode
    // ========================================================================
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }

    if (body.testMode && body.recipientEmail) {
      console.log('🧪 TEST MODE - Sending sample certificate email');

      const testPayload = buildCertificateSendEmail({
        company: {
          name: 'Spark & Sons Electrical',
          phone: '020 7123 4567',
          email: 'info@sparkandsons.co.uk',
        },
        clientName: 'Sarah Thompson',
        certificateType: 'EICR',
        certificateNumber: 'EICR-2026-001234',
        installationAddress: '47 Riverside Gardens, Putney, London, SW15 2JQ',
        inspectionDate: new Date().toISOString(),
        overallAssessment: 'Satisfactory',
        pdfAttached: false,
      });
      const testEmailHtml = testPayload.html;

      const testSender = clientFacingSender({
        companyName: 'Spark & Sons Electrical',
        companyEmail: 'info@sparkandsons.co.uk',
      });
      const { data: testEmailData, error: testEmailError } = await resend.emails.send({
        ...testSender,
        to: [String(body.recipientEmail)],
        subject: 'Your EICR Certificate - 47 Riverside Gardens',
        html: testEmailHtml,
        text: htmlToPlainText(testEmailHtml),
      });

      if (testEmailError) {
        throw new Error(`Test email failed: ${testEmailError.message}`);
      }

      console.log('Test email sent:', testEmailData?.id);

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
      console.error('No Authorization header found');
      throw new Error('Please log in to send certificates.');
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
      console.error('User authentication error:', userError);
      throw new Error('Session expired. Please log in again.');
    }

    console.log('User authenticated:', user.id);

    // ========================================================================
    // STEP 3: Parse and validate request
    // ========================================================================
    const reportId = body.reportId;
    const recipientEmail = body.recipientEmail;
    const customMessage = body.customMessage;
    const formattedDataFromClient = body.formattedData;

    if (!reportId || typeof reportId !== 'string') {
      throw new Error('Report ID is required.');
    }

    console.log('Processing report:', reportId);

    // ========================================================================
    // STEP 4: Fetch report from database
    // Try by 'id' first (UUID primary key), then by 'report_id' (certificate number)
    // ========================================================================
    let report: Record<string, unknown> | null = null;

    // First try: Query by 'id' (UUID)
    const { data: reportById, error: errorById } = await supabaseClient
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .eq('user_id', user.id)
      .single();

    if (reportById) {
      report = reportById;
      console.log('Found report by id (UUID)');
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
        console.log('Found report by report_id');
      } else {
        console.error('Report not found by either id or report_id:', errorById, errorByReportId);
        throw new Error(
          'Could not find this report. It may have been deleted or you may need to save it first.'
        );
      }
    }

    const certificateNumber =
      report.certificate_number || report.report_id || `CERT-${reportId.substring(0, 8)}`;
    console.log(`Report fetched: ${certificateNumber}`);

    // ========================================================================
    // QS issue gate — when the owner's company requires Qualifying Supervisor
    // approval, an unapproved (or edited-since-approval) certificate must not
    // be emailed out. Same rule the DB trigger enforces on PDF issue.
    // ========================================================================
    const { data: qsBlocked } = await supabaseClient.rpc('is_qs_issue_blocked', {
      p_report_uuid: report.id,
    });
    if (qsBlocked === true) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'This certificate requires Qualifying Supervisor approval before it can be sent. Submit it for QS review first.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ========================================================================
    // STEP 5: Determine recipient email
    // ========================================================================
    const reportData = report.pdf_payload || report.form_data || report.data || {};
    const clientEmail = recipientEmail || reportData.clientEmail || reportData.client_email;

    if (!isValidEmail(clientEmail)) {
      console.error('Invalid client email:', clientEmail);
      throw new Error(
        `Invalid client email address: "${clientEmail || 'missing'}". Please update the report with a valid email.`
      );
    }

    console.log(`Recipient: ${report.client_name || 'Client'} <${clientEmail}>`);

    // ========================================================================
    // STEP 6: Fetch company profile
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Electrical Services';
    console.log(`Company: ${companyName}`);

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
    } else if (reportType === 'ev-charging' || reportType === 'ev charging') {
      edgeFunctionName = 'generate-ev-charging-pdf';
    } else if (reportType === 'pat-testing' || reportType === 'pat testing') {
      edgeFunctionName = 'generate-pat-testing-pdf';
    } else if (reportType === 'fire-alarm' || reportType === 'fire alarm') {
      edgeFunctionName = 'generate-fire-alarm-pdf';
    } else if (reportType === 'emergency-lighting' || reportType === 'emergency lighting') {
      edgeFunctionName = 'generate-emergency-lighting-pdf';
    } else if (reportType === 'solar-pv' || reportType === 'solar pv') {
      edgeFunctionName = 'generate-solar-pv-pdf';
    } else {
      console.error('Unsupported report type:', reportType);
      throw new Error(`Unsupported certificate type: "${report.report_type}"`);
    }

    console.log(`Generating ${reportType.toUpperCase()} PDF via ${edgeFunctionName}...`);

    let pdfUrl = report.pdf_url;
    let pdfBase64: string | null = null;
    let pdfAttachmentSuccess = false;

    // Try to use cached PDF first, or regenerate
    const pdfGeneratedAt = report.pdf_generated_at ? new Date(report.pdf_generated_at) : null;
    const dataUpdatedAt = new Date(report.updated_at);
    const isPdfStale = pdfGeneratedAt && dataUpdatedAt > pdfGeneratedAt;

    // Only regenerate if we have form data to work with
    const availableFormData = formattedDataFromClient || report.pdf_payload || report.form_data;

    if ((!pdfUrl || isPdfStale) && availableFormData) {
      console.log('🔄 Generating fresh PDF...');
      try {
        const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/${edgeFunctionName}`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: availableFormData,
            reportId: report.report_id,
          }),
        });

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

            console.log('PDF generated successfully');
          } else {
            console.warn('PDF generation returned no URL:', pdfData);
          }
        } else {
          console.warn('PDF generation request failed:', pdfResponse.status);
        }
      } catch (pdfGenError) {
        console.warn('PDF generation error (non-fatal):', pdfGenError);
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
          console.log(`PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);
        }
      } catch (pdfDownloadError) {
        console.warn('PDF download error (non-fatal):', pdfDownloadError);
      }
    }

    // ========================================================================
    // STEP 8: Build email HTML
    // ========================================================================
    const certificateTypeDisplay =
      reportType === 'minor-works'
        ? 'Minor Works'
        : reportType === 'ev-charging'
          ? 'EV Charging'
          : reportType === 'pat-testing'
            ? 'PAT Testing'
            : reportType === 'fire-alarm'
              ? 'Fire Alarm'
              : reportType === 'emergency-lighting'
                ? 'Emergency Lighting'
                : reportType === 'solar-pv'
                  ? 'Solar PV'
                  : reportType.toUpperCase();

    const rawAssessment =
      reportData.overallAssessment || reportData.overall_assessment || report.overall_assessment;
    const assessmentDisplay = rawAssessment
      ? String(rawAssessment).charAt(0).toUpperCase() + String(rawAssessment).slice(1).toLowerCase()
      : null;

    const certEmailPayload = buildCertificateSendEmail({
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
      clientName: report.client_name || reportData.clientName || reportData.client_name || '',
      certificateType: certificateTypeDisplay,
      certificateNumber: report.certificate_number || '',
      installationAddress:
        report.installation_address ||
        reportData.installationAddress ||
        reportData.installation_address ||
        null,
      inspectionDate:
        report.inspection_date || reportData.inspectionDate || reportData.inspection_date || null,
      overallAssessment: assessmentDisplay,
      nextInspectionDue:
        reportData.nextInspectionDate ||
        reportData.next_inspection_date ||
        report.next_inspection_date ||
        null,
      pdfUrl: pdfUrl || null,
      pdfAttached: pdfAttachmentSuccess,
      customMessage: customMessage || null,
      trackingPixelUrl: `${supabaseUrl}/functions/v1/email-open?type=cert_send&id=${report.id}`,
    });
    const emailHtml = certEmailPayload.html;

    // ========================================================================
    // STEP 9: Send email via Resend
    // ========================================================================
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail: user.email,
    });
    const addressOrRef = String(report.installation_address || report.certificate_number || '')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    const subject = `Your ${certificateTypeDisplay} Certificate - ${addressOrRef}`.trim();

    console.log(`📧 Sending to: ${clientEmail}`);
    console.log(`📧 From: ${sender.from}`);
    console.log(`📧 Reply-to: ${sender.replyTo || '(none — no company_email or auth email)'}`);

    // CC — sanitise the optional carbon-copy list from the client (valid emails only)
    const ccList = Array.isArray(body.cc)
      ? body.cc
          .map((e) => String(e).trim())
          .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      : [];
    if (ccList.length > 0) console.log(`📧 CC: ${ccList.join(', ')}`);

    const emailOptions: {
      from: string;
      replyTo?: string;
      to: string[];
      cc?: string[];
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

    if (ccList.length > 0) {
      emailOptions.cc = ccList;
    }

    if (pdfAttachmentSuccess && pdfBase64) {
      const filename = `${certificateTypeDisplay.replace(/\s+/g, '-')}_${certificateNumber}.pdf`;
      emailOptions.attachments = [
        {
          filename: filename,
          content: pdfBase64,
        },
      ];
      console.log('PDF attached:', filename);
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      console.error('Resend API error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message || 'Unknown error'}`);
    }

    console.log('Email sent:', emailData?.id);

    const duration = Date.now() - startTime;
    console.log(`Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: pdfAttachmentSuccess
          ? 'Certificate sent with PDF attachment'
          : 'Certificate sent (link only)',
        emailId: emailData?.id,
        pdfAttached: pdfAttachmentSuccess,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'send-certificate-resend',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { duration, hasResendKey: !!Deno.env.get('RESEND_API_KEY') },
    });

    return new Response(
      JSON.stringify({
        error: (error as Error).message || 'Failed to send certificate',
        hint: 'Check that the report has a valid client email address.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
