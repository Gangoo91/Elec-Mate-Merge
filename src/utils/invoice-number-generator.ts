import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a sequential invoice number using database sequence
 * This ensures atomic number generation without race conditions
 * Format: Invoice/001, Invoice/002, etc.
 */
export const generateSequentialInvoiceNumber = async (): Promise<string> => {
  try {
    // Use database function for atomic sequence generation
    const { data, error } = await supabase.rpc('generate_invoice_number');

    if (error) {
      console.warn('Error calling generate_invoice_number function:', error);
      // Fallback to timestamp-based unique number
      return `Invoice/T${Date.now().toString().slice(-6)}`;
    }

    return data as string;
  } catch (error) {
    console.warn('Error generating invoice number, using fallback:', error);
    // Fallback to timestamp-based unique number
    return `Invoice/T${Date.now().toString().slice(-6)}`;
  }
};

/**
 * Validates an invoice number format
 */
export const validateInvoiceNumberFormat = (invoiceNumber: string): boolean => {
  // Check if it matches Invoice/XXX pattern
  const sequentialPattern = /^Invoice\/\d{3}$/;
  // Also allow timestamp fallback pattern Invoice/TXXXXXX
  const timestampPattern = /^Invoice\/T\d{6}$/;
  // Also allow old format for backwards compatibility
  const oldPattern = /^INV-\d{4}-\d+$/;
  
  return sequentialPattern.test(invoiceNumber) || timestampPattern.test(invoiceNumber) || oldPattern.test(invoiceNumber);
};

/**
 * Generates a sequential standalone invoice number using database function
 * Format: Invoice/S001, Invoice/S002, etc. (for invoices not from quotes)
 */
export const generateStandaloneInvoiceNumber = async (): Promise<string> => {
  try {
    // Use database function for standalone invoice generation
    const { data, error } = await supabase.rpc('generate_standalone_invoice_number');

    if (error) {
      console.warn('Error calling generate_standalone_invoice_number function:', error);
      // Fallback to timestamp-based unique number
      return `Invoice/ST${Date.now().toString().slice(-6)}`;
    }

    return data as string;
  } catch (error) {
    console.warn('Error generating standalone invoice number, using fallback:', error);
    // Fallback to timestamp-based unique number
    return `Invoice/ST${Date.now().toString().slice(-6)}`;
  }
};

/**
 * Gets the sequence number from an invoice number
 */
export const getSequenceFromInvoiceNumber = (invoiceNumber: string): number | null => {
  const sequenceMatch = invoiceNumber.match(/\/(\d{3})$/);
  return sequenceMatch ? parseInt(sequenceMatch[1], 10) : null;
};
