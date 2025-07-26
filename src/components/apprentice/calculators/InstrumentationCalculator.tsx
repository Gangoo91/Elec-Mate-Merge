import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, ArrowLeftRight, Zap, History, Download, RotateCcw, Info, Calculator } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";

interface CalculationHistory {
  id: string;
  type: 'value-to-current' | 'current-to-value';
  inputs: any;
  result: number;
  timestamp: Date;
  preset?: string;
}

interface Preset {
  name: string;
  minScale: number;
  maxScale: number;
  unit: string;
  description: string;
}

const PRESETS: Preset[] = [
  { name: "Temperature (0-100°C)", minScale: 0, maxScale: 100, unit: "°C", description: "Standard temperature range" },
  { name: "Pressure (0-10 Bar)", minScale: 0, maxScale: 10, unit: "Bar", description: "Industrial pressure range" },
  { name: "Flow Rate (0-500 L/min)", minScale: 0, maxScale: 500, unit: "L/min", description: "Water flow measurement" },
  { name: "Level (0-5m)", minScale: 0, maxScale: 5, unit: "m", description: "Tank level measurement" },
  { name: "Humidity (0-100%)", minScale: 0, maxScale: 100, unit: "%RH", description: "Relative humidity" },
  { name: "pH (0-14)", minScale: 0, maxScale: 14, unit: "pH", description: "pH measurement" },
];

