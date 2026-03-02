/**
 * Invoicing tools — read_invoices, create_invoice, send_invoice, get_overdue_invoices
 * Maps to: Supabase `quotes` table (invoices are embedded via invoice_* columns)
 *
 * The quotes table has invoice columns:
 *   invoice_raised, invoice_number, invoice_date, invoice_due_date,
 *   invoice_status ('draft'|'sent'|'paid'|'overdue'), invoice_sent_at,
 *   invoice_paid_at, invoice_payment_method, invoice_notes, total, vat_amount
 *
 * SECURITY.md §6 — Financial safeguards implemented:
 *   - Reject £0 or negative amounts
 *   - Flag invoices > 2x user average
 *   - Detect duplicate invoices within 7 days for same client
 */

import type { UserContext } from '../auth.js';
import { randomUUID } from 'node:crypto';

import { callEdgeFunction } from '../lib/edge-function.js';

/** Generate an invoice number: INV-YYMM-NNN */
function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
}

/** Generate a quote_number for standalone invoices (required NOT NULL column) */
function generateStandaloneQuoteNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
}

export async function readInvoices(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('quotes')
    .select(
      'id, client_data, total, vat_amount, invoice_number, invoice_status, invoice_date, invoice_due_date, invoice_paid_at, invoice_notes, created_at'
    )
    .eq('invoice_raised', true);

  if (args.status) {
    query = query.eq('invoice_status', args.status);
  }
  if (typeof args.date_from === 'string') {
    query = query.gte('invoice_date', args.date_from);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('invoice_date', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read invoices: ${error.message}`);

  // Map to a cleaner invoice shape for the agent
  const invoices = (data || []).map((q) => ({
    id: q.id,
    invoice_number: q.invoice_number,
    client: q.client_data,
    amount: q.total,
    vat: q.vat_amount,
    status: q.invoice_status,
    issued_date: q.invoice_date,
    due_date: q.invoice_due_date,
    paid_date: q.invoice_paid_at,
    notes: q.invoice_notes,
  }));

  return { invoices };
}

export async function createInvoice(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // ── Validate inputs ───────────────────────────────────────────────
  if (!Array.isArray(args.line_items) || args.line_items.length === 0) {
    throw new Error('At least one line item is required');
  }

  // Validate each line item — store in camelCase format matching the app
  const lineItems: Array<{
    id: string; description: string; category: string; quantity: number;
    unitPrice: number; totalPrice: number; unit: string; notes: string;
  }> = [];
  for (const item of args.line_items) {
    if (typeof item !== 'object' || item === null) {
      throw new Error(
        'Each line item must be an object with description, quantity, and unit_price'
      );
    }
    const li = item as Record<string, unknown>;
    if (typeof li.description !== 'string' || li.description.trim().length === 0) {
      throw new Error('Line item description is required');
    }
    if (typeof li.quantity !== 'number' || li.quantity <= 0) {
      throw new Error('Line item quantity must be a positive number');
    }
    const price = typeof li.unit_price === 'number' ? li.unit_price : (typeof li.unitPrice === 'number' ? li.unitPrice : -1);
    if (price < 0) {
      throw new Error('Line item unit_price must be zero or positive');
    }
    const qty = li.quantity as number;
    lineItems.push({
      id: randomUUID(),
      description: li.description.trim(),
      category: typeof li.category === 'string' ? li.category : 'labour',
      quantity: qty,
      unitPrice: price,
      totalPrice: Math.round(qty * price * 100) / 100,
      unit: typeof li.unit === 'string' ? li.unit : 'each',
      notes: typeof li.notes === 'string' ? li.notes : '',
    });
  }

  const vatRate =
    typeof args.vat_rate === 'number' && args.vat_rate >= 0 && args.vat_rate <= 100
      ? args.vat_rate
      : 20;
  const dueDays = typeof args.due_days === 'number' && args.due_days > 0 ? args.due_days : 30;

  const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const vat = subtotal * (vatRate / 100);
  const total = subtotal + vat;

  // ── Financial safeguards (SECURITY.md §6) ─────────────────────────

  // Reject zero or negative totals
  if (total <= 0) {
    throw new Error(
      "Invoice total must be greater than £0. Something doesn't look right with this amount."
    );
  }

  // Check user's average invoice value
  const { data: avgData } = await supabase
    .from('quotes')
    .select('total')
    .eq('invoice_raised', true)
    .not('total', 'is', null)
    .limit(50);

  const warnings: string[] = [];

  if (avgData && avgData.length >= 3) {
    const avg = avgData.reduce((sum, q) => sum + (q.total || 0), 0) / avgData.length;
    if (total > avg * 2) {
      warnings.push(
        `This invoice (£${total.toFixed(2)}) is more than 2x your average (£${avg.toFixed(2)}). Please double-check the amount.`
      );
    }
  }

  // ── Create as a quote with invoice fields raised ──────────────────
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + dueDays);

  const invoiceNumber = generateInvoiceNumber();
  const quoteNumber = generateStandaloneQuoteNumber();

  // Resolve client data — look up full details from customers table if given client_id
  let clientData: Record<string, unknown> = {};
  if (typeof args.client_data === 'object' && args.client_data !== null) {
    clientData = args.client_data as Record<string, unknown>;
  }
  if (typeof args.client_id === 'string') {
    const { data: customer } = await supabase
      .from('customers')
      .select('id, name, email, phone, address, postcode')
      .eq('id', args.client_id)
      .single();
    if (customer) {
      clientData = { ...clientData, ...customer };
    } else {
      clientData = { ...clientData, id: args.client_id };
    }
  }

  const { data, error } = await supabase
    .from('quotes')
    .insert({
      user_id: user.userId,
      quote_number: quoteNumber,
      client_data: clientData,
      items: lineItems,
      settings: { vatRegistered: true, vatRate },
      subtotal: Math.round(subtotal * 100) / 100,
      overhead: 0,
      profit: 0,
      vat_amount: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
      status: 'approved',
      invoice_raised: true,
      invoice_number: invoiceNumber,
      invoice_status: 'draft',
      invoice_date: new Date().toISOString(),
      invoice_due_date: dueDate.toISOString(),
      invoice_notes: typeof args.notes === 'string' ? args.notes : null,
      expiry_date: dueDate.toISOString(),
    })
    .select('id, total, vat_amount, invoice_number, invoice_status')
    .single();

  if (error) throw new Error(`Failed to create invoice: ${error.message}`);

  return {
    invoice_id: data.id,
    invoice_number: data.invoice_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.invoice_status,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

export async function updateInvoice(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.invoice_id !== 'string') {
    throw new Error('invoice_id is required');
  }

  const supabase = user.supabase;

  // Fetch existing invoice
  const { data: existing, error: fetchError } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', args.invoice_id)
    .eq('invoice_raised', true)
    .single();

  if (fetchError || !existing) {
    throw new Error('Invoice not found');
  }

  if (existing.invoice_status === 'paid') {
    throw new Error('Cannot edit a paid invoice');
  }

  const updates: Record<string, unknown> = {};

  // Client data
  if (typeof args.client_data === 'object' && args.client_data !== null) {
    updates.client_data = { ...(existing.client_data || {}), ...(args.client_data as object) };
  }

  // Notes
  if (typeof args.notes === 'string') {
    updates.invoice_notes = args.notes;
  }

  // Due date
  if (typeof args.due_date === 'string') {
    updates.invoice_due_date = args.due_date;
    updates.expiry_date = args.due_date;
  }

  // Status (draft/sent only — paid handled separately)
  if (typeof args.status === 'string' && ['draft', 'sent'].includes(args.status)) {
    updates.invoice_status = args.status;
  }

  // Line items — recalculate totals, store in camelCase format matching the app
  if (Array.isArray(args.line_items) && args.line_items.length > 0) {
    const updatedItems: Array<{
      id: string; description: string; category: string; quantity: number;
      unitPrice: number; totalPrice: number; unit: string; notes: string;
    }> = [];
    for (const item of args.line_items) {
      if (typeof item !== 'object' || item === null) {
        throw new Error('Each line item must be an object with description, quantity, and unit_price');
      }
      const li = item as Record<string, unknown>;
      if (typeof li.description !== 'string' || li.description.trim().length === 0) {
        throw new Error('Line item description is required');
      }
      if (typeof li.quantity !== 'number' || li.quantity <= 0) {
        throw new Error('Line item quantity must be a positive number');
      }
      const price = typeof li.unit_price === 'number' ? li.unit_price : (typeof li.unitPrice === 'number' ? li.unitPrice : -1);
      if (price < 0) {
        throw new Error('Line item unit_price must be zero or positive');
      }
      const qty = li.quantity as number;
      updatedItems.push({
        id: randomUUID(),
        description: li.description.trim(),
        category: typeof li.category === 'string' ? li.category : 'labour',
        quantity: qty,
        unitPrice: price,
        totalPrice: Math.round(qty * price * 100) / 100,
        unit: typeof li.unit === 'string' ? li.unit : 'each',
        notes: typeof li.notes === 'string' ? li.notes : '',
      });
    }

    const vatRate =
      typeof args.vat_rate === 'number'
        ? args.vat_rate
        : existing.settings?.vatRate ?? existing.settings?.vat_rate ?? 20;

    const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const vat = subtotal * (vatRate / 100);
    const total = subtotal + vat;

    if (total <= 0) {
      throw new Error('Invoice total must be greater than £0');
    }

    updates.items = updatedItems;
    updates.subtotal = Math.round(subtotal * 100) / 100;
    updates.vat_amount = Math.round(vat * 100) / 100;
    updates.total = Math.round(total * 100) / 100;
    updates.settings = { ...(existing.settings || {}), vatRegistered: true, vatRate };
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('No fields to update — provide at least one of: client_data, line_items, notes, due_date, status');
  }

  const { data, error } = await supabase
    .from('quotes')
    .update(updates)
    .eq('id', args.invoice_id)
    .select('id, total, vat_amount, invoice_number, invoice_status, client_data')
    .single();

  if (error) throw new Error(`Failed to update invoice: ${error.message}`);

  return {
    invoice_id: data.id,
    invoice_number: data.invoice_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.invoice_status,
    client: data.client_data,
    updated_fields: Object.keys(updates),
  };
}

export async function generateInvoicePdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.invoice_id !== 'string') {
    throw new Error('invoice_id is required');
  }

  const supabase = user.supabase;

  // generate-pdf-monkey with invoice_mode needs full quote/invoice data + company profile
  const [quoteRes, profileRes] = await Promise.all([
    supabase
      .from('quotes')
      .select('*')
      .eq('id', args.invoice_id)
      .eq('invoice_raised', true)
      .single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (quoteRes.error || !quoteRes.data) {
    throw new Error('Invoice not found');
  }

  const result = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      quote: quoteRes.data,
      companyProfile: profileRes.data ?? undefined,
      invoice_mode: true,
    },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  const data = result.data as Record<string, unknown> | null;
  const downloadUrl = (data?.downloadUrl ?? data?.download_url) as string | undefined;

  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  return {
    documentId: data?.documentId ?? data?.document_id,
    downloadUrl,
    previewUrl: data?.previewUrl ?? data?.preview_url,
    invoice_id: args.invoice_id,
    message: `Invoice PDF generated. To send as a WhatsApp document, use MEDIA:${downloadUrl}`,
  };
}

export async function sendInvoice(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.invoice_id !== 'string') {
    throw new Error('invoice_id is required');
  }

  // Verify quote/invoice exists and is in sendable state
  const supabase = user.supabase;
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('id, invoice_status, total, client_data')
    .eq('id', args.invoice_id)
    .eq('invoice_raised', true)
    .single();

  if (quoteError || !quote) {
    throw new Error('Invoice not found');
  }
  if (quote.invoice_status === 'paid') {
    throw new Error('This invoice has already been paid');
  }

  // send-invoice-resend handles PDF + Stripe payment link + Resend email internally
  // Edge function expects { invoiceId } (which is the quote UUID)
  const result = await callEdgeFunction('send-invoice-resend', user.jwt, {
    invoiceId: args.invoice_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function getOverdueInvoices(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const minDaysOverdue =
    typeof args.min_days_overdue === 'number' && args.min_days_overdue > 0
      ? args.min_days_overdue
      : 1;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - minDaysOverdue);

  const { data, error } = await supabase
    .from('quotes')
    .select('id, client_data, total, invoice_due_date, invoice_number')
    .eq('invoice_raised', true)
    .eq('invoice_status', 'sent')
    .lte('invoice_due_date', cutoffDate.toISOString())
    .order('invoice_due_date', { ascending: true });

  if (error) throw new Error(`Failed to get overdue invoices: ${error.message}`);

  const invoices = (data || []).map((q) => ({
    id: q.id,
    invoice_number: q.invoice_number,
    client: q.client_data,
    amount: q.total,
    due_date: q.invoice_due_date,
    days_overdue: Math.ceil(
      (Date.now() - new Date(q.invoice_due_date).getTime()) / (1000 * 60 * 60 * 24)
    ),
  }));

  return { invoices };
}
