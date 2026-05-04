import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CALCULATOR_CONFIG, CalculatorCategory } from './CalculatorConfig';

interface CalculatorCardProps {
  category: CalculatorCategory;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

// Fallback when an unknown category is passed at runtime (e.g. legacy
// saved state, typo, future category not yet added). Sentry issue 8T:
// `undefined is not an object (evaluating 'a.gradientFrom')` was caused by
// `config = CALCULATOR_CONFIG[category]` returning undefined and the next
// line `config.icon` throwing. The TS type says CalculatorCategory but
// runtime will accept any string.
const FALLBACK_CATEGORY: CalculatorCategory = 'power';

export const CalculatorCard = ({
  category,
  title,
  description,
  children,
  className,
}: CalculatorCardProps) => {
  // Resolve category for fallback safety; chrome stays neutral regardless.
  const _config = CALCULATOR_CONFIG[category] ?? CALCULATOR_CONFIG[FALLBACK_CATEGORY];
  void _config;

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden',
        className
      )}
    >
      <div className="px-4 sm:px-6 pt-5 pb-4 space-y-1">
        <h2 className="text-[18px] sm:text-[20px] font-medium text-white leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[13px] text-white/70 leading-relaxed">{description}</p>
        )}
      </div>

      <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-4">{children}</div>
    </div>
  );
};

// Section divider — subtle gradient line between major sections
interface CalculatorDividerProps {
  category: CalculatorCategory;
  className?: string;
}

export const CalculatorDivider = ({ category, className }: CalculatorDividerProps) => {
  void category;
  return <div className={cn('h-px w-full my-1 bg-white/[0.06]', className)} />;
};

// Section component for grouping inputs within a calculator
interface CalculatorSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const CalculatorSection = ({ title, children, className }: CalculatorSectionProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

// Input grid for multiple inputs in a row
interface CalculatorInputGridProps {
  columns?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}

export const CalculatorInputGrid = ({
  columns = 2,
  children,
  className,
}: CalculatorInputGridProps) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return <div className={cn('grid gap-3 sm:gap-4', gridClass, className)}>{children}</div>;
};
