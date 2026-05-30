/**
 * Mate Document helpers — find & send real quotes / invoices / certs.
 *
 * Used by the Business Hub chat (tasks-ai-assistant) so Mate can:
 *  - List existing quotes / invoices / certificates for a customer
 *  - Send the real PDF as an email attachment, on the user's behalf
 *
 * Sending wraps the existing send-quote-resend / send-invoice-resend /
 * send-certificate-resend edge functions — we do NOT duplicate PDF
 * generation or template logic, we just call them with the user's JWT.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = any;

export interface FindDocumentsOpts {
  /** Free-text match against customer name (case-insensitive). */
  query?: string;
  /** Filter by document kind. Default 'all'. */
  kind?: 'quote' | 'invoice' | 'cert' | 'all';
  /** Filter by status — e.g. 'draft', 'sent', 'overdue', 'complete'. Optional. */
  status?: string;
  /** Max rows per kind. Default 8. */
  limit?: number;
}

function safeJson(v: unknown): Record<string, unknown> | null {
  if (!v) return null;
  if (typeof v === 'object') return v as Record<string, unknown>;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return null;
    }
  }
  return null;
}

function fmtMoney(n: unknown): string {
  const num = typeof n === 'number' ? n : parseFloat(String(n ?? ''));
  if (!isFinite(num)) return '';
  return `£${num.toFixed(2)}`;
}

function matchQuery(name: string | null | undefined, q?: string): boolean {
  if (!q) return true;
  if (!name) return false;
  return name.toLowerCase().includes(q.toLowerCase());
}

/**
 * Search across quotes, invoices and certificates the user owns.
 * Returns a model-friendly text block — one line per result, with id, ref,
 * customer, total, status. Mate uses the id to call sendDocument.
 */
