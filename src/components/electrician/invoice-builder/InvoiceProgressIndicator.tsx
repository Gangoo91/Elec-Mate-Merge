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
    <div className="space-y-4 mb-6">
      {/* Desktop Step Indicator */}
      <div className="hidden lg:flex items-center justify-between gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="flex items-center gap-2">
              {/* Step Circle */}
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all',
                  index < currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : index === currentStep
                    ? 'border-primary text-primary'
                    : 'border-muted text-muted-foreground'
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-4 h-4" fill={index === currentStep ? 'currentColor' : 'none'} />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'text-sm font-medium truncate transition-colors',
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2 transition-colors',
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
