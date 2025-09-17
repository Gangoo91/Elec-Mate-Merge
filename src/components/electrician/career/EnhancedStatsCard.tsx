import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EnhancedStatsCardProps {
  value: string | number;
  label: string;
  subtitle: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const EnhancedStatsCard = ({ 
  value, 
  label, 
  subtitle, 
  icon, 
  trend = "neutral",
  className 
}: EnhancedStatsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-white/70";
    }
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/5",
      className
    )}>
      <CardContent className="p-4 text-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-50" />
        
        {/* Content */}
        <div className="relative z-10">
          {icon && (
            <div className="flex justify-center mb-2 opacity-60">
              {icon}
            </div>
          )}
          <div className="text-2xl font-bold text-elec-yellow mb-1">
            {value}
          </div>
          <div className="text-sm text-white font-medium">
            {label}
          </div>
          <div className={cn("text-xs mt-1", getTrendColor())}>
            {subtitle}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedStatsCard;