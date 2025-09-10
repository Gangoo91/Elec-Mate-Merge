import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookData = await req.json();
    
    console.log('DocuSign webhook received:', JSON.stringify(webhookData, null, 2));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract envelope information
    const envelopeId = webhookData.data?.envelopeId || webhookData.envelopeId;
    const status = webhookData.data?.envelopeSummary?.status || webhookData.status;
    
    if (!envelopeId) {
      console.error('No envelope ID found in webhook data');
      return new Response('OK', { status: 200 });
    }

    // Find the quote associated with this envelope
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('docusign_envelope_id', envelopeId)
      .single();

    if (quoteError || !quote) {
      console.error('Quote not found for envelope:', envelopeId);
      return new Response('OK', { status: 200 });
    }

    // Update quote based on DocuSign status
    let updateData: any = {
      docusign_status: status
    };

    switch (status?.toLowerCase()) {
      case 'completed':
        // Get signer information from webhook
        const recipients = webhookData.data?.envelopeSummary?.recipients;
        const signer = recipients?.signers?.[0];
        
        updateData = {
          ...updateData,
          acceptance_status: 'accepted',
          acceptance_method: 'docusign',
          accepted_at: new Date().toISOString(),
          accepted_by_name: signer?.name || 'Unknown',
          accepted_by_email: signer?.email || 'Unknown',
          status: 'completed'
        };
        
        console.log(`Quote ${quote.id} accepted via DocuSign`);
        break;

      case 'declined':
      case 'voided':
        updateData = {
          ...updateData,
          acceptance_status: 'rejected',
          accepted_at: new Date().toISOString(),
          status: 'rejected'
        };
        
        console.log(`Quote ${quote.id} rejected/voided via DocuSign`);
        break;

      case 'sent':
      case 'delivered':
        updateData.status = 'sent';
        console.log(`Quote ${quote.id} delivered via DocuSign`);
        break;

      default:
        console.log(`DocuSign status update for quote ${quote.id}: ${status}`);
    }

    // Update the quote
    const { error: updateError } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', quote.id);

    if (updateError) {
      console.error('Error updating quote:', updateError);
      return new Response('Error updating quote', { status: 500 });
    }

    console.log(`Successfully updated quote ${quote.id} with DocuSign status: ${status}`);

    return new Response('OK', { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Error processing DocuSign webhook:', error);
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders 
    });
  }
});