
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Variable } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LumenCalculator = () => {
  const [calculationType, setCalculationType] = useState<"lux-to-lumens" | "lumens-to-lux">("lux-to-lumens");
  const [area, setArea] = useState("");
  const [lux, setLux] = useState("");
  const [lumens, setLumens] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (calculationType === "lux-to-lumens") {
      if (!area) newErrors.area = "Area is required";
      if (!lux) newErrors.lux = "Lux value is required";
    } else {
      if (!area) newErrors.area = "Area is required";
      if (!lumens) newErrors.lumens = "Lumens value is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;
    
    if (calculationType === "lux-to-lumens") {
      // Formula: Lumens = Lux × Area
      const calculatedLumens = parseFloat(lux) * parseFloat(area);
      setResult(`${calculatedLumens.toFixed(1)} lumens`);
    } else {
      // Formula: Lux = Lumens ÷ Area
      const calculatedLux = parseFloat(lumens) / parseFloat(area);
      setResult(`${calculatedLux.toFixed(1)} lux`);
    }
  };

  const resetCalculator = () => {
    setArea("");
    setLux("");
    setLumens("");
    setResult(null);
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
          <Variable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Lumen Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate lighting requirements by converting between lumens and lux
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select
                value={calculationType}
                onValueChange={(value) => setCalculationType(value as "lux-to-lumens" | "lumens-to-lux")}
              >
                <SelectTrigger id="calculation-type" className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="lux-to-lumens">Lux to Lumens</SelectItem>
                  <SelectItem value="lumens-to-lux">Lumens to Lux</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (m²)</Label>
              <Input
                id="area"
                type="number"
                placeholder="Enter area in square metres"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  clearError('area');
                }}
                className={`bg-elec-dark border-elec-yellow/20 ${errors.area ? "border-destructive" : ""}`}
              />
              {errors.area && <p className="text-xs text-destructive">{errors.area}</p>}
            </div>

            {calculationType === "lux-to-lumens" ? (
              <div className="space-y-2">
                <Label htmlFor="lux">Lux (lx)</Label>
                <Input
                  id="lux"
                  type="number"
                  placeholder="Enter lux value"
                  value={lux}
                  onChange={(e) => {
                    setLux(e.target.value);
                    clearError('lux');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.lux ? "border-destructive" : ""}`}
                />
                {errors.lux && <p className="text-xs text-destructive">{errors.lux}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="lumens">Lumens (lm)</Label>
                <Input
                  id="lumens"
                  type="number"
                  placeholder="Enter lumens value"
                  value={lumens}
                  onChange={(e) => {
                    setLumens(e.target.value);
                    clearError('lumens');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.lumens ? "border-destructive" : ""}`}
                />
                {errors.lumens && <p className="text-xs text-destructive">{errors.lumens}</p>}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6 sm:flex-nowrap">
              <Button onClick={calculate} className="flex-1 w-full">Calculate</Button>
              <Button variant="outline" onClick={resetCalculator} className="flex-1 w-full">Reset</Button>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center">
              {result ? (
                <>
                  <span className="text-elec-yellow text-xl mb-2">Result</span>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">{calculationType === "lux-to-lumens" ? "Total Lumens:" : "Illuminance (Lux):"}</div>
                    <div className="text-3xl font-bold text-elec-yellow">{result}</div>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">
                  <Variable className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter values to calculate {calculationType === "lux-to-lumens" ? "lumens" : "lux"}</p>
                </div>
              )}
            </div>

            <Alert className="bg-elec-dark/50 border-elec-yellow/20">
              <div className="space-y-2">
                <h3 className="font-medium">Lighting Calculations</h3>
                <p className="text-sm text-elec-light/80">
                  <span className="text-elec-yellow">Lux (lx):</span> A measure of illuminance, or light intensity per unit area.
                </p>
                <p className="text-sm text-elec-light/80">
                  <span className="text-elec-yellow">Lumen (lm):</span> A measure of the total amount of visible light.
                </p>
                <p className="text-sm text-elec-light/80">
                  <span className="text-elec-yellow">Formula:</span> Lumens = Lux × Area (m²)
                </p>
                <p className="text-sm text-elec-light/80">
                  <span className="text-elec-yellow">Recommended Levels:</span> Workspace: 300-500 lux, Corridors: 100 lux, Detailed tasks: 500-1000 lux
                </p>
              </div>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LumenCalculator;
