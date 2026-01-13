import { supabase } from "@/integrations/supabase/client";

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
  line_items: any[];
  notes: string | null;
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
  line_items: any[];
  notes: string | null;
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

export interface MaterialOrder {
  id: string;
  order_number: string;
  supplier_id: string;
  job_id: string | null;
  items: any[];
  total: number;
  status: string;
  order_date: string;
  delivery_date: string | null;
  ordered_by: string | null;
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

export async function createQuote(quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>): Promise<Quote> {
  const { data, error } = await supabase
    .from('employer_quotes')
    .insert(quote)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
  // Get original quote to check for status change
  const { data: originalQuote } = await supabase
    .from('employer_quotes')
    .select('status, created_by, quote_number, client')
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
  if (originalQuote?.created_by && updates.status && originalQuote.status !== updates.status) {
    const statusLower = updates.status.toLowerCase();
    if (statusLower === 'accepted' || statusLower === 'approved') {
      sendPushNotification(
        originalQuote.created_by,
        '🎉 Quote Accepted!',
        `${originalQuote.client} accepted quote #${originalQuote.quote_number}`,
        'job', // Using job type as quotes are business events
        { quoteId: id, status: 'accepted' }
      ).catch(console.error);
    } else if (statusLower === 'rejected' || statusLower === 'declined') {
      sendPushNotification(
        originalQuote.created_by,
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

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>): Promise<Invoice> {
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
  // Get invoice details for notification
  const { data: invoice } = await supabase
    .from('employer_invoices')
    .select('invoice_number, client, amount, created_by')
    .eq('id', id)
    .single();

  const result = await updateInvoice(id, { status: 'Paid', paid_date: new Date().toISOString().split('T')[0] });

  // Send push notification
  if (invoice?.created_by) {
    sendPushNotification(
      invoice.created_by,
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

export async function sendInvoice(id: string): Promise<{ portalUrl: string; accessToken: string }> {
  // First get the invoice to get client details
  const { data: invoice, error: invoiceError } = await supabase
    .from('employer_invoices')
    .select('*')
    .eq('id', id)
    .single();
    
  if (invoiceError) throw invoiceError;
  
  // Generate the invoice link
  const { data, error } = await supabase.functions.invoke('generate-invoice-link', {
    body: { invoiceId: id }
  });
  
  if (error) throw error;
  
  // Now send the email with the Pay Now link included
  const { error: sendError } = await supabase.functions.invoke('send-finance-document', {
    body: {
      type: 'invoice',
      documentId: id,
      recipientEmail: invoice.client, // This would ideally be a client email field
      recipientName: invoice.client,
      invoicePortalLink: data.portalUrl
    }
  });
  
  if (sendError) {
    console.error('Failed to send invoice email:', sendError);
    // Don't throw - the link was still generated successfully
  }
  
  // Update invoice status to Sent/Pending
  await updateInvoice(id, { status: 'Pending' });
  
  return data;
}

export async function generateInvoicePdf(id: string): Promise<{ html: string }> {
  const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
    body: { invoiceId: id }
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

export async function createExpenseClaim(claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>): Promise<ExpenseClaim> {
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
      approved_date: new Date().toISOString() 
    })
    .eq('id', id)
    .select('*, employee:employer_employees(name, avatar_initials)')
    .single();
  if (error) throw error;
  return data;
}

export async function rejectExpense(id: string, approvedBy: string, reason: string): Promise<ExpenseClaim> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .update({ 
      status: 'Rejected', 
      approved_by: approvedBy, 
      approved_date: new Date().toISOString(),
      rejection_reason: reason
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

export async function createSupplier(supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>): Promise<Supplier> {
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

export async function createMaterialOrder(order: Omit<MaterialOrder, 'id' | 'created_at' | 'updated_at' | 'suppliers'>): Promise<MaterialOrder> {
  const { data, error } = await supabase
    .from('employer_material_orders')
    .insert(order)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: string, status: string, deliveryDate?: string): Promise<MaterialOrder> {
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

export async function createPriceBookItem(item: Omit<PriceBookItem, 'id' | 'created_at' | 'updated_at' | 'markup' | 'suppliers'>): Promise<PriceBookItem> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .insert(item)
    .select('*, supplier:employer_suppliers(name)')
    .single();
  if (error) throw error;
  return data;
}

export async function updatePriceBookItem(id: string, updates: Partial<PriceBookItem>): Promise<PriceBookItem> {
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
  const { error } = await supabase
    .from('employer_price_book')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function getLowStockItems(): Promise<PriceBookItem[]> {
  const { data, error } = await supabase
    .from('employer_price_book')
    .select('*, supplier:employer_suppliers(name)')
    .order('stock_level', { ascending: true });
  if (error) throw error;
  return (data || []).filter(item => item.stock_level <= item.reorder_level);
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
    
    const { data, error } = await supabase
      .from('employer_price_book')
      .insert(batch)
      .select();
    
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

  const { data, count, error } = await q
    .range(page * limit, (page + 1) * limit - 1)
    .order('name');

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
  const { data, count, error } = await supabase
    .from('employer_price_book')
    .select('buy_price, sell_price, stock_level, reorder_level', { count: 'exact' });

  if (error) throw error;

  const items = data || [];
  const totalItems = count || 0;
  
  let totalMarkup = 0;
  let lowStock = 0;
  let stockValue = 0;

  items.forEach(item => {
    if (item.buy_price > 0) {
      totalMarkup += ((item.sell_price - item.buy_price) / item.buy_price) * 100;
    }
    if (item.stock_level <= item.reorder_level) {
      lowStock++;
    }
    stockValue += item.buy_price * item.stock_level;
  });

  return {
    totalItems,
    avgMarkup: totalItems > 0 ? Math.round(totalMarkup / totalItems) : 0,
    lowStock,
    stockValue: Math.round(stockValue),
  };
}

// Generate next quote/invoice number
export async function getNextQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_quotes')
    .select('quote_number')
    .like('quote_number', `QU-${year}-%`)
    .order('quote_number', { ascending: false })
    .limit(1);
  
  if (data && data.length > 0) {
    const match = data[0].quote_number.match(/QU-\d{4}-(\d+)/);
    if (match) {
      const nextNum = parseInt(match[1], 10) + 1;
      return `QU-${year}-${String(nextNum).padStart(4, '0')}`;
    }
  }
  return `QU-${year}-0001`;
}

export async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_invoices')
    .select('invoice_number')
    .like('invoice_number', `INV-${year}-%`)
    .order('invoice_number', { ascending: false })
    .limit(1);
  
  if (data && data.length > 0) {
    const lastNum = parseInt(data[0].invoice_number.split('-')[2]) || 0;
    return `INV-${year}-${String(lastNum + 1).padStart(3, '0')}`;
  }
  return `INV-${year}-001`;
}

export async function getNextOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_material_orders')
    .select('order_number')
    .like('order_number', `ORD-${year}-%`)
    .order('order_number', { ascending: false })
    .limit(1);
  
  if (data && data.length > 0) {
    const lastNum = parseInt(data[0].order_number.split('-')[2]) || 0;
    return `ORD-${year}-${String(lastNum + 1).padStart(3, '0')}`;
  }
  return `ORD-${year}-001`;
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
  const { data, error } = await supabase.functions.invoke('get-stripe-connect-status');
  
  if (error) {
    console.error('Error fetching Stripe Connect status:', error);
    return { connected: false, stripeConfigured: false, message: error.message };
  }
  
  return data;
}

export async function createStripeConnectAccount(
  businessName: string,
  email: string | null
): Promise<{ onboardingUrl: string; accountId: string; isExisting: boolean }> {
  const currentUrl = window.location.origin;
  
  const { data, error } = await supabase.functions.invoke('create-stripe-connect-account', {
    body: {
      businessName,
      email,
      returnUrl: `${currentUrl}/employer?tab=settings&stripe=success`,
      refreshUrl: `${currentUrl}/employer?tab=settings&stripe=refresh`,
    }
  });
  
  if (error) throw error;
  return data;
}

export async function getStripeOnboardingLink(
  type: 'onboarding' | 'dashboard' = 'onboarding'
): Promise<{ url: string }> {
  const currentUrl = window.location.origin;
  
  const { data, error } = await supabase.functions.invoke('create-stripe-connect-onboarding-link', {
    body: {
      type,
      returnUrl: `${currentUrl}/employer?tab=settings&stripe=success`,
      refreshUrl: `${currentUrl}/employer?tab=settings&stripe=refresh`,
    }
  });
  
  if (error) throw error;
  return data;
}

export async function disconnectStripeConnect(): Promise<{ success: boolean }> {
  const { data, error } = await supabase.functions.invoke('disconnect-stripe-connect');
  
  if (error) throw error;
  return data;
}
