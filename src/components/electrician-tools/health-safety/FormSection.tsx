import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ children, className }: FormSectionProps) => {
  return (
    <div className={cn("py-3 sm:py-4 border-b border-border/40 last:border-0", className)}>
      {children}
    </div>
  );
};