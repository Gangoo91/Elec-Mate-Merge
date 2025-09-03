import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Info, Calculator, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { formatNumber } from "@/lib/format";

interface WireData {
  metric: string;
  diameter: number;
  area: number;
  resistance: number; // mΩ/m at 20°C
  ampacity: {
    free: number; // Free air
    conduit: number; // In conduit
    buried: number; // Direct buried
  };
}

interface CalculationResult {
  wire: WireData & { awg: string };
  analysis: {
    voltageDropPercentage: number;
    voltageDrop: number;
    powerLoss: number;
    efficiency: number;
    temperatureDerating: number;
    groupingFactor: number;
    effectiveAmpacity: number;
    adequateCapacity: boolean;
    suitableForLength: boolean;
  };
  recommendations: string[];
  warnings: string[];
  compliance: {
    bs7671: string[];
    general: string[];
  };
}

const WireGaugeCalculator = () => {
  // Basic inputs
  const [awgSize, setAwgSize] = useState<string>("");
  const [metricSize, setMetricSize] = useState<string>("");
  
  // Enhanced inputs
  const [material, setMaterial] = useState<string>("copper");
  const [length, setLength] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [systemVoltage, setSystemVoltage] = useState<string>("230");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [cableGrouping, setCableGrouping] = useState<string>("1");
  const [installationType, setInstallationType] = useState<string>("conduit");
  const [applicationType, setApplicationType] = useState<string>("general");
  
  const [inputMode, setInputMode] = useState<string>("awg");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Wire gauge conversion tables with enhanced ampacity data
  const awgToMetric: Record<string, WireData> = {
    "30": { metric: "0.05", diameter: 0.254, area: 0.0507, resistance: 338.6, ampacity: { free: 0.52, conduit: 0.3, buried: 0.4 } },
    "28": { metric: "0.08", diameter: 0.321, area: 0.0804, resistance: 212.9, ampacity: { free: 0.83, conduit: 0.5, buried: 0.65 } },
    "26": { metric: "0.13", diameter: 0.404, area: 0.128, resistance: 133.9, ampacity: { free: 1.3, conduit: 0.8, buried: 1.0 } },
    "24": { metric: "0.2", diameter: 0.511, area: 0.205, resistance: 84.2, ampacity: { free: 2.1, conduit: 1.3, buried: 1.6 } },
    "22": { metric: "0.33", diameter: 0.644, area: 0.326, resistance: 52.9, ampacity: { free: 3.3, conduit: 2.0, buried: 2.5 } },
    "20": { metric: "0.5", diameter: 0.812, area: 0.518, resistance: 33.3, ampacity: { free: 5.2, conduit: 3.2, buried: 4.0 } },
    "18": { metric: "0.75", diameter: 1.024, area: 0.823, resistance: 20.9, ampacity: { free: 8.3, conduit: 5.1, buried: 6.4 } },
    "16": { metric: "1.3", diameter: 1.291, area: 1.31, resistance: 13.2, ampacity: { free: 13, conduit: 8, buried: 10 } },
    "14": { metric: "2.0", diameter: 1.628, area: 2.08, resistance: 8.29, ampacity: { free: 20, conduit: 15, buried: 18 } },
    "12": { metric: "2.5", diameter: 2.053, area: 3.31, resistance: 5.21, ampacity: { free: 25, conduit: 20, buried: 23 } },
    "10": { metric: "4.0", diameter: 2.588, area: 5.26, resistance: 3.28, ampacity: { free: 35, conduit: 30, buried: 33 } },
    "8": { metric: "6.0", diameter: 3.264, area: 8.37, resistance: 2.06, ampacity: { free: 55, conduit: 45, buried: 50 } },
    "6": { metric: "10", diameter: 4.115, area: 13.3, resistance: 1.30, ampacity: { free: 75, conduit: 65, buried: 70 } },
    "4": { metric: "16", diameter: 5.189, area: 21.2, resistance: 0.815, ampacity: { free: 95, conduit: 85, buried: 90 } },
    "2": { metric: "25", diameter: 6.544, area: 33.6, resistance: 0.513, ampacity: { free: 130, conduit: 115, buried: 125 } },
    "1": { metric: "35", diameter: 7.348, area: 42.4, resistance: 0.407, ampacity: { free: 150, conduit: 135, buried: 145 } },
    "1/0": { metric: "50", diameter: 8.251, area: 53.5, resistance: 0.323, ampacity: { free: 170, conduit: 155, buried: 165 } },
    "2/0": { metric: "70", diameter: 9.266, area: 67.4, resistance: 0.256, ampacity: { free: 195, conduit: 180, buried: 190 } },
    "3/0": { metric: "95", diameter: 10.405, area: 85.0, resistance: 0.203, ampacity: { free: 225, conduit: 210, buried: 220 } },
    "4/0": { metric: "120", diameter: 11.684, area: 107.2, resistance: 0.161, ampacity: { free: 260, conduit: 245, buried: 255 } },
  };

  const calculateTemperatureDerating = (temp: number): number => {
    if (temp <= 30) return 1.0;
    if (temp <= 35) return 0.94;
    if (temp <= 40) return 0.87;
    if (temp <= 45) return 0.79;
    if (temp <= 50) return 0.71;
    return 0.58; // Above 50°C
  };

  const calculateGroupingFactor = (grouping: number): number => {
    if (grouping <= 1) return 1.0;
    if (grouping <= 2) return 0.8;
    if (grouping <= 3) return 0.7;
    if (grouping <= 4) return 0.65;
    if (grouping <= 6) return 0.6;
    return 0.5; // More than 6 cables
  };

  const performCalculation = (): CalculationResult | null => {
    let wireData: WireData & { awg: string } | null = null;

    // Get wire data based on input mode
    if (inputMode === "awg" && awgSize) {
      const data = awgToMetric[awgSize];
      if (data) {
        wireData = { ...data, awg: awgSize };
      }
    } else if (inputMode === "metric" && metricSize) {
      // Find closest AWG equivalent
      const metric = parseFloat(metricSize);
      let closestAwg = "";
      let closestDiff = Infinity;
      
      Object.entries(awgToMetric).forEach(([awg, data]) => {
        const diff = Math.abs(parseFloat(data.metric) - metric);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestAwg = awg;
        }
      });
      
      if (closestAwg) {
        const data = awgToMetric[closestAwg];
        wireData = { ...data, awg: closestAwg };
      }
    }

    if (!wireData) return null;

    // Calculate derating factors
    const tempDerating = calculateTemperatureDerating(parseFloat(ambientTemp) || 30);
    const groupingFactor = calculateGroupingFactor(parseFloat(cableGrouping) || 1);
    
    // Get base ampacity based on installation type
    let baseAmpacity = wireData.ampacity.conduit; // Default
    if (installationType === "free") baseAmpacity = wireData.ampacity.free;
    else if (installationType === "buried") baseAmpacity = wireData.ampacity.buried;
    
    const effectiveAmpacity = baseAmpacity * tempDerating * groupingFactor;
    
    // Calculate voltage drop and power loss if length and current provided
    const cableLength = parseFloat(length) || 0;
    const current = parseFloat(loadCurrent) || 0;
    const voltage = parseFloat(systemVoltage) || 230;
    
    let voltageDropPercentage = 0;
    let voltageDrop = 0;
    let powerLoss = 0;
    let efficiency = 100;
    
    if (cableLength > 0 && current > 0) {
      // Material factor (copper = 1, aluminium = 1.6)
      const materialFactor = material === "aluminium" ? 1.6 : 1;
      const totalResistance = (wireData.resistance * materialFactor * cableLength * 2) / 1000; // Ohms (2-way)
      
      voltageDrop = current * totalResistance;
      voltageDropPercentage = (voltageDrop / voltage) * 100;
      powerLoss = current * current * totalResistance;
      efficiency = ((voltage - voltageDrop) / voltage) * 100;
    }
    
    // Generate recommendations and warnings
    const recommendations: string[] = [];
    const warnings: string[] = [];
    
    if (current > 0) {
      const adequateCapacity = effectiveAmpacity >= current * 1.25; // 25% safety margin
      
      if (!adequateCapacity) {
        warnings.push(`Current capacity insufficient: ${formatNumber(effectiveAmpacity)}A available vs ${current}A required`);
        recommendations.push("Consider larger cable size or review installation conditions");
      }
      
      if (voltageDropPercentage > 5) {
        warnings.push(`High voltage drop: ${formatNumber(voltageDropPercentage)}% exceeds 5% limit`);
        recommendations.push("Reduce cable length or increase cable size");
      } else if (voltageDropPercentage > 3) {
        warnings.push(`Moderate voltage drop: ${formatNumber(voltageDropPercentage)}% - consider optimization`);
      }
    }
    
    if (parseFloat(ambientTemp) > 30) {
      recommendations.push(`Ambient temperature derating applied: ${formatNumber(tempDerating * 100)}%`);
    }
    
    if (parseFloat(cableGrouping) > 1) {
      recommendations.push(`Cable grouping derating applied: ${formatNumber(groupingFactor * 100)}%`);
    }
    
    // Compliance guidance
    const compliance = {
      bs7671: [] as string[],
      general: [] as string[]
    };
    
    if (voltageDropPercentage <= 5) {
      compliance.bs7671.push("Meets BS 7671 voltage drop requirements (≤5%)");
    } else {
      compliance.bs7671.push("Exceeds BS 7671 voltage drop limits");
    }
    
    compliance.general.push("Calculations based on copper conductors at 20°C");
    compliance.general.push("Consider mechanical protection and installation method");
    
    return {
      wire: wireData,
      analysis: {
        voltageDropPercentage,
        voltageDrop,
        powerLoss,
        efficiency,
        temperatureDerating: tempDerating,
        groupingFactor,
        effectiveAmpacity,
        adequateCapacity: current > 0 ? effectiveAmpacity >= current * 1.25 : true,
        suitableForLength: voltageDropPercentage <= 5
      },
      recommendations,
      warnings,
      compliance
    };
  };

  const handleCalculate = () => {
    const calcResult = performCalculation();
    setResult(calcResult);
  };

  const reset = () => {
    setAwgSize("");
    setMetricSize("");
    setLength("");
    setLoadCurrent("");
    setSystemVoltage("230");
    setAmbientTemp("30");
    setCableGrouping("1");
    setInstallationType("conduit");
    setApplicationType("general");
    setInputMode("awg");
    setResult(null);
  };

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
    }
  };

  const getOverallStatus = (): 'success' | 'warning' | 'error' => {
    if (!result) return 'success';
    if (result.warnings.length > 0) return result.analysis.adequateCapacity ? 'warning' : 'error';
    return 'success';
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Wire Gauge Calculator</CardTitle>
          </div>
          <CardDescription>
            Comprehensive wire sizing with voltage drop analysis and BS 7671 compliance guidance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Selection */}
          <div className="space-y-4">
            <MobileSelectWrapper
              label="Input Type"
              value={inputMode}
              onValueChange={setInputMode}
              options={[
                { value: "awg", label: "AWG Size" },
                { value: "metric", label: "Metric Size (mm²)" }
              ]}
            />

            {inputMode === "awg" ? (
              <MobileSelectWrapper
                label="AWG Size"
                value={awgSize}
                onValueChange={setAwgSize}
                placeholder="Select AWG size"
                options={Object.keys(awgToMetric).map(awg => ({
                  value: awg,
                  label: `AWG ${awg}`,
                  description: `${awgToMetric[awg].metric}mm²`
                }))}
              />
            ) : (
              <MobileInputWrapper
                label="Metric Size"
                type="number"
                step="0.1"
                value={metricSize}
                onChange={setMetricSize}
                placeholder="e.g., 2.5"
                unit="mm²"
                hint="Cross-sectional area of conductor"
              />
            )}
          </div>

          <Separator />

          {/* Enhanced Analysis Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-elec-yellow">Installation Analysis (Optional)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileInputWrapper
                label="Cable Length"
                type="number"
                step="0.1"
                value={length}
                onChange={setLength}
                placeholder="e.g., 25"
                unit="m"
                hint="One-way cable run distance"
              />

              <MobileInputWrapper
                label="Load Current"
                type="number"
                step="0.1"
                value={loadCurrent}
                onChange={setLoadCurrent}
                placeholder="e.g., 16"
                unit="A"
                hint="Expected load current"
              />

              <MobileSelectWrapper
                label="System Voltage"
                value={systemVoltage}
                onValueChange={setSystemVoltage}
                options={[
                  { value: "230", label: "230V (Single Phase)" },
                  { value: "400", label: "400V (Three Phase)" },
                  { value: "110", label: "110V (Site/Tools)" },
                  { value: "12", label: "12V (Low Voltage)" },
                  { value: "24", label: "24V (Low Voltage)" }
                ]}
              />

              <MobileSelectWrapper
                label="Installation Method"
                value={installationType}
                onValueChange={setInstallationType}
                options={[
                  { value: "conduit", label: "In Conduit/Trunking", description: "Enclosed installation" },
                  { value: "free", label: "Free Air", description: "Open installation" },
                  { value: "buried", label: "Direct Buried", description: "Underground installation" }
                ]}
              />

              <MobileInputWrapper
                label="Ambient Temperature"
                type="number"
                value={ambientTemp}
                onChange={setAmbientTemp}
                placeholder="30"
                unit="°C"
                hint="Operating temperature"
              />

              <MobileInputWrapper
                label="Cables in Group"
                type="number"
                value={cableGrouping}
                onChange={setCableGrouping}
                placeholder="1"
                hint="Number of cables grouped together"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <MobileButton onClick={handleCalculate} className="flex-1" variant="elec">
              <Calculator className="h-4 w-4 mr-2" />
              Analyse Wire
            </MobileButton>
            <MobileButton variant="outline" onClick={reset} size="icon">
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Wire Properties */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard
              title="Wire Size"
              value={`AWG ${result.wire.awg}`}
              subtitle={`${result.wire.metric}mm²`}
              status={getOverallStatus()}
            />
            <ResultCard
              title="Diameter"
              value={formatNumber(result.wire.diameter, 2)}
              unit="mm"
              subtitle="Wire diameter"
            />
            <ResultCard
              title="Resistance"
              value={formatNumber(result.wire.resistance, 1)}
              unit="mΩ/m"
              subtitle="At 20°C"
            />
            <ResultCard
              title="Current Capacity"
              value={formatNumber(result.analysis.effectiveAmpacity, 0)}
              unit="A"
              subtitle={`${installationType} installation`}
              status={result.analysis.adequateCapacity ? 'success' : 'error'}
            />
          </div>

          {/* Voltage Drop and Power Loss - Mobile Optimized */}
          {parseFloat(length) > 0 && parseFloat(loadCurrent) > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ResultCard
                title="Voltage Drop"
                value={formatNumber(result.analysis.voltageDropPercentage, 1)}
                unit="%"
                subtitle={`${formatNumber(result.analysis.voltageDrop, 1)}V drop`}
                status={result.analysis.voltageDropPercentage > 5 ? 'error' : result.analysis.voltageDropPercentage > 3 ? 'warning' : 'success'}
              />
              <ResultCard
                title="Power Loss"
                value={result.analysis.powerLoss >= 1000 ? formatNumber(result.analysis.powerLoss / 1000, 1) : formatNumber(result.analysis.powerLoss, 0)}
                unit={result.analysis.powerLoss >= 1000 ? "kW" : "W"}
                subtitle="Cable losses"
                status={result.analysis.powerLoss > 100 ? 'warning' : 'success'}
              />
            </div>
          )}

          {/* Installation Performance - Mobile Optimized */}
          {parseFloat(length) > 0 && parseFloat(loadCurrent) > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ResultCard
                title="Efficiency"
                value={formatNumber(result.analysis.efficiency, 1)}
                unit="%"
                subtitle="System efficiency"
                status={result.analysis.efficiency > 97 ? 'success' : result.analysis.efficiency > 95 ? 'warning' : 'error'}
                className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-green-500/40"
              />
              <ResultCard
                title="Temperature"
                value={formatNumber(result.analysis.temperatureDerating * 100)}
                unit="%"
                subtitle="Derating factor"
                status={result.analysis.temperatureDerating < 0.8 ? 'warning' : 'success'}
                className="bg-gradient-to-br from-amber-900/60 to-amber-800/40 border-amber-500/40"
              />
            </div>
          )}

          {/* What This Means - Enhanced Mobile Design */}
          {(parseFloat(length) > 0 || parseFloat(loadCurrent) > 0) && (
            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-500/30">
              <CardHeader className="pb-3 px-4">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-blue-200">
                  <Info className="h-4 w-4 text-blue-400" />
                  What this means:
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <div className="space-y-3">
                  {parseFloat(loadCurrent) > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Cable can safely carry <span className="font-semibold text-blue-200">{formatNumber(result.analysis.effectiveAmpacity)}A</span> continuous load in {installationType} installation
                      </p>
                    </div>
                  )}
                  {result.analysis.voltageDropPercentage > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Voltage drop of <span className="font-semibold text-blue-200">{formatNumber(result.analysis.voltageDropPercentage, 1)}%</span> {result.analysis.voltageDropPercentage <= 5 ? 'meets' : 'exceeds'} BS 7671 requirements
                      </p>
                    </div>
                  )}
                  {result.analysis.powerLoss > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Power losses of <span className="font-semibold text-blue-200">{formatNumber(result.analysis.powerLoss)}W</span> reduce system efficiency
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Warnings and Recommendations - Enhanced Design */}
          {(result.warnings.length > 0 || result.recommendations.length > 0) && (
            <div className="space-y-3">
              {result.warnings.length > 0 && (
                <Alert className="border-red-500/40 bg-gradient-to-br from-red-900/50 to-red-800/30">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="space-y-3">
                    <p className="font-medium text-red-300 text-sm">Safety Warnings:</p>
                    <div className="space-y-2">
                      {result.warnings.map((warning, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-red-200 leading-relaxed">{warning}</p>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {result.recommendations.length > 0 && (
                <Alert className="border-amber-500/40 bg-gradient-to-br from-amber-900/50 to-amber-800/30">
                  <Info className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="space-y-3">
                    <p className="font-medium text-amber-300 text-sm">Recommendations:</p>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-amber-200 leading-relaxed">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Why This Matters - Enhanced Design */}
          <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border-amber-500/30">
            <CardHeader className="pb-3 px-4">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Why this matters
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <div className="space-y-3">
                {[
                  "Undersized cables cause voltage drop, reducing equipment performance and wasting energy",
                  "Oversized cables increase installation costs unnecessarily",
                  "Proper cable sizing ensures safety and regulatory compliance",
                  "Temperature and grouping factors prevent overheating in real installations",
                  "BS 7671 limits voltage drop to 5% for lighting and 5% for other uses"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-amber-100 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* BS 7671 Compliance - Enhanced Design */}
          <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-500/30">
            <CardHeader className="pb-3 px-4">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-green-200">
                {getStatusIcon(getOverallStatus())}
                BS 7671 18th Edition Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 space-y-3">
              {result.compliance.bs7671.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-100 leading-relaxed">{point}</p>
                </div>
              ))}
              
              <div className="pt-3 border-t border-green-500/20">
                <p className="text-xs text-green-300/80 leading-relaxed">
                  Key considerations: Regulation 411 (protective measures), Section 433 (overload protection), 
                  Section 523 (current-carrying capacity), Appendix 4 (voltage drop)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance - Enhanced Design */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/30">
            <CardHeader className="pb-3 px-4">
              <CardTitle className="text-sm sm:text-base text-purple-200">Practical Installation Tips</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <div className="space-y-3">
                {[
                  "Always verify actual installation conditions match your calculations",
                  "Consider future load increases when selecting cable size",
                  "Use appropriate protective devices rated for cable ampacity",
                  "Ensure adequate mechanical protection for installation method",
                  "Check cable termination ratings match conductor ampacity",
                  ...(parseFloat(ambientTemp) > 40 ? ["High ambient temperature requires careful derating - consider ventilation"] : [])
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-purple-100 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WireGaugeCalculator;