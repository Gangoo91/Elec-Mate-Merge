import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a sequential invoice number in the format Invoice/XXX
 * e.g., Invoice/001, Invoice/002, etc.
 */
export const generateSequentialInvoiceNumber = async (): Promise<string> => {
  try {
    // Query existing invoices to find the highest sequence number
    // Look for invoice_number field in quotes table where invoice_raised = true
    const { data: existingInvoices, error } = await supabase
      .from('quotes')
      .select('invoice_number')
      .eq('invoice_raised', true)
      .not('invoice_number', 'is', null)
      .like('invoice_number', 'Invoice/%')
      .order('invoice_number', { ascending: false })
      .limit(1);

    if (error) {
      console.warn('Error querying existing invoices, using fallback:', error);
      return `Invoice/T${Date.now().toString().slice(-6)}`;
    }

    let nextSequence = 1;

    if (existingInvoices && existingInvoices.length > 0) {
      const lastInvoiceNumber = existingInvoices[0].invoice_number;
      
      // Extract the sequence number (e.g., "Invoice/023" -> 23)
      const sequenceMatch = lastInvoiceNumber.match(/\/(\d+)$/);
      if (sequenceMatch) {
        const lastSequence = parseInt(sequenceMatch[1], 10);
        nextSequence = lastSequence + 1;
      }
    }

    // Format with leading zeros (001, 002, 023)
    const sequenceString = nextSequence.toString().padStart(3, '0');
    
    return `Invoice/${sequenceString}`;
  } catch (error) {
    console.warn('Error generating sequential invoice number, using fallback:', error);
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
 * Gets the sequence number from an invoice number
 */
export const getSequenceFromInvoiceNumber = (invoiceNumber: string): number | null => {
  const sequenceMatch = invoiceNumber.match(/\/(\d{3})$/);
  return sequenceMatch ? parseInt(sequenceMatch[1], 10) : null;
};