const InstrumentationCalculator = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  
  // Value to Current inputs
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [unit, setUnit] = useState("");
  
  // Current to Value inputs
  const [minScale2, setMinScale2] = useState("");
  const [maxScale2, setMaxScale2] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [unit2, setUnit2] = useState("");
  
  // Results
  const [currentResult, setCurrentResult] = useState<number | null>(null);
  const [valueResult, setValueResult] = useState<number | null>(null);
  const [trippingPoints, setTrippingPoints] = useState<{low: number, high: number} | null>(null);
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const applyPreset = (presetName: string) => {
    const preset = PRESETS.find(p => p.name === presetName);
    if (!preset) return;
    
    setMinScale(preset.minScale.toString());
    setMaxScale(preset.maxScale.toString());
    setMinScale2(preset.minScale.toString());
    setMaxScale2(preset.maxScale.toString());
    setUnit(preset.unit);
    setUnit2(preset.unit);
    setSelectedPreset(presetName);
    
    toast({
      title: "Preset Applied",
      description: `Applied ${preset.name} preset successfully.`
    });
  };

  const validateValueToCurrent = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!minScale) newErrors.minScale = "Minimum scale is required";
    if (!maxScale) newErrors.maxScale = "Maximum scale is required";
    if (!inputValue) newErrors.inputValue = "Input value is required";
    else {
      const value = parseFloat(inputValue);
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (isNaN(value)) newErrors.inputValue = "Please enter a valid number";
      else if (min && max && (value < min || value > max)) {
        newErrors.inputValue = `Value must be between ${min} and ${max}`;
      }
    }
    
    if (minScale && maxScale) {
      const min = parseFloat(minScale);
      const max = parseFloat(maxScale);
      if (min >= max) newErrors.maxScale = "Maximum must be greater than minimum";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateValueToCurrent = () => {
    if (!validateValueToCurrent()) return;
    
    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const value = parseFloat(inputValue);
    
    const current = 4 + (16 * (value - min) / (max - min));
    setCurrentResult(current);
    
    const lowTrip = 4 + (16 * 0.1);
    const highTrip = 4 + (16 * 0.9);
    setTrippingPoints({ low: lowTrip, high: highTrip });
  };

  const calculateCurrentToValue = () => {
    const min = parseFloat(minScale2);
    const max = parseFloat(maxScale2);
    const current = parseFloat(currentValue);
    
    const value = min + ((max - min) * (current - 4) / 16);
    setValueResult(value);
  };

  const resetCalculator = () => {
    setMinScale("");
    setMaxScale("");
    setInputValue("");
    setMinScale2("");
    setMaxScale2("");
    setCurrentValue("");
    setUnit("");
    setUnit2("");
    setCurrentResult(null);
    setValueResult(null);
    setTrippingPoints(null);
    setSelectedPreset("");
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
          <CardTitle>4-20mA Instrumentation Calculator</CardTitle>
        </div>
        <CardDescription>
          Professional instrumentation scaling with bidirectional calculations and presets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Presets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Quick Presets</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PRESETS.map((preset) => (
              <MobileButton
                key={preset.name}
                variant={selectedPreset === preset.name ? "elec" : "outline"}
                size="sm"
                onClick={() => applyPreset(preset.name)}
                className="text-xs h-auto py-2 px-3"
              >
                {preset.name}
              </MobileButton>
            ))}
          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <MobileAccordion type="single" collapsible defaultValue="value-to-current">
          <MobileAccordionItem value="value-to-current">
            <MobileAccordionTrigger icon={<ArrowLeftRight className="h-4 w-4" />}>
              Value → Current (4-20mA)
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInput
                    label="Minimum Scale"
                    type="number"
                    value={minScale}
                    onChange={(e) => setMinScale(e.target.value)}
                    placeholder="e.g., 0"
                    error={errors.minScale}
                    clearError={() => clearError('minScale')}
                  />
                  <MobileInput
                    label="Maximum Scale"
                    type="number"
                    value={maxScale}
                    onChange={(e) => setMaxScale(e.target.value)}
                    placeholder="e.g., 100"
                    error={errors.maxScale}
                    clearError={() => clearError('maxScale')}
                  />
                </div>
                
                <MobileInput
                  label="Input Value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter measurement value"
                  error={errors.inputValue}
                  clearError={() => clearError('inputValue')}
                />
                
                <MobileInput
                  label="Unit (Optional)"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g., °C, Bar, L/min"
                />

                <div className="flex gap-3">
                  <MobileButton
                    variant="elec"
                    size="wide"
                    onClick={calculateValueToCurrent}
                    icon={<Calculator className="h-4 w-4" />}
                  >
                    Calculate Current
                  </MobileButton>
                  <MobileButton
                    variant="outline"
                    size="icon"
                    onClick={resetCalculator}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </MobileButton>
                </div>

                <ResultCard
                  title="Current Output"
                  value={currentResult}
                  unit="mA"
                  subtitle={currentResult && unit ? `${inputValue} ${unit} → ${currentResult.toFixed(2)} mA` : undefined}
                  status="success"
                  icon={<Gauge className="h-6 w-6" />}
                  isEmpty={currentResult === null}
                  emptyMessage="Enter values to calculate current output"
                />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="current-to-value">
            <MobileAccordionTrigger icon={<ArrowLeftRight className="h-4 w-4 rotate-180" />}>
              Current → Value (4-20mA)
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MobileInput
                    label="Minimum Scale"
                    type="number"
                    value={minScale2}
                    onChange={(e) => setMinScale2(e.target.value)}
                    placeholder="e.g., 0"
                  />
                  <MobileInput
                    label="Maximum Scale"
                    type="number"
                    value={maxScale2}
                    onChange={(e) => setMaxScale2(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                
                <MobileInput
                  label="Current Signal"
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="Enter current 4-20 mA"
                  unit="mA"
                  hint="Valid range: 4-20 mA"
                />
                
                <MobileInput
                  label="Unit (Optional)"
                  value={unit2}
                  onChange={(e) => setUnit2(e.target.value)}
                  placeholder="e.g., °C, Bar, L/min"
                />

                <div className="flex gap-3">
                  <MobileButton
                    variant="elec"
                    size="wide"
                    onClick={calculateCurrentToValue}
                    icon={<Calculator className="h-4 w-4" />}
                  >
                    Calculate Value
                  </MobileButton>
                  <MobileButton
                    variant="outline"
                    size="icon"
                    onClick={resetCalculator}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </MobileButton>
                </div>

                <ResultCard
                  title="Calculated Value"
                  value={valueResult}
                  unit={unit2}
                  subtitle={valueResult && currentValue ? `${currentValue} mA → ${valueResult.toFixed(2)}${unit2 ? ` ${unit2}` : ''}` : undefined}
                  status="success"
                  icon={<Zap className="h-6 w-6" />}
                  isEmpty={valueResult === null}
                  emptyMessage="Enter current signal to calculate value"
                />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="info">
            <MobileAccordionTrigger>
              4-20mA Information & Standards
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200 space-y-2">
                  <p><strong>4-20mA Current Loop:</strong></p>
                  <p>• 4mA = 0% of scale (minimum value)</p>
                  <p>• 20mA = 100% of scale (maximum value)</p>
                  <p>• Formula: I = 4 + 16 × (Value - Min) / (Max - Min)</p>
                  <p>• Industry standard for process control</p>
                  <p>• Excellent noise immunity and long-distance capability</p>
                </AlertDescription>
              </Alert>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;