import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface RequiredFieldTooltipProps {
  content: string;
  className?: string;
}

export function RequiredFieldTooltip({ content, className = '' }: RequiredFieldTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] -my-3 touch-manipulation active:scale-95 transition-all ${className}`}
          aria-label="More information"
        >
          <HelpCircle className="h-4 w-4 text-elec-yellow/70 hover:text-elec-yellow transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="max-w-xs p-3 bg-elec-card border-elec-yellow/30"
      >
        <p className="text-sm text-white">{content}</p>
      </PopoverContent>
    </Popover>
  );
}
