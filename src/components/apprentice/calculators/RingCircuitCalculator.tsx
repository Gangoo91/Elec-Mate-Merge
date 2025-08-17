import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, AlertTriangle, CheckCircle, Info, Zap, TrendingUp, Settings, AlertCircle, Eye, RotateCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRingCircuitCalculator } from "./ring-circuit/useRingCircuitCalculator";
import RingCircuitEducation from "./ring-circuit/RingCircuitEducation";

const RingCircuitCalculator = () => {
  const {
    readings,
    cableType,
    cableLength,
    temperature,
    result,
    errors,
    setCableType,
    setCableLength,
    setTemperature,
    handleInputChange,
    calculateValues,
    resetCalculator
  } = useRingCircuitCalculator();

  return (
    <div className="space-y-6">
      {/* Educational Content */}
      <RingCircuitEducation />

      {/* Calculator */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <CardTitle>Ring Final Circuit Calculator</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              BS 7671
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Cable Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-elec-yellow">Cable Settings (Optional)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cable-type">Cable Type</Label>
                    <Select value={cableType} onValueChange={setCableType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select cable type" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                        <SelectItem value="2.5mm-twin">2.5mm² Twin & Earth</SelectItem>
                        <SelectItem value="4mm-twin">4.0mm² Twin & Earth</SelectItem>
                        <SelectItem value="6mm-twin">6.0mm² Twin & Earth</SelectItem>
                        <SelectItem value="10mm-twin">10.0mm² Twin & Earth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="cable-length" className="flex items-center gap-2">
                      Total Cable Length (m)
                      {errors.cableLength && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="cable-length"
                      type="number"
                      step="1"
                      placeholder="e.g. 80"
                      value={cableLength}
                      onChange={(e) => setCableLength(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.cableLength && (
                      <p className="text-xs text-destructive mt-1">{errors.cableLength}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      Test Temperature (°C)
                      {errors.temperature && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="temperature" 
                      type="number"
                      step="1"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.temperature && (
                      <p className="text-xs text-destructive mt-1">{errors.temperature}</p>
                    )}
                  </div>
                </div>

                <Alert className="bg-info/10 border-info/30">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-info">
                    Cable settings enable comparison with theoretical values and temperature correction.
                  </AlertDescription>
                </Alert>
              </div>

              <Separator className="bg-elec-yellow/20" />

              {/* End-to-End Readings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-elec-yellow">End-to-End Readings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="end-to-end-live" className="flex items-center gap-2">
                      Live Conductor (Ω)
                      {errors.endToEndLive && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="end-to-end-live"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.20"
                      value={readings.endToEndLive}
                      onChange={(e) => handleInputChange("endToEndLive", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.endToEndLive && (
                      <p className="text-xs text-destructive mt-1">{errors.endToEndLive}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="end-to-end-neutral" className="flex items-center gap-2">
                      Neutral Conductor (Ω)
                      {errors.endToEndNeutral && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="end-to-end-neutral"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.20"
                      value={readings.endToEndNeutral}
                      onChange={(e) => handleInputChange("endToEndNeutral", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.endToEndNeutral && (
                      <p className="text-xs text-destructive mt-1">{errors.endToEndNeutral}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="end-to-end-cpc" className="flex items-center gap-2">
                      CPC (Earth) (Ω)
                      {errors.endToEndCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="end-to-end-cpc"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.92"
                      value={readings.endToEndCpc}
                      onChange={(e) => handleInputChange("endToEndCpc", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.endToEndCpc && (
                      <p className="text-xs text-destructive mt-1">{errors.endToEndCpc}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cross-Connected Readings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-elec-yellow">Cross-Connected Readings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="live-to-neutral" className="flex items-center gap-2">
                      Live to Neutral (Ω)
                      {errors.liveToNeutral && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="live-to-neutral"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 0.60"
                      value={readings.liveToNeutral}
                      onChange={(e) => handleInputChange("liveToNeutral", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.liveToNeutral && (
                      <p className="text-xs text-destructive mt-1">{errors.liveToNeutral}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="live-to-cpc" className="flex items-center gap-2">
                      Live to CPC (Ω)
                      {errors.liveToCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="live-to-cpc"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.56"
                      value={readings.liveToCpc}
                      onChange={(e) => handleInputChange("liveToCpc", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.liveToCpc && (
                      <p className="text-xs text-destructive mt-1">{errors.liveToCpc}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="neutral-to-cpc" className="flex items-center gap-2">
                      Neutral to CPC (Ω)
                      {errors.neutralToCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                    </Label>
                    <Input
                      id="neutral-to-cpc"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.56"
                      value={readings.neutralToCpc}
                      onChange={(e) => handleInputChange("neutralToCpc", e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                    {errors.neutralToCpc && (
                      <p className="text-xs text-destructive mt-1">{errors.neutralToCpc}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-lg font-semibold text-elec-yellow">Analysis Results</h3>
              </div>
              
              {result ? (
                <div className="space-y-4">
                  {/* Status Alert */}
                  <Alert className={`border ${result.isValid ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                    {result.isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                    <AlertDescription className={result.isValid ? 'text-green-400' : 'text-red-400'}>
                      <strong>{result.continuityStatus}</strong>
                    </AlertDescription>
                  </Alert>

                  {/* Calculated Values */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
                      <div className="text-xs text-muted-foreground">R1 (Live)</div>
                      <div className="text-lg font-bold text-elec-yellow">{result.r1.toFixed(3)} Ω</div>
                      {result.expectedValues && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Expected: {result.expectedValues.r1Expected.toFixed(3)} Ω
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
                      <div className="text-xs text-muted-foreground">R2 (CPC)</div>
                      <div className="text-lg font-bold text-elec-yellow">{result.r2.toFixed(3)} Ω</div>
                      {result.expectedValues && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Expected: {result.expectedValues.r2Expected.toFixed(3)} Ω
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
                      <div className="text-xs text-muted-foreground">Rn (Neutral)</div>
                      <div className="text-lg font-bold text-elec-yellow">{result.rn.toFixed(3)} Ω</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
                      <div className="text-xs text-muted-foreground">R1 + R2</div>
                      <div className="text-lg font-bold text-elec-yellow">{result.r1PlusR2.toFixed(3)} Ω</div>
                    </div>
                  </div>

                  {/* Detailed Validation Results */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-elec-yellow text-sm">Test Analysis</h4>
                    
                    {Object.entries(result.validationDetails).map(([category, checks]) => {
                      if (checks.length === 0) return null;
                      
                      return (
                        <div key={category} className="bg-elec-dark/30 rounded-lg p-3">
                          <h5 className="font-medium text-white mb-2 text-sm capitalize">
                            {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h5>
                          <div className="space-y-2">
                            {checks.map((check, index) => (
                              <div key={index} className={`flex items-start gap-2 p-2 rounded text-xs ${
                                check.status === 'pass' ? 'bg-green-500/10' : 
                                check.status === 'warning' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                              }`}>
                                {check.status === 'pass' && <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />}
                                {check.status === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />}
                                {check.status === 'fail' && <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium">{check.description}</div>
                                  <div className="text-muted-foreground">{check.message}</div>
                                  {check.actualValue !== undefined && (
                                    <div className="mt-1">
                                      Actual: {check.actualValue.toFixed(3)}Ω
                                      {check.expectedValue && ` | Expected: ${check.expectedValue.toFixed(3)}Ω`}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <Alert className="bg-yellow-500/10 border-yellow-500/30">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription>
                        <div className="font-medium text-yellow-400 mb-2">Warnings:</div>
                        <ul className="space-y-1">
                          {result.warnings.map((warning, index) => (
                            <li key={index} className="text-sm text-yellow-300">• {warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-info" />
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-info/30">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Enter your test readings to see comprehensive analysis results
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-elec-yellow/20" />

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateValues} 
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Ring Circuit
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator} 
              className="flex-1"
            >
              Reset Calculator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitCalculator;