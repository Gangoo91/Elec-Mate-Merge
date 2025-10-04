import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceEmailRequest {
  invoiceId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { invoiceId }: InvoiceEmailRequest = await req.json();

    if (!invoiceId) {
      throw new Error('Invoice ID is required');
    }

    // Fetch invoice details
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .single();

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found');
    }

    // Fetch company profile for sender details
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const clientEmail = invoice.client_data?.email;
    if (!clientEmail) {
      throw new Error('Client email not found');
    }

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    };

    // Generate email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .invoice-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .total { font-size: 24px; font-weight: bold; color: #1e40af; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background: #f3f4f6; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Invoice ${invoice.invoice_number}</h1>
              ${companyProfile?.company_name ? `<p>${companyProfile.company_name}</p>` : ''}
            </div>
            
            <div class="content">
              <p>Dear ${invoice.client_data?.name || 'Valued Client'},</p>
              
              <p>Please find your invoice details below:</p>
              
              <div class="invoice-details">
                <p><strong>Invoice Number:</strong> ${invoice.invoice_number}</p>
                <p><strong>Issue Date:</strong> ${new Date(invoice.invoice_date).toLocaleDateString('en-GB')}</p>
                <p><strong>Due Date:</strong> ${new Date(invoice.invoice_due_date).toLocaleDateString('en-GB')}</p>
                
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoice.items.map((item: any) => `
                      <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(item.unitPrice)}</td>
                        <td>${formatCurrency(item.total)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                
                <div style="text-align: right; margin-top: 20px;">
                  <p><strong>Subtotal:</strong> ${formatCurrency(parseFloat(invoice.subtotal))}</p>
                  <p><strong>VAT (20%):</strong> ${formatCurrency(parseFloat(invoice.vat_amount))}</p>
                  <p class="total">Total: ${formatCurrency(parseFloat(invoice.total))}</p>
                </div>
                
                ${invoice.settings?.paymentTerms ? `<p><strong>Payment Terms:</strong> ${invoice.settings.paymentTerms}</p>` : ''}
                
                ${invoice.settings?.bankDetails ? `
                  <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 6px;">
                    <p style="margin: 0; font-weight: 600;">Bank Details:</p>
                    <p style="margin: 5px 0;">Account Name: ${invoice.settings.bankDetails.accountName}</p>
                    <p style="margin: 5px 0;">Account Number: ${invoice.settings.bankDetails.accountNumber}</p>
                    <p style="margin: 5px 0;">Sort Code: ${invoice.settings.bankDetails.sortCode}</p>
                  </div>
                ` : ''}
              </div>
              
              ${invoice.invoice_notes ? `<p style="margin-top: 20px;"><strong>Notes:</strong><br>${invoice.invoice_notes}</p>` : ''}
              
              <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
              
              <p>Thank you for your business!</p>
              
              ${companyProfile?.company_name ? `<p><strong>${companyProfile.company_name}</strong></p>` : ''}
              ${companyProfile?.company_email ? `<p>Email: ${companyProfile.company_email}</p>` : ''}
              ${companyProfile?.company_phone ? `<p>Phone: ${companyProfile.company_phone}</p>` : ''}
            </div>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Gmail API
    const gmailClientId = Deno.env.get('GMAIL_CLIENT_ID');
    const gmailClientSecret = Deno.env.get('GMAIL_CLIENT_SECRET');
    const gmailRefreshToken = Deno.env.get('GMAIL_REFRESH_TOKEN');

    if (!gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      throw new Error('Gmail API credentials not configured');
    }

    // Get OAuth2 access token
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
      console.error('OAuth2 token error:', errorText);
      throw new Error('Failed to obtain Gmail access token');
    }

    const { access_token } = await tokenResponse.json();

    // Construct email in MIME format
    const subject = `Invoice ${invoice.invoice_number} - ${companyProfile?.company_name || 'ElecMate'}`;
    const fromEmail = companyProfile?.company_email || 'invoices@elecmate.dev';
    
    const emailContent = [
      `From: ${fromEmail}`,
      `To: ${clientEmail}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      emailHtml,
    ].join('\r\n');

    // Encode email in base64url format
    const encodedEmail = btoa(emailContent)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email via Gmail API
    const gmailResponse = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      }
    );

    if (!gmailResponse.ok) {
      const errorText = await gmailResponse.text();
      console.error('Gmail API error:', errorText);
      throw new Error('Failed to send email via Gmail');
    }

    const gmailData = await gmailResponse.json();
    console.log('Email sent successfully via Gmail:', gmailData);

    return new Response(
      JSON.stringify({ success: true, message: 'Invoice sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-invoice function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
