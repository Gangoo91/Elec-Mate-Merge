import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepProgress } from './StepProgress';
import { CompanyNameStep } from './steps/CompanyNameStep';
import { ContactDetailsStep } from './steps/ContactDetailsStep';
import { BankDetailsStep } from './steps/BankDetailsStep';
import { BrandingStep } from './steps/BrandingStep';
import { useSetupWizard } from '@/hooks/useSetupWizard';

interface SetupWizardProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function SetupWizard({ isOpen, onComplete, onSkip }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { saveData, completeOnboarding, isLoading } = useSetupWizard();

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    sortCode: '',
    paymentTerms: '30 days',
    logoFile: null as File | null,
    primaryColor: '#FFDB58',
    accentColor: '#1F2937',
  });

  const steps = [
    { id: 'company', title: 'Company Name', component: CompanyNameStep },
    { id: 'contact', title: 'Contact Info', component: ContactDetailsStep },
    { id: 'banking', title: 'Bank Details', component: BankDetailsStep },
    { id: 'branding', title: 'Branding', component: BrandingStep },
  ];

  const handleNext = async () => {
    // Auto-save current step data
    try {
      await saveData(formData);
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSkip = async () => {
    // Mark as completed even if skipped
    try {
      await completeOnboarding();
      onSkip();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const handleComplete = async () => {
    // Save final step and mark onboarding complete
    try {
      await saveData(formData);
      await completeOnboarding();
      onComplete();
    } catch (error) {
      console.error('Failed to complete setup:', error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent
        className="max-w-2xl w-full h-screen sm:h-auto sm:max-h-[90vh] p-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col h-full">
          {/* Header with Progress */}
          <div className="p-6 border-b border-border/30">
            <h2 className="text-2xl font-bold mb-4">Welcome to ElecMate!</h2>
            <StepProgress current={currentStep} total={steps.length} />
          </div>

          {/* Step Content with Animation */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CurrentStepComponent
                  formData={formData}
                  onChange={setFormData}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="p-6 border-t border-border/30 bg-card/50">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isFirstStep || isLoading}
                className="flex items-center gap-2 h-11 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={isLoading}
                className="text-muted-foreground hover:text-foreground h-11 touch-manipulation"
              >
                Skip for now
              </Button>

              <Button
                onClick={isLastStep ? handleComplete : handleNext}
                disabled={isLoading}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold flex items-center gap-2 h-11 px-6 touch-manipulation"
              >
                {isLastStep ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Complete Setup
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
