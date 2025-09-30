import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Quote } from '@/types/quote';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';
import { InvoiceGenerationStep } from './steps/InvoiceGenerationStep';

interface InvoiceWizardProps {
  sourceQuote?: Quote;
}

const steps = [
  { id: '1', title: 'Review Quote', description: '📋' },
  { id: '2', title: 'Additional Items', description: '➕' },
  { id: '3', title: 'Invoice Settings', description: '⚙️' },
  { id: '4', title: 'Generate Invoice', description: '📄' },
];

export const InvoiceWizard = ({ sourceQuote }: InvoiceWizardProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const invoiceBuilder = useInvoiceBuilder(sourceQuote);
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

  const handleGenerate = async () => {
    setIsGenerating(true);
    const success = await saveInvoice(invoiceBuilder.invoice);
    setIsGenerating(false);
    
    if (success) {
      navigate('/electrician/quotes');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InvoiceReviewStep invoice={invoiceBuilder.invoice} />;
      case 1:
        return (
          <InvoiceItemsStep
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
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/electrician/quotes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quotes
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Create Invoice</h1>
        <div className="w-32" /> {/* Spacer for alignment */}
      </div>

      <Stepper steps={steps} currentStep={currentStep.toString()} completedSteps={[]} />

      <Card className="p-6">
        {renderStep()}
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Invoice'}
          </Button>
        )}
      </div>
    </div>
  );
};
