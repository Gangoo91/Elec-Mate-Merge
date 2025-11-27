import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputCardSectionProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const InputCardSection = ({ 
  title, 
  subtitle,
  icon: Icon, 
  badge,
  children,
  defaultOpen = true
}: InputCardSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      <Card className="bg-elec-card border-elec-yellow/20 hover:border-elec-yellow/30 transition-colors">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 sm:p-4 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-elec-yellow">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
                  {badge && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30">
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-elec-yellow transition-transform flex-shrink-0 ml-2",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>
        
        {isOpen && (
          <div className="px-3 pb-3 sm:px-4 sm:pb-4 border-t border-elec-yellow/10">
            <div className="pt-3 sm:pt-4">
              {children}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
