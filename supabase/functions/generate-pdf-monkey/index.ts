import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const TEMPLATE_ID = 'B9CD1B3D-71A2-4F67-84E9-B81E0DC3E0B2';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[PDF-MONKEY] Request started');

    // Verify PDF Monkey API key is configured
    if (!PDF_MONKEY_API_KEY) {
      console.error('[PDF-MONKEY] API key not configured');
      return new Response(
        JSON.stringify({ error: 'PDF Monkey API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const { quote, companyProfile } = await req.json();
    console.log('[PDF-MONKEY] Received quote:', quote?.id, 'company:', companyProfile?.company_name);

    if (!quote) {
      return new Response(
        JSON.stringify({ error: 'Quote data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare payload for PDF Monkey
    // Merge company profile data into the quote object for easier template access
    const payload = {
      ...quote,
      company: {
        name: companyProfile?.company_name || 'Your Electrical Company',
        address: companyProfile?.company_address || '',
        postcode: companyProfile?.company_postcode || '',
        phone: companyProfile?.company_phone || '',
        email: companyProfile?.company_email || '',
        website: companyProfile?.company_website || '',
        registration: companyProfile?.company_registration || '',
        vat_number: companyProfile?.vat_number || '',
        logo_url: companyProfile?.logo_url || companyProfile?.logo_data_url || ''
      },
      companyProfile
    };

    console.log('[PDF-MONKEY] Calling PDF Monkey API with template:', TEMPLATE_ID);

    // Call PDF Monkey API
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          status: 'pending',
          payload: payload
        }
      })
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      console.error('[PDF-MONKEY] API error:', pdfMonkeyResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate PDF', 
          details: errorText,
          status: pdfMonkeyResponse.status 
        }),
        { 
          status: pdfMonkeyResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();
    console.log('[PDF-MONKEY] PDF generation initiated, document ID:', pdfData.document?.id);

    // Poll for document completion (PDF Monkey processes async)
    let documentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max wait
    let documentStatus = pdfData.document?.status;

    while (documentStatus !== 'success' && documentStatus !== 'failure' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const statusResponse = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        }
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        documentStatus = statusData.document?.status;
        console.log('[PDF-MONKEY] Status check attempt', attempts + 1, '- Status:', documentStatus);
        
        if (documentStatus === 'success') {
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status: statusData.document.status
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }
      
      attempts++;
    }

    if (documentStatus === 'failure') {
      console.error('[PDF-MONKEY] PDF generation failed');
      return new Response(
        JSON.stringify({ error: 'PDF generation failed' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Timeout - return document ID for manual status checking
    console.log('[PDF-MONKEY] Timeout waiting for PDF, returning document ID');
    return new Response(
      JSON.stringify({
        success: false,
        message: 'PDF generation in progress',
        documentId: documentId,
        checkStatusUrl: `https://api.pdfmonkey.io/api/v1/documents/${documentId}`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[PDF-MONKEY] Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
