import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CollegeFeatureTileProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
  badgeVariant?: "default" | "warning" | "info" | "success";
  compact?: boolean;
  disabled?: boolean;
}

const badgeColors = {
  default: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  info: "bg-info/20 text-info border-info/30",
  success: "bg-success/20 text-success border-success/30",
};

const iconBgColors = {
  default: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5",
  warning: "bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5",
  info: "bg-gradient-to-br from-info/20 to-info/5 border border-info/20 shadow-lg shadow-info/5",
  success: "bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5",
};

export function CollegeFeatureTile({
  title,
  icon: Icon,
  description,
  onClick,
  className,
  badge,
  badgeVariant = "default",
  compact = false,
  disabled = false
}: CollegeFeatureTileProps) {
  if (compact) {
    return (
      <Card
        className={cn(
          "backdrop-blur-xl bg-elec-dark/60 border-white/10",
          "hover:bg-elec-dark/80 hover:border-elec-yellow/30",
          "cursor-pointer group touch-feedback",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:shadow-elec-yellow/10",
          "hover:-translate-y-0.5",
          disabled && "opacity-50 cursor-not-allowed hover:bg-elec-dark/60 hover:translate-y-0",
          className
        )}
        onClick={disabled ? undefined : onClick}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={cn(
              "p-1.5 sm:p-2 rounded-xl transition-all duration-300 flex-shrink-0",
              iconBgColors[badgeVariant],
              "group-hover:scale-110"
            )}>
              <Icon className={cn(
                "h-4 w-4 sm:h-5 sm:w-5",
                badgeVariant === "default" && "text-elec-yellow",
                badgeVariant === "warning" && "text-warning",
                badgeVariant === "info" && "text-info",
                badgeVariant === "success" && "text-success"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white/90 text-xs sm:text-sm leading-tight group-hover:text-white transition-colors">{title}</p>
              {description && (
                <p className="text-[10px] sm:text-xs text-white/50 truncate">{description}</p>
              )}
            </div>
            {badge && (
              <Badge className={cn(badgeColors[badgeVariant], "text-[10px] sm:text-xs shrink-0 border")}>
                {badge}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "backdrop-blur-xl bg-elec-dark/60 border-white/10",
        "hover:bg-elec-dark/80 hover:border-elec-yellow/30",
        "cursor-pointer group touch-feedback",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:shadow-elec-yellow/10",
        "hover:-translate-y-1",
        disabled && "opacity-50 cursor-not-allowed hover:bg-elec-dark/60 hover:translate-y-0",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className={cn(
            "p-2 sm:p-3 rounded-xl transition-all duration-300",
            iconBgColors[badgeVariant],
            "group-hover:scale-110"
          )}>
            <Icon className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              badgeVariant === "default" && "text-elec-yellow",
              badgeVariant === "warning" && "text-warning",
              badgeVariant === "info" && "text-info",
              badgeVariant === "success" && "text-success"
            )} />
          </div>
          {badge && (
            <Badge className={cn(badgeColors[badgeVariant], "text-[10px] sm:text-xs border")}>
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base group-hover:text-elec-yellow transition-colors">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-white/60 line-clamp-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
