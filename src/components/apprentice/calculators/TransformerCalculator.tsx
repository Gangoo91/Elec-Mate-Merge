import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MobileOptimizedInput from "@/components/install-planner/MobileOptimizedInput";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, Info, Calculator, RotateCcw, Settings, Shield, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { calculateTransformer, transformerPresets, type TransformerInputs, type TransformerResults } from "@/lib/transformer-calcs";

const TransformerCalculator = () => {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [primaryVoltage, setPrimaryVoltage] = useState<string>("");
  const [secondaryVoltage, setSecondaryVoltage] = useState<string>("");
  const [kvaRating, setKvaRating] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [phase, setPhase] = useState<string>("three");
  const [frequency, setFrequency] = useState<string>("50");
  const [percentImpedance, setPercentImpedance] = useState<string>("6");
  const [connectionType, setConnectionType] = useState<string>("Dyn11");
  const [sourceFaultLevel, setSourceFaultLevel] = useState<string>("");
  const [ambientTemp, setAmbientTemp] = useState<string>("40");
  const [altitude, setAltitude] = useState<string>("0");
  const [harmonics, setHarmonics] = useState(false);
  const [result, setResult] = useState<TransformerResults | null>(null);

  const handleCalculate = () => {
    const inputs: TransformerInputs = {
      primaryVoltage: parseFloat(primaryVoltage),
      secondaryVoltage: parseFloat(secondaryVoltage),
      kvaRating: parseFloat(kvaRating),
      powerFactor: parseFloat(powerFactor),
      phase: phase as 'single' | 'three',
      frequency: parseFloat(frequency),
      percentImpedance: parseFloat(percentImpedance),
      sourceFaultLevel: sourceFaultLevel ? parseFloat(sourceFaultLevel) : undefined,
      ambientTemp: parseFloat(ambientTemp),
      altitude: parseFloat(altitude),
      harmonics,
      connectionType
    };

    if (inputs.primaryVoltage > 0 && inputs.secondaryVoltage > 0 && inputs.kvaRating > 0) {
      const transformerResults = calculateTransformer(inputs);
      setResult(transformerResults);
    }
  };

  // Enhanced calculations for better guidance
  const getComplianceStatus = (result: TransformerResults) => {
    const issues = [];
    if (result.voltageRegulation > 0.05) issues.push("High voltage regulation");
    if (result.efficiency < 0.9) issues.push("Low efficiency");
    if (result.transformerFaultCurrent > 35000) issues.push("Very high fault current");
    
    return {
      status: issues.length === 0 ? "compliant" : issues.length <= 1 ? "caution" : "review",
      issues
    };
  };

  const getRecommendedMCCB = (current: number) => {
    const standardSizes = [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600];
    return standardSizes.find(size => size >= current * 1.25) || "Contact manufacturer";
  };

  const getSwitchgearBreakingCapacity = (faultCurrent: number) => {
    if (faultCurrent <= 10000) return "10kA minimum";
    if (faultCurrent <= 25000) return "25kA minimum";
    if (faultCurrent <= 36000) return "36kA minimum";
    if (faultCurrent <= 50000) return "50kA minimum";
    return "65kA+ specialist required";
  };

  const reset = () => {
    setPrimaryVoltage("");
    setSecondaryVoltage("");
    setKvaRating("");
    setPowerFactor("0.85");
    setPhase("three");
    setFrequency("50");
    setPercentImpedance("6");
    setConnectionType("Dyn11");
    setSourceFaultLevel("");
    setAmbientTemp("40");
    setAltitude("0");
    setHarmonics(false);
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Transformer Calculator</CardTitle>
        </div>
        <CardDescription>
          Comprehensive transformer calculations with BS 7671 18th Edition compliance. Enter primary and secondary parameters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileOptimizedInput
              id="primaryVoltage"
              label="Primary Voltage"
              type="number"
              inputMode="numeric"
              value={primaryVoltage}
              onChange={(value) => setPrimaryVoltage(value)}
              placeholder="e.g., 11000"
              unit="V"
              description="Input voltage to transformer primary"
            />

            <MobileOptimizedInput
              id="secondaryVoltage"
              label="Secondary Voltage"
              type="number"
              inputMode="numeric"
              value={secondaryVoltage}
              onChange={(value) => setSecondaryVoltage(value)}
              placeholder="e.g., 400"
              unit="V"
              description="Output voltage from transformer secondary"
            />

            <MobileOptimizedInput
              id="kvaRating"
              label="kVA Rating"
              type="number"
              inputMode="numeric"
              value={kvaRating}
              onChange={(value) => setKvaRating(value)}
              placeholder="e.g., 500"
              unit="kVA"
              description="Transformer apparent power rating"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MobileOptimizedInput
                id="powerFactor"
                label="Power Factor"
                type="number"
                inputMode="decimal"
                value={powerFactor}
                onChange={(value) => setPowerFactor(value)}
                placeholder="0.85"
                description="Load power factor (0.1-1.0)"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Phase Configuration</label>
                <div className="flex gap-2">
                  <Badge
                    variant={phase === 'single' ? 'default' : 'outline'}
                    className={`cursor-pointer flex-1 justify-center ${phase === 'single' ? 'bg-elec-yellow text-black' : ''}`}
                    onClick={() => setPhase('single')}
                  >
                    Single
                  </Badge>
                  <Badge
                    variant={phase === 'three' ? 'default' : 'outline'}
                    className={`cursor-pointer flex-1 justify-center ${phase === 'three' ? 'bg-elec-yellow text-black' : ''}`}
                    onClick={() => setPhase('three')}
                  >
                    Three
                  </Badge>
                </div>
              </div>
            </div>

            <MobileOptimizedInput
              id="percentImpedance"
              label="Percentage Impedance"
              type="number"
              inputMode="decimal"
              value={percentImpedance}
              onChange={(value) => setPercentImpedance(value)}
              placeholder="6"
              unit="%"
              description="Transformer impedance at rated voltage"
            />

            {/* Advanced Settings Toggle */}
            <MobileButton
              variant="elec-outline"
              onClick={() => setAdvancedMode(!advancedMode)}
              className="w-full"
              icon={<Settings className="h-4 w-4" />}
            >
              {advancedMode ? 'Hide' : 'Show'} Advanced
            </MobileButton>

            {advancedMode && (
              <div className="space-y-3 border border-elec-yellow/10 rounded-lg p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MobileOptimizedInput
                    id="frequency"
                    label="Frequency"
                    type="number"
                    inputMode="numeric"
                    value={frequency}
                    onChange={(value) => setFrequency(value)}
                    placeholder="50"
                    unit="Hz"
                    description="Supply frequency"
                  />
                  
                  <MobileOptimizedInput
                    id="ambientTemp"
                    label="Ambient Temperature"
                    type="number"
                    inputMode="numeric"
                    value={ambientTemp}
                    onChange={(value) => setAmbientTemp(value)}
                    placeholder="40"
                    unit="°C"
                    description="Installation ambient temperature"
                  />
                </div>

                <MobileOptimizedInput
                  id="connectionType"
                  label="Connection Type"
                  value={connectionType}
                  onChange={(value) => setConnectionType(value)}
                  placeholder="Dyn11"
                  description="Vector group notation"
                />

                <MobileOptimizedInput
                  id="sourceFaultLevel"
                  label="Source Fault Level"
                  type="number"
                  inputMode="numeric"
                  value={sourceFaultLevel}
                  onChange={(value) => setSourceFaultLevel(value)}
                  placeholder="100"
                  unit="MVA"
                  description="Upstream fault level (optional)"
                />

                <div className="flex items-center gap-2">
                  <Switch
                    id="harmonics"
                    checked={harmonics}
                    onCheckedChange={setHarmonics}
                  />
                  <Label htmlFor="harmonics" className="text-sm">
                    Harmonic loads present (K-factor rated)
                  </Label>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <MobileButton 
                onClick={handleCalculate} 
                className="flex-1" 
                variant="elec" 
                icon={<Calculator className="h-4 w-4" />}
                disabled={!primaryVoltage || !secondaryVoltage || !kvaRating}
              >
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            {result ? (
              <>
                {/* Compliance Status */}
                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-elec-yellow">Transformer Analysis</h3>
                      {(() => {
                        const compliance = getComplianceStatus(result);
                        return (
                          <Badge 
                            variant={compliance.status === "compliant" ? "default" : "destructive"}
                            className={compliance.status === "compliant" ? "bg-green-600" : 
                                     compliance.status === "caution" ? "bg-amber-600" : "bg-red-600"}
                          >
                            {compliance.status === "compliant" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {compliance.status === "caution" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {compliance.status === "review" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {compliance.status.toUpperCase()}
                          </Badge>
                        );
                      })()}
                    </div>

                    <div className="text-center mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {result.transformerType.toUpperCase()} • {result.voltageRatio.toFixed(2)}:1 Ratio
                      </Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-left">
                        <span className="text-muted-foreground block">Primary Current:</span>
                        <div className="font-mono text-elec-yellow text-base">{result.primaryRatedCurrent.toFixed(1)} A</div>
                      </div>
                      <div className="text-left">
                        <span className="text-muted-foreground block">Secondary Current:</span>
                        <div className="font-mono text-elec-yellow text-base">{result.secondaryRatedCurrent.toFixed(1)} A</div>
                      </div>
                      <div className="text-left">
                        <span className="text-muted-foreground block">Real Power:</span>
                        <div className="font-mono text-elec-yellow text-base">{result.kw.toFixed(1)} kW</div>
                      </div>
                      <div className="text-left">
                        <span className="text-muted-foreground block">Efficiency:</span>
                        <div className="font-mono text-elec-yellow text-base">{(result.efficiency * 100).toFixed(1)}%</div>
                      </div>
                      <div className="text-left">
                        <span className="text-muted-foreground block">Fault Current:</span>
                        <div className="font-mono text-elec-yellow text-base">{(result.transformerFaultCurrent / 1000).toFixed(1)} kA</div>
                      </div>
                      <div className="text-left">
                        <span className="text-muted-foreground block">Voltage Regulation:</span>
                        <div className="font-mono text-elec-yellow text-base">{(result.voltageRegulation * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protection Recommendations */}
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-elec-yellow" />
                      <CardTitle className="text-base">Protection Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="text-left">
                        <span className="text-sm text-muted-foreground block">Recommended MCCB Rating:</span>
                        <div className="font-medium text-elec-yellow">{getRecommendedMCCB(result.secondaryRatedCurrent)}A</div>
                      </div>
                      <div className="text-left">
                        <span className="text-sm text-muted-foreground block">Minimum Breaking Capacity:</span>
                        <div className="font-medium text-elec-yellow">{getSwitchgearBreakingCapacity(result.transformerFaultCurrent)}</div>
                      </div>
                      <div className="text-left">
                        <span className="text-sm text-muted-foreground block">Inrush Current:</span>
                        <div className="font-medium text-elec-yellow">{(result.inrushCurrent / 1000).toFixed(1)} kA for {result.inrushDuration}s</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What This Means */}
                <WhyThisMatters
                  title="What this means"
                  points={[
                    `${result.transformerType} configuration ${result.voltageRatio > 1 ? 'reduces' : result.voltageRatio < 1 ? 'increases' : 'maintains'} voltage level`,
                    `${(result.efficiency * 100).toFixed(1)}% efficiency means ${((1 - result.efficiency) * 100).toFixed(1)}% energy lost as heat`,
                    `${(result.transformerFaultCurrent / 1000).toFixed(1)} kA fault current requires appropriate breaking capacity`,
                    `${(result.voltageRegulation * 100).toFixed(1)}% regulation indicates voltage drop under full load`
                  ]}
                />

                {/* Practical Guidance */}
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-elec-yellow" />
                      <CardTitle className="text-base">Practical Guidance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-left">
                      <p>• Install {getRecommendedMCCB(result.secondaryRatedCurrent)}A MCCB for secondary protection</p>
                      <p>• Ensure switchgear has {getSwitchgearBreakingCapacity(result.transformerFaultCurrent)} breaking capacity</p>
                      <p>• Consider soft-start if inrush current ({(result.inrushCurrent / 1000).toFixed(1)} kA) causes supply issues</p>
                      {result.voltageRegulation > 0.05 && <p>• High voltage regulation - consider tap changer or voltage stabiliser</p>}
                      {result.efficiency < 0.95 && <p>• Low efficiency transformer - consider upgrading for energy savings</p>}
                      {result.temperatureDerating && <p>• Apply {((1 - result.temperatureDerating) * 100).toFixed(0)}% derating for high ambient temperature</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* BS 7671 Recommendations */}
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-elec-yellow" />
                      <CardTitle className="text-base">BS 7671 18th Edition</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-left">
                      {result.recommendations.map((rec, idx) => (
                        <p key={idx}>• {rec}</p>
                      ))}
                      <p>• Transformer earthing must comply with BS 7671 411.3</p>
                      <p>• Install appropriate fault protection with correct discrimination</p>
                      <p>• Consider cable de-rating factors for thermal effects</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <Alert className="border-amber-500/20 bg-amber-500/10">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <AlertDescription className="text-amber-200">
                      <div className="space-y-1">
                        {result.warnings.map((warning, idx) => (
                          <div key={idx}>• {warning}</div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="rounded-md bg-elec-dark p-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-elec-yellow/50" />
                  <p>Enter transformer parameters to analyse performance and compliance</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformerCalculator;