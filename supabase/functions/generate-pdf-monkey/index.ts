/* eslint-disable @typescript-eslint/no-explicit-any */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const QUOTE_TEMPLATE_ID = 'B9CD1B3D-71A2-4F67-84E9-B81E0DC3E0B2';
const INVOICE_TEMPLATE_ID = 'DC891A6A-4B38-48F5-A7DB-7CD0B550F4A2';

// Briefing template IDs - different templates for different briefing types
const BRIEFING_TEMPLATES = {
  'site-work': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // Electrical safety template
  'safety-alert': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // Same as site-work
  lfe: 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // Same as site-work
  'business-update': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  'hse-update': 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  regulatory: 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
  general: 'F59624CA-B0A1-4BEC-8CF0-9A7F446C641D', // For now, use same template
};

// Default Invoice T&Cs - must match frontend BusinessTab.tsx
const DEFAULT_INVOICE_TERMS_MAP: Record<string, string> = {
  // Payment Terms
  inv_payment_due: 'Payment is due within the period specified above',
  inv_use_reference: 'Please use invoice number as payment reference',
  inv_bank_transfer: 'Bank transfer is the preferred payment method',
  // Late Payment
  inv_late_interest: 'Late payment interest may be charged on overdue invoices',
  inv_debt_recovery:
    'We reserve the right to recover debt collection costs under the Late Payment of Commercial Debts Act',
  inv_credit_hold: 'Future work may be suspended if invoices remain unpaid',
  // Warranty & Guarantees
  inv_workmanship: 'All workmanship guaranteed as per original quotation',
  inv_compliance: 'All work complies with BS 7671 (18th Edition)',
  inv_certificates: 'Relevant certificates have been provided separately',
  // General
  inv_queries: 'Queries to be raised within 7 days of invoice date',
  inv_thank_you: 'Thank you for your business',
};

// Default T&Cs options for electrical contractors - must match frontend QuoteSettingsCard.tsx
const DEFAULT_TERMS_MAP: Record<string, string> = {
  // Payment Terms
  payment_30: 'Payment due within 30 days of invoice date',
  payment_14: 'Payment due within 14 days of invoice date',
  payment_on_completion: 'Payment due upon completion of works',
  deposit_required: 'A deposit of the specified percentage is required before work commences',
  additional_charges:
    'Additional work not included in this quote will be charged at our standard hourly rate',
  late_payment:
    'Late payments may incur interest charges as per the Late Payment of Commercial Debts Act',
  payment_methods: 'We accept bank transfer, card payments, and cash',
  // Warranty & Guarantee
  warranty_workmanship: 'All workmanship is guaranteed for the warranty period specified',
  warranty_materials: 'Materials are covered by manufacturer warranties where applicable',
  warranty_callback: 'Free callback within warranty period for any defects in our workmanship',
  warranty_exclusions:
    'Warranty excludes damage caused by misuse, third-party interference, or acts of nature',
  // Compliance & Certification
  bs7671_compliance: 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations',
  part_p_notification: 'Building control notification (Part P) included where required',
  testing_cert:
    'Electrical installation certificate or minor works certificate provided on completion',
  competent_person:
    'All work carried out by qualified electricians registered with a competent person scheme',
  insurance: 'Fully insured for public liability and professional indemnity',
  // Site Access & Safety
  access_required: 'Clear access to work areas must be provided',
  power_isolation:
    'Power may need to be isolated during installation - advance notice will be given',
  site_safety: 'Work area will be left safe and clean at the end of each working day',
  asbestos_disclaimer:
    'This quote excludes work involving asbestos - if discovered, work will stop pending survey',
  parking: 'Suitable parking should be available close to the property',
  working_hours: 'Standard working hours are 8am-5pm Monday to Friday unless otherwise agreed',
  // General Conditions
  price_validity: 'This quotation is valid for the number of days specified from the date of issue',
  cancellation: 'Cancellation within 48 hours of scheduled work may incur charges',
  unforeseen_works: 'Unforeseen works discovered during installation will be quoted separately',
  price_subject: 'Prices are subject to change if scope of work differs from description',
  materials_ownership: 'All materials remain our property until paid for in full',
  variations: 'Any variations to the agreed scope must be confirmed in writing',
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
          const customTerm = parsed.custom.find(
            (t: { id: string; label: string }) => t.id === termId
          );
          if (customTerm?.label) {
            terms.push(customTerm.label);
          }
        }
      }
      return terms.length > 0
        ? terms
        : [
            DEFAULT_TERMS_MAP['payment_30'],
            DEFAULT_TERMS_MAP['warranty_workmanship'],
            DEFAULT_TERMS_MAP['bs7671_compliance'],
          ];
    }

    // Legacy format: plain text (split by newlines)
    if (typeof quoteTermsJson === 'string' && !quoteTermsJson.startsWith('{')) {
      return quoteTermsJson.split('\n').filter((line) => line.trim());
    }

    // Fallback
    return [
      DEFAULT_TERMS_MAP['payment_30'],
      DEFAULT_TERMS_MAP['warranty_workmanship'],
      DEFAULT_TERMS_MAP['bs7671_compliance'],
    ];
  } catch {
    // If parsing fails, treat as legacy plain text
    return quoteTermsJson.split('\n').filter((line) => line.trim());
  }
}

// Build invoice terms list from stored JSON format
function buildInvoiceTermsList(invoiceTermsJson: string | null): string[] {
  if (!invoiceTermsJson) {
    // Return sensible defaults if no terms configured
    return [
      DEFAULT_INVOICE_TERMS_MAP['inv_payment_due'],
      DEFAULT_INVOICE_TERMS_MAP['inv_use_reference'],
      DEFAULT_INVOICE_TERMS_MAP['inv_late_interest'],
      DEFAULT_INVOICE_TERMS_MAP['inv_workmanship'],
      DEFAULT_INVOICE_TERMS_MAP['inv_compliance'],
      DEFAULT_INVOICE_TERMS_MAP['inv_queries'],
    ];
  }

  try {
    const parsed = JSON.parse(invoiceTermsJson);
    const terms: string[] = [];

    // Handle JSON format: { selected: string[], custom: {id: string, label: string}[] }
    if (parsed.selected && Array.isArray(parsed.selected)) {
      for (const termId of parsed.selected) {
        // Check if it's a default term
        if (DEFAULT_INVOICE_TERMS_MAP[termId]) {
          terms.push(DEFAULT_INVOICE_TERMS_MAP[termId]);
        }
        // Check if it's a custom term
        else if (termId.startsWith('inv_custom_') && parsed.custom) {
          const customTerm = parsed.custom.find(
            (t: { id: string; label: string }) => t.id === termId
          );
          if (customTerm?.label) {
            terms.push(customTerm.label);
          }
        }
      }
      return terms.length > 0
        ? terms
        : [
            DEFAULT_INVOICE_TERMS_MAP['inv_payment_due'],
            DEFAULT_INVOICE_TERMS_MAP['inv_use_reference'],
            DEFAULT_INVOICE_TERMS_MAP['inv_late_interest'],
          ];
    }

    // Fallback
    return [
      DEFAULT_INVOICE_TERMS_MAP['inv_payment_due'],
      DEFAULT_INVOICE_TERMS_MAP['inv_late_interest'],
      DEFAULT_INVOICE_TERMS_MAP['inv_workmanship'],
    ];
  } catch {
    // If parsing fails, return defaults
    return [
      DEFAULT_INVOICE_TERMS_MAP['inv_payment_due'],
      DEFAULT_INVOICE_TERMS_MAP['inv_use_reference'],
      DEFAULT_INVOICE_TERMS_MAP['inv_late_interest'],
    ];
  }
}

