import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import QuickCalculationPresets from "./smart-features/QuickCalculationPresets";
import { Info, Copy, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OhmsLawInputs {
  voltage: number | null;
  current: number | null;
  resistance: number | null;
  power: number | null;
  voltageUnit: string;
  currentUnit: string;
  resistanceUnit: string;
  powerUnit: string;
  solveFor: string;
}

interface OhmsLawResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  formula: string;
  stepByStep: string;
}

const OhmsLawCalculator = () => {
  const [inputs, setInputs] = useState<OhmsLawInputs>({
    voltage: null,
    current: null,
    resistance: null,
    power: null,
    voltageUnit: "V",
    currentUnit: "A",
    resistanceUnit: "Ω",
    powerUnit: "W",
    solveFor: "none"
  });
  
  const [result, setResult] = useState<OhmsLawResult | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Unit conversion factors to SI base units
  const unitConversions = {
    voltage: { mV: 0.001, V: 1, kV: 1000 },
    current: { mA: 0.001, A: 1, kA: 1000 },
    resistance: { mΩ: 0.001, Ω: 1, kΩ: 1000, MΩ: 1000000 },
    power: { mW: 0.001, W: 1, kW: 1000, MW: 1000000 }
  };

  const convertToSI = (value: number, unit: string, type: keyof typeof unitConversions) => {
    return value * unitConversions[type][unit as keyof typeof unitConversions[typeof type]];
  };

  const formatOutput = (value: number, type: keyof typeof unitConversions) => {
    if (value === 0) return "0";
    
    const absValue = Math.abs(value);
    if (type === "voltage") {
      if (absValue < 1) return `${(value * 1000).toFixed(1)} mV`;
      if (absValue < 1000) return `${value.toFixed(2)} V`;
      return `${(value / 1000).toFixed(3)} kV`;
    }
    if (type === "current") {
      if (absValue < 1) return `${(value * 1000).toFixed(1)} mA`;
      if (absValue < 1000) return `${value.toFixed(2)} A`;
      return `${(value / 1000).toFixed(3)} kA`;
    }
    if (type === "resistance") {
      if (absValue < 1) return `${(value * 1000).toFixed(1)} mΩ`;
      if (absValue < 1000) return `${value.toFixed(2)} Ω`;
      if (absValue < 1000000) return `${(value / 1000).toFixed(2)} kΩ`;
      return `${(value / 1000000).toFixed(2)} MΩ`;
    }
    if (type === "power") {
      if (absValue < 1) return `${(value * 1000).toFixed(1)} mW`;
      if (absValue < 1000) return `${value.toFixed(2)} W`;
      if (absValue < 1000000) return `${(value / 1000).toFixed(2)} kW`;
      return `${(value / 1000000).toFixed(2)} MW`;
    }
    return value.toFixed(2);
  };

  const calculateOhmsLaw = () => {
    // Convert all inputs to SI units
    const v = inputs.voltage ? convertToSI(inputs.voltage, inputs.voltageUnit, "voltage") : null;
    const i = inputs.current ? convertToSI(inputs.current, inputs.currentUnit, "current") : null;
    const r = inputs.resistance ? convertToSI(inputs.resistance, inputs.resistanceUnit, "resistance") : null;
    const p = inputs.power ? convertToSI(inputs.power, inputs.powerUnit, "power") : null;

    // Count valid inputs
    const validInputs = [v, i, r, p].filter(val => val !== null && val > 0);
    if (validInputs.length < 2) return;

    let calcV = 0, calcI = 0, calcR = 0, calcP = 0;
    let formula = "", stepByStep = "";

    try {
      // Calculate based on available pairs
      if (v !== null && i !== null) {
        calcV = v; calcI = i;
        calcR = v / i;
        calcP = v * i;
        formula = "V and I → R = V/I, P = V×I";
        stepByStep = `Given: V = ${formatOutput(v, "voltage")}, I = ${formatOutput(i, "current")}\nCalculated: R = ${formatOutput(v, "voltage")}/${formatOutput(i, "current")} = ${formatOutput(calcR, "resistance")}, P = ${formatOutput(v, "voltage")} × ${formatOutput(i, "current")} = ${formatOutput(calcP, "power")}`;
      } else if (v !== null && r !== null) {
        calcV = v; calcR = r;
        calcI = v / r;
        calcP = (v * v) / r;
        formula = "V and R → I = V/R, P = V²/R";
        stepByStep = `Given: V = ${formatOutput(v, "voltage")}, R = ${formatOutput(r, "resistance")}\nCalculated: I = ${formatOutput(v, "voltage")}/${formatOutput(r, "resistance")} = ${formatOutput(calcI, "current")}, P = ${formatOutput(v, "voltage")}²/${formatOutput(r, "resistance")} = ${formatOutput(calcP, "power")}`;
      } else if (i !== null && r !== null) {
        calcI = i; calcR = r;
        calcV = i * r;
        calcP = i * i * r;
        formula = "I and R → V = I×R, P = I²×R";
        stepByStep = `Given: I = ${formatOutput(i, "current")}, R = ${formatOutput(r, "resistance")}\nCalculated: V = ${formatOutput(i, "current")} × ${formatOutput(r, "resistance")} = ${formatOutput(calcV, "voltage")}, P = ${formatOutput(i, "current")}² × ${formatOutput(r, "resistance")} = ${formatOutput(calcP, "power")}`;
      } else if (v !== null && p !== null) {
        calcV = v; calcP = p;
        calcI = p / v;
        calcR = (v * v) / p;
        formula = "V and P → I = P/V, R = V²/P";
        stepByStep = `Given: V = ${formatOutput(v, "voltage")}, P = ${formatOutput(p, "power")}\nCalculated: I = ${formatOutput(p, "power")}/${formatOutput(v, "voltage")} = ${formatOutput(calcI, "current")}, R = ${formatOutput(v, "voltage")}²/${formatOutput(p, "power")} = ${formatOutput(calcR, "resistance")}`;
      } else if (i !== null && p !== null) {
        calcI = i; calcP = p;
        calcV = p / i;
        calcR = p / (i * i);
        formula = "I and P → V = P/I, R = P/I²";
        stepByStep = `Given: I = ${formatOutput(i, "current")}, P = ${formatOutput(p, "power")}\nCalculated: V = ${formatOutput(p, "power")}/${formatOutput(i, "current")} = ${formatOutput(calcV, "voltage")}, R = ${formatOutput(p, "power")}/${formatOutput(i, "current")}² = ${formatOutput(calcR, "resistance")}`;
      } else if (r !== null && p !== null) {
        calcR = r; calcP = p;
        calcV = Math.sqrt(p * r);
        calcI = Math.sqrt(p / r);
        formula = "R and P → V = √(P×R), I = √(P/R)";
        stepByStep = `Given: R = ${formatOutput(r, "resistance")}, P = ${formatOutput(p, "power")}\nCalculated: V = √(${formatOutput(p, "power")} × ${formatOutput(r, "resistance")}) = ${formatOutput(calcV, "voltage")}, I = √(${formatOutput(p, "power")}/${formatOutput(r, "resistance")}) = ${formatOutput(calcI, "current")}`;
      }

      // Check for invalid results
      if (!isFinite(calcV) || !isFinite(calcI) || !isFinite(calcR) || !isFinite(calcP) ||
          calcV < 0 || calcI < 0 || calcR < 0 || calcP < 0) {
        throw new Error("Invalid calculation result");
      }

      const calculatedResult = {
        voltage: calcV,
        current: calcI,
        resistance: calcR,
        power: calcP,
        formula,
        stepByStep
      };

      setResult(calculatedResult);

      // Skip validation for now - component doesn't exist
      setValidationResult(null);

    } catch (error) {
      setResult(null);
      setValidationResult(null);
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateOhmsLaw();
  }, [inputs]);

  const handleInputChange = (field: keyof OhmsLawInputs, value: string | number | null) => {
    if (field.includes("Unit")) {
      setInputs(prev => ({ ...prev, [field]: value }));
    } else {
      const numValue = typeof value === "string" ? (value === "" ? null : parseFloat(value)) : value;
      setInputs(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const handlePresetSelect = (preset: any) => {
    const newInputs = { ...inputs };
    if (preset.voltage !== undefined) {
      newInputs.voltage = preset.voltage;
      newInputs.voltageUnit = "V";
    }
    if (preset.current !== undefined) {
      newInputs.current = preset.current;
      newInputs.currentUnit = "A";
    }
    if (preset.resistance !== undefined) {
      newInputs.resistance = preset.resistance;
      newInputs.resistanceUnit = "Ω";
    }
    if (preset.power !== undefined) {
      newInputs.power = preset.power;
      newInputs.powerUnit = "W";
    }
    setInputs(newInputs);
  };

  const copyToClipboard = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: `${field} value copied: ${value}`
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setInputs({
      voltage: null,
      current: null,
      resistance: null,
      power: null,
      voltageUnit: "V",
      currentUnit: "A",
      resistanceUnit: "Ω",
      powerUnit: "W",
      solveFor: "none"
    });
    setResult(null);
    setValidationResult(null);
  };

  const getValidInputCount = () => {
    return [inputs.voltage, inputs.current, inputs.resistance, inputs.power]
      .filter(val => val !== null && val > 0).length;
  };

  const getContextualMeaning = () => {
    if (!result) return null;
    
    const meanings = [];
    if (result.current > 13) {
      meanings.push("Current exceeds UK plug top 13A rating - consider dedicated circuit");
    }
    if (result.power > 3000) {
      meanings.push("High power load - ensure adequate cooling and circuit capacity");
    }
    if (result.voltage > 50) {
      meanings.push("Voltage above SELV limits - shock risk precautions required");
    }
    if (result.resistance < 0.1) {
      meanings.push("Very low resistance - check for potential short circuit");
    }
    if (result.power > 2000 && result.voltage === 230) {
      meanings.push("Domestic load >2kW typically requires dedicated circuit");
    }
    
    return meanings.length > 0 ? meanings : null;
  };

  // Create options for MobileSelectWrapper
  const solveForOptions = [
    { value: "none", label: "Calculate from any 2 values" },
    { value: "voltage", label: "Voltage (V)" },
    { value: "current", label: "Current (I)" },
    { value: "resistance", label: "Resistance (R)" },
    { value: "power", label: "Power (P)" }
  ];

  const voltageUnitOptions = [
    { value: "mV", label: "mV" },
    { value: "V", label: "V" },
    { value: "kV", label: "kV" }
  ];

  const currentUnitOptions = [
    { value: "mA", label: "mA" },
    { value: "A", label: "A" },
    { value: "kA", label: "kA" }
  ];

  const resistanceUnitOptions = [
    { value: "mΩ", label: "mΩ" },
    { value: "Ω", label: "Ω" },
    { value: "kΩ", label: "kΩ" },
    { value: "MΩ", label: "MΩ" }
  ];

  const powerUnitOptions = [
    { value: "mW", label: "mW" },
    { value: "W", label: "W" },
    { value: "kW", label: "kW" },
    { value: "MW", label: "MW" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Presets */}
      <QuickCalculationPresets
        calculatorType="ohms-law"
        onPresetSelect={handlePresetSelect}
      />

      <Card className="bg-elec-gray/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Ohm's Law Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Solve For Selection */}
          <MobileSelectWrapper
            label="Solve For (Optional)"
            value={inputs.solveFor}
            onValueChange={(value) => handleInputChange("solveFor", value)}
            options={solveForOptions}
          />

          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Voltage Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Voltage</label>
              <div className="flex gap-2">
                <MobileInputWrapper
                  value={inputs.voltage?.toString() || ""}
                  onChange={(value) => handleInputChange("voltage", value)}
                  placeholder="Enter voltage"
                  type="number"
                  disabled={inputs.solveFor === "voltage"}
                />
                <div className="w-20">
                  <MobileSelectWrapper
                    value={inputs.voltageUnit}
                    onValueChange={(value) => handleInputChange("voltageUnit", value)}
                    options={voltageUnitOptions}
                  />
                </div>
              </div>
            </div>

            {/* Current Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Current</label>
              <div className="flex gap-2">
                <MobileInputWrapper
                  value={inputs.current?.toString() || ""}
                  onChange={(value) => handleInputChange("current", value)}
                  placeholder="Enter current"
                  type="number"
                  disabled={inputs.solveFor === "current"}
                />
                <div className="w-20">
                  <MobileSelectWrapper
                    value={inputs.currentUnit}
                    onValueChange={(value) => handleInputChange("currentUnit", value)}
                    options={currentUnitOptions}
                  />
                </div>
              </div>
            </div>

            {/* Resistance Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Resistance</label>
              <div className="flex gap-2">
                <MobileInputWrapper
                  value={inputs.resistance?.toString() || ""}
                  onChange={(value) => handleInputChange("resistance", value)}
                  placeholder="Enter resistance"
                  type="number"
                  disabled={inputs.solveFor === "resistance"}
                />
                <div className="w-20">
                  <MobileSelectWrapper
                    value={inputs.resistanceUnit}
                    onValueChange={(value) => handleInputChange("resistanceUnit", value)}
                    options={resistanceUnitOptions}
                  />
                </div>
              </div>
            </div>

            {/* Power Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Power</label>
              <div className="flex gap-2">
                <MobileInputWrapper
                  value={inputs.power?.toString() || ""}
                  onChange={(value) => handleInputChange("power", value)}
                  placeholder="Enter power"
                  type="number"
                  disabled={inputs.solveFor === "power"}
                />
                <div className="w-20">
                  <MobileSelectWrapper
                    value={inputs.powerUnit}
                    onValueChange={(value) => handleInputChange("powerUnit", value)}
                    options={powerUnitOptions}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={calculateOhmsLaw} 
              className="flex-1"
              disabled={getValidInputCount() < 2}
            >
              Calculate ({getValidInputCount()}/2 values)
            </Button>
            <Button onClick={reset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <Card className="bg-card/50">
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold text-lg">Results</h3>
                  
                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Voltage</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(formatOutput(result.voltage, "voltage"), "Voltage")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "Voltage" ? 
                            <CheckCircle className="h-3 w-3" /> : 
                            <Copy className="h-3 w-3" />
                          }
                        </Button>
                      </div>
                      <p className="font-mono text-lg">{formatOutput(result.voltage, "voltage")}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(formatOutput(result.current, "current"), "Current")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "Current" ? 
                            <CheckCircle className="h-3 w-3" /> : 
                            <Copy className="h-3 w-3" />
                          }
                        </Button>
                      </div>
                      <p className="font-mono text-lg">{formatOutput(result.current, "current")}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Resistance</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(formatOutput(result.resistance, "resistance"), "Resistance")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "Resistance" ? 
                            <CheckCircle className="h-3 w-3" /> : 
                            <Copy className="h-3 w-3" />
                          }
                        </Button>
                      </div>
                      <p className="font-mono text-lg">{formatOutput(result.resistance, "resistance")}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Power</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(formatOutput(result.power, "power"), "Power")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "Power" ? 
                            <CheckCircle className="h-3 w-3" /> : 
                            <Copy className="h-3 w-3" />
                          }
                        </Button>
                      </div>
                      <p className="font-mono text-lg">{formatOutput(result.power, "power")}</p>
                    </div>
                  </div>

                  {/* Formula and Step-by-Step */}
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded border-l-4 border-primary">
                      <p className="text-sm font-medium">Formula Used:</p>
                      <p className="text-sm text-muted-foreground">{result.formula}</p>
                    </div>
                    
                    <div className="p-3 bg-muted/30 rounded">
                      <p className="text-sm font-medium mb-2">Step-by-Step:</p>
                      <p className="text-xs text-muted-foreground whitespace-pre-line font-mono">
                        {result.stepByStep}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Validation - Coming soon */}

              {/* Contextual Meaning */}
              {getContextualMeaning() && (
                <Card className="bg-amber-500/10 border-amber-500/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-amber-200">What this means:</h4>
                    <ul className="space-y-1 text-sm text-amber-200/80">
                      {getContextualMeaning()?.map((meaning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Formulas Reference */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Ohm's Law Relationships:</strong><br />
              • V = I × R (Voltage = Current × Resistance)<br />
              • I = V / R (Current = Voltage / Resistance)<br />
              • R = V / I (Resistance = Voltage / Current)<br />
              • P = V × I = I² × R = V² / R (Power formulas)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default OhmsLawCalculator;