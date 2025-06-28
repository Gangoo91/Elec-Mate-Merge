
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SmartInputSuggestions from "../smart-features/SmartInputSuggestions";

interface ThreePhaseInputsProps {
  power: string;
  setPower: (value: string) => void;
  voltage: string;
  setVoltage: (value: string) => void;
  powerFactor: string;
  setPowerFactor: (value: string) => void;
  efficiency: string;
  setEfficiency: (value: string) => void;
  calculationMethod: 'power-to-current' | 'current-to-power';
  setCalculationMethod: (method: 'power-to-current' | 'current-to-power') => void;
  errors: {[key: string]: string};
  clearError: (field: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const ThreePhaseInputs: React.FC<ThreePhaseInputsProps> = ({
  power,
  setPower,
  voltage,
  setVoltage,
  powerFactor,
  setPowerFactor,
  efficiency,
  setEfficiency,
  calculationMethod,
  setCalculationMethod,
  errors,
  clearError,
  onCalculate,
  onReset
}) => {
  return (
    <div className="space-y-4">
      {/* Calculation Method */}
      <div className="space-y-2">
        <Label htmlFor="calculation-method">Calculation Method</Label>
        <Select value={calculationMethod} onValueChange={setCalculationMethod}>
          <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="power-to-current">Power to Current</SelectItem>
            <SelectItem value="current-to-power">Current to Power</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Power Input */}
      <div className="space-y-2">
        <Label htmlFor="power">Power (kW)</Label>
        <Input
          id="power"
          type="number"
          placeholder="Enter power in kW"
          className="bg-elec-dark border-elec-yellow/20"
          value={power}
          onChange={(e) => {
            setPower(e.target.value);
            clearError('power');
          }}
        />
        {errors.power && <p className="text-xs text-destructive">{errors.power}</p>}
        <p className="text-xs text-muted-foreground">Total three-phase power consumption</p>
        <SmartInputSuggestions
          fieldType="power"
          currentValue={power}
          onSuggestionSelect={setPower}
          calculatorType="three-phase-load"
        />
      </div>

      {/* Voltage Input */}
      <div className="space-y-2">
        <Label htmlFor="voltage">Line Voltage (V)</Label>
        <Input
          id="voltage"
          type="number"
          placeholder="Enter line voltage"
          className="bg-elec-dark border-elec-yellow/20"
          value={voltage}
          onChange={(e) => {
            setVoltage(e.target.value);
            clearError('voltage');
          }}
        />
        {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
        <p className="text-xs text-muted-foreground">Line-to-line voltage (RMS)</p>
        <SmartInputSuggestions
          fieldType="voltage"
          currentValue={voltage}
          onSuggestionSelect={setVoltage}
          calculatorType="three-phase-load"
        />
      </div>

      {/* Power Factor Input */}
      <div className="space-y-2">
        <Label htmlFor="power-factor">Power Factor</Label>
        <Input
          id="power-factor"
          type="number"
          step="0.01"
          min="0.1"
          max="1"
          placeholder="Enter power factor"
          className="bg-elec-dark border-elec-yellow/20"
          value={powerFactor}
          onChange={(e) => {
            setPowerFactor(e.target.value);
            clearError('powerFactor');
          }}
        />
        {errors.powerFactor && <p className="text-xs text-destructive">{errors.powerFactor}</p>}
        <p className="text-xs text-muted-foreground">Typical range: 0.8-0.95 for motors</p>
      </div>

      {/* Efficiency Input */}
      <div className="space-y-2">
        <Label htmlFor="efficiency">Efficiency (%)</Label>
        <Input
          id="efficiency"
          type="number"
          step="0.01"
          min="0.1"
          max="1"
          placeholder="Enter efficiency"
          className="bg-elec-dark border-elec-yellow/20"
          value={efficiency}
          onChange={(e) => {
            setEfficiency(e.target.value);
            clearError('efficiency');
          }}
        />
        {errors.efficiency && <p className="text-xs text-destructive">{errors.efficiency}</p>}
        <p className="text-xs text-muted-foreground">Motor efficiency (0.85-0.95 typical)</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <Button onClick={onCalculate} className="flex-1">Calculate</Button>
        <Button variant="outline" onClick={onReset} className="flex-1">Reset</Button>
      </div>
    </div>
  );
};

export default ThreePhaseInputs;
