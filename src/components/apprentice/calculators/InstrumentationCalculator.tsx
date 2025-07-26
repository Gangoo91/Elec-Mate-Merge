import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, ArrowLeftRight, Zap, History, Download, RotateCcw, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { MobileInput } from "@/components/ui/mobile-input";
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
  const [activeTab, setActiveTab] = useState("value-to-current");
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
          <CardTitle>Enhanced 4-20mA Instrumentation Calculator</CardTitle>
        </div>
        <CardDescription>
          Professional instrumentation scaling with bidirectional calculations, presets, and analysis tools.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{/* Mobile-friendly Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 h-auto p-1">
            <TabsTrigger 
              value="value-to-current" 
              className="flex items-center gap-1 px-2 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <ArrowLeftRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Value → Current</span>
              <span className="sm:hidden">Value→mA</span>
            </TabsTrigger>
            <TabsTrigger 
              value="current-to-value" 
              className="flex items-center gap-1 px-2 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <ArrowLeftRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
              <span className="hidden sm:inline">Current → Value</span>
              <span className="sm:hidden">mA→Value</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-1 px-2 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <History className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="value-to-current" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <MobileInput
                  label="Input Value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    clearError('inputValue');
                  }}
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
              </div>
              
              <div className="space-y-4">
                <ResultCard
                  title="Current Output"
                  value={currentResult}
                  unit="mA"
                  subtitle={currentResult && unit ? `${inputValue} ${unit} → ${currentResult.toFixed(2)} mA` : undefined}
                  status="success"
                  icon={<Gauge className="h-6 w-6" />}
                  isEmpty={currentResult === null}
                  emptyMessage="Enter values to calculate current output"
                >
                  {currentResult !== null && trippingPoints && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Low Trip (10%):</span>
                        <Badge variant="outline">{trippingPoints.low.toFixed(2)} mA</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>High Trip (90%):</span>
                        <Badge variant="outline">{trippingPoints.high.toFixed(2)} mA</Badge>
                      </div>
                    </div>
                  )}
                </ResultCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="current-to-value" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>
              
              <div className="space-y-4">
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
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <div className="text-center py-8">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Calculation history will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Information Panel */}
        <Alert className="border-blue-500/20 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200 space-y-2">
            <p><strong>4-20mA Current Loop:</strong></p>
            <p>• 4mA = 0% of scale (minimum value)</p>
            <p>• 20mA = 100% of scale (maximum value)</p>
            <p>• Formula: I = 4 + 16 × (Value - Min) / (Max - Min)</p>
            <p>• Industry standard for process control with excellent noise immunity</p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;