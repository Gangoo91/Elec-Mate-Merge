import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

// Default T&Cs options for electrical contractors - must match frontend QuoteSettingsCard.tsx
const DEFAULT_TERMS_MAP: Record<string, string> = {
  // Payment Terms
  'payment_30': 'Payment due within 30 days of invoice date',
  'payment_14': 'Payment due within 14 days of invoice date',
  'payment_on_completion': 'Payment due upon completion of works',
  'deposit_required': 'A deposit of the specified percentage is required before work commences',
  'additional_charges': 'Additional work not included in this quote will be charged at our standard hourly rate',
  'late_payment': 'Late payments may incur interest charges as per the Late Payment of Commercial Debts Act',
  'payment_methods': 'We accept bank transfer, card payments, and cash',
  // Warranty & Guarantee
  'warranty_workmanship': 'All workmanship is guaranteed for the warranty period specified',
  'warranty_materials': 'Materials are covered by manufacturer warranties where applicable',
  'warranty_callback': 'Free callback within warranty period for any defects in our workmanship',
  'warranty_exclusions': 'Warranty excludes damage caused by misuse, third-party interference, or acts of nature',
  // Compliance & Certification
  'bs7671_compliance': 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations',
  'part_p_notification': 'Building control notification (Part P) included where required',
  'testing_cert': 'Electrical installation certificate or minor works certificate provided on completion',
  'competent_person': 'All work carried out by qualified electricians registered with a competent person scheme',
  'insurance': 'Fully insured for public liability and professional indemnity',
  // Site Access & Safety
  'access_required': 'Clear access to work areas must be provided',
  'power_isolation': 'Power may need to be isolated during installation - advance notice will be given',
  'site_safety': 'Work area will be left safe and clean at the end of each working day',
  'asbestos_disclaimer': 'This quote excludes work involving asbestos - if discovered, work will stop pending survey',
  'parking': 'Suitable parking should be available close to the property',
  'working_hours': 'Standard working hours are 8am-5pm Monday to Friday unless otherwise agreed',
  // General Conditions
  'price_validity': 'This quotation is valid for the number of days specified from the date of issue',
  'cancellation': 'Cancellation within 48 hours of scheduled work may incur charges',
  'unforeseen_works': 'Unforeseen works discovered during installation will be quoted separately',
  'price_subject': 'Prices are subject to change if scope of work differs from description',
  'materials_ownership': 'All materials remain our property until paid for in full',
  'variations': 'Any variations to the agreed scope must be confirmed in writing',
};

