import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CALCULATOR_CONFIG, CalculatorCategory } from "./CalculatorConfig";

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
  calculateLabel = "Calculate",
  resetLabel = "Reset",
  showReset = true,
  sticky = false,
  className
}: CalculatorActionsProps) => {
  const config = CALCULATOR_CONFIG[category];

  const content = (
    <div className={cn("flex gap-3", className)}>
      {showReset && onReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isCalculating}
          className={cn(
            "h-12 sm:h-14 flex-1 rounded-xl border-white/10",
            "text-white/70 hover:text-white hover:bg-white/5",
            "touch-manipulation active:scale-[0.98] transition-all"
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
          "h-12 sm:h-14 flex-[2] rounded-xl font-semibold",
          "touch-manipulation active:scale-[0.98] transition-all",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        style={{
          background: isDisabled || isCalculating
            ? 'rgba(255,255,255,0.1)'
            : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
          color: isDisabled || isCalculating ? 'rgba(255,255,255,0.5)' : '#000',
        }}
      >
        {isCalculating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            <Calculator className="h-4 w-4 mr-2" />
            {calculateLabel}
          </>
        )}
      </Button>
    </div>
  );

  if (sticky) {
    return (
      <>
        {/* Spacer */}
        <div className="h-20 sm:hidden" />
        {/* Sticky container for mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-white/10 sm:hidden z-50">
          {content}
        </div>
        {/* Normal layout for desktop */}
        <div className="hidden sm:block pt-2">
          {content}
        </div>
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
  label = "Calculate",
  className
}: CalculateButtonProps) => {
  const config = CALCULATOR_CONFIG[category];

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={cn(
        "w-full h-12 sm:h-14 rounded-xl font-semibold",
        "touch-manipulation active:scale-[0.98] transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{
        background: isDisabled || isLoading
          ? 'rgba(255,255,255,0.1)'
          : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
        color: isDisabled || isLoading ? 'rgba(255,255,255,0.5)' : '#000',
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Calculating...
        </>
      ) : (
        <>
          <Calculator className="h-4 w-4 mr-2" />
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
  className
}: SecondaryButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "h-12 rounded-xl border-white/10",
        "text-white/70 hover:text-white hover:bg-white/5",
        "touch-manipulation active:scale-[0.98] transition-all",
        className
      )}
    >
      {children}
    </Button>
  );
};
