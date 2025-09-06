import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, User, Settings, FileText, Calculator } from "lucide-react";
import { useQuoteBuilder } from "@/hooks/useQuoteBuilder";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
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

  const { isMobile, isTablet, touchSupport } = useMobileEnhanced();

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
    <div className="mobile-section-spacing">
      {/* Mobile-Optimized Progress Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="mobile-subheading">Progress Overview</h3>
            <p className="mobile-small-text text-muted-foreground">
              Step {currentStep + 1} of {steps.length} completed
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-full mobile-small-text font-medium self-start sm:self-auto">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </div>
        </div>
        
        {/* Mobile-Enhanced Progress Bar */}
        <div className="space-y-2">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 sm:h-3 bg-muted" />
          <div className="flex justify-between mobile-small-text text-muted-foreground">
            <span>Started</span>
            <span>Complete</span>
          </div>
        </div>
        
        {/* Mobile-Optimized Step Indicators */}
        {isMobile ? (
          // Mobile: Horizontal scrollable step indicators
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max px-1">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center space-y-2 p-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] ${
                      isActive 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : isCompleted 
                        ? 'border-green-500/50 bg-green-50 dark:bg-green-950/20'
                        : 'border-muted bg-muted/30'
                    }`}
                  >
                    <div className={`p-2 rounded-full touch-target ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <span className={`mobile-small-text font-medium ${
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
                );
              })}
            </div>
          </div>
        ) : (
          // Desktop/Tablet: Grid layout
          <div className={`grid ${isTablet ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'}`}>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
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
        )}
      </div>

      {/* Mobile-Enhanced Step Content */}
      <Card className="mobile-card border-0 bg-gradient-to-br from-card to-card/50 shadow-lg">
        <CardHeader className={`${isMobile ? 'mobile-card-spacing pb-2' : 'pb-4'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg touch-target">
              {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 text-primary" })}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className={`${isMobile ? 'mobile-subheading' : 'text-xl'} truncate`}>
                {steps[currentStep].title}
              </CardTitle>
              <p className={`text-muted-foreground ${isMobile ? 'mobile-small-text' : 'text-sm'}`}>
                {steps[currentStep].description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`${isMobile ? 'mobile-card-spacing space-y-4' : 'space-y-6'}`}>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Mobile bottom padding to ensure content isn't hidden behind fixed navigation */}
      {isMobile && <div className="h-20"></div>}

      {/* Mobile-Enhanced Navigation */}
      {isMobile ? (
        // Mobile: Fixed bottom navigation
        <div className="mobile-action-bar fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
          <div className="mobile-container flex items-center justify-between gap-3 py-3">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              size="lg"
              className="touch-target flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              {isMobile ? 'Back' : 'Previous Step'}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetQuote}
              className="touch-target mobile-small-text"
            >
              Reset
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                size="lg"
                className="touch-target flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                size="lg"
                className="touch-target bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Generate
              </Button>
            )}
          </div>
          <div className="mobile-bottom-safe"></div>
        </div>
      ) : (
        // Desktop/Tablet: Standard navigation
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
      )}
    </div>
  );
};