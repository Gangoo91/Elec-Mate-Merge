import { Zap, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface InlineDetailLevelSelectorProps {
  selectedLevel: 'normal' | 'detailed';
  onChange: (level: 'normal' | 'detailed') => void;
}

export const InlineDetailLevelSelector = ({
  selectedLevel,
  onChange
}: InlineDetailLevelSelectorProps) => {
  const levels = [
    { 
      value: 'normal' as const, 
      icon: Zap, 
      label: 'Normal',
      time: '4-5m',
      desc: '12-15 phases, overview level'
    },
    { 
      value: 'detailed' as const, 
      icon: FileText, 
      label: 'Detailed',
      time: '5-6m',
      desc: '40-60 steps, ground-level detail'
    }
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Detail Level</p>
      <div className="grid grid-cols-2 gap-3">
        {levels.map(({ value, icon: Icon, label, time, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={cn(
              "flex flex-col items-start gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all touch-manipulation min-h-[88px]",
              selectedLevel === value
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-400 text-elec-dark"
                : "border-yellow-400/30 hover:border-yellow-400/50 hover:bg-yellow-400/5"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <Icon className={cn("h-5 w-5", selectedLevel === value ? "text-elec-dark" : "text-yellow-400")} />
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  selectedLevel === value 
                    ? "border-elec-dark/30 text-elec-dark" 
                    : "border-green-400/30 text-green-400"
                )}
              >
                {time}
              </Badge>
            </div>
            <div className="text-left">
              <p className={cn(
                "font-semibold text-sm mb-1",
                selectedLevel === value ? "text-elec-dark" : "text-foreground"
              )}>
                {label}
              </p>
              <p className={cn(
                "text-xs leading-tight",
                selectedLevel === value ? "text-elec-dark/80" : "text-muted-foreground"
              )}>
                {desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
