import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

export type PowerMode = "single" | "three";
export type CalcType = "power" | "current";

export const PowerQuickCalc: React.FC = () => {
  const [mode, setMode] = useState<PowerMode>("single");
  const [calc, setCalc] = useState<CalcType>("power");
  const [volts, setVolts] = useState<string>("230");
  const [amps, setAmps] = useState<string>("");
  const [pf, setPf] = useState<string>("1");
  const [kw, setKw] = useState<string>("");
  const [result, setResult] = useState<{ label: string; value: number; unit: string } | null>(null);

  const handleCalculate = () => {
    const parsed = {
      V: parseFloat(volts) || 0,
      I: parseFloat(amps) || 0,
      pf: Math.min(1, Math.max(0, parseFloat(pf) || 0)),
      kW: parseFloat(kw) || 0,
    };

    let calculationResult;
    if (calc === "power") {
      if (mode === "single") {
        const P = parsed.V * parsed.I * parsed.pf; // watts
        calculationResult = { label: "Power", value: isFinite(P) ? P / 1000 : 0, unit: "kW" };
      } else {
        const P = Math.sqrt(3) * parsed.V * parsed.I * parsed.pf; // watts (V is line-to-line in 3φ)
        calculationResult = { label: "Power", value: isFinite(P) ? P / 1000 : 0, unit: "kW" };
      }
    } else {
      // current from power
      const P = parsed.kW * 1000; // watts
      if (mode === "single") {
        const I = parsed.pf > 0 ? P / (parsed.V * parsed.pf) : 0;
        calculationResult = { label: "Current", value: isFinite(I) ? I : 0, unit: "A" };
      } else {
        const I = parsed.pf > 0 ? P / (Math.sqrt(3) * parsed.V * parsed.pf) : 0;
        calculationResult = { label: "Current", value: isFinite(I) ? I : 0, unit: "A" };
      }
    }
    setResult(calculationResult);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-blue-950/20 dark:to-emerald-950/20 border-border/20">
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="text-sm text-muted-foreground">System</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as PowerMode)}>
            <SelectTrigger className="mt-1 border-blue-200/50 focus:border-blue-400">
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single‑phase</SelectItem>
              <SelectItem value="three">Three‑phase (400 V L‑L)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Calculate</Label>
          <Select value={calc} onValueChange={(v) => setCalc(v as CalcType)}>
            <SelectTrigger className="mt-1 border-emerald-200/50 focus:border-emerald-400">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="power">Power (kW) from V, I, pf</SelectItem>
              <SelectItem value="current">Current (A) from kW, V, pf</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Power factor (pf)</Label>
          <Input
            type="number"
            inputMode="decimal"
            step="0.01"
            min={0}
            max={1}
            className="mt-1 border-amber-200/50 focus:border-amber-400"
            value={pf}
            onChange={(e) => setPf(e.target.value)}
            placeholder="1.0"
            aria-label="Power factor"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="text-sm text-muted-foreground">Voltage (V)</Label>
          <Input
            type="number"
            inputMode="decimal"
            className="mt-1 border-purple-200/50 focus:border-purple-400"
            value={volts}
            onChange={(e) => setVolts(e.target.value)}
            placeholder={mode === "single" ? "230" : "400"}
            aria-label="Voltage"
          />
        </div>
        {calc === "power" ? (
          <div>
            <Label className="text-sm text-muted-foreground">Current (A)</Label>
            <Input
              type="number"
              inputMode="decimal"
              className="mt-1 border-cyan-200/50 focus:border-cyan-400"
              value={amps}
              onChange={(e) => setAmps(e.target.value)}
              placeholder="e.g. 10"
              aria-label="Current"
            />
          </div>
        ) : (
          <div>
            <Label className="text-sm text-muted-foreground">Power (kW)</Label>
            <Input
              type="number"
              inputMode="decimal"
              className="mt-1 border-rose-200/50 focus:border-rose-400"
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              placeholder="e.g. 2.3"
              aria-label="Power in kW"
            />
          </div>
        )}
        <div className="flex flex-col justify-end">
          <Button
            onClick={handleCalculate}
            className="bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-elec-dark font-semibold shadow-lg"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-lg border border-emerald-200/50">
          <Label className="text-sm font-semibold text-foreground">{result.label}</Label>
          <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {result.value.toFixed(3)} <span className="text-lg text-muted-foreground">{result.unit}</span>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Three‑phase uses line‑to‑line voltage (400 V typical). Results are approximate; always verify against manufacturer data and BS 7671 design checks.
      </p>
    </Card>
  );
};

export default PowerQuickCalc;
