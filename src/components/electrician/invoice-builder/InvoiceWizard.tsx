import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileGestureHandler } from '@/components/ui/mobile-gesture-handler';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { InvoiceProgressIndicator } from './InvoiceProgressIndicator';
import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';
import { InvoiceGenerationStep } from './steps/InvoiceGenerationStep';
import { toast } from '@/hooks/use-toast';

interface InvoiceWizardProps {
  sourceQuote?: Quote;
  existingInvoice?: Partial<Invoice>;
}

const steps = [
  { title: 'Review Quote', description: 'Verify quote details' },
  { title: 'Review & Edit Items', description: 'Adjust costs and quantities' },
  { title: 'Invoice Settings', description: 'Configure payment terms' },
  { title: 'Generate Invoice', description: 'Preview and save' },
];

export const InvoiceWizard = ({ sourceQuote, existingInvoice }: InvoiceWizardProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const invoiceBuilder = useInvoiceBuilder(sourceQuote, existingInvoice);
  const { saveInvoice } = useInvoiceStorage();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentStep < steps.length - 1) {
      handleNext();
    }
  };

  const handleSwipeRight = () => {
    if (currentStep > 0) {
      handlePrevious();
    }
  };

  const handleSave = async (): Promise<boolean> => {
    setIsGenerating(true);
    const success = await saveInvoice(invoiceBuilder.invoice);
    setIsGenerating(false);
    return success;
  };

  const handleGenerate = async () => {
    const success = await handleSave();
    
    if (success) {
      navigate('/electrician/invoices');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InvoiceReviewStep invoice={invoiceBuilder.invoice} />;
      case 1:
        return (
          <InvoiceItemsStep
            originalItems={invoiceBuilder.invoice.items || []}
            additionalItems={invoiceBuilder.invoice.additional_invoice_items || []}
            onAddItem={invoiceBuilder.addInvoiceItem}
            onUpdateItem={invoiceBuilder.updateInvoiceItem}
            onRemoveItem={invoiceBuilder.removeInvoiceItem}
          />
        );
      case 2:
        return (
          <InvoiceSettingsStep
            settings={invoiceBuilder.invoice.settings}
            notes={invoiceBuilder.invoice.invoice_notes}
            onUpdateSettings={invoiceBuilder.updateInvoiceSettings}
            onUpdateNotes={invoiceBuilder.setInvoiceNotes}
          />
        );
      case 3:
        return (
          <InvoiceGenerationStep
            invoice={invoiceBuilder.invoice}
            onGenerate={handleGenerate}
            onSave={handleSave}
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-0 sm:px-4 sm:py-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MobileButton
            variant="ghost"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </MobileButton>
          <h1 className="text-xl md:text-2xl font-bold w-full">Create Invoice</h1>
          <div className="w-20" />
        </div>

        <InvoiceProgressIndicator
          currentStep={currentStep}
          steps={steps}
        />
      </div>

      {/* Main Content with Swipe Gestures */}
      <MobileGestureHandler
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        disabled={isGenerating}
      >
        <Card className="p-4 md:p-6 animate-fade-in">
          {renderStep()}
        </Card>
      </MobileGestureHandler>

      {/* Navigation Footer */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <MobileButton
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="flex-1 md:flex-initial"
          >
            Previous
          </MobileButton>

          {currentStep < steps.length - 1 ? (
            <MobileButton
              onClick={handleNext}
              icon={<ArrowRight className="h-4 w-4" />}
              className="flex-1 md:flex-initial"
            >
              Next Step
            </MobileButton>
          ) : (
            <MobileButton
              onClick={handleGenerate}
              disabled={isGenerating}
              loading={isGenerating}
              icon={<Save className="h-4 w-4" />}
              className="flex-1 md:flex-initial"
            >
              {isGenerating ? 'Generating...' : 'Save Invoice'}
            </MobileButton>
          )}
        </div>
        
        {/* Swipe Hint for Mobile */}
        <p className="text-xs text-center text-muted-foreground md:hidden">
          Swipe left/right to navigate between steps
        </p>
      </div>
    </div>
  );
};
