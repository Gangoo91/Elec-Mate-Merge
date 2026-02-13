import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2, FileText, Download, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PDFGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfType: 'combined' | 'rams' | 'method';
}

const GENERATION_STEPS = [
  { label: 'Preparing document data', duration: 2000 },
  { label: 'Generating PDF layout', duration: 3000 },
  { label: 'Rendering content', duration: 5000 },
  { label: 'Finalising document', duration: 2000 }
];

const TOTAL_DURATION = GENERATION_STEPS.reduce((sum, step) => sum + step.duration, 0);

export const PDFGenerationModal: React.FC<PDFGenerationModalProps> = ({
  open,
  onOpenChange,
  pdfType
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!open) {
      setCurrentStepIndex(0);
      setProgress(0);
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);

      // Calculate progress
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 95);
      setProgress(newProgress);

      // Determine current step
      let accumulatedTime = 0;
      let stepIndex = 0;
      for (let i = 0; i < GENERATION_STEPS.length; i++) {
        accumulatedTime += GENERATION_STEPS[i].duration;
        if (elapsed < accumulatedTime) {
          stepIndex = i;
          break;
        }
        stepIndex = i;
      }
      setCurrentStepIndex(stepIndex);
    }, 100);

    return () => clearInterval(interval);
  }, [open]);

  const getPDFTypeName = () => {
    switch (pdfType) {
      case 'combined': return 'Combined RAMS';
      case 'rams': return 'RAMS Only';
      case 'method': return 'Method Statement';
      default: return 'PDF';
    }
  };

  const estimatedTimeRemaining = Math.max(0, Math.ceil((TOTAL_DURATION - elapsedTime) / 1000));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <div className="flex flex-col items-center justify-center py-8 px-4 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-primary/10 p-6 rounded-full">
              <FileText className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="text-center space-y-2 w-full">
            <h3 className="text-lg font-semibold">Generating {getPDFTypeName()}</h3>
            <p className="text-sm text-white">
              Please wait whilst we create your professional PDF document
            </p>
          </div>

          <div className="w-full space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-between text-xs text-white">
              <span>{Math.round(progress)}% complete</span>
              <span>~{estimatedTimeRemaining}s remaining</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {GENERATION_STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index === currentStepIndex
                    ? 'bg-primary/10 border border-primary/20'
                    : index < currentStepIndex
                    ? 'bg-muted/50'
                    : 'bg-background'
                }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                ) : index === currentStepIndex ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    index <= currentStepIndex
                      ? 'text-foreground font-medium'
                      : 'text-white'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full pt-4 border-t">
            <div className="flex items-center gap-2 text-xs text-white justify-center">
              <Download className="w-4 h-4" />
              <span>Your download will start automatically when ready</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
