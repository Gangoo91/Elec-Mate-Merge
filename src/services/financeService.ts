import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

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
/** Records surfaced from the Electrical Hub are read-only projections here.
 *  Absent/undefined = this hub's own record, which is fully editable. */
export type FinanceRecordSource = 'electrical_hub';

/** Bridged rows belong to another hub — block mutations rather than let them
 *  silently affect zero rows. */
export const isBridgedRecord = (r: { source?: string | null }): boolean =>
  r.source === 'electrical_hub';

export interface Quote {
  id: string;
  source?: FinanceRecordSource | null;
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
  /** The shared quotes row's settings (VAT, CIS, terms, discount…). */
  settings?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  // Customer response, from the shared `quotes` row (ELE-1947).
  acceptance_status?: string | null;
  accepted_at?: string | null;
  accepted_by_name?: string | null;
  /** A data: URL captured on the public quote page. */
  signature_url?: string | null;
  public_token?: string | null;
}

export interface Invoice {
  id: string;
  source?: FinanceRecordSource | null;
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
  // From the shared `quotes` row (ELE-1947).
  client_email?: string | null;
  client_phone?: string | null;
  client_address?: string | null;
  /** Stripe payment link, when the firm takes card payments. */
  pay_url?: string | null;
  public_token?: string | null;
  sent_at?: string | null;
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

export type POStatus = 'Draft' | 'Sent' | 'Confirmed' | 'Part-received' | 'Received' | 'Cancelled';

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
//
// Two sources, deliberately. `employer_quotes` is the Employer Hub's own table;
// `quotes` is where the Electrical Hub quote/invoice builder actually writes,
// and is the one carrying real trading history. An owner quoting in the
// Electrical Hub and an office manager working in the Employer Hub were
// otherwise looking at two systems that never met. The bridged rows are
// READ-ONLY projections (see get_employer_bridged_quotes) — creating and
// editing still happens in whichever hub owns the record.
export async function getQuotes(): Promise<Quote[]> {
  // Every firm quote lives in the shared `quotes` table (employer_quotes is
  // retired, 6 Oct). The RPC scopes it to the firm, owner and co-admins.
  // Cast: RPC postdates the last types.ts regeneration.
  const { data, error } = await supabase.rpc('get_employer_bridged_quotes' as never);
  if (error) throw error;
  return ((data ?? []) as unknown as Quote[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Create a quote.
 *
 * Writes to `quotes` for the same reasons as createInvoice: `employer_quotes`
 * is invisible to the Electrical Hub and is a dead-end record (no public_token,
 * pdf_url, acceptance/signature, reminders or payment link).
 *
 * This is the PROGRAMMATIC path — used by the AI quote generator and by
 * duplicate/variation actions. Interactive quote building should use the shared
 * `QuoteWizard`, which already writes here natively.
 */
export async function createQuote(
  quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>
): Promise<Quote> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const ownerId = (await getActingEmployerId(user.id)) ?? user.id;

  const q = quote as Quote & {
    client_email?: string | null;
    client_phone?: string | null;
    client_address?: string | null;
    vat_rate?: number;
    reverse_charge?: boolean;
    cis_enabled?: boolean;
    cis_rate?: number;
  };

  // expiry_date is NOT NULL on quotes. Honour valid_until, else 30 days.
  const expiry = q.valid_until ?? new Date(Date.now() + 30 * 86_400_000).toISOString();

  const { data, error } = await supabase
    .from('quotes')
    .insert({
      user_id: ownerId,
      // ELE-1947: never send a client-made number. The quotes table's
      // assign_document_numbers trigger allocates from the OWNER's counter
      // (format_document_number + next_document_number_for), which is also
      // correct when a co-admin raises it. The old QU-YYYY-NNNN numbers came
      // from the empty employer_quotes table, so every hub quote was
      // QU-YYYY-0001 and the second one failed the (user_id, quote_number)
      // unique index.
      quote_number: null,
      client_data: {
        name: q.client,
        email: q.client_email ?? null,
        phone: q.client_phone ?? null,
        address: q.client_address ?? null,
      },
      items: q.line_items ?? [],
      // Settings must agree with the stored VAT: with no rate given (the AI
      // generator path) "registered" follows whether VAT was charged.
      settings: {
        ...(q.settings ?? {}),
        vatRate: q.vat_rate ?? 20,
        vatRegistered:
          q.vat_rate != null ? q.vat_rate > 0 : Number(q.vat_amount ?? 0) > 0,
        reverseCharge: q.reverse_charge ?? false,
        cisEnabled: q.cis_enabled ?? false,
        ...(q.cis_enabled ? { cisRate: q.cis_rate ?? 20 } : {}),
      },
      subtotal: q.subtotal ?? 0,
      vat_amount: q.vat_amount ?? 0,
      total: q.value ?? 0,
      // Employer Hub statuses are title-case; the real table stores lowercase.
      status: (q.status || 'Draft').toLowerCase(),
      expiry_date: expiry,
      notes: q.notes ?? null,
      job_details: q.job_title ? { title: q.job_title } : {},
      // The firm job this quote is for (ELE-1947): drives job money.
      // employer_job_id (6 Oct) is newer than the generated types.
      ...({ employer_job_id: q.job_id ?? null } as unknown as Record<string, never>),
    })
    .select()
    .single();
  if (error) throw error;

  return {
    ...(quote as Quote),
    id: (data as { id: string }).id,
    quote_number: (data as { quote_number: string }).quote_number,
    created_at: (data as { created_at: string }).created_at,
    updated_at: (data as { updated_at: string }).updated_at,
    source: 'electrical_hub',
  } as Quote;
}

// ── ELE-1947: actions on records that live in `quotes` ─────────────────────
// Every quote/invoice the hub creates (and every one the owner raised in the
// Electrical Hub) is a row in `quotes`. The old employer_quotes/employer_invoices
// tables are empty. These helpers act on `quotes` directly and reuse the
// Electrical Hub's own send functions, so both hubs behave identically.

const QUOTE_STATUS_TO_ROW: Record<string, { status: string; acceptance_status?: string }> = {
  draft: { status: 'draft' },
  sent: { status: 'sent' },
  pending: { status: 'sent' },
  approved: { status: 'approved', acceptance_status: 'accepted' },
  accepted: { status: 'approved', acceptance_status: 'accepted' },
  'client accepted': { status: 'approved', acceptance_status: 'accepted' },
  rejected: { status: 'rejected', acceptance_status: 'rejected' },
  declined: { status: 'rejected', acceptance_status: 'rejected' },
  'client declined': { status: 'rejected', acceptance_status: 'rejected' },
};

async function quotesRowExists(id: string): Promise<boolean> {
  const { data } = await supabase.from('quotes').select('id').eq('id', id).maybeSingle();
  return !!data;
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Please sign in again.');
  return { Authorization: `Bearer ${token}` };
}

async function invokeOrExplain(fn: string, body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke(fn, {
    body,
    headers: await authHeader(),
  });
  if (error) {
    const { readEdgeFunctionError } = await import('@/lib/edgeFunctionError');
    const parsed = await readEdgeFunctionError<{ error?: string; hint?: string; message?: string }>(
      error
    );
    throw new Error(
      (parsed?.error && (parsed.hint ? `${parsed.error} (${parsed.hint})` : parsed.error)) ||
        parsed?.message ||
        'That did not go through. Please try again.'
    );
  }
  if (data?.error) throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
  return data;
}

/**
 * The customer's link to view, sign and accept a quote — the same page the
 * Electrical Hub sends (/public-quote/:token). Every quote carries its own
 * public_token; the quote_views fallback only covers very old rows.
 */
export async function getQuoteCustomerLink(
  quote: Pick<Quote, 'id' | 'public_token'>
): Promise<string> {
  let token = quote.public_token ?? null;
  if (!token) {
    const { data } = await supabase
      .from('quotes')
      .select('public_token')
      .eq('id', quote.id)
      .maybeSingle();
    token = (data?.public_token as string | null) ?? null;
  }
  if (!token) {
    // A BEFORE INSERT trigger copies the quote's own token onto the view row.
    const { data, error } = await supabase
      .from('quote_views')
      .insert({
        quote_id: quote.id,
        public_token: crypto.randomUUID(),
        is_active: true,
        view_count: 0,
      })
      .select('public_token')
      .single();
    if (error) throw new Error('Could not make a link for this quote.');
    token = data.public_token as string;
  }
  return `https://www.elec-mate.com/public-quote/${token}`;
}

/** Save the customer's email onto the quote so it can be sent. */
export async function setQuoteClientEmail(quoteId: string, email: string): Promise<void> {
  const { data, error } = await supabase
    .from('quotes')
    .select('client_data')
    .eq('id', quoteId)
    .maybeSingle();
  if (error || !data) throw new Error('Could not find this quote.');
  const clientData = {
    ...((data.client_data as Record<string, unknown>) ?? {}),
    email: email.trim(),
  };
  const { error: updateError } = await supabase
    .from('quotes')
    .update({ client_data: clientData as never })
    .eq('id', quoteId);
  if (updateError) throw new Error('Could not save the email on this quote.');
}

export async function updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
  // Every quote is a row in the shared `quotes` table (employer_quotes retired).
  if (!(await quotesRowExists(id))) throw new Error('Quote not found.');
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.status) {
    const mapped = QUOTE_STATUS_TO_ROW[updates.status.toLowerCase()];
    if (!mapped) throw new Error(`Unknown quote status: ${updates.status}`);
    Object.assign(patch, mapped);
    if (mapped.acceptance_status === 'accepted') patch.accepted_at = new Date().toISOString();
  }
  if (updates.notes !== undefined) patch.notes = updates.notes;
  if (updates.valid_until !== undefined && updates.valid_until) patch.expiry_date = updates.valid_until;
  const { data: row, error: rowErr } = await supabase
    .from('quotes')
    .update(patch as never)
    .eq('id', id)
    .select('id, quote_number, status, created_at, updated_at')
    .single();
  if (rowErr) throw rowErr;
  return {
    ...(updates as Quote),
    id,
    quote_number: (row as { quote_number: string }).quote_number,
    status: updates.status ?? (row as { status: string }).status,
    created_at: (row as { created_at: string }).created_at,
    updated_at: (row as { updated_at: string }).updated_at,
    source: 'electrical_hub',
  } as Quote;
}

export async function sendQuote(id: string): Promise<Quote> {
  if (await quotesRowExists(id)) {
    // Same path as the Electrical Hub: builds the PDF, emails the client with
    // the accept link, and marks the quote sent server-side.
    await invokeOrExplain('send-quote-resend', { quoteId: id });
    const { data: row } = await supabase
      .from('quotes')
      .select('id, quote_number, created_at, updated_at')
      .eq('id', id)
      .single();
    return {
      id,
      quote_number: (row as { quote_number: string } | null)?.quote_number ?? '',
      status: 'Sent',
      created_at: (row as { created_at: string } | null)?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'electrical_hub',
    } as Quote;
  }
  return updateQuote(id, { status: 'Sent', sent_date: new Date().toISOString().split('T')[0] });
}

// Invoices. Same two-source bridge as getQuotes — note that raised invoices
// live in the `quotes` table itself (invoice_raised / invoice_status), which is
// why they are projected from there rather than from a separate invoices table.
export async function getInvoices(): Promise<Invoice[]> {
  // Raised invoices live in `quotes` (invoice_raised = true); employer_invoices
  // is retired (6 Oct).
  const { data, error } = await supabase.rpc('get_employer_bridged_invoices' as never);
  if (error) throw error;
  return ((data ?? []) as unknown as Invoice[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Raise an invoice.
 *
 * Writes to `quotes` — the table the Electrical Hub invoice builder uses — not
 * to `employer_invoices`. Two reasons, and the second is the important one:
 *
 * 1. `employer_invoices` is invisible to the Electrical Hub. An invoice raised
 *    in the office would never appear on the owner's own invoice list, so the
 *    two halves of a business kept separate books.
 * 2. `employer_invoices` is a dead-end record. It has no public_token, no
 *    pdf_url, no stripe_payment_link_url, no acceptance/signature, no reminder
 *    tracking and no partial payments — 17 capabilities the real table has.
 *    An invoice raised there literally cannot be sent, paid online or chased.
 *
 * Field mapping: the hub's flat shape folds into the real table's jsonb
 * columns. CIS/VAT/reverse-charge live in `settings` exactly as the Electrical
 * Hub writes them (cisEnabled/cisRate/reverseCharge/vatRate), so nothing is
 * lost. `invoice_raised` is what makes the row an invoice rather than a quote.
 */
export async function createInvoice(
  invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>
): Promise<Invoice> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const ownerId = (await getActingEmployerId(user.id)) ?? user.id;

  const inv = invoice as Invoice & {
    client_email?: string | null;
    client_phone?: string | null;
    client_id?: string | null;
    vat_rate?: number;
    reverse_charge?: boolean;
    cis_enabled?: boolean;
    cis_rate?: number;
  };

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('quotes')
    .insert({
      user_id: ownerId,
      // ELE-1947: both numbers are allocated by the assign_document_numbers
      // trigger from the owner's counters (see createQuote).
      quote_number: null,
      invoice_number: null,
      invoice_raised: true,
      invoice_status: (inv.status || 'Draft').toLowerCase(),
      invoice_date: now,
      invoice_due_date: inv.due_date ?? null,
      invoice_notes: inv.notes ?? null,
      client_data: {
        name: inv.client,
        email: inv.client_email ?? null,
        phone: inv.client_phone ?? null,
        ...(inv.client_id ? { customerId: inv.client_id } : {}),
      },
      items: inv.line_items ?? [],
      settings: {
        vatRate: inv.vat_rate ?? 20,
        vatRegistered: (inv.vat_rate ?? 0) > 0,
        reverseCharge: inv.reverse_charge ?? false,
        cisEnabled: inv.cis_enabled ?? false,
        ...(inv.cis_enabled ? { cisRate: inv.cis_rate ?? 20 } : {}),
      },
      subtotal: inv.subtotal ?? 0,
      vat_amount: inv.vat_amount ?? 0,
      total: inv.amount ?? 0,
      status: 'approved', // an invoice is a won quote
      // NOT NULL on quotes; an invoice has no quote expiry, so mirror the due date.
      expiry_date: inv.due_date ?? now,
      job_details: inv.project ? { title: inv.project } : {},
      ...({ employer_job_id: inv.job_id ?? null } as unknown as Record<string, never>),
      customer_id: inv.client_id ?? null,
    })
    .select()
    .single();
  if (error) throw error;

  // Return the hub's shape so callers are unchanged.
  return {
    ...(invoice as Invoice),
    id: (data as { id: string }).id,
    invoice_number: (data as { invoice_number: string }).invoice_number,
    created_at: (data as { created_at: string }).created_at,
    updated_at: (data as { updated_at: string }).updated_at,
    source: 'electrical_hub',
  } as Invoice;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
  // See updateQuote — bridged invoices live in `quotes` and are read-only here.
  // .select().single() already fails on a bridged id (0 rows matched); this
  // just turns a cryptic PostgREST error into something actionable.
  // Every invoice is a row in `quotes` (employer_invoices retired, 6 Oct).
  if (await quotesRowExists(id)) {
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (updates.status) {
      const st = updates.status.toLowerCase();
      patch.invoice_status = st;
      if (st === 'paid') {
        patch.invoice_paid_at = updates.paid_date
          ? new Date(updates.paid_date).toISOString()
          : new Date().toISOString();
      }
    }
    if (updates.due_date !== undefined) patch.invoice_due_date = updates.due_date;
    if (updates.notes !== undefined) patch.invoice_notes = updates.notes;
    const { data: row, error: rowErr } = await supabase
      .from('quotes')
      .update(patch as never)
      .eq('id', id)
      .select('id, invoice_number, created_at, updated_at')
      .single();
    if (rowErr) throw rowErr;
    return {
      ...(updates as Invoice),
      id,
      invoice_number: (row as { invoice_number: string }).invoice_number,
      created_at: (row as { created_at: string }).created_at,
      updated_at: (row as { updated_at: string }).updated_at,
      source: 'electrical_hub',
    } as Invoice;
  }
  throw new Error('Invoice not found.');
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  // invoice_paid_at drives the existing triggers (certificate release on
  // payment, invoice status sync) exactly as in the Electrical Hub.
  return updateInvoice(id, { status: 'Paid', paid_date: new Date().toISOString().split('T')[0] });
}

export async function getOverdueInvoices(): Promise<Invoice[]> {
  // Nothing writes 'Overdue' reliably — sent, unpaid and past due is overdue.
  const today = new Date().toISOString().slice(0, 10);
  return (await getInvoices())
    .filter((i) => !['Paid', 'Draft', 'Cancelled', 'Void'].includes(i.status) && !!i.due_date && i.due_date.slice(0, 10) < today)
    .sort((a, b) => (a.due_date ?? '').localeCompare(b.due_date ?? ''));
}

export async function sendInvoice(
  id: string,
  recipientEmail?: string
): Promise<{ portalUrl: string; accessToken: string }> {
  // Read from `quotes` — every invoice the hub shows is now a row there
  // (created by the wizard, the Electrical Hub, or createInvoice above).
  // This previously read `employer_invoices`, so Chase failed on EVERY invoice
  // in the list: the id belongs to `quotes` and matched nothing.
  const { data: row, error: invoiceError } = await supabase
    .from('quotes')
    .select('id, client_data, invoice_number, quote_number, total')
    .eq('id', id)
    .maybeSingle();

  if (invoiceError) throw invoiceError;
  if (!row) throw new Error('Invoice not found.');

  const clientData = (row.client_data ?? {}) as {
    name?: string;
    email?: string;
  };
  const invoice = {
    client: clientData.name ?? 'Client',
    client_email: clientData.email ?? null,
  };

  // A real email address is required — the client NAME is not one
  const targetEmail = recipientEmail?.trim() || invoice.client_email?.trim();
  if (!targetEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(targetEmail)) {
    throw new Error('NEEDS_CLIENT_EMAIL');
  }
  // Remember the address on the row itself (client_data is the source of truth).
  if (recipientEmail && recipientEmail !== invoice.client_email) {
    await supabase
      .from('quotes')
      .update({ client_data: { ...clientData, email: targetEmail } })
      .eq('id', id);
  }

  // ELE-1947: the Electrical Hub's own send — PDF, email with the pay link when
  // the firm has card payments switched on, and invoice_status/sent stamps — on
  // the same `quotes` row. Replaces generate-invoice-link + send-finance-document,
  // which read the empty employer tables.
  const result = await invokeOrExplain('send-invoice-resend', { invoiceId: id });
  const { data: after } = await supabase
    .from('quotes')
    .select('public_token, stripe_payment_link_url')
    .eq('id', id)
    .maybeSingle();
  const token = (after as { public_token?: string } | null)?.public_token ?? '';
  return {
    portalUrl:
      (after as { stripe_payment_link_url?: string } | null)?.stripe_payment_link_url ||
      (result as { portalUrl?: string } | null)?.portalUrl ||
      '',
    accessToken: token,
  };
}

export async function generateInvoicePdf(id: string): Promise<{ html?: string; url?: string }> {
  const { data: row } = await supabase.from('quotes').select('*').eq('id', id).maybeSingle();
  if (row) {
    const r = row as { pdf_url?: string | null; user_id: string };
    if (r.pdf_url) return { url: r.pdf_url };
    // No stored PDF yet — generate it exactly as the Electrical Hub does.
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', r.user_id)
      .maybeSingle();
    const started = await invokeOrExplain('generate-pdf-monkey', {
      quote: row,
      companyProfile,
      invoice_mode: true,
      force_regenerate: true,
    });
    let url: string | undefined = started?.downloadUrl || started?.pdfUrl;
    const documentId: string | undefined = started?.documentId;
    for (let i = 0; !url && documentId && i < 30; i++) {
      await new Promise((res) => setTimeout(res, 2000));
      const status = await invokeOrExplain('generate-pdf-monkey', { documentId, mode: 'status' });
      url = status?.downloadUrl;
    }
    if (!url) throw new Error('The PDF is still being made — try again in a minute.');
    return { url };
  }
  // Every invoice lives in `quotes`; the old generate-invoice-pdf read the
  // retired employer_invoices table, so there is nothing to fall back to.
  throw new Error('Invoice not found.');
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
    // Status too: setting only paid_date left the claim showing "Approved".
    .update({ status: 'Paid', paid_date: new Date().toISOString().split('T')[0] })
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

// ELE-1947: quote and invoice numbers are allocated by the database on insert
// (assign_document_numbers trigger, per owner). There is no safe preview, so
// these return '' and the forms say "assigned when saved". Kept as functions so
// existing callers compile.
export async function getNextQuoteNumber(): Promise<string> {
  return '';
}

export async function getNextInvoiceNumber(): Promise<string> {
  return '';
}

export async function getNextOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { data } = await supabase
    .from('employer_material_orders')
    .select('order_number')
    .like('order_number', `PO-${year}-%`)
    .order('created_at', { ascending: false });

  const next = nextSequence(
    (data ?? []).map((r) => r.order_number),
    `PO-${year}-`
  );
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
