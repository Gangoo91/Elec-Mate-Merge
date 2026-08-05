import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a sequential quote number in the format YYYY/XXX
 * e.g., 2025/001, 2025/002, etc.
 *
 * ELE-1466 — allocated by the database, per user, via an atomic counter.
 *
 * This used to be `count(*) of the user's quotes + 1`, computed client-side.
 * That reused a number the moment a quote was deleted (count drops, the next
 * quote takes a number already sent to a customer), and handed the same
 * number to two quotes created at the same time, since the count and the
 * insert were separate round trips. It also counted autosaved drafts, so an
 * abandoned draft still consumed a number.
 *
 * `generate_quote_number()` increments a per-user counter row and returns the
 * new value in one statement, so neither race is possible.
 */
export const generateSequentialQuoteNumber = async (): Promise<string> => {
  const yearPrefix = new Date().getFullYear().toString();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.rpc as any)('generate_quote_number');

    if (error) {
      console.warn('Error calling generate_quote_number function:', error);
      return `${yearPrefix}/T${Date.now().toString().slice(-6)}`;
    }

    return data as string;
  } catch (error) {
    console.warn('Error generating sequential quote number, using fallback:', error);
    // Fallback to timestamp-based if anything goes wrong. The DB trigger
    // (assign_document_numbers) leaves a T-number alone — it only fills a
    // genuinely empty column — so a fallback number still saves cleanly.
    return `${yearPrefix}/T${Date.now().toString().slice(-6)}`;
  }
};

/**
 * Validates a quote number format
 */
export const validateQuoteNumberFormat = (quoteNumber: string): boolean => {
  // Check if it matches YYYY/XXX pattern
  const sequentialPattern = /^\d{4}\/\d{3}$/;
  // Also allow timestamp fallback pattern YYYY/TXXXXXX
  const timestampPattern = /^\d{4}\/T\d{6}$/;

  return sequentialPattern.test(quoteNumber) || timestampPattern.test(quoteNumber);
};

/**
 * Gets the year from a quote number
 */
export const getYearFromQuoteNumber = (quoteNumber: string): number => {
  const yearMatch = quoteNumber.match(/^(\d{4})\//);
  return yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();
};
