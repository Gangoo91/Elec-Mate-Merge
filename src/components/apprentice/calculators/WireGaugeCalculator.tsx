import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Info, Calculator, AlertTriangle, CheckCircle2, BookOpen, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { formatNumber } from "@/lib/format";

interface WireData {
  metric: string;
  diameter: number;
  area: number;
  resistance: number;
  ampacity: {
    free: number;
    conduit: number;
    buried: number;
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
  warnings: string[];
}

const WireGaugeCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  // Basic inputs
  const [awgSize, setAwgSize] = useState<string>("");
  const [metricSize, setMetricSize] = useState<string>("");
  const [inputMode, setInputMode] = useState<string>("awg");

  // Enhanced inputs
  const [material, setMaterial] = useState<string>("copper");
  const [length, setLength] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [systemVoltage, setSystemVoltage] = useState<string>("230");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [cableGrouping, setCableGrouping] = useState<string>("1");
  const [installationType, setInstallationType] = useState<string>("conduit");

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const [result, setResult] = useState<CalculationResult | null>(null);

  // Wire gauge conversion tables
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
    return 0.58;
  };

  const calculateGroupingFactor = (grouping: number): number => {
    if (grouping <= 1) return 1.0;
    if (grouping <= 2) return 0.8;
    if (grouping <= 3) return 0.7;
    if (grouping <= 4) return 0.65;
    if (grouping <= 6) return 0.6;
    return 0.5;
  };

  const performCalculation = (): CalculationResult | null => {
    let wireData: WireData & { awg: string } | null = null;

    if (inputMode === "awg" && awgSize) {
      const data = awgToMetric[awgSize];
      if (data) wireData = { ...data, awg: awgSize };
    } else if (inputMode === "metric" && metricSize) {
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

    const tempDerating = calculateTemperatureDerating(parseFloat(ambientTemp) || 30);
    const groupingFactor = calculateGroupingFactor(parseFloat(cableGrouping) || 1);

    let baseAmpacity = wireData.ampacity.conduit;
    if (installationType === "free") baseAmpacity = wireData.ampacity.free;
    else if (installationType === "buried") baseAmpacity = wireData.ampacity.buried;

    const effectiveAmpacity = baseAmpacity * tempDerating * groupingFactor;

    const cableLength = parseFloat(length) || 0;
    const current = parseFloat(loadCurrent) || 0;
    const voltage = parseFloat(systemVoltage) || 230;

    let voltageDropPercentage = 0;
    let voltageDrop = 0;
    let powerLoss = 0;
    let efficiency = 100;

    if (cableLength > 0 && current > 0) {
      const materialFactor = material === "aluminium" ? 1.6 : 1;
      const totalResistance = (wireData.resistance * materialFactor * cableLength * 2) / 1000;

      voltageDrop = current * totalResistance;
      voltageDropPercentage = (voltageDrop / voltage) * 100;
      powerLoss = current * current * totalResistance;
      efficiency = ((voltage - voltageDrop) / voltage) * 100;
    }

    const warnings: string[] = [];

    if (current > 0) {
      const adequateCapacity = effectiveAmpacity >= current * 1.25;
      if (!adequateCapacity) {
        warnings.push(`Current capacity insufficient: ${formatNumber(effectiveAmpacity)}A available vs ${current}A required`);
      }
      if (voltageDropPercentage > 5) {
        warnings.push(`High voltage drop: ${formatNumber(voltageDropPercentage)}% exceeds 5% limit`);
      } else if (voltageDropPercentage > 3) {
        warnings.push(`Moderate voltage drop: ${formatNumber(voltageDropPercentage)}% - consider optimization`);
      }
    }

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
      warnings
    };
  };

  const handleCalculate = () => {
    setResult(performCalculation());
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
    setInputMode("awg");
    setResult(null);
  };

  const hasValidInputs = () => {
    return inputMode === "awg" ? !!awgSize : !!metricSize;
  };

  const getOverallStatus = (): 'success' | 'warning' | 'error' => {
    if (!result) return 'success';
    if (result.warnings.length > 0) return result.analysis.adequateCapacity ? 'warning' : 'error';
    return 'success';
  };

  const awgOptions = Object.keys(awgToMetric).map(awg => ({
    value: awg,
    label: `AWG ${awg} (${awgToMetric[awg].metric}mm²)`
  }));

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="cable"
        title="Wire Gauge Calculator"
        description="AWG/metric conversion with voltage drop analysis"
        badge="BS 7671"
      >
        {/* Input Mode Selection */}
        <CalculatorSelect
          label="Input Type"
          value={inputMode}
          onChange={setInputMode}
          options={[
            { value: "awg", label: "AWG Size" },
            { value: "metric", label: "Metric Size (mm²)" },
          ]}
        />

        {inputMode === "awg" ? (
          <CalculatorSelect
            label="AWG Size"
            value={awgSize}
            onChange={setAwgSize}
            options={awgOptions}
            placeholder="Select AWG size"
          />
        ) : (
          <CalculatorInput
            label="Metric Size"
            unit="mm²"
            type="text"
            inputMode="decimal"
            value={metricSize}
            onChange={setMetricSize}
            placeholder="e.g., 2.5"
            hint="Cross-sectional area"
          />
        )}

        {/* Installation Analysis */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <h4 className="text-sm font-medium text-white/80">Installation Analysis (Optional)</h4>

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Cable Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={length}
              onChange={setLength}
              placeholder="e.g., 25"
              hint="One-way distance"
            />
            <CalculatorInput
              label="Load Current"
              unit="A"
              type="text"
              inputMode="decimal"
              value={loadCurrent}
              onChange={setLoadCurrent}
              placeholder="e.g., 16"
            />
          </CalculatorInputGrid>

          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="System Voltage"
              value={systemVoltage}
              onChange={setSystemVoltage}
              options={[
                { value: "230", label: "230V (Single Phase)" },
                { value: "400", label: "400V (Three Phase)" },
                { value: "110", label: "110V (Site/Tools)" },
                { value: "12", label: "12V (Low Voltage)" },
                { value: "24", label: "24V (Low Voltage)" },
              ]}
            />
            <CalculatorSelect
              label="Installation Method"
              value={installationType}
              onChange={setInstallationType}
              options={[
                { value: "conduit", label: "In Conduit/Trunking" },
                { value: "free", label: "Free Air" },
                { value: "buried", label: "Direct Buried" },
              ]}
            />
          </CalculatorInputGrid>

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Ambient Temperature"
              unit="°C"
              type="text"
              inputMode="numeric"
              value={ambientTemp}
              onChange={setAmbientTemp}
              placeholder="30"
            />
            <CalculatorInput
              label="Cables in Group"
              type="text"
              inputMode="numeric"
              value={cableGrouping}
              onChange={setCableGrouping}
              placeholder="1"
            />
          </CalculatorInputGrid>
        </div>

        <CalculatorActions
          category="cable"
          onCalculate={handleCalculate}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Analyse Wire"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="cable">
            {/* Wire Size Header */}
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Wire Size</p>
              <div
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                AWG {result.wire.awg}
              </div>
              <Badge variant="outline" className="mt-2 text-emerald-400 border-emerald-400/50">
                {result.wire.metric}mm²
              </Badge>
            </div>

            {/* Wire Properties */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Diameter"
                value={formatNumber(result.wire.diameter, 2)}
                unit="mm"
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Resistance"
                value={formatNumber(result.wire.resistance, 1)}
                unit="mΩ/m"
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Current Capacity"
                value={formatNumber(result.analysis.effectiveAmpacity, 0)}
                unit="A"
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Temperature Derating"
                value={formatNumber(result.analysis.temperatureDerating * 100)}
                unit="%"
                category="cable"
                size="sm"
              />
            </ResultsGrid>

            {/* Voltage Drop Analysis */}
            {parseFloat(length) > 0 && parseFloat(loadCurrent) > 0 && (
              <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                <h4 className="text-sm font-medium text-white/80">Voltage Drop Analysis</h4>
                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Voltage Drop"
                    value={formatNumber(result.analysis.voltageDropPercentage, 1)}
                    unit="%"
                    category="cable"
                    size="sm"
                  />
                  <ResultValue
                    label="Drop (V)"
                    value={formatNumber(result.analysis.voltageDrop, 1)}
                    unit="V"
                    category="cable"
                    size="sm"
                  />
                  <ResultValue
                    label="Power Loss"
                    value={result.analysis.powerLoss >= 1000 ? formatNumber(result.analysis.powerLoss / 1000, 1) : formatNumber(result.analysis.powerLoss, 0)}
                    unit={result.analysis.powerLoss >= 1000 ? "kW" : "W"}
                    category="cable"
                    size="sm"
                  />
                  <ResultValue
                    label="Efficiency"
                    value={formatNumber(result.analysis.efficiency, 1)}
                    unit="%"
                    category="cable"
                    size="sm"
                  />
                </ResultsGrid>

                {/* Compliance Status */}
                <div className={cn(
                  "p-3 rounded-xl border",
                  result.analysis.suitableForLength && result.analysis.adequateCapacity
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                )}>
                  <div className="flex items-center gap-2">
                    {result.analysis.suitableForLength && result.analysis.adequateCapacity ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      result.analysis.suitableForLength && result.analysis.adequateCapacity
                        ? "text-green-300"
                        : "text-red-300"
                    )}>
                      {result.analysis.suitableForLength
                        ? "Meets BS 7671 voltage drop requirements (≤5%)"
                        : "Exceeds BS 7671 voltage drop limits"
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <div className="space-y-1 text-sm text-orange-200">
                    {result.warnings.map((warning, index) => (
                      <p key={index}>{warning}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CalculatorResult>

          {/* What This Means - Collapsible */}
          {(parseFloat(length) > 0 || parseFloat(loadCurrent) > 0) && (
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )} />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0 space-y-2">
                  {parseFloat(loadCurrent) > 0 && (
                    <p className="text-sm text-blue-200/80">
                      Cable can safely carry <strong className="text-blue-300">{formatNumber(result.analysis.effectiveAmpacity)}A</strong> continuous load in {installationType} installation.
                    </p>
                  )}
                  {result.analysis.voltageDropPercentage > 0 && (
                    <p className="text-sm text-blue-200/80">
                      Voltage drop of <strong className="text-blue-300">{formatNumber(result.analysis.voltageDropPercentage, 1)}%</strong> {result.analysis.voltageDropPercentage <= 5 ? 'meets' : 'exceeds'} BS 7671 requirements.
                    </p>
                  )}
                  {result.analysis.powerLoss > 0 && (
                    <p className="text-sm text-blue-200/80">
                      Power losses of <strong className="text-blue-300">{formatNumber(result.analysis.powerLoss)}W</strong> reduce system efficiency.
                    </p>
                  )}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* BS 7671 Reference - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Reference</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Section 523:</strong> Current-carrying capacity</p>
                  <p><strong className="text-amber-300">Appendix 4:</strong> Voltage drop limits (5%)</p>
                  <p><strong className="text-amber-300">Regulation 411:</strong> Protective measures</p>
                  <p><strong className="text-amber-300">Section 433:</strong> Overload protection</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Practical Tips - Collapsible */}
          <Collapsible open={showTips} onOpenChange={setShowTips}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">Practical Tips</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showTips && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-purple-200/80">
                  <p>Verify actual installation conditions match calculations</p>
                  <p>Consider future load increases when selecting cable size</p>
                  <p>Use appropriate protective devices rated for cable ampacity</p>
                  <p>Ensure adequate mechanical protection for installation method</p>
                  {parseFloat(ambientTemp) > 40 && (
                    <p className="text-orange-300">High ambient temperature - consider ventilation</p>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-emerald-200">
            <strong>Voltage Drop</strong> = I × R × 2L. BS 7671 limit: 5% for most circuits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WireGaugeCalculator;
