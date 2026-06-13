import React, { useEffect, useCallback, useRef, useState, useMemo, Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Check, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { draftStorage } from '@/utils/draftStorage';
import { useQuoteBuilder } from '@/hooks/useQuoteBuilder';
import { useInventoryStorage } from '@/hooks/useInventoryStorage';
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

const STEPS = [
  {
    key: 'client',
    label: 'Client',
    title: 'Who’s the quote for?',
    sub: 'Pick an existing client or add new details',
  },
  {
    key: 'job',
    label: 'Job',
    title: 'What’s the job?',
    sub: 'A clear title and description — your client sees this',
  },
  {
    key: 'items',
    label: 'Items',
    title: 'Build the price',
    sub: 'Add labour, materials and equipment',
  },
  {
    key: 'settings',
    label: 'Settings',
    title: 'Money settings',
    sub: 'VAT, CIS, discounts and presentation',
  },
  {
    key: 'review',
    label: 'Review',
    title: 'Check and save',
    sub: 'Everything your client will see',
  },
] as const;

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
  const [step, setStep] = useState(0);

  const handleQuoteGenerated = useCallback(() => {
    draftStorage.clearDraft('quote', quoteIdRef.current);
    draftStorage.clearDraft('quote', null);
    if (onQuoteGenerated) onQuoteGenerated();
  }, [onQuoteGenerated]);

  // Check for recoverable draft
  useEffect(() => {
    if (
      !initialQuote &&
      !initialCostData &&
      !initialCertificateData &&
      !initialSiteVisitData &&
      !initialMaterialsData
    ) {
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
          linked_certificate_type: initialCertificateData.linkedCertificate.certificateType as
            | 'EICR'
            | 'EIC'
            | 'Minor Works',
          linked_certificate_reference:
            initialCertificateData.linkedCertificate.certificateReference,
          linked_certificate_pdf_url: initialCertificateData.linkedCertificate.pdfUrl,
        }),
      }
    : initialSiteVisitData
      ? {
          ...initialQuote,
          client: initialSiteVisitData.client,
          jobDetails: initialSiteVisitData.jobDetails,
          items: initialSiteVisitData.materials || [],
          // Traceability: which site visit produced this quote
          ...(initialSiteVisitData.siteVisitId && {
            site_visit_id: initialSiteVisitData.siteVisitId,
          }),
        }
      : initialMaterialsData
        ? {
            ...initialQuote,
            ...(initialMaterialsData.client && { client: initialMaterialsData.client }),
            ...(initialMaterialsData.jobDetails && { jobDetails: initialMaterialsData.jobDetails }),
            items: initialMaterialsData.materials.map((m) => ({
              ...m,
              category: m.category as 'materials',
            })),
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
      if (
        quote.client?.name ||
        quote.jobDetails?.title ||
        (quote.items && quote.items.length > 0)
      ) {
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
      if (recoveredDraft.items)
        (recoveredDraft.items as QuoteItem[]).forEach((item) => addItem(item));
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
      if (field.includes('name') || field === 'client')
        updateClient({ ...quote.client, name: value });
      else if (field.includes('email')) updateClient({ ...quote.client, email: value });
      else if (field.includes('phone')) updateClient({ ...quote.client, phone: value });
      else if (field.includes('address')) updateClient({ ...quote.client, address: value });
      else if (field.includes('postcode')) updateClient({ ...quote.client, postcode: value });
      else if (field.includes('title') || field === 'job')
        updateJobDetails({ ...quote.jobDetails, title: value });
      else if (field.includes('description'))
        updateJobDetails({ ...quote.jobDetails, description: value });
      else if (field.includes('vat') && field.includes('rate'))
        updateSettings({ ...quote.settings, vatRate: parseFloat(value) || 20 });
    },
    [quote, updateClient, updateJobDetails, updateSettings]
  );

  const handleVoiceAction = useCallback(
    (action: string, params: Record<string, unknown>) => {
      switch (action) {
        case 'add_labour_item':
          addItem({
            id: crypto.randomUUID(),
            description: (params.description as string) || 'Labour',
            category: 'labour',
            quantity: (params.hours as number) || 1,
            unitPrice: (params.rate as number) || 50,
            totalPrice: ((params.hours as number) || 1) * ((params.rate as number) || 50),
            unit: 'hours',
          });
          return true;
        case 'add_material_item':
          addItem({
            id: crypto.randomUUID(),
            description: (params.description as string) || 'Materials',
            category: 'materials',
            quantity: (params.quantity as number) || 1,
            unitPrice: (params.unitPrice as number) || 10,
            totalPrice: ((params.quantity as number) || 1) * ((params.unitPrice as number) || 10),
            unit: 'each',
          });
          return true;
        case 'remove_last_item':
          if (quote.items && quote.items.length > 0) {
            removeItem(quote.items[quote.items.length - 1].id);
            return true;
          }
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
      {
        name: 'client_name',
        label: 'Client Name',
        type: 'text',
        required: true,
        currentValue: quote.client?.name,
      },
      {
        name: 'client_email',
        label: 'Email',
        type: 'email',
        required: false,
        currentValue: quote.client?.email,
      },
      {
        name: 'client_phone',
        label: 'Phone',
        type: 'tel',
        required: false,
        currentValue: quote.client?.phone,
      },
      {
        name: 'job_title',
        label: 'Job Title',
        type: 'text',
        required: true,
        currentValue: quote.jobDetails?.title,
      },
      {
        name: 'job_description',
        label: 'Description',
        type: 'textarea',
        required: true,
        currentValue: quote.jobDetails?.description,
      },
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
    return () => {
      voiceForm.unregisterForm('quote-form');
    };
  }, [voiceForm, quote, handleVoiceFillField, handleVoiceAction, generateQuote, resetQuote]);

  // Import cost data
  useEffect(() => {
    if (initialCostData && initialCostData.materials) {
      const items = transformCostOutputToQuoteItems(initialCostData);
      items.forEach((item) => addItem(item));
    }
  }, [initialCostData]);

  const canSave = !!quote.client?.name;
  const itemCount = quote.items?.length ?? 0;

  // Live summary + stock check (quote lines linked to personal inventory)
  const { items: stockItems } = useInventoryStorage();
  const stockWarnings = useMemo(() => {
    const byId = new Map(stockItems.map((st) => [st.id, st]));
    // Aggregate demand per inventory item — two lines of 30 + 25 against 40
    // in stock must warn even though each line passes individually.
    const demand = new Map<string, number>();
    for (const it of quote.items || []) {
      if (!it.inventoryItemId) continue;
      demand.set(it.inventoryItemId, (demand.get(it.inventoryItemId) || 0) + (it.quantity || 0));
    }
    return Array.from(demand.entries()).flatMap(([id, need]) => {
      const stock = byId.get(id);
      if (!stock || need <= stock.quantity) return [];
      return [{ name: stock.name, need, have: stock.quantity }];
    });
  }, [quote.items, stockItems]);

  // Per-step completion — drives the rail ticks
  const completed: (boolean | null)[] = [
    !!quote.client?.name,
    !!quote.jobDetails?.title,
    itemCount > 0,
    null, // settings — optional, no tick
    null, // review
  ];

  const goToStep = useCallback((next: number) => {
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
    window.scrollTo({ top: 0 });
  }, []);

  const isLastStep = step === STEPS.length - 1;

  // Document-aware wording so the whole wizard reflects Quote vs Estimate.
  const isEstimate = !!quote.settings?.isEstimate;
  const DocWord = isEstimate ? 'Estimate' : 'Quote';
  const docWord = isEstimate ? 'estimate' : 'quote';

  return (
    <div ref={contentRef} className="pb-40 px-3 sm:px-4 lg:px-6">
      {/* Recovery Banner */}
      {showRecoveryBanner && recoveredDraft && (
        <div className="flex items-center justify-between p-3 mb-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
          <div>
            <p className="text-[13px] font-semibold text-amber-400">Recover unsaved {docWord}?</p>
            <p className="text-[11px] text-white">
              {(recoveredDraft.client as QuoteClient | undefined)?.name
                ? `Draft for ${(recoveredDraft.client as QuoteClient).name}`
                : 'You have an unsaved draft'}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 ml-3">
            <button
              onClick={handleDiscardDraft}
              className="text-[12px] text-white font-medium touch-manipulation"
            >
              Discard
            </button>
            <button
              onClick={handleRecoverDraft}
              className="text-[12px] text-amber-400 font-bold touch-manipulation"
            >
              Recover
            </button>
          </div>
        </div>
      )}

      {FEATURES.EMAIL_INTEGRATION_ENABLED && <EmailStatusBanner />}

      {/* === DOCUMENT TYPE — always visible so Quote vs Estimate is never missed === */}
      <div className="flex items-center gap-3 pt-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/55">
          Creating
        </span>
        <div className="inline-flex p-1 rounded-xl bg-white/[0.05] border border-white/[0.10]">
          {([
            [false, 'Quote'],
            [true, 'Estimate'],
          ] as [boolean, string][]).map(([val, label]) => {
            const active = !!quote.settings?.isEstimate === val;
            return (
              <button
                key={label}
                type="button"
                onClick={() =>
                  updateSettings({ ...quote.settings, isEstimate: val } as QuoteSettings)
                }
                className={cn(
                  'h-9 px-4 rounded-lg text-[13px] font-semibold touch-manipulation transition-all',
                  active
                    ? val
                      ? 'bg-amber-500 text-black'
                      : 'bg-elec-yellow text-black'
                    : 'text-white/55'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        {quote.settings?.isEstimate && (
          <span className="text-[11px] text-amber-400/80 hidden sm:block">
            Ball-park — PDF carries a guide-only disclaimer
          </span>
        )}
      </div>

      {/* === STEP RAIL — spans the column === */}
      <div className="pt-3 pb-6">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <Fragment key={s.key}>
              {i > 0 && (
                <div
                  className={cn(
                    'flex-1 h-[2px] rounded-full mx-2 sm:mx-3 min-w-3',
                    i <= step ? 'bg-elec-yellow/50' : 'bg-white/[0.10]'
                  )}
                />
              )}
              <button
                type="button"
                onClick={() => goToStep(i)}
                className="flex items-center gap-2 flex-shrink-0 py-1 touch-manipulation select-none"
              >
                <span
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold tabular-nums transition-all',
                    i === step
                      ? 'bg-elec-yellow text-black shadow-[0_0_0_4px_rgba(250,204,21,0.12)]'
                      : completed[i]
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/[0.06] text-white/55 border border-white/[0.10]'
                  )}
                >
                  {completed[i] && i !== step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-[12px] font-medium leading-none hidden sm:block',
                    i === step ? 'text-white' : completed[i] ? 'text-white/80' : 'text-white/50'
                  )}
                >
                  {s.label}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      {/* === STEP CONTENT — heading inside the panel === */}
      {/* Mobile: flat + full width. sm+: elevated panel matching the quotes pages. */}
      <div className="sm:rounded-2xl sm:border sm:border-white/[0.10] sm:bg-gradient-to-b sm:from-white/[0.05] sm:to-white/[0.02] sm:shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
        <div className="mb-5 pb-4 border-b border-white/[0.08]">
          <h2 className="text-[20px] font-bold text-white leading-tight">
            {isEstimate ? STEPS[step].title.replace(/quote/g, 'estimate') : STEPS[step].title}
          </h2>
          <p className="text-[12px] text-white/60 mt-1">{STEPS[step].sub}</p>
        </div>
        <section className={cn(step !== 0 && 'hidden')}>
          <ClientDetailsStep client={quote.client} onUpdate={updateClient} quoteId={quote.id} />
        </section>

        <section className={cn(step !== 1 && 'hidden')}>
          <JobDetailsStep jobDetails={quote.jobDetails} onUpdate={updateJobDetails} />
        </section>

        <section className={cn(step !== 2 && 'hidden')}>
          <EnhancedQuoteItemsStep
            items={quote.items || []}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
            priceAdjustment={priceAdjustment}
            setPriceAdjustment={setPriceAdjustment}
            calculateAdjustedPrice={calculateAdjustedPrice}
            stockItems={stockItems}
          />
        </section>

        <section className={cn(step !== 3 && 'hidden')}>
          <QuoteSettingsStep
            settings={quote.settings}
            items={quote.items}
            onUpdate={updateSettings}
          />
        </section>

        <section className={cn(step !== 4 && 'hidden')}>
          <QuoteReviewStep quote={quote} />
        </section>
      </div>

      {/* === STICKY FOOTER — centred, symmetric === */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-white/[0.08] lg:left-[var(--sidebar-width,0px)]">
        <div className="px-4 lg:px-6">
          {/* Stock warning */}
          {stockWarnings.length > 0 && (
            <p className="pt-2 text-[11px] text-amber-400">
              {stockWarnings.length} item{stockWarnings.length !== 1 ? 's' : ''} over your stock
              level — check before promising dates
            </p>
          )}

          {/* Mobile strip — desktop folds this into the nav row */}
          <div className="flex items-center justify-between pt-2.5 pb-1 sm:hidden">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[11px] text-white/55 tabular-nums flex-shrink-0">
                Step {step + 1} of {STEPS.length}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-[11px] text-white/70 tabular-nums truncate">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''}` : 'No items yet'}
                {quote.settings?.vatRegistered && itemCount > 0 ? ' · inc. VAT' : ''}
              </span>
              {cloudSaveStatus !== 'idle' && (
                <span className="text-[11px] text-white/40 flex-shrink-0">
                  {cloudSaveStatus === 'saving'
                    ? '· Saving…'
                    : cloudSaveStatus === 'saved'
                      ? '· Saved'
                      : '· Retrying'}
                </span>
              )}
            </div>
            <span className="text-[20px] font-bold text-elec-yellow tabular-nums tracking-tight">
              £
              {(quote.total || 0).toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Navigation — one balanced row on sm+ */}
          <div className="flex items-center gap-3 pb-[max(16px,env(safe-area-inset-bottom))] pt-1.5 sm:pt-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => goToStep(step - 1)}
                className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.10] text-white touch-manipulation active:scale-[0.97] transition-all flex-shrink-0"
                aria-label="Previous step"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2.5 min-w-0 text-[11px] text-white/55 tabular-nums">
              <span>
                Step {step + 1} of {STEPS.length}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-white/70 truncate">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''}` : 'No items yet'}
                {quote.settings?.vatRegistered && itemCount > 0 ? ' · inc. VAT' : ''}
              </span>
              {cloudSaveStatus !== 'idle' && (
                <span className="text-white/40">
                  {cloudSaveStatus === 'saving'
                    ? '· Saving…'
                    : cloudSaveStatus === 'saved'
                      ? '· Saved'
                      : '· Retrying'}
                </span>
              )}
            </div>
            <div className="hidden sm:block flex-1" />
            <span className="hidden sm:inline text-[20px] font-bold text-elec-yellow tabular-nums tracking-tight">
              £
              {(quote.total || 0).toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {!isLastStep && canSave && (
              <button
                type="button"
                onClick={generateQuote}
                disabled={isGenerating}
                className="hidden sm:flex h-12 px-5 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.10] text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
              >
                {isGenerating ? 'Saving…' : 'Save'}
              </button>
            )}
            {isLastStep ? (
              <Button
                onClick={generateQuote}
                disabled={isGenerating || !canSave}
                className="flex-1 sm:flex-none sm:px-10 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-[15px] rounded-xl touch-manipulation active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : canSave ? (
                  `Save ${DocWord}`
                ) : (
                  'Add a client name to save'
                )}
              </Button>
            ) : (
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                className="flex-1 sm:flex-none sm:px-10 h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] touch-manipulation active:scale-[0.98] transition-all"
              >
                Next · {STEPS[step + 1].label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
