import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, User, Check, Loader2, Send, Package, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { draftStorage } from '@/utils/draftStorage';
import { AutoSaveIndicator } from '../shared/AutoSaveIndicator';

import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceClientDetailsStep } from './steps/InvoiceClientDetailsStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';

// 3 steps to match quote wizard pattern
const steps = [
  { id: 0, title: 'Client', shortTitle: 'Client', icon: User },
  { id: 1, title: 'Items', shortTitle: 'Items', icon: Package },
  { id: 2, title: 'Review', shortTitle: 'Review', icon: Receipt },
];

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
  const [currentStep, setCurrentStep] = useState(0);
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
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

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
        draftStorage.saveDraft('invoice', invoice.id || null, {
          client: invoice.client,
          jobDetails: invoice.jobDetails,
          items: invoice.items,
          additional_invoice_items: invoice.additional_invoice_items,
          settings: invoice.settings,
          invoice_notes: invoice.invoice_notes,
          currentStep,
        });
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 10000);

    return () => clearInterval(saveTimer);
  }, [invoiceBuilder.invoice, currentStep, sourceQuote]);

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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        // Always require client name and email for thank-you emails to work
        return !!(invoiceBuilder.invoice.client?.name && invoiceBuilder.invoice.client?.email);
      case 1: {
        const items = invoiceBuilder.invoice.items || [];
        const additionalItems = invoiceBuilder.invoice.additional_invoice_items || [];
        return items.length > 0 || additionalItems.length > 0;
      }
      case 2:
        return true; // Review step - always can proceed
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        // Client step - always show editable form to ensure email is captured
        return (
          <InvoiceClientDetailsStep
            initialData={{
              client: invoiceBuilder.invoice.client,
              jobDetails: invoiceBuilder.invoice.jobDetails,
            }}
            onUpdate={handleClientUpdate}
          />
        );

      case 1:
        // Items step
        return (
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
          />
        );

      case 2:
        // Review step - includes settings and review
        return (
          <div className="space-y-8">
            {/* Settings Section */}
            <InvoiceSettingsStep
              settings={invoiceBuilder.invoice.settings}
              notes={invoiceBuilder.invoice.invoice_notes}
              onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
              onUpdateNotes={invoiceBuilder.setInvoiceNotes}
            />

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-white uppercase tracking-wider">
                  Review & Create
                </span>
              </div>
            </div>

            {/* Review Section */}
            <InvoiceReviewStep invoice={invoiceBuilder.invoice} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={contentRef} className="space-y-8 pb-32 px-3 sm:px-4 lg:px-6">
      {/* Recovery Banner */}
      {showRecoveryBanner && recoveredDraft && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
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
        <div className="flex justify-end -mb-4">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
        </div>
      )}

      {/* === ALL SECTIONS ON ONE PAGE — matching QuoteWizard === */}

      {/* 1. Client Details */}
      <section>
        <InvoiceClientDetailsStep
          client={invoiceBuilder.invoice.client}
          onUpdate={invoiceBuilder.updateClient}
        />
      </section>

      {/* 2. Invoice Items */}
      <section>
        <div className="mb-3">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Items</h2>
        </div>
        <InvoiceItemsStep
          items={invoiceBuilder.invoice.items || []}
          onAddItem={invoiceBuilder.addItem}
          onUpdateItem={invoiceBuilder.updateItem}
          onRemoveItem={invoiceBuilder.removeItem}
          subtotal={invoiceBuilder.invoice.subtotal || 0}
          vatAmount={invoiceBuilder.invoice.vatAmount || 0}
          total={invoiceBuilder.invoice.total || 0}
        />
      </section>

      {/* 3. Settings */}
      <section>
        <div className="mb-3">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Settings</h2>
        </div>
        <InvoiceSettingsStep
          settings={invoiceBuilder.invoice.settings}
          notes={invoiceBuilder.invoice.invoice_notes}
          onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
          onUpdateNotes={invoiceBuilder.setInvoiceNotes}
        />
      </section>

      {/* 4. Review */}
      <section>
        <div className="mb-3">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wide">Invoice Summary</h2>
        </div>
        <InvoiceReviewStep invoice={invoiceBuilder.invoice} />
      </section>

      {/* Save button — sticky footer matching QuoteWizard */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-white/[0.06] p-4 lg:left-64">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !canProceed()}
            className="flex-1 h-13 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-[15px] rounded-xl touch-manipulation active:scale-[0.98] shadow-lg shadow-elec-yellow/20 disabled:opacity-50"
          >
            {isGenerating ? 'Creating...' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
};
