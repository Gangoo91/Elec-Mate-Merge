
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SmartInputSuggestions from "../smart-features/SmartInputSuggestions";

interface PowerFactorInputsProps {
  calculationMethod: "power" | "currentVoltage";
  setCalculationMethod: (method: "power" | "currentVoltage") => void;
  activePower: string;
  setActivePower: (value: string) => void;
  apparentPower: string;
  setApparentPower: (value: string) => void;
  current: string;
  setCurrent: (value: string) => void;
  voltage: string;
  setVoltage: (value: string) => void;
  errors: {[key: string]: string};
  clearError: (field: string) => void;
  calculatePowerFactor: () => void;
  resetCalculator: () => void;
}

const PowerFactorInputs = ({
  calculationMethod,
  setCalculationMethod,
  activePower,
  setActivePower,
  apparentPower,
  setApparentPower,
  current,
  setCurrent,
  voltage,
  setVoltage,
  errors,
  clearError,
  calculatePowerFactor,
  resetCalculator
}: PowerFactorInputsProps) => {
  
  return (
    <div className="space-y-4">
      {/* Calculator Method Selection */}
      <div className="flex gap-2 mb-4">
        <Button 
          variant={calculationMethod === "power" ? "default" : "outline"}
          onClick={() => setCalculationMethod("power")}
          className="flex-1"
        >
          Using Power Values
        </Button>
        <Button 
          variant={calculationMethod === "currentVoltage" ? "default" : "outline"}
          onClick={() => setCalculationMethod("currentVoltage")}
          className="flex-1"
        >
          Using I & V
        </Button>
      </div>

      {calculationMethod === "power" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="active-power">Active Power (kW or W)</Label>
            <Input 
              id="active-power" 
              type="number" 
              placeholder="Enter active power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={activePower}
              onChange={(e) => {
                setActivePower(e.target.value);
                clearError('activePower');
              }}
            />
            {errors.activePower && <p className="text-xs text-destructive">{errors.activePower}</p>}
            <p className="text-xs text-muted-foreground">Real power consumed by the load</p>
            <SmartInputSuggestions
              fieldType="power"
              currentValue={activePower}
              onSuggestionSelect={setActivePower}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apparent-power">Apparent Power (kVA or VA)</Label>
            <Input 
              id="apparent-power" 
              type="number" 
              placeholder="Enter apparent power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={apparentPower}
              onChange={(e) => {
                setApparentPower(e.target.value);
                clearError('apparentPower');
              }}
            />
            {errors.apparentPower && <p className="text-xs text-destructive">{errors.apparentPower}</p>}
            <p className="text-xs text-muted-foreground">Total power supplied to the circuit</p>
            <SmartInputSuggestions
              fieldType="power"
              currentValue={apparentPower}
              onSuggestionSelect={setApparentPower}
              calculatorType="power-factor"
            />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="active-power">Active Power (kW or W)</Label>
            <Input 
              id="active-power" 
              type="number" 
              placeholder="Enter active power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={activePower}
              onChange={(e) => {
                setActivePower(e.target.value);
                clearError('activePower');
              }}
            />
            {errors.activePower && <p className="text-xs text-destructive">{errors.activePower}</p>}
            <SmartInputSuggestions
              fieldType="power"
              currentValue={activePower}
              onSuggestionSelect={setActivePower}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="voltage">Voltage (V)</Label>
            <Input 
              id="voltage" 
              type="number" 
              placeholder="Enter voltage" 
              className="bg-elec-dark border-elec-yellow/20"
              value={voltage}
              onChange={(e) => {
                setVoltage(e.target.value);
                clearError('voltage');
              }}
            />
            {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
            <SmartInputSuggestions
              fieldType="voltage"
              currentValue={voltage}
              onSuggestionSelect={setVoltage}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current">Current (A)</Label>
            <Input 
              id="current" 
              type="number" 
              placeholder="Enter current" 
              className="bg-elec-dark border-elec-yellow/20"
              value={current}
              onChange={(e) => {
                setCurrent(e.target.value);
                clearError('current');
              }}
            />
            {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
            <SmartInputSuggestions
              fieldType="current"
              currentValue={current}
              onSuggestionSelect={setCurrent}
              calculatorType="power-factor"
            />
          </div>
        </>
      )}

      <div className="flex space-x-3 pt-2">
        <Button onClick={calculatePowerFactor} className="flex-1">Calculate</Button>
        <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
      </div>
    </div>
  );
};

export default PowerFactorInputs;
