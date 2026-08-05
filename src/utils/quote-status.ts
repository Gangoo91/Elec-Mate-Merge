/**
 * Single source of truth for deriving a quote's effective state.
 *
 * A quote's lifecycle is spread across three columns:
 *   - status            ('draft' | 'sent' | 'pending' | 'approved' | 'rejected' | 'superseded')
 *   - acceptance_status ('pending' | 'accepted' | 'rejected') — client/manual decisions
 *   - invoice_raised    (boolean)
 *
 * Accepting or declining via acceptance_status does NOT rewrite `status`,
 * so any surface that checks `status` alone mis-buckets decided quotes.
 * Every won/lost/open derivation must go through these helpers.
 */

export interface QuoteStatusLike {
  status?: string;
  acceptance_status?: string;
  invoice_raised?: boolean;
  expiryDate?: string | Date | null;
}

export const isQuoteInvoiced = (q: QuoteStatusLike): boolean => !!q.invoice_raised;

export const isQuoteWon = (q: QuoteStatusLike): boolean =>
  q.acceptance_status === 'accepted' || q.status === 'approved';

export const isQuoteLost = (q: QuoteStatusLike): boolean =>
  q.acceptance_status === 'rejected' || q.status === 'rejected';

/** Still in play — no decision either way and not yet invoiced. */
export const isQuoteOpen = (q: QuoteStatusLike): boolean =>
  !isQuoteWon(q) && !isQuoteLost(q) && !isQuoteInvoiced(q);

/** Sent and awaiting a decision (the "chase this" bucket). */
export const isQuoteAwaiting = (q: QuoteStatusLike): boolean =>
  (q.status === 'sent' || q.status === 'pending') && isQuoteOpen(q);

/**
 * Sent, never decided, and past its expiry date (ELE-1072).
 *
 * Expiry is derived rather than written back as a `status` value. There is no
 * 'expired' in the status column's vocabulary, and every surface that switches
 * on status — edge functions, PDF rendering, analytics — would have to learn it
 * at the same moment. Deriving also means the 101 quotes already sitting past
 * expiry are picked up with no backfill.
 */
export const isQuoteExpired = (q: QuoteStatusLike): boolean => {
  if (!isQuoteAwaiting(q) || !q.expiryDate) return false;
  const expiry = new Date(q.expiryDate).getTime();
  return Number.isFinite(expiry) && expiry < Date.now();
};

/**
 * Awaiting a decision and still within its expiry date — the genuinely live
 * "Sent" bucket.
 *
 * isQuoteAwaiting keeps its original meaning (sent and undecided, expired or
 * not) because chase/staleness surfaces still care about lapsed quotes. Use
 * this one wherever the question is "what is still winnable".
 */
export const isQuoteLive = (q: QuoteStatusLike): boolean =>
  isQuoteAwaiting(q) && !isQuoteExpired(q);
