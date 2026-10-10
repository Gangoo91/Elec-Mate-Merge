/**
 * ELE-2034 — raise a quote's deposit from the app, at conversion.
 *
 * The same DEP- invoice accept-quote-public raises when a client signs the
 * link, so everything downstream already works with it:
 *   - paid by card  → stripe-connect-webhook stamps the quote
 *   - marked paid   → trigger stamp_quote_deposit_paid stamps the quote
 *   - then converting the quote credits it (ELE-1760, invoiceDeposit.ts),
 *     so the final invoice reads "Deposit paid −£X · Balance due £Y".
 */
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { quoteDepositDue, type QuoteDeposit } from '@/utils/quoteDeposit';

const QUOTE_COLS =
  'id, user_id, quote_number, client_data, total, settings, invoice_raised, deposit_required, deposit_invoice_id, deposit_paid_at, acceptance_status';

type QuoteRow = {
  id: string;
  user_id: string;
  quote_number: string | null;
  client_data: Json;
  total: number | string | null;
  settings: Record<string, unknown> | null;
  invoice_raised: boolean | null;
  deposit_required: boolean | null;
  deposit_invoice_id: string | null;
  deposit_paid_at: string | null;
  acceptance_status: string | null;
};

async function loadQuote(quoteId: string): Promise<{ quote: QuoteRow; pct: number | null } | null> {
  const { data: quote, error } = await supabase
    .from('quotes')
    .select(QUOTE_COLS)
    .eq('id', quoteId)
    .maybeSingle();
  if (error || !quote) return null;
  const { data: profile } = await supabase
    .from('company_profiles')
    .select('deposit_percentage')
    .eq('user_id', (quote as QuoteRow).user_id)
    .maybeSingle();
  return { quote: quote as QuoteRow, pct: profile?.deposit_percentage ?? null };
}

/**
 * Quotes whose deposit offer was turned down ("Invoice in full") this session.
 * The convert dialog and the builder both offer it, and "Yes, there are
 * changes" goes from one to the other, so without this the same question is
 * asked twice in a row.
 */
const declined = new Set<string>();
export function declineDepositOffer(quoteId: string): void {
  declined.add(quoteId);
}

export interface DepositOffer extends QuoteDeposit {
  quoteNumber: string | null;
  total: number;
}

/**
 * The deposit this accepted quote should take before it is invoiced, or null.
 * Only for an accepted quote: an unaccepted one has no business being
 * converted, and a client-signed one already went through the server.
 */
export async function getDepositOffer(quoteId: string): Promise<DepositOffer | null> {
  if (declined.has(quoteId)) return null;
  const loaded = await loadQuote(quoteId);
  if (!loaded) return null;
  const { quote, pct } = loaded;
  if (quote.acceptance_status !== 'accepted') return null;
  const due = quoteDepositDue(quote, pct);
  if (!due) return null;
  return { ...due, quoteNumber: quote.quote_number, total: Number(quote.total) || 0 };
}

export interface RaisedDeposit {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  /** Null when card payments are off: the client pays by bank transfer. */
  payUrl: string | null;
}

/**
 * Raise the deposit invoice. Re-reads the quote and re-works the amount, so a
 * screen left open cannot raise a stale figure.
 *
 * The quote is CLAIMED first with a conditional update (only if it has no
 * deposit yet). A double tap, or the same quote converted on two devices,
 * cannot raise two deposits: the second claim matches no row.
 */
