import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Invoice, InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { generateSequentialInvoiceNumber } from '@/utils/invoice-number-generator';
import { supabase } from '@/integrations/supabase/client';
import type { CompanyProfile } from '@/types/company';
import { logger, generateRequestId } from '@/utils/logger';

// Helper to safely get item price with NaN protection
// Always calculate from quantity * unitPrice to ensure consistency with PDF generation
const safeItemPrice = (item: InvoiceItem): number => {
  const price = (item.quantity || 0) * (item.unitPrice || 0);
  return isNaN(price) ? 0 : price;
};

// Helper to calculate safe subtotal from items
const calculateSafeSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + safeItemPrice(item), 0);
};

const generateInvoiceNumber = async (): Promise<string> => {
  return await generateSequentialInvoiceNumber();
};

// Hook to fetch company profile for invoice conversion
export function useCompanyProfileForInvoice() {
  return useQuery({
    queryKey: ['company-profile-invoice'],
    queryFn: async (): Promise<CompanyProfile | null> => {
      const requestId = generateRequestId();
      logger.api('company_profiles/fetch-for-invoice', requestId).start();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        logger.info('No user found, skipping company profile fetch for invoice');
        return null;
      }

      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        logger.api('company_profiles/fetch-for-invoice', requestId).error(error);
        return null;
      }

      logger.api('company_profiles/fetch-for-invoice', requestId).success({ companyName: data?.company_name });
      return data as CompanyProfile;
    },
  });
}

export const createInvoiceFromQuote = (
  quote: Quote,
  companyProfile: CompanyProfile | null = null
): Partial<Invoice> => {
  const invoiceDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30); // 30 days payment terms

  return {
    ...quote,
    originalQuoteId: quote.id,
    invoice_raised: false,
    invoice_number: 'Invoice/TEMP', // Will be generated when saved
    invoice_date: invoiceDate,
    invoice_due_date: dueDate,
    invoice_status: 'draft',
    additional_invoice_items: [],
    work_completion_date: new Date(),
    items: quote.items.map(item => ({
      ...item,
      completionStatus: 'completed' as const,
      actualQuantity: item.quantity,
    })),
    settings: {
      ...quote.settings,
      // Quote builder sets overhead/profit to 0 because they're built into item prices
      // Ensure invoice doesn't re-apply these percentages during recalculation
      overheadPercentage: 0,
      profitMargin: 0,
      paymentTerms: companyProfile?.payment_terms || '30 days',
      dueDate: dueDate,
      bankDetails: companyProfile?.bank_details || undefined,
    },
  };
};

const createEmptyInvoice = (): Partial<Invoice> => {
  const invoiceDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30); // 30 days payment terms

  return {
    id: uuidv4(),
    invoice_raised: false,
    invoice_number: 'Invoice/TEMP', // Will be generated when saved
    invoice_date: invoiceDate,
    invoice_due_date: dueDate,
    invoice_status: 'draft',
    additional_invoice_items: [],
    work_completion_date: new Date(),
    items: [],
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
      postcode: '',
    },
    jobDetails: {
      title: '',
      description: '',
    },
    settings: {
      labourRate: 50,
      overheadPercentage: 0,  // User enters final prices - no automatic overhead
      profitMargin: 0,        // User enters final prices - no automatic profit
      vatRate: 20,
      vatRegistered: true,
      paymentTerms: '30 days',
      dueDate: dueDate,
    },
    subtotal: 0,
    overhead: 0,
    profit: 0,
    vatAmount: 0,
    total: 0,
  };
};

