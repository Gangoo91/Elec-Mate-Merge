/**
 * Quoting tools — read_quotes, generate_quote, generate_quote_pdf, send_quote,
 *                 set_quote_auto_followup, track_quote_email
 *
 * SECURITY.md §6 — Quote safeguards:
 *   - Never auto-send without showing full breakdown
 *   - Quote links expire after 30 days — never send expired quotes
 *   - Check WhatsApp consent before sending via WhatsApp
 */

import type { UserContext } from '../auth.js';
import { randomUUID } from 'node:crypto';

import { callEdgeFunction } from '../lib/edge-function.js';

/** Generate a quote number matching the app's format: QTE-YYMM-NNN */
function generateQuoteNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `QTE-${year}${month}-${random}`;
}

export async function readQuotes(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('quotes')
    .select('id, quote_number, client_data, total, status, expiry_date, notes, created_at');

  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  }

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read quotes: ${error.message}`);

  return { quotes: data || [] };
}

export async function generateQuote(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Validate items
  if (!Array.isArray(args.items) || args.items.length === 0) {
    throw new Error('At least one item is required');
  }

  // Validate and normalise each item
  const items: Array<{
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    unit: string;
    notes: string;
  }> = [];

  for (const raw of args.items) {
    if (typeof raw !== 'object' || raw === null) {
      throw new Error(
        'Each item must be an object with description, category, quantity, unitPrice'
      );
    }
    const item = raw as Record<string, unknown>;
    if (typeof item.description !== 'string' || item.description.trim().length === 0) {
      throw new Error('Item description is required');
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error('Item quantity must be a positive number');
    }
    // Accept both unitPrice (camelCase) and unit_price (snake_case) for agent compatibility
    const price =
      typeof item.unitPrice === 'number'
        ? item.unitPrice
        : typeof item.unit_price === 'number'
          ? item.unit_price
          : -1;
    if (price < 0) {
      throw new Error('Item unitPrice (or unit_price) must be zero or positive');
    }
    const category = typeof item.category === 'string' ? item.category : 'materials';
    const qty = item.quantity;
    items.push({
      id: randomUUID(),
      description: item.description.trim(),
      category,
      quantity: qty,
      unitPrice: price,
      totalPrice: Math.round(qty * price * 100) / 100,
      unit: typeof item.unit === 'string' ? item.unit : 'each',
      notes: typeof item.notes === 'string' ? item.notes : '',
    });
  }

  // Client data
  const clientData =
    typeof args.client_data === 'object' && args.client_data !== null ? args.client_data : {};

  // Job details
  const jobDetails =
    typeof args.job_details === 'object' && args.job_details !== null ? args.job_details : {};

  // Settings
  const vatRegistered = typeof args.vat_registered === 'boolean' ? args.vat_registered : false;
  const vatRate = typeof args.vat_rate === 'number' && args.vat_rate >= 0 ? args.vat_rate : 20;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const vatAmount = vatRegistered ? Math.round(subtotal * (vatRate / 100) * 100) / 100 : 0;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  if (total <= 0) {
    throw new Error('Quote total must be greater than £0');
  }

  // Expiry date (default 30 days)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  const settings = {
    vatRegistered,
    vatRate,
    discountEnabled: false,
    discountValue: 0,
    discountType: 'percentage',
    discountLabel: '',
    showMaterialsBreakdown: true,
  };

  const quoteNumber = generateQuoteNumber();

  const { data, error } = await supabase
    .from('quotes')
    .insert({
      user_id: user.userId,
      quote_number: quoteNumber,
      client_data: clientData,
      items,
      settings,
      job_details: jobDetails,
      subtotal: Math.round(subtotal * 100) / 100,
      overhead: 0,
      profit: 0,
      vat_amount: vatAmount,
      total,
      status: 'draft',
      expiry_date: expiryDate.toISOString(),
      notes: typeof args.notes === 'string' ? args.notes : null,
    })
    .select('id, quote_number, total, vat_amount, status')
    .single();

  if (error) throw new Error(`Failed to create quote: ${error.message}`);

  return {
    quote_id: data.id,
    quote_number: data.quote_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.status,
    items_count: items.length,
    message: `Quote ${data.quote_number} created for £${data.total}. Use generate_quote_pdf to create the PDF.`,
  };
}

export async function updateQuote(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const supabase = user.supabase;

  // Fetch existing quote
  const { data: existing, error: fetchError } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', args.quote_id)
    .single();

  if (fetchError || !existing) {
    throw new Error('Quote not found');
  }

  const updates: Record<string, unknown> = {};

  // Client data
  if (typeof args.client_data === 'object' && args.client_data !== null) {
    updates.client_data = { ...(existing.client_data || {}), ...(args.client_data as object) };
  }

  // Job details
  if (typeof args.job_details === 'object' && args.job_details !== null) {
    updates.job_details = { ...(existing.job_details || {}), ...(args.job_details as object) };
  }

  // Notes
  if (typeof args.notes === 'string') {
    updates.notes = args.notes;
  }

  // Expiry date
  if (typeof args.expiry_date === 'string') {
    updates.expiry_date = args.expiry_date;
  }

  // Status
  if (
    typeof args.status === 'string' &&
    ['draft', 'sent', 'approved', 'rejected'].includes(args.status)
  ) {
    updates.status = args.status;
  }

  // Items — recalculate totals
  if (Array.isArray(args.items) && args.items.length > 0) {
    const items: Array<{
      id: string;
      description: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      unit: string;
      notes: string;
    }> = [];

    for (const raw of args.items) {
      if (typeof raw !== 'object' || raw === null) {
        throw new Error('Each item must be an object with description, quantity, unitPrice');
      }
      const item = raw as Record<string, unknown>;
      if (typeof item.description !== 'string' || item.description.trim().length === 0) {
        throw new Error('Item description is required');
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error('Item quantity must be a positive number');
      }
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        throw new Error('Item unitPrice must be zero or positive');
      }
      const category = typeof item.category === 'string' ? item.category : 'materials';
      const qty = item.quantity;
      const price = item.unitPrice;
      items.push({
        id: randomUUID(),
        description: item.description.trim(),
        category,
        quantity: qty,
        unitPrice: price,
        totalPrice: Math.round(qty * price * 100) / 100,
        unit: typeof item.unit === 'string' ? item.unit : 'each',
        notes: typeof item.notes === 'string' ? item.notes : '',
      });
    }

    const settings = existing.settings || {};
    const vatRegistered =
      typeof args.vat_registered === 'boolean'
        ? args.vat_registered
        : (settings.vatRegistered ?? false);
    const vatRate = typeof args.vat_rate === 'number' ? args.vat_rate : (settings.vatRate ?? 20);

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const vatAmount = vatRegistered ? Math.round(subtotal * (vatRate / 100) * 100) / 100 : 0;
    const total = Math.round((subtotal + vatAmount) * 100) / 100;

    if (total <= 0) {
      throw new Error('Quote total must be greater than £0');
    }

    updates.items = items;
    updates.subtotal = Math.round(subtotal * 100) / 100;
    updates.vat_amount = vatAmount;
    updates.total = total;
    updates.settings = { ...settings, vatRegistered, vatRate };
  }

  if (Object.keys(updates).length === 0) {
    throw new Error(
      'No fields to update — provide at least one of: client_data, job_details, items, notes, expiry_date, status'
    );
  }

  const { data, error } = await supabase
    .from('quotes')
    .update(updates)
    .eq('id', args.quote_id)
    .select('id, quote_number, total, vat_amount, status, client_data')
    .single();

  if (error) throw new Error(`Failed to update quote: ${error.message}`);

  return {
    quote_id: data.id,
    quote_number: data.quote_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.status,
    client: data.client_data,
    updated_fields: Object.keys(updates),
  };
}

export async function generateQuotePdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const supabase = user.supabase;

  // generate-pdf-monkey needs full quote data + company profile
  const [quoteRes, profileRes] = await Promise.all([
    supabase.from('quotes').select('*').eq('id', args.quote_id).single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (quoteRes.error || !quoteRes.data) {
    throw new Error('Quote not found');
  }

  const result = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      quoteId: args.quote_id,
      quote: quoteRes.data,
      companyProfile: profileRes.data ?? undefined,
      force_regenerate: args.force_regenerate === true,
    },
    { timeoutMs: 60_000 }
  );

  if (result.error) throw new Error(result.error);

  // Return structured PDF result with MEDIA: guidance for WhatsApp
  const data = result.data as Record<string, unknown> | null;
  const downloadUrl = (data?.downloadUrl ?? data?.download_url) as string | undefined;

  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  return {
    documentId: data?.documentId ?? data?.document_id,
    downloadUrl,
    previewUrl: data?.previewUrl ?? data?.preview_url,
    quote_id: args.quote_id,
    message: `Quote PDF generated. To send as a WhatsApp document, use MEDIA:${downloadUrl}`,
  };
}

export async function sendQuote(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }

  const supabase = user.supabase;

  // ── Quote expiry check (SECURITY.md §6) ───────────────────────────
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('id, status, expiry_date, total')
    .eq('id', args.quote_id)
    .single();

  if (quoteError || !quote) {
    throw new Error('Quote not found');
  }

  if (quote.expiry_date) {
    const expiryDate = new Date(quote.expiry_date);
    if (expiryDate < new Date()) {
      throw new Error(
        `This quote expired on ${expiryDate.toLocaleDateString('en-GB')}. Create a new quote instead.`
      );
    }
  }

  // ── WhatsApp consent check ────────────────────────────────────────
  if (args.channel === 'whatsapp') {
    const { data: client, error: clientError } = await supabase
      .from('customers')
      .select('name, phone')
      .eq('id', args.client_id)
      .single();

    if (clientError || !client) {
      throw new Error('Client not found');
    }
    if (!client.phone) {
      throw new Error(`No phone number on file for ${client.name}`);
    }
  }

  const channel = typeof args.channel === 'string' ? args.channel : 'email';

  if (channel === 'email') {
    // send-quote-resend handles PDF generation, branded email via Resend,
    // status update to 'sent', and tracking in quote_email_events
    const result = await callEdgeFunction(
      'send-quote-resend',
      user.jwt,
      {
        quoteId: args.quote_id,
      },
      { timeoutMs: 60_000 }
    );

    if (result.error) throw new Error(result.error);
    return result.data;
  }

  // WhatsApp: generate PDF + public quote link, return for agent to send natively via OpenClaw
  const pdfResult = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      quoteId: args.quote_id,
      force_regenerate: false,
    },
    { timeoutMs: 60_000 }
  );

  if (pdfResult.error) throw new Error(pdfResult.error);

  const pdfData = pdfResult.data as Record<string, unknown> | null;

  // Update quote status to sent
  await supabase.from('quotes').update({ status: 'sent' }).eq('id', args.quote_id);

  // Fetch client details for the agent to compose the WhatsApp message
  const { data: clientData } = await supabase
    .from('customers')
    .select('name, phone')
    .eq('id', args.client_id)
    .single();

  return {
    action: 'send_whatsapp',
    phone: clientData?.phone,
    client_name: clientData?.name,
    quote_total: quote.total,
    download_url: pdfData?.downloadUrl ?? pdfData?.download_url,
    message:
      typeof args.message === 'string'
        ? args.message
        : `Hi ${clientData?.name ?? 'there'}, here's your quote for £${quote.total}. You can view it here: ${pdfData?.downloadUrl ?? pdfData?.download_url ?? '[link pending]'}`,
  };
}

