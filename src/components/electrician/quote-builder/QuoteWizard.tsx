import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, User, Settings, FileText, Calculator, Building2 } from "lucide-react";
import { useQuoteBuilder } from "@/hooks/useQuoteBuilder";
import { ClientDetailsStep } from "./steps/ClientDetailsStep";
import { EnhancedQuoteItemsStep } from "./steps/EnhancedQuoteItemsStep";
import { QuoteSettingsStep } from "./steps/QuoteSettingsStep";
import { QuoteReviewStep } from "./steps/QuoteReviewStep";
import { CompanyBrandingStep } from "@/components/company/CompanyBrandingStep";

const steps = [
  { title: "Company Branding", icon: Building2, description: "Logo and company details" },
  { title: "Client Details", icon: User, description: "Customer information" },
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
    console.log('Checking canProceed for step:', currentStep);
    console.log('Current quote:', quote);
    
    switch (currentStep) {
      case 0:
        return true; // Company branding is optional for quick quotes
      case 1:
        const clientValid = quote.client?.name && quote.client?.email && quote.client?.phone && quote.client?.address && quote.client?.postcode;
        console.log('Client valid:', clientValid, quote.client);
        return clientValid;
      case 2:
        return quote.items && quote.items.length > 0;
      case 3:
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
        return <EnhancedQuoteItemsStep items={quote.items || []} onAdd={addItem} onUpdate={updateItem} onRemove={removeItem} />;
      case 3:
        return <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />;
      case 4:
        return <QuoteReviewStep quote={quote} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Step Content */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50">
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
        <CardContent className="space-y-6 p-0">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Enhanced Navigation */}
      <Card className="border-0 bg-gradient-to-r from-muted/50 to-muted/30">
        <CardContent className="p-4 sm:p-6 overflow-hidden">
          <div className="flex flex-col gap-4 w-full">
            {/* Top row - Previous button and help text */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                size="lg"
                className="flex items-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Step
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="hidden sm:inline">Need help?</span>
                <Button variant="ghost" size="sm" onClick={resetQuote}>
                  Start Over
                </Button>
              </div>
            </div>
            
            {/* Bottom row - Next/Generate button */}
            <div className="flex justify-center sm:justify-end">
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  size="lg"
                  className="flex items-center gap-2 w-full sm:w-auto max-w-xs bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to {steps[currentStep + 1]?.title}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={generateQuote}
                  disabled={!canProceed()}
                  size="lg"
                  className="w-full sm:w-auto max-w-xs bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Generate Quote
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};