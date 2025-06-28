
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
    { value: "ohms-law", label: "Ohm's Law", category: "Fundamental", enhanced: false },
    { value: "ac-power", label: "AC Power Calculator", category: "Fundamental", enhanced: false },
    { value: "basic-ac-circuit", label: "Basic AC Circuit", category: "Fundamental", enhanced: false },
    { value: "power-factor", label: "Power Factor", category: "Fundamental", enhanced: false },
    { value: "three-phase-power", label: "Three Phase Power", category: "Fundamental", enhanced: false },
    
    // Design & Installation - Enhanced Safety
    { value: "voltage-drop", label: "Voltage Drop", category: "Design & Installation", enhanced: false },
    { value: "cable-size", label: "Cable Sizing", category: "Design & Installation", enhanced: true },
    { value: "load", label: "Load Assessment", category: "Design & Installation", enhanced: false },
    { value: "cable-current-capacity", label: "Cable Current Capacity", category: "Design & Installation", enhanced: false },
    { value: "cable-derating", label: "Cable Derating", category: "Design & Installation", enhanced: false },
    { value: "conduit-fill", label: "Conduit Fill", category: "Design & Installation", enhanced: false },
    { value: "diversity-factor", label: "Diversity Factor", category: "Design & Installation", enhanced: false },
    { value: "maximum-demand", label: "Maximum Demand", category: "Design & Installation", enhanced: false },
    
    // Testing & Inspection - Enhanced Safety
    { value: "zs-values", label: "Maximum Zs Values", category: "Testing & Inspection", enhanced: true },
    { value: "bs7671-zs-lookup", label: "BS 7671 Zs Lookup", category: "Testing & Inspection", enhanced: false },
    { value: "r1r2", label: "R1+R2 Calculation", category: "Testing & Inspection", enhanced: false },
    { value: "ring-circuit", label: "Ring Circuit", category: "Testing & Inspection", enhanced: false },
    { value: "earth-fault-loop", label: "Earth Fault Loop", category: "Testing & Inspection", enhanced: false },
    { value: "phase-rotation", label: "Phase Rotation", category: "Testing & Inspection", enhanced: false },
    
    // Protection & Safety
    { value: "adiabatic", label: "Adiabatic Equation", category: "Protection & Safety", enhanced: false },
    { value: "pfc", label: "Prospective Fault Current", category: "Protection & Safety", enhanced: false },
    { value: "rcd-trip-time", label: "RCD Trip Time", category: "Protection & Safety", enhanced: false },
    { value: "rcd-discrimination", label: "RCD Discrimination", category: "Protection & Safety", enhanced: false },
    
    // Lighting & Power Systems
    { value: "lumen", label: "Lighting (Lumens)", category: "Lighting & Power Systems", enhanced: false },
    { value: "led-driver", label: "LED Driver Calculator", category: "Lighting & Power Systems", enhanced: false },
    { value: "motor-starting-current", label: "Motor Starting Current", category: "Lighting & Power Systems", enhanced: false },
    { value: "transformer-calculator", label: "Transformer Calculator", category: "Lighting & Power Systems", enhanced: false },
    { value: "battery-backup", label: "Battery Backup", category: "Lighting & Power Systems", enhanced: false },
    
    // Renewable Energy
    { value: "solar-pv", label: "Solar PV", category: "Renewable Energy", enhanced: false },
    { value: "battery-storage", label: "Battery Storage System", category: "Renewable Energy", enhanced: false },
    { value: "heat-pump", label: "Heat Pump Load", category: "Renewable Energy", enhanced: false },
    { value: "ev-charging", label: "EV Charging Station", category: "Renewable Energy", enhanced: false },
    
    // Tools & Components
    { value: "resistor-colour-code", label: "Resistor Colour Code", category: "Tools & Components", enhanced: false },
    { value: "wire-gauge", label: "Wire Gauge (AWG/SWG)", category: "Tools & Components", enhanced: false },
    { value: "instrumentation", label: "Instrumentation", category: "Tools & Components", enhanced: false },
    
    // Utilities & Cost Analysis
    { value: "energy-cost", label: "Energy Cost Calculator", category: "Utilities & Cost Analysis", enhanced: false },
    { value: "unit-converter", label: "Unit Converter", category: "Utilities & Cost Analysis", enhanced: false },
  ];

  // Group calculators by category
  const groupedCalculators = calculatorOptions.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculatorOptions>);

  // Define category order for better organization
  const categoryOrder = [
    "Fundamental",
    "Design & Installation", 
    "Testing & Inspection",
    "Protection & Safety",
    "Lighting & Power Systems",
    "Renewable Energy",
    "Tools & Components",
    "Utilities & Cost Analysis"
  ];

  return (
    <div className="space-y-4">
      {/* Safety Enhancement Notice - Removed shield icon */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-300 font-medium text-sm">Safety Enhancement Active</span>
        </div>
        <p className="text-green-200 text-xs">
          Calculators now include real-world safety factors, environmental conditions, and comprehensive BS 7671 compliance validation.
        </p>
      </div>

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
