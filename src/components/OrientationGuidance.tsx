import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Smartphone, Monitor } from 'lucide-react';

interface OrientationGuidanceProps {
  showRotatePrompt?: boolean;
  onDismiss?: () => void;
}

const OrientationGuidance: React.FC<OrientationGuidanceProps> = ({ 
  showRotatePrompt = false,
  onDismiss 
}) => {
  if (!showRotatePrompt) return null;

  return (
    <Card className="border-blue-500/30 bg-blue-500/5 mb-3 md:mb-4">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-start md:items-center gap-2 md:gap-3">
          <div className="flex-shrink-0">
            <div className="relative">
              <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
              <RotateCcw className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-400 absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm md:text-base text-blue-700 dark:text-blue-300 mb-0.5 md:mb-1">
              Better Table View Available
            </h4>
            <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 leading-snug">
              Rotate your phone to landscape mode to view the full desktop table with all columns
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-blue-500">
            <Smartphone className="h-4 w-4" />
            <RotateCcw className="h-4 w-4" />
            <Monitor className="h-4 w-4" />
          </div>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-xs text-blue-500 hover:text-blue-700 mt-1.5 md:mt-2 underline"
          >
            Dismiss
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrientationGuidance;