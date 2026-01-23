import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AutocompleteSuggestion {
  name: string;
  score: number;
  category: string;
}

interface UseMaterialsAutocompleteOptions {
  debounceMs?: number;
  minChars?: number;
  maxSuggestions?: number;
}

interface UseMaterialsAutocompleteResult {
  suggestions: AutocompleteSuggestion[];
  isLoading: boolean;
  error: string | null;
  clearSuggestions: () => void;
}

export function useMaterialsAutocomplete(
  query: string,
  options: UseMaterialsAutocompleteOptions = {}
): UseMaterialsAutocompleteResult {
  const {
    debounceMs = 150,
    minChars = 2,
    maxSuggestions = 8
  } = options;

  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const cacheRef = useRef<Map<string, AutocompleteSuggestion[]>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  useEffect(() => {
    // Clear any pending debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Abort any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Don't search if query is too short
    if (!query || query.trim().length < minChars) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const trimmedQuery = query.trim().toLowerCase();

    // Check cache first
    if (cacheRef.current.has(trimmedQuery)) {
      setSuggestions(cacheRef.current.get(trimmedQuery)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Debounce the search
    debounceRef.current = setTimeout(async () => {
      abortControllerRef.current = new AbortController();

      try {
        const { data, error: functionError } = await supabase.functions.invoke(
          'search-materials-autocomplete',
          {
            body: {
              query: trimmedQuery,
              limit: maxSuggestions
            }
          }
        );

        if (functionError) {
          throw new Error(functionError.message);
        }

        const results = data?.suggestions || [];

        // Cache the results
        cacheRef.current.set(trimmedQuery, results);

        // Limit cache size to prevent memory issues
        if (cacheRef.current.size > 100) {
          const firstKey = cacheRef.current.keys().next().value;
          if (firstKey) {
            cacheRef.current.delete(firstKey);
          }
        }

        setSuggestions(results);
        setError(null);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Autocomplete error:', err);
          setError(err.message || 'Failed to get suggestions');
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, debounceMs, minChars, maxSuggestions]);

  return {
    suggestions,
    isLoading,
    error,
    clearSuggestions
  };
}
