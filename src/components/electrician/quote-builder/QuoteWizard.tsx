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
  { title: "Settings", icon: Settings, description: "Pricing and VAT settings" },
  { title: "Review", icon: Calculator, description: "Review and finalise" },
];

interface QuoteWizardProps {
  onQuoteGenerated?: () => void;
}

export const QuoteWizard = ({ onQuoteGenerated }: QuoteWizardProps) => {
  const {
    quote,
    currentStep,
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
  } = useQuoteBuilder(onQuoteGenerated);

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
        return quote.settings?.labourRate && typeof quote.settings?.overheadPercentage === 'number' && typeof quote.settings?.profitMargin === 'number';
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
        return <EnhancedQuoteItemsStep items={quote.items || []} onAdd={addItem} onUpdate={updateItem} onRemove={removeItem} />;
      case 4:
        return <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />;
      case 5:
        return <QuoteReviewStep quote={quote} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Simple Progress */}
      <QuoteProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        stepLabels={steps.map(s => s.title)}
      />

      {/* Main Content */}
      <Card className="mobile-card">
        <CardHeader className="p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 pb-1 xs:pb-2 sm:pb-3 md:pb-4">
          <CardTitle className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">{steps[currentStep].title}</CardTitle>
          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mt-1 xs:mt-1.5 sm:mt-2">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
          <div className="w-full overflow-hidden">
            {renderStep()}
          </div>
          
          {/* Integrated Navigation */}
          <div className="pt-2 xs:pt-3 sm:pt-4 md:pt-6 lg:pt-8 border-t mt-4 xs:mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3 order-2 sm:order-1">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="h-10 xs:h-11 sm:h-12 px-3 xs:px-4 sm:px-6 text-xs xs:text-sm sm:text-base touch-manipulation"
                >
                  <ArrowLeft className="h-3 w-3 xs:h-4 xs:w-4 mr-1 xs:mr-2" />
                  Previous
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={resetQuote} 
                  className="h-10 xs:h-11 sm:h-12 px-3 xs:px-4 sm:px-6 text-xs xs:text-sm sm:text-base touch-manipulation"
                >
                  Start Over
                </Button>
              </div>
              
              <div className="order-1 sm:order-2 w-full xs:w-auto">
                <SmartContinueButton
                  canProceed={Boolean(canProceed())}
                  isLastStep={currentStep === steps.length - 1}
                  nextStepTitle={steps[currentStep + 1]?.title}
                  onNext={nextStep}
                  onGenerate={generateQuote}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};