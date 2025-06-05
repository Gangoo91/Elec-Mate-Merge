
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Zap, Fan, Microwave, Car, Hospital, Cpu, Flame, Warehouse } from "lucide-react";
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
        ];
      case "commercial":
        return [
          ...baseCircuits,
          { type: "hvac", label: "HVAC Systems", icon: Fan, description: "Air conditioning, ventilation systems" },
          { type: "it-equipment", label: "IT Equipment", icon: Cpu, description: "Servers, networking, UPS" },
          { type: "emergency", label: "Emergency Systems", icon: Zap, description: "Emergency lighting, fire alarms" },
        ];
      case "industrial":
        return [
          ...baseCircuits,
          { type: "motor", label: "Motor Loads", icon: Fan, description: "Motors, pumps, fans, compressors" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
