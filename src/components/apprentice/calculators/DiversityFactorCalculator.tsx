
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Wrench, Info, CheckCircle2, RotateCcw, Zap, Plus, BarChart3, Calculator, Lightbulb, TrendingDown } from "lucide-react";
import { useMultiLoadDiversityCalculator } from "./diversity-factor/useMultiLoadDiversityCalculator";
import { LoadEntry } from "./diversity-factor/LoadEntry";
import { useState } from "react";

const DiversityFactorCalculator = () => {
  const {
    loads,
    location,
    supplyVoltage,
    inputMode,
    result,
    errors,
    showResults,
    addLoad,
    removeLoad,
    updateLoad,
    setLocation,
    setSupplyVoltage,
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,
    loadTypes
  } = useMultiLoadDiversityCalculator();

  const [supplyType, setSupplyType] = useState<string>("single-phase");

  const calculateEstimatedCurrent = () => {
    if (!result) return 0;
    
    const voltage = parseFloat(supplyVoltage);
    const voltageFactor = supplyType === "three-phase" ? Math.sqrt(3) : 1;
    
    return result.diversifiedCurrent;
  };

  const getMainDeviceRecommendation = () => {
    const current = calculateEstimatedCurrent();
    
    if (current <= 6) return "6A MCB/RCBO";
    if (current <= 10) return "10A MCB/RCBO";
    if (current <= 16) return "16A MCB/RCBO";
    if (current <= 20) return "20A MCB/RCBO";
    if (current <= 25) return "25A MCB/RCBO";
    if (current <= 32) return "32A MCB/RCBO";
    if (current <= 40) return "40A MCB/RCBO";
    if (current <= 50) return "50A MCB/RCBO";
    if (current <= 63) return "63A MCB/RCBO";
    if (current <= 80) return "80A Switch Disconnector";
    if (current <= 100) return "100A Switch Disconnector";
    return "125A+ Switch Disconnector";
  };

  const locationOptions = [
    { value: "domestic", label: "Domestic Installation" },
    { value: "commercial", label: "Commercial Installation" },
    { value: "industrial", label: "Industrial Installation" }
  ];

  const voltageOptions = [
    { value: "230", label: "230V" },
    { value: "400", label: "400V" }
  ];

  const supplyTypeOptions = [
    { value: "single-phase", label: "Single Phase" },
    { value: "three-phase", label: "Three Phase" }
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Diversity Factor Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate electrical demand after applying BS 7671 diversity factors with practical guidance.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {/* Configuration Section */}
          <div className="space-y-4">
            {/* Input Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Input Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Choose between kilowatt or amperage input
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${inputMode === 'amperage' ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                  Amperage (A)
                </span>
                <Switch
                  checked={inputMode === 'kw'}
                  onCheckedChange={(checked) => toggleInputMode(checked ? 'kw' : 'amperage')}
                />
                <span className={`text-sm ${inputMode === 'kw' ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                  Power (kW)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileSelectWrapper
                label="Installation Type"
                value={location}
                onValueChange={setLocation}
                options={locationOptions}
                placeholder="Select installation type"
              />
              
              <MobileSelectWrapper
                label="Supply Type"
                value={supplyType}
                onValueChange={setSupplyType}
                options={supplyTypeOptions}
                placeholder="Select supply type"
              />
              
              <MobileSelectWrapper
                label="Supply Voltage (V)"
                value={supplyVoltage}
                onValueChange={setSupplyVoltage}
                options={voltageOptions}
                placeholder="Select voltage"
              />
            </div>
          </div>

          <Separator />

          {/* Loads Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Circuit Loads</h3>
                <p className="text-sm text-muted-foreground">Add multiple loads for comprehensive diversity calculation</p>
              </div>
              <Button onClick={addLoad} size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Load
              </Button>
            </div>

            <div className="space-y-3">
              {loads.map((load, index) => (
                <LoadEntry
                  key={load.id}
                  load={load}
                  index={index}
                  canRemove={loads.length > 1}
                  loadTypes={loadTypes}
                  errors={errors}
                  inputMode={inputMode}
                  supplyVoltage={supplyVoltage}
                  onUpdate={updateLoad}
                  onRemove={removeLoad}
                  onClearError={clearError}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateDemand}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={loads.some(load => !load.type || !load.connectedLoad)}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Diversity
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <Separator />

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[400px]">
              {showResults && result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Diversity Results</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground">Total Installed Load</span>
                      <div className="text-lg font-semibold">{result.totalInstalledLoad.toFixed(2)} kW</div>
                      <div className="text-sm text-muted-foreground">{result.totalDesignCurrent.toFixed(1)} A</div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground">Diversified Load</span>
                      <div className="text-lg font-bold text-primary">{result.diversifiedLoad.toFixed(2)} kW</div>
                      <div className="text-sm font-semibold text-primary">{result.diversifiedCurrent.toFixed(1)} A</div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Diversity Factor:</span>
                      <span className="text-lg font-bold text-primary">{(result.overallDiversityFactor * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {result.breakdownByType.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm font-medium">Load Breakdown</span>
                      </div>
                      <div className="space-y-2">
                        {result.breakdownByType.map((breakdown, index) => (
                          <div key={index} className="bg-muted/20 rounded p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium capitalize">{breakdown.type.replace('-', ' ')}</span>
                              <span className="text-sm font-semibold">{(breakdown.diversityFactor * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{breakdown.installedLoad.toFixed(2)} kW → {breakdown.diversifiedLoad.toFixed(2)} kW</span>
                              <span>-{(breakdown.installedLoad - breakdown.diversifiedLoad).toFixed(2)} kW</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Equipment:</p>
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Protection Device:</span>
                        <span className="text-green-300">{getMainDeviceRecommendation()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                    <div className="text-sm text-blue-300">
                      <p className="font-medium text-blue-400">Total Load Reduction:</p>
                      <p>{(result.totalInstalledLoad - result.diversifiedLoad).toFixed(2)} kW saved ({((result.totalInstalledLoad - result.diversifiedLoad) / result.totalInstalledLoad * 100).toFixed(1)}% reduction)</p>
                    </div>
                  </div>

                  {result.complianceNotes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Compliance Notes:</p>
                      <div className="space-y-1">
                        {result.complianceNotes.map((note, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {note}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p>Add your circuit loads and click "Calculate Diversity" to see results</p>
                    <div className="mt-4 text-sm space-y-1">
                      <p>• Configure installation type and voltage</p>
                      <p>• Add circuit loads with their types</p>
                      <p>• Choose between kW or Amperage input</p>
                      <p>• Get BS 7671 compliant diversity calculations</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          {showResults && result && (
            <>
              {/* What This Means Panel */}
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200">
                  <div className="space-y-3">
                    <p className="font-medium text-blue-300">What This Means:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-300">Practical Impact:</h4>
                        <ul className="space-y-1">
                          <li>• <strong>Cable Savings:</strong> Use smaller cables than total connected load suggests</li>
                          <li>• <strong>Protection:</strong> {getMainDeviceRecommendation()} recommended</li>
                          <li>• <strong>Cost Reduction:</strong> {((result.totalInstalledLoad - result.diversifiedLoad) / result.totalInstalledLoad * 100).toFixed(1)}% load reduction saves on installation costs</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-300">Engineering Basis:</h4>
                        <ul className="space-y-1">
                          <li>• <strong>Diversity Factor:</strong> Not all loads operate simultaneously</li>
                          <li>• <strong>BS 7671 Compliance:</strong> Based on Table 311 diversity factors</li>
                          <li>• <strong>Real Usage:</strong> Reflects actual electrical demand patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Practical Recommendations */}
              <Alert className="border-green-500/20 bg-green-500/10">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  <div className="space-y-3">
                    <p className="font-medium text-green-300">Next Steps & Recommendations:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-300">Cable Sizing:</h4>
                        <ul className="space-y-1">
                          <li>• Design for {result.diversifiedCurrent.toFixed(1)}A, not {result.totalDesignCurrent.toFixed(1)}A</li>
                          <li>• Consider voltage drop at diversified current</li>
                          <li>• Apply derating factors for installation method</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-300">Future Considerations:</h4>
                        <ul className="space-y-1">
                          <li>• Plan for 20-30% future load growth</li>
                          <li>• Review diversity if load patterns change</li>
                          <li>• Document assumptions for future reference</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* BS 7671 Guidance */}
          <Alert className="border-green-500/20 bg-green-500/10">
            <Info className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-200">
              <div className="space-y-2">
                <p className="font-medium">BS 7671 Regulations:</p>
                <ul className="text-sm space-y-1">
                  <li>• Diversity factors from Table 311 (Appendix 1)</li>
                  <li>• Consider simultaneity and load patterns</li>
                  <li>• Apply to final circuits and distribution boards</li>
                  <li>• Document diversity assumptions for future reference</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default DiversityFactorCalculator;
