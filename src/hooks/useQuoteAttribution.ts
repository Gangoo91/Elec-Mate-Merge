import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQuoteAttribution, type QuoteAttribution } from '@/services/financeService';

/**
 * ELE-2083: who raised and who sent each quote/invoice, by row id.
 * Older rows have no record and come back without names, so callers show
 * nothing rather than a guess.
 */
export function useQuoteAttribution(ids: string[]) {
  const key = useMemo(() => [...new Set(ids.filter(Boolean))].sort(), [ids]);
  const { data } = useQuery({
    // Under 'quotes' so a quote send's invalidation refreshes it too.
    queryKey: ['quotes', 'attribution', key],
    queryFn: () => getQuoteAttribution(key),
    enabled: key.length > 0,
    staleTime: 0,
  });
  const map = data ?? new Map<string, QuoteAttribution>();
  // Rows only carry a name when more than one person raises or sends
  // the firm's paperwork; a one-person firm needs no "by me" on every row.
  const people = new Set<string>();
  map.forEach((a) => {
    [a.created_by_name, a.sent_by_name, a.invoice_sent_by_name].forEach((n) => n && people.add(n));
  });
  return { map, severalPeople: people.size > 1 };
}

/** The one line for a row or sheet: who sent it, else who raised it. */
export function attributionLine(
  a: QuoteAttribution | undefined,
  kind: 'quote' | 'invoice'
): string | null {
  if (!a) return null;
  const sent = kind === 'quote' ? a.sent_by_name : a.invoice_sent_by_name;
  if (sent) return `Sent by ${sent}`;
  if (a.created_by_name) return `Raised by ${a.created_by_name}`;
  return null;
}
