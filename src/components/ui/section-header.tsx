import React from 'react';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  color?: "primary" | "secondary" | "amber-500" | "green-500" | "blue-500" | "purple-500" | "orange-500" | "green-600";
  completionPercentage?: number;
  isComplete?: boolean;
}

export const SectionHeader = ({
  title,
  icon: Icon,
  isOpen,
  color = "primary",
  completionPercentage = 0,
  isComplete = false
}: SectionHeaderProps) => {
  // All sections use elec-yellow accent for consistency
  const iconBgClass = "bg-elec-yellow/10";
  const iconColorClass = "text-elec-yellow";

  return (
    <CollapsibleTrigger asChild>
      <button className="group w-full transition-all duration-200 cursor-pointer touch-manipulation">
        <div className="flex items-center justify-between w-full p-4 hover:bg-muted/30 active:scale-[0.995] transition-all duration-150">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${iconBgClass}`}>
              <Icon className={`h-5 w-5 ${iconColorClass}`} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-base text-foreground">{title}</h3>
              {!isComplete && completionPercentage > 0 && (
                <p className="text-xs text-muted-foreground">{completionPercentage}% complete</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isComplete && (
              <Badge variant="default" className="bg-green-600/20 text-green-400 border-green-600/30 hidden sm:flex">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
        {!isComplete && completionPercentage > 0 && (
          <div className="px-4 pb-2">
            <Progress value={completionPercentage} className="h-1 w-full" />
          </div>
        )}
      </button>
    </CollapsibleTrigger>
  );
};