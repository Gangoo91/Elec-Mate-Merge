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
  const colorClasses = {
    primary: "border-l-blue-500 bg-blue-500/20 text-blue-200",
    secondary: "border-l-purple-500 bg-purple-500/20 text-purple-200", 
    "amber-500": "border-l-amber-400 bg-amber-400/20 text-amber-200",
    "green-500": "border-l-green-400 bg-green-400/20 text-green-200",
    "blue-500": "border-l-cyan-400 bg-cyan-400/20 text-cyan-200",
    "purple-500": "border-l-indigo-400 bg-indigo-400/20 text-indigo-200",
    "orange-500": "border-l-orange-400 bg-orange-400/20 text-orange-200",
    "green-600": "border-l-emerald-400 bg-emerald-400/20 text-emerald-200"
  };
  
  const iconColorClasses = {
    primary: "text-blue-400",
    secondary: "text-purple-400", 
    "amber-500": "text-amber-400",
    "green-500": "text-green-400",
    "blue-500": "text-cyan-400",
    "purple-500": "text-indigo-400",
    "orange-500": "text-orange-400",
    "green-600": "text-emerald-400"
  };
  
  const baseClasses = "group w-full transition-all duration-300 cursor-pointer [perspective:1000px]";
  const colorClass = colorClasses[color] || colorClasses.primary;
  const iconColorClass = iconColorClasses[color] || iconColorClasses.primary;
  
  return (
    <CollapsibleTrigger asChild>
      <button className={baseClasses}>
        <div className={`
          flex flex-col gap-2 p-3 sm:p-4 border-l-4 
          ${colorClass}
          transform-gpu transition-all duration-300
          shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.1)]
          active:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(0,0,0,0.3)]
          active:translate-y-0
          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none
          after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:pointer-events-none
          relative overflow-hidden
        `}>
          <div className="flex items-center justify-between w-full relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColorClass}`} />
              <h3 className="font-semibold text-base sm:text-lg text-left">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
              {isComplete && (
                <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-foreground hidden sm:flex">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              )}
              {!isComplete && completionPercentage > 0 && (
                <Badge variant="outline" className="text-xs hidden sm:flex">
                  {completionPercentage}%
                </Badge>
              )}
              <div className="transition-transform duration-200">
                {isOpen ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
            </div>
          </div>
          {!isComplete && completionPercentage > 0 && (
            <Progress value={completionPercentage} className="h-1.5 w-full relative z-10" />
          )}
        </div>
      </button>
    </CollapsibleTrigger>
  );
};