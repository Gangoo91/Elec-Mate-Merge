import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  iconColor = "text-elec-yellow"
}: StatCardProps) {
  return (
    <Card className="card-hover touch-feedback">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1 sm:space-y-2 min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
            <p className="text-xl sm:text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-xs sm:text-sm font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "p-2 sm:p-3 rounded-xl bg-elec-yellow/10 flex-shrink-0",
            iconColor
          )}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}