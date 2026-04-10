import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
        draftStorage.saveDraft('invoice', invoice.id || null, {
          client: invoice.client,
          jobDetails: invoice.jobDetails,
          items: invoice.items,
          additional_invoice_items: invoice.additional_invoice_items,
          settings: invoice.settings,
          invoice_notes: invoice.invoice_notes,
        });
        setLastSaved(new Date());
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

  const canSave = !!(
    invoiceBuilder.invoice.client?.name &&
    ((invoiceBuilder.invoice.items || []).length > 0 || (invoiceBuilder.invoice.additional_invoice_items || []).length > 0)
  );

  return (
    <div ref={contentRef} className="space-y-8 pb-32 px-3 sm:px-3 lg:px-4">
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

      {/* === ALL SECTIONS ON ONE PAGE === */}

      {/* 1. Client Details */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${invoiceBuilder.invoice.client?.name ? 'bg-emerald-400' : 'bg-white/20'}`} />
        </div>
        <InvoiceClientDetailsStep
          initialData={{
            client: invoiceBuilder.invoice.client,
            jobDetails: invoiceBuilder.invoice.jobDetails,
          }}
          onUpdate={handleClientUpdate}
        />
      </section>

      {/* 2. Invoice Items */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${((invoiceBuilder.invoice.items || []).length > 0 || (invoiceBuilder.invoice.additional_invoice_items || []).length > 0) ? 'bg-emerald-400' : 'bg-white/20'}`} />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Items</h2>
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
      </section>

      {/* 3. Settings */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
          <div className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Settings</h2>
        <InvoiceSettingsStep
          settings={invoiceBuilder.invoice.settings}
          notes={invoiceBuilder.invoice.invoice_notes}
          onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
          onUpdateNotes={invoiceBuilder.setInvoiceNotes}
        />
      </section>

      {/* 4. Review */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
          <div className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Invoice Summary</h2>
        <InvoiceReviewStep invoice={invoiceBuilder.invoice} />
      </section>

      {/* Sticky footer with live total + CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background via-background/98 to-background/80 backdrop-blur-md border-t border-white/[0.12] px-4 pb-4 pt-3 lg:left-64 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] text-white">Total</span>
          <span className="text-[20px] font-bold text-elec-yellow tabular-nums">
            {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(invoiceBuilder.invoice.total || 0)}
          </span>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !canSave}
          className="w-full h-13 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-[15px] rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          {isGenerating ? 'Creating...' : 'Create Invoice'}
        </button>
      </div>
    </div>
  );
};