export async function setQuoteAutoFollowup(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }
  if (typeof args.followup_days !== 'number' || args.followup_days <= 0) {
    throw new Error('followup_days must be a positive number');
  }

  const result = await callEdgeFunction('quote-automated-followup', user.jwt, {
    quote_id: args.quote_id,
    followup_days: args.followup_days,
    max_followups: typeof args.max_followups === 'number' ? args.max_followups : 3,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function addReceiptToQuote(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.photo_analysis_id !== 'string') {
    throw new Error('photo_analysis_id is required — analyse a receipt photo first');
  }
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const supabase = user.supabase;

  // Fetch the photo analysis
  const { data: analysis, error: fetchError } = await supabase
    .from('photo_analyses')
    .select('id, analysis_type, analysis_result')
    .eq('id', args.photo_analysis_id)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !analysis) {
    throw new Error('Photo analysis not found — run analyse_photo on the receipt image first');
  }

  if (analysis.analysis_type !== 'receipt') {
    throw new Error(
      `This photo was analysed as "${analysis.analysis_type}", not a receipt. Re-analyse with context indicating it is a receipt.`
    );
  }

  const result = analysis.analysis_result as Record<string, unknown> | null;
  if (!result) {
    throw new Error('Photo analysis has no structured result');
  }

  const items = Array.isArray(result.items) ? result.items : [];
  if (items.length === 0) {
    throw new Error('No line items extracted from receipt. Try a clearer photo.');
  }

  // Fetch existing quote
  const { data: existing, error: quoteError } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', args.quote_id)
    .single();

  if (quoteError || !existing) {
    throw new Error('Quote not found');
  }

  // Build new items from receipt
  const existingItems = Array.isArray(existing.items) ? existing.items : [];
  const newItems = items.map((item: Record<string, unknown>) => ({
    id: randomUUID(),
    description: (typeof item.description === 'string' ? item.description : 'Receipt item').trim(),
    category: 'materials',
    quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
    unitPrice: typeof item.unit_price === 'number' ? item.unit_price : 0,
    totalPrice:
      Math.round(
        (typeof item.quantity === 'number' ? item.quantity : 1) *
          (typeof item.unit_price === 'number' ? item.unit_price : 0) *
          100
      ) / 100,
    unit: 'each',
    notes: `From receipt: ${result.supplier || 'unknown supplier'}`,
  }));

  const allItems = [...existingItems, ...newItems];

  // Recalculate totals
  const settings = existing.settings || {};
  const vatRegistered = settings.vatRegistered ?? false;
  const vatRate = settings.vatRate ?? 20;
  const subtotal = allItems.reduce(
    (sum: number, item: Record<string, unknown>) => sum + (Number(item.totalPrice) || 0),
    0
  );
  const vatAmount = vatRegistered ? Math.round(subtotal * (vatRate / 100) * 100) / 100 : 0;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  const { data, error } = await supabase
    .from('quotes')
    .update({
      items: allItems,
      subtotal: Math.round(subtotal * 100) / 100,
      vat_amount: vatAmount,
      total,
    })
    .eq('id', args.quote_id)
    .select('id, quote_number, total, vat_amount')
    .single();

  if (error) throw new Error(`Failed to update quote with receipt items: ${error.message}`);

  return {
    quote_id: data.id,
    quote_number: data.quote_number,
    items_added: newItems.length,
    new_total: data.total,
    vat: data.vat_amount,
    supplier: result.supplier || 'unknown',
  };
}

export async function trackQuoteEmail(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const result = await callEdgeFunction('quote-email-tracking', user.jwt, {
    quote_id: args.quote_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
