import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Equal, AlertTriangle } from "lucide-react";

interface PriceComparisonBadgeProps {
  userPrice: number;
  averagePrice: number;
  className?: string;
}

const PriceComparisonBadge = ({
  userPrice,
  averagePrice,
  className
}: PriceComparisonBadgeProps) => {
  const percentDiff = ((userPrice - averagePrice) / averagePrice) * 100;
  const absDiff = Math.abs(percentDiff);

  const getComparisonInfo = () => {
    if (percentDiff < -20) {
      return {
        icon: AlertTriangle,
        label: `${absDiff.toFixed(0)}% below average`,
        sublabel: "You may be underselling",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        iconColor: "text-red-500"
      };
    }
    if (percentDiff < -5) {
      return {
        icon: TrendingDown,
        label: `${absDiff.toFixed(0)}% below average`,
        sublabel: "Competitive pricing",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-400",
        iconColor: "text-yellow-500"
      };
    }
    if (percentDiff <= 5) {
      return {
        icon: Equal,
        label: "At market rate",
        sublabel: "Well-aligned pricing",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
        textColor: "text-green-400",
        iconColor: "text-green-500"
      };
    }
    if (percentDiff <= 20) {
      return {
        icon: TrendingUp,
        label: `${absDiff.toFixed(0)}% above average`,
        sublabel: "Premium pricing",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        iconColor: "text-blue-500"
      };
    }
    return {
      icon: TrendingUp,
      label: `${absDiff.toFixed(0)}% above average`,
      sublabel: "High premium",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      iconColor: "text-purple-500"
    };
  };

  const { icon: Icon, label, sublabel, bgColor, borderColor, textColor, iconColor } = getComparisonInfo();

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border",
      bgColor,
      borderColor,
      className
    )}>
      <div className={cn("p-2 rounded-full", bgColor)}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div>
        <p className={cn("font-semibold", textColor)}>{label}</p>
        <p className="text-xs text-gray-400">{sublabel}</p>
      </div>
    </div>
  );
};

export default PriceComparisonBadge;
