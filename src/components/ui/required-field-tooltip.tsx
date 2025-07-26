import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RequiredFieldTooltipProps {
  content: string;
  className?: string;
}

export function RequiredFieldTooltip({ content, className = "" }: RequiredFieldTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={`h-4 w-4 text-elec-yellow/70 hover:text-elec-yellow cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3 bg-elec-card border-elec-yellow/30">
          <p className="text-sm text-elec-light">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}