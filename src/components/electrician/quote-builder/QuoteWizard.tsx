import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Settings, FileText, Calculator, Building2, Briefcase } from "lucide-react";
import { useQuoteBuilder } from "@/hooks/useQuoteBuilder";
import { ClientDetailsStep } from "./steps/ClientDetailsStep";
import { JobDetailsStep } from "./steps/JobDetailsStep";
import { EnhancedQuoteItemsStep } from "./steps/EnhancedQuoteItemsStep";
import { QuoteSettingsStep } from "./steps/QuoteSettingsStep";
import { QuoteReviewStep } from "./steps/QuoteReviewStep";
import { CompanyBrandingStep } from "@/components/company/CompanyBrandingStep";
import { QuoteProgressIndicator } from "./QuoteProgressIndicator";
import { SmartContinueButton } from "./SmartContinueButton";
import { EmailStatusBanner } from "./EmailStatusBanner";
import { AutoSaveIndicator } from "../shared/AutoSaveIndicator";

const steps = [
  { title: "Client & Company", icon: User, description: "Customer and company details" },
  { title: "Job & Items", icon: FileText, description: "Scope of work and pricing" },
  { title: "Settings & Review", icon: Calculator, description: "VAT, settings, and finalise" },
];

interface QuoteWizardProps {
  onQuoteGenerated?: () => void;
  initialQuote?: any;
  initialCostData?: any; // PHASE 1: Support cost data import
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

  const [lastSaved, setLastSaved] = React.useState<Date>();

  // PHASE 1: Import cost data into quote items
  useEffect(() => {
    if (initialCostData && initialCostData.materials) {
      const { transformCostOutputToQuoteItems } = require('@/utils/cost-to-quote-transformer');
      const items = transformCostOutputToQuoteItems(initialCostData);
      items.forEach(item => addItem(item));
    }
  }, [initialCostData]);

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Client & Company combined
        const clientValid = quote.client?.name && quote.client?.email && quote.client?.phone && quote.client?.address && quote.client?.postcode;
        return clientValid;
      case 1: // Job & Items combined
        const jobValid = quote.jobDetails?.title && quote.jobDetails?.description;
        const itemsValid = quote.items && quote.items.length > 0;
        return jobValid && itemsValid;
      case 2: // Settings & Review
        return quote.settings?.vatRegistered !== undefined;
      default:
        return true;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S to trigger auto-save indicator
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        setLastSaved(new Date());
      }
      // Enter to advance step (if valid and not in textarea)
      if (e.key === 'Enter' && !(e.target as HTMLElement).matches('textarea') && canProceed()) {
        const isInInput = (e.target as HTMLElement).matches('input, select, button');
        if (!isInInput && currentStep < steps.length - 1) {
          nextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, nextStep]);

  // Track changes for auto-save indicator
  useEffect(() => {
    if (quote.client || quote.items?.length || quote.settings) {
      setLastSaved(new Date());
    }
  }, [quote]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <CompanyBrandingStep />
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <ClientDetailsStep client={quote.client} onUpdate={updateClient} />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <JobDetailsStep jobDetails={quote.jobDetails} onUpdate={updateJobDetails} />
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quote Items</h3>
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Final Review</h3>
              <QuoteReviewStep quote={quote} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto space-y-4 md:space-y-6">
      {/* Email Status Banner */}
      <EmailStatusBanner />
      
      {/* Progress and Auto-Save Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <QuoteProgressIndicator
          currentStep={currentStep}
          totalSteps={steps.length}
          stepLabels={steps.map(s => s.title)}
        />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <AutoSaveIndicator lastSaved={lastSaved} />
          <div className="hidden md:block text-xs text-muted-foreground">
            Press Enter to continue • ⌘S to save
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card data-quote-step="content">
        <CardHeader className="p-3 sm:p-4 md:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">{steps[currentStep].title}</CardTitle>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
          {renderStep()}
          
          {/* Integrated Navigation */}
          <div className="pt-3 sm:pt-4 border-t space-y-3">
            {/* Continue Button - Always First on Mobile */}
            <SmartContinueButton
              canProceed={Boolean(canProceed())}
              isLastStep={currentStep === steps.length - 1}
              nextStepTitle={steps[currentStep + 1]?.title}
              onNext={nextStep}
              onGenerate={generateQuote}
              isGenerating={isGenerating}
            />
            
            {/* Secondary Actions - Stack on Mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                size="sm"
                className="w-full sm:w-auto h-10 sm:h-9"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetQuote} 
                className="w-full sm:w-auto h-10 sm:h-9"
              >
                Start Over
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};