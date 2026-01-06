import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Camera, FileText, Zap, CheckCircle } from 'lucide-react';

interface WelcomeTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps = [
  {
    title: 'Welcome to ElecMate Inspect',
    description: 'Your intelligent EICR assistant for BS 7671 compliance. Let\'s take a quick tour of the key features.',
    icon: <FileText className="h-12 w-12 text-yellow-500" />,
  },
  {
    title: 'AI Board Scanning',
    description: 'Capture photos of electrical boards and let AI automatically detect circuits, devices, and ratings. Save hours of manual data entry.',
    icon: <Camera className="h-12 w-12 text-blue-500" />,
  },
  {
    title: 'Intelligent Validation',
    description: 'Real-time BS 7671 compliance checking as you work. Get instant feedback on test results, calculations, and observations.',
    icon: <CheckCircle className="h-12 w-12 text-green-500" />,
  },
  {
    title: 'Regulation Search',
    description: 'AI-powered regulation search helps you find relevant BS 7671 clauses instantly. Just describe what you\'re looking for.',
    icon: <Zap className="h-12 w-12 text-purple-500" />,
  }
];

const WelcomeTour: React.FC<WelcomeTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.setPreference('elecmate-tour-completed', true);
    onClose();
  };

  const handleSkip = async () => {
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.setPreference('elecmate-tour-completed', true);
    onClose();
  };

  const step = tourSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl p-0 gap-0 bg-neutral-900 border-white/10 overflow-hidden">
        {/* Header */}
        <div className="relative px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white">{step.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 md:h-9 md:w-9 text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
              {step.icon}
            </div>
          </div>

          <DialogDescription className="text-center text-sm sm:text-base md:text-lg text-gray-300 max-w-md mx-auto">
            {step.description}
          </DialogDescription>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 md:gap-3">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-200 ${
                  index === currentStep ? 'bg-yellow-500 w-6 md:w-8' : 'bg-white/20 w-2 md:w-2.5 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 md:px-8 py-4 md:py-5 border-t border-white/10 bg-white/[0.02]">
          <div className="flex justify-between items-center gap-3">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="h-11 md:h-12 px-4 md:px-5 text-gray-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <span className="text-xs sm:text-sm md:text-base text-gray-500">
              {currentStep + 1} / {tourSteps.length}
            </span>

            <Button
              onClick={handleNext}
              className="h-11 md:h-12 px-5 md:px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold md:text-lg"
            >
              {currentStep === tourSteps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 ml-1" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
            You can revisit this tour anytime from Settings
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