export async function raiseDepositInvoice(quoteId: string): Promise<RaisedDeposit> {
  const loaded = await loadQuote(quoteId);
  if (!loaded) throw new Error('Could not load the quote');
  const { quote, pct } = loaded;
  const due = quoteDepositDue(quote, pct);
  if (!due) throw new Error('This quote has no deposit to take, or one is already raised');

  const { data: claimed, error: claimErr } = await supabase
    .from('quotes')
    .update({
      deposit_required: true,
      deposit_amount_pennies: due.pennies,
      acceptance_status: 'accepted_pending_deposit',
      updated_at: new Date().toISOString(),
    })
    .eq('id', quote.id)
    .is('deposit_invoice_id', null)
    .is('deposit_paid_at', null)
    .or('deposit_required.is.null,deposit_required.eq.false')
    .select('id');
  if (claimErr) throw claimErr;
  if (!claimed?.length) throw new Error('A deposit has already been raised on this quote');

  const release = () =>
    supabase
      .from('quotes')
      .update({
        deposit_required: false,
        deposit_amount_pennies: null,
        acceptance_status: quote.acceptance_status,
      })
      .eq('id', quote.id);

  // Same row accept-quote-public inserts, field for field.
  const base = `DEP-${quote.quote_number || quote.id.slice(0, 8)}`;
  const row = (invoiceNumber: string) => ({
    user_id: quote.user_id,
    client_data: quote.client_data,
    quote_id: quote.id,
    parent_quote_id: quote.id,
    deposit_for_quote: true,
    invoice_number: invoiceNumber,
    status: 'sent',
    invoice_date: new Date().toISOString(),
    due_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    subtotal: due.amount,
    total: due.amount,
    items: [
      {
        id: crypto.randomUUID(),
        description: `Deposit · Quote ${quote.quote_number || ''}`.trim(),
        quantity: 1,
        unit: 'each',
        unitPrice: due.amount,
        totalPrice: due.amount,
        category: 'manual',
      },
    ],
    settings: { vatRegistered: false, paymentTerms: '48 hours' },
  });

  // invoice_number is unique per user. A DEP- number can already exist from
  // an earlier version of the same quote, so try a suffix rather than fail.
  let invoice: { id: string; invoice_number: string } | null = null;
  for (const n of [base, `${base}-2`, `${base}-3`]) {
    const { data, error } = await supabase
      .from('invoices')
      .insert(row(n))
      .select('id, invoice_number')
      .single();
    if (!error && data) {
      invoice = data as { id: string; invoice_number: string };
      break;
    }
    if (error?.code !== '23505') {
      await release();
      throw error ?? new Error('Could not raise the deposit invoice');
    }
  }
  if (!invoice) {
    await release();
    throw new Error('Could not number the deposit invoice');
  }

  const { error: linkErr } = await supabase
    .from('quotes')
    .update({ deposit_invoice_id: invoice.id })
    .eq('id', quote.id);
  if (linkErr) {
    // Unlinked, the deposit could never be marked paid or credited, and the
    // claim would block raising another. Undo both and say so (review, 10 Oct).
    await supabase.from('invoices').delete().eq('id', invoice.id).is('paid_at', null);
    await release();
    throw new Error('Could not attach the deposit to the quote — nothing was raised, try again');
  }

  // A card pay link where the firm takes cards. Not fatal: most firms take
  // deposits by bank transfer (only 11 users have card payments on).
  let payUrl: string | null = null;
  try {
    const { data } = await supabase.functions.invoke('create-invoice-payment-link', {
      body: { invoiceId: invoice.id },
    });
    if (typeof data?.url === 'string') payUrl = data.url;
  } catch (err) {
    console.warn('[quoteDepositInvoice] no pay link', err);
  }

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoice_number,
    amount: due.amount,
    payUrl,
  };
}

/**
 * Bank transfer landed. Marking the DEP- invoice paid fires
 * stamp_quote_deposit_paid, which stamps the quote and sets it back to
 * 'accepted', so the quote can be converted with the deposit credited.
 */
export async function markDepositPaid(invoiceId: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', invoiceId)
    .is('paid_at', null);
  if (error) throw error;
}

/**
 * "Invoice the full amount anyway": the final invoice asks for everything, so
 * the deposit must not stay payable beside it — that is how a client pays the
 * deposit AND the full price. Cancels it only while unpaid, and puts the quote
 * back to plain 'accepted'.
 */
export async function cancelPendingDeposit(quoteId: string, invoiceId: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'cancelled' })
    .eq('id', invoiceId)
    .is('paid_at', null);
  if (error) throw error;
  await supabase
    .from('quotes')
    .update({ acceptance_status: 'accepted' })
    .eq('id', quoteId)
    .eq('acceptance_status', 'accepted_pending_deposit');
}

export interface PendingDeposit {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  payUrl: string | null;
  quoteNumber: string | null;
}

/**
 * A deposit raised on this quote and not paid yet, from either route (client
 * signed the link, or raised at conversion). Null when there is none.
 */
export async function getPendingDeposit(quoteId: string): Promise<PendingDeposit | null> {
  const { data: quote } = await supabase
    .from('quotes')
    .select('quote_number, deposit_invoice_id, deposit_paid_at, invoice_raised')
    .eq('id', quoteId)
    .maybeSingle();
  // Once the quote is the invoice, a deposit paid now is never credited
  // (ELE-1760 credits at conversion), so offering "mark it paid — it comes
  // off the invoice" would be untrue.
  if (!quote?.deposit_invoice_id || quote.deposit_paid_at || quote.invoice_raised) return null;
  const { data: inv } = await supabase
    .from('invoices')
    .select('id, invoice_number, total, paid_at, status, stripe_payment_link_url')
    .eq('id', quote.deposit_invoice_id)
    .maybeSingle();
  if (!inv || inv.paid_at || (inv.status ?? '').toLowerCase() === 'cancelled') return null;
  return {
    invoiceId: inv.id,
    invoiceNumber: inv.invoice_number,
    amount: Number(inv.total) || 0,
    payUrl: inv.stripe_payment_link_url ?? null,
    quoteNumber: quote.quote_number ?? null,
  };
}