// ELE-888 + ELE-891 — adjustment helpers (kept inline; deno can't import @/utils)
function applyItemAdjustment(item: any) {
  const qty = parseFloat(item.quantity) || 0;
  const rawUnit = parseFloat(item.unitPrice) || parseFloat(item.unit_price) || 0;
  const adj =
    typeof item.itemAdjustmentPercent === 'number' ? item.itemAdjustmentPercent : 0;
  const effectiveUnit = adj !== 0 ? rawUnit * (1 + adj / 100) : rawUnit;
  const effectiveTotal = qty * effectiveUnit;
  let description = item.description || item.name || '';
  if (adj !== 0) {
    const sign = adj > 0 ? '+' : '';
    const note = item.itemAdjustmentLabel
      ? `${sign}${adj}% · ${item.itemAdjustmentLabel}`
      : `${sign}${adj}%`;
    description = `${description}\n(${note})`;
  }
  return { effectiveUnit, effectiveTotal, description, adj, label: item.itemAdjustmentLabel };
}

function buildCategoryAdjustments(
  items: Array<{ category: string; effectiveTotal: number }>,
  settings: any
): Array<{ category: string; percent: number; delta: number; label: string }> {
  const cats: Record<string, number> = {};
  for (const i of items) {
    const c = i.category || 'manual';
    cats[c] = (cats[c] || 0) + i.effectiveTotal;
  }
  const adj = settings?.categoryAdjustments || {};
  const out: Array<{ category: string; percent: number; delta: number; label: string }> = [];
  for (const [cat, subtotal] of Object.entries(cats)) {
    const pct = typeof adj[cat] === 'number' ? adj[cat] : 0;
    if (pct !== 0) {
      const delta = subtotal * (pct / 100);
      out.push({
        category: cat,
        percent: pct,
        delta,
        label: `${cat.charAt(0).toUpperCase() + cat.slice(1)} ${pct > 0 ? 'markup' : 'discount'} (${pct > 0 ? '+' : ''}${pct}%)`,
      });
    }
  }
  return out;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Verify PDF Monkey API key is configured
    if (!PDFMONKEY_API_KEY) {
      console.error('[PDF-MONKEY] API key not configured');
      return new Response(JSON.stringify({ error: 'PDF Monkey API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const {
      quote,
      companyProfile,
      invoice_mode,
      briefing,
      briefing_mode,
      documentId: requestDocumentId,
      mode,
      force_regenerate,
    } = await req.json();
    // Use data passed directly from the update - it's already fresh from database
    // No need to re-fetch - the quote passed in is returned immediately after transaction commits
    const freshQuote = quote;
    const freshCompanyProfile = companyProfile;

    // ELE-956 — for v2+ quotes, compute the variation diff (added /
    // removed / changed line items) so the PDF template can render
    // "what changed since v{n-1}" the same way the email + public web
    // view do. Failure is non-fatal — the PDF still renders without
    // the diff block.
    let variationDiff: {
      hasChanges: boolean;
      added: Array<Record<string, unknown>>;
      removed: Array<Record<string, unknown>>;
      changed: Array<{
        itemId: string;
        description: string;
        changedFields: string[];
        totalDelta: number;
      }>;
      totalDelta: number;
    } | null = null;
    try {
      if (
        (freshQuote?.version_number || 1) > 1 &&
        freshQuote?.supersedes_id
      ) {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (supabaseUrl && serviceKey) {
          const sb = createClient(supabaseUrl, serviceKey);
          const { data: prev } = await sb
            .from('quotes')
            .select('items')
            .eq('id', freshQuote.supersedes_id)
            .maybeSingle();
          const prevItems = Array.isArray(prev?.items) ? prev.items : [];
          const currentItems = Array.isArray(freshQuote.items) ? freshQuote.items : [];
          const prevById = new Map(prevItems.map((i: { id: string }) => [i.id, i]));
          const currentById = new Map(currentItems.map((i: { id: string }) => [i.id, i]));

          const added: Array<Record<string, unknown>> = [];
          const changed: Array<{
            itemId: string;
            description: string;
            changedFields: string[];
            totalDelta: number;
          }> = [];
          for (const cur of currentItems) {
            const prevRow = prevById.get(cur.id) as Record<string, unknown> | undefined;
            if (!prevRow) {
              added.push(cur);
            } else {
              const fields: string[] = [];
              if (prevRow.description !== cur.description) fields.push('description');
              if (Number(prevRow.quantity || 0) !== Number(cur.quantity || 0))
                fields.push('quantity');
              if (Number(prevRow.unitPrice || 0) !== Number(cur.unitPrice || 0))
                fields.push('unitPrice');
              if (fields.length > 0) {
                const delta =
                  Number(cur.totalPrice || 0) - Number(prevRow.totalPrice || 0);
                changed.push({
                  itemId: String(cur.id),
                  description: String(cur.description || ''),
                  changedFields: fields,
                  totalDelta: delta,
                });
              }
            }
          }
          const removed = prevItems.filter(
            (i: { id: string }) => !currentById.has(i.id)
          );
          const totalDelta =
            added.reduce((s, i) => s + Number((i as { totalPrice?: number }).totalPrice || 0), 0) -
            removed.reduce(
              (s: number, i: { totalPrice?: number }) => s + Number(i.totalPrice || 0),
              0
            ) +
            changed.reduce((s, c) => s + c.totalDelta, 0);

          variationDiff = {
            hasChanges: added.length + removed.length + changed.length > 0,
            added,
            removed,
            changed,
            totalDelta,
          };
        }
      }
    } catch (diffErr) {
      console.warn('[PDF-MONKEY] variation diff lookup failed (non-fatal):', diffErr);
    }

    // Validation: ensure required data is present for quote/invoice mode
    if ((invoice_mode || !briefing_mode) && !quote?.id) {
      console.error('[PDF-MONKEY] Missing quote data');
      return new Response(JSON.stringify({ error: 'Quote data is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Status-only polling mode: skip creation and just check an existing document
    if (requestDocumentId && (mode === 'status' || (!quote && !briefing))) {
      try {
        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${requestDocumentId}`,
          {
            headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}` },
          }
        );
        if (!statusResponse.ok) {
          const err = await statusResponse.text();
          console.error('[PDF-MONKEY] Status-check error:', statusResponse.status, err);
          return new Response(
            JSON.stringify({ success: false, status: 'unknown', documentId: requestDocumentId }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        const statusData = await statusResponse.json();
        const status = statusData.document?.status;
        if (status === 'success') {
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({
            success: false,
            status: status || 'generating',
            documentId: requestDocumentId,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (e) {
        console.error('[PDF-MONKEY] Status-check exception:', e);
        return new Response(
          JSON.stringify({ success: false, status: 'error', documentId: requestDocumentId }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    if (briefing_mode) {
      if (!briefing || !briefing.briefing_name) {
        console.error('[PDF-MONKEY] Invalid briefing data - missing required fields');
        return new Response(
          JSON.stringify({
            error: 'Briefing data is incomplete. Missing briefing name or other required fields.',
            received: briefing,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      if (!freshQuote) {
        return new Response(JSON.stringify({ error: 'Quote/Invoice data is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Select template based on mode and briefing type
    let TEMPLATE_ID: string;
    if (briefing_mode) {
      const briefingType = briefing?.briefing_type || 'general';
      TEMPLATE_ID =
        BRIEFING_TEMPLATES[briefingType as keyof typeof BRIEFING_TEMPLATES] ||
        BRIEFING_TEMPLATES['general'];
    } else {
      TEMPLATE_ID = invoice_mode ? INVOICE_TEMPLATE_ID : QUOTE_TEMPLATE_ID;
    }

    // Transform data based on mode
    let payload;
    if (briefing_mode) {
      // Transform briefing data for PDF
      const transformedBriefing = {
        company_logo: companyProfile?.logo_url || companyProfile?.logo_data_url || '',
        company_name: companyProfile?.company_name || 'Professional Contractor',
        company_address: companyProfile?.company_address || '',
        company_phone: companyProfile?.company_phone || '',
        company_email: companyProfile?.company_email || '',

        briefing_title: briefing.briefing_name,
        job_name: briefing.job_name || briefing.briefing_name,
        location: briefing.location,
        briefing_date: new Date(briefing.briefing_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        briefing_time: briefing.briefing_time,
        conductor_name: briefing.conductor_name || briefing.created_by_name,
        contractor_company: briefing.contractor_company || companyProfile?.company_name || '',
        created_by: briefing.created_by_name,

        // Use structured AI data directly from ai_prompt_data (with fallback parsing)
        briefing_overview: {
          paragraphs:
            briefing.ai_prompt_data?.aiContent?.briefingOverview ||
            (briefing.briefing_description || briefing.notes || '')
              .split('\n\n')
              .filter((p) => p.trim())
              .map((p, i) => ({
                paragraph: i + 1,
                content: p.trim(),
                type: i === 0 ? 'introduction' : 'context',
              })),
        },

        hazards_and_controls: {
          structured:
            briefing.ai_prompt_data?.aiContent?.hazardsAndControls ||
            (briefing.hazards || '')
              .split(/---+/)
              .filter((h) => h.trim())
              .map((h, i) => {
                const lines = h.trim().split('\n');
                const hazardMatch = lines[0]?.match(/\*\*Hazard \d+: (.+?)\*\*/);
                const riskMatch = h.match(/\*\*Risk Level:\*\*\s*(\w+)/);
                return {
                  hazardId: i + 1,
                  hazardName: hazardMatch?.[1] || `Hazard ${i + 1}`,
                  description: lines.slice(1).join(' ').substring(0, 200),
                  riskLevel: riskMatch?.[1] || 'MEDIUM',
                  controls: h.match(/- (.+?)(?=\n|$)/g)?.map((c) => c.replace(/^- /, '')) || [],
                };
              }),
          count: briefing.ai_prompt_data?.aiContent?.hazardsAndControls?.length || 0,
        },

        safety_warning: briefing.ai_prompt_data?.aiContent?.safetyWarning || {
          level: 'CAUTION',
          headline: 'Safety Precautions Required',
          details: (briefing.safety_warning || '')
            .match(/- (.+?)(?=\n|$)/g)
            ?.map((b) => b.replace(/^- /, '')) || [briefing.safety_warning || ''],
        },

        equipment_required: briefing.ai_prompt_data?.aiContent?.equipmentRequired || [],

        key_regulations: briefing.ai_prompt_data?.aiContent?.keyRegulations || [],

        additional_info: {
          paragraphs:
            briefing.ai_prompt_data?.aiContent?.additionalInfo ||
            (briefing.notes || '')
              .split('\n\n')
              .filter((p) => p.trim())
              .map((p, i) => ({
                paragraph: i + 1,
                content: p.trim(),
                type: 'detail',
              })),
        },

        additional_notes: briefing.notes || '',

        photos: (briefing.photos || []).map((p: any) => ({
          url: p.url,
          caption: p.caption || 'Reference photo',
        })),

        generation_timestamp: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };

      payload = transformedBriefing;
    } else if (invoice_mode) {
      // Transform to invoice format - USE FRESH DATA
      // Use bank details from invoice settings first, fallback to company profile
      const bankDetails =
        freshQuote?.settings?.bankDetails || freshCompanyProfile?.bank_details || {};

      const transformedCompanyProfile = {
        logo_url: freshCompanyProfile?.logo_url || '',
        logo_width: freshCompanyProfile?.logo_width || null,
        logo_height: freshCompanyProfile?.logo_height || null,
        company_name: freshCompanyProfile?.company_name || '',
        company_address: freshCompanyProfile?.company_address
          ? `${freshCompanyProfile.company_address}${freshCompanyProfile.company_postcode ? '\n' + freshCompanyProfile.company_postcode : ''}`
          : '',
        company_phone: freshCompanyProfile?.company_phone || '',
        company_email: freshCompanyProfile?.company_email || '',
        company_website: freshCompanyProfile?.company_website || '',
        vat_number: freshCompanyProfile?.vat_number || '',
        company_registration: freshCompanyProfile?.company_registration || '',
        bank_name: bankDetails?.bankName || bankDetails?.bank_name || '',
        account_name:
          bankDetails?.accountName ||
          bankDetails?.account_name ||
          freshCompanyProfile?.company_name ||
          '',
        account_number: bankDetails?.accountNumber || bankDetails?.account_number || '',
        sort_code: bankDetails?.sortCode || bankDetails?.sort_code || '',
        payment_terms: freshQuote?.settings?.paymentTerms || '30 days',
      };

      // Use client_data from database (snake_case) as primary source since that's what's saved
      const clientData = freshQuote?.client_data || freshQuote?.client || {};

      // Check if summary view is enabled
      const showSummaryView = freshQuote?.settings?.showSummaryView || false;

      // Process items - either detailed or summary view
      let processedItems: Array<{
        name: string;
        description: string;
        quantity: number;
        unit: string;
        unitPrice: number;
      }>;

      // ELE-888 — pre-compute item-adjusted versions of every line for both views
      // ELE-970 — invoices store user-added lines in additional_invoice_items; merge so PDF
      // renders every line, regardless of whether the caller pre-merged on the client.
      const invoiceItems = [
        ...(freshQuote?.items || []),
        ...(freshQuote?.additional_invoice_items || []),
      ];
      const adjustedRawItems = invoiceItems.map((item: any) => {
        const a = applyItemAdjustment(item);
        const qty = item.actualQuantity !== undefined ? item.actualQuantity : (parseFloat(item.quantity) || 0);
        return {
          raw: item,
          category: item.category || 'manual',
          quantity: qty,
          unitPrice: a.effectiveUnit,
          totalPrice: qty * a.effectiveUnit,
          description: a.description,
          adjustmentPercent: a.adj,
          adjustmentLabel: a.label,
        };
      });

      // Customer-facing markup-absorption — same toggle as the quote flow.
      // When the electrician has opted to hide their per-category markup,
      // bake it into each line's unit/total price BEFORE processedItems
      // and categoryTotals are built so the customer sees one combined
      // price per line and the subtotal reconciles. The category-adjustment
      // totals lines are short-circuited to empty further down.
      const invHideMarkupFromCustomer =
        freshQuote?.settings?.hideMarkupFromCustomer === true;
      if (invHideMarkupFromCustomer) {
        const adj = freshQuote?.settings?.categoryAdjustments || {};
        for (const it of adjustedRawItems) {
          const pct = typeof adj[it.category] === 'number' ? adj[it.category] : 0;
          if (pct !== 0) {
            const multiplier = 1 + pct / 100;
            it.unitPrice = Math.round(it.unitPrice * multiplier * 100) / 100;
            it.totalPrice = Math.round(it.totalPrice * multiplier * 100) / 100;
          }
        }
      }

      if (showSummaryView) {
        // Summary view: Group items by category (uses item-adjusted totals)
        const categoryTotals: Record<string, number> = {};
        const categoryLabels: Record<string, string> = {
          labour: 'Labour',
          materials: 'Materials',
          equipment: 'Equipment Hire',
          manual: 'Other',
        };

        for (const it of adjustedRawItems) {
          if (!categoryTotals[it.category]) categoryTotals[it.category] = 0;
          categoryTotals[it.category] += it.totalPrice;
        }

        // Build summary items in order
        const categoryOrder = ['labour', 'materials', 'equipment', 'manual'];
        processedItems = categoryOrder
          .filter((cat) => categoryTotals[cat] && categoryTotals[cat] > 0)
          .map((category) => ({
            name: categoryLabels[category] || category,
            description: '',
            quantity: 1,
            unit: 'lot',
            unitPrice: categoryTotals[category],
          }));

      } else {
        // Detailed view: Show all items individually with adjustments applied.
        // ELE-T-inv-extra — also surface labour breakdown (hours/rate/worker)
        // and subcategory on the line so the template can show "8h × £45/hr"
        // beneath the description.
        processedItems = adjustedRawItems.map((it) => ({
          name: it.description,
          description: it.raw.notes || '',
          quantity: it.quantity,
          unit: it.raw.unit || 'each',
          unitPrice: it.unitPrice,
          totalPrice: it.totalPrice,
          category: it.category,
          subcategory: it.raw.subcategory || '',
          workerType: it.raw.workerType || it.raw.worker_type || '',
          hours: parseFloat(it.raw.hours) || 0,
          hourlyRate:
            parseFloat(it.raw.hourlyRate) || parseFloat(it.raw.hourly_rate) || 0,
          itemAdjustmentPercent: it.adjustmentPercent || 0,
          itemAdjustmentLabel: it.adjustmentLabel || '',
        }));
      }

      // ELE-888 + ELE-891 — also expose category-keyed arrays for templates
      // that group items by category (parity with quote template)
      const invLabourItems = processedItems.filter((i: any) => i.category === 'labour');
      const invMaterialItems = processedItems.filter((i: any) => i.category === 'materials');
      const invEquipmentItems = processedItems.filter((i: any) => i.category === 'equipment');
      const invManualItems = processedItems.filter((i: any) => i.category === 'manual');

      const transformedInvoice = {
        invoiceNumber: freshQuote?.invoice_number || '',
        createdAt: freshQuote?.invoice_date
          ? new Date(freshQuote.invoice_date).toISOString().split('T')[0]
          : '',
        dueDate: freshQuote?.invoice_due_date
          ? new Date(freshQuote.invoice_due_date).toISOString().split('T')[0]
          : '',
        purchaseOrder: freshQuote?.purchase_order || '',
        // Paid status (template renders the "✓ Paid in Full" banner +
        // metadata when set). Reads new column names from the invoices
        // table, then falls back to legacy invoice_* names on quotes
        // table for backwards compat with the pre-March-2026 dual-write.
        isPaid:
          freshQuote?.status === 'paid' ||
          freshQuote?.invoice_status === 'paid',
        paidAt: (freshQuote?.paid_at || freshQuote?.invoice_paid_at)
          ? new Date(freshQuote.paid_at || freshQuote.invoice_paid_at).toLocaleDateString(
              'en-GB',
              { day: '2-digit', month: '2-digit', year: 'numeric' }
            )
          : null,
        paymentMethod: freshQuote?.payment_method || freshQuote?.invoice_payment_method || null,
        paymentReference:
          freshQuote?.payment_reference || freshQuote?.invoice_payment_reference || null,
        // Booking info (mirrors the quote payload). When the parent
        // quote had a slot booked via /book/...?quote=..., that info
        // carries to the invoice so the PDF shows "Work Carried Out:
        // Tue 21 May 09:00".
        isBooked: !!(freshQuote?.booked_slot_start && freshQuote?.booked_slot_end),
        bookedSlotStart: freshQuote?.booked_slot_start
          ? new Date(freshQuote.booked_slot_start).toLocaleString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : null,
        bookedSlotEnd: freshQuote?.booked_slot_end
          ? new Date(freshQuote.booked_slot_end).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : null,
        client: {
          name: clientData?.name || '',
          contactName: clientData?.contactName || '',
          address: clientData?.address
            ? `${clientData.address}${clientData?.postcode ? '\n' + clientData.postcode : ''}`
            : '',
          postcode: clientData?.postcode || '',
          email: clientData?.email || '',
          phone: clientData?.phone || '',
        },
        jobDetails: {
          title: freshQuote?.jobDetails?.title || freshQuote?.job_details?.title || '',
          description:
            freshQuote?.jobDetails?.description || freshQuote?.job_details?.description || '',
          location: freshQuote?.jobDetails?.location || freshQuote?.job_details?.location || '',
          estimatedDuration:
            freshQuote?.jobDetails?.estimatedDuration ||
            freshQuote?.job_details?.estimatedDuration ||
            '',
          customDuration:
            freshQuote?.jobDetails?.customDuration || freshQuote?.job_details?.customDuration || '',
          workStartDate:
            freshQuote?.jobDetails?.workStartDate || freshQuote?.job_details?.workStartDate || '',
          specialRequirements:
            freshQuote?.jobDetails?.specialRequirements ||
            freshQuote?.job_details?.specialRequirements ||
            '',
          completionDate: freshQuote?.work_completion_date
            ? new Date(freshQuote.work_completion_date).toISOString().split('T')[0]
            : '',
          reference:
            freshQuote?.jobDetails?.reference ||
            freshQuote?.job_details?.reference ||
            freshQuote?.quote_number ||
            '',
        },
        items: processedItems,
        notes: freshQuote?.invoice_notes || freshQuote?.notes || '',
        showSummaryView: showSummaryView,
        // ELE-T-inv-extra — Stripe pay-now link (template renders a CTA
        // block when present and the invoice is unpaid). Column lives
        // directly on invoices.stripe_payment_link_url.
        payLink:
          (freshQuote as Record<string, unknown> | null)?.stripe_payment_link_url || null,
        // ELE-T-inv-extra — partial payment surfacing (totalPaid is
        // numeric pennies on the row; partialPayments is a JSONB array
        // of past payment events). Used when invoice is partially paid
        // but not fully settled — template shows "Paid £X of £Y so far".
        totalPaidFormatted: (() => {
          const tp = Number(
            (freshQuote as Record<string, unknown> | null)?.total_paid || 0
          );
          return tp > 0 ? `£${(tp / 100).toFixed(2)}` : null;
        })(),
        totalPaidPence: Number(
          (freshQuote as Record<string, unknown> | null)?.total_paid || 0
        ),
        partialPayments:
          ((freshQuote as Record<string, unknown> | null)
            ?.partial_payments as unknown[]) || [],
        // ELE-T-inv-extra — linked certificate (when invoice has a cert
        // attached, template shows a small "Certificate attached" callout
        // with the cert reference + type).
        linkedCertificate:
          (freshQuote as Record<string, unknown> | null)?.linked_certificate_id
            ? {
                id: (freshQuote as Record<string, unknown>).linked_certificate_id,
                reference: (freshQuote as Record<string, unknown>)
                  .linked_certificate_reference,
                type: (freshQuote as Record<string, unknown>).linked_certificate_type,
                pdfUrl: (freshQuote as Record<string, unknown>)
                  .linked_certificate_pdf_url,
              }
            : null,
      };

      // ELE-888 + ELE-891 — calculate totals using item-adjusted lines + per-category
      const settings = freshQuote?.settings || {};
      const itemAdjustedInvSubtotal = adjustedRawItems.reduce(
        (sum, it) => sum + it.totalPrice,
        0
      );
      // When hideMarkupFromCustomer is on, the markup is already baked
      // into adjustedRawItems above — skip the explicit category-adjustment
      // lines so the template doesn't render them AND we don't double-count.
      const invCategoryAdjustments = invHideMarkupFromCustomer
        ? []
        : buildCategoryAdjustments(
            adjustedRawItems.map((i) => ({ category: i.category, effectiveTotal: i.totalPrice })),
            settings
          );
      const invCategoryAdjustmentDelta = invCategoryAdjustments.reduce(
        (sum, c) => sum + c.delta,
        0
      );
      const itemsSubtotal = itemAdjustedInvSubtotal + invCategoryAdjustmentDelta;

      const overhead = itemsSubtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (itemsSubtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const invoiceSubtotalWithMarkups = itemsSubtotal + overhead + profit;

      // Discount/deduction (CIS etc.) — same logic as quotes
      const invDiscountEnabled = settings.discountEnabled || false;
      const invDiscountType = settings.discountType || 'percentage';
      const invDiscountValue = parseFloat(settings.discountValue) || 0;
      const invDiscountLabel =
        settings.discountLabel ||
        (invDiscountType === 'percentage' ? `Discount (${invDiscountValue}%)` : 'Discount');
      const invDiscountAmount = invDiscountEnabled
        ? invDiscountType === 'percentage'
          ? invoiceSubtotalWithMarkups * (invDiscountValue / 100)
          : Math.min(invDiscountValue, invoiceSubtotalWithMarkups)
        : 0;
      const invNetAfterDiscount = invoiceSubtotalWithMarkups - invDiscountAmount;

      // VAT reverse charge (DRC): charge £0 VAT; customer accounts to HMRC.
      const invReverseCharge = !!settings.reverseCharge;
      const vatAmount =
        settings.vatRegistered && !invReverseCharge
          ? invNetAfterDiscount * ((settings.vatRate || 20) / 100)
          : 0;
      const total = invNetAfterDiscount + vatAmount;

      // CIS deduction (labour only, ex-VAT) + reverse-charge notional VAT.
      // Mirrors src/utils/quote-calculations.ts so the PDF matches the screen.
      const round2cis = (n: number) => Math.round(n * 100) / 100;
      const invLabourItemAdjusted = adjustedRawItems
        .filter((i: any) => i.category === 'labour')
        .reduce((s: number, i: any) => s + (i.totalPrice || 0), 0);
      const invLabourCatPct = invHideMarkupFromCustomer
        ? 0
        : settings.categoryAdjustments?.labour || 0;
      const invLabourFinal = invLabourItemAdjusted * (1 + invLabourCatPct / 100);
      const invLabourNet = itemsSubtotal > 0 ? invNetAfterDiscount * (invLabourFinal / itemsSubtotal) : 0;
      const invCisEnabled = !!settings.cisEnabled;
      const invCisRate = invCisEnabled ? Number(settings.cisRate) || 0 : 0;
      const invCisAmount = invCisEnabled ? round2cis(invLabourNet * (invCisRate / 100)) : 0;
      const invNotionalVat = invReverseCharge ? round2cis(invNetAfterDiscount * ((settings.vatRate || 20) / 100)) : 0;
      const invNetPayable = round2cis(total - invCisAmount);

      // ELE-954 — "Deposit paid" summary. Resolved from (in priority):
      //   1. invoice settings.depositApplied (set on quote→invoice conversion)
      //   2. invoice row's own deposit_paid_at / deposit_amount_pennies
      //      (legacy, when fields were copied directly onto the invoice)
      //   3. parent quote lookup via parent_quote_id (catches invoices
      //      that don't carry deposit info themselves)
      // Returns null when there's no deposit on the chain, in which
      // case the totals row + "Balance Due" treatment skip.
      const invForDeposit = freshQuote as Record<string, unknown> | null;
      let depositPaidIso: string | null = null;
      let depositPaidPennies = 0;
      let depositInvoiceIdRef: string | null = null;

      const settingsDepositApplied =
        (invForDeposit?.settings as Record<string, unknown> | undefined)?.depositApplied as
          | { paidAt?: string; amount?: number; depositInvoiceId?: string }
          | undefined;
      if (settingsDepositApplied?.paidAt && Number(settingsDepositApplied.amount) > 0) {
        depositPaidIso = settingsDepositApplied.paidAt;
        depositPaidPennies = Math.round(Number(settingsDepositApplied.amount) * 100);
        depositInvoiceIdRef = settingsDepositApplied.depositInvoiceId || null;
      } else if (invForDeposit?.deposit_paid_at) {
        depositPaidIso = invForDeposit.deposit_paid_at as string;
        depositPaidPennies = Number(invForDeposit.deposit_amount_pennies || 0);
        depositInvoiceIdRef = (invForDeposit.deposit_invoice_id as string | null) || null;
      } else if (invForDeposit?.parent_quote_id) {
        // Last resort — fetch the parent quote for deposit info. Cheap
        // single-row lookup, non-fatal on failure.
        try {
          const supabaseUrl = Deno.env.get('SUPABASE_URL');
          const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
          if (supabaseUrl && serviceKey) {
            const sb = createClient(supabaseUrl, serviceKey);
            const { data: parent } = await sb
              .from('quotes')
              .select('deposit_paid_at, deposit_amount_pennies, deposit_invoice_id')
              .eq('id', invForDeposit.parent_quote_id as string)
              .maybeSingle();
            if (parent?.deposit_paid_at && Number(parent.deposit_amount_pennies) > 0) {
              depositPaidIso = parent.deposit_paid_at as string;
              depositPaidPennies = Number(parent.deposit_amount_pennies);
              depositInvoiceIdRef = (parent.deposit_invoice_id as string | null) || null;
            }
          }
        } catch (e) {
          console.warn('[PDF-MONKEY] parent-quote deposit lookup failed:', e);
        }
      }

      const depositPaidSummary =
        depositPaidIso && depositPaidPennies > 0
          ? {
              amount: depositPaidPennies / 100,
              amountFormatted: `£${(depositPaidPennies / 100).toFixed(2)}`,
              paidAt: new Date(depositPaidIso).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
              depositInvoiceId: depositInvoiceIdRef,
            }
          : null;

      // Balance due = total minus any deposit already paid. When no
      // deposit, balanceDue == total (and the template falls back to
      // showing "Amount Due" with total).
      const depositAmt = depositPaidSummary?.amount || 0;
      const balanceDue = Math.max(0, total - depositAmt);

      // ELE-T-inv-extra — three extra lookups (parent quote number,
      // deposit invoice number, view tracking). All non-fatal — if any
      // fail the template just skips the corresponding block.
      let parentQuoteNumber: string | null = null;
      let depositInvoiceNumber: string | null = null;
      let lastViewedAt: string | null = null;
      let viewCount = 0;
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (supabaseUrl && serviceKey) {
          const sb = createClient(supabaseUrl, serviceKey);
          const invRow = freshQuote as Record<string, unknown> | null;

          // 1. Parent quote — for "Converted from Quote #..." header line
          if (invRow?.parent_quote_id) {
            const { data: pq } = await sb
              .from('quotes')
              .select('quote_number')
              .eq('id', invRow.parent_quote_id as string)
              .maybeSingle();
            parentQuoteNumber = (pq?.quote_number as string) || null;
          }

          // 2. Deposit invoice number — for "(Deposit Invoice #DEP-001)"
          //    reference next to the take-off totals row.
          if (depositInvoiceIdRef) {
            const { data: dep } = await sb
              .from('invoices')
              .select('invoice_number')
              .eq('id', depositInvoiceIdRef)
              .maybeSingle();
            depositInvoiceNumber = (dep?.invoice_number as string) || null;
          }

          // 3. Email open tracking — unified `email_opens` table keyed
          //    by entity_type + entity_id. Returns first/last opened
          //    timestamps and open count for the PDF footer.
          if (invRow?.id) {
            const { data: opens } = await sb
              .from('email_opens')
              .select('last_opened_at, open_count')
              .eq('entity_type', 'invoice')
              .eq('entity_id', invRow.id as string)
              .maybeSingle();
            if (opens?.last_opened_at) {
              lastViewedAt = new Date(opens.last_opened_at as string).toLocaleString(
                'en-GB',
                { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
              );
              viewCount = Number(opens.open_count || 0);
            }
          }
        }
      } catch (e) {
        console.warn('[PDF-MONKEY] invoice extra lookups failed:', e);
      }

      payload = {
        companyProfile: transformedCompanyProfile,
        invoice: {
          ...transformedInvoice,
          // Force calculated totals
          subtotal: itemsSubtotal,
          overhead: overhead,
          profit: profit,
          vatAmount: vatAmount,
          total: total,
          // CIS + VAT reverse charge (construction invoicing)
          reverseCharge: invReverseCharge,
          notionalVat: invNotionalVat,
          cisEnabled: invCisEnabled,
          cisRate: invCisRate,
          cisAmount: invCisAmount,
          netPayable: invNetPayable,
          // Nested summary (for templates that prefer the object) +
          // flat convenience fields (for templates that use them
          // directly — your invoice template above uses these).
          depositPaid: depositPaidSummary,
          depositPaidAt: depositPaidSummary?.paidAt || null,
          depositAmount: depositPaidSummary?.amount || null,
          depositAmountFormatted: depositPaidSummary?.amountFormatted || null,
          // Balance Due — total minus deposit. When no deposit, equals
          // total; when paid, shows the remaining amount the client owes.
          balanceDue,
          balanceDueFormatted: `£${balanceDue.toFixed(2)}`,
          // ELE-T-inv-extra — audit trail fields (lookups above).
          parentQuoteNumber,
          parentQuoteId:
            (freshQuote as Record<string, unknown> | null)?.parent_quote_id || null,
          depositInvoiceNumber,
          lastViewedAt,
          viewCount,
        },
        // Add explicit calculation fields for template
        calculations: {
          subtotal: itemsSubtotal,
          // ELE-888 + ELE-891 — adjustment surfacing for templates
          itemAdjustedSubtotal: itemAdjustedInvSubtotal,
          categoryAdjustments: invCategoryAdjustments,
          categoryAdjustmentDelta: invCategoryAdjustmentDelta,
          overhead: overhead,
          overheadPercentage: settings.overheadPercentage || 0,
          profit: profit,
          profitMargin: settings.profitMargin || 0,
          discountAmount: invDiscountAmount,
          discountLabel: invDiscountLabel,
          vatAmount: vatAmount,
          vatRate: settings.vatRate || 20,
          total: total,
          reverseCharge: invReverseCharge,
          notionalVat: invNotionalVat,
          cisEnabled: invCisEnabled,
          cisRate: invCisRate,
          cisAmount: invCisAmount,
          labourNet: invLabourNet,
          netPayable: invNetPayable,
        },
        // Branding settings for dynamic styling (same as quotes)
        branding: {
          primaryColor: freshCompanyProfile?.primary_color || '#1e40af',
          secondaryColor: freshCompanyProfile?.secondary_color || '#1F2937',
          accentColor: freshCompanyProfile?.accent_color || '#F59E0B',
        },
        // Professional credentials (scheme logo etc.)
        credentials: {
          registrationScheme: freshCompanyProfile?.registration_scheme || null,
          registrationNumber: freshCompanyProfile?.registration_number || null,
          schemeLogo:
            freshCompanyProfile?.registration_scheme_logo ||
            freshCompanyProfile?.scheme_logo_data_url ||
            null,
        },
        // Invoice-specific terms and settings
        terms: buildInvoiceTermsList(freshCompanyProfile?.invoice_terms || null),
        invoiceSettings: {
          latePaymentInterestRate: freshCompanyProfile?.late_payment_interest_rate || '8% p.a.',
          preferredPaymentMethod: freshCompanyProfile?.preferred_payment_method || 'Bank Transfer',
        },
        useVat: settings.vatRegistered === true,
        vatRate: settings.vatRate || 20,
        // Cache busting timestamp
        _cache_bust: Date.now(),
        _generated_at: new Date().toISOString(),
      };

    } else {
      // Get items from quote - handle both camelCase and snake_case
      const quoteItems = freshQuote?.items || [];
      const jobDetails = freshQuote?.jobDetails || freshQuote?.job_details || {};
      const clientData = freshQuote?.client || freshQuote?.client_data || {};
      const quoteSettings = freshQuote?.settings || {};

      // ELE-888 — apply per-item adjustments to unitPrice + annotate description
      const transformedItems = quoteItems.map((item: any) => {
        const a = applyItemAdjustment(item);
        return {
          id: item.id || '',
          description: a.description,
          quantity: parseFloat(item.quantity) || 1,
          unit: item.unit || 'each',
          unitPrice: a.effectiveUnit,
          totalPrice: a.effectiveTotal,
          category: item.category || 'manual',
          subcategory: item.subcategory || '',
          workerType: item.workerType || item.worker_type || '',
          hours: parseFloat(item.hours) || 0,
          hourlyRate: parseFloat(item.hourlyRate) || parseFloat(item.hourly_rate) || 0,
          notes: item.notes || '',
          itemAdjustmentPercent: a.adj || 0,
          itemAdjustmentLabel: a.label || '',
        };
      });

      // Item-adjusted subtotal (before per-category)
      const itemAdjustedSubtotal = transformedItems.reduce(
        (sum: number, item: any) => sum + (item.totalPrice || 0),
        0
      );

      // ELE-891 — per-category adjustments
      let categoryAdjustmentLines = buildCategoryAdjustments(
        transformedItems.map((i: any) => ({ category: i.category, effectiveTotal: i.totalPrice })),
        quoteSettings
      );
      const categoryAdjustmentDelta = categoryAdjustmentLines.reduce(
        (sum, c) => sum + c.delta,
        0
      );
      const itemsSubtotal = itemAdjustedSubtotal + categoryAdjustmentDelta;

      // Customer-facing markup-absorption (settings.hideMarkupFromCustomer).
      // When the electrician opted to hide their per-category markup, bake
      // it into each item's unit/total price and suppress the explicit
      // "X markup (+Y%)" lines on the PDF. The subtotal stays at
      // itemsSubtotal — which already equals the post-scale items sum, so
      // it still reconciles to the lines the customer sees.
      const hideMarkupFromCustomer = quoteSettings?.hideMarkupFromCustomer === true;
      if (hideMarkupFromCustomer) {
        const adj = quoteSettings?.categoryAdjustments || {};
        for (const item of transformedItems as any[]) {
          const pct = typeof adj[item.category] === 'number' ? adj[item.category] : 0;
          if (pct !== 0) {
            const multiplier = 1 + pct / 100;
            item.unitPrice = Math.round(item.unitPrice * multiplier * 100) / 100;
            item.totalPrice = Math.round(item.totalPrice * multiplier * 100) / 100;
          }
        }
        categoryAdjustmentLines = [];
      }

      // Group items by category for template (after any markup absorption)
      const labourItems = transformedItems.filter((item: any) => item.category === 'labour');
      const materialItems = transformedItems.filter((item: any) => item.category === 'materials');
      const equipmentItems = transformedItems.filter((item: any) => item.category === 'equipment');
      const manualItems = transformedItems.filter((item: any) => item.category === 'manual');

      const overhead = itemsSubtotal * ((quoteSettings.overheadPercentage || 0) / 100);
      const profit = (itemsSubtotal + overhead) * ((quoteSettings.profitMargin || 0) / 100);
      const subtotalWithMarkups = itemsSubtotal + overhead + profit;

      // Discount/deduction (CIS etc.)
      const discountEnabled = quoteSettings.discountEnabled || false;
      const discountType = quoteSettings.discountType || 'percentage';
      const discountValue = parseFloat(quoteSettings.discountValue) || 0;
      const discountLabel =
        quoteSettings.discountLabel ||
        (discountType === 'percentage' ? `Discount (${discountValue}%)` : 'Discount');
      const discountAmount = discountEnabled
        ? discountType === 'percentage'
          ? subtotalWithMarkups * (discountValue / 100)
          : Math.min(discountValue, subtotalWithMarkups)
        : 0;
      const netAfterDiscount = subtotalWithMarkups - discountAmount;

      // VAT reverse charge (DRC): subcontractor charges £0 VAT; customer
      // accounts to HMRC. We still expose the notional VAT below.
      const qReverseCharge = !!quoteSettings.reverseCharge;
      const vatAmount =
        quoteSettings.vatRegistered && !qReverseCharge
          ? parseFloat(freshQuote?.vat_amount) ||
            parseFloat(freshQuote?.vatAmount) ||
            netAfterDiscount * ((quoteSettings.vatRate || 20) / 100)
          : 0;
      const total = parseFloat(freshQuote?.total) || netAfterDiscount + vatAmount;

      // CIS deduction (labour only, ex-VAT) + reverse-charge notional VAT.
      // Mirrors src/utils/quote-calculations.ts (quotes don't apply O&P) so the
      // PDF matches the on-screen quote view. Net base = ex-VAT amount actually
      // charged (= stored total under reverse charge, since VAT is £0).
      const round2cis = (n: number) => Math.round(n * 100) / 100;
      const qNetBase = total - vatAmount;
      const qNotionalVat = qReverseCharge
        ? round2cis(qNetBase * ((quoteSettings.vatRate || 20) / 100))
        : 0;
      const qLabourItemAdjusted = labourItems.reduce(
        (s: number, i: any) => s + (i.totalPrice || 0),
        0
      );
      const qLabourCatPct = hideMarkupFromCustomer
        ? 0
        : quoteSettings.categoryAdjustments?.labour || 0;
      const qLabourFinal = qLabourItemAdjusted * (1 + qLabourCatPct / 100);
      const qLabourNet = itemsSubtotal > 0 ? qNetBase * (qLabourFinal / itemsSubtotal) : 0;
      const qCisEnabled = !!quoteSettings.cisEnabled;
      const qCisRate = qCisEnabled ? Number(quoteSettings.cisRate) || 0 : 0;
      const qCisAmount = qCisEnabled ? round2cis(qLabourNet * (qCisRate / 100)) : 0;
      const qNetPayable = round2cis(total - qCisAmount);

      // Calculate valid until date
      const validUntilDate =
        freshQuote?.expiryDate || freshQuote?.expiry_date
          ? new Date(freshQuote.expiryDate || freshQuote.expiry_date)
          : new Date(
              Date.now() + (freshCompanyProfile?.quote_validity_days || 30) * 24 * 60 * 60 * 1000
            );

      // Format dates
      const createdDate =
        freshQuote?.created_at || freshQuote?.createdAt
          ? new Date(freshQuote.created_at || freshQuote.createdAt)
          : new Date();

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
          createdAt: createdDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          validUntil: validUntilDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          status: freshQuote?.status || 'draft',
          notes: freshQuote?.notes || '',
          // Signature/acceptance data
          // ELE-975 — explicit opt-in flag so templates can render a blank
          // signature box even when the quote has not been accepted yet.
          showSignatureBox: !!freshQuote?.settings?.showSignatureBox,
          signature_url: freshQuote?.signature_url || null,
          acceptance_status: freshQuote?.acceptance_status || null,
          acceptance_method: freshQuote?.acceptance_method || null,
          accepted_at: freshQuote?.accepted_at
            ? new Date(freshQuote.accepted_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : null,
          accepted_by_name: freshQuote?.accepted_by_name || null,
          accepted_by_email: freshQuote?.accepted_by_email || null,
          // ELE-956 — variation / versioning surfaced for the PDF
          versionNumber: freshQuote?.version_number || 1,
          isVariation: (freshQuote?.version_number || 1) > 1,
          variationReason: freshQuote?.variation_reason || null,
          variationType: freshQuote?.variation_type || null,
          parentQuoteId: freshQuote?.parent_quote_id || null,
          supersedesId: freshQuote?.supersedes_id || null,
          // Full diff against the previous version when this is v2+.
          // Lists added/removed/changed items with the £ delta so the
          // PDF template can render a "what changed since v{n-1}" block
          // matching the email + public web view.
          variationDiff,
          // ELE-954 — deposit info (amount in £ for templates)
          depositRequired: !!freshQuote?.deposit_required,
          depositAmount:
            freshQuote?.deposit_amount_pennies
              ? freshQuote.deposit_amount_pennies / 100
              : null,
          depositAmountFormatted:
            freshQuote?.deposit_amount_pennies
              ? `£${(freshQuote.deposit_amount_pennies / 100).toFixed(2)}`
              : null,
          depositInvoiceId: freshQuote?.deposit_invoice_id || null,
          depositPaidAt: freshQuote?.deposit_paid_at
            ? new Date(freshQuote.deposit_paid_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : null,
          // ELE-955 — booked slot info
          isBooked:
            !!(freshQuote?.booked_slot_start && freshQuote?.booked_slot_end),
          bookedSlotStart: freshQuote?.booked_slot_start
            ? new Date(freshQuote.booked_slot_start).toLocaleString('en-GB', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : null,
          bookedSlotEnd: freshQuote?.booked_slot_end
            ? new Date(freshQuote.booked_slot_end).toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : null,
        },
        // Client details
        client: {
          name: clientData.name || '',
          email: clientData.email || '',
          phone: clientData.phone || '',
          address: clientData.address || '',
          postcode: clientData.postcode || '',
        },
        // Bank details on the quote payload too — needed when a deposit
        // is required and the electrician doesn't have Stripe Connect
        // active. Same shape as the invoice payload's bank fields so
        // a single template snippet works for both. Falls back to the
        // company profile when no per-quote override is set.
        bank_details: (() => {
          const bd =
            freshQuote?.settings?.bankDetails || freshCompanyProfile?.bank_details || {};
          return {
            bank_name: bd?.bankName || bd?.bank_name || '',
            account_name:
              bd?.accountName || bd?.account_name || freshCompanyProfile?.company_name || '',
            account_number: bd?.accountNumber || bd?.account_number || '',
            sort_code: bd?.sortCode || bd?.sort_code || '',
            payment_reference: freshQuote?.quote_number || '',
          };
        })(),
        // Job details
        jobDetails: {
          title: jobDetails.title || '',
          description: jobDetails.description || '',
          location: jobDetails.location || '',
          estimatedDuration: jobDetails.estimatedDuration || jobDetails.estimated_duration || '',
          customDuration: jobDetails.customDuration || jobDetails.custom_duration || '',
          workStartDate: jobDetails.workStartDate || jobDetails.work_start_date || '',
          specialRequirements:
            jobDetails.specialRequirements || jobDetails.special_requirements || '',
          reference:
            jobDetails.reference || freshQuote?.quote_number || freshQuote?.quoteNumber || '',
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
          // ELE-888 + ELE-891 — visibility of adjustments for templates
          itemAdjustedSubtotal: itemAdjustedSubtotal,
          categoryAdjustments: categoryAdjustmentLines,
          categoryAdjustmentDelta: categoryAdjustmentDelta,
          overhead: overhead,
          overheadPercentage: quoteSettings.overheadPercentage || 0,
          profit: profit,
          profitMargin: quoteSettings.profitMargin || 0,
          discountAmount: discountAmount,
          discountLabel: discountLabel,
          vatAmount: vatAmount,
          vatRate: quoteSettings.vatRate || 20,
          total: total,
          // Construction (CIS + VAT reverse charge)
          reverseCharge: qReverseCharge,
          notionalVat: qNotionalVat,
          cisEnabled: qCisEnabled,
          cisRate: qCisRate,
          cisAmount: qCisAmount,
          labourNet: qLabourNet,
          netPayable: qNetPayable,
          // Formatted currency strings
          subtotalFormatted: `£${itemsSubtotal.toFixed(2)}`,
          overheadFormatted: overhead > 0 ? `£${overhead.toFixed(2)}` : null,
          profitFormatted: profit > 0 ? `£${profit.toFixed(2)}` : null,
          discountFormatted: discountAmount > 0 ? `-£${discountAmount.toFixed(2)}` : null,
          vatFormatted: vatAmount > 0 ? `£${vatAmount.toFixed(2)}` : null,
          totalFormatted: `£${total.toFixed(2)}`,
          cisFormatted: qCisAmount > 0 ? `-£${qCisAmount.toFixed(2)}` : null,
          netPayableFormatted: qCisAmount > 0 ? `£${qNetPayable.toFixed(2)}` : null,
          notionalVatFormatted: qReverseCharge ? `£${qNotionalVat.toFixed(2)}` : null,
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
          quoteValidityDays: freshCompanyProfile?.quote_validity_days ?? 30,
          warrantyPeriod: freshCompanyProfile?.warranty_period || '12 months',
          depositPercentage: freshCompanyProfile?.deposit_percentage ?? 30,
          paymentTerms: freshCompanyProfile?.payment_terms || '30 days',
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
          schemeLogo:
            freshCompanyProfile?.registration_scheme_logo ||
            freshCompanyProfile?.scheme_logo_data_url ||
            null,
          insuranceProvider: freshCompanyProfile?.insurance_provider || null,
          insuranceCoverage: freshCompanyProfile?.insurance_coverage || null,
          qualifications: freshCompanyProfile?.inspector_qualifications || [],
        },
        // VAT settings
        useVat: quoteSettings.vatRegistered === true,
        vatRate: quoteSettings.vatRate || 20,
        // Linked certificate (if quote was created from an EICR/EIC/Minor Works cert)
        linkedCertificate: (freshQuote?.linked_certificate_id || freshQuote?.linked_certificate_type)
          ? {
              id: freshQuote?.linked_certificate_id || null,
              type: freshQuote?.linked_certificate_type || null,
              reference: freshQuote?.linked_certificate_reference || null,
              pdfUrl: freshQuote?.linked_certificate_pdf_url || null,
            }
          : null,
        // Cache busting timestamp
        _cache_bust: Date.now(),
        _generated_at: new Date().toISOString(),
      };
    }

    // Call PDF Monkey API
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          status: 'pending',
          payload: payload,
        },
      }),
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      console.error('[PDF-MONKEY] API error:', pdfMonkeyResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: 'Failed to generate PDF',
          details: errorText,
          status: pdfMonkeyResponse.status,
        }),
        {
          status: pdfMonkeyResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();

    // Poll for document completion (PDF Monkey processes async)
    const createdDocumentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max wait
    let documentStatus = pdfData.document?.status;

    while (documentStatus !== 'success' && documentStatus !== 'failure' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${createdDocumentId}`,
        {
          headers: {
            Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
          },
        }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        documentStatus = statusData.document?.status;

        if (documentStatus === 'success') {
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status: statusData.document.status,
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }

      attempts++;
    }

    if (documentStatus === 'failure') {
      console.error('[PDF-MONKEY] PDF generation failed');
      return new Response(JSON.stringify({ error: 'PDF generation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Timeout - return document ID for manual status checking
    return new Response(
      JSON.stringify({
        success: false,
        message: 'PDF generation in progress',
        documentId: createdDocumentId,
        checkStatusUrl: `https://api.pdfmonkey.io/api/v1/documents/${createdDocumentId}`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'generate-pdf-monkey', requestUrl: req.url, requestMethod: req.method });
    console.error('[PDF-MONKEY] Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
