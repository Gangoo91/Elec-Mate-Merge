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

// Briefing template IDs - different templates for different briefing types
const BRIEFING_TEMPLATES = {
  'site-work': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D',  // Electrical safety template
  'safety-alert': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // Same as site-work
  'lfe': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D',  // Same as site-work
  'business-update': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  'hse-update': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  'regulatory': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  'general': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D' // For now, use same template
};

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
    const { quote, companyProfile, invoice_mode, briefing, briefing_mode } = await req.json();
    console.log('[PDF-MONKEY] Received request - Mode:', invoice_mode ? 'invoice' : briefing_mode ? 'briefing' : 'quote');
    
    if (briefing_mode) {
      console.log('[PDF-MONKEY] Briefing data:', {
        title: briefing?.briefing_name,
        date: briefing?.briefing_date,
        location: briefing?.location,
        hasDescription: !!briefing?.briefing_description,
        hasHazards: !!briefing?.hazards,
        hasWarning: !!briefing?.safety_warning,
        photosCount: (briefing?.photos || []).length
      });
      
      if (!briefing || !briefing.briefing_name) {
        console.error('[PDF-MONKEY] Invalid briefing data - missing required fields');
        return new Response(
          JSON.stringify({ 
            error: 'Briefing data is incomplete. Missing briefing name or other required fields.',
            received: briefing 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } else {
      console.log('[PDF-MONKEY] Quote/Invoice items count:', quote?.items?.length || 0);
      console.log('[PDF-MONKEY] Settings:', JSON.stringify(quote?.settings, null, 2));
      
      if (!quote) {
        return new Response(
          JSON.stringify({ error: 'Quote/Invoice data is required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Select template based on mode and briefing type
    let TEMPLATE_ID: string;
    if (briefing_mode) {
      const briefingType = briefing?.briefing_type || 'general';
      TEMPLATE_ID = BRIEFING_TEMPLATES[briefingType as keyof typeof BRIEFING_TEMPLATES] || BRIEFING_TEMPLATES['general'];
      console.log('[PDF-MONKEY] Using briefing template for type:', briefingType, 'Template ID:', TEMPLATE_ID);
    } else {
      TEMPLATE_ID = invoice_mode ? INVOICE_TEMPLATE_ID : QUOTE_TEMPLATE_ID;
      console.log('[PDF-MONKEY] Using template:', TEMPLATE_ID, 'for', invoice_mode ? 'invoice' : 'quote');
    }

    // Transform data based on mode
    let payload;
    if (briefing_mode) {
      // Transform briefing data for PDF
      const transformedBriefing = {
        company_logo: companyProfile?.logo_url || companyProfile?.logo_data_url || "",
        company_name: companyProfile?.company_name || "Professional Contractor",
        company_address: companyProfile?.company_address || "",
        company_phone: companyProfile?.company_phone || "",
        company_email: companyProfile?.company_email || "",
        
        briefing_title: briefing.briefing_name,
        job_name: briefing.job_name || briefing.briefing_name,
        location: briefing.location,
        briefing_date: new Date(briefing.briefing_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        briefing_time: briefing.briefing_time,
        conductor_name: briefing.conductor_name || briefing.created_by_name,
        contractor_company: briefing.contractor_company || companyProfile?.company_name || "",
        created_by: briefing.created_by_name,
        
        briefing_description: briefing.briefing_description || briefing.notes || "",
        hazards: briefing.hazards || "",
        safety_warning: briefing.safety_warning || "",
        additional_notes: briefing.notes || "",
        
        photos: (briefing.photos || []).map((p: any) => ({
          url: p.url,
          caption: p.caption || "Reference photo"
        })),
        
        generation_timestamp: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      };

      payload = transformedBriefing;
      console.log('[PDF-MONKEY] Transformed briefing payload');
    } else if (invoice_mode) {
      // Transform to invoice format
      // Use bank details from invoice settings first, fallback to company profile
      const bankDetails = quote?.settings?.bankDetails || companyProfile?.bank_details || {};
      
      const transformedCompanyProfile = {
        logo_url: companyProfile?.logo_url || "",
        company_name: companyProfile?.company_name || "",
        company_address: companyProfile?.company_address ? 
          `${companyProfile.company_address}${companyProfile.company_postcode ? '\n' + companyProfile.company_postcode : ''}` : "",
        company_phone: companyProfile?.company_phone || "",
        company_email: companyProfile?.company_email || "",
        vat_number: companyProfile?.vat_number || "",
        company_website: companyProfile?.company_website || "",
        bank_name: bankDetails?.bankName || bankDetails?.bank_name || "",
        account_name: bankDetails?.accountName || bankDetails?.account_name || companyProfile?.company_name || "",
        account_number: bankDetails?.accountNumber || bankDetails?.account_number || "",
        sort_code: bankDetails?.sortCode || bankDetails?.sort_code || "",
        payment_terms: quote?.settings?.paymentTerms || "7 days",
        company_registration: companyProfile?.company_registration || ""
      };
      
      console.log('[PDF-MONKEY] Bank details for invoice:', {
        source: quote?.settings?.bankDetails ? 'invoice settings' : 'company profile',
        account_name: transformedCompanyProfile.account_name,
        account_number: transformedCompanyProfile.account_number,
        sort_code: transformedCompanyProfile.sort_code
      });

      const transformedInvoice = {
        invoiceNumber: quote?.invoice_number || "",
        createdAt: quote?.invoice_date ? new Date(quote.invoice_date).toISOString().split('T')[0] : "",
        dueDate: quote?.invoice_due_date ? new Date(quote.invoice_due_date).toISOString().split('T')[0] : "",
        purchaseOrder: quote?.purchase_order || "",
        client: {
          name: quote?.client?.name || quote?.client_data?.name || "",
          contactName: quote?.client?.contactName || quote?.client_data?.contactName || "",
          address: quote?.client?.address || quote?.client_data?.address ? 
            `${(quote?.client?.address || quote?.client_data?.address)}${(quote?.client?.postcode || quote?.client_data?.postcode) ? '\n' + (quote?.client?.postcode || quote?.client_data?.postcode) : ''}` : "",
          postcode: quote?.client?.postcode || quote?.client_data?.postcode || "",
          email: quote?.client?.email || quote?.client_data?.email || "",
          phone: quote?.client?.phone || quote?.client_data?.phone || ""
        },
        jobDetails: {
          title: quote?.jobDetails?.title || quote?.job_details?.title || "",
          description: quote?.jobDetails?.description || quote?.job_details?.description || "",
          location: quote?.jobDetails?.location || quote?.job_details?.location || "",
          estimatedDuration: quote?.jobDetails?.estimatedDuration || quote?.job_details?.estimatedDuration || "",
          customDuration: quote?.jobDetails?.customDuration || quote?.job_details?.customDuration || "",
          workStartDate: quote?.jobDetails?.workStartDate || quote?.job_details?.workStartDate || "",
          specialRequirements: quote?.jobDetails?.specialRequirements || quote?.job_details?.specialRequirements || "",
          completionDate: quote?.work_completion_date ? 
            new Date(quote.work_completion_date).toISOString().split('T')[0] : "",
          reference: quote?.jobDetails?.reference || quote?.job_details?.reference || quote?.quote_number || ""
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
      
      console.log('[PDF-MONKEY] Transformed invoice items:', transformedInvoice.items.length, 'items');
      console.log('[PDF-MONKEY] Items detail:', JSON.stringify(transformedInvoice.items, null, 2));

      // Calculate totals from items
      const itemsSubtotal = transformedInvoice.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      );

      const settings = quote?.settings || {};
      const overhead = itemsSubtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (itemsSubtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered 
        ? (itemsSubtotal + overhead + profit) * ((settings.vatRate || 20) / 100)
        : 0;
      const total = itemsSubtotal + overhead + profit + vatAmount;

      console.log('[PDF-MONKEY] Recalculated totals:', {
        itemsSubtotal,
        overhead,
        profit,
        vatAmount,
        total,
        originalTotal: quote?.total
      });

      payload = {
        companyProfile: transformedCompanyProfile,
        invoice: {
          ...transformedInvoice,
          // Force calculated totals
          subtotal: itemsSubtotal,
          overhead: overhead,
          profit: profit,
          vatAmount: vatAmount,
          total: total
        },
        // Add explicit calculation fields for template
        calculations: {
          subtotal: itemsSubtotal,
          overhead: overhead,
          overheadPercentage: settings.overheadPercentage || 0,
          profit: profit,
          profitMargin: settings.profitMargin || 0,
          vatAmount: vatAmount,
          vatRate: settings.vatRate || 20,
          total: total
        },
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
