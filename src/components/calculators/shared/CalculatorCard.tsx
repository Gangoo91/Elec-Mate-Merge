import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CALCULATOR_CONFIG, CalculatorCategory } from "./CalculatorConfig";

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
  className
}: CalculatorCardProps) => {
  const config = CALCULATOR_CONFIG[category];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "calculator-card bg-card border border-white/10 rounded-2xl overflow-hidden",
        className
      )}
      style={{ borderColor: `${config.gradientFrom}15` }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}10)`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: config.gradientFrom }} />
          </div>
          <div className="space-y-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl font-bold">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {title}
              </span>
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-white/60">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

// Section component for grouping inputs within a calculator
interface CalculatorSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const CalculatorSection = ({
  title,
  children,
  className
}: CalculatorSectionProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {title && (
        <h3 className="text-sm font-medium text-white/70">{title}</h3>
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
  className
}: CalculatorInputGridProps) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }[columns];

  return (
    <div className={cn("grid gap-3 sm:gap-4", gridClass, className)}>
      {children}
    </div>
  );
};
