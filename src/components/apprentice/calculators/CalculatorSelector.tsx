
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useState } from "react";
import StandardsReference from "./StandardsReference";

interface CalculatorSelectorProps {
  calculatorType: string;
  setCalculatorType: (type: string) => void;
}

const CalculatorSelector = ({ calculatorType, setCalculatorType }: CalculatorSelectorProps) => {
  const [showStandards, setShowStandards] = useState(false);

  const calculatorOptions = [
    // Fundamental Electrical Calculations - Most Important
    { value: "ohms-law", label: "Ohm's Law", category: "Fundamental" },
    { value: "ac-power", label: "AC Power Calculator", category: "Fundamental" },
    { value: "basic-ac-circuit", label: "Basic AC Circuit", category: "Fundamental" },
    { value: "power-factor", label: "Power Factor", category: "Fundamental" },
    { value: "three-phase-power", label: "Three Phase Power", category: "Fundamental" },
    
    // Design & Installation - Enhanced Safety
    { value: "voltage-drop", label: "Voltage Drop", category: "Design & Installation" },
    { value: "cable-size", label: "Cable Sizing", category: "Design & Installation" },
    { value: "load", label: "Load Assessment", category: "Design & Installation" },
    { value: "cable-current-capacity", label: "Cable Current Capacity", category: "Design & Installation" },
    { value: "cable-derating", label: "Cable Derating", category: "Design & Installation" },
    { value: "conduit-fill", label: "Conduit Fill", category: "Design & Installation" },
    { value: "diversity-factor", label: "Diversity Factor", category: "Design & Installation" },
    { value: "maximum-demand", label: "Maximum Demand", category: "Design & Installation" },
    
    // Testing & Inspection - Enhanced Safety
    { value: "zs-values", label: "Maximum Zs Values", category: "Testing & Inspection" },
    { value: "bs7671-zs-lookup", label: "BS 7671 Zs Lookup", category: "Testing & Inspection" },
    { value: "r1r2", label: "R1+R2 Calculation", category: "Testing & Inspection" },
    { value: "ring-circuit", label: "Ring Circuit", category: "Testing & Inspection" },
    { value: "earth-fault-loop", label: "Earth Fault Loop", category: "Testing & Inspection" },
    { value: "phase-rotation", label: "Phase Rotation", category: "Testing & Inspection" },
    
    // Protection & Safety
    { value: "adiabatic", label: "Adiabatic Equation", category: "Protection & Safety" },
    { value: "pfc", label: "Prospective Fault Current", category: "Protection & Safety" },
    { value: "rcd-trip-time", label: "RCD Trip Time", category: "Protection & Safety" },
    { value: "rcd-discrimination", label: "RCD Discrimination", category: "Protection & Safety" },
    
    // Lighting & Power Systems
    { value: "lumen", label: "Lighting (Lumens)", category: "Lighting & Power Systems" },
    { value: "led-driver", label: "LED Driver Calculator", category: "Lighting & Power Systems" },
    { value: "motor-starting-current", label: "Motor Starting Current", category: "Lighting & Power Systems" },
    { value: "transformer-calculator", label: "Transformer Calculator", category: "Lighting & Power Systems" },
    { value: "battery-backup", label: "Battery Backup", category: "Lighting & Power Systems" },
    
    // Renewable Energy
    { value: "solar-pv", label: "Solar PV", category: "Renewable Energy" },
    { value: "solar-array", label: "Solar Array Calculator", category: "Renewable Energy" },
    { value: "battery-storage", label: "Battery Storage System", category: "Renewable Energy" },
    { value: "wind-power", label: "Wind Power Calculator", category: "Renewable Energy" },
    { value: "grid-tie-inverter", label: "Grid-Tie Inverter", category: "Renewable Energy" },
    { value: "micro-hydro", label: "Micro-Hydro Power", category: "Renewable Energy" },
    { value: "off-grid-system", label: "Off-Grid System Calculator", category: "Renewable Energy" },
    { value: "feed-in-tariff", label: "Feed-In Tariff Calculator", category: "Renewable Energy" },
    { value: "heat-pump", label: "Heat Pump Load", category: "Renewable Energy" },
    { value: "ev-charging", label: "EV Charging Station", category: "Renewable Energy" },
    { value: "evse-load", label: "EVSE Load Calculator", category: "Renewable Energy" },
    
    // Advanced Safety & Analysis
    { value: "arc-flash", label: "Arc Flash Analysis", category: "Advanced Safety & Analysis" },
    { value: "power-quality", label: "Power Quality Analysis", category: "Advanced Safety & Analysis" },
    { value: "selectivity", label: "Selectivity & Discrimination", category: "Advanced Safety & Analysis" },
    { value: "emergency-lighting", label: "Emergency Lighting Design", category: "Advanced Safety & Analysis" },
    
    // Specialised Applications
    { value: "data-centre", label: "Data Centre Calculator", category: "Specialised Applications" },
    
    // Specialist Locations
    { value: "marine-electrical", label: "Marine Electrical", category: "Specialist Locations" },
    { value: "swimming-pool", label: "Swimming Pool Electrical", category: "Specialist Locations" },
    
    // Tools & Components
    { value: "resistor-colour-code", label: "Resistor Colour Code", category: "Tools & Components" },
    { value: "wire-gauge", label: "Wire Gauge (AWG/SWG)", category: "Tools & Components" },
    { value: "instrumentation", label: "Instrumentation", category: "Tools & Components" },
    
    // Utilities & Cost Analysis
    { value: "energy-cost", label: "Energy Cost Calculator", category: "Utilities & Cost Analysis" },
    { value: "unit-converter", label: "Unit Converter", category: "Utilities & Cost Analysis" },
  ];

  // Group calculators by category
  const groupedCalculators = calculatorOptions.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculatorOptions>);

  // Define category order for better organisation
  const categoryOrder = [
    "Fundamental",
    "Design & Installation", 
    "Testing & Inspection",
    "Protection & Safety",
    "Lighting & Power Systems",
    "Renewable Energy",
    "Advanced Safety & Analysis",
    "Specialised Applications",
    "Specialist Locations",
    "Tools & Components",
    "Utilities & Cost Analysis"
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 w-full">
          <Label htmlFor="calculator-select">Select Calculator</Label>
          <Select value={calculatorType} onValueChange={setCalculatorType}>
            <SelectTrigger id="calculator-select" className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Choose a calculator" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-96">
              {categoryOrder.map((category) => {
                const calcs = groupedCalculators[category];
                if (!calcs) return null;
                
                return (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow bg-elec-gray/50">
                      {category}
                    </div>
                    {calcs.map((calc) => (
                      <SelectItem key={calc.value} value={calc.value} className="pl-4">
                        <div className="flex items-center gap-2">
                          {calc.label}
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowStandards(!showStandards)}
          className="flex items-center gap-2 border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
        >
          <Book className="h-4 w-4" />
          {showStandards ? 'Hide' : 'Show'} Standards
        </Button>
      </div>

      {showStandards && <StandardsReference />}
    </div>
  );
};

export default CalculatorSelector;
