/**
 * Receipt helpers for the worker's Expenses page (ELE-2001).
 * The expense-receipts bucket is PRIVATE (6 Oct): never build a public URL to
 * show a receipt — always a short-lived signed one.
 */
import { useQuery } from '@tanstack/react-query';
import { getSignedReceiptUrl } from '@/services/expenseReceiptService';

export const isPdfReceipt = (stored: string | null | undefined) =>
  !!stored && /\.pdf($|\?)/i.test(stored);

/** A signed link for a stored receipt, refreshed well before it expires. */
export function useSignedReceipt(stored: string | null | undefined) {
  return useQuery({
    queryKey: ['signed-receipt', stored],
    enabled: !!stored,
    staleTime: 8 * 60 * 1000,
    gcTime: 9 * 60 * 1000,
    queryFn: async () => {
      const url = await getSignedReceiptUrl(stored!, 600);
      if (!url) throw new Error('Could not open the receipt');
      return url;
    },
  });
}
