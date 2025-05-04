
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [calculationResult, setCalculationResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    let filledCount = 0;
    
    if (voltage && parseFloat(voltage) <= 0) newErrors.voltage = "Voltage must be greater than 0";
    else if (voltage) filledCount++;
    
    if (current && parseFloat(current) <= 0) newErrors.current = "Current must be greater than 0";
    else if (current) filledCount++;
    
    if (resistance && parseFloat(resistance) <= 0) newErrors.resistance = "Resistance must be greater than 0";
    else if (resistance) filledCount++;
    
    if (power && parseFloat(power) <= 0) newErrors.power = "Power must be greater than 0";
    else if (power) filledCount++;
    
    if (filledCount !== 2) {
      newErrors.general = "Please enter exactly two values to calculate the others";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateOhmsLaw = () => {
    if (!validateInputs()) return;
    
    // Basic Ohm's Law calculator
    if (voltage && current && !resistance && !power) {
      const calculatedResistance = parseFloat(voltage) / parseFloat(current);
      setResistance(calculatedResistance.toFixed(2));
      setPower((parseFloat(voltage) * parseFloat(current)).toFixed(2));
      setCalculationResult(`Resistance: ${calculatedResistance.toFixed(2)} Ω, Power: ${(parseFloat(voltage) * parseFloat(current)).toFixed(2)} W`);
    } 
    else if (voltage && resistance && !current && !power) {
      const calculatedCurrent = parseFloat(voltage) / parseFloat(resistance);
      setCurrent(calculatedCurrent.toFixed(2));
      setPower((parseFloat(voltage) * calculatedCurrent).toFixed(2));
      setCalculationResult(`Current: ${calculatedCurrent.toFixed(2)} A, Power: ${(parseFloat(voltage) * calculatedCurrent).toFixed(2)} W`);
    }
    else if (current && resistance && !voltage && !power) {
      const calculatedVoltage = parseFloat(current) * parseFloat(resistance);
      setVoltage(calculatedVoltage.toFixed(2));
      setPower((calculatedVoltage * parseFloat(current)).toFixed(2));
      setCalculationResult(`Voltage: ${calculatedVoltage.toFixed(2)} V, Power: ${(calculatedVoltage * parseFloat(current)).toFixed(2)} W`);
    }
    else if (power && current && !voltage && !resistance) {
      const calculatedVoltage = parseFloat(power) / parseFloat(current);
      setVoltage(calculatedVoltage.toFixed(2));
      setResistance((calculatedVoltage / parseFloat(current)).toFixed(2));
      setCalculationResult(`Voltage: ${calculatedVoltage.toFixed(2)} V, Resistance: ${(calculatedVoltage / parseFloat(current)).toFixed(2)} Ω`);
    }
    else if (power && voltage && !current && !resistance) {
      const calculatedCurrent = parseFloat(power) / parseFloat(voltage);
      setCurrent(calculatedCurrent.toFixed(2));
      setResistance((parseFloat(voltage) / calculatedCurrent).toFixed(2));
      setCalculationResult(`Current: ${calculatedCurrent.toFixed(2)} A, Resistance: ${(parseFloat(voltage) / calculatedCurrent).toFixed(2)} Ω`);
    }
    else if (power && resistance && !voltage && !current) {
      const calculatedCurrent = Math.sqrt(parseFloat(power) / parseFloat(resistance));
      const calculatedVoltage = calculatedCurrent * parseFloat(resistance);
      setCurrent(calculatedCurrent.toFixed(2));
      setVoltage(calculatedVoltage.toFixed(2));
      setCalculationResult(`Current: ${calculatedCurrent.toFixed(2)} A, Voltage: ${calculatedVoltage.toFixed(2)} V`);
    }
  };

  const resetCalculator = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setCalculationResult(null);
    setErrors({});
  };
  
  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Ohm's Law Calculator</CardTitle>
          </div>
          <CardDescription>
            Enter any two values to calculate the other two based on Ohm's Law (V = I × R and P = V × I).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-destructive/20 border border-destructive/40 rounded-md text-sm mb-3">
                  {errors.general}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="voltage">Voltage (V)</Label>
                <Input 
                  id="voltage" 
                  placeholder="Enter voltage" 
                  type="number"
                  value={voltage} 
                  onChange={(e) => {
                    setVoltage(e.target.value);
                    clearError('voltage');
                    clearError('general');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.voltage ? "border-destructive" : ""}`}
                />
                {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="current">Current (A)</Label>
                <Input 
                  id="current" 
                  placeholder="Enter current" 
                  type="number"
                  value={current} 
                  onChange={(e) => {
                    setCurrent(e.target.value);
                    clearError('current');
                    clearError('general');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.current ? "border-destructive" : ""}`}
                />
                {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="resistance">Resistance (Ω)</Label>
                <Input 
                  id="resistance" 
                  placeholder="Enter resistance" 
                  type="number"
                  value={resistance} 
                  onChange={(e) => {
                    setResistance(e.target.value);
                    clearError('resistance');
                    clearError('general');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.resistance ? "border-destructive" : ""}`}
                />
                {errors.resistance && <p className="text-xs text-destructive">{errors.resistance}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="power">Power (W)</Label>
                <Input 
                  id="power" 
                  placeholder="Enter power" 
                  type="number"
                  value={power} 
                  onChange={(e) => {
                    setPower(e.target.value);
                    clearError('power');
                    clearError('general');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.power ? "border-destructive" : ""}`}
                />
                {errors.power && <p className="text-xs text-destructive">{errors.power}</p>}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center">
                {calculationResult ? (
                  <>
                    <span className="text-elec-yellow text-xl mb-2">Result</span>
                    <p className="text-lg">{calculationResult}</p>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter any two values to calculate the others</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={calculateOhmsLaw} className="w-full">Calculate</Button>
                <Button variant="outline" onClick={resetCalculator} className="w-full">Reset</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Ohm's Law Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Formulas</h3>
              <ul className="space-y-2 text-elec-light/80">
                <li><span className="text-elec-yellow">V = I × R</span> (Voltage = Current × Resistance)</li>
                <li><span className="text-elec-yellow">I = V ÷ R</span> (Current = Voltage ÷ Resistance)</li>
                <li><span className="text-elec-yellow">R = V ÷ I</span> (Resistance = Voltage ÷ Current)</li>
                <li><span className="text-elec-yellow">P = V × I</span> (Power = Voltage × Current)</li>
                <li><span className="text-elec-yellow">P = I² × R</span> (Power = Current² × Resistance)</li>
                <li><span className="text-elec-yellow">P = V² ÷ R</span> (Power = Voltage² ÷ Resistance)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Units</h3>
              <ul className="space-y-2 text-elec-light/80">
                <li><span className="text-elec-yellow">Voltage (V)</span>: Volts (V)</li>
                <li><span className="text-elec-yellow">Current (I)</span>: Amperes (A)</li>
                <li><span className="text-elec-yellow">Resistance (R)</span>: Ohms (Ω)</li>
                <li><span className="text-elec-yellow">Power (P)</span>: Watts (W)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OhmsLawCalculator;
