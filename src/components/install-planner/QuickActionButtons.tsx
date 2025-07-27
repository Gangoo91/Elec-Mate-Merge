
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Download } from "lucide-react";
import { Circuit } from "./types";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";

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
  const [selectedCircuitType, setSelectedCircuitType] = useState("");
  
  const getQuickAddOptions = () => {
    switch (installationType) {
      case "domestic":
        return [
          { value: "lighting", label: "Lighting" },
          { value: "power", label: "Power" },
          { value: "cooker", label: "Cooker" },
          { value: "heating", label: "Heating" }
        ];
      case "commercial":
        return [
          { value: "lighting", label: "Lighting" },
          { value: "power", label: "Power" },
          { value: "hvac", label: "HVAC" },
          { value: "it-equipment", label: "IT Equipment" }
        ];
      case "industrial":
        return [
          { value: "motor", label: "Motor" },
          { value: "power", label: "Power" },
          { value: "heating", label: "Heating" },
          { value: "hvac", label: "HVAC" }
        ];
      default:
        return [
          { value: "lighting", label: "Lighting" },
          { value: "power", label: "Power" }
        ];
    }
  };

  const quickOptions = getQuickAddOptions();

  const handleAddCircuit = () => {
    if (selectedCircuitType) {
      onAddCircuit(selectedCircuitType);
      setSelectedCircuitType("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <MobileSelectWrapper
          label="Add Circuit Type"
          placeholder="Select a circuit type to add"
          value={selectedCircuitType}
          onValueChange={setSelectedCircuitType}
          options={quickOptions}
        />
        
        <Button 
          onClick={handleAddCircuit}
          disabled={!selectedCircuitType}
          className="w-full"
        >
          Add {selectedCircuitType ? quickOptions.find(opt => opt.value === selectedCircuitType)?.label : "Circuit"}
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onUseTemplate}
            className="flex items-center justify-center gap-2 border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
          >
            <Download className="h-4 w-4" />
            Use Template
          </Button>
          
          {circuits.length > 0 && (
            <Button
              variant="outline"
              onClick={onRemoveLastCircuit}
              className="flex items-center justify-center gap-2 border-red-400/30 text-red-400 hover:bg-red-400/10"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionButtons;
