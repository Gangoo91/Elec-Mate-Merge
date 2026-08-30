/**
 * Per-customer rollups — certificates, quotes and money — for the customer list.
 *
 * The list row already showed a certificate count and a last-activity dot. What
 * it never showed was value, even though the quotes were linked and the totals
 * were sitting there: £1.1m quoted across the customer book, invisible on every
 * row.
 *
 * Fetches by id rather than pulling the whole book. CustomersPage paginates at
 * 50, and the account with the most customers holds nearly 2,000 of them —
 * fetching every rollup to draw fifty rows would be slowest for exactly the
 * user with the most to look at. The server still scopes to auth.uid(); the id
 * array only ever narrows the result.
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CustomerSummary {
  id: string;
  certificateCount: number;
  lastCertificateAt: string | null;
  quoteCount: number;
  quotedValue: number;
  approvedValue: number;
  invoiceCount: number;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
}

interface SummaryRow {
  id: string;
  certificate_count: number | string | null;
  last_certificate_at: string | null;
  quote_count: number | string | null;
  quoted_value: number | string | null;
  approved_value: number | string | null;
  invoice_count: number | string | null;
  total_invoiced: number | string | null;
  total_paid: number | string | null;
  outstanding: number | string | null;
}

// Postgres returns bigint and numeric as strings over PostgREST — Number() them
// once here rather than letting "1200.00" reach a formatter as a string.
const num = (v: number | string | null | undefined): number => Number(v ?? 0) || 0;

export function useCustomerSummaries(customerIds: string[]) {
  const [summaries, setSummaries] = useState<Map<string, CustomerSummary>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Sorted + joined so the effect is keyed on the CONTENT of the id list, not
  // the array identity — CustomersPage rebuilds that array every render, and
  // depending on identity would refetch on each one.
  const key = [...customerIds].sort().join(',');

  useEffect(() => {
    if (!key) {
      setSummaries(new Map());
      return;
    }
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.rpc('get_customer_summaries', {
        p_customer_ids: key.split(','),
      } as never);

      if (cancelled) return;
      if (error) {
        // Non-fatal: the row falls back to what it always showed. A failed
        // rollup must not blank out the customer list.
        console.error('Customer summaries failed to load:', error);
        setIsLoading(false);
        return;
      }

      const next = new Map<string, CustomerSummary>();
      for (const r of (data ?? []) as SummaryRow[]) {
        next.set(r.id, {
          id: r.id,
          certificateCount: num(r.certificate_count),
          lastCertificateAt: r.last_certificate_at,
          quoteCount: num(r.quote_count),
          quotedValue: num(r.quoted_value),
          approvedValue: num(r.approved_value),
          invoiceCount: num(r.invoice_count),
          totalInvoiced: num(r.total_invoiced),
          totalPaid: num(r.total_paid),
          outstanding: num(r.outstanding),
        });
      }
      setSummaries(next);
      setIsLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { summaries, isLoading };
}
