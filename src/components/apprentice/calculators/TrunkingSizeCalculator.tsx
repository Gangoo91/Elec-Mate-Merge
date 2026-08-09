import { useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorFormula,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  FormulaReference,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { trunkingSizeContent } from './content/trunking-size';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  containmentTypeOptions,
  cableTypeOptions,
  getCableSizeOptions,
  getCableCSA,
  getTrunkingSizes,
  type ContainmentType,
  type TrunkingSize,
} from '@/lib/calculators/bs7671-data/trunkingData';
// Table 4C1 group rating factors — shared module, not a local copy.
import { getGroupingFactor } from '@/lib/calculators/bs7671-data/temperatureFactors';

const CAT = 'cable' as const;
const config = CALCULATOR_CONFIG[CAT];

/**
 * 45% space factor.
 *
 * CORRECTION: this was previously commented "BS 7671 Regulation 522.8.1". That citation is
 * wrong. Reg 522.8.1 (BS 7671:2018+A4:2026) reads: "A wiring system shall be selected and
 * erected to avoid, during installation, use or maintenance, damage to the sheath or
 * insulation of cables and their terminations. The use of any lubricants that can have a
 * detrimental effect on the cable or wiring system are not permitted." It contains no fill,
 * capacity or percentage requirement, and a full-text search of BS 7671:2018+A4:2026 finds no
 * trunking space factor anywhere in the standard.
 *
 * The 45% figure is IET On-Site Guide / long-standing industry guidance for the physical
 * drawing-in of cables — it is NOT a BS 7671 requirement, and satisfying it does not by itself
 * demonstrate compliance. Thermal derating is a separate step (see GROUPING note below).
 */
const MAX_FILL = 45;

interface CableRow {
  id: string;
  cableType: string;
  size: string;
  quantity: number;
}

interface SizeOption {
  label: string;
  internalArea: number;
  fillPercent: number;
  fits: boolean;
}

interface TrunkingResult {
  totalCableArea: number;
  cableCount: number;
  recommendedSize: string;
  recommendedArea: number;
  fillPercent: number;
  sizeOptions: SizeOption[];
  status: 'pass' | 'warning' | 'fail';
  statusLabel: string;
  circuits: number;
  groupingFactor: number;
}

