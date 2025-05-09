import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Zap, Cable, BarChart4, Thermometer, Percent, PlugZap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator"; 

const Calculations = () => {
  const [voltage, setVoltage] = useState("230");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateOhmsLaw = () => {
    // Simple validation
    if (!voltage && !current && !resistance) {
      toast({
        title: "Calculation Error",
        description: "Please enter at least two values to calculate the third.",
        variant: "destructive",
      });
      return;
    }

    // Basic Ohm's Law calculation
    if (voltage && current && !resistance) {
      const r = parseFloat(voltage) / parseFloat(current);
      setResistance(r.toFixed(2));
      setResult(`Resistance: ${r.toFixed(2)} Ω`);
    } else if (voltage && !current && resistance) {
      const i = parseFloat(voltage) / parseFloat(resistance);
      setCurrent(i.toFixed(2));
      setResult(`Current: ${i.toFixed(2)} A`);
    } else if (!voltage && current && resistance) {
      const v = parseFloat(current) * parseFloat(resistance);
      setVoltage(v.toFixed(2));
      setResult(`Voltage: ${v.toFixed(2)} V`);
    } else {
      toast({
        title: "Calculation Error",
        description: "Please leave one field empty to calculate its value.",
        variant: "destructive",
      });
    }
  };

  const resetOhmsLaw = () => {
    setVoltage("230");
    setCurrent("");
    setResistance("");
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Calculations</h1>
          <p className="text-muted-foreground">
            Precise calculations for your electrical installation and maintenance work.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      {/* Quick Calculator */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Ohm's Law Calculator
          </CardTitle>
          <CardDescription>
            Calculate voltage, current or resistance using Ohm's Law
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
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1" onClick={calculateOhmsLaw}>
              Calculate
            </Button>
            <Button variant="outline" className="flex-1" onClick={resetOhmsLaw}>
              Reset
            </Button>
          </div>
          
          {result && (
            <div className="bg-elec-yellow/10 p-3 rounded-md border border-elec-yellow/20 text-center">
              <p className="font-semibold text-elec-yellow">{result}</p>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground pt-2">
            Enter any two values to calculate the third using Ohm's Law (V = I × R).
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-4">Specialised Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/electrician-tools/cable-sizing">
          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-base">Cable Sizing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Calculate proper cable sizes based on current, distance, and voltage drop.
              </p>
              <Button variant="outline" className="w-full">Open Calculator</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Load Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate total load requirements for domestic and commercial installations.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              document.getElementById('load-calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}>View Calculator</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <PlugZap className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Power Factor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate power factor from power readings or current and voltage.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              document.getElementById('power-factor-calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}>View Calculator</Button>
          </CardContent>
        </Card>
      </div>

      {/* Voltage Drop Calculator */}
      <VoltageDropCalculator />

      {/* Load Calculator */}
      <div id="load-calculator">
        <LoadCalculator />
      </div>

      {/* Power Factor Calculator */}
      <div id="power-factor-calculator">
        <PowerFactorCalculator />
      </div>
    </div>
  );
};

export default Calculations;
