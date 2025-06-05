
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, ArrowLeftRight, Zap, History, Download, RotateCcw, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

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

  const validateCurrentToValue = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!minScale2) newErrors.minScale2 = "Minimum scale is required";
    if (!maxScale2) newErrors.maxScale2 = "Maximum scale is required";
    if (!currentValue) newErrors.currentValue = "Current value is required";
    else {
      const current = parseFloat(currentValue);
      if (isNaN(current)) newErrors.currentValue = "Please enter a valid number";
      else if (current < 4 || current > 20) newErrors.currentValue = "Current must be between 4 and 20 mA";
    }
    
    if (minScale2 && maxScale2) {
      const min = parseFloat(minScale2);
      const max = parseFloat(maxScale2);
      if (min >= max) newErrors.maxScale2 = "Maximum must be greater than minimum";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateValueToCurrent = () => {
    if (!validateValueToCurrent()) return;
    
    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const value = parseFloat(inputValue);
    
    // Calculate current: I = 4 + 16 * (value - min) / (max - min)
    const current = 4 + (16 * (value - min) / (max - min));
    setCurrentResult(current);
    
    // Calculate tripping points (10% and 90% of scale)
    const lowTrip = 4 + (16 * 0.1);
    const highTrip = 4 + (16 * 0.9);
    setTrippingPoints({ low: lowTrip, high: highTrip });
    
    // Add to history
    const historyItem: CalculationHistory = {
      id: Date.now().toString(),
      type: 'value-to-current',
      inputs: { minScale: min, maxScale: max, inputValue: value, unit },
      result: current,
      timestamp: new Date(),
      preset: selectedPreset || undefined
    };
    setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
  };

  const calculateCurrentToValue = () => {
    if (!validateCurrentToValue()) return;
    
    const min = parseFloat(minScale2);
    const max = parseFloat(maxScale2);
    const current = parseFloat(currentValue);
    
    // Calculate value: Value = min + (max-min) * (current-4) / 16
    const value = min + ((max - min) * (current - 4) / 16);
    setValueResult(value);
    
    // Calculate tripping points in value units
    const lowTripValue = min + ((max - min) * 0.1);
    const highTripValue = min + ((max - min) * 0.9);
    setTrippingPoints({ low: lowTripValue, high: highTripValue });
    
    // Add to history
    const historyItem: CalculationHistory = {
      id: Date.now().toString(),
      type: 'current-to-value',
      inputs: { minScale: min, maxScale: max, currentValue: current, unit: unit2 },
      result: value,
      timestamp: new Date(),
      preset: selectedPreset || undefined
    };
    setHistory(prev => [historyItem, ...prev].slice(0, 10));
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

  const exportResults = () => {
    const results = {
      calculation_type: activeTab,
      timestamp: new Date().toISOString(),
      inputs: activeTab === 'value-to-current' 
        ? { minScale, maxScale, inputValue, unit }
        : { minScale: minScale2, maxScale: maxScale2, currentValue, unit: unit2 },
      result: activeTab === 'value-to-current' ? currentResult : valueResult,
      tripping_points: trippingPoints,
      preset: selectedPreset || 'Custom'
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instrumentation-calc-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Results Exported",
      description: "Calculation results downloaded as JSON file."
    });
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const loadFromHistory = (item: CalculationHistory) => {
    if (item.type === 'value-to-current') {
      setActiveTab('value-to-current');
      setMinScale(item.inputs.minScale.toString());
      setMaxScale(item.inputs.maxScale.toString());
      setInputValue(item.inputs.inputValue.toString());
      setUnit(item.inputs.unit || "");
    } else {
      setActiveTab('current-to-value');
      setMinScale2(item.inputs.minScale.toString());
      setMaxScale2(item.inputs.maxScale.toString());
      setCurrentValue(item.inputs.currentValue.toString());
      setUnit2(item.inputs.unit || "");
    }
    setSelectedPreset(item.preset || "");
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
      <CardContent>
        <div className="space-y-6">
          {/* Preset Selection */}
          <div className="space-y-2">
            <Label>Quick Presets</Label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant={selectedPreset === preset.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyPreset(preset.name)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="value-to-current" className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Value → Current
              </TabsTrigger>
              <TabsTrigger value="current-to-value" className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4 rotate-180" />
                Current → Value
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="value-to-current" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-scale">Minimum Scale Value</Label>
                    <Input 
                      id="min-scale" 
                      placeholder="E.g. 0" 
                      type="number"
                      value={minScale} 
                      onChange={(e) => {
                        setMinScale(e.target.value);
                        clearError('minScale');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.minScale ? "border-destructive" : ""}`}
                    />
                    {errors.minScale && <p className="text-xs text-destructive">{errors.minScale}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-scale">Maximum Scale Value</Label>
                    <Input 
                      id="max-scale" 
                      placeholder="E.g. 100" 
                      type="number"
                      value={maxScale} 
                      onChange={(e) => {
                        setMaxScale(e.target.value);
                        clearError('maxScale');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.maxScale ? "border-destructive" : ""}`}
                    />
                    {errors.maxScale && <p className="text-xs text-destructive">{errors.maxScale}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="input-value">Input Value</Label>
                    <Input 
                      id="input-value" 
                      placeholder="Enter measurement value" 
                      type="number"
                      value={inputValue} 
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        clearError('inputValue');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.inputValue ? "border-destructive" : ""}`}
                    />
                    {errors.inputValue && <p className="text-xs text-destructive">{errors.inputValue}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit (Optional)</Label>
                    <Input 
                      id="unit" 
                      placeholder="e.g. °C, Bar, L/min" 
                      value={unit} 
                      onChange={(e) => setUnit(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={calculateValueToCurrent} className="flex-1">
                      Calculate Current
                    </Button>
                    <Button variant="outline" onClick={resetCalculator}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-md bg-elec-dark p-6 text-center">
                    {currentResult !== null ? (
                      <>
                        <span className="text-elec-yellow text-xl mb-2 block">Current Output</span>
                        <div className="text-3xl font-bold text-elec-yellow mb-2">
                          {currentResult.toFixed(2)} mA
                        </div>
                        {unit && (
                          <div className="text-sm text-muted-foreground mb-4">
                            {inputValue} {unit} → {currentResult.toFixed(2)} mA
                          </div>
                        )}
                        
                        {trippingPoints && (
                          <div className="space-y-2 text-sm">
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
                      </>
                    ) : (
                      <div className="text-muted-foreground">
                        <Gauge className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Enter values to calculate current output</p>
                      </div>
                    )}
                  </div>

                  {currentResult !== null && (
                    <Button onClick={exportResults} variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="current-to-value" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-scale2">Minimum Scale Value</Label>
                    <Input 
                      id="min-scale2" 
                      placeholder="E.g. 0" 
                      type="number"
                      value={minScale2} 
                      onChange={(e) => {
                        setMinScale2(e.target.value);
                        clearError('minScale2');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.minScale2 ? "border-destructive" : ""}`}
                    />
                    {errors.minScale2 && <p className="text-xs text-destructive">{errors.minScale2}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-scale2">Maximum Scale Value</Label>
                    <Input 
                      id="max-scale2" 
                      placeholder="E.g. 100" 
                      type="number"
                      value={maxScale2} 
                      onChange={(e) => {
                        setMaxScale2(e.target.value);
                        clearError('maxScale2');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.maxScale2 ? "border-destructive" : ""}`}
                    />
                    {errors.maxScale2 && <p className="text-xs text-destructive">{errors.maxScale2}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-input">Current Signal (mA)</Label>
                    <Input 
                      id="current-input" 
                      placeholder="Enter current 4-20 mA" 
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

                  <div className="space-y-2">
                    <Label htmlFor="unit2">Unit (Optional)</Label>
                    <Input 
                      id="unit2" 
                      placeholder="e.g. °C, Bar, L/min" 
                      value={unit2} 
                      onChange={(e) => setUnit2(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={calculateCurrentToValue} className="flex-1">
                      Calculate Value
                    </Button>
                    <Button variant="outline" onClick={resetCalculator}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-md bg-elec-dark p-6 text-center">
                    {valueResult !== null ? (
                      <>
                        <span className="text-elec-yellow text-xl mb-2 block">Calculated Value</span>
                        <div className="text-3xl font-bold text-elec-yellow mb-2">
                          {valueResult.toFixed(2)}{unit2 && ` ${unit2}`}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          {currentValue} mA → {valueResult.toFixed(2)}{unit2 && ` ${unit2}`}
                        </div>
                        
                        {trippingPoints && (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Low Trip (10%):</span>
                              <Badge variant="outline">
                                {trippingPoints.low.toFixed(2)}{unit2 && ` ${unit2}`}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>High Trip (90%):</span>
                              <Badge variant="outline">
                                {trippingPoints.high.toFixed(2)}{unit2 && ` ${unit2}`}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-muted-foreground">
                        <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Enter current signal to calculate value</p>
                      </div>
                    )}
                  </div>

                  {valueResult !== null && (
                    <Button onClick={exportResults} variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Calculation History</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setHistory([])}
                  disabled={history.length === 0}
                >
                  Clear History
                </Button>
              </div>
              
              {history.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No calculations performed yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <Card key={item.id} className="border-elec-yellow/20 bg-elec-dark/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {item.type === 'value-to-current' ? 'Value → Current' : 'Current → Value'}
                              </Badge>
                              {item.preset && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.preset}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.timestamp.toLocaleString()}
                            </div>
                            <div className="font-mono text-sm">
                              Result: <span className="text-elec-yellow">{item.result.toFixed(2)}</span>
                              {item.type === 'value-to-current' ? ' mA' : ` ${item.inputs.unit || ''}`}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadFromHistory(item)}
                          >
                            Load
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Alert className="bg-elec-dark/50 border-elec-yellow/20">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-medium">4-20mA Current Loop Information</h4>
                <ul className="space-y-1 text-sm text-elec-light/80">
                  <li><span className="text-elec-yellow">4mA:</span> Represents 0% of scale (minimum value)</li>
                  <li><span className="text-elec-yellow">20mA:</span> Represents 100% of scale (maximum value)</li>
                  <li><span className="text-elec-yellow">Tripping Points:</span> Common alarm thresholds at 10% and 90%</li>
                  <li><span className="text-elec-yellow">Formula:</span> I = 4 + 16 × (Value - Min) / (Max - Min)</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstrumentationCalculator;
