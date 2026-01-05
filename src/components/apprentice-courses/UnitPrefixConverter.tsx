import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const prefixes = [
  { key: "G", label: "G (giga)", factor: 1e9 },
  { key: "M", label: "M (mega)", factor: 1e6 },
  { key: "k", label: "k (kilo)", factor: 1e3 },
  { key: "base", label: "— (base)", factor: 1 },
  { key: "m", label: "m (milli)", factor: 1e-3 },
  { key: "μ", label: "μ (micro)", factor: 1e-6 },
  { key: "n", label: "n (nano)", factor: 1e-9 },
] as const;

type PrefixKey = typeof prefixes[number]["key"];

type Quantity = {
  key: "V" | "A" | "Ω" | "W" | "Wh" | "Hz";
  label: string;
};

const quantities: Quantity[] = [
  { key: "V", label: "Voltage (V)" },
  { key: "A", label: "Current (A)" },
  { key: "Ω", label: "Resistance (Ω)" },
  { key: "W", label: "Power (W)" },
  { key: "Wh", label: "Energy (Wh)" },
  { key: "Hz", label: "Frequency (Hz)" },
];

function formatNumber(n: number) {
  if (!isFinite(n)) return "";
  if (Math.abs(n) >= 1000 || Math.abs(n) < 0.001) return n.toExponential(3);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

const UnitPrefixConverter: React.FC = () => {
  const [qty, setQty] = useState<Quantity["key"]>("V");
  const [fromP, setFromP] = useState<PrefixKey>("base");
  const [toP, setToP] = useState<PrefixKey>("k");
  const [value, setValue] = useState<string>("1");

  const numeric = Number(value);
  const fromFactor = prefixes.find((p) => p.key === fromP)!.factor;
  const toFactor = prefixes.find((p) => p.key === toP)!.factor;
  const result = isNaN(numeric) ? NaN : (numeric * fromFactor) / toFactor;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium text-foreground">Quantity</Label>
          <Select value={qty} onValueChange={(v) => setQty(v as any)}>
            <SelectTrigger id="quantity" className="h-12 px-2 text-sm bg-background border-border/40 w-full max-w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              {quantities.map((q) => (
                <SelectItem key={q.key} value={q.key}>{q.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">From prefix</Label>
          <Select value={fromP} onValueChange={(v) => setFromP(v as PrefixKey)}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40 w-full max-w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              {prefixes.map((p) => (
                <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">To prefix</Label>
          <Select value={toP} onValueChange={(v) => setToP(v as PrefixKey)}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40 w-full max-w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              {prefixes.map((p) => (
                <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="value" className="text-sm font-medium text-foreground">Value</Label>
        <Input
          id="value"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
          placeholder="Enter number"
          className="bg-background border-border/40 h-12"
          aria-describedby="value-help"
        />
        <p id="value-help" className="text-xs text-muted-foreground">Use decimals or scientific notation (e.g. 1e-3).</p>
      </div>

      <div className="rounded-md border border-border/30 bg-card p-4">
        <p className="text-sm text-muted-foreground mb-1">Result</p>
        <p className="text-2xl font-semibold text-elec-yellow">
          {formatNumber(result)} {(toP === 'base' ? '' : toP)}{qty}
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        BS 7671 reminder: Always verify manufacturer data and instrument scales before converting or applying values.
      </div>
    </div>
  );
};

export default UnitPrefixConverter;
