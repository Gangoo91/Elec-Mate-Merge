
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OhmsLawCalculator = () => {
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
  );
};

export default OhmsLawCalculator;
