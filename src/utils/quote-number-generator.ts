import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a sequential quote number in the format YYYY/XXX
 * e.g., 2025/001, 2025/002, etc.
 */
export const generateSequentialQuoteNumber = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const yearPrefix = currentYear.toString();
  
  try {
    // Query existing quotes for the current year to find the highest sequence number
    const { data: existingQuotes, error } = await supabase
      .from('quotes')
      .select('quote_number')
      .like('quote_number', `${yearPrefix}/%`)
      .order('quote_number', { ascending: false })
      .limit(1);

    if (error) {
      console.warn('Error querying existing quotes, using fallback:', error);
      // Fallback to timestamp-based if database query fails
      return `${yearPrefix}/T${Date.now().toString().slice(-6)}`;
    }

    let nextSequence = 1;

    if (existingQuotes && existingQuotes.length > 0) {
      const lastQuoteNumber = existingQuotes[0].quote_number;
      
      // Extract the sequence number from the last quote (e.g., "2025/023" -> 23)
      const sequenceMatch = lastQuoteNumber.match(/\/(\d+)$/);
      if (sequenceMatch) {
        const lastSequence = parseInt(sequenceMatch[1], 10);
        nextSequence = lastSequence + 1;
      }
    }

    // Format sequence number with leading zeros (e.g., 001, 002, 023)
    const sequenceString = nextSequence.toString().padStart(3, '0');
    
    return `${yearPrefix}/${sequenceString}`;
  } catch (error) {
    console.warn('Error generating sequential quote number, using fallback:', error);
    // Fallback to timestamp-based if anything goes wrong
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