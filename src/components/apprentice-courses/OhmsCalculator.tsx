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
import { toast } from "@/hooks/use-toast";

// Simple, mobile-friendly Ohm's Law + Power calculator
// Enter any two values, then press Calculate to get the rest.

const unitFactors = {
  V: 1,
  kV: 1000,
  mV: 0.001,
  A: 1,
  mA: 0.001,
  
  "Ω": 1,
  "kΩ": 1000,
  "MΩ": 1_000_000,
  
  W: 1,
  kW: 1000,
} as const;

type VoltUnit = keyof Pick<typeof unitFactors, "V" | "kV" | "mV">;
type AmpUnit = keyof Pick<typeof unitFactors, "A" | "mA">;
type OhmUnit = keyof Pick<typeof unitFactors, "Ω" | "kΩ" | "MΩ">;
type WattUnit = keyof Pick<typeof unitFactors, "W" | "kW">;

function toBase(value: number, unit: keyof typeof unitFactors) {
  return value * unitFactors[unit];
}

function fromBase(value: number, unit: keyof typeof unitFactors) {
  return value / unitFactors[unit];
}

function round(value: number, dp: number) {
  const p = Math.pow(10, dp);
  return Math.round(value * p) / p;
}

const Field = ({
  id,
  label,
  value,
  onValueChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium text-foreground">{label}</Label>
    <div className="flex gap-2">
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onValueChange(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
        placeholder="Enter value"
        className="flex-1 bg-background border-border/40 h-12 md:text-base"
      />
      <div className="w-14 sm:w-16 md:w-18">
        {children}
      </div>
    </div>
  </div>
);

const OhmsCalculator: React.FC = () => {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [p, setP] = useState("");

  const [vUnit, setVUnit] = useState<VoltUnit>("V");
  const [iUnit, setIUnit] = useState<AmpUnit>("A");
  const [rUnit, setRUnit] = useState<OhmUnit>("Ω");
  const [pUnit, setPUnit] = useState<WattUnit>("W");
  const [dp, setDp] = useState<number>(2);

  const filled = useMemo(() => {
    const nums = {
      v: v.trim() !== "" && !isNaN(Number(v)),
      i: i.trim() !== "" && !isNaN(Number(i)),
      r: r.trim() !== "" && !isNaN(Number(r)),
      p: p.trim() !== "" && !isNaN(Number(p)),
    };
    return nums;
  }, [v, i, r, p]);

  function calculate() {
    // Count valid inputs
    const validInputs = Object.values(filled).filter(Boolean).length;
    
    if (validInputs < 2) {
      toast({
        title: "Input Required",
        description: "Enter any two values to calculate the rest.",
        variant: "destructive"
      });
      return;
    }

    // Parse to base units
    const V = filled.v ? toBase(Number(v), vUnit) : undefined;
    const I = filled.i ? toBase(Number(i), iUnit) : undefined;
    const R = filled.r ? toBase(Number(r), rUnit) : undefined;
    const P = filled.p ? toBase(Number(p), pUnit) : undefined;

    let Vb: number, Ib: number, Rb: number, Pb: number;

    // Determine calculation using priority pairs: V&I > V&R > I&R > P&V > P&I > P&R
    try {
      if (V !== undefined && I !== undefined) {
        Vb = V; Ib = I;
        Rb = V / I;
        Pb = V * I;
      } else if (V !== undefined && R !== undefined) {
        Vb = V; Rb = R;
        Ib = V / R;
        Pb = V * Ib;
      } else if (I !== undefined && R !== undefined) {
        Ib = I; Rb = R;
        Vb = I * R;
        Pb = Vb * I;
      } else if (P !== undefined && V !== undefined) {
        Pb = P; Vb = V;
        Ib = P / V;
        Rb = V / Ib;
      } else if (P !== undefined && I !== undefined) {
        Pb = P; Ib = I;
        Vb = P / I;
        Rb = Vb / I;
      } else if (P !== undefined && R !== undefined) {
        Pb = P; Rb = R;
        Ib = Math.sqrt(P / R);
        Vb = Ib * R;
      } else {
        toast({
          title: "Input Required",
          description: "Enter any two values to calculate the rest.",
          variant: "destructive"
        });
        return;
      }

      // Validate results
      if (!isFinite(Vb) || !isFinite(Ib) || !isFinite(Rb) || !isFinite(Pb) || 
          Vb < 0 || Ib < 0 || Rb < 0 || Pb < 0) {
        toast({
          title: "Invalid Calculation",
          description: "Invalid input combination (division by zero or negative values). Please adjust values.",
          variant: "destructive"
        });
        return;
      }

      // Always update ALL fields with calculated values for consistency
      setV(String(round(fromBase(Vb, vUnit), dp)));
      setI(String(round(fromBase(Ib, iUnit), dp)));
      setR(String(round(fromBase(Rb, rUnit), dp)));
      setP(String(round(fromBase(Pb, pUnit), dp)));

    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please check your inputs.",
        variant: "destructive"
      });
    }
  }

  function handleVUnitChange(newUnit: VoltUnit) {
    if (v.trim() !== "" && !isNaN(Number(v))) {
      const baseValue = toBase(Number(v), vUnit);
      const newValue = fromBase(baseValue, newUnit);
      setV(String(round(newValue, dp)));
    }
    setVUnit(newUnit);
  }

  function handleIUnitChange(newUnit: AmpUnit) {
    if (i.trim() !== "" && !isNaN(Number(i))) {
      const baseValue = toBase(Number(i), iUnit);
      const newValue = fromBase(baseValue, newUnit);
      setI(String(round(newValue, dp)));
    }
    setIUnit(newUnit);
  }

  function handleRUnitChange(newUnit: OhmUnit) {
    if (r.trim() !== "" && !isNaN(Number(r))) {
      const baseValue = toBase(Number(r), rUnit);
      const newValue = fromBase(baseValue, newUnit);
      setR(String(round(newValue, dp)));
    }
    setRUnit(newUnit);
  }

  function handlePUnitChange(newUnit: WattUnit) {
    if (p.trim() !== "" && !isNaN(Number(p))) {
      const baseValue = toBase(Number(p), pUnit);
      const newValue = fromBase(baseValue, newUnit);
      setP(String(round(newValue, dp)));
    }
    setPUnit(newUnit);
  }

  function resetAll() {
    setV("");
    setI("");
    setR("");
    setP("");
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="voltage" label="Voltage (V)" value={v} onValueChange={setV}>
          <Select value={vUnit} onValueChange={handleVUnitChange}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="mV">mV</SelectItem>
              <SelectItem value="V">V</SelectItem>
              <SelectItem value="kV">kV</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="current" label="Current (I)" value={i} onValueChange={setI}>
          <Select value={iUnit} onValueChange={handleIUnitChange}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="mA">mA</SelectItem>
              <SelectItem value="A">A</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="resistance" label="Resistance (R)" value={r} onValueChange={setR}>
          <Select value={rUnit} onValueChange={handleRUnitChange}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="Ω">Ω</SelectItem>
              <SelectItem value="kΩ">kΩ</SelectItem>
              <SelectItem value="MΩ">MΩ</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="power" label="Power (P)" value={p} onValueChange={setP}>
          <Select value={pUnit} onValueChange={handlePUnitChange}>
            <SelectTrigger className="h-12 px-2 text-sm bg-background border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="W">W</SelectItem>
              <SelectItem value="kW">kW</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex flex-wrap gap-3 items-center pt-2">
        <Button onClick={calculate} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
          Calculate
        </Button>
        <Button variant="outline" onClick={resetAll} className="border-border/40">
          Reset
        </Button>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <Label htmlFor="precision" className="text-muted-foreground">Decimals</Label>
          <Select value={String(dp)} onValueChange={(val) => {
            const newDp = Number(val);
            setDp(newDp);
            
            // Re-round existing values with new precision
            if (v.trim() !== "" && !isNaN(Number(v))) {
              setV(String(round(Number(v), newDp)));
            }
            if (i.trim() !== "" && !isNaN(Number(i))) {
              setI(String(round(Number(i), newDp)));
            }
            if (r.trim() !== "" && !isNaN(Number(r))) {
              setR(String(round(Number(r), newDp)));
            }
            if (p.trim() !== "" && !isNaN(Number(p))) {
              setP(String(round(Number(p), newDp)));
            }
          }}>
            <SelectTrigger id="precision" className="w-16 h-8 bg-background border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default OhmsCalculator;
