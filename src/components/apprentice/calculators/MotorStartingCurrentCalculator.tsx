
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
  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
    startingKva: number;
    thermalStress: number;
    protectionRecommendation: string;
    voltageDropEstimate: number;
    efficiencyAtStart: number;
    breakerSuitability: string;
    complianceStatus: string;
    recommendedCableSize: string;
    cableAnalysis: string;
    whatThisMeans: string[];
    practicalGuidance: string[];
    recommendations: string[];
    warnings: string[];
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

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      // Calculate full load current based on phases
      const isThreePhase = phases === "3";
      let fullLoadCurrent: number;
      
      if (ratedCurrent && parseFloat(ratedCurrent) > 0) {
        fullLoadCurrent = parseFloat(ratedCurrent);
      } else {
        fullLoadCurrent = isThreePhase 
          ? (P * 1000) / (Math.sqrt(3) * V * eff * pf)
          : (P * 1000) / (V * eff * pf);
      }
      
      // Enhanced starting current multipliers
      const baseMultipliers = {
        direct: 6.5,
        'star-delta': 2.1,
        'soft-starter': 3.2,
        'vfd': 1.5,
        'autotransformer': 4.0
      };

      // Load type factors
      const loadFactors = {
        standard: 1.0,
        'high-torque': 1.2,
        'low-torque': 0.9,
        centrifugal: 0.85
      };

      // Temperature correction
      const tempFactor = temp > 40 ? 1 + (temp - 40) * 0.005 : 1;
      
      const baseMultiplier = baseMultipliers[startingMethod as keyof typeof baseMultipliers] || 6.5;
      const loadFactor = loadFactors[loadType as keyof typeof loadFactors] || 1.0;
      const startingMultiplier = baseMultiplier * loadFactor * tempFactor;
      const startingCurrent = fullLoadCurrent * startingMultiplier;

      // Calculate starting kVA
      const startingKva = isThreePhase 
        ? (Math.sqrt(3) * V * startingCurrent) / 1000
        : (V * startingCurrent) / 1000;

      // Enhanced I²t thermal stress calculation
      const thermalStress = Math.pow(startingCurrent, 2) * startTime;

      // Efficiency at starting
      const efficiencyAtStart = eff * 0.3;

      // Enhanced voltage drop calculation
      const rCable = cableLen / (cableCsa * 58); // Copper resistivity
      const totalImpedance = Math.sqrt(Math.pow(rCable + impedance, 2) + Math.pow(0.1, 2));
      const voltageDropEstimate = (startingCurrent * totalImpedance * 100) / V;

      // Cable size recommendation based on voltage drop
      let recommendedCableSize = cableCsa.toString();
      let cableAnalysis = "Current cable size is adequate";
      
      if (voltageDropEstimate > 3) {
        // Calculate required cable size for 3% voltage drop
        const requiredResistance = (3 * V) / (startingCurrent * 100) - impedance;
        const requiredCsa = cableLen / (requiredResistance * 58);
        
        // Round up to next standard cable size
        const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
        const nextSize = standardSizes.find(size => size >= requiredCsa) || 300;
        
        recommendedCableSize = `${nextSize}mm²`;
        cableAnalysis = `Upgrade to ${nextSize}mm² cable to achieve 3% voltage drop (currently ${voltageDropEstimate.toFixed(1)}%)`;
      } else if (voltageDropEstimate < 1.5) {
        // Check if cable can be downsized
        const nextSmallerSize = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95].reverse().find(size => size < cableCsa);
        if (nextSmallerSize) {
          const smallerR = cableLen / (nextSmallerSize * 58);
          const smallerVD = (startingCurrent * Math.sqrt(Math.pow(smallerR + impedance, 2) + Math.pow(0.1, 2)) * 100) / V;
          if (smallerVD <= 3) {
            recommendedCableSize = `${nextSmallerSize}mm² (optimised)`;
            cableAnalysis = `Cable can be reduced to ${nextSmallerSize}mm² while maintaining compliance`;
          }
        }
      }

      // Breaker suitability assessment
      let breakerSuitability = "No breaker specified";
      if (breakerRating && parseFloat(breakerRating) > 0) {
        const bRating = parseFloat(breakerRating);
        if (bRating < fullLoadCurrent * 1.25) {
          breakerSuitability = "Undersized - increase breaker rating";
        } else if (bRating > fullLoadCurrent * 2.5) {
          breakerSuitability = "Oversized - may not provide adequate protection";
        } else {
          breakerSuitability = "Suitable for motor protection";
        }
      }

      // Compliance status
      let complianceStatus = "Compliant";
      if (voltageDropEstimate > 3) complianceStatus = "Non-compliant - voltage drop exceeds 3%";
      if (startingMethod === "direct" && P > 15) complianceStatus = "Consider soft starting for >15kW";

      // What this means explanations
      const whatThisMeans: string[] = [
        `Full load current of ${fullLoadCurrent.toFixed(1)}A is the normal running current`,
        `Starting current of ${startingCurrent.toFixed(0)}A is ${startingMultiplier.toFixed(1)} times higher than running current`,
        `Motor will draw ${startingKva.toFixed(1)}kVA from supply during starting`,
        voltageDropEstimate > 3 ? "Voltage drop may cause lights to dim and equipment issues" : "Voltage drop is within acceptable limits"
      ];

      // Practical guidance
      const practicalGuidance: string[] = [
        "Install motor starter close to distribution board to minimise cable runs",
        "Ensure adequate ventilation around motor and starter equipment",
        startingMethod === "direct" ? "Direct starting creates maximum supply disturbance" : "Reduced starting method minimises supply impact",
        "Regular maintenance of contacts and thermal elements is essential"
      ];

      // Enhanced recommendations
      const recommendations: string[] = [];
      if (voltageDropEstimate > 3) {
        recommendations.push(cableAnalysis);
        recommendations.push("Consider soft starter to reduce starting current and voltage drop");
      }
      if (startingMethod === "direct" && P > 11) {
        recommendations.push("BS 7671 recommends reduced starting for motors >11kW to limit supply disturbance");
      }
      if (temp > 50) {
        recommendations.push("High ambient temperature requires derating - check manufacturer's temperature curves");
      }
      if (thermalStress > 50000) {
        recommendations.push("High I²t stress - verify cable and contactor thermal capability");
      }
      if (voltageDropEstimate < 1.5 && cableAnalysis.includes("optimised")) {
        recommendations.push(cableAnalysis);
      }

      // Warnings
      const warnings: string[] = [];
      if (voltageDropEstimate > 5) {
        warnings.push("Excessive voltage drop - equipment may fail to start properly");
      }
      if (startingCurrent > 200) {
        warnings.push("Very high starting current - check supply transformer capability");
      }
      if (startTime > 10) {
        warnings.push("Extended starting time increases thermal stress on all equipment");
      }

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier,
        startingKva,
        thermalStress,
        protectionRecommendation: `${breakerRating ? parseFloat(breakerRating).toFixed(0) : fullLoadCurrent.toFixed(0)}A MCB with motor protection`,
        voltageDropEstimate,
        efficiencyAtStart,
        breakerSuitability,
        complianceStatus,
        recommendedCableSize,
        cableAnalysis,
        whatThisMeans,
        practicalGuidance,
        recommendations: recommendations.length > 0 ? recommendations : ["Motor starting parameters within acceptable ranges"],
        warnings
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
              {result.complianceStatus === "Compliant" ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
              <span className={`font-medium ${result.complianceStatus === "Compliant" ? "text-green-400" : "text-amber-400"}`}>
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
                <div className={`text-xl sm:text-2xl font-bold ${result.voltageDropEstimate > 3 ? 'text-red-400' : 'text-green-400'}`}>
                  {result.voltageDropEstimate.toFixed(1)}%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Voltage<br className="sm:hidden" /> Drop</div>
              </div>
            </div>

            {/* Additional Parameters - Mobile Optimized */}
            <div className="space-y-3">
              <div className="text-center bg-card/30 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Starting kVA</div>
                <div className="font-mono text-xl font-bold text-elec-yellow">{result.startingKva.toFixed(1)} kVA</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-card/30 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">I²t Thermal Stress</div>
                  <div className="font-mono text-lg text-foreground">{(result.thermalStress / 1000).toFixed(1)}k A²s</div>
                </div>
                
                <div className="bg-card/30 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Protection</div>
                  <div className="text-sm text-foreground leading-tight">{result.protectionRecommendation}</div>
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

            {/* Breaker Suitability */}
            {result.breakerSuitability !== "No breaker specified" && (
              <Alert className={`${result.breakerSuitability.includes('Suitable') ? 'border-green-500/20 bg-green-500/10' : 'border-amber-500/20 bg-amber-500/10'}`}>
                <Info className={`h-4 w-4 ${result.breakerSuitability.includes('Suitable') ? 'text-green-400' : 'text-amber-400'}`} />
                <AlertDescription className={result.breakerSuitability.includes('Suitable') ? 'text-green-200' : 'text-amber-200'}>
                  <strong>Breaker Assessment:</strong> {result.breakerSuitability}
                </AlertDescription>
              </Alert>
            )}

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
