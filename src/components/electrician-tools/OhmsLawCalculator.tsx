
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CalculatorValidator, ValidationResult } from "@/services/calculatorValidation";
import ValidationIndicator from "@/components/apprentice/calculators/ValidationIndicator";
import CalculationReport from "@/components/apprentice/calculators/CalculationReport";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [calculationType, setCalculationType] = useState<"voltage" | "current" | "resistance">("voltage");
  const [result, setResult] = useState<string>("");
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});
  const { toast } = useToast();

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    let calculatedValue: number;
    let validationResult: ValidationResult;

    try {
      if (calculationType === "voltage") {
        if (!current || !resistance) {
          toast({
            title: "Input Required",
            description: "Please enter current and resistance values to calculate voltage.",
            variant: "destructive",
          });
          return;
        }
        calculatedValue = i * r;
        validationResult = CalculatorValidator.validateOhmsLaw(calculatedValue, i, r, 'voltage');
        setResult(`${calculatedValue.toFixed(2)} V`);
        setCalculationInputs({ current: i, resistance: r });
        setCalculationResults({ voltage: calculatedValue, power: calculatedValue * i });
      } else if (calculationType === "current") {
        if (!voltage || !resistance) {
          toast({
            title: "Input Required",
            description: "Please enter voltage and resistance values to calculate current.",
            variant: "destructive",
          });
          return;
        }
        calculatedValue = v / r;
        validationResult = CalculatorValidator.validateOhmsLaw(v, calculatedValue, r, 'current');
        setResult(`${calculatedValue.toFixed(2)} A`);
        setCalculationInputs({ voltage: v, resistance: r });
        setCalculationResults({ current: calculatedValue, power: v * calculatedValue });
      } else {
        if (!voltage || !current) {
          toast({
            title: "Input Required",
            description: "Please enter voltage and current values to calculate resistance.",
            variant: "destructive",
          });
          return;
        }
        calculatedValue = v / i;
        validationResult = CalculatorValidator.validateOhmsLaw(v, i, calculatedValue, 'resistance');
        setResult(`${calculatedValue.toFixed(2)} Ω`);
        setCalculationInputs({ voltage: v, current: i });
        setCalculationResults({ resistance: calculatedValue, power: v * i });
      }

      setValidation(validationResult);

      if (validationResult.isValid && validationResult.warnings.length === 0) {
        toast({
          title: "Calculation Complete",
          description: `${calculationType.charAt(0).toUpperCase() + calculationType.slice(1)} calculated successfully - BS 7671 compliant`,
          variant: "default",
        });
      } else if (validationResult.warnings.length > 0) {
        toast({
          title: "Calculation Complete with Warnings",
          description: "Please review validation warnings below",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your input values.",
        variant: "destructive",
      });
    }
  };

  const resetCalculator = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setResult("");
    setValidation(null);
    setCalculationInputs({});
    setCalculationResults({});
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Ohm's Law Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate voltage, current, or resistance using Ohm's Law (V = I × R) with BS 7671 validation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="calculation-type">Calculate</Label>
                <Select value={calculationType} onValueChange={(value: "voltage" | "current" | "resistance") => setCalculationType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voltage">Voltage (V)</SelectItem>
                    <SelectItem value="current">Current (I)</SelectItem>
                    <SelectItem value="resistance">Resistance (R)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculationType !== "voltage" && (
                <div>
                  <Label htmlFor="voltage">Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    placeholder="Enter voltage in volts"
                  />
                </div>
              )}

              {calculationType !== "current" && (
                <div>
                  <Label htmlFor="current">Current (A)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="Enter current in amperes"
                  />
                </div>
              )}

              {calculationType !== "resistance" && (
                <div>
                  <Label htmlFor="resistance">Resistance (Ω)</Label>
                  <Input
                    id="resistance"
                    type="number"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                    placeholder="Enter resistance in ohms"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={calculate} className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </Button>
                <Button onClick={resetCalculator} variant="outline" size="icon" className="border-elec-yellow/20">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-elec-dark rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-elec-yellow">Result</h3>
              {result ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">{result}</div>
                  <div className="text-sm text-muted-foreground">
                    Using Ohm's Law: V = I × R
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Enter values and click calculate to see the result
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <ValidationIndicator validation={validation} calculationType="Ohm's Law" />

      {/* Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Ohm's Law"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default OhmsLawCalculator;
