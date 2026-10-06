/**
 * What enquiries turned into (ELE-2022): quotes raised for a customer after
 * their enquiry arrived, and the ones they accepted — overall and per source.
 *
 * Attribution: a quote belongs to the most recent enquiry from that customer
 * received before the quote was created. Drafts don't count as quoted.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SOURCE_LABEL, type Enquiry } from '@/hooks/useEnquiries';

interface QuoteRow {
  id: string;
  customer_id: string | null;
  total: number | null;
  status: string | null;
  acceptance_status: string | null;
  created_at: string;
}

export interface EnquiryValue {
  quoted: number;
  won: number;
  quotes: number;
  wins: number;
  bySource: Array<{ label: string; quoted: number; won: number }>;
}

const isWon = (q: QuoteRow) =>
  q.status === 'approved' ||
  (q.status === 'sent' && (q.acceptance_status ?? '').startsWith('accepted'));

export function useEnquiryValue(enquiries: Enquiry[]) {
  const converted = enquiries.filter((e) => e.customer_id);
  const ids = [...new Set(converted.map((e) => e.customer_id!))].sort();

  return useQuery({
    queryKey: ['enquiry-value', ids],
    enabled: ids.length > 0,
    staleTime: 60_000,
    queryFn: async (): Promise<EnquiryValue> => {
      const since = converted.reduce(
        (min, e) => (e.received_at < min ? e.received_at : min),
        converted[0].received_at
      );
      const { data, error } = await supabase
        .from('quotes')
        .select('id, customer_id, total, status, acceptance_status, created_at')
        .in('customer_id', ids.slice(0, 200))
        .gte('created_at', since)
        .neq('status', 'draft')
        .limit(1000);
      if (error) throw error;

      const byCustomer = new Map<string, Enquiry[]>();
      for (const e of converted) {
        byCustomer.set(e.customer_id!, [...(byCustomer.get(e.customer_id!) ?? []), e]);
      }

      const out: EnquiryValue = { quoted: 0, won: 0, quotes: 0, wins: 0, bySource: [] };
      const src = new Map<string, { quoted: number; won: number }>();

      for (const q of (data ?? []) as QuoteRow[]) {
        const candidates = (byCustomer.get(q.customer_id!) ?? [])
          .filter((e) => e.received_at <= q.created_at)
          .sort((a, b) => b.received_at.localeCompare(a.received_at));
        const enquiry = candidates[0];
        if (!enquiry) continue;
        const amount = Number(q.total) || 0;
        const label = SOURCE_LABEL[enquiry.source];
        const bucket = src.get(label) ?? { quoted: 0, won: 0 };
        out.quotes += 1;
        out.quoted += amount;
        bucket.quoted += amount;
        if (isWon(q)) {
          out.wins += 1;
          out.won += amount;
          bucket.won += amount;
        }
        src.set(label, bucket);
      }

      out.bySource = [...src.entries()]
        .map(([label, v]) => ({ label, ...v }))
        .sort((a, b) => b.won - a.won || b.quoted - a.quoted);
      return out;
    },
  });
}

export const formatGBP = (n: number) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
