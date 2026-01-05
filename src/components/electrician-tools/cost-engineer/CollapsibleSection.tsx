import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'optional' | 'configured';
  defaultOpen?: boolean;
  children: ReactNode;
}

export const CollapsibleSection = ({ 
  title, 
  subtitle, 
  badge, 
  badgeVariant = 'optional',
  defaultOpen = false,
  children 
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-accent/50 transition-colors touch-manipulation min-h-[44px]">
          <div className="flex items-center gap-3 flex-1 text-left">
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-foreground transition-transform shrink-0",
                isOpen && "rotate-180"
              )} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
                {badge && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    badgeVariant === 'configured' 
                      ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                      : "bg-muted text-foreground"
                  )}>
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-sm text-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="space-y-4 animate-in fade-in duration-200">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
