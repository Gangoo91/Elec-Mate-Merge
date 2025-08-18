
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlugZap, Info, Calculator, RotateCcw, Copy, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCalculator } from "./power-factor/useCalculator";
import CalculationHistory from "./calculation-history/CalculationHistory";
import QuickCalculationPresets from "./smart-features/QuickCalculationPresets";
import SmartInputSuggestions from "./smart-features/SmartInputSuggestions";
import { copyToClipboard } from "@/lib/calc-utils";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const PowerFactorCalculator = () => {
  const { toast } = useToast();
  const historyRef = useRef<any>(null);
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
    capacitorKVAr
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

  const handlePresetSelect = (preset: any) => {
    setActivePower(preset.inputs.activePower || "");
    setApparentPower(preset.inputs.apparentPower || "");
    setCurrent(preset.inputs.current || "");
    setVoltage(preset.inputs.voltage || "");
    setCalculationMethod(preset.inputs.calculationMethod || "power");
    toast({
      title: "Preset Applied",
      description: preset.name,
    });
  };

  const handleRestoreCalculation = (entry: any) => {
    setActivePower(entry.inputs.activePower || "");
    setApparentPower(entry.inputs.apparentPower || "");
    setCurrent(entry.inputs.current || "");
    setVoltage(entry.inputs.voltage || "");
    setCalculationMethod(entry.inputs.calculationMethod || "power");
    // Note: powerFactor is calculated, not an input
  };

  const copyResults = async () => {
    if (!powerFactor) return;
    
    const pf = parseFloat(powerFactor);
    const text = `Power Factor Calculation:
Power Factor: ${pf.toFixed(3)}
Status: ${getResultStatus()}
BS 7671 Compliance: ${pf >= 0.85 ? 'Compliant' : 'Below minimum'}
Method: ${calculationMethod === 'power' ? 'Power Values' : 'V/I Parameters'}
${capacitorKVAr && targetPF ? `Correction to ${targetPF}: ${capacitorKVAr} kVAr` : ''}`;
    
    const success = await copyToClipboard(text);
    toast({
      title: success ? "Copied!" : "Copy Failed", 
      description: success ? "Results copied to clipboard" : "Please try again",
      variant: success ? "default" : "destructive",
    });
  };

  const shareResults = async () => {
    if (!powerFactor) return;
    
    const pf = parseFloat(powerFactor);
    const text = `Power Factor: ${pf.toFixed(3)} - ${pf >= 0.85 ? 'BS 7671 Compliant' : 'Below Standard'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "Power Factor Calculation", text });
      } catch (error) {
        copyResults();
      }
    } else {
      copyResults();
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <QuickCalculationPresets 
        calculatorType="power-factor"
        onPresetSelect={handlePresetSelect}
      />

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
              <MobileSelectContent>
                <MobileSelectItem value="power">From Power Values</MobileSelectItem>
                <MobileSelectItem value="currentVoltage">From Electrical Parameters</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {calculationMethod === "power" ? (
              <>
                <div className="space-y-4">
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
                  <SmartInputSuggestions
                    fieldType="power"
                    currentValue={activePower}
                    onSuggestionSelect={setActivePower}
                    calculatorType="power-factor"
                  />
                </div>
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
                <div className="space-y-4">
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
                  <SmartInputSuggestions
                    fieldType="voltage"
                    currentValue={voltage}
                    onSuggestionSelect={setVoltage}
                    calculatorType="power-factor"
                  />
                </div>
                <div className="space-y-4">
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
                  <SmartInputSuggestions
                    fieldType="current"
                    currentValue={current}
                    onSuggestionSelect={setCurrent}
                    calculatorType="power-factor"
                  />
                </div>
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
                    {capacitorKVAr && targetPF && (
                      <div className="pt-2 border-t border-elec-yellow/20">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Correction to {targetPF}:</span>
                          <span className="font-mono text-elec-yellow">{capacitorKVAr} kVAr</span>
                        </div>
                       </div>
                     )}
                   </div>
                   
                   <div className="flex gap-2 mt-4">
                     <MobileButton onClick={copyResults} variant="elec-outline" size="sm" className="flex-1">
                       <Copy className="h-4 w-4 mr-2" />
                       Copy
                     </MobileButton>
                     <MobileButton onClick={shareResults} variant="elec-outline" size="sm" className="flex-1">
                       <Share2 className="h-4 w-4 mr-2" />
                       Share
                     </MobileButton>
                   </div>
                 </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {getResultStatus()}
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Power Factor = Active Power ÷ Apparent Power. BS 7671 requires minimum 0.85 for most installations. Ideal range: 0.95-1.0.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Calculation History */}
    <CalculationHistory
      ref={historyRef}
      calculatorType="power-factor"
      onRestoreCalculation={handleRestoreCalculation}
    />
  </div>
  );
};

export default PowerFactorCalculator;
