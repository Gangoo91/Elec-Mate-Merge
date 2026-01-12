
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes cache time
      retry: 2,
      refetchOnWindowFocus: false, // Don't refetch when user returns to tab - prevents unnecessary loading
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
