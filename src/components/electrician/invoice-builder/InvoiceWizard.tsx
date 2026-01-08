import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  User,
  FileText,
  Settings,
  Check,
  Loader2,
  Save,
  Receipt,
  Package,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { Invoice } from '@/types/invoice';
import { useInvoiceBuilder } from '@/hooks/useInvoiceBuilder';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { motion, AnimatePresence } from 'framer-motion';

import { InvoiceReviewStep } from './steps/InvoiceReviewStep';
import { InvoiceClientDetailsStep } from './steps/InvoiceClientDetailsStep';
import { InvoiceItemsStep } from './steps/InvoiceItemsStep';
import { InvoiceSettingsStep } from './steps/InvoiceSettingsStep';
import { InvoiceGenerationStep } from './steps/InvoiceGenerationStep';

interface InvoiceWizardProps {
  sourceQuote?: Quote;
  existingInvoice?: Partial<Invoice>;
  onInvoiceGenerated?: () => void;
}

export const InvoiceWizard = ({ sourceQuote, existingInvoice, onInvoiceGenerated }: InvoiceWizardProps) => {
  const isStandaloneMode = !sourceQuote && !existingInvoice;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const invoiceBuilder = useInvoiceBuilder(sourceQuote, existingInvoice);
  const { saveInvoice } = useInvoiceStorage();

  // Step definitions
  const steps = isStandaloneMode ? [
    { id: 0, title: 'Client Details', shortTitle: 'Client', icon: User, color: 'blue' },
    { id: 1, title: 'Invoice Items', shortTitle: 'Items', icon: Package, color: 'purple' },
    { id: 2, title: 'Settings', shortTitle: 'Settings', icon: Settings, color: 'amber' },
    { id: 3, title: 'Review & Create', shortTitle: 'Review', icon: Receipt, color: 'green' },
  ] : [
    { id: 0, title: 'Review Quote', shortTitle: 'Quote', icon: FileText, color: 'blue' },
    { id: 1, title: 'Invoice Items', shortTitle: 'Items', icon: Package, color: 'purple' },
    { id: 2, title: 'Settings', shortTitle: 'Settings', icon: Settings, color: 'amber' },
    { id: 3, title: 'Review & Create', shortTitle: 'Review', icon: Receipt, color: 'green' },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setDirection(-1);
      setCurrentStep(stepIndex);
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
      if (onInvoiceGenerated) {
        onInvoiceGenerated();
      } else {
        navigate('/electrician/invoices');
      }
    }
  };

  const handleClientUpdate = (client: Quote['client'], jobDetails: Quote['jobDetails']) => {
    invoiceBuilder.updateClientDetails(client);
    invoiceBuilder.updateJobDetails(jobDetails);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        if (isStandaloneMode) {
          return invoiceBuilder.invoice.client?.name && invoiceBuilder.invoice.client?.email;
        }
        return true; // Quote review step
      case 1:
        const items = invoiceBuilder.invoice.items || [];
        const additionalItems = invoiceBuilder.invoice.additional_invoice_items || [];
        return items.length > 0 || additionalItems.length > 0;
      case 2:
        return true; // Settings step
      case 3:
        return true; // Generation step
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        if (isStandaloneMode) {
          return (
            <InvoiceClientDetailsStep
              initialData={{
                client: invoiceBuilder.invoice.client,
                jobDetails: invoiceBuilder.invoice.jobDetails,
              }}
              onUpdate={handleClientUpdate}
            />
          );
        }
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

  const currentStepData = steps[currentStep];
  const CurrentIcon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark to-black">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-elec-yellow/20 rounded-lg">
                <Receipt className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-ios-headline text-white font-semibold">Invoice</h1>
            </div>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-elec-yellow rounded-full"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => {
                const isComplete = currentStep > index;
                const isActive = currentStep === index;
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    disabled={!isComplete}
                    className={cn(
                      "flex flex-col items-center gap-1 transition-all touch-manipulation",
                      isComplete && "cursor-pointer",
                      !isComplete && !isActive && "opacity-40"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      isComplete && "bg-green-500/20",
                      isActive && "bg-elec-yellow/20 ring-2 ring-elec-yellow/50",
                      !isComplete && !isActive && "bg-white/5"
                    )}>
                      {isComplete ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Icon className={cn(
                          "h-4 w-4",
                          isActive ? "text-elec-yellow" : "text-white/50"
                        )} />
                      )}
                    </div>
                    <span className={cn(
                      "text-ios-caption-2 hidden sm:block",
                      isActive ? "text-elec-yellow font-medium" : "text-white/50"
                    )}>
                      {step.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Step Title Card */}
      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-elec-yellow/10 via-amber-500/5 to-transparent
                     border border-elec-yellow/20 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-elec-yellow/20 rounded-xl">
              <CurrentIcon className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <p className="text-ios-caption-1 text-white/50">Step {currentStep + 1} of {steps.length}</p>
              <h2 className="text-ios-title-3 text-white font-semibold">{currentStepData.title}</h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Step Content with Animation */}
      <main className="px-4 py-6 pb-36 sm:pb-32 max-w-2xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - iOS Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="px-4 py-4 pb-safe max-w-2xl mx-auto">
          {/* Step Dots - Mobile */}
          <div className="flex justify-center gap-2 mb-4 sm:hidden">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentStep === index ? "bg-elec-yellow w-6" : "bg-white/20 w-1.5"
                )}
                animate={{ width: currentStep === index ? 24 : 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "h-14 px-5 border-white/20 text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation",
                currentStep === 0 && "opacity-30"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Primary Action */}
            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !canProceed()}
                className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                           text-white font-semibold text-ios-body active:scale-[0.98] touch-manipulation
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Invoice
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 h-14 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-ios-body
                           active:scale-[0.98] touch-manipulation disabled:opacity-50"
              >
                Continue
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>

          {/* Helper Text */}
          {!canProceed() && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-ios-caption-1 text-amber-400 text-center mt-3"
            >
              {currentStep === 0 && isStandaloneMode && "Enter client name and email to continue"}
              {currentStep === 1 && "Add at least one item to continue"}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};
