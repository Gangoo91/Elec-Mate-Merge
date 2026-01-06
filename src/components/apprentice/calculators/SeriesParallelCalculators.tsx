import { useMemo, useState } from "react";
import { Plus, X, Info, BookOpen, ChevronDown, RotateCcw } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

type Unit = "Ω" | "kΩ" | "MΩ";

const unitFactor: Record<Unit, number> = {
  "Ω": 1,
  "kΩ": 1_000,
  "MΩ": 1_000_000,
};

function toOhms(value: number, unit: Unit) {
  return value * unitFactor[unit];
}

function formatAllUnits(ohms: number, dp = 3) {
  if (!isFinite(ohms) || ohms <= 0) return { ohm: "—", kohm: "—", Mohm: "—" };
  const round = (v: number) => Number.isFinite(v) ? Number(v.toFixed(dp)) : "—";
  return {
    ohm: `${round(ohms)} Ω`,
    kohm: `${round(ohms / 1_000)} kΩ`,
    Mohm: `${round(ohms / 1_000_000)} MΩ`,
  };
}

interface Row {
  value: string;
  unit: Unit;
}

function useRows(initial: Row[]) {
  const [rows, setRows] = useState<Row[]>(initial);
  const addRow = () => setRows((r) => [...r, { value: "", unit: "Ω" }]);
  const reset = () => setRows(initial);
  const removeRow = (idx: number) => setRows((r) => r.filter((_, i) => i !== idx));
  const setValue = (idx: number, value: string) =>
    setRows((r) => r.map((row, i) => (i === idx ? { ...row, value } : row)));
  const setUnit = (idx: number, unit: Unit) =>
    setRows((r) => r.map((row, i) => (i === idx ? { ...row, unit } : row)));
  return { rows, addRow, reset, removeRow, setValue, setUnit };
}

// Reusable Resistor Row Component
const ResistorRow = ({
  index,
  value,
  unit,
  onValueChange,
  onUnitChange,
  onRemove
}: {
  index: number;
  value: string;
  unit: Unit;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: Unit) => void;
  onRemove: () => void;
}) => (
  <div className="flex items-center gap-2">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/50 w-8">R{index + 1}</span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="Value"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="flex-1 h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as Unit)}
          className="h-11 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
        >
          <option value="Ω">Ω</option>
          <option value="kΩ">kΩ</option>
          <option value="MΩ">MΩ</option>
        </select>
      </div>
    </div>
    <button
      onClick={onRemove}
      className="h-11 w-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-colors touch-manipulation"
      aria-label={`Remove R${index + 1}`}
    >
      <X className="h-4 w-4" />
    </button>
  </div>
);

