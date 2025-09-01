
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Diversity Factor Calculator</CardTitle>
          <Badge variant="outline" className="ml-auto text-xs">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="load-type" className="flex items-center gap-2">
                Load Type
                {errors.loadType && <AlertTriangle className="h-3 w-3 text-destructive" />}
              </Label>
              <Select 
                value={loadType} 
                onValueChange={(value) => {
                  setLoadType(value);
                  clearError('loadType');
                }}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select load type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="lighting">Lighting Circuits</SelectItem>
                  <SelectItem value="socket-outlets">Socket Outlets</SelectItem>
                  <SelectItem value="cooking">Cooking Appliances</SelectItem>
                  <SelectItem value="water-heating">Water Heating</SelectItem>
                  <SelectItem value="space-heating">Space Heating</SelectItem>
                  <SelectItem value="motors">Motors</SelectItem>
                  <SelectItem value="mixed-domestic">Mixed Domestic</SelectItem>
                  <SelectItem value="immersion-heater">Immersion Heaters</SelectItem>
                  <SelectItem value="shower">Electric Showers</SelectItem>
                </SelectContent>
              </Select>
              {errors.loadType && (
                <p className="text-xs text-destructive mt-1">{errors.loadType}</p>
              )}
            </div>

            <div>
              <Label htmlFor="connected-load" className="flex items-center gap-2">
                Connected Load per Unit (A)
                {errors.connectedLoad && <AlertTriangle className="h-3 w-3 text-destructive" />}
              </Label>
              <Input
                id="connected-load"
                type="number"
                step="0.1"
                min="0"
                value={connectedLoad}
                onChange={(e) => {
                  setConnectedLoad(e.target.value);
                  clearError('connectedLoad');
                }}
                placeholder="Enter connected load in amperes"
                className="bg-elec-dark border-elec-yellow/20"
              />
              {errors.connectedLoad && (
                <p className="text-xs text-destructive mt-1">{errors.connectedLoad}</p>
              )}
            </div>

            <div>
              <Label htmlFor="number-units" className="flex items-center gap-2">
                Number of Units/Circuits
                {errors.numberOfUnits && <AlertTriangle className="h-3 w-3 text-destructive" />}
              </Label>
              <Input
                id="number-units"
                type="number"
                min="1"
                value={numberOfUnits}
                onChange={(e) => {
                  setNumberOfUnits(e.target.value);
                  clearError('numberOfUnits');
                }}
                placeholder="Enter number of units"
                className="bg-elec-dark border-elec-yellow/20"
              />
              {errors.numberOfUnits && (
                <p className="text-xs text-destructive mt-1">{errors.numberOfUnits}</p>
              )}
            </div>

            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="w-full"
            >
              <Wrench className="mr-2 h-4 w-4" />
              Reset Calculator
            </Button>
          </div>

          {/* Results Section */}
          <div className="bg-elec-dark/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-lg font-medium text-elec-yellow">Calculation Results</h3>
            </div>
            
            {result ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Connected Load:</span>
                    <span className="font-semibold text-white">{result.totalConnectedLoad}A</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-elec-yellow/10 rounded">
                    <span className="text-sm font-medium">Demand After Diversity:</span>
                    <span className="text-lg font-bold text-elec-yellow">{result.demandAfterDiversity}A</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Diversity Factor:</span>
                    <span className="font-semibold text-white">{(result.diversityFactor * 100).toFixed(1)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Calculation Method:</span>
                    <span className="text-xs font-medium text-blue-300">{result.calculationMethod}</span>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Load Reduction:</span>
                  </div>
                  <p className="text-green-300 mt-1">
                    {result.loadReduction}A saved ({((result.loadReduction / result.totalConnectedLoad) * 100).toFixed(1)}% reduction)
                  </p>
                </div>

                {loadType && (
                  <div className="bg-info/10 border border-info/30 rounded p-3">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-info mb-1">BS 7671 Basis:</p>
                        <p className="text-xs text-muted-foreground">
                          {diversityFactors[loadType as keyof typeof diversityFactors]?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Select load type and enter values to see calculation results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Diversity in Electrical Design:</strong> Diversity factors account for the fact that not all electrical loads operate simultaneously at full capacity. This allows for more economical cable sizing and distribution equipment selection while maintaining safety standards per BS 7671:2018+A2:2022.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default DiversityFactorCalculator;
