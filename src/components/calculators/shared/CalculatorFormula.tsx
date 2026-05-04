import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculatorCategory } from './CalculatorConfig';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  title = 'Calculation steps',
  defaultOpen = false,
  className,
}: CalculatorFormulaProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  void category;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger
        className={cn(
          'flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg',
          'hover:bg-white/[0.04] transition-colors touch-manipulation'
        )}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/55 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          {steps.map((step, index) => (
            <FormulaStepItem
              key={index}
              step={step}
              stepNumber={index + 1}
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
  isLast?: boolean;
}

const FormulaStepItem = ({ step, stepNumber, isLast = false }: FormulaStepItemProps) => {
  return (
    <div className={cn('relative', !isLast && 'pb-3')}>
      {!isLast && <div className="absolute left-3 top-7 bottom-0 w-px bg-white/[0.06]" />}

      <div className="flex gap-3">
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-mono bg-white/[0.04] text-white/85">
          {stepNumber}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="text-[14px] font-medium text-white">{step.label}</p>

          {step.formula && (
            <code className="block text-[12px] px-2.5 py-1.5 rounded-lg bg-black/30 text-white/85 font-mono overflow-x-auto">
              {step.formula}
            </code>
          )}

          {step.value && (
            <p className="text-[14px] font-mono font-semibold text-elec-yellow">= {step.value}</p>
          )}

          {step.description && (
            <p className="text-[12px] text-white/70 leading-relaxed">{step.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface InlineFormulaProps {
  formula: string;
  className?: string;
}

export const InlineFormula = ({ formula, className }: InlineFormulaProps) => {
  return (
    <code
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md',
        'bg-white/[0.04] text-white/85 text-[12px] font-mono',
        className
      )}
    >
      {formula}
    </code>
  );
};

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
  className,
}: FormulaReferenceProps) => {
  void category;

  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3',
        className
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {name}
      </span>

      <div className="text-center py-3 px-4 rounded-lg bg-black/30">
        <code className="text-[18px] sm:text-[20px] font-mono text-white">{formula}</code>
      </div>

      {variables && variables.length > 0 && (
        <div className="grid gap-1.5">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-baseline gap-2 text-[13px]">
              <code className="px-1.5 py-0.5 rounded bg-white/[0.04] font-mono text-white">
                {variable.symbol}
              </code>
              <span className="text-white/70">= {variable.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
