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

    // Ensure public token exists for Accept/Decline buttons
    let publicToken: string;

    const { data: existingView } = await supabase
      .from('quote_views')
      .select('public_token')
      .eq('quote_id', quoteId)
      .eq('is_active', true)
      .single();

    if (existingView?.public_token) {
      publicToken = existingView.public_token;
      console.log('Using existing public token:', publicToken);
    } else {
      // Generate new token
      publicToken = crypto.randomUUID();
      console.log('Generated new public token:', publicToken);
      
      const expiresAt = new Date(quote.expiry_date || Date.now() + 30 * 24 * 60 * 60 * 1000);
      
      const { error: insertError } = await supabase
        .from('quote_views')
        .upsert({
          quote_id: quoteId,
          public_token: publicToken,
          is_active: true,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString()
        });
        
      if (insertError) {
        console.error('Failed to create quote view:', insertError);
        throw new Error('Failed to create public quote link');
      }
    }

    // Build public URLs for Accept/Decline buttons
    const baseUrl = 'https://jtwygbeceundfgnkirof.supabase.co';
    const acceptUrl = `${baseUrl}/functions/v1/quote-action?token=${publicToken}&action=accept`;
    const rejectUrl = `${baseUrl}/functions/v1/quote-action?token=${publicToken}&action=reject`;

    console.log('Public quote URLs:', { acceptUrl, rejectUrl });

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
    const emailBody = generateEmailHTML(quote, clientName, companyName, companyProfile, acceptUrl, rejectUrl);

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

function generateEmailHTML(
  quote: any, 
  clientName: string, 
  companyName: string, 
  company: any,
  acceptUrl: string,
  rejectUrl: string
): string {
  const clientData = typeof quote.client_data === 'string' ? JSON.parse(quote.client_data) : quote.client_data;
  const settings = typeof quote.settings === 'string' ? JSON.parse(quote.settings) : quote.settings;
  const jobDetails = typeof quote.job_details === 'string' ? JSON.parse(quote.job_details) : quote.job_details;
  
  const total = quote.total || 0;
  const quoteNumber = quote.quote_number;
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
  
  const jobTitle = jobDetails?.title || 'Electrical Work';
  const jobDescription = jobDetails?.description || '';
  
  // Use company profile data with fallbacks
  const finalCompanyName = company?.company_name || companyName || 'Elec-Mate';
    const companyPhone = company?.company_phone || '07506026934';
    const companyEmail = company?.company_email || 'andrewgangoo91@gmail.com';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Quote from ${finalCompanyName}</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8f9fa; -webkit-font-smoothing: antialiased;">
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td style="padding: 50px 20px;">
                
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);">
                    
                    <!-- Logo Header -->
                    <tr>
                        <td style="padding: 48px 48px 32px;">
                            <div style="background-color: #000000; display: inline-block; padding: 12px 20px;">
                                <span style="color: #fbbf24; font-size: 19px; font-weight: 700; letter-spacing: 0.3px;">⚡ ${finalCompanyName}</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Title -->
                    <tr>
                        <td style="padding: 0 48px 40px;">
                            <h1 style="margin: 0 0 6px; font-size: 28px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.5px;">Quote</h1>
                            <p style="margin: 0; font-size: 15px; color: #6b7280;">#${quoteNumber}</p>
                        </td>
                    </tr>
                    
                    <!-- Border -->
                    <tr>
                        <td style="padding: 0 48px;">
                            <div style="height: 1px; background-color: #e5e7eb;"></div>
                        </td>
                    </tr>
                    
                    <!-- Message -->
                    <tr>
                        <td style="padding: 40px 48px;">
                            <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #374151;">Dear <span style="font-weight: 600; color: #0a0a0a;">${clientName}</span>,</p>
                            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #374151;">Thank you for the opportunity to provide this quote. We have carefully reviewed your requirements and prepared the following proposal for your electrical project.</p>
                        </td>
                    </tr>
                    
                    <!-- Quote Details Grid -->
                    <tr>
                        <td style="padding: 0 48px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <!-- Left Column -->
                                    <td style="width: 50%; vertical-align: top; padding-right: 24px;">
                                        <div style="margin-bottom: 24px;">
                                            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Prepared For</p>
                                            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0a0a0a;">${clientName}</p>
                                        </div>
                                        <div>
                                            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Scope of Work</p>
                                            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151;">${jobDescription || jobTitle}</p>
                                        </div>
                                    </td>
                                    
                                    <!-- Right Column -->
                                    <td style="width: 50%; vertical-align: top; padding-left: 24px;">
                                        <div style="margin-bottom: 24px;">
                                            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Date</p>
                                            <p style="margin: 0; font-size: 15px; color: #0a0a0a;">${quoteDate}</p>
                                        </div>
                                        <div>
                                            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Valid Until</p>
                                            <p style="margin: 0; font-size: 15px; color: #0a0a0a;">${expiryDate}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Total Amount -->
                    <tr>
                        <td style="padding: 0 48px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="vertical-align: middle;">
                                                    <p style="margin: 0; font-size: 13px; font-weight: 500; color: #6b7280;">Total Quote Amount</p>
                                                </td>
                                                <td style="vertical-align: middle; text-align: right;">
                                                    <p style="margin: 0; font-size: 36px; font-weight: 700; color: #0a0a0a; letter-spacing: -1px;">£${total.toFixed(2)}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Accept/Reject Buttons -->
                    <tr>
                        <td style="padding: 0 48px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-right: 8px; width: 50%;">
                                        <a href="${acceptUrl}" style="display: block; padding: 16px 24px; background-color: #10b981; color: #ffffff; text-align: center; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 2px;">Review & Accept</a>
                                    </td>
                                    <td style="padding-left: 8px; width: 50%;">
                                        <a href="${rejectUrl}" style="display: block; padding: 16px 24px; background-color: #f3f4f6; color: #374151; text-align: center; text-decoration: none; font-size: 15px; font-weight: 600; border: 1px solid #e5e7eb; border-radius: 2px;">Decline</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Attachment Notice -->
                    <tr>
                        <td style="padding: 0 48px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #eff6ff; border-left: 3px solid #3b82f6; padding: 20px; border-radius: 2px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #1e3a8a;">Detailed Quote Attached</p>
                                        <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.5;">Please see the attached PDF (Quote_${quoteNumber}.pdf) for a complete breakdown of materials, labour, and terms.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Closing -->
                    <tr>
                        <td style="padding: 0 48px 48px;">
                            <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #374151;">If you have any questions or would like to discuss this quote further, please don't hesitate to contact us. We look forward to working with you.</p>
                            <p style="margin: 0 0 4px; font-size: 15px; color: #374151;">Yours sincerely,</p>
                            <p style="margin: 0 0 24px; font-size: 15px; font-weight: 600; color: #0a0a0a;">${finalCompanyName}</p>
                            
                            <!-- Contact -->
                            <p style="margin: 0 0 4px; font-size: 14px; color: #6b7280;">
                                <a href="tel:${companyPhone}" style="color: #0a0a0a; text-decoration: none; font-weight: 500;">${companyPhone}</a>
                            </p>
                            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                <a href="mailto:${companyEmail}" style="color: #0a0a0a; text-decoration: none; font-weight: 500;">${companyEmail}</a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 48px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af; line-height: 1.6;">All work will be completed to professional standards and in full compliance with current electrical regulations.</p>
                            <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">Powered by <span style="font-weight: 600; color: #374151;">Elec-Mate</span> Professional Suite</p>
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