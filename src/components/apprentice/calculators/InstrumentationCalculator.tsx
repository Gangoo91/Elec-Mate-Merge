import { useState, useMemo } from "react";
import { Gauge, RotateCcw, AlertTriangle, Zap, Info, BookOpen, ChevronDown, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface CalculationResult {
  current: number;
  percentage: number;
  engineeringValue: number;
  tripPoints: { low: number; high: number };
  shuntVoltage?: number;
  supplyMargin?: number;
  cableDrop?: number;
  powerInShunt?: number;
  status: 'success' | 'warning' | 'error';
}

const InstrumentationCalculator = () => {
  const config = CALCULATOR_CONFIG['testing'];

  // Core inputs
  const [minScale, setMinScale] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [inputType, setInputType] = useState<"engineering" | "percentage">("engineering");
  const [inputValue, setInputValue] = useState("");
  const [targetCurrent, setTargetCurrent] = useState("");
  const [unit, setUnit] = useState("bar");

  // Loop analysis inputs
  const [supplyVoltage, setSupplyVoltage] = useState("24");
  const [shuntResistor, setShuntResistor] = useState("250");
  const [cableLength, setCableLength] = useState("");
  const [cableResistance, setCableResistance] = useState("0.1");
  const [showLoopAnalysis, setShowLoopAnalysis] = useState(false);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): CalculationResult | null => {
    if (!minScale || !maxScale) return null;

    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const span = max - min;

    let percentage: number;
    let engineeringValue: number;
    let current: number;

    if (inputValue) {
      const value = parseFloat(inputValue);

      if (inputType === "percentage") {
        percentage = value;
        engineeringValue = min + (span * value / 100);
        current = 4 + (16 * value / 100);
      } else {
        engineeringValue = value;
        percentage = ((value - min) / span) * 100;
        current = 4 + (16 * (value - min) / span);
      }
    } else if (targetCurrent) {
      current = parseFloat(targetCurrent);
      percentage = ((current - 4) / 16) * 100;
      engineeringValue = min + (span * (current - 4) / 16);
    } else {
      return null;
    }

    // Trip points
    const tripPoints = {
      low: 4 + (16 * 0.1),
      high: 4 + (16 * 0.9)
    };

    // Loop analysis calculations
    let shuntVoltage: number | undefined;
    let supplyMargin: number | undefined;
    let cableDrop: number | undefined;
    let powerInShunt: number | undefined;

    if (shuntResistor) {
      const shuntR = parseFloat(shuntResistor);
      shuntVoltage = (current / 1000) * shuntR;
      powerInShunt = Math.pow(current / 1000, 2) * shuntR * 1000;
    }

    if (supplyVoltage && shuntVoltage) {
      const supply = parseFloat(supplyVoltage);
      supplyMargin = supply - shuntVoltage;

      if (cableLength && cableResistance) {
        const length = parseFloat(cableLength);
        const resistance = parseFloat(cableResistance);
        cableDrop = (current / 1000) * (resistance * length * 2);
        supplyMargin -= cableDrop;
      }
    }

    // Determine status
    let status: 'success' | 'warning' | 'error' = 'success';
    if (current < 4 || current > 20) status = 'error';
    else if (current < 4.5 || current > 19.5) status = 'warning';
    else if (supplyMargin && supplyMargin < 5) status = 'warning';
    else if (supplyMargin && supplyMargin < 2) status = 'error';

    return {
      current,
      percentage,
      engineeringValue,
      tripPoints,
      shuntVoltage,
      supplyMargin,
      cableDrop,
      powerInShunt,
      status
    };
  }, [minScale, maxScale, inputValue, inputType, targetCurrent, supplyVoltage, shuntResistor, cableLength, cableResistance]);

  const reset = () => {
    setMinScale("");
    setMaxScale("");
    setInputValue("");
    setTargetCurrent("");
    setInputType("engineering");
    setUnit("bar");
    setSupplyVoltage("24");
    setShuntResistor("250");
    setCableLength("");
    setCableResistance("0.1");
  };

  const formatNumber = (num: number | undefined, decimals = 2): string => {
    if (num === undefined) return "0";
    return num.toFixed(decimals);
  };

  const hasValidInputs = () => minScale && maxScale && (inputValue || targetCurrent);

  const unitOptions = [
    { value: "bar", label: "bar (Pressure)" },
    { value: "°C", label: "°C (Temperature)" },
    { value: "°F", label: "°F (Temperature)" },
    { value: "L/min", label: "L/min (Flow)" },
    { value: "m³/h", label: "m³/h (Flow)" },
    { value: "rpm", label: "rpm (Speed)" },
    { value: "pH", label: "pH (Acidity)" },
    { value: "%", label: "% (Level/Humidity)" },
  ];

  const currentOptions = [
    { value: "4", label: "4.0 mA (0%)" },
    { value: "6", label: "6.0 mA (12.5%)" },
    { value: "8", label: "8.0 mA (25%)" },
    { value: "10", label: "10.0 mA (37.5%)" },
    { value: "12", label: "12.0 mA (50%)" },
    { value: "14", label: "14.0 mA (62.5%)" },
    { value: "16", label: "16.0 mA (75%)" },
    { value: "18", label: "18.0 mA (87.5%)" },
    { value: "20", label: "20.0 mA (100%)" },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'success') return 'text-green-400';
    if (status === 'warning') return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="testing"
        title="4-20mA Instrumentation"
        description="Calculate current output for alarm trip points and loop analysis"
        badge="4-20mA"
      >
        {/* Scale Range */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Min Scale"
            type="text"
            inputMode="decimal"
            value={minScale}
            onChange={setMinScale}
            placeholder="0"
          />
          <CalculatorInput
            label="Max Scale"
            type="text"
            inputMode="decimal"
            value={maxScale}
            onChange={setMaxScale}
            placeholder="100"
          />
        </div>

        <CalculatorSelect
          label="Engineering Units"
          value={unit}
          onChange={setUnit}
          options={unitOptions}
        />

        <CalculatorSelect
          label="Input Type"
          value={inputType}
          onChange={(v) => setInputType(v as "engineering" | "percentage")}
          options={[
            { value: "percentage", label: "Percentage (0-100%)" },
            { value: "engineering", label: `Engineering Units (${unit})` },
          ]}
        />

        <CalculatorInput
          label={inputType === "percentage" ? "Percentage" : `Trip Setpoint`}
          unit={inputType === "percentage" ? "%" : unit}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={setInputValue}
          placeholder={inputType === "percentage" ? "0-100" : "Alarm value"}
          hint={inputType === "engineering" ? `Value between ${minScale || '0'} and ${maxScale || '100'} ${unit}` : undefined}
        />

        <CalculatorSelect
          label="Or Select Target Current"
          value={targetCurrent}
          onChange={setTargetCurrent}
          options={currentOptions}
          placeholder="Select mA value"
        />

        {/* Loop Analysis Toggle */}
        <button
          onClick={() => setShowLoopAnalysis(!showLoopAnalysis)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Loop Analysis (Optional)</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", showLoopAnalysis && "rotate-180")} />
        </button>

        {showLoopAnalysis && (
          <div className="space-y-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Supply Voltage"
                unit="V"
                type="text"
                inputMode="decimal"
                value={supplyVoltage}
                onChange={setSupplyVoltage}
                placeholder="24"
              />
              <CalculatorInput
                label="Shunt Resistor"
                unit="Ω"
                type="text"
                inputMode="decimal"
                value={shuntResistor}
                onChange={setShuntResistor}
                placeholder="250"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Cable Length"
                unit="m"
                type="text"
                inputMode="decimal"
                value={cableLength}
                onChange={setCableLength}
                placeholder="Optional"
              />
              <CalculatorInput
                label="Cable R"
                unit="Ω/m"
                type="text"
                inputMode="decimal"
                value={cableResistance}
                onChange={setCableResistance}
                placeholder="0.1"
              />
            </div>
          </div>
        )}

        <CalculatorActions
          category="testing"
          onCalculate={() => {}}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Live Results Below"
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="testing">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">4-20mA Output</span>
              <span className={cn("text-sm font-medium", getStatusColor(result.status))}>
                {result.status === 'success' ? 'Normal Range' : result.status === 'warning' ? 'Near Limits' : 'Out of Range'}
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Current Output</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {formatNumber(result.current, 2)} mA
              </div>
              <p className="text-sm text-white/50 mt-1">{formatNumber(result.percentage, 1)}% of scale</p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Engineering Value"
                value={formatNumber(result.engineeringValue, 2)}
                unit={unit}
                category="testing"
                size="sm"
              />
              <ResultValue
                label="Percentage"
                value={formatNumber(result.percentage, 1)}
                unit="%"
                category="testing"
                size="sm"
              />
              <ResultValue
                label="Low Trip (10%)"
                value={formatNumber(result.tripPoints.low, 1)}
                unit="mA"
                category="testing"
                size="sm"
              />
              <ResultValue
                label="High Trip (90%)"
                value={formatNumber(result.tripPoints.high, 1)}
                unit="mA"
                category="testing"
                size="sm"
              />
            </ResultsGrid>

            {/* Loop Analysis Results */}
            {(result.shuntVoltage || result.supplyMargin) && (
              <div className="pt-3 mt-3 border-t border-white/10">
                <p className="text-xs text-white/50 mb-2">Loop Analysis</p>
                <ResultsGrid columns={2}>
                  {result.shuntVoltage && (
                    <ResultValue
                      label="Shunt Voltage"
                      value={formatNumber(result.shuntVoltage * 1000, 0)}
                      unit="mV"
                      category="testing"
                      size="sm"
                    />
                  )}
                  {result.supplyMargin && (
                    <ResultValue
                      label="Supply Margin"
                      value={formatNumber(result.supplyMargin, 1)}
                      unit="V"
                      category="testing"
                      size="sm"
                    />
                  )}
                  {result.cableDrop && (
                    <ResultValue
                      label="Cable Drop"
                      value={formatNumber(result.cableDrop, 2)}
                      unit="V"
                      category="testing"
                      size="sm"
                    />
                  )}
                  {result.powerInShunt && (
                    <ResultValue
                      label="Shunt Power"
                      value={formatNumber(result.powerInShunt, 1)}
                      unit="mW"
                      category="testing"
                      size="sm"
                    />
                  )}
                </ResultsGrid>
              </div>
            )}
          </CalculatorResult>

          {/* Status Warnings */}
          {result.status === 'warning' && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-200">
                  Values near operating limits. Verify adequate margin for reliable operation.
                </p>
              </div>
            </div>
          )}

          {result.status === 'error' && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-200">
                  Values outside 4-20mA operating range. Check inputs.
                </p>
              </div>
            </div>
          )}

          {/* Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-blue-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Set calibrator to {formatNumber(result.current, 1)}mA to simulate {formatNumber(result.engineeringValue, 2)} {unit}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    This represents {formatNumber(result.percentage, 1)}% of scale - ideal for trip testing
                  </li>
                  {result.shuntVoltage && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Monitor {formatNumber(result.shuntVoltage * 1000, 0)}mV across shunt to confirm signal
                    </li>
                  )}
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">4-20mA Basics</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <p><strong className="text-amber-300">Live Zero (4mA):</strong> Allows detection of broken wires vs. zero reading</p>
              <p><strong className="text-amber-300">Current Loop:</strong> Immune to voltage drops over long cable runs</p>
              <p><strong className="text-amber-300">Typical Shunt:</strong> 250Ω gives 1-5V output for PLC analog inputs</p>
              <p className="text-xs text-white/50 pt-2 border-t border-white/10">
                BS 7671: Use screened cables and proper earthing for instrumentation circuits.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default InstrumentationCalculator;
