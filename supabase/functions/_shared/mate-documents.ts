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
  items: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
  subtotal: number;
} {
  let subtotal = 0;
  const items = lines
    .filter((l) => l && l.description && Number(l.quantity) > 0 && Number(l.unitPrice) >= 0)
    .map((l) => {
      const quantity = Number(l.quantity);
      const unitPrice = Number(l.unitPrice);
      const total = Math.round(quantity * unitPrice * 100) / 100;
      subtotal += total;
      return { description: l.description.trim(), quantity, unitPrice, total };
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
  expiry.setDate(expiry.getDate() + (args.expiry_days && args.expiry_days > 0 ? args.expiry_days : 30));

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
  due.setDate(due.getDate() + (args.payment_days && args.payment_days > 0 ? args.payment_days : 30));

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
    invoice_notes: args.notes?.trim() || '',
    invoice_date: today.toISOString(),
    invoice_due_date: due.toISOString(),
  };

  const { data, error } = await supabase.from('invoices').insert(row).select('id').single();
  if (error) {
    console.error('[mate-documents] createInvoice insert error', error);
    return `Invoice create failed: ${error.message || 'unknown'}`;
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
