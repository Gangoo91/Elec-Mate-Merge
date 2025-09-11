import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendQuoteEmailRequest {
  quoteId: string;
  clientEmail: string;
  clientName: string;
  companyName: string;
  quoteNumber: string;
  total: number;
}

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
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { quoteId, clientEmail, clientName, companyName, quoteNumber, total }: SendQuoteEmailRequest = await req.json();

    console.log(`Sending quote ${quoteNumber} to ${clientEmail}`);

    // Get Gmail credentials from Supabase secrets
    const gmailClientId = Deno.env.get('GMAIL_CLIENT_ID');
    const gmailClientSecret = Deno.env.get('GMAIL_CLIENT_SECRET');
    const gmailRefreshToken = Deno.env.get('GMAIL_REFRESH_TOKEN');

    if (!gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      throw new Error('Gmail credentials not configured. Please set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN in Supabase secrets.');
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
      throw new Error('Failed to authenticate with Gmail API');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('Successfully obtained Gmail access token');

    // Fetch the full quote data from database
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (quoteError || !quoteData) {
      throw new Error('Quote not found');
    }

    // Generate professional email content
    const emailSubject = `Quote ${quoteNumber} from ${companyName}`;
    const emailBody = generateEmailHTML(quoteData, clientName, companyName);

    // Create email message for Gmail API
    const emailMessage = [
      `To: ${clientEmail}`,
      `Subject: ${emailSubject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      emailBody
    ].join('\n');

    // Encode email message in base64
    const encodedMessage = btoa(unescape(encodeURIComponent(emailMessage)))
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
  const clientData = JSON.parse(quote.client_data);
  const settings = JSON.parse(quote.settings);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote from ${companyName}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .email-container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
        }
        .quote-summary {
            background-color: #f1f5f9;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .quote-total {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 14px;
            color: #64748b;
        }
        .contact-info {
            margin: 15px 0;
        }
        .validity-info {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">${companyName}</div>
            <h1>Quote ${quote.quote_number}</h1>
        </div>
        
        <p>Dear ${clientName},</p>
        
        <p>Thank you for your interest in our electrical services. Please find attached your detailed quote for the work requested.</p>
        
        <div class="quote-summary">
            <h3>Quote Summary</h3>
            <p><strong>Quote Number:</strong> ${quote.quote_number}</p>
            <p><strong>Project:</strong> ${quote.job_details ? JSON.parse(quote.job_details).title || 'Electrical Installation' : 'Electrical Services'}</p>
            <div class="quote-total">Total: £${quote.total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</div>
            ${settings.vatRegistered ? `<p><em>VAT included at ${settings.vatRate}%</em></p>` : '<p><em>VAT not applicable</em></p>'}
        </div>
        
        <div class="validity-info">
            <strong>⏰ Quote Validity:</strong> This quote is valid for 30 days from the date of issue.
        </div>
        
        <p>Our quote includes:</p>
        <ul>
            <li>All labour and materials as specified</li>
            <li>Professional installation by certified electricians</li>
            <li>Compliance with BS 7671 18th Edition standards</li>
            <li>All necessary certificates and documentation</li>
        </ul>
        
        <p>To accept this quote or if you have any questions, please don't hesitate to get in touch with us. We're here to help and would be delighted to work with you on this project.</p>
        
        <div class="footer">
            <div class="contact-info">
                <p><strong>Need to discuss this quote?</strong></p>
                <p>Reply to this email or give us a call - we're always happy to answer any questions you might have about your electrical project.</p>
            </div>
            
            <p>Thank you for considering ${companyName} for your electrical needs.</p>
            
            <p>Best regards,<br>
            The ${companyName} Team</p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
            
            <p style="font-size: 12px; color: #94a3b8;">
                This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

serve(handler);