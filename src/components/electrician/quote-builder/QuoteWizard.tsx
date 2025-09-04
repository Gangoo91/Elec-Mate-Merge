import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, User, Settings, FileText, Calculator, CheckCircle } from "lucide-react";
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

  const getStepProgress = () => ((currentStep + 1) / steps.length) * 100;

  return (
    <section aria-labelledby="quote-wizard" className="space-y-6">
      <Card className="mobile-card p-0 bg-gradient-to-br from-elec-gray/50 via-elec-card/60 to-elec-gray/40 border-elec-yellow/30 shadow-lg shadow-elec-yellow/5">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="mobile-subheading gradient-text">Create New Quote</CardTitle>
              <p className="mobile-text text-muted-foreground mt-1">
                Step {currentStep + 1} of {steps.length} • {steps[currentStep].description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="mobile-small-text font-medium text-elec-yellow">
                  {Math.round(getStepProgress())}% Complete
                </div>
                <div className="mobile-small-text text-muted-foreground">
                  Quote #{quote.quoteNumber}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="space-y-4 pt-4">
            <div className="relative">
              <Progress 
                value={getStepProgress()} 
                className="h-2 bg-elec-gray/50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/20 via-elec-yellow/10 to-transparent rounded-full pointer-events-none" />
            </div>
            
            {/* Modern Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const canAccess = index <= currentStep || isCompleted;
                
                return (
                  <button
                    key={index}
                    onClick={() => canAccess && index !== currentStep ? (index < currentStep ? prevStep() : nextStep()) : undefined}
                    disabled={!canAccess}
                    className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 mobile-interactive ${
                      isActive 
                        ? 'bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 text-elec-yellow border border-elec-yellow/30 shadow-lg shadow-elec-yellow/20' 
                        : isCompleted 
                        ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40'
                        : 'bg-gradient-to-br from-muted/50 to-muted/30 text-muted-foreground border border-border/50'
                    } ${canAccess ? 'cursor-pointer hover:scale-102' : 'cursor-not-allowed opacity-60'}`}
                  >
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <StepIcon className="h-5 w-5 sm:h-6 sm:w-6 mb-2 transition-transform group-hover:scale-110" />
                    <span className="mobile-small-text font-medium text-center leading-tight">{step.title}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 via-elec-yellow/10 to-elec-yellow/5 rounded-xl pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Step Header */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-elec-yellow/5 via-transparent to-elec-yellow/5 border border-elec-yellow/20">
            <div className="p-2 rounded-lg bg-elec-yellow/20">
              {React.createElement(steps[currentStep].icon, { 
                className: "h-5 w-5 text-elec-yellow" 
              })}
            </div>
            <div>
              <h3 className="mobile-subheading">{steps[currentStep].title}</h3>
              <p className="mobile-small-text text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="animate-fade-in">
            {renderStep()}
          </div>
        </CardContent>

        {/* Enhanced Navigation */}
        <div className="p-6 bg-gradient-to-r from-elec-gray/30 via-elec-card/20 to-elec-gray/30 border-t border-elec-yellow/10 rounded-b-xl">
          <div className="mobile-action-bar">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="mobile-button-secondary border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
              <Button 
                variant="outline" 
                onClick={resetQuote}
                className="border-border/50 text-muted-foreground hover:border-destructive/50 hover:text-destructive transition-colors"
              >
                Start Over
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="mobile-button-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="mobile-button-primary bg-gradient-to-r from-elec-yellow to-yellow-400 hover:from-elec-yellow/90 hover:to-yellow-400/90 shadow-lg shadow-elec-yellow/20">
                  <Calculator className="h-4 w-4 mr-2" />
                  Generate Quote
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};