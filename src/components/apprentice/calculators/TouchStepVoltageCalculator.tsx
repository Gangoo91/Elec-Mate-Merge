import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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
  calculateTouchStepVoltage,
  TouchStepInputs,
  TouchStepResult,
  SOIL_PRESETS,
} from '@/lib/touch-step-voltage';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const SOIL_OPTIONS = Object.entries(SOIL_PRESETS).map(([key, value]) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1)} (${value} \u03A9\u00B7m)`,
}));

const ELECTRODE_OPTIONS = [
  { value: 'rod', label: 'Driven Rod' },
  { value: 'plate', label: 'Buried Plate' },
  { value: 'strip', label: 'Horizontal Strip / Tape' },
  { value: 'mesh', label: 'Mesh / Grid' },
];

const FAULT_DURATION_OPTIONS = [
  { value: '0.1', label: '0.1 s' },
  { value: '0.2', label: '0.2 s' },
  { value: '0.4', label: '0.4 s' },
  { value: '1.0', label: '1.0 s' },
  { value: '5.0', label: '5.0 s' },
];

const CONTACT_OPTIONS = [
  { value: 'touch', label: 'Touch (hand-to-foot)' },
  { value: 'step', label: 'Step (foot-to-foot)' },
];

const TouchStepVoltageCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Inputs
  const [earthFaultCurrent, setEarthFaultCurrent] = useState('');
  const [soilResistivity, setSoilResistivity] = useState('');
  const [soilPreset, setSoilPreset] = useState('');
  const [electrodeType, setElectrodeType] = useState<'rod' | 'plate' | 'strip' | 'mesh'>('rod');

  // Rod dimensions
  const [rodLength, setRodLength] = useState('2.4');
  const [rodDiameter, setRodDiameter] = useState('0.016');

  // Plate dimensions
  const [plateArea, setPlateArea] = useState('0.5');

  // Strip dimensions
  const [stripLength, setStripLength] = useState('10');
  const [stripWidth, setStripWidth] = useState('0.025');
  const [stripDepth, setStripDepth] = useState('0.6');

  // Mesh dimensions
  const [meshArea, setMeshArea] = useState('100');
  const [meshTotalLength, setMeshTotalLength] = useState('60');

  const [faultDuration, setFaultDuration] = useState('0.4');
  const [contactScenario, setContactScenario] = useState<'touch' | 'step'>('touch');
  const [bodyImpedance, setBodyImpedance] = useState('1000');

  // Result
  const [result, setResult] = useState<TouchStepResult | null>(null);

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showFormulae, setShowFormulae] = useState(false);

  const handleSoilPreset = useCallback((preset: string) => {
    setSoilPreset(preset);
    if (preset && SOIL_PRESETS[preset]) {
      setSoilResistivity(String(SOIL_PRESETS[preset]));
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result) return;

    const lines = [
      'Touch & Step Voltage Calculation',
      '================================',
      `Electrode Resistance: ${result.electrodeResistance} \u03A9`,
      `Earth Potential Rise: ${result.earthPotentialRise} V`,
      `Touch Voltage: ${result.touchVoltage} V (Permissible: ${result.permissibleTouchVoltage} V)`,
      `Step Voltage: ${result.stepVoltage} V (Permissible: ${result.permissibleStepVoltage} V)`,
      `Body Current: ${result.bodyCurrent} mA`,
      `Physiological Zone: ${result.physiologicalZone}`,
      `Result: ${result.passOrFail.toUpperCase()}`,
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      toast({ title: 'Copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  }, [result, toast]);

  const buildDimensions = useCallback(() => {
    switch (electrodeType) {
      case 'rod':
        return {
          length: parseFloat(rodLength) || 2.4,
          diameter: parseFloat(rodDiameter) || 0.016,
        };
      case 'plate':
        return {
          area: parseFloat(plateArea) || 0.5,
        };
      case 'strip':
        return {
          length: parseFloat(stripLength) || 10,
          diameter: parseFloat(stripWidth) || 0.025,
          depth: parseFloat(stripDepth) || 0.6,
        };
      case 'mesh':
        return {
          area: parseFloat(meshArea) || 100,
          length: parseFloat(meshTotalLength) || 60,
        };
    }
  }, [
    electrodeType,
    rodLength,
    rodDiameter,
    plateArea,
    stripLength,
    stripWidth,
    stripDepth,
    meshArea,
    meshTotalLength,
  ]);

  const calculate = useCallback(() => {
    const inputs: TouchStepInputs = {
      earthFaultCurrent: parseFloat(earthFaultCurrent),
      soilResistivity: parseFloat(soilResistivity),
      electrodeType,
      electrodeDimensions: buildDimensions(),
      faultDuration: parseFloat(faultDuration),
      contactScenario,
      bodyImpedance: parseFloat(bodyImpedance) || 1000,
    };

    const calculated = calculateTouchStepVoltage(inputs);
    setResult(calculated);
  }, [
    earthFaultCurrent,
    soilResistivity,
    electrodeType,
    buildDimensions,
    faultDuration,
    contactScenario,
    bodyImpedance,
  ]);

  const reset = useCallback(() => {
    setEarthFaultCurrent('');
    setSoilResistivity('');
    setSoilPreset('');
    setElectrodeType('rod');
    setRodLength('2.4');
    setRodDiameter('0.016');
    setPlateArea('0.5');
    setStripLength('10');
    setStripWidth('0.025');
    setStripDepth('0.6');
    setMeshArea('100');
    setMeshTotalLength('60');
    setFaultDuration('0.4');
    setContactScenario('touch');
    setBodyImpedance('1000');
    setResult(null);
    setCopied(false);
  }, []);

  const canCalculate = !!(earthFaultCurrent && soilResistivity && faultDuration);

  const getFormulaSteps = useCallback(() => {
    if (!result) return [];

    const steps = [];

    // Electrode resistance formula
    switch (electrodeType) {
      case 'rod':
        steps.push({
          label: 'Electrode Resistance (Driven Rod)',
          formula: `R = \u03C1 / (2\u03C0L) \u00D7 ln(4L / d)`,
          value: `${result.electrodeResistance} \u03A9`,
          description: `\u03C1 = ${soilResistivity} \u03A9\u00B7m, L = ${rodLength} m, d = ${rodDiameter} m`,
        });
        break;
      case 'plate':
        steps.push({
          label: 'Electrode Resistance (Buried Plate)',
          formula: `R = \u03C1 / (4 \u00D7 \u221A(A / \u03C0))`,
          value: `${result.electrodeResistance} \u03A9`,
          description: `\u03C1 = ${soilResistivity} \u03A9\u00B7m, A = ${plateArea} m\u00B2`,
        });
        break;
      case 'strip':
        steps.push({
          label: 'Electrode Resistance (Horizontal Strip)',
          formula: `R = (\u03C1 / (\u03C0L)) \u00D7 ln(2L\u00B2 / (w \u00D7 d))`,
          value: `${result.electrodeResistance} \u03A9`,
          description: `\u03C1 = ${soilResistivity} \u03A9\u00B7m, L = ${stripLength} m, w = ${stripWidth} m, d = ${stripDepth} m`,
        });
        break;
      case 'mesh':
        steps.push({
          label: 'Electrode Resistance (Mesh / Grid)',
          formula: `R = \u03C1 / (4r) + \u03C1 / L where r = \u221A(A / \u03C0)`,
          value: `${result.electrodeResistance} \u03A9`,
          description: `\u03C1 = ${soilResistivity} \u03A9\u00B7m, A = ${meshArea} m\u00B2, L = ${meshTotalLength} m`,
        });
        break;
    }

    steps.push(
      {
        label: 'Earth Potential Rise (EPR)',
        formula: `EPR = If \u00D7 Re = ${earthFaultCurrent} \u00D7 ${result.electrodeResistance}`,
        value: `${result.earthPotentialRise} V`,
      },
      {
        label: 'Touch Voltage',
        formula: `Vt = EPR \u00D7 0.7 = ${result.earthPotentialRise} \u00D7 0.7`,
        value: `${result.touchVoltage} V`,
        description: 'BS EN 50522 simplified approach (70% of EPR)',
      },
      {
        label: 'Step Voltage',
        formula: `Vs = EPR \u00D7 0.2 = ${result.earthPotentialRise} \u00D7 0.2`,
        value: `${result.stepVoltage} V`,
        description: 'ENA TS 41-24 (20% of EPR)',
      },
      {
        label: 'Body Current',
        formula: `Ib = V${contactScenario === 'touch' ? 't' : 's'} / Zb = ${contactScenario === 'touch' ? result.touchVoltage : result.stepVoltage} / ${bodyImpedance || 1000}`,
        value: `${result.bodyCurrent} mA`,
        description: `IEC 60479 body impedance: ${bodyImpedance || 1000} \u03A9`,
      }
    );

    return steps;
  }, [
    result,
    electrodeType,
    soilResistivity,
    rodLength,
    rodDiameter,
    plateArea,
    stripLength,
    stripWidth,
    stripDepth,
    meshArea,
    meshTotalLength,
    earthFaultCurrent,
    contactScenario,
    bodyImpedance,
  ]);

  return (
    <CalculatorCard
      category={CAT}
      title="Touch & Step Voltage Calculator"
      description="Assess touch and step voltages for earthing installations per BS 7671, BS EN 50522 and ENA TS 41-24"
    >
      {/* Fault Parameters */}
      <CalculatorSection title="Fault Parameters">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Earth Fault Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={earthFaultCurrent}
            onChange={setEarthFaultCurrent}
            placeholder="1000"
          />
          <CalculatorSelect
            label="Fault Duration"
            value={faultDuration}
            onChange={setFaultDuration}
            options={FAULT_DURATION_OPTIONS}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Soil & Electrode */}
      <CalculatorSection title="Soil & Electrode">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Soil Type Preset"
            value={soilPreset}
            onChange={handleSoilPreset}
            options={[{ value: 'custom', label: 'Custom value' }, ...SOIL_OPTIONS]}
            placeholder="Select soil type..."
          />
          <CalculatorInput
            label="Soil Resistivity"
            unit={'\u03A9\u00B7m'}
            type="text"
            inputMode="decimal"
            value={soilResistivity}
            onChange={(val) => {
              setSoilResistivity(val);
              setSoilPreset('');
            }}
            placeholder="100"
          />
        </CalculatorInputGrid>

        <CalculatorSelect
          label="Electrode Type"
          value={electrodeType}
          onChange={(val) => setElectrodeType(val as 'rod' | 'plate' | 'strip' | 'mesh')}
          options={ELECTRODE_OPTIONS}
        />

        {/* Conditional dimension fields */}
        {electrodeType === 'rod' && (
          <CalculatorInputGrid columns={2} className="grid-cols-2">
            <CalculatorInput
              label="Rod Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={rodLength}
              onChange={setRodLength}
              placeholder="2.4"
              hint="Typical: 2.4 m"
            />
            <CalculatorInput
              label="Rod Diameter"
              unit="m"
              type="text"
              inputMode="decimal"
              value={rodDiameter}
              onChange={setRodDiameter}
              placeholder="0.016"
              hint="Typical: 0.016 m (16 mm)"
            />
          </CalculatorInputGrid>
        )}

        {electrodeType === 'plate' && (
          <CalculatorInput
            label="Plate Area"
            unit="m\u00B2"
            type="text"
            inputMode="decimal"
            value={plateArea}
            onChange={setPlateArea}
            placeholder="0.5"
            hint="Surface area of buried plate"
          />
        )}

        {electrodeType === 'strip' && (
          <CalculatorInputGrid columns={3} className="grid-cols-3">
            <CalculatorInput
              label="Strip Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={stripLength}
              onChange={setStripLength}
              placeholder="10"
            />
            <CalculatorInput
              label="Strip Width"
              unit="m"
              type="text"
              inputMode="decimal"
              value={stripWidth}
              onChange={setStripWidth}
              placeholder="0.025"
              hint="Typical: 25 mm tape"
            />
            <CalculatorInput
              label="Burial Depth"
              unit="m"
              type="text"
              inputMode="decimal"
              value={stripDepth}
              onChange={setStripDepth}
              placeholder="0.6"
              hint="Typical: 600 mm"
            />
          </CalculatorInputGrid>
        )}

        {electrodeType === 'mesh' && (
          <CalculatorInputGrid columns={2} className="grid-cols-2">
            <CalculatorInput
              label="Mesh Area"
              unit="m\u00B2"
              type="text"
              inputMode="decimal"
              value={meshArea}
              onChange={setMeshArea}
              placeholder="100"
              hint="e.g. 10 m x 10 m = 100 m\u00B2"
            />
            <CalculatorInput
              label="Total Conductor Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={meshTotalLength}
              onChange={setMeshTotalLength}
              placeholder="60"
              hint="Total run of conductor in mesh"
            />
          </CalculatorInputGrid>
        )}
      </CalculatorSection>

      {/* Contact Scenario */}
      <CalculatorSection title="Contact Scenario">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Contact Type"
            value={contactScenario}
            onChange={(val) => setContactScenario(val as 'touch' | 'step')}
            options={CONTACT_OPTIONS}
          />
          <CalculatorInput
            label="Body Impedance"
            unit={'\u03A9'}
            type="text"
            inputMode="decimal"
            value={bodyImpedance}
            onChange={setBodyImpedance}
            placeholder="1000"
            hint="IEC 60479 default: 1000 \u03A9"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={calculate}
        onReset={reset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate"
      />

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <ResultBadge
              status={result.passOrFail === 'pass' ? 'pass' : 'fail'}
              label={
                result.passOrFail === 'pass' ? 'PASS — Within Limits' : 'FAIL — Exceeds Limits'
              }
            />
            <ResultBadge
              status={
                result.bodyCurrent < 0.5
                  ? 'pass'
                  : result.bodyCurrent <= 10
                    ? 'info'
                    : result.bodyCurrent <= 100
                      ? 'warning'
                      : 'fail'
              }
              label={result.physiologicalZone}
            />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-white/10 text-white hover:bg-white/5 touch-manipulation transition-all h-11 sm:h-auto"
              aria-label="Copy results"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Primary results */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Electrode Resistance"
              value={`${result.electrodeResistance}`}
              unit={'\u03A9'}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Earth Potential Rise"
              value={`${result.earthPotentialRise}`}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Touch Voltage"
              value={`${result.touchVoltage}`}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Step Voltage"
              value={`${result.stepVoltage}`}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Permissible Touch Voltage"
              value={`${result.permissibleTouchVoltage}`}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Permissible Step Voltage"
              value={`${result.permissibleStepVoltage}`}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Body Current"
              value={`${result.bodyCurrent}`}
              unit="mA"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* Calculation steps */}
          <CalculatorFormula
            category={CAT}
            steps={getFormulaSteps()}
            title="How It Worked Out"
            defaultOpen
          />

          {/* What This Means */}
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
                  <p className="text-sm text-white font-medium">Touch and Step Voltages</p>
                  <p className="text-sm text-white">
                    During an earth fault, current flows through the soil around the electrode
                    creating a voltage gradient. Touch voltage is the potential difference between
                    the earthed equipment and the ground at arm's reach. Step voltage is the
                    difference between two feet 1m apart near the electrode.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">IEC 60479 Physiological Effects</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Zone 1 (&lt;0.5 mA): No reaction — below perception threshold
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Zone 2 (0.5–10 mA): Perception, tingling — no harmful effects
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Zone 3 (10–100 mA): Muscular contractions — "can't let go" effect, potential
                      breathing difficulty
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Zone 4 (&gt;100 mA): Ventricular fibrillation risk — potentially lethal
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Reducing Touch and Step Voltages</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Lower electrode resistance: use longer rods, parallel rods, or mesh grids
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Faster fault clearance: reduces permissible voltage thresholds
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Surface treatment: crushed rock or insulating matting around substations
                      raises step resistance
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Formula references */}
          <Collapsible open={showFormulae} onOpenChange={setShowFormulae}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Key Formulae</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showFormulae && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-3">
              <FormulaReference
                category={CAT}
                name="Driven Rod Resistance"
                formula="R = \u03C1 / (2\u03C0L) \u00D7 ln(4L / d)"
                variables={[
                  { symbol: '\u03C1', description: 'Soil resistivity (\u03A9\u00B7m)' },
                  { symbol: 'L', description: 'Rod driven length (m)' },
                  { symbol: 'd', description: 'Rod diameter (m)' },
                ]}
              />
              <FormulaReference
                category={CAT}
                name="Touch Voltage"
                formula="Vt = EPR \u00D7 0.7"
                variables={[
                  { symbol: 'EPR', description: 'Earth Potential Rise = If \u00D7 Re' },
                  { symbol: '0.7', description: 'BS EN 50522 touch voltage factor' },
                ]}
              />
              <FormulaReference
                category={CAT}
                name="Step Voltage"
                formula="Vs = EPR \u00D7 0.2"
                variables={[
                  { symbol: 'EPR', description: 'Earth Potential Rise = If \u00D7 Re' },
                  { symbol: '0.2', description: 'ENA TS 41-24 step voltage factor' },
                ]}
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Standards references */}
          <div
            className="rounded-xl border p-4 space-y-2"
            style={{
              borderColor: `${config.gradientFrom}15`,
              background: `${config.gradientFrom}05`,
            }}
          >
            <p className="text-sm font-medium text-white">Standards References</p>
            <ul className="space-y-1">
              {[
                'BS 7671:2018+A2:2022 Sections 411 & 412 — Protection against electric shock',
                'BS EN 50522 — Earthing of power installations exceeding 1 kV AC',
                'ENA TS 41-24 — Guidelines for main earthing systems in substations',
                'IEC 60479-1 — Effects of current on human beings and livestock',
              ].map((ref, i) => (
                <li key={i} className="text-xs text-white flex items-start gap-2">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: config.gradientFrom }}
                  />
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
};

export default TouchStepVoltageCalculator;
