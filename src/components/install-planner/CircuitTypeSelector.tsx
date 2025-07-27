
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Zap, Fan, Microwave, Car, Hospital, Cpu, Flame, Warehouse, Ship } from "lucide-react";
import { Circuit } from "./types";

interface CircuitTypeSelectorProps {
  onAddCircuit: (circuitType: string) => void;
  existingCircuits: Circuit[];
  installationType: string;
}

const CircuitTypeSelector: React.FC<CircuitTypeSelectorProps> = ({ 
  onAddCircuit, 
  existingCircuits,
  installationType 
}) => {
  const getRecommendedCircuits = (instType: string) => {
    const baseCircuits = [
      { type: "lighting", label: "Lighting Circuit", icon: Lightbulb, description: "General lighting, LED, fluorescent" },
      { type: "power", label: "Power Circuit", icon: Zap, description: "Socket outlets, general power" },
    ];

    switch (instType) {
      case "domestic":
        return [
          ...baseCircuits,
          { type: "cooker", label: "Cooker Circuit", icon: Microwave, description: "Electric cookers, ovens, hobs" },
          { type: "heating", label: "Heating Circuit", icon: Fan, description: "Electric heating, underfloor heating" },
          { type: "ev-charging", label: "EV Charging", icon: Car, description: "Electric vehicle charging points" },
          { type: "shower", label: "Electric Shower", icon: Fan, description: "Electric showers, instant water heaters" },
          { type: "renewable-solar", label: "Solar PV", icon: Fan, description: "Solar panels, battery storage" },
        ];
      case "commercial":
        return [
          ...baseCircuits,
          { type: "hvac", label: "HVAC Systems", icon: Fan, description: "Air conditioning, ventilation systems" },
          { type: "it-equipment", label: "IT Equipment", icon: Cpu, description: "Servers, networking, UPS" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, fire alarms" },
          { type: "commercial-lighting", label: "Commercial Lighting", icon: Lightbulb, description: "Office lighting, retail display" },
        ];
      case "industrial":
        return [
          ...baseCircuits,
          { type: "motor-small", label: "Small Motor Loads", icon: Fan, description: "Pumps, fans, small machinery" },
          { type: "motor-large", label: "Large Motor Loads", icon: Fan, description: "Large pumps, compressors" },
          { type: "welding", label: "Welding Equipment", icon: Flame, description: "Arc welders, resistance welders" },
          { type: "crane", label: "Crane & Hoist", icon: Warehouse, description: "Overhead cranes, lifting equipment" },
          { type: "furnace", label: "Industrial Furnaces", icon: Flame, description: "Electric furnaces, kilns" },
        ];
      case "healthcare":
        return [
          ...baseCircuits,
          { type: "medical", label: "Medical Equipment", icon: Hospital, description: "Life support, medical devices" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, fire alarms" },
          { type: "it-equipment", label: "IT Equipment", icon: Cpu, description: "Patient monitoring, data systems" },
          { type: "operating-theatre", label: "Operating Theatre", icon: Hospital, description: "Critical surgical equipment" },
        ];
      case "data-center":
        return [
          ...baseCircuits,
          { type: "ups-system", label: "UPS Systems", icon: Cpu, description: "Uninterruptible power supplies" },
          { type: "server-rack", label: "Server Racks", icon: Cpu, description: "Server rack power distribution" },
          { type: "cooling-system", label: "Cooling Systems", icon: Fan, description: "CRAC units, chilled water" },
          { type: "backup-generator", label: "Backup Generator", icon: Zap, description: "Emergency backup power" },
          { type: "pdu-intelligent", label: "Intelligent PDU", icon: Cpu, description: "Smart power distribution" },
        ];
      case "education":
        return [
          ...baseCircuits,
          { type: "classroom-power", label: "Classroom Power", icon: Lightbulb, description: "Educational facility power" },
          { type: "lab-equipment", label: "Laboratory Equipment", icon: Cpu, description: "Science lab equipment" },
          { type: "sports-lighting", label: "Sports Lighting", icon: Lightbulb, description: "Sports hall lighting" },
          { type: "it-equipment", label: "IT Equipment", icon: Cpu, description: "Computer labs, AV systems" },
        ];
      case "retail":
        return [
          ...baseCircuits,
          { type: "retail-lighting", label: "Retail Lighting", icon: Lightbulb, description: "Display lighting, shop fronts" },
          { type: "pos-systems", label: "POS Systems", icon: Cpu, description: "Point of sale, payment systems" },
          { type: "cold-storage", label: "Refrigeration", icon: Fan, description: "Chillers, freezers, cold rooms" },
          { type: "kitchen-equipment", label: "Kitchen Equipment", icon: Microwave, description: "Commercial kitchen appliances" },
        ];
      case "agriculture":
        return [
          ...baseCircuits,
          { type: "irrigation-pump", label: "Irrigation Pumps", icon: Fan, description: "Water pumps, irrigation systems" },
          { type: "grain-dryer", label: "Grain Equipment", icon: Fan, description: "Dryers, conveyors, storage" },
          { type: "livestock-equipment", label: "Livestock Equipment", icon: Fan, description: "Milking, feeding, heating" },
          { type: "motor-small", label: "Agricultural Motors", icon: Fan, description: "Farm machinery, pumps" },
        ];
      case "transportation":
        return [
          ...baseCircuits,
          { type: "charging-station", label: "EV Charging Stations", icon: Car, description: "Public EV charging points" },
          { type: "platform-lighting", label: "Platform Lighting", icon: Lightbulb, description: "Railway, bus station lighting" },
          { type: "signal-systems", label: "Signal Systems", icon: Zap, description: "Traffic lights, crossing signals" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, alarms" },
        ];
      case "marine-offshore":
        return [
          ...baseCircuits,
          { type: "marine-power", label: "Marine Power", icon: Ship, description: "Ship systems, offshore platforms" },
          { type: "navigation-equipment", label: "Navigation Equipment", icon: Cpu, description: "GPS, radar, communications" },
          { type: "winch-system", label: "Winch Systems", icon: Warehouse, description: "Anchor winches, cargo cranes" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Safety systems, emergency power" },
        ];
      case "laboratory":
        return [
          ...baseCircuits,
          { type: "fume-cupboard", label: "Fume Cupboards", icon: Fan, description: "Laboratory extraction systems" },
          { type: "analytical-equipment", label: "Analytical Equipment", icon: Cpu, description: "Precision instruments" },
          { type: "clean-room", label: "Clean Room Systems", icon: Fan, description: "Environmental control, filtration" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Safety showers, emergency power" },
        ];
      case "mining":
        return [
          ...baseCircuits,
          { type: "conveyor-belt", label: "Conveyor Systems", icon: Warehouse, description: "Material transport, ore handling" },
          { type: "ventilation-fan", label: "Mine Ventilation", icon: Fan, description: "Air circulation, safety ventilation" },
          { type: "crushing-equipment", label: "Crushing Equipment", icon: Warehouse, description: "Ore processing, crushers" },
          { type: "motor-large", label: "Heavy Motors", icon: Fan, description: "Large industrial motors" },
        ];
      case "sports-entertainment":
        return [
          ...baseCircuits,
          { type: "floodlighting", label: "Sports Floodlighting", icon: Lightbulb, description: "Stadium, court lighting" },
          { type: "sound-system", label: "Audio/Visual", icon: Cpu, description: "PA systems, video screens" },
          { type: "scoreboard", label: "Scoreboards", icon: Cpu, description: "Electronic displays, timing" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, evacuation" },
        ];
      case "hazardous-areas":
        return [
          ...baseCircuits,
          { type: "zone1-lighting", label: "Ex-proof Lighting", icon: Lightbulb, description: "Hazardous area lighting" },
          { type: "zone1-motor", label: "Ex-proof Motors", icon: Fan, description: "Explosion-proof motors" },
          { type: "intrinsically-safe", label: "Intrinsically Safe", icon: Zap, description: "IS instrumentation circuits" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency evacuation systems" },
        ];
      default:
        return baseCircuits;
    }
  };

  const recommendedCircuits = getRecommendedCircuits(installationType);
  const existingTypes = existingCircuits.map(c => c.loadType);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Circuit Types</h3>
        <p className="text-muted-foreground">
          Select the types of circuits typically found in {installationType} installations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendedCircuits.map((circuit) => {
          const isAdded = existingTypes.includes(circuit.type);
          const Icon = circuit.icon;
          
          return (
            <Card
              key={circuit.type}
              className={`cursor-pointer border-2 transition-all ${
                isAdded
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40'
              }`}
              onClick={() => !isAdded && onAddCircuit(circuit.type)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <h4 className="font-medium">{circuit.label}</h4>
                      <p className="text-sm text-muted-foreground">{circuit.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdded ? (
                      <Badge variant="outline" className="border-green-400/30 text-green-400">
                        Added
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddCircuit(circuit.type);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {existingCircuits.length > 0 && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Circuits Added ({existingCircuits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {existingCircuits.map((circuit) => (
                <Badge key={circuit.id} variant="outline" className="border-green-400/30 text-green-400">
                  {circuit.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircuitTypeSelector;
