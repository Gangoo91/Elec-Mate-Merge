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
    const { quoteId, clientEmail, clientName } = await req.json();

    if (!quoteId || !clientEmail || !clientName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get DocuSign credentials from Supabase secrets
    const docusignApiKey = Deno.env.get('DOCUSIGN_API_KEY');
    const docusignAccountId = Deno.env.get('DOCUSIGN_ACCOUNT_ID');
    const docusignUserId = Deno.env.get('DOCUSIGN_USER_ID');
    const docusignBaseUrl = Deno.env.get('DOCUSIGN_BASE_URL') || 'https://demo.docusign.net/restapi';

    if (!docusignApiKey || !docusignAccountId || !docusignUserId) {
      console.error('DocuSign credentials not configured');
      return new Response(
        JSON.stringify({ error: 'DocuSign not configured. Please contact support.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get quote data
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (quoteError || !quote) {
      return new Response(
        JSON.stringify({ error: 'Quote not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate PDF document (simplified - in production you'd generate actual PDF)
    const pdfBase64 = await generateQuotePDF(quote);

    // Create DocuSign envelope
    const envelopeData = {
      emailSubject: `Quote #${quote.quote_number} - ${quote.client_data.name}`,
      documents: [{
        documentBase64: pdfBase64,
        name: `Quote-${quote.quote_number}.pdf`,
        fileExtension: 'pdf',
        documentId: '1'
      }],
      recipients: {
        signers: [{
          email: clientEmail,
          name: clientName,
          recipientId: '1',
          routingOrder: '1',
          tabs: {
            signHereTabs: [{
              anchorString: 'Client Signature:',
              anchorXOffset: '100',
              anchorYOffset: '0',
              anchorIgnoreIfNotPresent: 'false',
              anchorUnits: 'pixels'
            }],
            dateSignedTabs: [{
              anchorString: 'Date:',
              anchorXOffset: '50',
              anchorYOffset: '0',
              anchorIgnoreIfNotPresent: 'false',
              anchorUnits: 'pixels'
            }]
          }
        }]
      },
      status: 'sent'
    };

    // Send to DocuSign
    const docusignResponse = await fetch(
      `${docusignBaseUrl}/v2.1/accounts/${docusignAccountId}/envelopes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${docusignApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(envelopeData)
      }
    );

    if (!docusignResponse.ok) {
      const errorData = await docusignResponse.text();
      console.error('DocuSign API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send quote via DocuSign' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const envelope = await docusignResponse.json();

    // Update quote with DocuSign info
    const { error: updateError } = await supabase
      .from('quotes')
      .update({
        docusign_envelope_id: envelope.envelopeId,
        docusign_status: 'sent',
        status: 'sent'
      })
      .eq('id', quoteId);

    if (updateError) {
      console.error('Error updating quote:', updateError);
    }

    console.log(`DocuSign envelope created: ${envelope.envelopeId} for quote ${quoteId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        envelopeId: envelope.envelopeId,
        message: 'Quote sent via DocuSign successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in docusign-create-envelope:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Simplified PDF generation (placeholder)
async function generateQuotePDF(quote: any): Promise<string> {
  // In a real implementation, you would:
  // 1. Use a PDF generation library like jsPDF or Puppeteer
  // 2. Generate a professional quote PDF with signature fields
  // 3. Return the base64 encoded PDF
  
  // For now, return a placeholder base64 string
  const placeholderPDF = btoa(`Quote #${quote.quote_number} PDF placeholder`);
  return placeholderPDF;
}