import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvoiceProgressIndicatorProps {
  currentStep: number;
  steps: Array<{ title: string; description: string }>;
}

export const InvoiceProgressIndicator = ({
  currentStep,
  steps,
}: InvoiceProgressIndicatorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      {/* Mobile & Desktop Step Indicator */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 min-w-max px-2 sm:px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {/* Step Circle & Info */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[140px]">
              {/* Step Circle */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all',
                  index < currentStep
                    ? 'bg-elec-yellow border-elec-yellow text-black'
                    : index === currentStep
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-muted bg-background text-muted-foreground'
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Circle 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill={index === currentStep ? 'currentColor' : 'none'} 
                  />
                )}
              </div>

              {/* Step Info */}
              <div className="text-center">
                <p
                  className={cn(
                    'text-xs sm:text-sm font-medium transition-colors line-clamp-2',
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-2 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 sm:w-16 md:w-24 mx-1 sm:mx-2 flex-shrink-0 transition-colors',
                  index < currentStep ? 'bg-elec-yellow' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
