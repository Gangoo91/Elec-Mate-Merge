import { useState } from 'react';
import { Calculator, Info, AlertTriangle, CheckCircle2, BookOpen, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
// FIX (consolidation): cable overall diameters / cross-sectional areas were inlined here and
// disagreed with the shared module on every row. Cable OD is manufacturer data, not BS 7671 data,
// so there must be ONE copy. Source of truth: src/lib/calculators/bs7671-data/trunkingData.ts.
import { singlesPvc, getCableCSA } from '@/lib/calculators/bs7671-data/trunkingData';
// FIX: grouping (Cg) was never applied. Table 4C1 is held correctly in the shared module — import
// it rather than re-deriving. BS 7671 Reg 523.5 + Appendix 4 §2.3.1.
import { getGroupingFactor } from '@/lib/calculators/bs7671-data/temperatureFactors';
import { conduitFillContent } from './content/conduit-fill';

// Indicative approximate mass per metre of PVC singles (6491X), kg/m.
// NOT a BS 7671 quantity — manufacturer data, used only for the indicative pulling-tension
// estimate below. BS 7671 gives no pulling-tension method (see Reg 522.8.6 NOTE).
const cableMassKgPerM: Record<string, number> = {
  '1': 0.05,
  '1.5': 0.07,
  '2.5': 0.1,
  '4': 0.15,
  '6': 0.22,
  '10': 0.35,
  '16': 0.55,
  '25': 0.85,
};

// Coefficient of friction for PVC singles drawn through conduit — indicative industry figure.
const FRICTION_COEFFICIENT = 0.3;
const GRAVITY = 9.81;

const ConduitFillCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [conduitSize, setConduitSize] = useState('');
  const [conduitMaterial, setConduitMaterial] = useState('pvc');
  const [cableSize, setCableSize] = useState('');
  const [cableQuantity, setCableQuantity] = useState('');
  const [circuits, setCircuits] = useState('1');
  const [runLength, setRunLength] = useState('');
  const [bendCount, setBendCount] = useState('0');
  const [fillTarget, setFillTarget] = useState('40');
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [result, setResult] = useState<{
    fillPercentage: number;
    maxCables: number;
    suitable: boolean;
    spaceFactor: number;
    groupingFactor: number;
    bendRadius: number;
    warnings: string[];
    pullTension: number;
  } | null>(null);

  // Nominal internal bore and typical former bend radius by conduit size.
  // NOTE: these are manufacturer/product figures. BS 7671, GN3 and the On-Site Guide publish no
  // conduit bore table, and Reg 522.8.3 sets bend radius as a PERFORMANCE requirement only
  // ("the radius of every bend ... such that conductors or cables do not suffer damage and
  // terminations are not stressed") — it states no numeric radius. Treat as indicative and check
  // the manufacturer's data. Formerly commented "BS EN 61386-1", which is wrong: BS EN 61386 is a
  // conduit PRODUCT standard (corrosion class, impact class, flame propagation, fire test —
  // Regs 422.3.4, 522.16, 527.1.5, 705.522.16) and carries no dimensional or fill data.
  const conduitData = {
    pvc: {
      '16': { diameter: 12.2, area: 117, bendRadius: 48 },
      '20': { diameter: 16.0, area: 201, bendRadius: 60 },
      '25': { diameter: 20.4, area: 327, bendRadius: 75 },
      '32': { diameter: 26.0, area: 531, bendRadius: 96 },
      '40': { diameter: 32.0, area: 804, bendRadius: 120 },
      '50': { diameter: 40.0, area: 1257, bendRadius: 150 },
      '63': { diameter: 52.0, area: 2124, bendRadius: 189 },
      '75': { diameter: 62.0, area: 3019, bendRadius: 225 },
      '100': { diameter: 82.0, area: 5281, bendRadius: 300 },
    },
    steel: {
      '16': { diameter: 13.0, area: 133, bendRadius: 60 },
      '20': { diameter: 16.8, area: 222, bendRadius: 75 },
      '25': { diameter: 21.2, area: 353, bendRadius: 90 },
      '32': { diameter: 27.2, area: 581, bendRadius: 120 },
      '40': { diameter: 33.2, area: 866, bendRadius: 150 },
      '50': { diameter: 41.2, area: 1332, bendRadius: 180 },
      '63': { diameter: 53.4, area: 2239, bendRadius: 225 },
      '75': { diameter: 63.4, area: 3157, bendRadius: 270 },
      '100': { diameter: 84.0, area: 5542, bendRadius: 360 },
    },
  };

  const calculateConduitFill = () => {
    const conduit =
      conduitData[conduitMaterial as keyof typeof conduitData][
        conduitSize as keyof (typeof conduitData)[keyof typeof conduitData]
      ];
    const cable = getCableCSA('singles-pvc', parseFloat(cableSize));
    const quantity = parseInt(cableQuantity);
    const spaceFactor = parseFloat(fillTarget);
    const numCircuits = parseInt(circuits) || 1;
    const bends = parseInt(bendCount) || 0;
    const length = parseFloat(runLength) || 0;

    if (!conduit || !cable || !quantity || !spaceFactor) return;

    // Shared module already holds the cross-sectional area for each cable — use it rather than
    // re-deriving it from a locally inlined diameter.
    const cableArea = cable.crossSectionalArea;
    const totalCableArea = cableArea * quantity;
    const fillPercentage = (totalCableArea / conduit.area) * 100;

    // FIX: the previous code overrode the user's chosen space factor with 53% for a single cable
    // and 31% for two cables, and silently discarded the bends reduction when it did so. Those
    // percentages are the US NEC Chapter 9 Table 1 figures. No BS 7671, GN3 or On-Site Guide
    // source states them — grep of the printed standard finds no "space factor", "cable factor"
    // or "conduit factor" text at all, and the OSG holds conduit capacity in its own cable-factor
    // tables (OSG 2.4; OSG 7.25, Table 4.6 / Appendix H) with no percentage figure. The chosen
    // space factor is now used as entered, for every cable count.
    //
    // FIX: maxCables previously used a limit derived from the ENTERED quantity, so the answer
    // contradicted itself (type 1 cable and it sized on 53%). With the override gone the limit no
    // longer depends on the entered quantity.
    const maxFillArea = conduit.area * (spaceFactor / 100);
    const maxCables = Math.floor(maxFillArea / cableArea);

    const suitable = fillPercentage <= spaceFactor;

    // FIX: grouping was never applied and the only warning was gated on quantity > 4 AND
    // csa >= 10mm², which is wrong twice over. BS 7671 Reg 523.5 and Appendix 4 §2.3.1: group
    // rating factors apply as soon as more than one circuit shares the enclosure, and Table 4C1 is
    // independent of conductor csa. Cables in conduit are "bunched ... enclosed" — Table 4C1
    // item 1 (2 circuits 0.80, 3 circuits 0.70, ...).
    const groupingFactor = getGroupingFactor(numCircuits, 'bunched');

    // Indicative pulling tension. NOT a BS 7671 quantity — Reg 522.8.6 only requires adequate
    // means for drawing in or out, its NOTE saying pulling tensions, lubricants and intermediate
    // pulling equipment are to be considered. No method is published in BS 7671, GN3 or the OSG.
    // FIX: the old expression was mass x g x mu with no run length, so it produced newtons per
    // metre while the UI labelled it "N", and the 100 N warning threshold was effectively
    // unreachable. Straight run T = mu.w.g.L; each bend multiplies by the capstan factor
    // e^(mu.theta) with theta = pi/2 for a 90 degree bend.
    const massPerMetre = (cableMassKgPerM[cable.size.toString()] ?? 0) * quantity;
    const straightTension = FRICTION_COEFFICIENT * massPerMetre * GRAVITY * length;
    const capstan = Math.exp(FRICTION_COEFFICIENT * (Math.PI / 2) * bends);
    const pullTension = straightTension * capstan;

    // Generate warnings
    const warnings: string[] = [];
    if (fillPercentage > spaceFactor) {
      warnings.push(`Fill exceeds the ${spaceFactor}% space factor — use the next conduit size up`);
    }
    if (bends >= 2 && fillPercentage > 30) {
      warnings.push(
        `${bends} bends at ${Math.round(fillPercentage)}% fill will be hard to draw in — reduce the fill or add a draw-in box`
      );
    }
    if (groupingFactor < 1) {
      warnings.push(
        `${numCircuits} circuits bunched in one conduit: apply Cg = ${groupingFactor.toFixed(2)} (Table 4C1) to each circuit's current-carrying capacity`
      );
    }
    if (conduitMaterial === 'pvc' && cable.size >= 25) {
      warnings.push('Consider steel conduit for large cables and mechanical protection');
    }
    if (pullTension > 500) {
      warnings.push(
        'High estimated pulling tension — break the run with a draw-in box (Reg 522.8.6). Any drawing-in lubricant must not have a detrimental effect on the cable or wiring system (Reg 522.8.1)'
      );
    }

    setResult({
      fillPercentage: Math.round(fillPercentage * 10) / 10,
      maxCables,
      suitable,
      spaceFactor,
      groupingFactor,
      bendRadius: conduit.bendRadius,
      warnings,
      pullTension: Math.round(pullTension),
    });
  };

  const resetCalculator = () => {
    setConduitSize('');
    setConduitMaterial('pvc');
    setCableSize('');
    setCableQuantity('');
    setCircuits('1');
    setRunLength('');
    setBendCount('0');
    setFillTarget('40');
    setResult(null);
  };

  const hasValidInputs = () => {
    return conduitSize && cableSize && cableQuantity;
  };

  // Build select options
  const conduitSizeOptions = [
    { value: '16', label: '16mm' },
    { value: '20', label: '20mm' },
    { value: '25', label: '25mm' },
    { value: '32', label: '32mm' },
    { value: '40', label: '40mm' },
    { value: '50', label: '50mm' },
    { value: '63', label: '63mm' },
    { value: '75', label: '75mm' },
    { value: '100', label: '100mm' },
  ];

  // Driven off the shared cable dataset so the options can never drift from the areas used.
  const cableSizeOptions = singlesPvc.map((c) => ({
    value: c.size.toString(),
    label: `${c.size}mm²`,
  }));

  const selectedCable = cableSize ? getCableCSA('singles-pvc', parseFloat(cableSize)) : undefined;

  return (
    <CalculatorCard
      category="cable"
      title="Conduit Fill Calculator"
      description="Space-factor check with grouping to BS 7671 Table 4C1"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Conduit Material"
          value={conduitMaterial}
          onChange={setConduitMaterial}
          options={[
            { value: 'pvc', label: 'PVC' },
            { value: 'steel', label: 'Steel' },
          ]}
        />
        <CalculatorSelect
          label="Conduit Size"
          value={conduitSize}
          onChange={setConduitSize}
          options={conduitSizeOptions}
          placeholder="Select size"
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Cable Size"
          value={cableSize}
          onChange={setCableSize}
          options={cableSizeOptions}
          placeholder="Select cable size"
        />
        <CalculatorInput
          label="Number of Cables"
          type="text"
          inputMode="numeric"
          value={cableQuantity}
          onChange={setCableQuantity}
          placeholder="Enter quantity"
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Circuits in Conduit"
          type="text"
          inputMode="numeric"
          value={circuits}
          onChange={setCircuits}
          placeholder="1"
        />
        <CalculatorSelect
          label="Fill Target (space factor)"
          value={fillTarget}
          onChange={setFillTarget}
          options={[
            { value: '30', label: '30% (Conservative)' },
            { value: '35', label: '35% (Runs with bends)' },
            { value: '40', label: '40% (Typical maximum)' },
          ]}
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Run Length (m)"
          type="text"
          inputMode="decimal"
          value={runLength}
          onChange={setRunLength}
          placeholder="e.g. 8"
        />
        <CalculatorSelect
          label="Number of 90° Bends"
          value={bendCount}
          onChange={setBendCount}
          options={[
            { value: '0', label: 'Straight run' },
            { value: '1', label: '1 bend' },
            { value: '2', label: '2 bends' },
            { value: '3', label: '3 bends' },
            { value: '4', label: '4 bends' },
          ]}
        />
      </CalculatorInputGrid>

      <CalculatorActions
        category="cable"
        onCalculate={calculateConduitFill}
        onReset={resetCalculator}
        isDisabled={!hasValidInputs()}
      />

      {result && (
        <>
          <CalculatorDivider category="cable" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
                result.suitable
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              )}
            >
              {result.suitable ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-400" />
              )}
              <span
                className={cn(
                  'text-sm font-semibold',
                  result.suitable ? 'text-green-300' : 'text-red-300'
                )}
              >
                {result.suitable ? 'Within Space Factor' : 'Exceeds Space Factor'}
              </span>
            </div>

            {/* Hero Value */}
            <div className="rounded-xl p-4 bg-white/[0.04]">
              <p className="text-sm text-white mb-1">Fill Percentage</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.fillPercentage}%
              </div>
              <p className="text-sm text-white mt-1">Space factor: {result.spaceFactor}%</p>
            </div>

            {/* Result Details */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Max Cables"
                value={result.maxCables.toString()}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Grouping Cg"
                value={result.groupingFactor.toFixed(2)}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Current Cables"
                value={cableQuantity}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Bend Radius (typical)"
                value={result.bendRadius.toString()}
                unit="mm"
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Est. Pull Tension"
                value={result.pullTension > 0 ? `~${result.pullTension}` : '—'}
                unit={result.pullTension > 0 ? 'N' : undefined}
                category="cable"
                size="sm"
              />
            </ResultsGrid>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <div className="space-y-1 text-sm text-white">
                    {result.warnings.map((warning, index) => (
                      <p key={index}>{warning}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <CalculatorDivider category="cable" />

          {/* How It Worked Out - Collapsible */}
          {selectedCable && cableQuantity && conduitSize && (
            <Collapsible open={showFormula} onOpenChange={setShowFormula}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-white">
                    How It Worked Out
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showFormula && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="pt-2">
                <div className="text-sm font-mono text-white space-y-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div>
                    <div className="text-xs text-purple-400 mb-1">
                      Step 1: Cable cross-sectional area
                    </div>
                    <div>
                      {selectedCable.size}mm² {selectedCable.typeLabel}, Ø
                      {selectedCable.overallDiameter}mm
                    </div>
                    <div className="text-white font-bold">
                      A = {selectedCable.crossSectionalArea}mm²
                    </div>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <div className="text-xs text-purple-400 mb-1">Step 2: Total cable area</div>
                    <div>
                      Total = A × qty = {selectedCable.crossSectionalArea} × {cableQuantity}
                    </div>
                    <div className="text-white font-bold">
                      Total ={' '}
                      {(selectedCable.crossSectionalArea * parseInt(cableQuantity)).toFixed(1)}
                      mm²
                    </div>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <div className="text-xs text-purple-400 mb-1">Step 3: Fill percentage</div>
                    <div>Fill = (Cable Area ÷ Conduit Bore Area) × 100</div>
                    <div>
                      Fill = (
                      {(selectedCable.crossSectionalArea * parseInt(cableQuantity)).toFixed(1)} ÷{' '}
                      {
                        conduitData[conduitMaterial as keyof typeof conduitData][
                          conduitSize as keyof (typeof conduitData)[keyof typeof conduitData]
                        ].area
                      }
                      ) × 100
                    </div>
                    <div className="text-white font-bold">Fill = {result.fillPercentage}%</div>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <div className="text-xs text-purple-400 mb-1">
                      Step 4: Grouping factor (Table 4C1, bunched)
                    </div>
                    <div>
                      {circuits} circuit{parseInt(circuits) === 1 ? '' : 's'} bunched in the conduit
                    </div>
                    <div className="text-white font-bold">
                      Cg = {result.groupingFactor.toFixed(2)}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* What This Means - Collapsible */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Fill percentage</strong> affects cable pulling
                    difficulty and heat dissipation.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Space factor</strong> is a quick area check. The
                    definitive UK sizing method is the On-Site Guide cable-factor / conduit-factor
                    tables, which are indexed by run length and number of bends — always confirm
                    against those.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Grouping (Cg)</strong> is separate from fill.
                    Two circuits bunched in one conduit already derate to 0.80, whatever the cable
                    size.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Pull tension</strong> here is an indicative
                    engineering estimate only — BS 7671 publishes no pulling-tension method.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Regs at a Glance - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  Regs at a Glance
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              {/*
                FIX: this panel previously presented "1 cable 53% / 2 cables 31% / 3+ cables 40% /
                with bends 35%" as BS EN 61386-1 requirements. BS EN 61386 is a conduit PRODUCT
                standard — BS 7671 cites it only for corrosion class, impact class, flame
                propagation and the fire test (Regs 422.3.4, 522.16, 527.1.5, 705.522.16). It
                contains no fill percentages, and none of 53/31/35 appears in BS 7671, GN3 or the
                On-Site Guide.
              */}
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">BS 7671:</strong> states no numeric conduit fill
                    percentage. Conduit capacity is an On-Site Guide topic (OSG 2.4; OSG 7.25,
                    Table 4.6 / Appendix H) using cable factors and conduit factors.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Space factor:</strong> the ~40% figure used here
                    is the working limit the On-Site Guide conduit factors are built on, not a
                    regulation. Reduce it for long runs and multiple bends.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Reg 523.5 / Table 4C1:</strong> group rating
                    factors apply to groups containing more than one circuit — bunched or enclosed,
                    2 circuits 0.80, 3 circuits 0.70, 4 circuits 0.65.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Reg 522.8.3:</strong> the radius of every bend
                    shall be such that cables are not damaged and terminations are not stressed. No
                    numeric radius is given — the figure shown is a typical former size.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Reg 522.8.6:</strong> a wiring system intended
                    for drawing conductors in or out shall have adequate means to do so. Its note
                    covers pulling tensions, lubricants and intermediate pulling equipment.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">Reg 522.8.1:</strong> the use of any lubricants
                    that can have a detrimental effect on the cable or wiring system is not
                    permitted.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-white">BS EN 61386:</strong> the conduit product
                    standard — corrosion class, impact class and flame propagation. It is not a
                    source of fill limits.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Fill %</strong> = (Total Cable Area ÷ Conduit Bore Area) × 100. Indicative area
            check — confirm against the On-Site Guide cable-factor tables, and apply Cg separately.
          </p>
        </div>
      </div>
      <CalculatorEditorial content={conduitFillContent} category="cable" />
    </CalculatorCard>
  );
};

export default ConduitFillCalculator;
