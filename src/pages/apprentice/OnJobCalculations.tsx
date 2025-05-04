
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calculator, Zap, Sigma, PlugZap, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OnJobCalculations = () => {
  const [currentTab, setCurrentTab] = useState("ohms-law");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [calculationResult, setCalculationResult] = useState<string | null>(null);

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

  const resetCalculator = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setCalculationResult(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Calculations</h1>
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="ohms-law" className="space-y-6" onValueChange={setCurrentTab}>
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="ohms-law">
            <Zap className="mr-2 h-4 w-4" />
            Ohm's Law
          </TabsTrigger>
          <TabsTrigger value="voltage-drop">
            <Activity className="mr-2 h-4 w-4" />
            Voltage Drop
          </TabsTrigger>
          <TabsTrigger value="power-factor">
            <PlugZap className="mr-2 h-4 w-4" />
            Power Factor
          </TabsTrigger>
          <TabsTrigger value="cable-size">
            <Sigma className="mr-2 h-4 w-4" />
            Cable Sizing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ohms-law" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="voltage-drop" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <Activity className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Voltage Drop Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you determine voltage drop in electrical circuits.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="power-factor" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <PlugZap className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Power Factor Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you with power factor calculations.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cable-size" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray h-[400px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <Sigma className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Cable Sizing Calculator</h3>
              <p className="text-muted-foreground mb-4">Coming soon! This calculator will help you determine appropriate cable sizes based on load requirements.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnJobCalculations;