// Build terms list from stored JSON format
function buildTermsList(quoteTermsJson: string | null): string[] {
  if (!quoteTermsJson) {
    // Return sensible defaults if no terms configured
    return [
      DEFAULT_TERMS_MAP['payment_30'],
      DEFAULT_TERMS_MAP['deposit_required'],
      DEFAULT_TERMS_MAP['warranty_workmanship'],
      DEFAULT_TERMS_MAP['bs7671_compliance'],
      DEFAULT_TERMS_MAP['testing_cert'],
      DEFAULT_TERMS_MAP['price_validity'],
    ];
  }

  try {
    const parsed = JSON.parse(quoteTermsJson);
    const terms: string[] = [];

    // Handle new JSON format: { selected: string[], custom: {id: string, label: string}[] }
    if (parsed.selected && Array.isArray(parsed.selected)) {
      for (const termId of parsed.selected) {
        // Check if it's a default term
        if (DEFAULT_TERMS_MAP[termId]) {
          terms.push(DEFAULT_TERMS_MAP[termId]);
        }
        // Check if it's a custom term
        else if (termId.startsWith('custom_') && parsed.custom) {
          const customTerm = parsed.custom.find((t: { id: string; label: string }) => t.id === termId);
          if (customTerm?.label) {
            terms.push(customTerm.label);
          }
        }
      }
      return terms.length > 0 ? terms : [
        DEFAULT_TERMS_MAP['payment_30'],
        DEFAULT_TERMS_MAP['warranty_workmanship'],
        DEFAULT_TERMS_MAP['bs7671_compliance'],
      ];
    }

    // Legacy format: plain text (split by newlines)
    if (typeof quoteTermsJson === 'string' && !quoteTermsJson.startsWith('{')) {
      return quoteTermsJson.split('\n').filter(line => line.trim());
    }

    // Fallback
    return [
      DEFAULT_TERMS_MAP['payment_30'],
      DEFAULT_TERMS_MAP['warranty_workmanship'],
      DEFAULT_TERMS_MAP['bs7671_compliance'],
    ];
  } catch {
    // If parsing fails, treat as legacy plain text
    return quoteTermsJson.split('\n').filter(line => line.trim());
  }
}

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
    const { quote, companyProfile, invoice_mode, briefing, briefing_mode, documentId: requestDocumentId, mode, force_regenerate } = await req.json();
    console.log('[PDF-MONKEY] Received request - Mode:', invoice_mode ? 'invoice' : briefing_mode ? 'briefing' : (requestDocumentId ? 'status' : 'quote'));
    
    // Use data passed directly from the update - it's already fresh from database
    // No need to re-fetch - the quote passed in is returned immediately after transaction commits
    const freshQuote = quote;
    const freshCompanyProfile = companyProfile;
    
    // Validation: ensure required data is present for quote/invoice mode
    if ((invoice_mode || !briefing_mode) && !quote?.id) {
      console.error('[PDF-MONKEY] Missing quote data');
      return new Response(
        JSON.stringify({ error: 'Quote data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log('[PDF-MONKEY] Using data passed from client (fresh from database update)');

    // Status-only polling mode: skip creation and just check an existing document
    if (requestDocumentId && (mode === 'status' || (!quote && !briefing))) {
      try {
        const statusResponse = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${requestDocumentId}`, {
          headers: { 'Authorization': `Bearer ${PDF_MONKEY_API_KEY}` },
        });
        if (!statusResponse.ok) {
          const err = await statusResponse.text();
          console.error('[PDF-MONKEY] Status-check error:', statusResponse.status, err);
          return new Response(JSON.stringify({ success: false, status: 'unknown', documentId: requestDocumentId }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const statusData = await statusResponse.json();
        const status = statusData.document?.status;
        if (status === 'success') {
          return new Response(JSON.stringify({
            success: true,
            documentId: statusData.document.id,
            downloadUrl: statusData.document.download_url,
            previewUrl: statusData.document.preview_url,
            status,
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ success: false, status: status || 'generating', documentId: requestDocumentId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        console.error('[PDF-MONKEY] Status-check exception:', e);
        return new Response(JSON.stringify({ success: false, status: 'error', documentId: requestDocumentId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
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
      console.log('[PDF-MONKEY] Quote/Invoice items count:', freshQuote?.items?.length || 0);
      console.log('[PDF-MONKEY] Settings:', JSON.stringify(freshQuote?.settings, null, 2));
      
      if (!freshQuote) {
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
        
        // Use structured AI data directly from ai_prompt_data (with fallback parsing)
        briefing_overview: {
          paragraphs: briefing.ai_prompt_data?.aiContent?.briefingOverview || 
                      (briefing.briefing_description || briefing.notes || "").split('\n\n')
                        .filter(p => p.trim())
                        .map((p, i) => ({
                          paragraph: i + 1,
                          content: p.trim(),
                          type: i === 0 ? 'introduction' : 'context'
                        }))
        },
        
        hazards_and_controls: {
          structured: briefing.ai_prompt_data?.aiContent?.hazardsAndControls ||
                      (briefing.hazards || "").split(/---+/).filter(h => h.trim()).map((h, i) => {
                        const lines = h.trim().split('\n');
                        const hazardMatch = lines[0]?.match(/\*\*Hazard \d+: (.+?)\*\*/);
                        const riskMatch = h.match(/\*\*Risk Level:\*\*\s*(\w+)/);
                        return {
                          hazardId: i + 1,
                          hazardName: hazardMatch?.[1] || `Hazard ${i + 1}`,
                          description: lines.slice(1).join(' ').substring(0, 200),
                          riskLevel: riskMatch?.[1] || 'MEDIUM',
                          controls: h.match(/- (.+?)(?=\n|$)/g)?.map(c => c.replace(/^- /, '')) || []
                        };
                      }),
          count: briefing.ai_prompt_data?.aiContent?.hazardsAndControls?.length || 0
        },
        
        safety_warning: briefing.ai_prompt_data?.aiContent?.safetyWarning || {
          level: "CAUTION",
          headline: "Safety Precautions Required",
          details: (briefing.safety_warning || "").match(/- (.+?)(?=\n|$)/g)?.map(b => b.replace(/^- /, '')) || [briefing.safety_warning || ""]
        },
        
        equipment_required: briefing.ai_prompt_data?.aiContent?.equipmentRequired || [],
        
        key_regulations: briefing.ai_prompt_data?.aiContent?.keyRegulations || [],
        
        additional_info: {
          paragraphs: briefing.ai_prompt_data?.aiContent?.additionalInfo || 
                      (briefing.notes || "").split('\n\n')
                        .filter(p => p.trim())
                        .map((p, i) => ({
                          paragraph: i + 1,
                          content: p.trim(),
                          type: 'detail'
                        }))
        },
        
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
      console.log('[PDF-MONKEY] Transformed briefing payload with structured data:', {
        hasBriefingOverview: !!transformedBriefing.briefing_overview.paragraphs?.length,
        hazardsCount: transformedBriefing.hazards_and_controls.count,
        safetyWarningLevel: transformedBriefing.safety_warning.level,
        equipmentCount: transformedBriefing.equipment_required.length,
        regulationsCount: transformedBriefing.key_regulations.length
      });
    } else if (invoice_mode) {
      // Transform to invoice format - USE FRESH DATA
      // Use bank details from invoice settings first, fallback to company profile
      const bankDetails = freshQuote?.settings?.bankDetails || freshCompanyProfile?.bank_details || {};
      
      const transformedCompanyProfile = {
        logo_url: freshCompanyProfile?.logo_url || "",
        company_name: freshCompanyProfile?.company_name || "",
        company_address: freshCompanyProfile?.company_address ? 
          `${freshCompanyProfile.company_address}${freshCompanyProfile.company_postcode ? '\n' + freshCompanyProfile.company_postcode : ''}` : "",
        company_phone: freshCompanyProfile?.company_phone || "",
        company_email: freshCompanyProfile?.company_email || "",
        vat_number: freshCompanyProfile?.vat_number || "",
        company_website: freshCompanyProfile?.company_website || "",
        bank_name: bankDetails?.bankName || bankDetails?.bank_name || "",
        account_name: bankDetails?.accountName || bankDetails?.account_name || freshCompanyProfile?.company_name || "",
        account_number: bankDetails?.accountNumber || bankDetails?.account_number || "",
        sort_code: bankDetails?.sortCode || bankDetails?.sort_code || "",
        payment_terms: freshQuote?.settings?.paymentTerms || "7 days",
        company_registration: freshCompanyProfile?.company_registration || ""
      };
      
      console.log('[PDF-MONKEY] Bank details for invoice:', {
        source: quote?.settings?.bankDetails ? 'invoice settings' : 'company profile',
        account_name: transformedCompanyProfile.account_name,
        account_number: transformedCompanyProfile.account_number,
        sort_code: transformedCompanyProfile.sort_code
      });

      // DEBUG: Log raw client data to diagnose update issues
      console.log('[PDF-MONKEY] Raw client data sources:', {
        'freshQuote.client': freshQuote?.client,
        'freshQuote.client_data': freshQuote?.client_data,
        hasClient: !!freshQuote?.client,
        hasClientData: !!freshQuote?.client_data,
      });

      // Use client_data from database (snake_case) as primary source since that's what's saved
      const clientData = freshQuote?.client_data || freshQuote?.client || {};

      const transformedInvoice = {
        invoiceNumber: freshQuote?.invoice_number || "",
        createdAt: freshQuote?.invoice_date ? new Date(freshQuote.invoice_date).toISOString().split('T')[0] : "",
        dueDate: freshQuote?.invoice_due_date ? new Date(freshQuote.invoice_due_date).toISOString().split('T')[0] : "",
        purchaseOrder: freshQuote?.purchase_order || "",
        client: {
          name: clientData?.name || "",
          contactName: clientData?.contactName || "",
          address: clientData?.address ?
            `${clientData.address}${clientData?.postcode ? '\n' + clientData.postcode : ''}` : "",
          postcode: clientData?.postcode || "",
          email: clientData?.email || "",
          phone: clientData?.phone || ""
        },
        jobDetails: {
          title: freshQuote?.jobDetails?.title || freshQuote?.job_details?.title || "",
          description: freshQuote?.jobDetails?.description || freshQuote?.job_details?.description || "",
          location: freshQuote?.jobDetails?.location || freshQuote?.job_details?.location || "",
          estimatedDuration: freshQuote?.jobDetails?.estimatedDuration || freshQuote?.job_details?.estimatedDuration || "",
          customDuration: freshQuote?.jobDetails?.customDuration || freshQuote?.job_details?.customDuration || "",
          workStartDate: freshQuote?.jobDetails?.workStartDate || freshQuote?.job_details?.workStartDate || "",
          specialRequirements: freshQuote?.jobDetails?.specialRequirements || freshQuote?.job_details?.specialRequirements || "",
          completionDate: freshQuote?.work_completion_date ? 
            new Date(freshQuote.work_completion_date).toISOString().split('T')[0] : "",
          reference: freshQuote?.jobDetails?.reference || freshQuote?.job_details?.reference || freshQuote?.quote_number || ""
        },
        items: (freshQuote?.items || []).map((item: any) => ({
          name: item.description || "",
          description: item.notes || "",
          quantity: item.quantity || 0,  // Use original quoted quantity for billing
          unit: item.unit || "each",
          unitPrice: item.unitPrice || 0
        })),
        notes: freshQuote?.invoice_notes || ""
      };
      
      console.log('[PDF-MONKEY] Transformed invoice client:', JSON.stringify(transformedInvoice.client, null, 2));
      console.log('[PDF-MONKEY] Transformed invoice items:', transformedInvoice.items.length, 'items');
      console.log('[PDF-MONKEY] Items detail:', JSON.stringify(transformedInvoice.items, null, 2));

      // Calculate totals from items
      const itemsSubtotal = transformedInvoice.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      );

      const settings = freshQuote?.settings || {};
      const overhead = itemsSubtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (itemsSubtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered 
        ? (itemsSubtotal + overhead + profit) * ((settings.vatRate || 20) / 100)
        : 0;
      // FIXED: Include overhead + profit in total calculation
      const total = itemsSubtotal + overhead + profit + vatAmount;

      console.log('[PDF-MONKEY] Recalculated totals:', {
        itemsSubtotal,
        overhead,
        profit,
        vatAmount,
        total,
        originalTotal: freshQuote?.total
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
        terms: freshQuote?.settings?.terms || "",
        useVat: settings.vatRegistered === true,
        vatRate: settings.vatRate || 20,
        // STEP 5: Cache busting timestamp
        _cache_bust: Date.now(),
        _generated_at: new Date().toISOString()
      };

      console.log('[PDF-MONKEY] Transformed invoice payload for template');
    } else {
      // DEBUG: Log raw input data to diagnose missing fields
      console.log('[PDF-MONKEY] RAW freshQuote:', JSON.stringify(freshQuote, null, 2));
      console.log('[PDF-MONKEY] RAW freshCompanyProfile:', JSON.stringify(freshCompanyProfile, null, 2));
      console.log('[PDF-MONKEY] freshQuote.items type:', typeof freshQuote?.items, 'isArray:', Array.isArray(freshQuote?.items));
      console.log('[PDF-MONKEY] freshQuote.items length:', freshQuote?.items?.length || 0);
      console.log('[PDF-MONKEY] freshCompanyProfile.logo_url:', freshCompanyProfile?.logo_url);

      // Get items from quote - handle both camelCase and snake_case
      const quoteItems = freshQuote?.items || [];
      const jobDetails = freshQuote?.jobDetails || freshQuote?.job_details || {};
      const clientData = freshQuote?.client || freshQuote?.client_data || {};
      const quoteSettings = freshQuote?.settings || {};

      console.log('[PDF-MONKEY] Extracted quoteItems:', quoteItems.length, 'items');
      console.log('[PDF-MONKEY] First item (if any):', quoteItems[0] ? JSON.stringify(quoteItems[0]) : 'NONE');

      // Transform items to ensure consistent format for PDF template
      const transformedItems = quoteItems.map((item: any) => ({
        id: item.id || '',
        description: item.description || item.name || '',
        quantity: parseFloat(item.quantity) || 1,
        unit: item.unit || 'each',
        unitPrice: parseFloat(item.unitPrice) || parseFloat(item.unit_price) || 0,
        totalPrice: parseFloat(item.totalPrice) || parseFloat(item.total_price) || (parseFloat(item.quantity || 1) * parseFloat(item.unitPrice || item.unit_price || 0)),
        category: item.category || 'manual',
        subcategory: item.subcategory || '',
        workerType: item.workerType || item.worker_type || '',
        hours: parseFloat(item.hours) || 0,
        hourlyRate: parseFloat(item.hourlyRate) || parseFloat(item.hourly_rate) || 0,
        notes: item.notes || '',
      }));

      // Group items by category for template
      const labourItems = transformedItems.filter((item: any) => item.category === 'labour');
      const materialItems = transformedItems.filter((item: any) => item.category === 'materials');
      const equipmentItems = transformedItems.filter((item: any) => item.category === 'equipment');
      const manualItems = transformedItems.filter((item: any) => item.category === 'manual');

      // Calculate totals from items
      const itemsSubtotal = transformedItems.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);
      const overhead = parseFloat(freshQuote?.overhead) || (itemsSubtotal * ((quoteSettings.overheadPercentage || 0) / 100));
      const profit = parseFloat(freshQuote?.profit) || ((itemsSubtotal + overhead) * ((quoteSettings.profitMargin || 0) / 100));
      const subtotalWithMarkups = itemsSubtotal + overhead + profit;
      const vatAmount = quoteSettings.vatRegistered
        ? (parseFloat(freshQuote?.vat_amount) || parseFloat(freshQuote?.vatAmount) || subtotalWithMarkups * ((quoteSettings.vatRate || 20) / 100))
        : 0;
      const total = parseFloat(freshQuote?.total) || (subtotalWithMarkups + vatAmount);

      // Calculate valid until date
      const validUntilDate = freshQuote?.expiryDate || freshQuote?.expiry_date
        ? new Date(freshQuote.expiryDate || freshQuote.expiry_date)
        : new Date(Date.now() + (freshCompanyProfile?.quote_validity_days || 30) * 24 * 60 * 60 * 1000);

      // Format dates
      const createdDate = freshQuote?.created_at || freshQuote?.createdAt
        ? new Date(freshQuote.created_at || freshQuote.createdAt)
        : new Date();

      console.log('[PDF-MONKEY] Quote items breakdown:', {
        total: transformedItems.length,
        labour: labourItems.length,
        materials: materialItems.length,
        equipment: equipmentItems.length,
        manual: manualItems.length,
        itemsSubtotal,
        overhead,
        profit,
        vatAmount,
        total
      });

      payload = {
        // Company details
        companyProfile: {
          company_name: freshCompanyProfile?.company_name || '',
          company_address: freshCompanyProfile?.company_address || '',
          company_phone: freshCompanyProfile?.company_phone || '',
          company_email: freshCompanyProfile?.company_email || '',
          logo_url: freshCompanyProfile?.logo_url || freshCompanyProfile?.logo_data_url || '',
          vat_number: freshCompanyProfile?.vat_number || '',
          company_number: freshCompanyProfile?.company_number || '',
          // Ensure colors have defaults
          primary_color: freshCompanyProfile?.primary_color || '#1e40af',
          secondary_color: freshCompanyProfile?.secondary_color || '#1F2937',
          accent_color: freshCompanyProfile?.accent_color || '#F59E0B',
        },
        // Quote details
        quote: {
          quoteNumber: freshQuote?.quote_number || freshQuote?.quoteNumber || '',
          createdAt: createdDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          validUntil: validUntilDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          status: freshQuote?.status || 'draft',
          notes: freshQuote?.notes || '',
          // Signature/acceptance data
          signature_url: freshQuote?.signature_url || null,
          acceptance_status: freshQuote?.acceptance_status || null,
          acceptance_method: freshQuote?.acceptance_method || null,
          accepted_at: freshQuote?.accepted_at ? new Date(freshQuote.accepted_at).toLocaleDateString('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric'
          }) : null,
          accepted_by_name: freshQuote?.accepted_by_name || null,
          accepted_by_email: freshQuote?.accepted_by_email || null,
        },
        // Client details
        client: {
          name: clientData.name || '',
          email: clientData.email || '',
          phone: clientData.phone || '',
          address: clientData.address || '',
          postcode: clientData.postcode || '',
        },
        // Job details
        jobDetails: {
          title: jobDetails.title || '',
          description: jobDetails.description || '',
          location: jobDetails.location || '',
          estimatedDuration: jobDetails.estimatedDuration || jobDetails.estimated_duration || '',
          customDuration: jobDetails.customDuration || jobDetails.custom_duration || '',
          workStartDate: jobDetails.workStartDate || jobDetails.work_start_date || '',
          specialRequirements: jobDetails.specialRequirements || jobDetails.special_requirements || '',
          reference: jobDetails.reference || freshQuote?.quote_number || freshQuote?.quoteNumber || '',
        },
        // All items (flat list for simple templates)
        items: transformedItems,
        // Items grouped by category (for detailed templates)
        labourItems,
        materialItems,
        equipmentItems,
        manualItems,
        // Financial totals
        totals: {
          subtotal: itemsSubtotal,
          overhead: overhead,
          overheadPercentage: quoteSettings.overheadPercentage || 0,
          profit: profit,
          profitMargin: quoteSettings.profitMargin || 0,
          vatAmount: vatAmount,
          vatRate: quoteSettings.vatRate || 20,
          total: total,
          // Formatted currency strings
          subtotalFormatted: `£${itemsSubtotal.toFixed(2)}`,
          overheadFormatted: overhead > 0 ? `£${overhead.toFixed(2)}` : null,
          profitFormatted: profit > 0 ? `£${profit.toFixed(2)}` : null,
          vatFormatted: vatAmount > 0 ? `£${vatAmount.toFixed(2)}` : null,
          totalFormatted: `£${total.toFixed(2)}`,
        },
        // For backwards compatibility with existing templates
        subtotal: itemsSubtotal,
        overhead: overhead,
        profit: profit,
        vatAmount: vatAmount,
        total: total,
        // Branding settings for dynamic styling
        branding: {
          primaryColor: freshCompanyProfile?.primary_color || '#1e40af',
          secondaryColor: freshCompanyProfile?.secondary_color || '#1F2937',
          accentColor: freshCompanyProfile?.accent_color || '#F59E0B',
        },
        // Business settings
        settings: {
          quoteValidityDays: freshCompanyProfile?.quote_validity_days || 30,
          warrantyPeriod: freshCompanyProfile?.warranty_period || '12 months',
          depositPercentage: freshCompanyProfile?.deposit_percentage || 30,
          paymentTerms: freshCompanyProfile?.payment_terms || '7 days',
          showMaterialsBreakdown: quoteSettings.showMaterialsBreakdown !== false,
        },
        // Build terms list from stored settings (handles JSON format with selected + custom terms)
        terms: buildTermsList(freshCompanyProfile?.quote_terms || null),
        // Also pass raw for backwards compatibility
        customTerms: freshCompanyProfile?.quote_terms || null,
        // Professional credentials
        credentials: {
          registrationScheme: freshCompanyProfile?.registration_scheme || null,
          registrationNumber: freshCompanyProfile?.registration_number || null,
          insuranceProvider: freshCompanyProfile?.insurance_provider || null,
          insuranceCoverage: freshCompanyProfile?.insurance_coverage || null,
          qualifications: freshCompanyProfile?.inspector_qualifications || [],
        },
        // VAT settings
        useVat: quoteSettings.vatRegistered === true,
        vatRate: quoteSettings.vatRate || 20,
        // Cache busting timestamp
        _cache_bust: Date.now(),
        _generated_at: new Date().toISOString()
      };
      console.log('[PDF-MONKEY] Quote payload prepared:', {
        hasLogo: !!payload.companyProfile.logo_url,
        hasClient: !!payload.client.name,
        hasJobTitle: !!payload.jobDetails.title,
        itemsCount: payload.items.length,
        total: payload.totals.total,
        termsCount: payload.terms.length
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
    const createdDocumentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max wait
    let documentStatus = pdfData.document?.status;

    while (documentStatus !== 'success' && documentStatus !== 'failure' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const statusResponse = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${createdDocumentId}`, {
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
        documentId: createdDocumentId,
        checkStatusUrl: `https://api.pdfmonkey.io/api/v1/documents/${createdDocumentId}`
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
