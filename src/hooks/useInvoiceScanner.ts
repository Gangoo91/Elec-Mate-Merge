/**
 * Invoice Scanner Hook
 * Handles camera capture, image upload, AI processing, and material matching
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { commonMaterials } from '@/data/electrician/presetData';
import {
  ExtractedInvoiceItem,
  ParseInvoiceResponse,
  MaterialMatch,
  ScannedInvoiceItem,
  ScannerState,
  ScanResult,
  InvoiceScannerOptions
} from '@/types/invoice-scanner';

const DEFAULT_OPTIONS: Required<InvoiceScannerOptions> = {
  minMatchScore: 0.4,
  maxAlternatives: 3,
  autoSelectThreshold: 0.75
};

/**
 * Calculate string similarity using Dice coefficient
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) return 0;

  // Create bigrams
  const getBigrams = (s: string): Set<string> => {
    const bigrams = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) {
      bigrams.add(s.substring(i, i + 2));
    }
    return bigrams;
  };

  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);

  let intersection = 0;
  bigrams1.forEach(bigram => {
    if (bigrams2.has(bigram)) intersection++;
  });

  return (2 * intersection) / (bigrams1.size + bigrams2.size);
}

/**
 * Find local material matches from commonMaterials
 */
function findLocalMatches(
  description: string,
  productCode: string | null,
  category: string,
  minScore: number,
  maxResults: number
): MaterialMatch[] {
  const matches: MaterialMatch[] = [];

  // First, try exact SKU match if product code exists
  if (productCode) {
    const exactMatch = commonMaterials.find(m =>
      m.code === productCode ||
      m.id === productCode.toLowerCase().replace(/\s+/g, '-')
    );

    if (exactMatch) {
      matches.push({
        id: exactMatch.id,
        name: exactMatch.name,
        category: exactMatch.category,
        subcategory: exactMatch.subcategory,
        unit: exactMatch.unit,
        defaultPrice: exactMatch.defaultPrice,
        code: exactMatch.code,
        score: 1,
        source: 'local'
      });
    }
  }

  // Fuzzy match by name
  const descLower = description.toLowerCase();

  // Filter by category first if it maps to our categories
  const categoryMappings: Record<string, string[]> = {
    'cables': ['cables'],
    'accessories': ['accessories'],
    'distribution': ['distribution'],
    'lighting': ['lighting'],
    'containment': ['containment'],
    'heating': ['heating'],
    'fire-safety': ['fire-safety'],
    'security': ['security'],
    'ev-charging': ['ev-charging'],
    'renewable-energy': ['renewable-energy'],
    'industrial': ['industrial'],
    'data-comms': ['data-comms'],
    'specialist': ['specialist']
  };

  const relevantCategories = categoryMappings[category] || [];
  const materialsToSearch = relevantCategories.length > 0
    ? commonMaterials.filter(m => relevantCategories.includes(m.category))
    : commonMaterials;

  // Score all materials
  const scored = materialsToSearch.map(m => {
    // Check for key term matches (boost score)
    const nameLower = m.name.toLowerCase();
    let boost = 0;

    // Common electrical terms that should boost matches
    const keyTerms = ['mm²', 'mm', 'twin', 'earth', 'swa', 'mcb', 'rcd', 'rcbo', 'socket', 'switch', 'led', 'downlight'];
    for (const term of keyTerms) {
      if (descLower.includes(term) && nameLower.includes(term)) {
        boost += 0.15;
      }
    }

    // Size matches (e.g., "2.5mm" in both)
    const sizeRegex = /(\d+\.?\d*)\s*(mm|amp|a)\b/gi;
    const descSizes = [...descLower.matchAll(sizeRegex)].map(m => m[1]);
    const nameSizes = [...nameLower.matchAll(sizeRegex)].map(m => m[1]);
    if (descSizes.some(s => nameSizes.includes(s))) {
      boost += 0.2;
    }

    const baseScore = calculateSimilarity(description, m.name);
    const finalScore = Math.min(baseScore + boost, 1);

    return {
      material: m,
      score: finalScore
    };
  });

  // Sort by score and take top matches
  scored
    .filter(s => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .forEach(({ material, score }) => {
      // Don't add duplicates (from SKU match)
      if (!matches.some(m => m.id === material.id)) {
        matches.push({
          id: material.id,
          name: material.name,
          category: material.category,
          subcategory: material.subcategory,
          unit: material.unit,
          defaultPrice: material.defaultPrice,
          code: material.code,
          score,
          source: 'local'
        });
      }
    });

  return matches;
}

/**
 * Find server-side material matches using search-materials-autocomplete
 */
async function findServerMatches(
  description: string,
  maxResults: number
): Promise<MaterialMatch[]> {
  try {
    const { data, error } = await supabase.functions.invoke('search-materials-autocomplete', {
      body: { query: description, limit: maxResults }
    });

    if (error || !data?.success) {
      console.warn('Server material search failed:', error);
      return [];
    }

    return (data.suggestions || []).map((suggestion: any) => ({
      id: `server-${suggestion.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: suggestion.name,
      category: suggestion.category || 'other',
      unit: 'each',
      defaultPrice: 0, // Server doesn't return price
      score: suggestion.score || 0.5,
      source: 'server' as const
    }));
  } catch (err) {
    console.error('Server material search error:', err);
    return [];
  }
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Invoice Scanner Hook
 */
export function useInvoiceScanner(options: InvoiceScannerOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState<string>('');

  /**
   * Process an image and extract invoice items
   */
  const processImage = useCallback(async (imageBase64: string, imageType: string): Promise<ScanResult> => {
    setState('processing');
    setProgress('Analysing invoice...');

    try {
      // Call the parse-invoice-photo edge function
      const { data, error } = await supabase.functions.invoke<ParseInvoiceResponse>('parse-invoice-photo', {
        body: {
          image_base64: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          image_type: imageType
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to process invoice');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to extract items from invoice');
      }

      // Now match extracted items to materials
      setState('matching');
      setProgress(`Matching ${data.items.length} items...`);

      const scannedItems: ScannedInvoiceItem[] = await Promise.all(
        data.items.map(async (extracted, index) => {
          setProgress(`Matching item ${index + 1} of ${data.items.length}...`);

          // Get local matches first
          const localMatches = findLocalMatches(
            extracted.description,
            extracted.product_code,
            extracted.category,
            opts.minMatchScore,
            opts.maxAlternatives + 1
          );

          // Get server matches if we don't have a high-confidence local match
          let serverMatches: MaterialMatch[] = [];
          if (localMatches.length === 0 || localMatches[0].score < 0.8) {
            serverMatches = await findServerMatches(
              extracted.description,
              opts.maxAlternatives
            );
          }

          // Combine and dedupe matches
          const allMatches = [...localMatches];
          serverMatches.forEach(sm => {
            if (!allMatches.some(m => m.name.toLowerCase() === sm.name.toLowerCase())) {
              allMatches.push(sm);
            }
          });

          // Sort by score
          allMatches.sort((a, b) => b.score - a.score);

          const bestMatch = allMatches[0] || null;
          const alternatives = allMatches.slice(1, opts.maxAlternatives + 1);

          // Determine unit price (prefer extracted, fall back to match)
          const unitPrice = extracted.unit_price ??
            (extracted.total_price && extracted.quantity > 0
              ? extracted.total_price / extracted.quantity
              : null) ??
            bestMatch?.defaultPrice ??
            0;

          // Auto-select if high confidence
          const autoSelect = bestMatch !== null && bestMatch.score >= opts.autoSelectThreshold;

          return {
            id: generateId(),
            extracted,
            match: bestMatch,
            alternativeMatches: alternatives,
            selected: autoSelect,
            quantity: extracted.quantity,
            unitPrice
          };
        })
      );

      const scanResult: ScanResult = {
        success: true,
        supplierName: data.supplier_name,
        invoiceNumber: data.invoice_number,
        invoiceDate: data.invoice_date,
        items: scannedItems
      };

      setState('review');
      setResult(scanResult);
      setProgress('');

      return scanResult;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Invoice scan error:', err);

      setState('error');
      setProgress('');

      const errorResult: ScanResult = {
        success: false,
        supplierName: null,
        invoiceNumber: null,
        invoiceDate: null,
        items: [],
        error: errorMessage
      };

      setResult(errorResult);
      toast({
        title: 'Scan Failed',
        description: errorMessage,
        variant: 'destructive'
      });

      return errorResult;
    }
  }, [opts]);

  /**
   * Handle camera capture
   */
  const handleCapture = useCallback(async (imageData: string, _file: File) => {
    // Extract image type from data URL
    const match = imageData.match(/^data:(image\/\w+);base64,/);
    const imageType = match ? match[1] : 'image/jpeg';

    return processImage(imageData, imageType);
  }, [processImage]);

  /**
   * Handle file upload
   */
  const handleUpload = useCallback(async (file: File) => {
    setState('uploading');
    setProgress('Preparing image...');

    return new Promise<ScanResult>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        if (!base64) {
          reject(new Error('Failed to read file'));
          return;
        }

        const result = await processImage(base64, file.type || 'image/jpeg');
        resolve(result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }, [processImage]);

  /**
   * Update a scanned item
   */
  const updateItem = useCallback((itemId: string, updates: Partial<ScannedInvoiceItem>) => {
    setResult(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      };
    });
  }, []);

  /**
   * Toggle item selection
   */
  const toggleItemSelection = useCallback((itemId: string) => {
    setResult(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId ? { ...item, selected: !item.selected } : item
        )
      };
    });
  }, []);

  /**
   * Select a different match for an item
   */
  const selectMatch = useCallback((itemId: string, match: MaterialMatch) => {
    setResult(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map(item => {
          if (item.id !== itemId) return item;

          // Move current match to alternatives if it exists
          const newAlternatives = item.match
            ? [item.match, ...item.alternativeMatches.filter(m => m.id !== match.id)]
            : item.alternativeMatches.filter(m => m.id !== match.id);

          return {
            ...item,
            match,
            alternativeMatches: newAlternatives.slice(0, opts.maxAlternatives),
            selected: true,
            unitPrice: match.defaultPrice || item.unitPrice
          };
        })
      };
    });
  }, [opts.maxAlternatives]);

  /**
   * Select all items
   */
  const selectAll = useCallback(() => {
    setResult(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map(item => ({ ...item, selected: true }))
      };
    });
  }, []);

  /**
   * Deselect all items
   */
  const deselectAll = useCallback(() => {
    setResult(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map(item => ({ ...item, selected: false }))
      };
    });
  }, []);

  /**
   * Reset scanner state
   */
  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setProgress('');
  }, []);

  /**
   * Get selected items ready to add to invoice
   */
  const getSelectedItems = useCallback(() => {
    if (!result) return [];

    return result.items
      .filter(item => item.selected)
      .map(item => ({
        description: item.match?.name || item.extracted.description,
        quantity: item.quantity,
        unit: item.match?.unit || 'each',
        unitPrice: item.unitPrice,
        category: 'materials' as const,
        subcategory: item.match?.subcategory || item.extracted.category,
        materialCode: item.match?.id
      }));
  }, [result]);

  return {
    // State
    state,
    result,
    progress,

    // Actions
    handleCapture,
    handleUpload,
    updateItem,
    toggleItemSelection,
    selectMatch,
    selectAll,
    deselectAll,
    reset,

    // Getters
    getSelectedItems
  };
}
