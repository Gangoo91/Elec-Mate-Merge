
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InstrumentationCalculator = () => {
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [scaledResult, setScaledResult] = useState<string | null>(null);
  
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
    setMinScale("");
    setMaxScale("");
    setCurrentValue("");
    setScaledResult(null);
  };

  return (
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
  );
};

export default InstrumentationCalculator;
