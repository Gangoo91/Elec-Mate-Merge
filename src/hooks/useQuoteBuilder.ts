import { useState, useCallback, useEffect } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings, JobDetails } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';
import { generateQuotePDF } from '@/components/electrician/quote-builder/QuotePDFGenerator';
import { generateProfessionalQuotePDF } from '@/utils/quote-pdf-professional';
import { toast } from '@/hooks/use-toast';
import { useQuoteStorage } from './useQuoteStorage';
import { useCompanyProfile } from './useCompanyProfile';
import { generateSequentialQuoteNumber } from '@/utils/quote-number-generator';

export const useQuoteBuilder = (onQuoteGenerated?: () => void) => {
  const { saveQuote } = useQuoteStorage();
  const { companyProfile } = useCompanyProfile();
  
  const [quote, setQuote] = useState<Partial<Quote>>({
    id: uuidv4(),
    quoteNumber: '', // Will be generated when needed
    items: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Generate quote number when quote is first created
  useEffect(() => {
    const initializeQuoteNumber = async () => {
      if (!quote.quoteNumber) {
        try {
          const newQuoteNumber = await generateSequentialQuoteNumber();
          setQuote(prev => ({ ...prev, quoteNumber: newQuoteNumber }));
        } catch (error) {
          console.warn('Failed to generate sequential quote number, using fallback');
          setQuote(prev => ({ ...prev, quoteNumber: `${new Date().getFullYear()}/T${Date.now().toString().slice(-6)}` }));
        }
      }
    };

    initializeQuoteNumber();
  }, [quote.quoteNumber]);

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
        console.log('Quote Generation - Validation failed', {
          hasClient: !!finalQuote.client,
          hasJobDetails: !!finalQuote.jobDetails,
          itemCount: finalQuote.items?.length || 0,
          hasSettings: !!finalQuote.settings
        });
        toast({
          title: "Cannot Generate Quote",
          description: "Please complete all required fields before generating the quote.",
          variant: "destructive"
        });
        return;
      }

      console.log('Quote Generation - Starting quote generation', {
        quoteId: finalQuote.id,
        quoteNumber: finalQuote.quoteNumber,
        clientName: finalQuote.client?.name,
        itemCount: finalQuote.items?.length,
        total: finalQuote.total,
        status: finalQuote.status
      });

      // Update quote status and expiry
      const updatedQuote = {
        ...finalQuote,
        status: 'sent' as const,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        updatedAt: new Date(),
      };

      console.log('Quote Generation - Quote updated with sent status', {
        id: updatedQuote.id,
        status: updatedQuote.status,
        expiryDate: updatedQuote.expiryDate
      });

      setQuote(updatedQuote);

      // Generate and download PDF using professional generator
      let pdfGenerated = false;
      try {
        console.log('PDF Generation - Starting PDF generation');
        pdfGenerated = generateProfessionalQuotePDF({
          quote: updatedQuote,
          companyProfile
        });
        console.log('PDF Generation - Professional PDF result:', pdfGenerated);
      } catch (pdfError) {
        console.error('PDF Generation - Error with professional generator:', pdfError);
      }

      if (!pdfGenerated) {
        try {
          console.log('PDF Generation - Falling back to basic generator');
          generateQuotePDF(updatedQuote, companyProfile);
          console.log('PDF Generation - Basic generator completed');
        } catch (fallbackError) {
          console.error('PDF Generation - Fallback generator also failed:', fallbackError);
        }
      }

      // Save quote to Supabase
      console.log('Quote Storage - Attempting to save quote to database');
      const saved = await saveQuote(updatedQuote as Quote);
      
      if (saved) {
        console.log('Quote Storage - Quote saved successfully, notifying user');
        toast({
          title: "Quote Generated Successfully",
          description: `Quote ${updatedQuote.quoteNumber} has been generated, downloaded, and saved to recent quotes.`,
          variant: "success"
        });
        console.log('Quote Storage - Calling onQuoteGenerated callback');
        onQuoteGenerated?.(); // Trigger refresh of quotes list
      } else {
        console.log('Quote Storage - Quote generation completed but save failed');
        toast({
          title: "Quote Generated",
          description: `Quote ${updatedQuote.quoteNumber} has been generated and downloaded, but could not be saved to recent quotes.`,
          variant: "default"
        });
      }

      // Move to review step if not already there
      if (currentStep < 5) {
        console.log('Quote Generation - Moving to review step');
        setCurrentStep(5);
      }

      console.log('Quote Generation - Process completed');
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the quote. Please try again.",
        variant: "destructive"
      });
    }
  }, [quote, currentStep]);

  const resetQuote = useCallback(async () => {
    try {
      const newQuoteNumber = await generateSequentialQuoteNumber();
      setQuote({
        id: uuidv4(),
        quoteNumber: newQuoteNumber,
        items: [],
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.warn('Failed to generate sequential quote number for reset, using fallback');
      setQuote({
        id: uuidv4(),
        quoteNumber: `${new Date().getFullYear()}/T${Date.now().toString().slice(-6)}`,
        items: [],
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
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