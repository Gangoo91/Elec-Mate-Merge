import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureTileProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
  badgeVariant?: "default" | "warning" | "info" | "success";
  compact?: boolean;
}

const badgeColors = {
  default: "bg-elec-yellow/20 text-elec-yellow",
  warning: "bg-warning/20 text-warning",
  info: "bg-info/20 text-info",
  success: "bg-success/20 text-success",
};

export function FeatureTile({
  title,
  icon: Icon,
  description,
  onClick,
  className,
  badge,
  badgeVariant = "default",
  compact = false
}: FeatureTileProps) {
  if (compact) {
    return (
      <Card
        className={cn(
          "border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer group touch-feedback transition-all duration-200",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors flex-shrink-0">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-xs sm:text-sm leading-tight group-hover:text-elec-yellow transition-colors">{title}</p>
              {description && (
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer group touch-feedback transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
          </div>
          {badge && (
            <Badge className={cn(badgeColors[badgeVariant], "text-[10px] sm:text-xs")}>
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base group-hover:text-elec-yellow transition-colors">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
