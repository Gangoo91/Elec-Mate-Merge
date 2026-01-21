import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a sequential quote number in the format YYYY/XXX
 * e.g., 2025/001, 2025/002, etc.
 */
export const generateSequentialQuoteNumber = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const yearPrefix = currentYear.toString();

  try {
    // Get user ID for user-specific counting
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('No authenticated user, using timestamp fallback');
      return `${yearPrefix}/T${Date.now().toString().slice(-6)}`;
    }

    // Count ALL quotes for this user (any format: YYYY/XXX, QTE-YYMM-XXX, etc.)
    // This ensures we don't restart numbering when quotes come from different sources
    const { count, error: countError } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (countError) {
      console.warn('Error counting quotes:', countError);
      return `${yearPrefix}/T${Date.now().toString().slice(-6)}`;
    }

    // Next number is total count + 1
    const nextSequence = (count || 0) + 1;
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