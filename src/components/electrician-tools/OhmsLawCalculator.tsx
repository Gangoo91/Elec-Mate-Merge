
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CalculatorValidator } from "@/services/calculatorValidation";
import ValidationIndicator from "@/components/apprentice/calculators/ValidationIndicator";
import CalculationReport from "@/components/apprentice/calculators/CalculationReport";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("230");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [validation, setValidation] = useState<any>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});

  const calculateOhmsLaw = () => {
    // Input validation
    const voltageVal = parseFloat(voltage);
    const currentVal = parseFloat(current);
    const resistanceVal = parseFloat(resistance);

    // Validate inputs
    const voltageValidation = CalculatorValidator.validateInputRange(voltageVal, 'voltage');
    const currentValidation = current ? CalculatorValidator.validateInputRange(currentVal, 'current') : null;
    const resistanceValidation = resistance ? CalculatorValidator.validateInputRange(resistanceVal, 'resistance') : null;

    // Count filled inputs
    const filledInputs = [voltage, current, resistance].filter(val => val && val !== "").length;
    
    if (filledInputs !== 2) {
      toast({
        title: "Input Error",
        description: "Please enter exactly two values to calculate the third.",
        variant: "destructive",
      });
      return;
    }

    let calculatedValue: number;
    let resultText: string;
    let inputs: any = {};
    let results: any = {};

    // Perform calculations based on available inputs
    if (voltage && current && !resistance) {
      // Calculate resistance: R = V / I
      calculatedValue = voltageVal / currentVal;
      setResistance(calculatedValue.toFixed(2));
      resultText = `Resistance: ${calculatedValue.toFixed(2)} Ω`;
      inputs = { voltage: voltageVal, current: currentVal };
      results = { resistance: calculatedValue, power: voltageVal * currentVal };
    } else if (voltage && !current && resistance) {
      // Calculate current: I = V / R
      calculatedValue = voltageVal / resistanceVal;
      setCurrent(calculatedValue.toFixed(2));
      resultText = `Current: ${calculatedValue.toFixed(2)} A`;
      inputs = { voltage: voltageVal, resistance: resistanceVal };
      results = { current: calculatedValue, power: voltageVal * calculatedValue };
    } else if (!voltage && current && resistance) {
      // Calculate voltage: V = I × R
      calculatedValue = currentVal * resistanceVal;
      setVoltage(calculatedValue.toFixed(2));
      resultText = `Voltage: ${calculatedValue.toFixed(2)} V`;
      inputs = { current: currentVal, resistance: resistanceVal };
      results = { voltage: calculatedValue, power: calculatedValue * currentVal };
    } else {
      toast({
        title: "Calculation Error",
        description: "Please leave one field empty to calculate its value.",
        variant: "destructive",
      });
      return;
    }

    // Validate the final calculation
    const finalVoltage = parseFloat(voltage) || calculatedValue;
    const finalCurrent = parseFloat(current) || calculatedValue;
    const finalResistance = parseFloat(resistance) || calculatedValue;

    const ohmsLawValidation = CalculatorValidator.validateOhmsLaw(
      finalVoltage, 
      finalCurrent, 
      finalResistance
    );

    // Combine all validations
    const combinedValidation = {
      isValid: ohmsLawValidation.isValid && 
               (!voltageValidation || voltageValidation.isValid) &&
               (!currentValidation || currentValidation.isValid) &&
               (!resistanceValidation || resistanceValidation.isValid),
      errors: [
        ...ohmsLawValidation.errors,
        ...(voltageValidation?.errors || []),
        ...(currentValidation?.errors || []),
        ...(resistanceValidation?.errors || [])
      ],
      warnings: [
        ...ohmsLawValidation.warnings,
        ...(voltageValidation?.warnings || []),
        ...(currentValidation?.warnings || []),
        ...(resistanceValidation?.warnings || [])
      ],
      standardsCompliance: ohmsLawValidation.standardsCompliance
    };

    setResult(resultText);
    setValidation(combinedValidation);
    setCalculationInputs(inputs);
    setCalculationResults(results);

    // Show appropriate toast
    if (combinedValidation.isValid) {
      toast({
        title: "Calculation Complete",
        description: "Result validated against electrical standards",
        variant: "default",
      });
    } else {
      toast({
        title: "Validation Issues",
        description: "Please review warnings and errors",
        variant: "destructive",
      });
    }
  };

  const resetOhmsLaw = () => {
    setVoltage("230");
    setCurrent("");
    setResistance("");
    setResult(null);
    setValidation(null);
    setCalculationInputs({});
    setCalculationResults({});
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Ohm's Law Calculator
          </CardTitle>
          <CardDescription>
            Calculate voltage, current or resistance using Ohm's Law (V = I × R) with professional validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                placeholder="Enter voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (A)</Label>
              <Input
                id="current"
                type="number"
                placeholder="Enter current"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ω)</Label>
              <Input
                id="resistance"
                type="number"
                placeholder="Enter resistance"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90" onClick={calculateOhmsLaw}>
              Calculate & Validate
            </Button>
            <Button variant="outline" className="flex-1" onClick={resetOhmsLaw}>
              Reset
            </Button>
          </div>
          
          {result && (
            <div className="bg-elec-yellow/10 p-3 rounded-md border border-elec-yellow/20 text-center">
              <p className="font-semibold text-elec-yellow">{result}</p>
              {calculationResults.power && (
                <p className="text-sm text-muted-foreground mt-1">
                  Power: {calculationResults.power.toFixed(2)} W
                </p>
              )}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground pt-2">
            Enter any two values to calculate the third using Ohm's Law (V = I × R). 
            All calculations are validated against UK electrical standards.
          </p>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <ValidationIndicator validation={validation} calculationType="Ohm's Law" />

      {/* Calculation Report */}
      {validation && (
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
