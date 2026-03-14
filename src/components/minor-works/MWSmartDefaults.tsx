import React from 'react';
import { cn } from '@/lib/utils';
import { Zap, Lightbulb, Plug, Flame, Droplets, Car } from 'lucide-react';
import { SMART_DEFAULTS, SmartDefault } from '@/constants/minorWorksOptions';

interface MWSmartDefaultsProps {
  onApply: (values: SmartDefault['values']) => void;
  className?: string;
}

const PRESET_ICONS: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  lighting: { icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  sockets: { icon: Plug, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  cooker: { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/15' },
  shower: { icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  'ev-charger': { icon: Car, color: 'text-green-400', bg: 'bg-green-500/15' },
};

const MWSmartDefaults: React.FC<MWSmartDefaultsProps> = ({ onApply, className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
          <Zap className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Quick Fill Presets</h4>
          <p className="text-xs text-white">Tap a common circuit type to auto-fill values</p>
        </div>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {SMART_DEFAULTS.map((preset) => {
          const style = PRESET_ICONS[preset.id] || {
            icon: Zap,
            color: 'text-purple-400',
            bg: 'bg-purple-500/15',
          };
          const Icon = style.icon;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApply(preset.values)}
              className={cn(
                'group flex flex-col items-start gap-2 p-3 rounded-xl text-left',
                'bg-white/[0.03] hover:bg-white/[0.07]',
                'border border-white/10 hover:border-white/20',
                'touch-manipulation active:scale-[0.97]',
                'transition-all duration-150',
                'min-h-[80px]'
              )}
            >
              <div
                className={cn(
                  'h-8 w-8 rounded-lg flex items-center justify-center shrink-0',
                  style.bg
                )}
              >
                <Icon className={cn('h-4 w-4', style.color)} />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-white block">{preset.label}</span>
                <span className={cn('text-[11px] leading-tight block', style.color)}>
                  {preset.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MWSmartDefaults;
