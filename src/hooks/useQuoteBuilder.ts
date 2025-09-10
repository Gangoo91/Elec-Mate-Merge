import { useState, useCallback } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings, JobDetails } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';
import { generateQuotePDF } from '@/components/electrician/quote-builder/QuotePDFGenerator';
import { generateProfessionalQuotePDF } from '@/utils/quote-pdf-professional';
import { toast } from '@/hooks/use-toast';
import { useQuoteStorage } from './useQuoteStorage';
import { useCompanyProfile } from './useCompanyProfile';

export const useQuoteBuilder = (onQuoteGenerated?: () => void) => {
  const { saveQuote } = useQuoteStorage();
  const { companyProfile } = useCompanyProfile();
  
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

  const updateJobDetails = useCallback((jobDetails: JobDetails) => {
    console.log('updateJobDetails called with:', jobDetails);
    setQuote(prev => {
      const updated = { ...prev, jobDetails, updatedAt: new Date() };
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

    // Calculate subtotal - profit and overhead are now built into unit prices
    const subtotal = quote.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Calculate VAT on the subtotal (which already includes profit and overhead)
    const vatAmount = quote.settings.vatRegistered ? subtotal * (quote.settings.vatRate / 100) : 0;
    const total = subtotal + vatAmount;

    return {
      ...quote,
      subtotal,
      overhead: 0, // No longer calculated separately
      profit: 0,   // No longer calculated separately
      vatAmount,
      total,
    };
  }, [quote]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const generateQuote = useCallback(async () => {
    try {
      const finalQuote = calculateTotals();
      
      // Validate quote before generation
      if (!finalQuote.client || !finalQuote.items || finalQuote.items.length === 0 || !finalQuote.settings) {
        toast({
          title: "Cannot Generate Quote",
          description: "Please complete all required fields before generating the quote.",
          variant: "destructive"
        });
        return;
      }

      // Update quote status and expiry
      const updatedQuote = {
        ...finalQuote,
        status: 'sent' as const,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        updatedAt: new Date(),
      };

      setQuote(updatedQuote);

      // Generate and download PDF using professional generator
      const pdfGenerated = generateProfessionalQuotePDF({
        quote: updatedQuote,
        companyProfile
      });

      if (!pdfGenerated) {
        // Fallback to basic PDF generator
        generateQuotePDF(updatedQuote, companyProfile);
      }

      // Save quote to Supabase
      const saved = await saveQuote(updatedQuote as Quote);
      
      if (saved) {
        toast({
          title: "Quote Generated Successfully",
          description: `Quote ${updatedQuote.quoteNumber} has been generated, downloaded, and saved to recent quotes.`,
          variant: "success"
        });
        onQuoteGenerated?.(); // Trigger refresh of quotes list
      } else {
        toast({
          title: "Quote Generated",
          description: `Quote ${updatedQuote.quoteNumber} has been generated and downloaded, but could not be saved to recent quotes.`,
          variant: "default"
        });
      }

      // Move to review step if not already there
      if (currentStep < 5) {
        setCurrentStep(5);
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the quote. Please try again.",
        variant: "destructive"
      });
    }
  }, [quote, currentStep]);

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
    updateJobDetails,
    updateSettings,
    addItem,
    updateItem,
    removeItem,
    nextStep,
    prevStep,
    generateQuote,
    resetQuote,
  };
};