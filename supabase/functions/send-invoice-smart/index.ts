/**
 * Send Invoice Smart
 * Sends invoices using user's connected email account (Gmail/Outlook)
 * Includes rate limiting, token refresh, retry logic
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, RateLimitError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const DAILY_RATE_LIMIT = 100;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentType, quoteId, invoiceId, to, subject, body, attachmentBase64, attachmentFilename } = await req.json();

    // Validate document type (optional - defaults to 'invoice')
    const type = documentType || 'invoice';
    
    if (type !== 'quote' && type !== 'invoice') {
      throw new ValidationError('documentType must be "quote" or "invoice"');
    }

    // Validate we have either quote or invoice ID if no manual email details provided
    if (!to && !quoteId && !invoiceId) {
      throw new ValidationError('Either documentId or manual email details required');
    }

    if (!isValidEmail(to)) {
      throw new ValidationError('Invalid email address');
    }

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

    // If document ID provided, fetch document data and generate email
    let emailTo = to;
    let emailSubject = subject;
    let emailBody = body;
    let pdfAttachment = attachmentBase64;
    let pdfFilename = attachmentFilename;

    if (quoteId || invoiceId) {
      const docId = quoteId || invoiceId;
      const docType = quoteId ? 'quote' : 'invoice';
      
      // Fetch document data
      const { data: doc, error: docError } = await supabase
        .from(docType === 'quote' ? 'quotes' : 'quotes')
        .select('*')
        .eq('id', docId)
        .eq('user_id', user.id)
        .single();

      if (docError || !doc) {
        throw new ValidationError(`${docType} not found`);
      }

      // Fetch company profile
      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Parse client data
      const clientData = typeof doc.client_data === 'string' 
        ? JSON.parse(doc.client_data) 
        : doc.client_data;
      
      const jobDetails = doc.job_details 
        ? (typeof doc.job_details === 'string' ? JSON.parse(doc.job_details) : doc.job_details)
        : {};

      // Set recipient
      emailTo = clientData?.email;
      if (!emailTo) {
        throw new ValidationError('Client email not found in document');
      }

      // Generate subject and body based on document type
      const companyName = company?.company_name || 'ElecMate Professional';
      const companyPhone = company?.company_phone || '';
      const companyEmail = company?.company_email || config.email_address;
      
      if (docType === 'quote') {
        const validityDate = doc.expiry_date 
          ? new Date(doc.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        emailSubject = `Quote ${doc.quote_number} from ${companyName}`;
        emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #fbbf24; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; color: #1f2937; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .detail-row:last-child { border-bottom: none; }
              .detail-label { font-weight: 600; color: #6b7280; }
              .detail-value { color: #1f2937; }
              .cta-button { background: #fbbf24; color: #1f2937; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📋 Quote ${doc.quote_number}</h1>
              </div>
              <div class="content">
                <p>Dear ${clientData?.name || 'Valued Client'},</p>
                <p>Thank you for your enquiry. Please find your quotation for <strong>${jobDetails?.title || 'electrical work'}</strong>.</p>
                
                <div class="details">
                  <div class="detail-row">
                    <span class="detail-label">Quote Number:</span>
                    <span class="detail-value">${doc.quote_number}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Total Amount:</span>
                    <span class="detail-value">£${(doc.total || 0).toFixed(2)}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Valid Until:</span>
                    <span class="detail-value">${validityDate}</span>
                  </div>
                </div>

                <p>The detailed quote is attached as a PDF. If you have any questions or would like to proceed, please don't hesitate to contact us.</p>

                <p style="margin-top: 30px;">Best regards,<br>
                <strong>${companyName}</strong><br>
                ${companyPhone ? `📞 ${companyPhone}<br>` : ''}
                ${companyEmail ? `✉️ ${companyEmail}` : ''}</p>

                <div class="footer">
                  <p>⚡ Powered by ElecMate Professional Suite</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;
      } else {
        emailSubject = `Invoice ${doc.invoice_number || doc.quote_number} from ${companyName}`;
        emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #fbbf24; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; color: #1f2937; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .detail-row:last-child { border-bottom: none; }
              .detail-label { font-weight: 600; color: #6b7280; }
              .detail-value { color: #1f2937; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>💷 Invoice ${doc.invoice_number || doc.quote_number}</h1>
              </div>
              <div class="content">
                <p>Dear ${clientData?.name || 'Valued Client'},</p>
                <p>Please find attached your invoice for work completed.</p>
                
                <div class="details">
                  <div class="detail-row">
                    <span class="detail-label">Invoice Number:</span>
                    <span class="detail-value">${doc.invoice_number || doc.quote_number}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Total Amount:</span>
                    <span class="detail-value">£${(doc.total || 0).toFixed(2)}</span>
                  </div>
                  ${doc.invoice_due_date ? `
                  <div class="detail-row">
                    <span class="detail-label">Due Date:</span>
                    <span class="detail-value">${new Date(doc.invoice_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  ` : ''}
                </div>

                <p>Payment details and terms are included in the attached invoice. Please contact us if you have any questions.</p>

                <p style="margin-top: 30px;">Best regards,<br>
                <strong>${companyName}</strong><br>
                ${companyPhone ? `📞 ${companyPhone}<br>` : ''}
                ${companyEmail ? `✉️ ${companyEmail}` : ''}</p>

                <div class="footer">
                  <p>⚡ Powered by ElecMate Professional Suite</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;
      }

      // Note: PDF generation would happen in the frontend before calling this function
      // or we could integrate generate-pdf-monkey here if needed
    }

    if (!emailTo || !emailSubject || !emailBody) {
      throw new ValidationError('Email details incomplete');
    }

    if (!isValidEmail(emailTo)) {
      throw new ValidationError('Invalid email address');
    }

    // Check rate limit
    const now = new Date();
    const resetAt = new Date(config.rate_limit_reset_at || now);

    if (now >= resetAt) {
      // Reset daily counter
      await supabase
        .from('user_email_configs')
        .update({
          daily_sent_count: 0,
          rate_limit_reset_at: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
        })
        .eq('id', config.id);
      
      config.daily_sent_count = 0;
    }

    if (config.daily_sent_count >= DAILY_RATE_LIMIT) {
      throw new RateLimitError(`Daily email limit reached (${DAILY_RATE_LIMIT}/day). Resets at midnight UTC.`);
    }

    // Check if token needs refresh (within 5 minutes of expiry)
    const tokenExpiresAt = new Date(config.token_expires_at);
    const needsRefresh = tokenExpiresAt.getTime() - Date.now() < 5 * 60 * 1000;

    if (needsRefresh) {
      console.log('🔄 Token expiring soon, refreshing...');
      
      const refreshResponse = await supabase.functions.invoke('refresh-email-token', {
        body: { configId: config.id },
      });

      if (refreshResponse.error) {
        throw new ValidationError('Failed to refresh token. Please reconnect your email account.');
      }

      // Refetch updated config
      const { data: updatedConfig } = await supabase
        .from('user_email_configs')
        .select('*')
        .eq('id', config.id)
        .single();

      if (updatedConfig) {
        config.encrypted_access_token = updatedConfig.encrypted_access_token;
      }
    }

    // Decrypt access token
    const accessToken = await decryptToken(config.encrypted_access_token!);

    // Send email based on provider
    if (config.email_provider === 'gmail') {
      await withRetry(
        () => withTimeout(
          sendGmailEmail(accessToken, emailTo, emailSubject, emailBody, pdfAttachment, pdfFilename),
          Timeouts.STANDARD,
          'Gmail send'
        ),
        RetryPresets.STANDARD
      );
    } else {
      await withRetry(
        () => withTimeout(
          sendOutlookEmail(accessToken, emailTo, emailSubject, emailBody, pdfAttachment, pdfFilename),
          Timeouts.STANDARD,
          'Outlook send'
        ),
        RetryPresets.STANDARD
      );
    }

    // Update counters
    await supabase
      .from('user_email_configs')
      .update({
        daily_sent_count: (config.daily_sent_count || 0) + 1,
        total_sent_count: (config.total_sent_count || 0) + 1,
        last_sent_at: new Date().toISOString(),
      })
      .eq('id', config.id);

    console.log(`✅ Email sent successfully`, {
      user_id: user.id,
      provider: config.email_provider,
      type: type,
      to: emailTo,
      count: config.daily_sent_count + 1,
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        dailyCount: config.daily_sent_count + 1,
        dailyLimit: DAILY_RATE_LIMIT,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function sendGmailEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const email = createRFC822Email(to, subject, body, attachmentBase64, attachmentFilename);
  const base64Email = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64Email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Gmail', error);
  }

  return await response.json();
}

async function sendOutlookEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const message: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: body,
      },
      toRecipients: [{ emailAddress: { address: to } }],
    },
  };

  if (attachmentBase64 && attachmentFilename) {
    message.message.attachments = [{
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachmentFilename,
      contentBytes: attachmentBase64,
    }];
  }

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Outlook', error);
  }
}

function createRFC822Email(
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
): string {
  const boundary = '----=_Part_' + Date.now();
  
  let email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
  ];

  if (attachmentBase64 && attachmentFilename) {
    email.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    email.push('');
    email.push(`--${boundary}`);
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
    email.push('');
    email.push(`--${boundary}`);
    email.push(`Content-Type: application/pdf; name="${attachmentFilename}"`);
    email.push('Content-Transfer-Encoding: base64');
    email.push(`Content-Disposition: attachment; filename="${attachmentFilename}"`);
    email.push('');
    email.push(attachmentBase64);
    email.push(`--${boundary}--`);
  } else {
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
  }

  return email.join('\r\n');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
