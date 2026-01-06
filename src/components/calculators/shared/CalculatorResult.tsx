import { ReactNode } from "react";
import { CheckCircle, AlertTriangle, Info, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CALCULATOR_CONFIG, CalculatorCategory } from "./CalculatorConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

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
  className
}: CalculatorResultProps) => {
  const config = CALCULATOR_CONFIG[category];

  const variantStyles = {
    success: {
      border: `${config.gradientFrom}30`,
      bg: `${config.gradientFrom}08`,
      icon: CheckCircle,
      iconColor: config.gradientFrom,
    },
    warning: {
      border: '#f59e0b30',
      bg: '#f59e0b08',
      icon: AlertTriangle,
      iconColor: '#f59e0b',
    },
    info: {
      border: '#60a5fa30',
      bg: '#60a5fa08',
      icon: Info,
      iconColor: '#60a5fa',
    },
  };

  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "calculator-result rounded-xl p-4 border animate-fade-in",
        className
      )}
      style={{
        borderColor: styles.border,
        background: styles.bg,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="h-5 w-5 mt-0.5 shrink-0"
          style={{ color: styles.iconColor }}
        />
        <div className="flex-1 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

// Result value component for displaying calculated values
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
  className
}: ResultValueProps) => {
  const config = CALCULATOR_CONFIG[category];

  const sizeClasses = {
    sm: { label: 'text-xs', value: 'text-lg', unit: 'text-xs' },
    md: { label: 'text-sm', value: 'text-2xl', unit: 'text-sm' },
    lg: { label: 'text-base', value: 'text-3xl', unit: 'text-base' },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn("space-y-0.5", className)}>
      <p className={cn("text-white/60 font-medium", sizes.label)}>{label}</p>
      <div className="flex items-baseline gap-2">
        <span
          className={cn("font-bold bg-clip-text text-transparent", sizes.value)}
          style={{
            backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className={cn("text-white/50 font-medium", sizes.unit)}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

// Grid for multiple result values
interface ResultsGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ResultsGrid = ({
  children,
  columns = 2,
  className
}: ResultsGridProps) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-4", gridClass, className)}>
      {children}
    </div>
  );
};

// Collapsible section for additional details
interface ResultDetailsProps {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  category: CalculatorCategory;
  className?: string;
}

export const ResultDetails = ({
  title = "Calculation Details",
  children,
  defaultOpen = false,
  category,
  className
}: ResultDetailsProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = CALCULATOR_CONFIG[category];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-white/60 hover:text-white/80 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div
          className="p-3 rounded-lg border"
          style={{
            borderColor: `${config.gradientFrom}20`,
            background: `${config.gradientFrom}05`,
          }}
        >
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Status badge for results
interface ResultBadgeProps {
  status: 'pass' | 'fail' | 'warning' | 'info';
  label: string;
  className?: string;
}

export const ResultBadge = ({
  status,
  label,
  className
}: ResultBadgeProps) => {
  const statusStyles = {
    pass: 'bg-green-500/20 text-green-400 border-green-500/30',
    fail: 'bg-red-500/20 text-red-400 border-red-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
        statusStyles[status],
        className
      )}
    >
      {label}
    </span>
  );
};
