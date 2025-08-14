import { useState, useCallback } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';

export const useQuoteBuilder = () => {
  const [quote, setQuote] = useState<Partial<Quote>>({
    id: uuidv4(),
    quoteNumber: `Q${Date.now()}`,
    items: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const updateClient = useCallback((client: QuoteClient) => {
    console.log('updateClient called with:', client);
    setQuote(prev => {
      const updated = { ...prev, client, updatedAt: new Date() };
      console.log('Quote updated to:', updated);
      return updated;
    });
  }, []);

  const updateSettings = useCallback((settings: QuoteSettings) => {
    setQuote(prev => ({ ...prev, settings, updatedAt: new Date() }));
  }, []);

  const addItem = useCallback((item: Omit<QuoteItem, 'id' | 'totalPrice'>) => {
    const newItem: QuoteItem = {
      ...item,
      id: uuidv4(),
      totalPrice: item.quantity * item.unitPrice,
    };
    
    setQuote(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem],
      updatedAt: new Date(),
    }));
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<QuoteItem>) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items?.map(item => 
        item.id === itemId 
          ? { ...item, ...updates, totalPrice: (updates.quantity ?? item.quantity) * (updates.unitPrice ?? item.unitPrice) }
          : item
      ),
      updatedAt: new Date(),
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId),
      updatedAt: new Date(),
    }));
  }, []);

  const calculateTotals = useCallback(() => {
    if (!quote.items || !quote.settings) return quote;

    const subtotal = quote.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const overhead = subtotal * (quote.settings.overheadPercentage / 100);
    const profit = (subtotal + overhead) * (quote.settings.profitMargin / 100);
    const beforeVat = subtotal + overhead + profit;
    const vatAmount = quote.settings.vatRegistered ? beforeVat * (quote.settings.vatRate / 100) : 0;
    const total = beforeVat + vatAmount;

    return {
      ...quote,
      subtotal,
      overhead,
      profit,
      vatAmount,
      total,
    };
  }, [quote]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const resetQuote = useCallback(() => {
    setQuote({
      id: uuidv4(),
      quoteNumber: `Q${Date.now()}`,
      items: [],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setCurrentStep(0);
  }, []);

  return {
    quote: calculateTotals(),
    currentStep,
    updateClient,
    updateSettings,
    addItem,
    updateItem,
    removeItem,
    nextStep,
    prevStep,
    resetQuote,
  };
};