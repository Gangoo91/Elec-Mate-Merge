import { useState, useCallback } from 'react';
import { Invoice, InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `INV-${year}-${timestamp}`;
};

const createInvoiceFromQuote = (quote: Quote): Partial<Invoice> => {
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
};

export const useInvoiceBuilder = (sourceQuote?: Quote) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>(() => {
    if (sourceQuote) {
      return createInvoiceFromQuote(sourceQuote);
    }
    return {};
  });

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
      const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
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
            totalPrice: (updates.quantity ?? item.quantity) * (updates.unitPrice ?? item.unitPrice)
          } : item
        ),
        additional_invoice_items: prev.additional_invoice_items?.map(item =>
          item.id === itemId ? { 
            ...item, 
            ...updates,
            totalPrice: (updates.quantity ?? item.quantity) * (updates.unitPrice ?? item.unitPrice)
          } : item
        ),
      };

      // Recalculate totals with updated items
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
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
      const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
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
      };

      // Recalculate totals with updated settings
      const allItems = [...(updatedInvoice.items || []), ...(updatedInvoice.additional_invoice_items || [])];
      const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
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

