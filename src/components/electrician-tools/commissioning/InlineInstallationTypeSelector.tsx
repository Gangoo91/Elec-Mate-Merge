import { Button } from "@/components/ui/button";
import { Home, Building2, Factory } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineInstallationTypeSelectorProps {
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
  disabled?: boolean;
}

export const InlineInstallationTypeSelector = ({
  selectedType,
  onChange,
  disabled
}: InlineInstallationTypeSelectorProps) => {
  const types = [
    { value: 'domestic' as const, label: 'Domestic', icon: Home },
    { value: 'commercial' as const, label: 'Commercial', icon: Building2 },
    { value: 'industrial' as const, label: 'Industrial', icon: Factory }
  ];

  return (
    <div>
      <label className="text-sm font-semibold mb-3 block">Installation Type</label>
      <div className="grid grid-cols-3 gap-2">
        {types.map(({ value, label, icon: Icon }) => {
          const isActive = selectedType === value;
          return (
            <Button
              key={value}
              type="button"
              variant={isActive ? "default" : "outline"}
              onClick={() => onChange(value)}
              disabled={disabled}
              aria-label={label}
              className={cn(
                "h-14 touch-manipulation transition-all font-medium",
                isActive 
                  ? "bg-elec-yellow/10 text-foreground border-elec-yellow hover:bg-elec-yellow/15 shadow-md border-2 scale-[1.02]" 
                  : "border-elec-yellow/20 text-foreground/80 hover:bg-elec-yellow/5 hover:border-elec-yellow/30 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-7 w-7", isActive && "text-elec-yellow")} />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
