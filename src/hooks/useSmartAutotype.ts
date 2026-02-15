import { useCallback, useRef, useState } from 'react';
import { UK_ENGLISH_CORRECTIONS } from '@/data/site-safety/uk-english-corrections';
import { ELECTRICAL_TERMS } from '@/data/site-safety/electrical-terminology';

interface Suggestion {
  original: string;
  replacement: string;
  type: 'uk-english' | 'terminology' | 'spelling';
  start: number;
  end: number;
}

/**
 * Client-side smart autotype hook for safety documentation.
 * - Auto-capitalises electrical abbreviations (MCB, RCD, etc.)
 * - Suggests UK English replacements (color → colour)
 * - Corrects common electrical misspellings
 *
 * Returns the processed text and any pending suggestions.
 */
export function useSmartAutotype() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  /**
   * Process text after a word boundary (space, enter, punctuation).
   * Returns corrected text with auto-applied fixes and pending suggestions.
   */
  const processText = useCallback((text: string, cursorPosition: number): {
    correctedText: string;
    appliedCount: number;
  } => {
    if (!text) return { correctedText: text, appliedCount: 0 };

    let corrected = text;
    let appliedCount = 0;

    // Find the last completed word (before cursor)
    const beforeCursor = corrected.slice(0, cursorPosition);
    const wordMatch = beforeCursor.match(/(\S+)\s$/);
    if (!wordMatch) return { correctedText: corrected, appliedCount: 0 };

    const lastWord = wordMatch[1];
    const wordStart = cursorPosition - lastWord.length - 1; // -1 for trailing space
    const wordEnd = wordStart + lastWord.length;

    // Strip trailing punctuation for lookup
    const stripped = lastWord.replace(/[.,;:!?'")\]]+$/, '');
    const strippedLower = stripped.toLowerCase();
    const punctuation = lastWord.slice(stripped.length);

    // 1. Check electrical terminology (auto-apply)
    if (ELECTRICAL_TERMS[strippedLower]) {
      const replacement = ELECTRICAL_TERMS[strippedLower];
      if (stripped !== replacement) {
        corrected =
          corrected.slice(0, wordStart) +
          replacement +
          punctuation +
          corrected.slice(wordEnd);
        appliedCount++;
        return { correctedText: corrected, appliedCount };
      }
    }

    // 2. Check UK English corrections (auto-apply)
    if (UK_ENGLISH_CORRECTIONS[strippedLower]) {
      const replacement = UK_ENGLISH_CORRECTIONS[strippedLower];
      // Preserve original capitalisation pattern
      const correctedWord = preserveCase(stripped, replacement);
      if (stripped !== correctedWord) {
        corrected =
          corrected.slice(0, wordStart) +
          correctedWord +
          punctuation +
          corrected.slice(wordEnd);
        appliedCount++;
        return { correctedText: corrected, appliedCount };
      }
    }

    return { correctedText: corrected, appliedCount };
  }, []);

  /**
   * Check full text for suggestions without auto-applying.
   */
  const checkForSuggestions = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const found: Suggestion[] = [];
      const words = text.split(/(\s+)/);
      let pos = 0;

      for (const segment of words) {
        if (/\s+/.test(segment)) {
          pos += segment.length;
          continue;
        }

        const stripped = segment.replace(/[.,;:!?'")\]]+$/, '');
        const lower = stripped.toLowerCase();

        if (UK_ENGLISH_CORRECTIONS[lower] && stripped !== UK_ENGLISH_CORRECTIONS[lower]) {
          found.push({
            original: stripped,
            replacement: preserveCase(stripped, UK_ENGLISH_CORRECTIONS[lower]),
            type: 'uk-english',
            start: pos,
            end: pos + stripped.length,
          });
        } else if (ELECTRICAL_TERMS[lower] && stripped !== ELECTRICAL_TERMS[lower]) {
          found.push({
            original: stripped,
            replacement: ELECTRICAL_TERMS[lower],
            type: 'terminology',
            start: pos,
            end: pos + stripped.length,
          });
        }

        pos += segment.length;
      }

      setSuggestions(found);
    }, 300);
  }, []);

  /**
   * Apply a specific suggestion to text.
   */
  const applySuggestion = useCallback(
    (text: string, suggestion: Suggestion): string => {
      const result =
        text.slice(0, suggestion.start) +
        suggestion.replacement +
        text.slice(suggestion.end);

      setSuggestions((prev) => prev.filter((s) => s.start !== suggestion.start));
      return result;
    },
    []
  );

  /**
   * Dismiss a suggestion.
   */
  const dismissSuggestion = useCallback((suggestion: Suggestion) => {
    setSuggestions((prev) => prev.filter((s) => s.start !== suggestion.start));
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    processText,
    checkForSuggestions,
    suggestions,
    applySuggestion,
    dismissSuggestion,
    clearSuggestions,
  };
}

/**
 * Preserve the capitalisation pattern of the original word
 * when applying a replacement.
 */
function preserveCase(original: string, replacement: string): string {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}
