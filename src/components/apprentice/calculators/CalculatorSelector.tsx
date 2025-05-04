
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Activity, PlugZap, Sigma, Gauge } from "lucide-react";

interface CalculatorSelectorProps {
  calculatorType: string;
  setCalculatorType: (type: string) => void;
}

const CalculatorSelector = ({ calculatorType, setCalculatorType }: CalculatorSelectorProps) => {
  const calculators = [
    { value: "ohms-law", label: "Ohm's Law", icon: Zap },
    { value: "voltage-drop", label: "Voltage Drop", icon: Activity },
    { value: "power-factor", label: "Power Factor", icon: PlugZap },
    { value: "cable-size", label: "Cable Sizing", icon: Sigma },
    { value: "instrumentation", label: "4-20mA Scale", icon: Gauge },
  ];

  return (
    <div className="w-full">
      <Label htmlFor="calculator-type" className="text-lg font-medium mb-2 block">Select Calculator</Label>
      <Select value={calculatorType} onValueChange={setCalculatorType}>
        <SelectTrigger className="bg-elec-dark border-elec-yellow/20 w-full md:max-w-xs">
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
  );
};

export default CalculatorSelector;
