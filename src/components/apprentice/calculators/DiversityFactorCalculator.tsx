
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wrench, Calculator, Info, AlertTriangle, CheckCircle2, RotateCcw, Zap } from "lucide-react";
import { useDiversityCalculator } from "./diversity-factor/useDiversityCalculator";
import { useState } from "react";

const DiversityFactorCalculator = () => {
  const {
    loadType,
    connectedLoad,
    numberOfUnits,
    result,
    errors,
    setLoadType,
    setConnectedLoad,
    setNumberOfUnits,
    resetCalculator,
    clearError,
    diversityFactors
  } = useDiversityCalculator();

  const [supplyType, setSupplyType] = useState<string>("single-phase");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");

  const calculateEstimatedCurrent = () => {
    if (!result) return 0;
    
    const voltage = parseFloat(supplyVoltage);
    const voltageFactor = supplyType === "three-phase" ? Math.sqrt(3) : 1;
    
    return (result.demandAfterDiversity * 1000) / (voltage * voltageFactor);
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

  return (
    <Card className="border border-muted/40 bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supply-type">Supply Type</Label>
                <Select value={supplyType} onValueChange={setSupplyType}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="single-phase">Single Phase</SelectItem>
                    <SelectItem value="three-phase">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                <Select value={supplyVoltage} onValueChange={setSupplyVoltage}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="230">230V</SelectItem>
                    <SelectItem value="400">400V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="load-type">Load Type</Label>
              <Select value={loadType} onValueChange={(value) => {
                setLoadType(value);
                clearError('loadType');
              }}>
                <SelectTrigger className={`bg-card border ${errors.loadType ? 'border-destructive' : 'border-muted/40'}`}>
                  <SelectValue placeholder="Select load type" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-muted/40 z-50">
                  {Object.entries(diversityFactors).map(([key, factor]) => (
                    <SelectItem key={key} value={key}>
                      {factor.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.loadType && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.loadType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="connected-load">Connected Load (A)</Label>
              <Input
                id="connected-load"
                type="number"
                step="0.1"
                min="0"
                placeholder="Enter total connected load"
                value={connectedLoad}
                onChange={(e) => {
                  setConnectedLoad(e.target.value);
                  clearError('connectedLoad');
                }}
                className={`bg-card border ${errors.connectedLoad ? 'border-destructive' : 'border-muted/40'}`}
              />
              {errors.connectedLoad && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.connectedLoad}
                </p>
              )}
            </div>

            {loadType && diversityFactors[loadType]?.calculationMethod === 'unit-based' && (
              <div className="space-y-2">
                <Label htmlFor="number-of-units">Number of Units</Label>
                <Input
                  id="number-of-units"
                  type="number"
                  min="1"
                  placeholder="Enter number of units"
                  value={numberOfUnits}
                  onChange={(e) => {
                    setNumberOfUnits(e.target.value);
                    clearError('numberOfUnits');
                  }}
                  className={`bg-card border ${errors.numberOfUnits ? 'border-destructive' : 'border-muted/40'}`}
                />
                {errors.numberOfUnits && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.numberOfUnits}
                  </p>
                )}
              </div>
            )}

            {loadType && (
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200">
                  <div className="space-y-1">
                    <p className="font-medium">Diversity Factor: {(diversityFactors[loadType].diversityFactor * 100).toFixed(0)}%</p>
                    <p className="text-sm">{diversityFactors[loadType].description}</p>
                    <p className="text-xs">Method: {diversityFactors[loadType].calculationMethod}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetCalculator} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Calculator
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Diversity Results</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Connected Load:</span>
                      <span className="font-semibold">{result.totalConnectedLoad} A</span>
                    </div>
                    <div className="flex justify-between p-3 bg-elec-yellow/10 rounded">
                      <span className="text-sm font-medium">Demand After Diversity:</span>
                      <span className="text-xl font-bold text-elec-yellow">{result.demandAfterDiversity} A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Diversity Factor Applied:</span>
                      <span className="font-semibold">{(result.diversityFactor * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Current:</span>
                      <span className="font-semibold text-elec-yellow">{calculateEstimatedCurrent().toFixed(1)} A</span>
                    </div>
                  </div>

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
                      <p className="font-medium text-blue-400">Load Reduction:</p>
                      <p>{result.loadReduction} A saved ({((result.loadReduction / result.totalConnectedLoad) * 100).toFixed(1)}% reduction)</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>Calculation: {result.totalConnectedLoad} A × {(result.diversityFactor * 100).toFixed(0)}% = {result.demandAfterDiversity} A</p>
                    <p>Method: {result.calculationMethod}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Wrench className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Select load type and enter values to calculate diversity</p>
                  </div>
                </div>
              )}
            </div>

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Diversity recognises that not all loads operate simultaneously</li>
                    <li>• Allows more economical sizing of cables and protective devices</li>
                    <li>• Current calculation determines circuit protection requirements</li>
                    <li>• Consider future load growth and expansion</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

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
