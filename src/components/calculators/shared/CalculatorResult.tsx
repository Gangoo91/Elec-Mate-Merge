import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculatorCategory } from './CalculatorConfig';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CalculatorResultProps {
  category: CalculatorCategory;
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info';
  className?: string;
}

export const CalculatorResult = ({
  category,
  children,
  variant = 'success',
  className,
}: CalculatorResultProps) => {
  void category;

  const variantClasses =
    variant === 'warning'
      ? 'border-red-500/30 bg-red-500/[0.04]'
      : 'border-white/[0.06] bg-white/[0.02]';

  return (
    <div className={cn('rounded-xl p-4 sm:p-5 border animate-fade-in', variantClasses, className)}>
      <div className="space-y-3 min-w-0">{children}</div>
    </div>
  );
};

interface ResultValueProps {
  label: string;
  value: string | number;
  unit?: string;
  category: CalculatorCategory;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ResultValue = ({
  label,
  value,
  unit,
  category,
  size = 'md',
  className,
}: ResultValueProps) => {
  void category;

  const sizeClasses = {
    sm: { value: 'text-[18px] sm:text-[20px]', unit: 'text-[12px]' },
    md: { value: 'text-[24px] sm:text-[28px]', unit: 'text-[14px]' },
    lg: { value: 'text-[28px] sm:text-[32px]', unit: 'text-[15px]' },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'rounded-xl p-3.5 sm:p-4 bg-white/[0.02] border border-white/[0.06] min-w-0 space-y-1',
        className
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5 min-w-0">
        <span className={cn('font-mono font-semibold text-white break-words min-w-0', sizes.value)}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className={cn('text-white/55 font-mono shrink-0', sizes.unit)}>{unit}</span>
        )}
      </div>
    </div>
  );
};

interface ResultsGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ResultsGrid = ({ children, columns = 2, className }: ResultsGridProps) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }[columns];

  return <div className={cn('grid gap-3', gridClass, className)}>{children}</div>;
};

interface ResultDetailsProps {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  category: CalculatorCategory;
  className?: string;
}

export const ResultDetails = ({
  title = 'Calculation details',
  children,
  defaultOpen = false,
  category,
  className,
}: ResultDetailsProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  void category;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 touch-manipulation">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {title}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-white/55 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface ResultBadgeProps {
  status: 'pass' | 'fail' | 'warning' | 'info';
  label: string;
  className?: string;
}

export const ResultBadge = ({ status, label, className }: ResultBadgeProps) => {
  const statusClasses =
    status === 'pass'
      ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
      : status === 'fail'
        ? 'border-red-500/30 bg-red-500/[0.06] text-red-300'
        : 'border-white/[0.08] bg-white/[0.03] text-white/85';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border',
        statusClasses,
        className
      )}
    >
      {label}
    </span>
  );
};
