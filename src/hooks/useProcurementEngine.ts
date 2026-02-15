import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  ProcurementState,
  ProcurementStep,
  ParsedMaterialItem,
  ComparisonResult,
} from '@/types/procurement';

const initialState: ProcurementState = {
  step: 'idle',
  error: null,
  parsedItems: [],
  comparison: null,
};

/**
 * Orchestrates the Smart Procurement Engine pipeline:
 * text/photo → parse → compare prices → optimised basket
 */
export function useProcurementEngine() {
  const [state, setState] = useState<ProcurementState>(initialState);

  const setStep = useCallback(
    (step: ProcurementStep) => setState((prev) => ({ ...prev, step, error: null })),
    []
  );

  const setError = useCallback(
    (error: string) => setState((prev) => ({ ...prev, step: 'error' as const, error })),
    []
  );

  const reset = useCallback(() => setState(initialState), []);

  /**
   * Compare prices across all suppliers for parsed items
   */
  const compareItems = useCallback(
    async (items: ParsedMaterialItem[]) => {
      try {
        setStep('comparing_prices');

        const { data, error } = await supabase.functions.invoke('compare-materials-prices', {
          body: { items },
        });

        if (error) {
          setError(error.message || 'Failed to compare prices');
          return;
        }

        const comparison = data?.comparison as ComparisonResult | undefined;
        if (!comparison) {
          setError('No price data returned. Please try again.');
          return;
        }

        setState((prev) => ({ ...prev, step: 'done', comparison }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to compare prices');
      }
    },
    [setStep, setError]
  );

  /**
   * Parse a photo into materials text via Gemini vision,
   * then parse that text into structured items
   */
  const processPhoto = useCallback(
    async (base64: string, mimeType: string) => {
      try {
        setState({ ...initialState, step: 'parsing_photo' });

        const { data: photoData, error: photoError } = await supabase.functions.invoke(
          'parse-materials-photo',
          { body: { image_base64: base64, image_type: mimeType } }
        );

        if (photoError || !photoData?.success) {
          setError(photoData?.error || photoError?.message || 'Failed to read photo');
          return;
        }

        const items: ParsedMaterialItem[] = (photoData.items || []).map(
          (item: {
            name?: string;
            description?: string;
            quantity?: number;
            unit?: string;
            original_text?: string;
          }) => ({
            name: item.name || item.description || '',
            quantity: item.quantity || 1,
            unit: item.unit || 'each',
            original_text: item.original_text,
          })
        );

        if (items.length === 0) {
          setError('No materials found in the photo. Please try a clearer image.');
          return;
        }

        setState((prev) => ({ ...prev, parsedItems: items }));
        await compareItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process photo');
      }
    },
    [compareItems, setError]
  );

  /**
   * Parse pasted text into structured items, then compare prices
   */
  const processText = useCallback(
    async (text: string) => {
      try {
        setState({ ...initialState, step: 'parsing_text' });

        const { data, error } = await supabase.functions.invoke('parse-materials-list', {
          body: { text, parse_only: true },
        });

        if (error) {
          setError(error.message || 'Failed to parse materials');
          return;
        }

        const items: ParsedMaterialItem[] = (data?.items || []).map(
          (item: { name: string; quantity?: number; unit?: string; original_text?: string }) => ({
            name: item.name,
            quantity: item.quantity || 1,
            unit: item.unit || 'each',
            original_text: item.original_text,
          })
        );

        if (items.length === 0) {
          setError(
            'No materials found in the text. Try one item per line, e.g. "10x 2.5mm T&E 100m"'
          );
          return;
        }

        setState((prev) => ({ ...prev, parsedItems: items }));
        await compareItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse materials');
      }
    },
    [compareItems, setError]
  );

  /**
   * Process pre-parsed items (e.g. from a saved materials list)
   */
  const processItems = useCallback(
    async (items: ParsedMaterialItem[]) => {
      setState({ ...initialState, parsedItems: items, step: 'comparing_prices' });
      await compareItems(items);
    },
    [compareItems]
  );

  return {
    ...state,
    processPhoto,
    processText,
    processItems,
    reset,
  };
}
