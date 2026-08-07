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

  // The answer panel sits INSIDE the card, so it goes darker rather than
  // brighter — a well is what makes it read as the output rather than more
  // input. It previously used the identical surface to its own parent and to
  // the values nested inside it, so all three levels were the same grey and
  // nothing looked like the result.
  const variantClasses =
    variant === 'warning'
      ? 'border-red-500/30 bg-red-500/[0.06]'
      : 'border-white/[0.10] bg-black/25';

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
        'min-w-0 space-y-1 rounded-xl border border-white/[0.10] bg-white/[0.06] p-3.5 sm:p-4',
        className
      )}
    >
      {/* Wraps rather than truncates. At 10px with 0.18em tracking in a
          half-width cell, "Capacitor needed" rendered as "CAPACITOR…" — a label
          clipped to one word tells you nothing, and a second line costs 12px. */}
      <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.18em] text-white">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5 min-w-0">
        {/* `tabular-nums`, not `font-mono`. Monospace reads as code; money on a
            financial screen wants the page typeface with figures locked to a
            common width so columns line up and a changing value does not make
            the row jump. */}
        <span
          className={cn('min-w-0 break-words font-semibold tabular-nums text-white', sizes.value)}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className={cn('shrink-0 tabular-nums text-white', sizes.unit)}>{unit}</span>}
      </div>
    </div>
  );
};

interface ResultHeadlineProps {
  /** What the number is, e.g. "Minimum hourly rate". */
  label: string;
  /** The answer itself, pre-formatted. */
  value: string;
  /** One line of plain English — what it means, or what to do with it. */
  caption?: string;
  /** Optional secondary figure, e.g. "£468.00 a day". */
  aside?: string;
  /**
   * `negative` renders the figure red. A loss, or an investment that never
   * pays back, must not appear in volt — volt reads as the good answer, and a
   * £-3,000 profit shown in the same colour as a £3,000 one is worse than no
   * colour at all.
   */
  tone?: 'default' | 'negative';
  className?: string;
}

/**
 * The one number the calculator exists to produce.
 *
 * Every result value across the suite was rendered at `size="sm"` — forty of
 * them, none larger — so a results panel was a grid of equally-weighted boxes
 * and nothing in it read as the answer. The user had to work out which figure
 * they had come for.
 *
 * This is deliberately the only place volt appears at display size: one answer,
 * stated once, with the supporting figures kept quiet beneath it.
 */
export const ResultHeadline = ({
  label,
  value,
  caption,
  aside,
  tone = 'default',
  className,
}: ResultHeadlineProps) => (
  <div className={cn('border-b border-white/[0.10] pb-4', className)}>
    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{label}</p>
    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        className={cn(
          'text-[34px] font-semibold leading-none tabular-nums tracking-tight sm:text-[42px]',
          tone === 'negative' ? 'text-red-400' : 'text-elec-yellow'
        )}
      >
        {value}
      </span>
      {aside && <span className="text-[13px] tabular-nums text-white">{aside}</span>}
    </div>
    {caption && <p className="mt-2 text-[12.5px] leading-relaxed text-white">{caption}</p>}
  </div>
);

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
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div className="p-3 sm:p-4 rounded-xl border border-white/[0.10] bg-white/[0.04]">
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
      ? 'border-elec-yellow/40 bg-transparent text-elec-yellow'
      : status === 'fail'
        ? 'border-red-400/40 bg-red-500/[0.10] text-red-300'
        : 'border-white/[0.14] bg-white/[0.06] text-white';

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
