
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Activity, PlugZap, Calculator, Variable, Gauge, Sigma, Wrench, Cable, RotateCw } from "lucide-react";

interface CalculatorSelectorProps {
  calculatorType: string;
  setCalculatorType: (type: string) => void;
}

const CalculatorSelector = ({ calculatorType, setCalculatorType }: CalculatorSelectorProps) => {
  // Define calculators based on the route - could be expanded to check if we're in electrician or apprentice route
  const calculators = [
    { value: "ohms-law", label: "Ohm's Law", icon: Zap },
    { value: "voltage-drop", label: "Voltage Drop", icon: Activity },
    { value: "power-factor", label: "Power Factor", icon: PlugZap },
    { value: "load", label: "Load Calculator", icon: Calculator },
    { value: "cable-size", label: "Cable Sizing", icon: Cable },
    { value: "lumen", label: "Lumen Calculator", icon: Variable },
    { value: "instrumentation", label: "4-20mA Scale", icon: Gauge },
    { value: "zs-values", label: "Zs Values", icon: Zap },
    { value: "adiabatic", label: "Adiabatic Equation", icon: Sigma },
    { value: "conduit-fill", label: "Conduit Fill", icon: Calculator },
    { value: "resistor-colour-code", label: "Resistor Colour", icon: Sigma },
    { value: "ring-circuit", label: "Ring Circuit", icon: RotateCw },
    { value: "diversity-factor", label: "Diversity Factor", icon: Wrench },
    { value: "phase-rotation", label: "Phase Rotation", icon: RotateCw },
  ];

  // For mobile: Use dropdown
  // For larger screens: Use tabs
  return (
    <div className="w-full space-y-4">
      {/* Mobile view: Dropdown */}
      <div className="md:hidden w-full">
        <Label htmlFor="calculator-type" className="text-lg font-medium mb-2 block">Select Calculator</Label>
        <Select value={calculatorType} onValueChange={setCalculatorType}>
          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 w-full">
            <SelectValue placeholder="Select calculator type" />
          </SelectTrigger>
          <SelectContent className="bg-elec-dark border-elec-yellow/20">
            {calculators.map((calc) => (
              <SelectItem key={calc.value} value={calc.value}>
                <div className="flex items-center">
                  <calc.icon className="mr-2 h-4 w-4 text-elec-yellow" />
                  <span>{calc.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop view: Tabs */}
      <div className="hidden md:block">
        <Label className="text-lg font-medium mb-2 block">Select Calculator</Label>
        <Tabs value={calculatorType} onValueChange={setCalculatorType} className="w-full">
          <TabsList className="w-full overflow-x-auto">
            {calculators.map((calc) => (
              <TabsTrigger key={calc.value} value={calc.value} className="flex items-center gap-2">
                <calc.icon className="h-4 w-4" />
                {calc.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CalculatorSelector;