export async function findDocuments(
  supabase: SupabaseClient,
  userId: string | null,
  opts: FindDocumentsOpts = {}
): Promise<string> {
  if (!userId) return 'Cannot search documents — no user in session.';
  const kind = opts.kind || 'all';
  const limit = opts.limit && opts.limit > 0 ? Math.min(opts.limit, 25) : 8;
  const lines: string[] = [];

  // ─── Quotes ──────────────────────────────────────────────────────────
  if (kind === 'quote' || kind === 'all') {
    let q = supabase
      .from('quotes')
      .select('id, quote_number, client_data, total, status, created_at, expiry_date')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (opts.status) q = q.eq('status', opts.status);
    const { data, error } = await q;
    if (error) {
      console.warn('[mate-documents] quotes search error', error);
    } else {
      for (const r of data || []) {
        const client = safeJson(r.client_data);
        const name = (client?.name as string) || '';
        if (!matchQuery(name, opts.query)) continue;
        const email = (client?.email as string) || '';
        const ref = r.quote_number || `Q-${String(r.id).slice(0, 8)}`;
        lines.push(
          `[QUOTE] ref=${ref} · id=${r.id} · customer=${name || 'unknown'}${
            email ? ` (${email})` : ''
          } · total=${fmtMoney(r.total)} · status=${r.status || 'draft'}`
        );
      }
    }
  }

  // ─── Invoices ────────────────────────────────────────────────────────
  if (kind === 'invoice' || kind === 'all') {
    let q = supabase
      .from('invoices')
      .select('id, invoice_number, client_data, total, status, created_at, due_date')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (opts.status) q = q.eq('status', opts.status);
    const { data, error } = await q;
    if (error) {
      console.warn('[mate-documents] invoices search error', error);
    } else {
      for (const r of data || []) {
        const client = safeJson(r.client_data);
        const name = (client?.name as string) || '';
        if (!matchQuery(name, opts.query)) continue;
        const email = (client?.email as string) || '';
        const ref = r.invoice_number || `INV-${String(r.id).slice(0, 8)}`;
        lines.push(
          `[INVOICE] ref=${ref} · id=${r.id} · customer=${name || 'unknown'}${
            email ? ` (${email})` : ''
          } · total=${fmtMoney(r.total)} · status=${r.status || 'draft'}`
        );
      }
    }
  }

  // ─── Certificates (reports table) ────────────────────────────────────
  if (kind === 'cert' || kind === 'all') {
    let q = supabase
      .from('reports')
      .select(
        'id, report_id, report_type, status, created_at, customer_name, customer_email, address'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (opts.status) q = q.eq('status', opts.status);
    const { data, error } = await q;
    if (error) {
      console.warn('[mate-documents] reports search error', error);
    } else {
      for (const r of data || []) {
        const name = (r.customer_name as string) || '';
        if (!matchQuery(name, opts.query)) continue;
        const email = (r.customer_email as string) || '';
        const ref = r.report_id || r.report_type || `Cert-${String(r.id).slice(0, 8)}`;
        const addr = (r.address as string) || '';
        lines.push(
          `[CERT ${r.report_type || ''}] ref=${ref} · id=${r.id} · customer=${name || 'unknown'}${
            email ? ` (${email})` : ''
          }${addr ? ` · @ ${addr}` : ''} · status=${r.status || 'complete'}`
        );
      }
    }
  }

  if (!lines.length) {
    return 'No documents found matching that search. Try widening the query.';
  }
  return lines.join('\n');
}

export interface SendDocumentArgs {
  doc_type: 'quote' | 'invoice' | 'cert';
  doc_id: string;
  /** Optional override of the recipient email. Cert-only for now. */
  recipient_email?: string;
  /** Optional personal note that replaces the default body paragraph. Supported on all three doc types. */
  custom_message?: string;
  /** Optional override of the email subject line. Supported on quote + invoice (cert subject is template-driven). */
  custom_subject?: string;
}

/**
 * Send an existing quote / invoice / certificate to the recorded client.
 * Wraps the existing send-*-resend edge functions — they handle PDF
 * generation, attachment, branding and tracking. We just route by type
 * and forward the user's auth + optional subject/body overrides.
 */
export async function sendDocument(
  authHeader: string | null,
  args: SendDocumentArgs
): Promise<string> {
  if (!authHeader) {
    return 'Cannot send — no auth header on the chat request. The send tools need the user JWT.';
  }
  if (!args.doc_id) return 'Cannot send — missing doc_id.';

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!supabaseUrl) return 'Cannot send — SUPABASE_URL not configured.';

  let endpoint: string;
  let body: Record<string, unknown>;

  switch (args.doc_type) {
    case 'quote':
      endpoint = `${supabaseUrl}/functions/v1/send-quote-resend`;
      body = { quoteId: args.doc_id };
      if (args.custom_subject) body.customSubject = args.custom_subject;
      if (args.custom_message) body.customMessage = args.custom_message;
      break;
    case 'invoice':
      endpoint = `${supabaseUrl}/functions/v1/send-invoice-resend`;
      body = { invoiceId: args.doc_id };
      if (args.custom_subject) body.customSubject = args.custom_subject;
      if (args.custom_message) body.customMessage = args.custom_message;
      break;
    case 'cert':
      endpoint = `${supabaseUrl}/functions/v1/send-certificate-resend`;
      body = { reportId: args.doc_id };
      if (args.recipient_email) body.recipientEmail = args.recipient_email;
      if (args.custom_message) body.customMessage = args.custom_message;
      break;
    default:
      return `Unknown document type: ${args.doc_type}`;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      let msg = text;
      try {
        const parsed = JSON.parse(text);
        msg = parsed.error || parsed.message || text;
      } catch {
        // text already
      }
      return `Send failed (${res.status}): ${msg.slice(0, 300)}`;
    }
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // ignore
    }
    const id = parsed.emailId || parsed.id || parsed.messageId || 'sent';
    return `✓ Sent. PDF was attached. Email id: ${id}`;
  } catch (err) {
    console.error('[mate-documents] sendDocument error', err);
    return `Send failed: ${err instanceof Error ? err.message : 'unknown error'}`;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// CREATE — new quotes & invoices from chat
// ═══════════════════════════════════════════════════════════════════════

export interface MateLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  /** Optional link to a personal_inventory stock item. When present on an
   *  invoice line, stock decrements when the invoice is created. (ELE-1014) */
  inventory_item_id?: string;
}

