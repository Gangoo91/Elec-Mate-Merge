import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FieldTooltipProps {
  content: string;
  regulation?: string;
  example?: string;
}

export const FieldTooltip: React.FC<FieldTooltipProps> = ({ content, regulation, example }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center ml-1 min-h-[44px] min-w-[44px] -my-3 touch-manipulation active:scale-95 transition-all"
            aria-label="More information"
          >
            <Info className="h-4 w-4 text-muted-foreground hover:text-foreground active:text-elec-yellow transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-2 text-xs">
            <p>{content}</p>
            {regulation && (
              <p className="text-yellow-500 font-medium">
                BS 7671: {regulation}
              </p>
            )}
            {example && (
              <p className="text-muted-foreground italic">
                Example: {example}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
