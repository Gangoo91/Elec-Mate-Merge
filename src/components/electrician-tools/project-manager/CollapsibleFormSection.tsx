import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleFormSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleFormSection = ({
  title,
  subtitle,
  badge,
  icon,
  children,
  defaultOpen = false,
}: CollapsibleFormSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 sm:py-4 flex items-center justify-between touch-manipulation min-h-[44px] hover:bg-accent/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-pink-400">{icon}</div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">{title}</h3>
              {badge && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded-md font-medium">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-3 sm:pb-4 px-1 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};
