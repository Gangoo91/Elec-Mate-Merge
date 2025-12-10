
import { useState } from "react";
import { MobileInput } from "@/components/ui/mobile-input";
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
  targetPF: string;
  setTargetPF: (value: string) => void;
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
  targetPF,
  setTargetPF,
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
            <MobileInput 
              id="active-power" 
              label="Active Power (kW or W)"
              type="text"
              inputMode="decimal"
              placeholder="Enter active power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={activePower}
              onChange={(e) => {
                setActivePower(e.target.value);
                clearError('activePower');
              }}
              error={errors.activePower}
              hint="Real power consumed by the load"
            />
            <SmartInputSuggestions
              fieldType="power"
              currentValue={activePower}
              onSuggestionSelect={setActivePower}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <MobileInput 
              id="apparent-power" 
              label="Apparent Power (kVA or VA)"
              type="text"
              inputMode="decimal"
              placeholder="Enter apparent power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={apparentPower}
              onChange={(e) => {
                setApparentPower(e.target.value);
                clearError('apparentPower');
              }}
              error={errors.apparentPower}
              hint="Total power supplied to the circuit"
            />
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
            <MobileInput 
              id="active-power-iv" 
              label="Active Power (kW or W)"
              type="text"
              inputMode="decimal"
              placeholder="Enter active power" 
              className="bg-elec-dark border-elec-yellow/20"
              value={activePower}
              onChange={(e) => {
                setActivePower(e.target.value);
                clearError('activePower');
              }}
              error={errors.activePower}
            />
            <SmartInputSuggestions
              fieldType="power"
              currentValue={activePower}
              onSuggestionSelect={setActivePower}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <MobileInput 
              id="voltage" 
              label="Voltage (V)"
              type="text"
              inputMode="decimal"
              placeholder="Enter voltage" 
              className="bg-elec-dark border-elec-yellow/20"
              value={voltage}
              onChange={(e) => {
                setVoltage(e.target.value);
                clearError('voltage');
              }}
              error={errors.voltage}
            />
            <SmartInputSuggestions
              fieldType="voltage"
              currentValue={voltage}
              onSuggestionSelect={setVoltage}
              calculatorType="power-factor"
            />
          </div>
          <div className="space-y-2">
            <MobileInput 
              id="current" 
              label="Current (A)"
              type="text"
              inputMode="decimal"
              placeholder="Enter current" 
              className="bg-elec-dark border-elec-yellow/20"
              value={current}
              onChange={(e) => {
                setCurrent(e.target.value);
                clearError('current');
              }}
              error={errors.current}
            />
            <SmartInputSuggestions
              fieldType="current"
              currentValue={current}
              onSuggestionSelect={setCurrent}
              calculatorType="power-factor"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <MobileInput 
          id="target-pf" 
          label="Target Power Factor"
          type="text"
          inputMode="decimal"
          placeholder="e.g., 0.95" 
          className="bg-elec-dark border-elec-yellow/20"
          value={targetPF}
          onChange={(e) => {
            setTargetPF(e.target.value);
            clearError('targetPF');
          }}
          error={errors.targetPF}
          hint="Used to estimate capacitor size for PF correction"
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <Button onClick={calculatePowerFactor} className="flex-1">Calculate</Button>
        <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
      </div>
    </div>
  );
};

export default PowerFactorInputs;
