import { useState, useCallback, useEffect } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings, JobDetails } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import { useQuoteStorage } from './useQuoteStorage';
import { useCompanyProfile } from './useCompanyProfile';
import { generateSequentialQuoteNumber } from '@/utils/quote-number-generator';
import { supabase } from '@/integrations/supabase/client';

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
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const generateQuote = useCallback(async () => {
    if (isGenerating) return; // Prevent multiple clicks
    
    setIsGenerating(true);
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

      // Validate job details
      if (!finalQuote.jobDetails || !finalQuote.jobDetails.title || !finalQuote.jobDetails.description) {
        console.log('Quote Generation - Job details validation failed', {
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

      console.log('Quote Generation - Starting quote generation', {
        quoteId: finalQuote.id,
        quoteNumber: finalQuote.quoteNumber,
        clientName: finalQuote.client?.name,
        jobDetails: finalQuote.jobDetails,
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

      // Fetch latest company profile before generating PDF
      console.log('PDF Generation - Fetching latest company profile');
      await refetch();
      
      console.log('PDF Generation - Company Profile:', {
        name: companyProfile?.company_name,
        email: companyProfile?.company_email,
        hasLogo: !!companyProfile?.logo_url
      });

      // Generate PDF using PDF Monkey
      try {
        console.log('PDF Generation - Calling PDF Monkey edge function');
        const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { 
            quote: updatedQuote,
            companyProfile 
          }
        });

        if (error) {
          console.error('PDF Generation - Error:', error);
          throw error;
        }

        if (data?.downloadUrl) {
          console.log('PDF Generation - Success, opening PDF');
          window.open(data.downloadUrl, '_blank');
        } else if (data?.documentId) {
          console.log('PDF Generation - Document created but still processing:', data.documentId);
          toast({
            title: "PDF Processing",
            description: "Your PDF is being generated. It will open shortly.",
            variant: "default"
          });
        }
      } catch (pdfError) {
        console.error('PDF Generation - Failed:', pdfError);
        toast({
          title: "PDF Generation Failed",
          description: "Could not generate PDF. The quote has been saved.",
          variant: "destructive"
        });
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
      if (currentStep < 2) {
        console.log('Quote Generation - Moving to review step');
        setCurrentStep(2);
      }

      console.log('Quote Generation - Process completed');
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [quote, currentStep, isGenerating]);

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