export interface CreateQuoteArgs {
  client_name: string;
  client_email?: string;
  client_phone?: string;
  client_address?: string;
  client_postcode?: string;
  job_title: string;
  job_description?: string;
  line_items: MateLineItem[];
  /** VAT rate in percent. Default 20. Set 0 for non-VAT-registered. */
  vat_rate?: number;
  /** Days from today until the quote expires. Default 30. */
  expiry_days?: number;
  notes?: string;
}

export interface CreateInvoiceArgs extends CreateQuoteArgs {
  /** Days from today until the invoice is due. Default 30. */
  payment_days?: number;
}

function genRef(prefix: string): string {
  const d = new Date();
  const stamp =
    d.getFullYear().toString().slice(2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

function normaliseLines(lines: MateLineItem[]): {
  items: Array<{
    id: string;
    category: string;
    unit: string;
    notes: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    inventoryItemId?: string;
  }>;
  subtotal: number;
} {
  let subtotal = 0;
  const items = lines
    .filter((l) => l && l.description && Number(l.quantity) > 0 && Number(l.unitPrice) >= 0)
    .map((l) => {
      const quantity = Number(l.quantity);
      const unitPrice = Number(l.unitPrice);
      const totalPrice = Math.round(quantity * unitPrice * 100) / 100;
      subtotal += totalPrice;
      return {
        id: crypto.randomUUID(),
        category: 'materials',
        unit: 'each',
        notes: '',
        description: l.description.trim(),
        quantity,
        unitPrice,
        totalPrice,
        // Carry the stock link forward so the decrement engine can see it.
        ...(l.inventory_item_id ? { inventoryItemId: l.inventory_item_id } : {}),
      };
    });
  return { items, subtotal: Math.round(subtotal * 100) / 100 };
}

export async function createQuote(
  supabase: SupabaseClient,
  userId: string | null,
  args: CreateQuoteArgs
): Promise<string> {
  if (!userId) return 'Cannot create quote — no user in session.';
  if (!args.client_name?.trim()) return 'Cannot create quote — client_name is required.';
  if (!args.job_title?.trim()) return 'Cannot create quote — job_title is required.';
  if (!args.line_items?.length) {
    return 'Cannot create quote — at least one line item is required.';
  }

  const { items, subtotal } = normaliseLines(args.line_items);
  if (!items.length) {
    return 'Cannot create quote — all line items were invalid (need description, quantity > 0, unitPrice >= 0).';
  }

  const vatRate = typeof args.vat_rate === 'number' ? args.vat_rate : 20;
  const vatAmount = Math.round(subtotal * (vatRate / 100) * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  const expiry = new Date();
  expiry.setDate(
    expiry.getDate() + (args.expiry_days && args.expiry_days > 0 ? args.expiry_days : 30)
  );

  const quoteNumber = genRef('QUO');

  const row = {
    user_id: userId,
    quote_number: quoteNumber,
    status: 'draft',
    client_data: {
      name: args.client_name.trim(),
      email: args.client_email?.trim() || '',
      phone: args.client_phone?.trim() || '',
      address: args.client_address?.trim() || '',
      postcode: args.client_postcode?.trim() || '',
    },
    job_details: {
      title: args.job_title.trim(),
      description: args.job_description?.trim() || '',
    },
    items,
    subtotal,
    vat_amount: vatAmount,
    total,
    settings: { vatRate, vatRegistered: vatRate > 0 },
    notes: args.notes?.trim() || '',
    expiry_date: expiry.toISOString(),
    invoice_raised: false,
  };

  const { data, error } = await supabase.from('quotes').insert(row).select('id').single();
  if (error) {
    console.error('[mate-documents] createQuote insert error', error);
    return `Quote create failed: ${error.message || 'unknown'}`;
  }
  return [
    `✓ Quote created (draft status — not sent).`,
    `id=${data.id}`,
    `ref=${quoteNumber}`,
    `customer=${row.client_data.name}${row.client_data.email ? ` (${row.client_data.email})` : ''}`,
    `lines=${items.length}`,
    `subtotal=£${subtotal.toFixed(2)}`,
    `vat=£${vatAmount.toFixed(2)} (${vatRate}%)`,
    `total=£${total.toFixed(2)}`,
    `expires=${expiry.toISOString().slice(0, 10)}`,
    ``,
    `To email this quote with the real PDF, call send_document with doc_type="quote" and doc_id="${data.id}".`,
  ].join('\n');
}

export async function createInvoice(
  supabase: SupabaseClient,
  userId: string | null,
  args: CreateInvoiceArgs,
  authHeader: string | null = null
): Promise<string> {
  if (!userId) return 'Cannot create invoice — no user in session.';
  if (!args.client_name?.trim()) return 'Cannot create invoice — client_name is required.';
  if (!args.job_title?.trim()) return 'Cannot create invoice — job_title is required.';
  if (!args.line_items?.length) {
    return 'Cannot create invoice — at least one line item is required.';
  }

  const { items, subtotal } = normaliseLines(args.line_items);
  if (!items.length) {
    return 'Cannot create invoice — all line items were invalid (need description, quantity > 0, unitPrice >= 0).';
  }

  const vatRate = typeof args.vat_rate === 'number' ? args.vat_rate : 20;
  const vatAmount = Math.round(subtotal * (vatRate / 100) * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  const today = new Date();
  const due = new Date();
  due.setDate(
    due.getDate() + (args.payment_days && args.payment_days > 0 ? args.payment_days : 30)
  );

  const invoiceNumber = genRef('INV');

  const row = {
    user_id: userId,
    invoice_number: invoiceNumber,
    status: 'draft',
    client_data: {
      name: args.client_name.trim(),
      email: args.client_email?.trim() || '',
      phone: args.client_phone?.trim() || '',
      address: args.client_address?.trim() || '',
      postcode: args.client_postcode?.trim() || '',
    },
    job_details: {
      title: args.job_title.trim(),
      description: args.job_description?.trim() || '',
    },
    items,
    subtotal,
    vat_amount: vatAmount,
    total,
    settings: { vatRate, vatRegistered: vatRate > 0 },
    notes: args.notes?.trim() || '',
    invoice_date: today.toISOString(),
    due_date: due.toISOString(),
  };

  const { data, error } = await supabase.from('invoices').insert(row).select('id').single();
  if (error) {
    console.error('[mate-documents] createInvoice insert error', error);
    return `Invoice create failed: ${error.message || 'unknown'}`;
  }

  // Decrement stock for any stock-linked lines (best-effort, idempotent). The
  // edge function runs as service_role, so pass user_id explicitly. (ELE-1014)
  try {
    const stockLines = items
      .filter((i) => i.inventoryItemId)
      .map((i) => ({ inventory_item_id: i.inventoryItemId, quantity: i.quantity, note: i.description }));
    if (stockLines.length) {
      const { error: decErr } = await supabase.rpc('apply_invoice_stock_decrement', {
        p_quote_id: data.id,
        p_lines: stockLines,
        p_user_id: userId,
      });
      if (decErr) console.error('[mate-documents] stock decrement error', decErr);
    }
  } catch (decErr) {
    console.error('[mate-documents] stock decrement threw', decErr);
  }

  // Best-effort: generate a Stripe payment link so the email includes a
  // "Pay now" button. If this fails (Stripe not configured, no live keys,
  // network blip) the invoice is still saved — we just flag it.
  let paymentLinkStatus = 'no payment link (Stripe not attempted — missing auth header)';
  if (authHeader) {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    if (supabaseUrl) {
      try {
        const res = await fetch(`${supabaseUrl}/functions/v1/create-invoice-payment-link`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invoiceId: data.id }),
        });
        if (res.ok) {
          paymentLinkStatus = 'Stripe payment link attached (will appear in send email)';
        } else {
          const errText = await res.text();
          paymentLinkStatus = `no payment link (Stripe step returned ${res.status}: ${errText.slice(0, 120)})`;
        }
      } catch (err) {
        console.error('[mate-documents] payment link error', err);
        paymentLinkStatus = `no payment link (Stripe call threw: ${err instanceof Error ? err.message : 'unknown'})`;
      }
    }
  }

  return [
    `✓ Invoice created (draft status — not sent).`,
    `id=${data.id}`,
    `ref=${invoiceNumber}`,
    `customer=${row.client_data.name}${row.client_data.email ? ` (${row.client_data.email})` : ''}`,
    `lines=${items.length}`,
    `subtotal=£${subtotal.toFixed(2)}`,
    `vat=£${vatAmount.toFixed(2)} (${vatRate}%)`,
    `total=£${total.toFixed(2)}`,
    `due=${due.toISOString().slice(0, 10)}`,
    `payment: ${paymentLinkStatus}`,
    ``,
    `To email this invoice with the real PDF, call send_document with doc_type="invoice" and doc_id="${data.id}".`,
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════════
// AMEND — patch fields on existing quotes & invoices
// ═══════════════════════════════════════════════════════════════════════

export interface AmendQuotePatch {
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  client_address?: string;
  client_postcode?: string;
  job_title?: string;
  job_description?: string;
  line_items?: MateLineItem[];
  vat_rate?: number;
  expiry_days?: number;
  notes?: string;
  status?: 'draft' | 'sent' | 'accepted' | 'expired' | 'cancelled';
}

export interface AmendQuoteArgs {
  id: string;
  patch: AmendQuotePatch;
}

export async function amendQuote(
  supabase: SupabaseClient,
  userId: string | null,
  args: AmendQuoteArgs
): Promise<string> {
  if (!userId) return 'Cannot amend quote — no user in session.';
  if (!args.id) return 'Cannot amend quote — id is required.';
  if (!args.patch || Object.keys(args.patch).length === 0) {
    return 'Cannot amend quote — patch is empty.';
  }

  const { data: existing, error: fetchErr } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', args.id)
    .eq('user_id', userId)
    .single();
  if (fetchErr || !existing) {
    return `Cannot amend quote — not found: ${fetchErr?.message ?? 'unknown'}`;
  }

  // Lock items/totals if the quote has been accepted or already invoiced.
  // Notes / status / client info are still fair game.
  const isLocked = existing.acceptance_status === 'accepted' || existing.invoice_raised === true;
  if (isLocked && args.patch.line_items) {
    return 'Cannot amend line items — this quote is accepted or already invoiced. Issue a variation quote (new quote_number) or a credit note instead.';
  }

  const update: Record<string, unknown> = {};

  // ─── client_data jsonb merge ───
  const clientPatch: Record<string, string> = {};
  if (args.patch.client_name !== undefined) clientPatch.name = args.patch.client_name.trim();
  if (args.patch.client_email !== undefined) clientPatch.email = args.patch.client_email.trim();
  if (args.patch.client_phone !== undefined) clientPatch.phone = args.patch.client_phone.trim();
  if (args.patch.client_address !== undefined)
    clientPatch.address = args.patch.client_address.trim();
  if (args.patch.client_postcode !== undefined)
    clientPatch.postcode = args.patch.client_postcode.trim();
  if (Object.keys(clientPatch).length > 0) {
    update.client_data = { ...(existing.client_data || {}), ...clientPatch };
  }

  // ─── job_details jsonb merge ───
  const jobPatch: Record<string, string> = {};
  if (args.patch.job_title !== undefined) jobPatch.title = args.patch.job_title.trim();
  if (args.patch.job_description !== undefined)
    jobPatch.description = args.patch.job_description.trim();
  if (Object.keys(jobPatch).length > 0) {
    update.job_details = { ...(existing.job_details || {}), ...jobPatch };
  }

  // ─── items + totals — recompute if items change ───
  if (args.patch.line_items) {
    const { items, subtotal } = normaliseLines(args.patch.line_items);
    if (!items.length) {
      return 'Cannot amend quote — all replacement line items were invalid.';
    }
    const existingSettings = (existing.settings as { vatRate?: number }) || {};
    const vatRate =
      typeof args.patch.vat_rate === 'number'
        ? args.patch.vat_rate
        : (existingSettings.vatRate ?? 20);
    const vatAmount = Math.round(subtotal * (vatRate / 100) * 100) / 100;
    const total = Math.round((subtotal + vatAmount) * 100) / 100;
    update.items = items;
    update.subtotal = subtotal;
    update.vat_amount = vatAmount;
    update.total = total;
    update.settings = { ...(existing.settings || {}), vatRate, vatRegistered: vatRate > 0 };
  } else if (typeof args.patch.vat_rate === 'number') {
    const subtotal = Number(existing.subtotal) || 0;
    const vatAmount = Math.round(subtotal * (args.patch.vat_rate / 100) * 100) / 100;
    const total = Math.round((subtotal + vatAmount) * 100) / 100;
    update.vat_amount = vatAmount;
    update.total = total;
    update.settings = {
      ...(existing.settings || {}),
      vatRate: args.patch.vat_rate,
      vatRegistered: args.patch.vat_rate > 0,
    };
  }

  if (typeof args.patch.expiry_days === 'number' && args.patch.expiry_days > 0) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + args.patch.expiry_days);
    update.expiry_date = expiry.toISOString();
  }

  if (args.patch.notes !== undefined) update.notes = args.patch.notes.trim();
  if (args.patch.status) update.status = args.patch.status;

  update.updated_at = new Date().toISOString();

  const { error: updErr } = await supabase
    .from('quotes')
    .update(update)
    .eq('id', args.id)
    .eq('user_id', userId);

  if (updErr) {
    return `Quote amend failed: ${updErr.message || 'unknown'}`;
  }

  const changed = Object.keys(update).filter((k) => k !== 'updated_at');
  return `✓ Quote ${existing.quote_number || args.id} amended. Changed: ${changed.join(', ')}.`;
}

export interface AmendInvoicePatch {
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  client_address?: string;
  client_postcode?: string;
  job_title?: string;
  job_description?: string;
  line_items?: MateLineItem[];
  vat_rate?: number;
  due_days?: number;
  notes?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  payment_reference?: string;
}

export interface AmendInvoiceArgs {
  id: string;
  patch: AmendInvoicePatch;
}

export async function amendInvoice(
  supabase: SupabaseClient,
  userId: string | null,
  args: AmendInvoiceArgs
): Promise<string> {
  if (!userId) return 'Cannot amend invoice — no user in session.';
  if (!args.id) return 'Cannot amend invoice — id is required.';
  if (!args.patch || Object.keys(args.patch).length === 0) {
    return 'Cannot amend invoice — patch is empty.';
  }

  const { data: existing, error: fetchErr } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', args.id)
    .eq('user_id', userId)
    .single();
  if (fetchErr || !existing) {
    return `Cannot amend invoice — not found: ${fetchErr?.message ?? 'unknown'}`;
  }

  // Lock model:
  //   paid    → only notes / payment_reference editable
  //   sent    → no items/totals changes; status, due_date, notes, payment ok
  //   draft   → anything goes
  //   overdue → same as sent
  const status = String(existing.status || 'draft');
  const isPaid = status === 'paid';
  const isLockedTotals = isPaid || status === 'sent' || status === 'overdue';

  if (isPaid) {
    const allowedKeys = new Set(['notes', 'payment_method', 'payment_reference']);
    const violating = Object.keys(args.patch).filter((k) => !allowedKeys.has(k));
    if (violating.length > 0) {
      return `Cannot amend a paid invoice — only notes / payment_method / payment_reference can change. Refused fields: ${violating.join(', ')}. Issue a credit note for refunds.`;
    }
  }
  if (isLockedTotals && (args.patch.line_items || typeof args.patch.vat_rate === 'number')) {
    return `Cannot amend items or VAT on a ${status} invoice. Issue a credit note + replacement invoice instead.`;
  }

  const update: Record<string, unknown> = {};

  // ─── client_data jsonb merge ───
  const clientPatch: Record<string, string> = {};
  if (args.patch.client_name !== undefined) clientPatch.name = args.patch.client_name.trim();
  if (args.patch.client_email !== undefined) clientPatch.email = args.patch.client_email.trim();
  if (args.patch.client_phone !== undefined) clientPatch.phone = args.patch.client_phone.trim();
  if (args.patch.client_address !== undefined)
    clientPatch.address = args.patch.client_address.trim();
  if (args.patch.client_postcode !== undefined)
    clientPatch.postcode = args.patch.client_postcode.trim();
  if (Object.keys(clientPatch).length > 0) {
    update.client_data = { ...(existing.client_data || {}), ...clientPatch };
  }

  // ─── job_details jsonb merge ───
  const jobPatch: Record<string, string> = {};
  if (args.patch.job_title !== undefined) jobPatch.title = args.patch.job_title.trim();
  if (args.patch.job_description !== undefined)
    jobPatch.description = args.patch.job_description.trim();
  if (Object.keys(jobPatch).length > 0) {
    update.job_details = { ...(existing.job_details || {}), ...jobPatch };
  }

  if (args.patch.line_items) {
    const { items, subtotal } = normaliseLines(args.patch.line_items);
    if (!items.length) {
      return 'Cannot amend invoice — all replacement line items were invalid.';
    }
    const existingSettings = (existing.settings as { vatRate?: number }) || {};
    const vatRate =
      typeof args.patch.vat_rate === 'number'
        ? args.patch.vat_rate
        : (existingSettings.vatRate ?? 20);
    const vatAmount = Math.round(subtotal * (vatRate / 100) * 100) / 100;
    const total = Math.round((subtotal + vatAmount) * 100) / 100;
    update.items = items;
    update.subtotal = subtotal;
    update.vat_amount = vatAmount;
    update.total = total;
    update.settings = { ...(existing.settings || {}), vatRate, vatRegistered: vatRate > 0 };
  } else if (typeof args.patch.vat_rate === 'number') {
    const subtotal = Number(existing.subtotal) || 0;
    const vatAmount = Math.round(subtotal * (args.patch.vat_rate / 100) * 100) / 100;
    const total = Math.round((subtotal + vatAmount) * 100) / 100;
    update.vat_amount = vatAmount;
    update.total = total;
    update.settings = {
      ...(existing.settings || {}),
      vatRate: args.patch.vat_rate,
      vatRegistered: args.patch.vat_rate > 0,
    };
  }

  if (typeof args.patch.due_days === 'number' && args.patch.due_days > 0) {
    const due = new Date();
    due.setDate(due.getDate() + args.patch.due_days);
    update.due_date = due.toISOString();
  }

  if (args.patch.notes !== undefined) update.notes = args.patch.notes.trim();
  if (args.patch.status) {
    update.status = args.patch.status;
    if (args.patch.status === 'paid' && !existing.paid_at) {
      update.paid_at = new Date().toISOString();
    }
  }
  if (args.patch.payment_method !== undefined)
    update.payment_method = args.patch.payment_method.trim();
  if (args.patch.payment_reference !== undefined)
    update.payment_reference = args.patch.payment_reference.trim();

  update.updated_at = new Date().toISOString();

  const { error: updErr } = await supabase
    .from('invoices')
    .update(update)
    .eq('id', args.id)
    .eq('user_id', userId);

  if (updErr) {
    return `Invoice amend failed: ${updErr.message || 'unknown'}`;
  }

  const changed = Object.keys(update).filter((k) => k !== 'updated_at');
  return `✓ Invoice ${existing.invoice_number || args.id} amended. Changed: ${changed.join(', ')}.`;
}
