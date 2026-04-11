import { useState, useCallback, useEffect, useRef, createElement } from 'react';
import { Quote, QuoteItem, QuoteClient, QuoteSettings, JobDetails } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useQuoteStorage } from './useQuoteStorage';
import { useCompanyProfile } from './useCompanyProfile';
import { generateSequentialQuoteNumber } from '@/utils/quote-number-generator';
import { supabase } from '@/integrations/supabase/client';
import { logger, generateRequestId } from '@/utils/logger';
import { openOrDownloadPdf } from '@/utils/pdf-download';

export const useQuoteBuilder = (onQuoteGenerated?: () => void, initialQuote?: Quote) => {
  const { saveQuote } = useQuoteStorage();
  const { companyProfile } = useCompanyProfile();

  const [quote, setQuote] = useState<Partial<Quote>>(
    initialQuote || {
      id: uuidv4(),
      quoteNumber: '', // Will be generated when needed
      items: [],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [priceAdjustment, setPriceAdjustment] = useState(0); // Percentage adjustment (0-20)
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate quote number when quote is first created
  useEffect(() => {
    const initializeQuoteNumber = async () => {
      if (!quote.quoteNumber) {
        try {
          const newQuoteNumber = await generateSequentialQuoteNumber();
          setQuote((prev) => ({ ...prev, quoteNumber: newQuoteNumber }));
        } catch (error) {
          console.warn('Failed to generate sequential quote number, using fallback');
          setQuote((prev) => ({
            ...prev,
            quoteNumber: `${new Date().getFullYear()}/T${Date.now().toString().slice(-6)}`,
          }));
        }
      }
    };

    initializeQuoteNumber();
  }, [quote.quoteNumber]);

  const updateClient = useCallback((client: QuoteClient) => {
    setQuote((prev) => ({ ...prev, client, updatedAt: new Date() }));
  }, []);

  const updateJobDetails = useCallback((jobDetails: JobDetails) => {
    setQuote((prev) => ({ ...prev, jobDetails, updatedAt: new Date() }));
  }, []);

  const updateSettings = useCallback((settings: QuoteSettings) => {
    setQuote((prev) => ({ ...prev, settings, updatedAt: new Date() }));
  }, []);

  const addItem = useCallback((item: Omit<QuoteItem, 'id' | 'totalPrice'>) => {
    const newItem: QuoteItem = {
      ...item,
      id: uuidv4(),
      totalPrice: item.quantity * item.unitPrice,
    };

    setQuote((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem],
      updatedAt: new Date(),
    }));
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<QuoteItem>) => {
    setQuote((prev) => ({
      ...prev,
      items: prev.items?.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updates,
              totalPrice:
                (updates.quantity ?? item.quantity) * (updates.unitPrice ?? item.unitPrice),
            }
          : item
      ),
      updatedAt: new Date(),
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setQuote((prev) => ({
      ...prev,
      items: prev.items?.filter((item) => item.id !== itemId),
      updatedAt: new Date(),
    }));
  }, []);

  const calculateTotals = useCallback(() => {
    const items = quote.items || [];
    const settings = quote.settings;

    // Always use raw items in state — grouping is only for PDF/display, not for state management
    // This ensures removeItem/updateItem always work on real item IDs
    const subtotal = items.reduce((sum, item) => {
      const price = typeof item.totalPrice === 'number' ? item.totalPrice : (item.quantity || 0) * (item.unitPrice || 0);
      return sum + price;
    }, 0);

    // Discount/deduction — only if settings configured
    const discountAmount = settings?.discountEnabled
      ? settings.discountType === 'percentage'
        ? subtotal * ((settings.discountValue || 0) / 100)
        : Math.min(settings.discountValue || 0, subtotal)
      : 0;
    const netAfterDiscount = subtotal - discountAmount;

    // VAT applies AFTER discount (CIS-correct: HMRC says VAT on net amount)
    const vatRate = settings?.vatRate ?? 20;
    const vatAmount = settings?.vatRegistered
      ? netAfterDiscount * (vatRate / 100)
      : 0;
    const total = netAfterDiscount + vatAmount;

    return {
      ...quote,
      items,
      subtotal,
      overhead: 0,
      profit: 0,
      discountAmount,
      vatAmount,
      total,
    };
  }, [quote]);

  // Cloud auto-save — upserts draft to Supabase every 10s when data changes
  const lastSavedRef = useRef<string>('');
  const isPersistingDraftRef = useRef(false);
  const [cloudSaveStatus, setCloudSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const getDraftSnapshot = useCallback(
    () =>
      JSON.stringify({
        client: quote.client,
        jobDetails: quote.jobDetails,
        items: quote.items,
        settings: quote.settings,
      }),
    [quote.client, quote.jobDetails, quote.items, quote.settings]
  );

  const persistDraft = useCallback(async () => {
    if (!quote.client?.name && (!quote.items || quote.items.length === 0)) {
      return false;
    }

    const snapshot = getDraftSnapshot();
    if (snapshot === lastSavedRef.current || isPersistingDraftRef.current) {
      return false;
    }

    try {
      isPersistingDraftRef.current = true;
      setCloudSaveStatus('saving');

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const finalQuote = calculateTotals();
      const dbData: Record<string, unknown> = {
        id: quote.id,
        user_id: user.id,
        quote_number: quote.quoteNumber || null,
        client_data: quote.client || {},
        job_details: quote.jobDetails || {},
        items: quote.items || [],
        settings: quote.settings || { vatRate: 20, vatRegistered: false },
        subtotal: finalQuote.subtotal || 0,
        overhead: 0,
        profit: 0,
        discount_amount: finalQuote.discountAmount || 0,
        vat_amount: finalQuote.vatAmount || 0,
        total: finalQuote.total || 0,
        status: 'draft',
        notes: quote.notes || null,
        updated_at: new Date().toISOString(),
      };

      if (!lastSavedRef.current) {
        dbData.created_at = new Date().toISOString();
        dbData.expiry_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      const { error } = await supabase.from('quotes').upsert(dbData, { onConflict: 'id' });
      if (error) throw error;

      lastSavedRef.current = snapshot;
      setCloudSaveStatus('saved');
      return true;
    } catch (err) {
      console.warn('[QuoteBuilder] Cloud auto-save failed:', err);
      setCloudSaveStatus('error');
      return false;
    } finally {
      isPersistingDraftRef.current = false;
    }
  }, [calculateTotals, getDraftSnapshot, quote]);

  useEffect(() => {
    if (!quote.client?.name && (!quote.items || quote.items.length === 0)) return;

    const timer = window.setInterval(() => {
      void persistDraft();
    }, 10000);

    return () => window.clearInterval(timer);
  }, [persistDraft, quote.client?.name, quote.items]);

  // Best-effort persistence when the page is backgrounded or closed.
  useEffect(() => {
    const handlePageHide = () => {
      void persistDraft();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void persistDraft();
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [persistDraft]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));

    // Scroll to the Card content, not the page top
    const cardElement = document.querySelector('[data-quote-step="content"]');
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));

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
    logger
      .api('quotes/generate', requestId)
      .start({ quoteId: quote.id, quoteNumber: quote.quoteNumber });
    logger.action('Generate quote', 'quotes', { quoteId: quote.id });

    setIsGenerating(true);
    let pdfDownloadUrl: string | null = null;
    let pdfQuoteNumber: string = '';
    try {
      const finalQuote = calculateTotals();

      // Validate quote before generation — only require client name and at least one item
      if (!finalQuote.client?.name) {
        toast({ title: 'Missing Client', description: 'Please enter a client name.', variant: 'destructive' });
        return;
      }
      if (!finalQuote.items || finalQuote.items.length === 0) {
        toast({ title: 'No Items', description: 'Please add at least one item to the quote.', variant: 'destructive' });
        return;
      }

      logger.info('Quote generation started', {
        requestId,
        quoteId: finalQuote.id,
        quoteNumber: finalQuote.quoteNumber,
        clientName: finalQuote.client?.name,
        itemCount: finalQuote.items?.length,
        total: finalQuote.total,
      });

      // Update quote with expiry - keep as draft until explicitly sent
      const updatedQuote = {
        ...finalQuote,
        status: 'draft' as const,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        updatedAt: new Date(),
      };

      setQuote(updatedQuote);

      // Fetch FRESH company profile directly - don't rely on React state which has stale closure
      const {
        data: { user },
      } = await supabase.auth.getUser();
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

      // Generate PDF using PDF Monkey
      try {
        logger.api('generate-pdf-monkey', requestId).start({ quoteId: updatedQuote.id });

        const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: {
            quote: updatedQuote,
            companyProfile: freshCompanyProfile,
          },
        });

        if (error) {
          logger.api('generate-pdf-monkey', requestId).error(error, { quoteId: updatedQuote.id });
          throw error;
        }

        if (data?.downloadUrl) {
          logger.api('generate-pdf-monkey', requestId).success({ documentId: data.documentId });
          // Store URL for the success toast action — don't auto-download (ELE-260)
          pdfDownloadUrl = data.downloadUrl;
          pdfQuoteNumber = updatedQuote.quoteNumber || updatedQuote.id;
        } else if (data?.documentId) {
          logger.info('PDF still processing', { documentId: data.documentId });
          toast({
            title: 'PDF Processing',
            description: 'Your PDF is being generated. It will open shortly.',
            variant: 'default',
          });
        }
      } catch (pdfError) {
        logger.error('PDF generation failed', pdfError, { quoteId: updatedQuote.id, requestId });
        toast({
          title: 'PDF Generation Failed',
          description: 'Could not generate PDF. The quote has been saved.',
          variant: 'destructive',
        });
      }

      // Save quote to Supabase
      logger.api('quotes/save', requestId).start({ quoteId: updatedQuote.id });
      const saved = await saveQuote(updatedQuote as Quote);

      if (saved) {
        logger.api('quotes/save', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
        const url = pdfDownloadUrl;
        const num = pdfQuoteNumber;
        toast({
          title: 'Quote Generated Successfully',
          description: `Quote ${updatedQuote.quoteNumber} has been generated and saved.`,
          variant: 'success',
          ...(url
            ? {
                action: createElement(
                  ToastAction,
                  {
                    altText: 'Download PDF',
                    className: 'touch-manipulation',
                    onClick: () => openOrDownloadPdf(url, `Quote-${num}.pdf`),
                  },
                  'Download PDF'
                ),
              }
            : {}),
        });
      } else {
        logger.warn('Quote save failed', {
          quoteId: updatedQuote.id,
          quoteNumber: updatedQuote.quoteNumber,
        });
        toast({
          title: 'Quote Generated',
          description: `Quote ${updatedQuote.quoteNumber} has been generated but could not be saved. Please try again from the quotes page.`,
          variant: 'destructive',
        });
      }

      // Always navigate away after generation — don't leave user stuck in the builder
      if (onQuoteGenerated) {
        logger.api('quotes/generate', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
        onQuoteGenerated();
        return;
      }

      logger.api('quotes/generate', requestId).success({ quoteNumber: updatedQuote.quoteNumber });
    } catch (error) {
      logger.api('quotes/generate', requestId).error(error, { quoteId: quote.id });
      toast({
        title: 'Generation Failed',
        description: 'There was an error generating the quote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [quote, isGenerating, onQuoteGenerated, saveQuote, companyProfile, calculateTotals]);

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
  const calculateAdjustedPrice = useCallback(
    (basePrice: number) => {
      return basePrice * (1 + priceAdjustment / 100);
    },
    [priceAdjustment]
  );

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
    cloudSaveStatus,
  };
};
