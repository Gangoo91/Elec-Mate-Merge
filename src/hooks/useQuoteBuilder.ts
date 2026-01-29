import { useState, useCallback, useEffect } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings, JobDetails } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import { useQuoteStorage } from './useQuoteStorage';
import { useCompanyProfile } from './useCompanyProfile';
import { generateSequentialQuoteNumber } from '@/utils/quote-number-generator';
import { supabase } from '@/integrations/supabase/client';
import { logger, generateRequestId } from '@/utils/logger';

export const useQuoteBuilder = (onQuoteGenerated?: () => void, initialQuote?: Quote) => {
  const { saveQuote } = useQuoteStorage();
  const { companyProfile, refetch } = useCompanyProfile();
  
  const [quote, setQuote] = useState<Partial<Quote>>(initialQuote || {
    id: uuidv4(),
    quoteNumber: '', // Will be generated when needed
    items: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [priceAdjustment, setPriceAdjustment] = useState(0); // Percentage adjustment (0-20)
  const [isGenerating, setIsGenerating] = useState(false);

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

  const processItemsForDisplay = useCallback((items: QuoteItem[], settings: QuoteSettings): QuoteItem[] => {
    if (!settings.showMaterialsBreakdown) {
      // Group all materials into one line
      const materialsItems = items.filter(item => item.category === 'materials');
      const nonMaterialsItems = items.filter(item => item.category !== 'materials');
      
      if (materialsItems.length > 0) {
        const totalMaterialsCost = materialsItems.reduce((sum, item) => sum + item.totalPrice, 0);
        
        const groupedMaterial: QuoteItem = {
          id: 'materials-grouped',
          description: 'Materials & Supplies',
          quantity: 1,
          unit: 'lot',
          unitPrice: totalMaterialsCost,
          totalPrice: totalMaterialsCost,
          category: 'materials',
          notes: `Includes ${materialsItems.length} items`
        };
        
        return [...nonMaterialsItems, groupedMaterial];
      }
    }
    
    return items; // Return as-is if breakdown enabled
  }, []);

  const calculateTotals = useCallback(() => {
    if (!quote.items || !quote.settings) return quote;

    // Process items based on materials breakdown setting
    const displayItems = processItemsForDisplay(quote.items, quote.settings);

    // Calculate subtotal - profit and overhead are now built into unit prices
    const subtotal = displayItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Calculate VAT on the subtotal (which already includes profit and overhead)
    const vatAmount = quote.settings.vatRegistered ? subtotal * (quote.settings.vatRate / 100) : 0;
    const total = subtotal + vatAmount;

    return {
      ...quote,
      items: displayItems,
      subtotal,
      overhead: 0, // No longer calculated separately
      profit: 0,   // No longer calculated separately
      vatAmount,
      total,
    };
  }, [quote, processItemsForDisplay]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
    
    // Scroll to the Card content, not the page top
    const cardElement = document.querySelector('[data-quote-step="content"]');
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    
    // Scroll to the Card content, not the page top
    const cardElement = document.querySelector('[data-quote-step="content"]');
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const generateQuote = useCallback(async () => {
    if (isGenerating) return; // Prevent multiple clicks

    const requestId = generateRequestId();
    logger.api('quotes/generate', requestId).start({ quoteId: quote.id, quoteNumber: quote.quoteNumber });
    logger.action('Generate quote', 'quotes', { quoteId: quote.id });

    setIsGenerating(true);
    try {
      const finalQuote = calculateTotals();

      // Validate quote before generation
      if (!finalQuote.client || !finalQuote.items || finalQuote.items.length === 0 || !finalQuote.settings) {
        logger.warn('Quote validation failed', {
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

      // Validate job details
      if (!finalQuote.jobDetails || !finalQuote.jobDetails.title || !finalQuote.jobDetails.description) {
        logger.warn('Quote job details validation failed', {
          hasJobDetails: !!finalQuote.jobDetails,
          hasTitle: !!finalQuote.jobDetails?.title,
          hasDescription: !!finalQuote.jobDetails?.description
        });
        toast({
          title: "Missing Job Details",
          description: "Please complete the Job Title and Job Description in the Job Details step.",
          variant: "destructive"
        });
        return;
      }

      logger.info('Quote generation started', {
        requestId,
        quoteId: finalQuote.id,
        quoteNumber: finalQuote.quoteNumber,
        clientName: finalQuote.client?.name,
        itemCount: finalQuote.items?.length,
        total: finalQuote.total
      });

      // Update quote with expiry - keep as draft until explicitly sent
      const updatedQuote = {
        ...finalQuote,
        status: 'draft' as const,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        updatedAt: new Date(),
      };

      console.log('Quote Generation - Quote updated with draft status', {
        id: updatedQuote.id,
        status: updatedQuote.status,
        expiryDate: updatedQuote.expiryDate
      });

      setQuote(updatedQuote);

      // Fetch FRESH company profile directly - don't rely on React state which has stale closure
      console.log('PDF Generation - Fetching fresh company profile from database');
      const { data: { user } } = await supabase.auth.getUser();
      let freshCompanyProfile = companyProfile;

      if (user) {
        const { data: cpData } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (cpData) {
          freshCompanyProfile = cpData;
        }
      }

      console.log('PDF Generation - Fresh Company Profile:', {
        name: freshCompanyProfile?.company_name,
        email: freshCompanyProfile?.company_email,
        hasLogo: !!freshCompanyProfile?.logo_url,
        logoUrl: freshCompanyProfile?.logo_url?.substring(0, 50) + '...'
      });

      // Generate PDF using PDF Monkey
      try {
        logger.api('generate-pdf-monkey', requestId).start({ quoteId: updatedQuote.id });

        console.log('PDF Generation - Sending to edge function:', {
          quoteId: updatedQuote.id,
          quoteNumber: updatedQuote.quoteNumber,
          itemsCount: updatedQuote.items?.length,
          hasClient: !!updatedQuote.client?.name,
          hasJobDetails: !!updatedQuote.jobDetails?.title,
          total: updatedQuote.total
        });

        const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: {
            quote: updatedQuote,
            companyProfile: freshCompanyProfile
          }
        });

        if (error) {
          logger.api('generate-pdf-monkey', requestId).error(error, { quoteId: updatedQuote.id });
          throw error;
        }

        if (data?.downloadUrl) {
          logger.api('generate-pdf-monkey', requestId).success({ documentId: data.documentId });
          window.open(data.downloadUrl, '_blank');
        } else if (data?.documentId) {
          logger.info('PDF still processing', { documentId: data.documentId });
          toast({
            title: "PDF Processing",
            description: "Your PDF is being generated. It will open shortly.",
            variant: "default"
          });
        }
      } catch (pdfError) {
        logger.error('PDF generation failed', pdfError, { quoteId: updatedQuote.id, requestId });
        toast({
          title: "PDF Generation Failed",
          description: "Could not generate PDF. The quote has been saved.",
          variant: "destructive"
        });
      }

      // Save quote to Supabase
      logger.api('quotes/save', requestId).start({ quoteId: updatedQuote.id });
      const saved = await saveQuote(updatedQuote as Quote);

      if (saved) {
        logger.api('quotes/save', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
        toast({
          title: "Quote Generated Successfully",
          description: `Quote ${updatedQuote.quoteNumber} has been generated, downloaded, and saved to recent quotes.`,
          variant: "success"
        });

        // If callback provided (e.g., for navigation), call it and return early
        // This prevents state updates on a component that's about to unmount
        if (onQuoteGenerated) {
          logger.api('quotes/generate', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
          onQuoteGenerated();
          return;
        }
      } else {
        logger.warn('Quote save failed', { quoteId: updatedQuote.id, quoteNumber: updatedQuote.quoteNumber });
        toast({
          title: "Quote Generated",
          description: `Quote ${updatedQuote.quoteNumber} has been generated and downloaded, but could not be saved to recent quotes.`,
          variant: "default"
        });
      }

      // Only update step and scroll if we're staying on this page (no callback)
      // Move to review step if not already there
      if (currentStep < 2) {
        setCurrentStep(2);
      }

      // Scroll to the Card content
      const cardElement = document.querySelector('[data-quote-step="content"]');
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      logger.api('quotes/generate', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
    } catch (error) {
      logger.api('quotes/generate', requestId).error(error, { quoteId: quote.id });
      toast({
        title: "Generation Failed",
        description: "There was an error generating the quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [quote, currentStep, isGenerating, onQuoteGenerated, saveQuote, companyProfile, calculateTotals]);

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

  // Price adjustment helper
  const calculateAdjustedPrice = useCallback((basePrice: number) => {
    return basePrice * (1 + priceAdjustment / 100);
  }, [priceAdjustment]);

  return {
    quote: calculateTotals(),
    currentStep,
    priceAdjustment,
    setPriceAdjustment,
    calculateAdjustedPrice,
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
    isGenerating,
    processItemsForDisplay,
  };
};