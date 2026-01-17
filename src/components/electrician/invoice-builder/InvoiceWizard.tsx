import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Check,
  Loader2,
  Send,
  Package,
  Receipt,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';

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
  onInvoiceGenerated?: () => void;
}

export const InvoiceWizard = ({ sourceQuote, existingInvoice, onInvoiceGenerated }: InvoiceWizardProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const invoiceBuilder = useInvoiceBuilder(sourceQuote, existingInvoice);
  const { saveInvoice } = useInvoiceStorage();

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
        // Always require client name and email for thank-you emails to work
        return !!(invoiceBuilder.invoice.client?.name && invoiceBuilder.invoice.client?.email);
      case 1:
        const items = invoiceBuilder.invoice.items || [];
        const additionalItems = invoiceBuilder.invoice.additional_invoice_items || [];
        return items.length > 0 || additionalItems.length > 0;
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
                <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
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
    <div className="space-y-6">
      {/* Step Progress - Clean pills (matching quote wizard) */}
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
                  isActive && "bg-elec-yellow text-elec-dark font-semibold",
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

      {/* Bottom Navigation - Fixed (matching quote wizard) */}
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
              className="flex-1 h-14 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold text-base"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Create Invoice
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-1 h-14 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold text-base"
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
