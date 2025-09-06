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
    <div className="space-y-8">
      {/* Enhanced Progress Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Progress Overview</h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length} completed
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="space-y-2">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-3 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Started</span>
            <span>Complete</span>
          </div>
        </div>
        
        {/* Enhanced Step Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isFuture = index > currentStep;
            
            return (
              <Card
                key={index}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-md ${
                  isActive 
                    ? 'border-primary bg-primary/5 shadow-lg scale-105' 
                    : isCompleted 
                    ? 'border-green-500/50 bg-green-50 dark:bg-green-950/20'
                    : 'border-muted bg-muted/30'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse"></div>
                )}
                <CardContent className="relative p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-full ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {step.description}
                      </p>
                    </div>
                    {isCompleted && (
                      <div className="w-full h-1 bg-green-500/20 rounded-full">
                        <div className="w-full h-1 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enhanced Step Content */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50 shadow-lg">
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
      <Card className="border-0 bg-gradient-to-r from-muted/50 to-muted/30">
        <CardContent className="p-6">
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
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                size="lg"
                className="flex items-center gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to {steps[currentStep + 1]?.title}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Generate Quote
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};