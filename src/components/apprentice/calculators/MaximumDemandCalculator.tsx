
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Info, Calculator, RotateCcw, Plus, Trash2, Zap, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface Load {
  id: number;
  name: string;
  power: number;
  diversityFactor: number;
  loadType: string;
}

const LOAD_PRESETS = {
  "lighting": { name: "Lighting", diversityFactor: 0.9 },
  "socket-outlets": { name: "Socket Outlets", diversityFactor: 0.6 },
  "cooking": { name: "Cooking Appliances", diversityFactor: 0.6 },
  "water-heating": { name: "Water Heating", diversityFactor: 1.0 },
  "space-heating": { name: "Space Heating", diversityFactor: 1.0 },
  "motors": { name: "Motors", diversityFactor: 0.8 },
  "immersion": { name: "Immersion Heaters", diversityFactor: 1.0 },
  "shower": { name: "Electric Showers", diversityFactor: 1.0 },
  "custom": { name: "Custom Load", diversityFactor: 1.0 }
} as const;

const loadTypeOptions = [
  { value: "lighting", label: "Lighting Circuits" },
  { value: "socket-outlets", label: "Socket Outlets" },
  { value: "cooking", label: "Cooking Appliances" },
  { value: "water-heating", label: "Water Heating" },
  { value: "space-heating", label: "Space Heating" },
  { value: "motors", label: "Motors" },
  { value: "immersion", label: "Immersion Heaters" },
  { value: "shower", label: "Electric Showers" },
  { value: "custom", label: "Custom Load" },
];

const MaximumDemandCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, name: "Lighting", power: 0, diversityFactor: 0.9, loadType: "lighting" },
    { id: 2, name: "Socket Outlets", power: 0, diversityFactor: 0.6, loadType: "socket-outlets" },
  ]);
  const [result, setResult] = useState<{
    totalConnectedLoad: number;
    maximumDemand: number;
    overallDiversityFactor: number;
    loadReduction: number;
  } | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const addLoad = (loadType: string = "custom") => {
    const preset = LOAD_PRESETS[loadType as keyof typeof LOAD_PRESETS];
    const newLoad: Load = {
      id: Date.now(),
      name: preset.name,
      power: 0,
      diversityFactor: preset.diversityFactor,
      loadType
    };
    setLoads([...loads, newLoad]);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) {
      setLoads(loads.filter(load => load.id !== id));
    }
  };

  const updateLoad = (id: number, field: keyof Load, value: string | number) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        let updatedLoad = { ...load, [field]: value };
        
        // If load type changes, update diversity factor to preset
        if (field === 'loadType' && typeof value === 'string') {
          const preset = LOAD_PRESETS[value as keyof typeof LOAD_PRESETS];
          updatedLoad.diversityFactor = preset.diversityFactor;
          updatedLoad.name = preset.name;
        }
        
        return updatedLoad;
      }
      return load;
    }));
    
    // Clear error for this load
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const validateAndCalculate = () => {
    const newErrors: { [key: number]: string } = {};
    
    loads.forEach(load => {
      if (load.power < 0) {
        newErrors[load.id] = "Power cannot be negative";
      } else if (load.power > 1000) {
        newErrors[load.id] = "Power seems unreasonably high";
      } else if (load.diversityFactor < 0 || load.diversityFactor > 1) {
        newErrors[load.id] = "Diversity factor must be between 0 and 1";
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const totalConnectedLoad = loads.reduce((sum, load) => sum + load.power, 0);
      const maximumDemand = loads.reduce((sum, load) => sum + (load.power * load.diversityFactor), 0);
      const overallDiversityFactor = totalConnectedLoad > 0 ? maximumDemand / totalConnectedLoad : 0;
      const loadReduction = totalConnectedLoad - maximumDemand;

      setResult({
        totalConnectedLoad,
        maximumDemand: Math.round(maximumDemand * 100) / 100,
        overallDiversityFactor: Math.round(overallDiversityFactor * 1000) / 1000,
        loadReduction: Math.round(loadReduction * 100) / 100
      });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setLoads([
      { id: 1, name: "Lighting", power: 0, diversityFactor: 0.9, loadType: "lighting" },
      { id: 2, name: "Socket Outlets", power: 0, diversityFactor: 0.6, loadType: "socket-outlets" },
    ]);
    setResult(null);
    setErrors({});
  };

  // Enhanced calculation with supply adequacy assessment
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loads.some(load => load.power > 0)) {
        validateAndCalculate();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [loads]);

  // Calculate estimated current and supply adequacy
  const calculateSupplyRequirements = (totalAfterDiversity: number) => {
    // Assume 230V single phase for current calculation
    const estimatedCurrent = (totalAfterDiversity * 1000) / 230;
    
    let supplyAdequacy = "";
    let mainSwitchRecommendation = "";
    
    if (estimatedCurrent <= 63) {
      supplyAdequacy = "Standard single phase supply adequate (100A service fuse)";
      mainSwitchRecommendation = estimatedCurrent <= 32 ? "63A Main Switch" : "100A Main Switch";
    } else if (estimatedCurrent <= 200) {
      supplyAdequacy = "Three phase supply recommended";
      mainSwitchRecommendation = "Three phase distribution board required";
    } else {
      supplyAdequacy = "High load installation - DNO consultation required";
      mainSwitchRecommendation = "Professional electrical design needed";
    }
    
    return { estimatedCurrent, supplyAdequacy, mainSwitchRecommendation };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Maximum Demand Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate maximum demand with BS 7671 diversity factors and supply adequacy assessment.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Stacked Header and Button */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Load Configuration
              </h3>
              <MobileSelectWrapper
                placeholder="Add Load Type"
                value=""
                onValueChange={addLoad}
                options={loadTypeOptions}
                icon={<Plus className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {loads.map((load) => (
                <div key={load.id} className={`p-4 border rounded-lg bg-elec-dark transition-colors ${
                  errors[load.id] ? 'border-destructive/50' : 'border-elec-yellow/20'
                }`}>
                  <div className="space-y-3">
                    {/* Load Type and Remove Button */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <MobileSelectWrapper
                          value={load.loadType}
                          onValueChange={(value) => updateLoad(load.id, 'loadType', value)}
                          options={loadTypeOptions}
                        />
                      </div>
                      {loads.length > 1 && (
                        <MobileButton 
                          onClick={() => removeLoad(load.id)} 
                          size="icon" 
                          variant="outline"
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </MobileButton>
                      )}
                    </div>

                    {/* Power and Diversity Factor */}
                    <div className="grid grid-cols-2 gap-3">
                      <MobileInput
                        label="Power (kW)"
                        type="text"
                        inputMode="decimal"
                        step="0.1"
                        value={load.power === 0 ? '' : load.power.toString()}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '.') {
                            updateLoad(load.id, 'power', 0);
                          } else {
                            const numValue = parseFloat(value);
                            updateLoad(load.id, 'power', isNaN(numValue) ? 0 : numValue);
                          }
                        }}
                        placeholder="0.0"
                      />
                      <MobileInput
                        label="Diversity Factor"
                        type="text"
                        inputMode="decimal"
                        step="0.1"
                        min="0"
                        max="1"
                        value={load.diversityFactor.toString()}
                        onChange={(e) => updateLoad(load.id, 'diversityFactor', parseFloat(e.target.value) || 0)}
                        placeholder="1.0"
                      />
                    </div>

                    {/* Error Display */}
                    {errors[load.id] && (
                      <div className="flex items-center gap-2 text-destructive text-xs">
                        <AlertTriangle className="h-3 w-3" />
                        {errors[load.id]}
                      </div>
                    )}

                    {/* Load Contribution */}
                    {load.power > 0 && (
                      <div className="text-xs text-muted-foreground bg-elec-yellow/5 p-2 rounded">
                        Contribution: {(load.power * load.diversityFactor).toFixed(2)} kW
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <MobileButton variant="outline" onClick={reset} size="wide">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Calculator
            </MobileButton>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-medium">Calculation Results</h3>
                {loads.length > 0 && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    {loads.length} Load{loads.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              {result ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Connected Load:</span>
                      <span className="font-semibold text-white">{result.totalConnectedLoad.toFixed(2)} kW</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-elec-yellow/10 rounded">
                      <span className="text-sm font-medium">Maximum Demand:</span>
                      <span className="text-xl font-bold text-primary">{result.maximumDemand} kW</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overall Diversity Factor:</span>
                      <span className="font-semibold text-white">{(result.overallDiversityFactor * 100).toFixed(1)}%</span>
                    </div>

                    {/* Enhanced supply assessment */}
                    {(() => {
                      const supplyInfo = calculateSupplyRequirements(result.maximumDemand);
                      return (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Estimated Current:</span>
                            <span className="font-semibold text-primary">{supplyInfo.estimatedCurrent.toFixed(1)} A</span>
                          </div>
                          
                          <Separator className="bg-muted/40" />
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Supply Assessment:</p>
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                              <div className="text-sm text-blue-300">
                                <p className="font-medium text-blue-400">Supply Adequacy:</p>
                                <p>{supplyInfo.supplyAdequacy}</p>
                              </div>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-green-400" />
                                <span className="text-sm font-medium text-green-400">Recommended:</span>
                                <span className="text-green-300">{supplyInfo.mainSwitchRecommendation}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  <Separator className="bg-muted/40" />
                  
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Load Reduction:</span>
                    </div>
                    <p className="text-green-300 mt-1">
                      {result.loadReduction.toFixed(2)} kW saved ({((result.loadReduction / result.totalConnectedLoad) * 100).toFixed(1)}% reduction)
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground bg-info/5 p-3 rounded">
                    <div className="font-medium text-info mb-1">Calculation Method:</div>
                    <div>Maximum Demand = Σ(Load × Diversity Factor)</div>
                    <div>Diversity accounts for non-simultaneous operation</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Add loads and enter power values to calculate maximum demand
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaximumDemandCalculator;
