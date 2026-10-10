import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { isQuoteInvoicedInHub } from '@/utils/quote-status';

/**
 * Accepted quotes that never became an invoice.
 *
 * The client said yes, the app recorded it, and then nothing ever mentioned it
 * again — so the tail of the job happens outside Elec-Mate.
 *
 * Live figures, 27 Sep 2026, narrowing at each step:
 *
 *   154 accepted and never invoiced          £231,859   34 electricians
 *    93 of those over 30 days old            £149,474
 *    92 after dropping a soft-deleted one    £149,474
 *    59 with evidence the client agreed       £74,772   16 electricians
 *
 * The last step halves it, and that is the point — see the filter below. A
 * surface like this is worth having only if every line on it is true.
 *
 * ⚠️ Anything accepted inside `MIN_AGE_DAYS` is deliberately excluded. Those
 * are jobs still being done, and chasing an electrician to invoice work they
 * are halfway through is how a useful prompt turns into one people learn to
 * ignore. This surface only earns its place by being right.
 *
 * Read-only. It offers; it never raises an invoice by itself — a quote can be
 * accepted and then cancelled, and an invoice nobody asked for lands in front
 * of a client.
 */

/** Below this, treat the job as live rather than unbilled. */
export const MIN_AGE_DAYS = 30;

export interface UninvoicedQuote {
  id: string;
  quoteNumber: string | null;
  clientName: string | null;
  jobTitle: string | null;
  total: number;
  acceptedAt: Date;
  /** Whole days since the client accepted — for "accepted 6 weeks ago". */
  ageDays: number;
}

export interface UninvoicedSummary {
  quotes: UninvoicedQuote[];
  count: number;
  totalValue: number;
  isLoading: boolean;
}

/**
 * ⚠️ `client_data`, NOT `client`. There is no `client` column on `quotes` — the
 * TypeScript `Quote` type calls the field `client`, so the obvious spelling
 * type-checks perfectly and then PostgREST rejects the whole select at runtime.
 * Because this hook fails quiet by design, that would have shown up as the card
 * simply never appearing, with nothing in the console to explain it.
 */
const ROW = `id, quote_number, client_data, job_details, total, accepted_at, first_sent_at, acceptance_method, settings`;

export function useUninvoicedAcceptedQuotes(): UninvoicedSummary {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    /*
     * Scoped to the user, as `useAdminMessages` does. Without the id in the
     * key, signing in as somebody else reuses the previous account's cached
     * rows until `staleTime` expires — one person's client names and job
     * values shown to another.
     */
    queryKey: ['uninvoiced-accepted-quotes', user?.id],
    enabled: Boolean(user?.id),
    staleTime: 60_000,
    queryFn: async (): Promise<UninvoicedQuote[]> => {
      if (!user) return [];

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - MIN_AGE_DAYS);

      const { data: rows, error } = await supabase
        .from('quotes')
        .select(ROW)
        .eq('user_id', user.id)
        .eq('acceptance_status', 'accepted')
        // `.is(false)` alone misses rows where the column was never written,
        // which is most of them — the flag is only set when an invoice is
        // raised. `or` catches both the false and the null case.
        .or('invoice_raised.is.null,invoice_raised.eq.false')
        .not('accepted_at', 'is', null)
        .lt('accepted_at', cutoff.toISOString())
        // The electrician deleted it. Do not hand it back to them.
        .is('deleted_at', null)
        // The "did the client really agree" test is applied in code below,
        // NOT as a second `.or()`. Two `or` filters on one PostgREST query
        // are ambiguous — they may not AND the way they read — and a filter
        // that silently fails open here puts unsent quotes on the card.
        .order('accepted_at', { ascending: true })
        .range(0, 199);

      // Fail quiet, not loud: this is a nudge on a page whose real job is
      // listing invoices. A failed read hides the card; it must never take
      // the page down with it.
      if (error || !rows) return [];

      /*
       * Evidence the client actually agreed, rather than a stale flag.
       *
       * 33 of the 92 rows that pass the filters above are `status='draft'`,
       * and 25 of those were NEVER SENT to anybody — no `first_sent_at`, no
       * acceptance method — yet carry `acceptance_status='accepted'`. Putting
       * one of those on the card tells an electrician "your client agreed to
       * this" about a quote that never left the app, which is the fastest way
       * to make the whole surface untrustworthy.
       *
       * This takes the list from 92 / £149k to 59 / £75k across 16
       * electricians. Halving it is the right answer: the half that goes is
       * not real.
       */
      const agreed = rows.filter(
        // ELE-2065: a quote the Employer Hub already invoiced isn't unbilled.
        (r) => (r.first_sent_at || r.acceptance_method) && !isQuoteInvoicedInHub(r)
      );

      const now = Date.now();
      return agreed.map((r) => {
        const accepted = new Date(r.accepted_at as string);
        const client = (r.client_data ?? {}) as { name?: string };
        const job = (r.job_details ?? {}) as { title?: string; description?: string };
        return {
          id: r.id as string,
          quoteNumber: (r.quote_number as string) ?? null,
          clientName: client.name?.trim() || null,
          jobTitle: job.title?.trim() || job.description?.trim() || null,
          total: Number(r.total) || 0,
          acceptedAt: accepted,
          ageDays: Math.max(0, Math.floor((now - accepted.getTime()) / 86_400_000)),
        };
      });
    },
  });

  const quotes = data ?? [];
  return {
    quotes,
    count: quotes.length,
    totalValue: quotes.reduce((sum, q) => sum + q.total, 0),
    isLoading,
  };
}
