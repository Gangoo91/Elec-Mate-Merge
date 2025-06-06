
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Circuit } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickActionButtonsProps {
  circuits: Circuit[];
  onAddCircuit: (type: string) => void;
  onRemoveLastCircuit: () => void;
  onUseTemplate: () => void;
  installationType: string;
}

const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  circuits,
  onAddCircuit,
  onRemoveLastCircuit,
  onUseTemplate,
  installationType
}) => {
  const isMobile = useIsMobile();
  
  const getQuickAddOptions = () => {
    switch (installationType) {
      case "domestic":
        return [
          { type: "lighting", label: "Lighting", icon: "💡" },
          { type: "power", label: "Power", icon: "🔌" },
          { type: "cooker", label: "Cooker", icon: "🍳" },
          { type: "heating", label: "Heating", icon: "🔥" }
        ];
      case "commercial":
        return [
          { type: "lighting", label: "Lighting", icon: "💡" },
          { type: "power", label: "Power", icon: "🔌" },
          { type: "hvac", label: "HVAC", icon: "❄️" },
          { type: "it-equipment", label: "IT Equipment", icon: "💻" }
        ];
      case "industrial":
        return [
          { type: "motor", label: "Motor", icon: "⚙️" },
          { type: "power", label: "Power", icon: "🔌" },
          { type: "heating", label: "Heating", icon: "🔥" },
          { type: "hvac", label: "HVAC", icon: "❄️" }
        ];
      default:
        return [
          { type: "lighting", label: "Lighting", icon: "💡" },
          { type: "power", label: "Power", icon: "🔌" }
        ];
    }
  };

  const quickOptions = getQuickAddOptions();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-semibold">Quick Actions</h3>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
          {circuits.length} {circuits.length === 1 ? 'Circuit' : 'Circuits'}
        </Badge>
      </div>

      {/* Quick Add Buttons - Enhanced mobile grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Add Circuit Type</h4>
        <div className={`grid gap-3 ${
          isMobile 
            ? 'grid-cols-2' 
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        }`}>
          {quickOptions.map((option) => (
            <Button
              key={option.type}
              variant="outline"
              onClick={() => onAddCircuit(option.type)}
              className="flex flex-col items-center gap-2 h-auto py-4 px-3 border-elec-yellow/30 hover:bg-elec-yellow/10 active:bg-elec-yellow/15 touch-manipulation transition-all"
            >
              <span className="text-xl sm:text-2xl">{option.icon}</span>
              <span className="text-xs sm:text-sm font-medium leading-tight text-center">
                {option.label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Bulk Actions - Enhanced mobile layout */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Bulk Actions</h4>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onUseTemplate}
            className="flex items-center justify-center gap-2 h-11 sm:h-10 border-blue-400/30 text-blue-400 hover:bg-blue-400/10 active:bg-blue-400/15 touch-manipulation"
          >
            <Download className="h-4 w-4" />
            Use Template
          </Button>
          
          {circuits.length > 0 && (
            <Button
              variant="outline"
              onClick={onRemoveLastCircuit}
              className="flex items-center justify-center gap-2 h-11 sm:h-10 border-red-400/30 text-red-400 hover:bg-red-400/10 active:bg-red-400/15 touch-manipulation"
            >
              <Minus className="h-4 w-4" />
              Remove Last Circuit
            </Button>
          )}
        </div>
      </div>

      {circuits.length > 0 && (
        <div className="pt-4 border-t border-elec-yellow/20">
          <div className="text-sm text-muted-foreground text-center">
            {circuits.length} {circuits.length === 1 ? 'circuit' : 'circuits'} configured.
            {isMobile && circuits.length > 3 && (
              <span className="block mt-1 text-xs">
                Swipe to configure individual circuits in the next tab.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionButtons;
