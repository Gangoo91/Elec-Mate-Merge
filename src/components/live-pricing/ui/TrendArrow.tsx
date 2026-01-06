import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendArrowProps {
  value: number; // Percentage change
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const TrendArrow = ({
  value,
  size = "md",
  showValue = true,
  className
}: TrendArrowProps) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn(
      "flex items-center gap-1 font-semibold",
      isPositive && "text-emerald-400",
      isNegative && "text-rose-400",
      isNeutral && "text-white/50",
      className
    )}>
      {isPositive && <TrendingUp className={sizeClasses[size]} />}
      {isNegative && <TrendingDown className={sizeClasses[size]} />}
      {isNeutral && <Minus className={sizeClasses[size]} />}
      {showValue && (
        <span className={cn("font-medium", textSizeClasses[size])}>
          {isPositive && "+"}
          {value.toFixed(1)}%
        </span>
      )}
    </div>
  );
};

export default TrendArrow;
