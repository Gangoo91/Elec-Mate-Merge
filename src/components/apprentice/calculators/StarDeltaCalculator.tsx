import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info, BookOpen } from "lucide-react";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
} from "@/components/calculators/shared";

type ConversionMode = "star-to-delta" | "delta-to-star";
type ImpedanceType = "equal" | "unequal";

interface ConversionResult {
  mode: ConversionMode;
  // For equal impedances
  inputZ?: number;
  outputZ?: number;
  // For unequal impedances
  inputZa?: number;
  inputZb?: number;
  inputZc?: number;
  outputZab?: number;
  outputZbc?: number;
  outputZca?: number;
  // Line and phase relationships
  lineVoltage?: number;
  phaseVoltageIn?: number;
  phaseVoltageOut?: number;
  lineCurrent?: number;
  phaseCurrentIn?: number;
  phaseCurrentOut?: number;
  notes: string[];
}

const StarDeltaCalculator = () => {
  const [mode, setMode] = useState<ConversionMode>("star-to-delta");
  const [impedanceType, setImpedanceType] = useState<ImpedanceType>("equal");
  const [voltage, setVoltage] = useState("400");

  // Equal impedance inputs
  const [impedance, setImpedance] = useState("");

  // Unequal impedance inputs
  const [za, setZa] = useState("");
  const [zb, setZb] = useState("");
  const [zc, setZc] = useState("");

  const [result, setResult] = useState<ConversionResult | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBS7671, setShowBS7671] = useState(false);

  const calculate = () => {
    const V_line = parseFloat(voltage) || 400;

    if (impedanceType === "equal") {
      const Z = parseFloat(impedance);
      if (!Z || Z <= 0) return;

      if (mode === "star-to-delta") {
        // Star to Delta: Z_delta = 3 × Z_star
        const Z_delta = 3 * Z;
        const V_phase_star = V_line / Math.sqrt(3);
        const V_phase_delta = V_line;
        const I_phase_star = V_phase_star / Z;
        const I_line = I_phase_star; // In star, line current = phase current
        const I_phase_delta = V_phase_delta / Z_delta;

        setResult({
          mode: "star-to-delta",
          inputZ: Z,
          outputZ: Z_delta,
          lineVoltage: V_line,
          phaseVoltageIn: V_phase_star,
          phaseVoltageOut: V_phase_delta,
          lineCurrent: I_line,
          phaseCurrentIn: I_phase_star,
          phaseCurrentOut: I_phase_delta,
          notes: [
            "Delta impedance = 3 × Star impedance",
            `Star phase voltage = Line voltage / √3 = ${V_phase_star.toFixed(1)}V`,
            `Delta phase voltage = Line voltage = ${V_line}V`,
            "In star: Line current = Phase current",
            "In delta: Line current = √3 × Phase current",
            "Total power remains the same after conversion",
          ],
        });
      } else {
        // Delta to Star: Z_star = Z_delta / 3
        const Z_star = Z / 3;
        const V_phase_delta = V_line;
        const V_phase_star = V_line / Math.sqrt(3);
        const I_phase_delta = V_phase_delta / Z;
        const I_line = I_phase_delta * Math.sqrt(3); // In delta, line current = √3 × phase current
        const I_phase_star = I_line; // In star, phase current = line current

        setResult({
          mode: "delta-to-star",
          inputZ: Z,
          outputZ: Z_star,
          lineVoltage: V_line,
          phaseVoltageIn: V_phase_delta,
          phaseVoltageOut: V_phase_star,
          lineCurrent: I_line,
          phaseCurrentIn: I_phase_delta,
          phaseCurrentOut: I_phase_star,
          notes: [
            "Star impedance = Delta impedance / 3",
            `Delta phase voltage = Line voltage = ${V_line}V`,
            `Star phase voltage = Line voltage / √3 = ${V_phase_star.toFixed(1)}V`,
            "In delta: Line current = √3 × Phase current",
            "In star: Line current = Phase current",
            "Total power remains the same after conversion",
          ],
        });
      }
    } else {
      // Unequal impedances
      const Za = parseFloat(za);
      const Zb = parseFloat(zb);
      const Zc = parseFloat(zc);

      if (!Za || !Zb || !Zc || Za <= 0 || Zb <= 0 || Zc <= 0) return;

      if (mode === "star-to-delta") {
        // Star to Delta conversion for unequal impedances
        // Zab = (Za×Zb + Zb×Zc + Zc×Za) / Zc
        // Zbc = (Za×Zb + Zb×Zc + Zc×Za) / Za
        // Zca = (Za×Zb + Zb×Zc + Zc×Za) / Zb
        const sum = Za * Zb + Zb * Zc + Zc * Za;
        const Zab = sum / Zc;
        const Zbc = sum / Za;
        const Zca = sum / Zb;

        setResult({
          mode: "star-to-delta",
          inputZa: Za,
          inputZb: Zb,
          inputZc: Zc,
          outputZab: Zab,
          outputZbc: Zbc,
          outputZca: Zca,
          lineVoltage: V_line,
          notes: [
            "Formula: Zxy = (Za×Zb + Zb×Zc + Zc×Za) / Zz",
            `Sum product = ${sum.toFixed(2)}`,
            "Each delta impedance is the sum product divided by the opposite star impedance",
            "The neutral point in star is eliminated in delta",
          ],
        });
      } else {
        // Delta to Star conversion for unequal impedances
        // Using Zab, Zbc, Zca as inputs (stored in za, zb, zc)
        // Za = (Zab × Zca) / (Zab + Zbc + Zca)
        // Zb = (Zab × Zbc) / (Zab + Zbc + Zca)
        // Zc = (Zbc × Zca) / (Zab + Zbc + Zca)
        const Zab = Za; // Reusing variable names
        const Zbc = Zb;
        const Zca = Zc;
        const sum = Zab + Zbc + Zca;
        const newZa = (Zab * Zca) / sum;
        const newZb = (Zab * Zbc) / sum;
        const newZc = (Zbc * Zca) / sum;

        setResult({
          mode: "delta-to-star",
          inputZa: Zab,
          inputZb: Zbc,
          inputZc: Zca,
          outputZab: newZa,
          outputZbc: newZb,
          outputZca: newZc,
          lineVoltage: V_line,
          notes: [
            "Formula: Za = (Zab × Zca) / (Zab + Zbc + Zca)",
            `Sum of delta impedances = ${sum.toFixed(2)}Ω`,
            "Each star impedance is the product of adjacent delta impedances divided by the total",
            "Creates a neutral point in the star configuration",
          ],
        });
      }
    }
  };

  const reset = () => {
    setMode("star-to-delta");
    setImpedanceType("equal");
    setVoltage("400");
    setImpedance("");
    setZa("");
    setZb("");
    setZc("");
    setResult(null);
  };

  const modeOptions = [
    { value: "star-to-delta", label: "Star (Y) → Delta (Δ)" },
    { value: "delta-to-star", label: "Delta (Δ) → Star (Y)" },
  ];

  const impedanceTypeOptions = [
    { value: "equal", label: "Equal Impedances (Balanced)" },
    { value: "unequal", label: "Unequal Impedances (Unbalanced)" },
  ];

  // Get labels based on mode
  const getInputLabels = () => {
    if (mode === "star-to-delta") {
      return impedanceType === "equal"
        ? { single: "Star Impedance (Z_star)" }
        : { a: "Za (Star)", b: "Zb (Star)", c: "Zc (Star)" };
    } else {
      return impedanceType === "equal"
        ? { single: "Delta Impedance (Z_delta)" }
        : { a: "Zab (Delta)", b: "Zbc (Delta)", c: "Zca (Delta)" };
    }
  };

  const labels = getInputLabels();

  return (
    <CalculatorCard
      category="power"
      title="Star-Delta Conversion Calculator"
      description="Convert between star (Y) and delta (Δ) impedance configurations"
    >
      <div className="space-y-4 sm:space-y-5">
        {/* Conversion Mode */}
        <CalculatorSelect
          label="Conversion Direction"
          value={mode}
          onChange={(val) => {
            setMode(val as ConversionMode);
            setResult(null);
          }}
          options={modeOptions}
          placeholder="Select conversion"
        />

        {/* Impedance Type */}
        <CalculatorSelect
          label="Impedance Configuration"
          value={impedanceType}
          onChange={(val) => {
            setImpedanceType(val as ImpedanceType);
            setResult(null);
          }}
          options={impedanceTypeOptions}
          placeholder="Select type"
        />

        {/* Line Voltage */}
        <CalculatorInput
          label="Line Voltage"
          value={voltage}
          onChange={setVoltage}
          placeholder="400"
          unit="V"
          hint="UK standard 3-phase: 400V"
        />

        {/* Impedance Inputs */}
        {impedanceType === "equal" ? (
          <CalculatorInput
            label={labels.single}
            value={impedance}
            onChange={setImpedance}
            placeholder="e.g., 10"
            unit="Ω"
            hint="All three impedances are equal"
          />
        ) : (
          <div className="space-y-3">
            <CalculatorInput
              label={labels.a}
              value={za}
              onChange={setZa}
              placeholder="e.g., 10"
              unit="Ω"
            />
            <CalculatorInput
              label={labels.b}
              value={zb}
              onChange={setZb}
              placeholder="e.g., 15"
              unit="Ω"
            />
            <CalculatorInput
              label={labels.c}
              value={zc}
              onChange={setZc}
              placeholder="e.g., 20"
              unit="Ω"
            />
          </div>
        )}

        {/* Actions */}
        <CalculatorActions
          category="power"
          onCalculate={calculate}
          onReset={reset}
          isDisabled={
            impedanceType === "equal"
              ? !impedance || parseFloat(impedance) <= 0
              : !za || !zb || !zc || parseFloat(za) <= 0 || parseFloat(zb) <= 0 || parseFloat(zc) <= 0
          }
        />

        {/* Results */}
        {result && (
          <CalculatorResult
            category="power"
          >
            {impedanceType === "equal" ? (
              <ResultsGrid columns={2}>
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Input (Star)" : "Input (Delta)"}
                  value={`${result.inputZ?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Output (Delta)" : "Output (Star)"}
                  value={`${result.outputZ?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label="Line Voltage"
                  value={`${result.lineVoltage} V`}
                  category="power"
                />
                <ResultValue
                  label="Line Current"
                  value={`${result.lineCurrent?.toFixed(2)} A`}
                  category="power"
                />
                <ResultValue
                  label="Phase Voltage (Input)"
                  value={`${result.phaseVoltageIn?.toFixed(1)} V`}
                  category="power"
                />
                <ResultValue
                  label="Phase Voltage (Output)"
                  value={`${result.phaseVoltageOut?.toFixed(1)} V`}
                  category="power"
                />
              </ResultsGrid>
            ) : (
              <ResultsGrid columns={2}>
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Za (Star)" : "Zab (Delta)"}
                  value={`${result.inputZa?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Zab (Delta)" : "Za (Star)"}
                  value={`${result.outputZab?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Zb (Star)" : "Zbc (Delta)"}
                  value={`${result.inputZb?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Zbc (Delta)" : "Zb (Star)"}
                  value={`${result.outputZbc?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Zc (Star)" : "Zca (Delta)"}
                  value={`${result.inputZc?.toFixed(2)} Ω`}
                  category="power"
                />
                <ResultValue
                  label={result.mode === "star-to-delta" ? "Zca (Delta)" : "Zc (Star)"}
                  value={`${result.outputZca?.toFixed(2)} Ω`}
                  category="power"
                />
              </ResultsGrid>
            )}

            {/* Visual Representation */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Star Diagram */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-xs font-medium text-center text-white/70 mb-2">Star (Y)</h4>
                <div className="relative h-24 flex items-center justify-center">
                  <svg viewBox="0 0 100 80" className="w-full h-full">
                    {/* Neutral point */}
                    <circle cx="50" cy="40" r="3" fill="#facc15" />
                    {/* Lines to terminals */}
                    <line x1="50" y1="40" x2="50" y2="10" stroke="#facc15" strokeWidth="2" />
                    <line x1="50" y1="40" x2="20" y2="65" stroke="#facc15" strokeWidth="2" />
                    <line x1="50" y1="40" x2="80" y2="65" stroke="#facc15" strokeWidth="2" />
                    {/* Terminal labels */}
                    <text x="50" y="8" textAnchor="middle" fill="#fff" fontSize="8">A</text>
                    <text x="15" y="72" textAnchor="middle" fill="#fff" fontSize="8">B</text>
                    <text x="85" y="72" textAnchor="middle" fill="#fff" fontSize="8">C</text>
                    <text x="58" y="42" fill="#888" fontSize="7">N</text>
                  </svg>
                </div>
              </div>

              {/* Delta Diagram */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-xs font-medium text-center text-white/70 mb-2">Delta (Δ)</h4>
                <div className="relative h-24 flex items-center justify-center">
                  <svg viewBox="0 0 100 80" className="w-full h-full">
                    {/* Triangle */}
                    <line x1="50" y1="10" x2="20" y2="65" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="20" y1="65" x2="80" y2="65" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="80" y1="65" x2="50" y2="10" stroke="#3b82f6" strokeWidth="2" />
                    {/* Terminals */}
                    <circle cx="50" cy="10" r="3" fill="#3b82f6" />
                    <circle cx="20" cy="65" r="3" fill="#3b82f6" />
                    <circle cx="80" cy="65" r="3" fill="#3b82f6" />
                    {/* Terminal labels */}
                    <text x="50" y="6" textAnchor="middle" fill="#fff" fontSize="8">A</text>
                    <text x="12" y="68" textAnchor="middle" fill="#fff" fontSize="8">B</text>
                    <text x="88" y="68" textAnchor="middle" fill="#fff" fontSize="8">C</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Notes */}
            {result.notes.length > 0 && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-400 mb-2">Key Points</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  {result.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CalculatorResult>
        )}

        {/* Guidance Section */}
        <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">Theory & Applications</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showGuidance ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="space-y-4 text-sm text-white/70">
              {/* Why This Matters Section */}
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-400 mb-2">Why This Conversion Matters</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Motor starting:</strong> Star-delta starters use this conversion to reduce inrush current by ~67%</li>
                  <li>• <strong>Circuit analysis:</strong> Converting complex networks simplifies calculations for fault currents</li>
                  <li>• <strong>Transformer windings:</strong> Understanding both configurations helps with transformer connections</li>
                  <li>• <strong>Load balancing:</strong> Delta allows operation with one phase lost (open delta)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">When to Use Each Configuration</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h5 className="text-yellow-400 font-medium mb-1">Star (Y) Connection</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Motor starting (reduced voltage)</li>
                      <li>• Distribution systems with neutral</li>
                      <li>• Lower phase voltage = safer</li>
                      <li>• Access to two voltage levels</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="text-blue-400 font-medium mb-1">Delta (Δ) Connection</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Motor running (full power)</li>
                      <li>• Higher phase voltage</li>
                      <li>• No neutral required</li>
                      <li>• Better for unbalanced loads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">Key Formulas</h4>
                <div className="space-y-2 text-xs font-mono bg-white/5 p-3 rounded-lg">
                  <p><span className="text-yellow-400">Balanced:</span></p>
                  <p className="pl-3">Z_delta = 3 × Z_star</p>
                  <p className="pl-3">Z_star = Z_delta / 3</p>
                  <p className="mt-2"><span className="text-yellow-400">Unbalanced (Star → Delta):</span></p>
                  <p className="pl-3">Zab = (Za×Zb + Zb×Zc + Zc×Za) / Zc</p>
                  <p className="mt-2"><span className="text-yellow-400">Unbalanced (Delta → Star):</span></p>
                  <p className="pl-3">Za = (Zab × Zca) / (Zab + Zbc + Zca)</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">Star-Delta Motor Starting</h4>
                <p className="text-xs">
                  Star-delta starters are commonly used to reduce starting current in motors above 7.5kW.
                  The motor starts in star (lower voltage, ~⅓ starting current) then switches to delta
                  (full voltage, full power) once up to speed.
                </p>
                <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded">
                  <p className="text-xs text-green-300">
                    <strong>Starting current in star</strong> = Full load current / √3 ≈ 58% of delta starting current
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">Voltage & Current Relationships</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-yellow-400 font-medium">Star (Y):</p>
                    <p>V_phase = V_line / √3</p>
                    <p>I_line = I_phase</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-blue-400 font-medium">Delta (Δ):</p>
                    <p>V_phase = V_line</p>
                    <p>I_line = I_phase × √3</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-1">Exam Tip</h4>
                <p className="text-xs">
                  Remember: The ratio 3:1 applies to balanced impedances. For UK 400V three-phase:
                  Star phase voltage = 400/√3 = 230V, Delta phase voltage = 400V.
                  This is why we have both 230V and 400V available from a three-phase supply.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* BS 7671 Reference Section */}
        <Collapsible open={showBS7671} onOpenChange={setShowBS7671}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white/90">BS 7671 Reference</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showBS7671 ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="space-y-4 text-sm text-white/70">
              <div>
                <h4 className="font-medium text-amber-400 mb-2">Section 430 - Motor Circuits</h4>
                <p className="text-xs mb-2">
                  Star-delta starting is covered under motor starting methods. Key considerations include:
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Starting current must not cause excessive voltage drop (&lt;4% recommended)</li>
                  <li>• Motor must be suitable for star-delta starting (6 terminals required)</li>
                  <li>• Transition time from star to delta should be minimised</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Regulation 430.3 - Starting</h4>
                <p className="text-xs">
                  Motor starting arrangements shall be designed to limit voltage disturbances
                  to other equipment. Star-delta starting reduces starting current to approximately
                  ⅓ of direct-on-line (DOL) starting current.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Distribution System Configurations</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">TN-S/TN-C-S:</span> Star with neutral
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">Industrial:</span> Delta common for motors
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Transformer Connections</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Dyn11:</strong> Delta primary, Star secondary (most common UK distribution)</li>
                  <li>• <strong>Yy0:</strong> Star-Star (used for high voltage transmission)</li>
                  <li>• <strong>Dd0:</strong> Delta-Delta (industrial applications)</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-1">Key Point</h4>
                <p className="text-xs">
                  Understanding star-delta relationships is essential for:
                  Fault level calculations, motor protection settings, transformer vector groups,
                  and three-phase load balancing. The 3:1 impedance ratio is fundamental.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </CalculatorCard>
  );
};

export default StarDeltaCalculator;
