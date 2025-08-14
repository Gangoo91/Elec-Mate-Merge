import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, User, Settings, FileText, Calculator } from "lucide-react";
import { useQuoteBuilder } from "@/hooks/useQuoteBuilder";
import { ClientDetailsStep } from "./steps/ClientDetailsStep";
import { EnhancedQuoteItemsStep } from "./steps/EnhancedQuoteItemsStep";
import { QuoteSettingsStep } from "./steps/QuoteSettingsStep";
import { QuoteReviewStep } from "./steps/QuoteReviewStep";

const steps = [
  { title: "Client Details", icon: User, description: "Customer information" },
  { title: "Quote Items", icon: FileText, description: "Add labour and materials" },
  { title: "Settings", icon: Settings, description: "Pricing and VAT settings" },
  { title: "Review", icon: Calculator, description: "Review and finalise" },
];

export const QuoteWizard = () => {
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
    resetQuote,
  } = useQuoteBuilder();

  const canProceed = () => {
    console.log('Checking canProceed for step:', currentStep);
    console.log('Current quote:', quote);
    
    switch (currentStep) {
      case 0:
        const clientValid = quote.client?.name && quote.client?.email && quote.client?.phone && quote.client?.address && quote.client?.postcode;
        console.log('Client valid:', clientValid, quote.client);
        return clientValid;
      case 1:
        return quote.items && quote.items.length > 0;
      case 2:
        return quote.settings?.labourRate && typeof quote.settings?.overheadPercentage === 'number' && typeof quote.settings?.profitMargin === 'number';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ClientDetailsStep client={quote.client} onUpdate={updateClient} />;
      case 1:
        return <EnhancedQuoteItemsStep items={quote.items || []} onAdd={addItem} onUpdate={updateItem} onRemove={removeItem} />;
      case 2:
        return <QuoteSettingsStep settings={quote.settings} onUpdate={updateSettings} />;
      case 3:
        return <QuoteReviewStep quote={quote} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create New Quote</h2>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        
        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-elec-yellow/20 text-elec-yellow' 
                    : isCompleted 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <StepIcon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium text-center">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
            {steps[currentStep].title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={resetQuote}
            className="w-full sm:w-auto"
          >
            Start Over
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center justify-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 w-full sm:w-auto"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 w-full sm:w-auto">
              Generate Quote
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};