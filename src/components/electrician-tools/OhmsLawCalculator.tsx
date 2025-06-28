import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ValidationIndicator from "@/components/apprentice/calculators/ValidationIndicator";
import { CalculatorValidator } from "@/services/calculatorValidation";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [validation, setValidation] = useState<any>(null);

  const clearValidation = () => {
    setValidation(null);
  };

  const validateAndCalculate = (calcType: string) => {
    // Convert inputs to numbers for validation
    const V = parseFloat(voltage) || 0;
    const I = parseFloat(current) || 0;
    const R = parseFloat(resistance) || 0;
    const P = parseFloat(power) || 0;

    // Perform Ohm's Law validation
    const validation = CalculatorValidator.validateOhmsLaw(V, I, R, P);
    setValidation(validation);

    // Continue with existing calculation logic
    switch (calcType) {
      case 'voltage':
        if (current && resistance) {
          const V = parseFloat(current) * parseFloat(resistance);
          setVoltage(V.toString());
        }
        break;
      case 'current':
        if (voltage && resistance) {
          const I = parseFloat(voltage) / parseFloat(resistance);
          setCurrent(I.toString());
        }
        break;
      case 'resistance':
        if (voltage && current) {
          const R = parseFloat(voltage) / parseFloat(current);
          setResistance(R.toString());
        }
        break;
      case 'power':
        if (voltage && current) {
          const P = parseFloat(voltage) * parseFloat(current);
          setPower(P.toString());
        }
        break;
    }
  };

  const calculateVoltage = () => validateAndCalculate('voltage');
  const calculateCurrent = () => validateAndCalculate('current');
  const calculateResistance = () => validateAndCalculate('resistance');
  const calculatePower = () => validateAndCalculate('power');

  const resetCalculator = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setValidation(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Ohm's Law Calculator</CardTitle>
        <CardDescription>
          Calculate voltage, current, resistance, or power using Ohm's Law.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
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
                  clearValidation();
                }}
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
                  clearValidation();
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ω)</Label>
              <Input
                id="resistance"
                type="number"
                placeholder="Enter resistance"
                className="bg-elec-dark border-elec-yellow/20"
                value={resistance}
                onChange={(e) => {
                  setResistance(e.target.value);
                  clearValidation();
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="power">Power (W)</Label>
              <Input
                id="power"
                type="number"
                placeholder="Enter power"
                className="bg-elec-dark border-elec-yellow/20"
                value={power}
                onChange={(e) => {
                  setPower(e.target.value);
                  clearValidation();
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={calculateVoltage} className="flex-1 min-w-[120px]">Calculate Voltage</Button>
              <Button onClick={calculateCurrent} className="flex-1 min-w-[120px]">Calculate Current</Button>
              <Button onClick={calculateResistance} className="flex-1 min-w-[120px]">Calculate Resistance</Button>
              <Button onClick={calculatePower} className="flex-1 min-w-[120px]">Calculate Power</Button>
              <Button variant="outline" onClick={resetCalculator} className="flex-1 min-w-[120px]">Reset</Button>
            </div>
          </div>

          <div className="rounded-md bg-elec-dark p-6 flex flex-col justify-center">
            <ValidationIndicator validation={validation} calculationType="Ohm's Law" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OhmsLawCalculator;
