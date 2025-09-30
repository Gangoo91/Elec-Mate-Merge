import { useState, useCallback } from 'react';
import { Invoice, InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useInvoiceBuilder = (sourceQuote?: Quote) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>(() => {
    if (sourceQuote) {
      return createInvoiceFromQuote(sourceQuote);
    }
    return {};
  });

  const createInvoiceFromQuote = useCallback((quote: Quote): Partial<Invoice> => {
    const invoiceDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); // 30 days payment terms

    return {
      ...quote,
      originalQuoteId: quote.id,
      invoice_raised: false,
      invoice_number: generateInvoiceNumber(),
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
        paymentTerms: '30 days',
        dueDate: dueDate,
      },
    };
  }, []);

  const addInvoiceItem = useCallback((item: Omit<InvoiceItem, 'id' | 'totalPrice'>) => {
    const newItem: InvoiceItem = {
      ...item,
      id: uuidv4(),
      totalPrice: item.quantity * item.unitPrice,
      completionStatus: 'completed',
      actualQuantity: item.quantity,
    };

    setInvoice(prev => ({
      ...prev,
      additional_invoice_items: [...(prev.additional_invoice_items || []), newItem],
    }));

    recalculateTotals();
  }, []);

  const updateInvoiceItem = useCallback((itemId: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items?.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
      additional_invoice_items: prev.additional_invoice_items?.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));

    recalculateTotals();
  }, []);

  const removeInvoiceItem = useCallback((itemId: string) => {
    setInvoice(prev => ({
      ...prev,
      additional_invoice_items: prev.additional_invoice_items?.filter(item => item.id !== itemId),
    }));

    recalculateTotals();
  }, []);

  const updateInvoiceSettings = useCallback((settings: Partial<InvoiceSettings>) => {
    setInvoice(prev => ({
      ...prev,
      settings: { ...prev.settings!, ...settings },
    }));
  }, []);

  const recalculateTotals = useCallback(() => {
    setInvoice(prev => {
      const allItems = [...(prev.items || []), ...(prev.additional_invoice_items || [])];
      const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
      
      const settings = prev.settings!;
      const overhead = subtotal * (settings.overheadPercentage / 100);
      const profit = (subtotal + overhead) * (settings.profitMargin / 100);
      const vatAmount = settings.vatRegistered 
        ? (subtotal + overhead + profit) * (settings.vatRate / 100)
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

  return {
    invoice,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    updateInvoiceSettings,
    setInvoiceNotes,
    updateInvoiceStatus,
    recalculateTotals,
  };
};

const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `INV-${year}-${timestamp}`;
};
