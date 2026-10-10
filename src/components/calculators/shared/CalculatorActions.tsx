import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculatorCategory } from './CalculatorConfig';

const DISABLED =
  'disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white disabled:border disabled:border-white/[0.12]';

interface CalculatorActionsProps {
  category: CalculatorCategory;
  onCalculate: () => void;
  onReset?: () => void;
  isCalculating?: boolean;
  isDisabled?: boolean;
  calculateLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  sticky?: boolean;
  className?: string;
}

export const CalculatorActions = ({
  category,
  onCalculate,
  onReset,
  isCalculating = false,
  isDisabled = false,
  calculateLabel = 'Calculate',
  resetLabel = 'Reset',
  showReset = true,
  sticky = false,
  className,
}: CalculatorActionsProps) => {
  void category;

  const content = (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-3">
        {showReset && onReset && (
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={isCalculating}
            className={cn(
              'h-12 sm:h-14 md:h-14 min-w-0 flex-1 rounded-xl border-white/[0.14]',
              'text-white hover:text-white hover:bg-white/[0.04]',
              'touch-manipulation active:scale-[0.98] transition-all'
            )}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {resetLabel}
          </Button>
        )}
        <Button
          type="button"
          onClick={onCalculate}
          disabled={isDisabled || isCalculating}
          className={cn(
            'h-auto min-h-12 sm:min-h-14 md:h-auto md:min-h-14 min-w-0 flex-[2] whitespace-normal py-2 leading-tight rounded-xl font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90',
            'touch-manipulation active:scale-[0.98] transition-all',
            // Disabled is a neutral surface, not a 40%-opacity volt — that read
            // as a muddy brown slab on every calculator before you had typed.
            DISABLED
          )}
        >
          {isCalculating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="h-4 w-4 mr-2 shrink-0" />
              {calculateLabel}
            </>
          )}
        </Button>
      </div>
    </div>
  );

  if (sticky) {
    return (
      <>
        {/* Spacer */}
        <div className="h-20 sm:hidden" />
        {/* Sticky container for mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-white/[0.06] sm:hidden z-50">
          {content}
        </div>
        {/* Normal layout for desktop */}
        <div className="hidden sm:block pt-2">{content}</div>
      </>
    );
  }

  return content;
};

// Single primary button for calculators
interface CalculateButtonProps {
  category: CalculatorCategory;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  className?: string;
}

export const CalculateButton = ({
  category,
  onClick,
  isLoading = false,
  isDisabled = false,
  label = 'Calculate',
  className,
}: CalculateButtonProps) => {
  void category;

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={cn(
        'w-full h-auto min-h-12 sm:min-h-14 md:h-auto md:min-h-14 whitespace-normal py-2 leading-tight rounded-xl font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90',
        'touch-manipulation active:scale-[0.98] transition-all',
        DISABLED,
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Calculating...
        </>
      ) : (
        <>
          <Calculator className="h-4 w-4 mr-2 shrink-0" />
          {label}
        </>
      )}
    </Button>
  );
};

// Secondary/outline button
interface SecondaryButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const SecondaryButton = ({
  onClick,
  isDisabled = false,
  children,
  className,
}: SecondaryButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'h-12 md:h-12 rounded-xl border-white/[0.14]',
        'text-white hover:text-white hover:bg-white/[0.04]',
        'touch-manipulation active:scale-[0.98] transition-all',
        className
      )}
    >
      {children}
    </Button>
  );
};
