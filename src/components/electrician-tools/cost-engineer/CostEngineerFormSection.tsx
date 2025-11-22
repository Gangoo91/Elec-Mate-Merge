import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CostEngineerFormSectionProps {
  children: ReactNode;
  className?: string;
}

export const CostEngineerFormSection = ({ children, className }: CostEngineerFormSectionProps) => {
  return (
    <div className={cn(
      "space-y-3 sm:space-y-4 pb-3 sm:pb-4 border-b border-border/50 last:border-b-0 last:pb-0",
      className
    )}>
      {children}
    </div>
  );
};
