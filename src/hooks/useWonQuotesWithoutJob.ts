import { useQuery } from '@tanstack/react-query';
import { getWonQuotesWithoutJob, type WonQuoteWithoutJob } from '@/services/quoteChainService';

/**
 * ELE-2065: accepted quotes (last 60 days) that have no firm job and no
 * invoice yet, for the Overview To do row "Quote accepted, no job yet".
 * Fails quiet: a failed read just hides the row.
 */
export function useWonQuotesWithoutJob(enabled: boolean) {
  return useQuery<WonQuoteWithoutJob[]>({
    queryKey: ['won-quotes-without-job'],
    enabled,
    staleTime: 60_000,
    queryFn: async () => {
      try {
        return await getWonQuotesWithoutJob();
      } catch {
        return [];
      }
    },
  });
}
