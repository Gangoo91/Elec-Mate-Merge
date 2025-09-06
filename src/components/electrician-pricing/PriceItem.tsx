import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface PriceItemProps {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  isLarge?: boolean;
  badge?: string;
  suppliers?: string[];
  subItems?: Array<{
    id: string | number;
    name: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
  }>;
}

const PriceItem = ({ name, value, change, trend, isLarge = false, badge, suppliers, subItems }: PriceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  if (!subItems || subItems.length === 0) {
    return (
      <div className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${getTrendBg()}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`${isLarge ? 'text-base' : 'text-sm'} font-medium text-foreground truncate`}>
              {name}
            </p>
            {badge && (
              <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow/80">
                {badge}
              </Badge>
            )}
          </div>
          {suppliers && (
            <p className="text-xs text-muted-foreground mt-1">
              {suppliers.slice(0, 2).join(', ')}{suppliers.length > 2 ? ` +${suppliers.length - 2} more` : ''}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <span className={`font-bold ${isLarge ? 'text-lg' : 'text-base'} text-elec-yellow text-right min-w-[80px]`}>
            {value}
          </span>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendBg()} ${getTrendColor()}`}>
            {getTrendIcon()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={`rounded-lg border transition-all duration-200 ${getTrendBg()}`}>
        <CollapsibleTrigger className="w-full">
          <div className={`group flex items-center justify-between p-3 hover:scale-[1.02] hover:shadow-md transition-all duration-200`}>
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`${isLarge ? 'text-base' : 'text-sm'} font-medium text-foreground truncate`}>
                    {name}
                  </p>
                  {badge && (
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow/80">
                      {badge}
                    </Badge>
                  )}
                </div>
                {suppliers && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {suppliers.slice(0, 2).join(', ')}{suppliers.length > 2 ? ` +${suppliers.length - 2} more` : ''}
                  </p>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-yellow" />
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
              <span className={`font-bold ${isLarge ? 'text-lg' : 'text-base'} text-elec-yellow text-right min-w-[80px]`}>
                {value}
              </span>
              
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendBg()} ${getTrendColor()}`}>
                {getTrendIcon()}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-3 pb-3 space-y-2">
            {subItems.map((subItem) => (
              <div key={subItem.id} className="flex items-center justify-between p-2 rounded bg-elec-dark/50 border border-elec-yellow/10">
                <span className="text-sm text-foreground/90">{subItem.name}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-elec-yellow text-right min-w-[60px]">{subItem.value}</span>
                  <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs ${getTrendBg()}`}>
                    {subItem.trend === "up" ? <TrendingUp className="h-2.5 w-2.5" /> : 
                     subItem.trend === "down" ? <TrendingDown className="h-2.5 w-2.5" /> : 
                     <Minus className="h-2.5 w-2.5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default PriceItem;