import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResultsHeroCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  secondaryBadge?: {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  children?: React.ReactNode;
  className?: string;
}

const badgeStyles = {
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

/**
 * ResultsHeroCard - Premium glassmorphism hero section for AI tool results
 *
 * Features:
 * - Glassmorphism with gradient overlay
 * - Animated icon container
 * - Confidence/status badges
 * - Optional children for "What is this?" section
 */
export function ResultsHeroCard({
  icon: Icon,
  title,
  subtitle,
  badge,
  secondaryBadge,
  children,
  className,
}: ResultsHeroCardProps) {
  return (
    <div
      className={cn(
        // Glassmorphism container
        "relative overflow-hidden rounded-2xl",
        "border border-elec-yellow/20",
        "bg-gradient-to-br from-card via-card/95 to-card/90",
        "backdrop-blur-xl",
        "shadow-xl shadow-black/5",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.03] via-transparent to-elec-blue/[0.02] pointer-events-none" />

      {/* Content */}
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon container with glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-elec-yellow/20 rounded-xl blur-xl" />
            <div className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30">
              <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
            </div>
          </div>

          {/* Title and badges */}
          <div className="flex-1 min-w-0 space-y-2">
            {subtitle && (
              <Badge variant="outline" className="text-xs font-medium text-muted-foreground border-border/50">
                {subtitle}
              </Badge>
            )}

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {title}
            </h1>

            {/* Badges row */}
            {(badge || secondaryBadge) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {badge && (
                  <Badge className={cn("text-sm px-3 py-1 font-semibold", badgeStyles[badge.variant])}>
                    {badge.label}
                  </Badge>
                )}
                {secondaryBadge && (
                  <Badge className={cn("text-sm px-3 py-1", badgeStyles[secondaryBadge.variant])}>
                    {secondaryBadge.label}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Optional children (e.g., "What is this?" explanation) */}
        {children && (
          <div className="mt-5 p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsHeroCard;