export default function SeriesParallelCalculators() {
  const config = CALCULATOR_CONFIG['power'];
  const [showSeriesGuidance, setShowSeriesGuidance] = useState(false);
  const [showParallelGuidance, setShowParallelGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const init: Row[] = [
    { value: "", unit: "Ω" },
    { value: "", unit: "Ω" },
  ];

  // Series
  const series = useRows(init);
  const seriesTotalOhms = useMemo(() => {
    const vals = series.rows
      .map((r) => ({ v: parseFloat(r.value), u: r.unit }))
      .filter((r) => Number.isFinite(r.v) && r.v > 0)
      .map((r) => toOhms(r.v, r.u));
    if (vals.length === 0) return NaN;
    return vals.reduce((a, b) => a + b, 0);
  }, [series.rows]);
  const seriesFmt = formatAllUnits(seriesTotalOhms);
  const seriesValidCount = series.rows.filter(r => parseFloat(r.value) > 0).length;

  // Parallel
  const parallel = useRows(init);
  const parallelTotalOhms = useMemo(() => {
    const vals = parallel.rows
      .map((r) => ({ v: parseFloat(r.value), u: r.unit }))
      .filter((r) => Number.isFinite(r.v) && r.v > 0)
      .map((r) => toOhms(r.v, r.u));
    if (vals.length === 0) return NaN;
    const sumRecip = vals.reduce((a, b) => a + 1 / b, 0);
    if (sumRecip <= 0) return NaN;
    return 1 / sumRecip;
  }, [parallel.rows]);
  const parallelFmt = formatAllUnits(parallelTotalOhms);
  const parallelValidCount = parallel.rows.filter(r => parseFloat(r.value) > 0).length;

  return (
    <div className="space-y-6">
      {/* Series Resistance Calculator */}
      <CalculatorCard
        category="power"
        title="Series Resistance"
        description="Calculate total resistance for series-connected resistors"
        badge="Rt = ΣR"
      >
        <p className="text-sm text-white/60 -mt-2">
          Add resistor values connected in series. Total resistance equals the sum of all resistances.
        </p>

        {/* Resistor Rows */}
        <div className="space-y-2">
          {series.rows.map((row, idx) => (
            <ResistorRow
              key={idx}
              index={idx}
              value={row.value}
              unit={row.unit}
              onValueChange={(v) => series.setValue(idx, v)}
              onUnitChange={(u) => series.setUnit(idx, u)}
              onRemove={() => series.removeRow(idx)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={series.addRow}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            Add Resistor
          </button>
          <button
            onClick={series.reset}
            className="h-12 px-4 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Live Results */}
        {seriesValidCount > 0 && (
          <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
            <div className="text-center mb-3">
              <p className="text-xs text-white/50 mb-1">Total Resistance</p>
              <div
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {seriesFmt.ohm}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-white/60">{seriesFmt.kohm}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-white/60">{seriesFmt.Mohm}</span>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <Collapsible open={showSeriesGuidance} onOpenChange={setShowSeriesGuidance}>
          <div className="rounded-xl border border-blue-400/15 overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">How Series Works</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showSeriesGuidance && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0">
              <div className="space-y-2 text-sm text-blue-200/80">
                <p><strong className="text-blue-300">Formula:</strong> Rt = R1 + R2 + R3 + ...</p>
                <p>In series, current flows through each resistor one after another. The total resistance increases.</p>
                <p className="text-xs text-white/50 mt-2">Example: 100Ω + 200Ω + 300Ω = 600Ω</p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </CalculatorCard>

      {/* Parallel Resistance Calculator */}
      <CalculatorCard
        category="power"
        title="Parallel Resistance"
        description="Calculate total resistance for parallel-connected resistors"
        badge="1/Rt = Σ(1/R)"
      >
        <p className="text-sm text-white/60 -mt-2">
          Add resistor values connected in parallel. Total resistance is less than the smallest resistor.
        </p>

        {/* Resistor Rows */}
        <div className="space-y-2">
          {parallel.rows.map((row, idx) => (
            <ResistorRow
              key={idx}
              index={idx}
              value={row.value}
              unit={row.unit}
              onValueChange={(v) => parallel.setValue(idx, v)}
              onUnitChange={(u) => parallel.setUnit(idx, u)}
              onRemove={() => parallel.removeRow(idx)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={parallel.addRow}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            Add Resistor
          </button>
          <button
            onClick={parallel.reset}
            className="h-12 px-4 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Live Results */}
        {parallelValidCount > 0 && (
          <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
            <div className="text-center mb-3">
              <p className="text-xs text-white/50 mb-1">Total Resistance</p>
              <div
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {parallelFmt.ohm}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-white/60">{parallelFmt.kohm}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-white/60">{parallelFmt.Mohm}</span>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <Collapsible open={showParallelGuidance} onOpenChange={setShowParallelGuidance}>
          <div className="rounded-xl border border-blue-400/15 overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">How Parallel Works</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showParallelGuidance && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0">
              <div className="space-y-2 text-sm text-blue-200/80">
                <p><strong className="text-blue-300">Formula:</strong> 1/Rt = 1/R1 + 1/R2 + 1/R3 + ...</p>
                <p>In parallel, current has multiple paths. The total resistance decreases below the smallest resistor.</p>
                <p className="text-xs text-white/50 mt-2">Example: Two 100Ω in parallel = 50Ω</p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </CalculatorCard>

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Reference</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <p>
                <strong className="text-amber-300">Series circuits:</strong> Used for voltage division, daisy-chained loads, and measuring resistance in cables.
              </p>
              <p>
                <strong className="text-amber-300">Parallel circuits:</strong> Used in ring finals (BS 7671), diversity calculations, and earth electrode arrays.
              </p>
              <p className="text-xs text-white/50 pt-2 border-t border-white/10">
                Ring final circuits combine both series and parallel principles for balanced load distribution.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
