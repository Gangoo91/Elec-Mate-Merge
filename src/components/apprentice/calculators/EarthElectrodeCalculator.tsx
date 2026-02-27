import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
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
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

interface ElectrodeResult {
  singleRodResistance: number;
  totalResistance: number;
  meetsTarget: boolean;
  recommendations: string[];
  requiredLength?: number;
  resistivity: number;
  length: number;
  diameter: number;
  rods: number;
  spacing: number;
  target: number;
}

// Soil resistivity values (Ωm) - typical UK values
const soilTypes = {
  'clay-wet': { name: 'Wet clay', resistivity: 20, range: '10-30' },
  'clay-dry': { name: 'Dry clay', resistivity: 100, range: '50-150' },
  loam: { name: 'Loam/garden soil', resistivity: 50, range: '30-100' },
  'sand-wet': { name: 'Wet sand', resistivity: 200, range: '100-300' },
  'sand-dry': { name: 'Dry sand', resistivity: 1000, range: '500-2000' },
  gravel: { name: 'Gravel', resistivity: 400, range: '200-800' },
  chalk: { name: 'Chalk', resistivity: 100, range: '50-200' },
  rock: { name: 'Rock', resistivity: 2000, range: '1000-5000' },
  custom: { name: 'Custom value', resistivity: 0, range: 'Enter value' },
};

// Standard electrode dimensions
const electrodeDiameters = {
  '16': { name: '16mm rod', diameter: 0.016 },
  '19': { name: '19mm rod (common)', diameter: 0.019 },
  '25': { name: '25mm rod', diameter: 0.025 },
  '50x50': { name: '50×50mm angle', diameter: 0.05 },
};

const EarthElectrodeCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<ElectrodeResult | null>(null);

  // Inputs
  const [soilType, setSoilType] = useState<string>('loam');
  const [customResistivity, setCustomResistivity] = useState<string>('');
  const [electrodeLength, setElectrodeLength] = useState<string>('2.4');
  const [electrodeDiameter, setElectrodeDiameter] = useState<string>('19');
  const [numberOfRods, setNumberOfRods] = useState<string>('1');
  const [rodSpacing, setRodSpacing] = useState<string>('3');
  const [targetResistance, setTargetResistance] = useState<string>('200');

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const soilTypeOptions = Object.entries(soilTypes).map(([key, soil]) => ({
    value: key,
    label: `${soil.name} (${soil.range} Ωm)`,
  }));

  const diameterOptions = Object.entries(electrodeDiameters).map(([key, rod]) => ({
    value: key,
    label: rod.name,
  }));

  const canCalculate = () => {
    if (soilType === 'custom' && !customResistivity) return false;
    return !!(electrodeLength && electrodeDiameter && numberOfRods && targetResistance);
  };

  const handleCalculate = useCallback(() => {
    const length = parseFloat(electrodeLength);
    const diameter =
      electrodeDiameters[electrodeDiameter as keyof typeof electrodeDiameters]?.diameter;
    const rods = parseInt(numberOfRods);
    const spacing = parseFloat(rodSpacing);
    const target = parseFloat(targetResistance);

    if (!length || !diameter || !rods) return;

    let resistivity: number;
    if (soilType === 'custom') {
      resistivity = parseFloat(customResistivity);
      if (!resistivity) return;
    } else {
      resistivity = soilTypes[soilType as keyof typeof soilTypes]?.resistivity || 50;
    }

    // Single rod resistance: R = (ρ / 2πL) × ln(4L/d)
    const singleRodResistance =
      (resistivity / (2 * Math.PI * length)) * Math.log((4 * length) / diameter);

    // Parallel rod reduction factor (Schwarz formula simplification)
    let totalResistance: number;
    if (rods === 1) {
      totalResistance = singleRodResistance;
    } else {
      const spacingFactor = spacing / length;
      let parallelFactor: number;
      if (spacingFactor >= 2) {
        parallelFactor = 1 / rods;
      } else {
        const k = 0.6 * (1 - spacingFactor / 2);
        parallelFactor = (1 + k * (rods - 1)) / rods;
      }
      totalResistance = singleRodResistance * parallelFactor;
    }

    const meetsTarget = totalResistance <= target;

    const recommendations: string[] = [];
    if (!meetsTarget) {
      const requiredLength = (resistivity / (2 * Math.PI * target)) * Math.log((4 * 3) / diameter);
      if (requiredLength < 6) {
        recommendations.push(`Increase rod length to approximately ${requiredLength.toFixed(1)}m`);
      }
      recommendations.push('Add parallel rods with minimum 3m spacing');
      recommendations.push('Consider improving soil conductivity with bentonite or marconite');
      if (soilType === 'sand-dry' || soilType === 'rock') {
        recommendations.push('Consider relocating electrode to area with lower resistivity soil');
      }
    } else {
      recommendations.push('Earth electrode meets target resistance');
      if (totalResistance < target * 0.5) {
        recommendations.push('Good margin — system is well earthed');
      }
    }

    let requiredLength: number | undefined;
    if (!meetsTarget && rods === 1) {
      let testLength = length;
      for (let i = 0; i < 10; i++) {
        const testR =
          (resistivity / (2 * Math.PI * testLength)) * Math.log((4 * testLength) / diameter);
        if (testR <= target) break;
        testLength += 0.5;
      }
      requiredLength = testLength;
    }

    setResult({
      singleRodResistance,
      totalResistance,
      meetsTarget,
      recommendations,
      requiredLength,
      resistivity,
      length,
      diameter,
      rods,
      spacing,
      target,
    });
  }, [
    soilType,
    customResistivity,
    electrodeLength,
    electrodeDiameter,
    numberOfRods,
    rodSpacing,
    targetResistance,
  ]);

  const handleReset = useCallback(() => {
    setSoilType('loam');
    setCustomResistivity('');
    setElectrodeLength('2.4');
    setElectrodeDiameter('19');
    setNumberOfRods('1');
    setRodSpacing('3');
    setTargetResistance('200');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `Earth Electrode Resistance\nTotal: ${result.totalResistance.toFixed(1)} Ω`;
    text += `\nSingle Rod: ${result.singleRodResistance.toFixed(1)} Ω`;
    text += `\nSoil Resistivity: ${result.resistivity} Ωm`;
    text += `\nTarget: ≤${result.target} Ω`;
    text += `\nStatus: ${result.meetsTarget ? 'MEETS TARGET' : 'EXCEEDS TARGET'}`;
    if (result.rods > 1) {
      text += `\nRods: ${result.rods} at ${result.spacing}m spacing`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Earth Electrode Calculator"
      description="Calculate earth rod resistance for TT systems per BS 7671 Section 542"
    >
      {/* Soil Type */}
      <CalculatorSelect
        label="Soil Type"
        value={soilType}
        onChange={setSoilType}
        options={soilTypeOptions}
      />

      {soilType === 'custom' && (
        <CalculatorInput
          label="Soil Resistivity"
          unit="Ωm"
          type="text"
          inputMode="decimal"
          value={customResistivity}
          onChange={setCustomResistivity}
          placeholder="e.g., 75"
          hint="Measure with earth resistivity meter"
        />
      )}

      {/* Electrode Details */}
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Rod Length"
          unit="m"
          type="text"
          inputMode="decimal"
          value={electrodeLength}
          onChange={setElectrodeLength}
          placeholder="2.4"
        />
        <CalculatorSelect
          label="Rod Type"
          value={electrodeDiameter}
          onChange={setElectrodeDiameter}
          options={diameterOptions}
        />
      </CalculatorInputGrid>

      {/* Multiple Rods */}
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Number of Rods"
          type="text"
          inputMode="numeric"
          value={numberOfRods}
          onChange={setNumberOfRods}
          placeholder="1"
        />
        {parseInt(numberOfRods) > 1 && (
          <CalculatorInput
            label="Rod Spacing"
            unit="m"
            type="text"
            inputMode="decimal"
            value={rodSpacing}
            onChange={setRodSpacing}
            placeholder="3"
            hint="Min 2× rod length"
          />
        )}
      </CalculatorInputGrid>

      {/* Target Resistance */}
      <CalculatorInput
        label="Target Resistance"
        unit="Ω"
        type="text"
        inputMode="decimal"
        value={targetResistance}
        onChange={setTargetResistance}
        placeholder="200"
        hint="TT systems typically need Ra × Ia ≤ 50V"
      />

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate()}
        calculateLabel="Calculate Resistance"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.meetsTarget ? 'pass' : 'fail'}
              label={result.meetsTarget ? 'Meets Target' : 'Exceeds Target'}
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
            <p className="text-sm font-medium text-white mb-1">Total Resistance</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.totalResistance.toFixed(1)} Ω
            </p>
            <p className="text-sm text-white mt-2">Target: ≤{result.target} Ω</p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Single Rod"
              value={result.singleRodResistance.toFixed(1)}
              unit="Ω"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Soil Resistivity"
              value={result.resistivity.toString()}
              unit="Ωm"
              category={CAT}
              size="sm"
            />
            {result.rods > 1 && (
              <ResultValue
                label="Rods in Parallel"
                value={result.rods.toString()}
                category={CAT}
                size="sm"
              />
            )}
            {result.requiredLength && (
              <ResultValue
                label="Required Length"
                value={result.requiredLength.toFixed(1)}
                unit="m"
                category={CAT}
                size="sm"
              />
            )}
          </ResultsGrid>

          {/* Pass/fail comparison */}
          <div
            className={cn(
              'flex items-center justify-between p-3 rounded-lg border text-sm',
              result.meetsTarget
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-red-500/5 border-red-500/20'
            )}
          >
            <div className="flex items-center gap-2">
              {result.meetsTarget ? (
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
              )}
              <span className="text-white font-medium">
                {result.meetsTarget ? 'Compliant' : 'Action Required'}
              </span>
            </div>
            <span className="text-white shrink-0 ml-2">
              {result.totalResistance.toFixed(1)} / {result.target} Ω
            </span>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="space-y-1.5">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-white">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: config.gradientFrom }}
                  />
                  {rec}
                </div>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Input values',
                formula: `ρ = ${result.resistivity} Ωm | L = ${result.length}m | d = ${result.diameter}m | Target ≤ ${result.target} Ω`,
                description: `Soil resistivity ρ is the key factor — it varies hugely by soil type and moisture content. Your ${soilType === 'custom' ? 'custom' : soilTypes[soilType as keyof typeof soilTypes]?.name || 'selected'} soil has ρ = ${result.resistivity} Ωm.`,
              },
              {
                label: 'Single rod resistance',
                formula: `R = (ρ / 2πL) × ln(4L/d) = (${result.resistivity} / 2π × ${result.length}) × ln(4 × ${result.length} / ${result.diameter})`,
                value: `${result.singleRodResistance.toFixed(1)} Ω`,
                description:
                  'The formula models how current flows radially outward from the rod into the surrounding soil. Longer rods reach deeper soil (often wetter) and have more surface area, both reducing resistance.',
              },
              ...(result.rods > 1
                ? [
                    {
                      label: 'Parallel reduction',
                      formula: `${result.rods} rods at ${result.spacing}m spacing → parallel factor applied to ${result.singleRodResistance.toFixed(1)} Ω`,
                      value: `${result.totalResistance.toFixed(1)} Ω`,
                      description:
                        result.spacing / result.length >= 2
                          ? `Rods spaced at ${result.spacing}m (≥ 2× rod length) — near ideal parallel reduction. Each rod has its own resistance zone with minimal overlap.`
                          : `Rods spaced at ${result.spacing}m (< 2× rod length) — resistance zones overlap, reducing efficiency. Ideal spacing is at least ${(result.length * 2).toFixed(1)}m for these rods.`,
                    },
                  ]
                : []),
              {
                label: 'Compare with target',
                formula: `${result.totalResistance.toFixed(1)} Ω ${result.meetsTarget ? '≤' : '>'} ${result.target} Ω`,
                value: result.meetsTarget ? 'MEETS TARGET' : 'EXCEEDS TARGET — action required',
                description: result.meetsTarget
                  ? `Result is ${((1 - result.totalResistance / result.target) * 100).toFixed(0)}% below your target — good margin for seasonal variation.`
                  : 'Earth electrode resistance is too high. Consider longer rods, additional parallel rods, or soil treatment to reduce resistance.',
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
                  <p className="text-sm text-white font-medium">
                    Why Earth Electrode Resistance Matters
                  </p>
                  <p className="text-sm text-white">
                    In a TT system, the earth fault return path goes through the general mass of
                    earth via your electrode. If the electrode resistance is too high, not enough
                    fault current flows to trip the RCD quickly — leaving dangerous touch voltages
                    on exposed metalwork.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Touch voltage safety: Ra × Ia must not exceed 50V — if it does, someone
                      touching exposed metalwork during a fault could receive a dangerous shock
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      RCD operation: High earth resistance means less fault current flows, which can
                      slow or prevent RCD tripping
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Seasonal variation: Dry summers can double earth resistance — always test in
                      worst-case conditions or allow a safety margin
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Maximum Ra with Common RCDs</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      30mA RCD: Ra ≤ 1667Ω (50V ÷ 0.03A) — easy to achieve, covers most domestic
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      100mA RCD: Ra ≤ 500Ω (50V ÷ 0.1A) — achievable with good soil and standard
                      rods
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      300mA RCD: Ra ≤ 167Ω (50V ÷ 0.3A) — may need multiple rods in poor soil
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Improving Poor Results</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Longer rods: Each extra metre of depth significantly reduces resistance,
                      especially in layered soil
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Parallel rods: Space at least 2× the rod length apart for best reduction —
                      closer rods share the same soil and give diminishing returns
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Soil treatment: Bentonite or marconite backfill around the rod reduces local
                      resistivity — useful in sandy or rocky ground
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Relocate: If soil is very poor (rock, dry sand), moving the electrode to a
                      damper location with better soil can be more effective than adding rods
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
                      reg: 'Regulation 542.2',
                      desc: 'Earth electrode requirements — shall maintain resistance under varying conditions',
                    },
                    {
                      reg: 'Regulation 411.5.3',
                      desc: 'TT systems — Ra × Ia ≤ 50V where Ra is the sum of earth electrode and protective conductor resistance',
                    },
                    {
                      reg: 'Regulation 612.7',
                      desc: 'Earth electrode resistance measurement requirements',
                    },
                    {
                      reg: 'GN3 Chapter 9',
                      desc: 'Earth electrode testing — methods and instruments',
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
        name="Earth Electrode Resistance"
        formula="R = (ρ / 2πL) × ln(4L/d)"
        variables={[
          { symbol: 'R', description: 'Earth electrode resistance (Ω)' },
          { symbol: 'ρ', description: 'Soil resistivity (Ωm)' },
          { symbol: 'L', description: 'Electrode length (m)' },
          { symbol: 'd', description: 'Electrode diameter (m)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default EarthElectrodeCalculator;
