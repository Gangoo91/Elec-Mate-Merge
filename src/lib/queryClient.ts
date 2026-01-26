import { QueryClient } from '@tanstack/react-query';
import { DEFAULT_QUERY_OPTIONS, DEFAULT_MUTATION_OPTIONS } from './queryConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTIONS,
    mutations: DEFAULT_MUTATION_OPTIONS,
  },
});