const TrunkingSizeCalculator = () => {
  const [containmentType, setContainmentType] = useState<ContainmentType>('pvc-trunking');
  const [circuits, setCircuits] = useState('1');
  const [cables, setCables] = useState<CableRow[]>([
    { id: crypto.randomUUID(), cableType: 'twin-earth', size: '2.5', quantity: 1 },
  ]);
  const [result, setResult] = useState<TrunkingResult | null>(null);

  const addCable = () => {
    setCables((prev) => [
      ...prev,
      { id: crypto.randomUUID(), cableType: 'twin-earth', size: '2.5', quantity: 1 },
    ]);
  };

  const removeCable = (id: string) => {
    if (cables.length <= 1) return;
    setCables((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCable = (id: string, updates: Partial<CableRow>) => {
    setCables((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const updated = { ...c, ...updates };
        // Reset size when cable type changes
        if (updates.cableType && updates.cableType !== c.cableType) {
          const sizes = getCableSizeOptions(updates.cableType);
          updated.size = sizes[0]?.value ?? '';
        }
        return updated;
      })
    );
  };

  const calculate = () => {
    // Calculate total cable area
    let totalCableArea = 0;
    let cableCount = 0;

    for (const cable of cables) {
      const csa = getCableCSA(cable.cableType, parseFloat(cable.size));
      if (csa) {
        totalCableArea += csa.crossSectionalArea * cable.quantity;
        cableCount += cable.quantity;
      }
    }

    if (totalCableArea === 0) return;

    // Get available trunking sizes
    const sizes = getTrunkingSizes(containmentType);

    // Cg — Table 4C1 item 1 (bunched in air, on a surface, embedded or ENCLOSED), taken from
    // the shared bs7671-data module rather than re-typed here. Reg 523.4 requires the group
    // rating factors of Tables 4C1–4C6 to be applied to grouped cables; Table 4A2 footnote b
    // states that where there is more than one circuit in the trunking the Table 4C1 group
    // rating factor is applicable "irrespective of the presence of an internal barrier or
    // partition". Reported for information only — this calculator sizes the containment, it
    // does not size conductors.
    const nCircuits = Math.max(1, parseInt(circuits) || 1);
    const groupingFactor = getGroupingFactor(nCircuits, 'bunched');

    if (sizes.length === 0) {
      // Cable tray/basket — no enclosed fill calculation applies
      setResult({
        totalCableArea,
        cableCount,
        recommendedSize: 'See cable tray guidance below',
        recommendedArea: 0,
        fillPercent: 0,
        sizeOptions: [],
        status: 'info' as 'pass',
        statusLabel: 'Cable tray/basket — fill rule does not apply in the same way',
        circuits: nCircuits,
        groupingFactor,
      });
      return;
    }

    // Calculate fill for each size.
    // FIX: getTrunkingSizes() returns arrays that are NOT ordered by internal area (PVC runs
    // …4400 then 3900; steel runs …4200 then 3700), so the previous `fitting[0]` was the first
    // entry that fits in declaration order, not the smallest that fits. Sort ascending by
    // internal area so "smallest size that fits" is actually true.
    const sizeOptions: SizeOption[] = sizes
      .map((s) => {
        const fillPercent = (totalCableArea / s.internalArea) * 100;
        return {
          label: s.label,
          internalArea: s.internalArea,
          fillPercent,
          fits: fillPercent <= MAX_FILL,
        };
      })
      .sort((a, b) => a.internalArea - b.internalArea);

    // Find recommended (smallest that fits at ≤45%)
    const fitting = sizeOptions.filter((s) => s.fits);
    const recommended = fitting.length > 0 ? fitting[0] : sizeOptions[sizeOptions.length - 1];
    const fillPercent = recommended.fillPercent;

    // Status. Wording is deliberately "space factor (fill only)" — passing the 45% space factor
    // is a physical drawing-in check, not a demonstration of BS 7671 compliance. Grouping
    // derating (Reg 523.4 / Table 4C1) is a separate check and is surfaced below.
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let statusLabel = `${fillPercent.toFixed(1)}% fill — within the 45% space factor (fill only)`;
    if (fillPercent > MAX_FILL) {
      status = 'fail';
      statusLabel = `${fillPercent.toFixed(1)}% fill — exceeds the 45% space factor`;
    } else if (fillPercent > 40) {
      status = 'warning';
      statusLabel = `${fillPercent.toFixed(1)}% fill — close to the 45% space factor`;
    }

    setResult({
      totalCableArea,
      cableCount,
      recommendedSize: recommended.label,
      recommendedArea: recommended.internalArea,
      fillPercent,
      sizeOptions,
      status,
      statusLabel,
      circuits: nCircuits,
      groupingFactor,
    });
  };

  const reset = () => {
    setContainmentType('pvc-trunking');
    setCircuits('1');
    setCables([{ id: crypto.randomUUID(), cableType: 'twin-earth', size: '2.5', quantity: 1 }]);
    setResult(null);
  };

  const isTrunking = containmentType === 'pvc-trunking' || containmentType === 'steel-trunking';

  // Title renamed from "Pipe & Trunking Size Calculator": conduit is explicitly out of scope
  // (see the fill-rules panel below), and the old description "BS 7671 compliant" overstated
  // the result — BS 7671 sets no trunking space factor, so a fill figure is not on its own a
  // compliance statement.
  return (
    <CalculatorCard
      category={CAT}
      title="Trunking Size Calculator"
      description="Work out the minimum trunking size for your cables using the 45% space factor"
    >
      <CalculatorPanes
        copyTitle="Trunking / Conduit Size"
        form={
          <>
            <CalculatorSelect
              label="Containment Type"
              value={containmentType}
              onChange={(v) => {
                setContainmentType(v as ContainmentType);
                setResult(null);
              }}
              options={containmentTypeOptions}
            />

            {isTrunking && (
              <CalculatorInput
                label="Circuits in this trunking"
                type="text"
                inputMode="numeric"
                value={circuits}
                onChange={(v) => {
                  setCircuits(v);
                  setResult(null);
                }}
                placeholder="1"
              />
            )}

            <CalculatorDivider category={CAT} />

            <CalculatorSection title="Your Cables">
              <div className="space-y-3">
                {cables.map((cable) => {
                  const sizeOptions = getCableSizeOptions(cable.cableType);
                  return (
                    <div
                      key={cable.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <CalculatorSelect
                            label="Cable Type"
                            value={cable.cableType}
                            onChange={(v) => updateCable(cable.id, { cableType: v })}
                            options={cableTypeOptions}
                          />
                        </div>
                        {cables.length > 1 && (
                          <button
                            onClick={() => removeCable(cable.id)}
                            className="h-11 w-11 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors touch-manipulation shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <CalculatorSelect
                          label="Conductor Size"
                          value={cable.size}
                          onChange={(v) => updateCable(cable.id, { size: v })}
                          options={sizeOptions}
                        />
                        <CalculatorInput
                          label="Quantity"
                          type="text"
                          inputMode="numeric"
                          value={cable.quantity?.toString() ?? ''}
                          onChange={(v) => updateCable(cable.id, { quantity: parseInt(v) || 1 })}
                          placeholder="1"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addCable}
                className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors touch-manipulation"
              >
                <Plus className="h-4 w-4" />
                Add Cable
              </button>
            </CalculatorSection>

            <CalculatorActions
              category={CAT}
              onCalculate={calculate}
              onReset={reset}
              calculateLabel="Calculate Size"
              showReset
            />
          </>
        }
        result={
          <>
            {result && (
              <div className="space-y-4 animate-fade-in">
                <ResultBadge status={result.status} label={result.statusLabel} />

                <ResultHeadline label="Recommended size" value={result.recommendedSize} />

                <ResultsGrid columns={2}>
                  {isTrunking && (
                    <ResultValue
                      label="Fill"
                      value={`${result.fillPercent.toFixed(1)}`}
                      unit="%"
                      category={CAT}
                      size="sm"
                    />
                  )}
                  <ResultValue
                    label="Total Cable Area"
                    value={result.totalCableArea.toFixed(1)}
                    unit="mm²"
                    category={CAT}
                    size="sm"
                  />
                  {isTrunking && (
                    <ResultValue
                      label="Trunking Area"
                      value={result.recommendedArea.toFixed(0)}
                      unit="mm²"
                      category={CAT}
                      size="sm"
                    />
                  )}
                  <ResultValue
                    label="Cable Count"
                    value={result.cableCount}
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {/*
              Grouping (Cg). The 45% space factor is a physical drawing-in check only — it says
              nothing about conductor temperature. Reg 523.4 requires the group rating factors of
              Tables 4C1–4C6 to be applied to grouped cables, and Table 4A2 footnote b states that
              where there is more than one circuit in the trunking the Table 4C1 factor applies
              "irrespective of the presence of an internal barrier or partition". Previously a 45%
              fill was returned as an unqualified pass with no mention of grouping at all.
            */}
                {isTrunking && (
                  <div className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 space-y-2">
                    <p className="text-sm text-white">
                      <span className="font-medium">
                        Grouping factor Cg = {result.groupingFactor.toFixed(2)}
                      </span>{' '}
                      — Table 4C1, {result.circuits} circuit{result.circuits === 1 ? '' : 's'}{' '}
                      bunched and enclosed.
                    </p>
                    <p className="text-sm text-white">
                      Fill is a physical check only. Where more than one circuit shares the
                      trunking, Regulation 523.4 requires the Table 4C1 group rating factor to be
                      applied to the cables&apos; current-carrying capacity — and Table 4A2 note (b)
                      confirms it applies irrespective of any internal barrier or partition. Size
                      the conductors on the derated capacity separately; a fill pass is not a
                      thermal pass.
                    </p>
                  </div>
                )}

                {/* Size Options */}
                {result.sizeOptions.length > 0 && (
                  <>
                    <CalculatorDivider category={CAT} />
                    <CalculatorSection title="Size Options">
                      <div className="space-y-2">
                        {result.sizeOptions
                          .filter((s) => s.fillPercent <= 100)
                          .map((s) => {
                            const isRecommended = s.label === result.recommendedSize;
                            return (
                              <div
                                key={s.label}
                                className={cn(
                                  'flex items-center justify-between p-3 rounded-xl border',
                                  isRecommended
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-white/5 border-white/10'
                                )}
                                style={
                                  isRecommended ? { borderColor: `${config.gradientFrom}40` } : {}
                                }
                              >
                                <div className="flex items-center gap-2">
                                  {isRecommended && (
                                    <span
                                      className="w-2 h-2 rounded-full shrink-0"
                                      style={{ background: config.gradientFrom }}
                                    />
                                  )}
                                  <span className="text-sm text-white font-medium">{s.label}</span>
                                </div>
                                <span
                                  className={cn(
                                    'text-sm font-medium',
                                    s.fits ? 'text-white' : 'text-red-400'
                                  )}
                                >
                                  {s.fillPercent.toFixed(1)}%
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </CalculatorSection>
                  </>
                )}

                {isTrunking && (
                  <CalculatorFormula
                    category={CAT}
                    title="Fill Calculation"
                    steps={[
                      {
                        label: 'Total cable area',
                        formula: cables
                          .map((c) => {
                            const csa = getCableCSA(c.cableType, parseFloat(c.size));
                            return `${c.quantity} × ${csa?.crossSectionalArea.toFixed(1) ?? '?'}mm²`;
                          })
                          .join(' + '),
                        result: `${result.totalCableArea.toFixed(1)}mm²`,
                      },
                      {
                        label: 'Trunking internal area',
                        formula: result.recommendedSize,
                        result: `${result.recommendedArea.toFixed(0)}mm²`,
                      },
                      {
                        label: 'Fill percentage',
                        formula: `(${result.totalCableArea.toFixed(1)} ÷ ${result.recommendedArea.toFixed(0)}) × 100`,
                        result: `${result.fillPercent.toFixed(1)}%`,
                      },
                    ]}
                  />
                )}

                {/* BS 7671 Fill Rules */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
                    <span>Where the 45% figure comes from</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      {/*
                    CORRECTED. The previous text attributed "cables must be installed so they are
                    not subject to mechanical strain" to Reg 522.8.1. That requirement is
                    Regulation 522.8.5 ("Every cable or conductor shall be supported in such a way
                    that it is not exposed to undue mechanical strain…"). Reg 522.8.1 covers
                    avoidance of damage to the sheath, insulation and terminations during
                    installation, use or maintenance, plus the prohibition on detrimental
                    lubricants. Neither regulation — nor anywhere else in BS 7671:2018+A4:2026 —
                    states a trunking fill or space factor.
                  */}
                      <p className="text-sm text-white">
                        <span className="font-medium">The 45% space factor is not in BS 7671.</span>{' '}
                        It is IET On-Site Guide and long-standing industry guidance for drawing
                        cables in without damage. BS 7671 sets no trunking fill percentage anywhere.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 522.8.1</span> — a wiring system
                        shall be selected and erected to avoid damage to the sheath or insulation of
                        cables and their terminations during installation, use or maintenance;
                        lubricants that could harm the cable are not permitted.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 522.8.5</span> — every cable shall
                        be supported so that it is not exposed to undue mechanical strain, and so
                        there is no appreciable strain on the terminations.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Conduit is not covered here.</span> Conduit
                        capacity uses a different method again — this calculator covers trunking
                        only.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">SWA figures</span> — one representative
                        overall diameter is held per conductor size. A 3- or 4-core cable of the
                        same conductor size is physically larger, so check the manufacturer&apos;s
                        dimensions before relying on the result for multicore SWA.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Installation Tips */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
                    <span>Installation Tips</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <p className="text-sm text-white">
                        Allow extra capacity for future cable additions — aim for 30–35% fill where
                        possible.
                      </p>
                      <p className="text-sm text-white">
                        Use dividers/compartments in trunking to segregate power and data cables
                        (Regulation 528.1).
                      </p>
                      <p className="text-sm text-white">
                        Steel trunking provides better EMC screening and fire resistance than PVC.
                      </p>
                      <p className="text-sm text-white">
                        Cable tray is preferable for large SWA cables — no fill factor applies but
                        ensure adequate support spacing.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            <FormulaReference
              category={CAT}
              name="Trunking space factor"
              formula="Fill % = (Total Cable Area ÷ Trunking Area) × 100"
            />
          </>
        }
        footer={<CalculatorEditorial content={trunkingSizeContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default TrunkingSizeCalculator;
