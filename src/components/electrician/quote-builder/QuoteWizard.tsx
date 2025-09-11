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
    <div className="space-y-4 max-w-4xl mx-auto">
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
        <CardContent className="space-y-6">
          {renderStep()}
          
          {/* Integrated Navigation */}
          <div className="pt-4 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  size="sm"
                  className="flex-shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button variant="ghost" size="sm" onClick={resetQuote} className="flex-shrink-0">
                  Start Over
                </Button>
              </div>
              
              <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-xs">
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