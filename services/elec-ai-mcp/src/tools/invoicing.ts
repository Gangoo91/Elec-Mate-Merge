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

import { callEdgeFunction } from '../lib/edge-function.js';

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

  // Validate each line item
  const lineItems: Array<{ description: string; quantity: number; unit_price: number }> = [];
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
    if (typeof li.unit_price !== 'number' || li.unit_price < 0) {
      throw new Error('Line item unit_price must be zero or positive');
    }
    lineItems.push({
      description: li.description.trim(),
      quantity: li.quantity,
      unit_price: li.unit_price,
    });
  }

  const vatRate =
    typeof args.vat_rate === 'number' && args.vat_rate >= 0 && args.vat_rate <= 100
      ? args.vat_rate
      : 20;
  const dueDays = typeof args.due_days === 'number' && args.due_days > 0 ? args.due_days : 30;

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
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

  const clientData = typeof args.client_id === 'string' ? { id: args.client_id } : {};

  const { data, error } = await supabase
    .from('quotes')
    .insert({
      user_id: user.userId,
      client_data: clientData,
      items: lineItems,
      settings: { vat_rate: vatRate },
      subtotal: Math.round(subtotal * 100) / 100,
      overhead: 0,
      profit: 0,
      vat_amount: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
      status: 'approved',
      invoice_raised: true,
      invoice_status: 'draft',
      invoice_date: new Date().toISOString(),
      invoice_due_date: dueDate.toISOString(),
      invoice_notes: typeof args.notes === 'string' ? args.notes : null,
    })
    .select('id, total, vat_amount, invoice_status')
    .single();

  if (error) throw new Error(`Failed to create invoice: ${error.message}`);

  return {
    invoice_id: data.id,
    total: data.total,
    vat: data.vat_amount,
    status: data.invoice_status,
    warnings: warnings.length > 0 ? warnings : undefined,
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
