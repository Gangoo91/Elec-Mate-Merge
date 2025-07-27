
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
          { value: "ev-charging", label: "EV Charging", icon: "🚗", description: "EV charging points" },
          { value: "smart-home", label: "Smart Home", icon: "🏠", description: "Home automation systems" },
          { value: "renewable-solar", label: "Solar PV", icon: "☀️", description: "Solar photovoltaic installation" }
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
      case "data-center":
        return [
          { value: "ups-system", label: "UPS System", icon: "⚡", description: "Uninterruptible power supply" },
          { value: "server-rack", label: "Server Rack", icon: "🖥️", description: "Server rack power distribution" },
          { value: "cooling-system", label: "Cooling", icon: "❄️", description: "Data center cooling systems" },
          { value: "backup-generator", label: "Generator", icon: "🔋", description: "Emergency backup generator" },
          { value: "it-equipment", label: "IT Equipment", icon: "💻", description: "Network and server equipment" }
        ];
      case "education":
        return [
          { value: "classroom-power", label: "Classroom", icon: "🎓", description: "Educational facility power" },
          { value: "lab-equipment", label: "Laboratory", icon: "🔬", description: "Science laboratory equipment" },
          { value: "sports-lighting", label: "Sports Hall", icon: "⚽", description: "Sports facility lighting" },
          { value: "commercial-lighting", label: "General Lighting", icon: "💡", description: "Educational lighting" },
          { value: "it-equipment", label: "IT Systems", icon: "💻", description: "Educational technology" }
        ];
      case "hospitality":
        return [
          { value: "kitchen-equipment", label: "Kitchen", icon: "👨‍🍳", description: "Commercial kitchen equipment" },
          { value: "guest-room", label: "Guest Room", icon: "🛏️", description: "Hotel guest room power" },
          { value: "laundry-equipment", label: "Laundry", icon: "🧺", description: "Commercial laundry equipment" },
          { value: "commercial-lighting", label: "Lighting", icon: "💡", description: "Hospitality lighting" },
          { value: "hvac", label: "HVAC", icon: "❄️", description: "Climate control systems" }
        ];
      case "retail":
        return [
          { value: "retail-lighting", label: "Display Lighting", icon: "💡", description: "Retail display lighting" },
          { value: "pos-systems", label: "POS Systems", icon: "💳", description: "Point of sale systems" },
          { value: "cold-storage", label: "Refrigeration", icon: "🧊", description: "Cold storage and refrigeration" },
          { value: "commercial-power", label: "General Power", icon: "🔌", description: "General retail power" }
        ];
      case "agriculture":
        return [
          { value: "irrigation-pump", label: "Irrigation", icon: "💧", description: "Irrigation pump systems" },
          { value: "grain-dryer", label: "Grain Dryer", icon: "🌾", description: "Grain drying equipment" },
          { value: "livestock-equipment", label: "Livestock", icon: "🐄", description: "Livestock management equipment" },
          { value: "motor-small", label: "Farm Motors", icon: "⚙️", description: "Small agricultural motors" }
        ];
      case "transportation":
        return [
          { value: "charging-station", label: "EV Charging", icon: "🚗", description: "Public EV charging station" },
          { value: "platform-lighting", label: "Platform Lighting", icon: "🚇", description: "Transport platform lighting" },
          { value: "signal-systems", label: "Traffic Signals", icon: "🚦", description: "Traffic control systems" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Emergency systems" }
        ];
      case "sports-entertainment":
        return [
          { value: "floodlighting", label: "Floodlighting", icon: "💡", description: "Sports venue floodlighting" },
          { value: "sound-system", label: "Audio/Visual", icon: "🔊", description: "Entertainment systems" },
          { value: "scoreboard", label: "Scoreboard", icon: "📊", description: "Electronic scoreboards" },
          { value: "commercial-power", label: "General Power", icon: "🔌", description: "General venue power" }
        ];
      case "laboratory":
        return [
          { value: "fume-cupboard", label: "Fume Cupboard", icon: "🧪", description: "Laboratory fume extraction" },
          { value: "analytical-equipment", label: "Analytical", icon: "🔬", description: "Precision instruments" },
          { value: "clean-room", label: "Clean Room", icon: "🏥", description: "Clean room systems" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Lab safety systems" }
        ];
      case "marine-offshore":
        return [
          { value: "marine-power", label: "Marine Power", icon: "⚓", description: "Marine vessel power systems" },
          { value: "navigation-equipment", label: "Navigation", icon: "🧭", description: "Marine navigation equipment" },
          { value: "winch-system", label: "Winch System", icon: "⚓", description: "Marine winch and lifting" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Marine safety systems" }
        ];
      case "mining":
        return [
          { value: "conveyor-belt", label: "Conveyor", icon: "🏗️", description: "Mining conveyor systems" },
          { value: "ventilation-fan", label: "Ventilation", icon: "🌪️", description: "Mine ventilation systems" },
          { value: "crushing-equipment", label: "Crushing", icon: "⚒️", description: "Ore crushing equipment" },
          { value: "motor-large", label: "Large Motors", icon: "⚙️", description: "Large industrial motors" }
        ];
      case "healthcare":
        return [
          { value: "medical", label: "Medical Equipment", icon: "🏥", description: "Critical medical equipment" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Healthcare emergency systems" },
          { value: "it-equipment", label: "IT Systems", icon: "💻", description: "Healthcare IT equipment" },
          { value: "hvac", label: "HVAC", icon: "❄️", description: "Healthcare climate control" }
        ];
      case "hazardous-areas":
        return [
          { value: "zone1-lighting", label: "Zone 1 Lighting", icon: "⚠️", description: "Hazardous area lighting" },
          { value: "zone1-motor", label: "Zone 1 Motor", icon: "⚠️", description: "Hazardous area motors" },
          { value: "intrinsically-safe", label: "IS Circuit", icon: "🔒", description: "Intrinsically safe circuits" },
          { value: "emergency", label: "Emergency", icon: "🚨", description: "Hazardous area emergency" }
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