export const useInvoiceBuilder = (sourceQuote?: Quote, existingInvoice?: Partial<Invoice>) => {
  const { data: companyProfile } = useCompanyProfileForInvoice();

  const [invoice, setInvoice] = useState<Partial<Invoice>>(() => {
    // If editing an existing invoice, recalculate totals to ensure consistency
    if (existingInvoice) {
      const allItems = [...(existingInvoice.items || []), ...(existingInvoice.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);
      const settings = existingInvoice.settings!;
      const overhead = subtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered
        ? (subtotal + overhead + profit) * ((settings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...existingInvoice,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    }
    // Otherwise create from quote
    if (sourceQuote) {
      return createInvoiceFromQuote(sourceQuote, null);  // Will be updated when profile loads
    }
    // Create empty invoice for standalone creation
    return createEmptyInvoice();
  });

  // Update invoice with company profile when it loads
  // This ensures bank details and payment terms are always populated from company profile
  useEffect(() => {
    if (companyProfile) {
      setInvoice(prev => {
        // Only update if bank details aren't already set (don't overwrite user edits)
        const currentBankDetails = prev.settings?.bankDetails;
        const hasBankDetails = currentBankDetails?.bankName || currentBankDetails?.accountNumber;

        // Always populate from company profile if not already set
        if (!hasBankDetails && companyProfile.bank_details) {
          return {
            ...prev,
            settings: {
              ...prev.settings!,
              paymentTerms: prev.settings?.paymentTerms || companyProfile.payment_terms || '30 days',
              bankDetails: companyProfile.bank_details,
            },
          };
        }

        // For quote conversions, also update payment terms if not set
        if (sourceQuote && !existingInvoice) {
          return {
            ...prev,
            settings: {
              ...prev.settings!,
              paymentTerms: companyProfile.payment_terms || prev.settings!.paymentTerms,
              bankDetails: prev.settings?.bankDetails || companyProfile.bank_details,
            },
          };
        }

        return prev;
      });
    }
  }, [companyProfile, sourceQuote, existingInvoice]);

  const addInvoiceItem = useCallback((item: Omit<InvoiceItem, 'id' | 'totalPrice'>) => {
    const newItem: InvoiceItem = {
      ...item,
      id: uuidv4(),
      totalPrice: item.quantity * item.unitPrice,
      completionStatus: 'completed',
      actualQuantity: item.quantity,
    };

    setInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        additional_invoice_items: [...(prev.additional_invoice_items || []), newItem],
      };
      
      // Recalculate totals with updated items
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);
      const settings = updatedInvoice.settings!;
      const overhead = subtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered 
        ? (subtotal + overhead + profit) * ((settings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...updatedInvoice,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    });
  }, []);

  const updateInvoiceItem = useCallback((itemId: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        items: prev.items?.map(item =>
          item.id === itemId ? { 
            ...item, 
            ...updates,
            totalPrice: ((updates.quantity ?? item.quantity) || 0) * ((updates.unitPrice ?? item.unitPrice) || 0)
          } : item
        ),
        additional_invoice_items: prev.additional_invoice_items?.map(item =>
          item.id === itemId ? { 
            ...item, 
            ...updates,
            totalPrice: ((updates.quantity ?? item.quantity) || 0) * ((updates.unitPrice ?? item.unitPrice) || 0)
          } : item
        ),
      };

      // Recalculate totals with updated items
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);
      const settings = updatedInvoice.settings!;
      const overhead = subtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered 
        ? (subtotal + overhead + profit) * ((settings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...updatedInvoice,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    });
  }, []);

  const removeInvoiceItem = useCallback((itemId: string) => {
    setInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        additional_invoice_items: prev.additional_invoice_items?.filter(item => item.id !== itemId),
      };

      // Recalculate totals with updated items
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);
      const settings = updatedInvoice.settings!;
      const overhead = subtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered 
        ? (subtotal + overhead + profit) * ((settings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...updatedInvoice,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    });
  }, []);

  const updateInvoiceSettings = useCallback((settings: Partial<InvoiceSettings>) => {
    setInvoice(prev => {
      const updatedInvoice = {
        ...prev,
        settings: { ...prev.settings!, ...settings },
        // Sync due date from settings to top-level invoice_due_date
        ...(settings.dueDate && { invoice_due_date: settings.dueDate }),
      };

      // Recalculate totals with updated settings
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);
      const updatedSettings = updatedInvoice.settings!;
      const overhead = subtotal * ((updatedSettings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((updatedSettings.profitMargin || 0) / 100);
      const vatAmount = updatedSettings.vatRegistered
        ? (subtotal + overhead + profit) * ((updatedSettings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...updatedInvoice,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    });
  }, []);

  const recalculateTotals = useCallback(() => {
    setInvoice(prev => {
      const allItems = [...(prev.items || []), ...(prev.additional_invoice_items || [])];
      const subtotal = calculateSafeSubtotal(allItems);

      const settings = prev.settings!;
      const overhead = subtotal * ((settings.overheadPercentage || 0) / 100);
      const profit = (subtotal + overhead) * ((settings.profitMargin || 0) / 100);
      const vatAmount = settings.vatRegistered
        ? (subtotal + overhead + profit) * ((settings.vatRate || 0) / 100)
        : 0;
      const total = subtotal + overhead + profit + vatAmount;

      return {
        ...prev,
        subtotal,
        overhead,
        profit,
        vatAmount,
        total,
      };
    });
  }, []);

  const setInvoiceNotes = useCallback((notes: string) => {
    setInvoice(prev => ({
      ...prev,
      invoice_notes: notes,
    }));
  }, []);

  const updateInvoiceStatus = useCallback((status: Invoice['invoice_status']) => {
    setInvoice(prev => ({
      ...prev,
      invoice_status: status,
    }));
  }, []);

  const updateJobDetails = useCallback((jobDetails: Partial<Quote['jobDetails']>) => {
    setInvoice(prev => ({
      ...prev,
      jobDetails: {
        ...prev.jobDetails,
        ...jobDetails,
      },
    }));
  }, []);

  const updateClientDetails = useCallback((client: Partial<Quote['client']>) => {
    setInvoice(prev => ({
      ...prev,
      client: {
        ...prev.client,
        ...client,
      },
    }));
  }, []);

  const initializeInvoice = useCallback((client: Quote['client'], jobDetails: Quote['jobDetails']) => {
    setInvoice(prev => ({
      ...prev,
      client,
      jobDetails,
    }));
  }, []);

  return {
    invoice,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    updateInvoiceSettings,
    setInvoiceNotes,
    updateInvoiceStatus,
    updateJobDetails,
    updateClientDetails,
    initializeInvoice,
    recalculateTotals,
  };
};

