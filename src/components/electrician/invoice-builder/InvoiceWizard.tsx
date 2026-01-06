import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, User, FileText, Settings, Check, Loader2, Save, Receipt, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';

import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceClientDetailsStep } from './steps/InvoiceClientDetailsStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';
import { InvoiceGenerationStep } from './steps/InvoiceGenerationStep';

interface InvoiceWizardProps {
  sourceQuote?: Quote;
  existingInvoice?: Partial<Invoice>;
  onInvoiceGenerated?: () => void;
}

export const InvoiceWizard = ({ sourceQuote, existingInvoice, onInvoiceGenerated }: InvoiceWizardProps) => {
  const isStandaloneMode = !sourceQuote && !existingInvoice;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const invoiceBuilder = useInvoiceBuilder(sourceQuote, existingInvoice);
  const { saveInvoice } = useInvoiceStorage();

  // Step definitions
  const steps = isStandaloneMode ? [
    { id: 0, title: 'Client', shortTitle: 'Client', icon: User },
    { id: 1, title: 'Items', shortTitle: 'Items', icon: Package },
    { id: 2, title: 'Settings', shortTitle: 'Settings', icon: Settings },
    { id: 3, title: 'Review', shortTitle: 'Review', icon: Receipt },
  ] : [
    { id: 0, title: 'Review Quote', shortTitle: 'Quote', icon: FileText },
    { id: 1, title: 'Items', shortTitle: 'Items', icon: Package },
    { id: 2, title: 'Settings', shortTitle: 'Settings', icon: Settings },
    { id: 3, title: 'Review', shortTitle: 'Review', icon: Receipt },
  ];

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

  const handleSave = async (): Promise<boolean> => {
    setIsGenerating(true);
    const success = await saveInvoice(invoiceBuilder.invoice);
    setIsGenerating(false);
    return success;
  };

  const handleGenerate = async () => {
    const success = await handleSave();
    if (success) {
      if (onInvoiceGenerated) {
        onInvoiceGenerated();
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
        if (isStandaloneMode) {
          return invoiceBuilder.invoice.client?.name && invoiceBuilder.invoice.client?.email;
        }
        return true; // Quote review step
      case 1:
        const items = invoiceBuilder.invoice.items || [];
        const additionalItems = invoiceBuilder.invoice.additional_invoice_items || [];
        return items.length > 0 || additionalItems.length > 0;
      case 2:
        return true; // Settings step
      case 3:
        return true; // Generation step
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        if (isStandaloneMode) {
          return (
            <InvoiceClientDetailsStep
              initialData={{
                client: invoiceBuilder.invoice.client,
                jobDetails: invoiceBuilder.invoice.jobDetails,
              }}
              onUpdate={handleClientUpdate}
            />
          );
        }
        return <InvoiceReviewStep invoice={invoiceBuilder.invoice} />;
      case 1:
        return (
          <InvoiceItemsStep
            originalItems={invoiceBuilder.invoice.items || []}
            additionalItems={invoiceBuilder.invoice.additional_invoice_items || []}
            onAddItem={invoiceBuilder.addInvoiceItem}
            onUpdateItem={invoiceBuilder.updateInvoiceItem}
            onRemoveItem={invoiceBuilder.removeInvoiceItem}
          />
        );
      case 2:
        return (
          <InvoiceSettingsStep
            settings={invoiceBuilder.invoice.settings}
            notes={invoiceBuilder.invoice.invoice_notes}
            onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
            onUpdateNotes={invoiceBuilder.setInvoiceNotes}
          />
        );
      case 3:
        return (
          <InvoiceGenerationStep
            invoice={invoiceBuilder.invoice}
            onGenerate={handleGenerate}
            onSave={handleSave}
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Progress - Clean pills */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => {
          const isComplete = currentStep > index;
          const isActive = currentStep === index;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => {
                  if (isComplete) {
                    // Allow going back to completed steps
                    setCurrentStep(index);
                  }
                }}
                disabled={!isComplete && !isActive}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all active:scale-95",
                  isComplete && "bg-emerald-500/20 text-emerald-400 cursor-pointer",
                  isActive && "bg-emerald-500 text-white font-semibold",
                  !isComplete && !isActive && "bg-elec-gray/30 text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="text-sm hidden sm:inline">{step.title}</span>
                <span className="text-sm sm:hidden">{step.shortTitle}</span>
              </button>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-6 h-0.5 rounded-full",
                  currentStep > index ? "bg-emerald-500" : "bg-elec-gray/50"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[50vh]">
        {renderStep()}
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-4 z-30">
        <div className="flex gap-3 max-w-lg mx-auto">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="h-14 px-6 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Primary Action */}
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !canProceed()}
              className="flex-1 h-14 bg-emerald-500 text-white hover:bg-emerald-600 font-semibold text-base"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Create Invoice
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-1 h-14 bg-emerald-500 text-white hover:bg-emerald-600 font-semibold text-base"
            >
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
