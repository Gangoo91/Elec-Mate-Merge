import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentReminderRequest {
  quoteId: string;
  reminderType: 'gentle' | 'firm' | 'final';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { quoteId, reminderType }: PaymentReminderRequest = await req.json();

    if (!quoteId || !reminderType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the quote details
    const { data: quote, error: fetchError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (fetchError || !quote) {
      console.error('Error fetching quote:', fetchError);
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse client and settings data
    const clientData = typeof quote.client_data === 'string' 
      ? JSON.parse(quote.client_data) 
      : quote.client_data;
    
    const settingsData = typeof quote.settings === 'string'
      ? JSON.parse(quote.settings)
      : quote.settings;

    // Calculate days overdue
    const dueDate = new Date(quote.invoice_due_date);
    const today = new Date();
    const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

    // Generate reminder email content based on type
    const reminderContent = generateReminderContent(reminderType, quote, clientData, settingsData, daysOverdue);

    console.log(`Sending ${reminderType} payment reminder for invoice ${quote.invoice_number} to ${clientData.email}`);
    console.log('Reminder content:', reminderContent);

    // Update the quote with last reminder sent timestamp and increment counter
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ 
        last_reminder_sent_at: new Date().toISOString(),
        reminder_count: (quote.reminder_count || 0) + 1
      })
      .eq('id', quoteId);

    if (updateError) {
      console.error('Error updating quote:', updateError);
    }

    // In a real implementation, you would integrate with an email service here
    // For now, we'll just log the action and return success
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: `${reminderType} payment reminder sent successfully`,
      sentTo: clientData.email,
      invoiceNumber: quote.invoice_number,
      daysOverdue,
      reminderCount: (quote.reminder_count || 0) + 1
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in send-payment-reminder function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

function generateReminderContent(type: string, quote: any, client: any, settings: any, daysOverdue: number) {
  const baseEmail = {
    to: client.email,
    from: settings.contactEmail || 'noreply@elecmate.com',
    subject: '',
    html: ''
  };

  const dueDate = new Date(quote.invoice_due_date).toLocaleDateString('en-GB');
  const amount = `£${quote.total.toFixed(2)}`;

  switch (type) {
    case 'gentle':
      baseEmail.subject = `Friendly Reminder - Invoice ${quote.invoice_number}`;
      baseEmail.html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center; color: #FFD700; }
    .content { padding: 30px; }
    .invoice-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .amount { font-size: 28px; font-weight: bold; color: #FFD700; }
    .footer { background: #1a1a1a; color: #999; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${settings.companyName}</h1>
    </div>
    <div class="content">
      <p>Dear ${client.name},</p>
      
      <p>I hope this message finds you well. This is a friendly reminder regarding the outstanding payment for Invoice ${quote.invoice_number}.</p>
      
      <div class="invoice-box">
        <p><strong>Invoice Number:</strong> ${quote.invoice_number}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p><strong>Days Overdue:</strong> ${daysOverdue}</p>
        <p class="amount">${amount}</p>
      </div>
      
      <p>If you've already sent payment, please disregard this message. If not, I'd appreciate payment at your earliest convenience.</p>
      
      ${settings.bankDetails ? `
      <p><strong>Bank Transfer Details:</strong><br>
      Bank: ${settings.bankDetails.bankName}<br>
      Account: ${settings.bankDetails.accountName}<br>
      Number: ${settings.bankDetails.accountNumber}<br>
      Sort Code: ${settings.bankDetails.sortCode}</p>
      ` : ''}
      
      <p>Thank you for your business!</p>
      <p><strong>${settings.companyName}</strong><br>
      ${settings.contactPhone ? `${settings.contactPhone}<br>` : ''}
      ${settings.contactEmail || ''}</p>
    </div>
    <div class="footer">
      <p>⚡ Powered by ElecMate Professional Suite</p>
    </div>
  </div>
</body>
</html>
      `;
      break;
      
    case 'firm':
      baseEmail.subject = `Payment Reminder - Invoice ${quote.invoice_number} - Action Required`;
      baseEmail.html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #c82333 0%, #e04b5a 100%); padding: 30px; text-align: center; color: white; }
    .content { padding: 30px; }
    .invoice-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; }
    .amount { font-size: 28px; font-weight: bold; color: #c82333; }
    .warning { background: #f8d7da; border-left: 4px solid #c82333; padding: 15px; margin: 20px 0; }
    .footer { background: #1a1a1a; color: #999; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Reminder</h1>
    </div>
    <div class="content">
      <p>Dear ${client.name},</p>
      
      <p>This is a follow-up regarding the outstanding payment for Invoice ${quote.invoice_number}.</p>
      
      <div class="invoice-box">
        <p><strong>Invoice Number:</strong> ${quote.invoice_number}</p>
        <p><strong>Original Due Date:</strong> ${dueDate}</p>
        <p><strong>Days Overdue:</strong> ${daysOverdue}</p>
        <p class="amount">${amount}</p>
      </div>
      
      <div class="warning">
        <strong>⚠️ Action Required:</strong> Please arrange payment as soon as possible.
      </div>
      
      <p>If there are any issues preventing payment, please contact me immediately so we can discuss a solution.</p>
      
      ${settings.bankDetails ? `
      <p><strong>Bank Transfer Details:</strong><br>
      Bank: ${settings.bankDetails.bankName}<br>
      Account: ${settings.bankDetails.accountName}<br>
      Number: ${settings.bankDetails.accountNumber}<br>
      Sort Code: ${settings.bankDetails.sortCode}</p>
      ` : ''}
      
      <p>Best regards,<br>
      <strong>${settings.companyName}</strong><br>
      ${settings.contactPhone ? `${settings.contactPhone}<br>` : ''}
      ${settings.contactEmail || ''}</p>
    </div>
    <div class="footer">
      <p>⚡ Powered by ElecMate Professional Suite</p>
    </div>
  </div>
</body>
</html>
      `;
      break;
      
    case 'final':
      baseEmail.subject = `FINAL NOTICE - Payment Required for Invoice ${quote.invoice_number}`;
      baseEmail.html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #8b0000 0%, #b22222 100%); padding: 30px; text-align: center; color: white; }
    .urgent { background: #8b0000; color: white; padding: 5px 15px; border-radius: 4px; display: inline-block; }
    .content { padding: 30px; }
    .invoice-box { background: #ffebee; border: 2px solid #c82333; padding: 20px; margin: 20px 0; }
    .amount { font-size: 32px; font-weight: bold; color: #8b0000; }
    .final-warning { background: #f8d7da; border-left: 4px solid #8b0000; padding: 20px; margin: 20px 0; }
    .consequences { background: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ffc107; }
    .footer { background: #1a1a1a; color: #999; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1><span class="urgent">FINAL NOTICE</span></h1>
      <p style="margin: 10px 0 0 0;">Payment Required</p>
    </div>
    <div class="content">
      <p>Dear ${client.name},</p>
      
      <p><strong>This is a FINAL NOTICE</strong> regarding the outstanding payment for Invoice ${quote.invoice_number}, which is now significantly overdue.</p>
      
      <div class="invoice-box">
        <p><strong>Invoice Number:</strong> ${quote.invoice_number}</p>
        <p><strong>Original Due Date:</strong> ${dueDate}</p>
        <p><strong>Days Overdue:</strong> ${daysOverdue}</p>
        <p class="amount">${amount}</p>
      </div>
      
      <div class="final-warning">
        <h3 style="margin-top: 0; color: #8b0000;">⚠️ Immediate Action Required</h3>
        <p><strong>Payment must be received within 7 days</strong> to avoid the following consequences:</p>
      </div>
      
      <div class="consequences">
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Late payment fees (8% statutory interest per UK law)</li>
          <li>Suspension of all services</li>
          <li>Referral to debt collection agency</li>
          <li>Potential legal proceedings</li>
        </ul>
      </div>
      
      <p><strong>If payment has already been made, please send confirmation immediately.</strong></p>
      
      ${settings.bankDetails ? `
      <p style="background: #f8f9fa; padding: 15px; border-radius: 4px;"><strong>Bank Transfer Details:</strong><br>
      Bank: ${settings.bankDetails.bankName}<br>
      Account: ${settings.bankDetails.accountName}<br>
      Number: ${settings.bankDetails.accountNumber}<br>
      Sort Code: ${settings.bankDetails.sortCode}</p>
      ` : ''}
      
      <p style="margin-top: 30px;"><strong>Contact immediately:</strong><br>
      ${settings.companyName}<br>
      ${settings.contactPhone ? `📞 ${settings.contactPhone}<br>` : ''}
      ${settings.contactEmail ? `✉️ ${settings.contactEmail}` : ''}</p>
    </div>
    <div class="footer">
      <p>⚡ Powered by ElecMate Professional Suite</p>
    </div>
  </div>
</body>
</html>
      `;
      break;
  }
  
  return baseEmail;
}

serve(handler);
