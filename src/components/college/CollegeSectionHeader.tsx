import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CollegeSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
}

export function CollegeSectionHeader({ title, description, className, action }: CollegeSectionHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      "pb-4 border-b border-white/10",
      className
    )}>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
        </div>
        {description && (
          <p className="text-sm text-white/60 ml-4">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
