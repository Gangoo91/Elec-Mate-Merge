/**
 * Send Certificate Email
 *
 * Sends EICR/EIC certificates via user's connected email account (Gmail/Outlook).
 * Generates PDF, builds beautiful HTML email, and sends with attachment.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { encode as encodeBase64 } from 'https://deno.land/std@0.168.0/encoding/base64.ts';
import { captureException } from '../_shared/sentry.ts';

const DAILY_RATE_LIMIT = 100;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      certificateType,
      reportId,
      recipientEmail,
      cc,
      customMessage,
      certificateData
    } = await req.json();

    // Validate required fields
    if (!certificateType || !['EICR', 'EIC'].includes(certificateType)) {
      throw new ValidationError('certificateType must be "EICR" or "EIC"');
    }

    if (!reportId) {
      throw new ValidationError('reportId is required');
    }

    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      throw new ValidationError('Valid recipientEmail is required');
    }

    console.log(`📧 Certificate email request - Type: ${certificateType}, Report: ${reportId}`);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Get active email config
    const { data: configs, error: configError } = await supabase
      .from('user_email_configs')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (configError || !configs || configs.length === 0) {
      throw new ValidationError('No email account connected. Please connect Gmail or Outlook in Settings.');
    }

    const config = configs[0];

    // Check daily rate limit
    const { data: emailUsage } = await supabase
      .from('email_usage_logs')
      .select('id')
      .eq('user_id', user.id)
      .gte('sent_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (emailUsage && emailUsage.length >= DAILY_RATE_LIMIT) {
      throw new ValidationError(`Daily email limit reached (${DAILY_RATE_LIMIT}/day). Try again tomorrow.`);
    }

    // Get company profile for branding
    const { data: company } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get report data
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('*')
      .eq('report_id', reportId)
      .eq('user_id', user.id)
      .single();

    if (reportError || !report) {
      throw new ValidationError('Report not found');
    }

    // Generate PDF via existing edge function
    console.log('📄 Generating certificate PDF...');

    const pdfFunctionName = certificateType === 'EICR' ? 'generate-eicr-pdf' : 'generate-eic-pdf';
    const pdfResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/${pdfFunctionName}`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: report.form_data,
        reportId: reportId
      })
    });

    const pdfData = await pdfResponse.json();

    if (!pdfData?.success || !pdfData?.pdfUrl) {
      console.error('PDF generation failed:', pdfData);
      throw new ExternalAPIError('PDF Generator', pdfData?.error || 'Failed to generate PDF');
    }

    console.log('✅ PDF generated successfully');

    // Download PDF as binary for attachment
    const pdfFileResponse = await fetch(pdfData.pdfUrl);
    if (!pdfFileResponse.ok) {
      throw new ExternalAPIError('PDF Download', 'Failed to download generated PDF');
    }

    const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
    const pdfBase64 = encodeBase64(new Uint8Array(pdfArrayBuffer));

    // Generate filename
    const filename = `${certificateType}-${certificateData?.certificateNumber || reportId}-${new Date().toISOString().split('T')[0]}.pdf`;

    // Build email HTML
    const emailHtml = buildCertificateEmailHtml({
      certificateType,
      certificateNumber: certificateData?.certificateNumber,
      clientName: certificateData?.clientName,
      installationAddress: certificateData?.installationAddress,
      inspectionDate: certificateData?.inspectionDate,
      overallAssessment: certificateData?.overallAssessment,
      companyName: company?.company_name || certificateData?.companyName,
      companyPhone: company?.phone,
      companyEmail: company?.email,
      customMessage
    });

    // Build email subject
    const subject = `${certificateType} Certificate - ${certificateData?.installationAddress || 'Electrical Installation'}`;

    // Send email based on provider
    console.log(`📤 Sending email via ${config.provider}...`);

    let sendResult;
    if (config.provider === 'gmail') {
      sendResult = await sendViaGmail(
        config,
        recipientEmail,
        cc,
        subject,
        emailHtml,
        pdfBase64,
        filename
      );
    } else if (config.provider === 'outlook') {
      sendResult = await sendViaOutlook(
        config,
        recipientEmail,
        cc,
        subject,
        emailHtml,
        pdfBase64,
        filename
      );
    } else {
      throw new ValidationError(`Unsupported email provider: ${config.provider}`);
    }

    // Log email usage
    await supabase.from('email_usage_logs').insert({
      user_id: user.id,
      email_type: 'certificate',
      recipient: recipientEmail,
      document_type: certificateType,
      document_id: reportId,
      sent_at: new Date().toISOString()
    });

    console.log('✅ Email sent successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Certificate sent successfully',
        recipient: recipientEmail
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error:', error);
    await captureException(error, {
      functionName: 'send-certificate-email',
      requestUrl: req.url,
      requestMethod: req.method
    });
    return handleError(error);
  }
});

/**
 * Build beautiful HTML email for certificate
 */
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
  customMessage?: string;
}): string {
  const assessmentColor = data.overallAssessment === 'satisfactory' ? '#22c55e' : '#ef4444';
  const assessmentBgColor = data.overallAssessment === 'satisfactory' ? '#22c55e20' : '#ef444420';
  const assessmentText = data.overallAssessment?.toUpperCase() || 'PENDING';

  const formattedDate = data.inspectionDate
    ? new Date(data.inspectionDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';

  const certificateTitle = data.certificateType === 'EICR'
    ? 'Electrical Installation Condition Report'
    : 'Electrical Installation Certificate';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.certificateType} Certificate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #1a1a1a; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1a1a1a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #262626; border-radius: 16px; overflow: hidden; border: 1px solid #333;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 24px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="width: 48px; height: 48px; background-color: rgba(0,0,0,0.2); border-radius: 12px; display: inline-block; line-height: 48px; margin-bottom: 12px;">
                      <span style="font-size: 24px;">⚡</span>
                    </div>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #000000;">
                      ${data.companyName || 'Electrical Services'}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Certificate Card -->
          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <!-- Badge & Number -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background-color: #f59e0b20; color: #f59e0b; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid #f59e0b40;">
                            ${data.certificateType}
                          </span>
                          ${data.certificateNumber ? `<span style="margin-left: 8px; font-size: 12px; color: #888; font-family: monospace;">${data.certificateNumber}</span>` : ''}
                        </td>
                      </tr>
                    </table>

                    <!-- Title -->
                    <h2 style="margin: 16px 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                      ${certificateTitle}
                    </h2>

                    <!-- Details -->
                    ${data.installationAddress ? `
                    <p style="margin: 8px 0; font-size: 14px; color: #ccc;">
                      <span style="color: #888;">📍</span> ${data.installationAddress}
                    </p>
                    ` : ''}

                    ${formattedDate ? `
                    <p style="margin: 8px 0; font-size: 13px; color: #888;">
                      <span>📅</span> ${formattedDate}
                    </p>
                    ` : ''}

                    <!-- Assessment Badge -->
                    ${data.overallAssessment ? `
                    <div style="margin-top: 16px; padding: 12px 16px; background-color: ${assessmentBgColor}; border-radius: 8px; display: inline-block;">
                      <span style="font-size: 14px; font-weight: 600; color: ${assessmentColor};">
                        ${data.overallAssessment === 'satisfactory' ? '✓' : '✗'} ${assessmentText}
                      </span>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #ccc; line-height: 1.6;">
                Dear ${data.clientName || 'Customer'},
              </p>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #ccc; line-height: 1.6;">
                Please find attached your ${certificateTitle.toLowerCase()} for the above property.
              </p>

              ${data.customMessage ? `
              <div style="margin: 16px 0; padding: 12px 16px; background-color: #333; border-radius: 8px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #fff; font-style: italic;">
                  "${data.customMessage}"
                </p>
              </div>
              ` : ''}

              <!-- Attachment Notice -->
              <div style="margin: 20px 0; padding: 12px 16px; background-color: #3b82f620; border: 1px solid #3b82f640; border-radius: 8px;">
                <p style="margin: 0; font-size: 13px; color: #60a5fa;">
                  📎 PDF Certificate Attached
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; background-color: #1f1f1f; border-top: 1px solid #333;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888;">
                BS 7671:2018 Compliant Certificate
              </p>
              ${data.companyPhone ? `
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #888;">
                📞 ${data.companyPhone}
              </p>
              ` : ''}
              ${data.companyEmail ? `
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #888;">
                ✉️ ${data.companyEmail}
              </p>
              ` : ''}
              <p style="margin: 12px 0 0 0; font-size: 11px; color: #666;">
                Powered by Elec-Mate
              </p>
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

/**
 * Send email via Gmail API
 */
async function sendViaGmail(
  config: any,
  to: string,
  cc: string[] | undefined,
  subject: string,
  htmlBody: string,
  attachmentBase64: string,
  attachmentFilename: string
): Promise<boolean> {
  // Decrypt access token
  const accessToken = await decryptToken(config.access_token_encrypted);

  // Build MIME message
  const boundary = `boundary_${Date.now()}`;
  const mimeMessage = [
    `From: ${config.email_address}`,
    `To: ${to}`,
    cc && cc.length > 0 ? `Cc: ${cc.join(', ')}` : '',
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlBody,
    '',
    `--${boundary}`,
    `Content-Type: application/pdf; name="${attachmentFilename}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${attachmentFilename}"`,
    '',
    attachmentBase64,
    '',
    `--${boundary}--`
  ].filter(Boolean).join('\r\n');

  const rawMessage = encodeBase64(new TextEncoder().encode(mimeMessage));

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: rawMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Gmail API error:', error);
    throw new ExternalAPIError('Gmail', `Failed to send email: ${response.status}`);
  }

  return true;
}

/**
 * Send email via Microsoft Graph API (Outlook)
 */
async function sendViaOutlook(
  config: any,
  to: string,
  cc: string[] | undefined,
  subject: string,
  htmlBody: string,
  attachmentBase64: string,
  attachmentFilename: string
): Promise<boolean> {
  // Decrypt access token
  const accessToken = await decryptToken(config.access_token_encrypted);

  const messagePayload: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlBody
      },
      toRecipients: [{ emailAddress: { address: to } }],
      attachments: [
        {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: attachmentFilename,
          contentType: 'application/pdf',
          contentBytes: attachmentBase64
        }
      ]
    },
    saveToSentItems: true
  };

  if (cc && cc.length > 0) {
    messagePayload.message.ccRecipients = cc.map(email => ({
      emailAddress: { address: email }
    }));
  }

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Microsoft Graph API error:', error);
    throw new ExternalAPIError('Outlook', `Failed to send email: ${response.status}`);
  }

  return true;
}
