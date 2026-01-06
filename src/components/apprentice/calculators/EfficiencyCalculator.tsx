import { useMemo, useState } from "react";
import { Info, BookOpen, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const modes = [
  { key: "efficiency", label: "Find η (%)" },
  { key: "output", label: "Find Output (W)" },
] as const;

type Mode = typeof modes[number]["key"];

const parseNum = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const EfficiencyCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [mode, setMode] = useState<Mode>("efficiency");
  const [inputW, setInputW] = useState<string>("");
  const [outputW, setOutputW] = useState<string>("");
  const [effPct, setEffPct] = useState<string>("80");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const computed = useMemo(() => {
    const input = parseNum(inputW);
    const output = parseNum(outputW);
    const eff = clamp(parseNum(effPct), 0, 100);

    if (mode === "efficiency") {
      if (input <= 0 || output < 0) return { efficiency: 0, loss: 0, hasResult: false };
      const efficiency = clamp((output / input) * 100, 0, 100);
      const loss = Math.max(input - output, 0);
      return { efficiency, loss, hasResult: input > 0 && output > 0 };
    }

    // mode === "output"
    if (input <= 0) return { efficiency: eff, out: 0, loss: 0, hasResult: false };
    const out = input * (eff / 100);
    const loss = Math.max(input - out, 0);
    return { efficiency: eff, out, loss, hasResult: input > 0 };
  }, [mode, inputW, outputW, effPct]);

  const reset = () => {
    setInputW("");
    setOutputW("");
    setEffPct("80");
  };

  const getEfficiencyColor = (eff: number) => {
    if (eff >= 90) return "text-green-400";
    if (eff >= 75) return "text-amber-400";
    return "text-red-400";
  };

  const getEfficiencyRating = (eff: number) => {
    if (eff >= 95) return "Excellent";
    if (eff >= 90) return "Very Good";
    if (eff >= 80) return "Good";
    if (eff >= 70) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Efficiency Calculator"
        description="Calculate electrical efficiency, output power, and losses"
        badge="η"
      >
        {/* Mode Selection */}
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={cn(
                "flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation",
                mode === m.key
                  ? "text-black"
                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
              )}
              style={mode === m.key ? {
                background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
              } : undefined}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <CalculatorInput
          label="Input Power"
          unit="W"
          type="text"
          inputMode="decimal"
          value={inputW}
          onChange={setInputW}
          placeholder="e.g., 1000"
          hint="Electrical power consumed"
        />

        {mode === "efficiency" ? (
          <CalculatorInput
            label="Output Power"
            unit="W"
            type="text"
            inputMode="decimal"
            value={outputW}
            onChange={setOutputW}
            placeholder="e.g., 750"
            hint="Useful mechanical/output power"
          />
        ) : (
          <CalculatorInput
            label="Efficiency"
            unit="%"
            type="text"
            inputMode="decimal"
            value={effPct}
            onChange={setEffPct}
            placeholder="e.g., 85"
            hint="Motors: 70-95%, Transformers: 90-99%"
          />
        )}

        {/* Reset Button */}
        <button
          onClick={reset}
          className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
        >
          Reset
        </button>
      </CalculatorCard>

      {/* Live Results */}
      {computed.hasResult && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">
                {mode === "efficiency" ? "Efficiency" : "Output Power"}
              </p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {mode === "efficiency"
                  ? `${computed.efficiency.toFixed(1)}%`
                  : `${(computed.out ?? 0).toFixed(0)} W`}
              </div>
              {mode === "efficiency" && (
                <p className={cn("text-sm mt-1", getEfficiencyColor(computed.efficiency))}>
                  {getEfficiencyRating(computed.efficiency)}
                </p>
              )}
            </div>

            <ResultsGrid columns={2}>
              {mode === "output" && (
                <ResultValue
                  label="Efficiency"
                  value={computed.efficiency.toFixed(1)}
                  unit="%"
                  category="power"
                  size="sm"
                />
              )}
              <ResultValue
                label="Power Lost"
                value={computed.loss.toFixed(0)}
                unit="W"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Input Power"
                value={parseNum(inputW).toFixed(0)}
                unit="W"
                category="power"
                size="sm"
              />
              {mode === "efficiency" && (
                <ResultValue
                  label="Output Power"
                  value={parseNum(outputW).toFixed(0)}
                  unit="W"
                  category="power"
                  size="sm"
                />
              )}
            </ResultsGrid>

            {/* Visual Bar */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-xs text-white/80 mb-2">Power Distribution</p>
              <div className="h-6 rounded-full overflow-hidden bg-white/10 flex">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${computed.efficiency}%`,
                    background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`
                  }}
                />
                <div
                  className="h-full bg-red-500/50"
                  style={{ width: `${100 - computed.efficiency}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-white/80">
                <span>Useful: {computed.efficiency.toFixed(0)}%</span>
                <span>Lost: {(100 - computed.efficiency).toFixed(0)}%</span>
              </div>
            </div>
          </CalculatorResult>

          {/* Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-blue-200/80">
                  <p>
                    <strong className="text-blue-300">η = Pout ÷ Pin × 100%</strong>
                  </p>
                  <p>
                    Power lost typically dissipates as heat. Higher efficiency = less energy waste and lower operating costs.
                  </p>
                  {computed.loss > 0 && (
                    <p>
                      <strong className="text-blue-300">Heat generated:</strong> ~{computed.loss.toFixed(0)} W of heat needs to be dissipated
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">Typical Efficiencies</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Motors</p>
                <p className="text-amber-200/70">Small: 70-85%</p>
                <p className="text-amber-200/70">Large: 90-97%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Transformers</p>
                <p className="text-amber-200/70">Distribution: 95-99%</p>
                <p className="text-amber-200/70">Power: 98-99.5%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">LED Lighting</p>
                <p className="text-amber-200/70">Driver: 85-95%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Inverters</p>
                <p className="text-amber-200/70">VFDs: 95-98%</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default EfficiencyCalculator;
