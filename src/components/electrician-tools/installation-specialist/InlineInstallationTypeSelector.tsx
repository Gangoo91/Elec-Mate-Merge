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
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-md" 
                  : "border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/50"
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
