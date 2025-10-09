import React from 'react';

export interface JobScaleBadgeProps {
  scale: 'domestic' | 'commercial' | 'industrial';
  confidence: number;
  onManualChange?: (scale: 'domestic' | 'commercial' | 'industrial') => void;
}

export const JobScaleBadge: React.FC<JobScaleBadgeProps> = ({ 
  scale, 
  confidence,
  onManualChange 
}) => {
  const config = {
    domestic: { 
      icon: '🏠', 
      label: 'Domestic', 
      color: 'bg-green-500/20 text-green-400 border-green-500/30' 
    },
    commercial: { 
      icon: '🏢', 
      label: 'Commercial', 
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
    },
    industrial: { 
      icon: '🏭', 
      label: 'Industrial', 
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
    }
  };
  
  return (
    <div className="space-y-2">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config[scale].color}`}>
        <span className="text-lg">{config[scale].icon}</span>
        <span className="font-semibold text-sm">Detected: {config[scale].label}</span>
        {confidence > 70 && (
          <span className="text-xs opacity-75">({confidence}% confident)</span>
        )}
      </div>
      
      {onManualChange && (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
            Not right? Change it ▼
          </summary>
          <div className="flex gap-2 mt-2">
            {(['domestic', 'commercial', 'industrial'] as const).map(s => (
              <button
                key={s}
                onClick={() => onManualChange(s)}
                className={`min-h-[44px] px-3 py-1.5 rounded-md border transition-colors ${
                  s === scale 
                    ? config[s].color 
                    : 'border-muted text-muted-foreground hover:border-foreground'
                }`}
              >
                {config[s].icon} {config[s].label}
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};
