import { useState } from "react";
import { Calculator, Info, BookOpen, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import R1R2Result from "./r1r2/R1R2Result";
import R1R2Guidance from "./r1r2/R1R2Guidance";
import R1R2Standards from "./r1r2/R1R2Standards";

const R1R2Calculator = () => {
  const [cableLength, setCableLength] = useState("");
  const [lineConductorCSA, setLineConductorCSA] = useState("");
  const [cpcConductorCSA, setCpcConductorCSA] = useState("");
  const [conductorMaterial, setConductorMaterial] = useState("");
  const [temperature, setTemperature] = useState("70");
  const [measuredValue, setMeasuredValue] = useState("");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [result, setResult] = useState<{
    r1: number;
    r2: number;
    r1r2: number;
    continuityLimit: number;
    testAcceptable: boolean;
    cableLength: number;
    lineConductorCSA: string;
    cpcConductorCSA: string;
    conductorMaterial: string;
    temperature: number;
  } | null>(null);

  const config = CALCULATOR_CONFIG['testing'];

  // Resistance values at 20°C (mΩ/m)
  const copperResistance20C: { [key: string]: number } = {
    "1.0": 18.1,
    "1.5": 12.1,
    "2.5": 7.41,
    "4.0": 4.61,
    "6.0": 3.08,
    "10.0": 1.83,
    "16.0": 1.15,
    "25.0": 0.727,
    "35.0": 0.524,
    "50.0": 0.387,
    "70.0": 0.268,
    "95.0": 0.193,
    "120.0": 0.153,
    "150.0": 0.124,
    "185.0": 0.0991,
    "240.0": 0.0754,
    "300.0": 0.0601
  };

  const aluminiumResistance20C: { [key: string]: number } = {
    "16.0": 1.91,
    "25.0": 1.20,
    "35.0": 0.868,
    "50.0": 0.641,
    "70.0": 0.443,
    "95.0": 0.320,
    "120.0": 0.253,
    "150.0": 0.206,
    "185.0": 0.164,
    "240.0": 0.125,
    "300.0": 0.100
  };

  const csaOptions = [
    { value: "1.0", label: "1.0 mm²" },
    { value: "1.5", label: "1.5 mm²" },
    { value: "2.5", label: "2.5 mm²" },
    { value: "4.0", label: "4.0 mm²" },
    { value: "6.0", label: "6.0 mm²" },
    { value: "10.0", label: "10.0 mm²" },
    { value: "16.0", label: "16.0 mm²" },
    { value: "25.0", label: "25.0 mm²" },
    { value: "35.0", label: "35.0 mm²" },
    { value: "50.0", label: "50.0 mm²" },
    { value: "70.0", label: "70.0 mm²" },
    { value: "95.0", label: "95.0 mm²" },
    { value: "120.0", label: "120.0 mm²" },
    { value: "150.0", label: "150.0 mm²" },
    { value: "185.0", label: "185.0 mm²" },
    { value: "240.0", label: "240.0 mm²" },
    { value: "300.0", label: "300.0 mm²" },
  ];

  const materialOptions = [
    { value: "copper", label: "Copper" },
    { value: "aluminium", label: "Aluminium" },
  ];

  const calculateR1R2 = () => {
    if (!cableLength || !lineConductorCSA || !cpcConductorCSA || !conductorMaterial) {
      return;
    }

    const length = parseFloat(cableLength);
    const resistanceData = conductorMaterial === "copper" ? copperResistance20C : aluminiumResistance20C;

    const r20Line = resistanceData[lineConductorCSA];
    const r20CPC = resistanceData[cpcConductorCSA];

    if (!r20Line || !r20CPC) {
      return;
    }

    // Temperature correction factor
    const tempCorrection = conductorMaterial === "copper"
      ? (234.5 + parseInt(temperature)) / (234.5 + 20)
      : (228 + parseInt(temperature)) / (228 + 20);

    // Calculate R1 and R2 at operating temperature
    const r1 = (r20Line * length * tempCorrection) / 1000;
    const r2 = (r20CPC * length * tempCorrection) / 1000;
    const r1r2 = r1 + r2;

    // Continuity test limit (typically R1+R2 × 1.67 for temperature correction during testing)
    const continuityLimit = r1r2 * 1.67;

    const testAcceptable = true;

    setResult({
      r1,
      r2,
      r1r2,
      continuityLimit,
      testAcceptable,
      cableLength: length,
      lineConductorCSA,
      cpcConductorCSA,
      conductorMaterial,
      temperature: parseInt(temperature)
    });
  };

  const resetCalculator = () => {
    setCableLength("");
    setLineConductorCSA("");
    setCpcConductorCSA("");
    setConductorMaterial("");
    setTemperature("70");
    setMeasuredValue("");
    setResult(null);
  };

  const hasValidInputs = cableLength && lineConductorCSA && cpcConductorCSA && conductorMaterial;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="testing"
        title="R1+R2 Calculator"
        description="Calculate R1+R2 values for continuity testing according to BS 7671"
      >
        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white/5 rounded-xl p-1">
            <TabsTrigger
              value="calculator"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Calculator
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="standards"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4 mt-4">
            {/* Circuit Parameters */}
            <div
              className="space-y-4 p-4 rounded-xl border"
              style={{
                borderColor: `${config.gradientFrom}30`,
                background: `${config.gradientFrom}08`
              }}
            >
              <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
                Circuit Parameters
              </h4>

              <CalculatorInputGrid columns={2}>
                <CalculatorInput
                  label="Cable Length"
                  unit="m"
                  type="text"
                  inputMode="decimal"
                  value={cableLength}
                  onChange={setCableLength}
                  placeholder="e.g. 25"
                />
                <CalculatorSelect
                  label="Conductor Material"
                  value={conductorMaterial}
                  onChange={setConductorMaterial}
                  options={materialOptions}
                  placeholder="Select material"
                />
                <CalculatorSelect
                  label="Line Conductor CSA"
                  value={lineConductorCSA}
                  onChange={setLineConductorCSA}
                  options={csaOptions}
                  placeholder="Select CSA"
                />
                <CalculatorSelect
                  label="CPC Conductor CSA"
                  value={cpcConductorCSA}
                  onChange={setCpcConductorCSA}
                  options={csaOptions}
                  placeholder="Select CSA"
                />
                <CalculatorInput
                  label="Operating Temperature"
                  unit="°C"
                  type="text"
                  inputMode="numeric"
                  value={temperature}
                  onChange={setTemperature}
                  hint="Default: 70°C for thermoplastic"
                />
                <CalculatorInput
                  label="Measured R1+R2 (Optional)"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={measuredValue}
                  onChange={setMeasuredValue}
                  placeholder="Test result"
                  hint="Compare with calculated value"
                />
              </CalculatorInputGrid>
            </div>

            {/* Calculate Actions */}
            <CalculatorActions
              category="testing"
              onCalculate={calculateR1R2}
              onReset={resetCalculator}
              isDisabled={!hasValidInputs}
            />
          </TabsContent>

          <TabsContent value="guidance" className="mt-4">
            <R1R2Guidance />
          </TabsContent>

          <TabsContent value="standards" className="mt-4">
            <R1R2Standards />
          </TabsContent>
        </Tabs>
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="testing">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">R1+R2 Total</p>
              <div
                className="text-4xl font-bold font-mono bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.r1r2.toFixed(4)} Ω
              </div>
              <Badge
                variant="outline"
                className="mt-2 text-emerald-400"
                style={{ borderColor: 'currentColor' }}
              >
                Test Limit: {result.continuityLimit.toFixed(4)} Ω
              </Badge>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="R1 (Line)"
                value={result.r1.toFixed(4)}
                unit="Ω"
                category="testing"
                size="sm"
              />
              <ResultValue
                label="R2 (CPC)"
                value={result.r2.toFixed(4)}
                unit="Ω"
                category="testing"
                size="sm"
              />
            </ResultsGrid>

            <div className="pt-3 mt-3 border-t border-white/10 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Cable Length:</span>
                <span className="text-white">{result.cableLength}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Material:</span>
                <span className="text-white capitalize">{result.conductorMaterial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Line CSA:</span>
                <span className="text-white">{result.lineConductorCSA} mm²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">CPC CSA:</span>
                <span className="text-white">{result.cpcConductorCSA} mm²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Temperature:</span>
                <span className="text-white">{result.temperature}°C</span>
              </div>
            </div>
          </CalculatorResult>

          {/* Measured Value Comparison */}
          {measuredValue && (
            <div className={cn(
              "p-4 rounded-xl border",
              parseFloat(measuredValue) <= result.continuityLimit
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4" style={{ color: parseFloat(measuredValue) <= result.continuityLimit ? '#10b981' : '#ef4444' }} />
                <span className={cn(
                  "font-medium text-sm",
                  parseFloat(measuredValue) <= result.continuityLimit ? "text-emerald-300" : "text-red-300"
                )}>
                  Measured Value Comparison
                </span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-white/60">Your Measured Value:</span>
                  <span className="text-white font-mono">{parseFloat(measuredValue).toFixed(4)} Ω</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className={parseFloat(measuredValue) <= result.continuityLimit ? "text-emerald-400" : "text-red-400"}>
                    {parseFloat(measuredValue) <= result.continuityLimit ? "✓ Within limits" : "✗ Exceeds limit"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* R1R2Result component for additional details */}
          <R1R2Result result={result} measuredValue={measuredValue} />

          {/* What This Means - Collapsible */}
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
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">R1:</strong> Resistance of the line conductor from origin to furthest point
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">R2:</strong> Resistance of the circuit protective conductor (CPC)
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">R1+R2:</strong> Combined resistance used in Zs calculations for fault loop impedance
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Test Limit (×1.67):</strong> Correction factor for conductor heating during fault - allows comparison with cold test readings
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Regs at a Glance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showBsRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p>• <strong className="text-amber-300">Reg 612.2:</strong> Continuity of protective conductors including main and supplementary bonding</p>
                  <p>• <strong className="text-amber-300">Reg 411.4.5:</strong> Maximum earth fault loop impedance (Zs) requirements</p>
                  <p>• <strong className="text-amber-300">GN3:</strong> Inspection and Testing guidance for R1+R2 measurements</p>
                  <p>• <strong className="text-amber-300">Table 54.7:</strong> Resistance values for conductors at 20°C</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>R1+R2</strong> = (r₁ × L × k) + (r₂ × L × k) where k = temperature correction factor
          </p>
        </div>
      </div>
    </div>
  );
};

export default R1R2Calculator;
