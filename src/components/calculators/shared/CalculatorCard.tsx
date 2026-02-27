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

export const CalculatorCard = ({
  category,
  title,
  description,
  children,
  className,
}: CalculatorCardProps) => {
  const config = CALCULATOR_CONFIG[category];
  const Icon = config.icon;

  return (
    <div className={cn('relative rounded-2xl overflow-hidden bg-card', className)}>
      {/* Top accent gradient line */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
        }}
      />

      {/* Header */}
      <div className="px-4 sm:px-6 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}10)`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: config.gradientFrom }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
            {description && <p className="text-sm text-white mt-0.5">{description}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
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
  const config = CALCULATOR_CONFIG[category];

  return (
    <div
      className={cn('h-px w-full my-1', className)}
      style={{
        background: `linear-gradient(90deg, transparent, ${config.gradientFrom}40, transparent)`,
      }}
    />
  );
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
      {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
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
