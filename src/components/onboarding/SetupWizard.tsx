import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BankDetailsStep } from './steps/BankDetailsStep';
import { BrandingStep } from './steps/BrandingStep';
import { CompanyNameStep } from './steps/CompanyNameStep';
import { ContactDetailsStep } from './steps/ContactDetailsStep';
import { useSetupWizard } from '@/hooks/useSetupWizard';
import { useMediaQuery } from '@/hooks/use-media-query';

interface SetupWizardProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const STEPS = [
  { id: 'company', title: 'Company', component: CompanyNameStep },
  { id: 'contact', title: 'Contact', component: ContactDetailsStep },
  { id: 'banking', title: 'Banking', component: BankDetailsStep },
  { id: 'branding', title: 'Branding', component: BrandingStep },
];

export function SetupWizard({ isOpen, onComplete, onSkip }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { saveData, completeOnboarding, isLoading } = useSetupWizard();
  const isMobile = useMediaQuery('(max-width: 640px)');

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

  const handleNext = async () => {
    try {
      await saveData(formData);
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = async () => {
    try {
      await completeOnboarding();
      onSkip();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await saveData(formData);
      await completeOnboarding();
      onComplete();
    } catch (error) {
      console.error('Failed to complete setup:', error);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const wizardContent = (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] px-6 pb-7 pt-8 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.08),transparent_60%)] blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem]">
            Welcome to <span className="text-yellow-400">Elec-Mate.</span>
          </h2>
          <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
            Four quick steps so your certificates, quotes and invoices are ready to send.
          </p>

          {/* Progress bar — matches SignUp StepBar */}
          <div className="mt-7">
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex-1">
                  <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.10]">
                    <motion.div
                      className="h-full rounded-full bg-yellow-400"
                      initial={false}
                      animate={{
                        width: i < currentStep ? '100%' : i === currentStep ? '50%' : '0%',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                  <span
                    className={`mt-2 block text-center text-[12px] font-medium transition-colors sm:text-[13px] ${
                      i === currentStep ? 'text-yellow-400' : 'text-white'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentStepComponent formData={formData} onChange={setFormData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] bg-black/40 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep || isLoading}
            className="h-11 touch-manipulation rounded-xl px-3 text-[14px] font-medium text-white hover:bg-white/[0.06] hover:text-yellow-400 disabled:opacity-30"
          >
            Back
          </Button>

          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isLoading}
            className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-medium text-white hover:bg-white/[0.06] hover:text-yellow-400 disabled:opacity-30"
          >
            Skip for now
          </Button>

          <Button
            onClick={isLastStep ? handleComplete : handleNext}
            disabled={isLoading}
            className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-semibold text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : isLastStep ? (
              'Finish setup'
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={() => {}}>
        <SheetContent
          side="bottom"
          className="h-[92vh] overflow-hidden rounded-t-[2rem] border-white/[0.08] p-0"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <VisuallyHidden>
            <DialogTitle>Welcome to Elec-Mate — quick setup</DialogTitle>
            <DialogDescription>
              Four quick steps so your certificates, quotes and invoices are ready to send.
            </DialogDescription>
          </VisuallyHidden>
          {wizardContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: centered dialog
  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent
        className="w-full max-w-xl overflow-hidden rounded-[2rem] border-white/[0.08] bg-[#0a0a0a] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.6)] sm:max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>Welcome to Elec-Mate — quick setup</DialogTitle>
          <DialogDescription>
            Four quick steps so your certificates, quotes and invoices are ready to send.
          </DialogDescription>
        </VisuallyHidden>
        {wizardContent}
      </DialogContent>
    </Dialog>
  );
}
