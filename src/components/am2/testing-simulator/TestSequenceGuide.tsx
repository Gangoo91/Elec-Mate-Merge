/**
 * TestSequenceGuide
 *
 * GN3 test sequence step indicator. Shows current step and warns
 * if tests are attempted out of order. Floats top-right.
 */

import { cn } from '@/lib/utils';
import { testSequence } from '@/data/testSequenceData';

interface TestSequenceGuideProps {
  currentStep: number;
  className?: string;
}

export function TestSequenceGuide({ currentStep, className }: TestSequenceGuideProps) {
  const step = testSequence.find((s) => s.step === currentStep);
  const stepLabel = step?.title || 'Ready';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
        'bg-white/[0.06] border border-white/10 backdrop-blur-sm',
        className
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
          currentStep === 0 ? 'bg-white/10 text-white/40' : 'bg-cyan-500/20 text-cyan-400'
        )}
      >
        {currentStep}
      </div>
      <span className="text-[10px] font-medium text-white/60 max-w-[120px] truncate">
        {stepLabel}
      </span>
    </div>
  );
}
