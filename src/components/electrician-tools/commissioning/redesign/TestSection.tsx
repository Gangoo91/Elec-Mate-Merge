import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TestSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  variant: "visual" | "dead" | "live";
  children: ReactNode;
}

export const TestSection = ({ 
  title, 
  icon, 
  count,
  variant, 
  children 
}: TestSectionProps) => {
  const gradientClasses = {
    visual: "from-purple-500/20 via-purple-500/5 to-transparent",
    dead: "from-red-500/20 via-red-500/5 to-transparent",
    live: "from-yellow-500/20 via-yellow-500/5 to-transparent"
  };

  const iconClasses = {
    visual: "text-purple-400",
    dead: "text-red-400",
    live: "text-yellow-400"
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className={cn(
        "bg-gradient-to-r rounded-xl p-6 border-2",
        gradientClasses[variant],
        variant === "visual" && "border-purple-500/30",
        variant === "dead" && "border-red-500/30",
        variant === "live" && "border-yellow-500/30"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("text-3xl", iconClasses[variant])}>
              {icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {count} {count === 1 ? 'item' : 'items'} to complete
              </p>
            </div>
          </div>
          <div className={cn(
            "text-4xl font-bold",
            iconClasses[variant]
          )}>
            {count}
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
