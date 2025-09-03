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
              value={formatNumber(result.analysis.effectiveAmpacity)}
              unit="A"
              subtitle={`${installationType} installation`}
              status={result.analysis.adequateCapacity ? 'success' : 'error'}
            />
          </div>

          {/* Installation Performance */}
          {parseFloat(length) > 0 && parseFloat(loadCurrent) > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ResultCard
                title="Voltage Drop"
                value={formatNumber(result.analysis.voltageDropPercentage, 1)}
                unit="%"
                subtitle={`${formatNumber(result.analysis.voltageDrop, 1)}V drop`}
                status={result.analysis.voltageDropPercentage > 5 ? 'error' : result.analysis.voltageDropPercentage > 3 ? 'warning' : 'success'}
              />
              <ResultCard
                title="Power Loss"
                value={formatNumber(result.analysis.powerLoss)}
                unit="W"
                subtitle="Cable losses"
              />
              <ResultCard
                title="Efficiency"
                value={formatNumber(result.analysis.efficiency, 1)}
                unit="%"
                subtitle="System efficiency"
                status={result.analysis.efficiency > 97 ? 'success' : result.analysis.efficiency > 95 ? 'warning' : 'error'}
              />
              <ResultCard
                title="Temperature"
                value={formatNumber(result.analysis.temperatureDerating * 100)}
                unit="%"
                subtitle="Derating factor"
              />
            </div>
          )}

          {/* What This Means */}
          {(parseFloat(length) > 0 || parseFloat(loadCurrent) > 0) && (
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-100">
                <div className="font-medium mb-2">What this means:</div>
                <div className="space-y-1 text-sm">
                  {parseFloat(loadCurrent) > 0 && (
                    <div>• Cable can safely carry <span className="font-medium">{formatNumber(result.analysis.effectiveAmpacity)}A</span> continuous load in {installationType} installation</div>
                  )}
                  {result.analysis.voltageDropPercentage > 0 && (
                    <div>• Voltage drop of <span className="font-medium">{formatNumber(result.analysis.voltageDropPercentage, 1)}%</span> {result.analysis.voltageDropPercentage <= 5 ? 'meets' : 'exceeds'} BS 7671 requirements</div>
                  )}
                  {result.analysis.powerLoss > 0 && (
                    <div>• Power losses of <span className="font-medium">{formatNumber(result.analysis.powerLoss)}W</span> reduce system efficiency</div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Alert className="border-amber-500/20 bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-100">
                <div className="font-medium mb-2">Attention Required:</div>
                <ul className="space-y-1 text-sm">
                  {result.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Alert className="border-green-500/20 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-100">
                <div className="font-medium mb-2">Recommendations:</div>
                <ul className="space-y-1 text-sm">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Why This Matters */}
          <WhyThisMatters
            points={[
              "Undersized cables cause voltage drop, reducing equipment performance and wasting energy",
              "Oversized cables increase installation costs unnecessarily",
              "Proper cable sizing ensures safety and regulatory compliance",
              "Temperature and grouping factors prevent overheating in real installations",
              "BS 7671 limits voltage drop to 5% for lighting and 5% for other uses"
            ]}
          />

          {/* BS 7671 Compliance */}
          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-green-100 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                BS 7671 18th Edition Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-100">
              {result.compliance.bs7671.map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
              <Separator className="my-2 bg-green-500/20" />
              <div className="text-xs text-green-200">
                Key considerations: Regulation 411 (protective measures), Section 433 (overload protection), 
                Section 523 (current-carrying capacity), Appendix 4 (voltage drop)
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="border-purple-500/20 bg-purple-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-purple-100">Practical Installation Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-purple-100">
              <div>• Always verify actual installation conditions match your calculations</div>
              <div>• Consider future load increases when selecting cable size</div>
              <div>• Use appropriate protective devices rated for cable ampacity</div>
              <div>• Ensure adequate mechanical protection for installation method</div>
              <div>• Check cable termination ratings match conductor ampacity</div>
              {parseFloat(ambientTemp) > 40 && (
                <div>• High ambient temperature requires careful derating - consider ventilation</div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WireGaugeCalculator;