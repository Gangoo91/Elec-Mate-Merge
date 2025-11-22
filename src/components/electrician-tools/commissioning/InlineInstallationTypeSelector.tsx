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
    { value: 'domestic' as const, label: 'Domestic', icon: Home, shortLabel: 'Dom' },
    { value: 'commercial' as const, label: 'Commercial', icon: Building2, shortLabel: 'Com' },
    { value: 'industrial' as const, label: 'Industrial', icon: Factory, shortLabel: 'Ind' }
  ];

  return (
    <div>
      <label className="text-sm font-semibold mb-3 block">Installation Type</label>
      <div className="grid grid-cols-3 gap-2">
        {types.map(({ value, label, icon: Icon, shortLabel }) => {
          const isActive = selectedType === value;
          return (
            <Button
              key={value}
              type="button"
              variant={isActive ? "default" : "outline"}
              onClick={() => onChange(value)}
              disabled={disabled}
              className={cn(
                "h-11 touch-manipulation transition-all text-sm sm:text-base font-medium",
                isActive 
                  ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 shadow-md" 
                  : "border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400/50"
              )}
            >
              <Icon className="h-4 w-4 mr-1.5 hidden xs:block" />
              <span className="hidden xs:inline">{label}</span>
              <span className="xs:hidden">{shortLabel}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
