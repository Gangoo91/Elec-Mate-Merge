import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const QUOTE_TEMPLATE_ID = 'B9CD1B3D-71A2-4F67-84E9-B81E0DC3E0B2';
const INVOICE_TEMPLATE_ID = 'DC891A6A-4B38-48F5-A7DB-7CD0B550F4A2';

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
    const { quote, companyProfile, invoice_mode } = await req.json();
    console.log('[PDF-MONKEY] Received request - Invoice mode:', invoice_mode, 'Quote ID:', quote?.id);
    console.log('[PDF-MONKEY] Received jobDetails:', JSON.stringify(quote?.jobDetails, null, 2));

    if (!quote) {
      return new Response(
        JSON.stringify({ error: 'Quote/Invoice data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Select template based on mode
    const TEMPLATE_ID = invoice_mode ? INVOICE_TEMPLATE_ID : QUOTE_TEMPLATE_ID;
    console.log('[PDF-MONKEY] Using template:', TEMPLATE_ID, 'for', invoice_mode ? 'invoice' : 'quote');

    // Transform data for invoice template
    let payload;
    if (invoice_mode) {
      // Transform to invoice format
      const transformedCompanyProfile = {
        logo_url: companyProfile?.logo_url || "",
        company_name: companyProfile?.company_name || "",
        company_address: companyProfile?.company_address ? 
          `${companyProfile.company_address}${companyProfile.company_postcode ? '\n' + companyProfile.company_postcode : ''}` : "",
        company_phone: companyProfile?.company_phone || "",
        company_email: companyProfile?.company_email || "",
        vat_number: companyProfile?.vat_number || "",
        company_website: companyProfile?.company_website || "",
        bank_name: companyProfile?.bank_details?.bank_name || "",
        account_name: companyProfile?.bank_details?.account_name || companyProfile?.company_name || "",
        account_number: companyProfile?.bank_details?.account_number || "",
        sort_code: companyProfile?.bank_details?.sort_code || "",
        payment_terms: quote?.settings?.paymentTerms || "7 days",
        company_registration: companyProfile?.company_registration || ""
      };

      const transformedInvoice = {
        invoiceNumber: quote?.invoice_number || "",
        createdAt: quote?.invoice_date ? new Date(quote.invoice_date).toISOString().split('T')[0] : "",
        dueDate: quote?.invoice_due_date ? new Date(quote.invoice_due_date).toISOString().split('T')[0] : "",
        purchaseOrder: quote?.purchase_order || "",
        client: {
          name: quote?.client?.name || "",
          contactName: quote?.client?.contactName || "",
          address: quote?.client?.address ? 
            `${quote.client.address}${quote.client.postcode ? '\n' + quote.client.postcode : ''}` : "",
          postcode: quote?.client?.postcode || "",
          email: quote?.client?.email || "",
          phone: quote?.client?.phone || ""
        },
        jobDetails: {
          title: quote?.jobDetails?.title || "",
          description: quote?.jobDetails?.description || "",
          location: quote?.jobDetails?.location || "",
          estimatedDuration: quote?.jobDetails?.estimatedDuration || "",
          customDuration: quote?.jobDetails?.customDuration || "",
          workStartDate: quote?.jobDetails?.workStartDate || "",
          specialRequirements: quote?.jobDetails?.specialRequirements || "",
          completionDate: quote?.work_completion_date ? 
            new Date(quote.work_completion_date).toISOString().split('T')[0] : "",
          reference: quote?.jobDetails?.reference || quote?.quoteNumber || ""
        },
        items: (quote?.items || []).map((item: any) => ({
          name: item.description || "",
          description: item.notes || "",
          quantity: item.actualQuantity || item.quantity || 0,
          unit: item.unit || "each",
          unitPrice: item.unitPrice || 0
        })),
        notes: quote?.invoice_notes || ""
      };

      payload = {
        companyProfile: transformedCompanyProfile,
        invoice: transformedInvoice,
        terms: quote?.settings?.terms || "",
        useVat: (quote?.settings?.vatRate || 0) > 0,
        vatRate: quote?.settings?.vatRate || 20
      };

      console.log('[PDF-MONKEY] Transformed invoice payload for template');
    } else {
      // Transform quote format to ensure jobDetails is properly structured with all fields
      const transformedQuote = {
        ...quote,
        jobDetails: {
          title: quote?.jobDetails?.title || "",
          description: quote?.jobDetails?.description || "",
          location: quote?.jobDetails?.location || "",
          estimatedDuration: quote?.jobDetails?.estimatedDuration || "",
          customDuration: quote?.jobDetails?.customDuration || "",
          workStartDate: quote?.jobDetails?.workStartDate || "",
          specialRequirements: quote?.jobDetails?.specialRequirements || "",
          completionDate: quote?.work_completion_date ? 
            new Date(quote.work_completion_date).toISOString().split('T')[0] : "",
          reference: quote?.jobDetails?.reference || quote?.quoteNumber || ""
        }
      };
      
      payload = {
        quote: transformedQuote,
        companyProfile
      };
      console.log('[PDF-MONKEY] Using quote format with all jobDetails fields:', {
        hasTitle: !!transformedQuote.jobDetails.title,
        hasDescription: !!transformedQuote.jobDetails.description,
        hasLocation: !!transformedQuote.jobDetails.location,
        hasEstimatedDuration: !!transformedQuote.jobDetails.estimatedDuration,
        hasWorkStartDate: !!transformedQuote.jobDetails.workStartDate
      });
    }

    console.log('[PDF-MONKEY] Calling PDF Monkey API');

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
