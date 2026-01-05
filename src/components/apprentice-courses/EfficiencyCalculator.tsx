import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * EfficiencyCalculator
 * - Mode 1: Find efficiency (%) from input and output power
 * - Mode 2: Find output power (W) from input power and efficiency
 */
const modes = [
  { key: "efficiency", label: "Find efficiency (%)" },
  { key: "output", label: "Find output power (W)" },
] as const;

type Mode = typeof modes[number]["key"];

const parseNum = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const EfficiencyCalculator: React.FC = () => {
  const [mode, setMode] = useState<Mode>("efficiency");
  const [inputW, setInputW] = useState<string>("");
  const [outputW, setOutputW] = useState<string>("");
  const [effPct, setEffPct] = useState<string>("80");

  const computed = useMemo(() => {
    const input = parseNum(inputW);
    const output = parseNum(outputW);
    const eff = clamp(parseNum(effPct), 0, 100);

    if (mode === "efficiency") {
      if (input <= 0 || output < 0) return { efficiency: 0, loss: 0 };
      const efficiency = clamp((output / input) * 100, 0, 100);
      const loss = Math.max(input - output, 0);
      return { efficiency, loss };
    }

    // mode === "output"
    if (input <= 0) return { efficiency: eff, out: 0, loss: 0 };
    const out = input * (eff / 100);
    const loss = Math.max(input - out, 0);
    return { efficiency: eff, out, loss };
  }, [mode, inputW, outputW, effPct]);

  const reset = () => {
    setInputW("");
    setOutputW("");
    setEffPct("80");
  };

  return (
    <Card className="p-4 md:p-6 bg-card border-border/20">
      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map((m) => (
          <Button
            key={m.key}
            type="button"
            variant={mode === m.key ? "default" : "outline"}
            size="sm"
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-12">
        {/* Inputs */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="inputW">Input power (W)</Label>
              <Input
                id="inputW"
                inputMode="decimal"
                type="number"
                min="0"
                placeholder="e.g. 1000"
                value={inputW}
                onChange={(e) => setInputW(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Nameplate or measured input power</p>
            </div>

            {mode === "efficiency" ? (
              <div>
                <Label htmlFor="outputW">Output (useful) power (W)</Label>
                <Input
                  id="outputW"
                  inputMode="decimal"
                  type="number"
                  min="0"
                  placeholder="e.g. 750"
                  value={outputW}
                  onChange={(e) => setOutputW(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">e.g., mechanical shaft power of a motor</p>
              </div>
            ) : (
              <div>
                <Label htmlFor="effPct">Efficiency (%)</Label>
                <Input
                  id="effPct"
                  inputMode="decimal"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 85"
                  value={effPct}
                  onChange={(e) => setEffPct(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Typical: small motors 70–90%, transformers 90–98%+</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={reset} variant="ghost">Reset</Button>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className={cn("grid gap-3")}>
            <div className="rounded-lg border border-border/20 bg-elec-dark/10 p-4">
              <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
              <p className="text-2xl font-semibold text-foreground">
                {mode === "efficiency"
                  ? `${computed.efficiency.toFixed(1)} %`
                  : `${clamp(parseNum(effPct), 0, 100).toFixed(1)} %`}
              </p>
            </div>

            <div className="rounded-lg border border-border/20 bg-elec-dark/10 p-4">
              <p className="text-xs text-muted-foreground mb-1">Useful output power</p>
              <p className="text-2xl font-semibold text-foreground">
                {mode === "efficiency" ? `${parseNum(outputW).toFixed(0)} W` : `${(computed.out ?? 0).toFixed(0)} W`}
              </p>
            </div>

            <div className="rounded-lg border border-border/20 bg-elec-dark/10 p-4">
              <p className="text-xs text-muted-foreground mb-1">Power lost (as heat etc.)</p>
              <p className="text-2xl font-semibold text-foreground">{(computed.loss ?? 0).toFixed(0)} W</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EfficiencyCalculator;
