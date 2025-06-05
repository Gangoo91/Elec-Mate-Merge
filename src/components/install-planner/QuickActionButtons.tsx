
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Circuit } from "./types";

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
          {circuits.length} Circuits
        </Badge>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {quickOptions.map((option) => (
          <Button
            key={option.type}
            variant="outline"
            size="sm"
            onClick={() => onAddCircuit(option.type)}
            className="flex items-center gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <span className="text-lg">{option.icon}</span>
            <span className="text-xs">{option.label}</span>
          </Button>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUseTemplate}
          className="flex items-center gap-2 border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
        >
          <Download className="h-4 w-4" />
          Use Template
        </Button>
        
        {circuits.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRemoveLastCircuit}
            className="flex items-center gap-2 border-red-400/30 text-red-400 hover:bg-red-400/10"
          >
            <Minus className="h-4 w-4" />
            Remove Last
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuickActionButtons;
