
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Activity, PlugZap, Sigma, Gauge } from "lucide-react";

interface CalculatorSelectorProps {
  calculatorType: string;
  setCalculatorType: (type: string) => void;
}

const CalculatorSelector = ({ calculatorType, setCalculatorType }: CalculatorSelectorProps) => {
  return (
    <div className="w-full">
      <Label htmlFor="calculator-type" className="text-lg font-medium mb-2 block">Select Calculator</Label>
      <Select value={calculatorType} onValueChange={setCalculatorType}>
        <SelectTrigger className="bg-elec-dark border-elec-yellow/20 w-full md:max-w-xs">
          <SelectValue placeholder="Select calculator type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ohms-law">
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-elec-yellow" />
              <span>Ohm's Law</span>
            </div>
          </SelectItem>
          <SelectItem value="voltage-drop">
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-elec-yellow" />
              <span>Voltage Drop</span>
            </div>
          </SelectItem>
          <SelectItem value="power-factor">
            <div className="flex items-center">
              <PlugZap className="mr-2 h-4 w-4 text-elec-yellow" />
              <span>Power Factor</span>
            </div>
          </SelectItem>
          <SelectItem value="cable-size">
            <div className="flex items-center">
              <Sigma className="mr-2 h-4 w-4 text-elec-yellow" />
              <span>Cable Sizing</span>
            </div>
          </SelectItem>
          <SelectItem value="instrumentation">
            <div className="flex items-center">
              <Gauge className="mr-2 h-4 w-4 text-elec-yellow" />
              <span>4-20mA Scale</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CalculatorSelector;
