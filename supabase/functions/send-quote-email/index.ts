import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    console.log('Starting quote email send process...');
    
    const { quoteId } = await req.json();

    if (!quoteId) {
      throw new Error('Missing quoteId');
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create user-scoped client for RLS
    const userSupabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_ANON_KEY') as string,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Fetch quote data
    const { data: quote, error: quoteError } = await userSupabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (quoteError || !quote) {
      throw new Error('Quote not found');
    }

    // Parse client data
    const clientData = typeof quote.client_data === 'string' 
      ? JSON.parse(quote.client_data) 
      : quote.client_data;

    if (!clientData?.email) {
      throw new Error('Client email not found');
    }

    const clientEmail = clientData.email;
    const clientName = clientData.name || 'Valued Client';
    const quoteNumber = quote.quote_number;

    // Fetch user and company profile
    const { data: { user } } = await userSupabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Your Company';

    console.log(`Sending quote ${quoteNumber} to ${clientEmail}`);

    // Generate fresh PDF
    const pdfResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quote,
        companyProfile,
        invoice_mode: false,
        force_regenerate: true
      })
    });

    const pdfData = await pdfResponse.json();
    let pdfDownloadUrl = pdfData?.downloadUrl;
    const documentId = pdfData?.documentId;

    // Poll for PDF if not immediately available
    if (!pdfDownloadUrl && documentId) {
      for (let i = 0; i < 45; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const statusResponse = await fetch(`${supabaseUrl}/functions/v1/generate-pdf-monkey`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentId, mode: 'status' })
        });
        const statusData = await statusResponse.json();
        if (statusData?.downloadUrl) {
          pdfDownloadUrl = statusData.downloadUrl;
          break;
        }
      }
    }

    if (!pdfDownloadUrl) {
      throw new Error('Failed to generate PDF');
    }

    // Store PDF metadata
    if (documentId) {
      const newVersion = (quote.pdf_version || 0) + 1;
      await supabase
        .from('quotes')
        .update({
          pdf_document_id: documentId,
          pdf_generated_at: new Date().toISOString(),
          pdf_version: newVersion
        })
        .eq('id', quoteId);
    }

    // Download PDF as binary data for attachment
    console.log('Downloading PDF for attachment...');
    const pdfFileResponse = await fetch(pdfDownloadUrl);
    if (!pdfFileResponse.ok) {
      throw new Error('Failed to download PDF from PDF Monkey');
    }
    const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfArrayBuffer)));
    console.log(`PDF downloaded: ${pdfArrayBuffer.byteLength} bytes`);

    // Get Gmail credentials from Supabase secrets
    const rawClientId = Deno.env.get('GMAIL_CLIENT_ID') ?? '';
    const rawClientSecret = Deno.env.get('GMAIL_CLIENT_SECRET') ?? '';
    const rawRefreshToken = Deno.env.get('GMAIL_REFRESH_TOKEN') ?? '';

    const sanitise = (v: string) => v.trim().replace(/^['"]|['"]$/g, '');
    const gmailClientId = sanitise(rawClientId);
    const gmailClientSecret = sanitise(rawClientSecret);
    const gmailRefreshToken = sanitise(rawRefreshToken);

    if (!gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      console.error('Gmail credentials missing:', {
        hasClientId: Boolean(gmailClientId),
        hasClientSecret: Boolean(gmailClientSecret), 
        hasRefreshToken: Boolean(gmailRefreshToken)
      });
      throw new Error('Gmail API not configured - missing credentials');
    }

    // Get access token using refresh token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: gmailClientId,
        client_secret: gmailClientSecret,
        refresh_token: gmailRefreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to get access token:', errorText);
      console.error('Token request failed with status:', tokenResponse.status);
      
      // Parse the error response to provide more specific feedback
      let errorDetails = 'Gmail API authentication failed';
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error === 'invalid_client') {
          errorDetails = 'Gmail OAuth client not found - check GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET';
        } else if (errorData.error === 'invalid_grant') {
          errorDetails = 'Gmail refresh token expired or invalid - regenerate GMAIL_REFRESH_TOKEN';
        }
      } catch (e) {
        // Keep default error message
      }
      
      throw new Error(errorDetails);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('Successfully obtained Gmail access token');

    // Generate professional email content
    const emailSubject = `Quote ${quoteNumber} from ${companyName}`;
    const emailBody = generateEmailHTML(quote, clientName, companyName, companyProfile);

    // Create multipart email with PDF attachment
    const boundary = '----=_Part_' + Date.now();
    const pdfFilename = `Quote_${quoteNumber}.pdf`;
    
    const emailMessage = [
      `To: ${clientEmail}`,
      `Subject: ${emailSubject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      emailBody,
      '',
      `--${boundary}`,
      'Content-Type: application/pdf',
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${pdfFilename}"`,
      '',
      pdfBase64,
      '',
      `--${boundary}--`
    ].join('\r\n');

    // Encode email message in base64url
    const encodedMessage = btoa(emailMessage)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email via Gmail API
    const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedMessage,
      }),
    });

    if (!gmailResponse.ok) {
      const errorText = await gmailResponse.text();
      console.error('Gmail API error:', errorText);
      throw new Error('Failed to send email via Gmail API');
    }

    const gmailResult = await gmailResponse.json();
    console.log('Email sent successfully:', gmailResult.id);

    // Update quote status to 'sent' and record email send time
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ 
        status: 'sent',
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteId);

    if (updateError) {
      console.error('Failed to update quote status:', updateError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: gmailResult.id,
      message: 'Quote sent successfully via email'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error sending quote email:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to send quote email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};

function generateEmailHTML(quote: any, clientName: string, companyName: string, company: any): string {
  const clientData = typeof quote.client_data === 'string' ? JSON.parse(quote.client_data) : quote.client_data;
  const settings = typeof quote.settings === 'string' ? JSON.parse(quote.settings) : quote.settings;
  const jobDetails = typeof quote.job_details === 'string' ? JSON.parse(quote.job_details) : quote.job_details;
  const total = quote.total || 0;
  const expiryDate = quote.expiry_date 
    ? new Date(quote.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const jobTitle = jobDetails?.title || 'Electrical Work';
  const jobDescription = jobDetails?.description || '';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote ${quote.quote_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #2563eb; padding: 40px 30px; text-align: center;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center;">
                    ${company?.logo_url ? `<img src="${company.logo_url}" alt="${companyName}" style="max-width: 120px; height: auto; margin-bottom: 20px;">` : `<div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">${companyName}</div>`}
                    <div style="font-size: 14px; color: rgba(255, 255, 255, 0.85); margin-bottom: 20px;">Professional Electrical Services</div>
                    <div style="display: inline-block; background-color: #059669; color: #ffffff; padding: 8px 20px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 8px;">QUOTATION</div>
                    <div style="font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 8px;">#${quote.quote_number}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Total Amount - Prominent -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <div style="font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: 500; letter-spacing: 1px; margin-bottom: 8px;">TOTAL AMOUNT</div>
                    <div style="font-size: 48px; font-weight: 700; color: #ffffff; line-height: 1;">£${total.toFixed(2)}</div>
                    <div style="margin-top: 12px; padding: 8px 16px; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; display: inline-block; font-size: 13px; color: #ffffff;">
                      ✓ Valid Until: ${expiryDate}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">Dear <strong>${clientName}</strong>,</p>
              <p style="margin: 0 0 30px 0; font-size: 15px; color: #4b5563; line-height: 1.6;">Thank you for your enquiry. We are pleased to provide you with a quotation for <strong>${jobTitle}</strong>. Please find the complete details attached as a PDF.</p>

              <!-- Quote Details Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0f9ff; border: 2px solid #bfdbfe; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dbeafe;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="font-size: 13px; color: #1e40af; font-weight: 600;">📄 Quote Number</td>
                              <td style="font-size: 14px; color: #1e3a8a; font-weight: 700; text-align: right;">${quote.quote_number}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dbeafe;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="font-size: 13px; color: #1e40af; font-weight: 600;">🔧 Work Description</td>
                              <td style="font-size: 14px; color: #1e3a8a; font-weight: 600; text-align: right;">${jobTitle}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dbeafe;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="font-size: 13px; color: #1e40af; font-weight: 600;">💷 Total Amount</td>
                              <td style="font-size: 18px; color: #059669; font-weight: 700; text-align: right;">£${total.toFixed(2)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="font-size: 13px; color: #1e40af; font-weight: 600;">📅 Valid Until</td>
                              <td style="font-size: 14px; color: #1e3a8a; font-weight: 700; text-align: right;">${expiryDate}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${jobDescription ? `
              <!-- Job Description -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 14px; color: #1e40af; font-weight: 700; margin-bottom: 8px;">📋 PROJECT DETAILS</div>
                    <div style="font-size: 14px; color: #374151; line-height: 1.6;">${jobDescription}</div>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- PDF Attachment Notice -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ecfdf5; border: 2px dashed #10b981; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <div style="font-size: 16px; color: #065f46; font-weight: 600; margin-bottom: 6px;">📎 Quote_${quote.quote_number}.pdf</div>
                    <div style="font-size: 13px; color: #047857; margin-bottom: 16px;">Complete quotation details attached as PDF</div>
                    <div style="font-size: 12px; color: #059669;">Please review the attached PDF for itemised breakdown and full terms</div>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 14px; color: #92400e; font-weight: 700; margin-bottom: 8px;">💡 READY TO PROCEED?</div>
                    <div style="font-size: 14px; color: #78350f; line-height: 1.6;">If you would like to accept this quotation or have any questions, please contact us. We're here to help and look forward to working with you.</div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">This quotation is valid for 30 days from the date of issue. All work will be completed to BS 7671 (18th Edition) standards.</p>

              <p style="margin: 0; font-size: 15px; color: #1f2937; line-height: 1.6;">
                Best regards,<br>
                <strong style="font-size: 16px;">${companyName}</strong><br>
                ${company?.phone ? `<span style="color: #6b7280;">📞 ${company.phone}</span><br>` : ''}
                ${company?.email ? `<span style="color: #6b7280;">✉️ ${company.email}</span>` : ''}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 30px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center;">
                    <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">⚡ Quote generated by ElecMate Professional Suite</div>
                    <div style="font-size: 11px; color: #9ca3af;">This quotation is valid for 30 days and subject to our terms and conditions.</div>
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
  `;
}

serve(handler);