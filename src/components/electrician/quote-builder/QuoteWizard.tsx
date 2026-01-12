import React, { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, User, FileText, Settings, Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteBuilder } from "@/hooks/useQuoteBuilder";
import { ClientDetailsStep } from "./steps/ClientDetailsStep";
import { JobDetailsStep } from "./steps/JobDetailsStep";
import { EnhancedQuoteItemsStep } from "./steps/EnhancedQuoteItemsStep";
import { QuoteSettingsStep } from "./steps/QuoteSettingsStep";
import { QuoteReviewStep } from "./steps/QuoteReviewStep";
import { CompanyProfileSummary } from "./CompanyProfileSummary";
import { EmailStatusBanner } from "./EmailStatusBanner";
import { FEATURES } from '@/config/features';
import { transformCostOutputToQuoteItems } from '@/utils/cost-to-quote-transformer';
import { useOptionalVoiceFormContext, FormField } from "@/contexts/VoiceFormContext";

const steps = [
  { id: 0, title: "Client", shortTitle: "Client", icon: User },
  { id: 1, title: "Job & Items", shortTitle: "Items", icon: FileText },
  { id: 2, title: "Review", shortTitle: "Review", icon: Settings },
];

interface QuoteWizardProps {
  onQuoteGenerated?: () => void;
  initialQuote?: any;
  initialCostData?: any;
}

