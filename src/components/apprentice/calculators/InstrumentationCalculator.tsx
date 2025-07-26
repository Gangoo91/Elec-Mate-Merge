import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, RotateCcw, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import UnitDropdown from "@/components/inspection-testing/UnitDropdown";

const InstrumentationCalculator = () => {
  // Input values
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [unit, setUnit] = useState("mA");
  const [calculationType, setCalculationType] = useState("calculate-current");
  
  // Results
  const [result, setResult] = useState<number | null>(null);
  const [tripPoints, setTripPoints] = useState<{low: number, high: number} | null>(null);
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!minScale) newErrors.minScale = "Minimum scale required";
    if (!maxScale) newErrors.maxScale = "Maximum scale required";
    if (!inputValue) newErrors.inputValue = "Input value required";
    
    if (minScale && maxScale) {
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (min >= max) newErrors.maxScale = "Maximum must be greater than minimum";
    }
    
    if (calculationType === "calculate-current" && inputValue && minScale && maxScale) {
      const value = parseFloat(inputValue);
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (value < min || value > max) {
        newErrors.inputValue = `Value must be between ${min} and ${max}`;
      }
    }
    
    if (calculationType === "calculate-trip" && inputValue) {
      const current = parseFloat(inputValue);
      if (current < 4 || current > 20) {
        newErrors.inputValue = "Current must be between 4-20 mA";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;
    
    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const value = parseFloat(inputValue);
    
    if (calculationType === "calculate-current") {
      // Calculate required current for given value
      const current = 4 + (16 * (value - min) / (max - min));
      setResult(current);
      
      // Calculate trip points (10% and 90% of scale)
      const lowTrip = 4 + (16 * 0.1);
      const highTrip = 4 + (16 * 0.9);
      setTripPoints({ low: lowTrip, high: highTrip });
      
    } else if (calculationType === "calculate-trip") {
      // Calculate what value the device will trip at with given current
      const tripValue = min + ((max - min) * (value - 4) / 16);
      setResult(tripValue);
      setTripPoints(null);
    }
  };

  const reset = () => {
    setMinScale("");
    setMaxScale("");
    setInputValue("");
    setUnit("mA");
    setCalculationType("calculate-current");
    setResult(null);
    setTripPoints(null);
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const getResultTitle = () => {
    if (calculationType === "calculate-current") {
      return "Required Current";
    }
    return "Trip Point Value";
  };

  const getResultUnit = () => {
    if (calculationType === "calculate-current") {
      return "mA";
    }
    return unit === "mA" ? "" : unit;
  };

  const getInputLabel = () => {
    if (calculationType === "calculate-current") {
      return "Measurement Value";
    }
    return "Current Input";
  };

  const getInputPlaceholder = () => {
    if (calculationType === "calculate-current") {
      return "Enter the value to convert";
    }
    return "Enter current (4-20 mA)";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          <CardTitle>4-20mA Instrumentation Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate current requirements or device trip points for 4-20mA instrumentation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInput
              label="Minimum Scale"
              type="number"
              value={minScale}
              onChange={(e) => {
                setMinScale(e.target.value);
                clearError('minScale');
              }}
              placeholder="e.g., 0"
              error={errors.minScale}
              clearError={() => clearError('minScale')}
            />
            <MobileInput
              label="Maximum Scale"
              type="number"
              value={maxScale}
              onChange={(e) => {
                setMaxScale(e.target.value);
                clearError('maxScale');
              }}
              placeholder="e.g., 100"
              error={errors.maxScale}
              clearError={() => clearError('maxScale')}
            />
          </div>

          <MobileSelect value={calculationType} onValueChange={setCalculationType}>
            <MobileSelectTrigger label="Calculation Type">
              <MobileSelectValue placeholder="Select what to calculate" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="calculate-current">Calculate Required Current (mA)</MobileSelectItem>
              <MobileSelectItem value="calculate-trip">Calculate Trip Point Value</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          <MobileInput
            label={getInputLabel()}
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              clearError('inputValue');
            }}
            placeholder={getInputPlaceholder()}
            unit={calculationType === "calculate-trip" ? "mA" : undefined}
            error={errors.inputValue}
            clearError={() => clearError('inputValue')}
          />

          {calculationType === "calculate-current" && (
            <UnitDropdown 
              value={unit} 
              onChange={setUnit}
            />
          )}

          <div className="flex gap-3">
            <MobileButton
              variant="elec"
              size="wide"
              onClick={calculate}
            >
              Calculate
            </MobileButton>
            <MobileButton
              variant="outline"
              size="icon"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>
        </div>

        {/* Results */}
        <ResultCard
          title={getResultTitle()}
          value={result}
          unit={getResultUnit()}
          subtitle={result ? 
            calculationType === "calculate-current" 
              ? `${inputValue} ${unit} requires ${result.toFixed(2)} mA`
              : `${inputValue} mA = ${result.toFixed(2)} ${unit}`
            : undefined
          }
          status="success"
          icon={<Gauge className="h-6 w-6" />}
          isEmpty={result === null}
          emptyMessage="Enter values above to calculate"
        >
          {result !== null && tripPoints && (
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Low Trip (10%):</span>
                <Badge variant="outline">{tripPoints.low.toFixed(2)} mA</Badge>
              </div>
              <div className="flex justify-between">
                <span>High Trip (90%):</span>
                <Badge variant="outline">{tripPoints.high.toFixed(2)} mA</Badge>
              </div>
            </div>
          )}
        </ResultCard>

        {/* Information Panel */}
        <Alert className="border-blue-500/20 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200 space-y-2">
            <p><strong>4-20mA Current Loop:</strong></p>
            <p>• 4mA = 0% of scale (minimum value)</p>
            <p>• 20mA = 100% of scale (maximum value)</p>
            <p>• Formula: I = 4 + 16 × (Value - Min) / (Max - Min)</p>
            <p>• Standard trip points: 10% (5.6mA) and 90% (18.4mA)</p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;