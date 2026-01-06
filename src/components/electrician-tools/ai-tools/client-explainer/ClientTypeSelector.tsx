import { Home, Building, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export type ClientType = "homeowner" | "business" | "landlord" | "contractor";

interface ClientTypeSelectorProps {
  selected: ClientType;
  onSelect: (type: ClientType) => void;
}

const clientTypes = [
  {
    type: "homeowner" as ClientType,
    label: "Homeowner",
    icon: Home,
    description: "Residential property owner",
    colors: {
      active: "bg-blue-500/10 border-blue-500/40 text-blue-400",
      icon: "bg-blue-500/20 text-blue-400",
    }
  },
  {
    type: "business" as ClientType,
    label: "Business",
    icon: Building,
    description: "Commercial property",
    colors: {
      active: "bg-green-500/10 border-green-500/40 text-green-400",
      icon: "bg-green-500/20 text-green-400",
    }
  },
  {
    type: "landlord" as ClientType,
    label: "Landlord",
    icon: Users,
    description: "Rental property owner",
    colors: {
      active: "bg-purple-500/10 border-purple-500/40 text-purple-400",
      icon: "bg-purple-500/20 text-purple-400",
    }
  },
  {
    type: "contractor" as ClientType,
    label: "Contractor",
    icon: Briefcase,
    description: "Fellow trades professional",
    colors: {
      active: "bg-orange-500/10 border-orange-500/40 text-orange-400",
      icon: "bg-orange-500/20 text-orange-400",
    }
  }
];

const ClientTypeSelector = ({ selected, onSelect }: ClientTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {clientTypes.map(({ type, label, icon: Icon, description, colors }) => {
        const isSelected = selected === type;

        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-200",
              "min-h-[100px] touch-manipulation text-left",
              "hover:scale-[1.02] active:scale-[0.98]",
              isSelected
                ? colors.active
                : "bg-background/50 border-border/30 hover:border-border/50"
            )}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current animate-pulse" />
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isSelected ? colors.icon : "bg-muted/50 text-muted-foreground"
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className={cn(
                  "font-semibold text-sm",
                  isSelected ? "text-foreground" : "text-foreground/80"
                )}>
                  {label}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ClientTypeSelector;
