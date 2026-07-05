import React, { useState, useEffect, useRef, useCallback, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Check, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { draftStorage } from '@/utils/draftStorage';
import { AutoSaveIndicator } from '../shared/AutoSaveIndicator';
import { useInventoryStorage } from '@/hooks/useInventoryStorage';

import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceClientDetailsStep } from './steps/InvoiceClientDetailsStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';


const STEPS = [
  { key: 'client', label: 'Client', title: 'Who’s the invoice for?', sub: 'Client and job details' },
  { key: 'items', label: 'Items', title: 'What are you billing?', sub: 'Original quote items plus anything added on site' },
  { key: 'settings', label: 'Settings', title: 'Money settings', sub: 'VAT, CIS, payment terms and notes' },
  { key: 'review', label: 'Review', title: 'Check and create', sub: 'Everything your client will see' },
] as const;

interface InvoiceWizardProps {
  sourceQuote?: Quote;
  existingInvoice?: Partial<Invoice>;
  onInvoiceGenerated?: (invoiceId: string) => void;
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
    /** Pre-filled line items (e.g. labour from Time Tracker) */
    items?: Array<{
      id: string;
      description: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      totalPrice: number;
      category: string;
    }>;
    linkedCertificate?: {
      reportId: string;
      certificateType: string;
      certificateReference: string;
      pdfUrl?: string;
      pdfStoragePath?: string;
    };
  };
}

