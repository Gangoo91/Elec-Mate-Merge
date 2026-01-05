import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
}

export function SectionHeader({ title, description, className, action, icon: Icon, iconColor = "text-elec-yellow" }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={cn("p-2 rounded-xl bg-elec-yellow/10 shrink-0 hidden sm:flex")}>
            <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
          </div>
        )}
        <div className="space-y-0.5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 self-start">{action}</div>}
    </div>
  );
}
