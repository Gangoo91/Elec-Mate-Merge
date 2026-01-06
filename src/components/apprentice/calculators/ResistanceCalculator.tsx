import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Info, BookOpen, ChevronDown, Thermometer } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

function round(value: number, dp: number) {
  const p = Math.pow(10, dp);
  return Math.round(value * p) / p;
}

const MATERIALS = {
  copper: { rho_nano: 17.2, alpha: 0.004 },
  aluminium: { rho_nano: 28.2, alpha: 0.0039 },
} as const;

interface ResistanceResult {
  R20: number;
  RT: number;
  Vdrop?: number;
  Ploss?: number;
}

const ResistanceCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [material, setMaterial] = useState<string>("copper");
  const [rhoNano, setRhoNano] = useState<string>(String(MATERIALS.copper.rho_nano));
  const [alpha, setAlpha] = useState<string>(String(MATERIALS.copper.alpha));
  const [length, setLength] = useState<string>("30");
  const [csa, setCsa] = useState<string>("2.5");
  const [temp, setTemp] = useState<string>("20");
  const [useTemp, setUseTemp] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("");
  const [dp, setDp] = useState<string>("3");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  function onMaterialChange(value: string) {
    setMaterial(value);
    if (value !== "custom") {
      const m = MATERIALS[value as keyof typeof MATERIALS];
      setRhoNano(String(m.rho_nano));
      setAlpha(String(m.alpha));
    }
  }

  const results = useMemo<ResistanceResult | null>(() => {
    const L = Number(length);
    const A_mm2 = Number(csa);
    const T = Number(temp);
    const rho_n = Number(rhoNano);
    const a = Number(alpha);
    if ([L, A_mm2, rho_n].some((n) => !isFinite(n) || n <= 0)) return null;

    const rho = rho_n * 1e-9;
    const A = A_mm2 * 1e-6;
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
    setDp("3");
  }

  const hasValidInputs = () => length && csa;
  const decimalPlaces = parseInt(dp) || 3;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Resistance Calculator (R = pL/A)"
        description="Calculate conductor resistance using resistivity, length, and cross-sectional area"
        badge="BS 7671"
      >
        <CalculatorSelect
          label="Material"
          value={material}
          onChange={onMaterialChange}
          options={[
            { value: "copper", label: "Copper (p = 17.2 nO.m)" },
            { value: "aluminium", label: "Aluminium (p = 28.2 nO.m)" },
            { value: "custom", label: "Custom Material" },
          ]}
        />

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Length (L)"
            unit="m"
            type="text"
            inputMode="decimal"
            value={length}
            onChange={setLength}
            placeholder="e.g., 30"
          />
          <CalculatorInput
            label="Cross-Sectional Area (A)"
            unit="mm2"
            type="text"
            inputMode="decimal"
            value={csa}
            onChange={setCsa}
            placeholder="e.g., 2.5"
          />
        </CalculatorInputGrid>

        {material === "custom" && (
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Resistivity (p)"
              unit="nO.m"
              type="text"
              inputMode="decimal"
              value={rhoNano}
              onChange={setRhoNano}
              placeholder="e.g., 17.2"
            />
            <CalculatorInput
              label="Temp Coefficient (a)"
              unit="per C"
              type="text"
              inputMode="decimal"
              value={alpha}
              onChange={setAlpha}
              placeholder="e.g., 0.004"
            />
          </CalculatorInputGrid>
        )}

        {/* Temperature Correction */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white">Temperature Correction</span>
            </div>
            <button
              onClick={() => setUseTemp(!useTemp)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                useTemp
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
              )}
            >
              {useTemp ? "Enabled" : "Disabled"}
            </button>
          </div>
          <CalculatorInput
            label="Operating Temperature"
            unit="C"
            type="text"
            inputMode="decimal"
            value={temp}
            onChange={setTemp}
            placeholder="20"
            hint="Reference: 20C"
          />
        </div>

        <CalculatorInput
          label="Current (optional)"
          unit="A"
          type="text"
          inputMode="decimal"
          value={current}
          onChange={setCurrent}
          placeholder="For V drop & P loss"
          hint="Enter current to calculate voltage drop and power loss"
        />

        <CalculatorActions
          category="power"
          onCalculate={() => {}} // Results auto-calculate
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Results update automatically"
        />
      </CalculatorCard>

      {/* Results */}
      {results && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Resistance Results</span>
              <Badge variant="outline" className="text-amber-400 border-amber-400/50">
                {material === "custom" ? "Custom" : material === "copper" ? "Copper" : "Aluminium"}
              </Badge>
            </div>

            {/* Primary Result */}
            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">
                Resistance at {useTemp ? `${temp}C` : "20C"}
              </p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {round(results.RT, decimalPlaces)} O
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="R at 20C (Reference)"
                value={round(results.R20, decimalPlaces).toString()}
                unit="O"
                category="power"
                size="sm"
              />
              <ResultValue
                label="R at Operating Temp"
                value={round(results.RT, decimalPlaces).toString()}
                unit="O"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {(results.Vdrop !== undefined || results.Ploss !== undefined) && (
              <div className="p-3 rounded-lg bg-white/5 space-y-2 mt-3">
                <h4 className="text-sm font-medium text-amber-400">Current-Dependent Values</h4>
                <ResultsGrid columns={2}>
                  {results.Vdrop !== undefined && (
                    <ResultValue
                      label="Voltage Drop (I x R)"
                      value={round(results.Vdrop, decimalPlaces).toString()}
                      unit="V"
                      category="power"
                      size="sm"
                    />
                  )}
                  {results.Ploss !== undefined && (
                    <ResultValue
                      label="Power Loss (I2R)"
                      value={round(results.Ploss, decimalPlaces).toString()}
                      unit="W"
                      category="power"
                      size="sm"
                    />
                  )}
                </ResultsGrid>
              </div>
            )}

            {/* Decimal Places Selector */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <span className="text-xs text-white/70">Decimals:</span>
              <select
                value={dp}
                onChange={(e) => setDp(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </CalculatorResult>

          {/* How It Worked Out */}
          <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showCalculation && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 1: Input Values</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100 space-y-1">
                    <p>Material: {material === "copper" ? "Copper" : material === "aluminium" ? "Aluminium" : "Custom"}</p>
                    <p>Resistivity (p): {rhoNano} nO.m = {(parseFloat(rhoNano) * 1e-9).toExponential(3)} O.m</p>
                    <p>Length (L): {length} m</p>
                    <p>CSA (A): {csa} mm2 = {(parseFloat(csa) * 1e-6).toExponential(3)} m2</p>
                    {useTemp && <p>Temperature: {temp}C (a = {alpha} per C)</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 2: Base Resistance at 20C</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100">
                    <p>R = p x L / A</p>
                    <p>R = {rhoNano} x 10^-9 x {length} / ({csa} x 10^-6)</p>
                    <p className="text-purple-300">R20 = {round(results.R20, decimalPlaces)} O</p>
                  </div>
                </div>

                {useTemp && (
                  <div className="space-y-2">
                    <p className="text-sm text-purple-200 font-medium">Step 3: Temperature Correction</p>
                    <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100">
                      <p>RT = R20 x (1 + a x (T - 20))</p>
                      <p>RT = {round(results.R20, decimalPlaces)} x (1 + {alpha} x ({temp} - 20))</p>
                      <p className="text-purple-300">RT = {round(results.RT, decimalPlaces)} O</p>
                    </div>
                  </div>
                )}

                {results.Vdrop !== undefined && (
                  <div className="space-y-2">
                    <p className="text-sm text-purple-200 font-medium">Step {useTemp ? "4" : "3"}: Voltage Drop & Power Loss</p>
                    <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100">
                      <p>Vdrop = I x R = {current} x {round(results.RT, decimalPlaces)} = {round(results.Vdrop!, decimalPlaces)} V</p>
                      <p>Ploss = I2 x R = {current}2 x {round(results.RT, decimalPlaces)} = {round(results.Ploss!, decimalPlaces)} W</p>
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Conductor Resistance:</strong> The resistance increases with length and decreases with larger cross-sectional area.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Temperature Effect:</strong> Copper resistance increases approximately 0.4% per degree Celsius above 20C.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Voltage Drop:</strong> Critical for circuit design - BS 7671 limits voltage drop to 3-5% depending on circuit type.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Power Loss:</strong> Heat generated in the conductor due to I2R losses - affects cable rating.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Regs at a Glance */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Reference</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showBsRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Appendix 4:</strong> Contains resistivity values and temperature coefficients for various conductor materials</p>
                  <p><strong className="text-amber-300">Section 525:</strong> Voltage drop limits - typically 3% for lighting, 5% for other circuits</p>
                  <p><strong className="text-amber-300">Section 523:</strong> Current-carrying capacity must account for grouping and thermal conditions</p>
                  <p><strong className="text-amber-300">Note:</strong> Always verify against manufacturer data and current BS 7671 edition</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-200">
            <strong>Formula:</strong> R = pL/A where p = resistivity (O.m), L = length (m), A = area (m2)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResistanceCalculator;
