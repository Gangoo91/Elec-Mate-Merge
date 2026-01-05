import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";

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
          <MobileSelect value={material} onValueChange={onMaterialChange}>
            <MobileSelectTrigger label="Material">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
              <MobileSelectItem value="copper">Copper (ρ ≈ 17.2 nΩ·m)</MobileSelectItem>
              <MobileSelectItem value="aluminium">Aluminium (ρ ≈ 28.2 nΩ·m)</MobileSelectItem>
              <MobileSelectItem value="custom">Custom</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          <div className="grid grid-cols-2 gap-3">
            <MobileInput
              label="Length L (m)"
              inputMode="decimal"
              value={length}
              onChange={(e) => setLength(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
              unit="m"
            />
            <MobileInput
              label="CSA A (mm²)"
              inputMode="decimal"
              value={csa}
              onChange={(e) => setCsa(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
              unit="mm²"
            />
          </div>

          {material === "custom" && (
            <div className="grid grid-cols-3 gap-3 items-end">
              <div className="col-span-2">
                <MobileInput
                  label="Resistivity ρ (nΩ·m)"
                  inputMode="decimal"
                  value={rhoNano}
                  onChange={(e) => setRhoNano(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
                  unit="nΩ·m"
                />
              </div>
              <MobileInput
                label="α (per °C)"
                inputMode="decimal"
                value={alpha}
                onChange={(e) => setAlpha(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <MobileInput
              label="Temperature (°C)"
              inputMode="decimal"
              value={temp}
              onChange={(e) => setTemp(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
              unit="°C"
            />
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">Apply T correction?</span>
              <MobileButton
                variant={useTemp ? "elec" : "elec-outline"}
                onClick={() => setUseTemp((v) => !v)}
                className="w-full min-h-[48px]"
              >
                {useTemp ? "Yes" : "No"}
              </MobileButton>
            </div>
            <MobileInput
              label="Current I (A) (optional)"
              inputMode="decimal"
              value={current}
              onChange={(e) => setCurrent(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
              unit="A"
            />
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
            <MobileButton onClick={reset} variant="elec-outline" className="min-h-[48px]">Reset</MobileButton>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Decimals</span>
              <MobileSelect value={String(dp)} onValueChange={(v) => setDp(Number(v))}>
                <MobileSelectTrigger className="w-20 min-h-[40px]">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
                  <MobileSelectItem value="0">0</MobileSelectItem>
                  <MobileSelectItem value="1">1</MobileSelectItem>
                  <MobileSelectItem value="2">2</MobileSelectItem>
                  <MobileSelectItem value="3">3</MobileSelectItem>
                  <MobileSelectItem value="4">4</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResistanceCalculator;