export const InvoiceWizard = ({
  sourceQuote,
  existingInvoice,
  onInvoiceGenerated,
  initialCertificateData,
}: InvoiceWizardProps) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { companyProfile } = useCompanyProfile();
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [recoveredDraft, setRecoveredDraft] = useState<Record<string, unknown> | null>(null);

  // Check for recoverable draft on mount (only for new invoices, not quote conversions)
  useEffect(() => {
    if (!sourceQuote && !existingInvoice && !initialCertificateData) {
      const draft = draftStorage.loadDraft('invoice', null);
      if (draft && draftStorage.hasRecoverableDraft('invoice')) {
        setRecoveredDraft(draft.data);
        setShowRecoveryBanner(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get default settings from company profile
  const defaultLabourRate = companyProfile?.hourly_rate || 50;
  const defaultOverhead = companyProfile?.overhead_percentage ?? 0;
  const defaultProfitMargin = companyProfile?.profit_margin ?? 0;
  const defaultPaymentTerms = companyProfile?.payment_terms || '30 days';

  // Merge certificate data into existing invoice for proper initialization
  const mergedExistingInvoice =
    initialCertificateData && !existingInvoice && !sourceQuote
      ? {
          client: initialCertificateData.client,
          jobDetails: initialCertificateData.jobDetails,
          // Include settings from company profile so useInvoiceBuilder can calculate totals
          items: initialCertificateData.items ?? [],
          additional_invoice_items: [],
          settings: {
            labourRate: defaultLabourRate,
            overheadPercentage: defaultOverhead,
            profitMargin: defaultProfitMargin,
            vatRate: 20,
            vatRegistered: !!companyProfile?.vat_number,
            paymentTerms: defaultPaymentTerms,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          // Include linked certificate data for attachment support
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
      : existingInvoice;

  const invoiceBuilder = useInvoiceBuilder(sourceQuote, mergedExistingInvoice);
  const { saveInvoice } = useInvoiceStorage();

  // Smooth scroll to top on step change
  // Auto-save to localStorage every 10 seconds when data changes
  useEffect(() => {
    // Don't auto-save if we're converting from a quote (that data is already saved)
    if (sourceQuote) return;

    const saveTimer = setInterval(() => {
      const invoice = invoiceBuilder.invoice;
      if (
        invoice.client?.name ||
        invoice.jobDetails?.title ||
        (invoice.items && invoice.items.length > 0) ||
        (invoice.additional_invoice_items && invoice.additional_invoice_items.length > 0)
      ) {
        setIsSaving(true);
        try {
          draftStorage.saveDraft('invoice', invoice.id || null, {
            client: invoice.client,
            jobDetails: invoice.jobDetails,
            items: invoice.items,
            additional_invoice_items: invoice.additional_invoice_items,
            settings: invoice.settings,
            invoice_notes: invoice.invoice_notes,
          });
          setLastSaved(new Date());
        } catch (e) {
          console.warn('Auto-save failed:', e);
        }
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 10000);

    return () => clearInterval(saveTimer);
  }, [invoiceBuilder.invoice, sourceQuote]);

  // Handle draft recovery
  const handleRecoverDraft = useCallback(() => {
    if (recoveredDraft) {
      if (recoveredDraft.client) invoiceBuilder.updateClientDetails(recoveredDraft.client);
      if (recoveredDraft.jobDetails) invoiceBuilder.updateJobDetails(recoveredDraft.jobDetails);
      if (recoveredDraft.additional_invoice_items) {
        (recoveredDraft.additional_invoice_items as Record<string, unknown>[]).forEach(
          (item: Record<string, unknown>) =>
            invoiceBuilder.addInvoiceItem(
              item as Parameters<typeof invoiceBuilder.addInvoiceItem>[0]
            )
        );
      }
      if (recoveredDraft.settings) invoiceBuilder.updateInvoiceSettings(recoveredDraft.settings);
      if (recoveredDraft.invoice_notes)
        invoiceBuilder.setInvoiceNotes(recoveredDraft.invoice_notes);
      setShowRecoveryBanner(false);
      setRecoveredDraft(null);
    }
  }, [recoveredDraft, invoiceBuilder]);

  const handleDiscardDraft = useCallback(() => {
    draftStorage.clearDraft('invoice', null);
    setShowRecoveryBanner(false);
    setRecoveredDraft(null);
  }, []);

  // Certificate data is now merged into existingInvoice at the top of the component
  // This ensures proper initialization timing

  const handleGenerate = async () => {
    setIsGenerating(true);
    const success = await saveInvoice(invoiceBuilder.invoice);
    setIsGenerating(false);

    if (success) {
      // Clear the draft since invoice was successfully saved
      draftStorage.clearDraft('invoice', invoiceBuilder.invoice.id || null);
      draftStorage.clearDraft('invoice', null); // Also clear the "new" draft

      if (onInvoiceGenerated) {
        onInvoiceGenerated(invoiceBuilder.invoice.id || '');
      } else {
        navigate('/electrician/invoices');
      }
    }
  };

  const handleClientUpdate = (client: Quote['client'], jobDetails: Quote['jobDetails']) => {
    invoiceBuilder.updateClientDetails(client);
    invoiceBuilder.updateJobDetails(jobDetails);
  };

  const [step, setStep] = useState(0);
  const goToStep = (next: number) => {
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
    window.scrollTo({ top: 0 });
  };
  const isLastStep = step === STEPS.length - 1;
  const itemCount =
    (invoiceBuilder.invoice.items || []).length +
    (invoiceBuilder.invoice.additional_invoice_items || []).length;
  const completed: (boolean | null)[] = [
    !!invoiceBuilder.invoice.client?.name,
    itemCount > 0,
    null,
    null,
  ];

  const canSave = !!(
    invoiceBuilder.invoice.client?.name &&
    ((invoiceBuilder.invoice.items || []).length > 0 || (invoiceBuilder.invoice.additional_invoice_items || []).length > 0)
  );

  // Live stock check — single fetch here, shared with the items step (same
  // pattern as QuoteWizard). Saving runs the take-off, so warn on aggregate
  // demand across quote lines + added lines before the sparky commits.
  const { items: stockItems } = useInventoryStorage();
  const stockWarnings = useMemo(() => {
    const byId = new Map(stockItems.map((st) => [st.id, st]));
    const demand = new Map<string, number>();
    for (const it of [
      ...(invoiceBuilder.invoice.items || []),
      ...(invoiceBuilder.invoice.additional_invoice_items || []),
    ]) {
      if (!it.inventoryItemId) continue;
      const qty = Number((it as { actualQuantity?: number }).actualQuantity ?? it.quantity) || 0;
      demand.set(it.inventoryItemId, (demand.get(it.inventoryItemId) || 0) + qty);
    }
    return Array.from(demand.entries()).flatMap(([id, need]) => {
      const stock = byId.get(id);
      if (!stock || need <= stock.quantity) return [];
      return [{ name: stock.name, need, have: stock.quantity }];
    });
  }, [invoiceBuilder.invoice.items, invoiceBuilder.invoice.additional_invoice_items, stockItems]);

  return (
    <div ref={contentRef} className="pb-40 px-3 sm:px-4 lg:px-6">
      {/* Recovery Banner */}
      {showRecoveryBanner && recoveredDraft && (
        <div className="flex items-center justify-between p-3 mb-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
          <div>
            <p className="text-[13px] font-semibold text-amber-400">Recover unsaved invoice?</p>
            <p className="text-[11px] text-white">
              {recoveredDraft.client?.name
                ? `Draft for ${recoveredDraft.client.name}`
                : 'You have an unsaved draft'}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 ml-3">
            <button onClick={handleDiscardDraft} className="text-[12px] text-white font-medium touch-manipulation">Discard</button>
            <button onClick={handleRecoverDraft} className="text-[12px] text-amber-400 font-bold touch-manipulation">Recover</button>
          </div>
        </div>
      )}

      {/* Auto-save status */}
      {!sourceQuote && (
        <div className="flex justify-end mb-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
        </div>
      )}

      {/* === STEP RAIL === */}
      <div className="pt-3 pb-6">
        <div className="flex items-center">
          {STEPS.map((st, i) => (
            <Fragment key={st.key}>
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
                  {st.label}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      {/* === STEP CONTENT — all mounted, current visible === */}
      <div className="sm:rounded-2xl sm:border sm:border-white/[0.10] sm:bg-gradient-to-b sm:from-white/[0.05] sm:to-white/[0.02] sm:shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
        <div className="mb-5 pb-4 border-b border-white/[0.08]">
          <h2 className="text-[20px] font-bold text-white leading-tight">{STEPS[step].title}</h2>
          <p className="text-[12px] text-white/60 mt-1">{STEPS[step].sub}</p>
        </div>

        <section className={cn(step !== 0 && 'hidden')}>
          <InvoiceClientDetailsStep
            initialData={{
              client: invoiceBuilder.invoice.client,
              jobDetails: invoiceBuilder.invoice.jobDetails,
            }}
            onUpdate={handleClientUpdate}
          />
        </section>

        <section className={cn(step !== 1 && 'hidden')}>
          <InvoiceItemsStep
            originalItems={invoiceBuilder.invoice.items || []}
            additionalItems={invoiceBuilder.invoice.additional_invoice_items || []}
            onAddItem={invoiceBuilder.addInvoiceItem}
            onUpdateItem={invoiceBuilder.updateInvoiceItem}
            onRemoveItem={invoiceBuilder.removeInvoiceItem}
            settings={invoiceBuilder.invoice.settings}
            subtotal={invoiceBuilder.invoice.subtotal || 0}
            vatAmount={invoiceBuilder.invoice.vatAmount || 0}
            total={invoiceBuilder.invoice.total || 0}
            stockItems={stockItems}
          />
        </section>

        <section className={cn(step !== 2 && 'hidden')}>
          <InvoiceSettingsStep
            settings={invoiceBuilder.invoice.settings}
            items={[
              ...(invoiceBuilder.invoice.items || []),
              ...(invoiceBuilder.invoice.additional_invoice_items || []),
            ]}
            notes={invoiceBuilder.invoice.invoice_notes}
            onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
            onUpdateNotes={invoiceBuilder.setInvoiceNotes}
          />
        </section>

        <section className={cn(step !== 3 && 'hidden')}>
          <InvoiceReviewStep invoice={invoiceBuilder.invoice} />
        </section>
      </div>

      {/* === STICKY FOOTER — live total + navigation === */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-white/[0.08] lg:left-[var(--sidebar-width,0px)]">
        <div className="px-4 lg:px-6">
          {/* Stock warning */}
          {stockWarnings.length > 0 && (
            <p className="pt-2 text-[11px] text-amber-400">
              {stockWarnings.length} item{stockWarnings.length !== 1 ? 's' : ''} over your stock level — saving this invoice deducts stock
            </p>
          )}

          {/* Mobile strip */}
          <div className="flex items-center justify-between pt-2.5 pb-1 sm:hidden">
            <span className="text-[11px] text-white/55 tabular-nums">
              Step {step + 1} of {STEPS.length}
              <span className="text-white/20 mx-1.5">·</span>
              <span className="text-white/70">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''}` : 'No items yet'}
                {invoiceBuilder.invoice.settings?.vatRegistered && itemCount > 0 ? ' · inc. VAT' : ''}
              </span>
              {(isSaving || lastSaved) && (
                <span className="text-white/40"> {isSaving ? '· Saving…' : '· Saved'}</span>
              )}
            </span>
            <span className="text-[20px] font-bold text-elec-yellow tabular-nums tracking-tight">
              {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(invoiceBuilder.invoice.total || 0)}
            </span>
          </div>

          {/* Navigation */}
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
              <span>Step {step + 1} of {STEPS.length}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/70 truncate">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''}` : 'No items yet'}
                {invoiceBuilder.invoice.settings?.vatRegistered && itemCount > 0 ? ' · inc. VAT' : ''}
              </span>
              {(isSaving || lastSaved) && (
                <span className="text-white/40">{isSaving ? '· Saving…' : '· Saved'}</span>
              )}
            </div>
            <div className="hidden sm:block flex-1" />
            <span className="hidden sm:inline text-[20px] font-bold text-elec-yellow tabular-nums tracking-tight">
              {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(invoiceBuilder.invoice.total || 0)}
            </span>
            {!isLastStep && canSave && (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="hidden sm:flex h-12 px-5 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.10] text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
              >
                {isGenerating ? 'Saving…' : existingInvoice ? 'Save' : 'Create'}
              </button>
            )}
            {isLastStep ? (
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !canSave}
                className="flex-1 sm:flex-none sm:px-10 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-[15px] rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {isGenerating
                  ? 'Creating…'
                  : !canSave
                    ? 'Add a client and items first'
                    : existingInvoice
                      ? 'Save Invoice'
                      : 'Create Invoice'}
              </button>
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
