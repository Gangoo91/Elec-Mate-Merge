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
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
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

const CAT = 'cable' as const;
const config = CALCULATOR_CONFIG[CAT];

const MAX_FILL = 45; // BS 7671 Regulation 522.8.1

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
}

const TrunkingSizeCalculator = () => {
  const [containmentType, setContainmentType] = useState<ContainmentType>('pvc-trunking');
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
      });
      return;
    }

    // Calculate fill for each size
    const sizeOptions: SizeOption[] = sizes.map((s) => {
      const fillPercent = (totalCableArea / s.internalArea) * 100;
      return {
        label: s.label,
        internalArea: s.internalArea,
        fillPercent,
        fits: fillPercent <= MAX_FILL,
      };
    });

    // Find recommended (smallest that fits at ≤45%)
    const fitting = sizeOptions.filter((s) => s.fits);
    const recommended = fitting.length > 0 ? fitting[0] : sizeOptions[sizeOptions.length - 1];
    const fillPercent = recommended.fillPercent;

    // Status
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let statusLabel = `${fillPercent.toFixed(1)}% fill — within 45% maximum`;
    if (fillPercent > MAX_FILL) {
      status = 'fail';
      statusLabel = `${fillPercent.toFixed(1)}% fill — exceeds 45% maximum`;
    } else if (fillPercent > 40) {
      status = 'warning';
      statusLabel = `${fillPercent.toFixed(1)}% fill — close to 45% maximum`;
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
    });
  };

  const reset = () => {
    setContainmentType('pvc-trunking');
    setCables([{ id: crypto.randomUUID(), cableType: 'twin-earth', size: '2.5', quantity: 1 }]);
    setResult(null);
  };

  const isTrunking = containmentType === 'pvc-trunking' || containmentType === 'steel-trunking';

  return (
    <CalculatorCard
      category={CAT}
      title="Pipe & Trunking Size Calculator"
      description="Calculate the minimum trunking size for your cables — BS 7671 compliant"
    >
      <CalculatorSelect
        label="Containment Type"
        value={containmentType}
        onChange={(v) => {
          setContainmentType(v as ContainmentType);
          setResult(null);
        }}
        options={containmentTypeOptions}
      />

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

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultBadge status={result.status} label={result.statusLabel} />

          {/* Hero recommended size */}
          <p
            className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            }}
          >
            {result.recommendedSize}
          </p>

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
            <ResultValue label="Cable Count" value={result.cableCount} category={CAT} size="sm" />
          </ResultsGrid>

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
                          style={isRecommended ? { borderColor: `${config.gradientFrom}40` } : {}}
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
              <span>BS 7671 Fill Rules</span>
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
                  <span className="font-medium">Regulation 522.8.1</span> — Cables must be installed
                  so they are not subject to mechanical strain. Trunking fill should not exceed 45%
                  of the internal cross-sectional area.
                </p>
                <p className="text-sm text-white">
                  The 45% rule ensures cables can be drawn in without damage, allows for heat
                  dissipation, and leaves space for future additions.
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium">Space factor</span> — For conduit, the space factor
                  is calculated differently. This calculator covers trunking only.
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
                  Cable tray is preferable for large SWA cables — no fill factor applies but ensure
                  adequate support spacing.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      <FormulaReference
        category={CAT}
        formula="Fill % = (Total Cable Area ÷ Trunking Area) × 100"
      />
    </CalculatorCard>
  );
};

export default TrunkingSizeCalculator;
