import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { draftStorage } from '@/utils/draftStorage';
import { useQuoteBuilder } from '@/hooks/useQuoteBuilder';
import { ClientDetailsStep } from './steps/ClientDetailsStep';
import { JobDetailsStep } from './steps/JobDetailsStep';
import { EnhancedQuoteItemsStep } from './steps/EnhancedQuoteItemsStep';
import { QuoteSettingsStep } from './steps/QuoteSettingsStep';
import { QuoteReviewStep } from './steps/QuoteReviewStep';
import { EmailStatusBanner } from './EmailStatusBanner';
import { FEATURES } from '@/config/features';
import { transformCostOutputToQuoteItems } from '@/utils/cost-to-quote-transformer';
import { useOptionalVoiceFormContext, FormField } from '@/contexts/VoiceFormContext';
import type { Quote, QuoteClient, QuoteItem, JobDetails, QuoteSettings } from '@/types/quote';

/** Section header with gradient line — matches certificate form pattern */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h2>
  </div>
);

interface QuoteWizardProps {
  onQuoteGenerated?: () => void;
  initialQuote?: Partial<Quote>;
  initialCostData?: Record<string, unknown>;
  initialCertificateData?: {
    client: {
      name: string;
      email: string;
      phone: string;
      address: string;
      postcode: string;
    };
    jobDetails: {
      title: string;
      description: string;
      location: string;
    };
    linkedCertificate?: {
      reportId: string;
      certificateType: string;
      certificateReference: string;
      pdfUrl?: string;
      pdfStoragePath?: string;
    };
  };
  initialSiteVisitData?: {
    client: {
      name: string;
      email: string;
      phone: string;
      address: string;
      postcode: string;
    };
    jobDetails: {
      title: string;
      description: string;
      location: string;
    };
    materials?: Array<{
      id: string;
      description: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      unit: string;
    }>;
    siteVisitId?: string;
  } | null;
  initialMaterialsData?: {
    source: string;
    sourceLabel: string;
    materials: Array<{
      id: string;
      description: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      unit: string;
      notes?: string;
    }>;
    client?: {
      name: string;
      email: string;
      phone: string;
      address: string;
      postcode: string;
    };
    jobDetails?: {
      title: string;
      description: string;
      location: string;
    };
  } | null;
}

