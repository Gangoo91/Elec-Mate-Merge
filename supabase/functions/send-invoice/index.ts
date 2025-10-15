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
    // Check if Authorization header is present
    const authHeader = req.headers.get('Authorization');
    console.log('Authorization header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('No Authorization header found');
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

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('Unauthorized');
    }
    
    console.log('User authenticated:', user.id);

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

    // Ensure we have a fresh PDF - regenerate if missing or stale
    let pdfUrl = invoice.pdf_url;
    const pdfNeedsRegeneration = !pdfUrl || !invoice.pdf_document_id;

    if (pdfNeedsRegeneration) {
      console.log('Regenerating PDF for email attachment...');
      
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
            quote: invoice,
            companyProfile: companyProfile,
            invoice_mode: true,
            force_regenerate: true,
          }),
        }
      );

      if (pdfResponse.ok) {
        const pdfData = await pdfResponse.json();
        pdfUrl = pdfData.downloadUrl;
        
        // Update database with new PDF metadata
        if (pdfUrl && pdfData.documentId) {
          const newVersion = (invoice.pdf_version || 0) + 1;
          await supabaseClient
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_document_id: pdfData.documentId,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion,
            })
            .eq('id', invoiceId);
        }
      }
    }

    // Add cache busting to PDF URL
    const cacheBustedPdfUrl = pdfUrl ? `${pdfUrl}?t=${Date.now()}` : null;

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    };

    // Generate professional HTML email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center; }
    .company-name { color: #FFD700; font-size: 24px; font-weight: bold; margin: 0; }
    .content { padding: 30px; }
    .invoice-header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .invoice-number { font-size: 28px; font-weight: bold; color: #1a1a1a; margin: 0 0 10px 0; }
    .invoice-details { margin-top: 15px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .detail-label { font-weight: 600; color: #666; }
    .detail-value { color: #1a1a1a; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .totals { text-align: right; margin-top: 20px; }
    .totals p { margin: 8px 0; }
    .total-amount { font-size: 32px; font-weight: bold; color: #FFD700; margin: 20px 0; }
    .pay-now-section { text-align: center; margin: 30px 0; }
    .pay-now-btn { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1a1a1a; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-weight: bold; font-size: 18px; opacity: 0.6; cursor: not-allowed; }
    .coming-soon { color: #999; font-size: 14px; margin-top: 10px; }
    .bank-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0; }
    .bank-details h3 { margin-top: 0; color: #1a1a1a; }
    .bank-detail { margin: 8px 0; }
    .notes { background: #fff9e6; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0; }
    .footer { background: #1a1a1a; color: #fff; padding: 30px; text-align: center; }
    .footer-brand { color: #FFD700; font-weight: bold; font-size: 16px; }
    .footer-text { color: #999; font-size: 14px; margin: 10px 0 0 0; }
    @media only screen and (max-width: 600px) {
      .content { padding: 20px; }
      .invoice-number { font-size: 24px; }
      .total-amount { font-size: 28px; }
      .pay-now-btn { padding: 14px 36px; font-size: 16px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="company-name">${companyProfile?.company_name || 'ElecMate Professional'}</h1>
    </div>
    
    <div class="content">
      <p>Dear ${invoice.client_data?.name || 'Valued Client'},</p>
      <p>Thank you for your business. Please find your invoice details below:</p>
      
      <div class="invoice-header">
        <p class="invoice-number">Invoice #${invoice.invoice_number}</p>
        <div class="invoice-details">
          <div class="detail-row">
            <span class="detail-label">Invoice Date:</span>
            <span class="detail-value">${new Date(invoice.invoice_date).toLocaleDateString('en-GB')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Due Date:</span>
            <span class="detail-value">${new Date(invoice.invoice_due_date).toLocaleDateString('en-GB')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Payment Terms:</span>
            <span class="detail-value">${invoice.settings?.paymentTerms || 'Payment due within 30 days'}</span>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((item: any) => `
            <tr>
              <td>${item.description}</td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right;">${formatCurrency(item.unitPrice)}</td>
              <td style="text-align: right;">${formatCurrency(item.total)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals">
        <p><strong>Subtotal:</strong> ${formatCurrency(parseFloat(invoice.subtotal))}</p>
        <p><strong>VAT (20%):</strong> ${formatCurrency(parseFloat(invoice.vat_amount))}</p>
        <p class="total-amount">£${parseFloat(invoice.total).toFixed(2)}</p>
      </div>

      <div class="pay-now-section">
        <span class="pay-now-btn">Pay Now</span>
        <p class="coming-soon">💳 Online payments coming soon</p>
      </div>

      ${invoice.settings?.bankDetails ? `
      <div class="bank-details">
        <h3>Or pay via bank transfer:</h3>
        <div class="bank-detail"><strong>Bank Name:</strong> ${invoice.settings.bankDetails.bankName}</div>
        <div class="bank-detail"><strong>Account Name:</strong> ${invoice.settings.bankDetails.accountName}</div>
        <div class="bank-detail"><strong>Account Number:</strong> ${invoice.settings.bankDetails.accountNumber}</div>
        <div class="bank-detail"><strong>Sort Code:</strong> ${invoice.settings.bankDetails.sortCode}</div>
      </div>
      ` : ''}

      ${invoice.invoice_notes ? `
      <div class="notes">
        <strong>Notes:</strong><br>
        ${invoice.invoice_notes}
      </div>
      ` : ''}

      ${cacheBustedPdfUrl ? `
      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0 0 15px 0; font-size: 16px;"><strong>📄 Download Full Invoice (PDF)</strong></p>
        <a href="${cacheBustedPdfUrl}" 
           style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); 
                  color: #1a1a1a; text-decoration: none; padding: 12px 32px; border-radius: 6px; 
                  font-weight: bold; font-size: 16px;">
          Download Invoice PDF
        </a>
        <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">
          Click to download a professional PDF copy of this invoice
        </p>
      </div>
      ` : ''}

      <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
      
      <p>Thank you for your business!</p>
      <p><strong>${companyProfile?.company_name || 'ElecMate Professional'}</strong><br>
      ${companyProfile?.company_phone ? `📞 ${companyProfile.company_phone}<br>` : ''}
      ${companyProfile?.company_email ? `✉️ ${companyProfile.company_email}` : ''}</p>
    </div>
    
    <div class="footer">
      <p class="footer-brand">⚡ Powered by ElecMate Professional Suite</p>
      <p class="footer-text">Professional electrical contracting tools for modern electricians</p>
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
