
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
          { value: "lighting", label: "Lighting", icon: "💡", description: "General lighting circuits" },
          { value: "power", label: "Power", icon: "🔌", description: "Socket outlet circuits" },
          { value: "cooker", label: "Cooker", icon: "🍳", description: "Electric cooker circuits" },
          { value: "shower", label: "Shower", icon: "🚿", description: "Electric shower circuits" },
          { value: "heating", label: "Heating", icon: "🔥", description: "Electric heating circuits" },
          { value: "ev-charging", label: "EV Charging", icon: "🚗", description: "EV charging points" }
        ];
      case "commercial":
        return [
          { value: "commercial-lighting", label: "Lighting", icon: "💡", description: "Commercial lighting" },
          { value: "commercial-power", label: "Power", icon: "🔌", description: "Commercial power circuits" },
          { value: "hvac", label: "HVAC", icon: "❄️", description: "Air conditioning systems" },
          { value: "it-equipment", label: "IT Equipment", icon: "💻", description: "Server and network power" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Emergency systems" }
        ];
      case "industrial":
        return [
          { value: "motor-small", label: "Small Motor", icon: "⚙️", description: "Small industrial motors" },
          { value: "motor-large", label: "Large Motor", icon: "⚙️", description: "Large industrial motors" },
          { value: "welding", label: "Welding", icon: "🔥", description: "Welding equipment" },
          { value: "crane", label: "Crane & Hoist", icon: "🏗️", description: "Lifting equipment" },
          { value: "furnace", label: "Furnace", icon: "🔥", description: "Industrial furnaces" },
          { value: "hvac", label: "HVAC", icon: "❄️", description: "Industrial HVAC" }
        ];
      default:
        return [
          { value: "lighting", label: "Lighting", icon: "💡", description: "General lighting" },
          { value: "power", label: "Power", icon: "🔌", description: "Power circuits" }
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
          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
