import { ReactNode } from 'react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';
import { CALCULATOR_CONFIG, CalculatorCategory } from './CalculatorConfig';
import { CalculatorSurfaceContext, useCalculatorSurface } from './calculatorSurface';

interface CalculatorCardProps {
  category: CalculatorCategory;
  title: string;
  description?: string;
  /** Short qualifier shown beside the title, e.g. "2025 Data". */
  badge?: string;
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

/** Marks its subtree as the public tool surface (edge-to-edge on mobile). */
export const CalculatorSurface = ({
  edgeToEdge = true,
  children,
}: {
  edgeToEdge?: boolean;
  children: ReactNode;
}) => (
  <CalculatorSurfaceContext.Provider value={{ edgeToEdge }}>
    {children}
  </CalculatorSurfaceContext.Provider>
);

export const CalculatorCard = ({
  category,
  title,
  description,
  badge,
  children,
  className,
}: CalculatorCardProps) => {
  // Resolve category for fallback safety; chrome stays neutral regardless.
  const _config = CALCULATOR_CONFIG[category] ?? CALCULATOR_CONFIG[FALLBACK_CATEGORY];
  void _config;
  const { edgeToEdge } = useCalculatorSurface();

  return (
    // Brightness matches `card-recipe`: a /[0.18] border over a /[0.12]→/[0.06]
    // gradient. This card sat at a /[0.06] border over /[0.02] — about a third
    // of that — which looks fine on a desktop monitor and disappears on a phone
    // in daylight, which is where an electrician actually uses it. The gradient
    // also gives the card a top edge, so nested surfaces below can sit darker
    // and produce real hierarchy instead of three identical greys.
    <div
      className={cn(
        'overflow-hidden border border-white/[0.18]',
        CARD_SURFACE,
        edgeToEdge
          ? '-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x'
          : 'rounded-2xl',
        className
      )}
    >
      <div className="px-4 sm:px-6 pt-5 pb-4 space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h2 className="text-[18px] sm:text-[20px] font-medium text-white leading-tight">
            {title}
          </h2>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-[13px] text-white leading-relaxed">{description}</p>}
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
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{title}</h3>
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
