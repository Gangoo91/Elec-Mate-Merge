import { ReactNode, useState } from "react";
import { ChevronDown, BookOpen, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { CALCULATOR_CONFIG, CalculatorCategory } from "./CalculatorConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FormulaStep {
  label: string;
  formula?: string;
  value?: string;
  description?: string;
}

interface CalculatorFormulaProps {
  category: CalculatorCategory;
  steps: FormulaStep[];
  title?: string;
  defaultOpen?: boolean;
  className?: string;
}

export const CalculatorFormula = ({
  category,
  steps,
  title = "Calculation Steps",
  defaultOpen = false,
  className
}: CalculatorFormulaProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = CALCULATOR_CONFIG[category];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger
        className={cn(
          "flex items-center justify-between w-full py-2.5 px-3 rounded-lg",
          "text-sm font-medium text-white/60 hover:text-white/80",
          "hover:bg-white/5 transition-all"
        )}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-2">
        <div
          className="rounded-xl border p-3 space-y-3"
          style={{
            borderColor: `${config.gradientFrom}20`,
            background: `${config.gradientFrom}05`,
          }}
        >
          {steps.map((step, index) => (
            <FormulaStepItem
              key={index}
              step={step}
              stepNumber={index + 1}
              category={category}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface FormulaStepItemProps {
  step: FormulaStep;
  stepNumber: number;
  category: CalculatorCategory;
  isLast?: boolean;
}

const FormulaStepItem = ({
  step,
  stepNumber,
  category,
  isLast = false
}: FormulaStepItemProps) => {
  const config = CALCULATOR_CONFIG[category];

  return (
    <div className={cn("relative", !isLast && "pb-3")}>
      {/* Step connector line */}
      {!isLast && (
        <div
          className="absolute left-3 top-7 bottom-0 w-px"
          style={{ background: `${config.gradientFrom}30` }}
        />
      )}

      <div className="flex gap-3">
        {/* Step number */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
          style={{
            background: `${config.gradientFrom}20`,
            color: config.gradientFrom,
          }}
        >
          {stepNumber}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          {/* Step label */}
          <p className="text-sm font-medium text-white/80">{step.label}</p>

          {/* Formula (code-like display) */}
          {step.formula && (
            <code
              className="block text-xs px-2.5 py-1.5 rounded-lg bg-black/30 text-white/70 font-mono overflow-x-auto"
            >
              {step.formula}
            </code>
          )}

          {/* Calculated value */}
          {step.value && (
            <p className="text-sm font-semibold" style={{ color: config.gradientFrom }}>
              = {step.value}
            </p>
          )}

          {/* Description */}
          {step.description && (
            <p className="text-xs text-white/50">{step.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple inline formula display
interface InlineFormulaProps {
  formula: string;
  className?: string;
}

export const InlineFormula = ({
  formula,
  className
}: InlineFormulaProps) => {
  return (
    <code
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md",
        "bg-white/10 text-white/70 text-xs font-mono",
        className
      )}
    >
      <Hash className="h-3 w-3 opacity-50" />
      {formula}
    </code>
  );
};

// Formula reference card (for showing the main formula)
interface FormulaReferenceProps {
  category: CalculatorCategory;
  name: string;
  formula: string;
  variables?: { symbol: string; description: string }[];
  className?: string;
}

export const FormulaReference = ({
  category,
  name,
  formula,
  variables,
  className
}: FormulaReferenceProps) => {
  const config = CALCULATOR_CONFIG[category];

  return (
    <div
      className={cn(
        "rounded-xl border p-4 space-y-3",
        className
      )}
      style={{
        borderColor: `${config.gradientFrom}20`,
        background: `${config.gradientFrom}05`,
      }}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" style={{ color: config.gradientFrom }} />
        <span className="text-sm font-medium text-white/80">{name}</span>
      </div>

      <div
        className="text-center py-3 px-4 rounded-lg bg-black/30"
      >
        <code className="text-lg sm:text-xl font-mono text-white/90">{formula}</code>
      </div>

      {variables && variables.length > 0 && (
        <div className="grid gap-1.5">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <code
                className="px-1.5 py-0.5 rounded bg-white/10 font-mono"
                style={{ color: config.gradientFrom }}
              >
                {variable.symbol}
              </code>
              <span className="text-white/50">= {variable.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
