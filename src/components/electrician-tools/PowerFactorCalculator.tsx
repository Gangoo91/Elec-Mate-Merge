
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlugZap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const PowerFactorCalculator = () => {
  const [activePower, setActivePower] = useState<string>("");
  const [apparentPower, setApparentPower] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [calculationMethod, setCalculationMethod] = useState<"power" | "currentVoltage">("power");
  const [powerFactor, setPowerFactor] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (calculationMethod === "power") {
      if (!activePower) newErrors.activePower = "Active power is required";
      else if (isNaN(parseFloat(activePower)) || parseFloat(activePower) <= 0) 
        newErrors.activePower = "Please enter a valid positive number";
      
      if (!apparentPower) newErrors.apparentPower = "Apparent power is required";
      else if (isNaN(parseFloat(apparentPower)) || parseFloat(apparentPower) <= 0) 
        newErrors.apparentPower = "Please enter a valid positive number";
      
      if (apparentPower && activePower && parseFloat(activePower) > parseFloat(apparentPower)) 
        newErrors.activePower = "Active power cannot be greater than apparent power";
    } else {
      if (!current) newErrors.current = "Current is required";
      else if (isNaN(parseFloat(current)) || parseFloat(current) <= 0) 
        newErrors.current = "Please enter a valid positive number";
      
      if (!voltage) newErrors.voltage = "Voltage is required";
      else if (isNaN(parseFloat(voltage)) || parseFloat(voltage) <= 0) 
        newErrors.voltage = "Please enter a valid positive number";
      
      if (!activePower) newErrors.activePower = "Active power is required";
      else if (isNaN(parseFloat(activePower)) || parseFloat(activePower) <= 0) 
        newErrors.activePower = "Please enter a valid positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePowerFactor = () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: Object.values(errors)[0],
        variant: "destructive",
      });
      return;
    }
    
    let pf: number;
    
    if (calculationMethod === "power") {
      const active = parseFloat(activePower);
      const apparent = parseFloat(apparentPower);
      pf = active / apparent;
    } else {
      const active = parseFloat(activePower);
      const volts = parseFloat(voltage);
      const amps = parseFloat(current);
      const apparent = volts * amps;
      pf = active / apparent;
    }
    
    // Power factor cannot be greater than 1 by definition
    pf = Math.min(pf, 1);
    setPowerFactor(pf.toFixed(3));
    
    toast({
      title: "Power Factor Calculated",
      description: `Power factor: ${pf.toFixed(3)} (${(pf * 100).toFixed(1)}%)`,
    });
  };

  const resetCalculator = () => {
    setActivePower("");
    setApparentPower("");
    setCurrent("");
    setVoltage("");
    setPowerFactor(null);
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const renderPowerFactorResult = () => {
    if (!powerFactor) return null;
    
    return (
      <div className="text-center">
        <span className="text-elec-yellow text-xl mb-2 block">Power Factor</span>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="text-3xl font-bold text-elec-yellow">{powerFactor}</div>
          <ArrowRight className="text-elec-yellow h-5 w-5" />
          <div className="text-2xl font-bold text-elec-yellow">{(parseFloat(powerFactor) * 100).toFixed(1)}%</div>
        </div>
        
        <div className="mt-4 text-sm">
          {parseFloat(powerFactor) > 0.95 ? (
            <span className="text-green-500">Good power factor (&gt; 0.95)</span>
          ) : parseFloat(powerFactor) > 0.85 ? (
            <span className="text-yellow-500">Acceptable power factor (&gt; 0.85)</span>
          ) : (
            <span className="text-red-500">Poor power factor (&lt; 0.85), correction recommended</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlugZap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Factor Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power factor from power values or electrical parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-2">
              <Button onClick={calculatePowerFactor} className="flex-1">Calculate</Button>
              <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="rounded-md bg-elec-dark p-6 flex-grow flex flex-col items-center justify-center">
              {powerFactor ? renderPowerFactorResult() : (
                <div className="text-center text-muted-foreground">
                  <p>Enter values and calculate to see the power factor</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/50 rounded-md">
              <h4 className="text-sm font-medium mb-2">Power Factor Info</h4>
              <p className="text-xs text-muted-foreground">
                Power factor is the ratio of active power to apparent power in an electrical circuit.
                A higher power factor (closer to 1.0) indicates more efficient use of electrical power.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
