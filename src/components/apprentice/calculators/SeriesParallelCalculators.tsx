import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function SeriesParallelCalculators() {
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

  return (
    <div className="space-y-8">
      <Card className="bg-card border-border/20">
        <CardHeader>
          <CardTitle className="text-foreground">Series Resistance Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add individual resistor values connected in series. The total resistance is the sum of all resistances (BS 7671 principle).
          </p>
          <div className="space-y-3">
            {series.rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-7 sm:col-span-8">
                  <Label htmlFor={`s-val-${idx}`} className="text-sm">R{idx + 1} value</Label>
                  <Input
                    id={`s-val-${idx}`}
                    inputMode="decimal"
                    placeholder="e.g., 220"
                    value={row.value}
                    onChange={(e) => series.setValue(idx, e.target.value)}
                  />
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <Label className="text-sm">Unit</Label>
                  <Select value={row.unit} onValueChange={(v: Unit) => series.setUnit(idx, v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ω" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ω">Ω</SelectItem>
                      <SelectItem value="kΩ">kΩ</SelectItem>
                      <SelectItem value="MΩ">MΩ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    aria-label={`Remove resistor ${idx + 1}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => series.removeRow(idx)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={series.addRow} variant="secondary">Add resistor</Button>
            <Button onClick={series.reset} variant="outline">Reset</Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{seriesFmt.ohm}</div>
            </div>
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{seriesFmt.kohm}</div>
            </div>
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{seriesFmt.Mohm}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/20">
        <CardHeader>
          <CardTitle className="text-foreground">Parallel Resistance Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add resistor values connected in parallel. The total resistance is calculated using 1/Rt = 1/R1 + 1/R2 + … (diversity and parallel paths reduce total R).
          </p>
          <div className="space-y-3">
            {parallel.rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-7 sm:col-span-8">
                  <Label htmlFor={`p-val-${idx}`} className="text-sm">R{idx + 1} value</Label>
                  <Input
                    id={`p-val-${idx}`}
                    inputMode="decimal"
                    placeholder="e.g., 1.2"
                    value={row.value}
                    onChange={(e) => parallel.setValue(idx, e.target.value)}
                  />
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <Label className="text-sm">Unit</Label>
                  <Select value={row.unit} onValueChange={(v: Unit) => parallel.setUnit(idx, v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ω" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ω">Ω</SelectItem>
                      <SelectItem value="kΩ">kΩ</SelectItem>
                      <SelectItem value="MΩ">MΩ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    aria-label={`Remove resistor ${idx + 1}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => parallel.removeRow(idx)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={parallel.addRow} variant="secondary">Add resistor</Button>
            <Button onClick={parallel.reset} variant="outline">Reset</Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{parallelFmt.ohm}</div>
            </div>
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{parallelFmt.kohm}</div>
            </div>
            <div className="bg-accent/30 rounded-md p-3">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-semibold text-foreground">{parallelFmt.Mohm}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