export const QuoteWizard = ({
  onQuoteGenerated,
  initialQuote,
  initialCostData,
  initialCertificateData,
  initialSiteVisitData,
  initialMaterialsData,
}: QuoteWizardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [recoveredDraft, setRecoveredDraft] = useState<Record<string, unknown> | null>(null);
  const quoteIdRef = useRef<string | null>(null);

  const handleQuoteGenerated = useCallback(() => {
    draftStorage.clearDraft('quote', quoteIdRef.current);
    draftStorage.clearDraft('quote', null);
    if (onQuoteGenerated) onQuoteGenerated();
  }, [onQuoteGenerated]);

  // Check for recoverable draft
  useEffect(() => {
    if (!initialQuote && !initialCostData && !initialCertificateData && !initialSiteVisitData && !initialMaterialsData) {
      const draft = draftStorage.loadDraft('quote', null);
      if (draft && draftStorage.hasRecoverableDraft('quote')) {
        setRecoveredDraft(draft.data);
        setShowRecoveryBanner(true);
      }
    }
  }, []);

  // Merge initial data
  const mergedInitialQuote = initialCertificateData
    ? {
        ...initialQuote,
        client: initialCertificateData.client,
        jobDetails: initialCertificateData.jobDetails,
        ...(initialCertificateData.linkedCertificate && {
          linked_certificate_id: initialCertificateData.linkedCertificate.reportId,
          linked_certificate_type: initialCertificateData.linkedCertificate.certificateType as 'EICR' | 'EIC' | 'Minor Works',
          linked_certificate_reference: initialCertificateData.linkedCertificate.certificateReference,
          linked_certificate_pdf_url: initialCertificateData.linkedCertificate.pdfUrl,
        }),
      }
    : initialSiteVisitData
      ? {
          ...initialQuote,
          client: initialSiteVisitData.client,
          jobDetails: initialSiteVisitData.jobDetails,
          items: initialSiteVisitData.materials || [],
        }
      : initialMaterialsData
        ? {
            ...initialQuote,
            ...(initialMaterialsData.client && { client: initialMaterialsData.client }),
            ...(initialMaterialsData.jobDetails && { jobDetails: initialMaterialsData.jobDetails }),
            items: initialMaterialsData.materials.map((m) => ({ ...m, category: m.category as 'materials' })),
          }
        : initialQuote;

  const {
    quote,
    priceAdjustment,
    setPriceAdjustment,
    calculateAdjustedPrice,
    updateClient,
    updateJobDetails,
    updateSettings,
    addItem,
    updateItem,
    removeItem,
    generateQuote,
    resetQuote,
    isGenerating,
    cloudSaveStatus,
  } = useQuoteBuilder(handleQuoteGenerated, mergedInitialQuote);

  useEffect(() => {
    quoteIdRef.current = quote.id || null;
  }, [quote.id]);

  const voiceForm = useOptionalVoiceFormContext();

  // Cloud auto-save is handled by useQuoteBuilder — also keep localStorage as fallback
  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (quote.client?.name || quote.jobDetails?.title || (quote.items && quote.items.length > 0)) {
        draftStorage.saveDraft('quote', quote.id || null, {
          client: quote.client,
          jobDetails: quote.jobDetails,
          items: quote.items,
          settings: quote.settings,
        });
      }
    }, 15000); // localStorage every 15s as fallback (cloud saves every 10s)
    return () => clearInterval(saveTimer);
  }, [quote]);

  // Draft recovery
  const handleRecoverDraft = useCallback(() => {
    if (recoveredDraft) {
      if (recoveredDraft.client) updateClient(recoveredDraft.client as QuoteClient);
      if (recoveredDraft.jobDetails) updateJobDetails(recoveredDraft.jobDetails as JobDetails);
      if (recoveredDraft.items) (recoveredDraft.items as QuoteItem[]).forEach((item) => addItem(item));
      if (recoveredDraft.settings) updateSettings(recoveredDraft.settings as QuoteSettings);
      setShowRecoveryBanner(false);
      setRecoveredDraft(null);
    }
  }, [recoveredDraft, updateClient, updateJobDetails, addItem, updateSettings]);

  const handleDiscardDraft = useCallback(() => {
    draftStorage.clearDraft('quote', null);
    setShowRecoveryBanner(false);
    setRecoveredDraft(null);
  }, []);

  // Voice form
  const handleVoiceFillField = useCallback(
    (fieldName: string, value: string) => {
      const field = fieldName.toLowerCase();
      if (field.includes('name') || field === 'client') updateClient({ ...quote.client, name: value });
      else if (field.includes('email')) updateClient({ ...quote.client, email: value });
      else if (field.includes('phone')) updateClient({ ...quote.client, phone: value });
      else if (field.includes('address')) updateClient({ ...quote.client, address: value });
      else if (field.includes('postcode')) updateClient({ ...quote.client, postcode: value });
      else if (field.includes('title') || field === 'job') updateJobDetails({ ...quote.jobDetails, title: value });
      else if (field.includes('description')) updateJobDetails({ ...quote.jobDetails, description: value });
      else if (field.includes('vat') && field.includes('rate')) updateSettings({ ...quote.settings, vatRate: parseFloat(value) || 20 });
    },
    [quote, updateClient, updateJobDetails, updateSettings]
  );

  const handleVoiceAction = useCallback(
    (action: string, params: Record<string, unknown>) => {
      switch (action) {
        case 'add_labour_item':
          addItem({ id: crypto.randomUUID(), description: (params.description as string) || 'Labour', category: 'labour', quantity: (params.hours as number) || 1, unitPrice: (params.rate as number) || 50, totalPrice: ((params.hours as number) || 1) * ((params.rate as number) || 50), unit: 'hours' });
          return true;
        case 'add_material_item':
          addItem({ id: crypto.randomUUID(), description: (params.description as string) || 'Materials', category: 'materials', quantity: (params.quantity as number) || 1, unitPrice: (params.unitPrice as number) || 10, totalPrice: ((params.quantity as number) || 1) * ((params.unitPrice as number) || 10), unit: 'each' });
          return true;
        case 'remove_last_item':
          if (quote.items && quote.items.length > 0) { removeItem(quote.items[quote.items.length - 1].id); return true; }
          return false;
        default:
          return false;
      }
    },
    [addItem, removeItem, quote.items]
  );

  // Register voice form
  useEffect(() => {
    if (!voiceForm) return;
    const allFields: FormField[] = [
      { name: 'client_name', label: 'Client Name', type: 'text', required: true, currentValue: quote.client?.name },
      { name: 'client_email', label: 'Email', type: 'email', required: false, currentValue: quote.client?.email },
      { name: 'client_phone', label: 'Phone', type: 'tel', required: false, currentValue: quote.client?.phone },
      { name: 'job_title', label: 'Job Title', type: 'text', required: true, currentValue: quote.jobDetails?.title },
      { name: 'job_description', label: 'Description', type: 'textarea', required: true, currentValue: quote.jobDetails?.description },
    ];
    voiceForm.registerForm({
      formId: 'quote-form',
      formName: 'Quote Builder',
      fields: allFields,
      actions: ['add_labour_item', 'add_material_item', 'remove_last_item'],
      onFillField: handleVoiceFillField,
      onAction: handleVoiceAction,
      onSubmit: generateQuote,
      onClear: resetQuote,
      onCancel: () => window.history.back(),
    });
    return () => { voiceForm.unregisterForm('quote-form'); };
  }, [voiceForm, quote, handleVoiceFillField, handleVoiceAction, generateQuote, resetQuote]);

  // Import cost data
  useEffect(() => {
    if (initialCostData && initialCostData.materials) {
      const items = transformCostOutputToQuoteItems(initialCostData);
      items.forEach((item) => addItem(item));
    }
  }, [initialCostData]);

  const canSave = !!quote.client?.name;

  return (
    <div ref={contentRef} className="space-y-8 pb-32 px-3 sm:px-4 lg:px-6">
      {/* Recovery Banner */}
      {showRecoveryBanner && recoveredDraft && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
          <div>
            <p className="text-[13px] font-semibold text-amber-400">Recover unsaved quote?</p>
            <p className="text-[11px] text-white">
              {(recoveredDraft.client as QuoteClient | undefined)?.name
                ? `Draft for ${(recoveredDraft.client as QuoteClient).name}`
                : 'You have an unsaved draft'}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 ml-3">
            <button onClick={handleDiscardDraft} className="text-[12px] text-white font-medium touch-manipulation">Discard</button>
            <button onClick={handleRecoverDraft} className="text-[12px] text-amber-400 font-bold touch-manipulation">Recover</button>
          </div>
        </div>
      )}

      {FEATURES.EMAIL_INTEGRATION_ENABLED && <EmailStatusBanner />}

      {/* Cloud save status */}
      <div className="flex justify-end -mb-4">
        <span className="text-[11px] text-white">
          {cloudSaveStatus === 'saving' && 'Saving...'}
          {cloudSaveStatus === 'saved' && 'Saved to cloud'}
          {cloudSaveStatus === 'error' && 'Save failed — retrying'}
        </span>
      </div>

      {/* === ALL SECTIONS ON ONE PAGE === */}

      {/* 1. Client Details */}
      <section>
        <ClientDetailsStep client={quote.client} onUpdate={updateClient} quoteId={quote.id} />
      </section>

      {/* 2. Job Details */}
      <section>
        <SectionHeader title="Job Details" />
        <JobDetailsStep jobDetails={quote.jobDetails} onUpdate={updateJobDetails} />
      </section>

      {/* 3. Quote Items */}
      <section>
        <SectionHeader title="Quote Items" />
        <EnhancedQuoteItemsStep
          items={quote.items || []}
          onAdd={addItem}
          onUpdate={updateItem}
          onRemove={removeItem}
          priceAdjustment={priceAdjustment}
          setPriceAdjustment={setPriceAdjustment}
          calculateAdjustedPrice={calculateAdjustedPrice}
        />
      </section>

      {/* 4. Settings & Pricing */}
      <section>
        <SectionHeader title="Settings" />
        <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />
      </section>

      {/* 5. Review */}
      <section>
        <SectionHeader title="Quote Summary" />
        <QuoteReviewStep quote={quote} />
      </section>

      {/* Sticky footer — live total + save */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-white/[0.06] lg:left-64">
        <div className="max-w-3xl mx-auto">
          {/* Live total bar */}
          {(quote.items?.length ?? 0) > 0 && (
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-white">{quote.items?.length} item{(quote.items?.length ?? 0) !== 1 ? 's' : ''}</span>
                {quote.settings?.vatRegistered && (
                  <span className="text-[11px] text-white">inc. VAT</span>
                )}
              </div>
              <span className="text-[22px] font-bold text-elec-yellow">
                £{(quote.total || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
          {/* Save button */}
          <div className="px-4 pb-4 pt-2">
            <Button
              onClick={generateQuote}
              disabled={isGenerating || !canSave}
              className="w-full h-[52px] bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-[15px] rounded-xl touch-manipulation active:scale-[0.98] shadow-lg shadow-elec-yellow/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Save Quote'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
