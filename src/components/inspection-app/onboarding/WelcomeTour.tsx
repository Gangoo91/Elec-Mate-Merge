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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-centre justify-between">
            <DialogTitle className="text-2xl">{step.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          <div className="flex justify-centre">
            {step.icon}
          </div>
          
          <DialogDescription className="text-centre text-base">
            {step.description}
          </DialogDescription>

          <div className="flex justify-centre gap-2">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colours ${
                  index === currentStep ? 'bg-yellow-500' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-centre">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {tourSteps.length}
          </span>

          <Button onClick={handleNext}>
            {currentStep === tourSteps.length - 1 ? (
              'Get Started'
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        <div className="text-centre text-xs text-muted-foreground">
          You can revisit this tour anytime from Settings
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
