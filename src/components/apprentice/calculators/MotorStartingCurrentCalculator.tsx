
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Info, Calculator, RotateCcw, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MobileOptimizedInput from "@/components/install-planner/MobileOptimizedInput";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { calculateMotorStarting, MotorStartingInputs } from "@/lib/calculators/engines/motorStartingEngine";

const MotorStartingCurrentCalculator = () => {
  const [power, setPower] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("400");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [startingMethod, setStartingMethod] = useState<string>("direct");
  const [phases, setPhases] = useState<string>("3");
  const [loadType, setLoadType] = useState<string>("standard");
  const [serviceTemperature, setServiceTemperature] = useState<string>("40");
  const [ratedCurrent, setRatedCurrent] = useState<string>("");
  const [startingTime, setStartingTime] = useState<string>("2");
  const [cableLength, setCableLength] = useState<string>("50");
  const [cableSize, setCableSize] = useState<string>("2.5");
  const [breakerRating, setBreakerRating] = useState<string>("");
  const [supplyImpedance, setSupplyImpedance] = useState<string>("0.1");
  const [installationMethod, setInstallationMethod] = useState<string>("clipped");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");
  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
    startingKva: number;
    thermalStress: number;
    protectionRecommendation: string;
    voltageDropRunning: number;
    voltageDropStarting: number;
    complianceStatus: string;
    recommendedCableSize: string;
    minimumCableSize: number;
    cableAnalysis: string;
    currentCapacityCheck: string;
    protectionAnalysis: string;
    whatThisMeans: string[];
    practicalGuidance: string[];
    recommendations: string[];
    warnings: string[];
    bs7671Compliant: boolean;
  } | null>(null);

  const calculateStartingCurrent = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);
    const temp = parseFloat(serviceTemperature);
    const cableLen = parseFloat(cableLength);
    const cableCsa = parseFloat(cableSize);
    const startTime = parseFloat(startingTime);
    const impedance = parseFloat(supplyImpedance);
    const grouping = parseFloat(groupingFactor);

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      // Prepare inputs for enhanced calculation engine
      const inputs: MotorStartingInputs = {
        powerKw: P,
        voltage: V,
        phases: phases === "3" ? 3 : 1,
        efficiency: eff,
        powerFactor: pf,
        startingMethod: startingMethod as any,
        loadType: loadType as any,
        ambientTemp: temp,
        cableLength: cableLen,
        installationMethod: installationMethod as any,
        groupingFactor: grouping,
        ratedCurrent: ratedCurrent ? parseFloat(ratedCurrent) : undefined,
        startingTime: startTime,
        supplyImpedance: impedance
      };

      // Use the enhanced calculation engine
      const engineResult = calculateMotorStarting(inputs);

      // Map to UI state format
      const fullLoadCurrent = engineResult.fullLoadCurrent;
      const startingCurrent = engineResult.startingCurrent;
      const startingMultiplier = engineResult.startingMultiplier;
      const startingKva = engineResult.startingKva;
      const thermalStress = engineResult.thermalStress;

      // Enhanced cable analysis
      const recommendedCableSize = `${engineResult.recommendedCableSize}mm²`;
      const minimumCableSize = engineResult.minimumCableSize;
      
      let cableAnalysis = "Cable sizing meets BS 7671 requirements";
      if (engineResult.recommendedCableSize > engineResult.minimumCableSize) {
        cableAnalysis = `Upgrade from ${minimumCableSize}mm² to ${engineResult.recommendedCableSize}mm² required for voltage drop compliance`;
      } else if (engineResult.voltageDropRunning < 1.5 && engineResult.minimumCableSize > 2.5) {
        cableAnalysis = `Current cable size is adequate with ${engineResult.voltageDropRunning.toFixed(1)}% voltage drop`;
      }

      // Current capacity check
      const currentCapacityCheck = engineResult.currentCarryingCheck.suitable 
        ? `Cable capacity: ${engineResult.currentCarryingCheck.capacity.toFixed(0)}A (Required: ${engineResult.currentCarryingCheck.required.toFixed(0)}A) ✓`
        : `Cable capacity insufficient: ${engineResult.currentCarryingCheck.capacity.toFixed(0)}A < ${engineResult.currentCarryingCheck.required.toFixed(0)}A`;

      // Protection analysis with standard ratings
      const protectionAnalysis = engineResult.protectionSuitable 
        ? `${engineResult.recommendedMcbRating}A ${engineResult.protectionType.toUpperCase()} suitable for motor protection`
        : `${engineResult.recommendedMcbRating}A protection may be unsuitable - verify coordination`;

      // Compliance status
      let complianceStatus = "BS 7671 Compliant";
      if (!engineResult.bs7671Compliant) {
        if (!engineResult.voltageDropCompliant) {
          complianceStatus = "Non-compliant - voltage drop exceeds limits";
        } else if (!engineResult.currentCarryingCheck.suitable) {
          complianceStatus = "Non-compliant - cable undersized";
        } else {
          complianceStatus = "Review required for full compliance";
        }
      }
      
      if (startingMethod === "direct" && P > 11) {
        complianceStatus = "Consider reduced starting method (BS 7671 recommendation)";
      }

      // Enhanced explanations
      const whatThisMeans: string[] = [
        `Full load current: ${fullLoadCurrent.toFixed(1)}A (normal running current per BS 7671)`,
        `Starting current: ${startingCurrent.toFixed(0)}A (${startingMultiplier.toFixed(1)}x full load current)`,
        `Supply demand: ${startingKva.toFixed(1)}kVA during motor starting`,
        `Running voltage drop: ${engineResult.voltageDropRunning.toFixed(1)}% (limit: 3%)`,
        `Starting voltage drop: ${engineResult.voltageDropStarting.toFixed(1)}% (limit: 10%)`
      ];

      // Practical guidance
      const practicalGuidance: string[] = [
        "Install motor starter close to distribution board to minimise cable runs",
        "Use thermally protected motor starter for overload protection",
        startingMethod === "direct" ? "Direct starting suitable for motors <11kW only" : "Reduced starting method reduces supply impact",
        "Regular testing of motor protection devices is required",
        `Use ${engineResult.protectionType.includes('c') ? 'Type C' : 'Type D'} MCB for motor loads`
      ];

      // Combine all recommendations
      const allRecommendations = [
        ...engineResult.recommendations,
        ...engineResult.notes
      ];

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier,
        startingKva,
        thermalStress,
        protectionRecommendation: protectionAnalysis,
        voltageDropRunning: engineResult.voltageDropRunning,
        voltageDropStarting: engineResult.voltageDropStarting,
        complianceStatus,
        recommendedCableSize,
        minimumCableSize,
        cableAnalysis,
        currentCapacityCheck,
        protectionAnalysis,
        whatThisMeans,
        practicalGuidance,
        recommendations: allRecommendations.length > 0 ? allRecommendations : ["Motor installation meets BS 7671 requirements"],
        warnings: engineResult.warnings,
        bs7671Compliant: engineResult.bs7671Compliant
      });
    }
  };

  const reset = () => {
    setPower("");
    setVoltage("400");
    setEfficiency("0.85");
    setPowerFactor("0.85");
    setStartingMethod("direct");
    setPhases("3");
    setLoadType("standard");
    setServiceTemperature("40");
    setRatedCurrent("");
    setStartingTime("2");
    setCableLength("50");
    setCableSize("2.5");
    setBreakerRating("");
    setSupplyImpedance("0.1");
    setInstallationMethod("clipped");
    setGroupingFactor("1.0");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Motor Starting Current Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate starting current for three-phase motors based on power, efficiency, and starting method.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Motor Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileOptimizedInput
              id="power"
              label="Motor Power"
              type="number"
              inputMode="decimal"
              value={power}
              onChange={setPower}
              placeholder="15"
              unit="kW"
              description="Rated motor power from nameplate"
              required
            />

            <MobileOptimizedInput
              id="ratedCurrent"
              label="Rated Current (Optional)"
              type="number"
              inputMode="decimal"
              value={ratedCurrent}
              onChange={setRatedCurrent}
              placeholder="28.3"
              unit="A"
              description="Nameplate current if known - more accurate than calculated"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-medium block mb-2">Supply Voltage</label>
              <Select value={voltage} onValueChange={setVoltage}>
                <SelectTrigger className="bg-card border-elec-yellow/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-elec-yellow/20">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (3-Phase)</SelectItem>
                  <SelectItem value="415">415V (3-Phase)</SelectItem>
                  <SelectItem value="690">690V (3-Phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-base font-medium block mb-2">Phases</label>
              <Select value={phases} onValueChange={setPhases}>
                <SelectTrigger className="bg-card border-elec-yellow/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-elec-yellow/20">
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileOptimizedInput
              id="efficiency"
              label="Motor Efficiency"
              type="number"
              inputMode="decimal"
              value={efficiency}
              onChange={setEfficiency}
              placeholder="0.85"
              description="Typical: IE3 = 0.85, IE4 = 0.90"
            />

            <MobileOptimizedInput
              id="powerFactor"
              label="Power Factor"
              type="number"
              inputMode="decimal"
              value={powerFactor}
              onChange={setPowerFactor}
              placeholder="0.85"
              description="Typical range: 0.8-0.9"
            />
          </div>

          <Separator />
          
          <h3 className="text-lg font-semibold text-foreground">Starting & Protection</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-medium block mb-2">Starting Method</label>
              <Select value={startingMethod} onValueChange={setStartingMethod}>
                <SelectTrigger className="bg-card border-elec-yellow/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-elec-yellow/20">
                  <SelectItem value="direct">Direct On Line (DOL)</SelectItem>
                  <SelectItem value="star-delta">Star-Delta</SelectItem>
                  <SelectItem value="soft-starter">Soft Starter</SelectItem>
                  <SelectItem value="vfd">Variable Frequency Drive</SelectItem>
                  <SelectItem value="autotransformer">Auto-transformer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-base font-medium block mb-2">Load Type</label>
              <Select value={loadType} onValueChange={setLoadType}>
                <SelectTrigger className="bg-card border-elec-yellow/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-elec-yellow/20">
                  <SelectItem value="standard">Standard Load</SelectItem>
                  <SelectItem value="high-torque">High Torque (Conveyors)</SelectItem>
                  <SelectItem value="low-torque">Low Torque (Fans)</SelectItem>
                  <SelectItem value="centrifugal">Centrifugal Pumps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileOptimizedInput
              id="startingTime"
              label="Starting Time"
              type="number"
              inputMode="decimal"
              value={startingTime}
              onChange={setStartingTime}
              placeholder="2"
              unit="sec"
              description="Time to reach full speed"
            />

            <MobileOptimizedInput
              id="breakerRating"
              label="MCB Rating (Optional)"
              type="number"
              inputMode="decimal"
              value={breakerRating}
              onChange={setBreakerRating}
              placeholder="32"
              unit="A"
              description="Proposed breaker rating"
            />
          </div>

          <Separator />
          
          <h3 className="text-lg font-semibold text-foreground">Installation Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileOptimizedInput
              id="cableLength"
              label="Cable Length"
              type="number"
              inputMode="decimal"
              value={cableLength}
              onChange={setCableLength}
              placeholder="50"
              unit="m"
              description="Distance from distribution board"
            />

            <MobileOptimizedInput
              id="cableSize"
              label="Cable Size"
              type="number"
              inputMode="decimal"
              value={cableSize}
              onChange={setCableSize}
              placeholder="2.5"
              unit="mm²"
              description="Proposed cable cross-sectional area"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileOptimizedInput
              id="serviceTemperature"
              label="Ambient Temperature"
              type="number"
              inputMode="decimal"
              value={serviceTemperature}
              onChange={setServiceTemperature}
              placeholder="40"
              unit="°C"
              description="Operating environment temperature"
            />

            <MobileOptimizedInput
              id="supplyImpedance"
              label="Supply Impedance"
              type="number"
              inputMode="decimal"
              value={supplyImpedance}
              onChange={setSupplyImpedance}
              placeholder="0.1"
              unit="Ω"
              description="Transformer/supply impedance"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-medium block mb-2">Installation Method</label>
              <Select value={installationMethod} onValueChange={setInstallationMethod}>
                <SelectTrigger className="bg-card border-elec-yellow/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-elec-yellow/20">
                  <SelectItem value="clipped">Clipped Direct</SelectItem>
                  <SelectItem value="conduit">In Conduit</SelectItem>
                  <SelectItem value="trunking">In Trunking</SelectItem>
                  <SelectItem value="underground">Underground</SelectItem>
                  <SelectItem value="tray">Cable Tray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MobileOptimizedInput
              id="groupingFactor"
              label="Grouping Factor"
              type="number"
              inputMode="decimal"
              value={groupingFactor}
              onChange={setGroupingFactor}
              placeholder="1.0"
              description="Derating for grouped cables"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={calculateStartingCurrent} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Starting Current
            </Button>
            <Button variant="outline" onClick={reset} className="h-12 px-4">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <Separator />
            
            {/* Compliance Status */}
            <div className="flex items-center gap-2">
              {result.bs7671Compliant ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
              <span className={`font-medium ${result.bs7671Compliant ? "text-green-400" : "text-amber-400"}`}>
                {result.complianceStatus}
              </span>
            </div>

            {/* Key Results - Mobile Optimized */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="bg-card/50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.fullLoadCurrent.toFixed(1)}</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Full Load<br className="sm:hidden" /> Current (A)</div>
              </div>
              
              <div className="bg-card/50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.startingCurrent.toFixed(0)}</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Starting<br className="sm:hidden" /> Current (A)</div>
              </div>
              
              <div className="bg-card/50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.startingMultiplier.toFixed(1)}x</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Start<br className="sm:hidden" /> Multiplier</div>
              </div>
              
              <div className="bg-card/50 p-3 sm:p-4 rounded-lg text-center">
                <div className={`text-xl sm:text-2xl font-bold ${result.voltageDropRunning > 3 ? 'text-red-400' : 'text-green-400'}`}>
                  {result.voltageDropRunning.toFixed(1)}%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Running VD</div>
              </div>
            </div>

            {/* Additional Parameters - Mobile Optimized */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center bg-card/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Starting kVA</div>
                  <div className="font-mono text-xl font-bold text-elec-yellow">{result.startingKva.toFixed(1)} kVA</div>
                </div>
                
                <div className="text-center bg-card/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Starting VD</div>
                  <div className={`font-mono text-xl font-bold ${result.voltageDropStarting > 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {result.voltageDropStarting.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-card/30 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">I²t Thermal Stress</div>
                  <div className="font-mono text-lg text-foreground">{(result.thermalStress / 1000).toFixed(1)}k A²s</div>
                </div>
                
                <div className="bg-card/30 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Minimum Cable</div>
                  <div className="text-lg font-bold text-foreground">{result.minimumCableSize}mm²</div>
                </div>
              </div>
            </div>

            {/* Cable Recommendation */}
            <div className="bg-elec-card border border-elec-yellow/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-elec-yellow">Cable Size Recommendation</h3>
              </div>
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-elec-yellow">{result.recommendedCableSize}</div>
                <div className="text-sm text-muted-foreground">Recommended Cable Size</div>
              </div>
              <div className="text-sm text-muted-foreground text-center leading-relaxed">
                {result.cableAnalysis}
              </div>
            </div>

            {/* Current Capacity Check */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                <strong>Current Carrying Capacity:</strong> {result.currentCapacityCheck}
              </AlertDescription>
            </Alert>

            {/* Protection Analysis */}
            <Alert className="border-purple-500/20 bg-purple-500/10">
              <Info className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-200">
                <strong>Protection Device:</strong> {result.protectionAnalysis}
              </AlertDescription>
            </Alert>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  <strong>Warnings:</strong>
                  <ul className="mt-2 space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* What This Means */}
            <WhyThisMatters
              title="What this means"
              points={result.whatThisMeans}
            />

            {/* Practical Guidance */}
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                <h3 className="font-semibold text-base sm:text-lg">Practical Guidance</h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-muted-foreground">
                {result.practicalGuidance.map((guidance, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-elec-yellow mt-1.5 w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></span>
                    <span className="leading-relaxed">{guidance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-card/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-elec-yellow text-base sm:text-lg">BS 7671 Recommendations</h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-muted-foreground">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-elec-yellow mt-1.5 w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculation Notes */}
            <div className="text-xs text-muted-foreground border-t border-border pt-4 space-y-1">
              <div><strong>Calculation:</strong> I = P / ({phases === "3" ? "√3 × " : ""}V × η × cos φ)</div>
              <div><strong>Voltage Drop:</strong> VD = I × Z × 100 / V (includes cable resistance and supply impedance)</div>
              <div><strong>I²t:</strong> Thermal stress = I² × t (starting current squared × starting time)</div>
            </div>
          </div>
        )}

        {!result && (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-elec-yellow/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Enter motor details above to calculate starting current and get comprehensive analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MotorStartingCurrentCalculator;
