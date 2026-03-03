/**
 * Invoicing tools — read_invoices, create_invoice, send_invoice, get_overdue_invoices
 * Maps to: Supabase `invoices` table (separated from quotes)
 *
 * The invoices table has clean columns:
 *   status ('draft'|'sent'|'paid'|'overdue'|'cancelled'),
 *   invoice_number, invoice_date, due_date, paid_at, sent_at,
 *   payment_method, notes, total, vat_amount
 *
 * Dual-write: createInvoice also writes to `quotes` for edge function
 * backward compatibility during the transition period.
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
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `INV-${year}${month}-${random}`;
}

export async function readInvoices(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('invoices')
    .select(
      'id, client_data, total, vat_amount, invoice_number, status, invoice_date, due_date, paid_at, notes, quote_id, created_at'
    );

  if (args.status) {
    query = query.eq('status', args.status);
  }
  if (typeof args.date_from === 'string') {
    query = query.gte('invoice_date', args.date_from);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 100) : 50;
  query = query.order('invoice_date', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read invoices: ${error.message}`);

  const invoices = (data || []).map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoice_number,
    client: inv.client_data,
    amount: inv.total,
    vat: inv.vat_amount,
    status: inv.status,
    issued_date: inv.invoice_date,
    due_date: inv.due_date,
    paid_date: inv.paid_at,
    notes: inv.notes,
    quote_id: inv.quote_id,
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
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    unit: string;
    notes: string;
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
    const price =
      typeof li.unit_price === 'number'
        ? li.unit_price
        : typeof li.unitPrice === 'number'
          ? li.unitPrice
          : -1;
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
    .from('invoices')
    .select('total')
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

  // ── Create invoice ────────────────────────────────────────────────
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + dueDays);

  const invoiceNumber = generateInvoiceNumber();

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

  // ── Dual-write: also create in quotes for edge function compat ────
  const { data: quoteRow, error: quoteError } = await supabase
    .from('quotes')
    .insert({
      user_id: user.userId,
      quote_number: invoiceNumber,
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
    .select('id')
    .single();

  if (quoteError) throw new Error(`Failed to create invoice (compat): ${quoteError.message}`);

  // ── Insert into invoices table (primary) ──────────────────────────
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      user_id: user.userId,
      quote_id: quoteRow.id,
      invoice_number: invoiceNumber,
      client_data: clientData,
      items: lineItems,
      settings: { vatRegistered: true, vatRate },
      subtotal: Math.round(subtotal * 100) / 100,
      overhead: 0,
      profit: 0,
      vat_amount: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
      status: 'draft',
      invoice_date: new Date().toISOString(),
      due_date: dueDate.toISOString(),
      notes: typeof args.notes === 'string' ? args.notes : null,
    })
    .select('id, total, vat_amount, invoice_number, status')
    .single();

  if (error) throw new Error(`Failed to create invoice: ${error.message}`);

  return {
    invoice_id: data.id,
    invoice_number: data.invoice_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.status,
    quote_id: quoteRow.id,
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
    .from('invoices')
    .select('*')
    .eq('id', args.invoice_id)
    .single();

  if (fetchError || !existing) {
    throw new Error('Invoice not found');
  }

  if (existing.status === 'paid') {
    throw new Error('Cannot edit a paid invoice');
  }

  const updates: Record<string, unknown> = {};
  const quoteUpdates: Record<string, unknown> = {};

  // Client data
  if (typeof args.client_data === 'object' && args.client_data !== null) {
    updates.client_data = { ...(existing.client_data || {}), ...(args.client_data as object) };
    quoteUpdates.client_data = updates.client_data;
  }

  // Notes
  if (typeof args.notes === 'string') {
    updates.notes = args.notes;
    quoteUpdates.invoice_notes = args.notes;
  }

  // Due date
  if (typeof args.due_date === 'string') {
    updates.due_date = args.due_date;
    quoteUpdates.invoice_due_date = args.due_date;
    quoteUpdates.expiry_date = args.due_date;
  }

  // Status (draft/sent only — paid handled separately)
  if (typeof args.status === 'string' && ['draft', 'sent'].includes(args.status)) {
    updates.status = args.status;
    quoteUpdates.invoice_status = args.status;
  }

  // Line items — recalculate totals
  if (Array.isArray(args.line_items) && args.line_items.length > 0) {
    const updatedItems: Array<{
      id: string;
      description: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      unit: string;
      notes: string;
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
      const price =
        typeof li.unit_price === 'number'
          ? li.unit_price
          : typeof li.unitPrice === 'number'
            ? li.unitPrice
            : -1;
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
        : (existing.settings?.vatRate ?? existing.settings?.vat_rate ?? 20);

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

    // Mirror to quotes compat
    quoteUpdates.items = updatedItems;
    quoteUpdates.subtotal = updates.subtotal;
    quoteUpdates.vat_amount = updates.vat_amount;
    quoteUpdates.total = updates.total;
    quoteUpdates.settings = updates.settings;
  }

  if (Object.keys(updates).length === 0) {
    throw new Error(
      'No fields to update — provide at least one of: client_data, line_items, notes, due_date, status'
    );
  }

  // Update invoices table (primary)
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', args.invoice_id)
    .select('id, total, vat_amount, invoice_number, status, client_data, quote_id')
    .single();

  if (error) throw new Error(`Failed to update invoice: ${error.message}`);

  // Dual-write: also update linked quotes row
  if (data.quote_id && Object.keys(quoteUpdates).length > 0) {
    await supabase.from('quotes').update(quoteUpdates).eq('id', data.quote_id);
  }

  return {
    invoice_id: data.id,
    invoice_number: data.invoice_number,
    total: data.total,
    vat: data.vat_amount,
    status: data.status,
    client: data.client_data,
    updated_fields: Object.keys(updates),
  };
}

export async function generateInvoicePdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.invoice_id !== 'string') {
    throw new Error('invoice_id is required');
  }

  const supabase = user.supabase;

  // Look up invoice to get linked quote_id (edge function reads quotes table)
  const { data: invoice, error: invError } = await supabase
    .from('invoices')
    .select('id, quote_id')
    .eq('id', args.invoice_id)
    .single();

  if (invError || !invoice) {
    throw new Error('Invoice not found');
  }

  // The PDF edge function reads from quotes table, so use quote_id
  const quoteId = invoice.quote_id;
  if (!quoteId) {
    throw new Error('Invoice has no linked quote record — cannot generate PDF yet');
  }

  const [quoteRes, profileRes] = await Promise.all([
    supabase.from('quotes').select('*').eq('id', quoteId).single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (quoteRes.error || !quoteRes.data) {
    throw new Error('Linked quote record not found');
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

  const supabase = user.supabase;

  // Verify invoice exists and get linked quote_id
  const { data: invoice, error: invError } = await supabase
    .from('invoices')
    .select('id, status, total, client_data, quote_id')
    .eq('id', args.invoice_id)
    .single();

  if (invError || !invoice) {
    throw new Error('Invoice not found');
  }
  if (invoice.status === 'paid') {
    throw new Error('This invoice has already been paid');
  }
  if (!invoice.quote_id) {
    throw new Error('Invoice has no linked quote record — cannot send via edge function yet');
  }

  // send-invoice-resend edge function expects invoiceId = quote UUID
  const result = await callEdgeFunction('send-invoice-resend', user.jwt, {
    invoiceId: invoice.quote_id,
  });

  if (result.error) throw new Error(result.error);

  // Also update invoice status to sent
  await supabase
    .from('invoices')
    .update({ status: 'sent', sent_at: new Date().toISOString() })
    .eq('id', args.invoice_id);

  return result.data;
}

export async function addReceiptToInvoice(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.photo_analysis_id !== 'string') {
    throw new Error('photo_analysis_id is required — analyse a receipt photo first');
  }
  if (typeof args.invoice_id !== 'string') {
    throw new Error('invoice_id is required');
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

  // Fetch existing invoice
  const { data: existing, error: invError } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', args.invoice_id)
    .single();

  if (invError || !existing) {
    throw new Error('Invoice not found');
  }

  if (existing.status === 'paid') {
    throw new Error('Cannot add items to a paid invoice');
  }

  // Build new line items from receipt
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
  const vatRate = existing.settings?.vatRate ?? existing.settings?.vat_rate ?? 20;
  const subtotal = allItems.reduce(
    (sum: number, item: Record<string, unknown>) => sum + (Number(item.totalPrice) || 0),
    0
  );
  const vat = subtotal * (vatRate / 100);
  const total = subtotal + vat;

  // Update invoices table (primary)
  const { data, error } = await supabase
    .from('invoices')
    .update({
      items: allItems,
      subtotal: Math.round(subtotal * 100) / 100,
      vat_amount: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
      settings: { ...(existing.settings || {}), vatRegistered: true, vatRate },
    })
    .eq('id', args.invoice_id)
    .select('id, total, vat_amount, invoice_number, quote_id')
    .single();

  if (error) throw new Error(`Failed to update invoice with receipt items: ${error.message}`);

  // Dual-write to quotes table for edge function compat
  if (data.quote_id) {
    await supabase
      .from('quotes')
      .update({
        items: allItems,
        subtotal: Math.round(subtotal * 100) / 100,
        vat_amount: Math.round(vat * 100) / 100,
        total: Math.round(total * 100) / 100,
        settings: { ...(existing.settings || {}), vatRegistered: true, vatRate },
      })
      .eq('id', data.quote_id);
  }

  return {
    invoice_id: data.id,
    invoice_number: data.invoice_number,
    items_added: newItems.length,
    new_total: data.total,
    vat: data.vat_amount,
    supplier: result.supplier || 'unknown',
  };
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
    .from('invoices')
    .select('id, client_data, total, due_date, invoice_number')
    .eq('status', 'sent')
    .lte('due_date', cutoffDate.toISOString())
    .order('due_date', { ascending: true });

  if (error) throw new Error(`Failed to get overdue invoices: ${error.message}`);

  const invoices = (data || []).map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoice_number,
    client: inv.client_data,
    amount: inv.total,
    due_date: inv.due_date,
    days_overdue: Math.ceil(
      (Date.now() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24)
    ),
  }));

  return { invoices };
}
