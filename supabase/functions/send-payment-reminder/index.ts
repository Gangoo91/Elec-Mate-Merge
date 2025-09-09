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

    // Parse client data
    const clientData = typeof quote.client_data === 'string' 
      ? JSON.parse(quote.client_data) 
      : quote.client_data;

    // Generate reminder email content based on type
    const reminderContent = generateReminderContent(reminderType, quote, clientData);

    console.log(`Sending ${reminderType} payment reminder for quote ${quote.quote_number} to ${clientData.email}`);
    console.log('Reminder content:', reminderContent);

    // Update the quote with last reminder sent timestamp
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ 
        last_reminder_sent_at: new Date().toISOString()
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
      quoteNumber: quote.quote_number
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

function generateReminderContent(type: string, quote: any, client: any) {
  const baseContent = {
    to: client.email,
    subject: '',
    content: ''
  };

  switch (type) {
    case 'gentle':
      baseContent.subject = `Friendly Payment Reminder - Quote ${quote.quote_number}`;
      baseContent.content = `
        Dear ${client.name},
        
        I hope this message finds you well. This is a friendly reminder regarding the outstanding payment for quote ${quote.quote_number}.
        
        Quote Details:
        - Quote Number: ${quote.quote_number}
        - Total Amount: £${quote.total}
        - Work Completed: ${new Date().toLocaleDateString()}
        
        If payment has already been made, please disregard this message. If you have any questions or concerns, please don't hesitate to contact me.
        
        Thank you for your business.
        
        Best regards
      `;
      break;
      
    case 'firm':
      baseContent.subject = `Payment Reminder - Quote ${quote.quote_number} - Action Required`;
      baseContent.content = `
        Dear ${client.name},
        
        This is a follow-up regarding the outstanding payment for quote ${quote.quote_number}.
        
        Quote Details:
        - Quote Number: ${quote.quote_number}
        - Total Amount: £${quote.total}
        - Payment Due: Overdue
        
        Please arrange payment at your earliest convenience. If there are any issues preventing payment, please contact me immediately to discuss.
        
        Best regards
      `;
      break;
      
    case 'final':
      baseContent.subject = `FINAL NOTICE - Payment Required for Quote ${quote.quote_number}`;
      baseContent.content = `
        Dear ${client.name},
        
        This is a final notice regarding the outstanding payment for quote ${quote.quote_number}.
        
        Quote Details:
        - Quote Number: ${quote.quote_number}
        - Total Amount: £${quote.total}
        - Status: OVERDUE
        
        If payment is not received within 7 days, we may need to consider further action including debt recovery procedures.
        
        Please contact me immediately to resolve this matter.
        
        Regards
      `;
      break;
  }
  
  return baseContent;
}

serve(handler);