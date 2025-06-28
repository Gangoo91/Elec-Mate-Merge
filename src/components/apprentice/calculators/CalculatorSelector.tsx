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
    // Fundamental Calculations
    { value: "ohms-law", label: "Ohm's Law", category: "Fundamental" },
    { value: "power-factor", label: "Power Factor", category: "Fundamental" },
    
    // Power Systems (NEW - Phase 2)
    { value: "three-phase-load", label: "Three Phase Load", category: "Power Systems" },
    { value: "motor-starting", label: "Motor Starting Current", category: "Power Systems" },
    { value: "transformer-sizing", label: "Transformer Sizing", category: "Power Systems" },
    { value: "capacitor-sizing", label: "Capacitor Sizing", category: "Power Systems" },
    { value: "harmonics-analysis", label: "Harmonics Analysis", category: "Power Systems" },
    { value: "load-flow", label: "Load Flow Analysis", category: "Power Systems" },
    
    // Protection & Safety (NEW - Phase 3)
    { value: "fault-current", label: "Fault Current Analysis", category: "Protection & Safety" },
    { value: "arc-flash", label: "Arc Flash Analysis", category: "Protection & Safety" },
    { value: "protection-coordination", label: "Protection Coordination", category: "Protection & Safety" },
    { value: "grounding-systems", label: "Grounding Systems", category: "Protection & Safety" },
    { value: "surge-protection", label: "Surge Protection", category: "Protection & Safety" },
    { value: "safety-calculations", label: "Safety Calculations", category: "Protection & Safety" },
    
    // Installation Design (NEW - Phase 4)
    { value: "cable-tray-sizing", label: "Cable Tray Sizing", category: "Installation Design" },
    { value: "conduit-routing", label: "Conduit Routing", category: "Installation Design" },
    { value: "panel-layout", label: "Panel Layout", category: "Installation Design" },
    { value: "load-scheduling", label: "Load Scheduling", category: "Installation Design" },
    { value: "emergency-lighting", label: "Emergency Lighting", category: "Installation Design" },
    { value: "fire-alarm-design", label: "Fire Alarm Design", category: "Installation Design" },
    
    // Modern Systems (NEW - Phase 5)
    { value: "ev-charging", label: "EV Charging", category: "Modern Systems" },
    { value: "renewable-integration", label: "Renewable Integration", category: "Modern Systems" },
    { value: "battery-storage", label: "Battery Storage", category: "Modern Systems" },
    { value: "smart-grid", label: "Smart Grid", category: "Modern Systems" },
    { value: "energy-management", label: "Energy Management", category: "Modern Systems" },
    { value: "dc-systems", label: "DC Systems", category: "Modern Systems" },
    { value: "power-quality", label: "Power Quality", category: "Modern Systems" },
    { value: "efficiency-analysis", label: "Efficiency Analysis", category: "Modern Systems" },
    
    // Existing calculators
    { value: "voltage-drop", label: "Voltage Drop", category: "Design" },
    { value: "cable-size", label: "Cable Sizing", category: "Design" },
    { value: "load", label: "Load Assessment", category: "Design" },
    { value: "lumen", label: "Lighting (Lumens)", category: "Lighting" },
    { value: "instrumentation", label: "Instrumentation", category: "Control" },
    { value: "zs-values", label: "Maximum Zs Values", category: "Testing" },
    { value: "bs7671-zs-lookup", label: "BS 7671 Zs Lookup", category: "Testing" },
    { value: "adiabatic", label: "Adiabatic Equation", category: "Protection" },
    { value: "conduit-fill", label: "Conduit Fill", category: "Installation" },
    { value: "resistor-colour-code", label: "Resistor Colour Code", category: "Components" },
    { value: "ring-circuit", label: "Ring Circuit", category: "Testing" },
    { value: "diversity-factor", label: "Diversity Factor", category: "Design" },
    { value: "earth-fault-loop", label: "Earth Fault Loop", category: "Testing" },
    { value: "maximum-demand", label: "Maximum Demand", category: "Design" },
    { value: "rcd-trip-time", label: "RCD Trip Time", category: "Protection" },
    { value: "solar-pv", label: "Solar PV", category: "Renewable" },
    { value: "battery-backup", label: "Battery Backup", category: "Power Systems" },
    { value: "r1r2", label: "R1+R2 Calculation", category: "Testing" },
    { value: "pfc", label: "Prospective Fault Current", category: "Protection" },
    { value: "rcd-discrimination", label: "RCD Discrimination", category: "Protection" },
    { value: "cable-derating", label: "Cable Derating", category: "Design" },
    { value: "phase-rotation", label: "Phase Rotation", category: "Testing" },
  ];

  // Group calculators by category
  const groupedCalculators = calculatorOptions.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculatorOptions>);

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
              {Object.entries(groupedCalculators).map(([category, calcs]) => (
                <div key={category}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow bg-elec-gray/50">
                    {category}
                  </div>
                  {calcs.map((calc) => (
                    <SelectItem key={calc.value} value={calc.value} className="pl-4">
                      {calc.label}
                    </SelectItem>
                  ))}
                </div>
              ))}
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
