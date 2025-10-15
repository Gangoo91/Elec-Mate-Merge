import React from "react";
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

const steps = [
  { title: "Company Branding", icon: Building2, description: "Logo and company details" },
  { title: "Client Details", icon: User, description: "Customer information" },
  { title: "Job Details", icon: Briefcase, description: "Scope of work" },
  { title: "Quote Items", icon: FileText, description: "Add labour and materials" },
  { title: "Settings", icon: Settings, description: "VAT and AI settings" },
  { title: "Review", icon: Calculator, description: "Review and finalise" },
];

interface QuoteWizardProps {
  onQuoteGenerated?: () => void;
  initialQuote?: any;
}

export const QuoteWizard = ({ onQuoteGenerated, initialQuote }: QuoteWizardProps) => {
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

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Company branding is optional for quick quotes
      case 1:
        const clientValid = quote.client?.name && quote.client?.email && quote.client?.phone && quote.client?.address && quote.client?.postcode;
        return clientValid;
      case 2:
        const jobValid = quote.jobDetails?.title && quote.jobDetails?.description;
        return jobValid;
      case 3:
        return quote.items && quote.items.length > 0;
      case 4:
        return quote.settings?.vatRegistered !== undefined;
      default:
        return true;
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyBrandingStep />;
      case 1:
        return <ClientDetailsStep client={quote.client} onUpdate={updateClient} />;
      case 2:
        return <JobDetailsStep jobDetails={quote.jobDetails} onUpdate={updateJobDetails} />;
      case 3:
        return <EnhancedQuoteItemsStep 
          items={quote.items || []} 
          onAdd={addItem} 
          onUpdate={updateItem} 
          onRemove={removeItem}
          priceAdjustment={priceAdjustment}
          setPriceAdjustment={setPriceAdjustment}
          calculateAdjustedPrice={calculateAdjustedPrice}
        />;
      case 4:
        return <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />;
      case 5:
        return <QuoteReviewStep quote={quote} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-4xl mx-auto px-3 md:px-4 space-y-4 md:space-y-6">
      {/* Simple Progress */}
      <QuoteProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        stepLabels={steps.map(s => s.title)}
      />

      {/* Main Content */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="p-3 md:p-6 space-y-4 md:space-y-6">
          {renderStep()}
          
          {/* Integrated Navigation */}
          <div className="pt-4 border-t">
            <div className="flex flex-col gap-3">
              <div className="order-2 sm:order-1">
                <SmartContinueButton
                  canProceed={Boolean(canProceed())}
                  isLastStep={currentStep === steps.length - 1}
                  nextStepTitle={steps[currentStep + 1]?.title}
                  onNext={nextStep}
                  onGenerate={generateQuote}
                  isGenerating={isGenerating}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 order-1 sm:order-2">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  size="sm"
                  className="flex-1 sm:flex-initial h-11 sm:h-9"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetQuote} 
                  className="flex-1 sm:flex-initial h-11 sm:h-9"
                >
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};