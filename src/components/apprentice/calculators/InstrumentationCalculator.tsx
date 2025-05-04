
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const InstrumentationCalculator = () => {
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [scaledResult, setScaledResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!minScale) newErrors.minScale = "Minimum scale is required";
    if (!maxScale) newErrors.maxScale = "Maximum scale is required";
    if (!currentValue) newErrors.currentValue = "Current value is required";
    else {
      const current = parseFloat(currentValue);
      if (isNaN(current)) newErrors.currentValue = "Please enter a valid number";
      else if (current < 4 || current > 20) newErrors.currentValue = "Current must be between 4 and 20 mA";
    }
    
    if (minScale && maxScale) {
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (min >= max) newErrors.maxScale = "Maximum must be greater than minimum";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateInstrumentation = () => {
    if (!validateInputs()) return;
    
    // 4-20mA scaling calculation
    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const current = parseFloat(currentValue);
    
    // Scale calculation: y = min + (max-min)*(x-4)/16
    const scaled = min + ((max - min) * (current - 4) / 16);
    setScaledResult(scaled.toFixed(2));
  };

  const resetCalculator = () => {
    setMinScale("");
    setMaxScale("");
    setCurrentValue("");
    setScaledResult(null);
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
                onChange={(e) => {
                  setMinScale(e.target.value);
                  clearError('minScale');
                }}
                className={`bg-elec-dark border-elec-yellow/20 ${errors.minScale ? "border-destructive" : ""}`}
              />
              {errors.minScale && <p className="text-xs text-destructive">{errors.minScale}</p>}
              <p className="text-xs text-muted-foreground">The value corresponding to 4mA signal</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-scale">Maximum Scale Value</Label>
              <Input 
                id="max-scale" 
                placeholder="E.g. 100 for 100°C" 
                type="number"
                value={maxScale} 
                onChange={(e) => {
                  setMaxScale(e.target.value);
                  clearError('maxScale');
                }}
                className={`bg-elec-dark border-elec-yellow/20 ${errors.maxScale ? "border-destructive" : ""}`}
              />
              {errors.maxScale && <p className="text-xs text-destructive">{errors.maxScale}</p>}
              <p className="text-xs text-muted-foreground">The value corresponding to 20mA signal</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-value">Current Signal (mA)</Label>
              <Input 
                id="current-value" 
                placeholder="Enter value between 4-20 mA" 
                type="number"
                value={currentValue} 
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                  clearError('currentValue');
                }}
                className={`bg-elec-dark border-elec-yellow/20 ${errors.currentValue ? "border-destructive" : ""}`}
              />
              {errors.currentValue && <p className="text-xs text-destructive">{errors.currentValue}</p>}
            </div>

            <div className="flex flex-wrap gap-3 mt-6 sm:flex-nowrap">
              <Button onClick={calculateInstrumentation} className="flex-1 w-full">Calculate</Button>
              <Button variant="outline" onClick={resetCalculator} className="flex-1 w-full">Reset</Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center">
              {scaledResult ? (
                <>
                  <span className="text-elec-yellow text-xl mb-2">Result</span>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Scaled Value:</div>
                    <div className="text-3xl font-bold text-elec-yellow">{scaledResult}</div>
                  </div>
                  {minScale && maxScale && (
                    <div className="mt-4 text-sm">
                      <span className="text-muted-foreground">Range: </span>
                      <span>{minScale} to {maxScale}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted-foreground">
                  <Gauge className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter scale range and current value to calculate</p>
                </div>
              )}
            </div>
            
            <Alert className="bg-elec-dark/50 border-elec-yellow/20">
              <div className="space-y-2">
                <h3 className="font-medium">4-20mA Scale Information</h3>
                <p className="text-sm text-elec-light/80">
                  The 4-20mA current loop is a common method for transmitting sensor information in many industrial applications.
                </p>
                <ul className="space-y-2 text-sm text-elec-light/80">
                  <li><span className="text-elec-yellow">4mA</span> represents the minimum scale value (0%)</li>
                  <li><span className="text-elec-yellow">20mA</span> represents the maximum scale value (100%)</li>
                  <li><span className="text-elec-yellow">Formula:</span> Value = Min + (Max-Min)*(mA-4)/16</li>
                </ul>
              </div>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;
