import { Home, Building2, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineProjectTypeSelectorProps {
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
}

export const InlineProjectTypeSelector = ({
  selectedType,
  onChange
}: InlineProjectTypeSelectorProps) => {
  const types = [
    { value: 'domestic' as const, icon: Home, label: 'Domestic' },
    { value: 'commercial' as const, icon: Building2, label: 'Commercial' },
    { value: 'industrial' as const, icon: Factory, label: 'Industrial' }
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Project Type</p>
      <div className="grid grid-cols-3 gap-2">
        {types.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all touch-manipulation h-20 sm:h-24",
              selectedType === value
                ? "bg-gradient-to-br from-orange-400 to-orange-600 border-orange-400 text-foreground"
                : "border-orange-400/30 hover:border-orange-400/50 hover:bg-orange-400/5"
            )}
            aria-label={label}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs sm:text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};