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
                "h-11 touch-manipulation transition-all font-medium",
                isActive 
                  ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 shadow-md" 
                  : "border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400/50"
              )}
            >
              <Icon className="h-6 w-6" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
