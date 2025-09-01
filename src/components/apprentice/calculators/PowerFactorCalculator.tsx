
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlugZap, Info, Calculator, RotateCcw, BookOpen, TrendingDown } from "lucide-react";
import { useCalculator } from "./power-factor/useCalculator";

const PowerFactorCalculator = () => {
  const {
    activePower,
    setActivePower,
    apparentPower,
    setApparentPower,
    current,
    setCurrent,
    voltage, 
    setVoltage,
    calculationMethod,
    setCalculationMethod,
    powerFactor,
    errors,
    calculatePowerFactor,
    clearError,
    resetCalculator,
    targetPF,
    setTargetPF,
    pfType,
    setPfType,
    capacitorKVAr,
    currentAfterCorrection
  } = useCalculator();

  const getResultStatus = () => {
    if (powerFactor === null) return "Enter values to calculate";
    const pf = parseFloat(powerFactor);
    if (pf >= 0.95) return "Excellent efficiency";
    if (pf >= 0.85) return "Good efficiency"; 
    return "Poor efficiency - consider correction";
  };

  const getResultColor = () => {
    if (powerFactor === null) return "text-muted-foreground";
    const pf = parseFloat(powerFactor);
    if (pf >= 0.95) return "text-green-400";
    if (pf >= 0.85) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlugZap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Factor Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power factor from power values or electrical parameters with BS 7671 compliance checking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileSelect value={calculationMethod} onValueChange={(value: "power" | "currentVoltage") => setCalculationMethod(value)}>
              <MobileSelectTrigger label="Calculation Method">
                <MobileSelectValue placeholder="Select calculation method" />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                <MobileSelectItem value="power">From Power Values</MobileSelectItem>
                <MobileSelectItem value="currentVoltage">From Electrical Parameters</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {calculationMethod === "power" ? (
              <>
                <MobileInput
                  label="Active Power (W)"
                  type="number"
                  value={activePower}
                  onChange={(e) => setActivePower(e.target.value)}
                  placeholder="e.g., 2000"
                  unit="W"
                  error={errors.activePower}
                  clearError={() => clearError('activePower')}
                />
                <MobileInput
                  label="Apparent Power (VA)"
                  type="number"
                  value={apparentPower}
                  onChange={(e) => setApparentPower(e.target.value)}
                  placeholder="e.g., 2300"
                  unit="VA"
                  error={errors.apparentPower}
                  clearError={() => clearError('apparentPower')}
                />
              </>
            ) : (
              <>
                <MobileInput
                  label="Voltage (V)"
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="e.g., 230"
                  unit="V"
                  error={errors.voltage}
                  clearError={() => clearError('voltage')}
                />
                <MobileInput
                  label="Current (A)"
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="e.g., 10"
                  unit="A"
                  error={errors.current}
                  clearError={() => clearError('current')}
                />
                <MobileInput
                  label="Active Power (W)"
                  type="number"
                  value={activePower}
                  onChange={(e) => setActivePower(e.target.value)}
                  placeholder="e.g., 2000"
                  unit="W"
                  error={errors.activePower}
                  clearError={() => clearError('activePower')}
                />
              </>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelect value={pfType} onValueChange={setPfType}>
                <MobileSelectTrigger label="Power Factor Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <MobileSelectItem value="lagging">Lagging (Inductive loads)</MobileSelectItem>
                  <MobileSelectItem value="leading">Leading (Capacitive loads)</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
              
              {pfType === "lagging" && (
                <MobileInput
                  label="Target PF for Correction"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="0.99"
                  value={targetPF}
                  onChange={(e) => setTargetPF(e.target.value)}
                  placeholder="0.95"
                  hint="Typical target: 0.95"
                />
              )}
            </div>

            <div className="flex gap-2">
              <MobileButton onClick={calculatePowerFactor} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {powerFactor ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Power Factor</h3>
                    <div className="text-3xl font-mono text-elec-yellow mb-2">
                      {parseFloat(powerFactor).toFixed(3)}
                    </div>
                    <Badge variant="secondary" className={getResultColor()}>
                      {getResultStatus()}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method:</span>
                      <span className="text-white">{calculationMethod === 'power' ? 'Power Values' : 'V/I Parameters'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">BS 7671 Compliance:</span>
                      <span className={parseFloat(powerFactor) >= 0.85 ? "text-green-400" : "text-red-400"}>
                        {parseFloat(powerFactor) >= 0.85 ? "✓ Compliant" : "✗ Below minimum"}
                      </span>
                    </div>
                    {capacitorKVAr && targetPF && pfType === "lagging" && (
                      <div className="pt-2 border-t border-elec-yellow/20 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capacitor needed:</span>
                          <span className="font-mono text-elec-yellow">{capacitorKVAr} kVAr</span>
                        </div>
                        {currentAfterCorrection && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current after correction:</span>
                            <span className="font-mono text-green-400">{currentAfterCorrection} A</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {getResultStatus()}
                </div>
              )}
            </div>

            {capacitorKVAr && currentAfterCorrection && (
              <Alert className="border-green-500/30 bg-green-500/10">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  Current reduction with PF correction: {((parseFloat(current) - parseFloat(currentAfterCorrection)) / parseFloat(current) * 100).toFixed(1)}% lower
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        {/* What this means panel */}
        {powerFactor && (
          <div className="space-y-4">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What This Means
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-blue-200 space-y-2">
                  <p>• <strong>Power Factor Quality:</strong> {parseFloat(powerFactor) >= 0.95 ? "Excellent - minimal reactive power waste" : parseFloat(powerFactor) >= 0.85 ? "Acceptable for most applications" : "Poor - significant energy inefficiency"}</p>
                  {pfType === "lagging" && (
                    <p>• <strong>Inductive Load:</strong> Current lags voltage - typical of motors, transformers, fluorescent lighting</p>
                  )}
                  {pfType === "leading" && (
                    <p>• <strong>Capacitive Load:</strong> Current leads voltage - can cause voltage regulation issues</p>
                  )}
                  {capacitorKVAr && (
                    <p>• <strong>Correction Benefits:</strong> Reduced kVA demand, lower energy costs, improved voltage regulation, reduced cable losses</p>
                  )}
                  <p>• <strong>Energy Impact:</strong> Low PF increases the kVA demand from the DNO, potentially increasing energy charges</p>
                </div>
              </CardContent>
            </Card>
            
            {/* BS 7671 Guidance */}
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  BS 7671 Regs at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-amber-200 space-y-1">
                  <p>• <strong>512.1.2:</strong> Equipment selection must consider power factor and efficiency requirements</p>
                  <p>• <strong>525:</strong> Voltage drop calculations must account for both active and reactive power</p>
                  <p>• <strong>523:</strong> Conductor sizing based on design current, not reduced current from poor PF</p>
                  <p>• <strong>534:</strong> Capacitor banks require appropriate protection and switching arrangements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Alert className="border-blue-500/20 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            Power Factor = Active Power ÷ Apparent Power. BS 7671 requires minimum 0.85 for most installations. Ideal range: 0.95-1.0.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default PowerFactorCalculator;
