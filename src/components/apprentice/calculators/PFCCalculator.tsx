import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

interface PFCResult {
  pfcValue: number;
  assessmentLevel: string;
  recommendations: string[];
  breakingCapacity: string;
  zsTotal: number;
  zeValue: number;
  r1r2Value: number;
  voltage: number;
}

const systemTypeOptions = [
  { value: 'single-phase', label: 'Single Phase (230V)' },
  { value: 'three-phase', label: 'Three Phase (400V)' },
];

const PFCCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [voltage, setVoltage] = useState('230');
  const [systemType, setSystemType] = useState('');
  const [zeValue, setZeValue] = useState('');
  const [r1r2Value, setR1r2Value] = useState('');
  const [result, setResult] = useState<PFCResult | null>(null);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const handleCalculate = useCallback(() => {
    if (!voltage || !zeValue || !r1r2Value || !systemType) return;

    const supplyVoltage = parseFloat(voltage);
    const ze = parseFloat(zeValue);
    const r1r2 = parseFloat(r1r2Value);

    const zsTotal = ze + r1r2;
    const phaseVoltage = systemType === 'three-phase' ? 230 : supplyVoltage;
    const pfcValue = phaseVoltage / zsTotal;

    let assessmentLevel: string;
    let recommendations: string[];
    let breakingCapacity: string;

    if (pfcValue < 1000) {
      assessmentLevel = 'Low';
      recommendations = [
        'PFC is relatively low — standard MCBs should be adequate',
        'Check if protective device will operate within required time',
        'Consider cable sizing and length factors',
      ];
      breakingCapacity = '6kA';
    } else if (pfcValue < 6000) {
      assessmentLevel = 'Medium';
      recommendations = [
        'Moderate PFC — ensure MCBs have adequate breaking capacity',
        'Standard 6kA MCBs should be sufficient',
        'Check manufacturer specifications for exact requirements',
      ];
      breakingCapacity = '6kA';
    } else if (pfcValue < 10000) {
      assessmentLevel = 'High';
      recommendations = [
        'High PFC — use MCBs with higher breaking capacity',
        'Consider 10kA or higher rated protective devices',
        'Additional protection coordination may be required',
      ];
      breakingCapacity = '10kA';
    } else {
      assessmentLevel = 'Very High';
      recommendations = [
        'Very high PFC — specialist equipment required',
        'Use MCBs with 16kA or higher breaking capacity',
        'Consider current limiting devices',
        'Professional assessment recommended',
      ];
      breakingCapacity = '16kA+';
    }

    setResult({
      pfcValue,
      assessmentLevel,
      recommendations,
      breakingCapacity,
      zsTotal,
      zeValue: ze,
      r1r2Value: r1r2,
      voltage: phaseVoltage,
    });
  }, [voltage, zeValue, r1r2Value, systemType]);

  const handleReset = useCallback(() => {
    setVoltage('230');
    setSystemType('');
    setZeValue('');
    setR1r2Value('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `Prospective Fault Current\nPFC: ${result.pfcValue.toFixed(0)} A (${(result.pfcValue / 1000).toFixed(2)} kA)`;
    text += `\nZs: ${result.zsTotal.toFixed(3)} Ω`;
    text += `\nZe: ${result.zeValue} Ω | R1+R2: ${result.r1r2Value} Ω`;
    text += `\nAssessment: ${result.assessmentLevel}`;
    text += `\nBreaking Capacity: ${result.breakingCapacity} required`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getAssessmentBadge = (level: string): 'pass' | 'fail' | 'warning' | 'info' => {
    switch (level) {
      case 'Low':
        return 'pass';
      case 'Medium':
        return 'info';
      case 'High':
        return 'warning';
      case 'Very High':
        return 'fail';
      default:
        return 'info';
    }
  };

  const isValid = systemType && zeValue && r1r2Value;

  return (
    <CalculatorCard
      category={CAT}
      title="Prospective Fault Current Calculator"
      description="Calculate prospective fault current and assess protective device requirements"
    >
      <CalculatorSelect
        label="System Type"
        value={systemType}
        onChange={setSystemType}
        options={systemTypeOptions}
        placeholder="Select system type"
      />

      <CalculatorInput
        label="Supply Voltage"
        unit="V"
        type="text"
        inputMode="decimal"
        value={voltage}
        onChange={setVoltage}
        placeholder="e.g., 230"
      />

      <CalculatorInput
        label="Ze — External Loop Impedance"
        unit="Ω"
        type="text"
        inputMode="decimal"
        value={zeValue}
        onChange={setZeValue}
        placeholder="e.g., 0.35"
        hint="External earth loop impedance (supply authority)"
      />

      <CalculatorInput
        label="R1+R2 — Circuit Impedance"
        unit="Ω"
        type="text"
        inputMode="decimal"
        value={r1r2Value}
        onChange={setR1r2Value}
        placeholder="e.g., 0.15"
        hint="Circuit conductor resistance (line + protective)"
      />

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!isValid}
        calculateLabel="Calculate PFC"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={getAssessmentBadge(result.assessmentLevel)}
              label={`${result.assessmentLevel} PFC Level`}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Prospective Fault Current</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.pfcValue.toFixed(0)} A
            </p>
            <p className="text-sm text-white mt-2">({(result.pfcValue / 1000).toFixed(2)} kA)</p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Zs (Total Impedance)"
              value={result.zsTotal.toFixed(3)}
              unit="Ω"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Breaking Capacity"
              value={result.breakingCapacity}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Assessment comparison */}
          <div
            className={cn(
              'flex items-center justify-between p-3 rounded-lg border text-sm',
              result.assessmentLevel === 'Low' || result.assessmentLevel === 'Medium'
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-amber-500/5 border-amber-500/20'
            )}
          >
            <div className="flex items-center gap-2">
              {result.assessmentLevel === 'Low' || result.assessmentLevel === 'Medium' ? (
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              )}
              <span className="text-white font-medium">Device Requirement</span>
            </div>
            <span className="text-white shrink-0 ml-2">
              {result.breakingCapacity} MCBs required
            </span>
          </div>

          {/* Recommendations */}
          <div className="space-y-1.5">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-white">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: config.gradientFrom }}
                />
                {rec}
              </div>
            ))}
          </div>

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Input values',
                formula: `Uo = ${result.voltage}V | Ze = ${result.zeValue} Ω | R1+R2 = ${result.r1r2Value} Ω`,
                description: `Ze (${result.zeValue} Ω) is the supply impedance from the DNO transformer. R1+R2 (${result.r1r2Value} Ω) is the circuit conductor resistance from the board to the furthest point.`,
              },
              {
                label: 'Total loop impedance',
                formula: `Zs = Ze + (R1+R2) = ${result.zeValue} + ${result.r1r2Value}`,
                value: `${result.zsTotal.toFixed(3)} Ω`,
                description:
                  'The total earth fault loop impedance determines how much current flows during a fault — lower impedance means higher fault current.',
              },
              {
                label: 'Prospective fault current',
                formula: `PFC = Uo / Zs = ${result.voltage} / ${result.zsTotal.toFixed(3)}`,
                value: `${result.pfcValue.toFixed(0)} A (${(result.pfcValue / 1000).toFixed(2)} kA)`,
                description:
                  'This is the maximum current that would flow during a dead short circuit at this point. Every protective device downstream must be able to safely interrupt this current.',
              },
              {
                label: 'Breaking capacity assessment',
                value: `${result.assessmentLevel} level — minimum ${result.breakingCapacity} breaking capacity required`,
                description:
                  result.pfcValue < 6000
                    ? 'Standard 6kA MCBs are suitable for this PFC level. Most domestic consumer units use 6kA devices.'
                    : result.pfcValue < 10000
                      ? 'Standard 6kA MCBs may not be adequate. Specify 10kA or higher rated devices for this installation.'
                      : 'Very high fault level — specialist high breaking capacity devices required. Consider current-limiting devices or back-up protection.',
              },
            ]}
          />

          {/* ── What This Means ── */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">What Is PFC?</p>
                  <p className="text-sm text-white">
                    Prospective Fault Current is the maximum current that would flow if a dead short
                    circuit occurred at a given point. Think of it as the worst-case scenario —
                    every protective device must be able to safely interrupt this current without
                    exploding, arcing, or starting a fire.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">What Happens If You Get It Wrong</p>
                  <p className="text-sm text-white">
                    If the fault current exceeds the breaking capacity of the protective device, the
                    device cannot safely interrupt the fault. This can cause the device to arc
                    internally, weld its contacts shut, or blow apart — creating fire risk and
                    leaving the circuit unprotected.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Breaking Capacity Guide</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      6kA MCBs: Suitable for most domestic installations (PFC under 6000A)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      10kA MCBs: Commercial premises or installations close to a transformer
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      16kA+ devices: Large commercial/industrial — specialist assessment needed
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Typical Ze Values (DNO Supply)</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      TN-C-S (PME): 0.35Ω max — most modern UK domestic
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      TN-S (separate earth): 0.8Ω max — older properties with lead sheath earth
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      TT: Varies — check with DNO, earth electrode resistance dominates
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Regulation 434.5.2',
                      desc: 'PFC determination required at every relevant point',
                    },
                    {
                      reg: 'Regulation 432.1',
                      desc: 'Nature of protective devices — must have adequate breaking capacity',
                    },
                    { reg: 'Section 612.11', desc: 'PFC verification during initial verification' },
                    {
                      reg: 'GN3 Chapter 11',
                      desc: 'PFC testing — methods, instruments, and recording',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Prospective Fault Current"
        formula="PFC = Uo / Zs"
        variables={[
          { symbol: 'PFC', description: 'Fault current (A)' },
          { symbol: 'Uo', description: 'Nominal voltage to earth (V)' },
          { symbol: 'Zs', description: 'Earth fault loop impedance (Ω)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default PFCCalculator;
