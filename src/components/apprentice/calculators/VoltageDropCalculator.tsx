import { useState } from "react";
import {
  TrendingDown,
  RotateCcw,
  Calculator,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  Cable,
  Zap,
  ChevronDown,
} from "lucide-react";
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
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

// BS 7671 Appendix 4 mV/A/m values - accurate tabulated data
const mvamData: Record<string, Record<string, Record<number, number>>> = {
  "Copper T&E (6242Y)": {
    "Clipped direct (C)": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "In conduit/trunking (B)": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "Enclosed in insulation": { 1: 46, 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0 },
  },
  "Copper SWA (BS 5467)": {
    "Clipped direct (C)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "In tray/ladder (E)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Buried direct (D1)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Underground duct (D2)": { 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0, 25: 1.9, 35: 1.4, 50: 0.98, 70: 0.67, 95: 0.49, 120: 0.39 },
  },
  "Copper XLPE": {
    "Clipped direct (C)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "In tray/ladder (E)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Buried direct (D1)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
  },
  "Aluminium SWA": {
    "Clipped direct (C)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
    "In tray/ladder (E)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
    "Buried direct (D1)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
  },
};

const circuitTypeOptions = [
  { value: "lighting", label: "Lighting (3% limit)" },
  { value: "other", label: "Power/Other (5% limit)" },
];

const VoltageDropCalculator = () => {
  const config = CALCULATOR_CONFIG["cable"];

  const [activeTab, setActiveTab] = useState<"calculator" | "guidance" | "standards">("calculator");
  const [circuit, setCircuit] = useState<string>("other");
  const [family, setFamily] = useState<string>("Copper T&E (6242Y)");
  const [method, setMethod] = useState<string>("Clipped direct (C)");
  const [cableSize, setCableSize] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");
  const [showFormula, setShowFormula] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentage: number;
    voltageAtLoad: number;
    limit: number;
    compliant: boolean;
    mvam: number;
    maxLength: number;
    alternatives: Array<{ size: number; mvam: number; pct: number; compliant: boolean }>;
  } | null>(null);

  const dataForMethod = mvamData[family]?.[method] || {};
  const sizes = Object.keys(dataForMethod).map(Number).sort((a, b) => a - b);
  const selectedMvam = cableSize ? dataForMethod[Number(cableSize)] : null;

  const familyOptions = Object.keys(mvamData).map((k) => ({ value: k, label: k }));
  const methodOptions = Object.keys(mvamData[family] || {}).map((k) => ({ value: k, label: k }));
  const sizeOptions = sizes.map((size) => ({
    value: size.toString(),
    label: `${size}mm² (${dataForMethod[size]} mV/A/m)`,
  }));
  const voltageOptions = [
    { value: "230", label: "230V (Single Phase)" },
    { value: "400", label: "400V (Three Phase)" },
  ];

  const calculate = () => {
    const I = Number(current);
    const L = Number(length);
    const V = Number(supplyVoltage);
    const mvam = selectedMvam;

    if (!isFinite(I) || I <= 0 || !isFinite(L) || L <= 0 || !mvam) {
      setResult(null);
      return;
    }

    // BS 7671 formula: Vd = mV/A/m × Ib × L / 1000
    const voltageDrop = (mvam * I * L) / 1000;
    const percentage = (voltageDrop / V) * 100;
    const voltageAtLoad = V - voltageDrop;
    const limit = circuit === "lighting" ? 3 : 5;
    const compliant = percentage <= limit;

    // Maximum length calculation
    const maxLength = (V * (limit / 100) * 1000) / (mvam * I);

    // Calculate alternatives
    const alternatives = sizes
      .map((size) => {
        const altMvam = dataForMethod[size];
        const altVd = (altMvam * I * L) / 1000;
        const altPct = (altVd / V) * 100;
        return { size, mvam: altMvam, pct: altPct, compliant: altPct <= limit };
      })
      .filter((alt) => alt.compliant)
      .slice(0, 4);

    setResult({
      voltageDrop,
      percentage,
      voltageAtLoad,
      limit,
      compliant,
      mvam,
      maxLength,
      alternatives,
    });
  };

  const reset = () => {
    setCircuit("other");
    setFamily("Copper T&E (6242Y)");
    setMethod("Clipped direct (C)");
    setCableSize("");
    setLength("");
    setCurrent("");
    setSupplyVoltage("230");
    setResult(null);
  };

  const isValid = selectedMvam && current && length;

  const tabs = [
    { key: "calculator" as const, label: "Calculator" },
    { key: "guidance" as const, label: "Guidance" },
    { key: "standards" as const, label: "Standards" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="cable"
        title="Voltage Drop Calculator"
        description="Calculate voltage drop using BS 7671 Appendix 4 tabulated values"
        badge="BS 7671"
      >
        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 h-10 rounded-lg text-sm font-medium transition-all touch-manipulation",
                activeTab === tab.key
                  ? "text-black"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
              style={
                activeTab === tab.key
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calculator Tab */}
        {activeTab === "calculator" && (
          <div className="space-y-4">
            {/* Cable Selection Header */}
            <div className="flex items-center gap-2">
              <Cable className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-white/80">Cable Selection</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorSelect
                label="Circuit Type"
                value={circuit}
                onChange={setCircuit}
                options={circuitTypeOptions}
              />

              <CalculatorSelect
                label="Supply Voltage"
                value={supplyVoltage}
                onChange={setSupplyVoltage}
                options={voltageOptions}
              />
            </div>

            <CalculatorSelect
              label="Cable Family"
              value={family}
              onChange={(v) => {
                setFamily(v);
                setMethod(Object.keys(mvamData[v] || {})[0] || "");
                setCableSize("");
              }}
              options={familyOptions}
            />

            <CalculatorSelect
              label="Installation Method (Reference)"
              value={method}
              onChange={(v) => {
                setMethod(v);
                setCableSize("");
              }}
              options={methodOptions}
            />

            <CalculatorSelect
              label="Cable Size"
              value={cableSize}
              onChange={setCableSize}
              options={sizeOptions}
              placeholder="Select cable size"
            />

            {/* mV/A/m Info */}
            {selectedMvam && (
              <div className="p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">
                    <strong>mV/A/m value:</strong> {selectedMvam} mV/A/m
                  </span>
                </div>
                <p className="text-xs text-emerald-300/70 mt-1 ml-6">From BS 7671 Appendix 4</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Design Current"
                unit="A"
                type="text"
                inputMode="decimal"
                value={current}
                onChange={setCurrent}
                placeholder="e.g., 16"
                hint="Ib - design current"
              />

              <CalculatorInput
                label="Cable Length"
                unit="m"
                type="text"
                inputMode="decimal"
                value={length}
                onChange={setLength}
                placeholder="e.g., 30"
                hint="One-way route length"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculate}
                disabled={!isValid}
                className={cn(
                  "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
                  isValid
                    ? "text-black"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
                style={
                  isValid
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                <Calculator className="h-5 w-5" />
                Calculate
              </button>
              <button
                onClick={reset}
                className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Guidance Tab */}
        {activeTab === "guidance" && (
          <div className="space-y-4">
            {/* When to Check */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">When to Check</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-200/80">
                <li>• Long cable runs (20m+)</li>
                <li>• High current circuits (32A+)</li>
                <li>• Sensitive equipment (IT, lighting)</li>
                <li>• Motor circuits (starting current)</li>
                <li>• Distant outbuildings/sheds</li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-emerald-300">Solutions for High Drop</span>
              </div>
              <ul className="space-y-1 text-sm text-emerald-200/80">
                <li>• Increase cable CSA (cross-sectional area)</li>
                <li>• Reduce cable length if possible</li>
                <li>• Use copper instead of aluminium</li>
                <li>• Split load across multiple circuits</li>
                <li>• Consider local sub-distribution</li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-amber-300">Common Mistakes</span>
              </div>
              <ul className="space-y-1 text-sm text-amber-200/80">
                <li>• Forgetting voltage drop is cumulative from origin to furthest point</li>
                <li>• Using wrong mV/A/m value for installation method</li>
                <li>• Not considering startup currents for motors (can be 6-8× running)</li>
                <li>• Ignoring existing voltage drop from supply to origin</li>
              </ul>
            </div>

            {/* Quick Reference Table */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-emerald-300">Typical mV/A/m Values</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-500/30">
                      <th className="text-left py-2 text-emerald-200">Size</th>
                      <th className="text-center py-2 text-emerald-200">T&E</th>
                      <th className="text-center py-2 text-emerald-200">SWA Cu</th>
                      <th className="text-center py-2 text-emerald-200">SWA Al</th>
                    </tr>
                  </thead>
                  <tbody className="text-emerald-200/80 text-xs">
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">1.5mm²</td>
                      <td className="text-center">29</td>
                      <td className="text-center">29</td>
                      <td className="text-center">-</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">2.5mm²</td>
                      <td className="text-center">18</td>
                      <td className="text-center">18</td>
                      <td className="text-center">-</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">4mm²</td>
                      <td className="text-center">11</td>
                      <td className="text-center">11</td>
                      <td className="text-center">-</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">6mm²</td>
                      <td className="text-center">7.3</td>
                      <td className="text-center">7.3</td>
                      <td className="text-center">-</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">10mm²</td>
                      <td className="text-center">4.4</td>
                      <td className="text-center">4.4</td>
                      <td className="text-center">-</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">16mm²</td>
                      <td className="text-center">2.8</td>
                      <td className="text-center">2.8</td>
                      <td className="text-center">4.6</td>
                    </tr>
                    <tr className="border-b border-emerald-500/20">
                      <td className="py-1.5">25mm²</td>
                      <td className="text-center">-</td>
                      <td className="text-center">1.8</td>
                      <td className="text-center">2.9</td>
                    </tr>
                    <tr>
                      <td className="py-1.5">35mm²</td>
                      <td className="text-center">-</td>
                      <td className="text-center">1.3</td>
                      <td className="text-center">2.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-emerald-200/60 mt-2">
                Values in mV/A/m. For full tables see BS 7671 Appendix 4.
              </p>
            </div>
          </div>
        )}

        {/* Standards Tab */}
        {activeTab === "standards" && (
          <div className="space-y-4">
            {/* Regulation 525 */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">Regulation 525 - Voltage Drop</span>
              </div>
              <p className="text-sm text-blue-200/80 mb-3">
                "The voltage drop between the origin of an installation and any load point shall
                not exceed the values in Table 52."
              </p>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-200 mb-2 text-sm">Table 52 - Maximum Voltage Drop</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-500/30">
                      <th className="text-left py-1 text-blue-200">Circuit Type</th>
                      <th className="text-right py-1 text-blue-200">Max %</th>
                      <th className="text-right py-1 text-blue-200">At 230V</th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-200/80">
                    <tr className="border-b border-blue-500/20">
                      <td className="py-1">Lighting</td>
                      <td className="text-right">3%</td>
                      <td className="text-right">6.9V</td>
                    </tr>
                    <tr>
                      <td className="py-1">Other (power, heating)</td>
                      <td className="text-right">5%</td>
                      <td className="text-right">11.5V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appendix 4 */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">Appendix 4 - mV/A/m Values</span>
              </div>
              <p className="text-sm text-blue-200/80 mb-2">
                Provides tabulated voltage drop values in millivolts per ampere per metre for
                various cable types and installation methods.
              </p>
              <ul className="space-y-1 text-sm text-blue-200/80">
                <li>
                  • <strong>Table 4D1B:</strong> Single-phase circuits - single cables
                </li>
                <li>
                  • <strong>Table 4D2B:</strong> Single-phase circuits - multicore cables
                </li>
                <li>
                  • <strong>Table 4D3B:</strong> Three-phase circuits - single cables
                </li>
                <li>
                  • <strong>Table 4D4B:</strong> Three-phase circuits - multicore cables
                </li>
              </ul>
            </div>

            {/* Formula */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-purple-300">Voltage Drop Formula</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-sm">
                  <p className="text-purple-200 mb-1">For single-phase AC:</p>
                  <p className="text-purple-300">Vd = (mV/A/m × Ib × L) ÷ 1000</p>
                  <p className="text-purple-200/60 text-xs mt-2">
                    Where: Vd = voltage drop (V), Ib = design current (A), L = route length (m)
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-sm">
                  <p className="text-purple-200 mb-1">For three-phase AC:</p>
                  <p className="text-purple-300">Vd = (mV/A/m × Ib × L) ÷ 1000</p>
                  <p className="text-purple-200/60 text-xs mt-2">
                    (Use three-phase mV/A/m values from Tables 4D3B/4D4B)
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-amber-300">Important Notes</span>
              </div>
              <ul className="space-y-1 text-sm text-amber-200/80">
                <li>• Tabulated values assume conductor operating at maximum temperature</li>
                <li>• Supply voltage tolerance: +10% to -6% of nominal (216.2V to 253V)</li>
                <li>• mV/A/m values include both line and neutral conductors</li>
                <li>• Higher values apply when cables are enclosed in thermal insulation</li>
                <li>• Consider total drop from origin (cutout) not just from consumer unit</li>
              </ul>
            </div>
          </div>
        )}
      </CalculatorCard>

      {/* Results Section */}
      {result && activeTab === "calculator" && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Result */}
          <CalculatorResult category="cable">
            <div
              className={cn(
                "p-4 rounded-xl border-2 mb-4",
                result.compliant
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-red-500/50 bg-red-500/10"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                {result.compliant ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <span
                  className={cn(
                    "text-lg font-bold",
                    result.compliant ? "text-green-300" : "text-red-300"
                  )}
                >
                  {result.compliant ? "COMPLIANT" : "NON-COMPLIANT"}
                </span>
              </div>

              <ResultsGrid columns={2}>
                <ResultValue
                  label="Voltage Drop"
                  value={result.voltageDrop.toFixed(2)}
                  unit="V"
                  category="cable"
                />
                <ResultValue
                  label="Percentage"
                  value={result.percentage.toFixed(2)}
                  unit="%"
                  category="cable"
                />
                <ResultValue
                  label="Voltage at Load"
                  value={result.voltageAtLoad.toFixed(1)}
                  unit="V"
                  category="cable"
                  size="sm"
                />
                <ResultValue
                  label={`Max Length @ ${current}A`}
                  value={result.maxLength.toFixed(1)}
                  unit="m"
                  category="cable"
                  size="sm"
                />
              </ResultsGrid>
            </div>

            {/* Formula Breakdown */}
            <Collapsible open={showFormula} onOpenChange={setShowFormula}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-colors">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showFormula && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <div className="space-y-2 font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                  <p className="text-purple-200">
                    <span className="text-purple-400">Formula:</span> Vd = (mV/A/m × Ib × L) ÷ 1000
                  </p>
                  <p className="text-purple-200">
                    <span className="text-purple-400">Step 1:</span> mV/A/m = {result.mvam} (from
                    Appendix 4)
                  </p>
                  <p className="text-purple-200">
                    <span className="text-purple-400">Step 2:</span> Vd = ({result.mvam} × {current}{" "}
                    × {length}) ÷ 1000
                  </p>
                  <p className="text-purple-200">
                    <span className="text-purple-400">Step 3:</span> Vd ={" "}
                    {(result.mvam * Number(current) * Number(length)).toFixed(1)} ÷ 1000 ={" "}
                    <strong>{result.voltageDrop.toFixed(2)} V</strong>
                  </p>
                  <p className="text-purple-200">
                    <span className="text-purple-400">Step 4:</span> % = ({result.voltageDrop.toFixed(2)}{" "}
                    ÷ {supplyVoltage}) × 100 = <strong>{result.percentage.toFixed(2)}%</strong>
                  </p>
                  <p className={cn(result.compliant ? "text-green-300" : "text-red-300")}>
                    <span className="text-purple-400">Check:</span> {result.percentage.toFixed(2)}%{" "}
                    {result.compliant ? "≤" : ">"} {result.limit}% limit →{" "}
                    {result.compliant ? "PASS ✓" : "FAIL ✗"}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Alternative Sizes */}
            {result.alternatives.length > 0 && (
              <div className="pt-4">
                <p className="text-sm text-white/60 mb-2">Compliant Cable Sizes</p>
                <div className="grid gap-2">
                  {result.alternatives.map((alt) => (
                    <div
                      key={alt.size}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-lg",
                        alt.size === Number(cableSize)
                          ? "bg-emerald-400/20 border border-emerald-400/40"
                          : "bg-blue-500/10"
                      )}
                    >
                      <span className="text-white font-medium">
                        {alt.size}mm²
                        <span className="text-white/80 text-xs ml-2">({alt.mvam} mV/A/m)</span>
                      </span>
                      <span className="text-green-400 font-mono">{alt.pct.toFixed(2)}% ✓</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning if non-compliant */}
            {!result.compliant && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                  <div className="text-sm text-red-200">
                    <strong>Action Required:</strong> Use a larger cable size or reduce cable length.
                    {result.alternatives.length > 0 && (
                      <span>
                        {" "}
                        Recommended: {result.alternatives[0].size}mm² (
                        {result.alternatives[0].pct.toFixed(2)}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CalculatorResult>

          {/* Why This Matters */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">
                    Why Voltage Drop Matters
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showReference && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-amber-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Excessive voltage drop causes poor equipment performance - motors struggle to
                    start, lamps dim
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    BS 7671 limits: 3% for lighting circuits, 5% for other circuits (from origin to
                    final point)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Higher voltage drop wastes energy as heat in cables, increasing running costs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Can cause nuisance tripping of protective devices due to undervoltage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Compliance is a legal requirement under Part P Building Regulations
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}
    </div>
  );
};

export default VoltageDropCalculator;
