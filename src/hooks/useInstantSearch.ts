import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Instant Search Result
 */
export interface InstantSearchResult {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  current_price: number;
  regular_price: number | null;
  is_on_sale: boolean;
  discount_percentage: number | null;
  image_url: string | null;
  product_url: string;
  supplier_name: string;
  supplier_slug: string;
}

export interface InstantSearchResponse {
  results: InstantSearchResult[];
  query: string;
  hasMore: boolean;
}

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Instant search hook with debouncing
 * For the search dropdown (fast, lightweight)
 */
export function useInstantSearch(query: string, limit: number = 8) {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery<InstantSearchResponse>({
    queryKey: ['instant-search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return { results: [], query: debouncedQuery, hasMore: false };
      }

      const { data, error } = await supabase.functions.invoke('marketplace-instant-search', {
        body: {
          query: debouncedQuery,
          limit,
        },
      });

      if (error) {
        console.error('Instant search error:', error);
        return { results: [], query: debouncedQuery, hasMore: false };
      }

      return data as InstantSearchResponse;
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Get recent searches from localStorage
 */
export function useRecentSearches(maxItems: number = 5) {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace-recent-searches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSearches(Array.isArray(parsed) ? parsed.slice(0, maxItems) : []);
      } catch {
        setSearches([]);
      }
    }
  }, [maxItems]);

  const addSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...searches.filter(s => s !== trimmed)].slice(0, maxItems);
    setSearches(updated);
    localStorage.setItem('marketplace-recent-searches', JSON.stringify(updated));
  };

  const clearSearches = () => {
    setSearches([]);
    localStorage.removeItem('marketplace-recent-searches');
  };

  return { searches, addSearch, clearSearches };
}
