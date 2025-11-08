import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CostStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const CostStatCard = ({ icon: Icon, label, value, subtitle, iconColor = 'text-elec-yellow', trend }: CostStatCardProps) => {
  return (
    <Card className="mobile-card border-elec-yellow/20 bg-elec-card/50 hover:border-elec-yellow/40 transition-all hover:scale-[1.02]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconColor === 'text-green-500' ? 'from-green-500/20 to-green-600/20' : iconColor === 'text-blue-500' ? 'from-blue-500/20 to-blue-600/20' : 'from-elec-yellow/20 to-elec-yellow/10'} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          {trend && (
            <div className={`text-xs font-semibold ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-elec-light'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'}
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="mobile-small-text text-elec-light uppercase tracking-wider font-semibold">
            {label}
          </p>
          <p className="text-3xl sm:text-3xl font-bold text-foreground tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="mobile-small-text text-elec-light font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostStatCard;
