import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleFormSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: 'optional' | 'configured';
  badgeText?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export const CollapsibleFormSection = ({
  title,
  subtitle,
  icon,
  badge,
  badgeText,
  defaultOpen = false,
  children,
  className
}: CollapsibleFormSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <div className="border-b border-border/40">
        <CollapsibleTrigger className="w-full py-3 sm:py-4 flex items-center justify-between hover:bg-accent/5 transition-colors touch-manipulation active:scale-[0.99] px-1">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="flex-1 min-w-0 text-left">
              <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
              {subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            {badge && (
              <span className={cn(
                "text-xs px-2 py-1 rounded-md flex-shrink-0 hidden xs:inline-block",
                badge === 'optional' && "bg-muted text-muted-foreground",
                badge === 'configured' && "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              )}>
                {badgeText || (badge === 'optional' ? 'Optional' : '✓ Active')}
              </span>
            )}
          </div>
          <ChevronDown className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-2",
            isOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pb-3 sm:pb-4 pt-1 px-1">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
