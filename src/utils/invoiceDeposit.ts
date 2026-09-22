/**
 * Crediting an already-paid deposit onto the invoice raised from a quote.
 *
 * ELE-1760 — Ro: "when you register part payment received from client, how
 * comes when you create invoice it doesn't auto create it for the balance?"
 *
 * When a quote is accepted with a deposit, a DEP- invoice is auto-raised and
 * paid (ELE-954). The invoice for the job itself is still for the FULL amount —
 * the deposit is a PAYMENT against it, not a discount. The correct, VAT-safe
 * treatment puts the deposit in TWO places on the invoice:
 *
 *   1. `total_paid` — drives the balance everywhere that reads it: the in-app
 *      invoice card, the balance-aware Stripe pay link, and the PDF's
 *      `total − grant − max(deposit, total_paid)`.
 *   2. `settings.depositApplied` — the FIRST source in generate-pdf-monkey's
 *      deposit chain, so the certificate LABELS the credit ("Deposit paid £X /
 *      Balance due £Y"). Without it, a client sees a reduced balance with no
 *      line explaining why, because the invoice row carries no parent_quote_id
 *      for the PDF's fallback lookup.
 *
 * Deliberately does NOT touch `partial_payments`: the PDF surfaces both that
 * array and the deposit summary, so a deposit recorded in both would risk
 * DISPLAYING twice. The deposit's own record is the DEP- invoice.
 *
 * Pure and side-effect-free so the money maths can be unit-tested in isolation
 * (createInvoiceFromQuote pulls React + Supabase and cannot be).
 */

export interface DepositCreditInput {
  /** ISO timestamp stamped when the deposit was actually paid; null/absent = unpaid. */
  deposit_paid_at?: string | null;
  /** Deposit amount in pennies. */
  deposit_amount_pennies?: number | null;
  /** The DEP- invoice id, for the PDF's deposit reference. */
  deposit_invoice_id?: string | null;
  /** Anything already paid on the source, so the credit adds to it, not replaces it. */
  total_paid?: number | null;
}

export interface DepositCredit {
  /** Amount treated as already paid on the new invoice (pounds, 2dp). */
  total_paid: number;
  /** Fed to invoice `settings.depositApplied` so the PDF labels the credit. */
  depositApplied: { amount: number; paidAt: string; depositInvoiceId: string | null };
}

/** Round a pounds figure to whole pence, killing float drift before it reaches a bill. */
const toPence = (pounds: number): number => Math.round(pounds * 100) / 100;

/**
 * The deposit credit to apply to a converted invoice, or `null` when there is
 * no paid deposit to credit.
 *
 * A deposit only counts when it has BOTH a paid timestamp and a positive
 * amount — a deposit that was set but never paid must not reduce the balance,
 * or the client would be under-billed.
 */
export function depositCreditFromQuote(quote: DepositCreditInput): DepositCredit | null {
  if (!quote.deposit_paid_at) return null;
  const pennies = Number(quote.deposit_amount_pennies);
  if (!Number.isFinite(pennies) || pennies <= 0) return null;

  const depositAmount = toPence(pennies / 100);
  const alreadyPaid = Number(quote.total_paid) || 0;
  return {
    total_paid: toPence(depositAmount + alreadyPaid),
    depositApplied: {
      amount: depositAmount,
      paidAt: quote.deposit_paid_at,
      depositInvoiceId: quote.deposit_invoice_id ?? null,
    },
  };
}
