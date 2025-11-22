import { Home, Building2, Factory } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineProjectTypeSelectorProps {
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onTypeChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
}

const TYPE_CONFIG = {
  domestic: { label: 'Domestic', icon: Home },
  commercial: { label: 'Commercial', icon: Building2 },
  industrial: { label: 'Industrial', icon: Factory }
} as const;

export const InlineProjectTypeSelector = ({ selectedType, onTypeChange }: InlineProjectTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-muted/30 rounded-lg">
      {(Object.entries(TYPE_CONFIG) as [keyof typeof TYPE_CONFIG, typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG]][]).map(([key, config]) => {
        const Icon = config.icon;
        const isSelected = selectedType === key;
        
        return (
          <button
            key={key}
            onClick={() => onTypeChange(key)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-md transition-all touch-manipulation min-h-[44px]",
              isSelected 
                ? "bg-elec-yellow text-elec-dark shadow-md scale-[1.02]" 
                : "bg-background hover:bg-accent text-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4", isSelected ? "text-elec-dark" : "text-elec-yellow")} />
            <span className="text-xs font-semibold">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
};