export const QuoteWizard = ({ onQuoteGenerated, initialQuote, initialCostData }: QuoteWizardProps) => {
  const {
    quote,
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
  } = useQuoteBuilder(onQuoteGenerated, initialQuote);

  const voiceForm = useOptionalVoiceFormContext();

  // Voice form field handler
  const handleVoiceFillField = useCallback((fieldName: string, value: string) => {
    const field = fieldName.toLowerCase();

    // Client fields
    if (field.includes('name') || field === 'client') {
      updateClient({ ...quote.client, name: value });
    } else if (field.includes('email')) {
      updateClient({ ...quote.client, email: value });
    } else if (field.includes('phone') || field.includes('telephone')) {
      updateClient({ ...quote.client, phone: value });
    } else if (field.includes('address')) {
      updateClient({ ...quote.client, address: value });
    } else if (field.includes('postcode')) {
      updateClient({ ...quote.client, postcode: value });
    }
    // Job details fields
    else if (field.includes('title') || field === 'job') {
      updateJobDetails({ ...quote.jobDetails, title: value });
    } else if (field.includes('description') || field.includes('scope')) {
      updateJobDetails({ ...quote.jobDetails, description: value });
    } else if (field.includes('duration')) {
      updateJobDetails({ ...quote.jobDetails, estimatedDuration: value });
    } else if (field.includes('start') || field.includes('date')) {
      updateJobDetails({ ...quote.jobDetails, workStartDate: value });
    } else if (field.includes('location') || field.includes('site')) {
      updateJobDetails({ ...quote.jobDetails, location: value });
    }
    // Settings fields
    else if (field.includes('vat') && field.includes('rate')) {
      updateSettings({ ...quote.settings, vatRate: parseFloat(value) || 20 });
    } else if (field.includes('vat')) {
      updateSettings({ ...quote.settings, vatRegistered: value.toLowerCase() === 'yes' || value === 'true' });
    }
  }, [quote, updateClient, updateJobDetails, updateSettings]);

  // Voice action handler
  const handleVoiceAction = useCallback((action: string, params: Record<string, unknown>) => {
    switch (action) {
      case 'add_labour_item':
        addItem({
          id: crypto.randomUUID(),
          description: params.description as string || 'Labour',
          category: 'labour',
          quantity: params.hours as number || 1,
          unitPrice: params.rate as number || 50,
          totalPrice: ((params.hours as number) || 1) * ((params.rate as number) || 50),
          unit: 'hours',
        });
        return true;
      case 'add_material_item':
        addItem({
          id: crypto.randomUUID(),
          description: params.description as string || 'Materials',
          category: 'materials',
          quantity: params.quantity as number || 1,
          unitPrice: params.unitPrice as number || 10,
          totalPrice: ((params.quantity as number) || 1) * ((params.unitPrice as number) || 10),
          unit: 'each',
        });
        return true;
      case 'add_line_item':
        addItem({
          id: crypto.randomUUID(),
          description: params.description as string || 'Item',
          category: 'manual',
          quantity: params.quantity as number || 1,
          unitPrice: params.unitPrice as number || 0,
          totalPrice: ((params.quantity as number) || 1) * ((params.unitPrice as number) || 0),
          unit: params.unit as string || 'each',
        });
        return true;
      case 'remove_last_item':
        if (quote.items && quote.items.length > 0) {
          removeItem(quote.items[quote.items.length - 1].id);
          return true;
        }
        return false;
      case 'next_step':
        if (currentStep < steps.length - 1) {
          nextStep();
          return true;
        }
        return false;
      default:
        return false;
    }
  }, [addItem, removeItem, quote.items, currentStep, nextStep]);

  // Register form with voice context
  useEffect(() => {
    if (!voiceForm) return;

    const stepFields: Record<number, FormField[]> = {
      0: [
        { name: 'client_name', label: 'Client Name', type: 'text', required: true, currentValue: quote.client?.name },
        { name: 'client_email', label: 'Email', type: 'email', required: true, currentValue: quote.client?.email },
        { name: 'client_phone', label: 'Phone', type: 'tel', required: true, currentValue: quote.client?.phone },
        { name: 'client_address', label: 'Address', type: 'text', required: true, currentValue: quote.client?.address },
        { name: 'client_postcode', label: 'Postcode', type: 'text', required: true, currentValue: quote.client?.postcode },
      ],
      1: [
        { name: 'job_title', label: 'Job Title', type: 'text', required: true, currentValue: quote.jobDetails?.title },
        { name: 'job_description', label: 'Description', type: 'textarea', required: true, currentValue: quote.jobDetails?.description },
        { name: 'estimated_duration', label: 'Duration', type: 'select', options: ['Half day', '1 day', '2 days', '3 days', '1 week', '2 weeks'], currentValue: quote.jobDetails?.estimatedDuration },
      ],
      2: [
        { name: 'vat_registered', label: 'VAT Registered', type: 'select', options: ['Yes', 'No'], currentValue: quote.settings?.vatRegistered ? 'Yes' : 'No' },
      ],
    };

    const stepActions: Record<number, string[]> = {
      0: ['next_step'],
      1: ['add_labour_item', 'add_material_item', 'add_line_item', 'remove_last_item', 'next_step'],
      2: ['next_step'],
    };

    voiceForm.registerForm({
      formId: 'quote-wizard',
      formName: `Quote Builder - ${steps[currentStep].title}`,
      fields: stepFields[currentStep] || [],
      actions: stepActions[currentStep] || [],
      onFillField: handleVoiceFillField,
      onAction: handleVoiceAction,
      onSubmit: () => {
        if (currentStep === steps.length - 1) {
          generateQuote();
        } else {
          nextStep();
        }
      },
      onClear: resetQuote,
      onCancel: () => window.history.back(),
      onNextStep: nextStep,
    });

    return () => {
      voiceForm.unregisterForm('quote-wizard');
    };
  }, [voiceForm, currentStep, quote, handleVoiceFillField, handleVoiceAction, nextStep, generateQuote, resetQuote]);

  // Import cost data
  useEffect(() => {
    if (initialCostData && initialCostData.materials) {
      const items = transformCostOutputToQuoteItems(initialCostData);
      items.forEach(item => addItem(item));
    }
  }, [initialCostData]);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return quote.client?.name && quote.client?.email && quote.client?.phone && quote.client?.address && quote.client?.postcode;
      case 1:
        return quote.jobDetails?.title && quote.jobDetails?.description && quote.items && quote.items.length > 0;
      case 2:
        return quote.settings?.vatRegistered !== undefined;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <CompanyProfileSummary />
            <div className="h-px bg-border/50" />
            <ClientDetailsStep client={quote.client} onUpdate={updateClient} />
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            <JobDetailsStep jobDetails={quote.jobDetails} onUpdate={updateJobDetails} />
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
                  Add Items
                </span>
              </div>
            </div>
            <EnhancedQuoteItemsStep
              items={quote.items || []}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              priceAdjustment={priceAdjustment}
              setPriceAdjustment={setPriceAdjustment}
              calculateAdjustedPrice={calculateAdjustedPrice}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
                  Review & Send
                </span>
              </div>
            </div>
            <QuoteReviewStep quote={quote} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Banner */}
      {FEATURES.EMAIL_INTEGRATION_ENABLED && <EmailStatusBanner />}

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
                    while (currentStep > index) prevStep();
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
              onClick={generateQuote}
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
                  Create Quote
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
