import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  calculateFaultLevel,
  FaultLevelInputs,
  FaultLevelResult,
  CableSegment,
  TRANSFORMER_DATA,
} from '@/lib/fault-level';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

type SourceType = 'transformer' | 'supply';

interface CableSegmentState {
  id: string;
  label: string;
  size: string;
  length: string;
  material: 'cu' | 'al';
  installationMethod: string;
}

const CABLE_SIZES = [
  '1',
  '1.5',
  '2.5',
  '4',
  '6',
  '10',
  '16',
  '25',
  '35',
  '50',
  '70',
  '95',
  '120',
  '150',
  '185',
  '240',
  '300',
  '400',
];

const INSTALLATION_METHODS = [
  { value: 'A', label: 'A — Enclosed in insulation' },
  { value: 'B', label: 'B — Enclosed in conduit/trunking' },
  { value: 'C', label: 'C — Clipped direct' },
  { value: 'D', label: 'D — In ground' },
  { value: 'E', label: 'E — Free air (trefoil)' },
  { value: 'F', label: 'F — Free air (flat)' },
  { value: 'G', label: 'G — Spaced from surface' },
];

let segmentIdCounter = 0;
function createSegmentId(): string {
  segmentIdCounter += 1;
  return `seg-${segmentIdCounter}-${Date.now()}`;
}

function createDefaultSegment(index: number): CableSegmentState {
  return {
    id: createSegmentId(),
    label: `Cable segment ${index + 1}`,
    size: '25',
    length: '',
    material: 'cu',
    installationMethod: 'C',
  };
}

const FaultLevelCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<FaultLevelResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Source inputs
  const [sourceType, setSourceType] = useState<SourceType>('transformer');
  const [transformerKVA, setTransformerKVA] = useState('');
  const [transformerImpedance, setTransformerImpedance] = useState('');
  const [supplyZe, setSupplyZe] = useState('');
  const [systemVoltage, setSystemVoltage] = useState('400');

  // Cable segments
  const [segments, setSegments] = useState<CableSegmentState[]>([createDefaultSegment(0)]);

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Transformer options
  const transformerOptions = TRANSFORMER_DATA.map((t) => ({
    value: t.ratingKVA.toString(),
    label: `${t.ratingKVA} kVA (${t.fullLoadCurrent.toFixed(0)} A FLC)`,
  }));

  // Auto-fill impedance when transformer selection changes
  const handleTransformerChange = useCallback((kva: string) => {
    setTransformerKVA(kva);
    const spec = TRANSFORMER_DATA.find((t) => t.ratingKVA === parseFloat(kva));
    if (spec) {
      setTransformerImpedance(spec.typicalImpedancePercent.toString());
    }
    setResult(null);
    setError(null);
  }, []);

  // Cable segment management
  const handleAddSegment = useCallback(() => {
    setSegments((prev) => [...prev, createDefaultSegment(prev.length)]);
  }, []);

  const handleRemoveSegment = useCallback((id: string) => {
    setSegments((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const handleSegmentChange = useCallback(
    (id: string, field: keyof CableSegmentState, value: string) => {
      setSegments((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    },
    []
  );

  // Validation
  const canCalculate = useMemo(() => {
    if (sourceType === 'transformer') {
      if (!transformerKVA || !transformerImpedance) return false;
    } else {
      if (!supplyZe) return false;
    }
    if (!systemVoltage) return false;
    return segments.every((s) => s.size && s.length && parseFloat(s.length) > 0);
  }, [sourceType, transformerKVA, transformerImpedance, supplyZe, systemVoltage, segments]);

  const handleCalculate = useCallback(() => {
    setError(null);

    const cableSegments: CableSegment[] = segments.map((s) => ({
      label: s.label || 'Unnamed segment',
      size: parseFloat(s.size),
      length: parseFloat(s.length),
      material: s.material,
      installationMethod: s.installationMethod,
    }));

    const inputs: FaultLevelInputs = {
      sourceType,
      transformerKVA: sourceType === 'transformer' ? parseFloat(transformerKVA) : undefined,
      transformerImpedance:
        sourceType === 'transformer' ? parseFloat(transformerImpedance) : undefined,
      supplyZe: sourceType === 'supply' ? parseFloat(supplyZe) : undefined,
      systemVoltage: parseFloat(systemVoltage),
      cableSegments,
    };

    try {
      const res = calculateFaultLevel(inputs);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResult(null);
    }
  }, [sourceType, transformerKVA, transformerImpedance, supplyZe, systemVoltage, segments]);

  const handleReset = useCallback(() => {
    setSourceType('transformer');
    setTransformerKVA('');
    setTransformerImpedance('');
    setSupplyZe('');
    setSystemVoltage('400');
    setSegments([createDefaultSegment(0)]);
    setResult(null);
    setError(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;

    let text = 'Fault Level Calculation Results\n';
    text += `Source Impedance: ${result.sourceImpedance.toFixed(4)} \u03A9\n`;
    text += `Total Impedance: ${result.totalImpedance.toFixed(4)} \u03A9\n\n`;

    text += 'Fault Points:\n';
    for (const point of result.points) {
      text += `  ${point.label}\n`;
      text += `    Impedance: ${point.impedance.toFixed(4)} \u03A9 | Cumulative: ${point.cumulativeZ.toFixed(4)} \u03A9\n`;
      text += `    3-Phase: ${(point.faultCurrent3ph / 1000).toFixed(2)} kA | 1-Phase: ${point.faultCurrent1ph.toFixed(0)} A | PEN: ${point.faultCurrentPEN.toFixed(0)} A\n`;
      text += `    Breaking capacity: ${point.breakingCapacity} kA\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  // Highest fault level for badge
  const highestFault = useMemo(() => {
    if (!result || result.points.length === 0) return null;
    return result.points.reduce((max, p) => (p.faultCurrent3ph > max.faultCurrent3ph ? p : max));
  }, [result]);

  return (
    <CalculatorCard
      category={CAT}
      title="Fault Level Calculator"
      description="Calculate prospective fault currents at each distribution point per BS 7671"
    >
      {/* -- Source Type -- */}
      <CalculatorSection title="Source Type">
        <div className="grid grid-cols-2 gap-3">
          {(['transformer', 'supply'] as const).map((type) => (
            <Button
              key={type}
              type="button"
              variant="outline"
              onClick={() => {
                setSourceType(type);
                setResult(null);
                setError(null);
              }}
              className={cn(
                'h-12 rounded-xl font-medium transition-all touch-manipulation',
                sourceType === type
                  ? 'border-orange-500/50 bg-orange-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              )}
            >
              {type === 'transformer' ? 'Transformer' : 'Supply Ze'}
            </Button>
          ))}
        </div>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* -- Source Inputs -- */}
      {sourceType === 'transformer' ? (
        <CalculatorSection title="Transformer Details">
          <CalculatorSelect
            label="Transformer Rating"
            value={transformerKVA}
            onChange={handleTransformerChange}
            options={transformerOptions}
            placeholder="Select transformer"
          />
          <CalculatorInputGrid columns={2} className="grid-cols-2">
            <CalculatorInput
              label="Impedance (%)"
              unit="%"
              type="text"
              inputMode="decimal"
              value={transformerImpedance}
              onChange={(v) => {
                setTransformerImpedance(v);
                setResult(null);
              }}
              placeholder="e.g., 4.5"
              hint="Auto-fills from selection, editable"
            />
            <CalculatorInput
              label="System Voltage (Line-Line)"
              unit="V"
              type="text"
              inputMode="decimal"
              value={systemVoltage}
              onChange={(v) => {
                setSystemVoltage(v);
                setResult(null);
              }}
              placeholder="400"
            />
          </CalculatorInputGrid>
        </CalculatorSection>
      ) : (
        <CalculatorSection title="Supply Details">
          <CalculatorInputGrid columns={2} className="grid-cols-2">
            <CalculatorInput
              label="External Ze"
              unit={'\u03A9'}
              type="text"
              inputMode="decimal"
              value={supplyZe}
              onChange={(v) => {
                setSupplyZe(v);
                setResult(null);
              }}
              placeholder="e.g., 0.35"
              hint="External earth fault loop impedance"
            />
            <CalculatorInput
              label="System Voltage (Line-Line)"
              unit="V"
              type="text"
              inputMode="decimal"
              value={systemVoltage}
              onChange={(v) => {
                setSystemVoltage(v);
                setResult(null);
              }}
              placeholder="400"
            />
          </CalculatorInputGrid>
        </CalculatorSection>
      )}

      <CalculatorDivider category={CAT} />

      {/* -- Cable Segments -- */}
      <CalculatorSection title="Cable Segments">
        <div className="space-y-4">
          {segments.map((segment, index) => (
            <div key={segment.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Segment {index + 1}</h4>
                {segments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSegment(segment.id)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation h-11"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <CalculatorInput
                label="Label"
                type="text"
                value={segment.label}
                onChange={(v) => handleSegmentChange(segment.id, 'label', v)}
                placeholder="e.g., Sub-main to DB-A"
              />

              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorSelect
                  label="Cable Size"
                  value={segment.size}
                  onChange={(v) => handleSegmentChange(segment.id, 'size', v)}
                  options={CABLE_SIZES.map((s) => ({
                    value: s,
                    label: `${s} mm²`,
                  }))}
                />
                <CalculatorInput
                  label="Length"
                  unit="m"
                  type="text"
                  inputMode="decimal"
                  value={segment.length}
                  onChange={(v) => handleSegmentChange(segment.id, 'length', v)}
                  placeholder="e.g., 25"
                />
              </CalculatorInputGrid>

              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorSelect
                  label="Material"
                  value={segment.material}
                  onChange={(v) => handleSegmentChange(segment.id, 'material', v)}
                  options={[
                    { value: 'cu', label: 'Copper' },
                    { value: 'al', label: 'Aluminium' },
                  ]}
                />
                <CalculatorSelect
                  label="Install Method"
                  value={segment.installationMethod}
                  onChange={(v) => handleSegmentChange(segment.id, 'installationMethod', v)}
                  options={INSTALLATION_METHODS}
                />
              </CalculatorInputGrid>

              {index < segments.length - 1 && <CalculatorDivider category={CAT} />}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddSegment}
            className="w-full h-12 rounded-xl border-dashed border-white/20 text-white hover:bg-white/5 touch-manipulation"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Cable Segment
          </Button>
        </div>
      </CalculatorSection>

      {/* -- Error Display -- */}
      {error && (
        <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10">
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      {/* -- Calculate / Reset -- */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* -- Results -- */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={highestFault && highestFault.breakingCapacity > 16 ? 'warning' : 'pass'}
              label={
                highestFault
                  ? `Peak: ${(highestFault.faultCurrent3ph / 1000).toFixed(1)} kA (${highestFault.breakingCapacity} kA rated)`
                  : 'Calculated'
              }
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation h-11"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Summary values */}
          <ResultsGrid columns={2}>
            <ResultValue
              category={CAT}
              label="Source Impedance"
              value={result.sourceImpedance.toFixed(4)}
              unit={'\u03A9'}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Total Impedance"
              value={result.totalImpedance.toFixed(4)}
              unit={'\u03A9'}
              size="sm"
            />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* Fault points table */}
          <CalculatorSection title="Fault Levels at Each Point">
            <div className="space-y-3">
              {result.points.map((point, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 p-3 sm:p-4 space-y-3"
                  style={{
                    borderLeftWidth: '3px',
                    borderLeftColor: config.gradientFrom,
                    background: `${config.gradientFrom}05`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">{point.label}</h4>
                    <span
                      className="text-xs font-mono font-bold px-2 py-1 rounded-md"
                      style={{
                        background: `${config.gradientFrom}20`,
                        color: config.gradientFrom,
                      }}
                    >
                      {point.breakingCapacity} kA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-medium">Segment Z</p>
                      <p className="text-sm font-mono text-white">
                        {point.impedance.toFixed(4)} {'\u03A9'}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-medium">Cumulative Z</p>
                      <p className="text-sm font-mono text-white">
                        {point.cumulativeZ.toFixed(4)} {'\u03A9'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-medium">3-Phase</p>
                      <p className="text-sm font-mono text-white">
                        {(point.faultCurrent3ph / 1000).toFixed(2)} kA
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-medium">1-Phase</p>
                      <p className="text-sm font-mono text-white">
                        {point.faultCurrent1ph.toFixed(0)} A
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-medium">PEN Fault</p>
                      <p className="text-sm font-mono text-white">
                        {point.faultCurrentPEN.toFixed(0)} A
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* -- How It Worked Out -- */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Source impedance',
                formula:
                  sourceType === 'transformer'
                    ? `Z_source = (V\u00B2 / (kVA \u00D7 1000)) \u00D7 (Z% / 100) = (${systemVoltage}\u00B2 / (${transformerKVA} \u00D7 1000)) \u00D7 (${transformerImpedance} / 100)`
                    : `Z_source = Ze = ${supplyZe} \u03A9`,
                value: `${result.sourceImpedance.toFixed(4)} \u03A9`,
              },
              {
                label: 'Cable impedance per segment',
                formula: 'Z_cable = \u221A(R\u00B2 + X\u00B2) where R = (\u03C1 \u00D7 L) / A',
                description:
                  'Resistance from conductor resistivity and dimensions, reactance from cable geometry. Copper \u03C1 = 0.0178, aluminium \u03C1 = 0.0286 \u03A9\u00B7mm\u00B2/m at 20\u00B0C.',
              },
              {
                label: 'Three-phase fault current',
                formula: `I_fault_3ph = V / (\u221A3 \u00D7 Z_total) = ${systemVoltage} / (\u221A3 \u00D7 Z)`,
                description:
                  'Symmetrical three-phase fault current at each point, decreasing as cumulative impedance increases.',
              },
              {
                label: 'Single-phase fault current',
                formula: `I_fault_1ph = V_phase / Z_total = (${systemVoltage} / \u221A3) / Z`,
                description:
                  'Phase-to-earth fault current assuming the full impedance is in the fault loop.',
              },
              {
                label: 'PEN fault current (TN-C-S / PME)',
                formula: `I_fault_PEN = V_phase / (1.5 \u00D7 Z_total)`,
                description:
                  'Conservative estimate for combined neutral/earth conductor fault. The 1.5 factor accounts for shared return path impedance.',
              },
              {
                label: 'Breaking capacity required',
                value: `${highestFault ? highestFault.breakingCapacity : '-'} kA (highest point)`,
                description:
                  'Minimum rated breaking capacity per BS EN 60898 / BS EN 61009 standard ratings: 1.5, 3, 4.5, 6, 10, 16, 25, 36, 50 kA.',
              },
            ]}
          />

          {/* -- What This Means -- */}
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
                  <p className="text-sm text-white font-medium">Prospective Fault Current</p>
                  <p className="text-sm text-white">
                    The prospective fault current (PSCC) is the maximum current that would flow
                    during a short circuit at any given point in the installation. It decreases as
                    you move further from the source because cable impedance increases.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Breaking Capacity</p>
                  <p className="text-sm text-white">
                    Every protective device must have a rated short-circuit capacity not less than
                    the prospective fault current at its point of installation. If the fault level
                    exceeds the device rating, the device may fail to interrupt the fault safely.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Practical Considerations</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Fault levels are highest closest to the transformer or supply point
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Longer cable runs and smaller conductors reduce fault levels at the load end
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Always verify transformer nameplate impedance rather than relying on typical
                      values
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Aluminium conductors have higher resistivity than copper, giving lower fault
                      levels for the same cable size
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* -- BS 7671 Reference -- */}
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
                      reg: 'Regulation 434.2',
                      desc: 'Prospective fault current shall be determined at every relevant point',
                    },
                    {
                      reg: 'Regulation 434.5.1',
                      desc: 'Breaking capacity of protective devices shall not be less than the prospective fault current',
                    },
                    {
                      reg: 'Regulation 612.11',
                      desc: 'Measurement of prospective fault current and verification',
                    },
                    {
                      reg: 'IEC 60909',
                      desc: 'Short-circuit currents in three-phase AC systems \u2014 standardised calculation method',
                    },
                    {
                      reg: 'BS EN 60898',
                      desc: 'Standard breaking capacity ratings for MCBs \u2014 1.5, 3, 4.5, 6, 10, 16, 25 kA',
                    },
                    {
                      reg: 'BS EN 61009',
                      desc: 'Standard breaking capacity ratings for RCBOs',
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
        name="Fault Level Formulas"
        formula={'I\u2083\u03C6 = V / (\u221A3 \u00D7 Z)'}
        variables={[
          {
            symbol: 'I\u2083\u03C6',
            description: 'Three-phase symmetrical fault current (A)',
          },
          { symbol: 'V', description: 'Line-to-line voltage (V)' },
          {
            symbol: 'Z',
            description: 'Total impedance from source to fault point (\u03A9)',
          },
          {
            symbol: 'Z_source',
            description: '(V\u00B2 / (kVA \u00D7 1000)) \u00D7 (Z% / 100) for transformers',
          },
          {
            symbol: 'Z_cable',
            description: '\u221A(R\u00B2 + X\u00B2) per cable segment (\u03A9)',
          },
        ]}
      />
    </CalculatorCard>
  );
};

export default FaultLevelCalculator;
