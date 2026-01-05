import React, { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simple Cable Sizer (Volt drop focused)
// Assumptions:
// - Single phase 230 V
// - Length is one-way route; tool doubles internally for out + back
// - Checks voltage drop against 3% (lighting) or 5% (other/power)
// - Uses typical Appendix 4-style mV/A/m values for Cu conductors (educational aid)
// - Always verify against BS 7671 Appendix 4 and manufacturer data

const mvamData: Record<string, Record<string, Record<number, number>>> = {
  "Copper T&E": {
    "Clipped direct": {
      1: 44,
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
    },
    Buried: {
      1: 44,
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
    },
  },
  "Copper SWA": {
    "Clipped direct": {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
    },
    Buried: {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
    },
  },
};

function round(value: number, dp = 2) {
  const p = Math.pow(10, dp);
  return Math.round(value * p) / p;
}

const SimpleCableSizer: React.FC = () => {
  const [circuit, setCircuit] = useState<"lighting" | "other">("other");
  const [family, setFamily] = useState<keyof typeof mvamData>("Copper T&E");
  const [method, setMethod] = useState<"Clipped direct" | "Buried">("Clipped direct");
  const [length, setLength] = useState<string>("30"); // one-way route length in metres
  const [current, setCurrent] = useState<string>("16"); // in amps

  const dataForMethod = mvamData[family][method];
  const sizes = useMemo(() => Object.keys(dataForMethod).map(Number).sort((a, b) => a - b), [dataForMethod]);

  const results = useMemo(() => {
    const I = Number(current);
    const Lroute = Number(length);
    if (!isFinite(I) || I <= 0 || !isFinite(Lroute) || Lroute <= 0) return null;
    const Ltotal = Lroute * 2; // out + back
    const limit = circuit === "lighting" ? 3 : 5;

    const rows = sizes.map((size) => {
      const mvam = dataForMethod[size];
      const Vd = (mvam * I * Ltotal) / 1000; // volts
      const pct = (Vd / 230) * 100;
      const within = pct <= limit;
      return { size, mvam, Vd, pct, within };
    });

    const recommended = rows.find((r) => r.within) || null;

    return { limit, rows, recommended };
  }, [sizes, dataForMethod, current, length, circuit]);

  function reset() {
    setCircuit("other");
    setFamily("Copper T&E");
    setMethod("Clipped direct");
    setLength("30");
    setCurrent("16");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-2 mb-3">
        <Label className="text-foreground">Circuit type</Label>
        <RadioGroup
          value={circuit}
          onValueChange={(v) => setCircuit((v as "lighting" | "other") ?? "other")}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem id="s-light" value="lighting" />
            <Label htmlFor="s-light">Lighting (3%)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="s-other" value="other" />
            <Label htmlFor="s-other">Other/Power (5%)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-foreground">Cable family</Label>
          <Select value={family} onValueChange={(v) => setFamily(v as keyof typeof mvamData)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select family" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mvamData).map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-foreground">Installation</Label>
          <Select value={method} onValueChange={(v) => setMethod(v as any)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Clipped direct">Clipped direct</SelectItem>
              <SelectItem value="Buried">Buried</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="space-y-1.5">
          <Label className="text-foreground">Route length (m)</Label>
          <Input
            inputMode="decimal"
            value={length}
            onChange={(e) => setLength(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
            className="bg-background"
          />
          <p className="text-xs text-muted-foreground">One-way length. We double it for out and back.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-foreground">Load current I (A)</Label>
          <Input
            inputMode="decimal"
            value={current}
            onChange={(e) => setCurrent(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
            className="bg-background"
          />
        </div>
      </div>

      <div className={`rounded-lg p-3 border mb-3 ${
        results?.recommended ? "bg-emerald-500/10 border-emerald-400/30" : "bg-red-500/10 border-red-400/30"
      }`}>
        {results ? (
          <div className="text-sm text-foreground space-y-1.5">
            {results.recommended ? (
              <>
                <p className="font-semibold">Recommendation: {results.recommended.size} mm²</p>
                <p>Yes – {round(results.recommended.pct, 2)}% ≤ {results.limit}% limit.</p>
              </>
            ) : (
              <>
                <p className="font-semibold">No pass in the listed sizes</p>
                <p>Try a larger CSA, shorter run, or lower current.</p>
              </>
            )}
            <p className="text-xs opacity-90">
              Educational tool: verify against BS 7671 Appendix 4 tables (mV/A/m) and manufacturer data.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter length and current to get a simple recommendation.</p>
        )}
      </div>

      {/* Mini summary list */}
      {results && (
        <div className="rounded-lg border border-border/20 bg-elec-dark/10 p-2">
          <div className="text-xs text-muted-foreground mb-2">Nearby sizes (volt drop check):</div>
          <ul className="space-y-1 text-sm">
            {results.rows.map((r) => (
              <li key={r.size} className="flex items-center justify-between">
                <span>
                  {r.size} mm² {r.within ? "– OK" : "– Not OK"}
                </span>
                <span className="text-muted-foreground">
                  {round(r.pct, 2)}% ({round(r.Vd, 2)} V)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

export default SimpleCableSizer;
