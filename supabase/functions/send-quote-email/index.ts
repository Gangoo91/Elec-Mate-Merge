import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const emailBody = generateEmailHTML(quote, clientName, companyName);

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

function generateEmailHTML(quote: any, clientName: string, companyName: string): string {
  const clientData = typeof quote.client_data === 'string' ? JSON.parse(quote.client_data) : quote.client_data;
  const settings = typeof quote.settings === 'string' ? JSON.parse(quote.settings) : quote.settings;
  const jobDetails = typeof quote.job_details === 'string' ? JSON.parse(quote.job_details) : quote.job_details;
  const total = quote.total || 0;
  const expiryDate = quote.expiry_date 
    ? new Date(quote.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const jobTitle = jobDetails?.title || 'Electrical Work';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote ${quote.quote_number}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">${companyName}</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Professional Electrical Services</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #667eea; margin-top: 0;">Quote ${quote.quote_number}</h2>
    
    <p style="font-size: 16px;">Dear ${clientName},</p>
    
    <p style="font-size: 16px;">Thank you for your enquiry. Please find your quotation for <strong>${jobTitle}</strong> attached as a PDF.</p>
    
    <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Quote Number:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: bold;">${quote.quote_number}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Total Amount:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #667eea; font-size: 20px;">£${total.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Valid Until:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: bold;">${expiryDate}</td>
        </tr>
      </table>
    </div>
    
    <div style="background: #e8f4f8; border: 2px dashed #667eea; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 16px; color: #667eea;">
        <strong>📎 Quote_${quote.quote_number}.pdf</strong>
      </p>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
        Please see the attached PDF for the complete quote details.
      </p>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      This quote is valid for 30 days from the date of issue. If you have any questions or would like to proceed, please don't hesitate to contact us.
    </p>
    
    <p style="font-size: 16px; margin-top: 20px;">Best regards,<br><strong>${companyName}</strong></p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>This is an automated email. Please do not reply directly to this message.</p>
  </div>
</body>
</html>
  `;
}

serve(handler);