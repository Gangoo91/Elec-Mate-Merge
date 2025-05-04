
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calculator, Zap, Sigma, PlugZap, Activity, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState("ohms-law");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [calculationResult, setCalculationResult] = useState<string | null>(null);
  
  // 4-20mA calculator states
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [scaledResult, setScaledResult] = useState<string | null>(null);
  
  const isMobile = useIsMobile();

  const calculateOhmsLaw = () => {
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
    else {
      setCalculationResult("Please enter exactly two values to calculate the others");
    }
  };

  const calculateInstrumentation = () => {
    // 4-20mA scaling calculation
    if (minScale && maxScale && currentValue) {
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      const current = parseFloat(currentValue);
      
      if (current < 4 || current > 20) {
        setScaledResult("Current value must be between 4 and 20 mA");
        return;
      }
      
      // Scale calculation: y = min + (max-min)*(x-4)/16
      const scaled = min + ((max - min) * (current - 4) / 16);
      setScaledResult(`Scaled value: ${scaled.toFixed(2)}`);
    } else {
      setScaledResult("Please enter all required values");
    }
  };

  const resetCalculator = () => {
    if (calculatorType === "ohms-law") {
      setVoltage("");
      setCurrent("");
      setResistance("");
      setPower("");
      setCalculationResult(null);
    } else if (calculatorType === "instrumentation") {
      setMinScale("");
      setMaxScale("");
      setCurrentValue("");
      setScaledResult(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Calculations</h1>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to On-Job Tools
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
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

        {calculatorType === "ohms-law" && (
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
                    <div className="space-y-2">
                      <Label htmlFor="voltage">Voltage (V)</Label>
                      <Input 
                        id="voltage" 
                        placeholder="Enter voltage" 
                        type="number"
                        value={voltage} 
                        onChange={(e) => setVoltage(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current">Current (A)</Label>
                      <Input 
                        id="current" 
                        placeholder="Enter current" 
                        type="number"
                        value={current} 
                        onChange={(e) => setCurrent(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resistance">Resistance (Ω)</Label>
                      <Input 
                        id="resistance" 
                        placeholder="Enter resistance" 
                        type="number"
                        value={resistance} 
                        onChange={(e) => setResistance(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="power">Power (W)</Label>
                      <Input 
                        id="power" 
                        placeholder="Enter power" 
                        type="number"
                        value={power} 
                        onChange={(e) => setPower(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
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
                    <div className="flex gap-3">
                      <Button onClick={calculateOhmsLaw} className="flex-1">Calculate</Button>
                      <Button variant="outline" onClick={resetCalculator}>Reset</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
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
        )}

        {calculatorType === "instrumentation" && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-elec-yellow" />
                <CardTitle>4-20mA Instrumentation Scale Calculator</CardTitle>
              </div>
              <CardDescription>
                Convert between 4-20mA current signals and corresponding physical measurement values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-scale">Minimum Scale Value</Label>
                    <Input 
                      id="min-scale" 
                      placeholder="E.g. 0 for 0°C" 
                      type="number"
                      value={minScale} 
                      onChange={(e) => setMinScale(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    <p className="text-xs text-muted-foreground">The value corresponding to 4mA signal</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-scale">Maximum Scale Value</Label>
                    <Input 
                      id="max-scale" 
                      placeholder="E.g. 100 for 100°C" 
                      type="number"
                      value={maxScale} 
                      onChange={(e) => setMaxScale(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    <p className="text-xs text-muted-foreground">The value corresponding to 20mA signal</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-value">Current Signal (mA)</Label>
                    <Input 
                      id="current-value" 
                      placeholder="Enter value between 4-20 mA" 
                      type="number"
                      value={currentValue} 
                      onChange={(e) => setCurrentValue(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center">
                    {scaledResult ? (
                      <>
                        <span className="text-elec-yellow text-xl mb-2">Result</span>
                        <p className="text-lg">{scaledResult}</p>
                      </>
                    ) : (
                      <div className="text-muted-foreground">
                        <Gauge className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Enter scale range and current value to calculate</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={calculateInstrumentation} className="flex-1">Calculate</Button>
                    <Button variant="outline" onClick={resetCalculator}>Reset</Button>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-elec-dark/50 rounded-md">
                <h3 className="font-medium mb-2">4-20mA Scale Information</h3>
                <p className="text-sm text-elec-light/80 mb-2">
                  The 4-20mA current loop is a common method for transmitting sensor information in many industrial applications.
                </p>
                <ul className="space-y-2 text-sm text-elec-light/80">
                  <li><span className="text-elec-yellow">4mA</span> represents the minimum scale value (0%)</li>
                  <li><span className="text-elec-yellow">20mA</span> represents the maximum scale value (100%)</li>
                  <li><span className="text-elec-yellow">Formula:</span> Value = Min + (Max-Min)*(mA-4)/16</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {calculatorType === "voltage-drop" && (
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <Activity className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Voltage Drop Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you determine voltage drop in electrical circuits.</p>
            </CardContent>
          </Card>
        )}

        {calculatorType === "power-factor" && (
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <PlugZap className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Power Factor Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you with power factor calculations.</p>
            </CardContent>
          </Card>
        )}

        {calculatorType === "cable-size" && (
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <Sigma className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Cable Sizing Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you determine appropriate cable sizes based on load requirements.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OnJobCalculations;
