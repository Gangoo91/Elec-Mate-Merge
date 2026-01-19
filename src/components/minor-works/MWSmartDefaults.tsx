import React from 'react';
import { cn } from '@/lib/utils';
import { SMART_DEFAULTS, SmartDefault } from '@/constants/minorWorksOptions';

interface MWSmartDefaultsProps {
  onApply: (values: SmartDefault['values']) => void;
  className?: string;
}

/**
 * Quick preset buttons for common circuit types
 * Allows electricians to quickly populate circuit details with standard values
 */
const MWSmartDefaults: React.FC<MWSmartDefaultsProps> = ({ onApply, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium">Quick Fill:</span>
        <span>Tap to auto-fill common circuit values</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SMART_DEFAULTS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.values)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg',
              'bg-white/5 hover:bg-white/10 active:bg-white/15',
              'border border-white/10 hover:border-white/20',
              'text-sm font-medium',
              'touch-manipulation active:scale-[0.98]',
              'transition-all duration-150',
              'min-h-[44px]'
            )}
            title={preset.description}
          >
            <span className="text-base">{preset.emoji}</span>
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MWSmartDefaults;
