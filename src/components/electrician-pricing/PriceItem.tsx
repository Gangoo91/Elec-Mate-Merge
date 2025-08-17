import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PriceItemProps {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  isLarge?: boolean;
}

const PriceItem = ({ name, value, change, trend, isLarge = false }: PriceItemProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-emerald-400";
      case "down": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3" />;
      case "down": return <TrendingDown className="h-3 w-3" />;
      default: return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendBg = () => {
    switch (trend) {
      case "up": return "bg-emerald-500/10 border-emerald-500/20";
      case "down": return "bg-red-500/10 border-red-500/20";
      default: return "bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <div className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${getTrendBg()}`}>
      <div className="flex-1 min-w-0">
        <p className={`${isLarge ? 'text-base' : 'text-sm'} font-medium text-foreground truncate`}>
          {name}
        </p>
      </div>
      
      <div className="flex items-center gap-3 ml-3">
        <span className={`font-bold ${isLarge ? 'text-lg' : 'text-base'} text-elec-yellow`}>
          {value}
        </span>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendBg()} ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-xs font-medium">
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceItem;