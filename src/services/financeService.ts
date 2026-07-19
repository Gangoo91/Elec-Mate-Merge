import { supabase } from '@/integrations/supabase/client';

// Helper to send push notification (fire and forget)
const sendPushNotification = async (
  userId: string,
  title: string,
  body: string,
  type: 'job' | 'team' | 'college' | 'peer',
  data?: Record<string, unknown>
) => {
  try {
    await supabase.functions.invoke('send-push-notification', {
      body: { userId, title, body, type, data },
    });
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

// Types
export interface Quote {
  id: string;
  quote_number: string;
  client: string;
  client_address?: string | null;
  client_email?: string | null;
  client_phone?: string | null;
  job_title?: string | null;
  description: string | null;
  value: number;
  status: string;
  sent_date: string | null;
  valid_until: string | null;
  job_id: string | null;
  created_by: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  line_items: any[];
  notes: string | null;
  vat_rate?: number;
  reverse_charge?: boolean;
  cis_enabled?: boolean;
  cis_rate?: number;
  subtotal?: number | null;
  vat_amount?: number | null;
  cis_amount?: number | null;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client: string;
  project: string | null;
  amount: number;
  status: string;
  due_date: string | null;
  paid_date: string | null;
  job_id: string | null;
  quote_id: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  line_items: any[];
  notes: string | null;
  vat_rate?: number;
  reverse_charge?: boolean;
  cis_enabled?: boolean;
  cis_rate?: number;
  subtotal?: number | null;
  vat_amount?: number | null;
  cis_amount?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ExpenseClaim {
  id: string;
  employee_id: string;
  job_id: string | null;
  category: string;
  description: string;
  amount: number;
  receipt_url: string | null;
  status: string;
  submitted_date: string;
  approved_by: string | null;
  approved_date: string | null;
  paid_date: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  employee?: { name: string; avatar_initials: string };
  // Aliased embed used by useExpenses queries (employees:employer_employees(...))
  employees?: { name: string; avatar_initials: string } | null;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  account_number: string | null;
  credit_limit: number;
  balance: number;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  delivery_days: number;
  discount_percent: number;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface POLine {
  name: string;
  sku?: string | null;
  qty: number;
  unit?: string | null;
  unit_cost: number;
  received_qty?: number;
}

export type POStatus =
  | 'Draft'
  | 'Sent'
  | 'Confirmed'
  | 'Part-received'
  | 'Received'
  | 'Cancelled';

export interface MaterialOrder {
  id: string;
  order_number: string;
  supplier_id: string;
  job_id: string | null;
  items: POLine[];
  subtotal: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  status: string;
  delivery_mode: string;
  delivery_address: string | null;
  order_date: string;
  expected_date: string | null;
  delivery_date: string | null;
  ordered_by: string | null;
  sent_at: string | null;
  sent_to_email: string | null;
  confirmed_at: string | null;
  pdf_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  supplier?: { name: string };
}

export interface PriceBookItem {
  id: string;
  name: string;
  category: string;
  buy_price: number;
  sell_price: number;
  markup: number;
  unit: string;
  supplier_id: string | null;
  stock_level: number;
  reorder_level: number;
  sku: string | null;
  created_at: string;
  updated_at: string;
  supplier?: { name: string };
}

// Quotes
export async function getQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('employer_quotes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createQuote(
  quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>
): Promise<Quote> {
  const { data, error } = await supabase.from('employer_quotes').insert(quote).select().single();
  if (error) throw error;
  return data;
}

export async function updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
  // Get original quote to check for status change
  // employer_id defaults to auth.uid() at insert — created_by is a display
  // string ('Admin'), never a user id, so it must not be a push target
  const { data: originalQuote } = await supabase
    .from('employer_quotes')
    .select('status, employer_id, quote_number, client')
    .eq('id', id)
    .single();

  const { data, error } = await supabase
    .from('employer_quotes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  // Send push notification if status changed to accepted or rejected
  if (originalQuote?.employer_id && updates.status && originalQuote.status !== updates.status) {
    const statusLower = updates.status.toLowerCase();
    if (statusLower === 'accepted' || statusLower === 'approved') {
      sendPushNotification(
        originalQuote.employer_id,
        '🎉 Quote Accepted!',
        `${originalQuote.client} accepted quote #${originalQuote.quote_number}`,
        'job', // Using job type as quotes are business events
        { quoteId: id, status: 'accepted' }
      ).catch(console.error);
    } else if (statusLower === 'rejected' || statusLower === 'declined') {
      sendPushNotification(
        originalQuote.employer_id,
        'Quote Declined',
        `${originalQuote.client} declined quote #${originalQuote.quote_number}`,
        'job',
        { quoteId: id, status: 'rejected' }
      ).catch(console.error);
    }
  }

  return data;
}

export async function sendQuote(id: string): Promise<Quote> {
  return updateQuote(id, { status: 'Sent', sent_date: new Date().toISOString().split('T')[0] });
}

// Invoices
export async function getInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('employer_invoices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createInvoice(
  invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>
): Promise<Invoice> {
  const { data, error } = await supabase
    .from('employer_invoices')
    .insert(invoice)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
  const { data, error } = await supabase
    .from('employer_invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  // employer_invoices carries employer_id (no created_by column)
  const { data: invoice } = await supabase
    .from('employer_invoices')
    .select('invoice_number, client, amount, employer_id')
    .eq('id', id)
    .single();

  const result = await updateInvoice(id, {
    status: 'Paid',
    paid_date: new Date().toISOString().split('T')[0],
  });

  // Send push notification
  if (invoice?.employer_id) {
    sendPushNotification(
      invoice.employer_id,
      '💰 Invoice Paid!',
      `Invoice #${invoice.invoice_number} for £${invoice.amount.toFixed(2)} has been paid`,
      'job',
      { invoiceId: id, status: 'paid' }
    ).catch(console.error);
  }

  return result;
}

export async function getOverdueInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('employer_invoices')
    .select('*')
    .eq('status', 'Overdue')
    .order('due_date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendInvoice(
  id: string,
  recipientEmail?: string
): Promise<{ portalUrl: string; accessToken: string }> {
  // First get the invoice to get client details
  const { data: invoice, error: invoiceError } = await supabase
    .from('employer_invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (invoiceError) throw invoiceError;

  // A real email address is required — the client NAME is not one
  const targetEmail = recipientEmail?.trim() || invoice.client_email?.trim();
  if (!targetEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(targetEmail)) {
    throw new Error('NEEDS_CLIENT_EMAIL');
  }
  // Remember it for next time
  if (recipientEmail && recipientEmail !== invoice.client_email) {
    await supabase.from('employer_invoices').update({ client_email: targetEmail }).eq('id', id);
  }

  // Generate the invoice link
  const { data, error } = await supabase.functions.invoke('generate-invoice-link', {
    body: { invoiceId: id, baseUrl: window.location.origin, clientEmail: targetEmail },
  });

  if (error) throw error;

  // Now send the email with the Pay Now link included
  const { error: sendError } = await supabase.functions.invoke('send-finance-document', {
    body: {
      type: 'invoice',
      documentId: id,
      recipientEmail: targetEmail,
      recipientName: invoice.client,
      invoicePortalLink: data.portalUrl,
    },
  });

  if (sendError) {
    // The portal link exists, but the client was NOT emailed — say so
    console.error('Failed to send invoice email:', sendError);
    throw new Error(
      'Invoice link created, but the email could not be sent — copy the link and send it yourself.'
    );
  }

  // Update invoice status to Sent/Pending
  await updateInvoice(id, { status: 'Pending' });

  return data;
}

export async function generateInvoicePdf(id: string): Promise<{ html: string }> {
  const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
    body: { invoiceId: id },
  });

  if (error) throw error;
  return data;
}

// Expense Claims
export async function getExpenseClaims(): Promise<ExpenseClaim[]> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .select('*, employee:employer_employees(name, avatar_initials)')
    .order('submitted_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createExpenseClaim(
  claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>
): Promise<ExpenseClaim> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .insert(claim)
    .select('*, employee:employer_employees(name, avatar_initials)')
    .single();
  if (error) throw error;
  return data;
}

export async function approveExpense(id: string, approvedBy: string): Promise<ExpenseClaim> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .update({
      status: 'Approved',
      approved_by: approvedBy,
      approved_date: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, employee:employer_employees(name, avatar_initials)')
    .single();
  if (error) throw error;
  return data;
}

export async function rejectExpense(
  id: string,
  approvedBy: string,
  reason: string
): Promise<ExpenseClaim> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .update({
      status: 'Rejected',
      approved_by: approvedBy,
      approved_date: new Date().toISOString(),
      rejection_reason: reason,
    })
    .eq('id', id)
    .select('*, employee:employer_employees(name, avatar_initials)')
    .single();
  if (error) throw error;
  return data;
}

export async function markExpensePaid(id: string): Promise<ExpenseClaim> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .update({ paid_date: new Date().toISOString().split('T')[0] })
    .eq('id', id)
    .select('*, employee:employer_employees(name, avatar_initials)')
    .single();
  if (error) throw error;
  return data;
}

// Suppliers
export async function getSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from('employer_suppliers')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createSupplier(
  supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>
): Promise<Supplier> {
  const { data, error } = await supabase
    .from('employer_suppliers')
    .insert(supplier)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSupplier(id: string, updates: Partial<Supplier>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('employer_suppliers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Material Orders
export async function getMaterialOrders(): Promise<MaterialOrder[]> {
  const { data, error } = await supabase
    .from('employer_material_orders')
    .select('*, supplier:employer_suppliers(name)')
    .order('order_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createMaterialOrder(
  order: Omit<MaterialOrder, 'id' | 'created_at' | 'updated_at' | 'suppliers'>
): Promise<MaterialOrder> {
  const { data, error } = await supabase
    .from('employer_material_orders')
    .insert(order)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(
  id: string,
  status: string,
  deliveryDate?: string
): Promise<MaterialOrder> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: any = { status };
  if (deliveryDate) updates.delivery_date = deliveryDate;

  const { data, error } = await supabase
    .from('employer_material_orders')
    .update(updates)
    .eq('id', id)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

// Price Book
export async function getPriceBook(): Promise<PriceBookItem[]> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .select('*, supplier:employer_suppliers(name)')
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createPriceBookItem(
  item: Omit<PriceBookItem, 'id' | 'created_at' | 'updated_at' | 'markup' | 'suppliers'>
): Promise<PriceBookItem> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .insert(item)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

export async function updatePriceBookItem(
  id: string,
  updates: Partial<PriceBookItem>
): Promise<PriceBookItem> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .update(updates)
    .eq('id', id)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

export async function deletePriceBookItem(id: string): Promise<void> {
  const { error } = await supabase.from('employer_price_book').delete().eq('id', id);
  if (error) throw error;
}

// Low stock only means something for items whose stock is actually being
// tracked. Quick-add (0/0) and CSV import (0/10) both leave stock at 0 —
// flagging every untracked pricing row buried the signal under "Low stock"
// pills on 100% of the book.
export const isLowStock = (item: { stock_level: number; reorder_level: number }) =>
  Number(item.reorder_level) > 0 &&
  Number(item.stock_level) > 0 &&
  Number(item.stock_level) <= Number(item.reorder_level);

export async function getLowStockItems(): Promise<PriceBookItem[]> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .select('*, supplier:employer_suppliers(name)')
    .order('stock_level', { ascending: true });
  if (error) throw error;
  return (data || []).filter(isLowStock);
}

// Bulk import price book items (for CSV import)
export async function bulkCreatePriceBookItems(
  items: Omit<PriceBookItem, 'id' | 'created_at' | 'updated_at' | 'markup' | 'suppliers'>[]
): Promise<{ inserted: number; errors: number }> {
  let inserted = 0;
  let errors = 0;

  // Insert in batches of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    const { data, error } = await supabase.from('employer_price_book').insert(batch).select();

    if (error) {
      console.error('Batch insert error:', error);
      errors += batch.length;
    } else {
      inserted += data?.length || 0;
    }
  }

  return { inserted, errors };
}

// Search price book with pagination
export async function searchPriceBook(
  query: string,
  category?: string,
  page = 0,
  limit = 20
): Promise<{ items: PriceBookItem[]; total: number }> {
  let q = supabase
    .from('employer_price_book')
    .select('*, supplier:employer_suppliers(name)', { count: 'exact' });

  if (query && query.length >= 2) {
    q = q.or(`name.ilike.%${query}%,sku.ilike.%${query}%`);
  }

  if (category) {
    q = q.eq('category', category);
  }

  const { data, count, error } = await q.range(page * limit, (page + 1) * limit - 1).order('name');

  if (error) throw error;

  return {
    items: data || [],
    total: count || 0,
  };
}

// Get price book stats (for dashboard)
export async function getPriceBookStats(): Promise<{
  totalItems: number;
  avgMarkup: number;
  lowStock: number;
  stockValue: number;
}> {
  // PostgREST caps un-ranged selects at 1,000 rows while `count` reports the
  // true total — page through everything so the aggregates cover the whole
  // book (CSV imports regularly exceed 1,000 lines).
  const PAGE = 1000;
  type StatsRow = {
    buy_price: number;
    sell_price: number;
    stock_level: number;
    reorder_level: number;
  };
  const items: StatsRow[] = [];
  let totalItems = 0;

  for (let page = 0; ; page++) {
    const { data, count, error } = await supabase
      .from('employer_price_book')
      .select('buy_price, sell_price, stock_level, reorder_level', { count: 'exact' })
      .range(page * PAGE, (page + 1) * PAGE - 1);

    if (error) throw error;

    const rows = (data || []) as StatsRow[];
    items.push(...rows);
    totalItems = count || items.length;
    if (rows.length < PAGE || items.length >= totalItems) break;
  }

  let totalMarkup = 0;
  let markupCount = 0;
  let lowStock = 0;
  let stockValue = 0;

  items.forEach((item) => {
    if (item.buy_price > 0) {
      totalMarkup += ((item.sell_price - item.buy_price) / item.buy_price) * 100;
      markupCount++;
    }
    if (isLowStock(item)) {
      lowStock++;
    }
    stockValue += item.buy_price * item.stock_level;
  });

  return {
    totalItems,
    avgMarkup: markupCount > 0 ? Math.round(totalMarkup / markupCount) : 0,
    lowStock,
    stockValue: Math.round(stockValue),
  };
}

// Generate next quote/invoice number.
// Numeric max across the year's numbers — a string-sorted LIMIT 1 rolls over
// once the counter outgrows its padding (e.g. '999' sorts above '1000').
// The queries below order newest-first: PostgREST caps un-ranged selects at
// 1,000 rows, and sequence numbers only grow over time, so the current max is
// always inside the newest-1,000 window even past the cap.
const nextSequence = (numbers: (string | null)[], prefix: string): number => {
  let max = 0;
  for (const n of numbers) {
    if (!n || !n.startsWith(prefix)) continue;
    const seq = parseInt(n.slice(prefix.length), 10);
    if (Number.isFinite(seq) && seq > max) max = seq;
  }
  return max + 1;
};

export async function getNextQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_quotes')
    .select('quote_number')
    .like('quote_number', `QU-${year}-%`)
    .order('created_at', { ascending: false });

  const next = nextSequence((data ?? []).map((r) => r.quote_number), `QU-${year}-`);
  return `QU-${year}-${String(next).padStart(4, '0')}`;
}

export async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_invoices')
    .select('invoice_number')
    .like('invoice_number', `INV-${year}-%`)
    .order('created_at', { ascending: false });

  const next = nextSequence((data ?? []).map((r) => r.invoice_number), `INV-${year}-`);
  return `INV-${year}-${String(next).padStart(3, '0')}`;
}

export async function getNextOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_material_orders')
    .select('order_number')
    .like('order_number', `PO-${year}-%`)
    .order('created_at', { ascending: false });

  const next = nextSequence((data ?? []).map((r) => r.order_number), `PO-${year}-`);
  return `PO-${year}-${String(next).padStart(4, '0')}`;
}

// Stripe Connect Status
export interface StripeConnectStatus {
  connected: boolean;
  stripeConfigured: boolean;
  account?: {
    id: string;
    stripeAccountId: string;
    status: string;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    businessName: string | null;
    onboardingCompleted: boolean;
    requirementsCurrently?: string[];
    requirementsPending?: string[];
  };
  message?: string;
  cached?: boolean;
}

export async function getStripeConnectStatus(): Promise<StripeConnectStatus> {
  // Same engine as the electrician side: per-user, JWT-verified, status held
  // on company_profiles. The response is flat — map it to the card's shape.
  const { data, error } = await supabase.functions.invoke('get-stripe-connect-status');

  if (error) {
    const msg = error.message || '';
    return {
      connected: false,
      stripeConfigured: !msg.includes('STRIPE_SECRET_KEY'),
      message: msg,
    };
  }

  if (!data?.connected) {
    return { connected: false, stripeConfigured: true };
  }

  return {
    connected: true,
    stripeConfigured: true,
    account: {
      id: data.accountId,
      stripeAccountId: data.accountId,
      status: data.status,
      chargesEnabled: !!data.chargesEnabled,
      payoutsEnabled: !!data.payoutsEnabled,
      businessName: null,
      onboardingCompleted: !!data.detailsSubmitted,
      requirementsCurrently: data.requirements || [],
    },
  };
}

export async function createStripeConnectAccount(
  _businessName: string,
  _email: string | null
): Promise<{ onboardingUrl: string; accountId: string; isExisting: boolean }> {
  // create-stripe-connect-account is idempotent: creates the Express account
  // (from the caller's company profile) or returns a fresh onboarding /
  // dashboard link for an existing one. It builds success/refresh URLs from
  // returnUrl itself.
  const { data, error } = await supabase.functions.invoke('create-stripe-connect-account', {
    body: { returnUrl: `${window.location.origin}/employer?section=settings` },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return {
    onboardingUrl: data.url,
    accountId: data.accountId || '',
    isExisting: data.type === 'dashboard',
  };
}

export async function getStripeOnboardingLink(
  _type: 'onboarding' | 'dashboard' = 'onboarding'
): Promise<{ url: string }> {
  // Idempotent re-entry: pending account → onboarding link, active account →
  // Express dashboard login link.
  const { data, error } = await supabase.functions.invoke('create-stripe-connect-account', {
    body: { returnUrl: `${window.location.origin}/employer?section=settings` },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return { url: data.url };
}

export async function disconnectStripeConnect(): Promise<{ success: boolean }> {
  // The connection is two columns on the caller's own company profile —
  // owner RLS covers it, no privileged function involved. The Stripe account
  // itself is untouched.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('company_profiles')
    .update({ stripe_account_id: null, stripe_account_status: null })
    .eq('user_id', user.id);

  if (error) throw error;
  return { success: true };
}