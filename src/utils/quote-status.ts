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
