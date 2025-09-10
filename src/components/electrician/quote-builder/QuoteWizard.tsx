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
import { StepOverview } from "./StepOverview";

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

  const getCompletedSteps = (): boolean[] => {
    return steps.map((_, index) => {
      if (index < currentStep) return true;
      if (index === currentStep) return Boolean(canProceed());
      return false;
    });
  };

  const getStepSummaries = (): (string | null)[] => {
    return [
      null, // Company branding doesn't need summary
      quote.client?.name ? `${quote.client.name} - ${quote.client.email}` : null,
      quote.jobDetails?.title || null,
      quote.items?.length ? `${quote.items.length} item${quote.items.length > 1 ? 's' : ''} added` : null,
      quote.settings?.labourRate ? `£${quote.settings.labourRate}/hour` : null,
      null // Review step doesn't need summary
    ];
  };

  const getCurrentStepCompletion = () => {
    switch (currentStep) {
      case 1: {
        const fields = ['name', 'email', 'phone', 'address', 'postcode'];
        const completed = fields.filter(field => quote.client?.[field as keyof typeof quote.client]).length;
        return (completed / fields.length) * 100;
      }
      case 2: {
        const fields = ['title', 'description'];
        const completed = fields.filter(field => quote.jobDetails?.[field as keyof typeof quote.jobDetails]).length;
        return (completed / fields.length) * 100;
      }
      case 3:
        return quote.items && quote.items.length > 0 ? 100 : 0;
      case 4: {
        const hasLabourRate = !!quote.settings?.labourRate;
        const hasOverhead = typeof quote.settings?.overheadPercentage === 'number';
        const hasProfit = typeof quote.settings?.profitMargin === 'number';
        const completed = [hasLabourRate, hasOverhead, hasProfit].filter(Boolean).length;
        return (completed / 3) * 100;
      }
      default:
        return canProceed() ? 100 : 0;
    }
  };

  const handleStepNavigation = (stepIndex: number) => {
    // Only allow navigation to completed steps
    if (stepIndex < currentStep) {
      // Navigate to previous step logic would go here
      // For now, we'll just focus on the UX improvements
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <QuoteProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        stepLabels={steps.map(s => s.title)}
        completedSteps={getCompletedSteps()}
        onStepClick={handleStepNavigation}
      />

      {/* Step Overview - Collapsible */}
      <StepOverview
        currentStep={currentStep}
        stepLabels={steps.map(s => s.title)}
        completedSteps={getCompletedSteps()}
        stepSummaries={getStepSummaries()}
        onStepClick={handleStepNavigation}
      />

      {/* Enhanced Step Content */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 text-primary" })}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
              <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Enhanced Navigation */}
      <Card className="border-0 bg-gradient-to-r from-muted/50 to-muted/30 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-6 w-full">
            {/* Mobile: Stack navigation vertically */}
            <div className="block sm:hidden space-y-4">
              <SmartContinueButton
                canProceed={Boolean(canProceed())}
                isLastStep={currentStep === steps.length - 1}
                nextStepTitle={steps[currentStep + 1]?.title}
                onNext={nextStep}
                onGenerate={generateQuote}
                completionPercentage={getCurrentStepCompletion()}
              />
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button variant="ghost" size="sm" onClick={resetQuote}>
                  Start Over
                </Button>
              </div>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                size="lg"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Step
              </Button>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={resetQuote}>
                  Start Over
                </Button>
                
                <SmartContinueButton
                  canProceed={Boolean(canProceed())}
                  isLastStep={currentStep === steps.length - 1}
                  nextStepTitle={steps[currentStep + 1]?.title}
                  onNext={nextStep}
                  onGenerate={generateQuote}
                  completionPercentage={getCurrentStepCompletion()}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};