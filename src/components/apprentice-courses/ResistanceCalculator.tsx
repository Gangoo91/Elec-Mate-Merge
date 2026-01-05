import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function round(value: number, dp: number) {
  const p = Math.pow(10, dp);
  return Math.round(value * p) / p;
}

const MATERIALS = {
  copper: { rho_nano: 17.2, alpha: 0.004 }, // ρ in nΩ·m, α per °C
  aluminium: { rho_nano: 28.2, alpha: 0.0039 },
} as const;

const ResistanceCalculator: React.FC = () => {
  const [material, setMaterial] = useState<"copper" | "aluminium" | "custom">("copper");
  const [rhoNano, setRhoNano] = useState<string>(String(MATERIALS.copper.rho_nano));
  const [alpha, setAlpha] = useState<string>(String(MATERIALS.copper.alpha));
  const [length, setLength] = useState<string>("30"); // metres
  const [csa, setCsa] = useState<string>("2.5"); // mm²
  const [temp, setTemp] = useState<string>("20"); // °C
  const [useTemp, setUseTemp] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>(""); // A (optional)
  const [dp, setDp] = useState<number>(3);

  // Sync presets when changing material
  function onMaterialChange(value: string) {
    const v = value as typeof material;
    setMaterial(v);
    if (v !== "custom") {
      const m = MATERIALS[v];
      setRhoNano(String(m.rho_nano));
      setAlpha(String(m.alpha));
    }
  }

  const results = useMemo(() => {
    const L = Number(length);
    const A_mm2 = Number(csa);
    const T = Number(temp);
    const rho_n = Number(rhoNano);
    const a = Number(alpha);
    if ([L, A_mm2, rho_n].some((n) => !isFinite(n) || n <= 0)) return null;

    const rho = rho_n * 1e-9; // to Ω·m
    const A = A_mm2 * 1e-6; // to m²
    const R20 = rho * L / A;
    const RT = useTemp ? R20 * (1 + a * (T - 20)) : R20;

    const I = Number(current);
    const withI = isFinite(I) && I > 0;
    const Vdrop = withI ? I * RT : undefined;
    const Ploss = withI ? I * I * RT : undefined;

    return { R20, RT, Vdrop, Ploss };
  }, [length, csa, rhoNano, alpha, temp, useTemp, current]);

  function reset() {
    onMaterialChange("copper");
    setLength("30");
    setCsa("2.5");
    setTemp("20");
    setUseTemp(false);
    setCurrent("");
    setDp(3);
  }

  return (
    <Card className="mb-8 p-6 bg-card border-border/20">
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="w-5 h-5 text-elec-yellow" />
        <h2 className="text-xl font-semibold text-foreground">Resistance Calculator (R = ρL/A)</h2>
        <Badge variant="outline" className="ml-auto border-elec-yellow/30 text-elec-yellow">Level 2</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Choose a material, enter length and cable size. Optional: add operating temperature and current to see voltage drop and heat in the conductor. Use for learning support only – always verify against BS 7671 Appendix 4 and manufacturer data.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Material</Label>
            <Select value={material} onValueChange={onMaterialChange}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="copper">Copper (ρ ≈ 17.2 nΩ·m, α ≈ 0.004/°C)</SelectItem>
                <SelectItem value="aluminium">Aluminium (ρ ≈ 28.2 nΩ·m, α ≈ 0.0039/°C)</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground">Length L (m)</Label>
              <Input inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">CSA A (mm²)</Label>
              <Input inputMode="decimal" value={csa} onChange={(e) => setCsa(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
            </div>
          </div>

{material === "custom" && (
  <div className="grid grid-cols-3 gap-3 items-end">
    <div className="space-y-2 col-span-2">
      <Label className="text-foreground">Resistivity ρ (nΩ·m)</Label>
      <Input inputMode="decimal" value={rhoNano} onChange={(e) => setRhoNano(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
    </div>
    <div className="space-y-2">
      <Label className="text-foreground">α (per °C)</Label>
      <Input inputMode="decimal" value={alpha} onChange={(e) => setAlpha(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
    </div>
  </div>
)}

          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="space-y-2">
              <Label className="text-foreground">Temperature (°C)</Label>
              <Input inputMode="decimal" value={temp} onChange={(e) => setTemp(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Apply T correction?</Label>
              <Button type="button" variant={useTemp ? "default" : "outline"} onClick={() => setUseTemp((v) => !v)} className="w-full">{useTemp ? "Yes" : "No"}</Button>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Current I (A) (optional)</Label>
              <Input inputMode="decimal" value={current} onChange={(e) => setCurrent(e.target.value.replace(/[^0-9.+\-eE]/g, ""))} className="bg-background" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg p-4 bg-sky-500/10 border border-sky-400/30">
            <h3 className="font-semibold text-sky-300 mb-2">Results</h3>
            {results ? (
              <div className="text-sm text-foreground space-y-1">
                <p><strong>R at 20°C:</strong> {round(results.R20, dp)} Ω</p>
                <p><strong>R at operating T:</strong> {round(results.RT, dp)} Ω</p>
                {results.Vdrop !== undefined && <p><strong>Voltage drop (I × R):</strong> {round(results.Vdrop, dp)} V</p>}
                {results.Ploss !== undefined && <p><strong>Conductor heating (I²R):</strong> {round(results.Ploss, dp)} W</p>}
                <p className="text-xs text-foreground/80 mt-2">Uses standard constants for copper/aluminium (20°C) with optional temperature correction. Always check Appendix 4 and manufacturer data.</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter valid numbers to see results.</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={reset}>Reset</Button>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <Label className="text-muted-foreground">Decimals</Label>
              <Select value={String(dp)} onValueChange={(v) => setDp(Number(v))}>
                <SelectTrigger className="w-20 bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
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
      </div>
    </Card>
  );
};

export default ResistanceCalculator;
