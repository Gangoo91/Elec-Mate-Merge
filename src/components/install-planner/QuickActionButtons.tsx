
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
          { value: "lighting", label: "Lighting", description: "General lighting circuits" },
          { value: "power", label: "Power", description: "Socket outlet circuits" },
          { value: "cooker", label: "Cooker", description: "Electric cooker circuits" },
          { value: "shower", label: "Shower", description: "Electric shower circuits" },
          { value: "heating", label: "Heating", description: "Electric heating circuits" },
          { value: "ev-charging", label: "EV Charging", description: "EV charging points" },
          { value: "smart-home", label: "Smart Home", description: "Home automation systems" },
          { value: "renewable-solar", label: "Solar PV", description: "Solar photovoltaic installation" }
        ];
      case "commercial":
        return [
          { value: "commercial-lighting", label: "Lighting", description: "Commercial lighting" },
          { value: "commercial-power", label: "Power", description: "Commercial power circuits" },
          { value: "hvac", label: "HVAC", description: "Air conditioning systems" },
          { value: "it-equipment", label: "IT Equipment", description: "Server and network power" },
          { value: "emergency", label: "Emergency", description: "Emergency systems" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Emergency exit lighting" }
        ];
      case "industrial":
        return [
          { value: "motor-small", label: "Small Motor", description: "Small industrial motors" },
          { value: "motor-large", label: "Large Motor", description: "Large industrial motors" },
          { value: "welding", label: "Welding", description: "Welding equipment" },
          { value: "crane", label: "Crane & Hoist", description: "Lifting equipment" },
          { value: "furnace", label: "Furnace", description: "Industrial furnaces" },
          { value: "hvac", label: "HVAC", description: "Industrial HVAC" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Emergency exit lighting" },
          { value: "compressed-air", label: "Compressed Air", description: "Air compressor systems" }
        ];
      case "data-center":
        return [
          { value: "ups-system", label: "UPS System", description: "Uninterruptible power supply" },
          { value: "server-rack", label: "Server Rack", description: "Server rack power distribution" },
          { value: "cooling-system", label: "Cooling", description: "Data center cooling systems" },
          { value: "backup-generator", label: "Generator", description: "Emergency backup generator" },
          { value: "it-equipment", label: "IT Equipment", description: "Network and server equipment" }
        ];
      case "education":
        return [
          { value: "classroom-power", label: "Classroom", description: "Educational facility power" },
          { value: "lab-equipment", label: "Laboratory", description: "Science laboratory equipment" },
          { value: "sports-lighting", label: "Sports Hall", description: "Sports facility lighting" },
          { value: "commercial-lighting", label: "General Lighting", description: "Educational lighting" },
          { value: "it-equipment", label: "IT Systems", description: "Educational technology" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Emergency exit lighting" }
        ];
      case "hospitality":
        return [
          { value: "kitchen-equipment", label: "Kitchen", description: "Commercial kitchen equipment" },
          { value: "guest-room", label: "Guest Room", description: "Hotel guest room power" },
          { value: "laundry-equipment", label: "Laundry", description: "Commercial laundry equipment" },
          { value: "commercial-lighting", label: "Lighting", description: "Hospitality lighting" },
          { value: "hvac", label: "HVAC", description: "Climate control systems" }
        ];
      case "retail":
        return [
          { value: "retail-lighting", label: "Display Lighting", description: "Retail display lighting" },
          { value: "pos-systems", label: "POS Systems", description: "Point of sale systems" },
          { value: "cold-storage", label: "Refrigeration", description: "Cold storage and refrigeration" },
          { value: "commercial-power", label: "General Power", description: "General retail power" }
        ];
      case "agriculture":
        return [
          { value: "irrigation-pump", label: "Irrigation", description: "Irrigation pump systems" },
          { value: "grain-dryer", label: "Grain Dryer", description: "Grain drying equipment" },
          { value: "livestock-equipment", label: "Livestock", description: "Livestock management equipment" },
          { value: "motor-small", label: "Farm Motors", description: "Small agricultural motors" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Emergency barn lighting" },
          { value: "agriculture-emergency", label: "Agricultural Emergency", description: "Livestock area safety" }
        ];
      case "transportation":
        return [
          { value: "charging-station", label: "EV Charging", description: "Public EV charging station" },
          { value: "platform-lighting", label: "Platform Lighting", description: "Transport platform lighting" },
          { value: "signal-systems", label: "Traffic Signals", description: "Traffic control systems" },
          { value: "emergency", label: "Emergency", description: "Emergency systems" }
        ];
      case "sports-entertainment":
        return [
          { value: "floodlighting", label: "Floodlighting", description: "Sports venue floodlighting" },
          { value: "sound-system", label: "Audio/Visual", description: "Entertainment systems" },
          { value: "scoreboard", label: "Scoreboard", description: "Electronic scoreboards" },
          { value: "commercial-power", label: "General Power", description: "General venue power" }
        ];
      case "laboratory":
        return [
          { value: "fume-cupboard", label: "Fume Cupboard", description: "Laboratory fume extraction" },
          { value: "analytical-equipment", label: "Analytical", description: "Precision instruments" },
          { value: "clean-room", label: "Clean Room", description: "Clean room systems" },
          { value: "emergency", label: "Emergency", description: "Lab safety systems" }
        ];
      case "marine-offshore":
        return [
          { value: "marine-power", label: "Marine Power", description: "Marine vessel power systems" },
          { value: "navigation-equipment", label: "Navigation", description: "Marine navigation equipment" },
          { value: "winch-system", label: "Winch System", description: "Marine winch and lifting" },
          { value: "emergency", label: "Emergency", description: "Marine safety systems" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Marine emergency lighting" },
          { value: "marine-emergency", label: "Marine Emergency", description: "Lifeboat stations, muster points" }
        ];
      case "mining":
        return [
          { value: "conveyor-belt", label: "Conveyor", description: "Mining conveyor systems" },
          { value: "ventilation-fan", label: "Ventilation", description: "Mine ventilation systems" },
          { value: "crushing-equipment", label: "Crushing", description: "Ore crushing equipment" },
          { value: "motor-large", label: "Large Motors", description: "Large industrial motors" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Mine emergency lighting" },
          { value: "mining-emergency", label: "Mining Emergency", description: "Mine safety systems" }
        ];
      case "healthcare":
        return [
          { value: "medical", label: "Medical Equipment", description: "Critical medical equipment" },
          { value: "emergency", label: "Emergency", description: "Healthcare emergency systems" },
          { value: "emergency-lighting", label: "Emergency Lighting", description: "Hospital emergency lighting" },
          { value: "it-equipment", label: "IT Systems", description: "Healthcare IT equipment" },
          { value: "hvac", label: "HVAC", description: "Healthcare climate control" },
          { value: "defibrillator-power", label: "Defibrillator Power", description: "Critical cardiac equipment" },
          { value: "surgical-equipment", label: "Surgical Equipment", description: "Surgical robots, equipment" }
        ];
      case "hazardous-areas":
        return [
          { value: "zone1-lighting", label: "Zone 1 Lighting", description: "Hazardous area lighting" },
          { value: "zone1-motor", label: "Zone 1 Motor", description: "Hazardous area motors" },
          { value: "intrinsically-safe", label: "IS Circuit", description: "Intrinsically safe circuits" },
          { value: "emergency", label: "Emergency", description: "Hazardous area emergency" }
        ];
      default:
        return [
          { value: "lighting", label: "Lighting", description: "General lighting" },
          { value: "power", label: "Power", description: "Power circuits" }
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
