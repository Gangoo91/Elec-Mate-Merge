
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MobileSelect,
  MobileSelectContent,
  MobileSelectItem,
  MobileSelectTrigger,
  MobileSelectValue,
} from "@/components/ui/mobile-select";
import { Shield, Info, Calculator as CalcIcon, RotateCcw, ChevronDown, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Standard CSA sizes in mm² (typical metric sizes)
const STANDARD_SIZES = [
  1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400,
];

const K_FACTORS: Record<string, Record<number, number>> = {
  // Approximate k values per BS 7671 (Table 54.3 style) for adiabatic formula
  copper: { 60: 103, 70: 115, 90: 143 },
  aluminium: { 60: 65, 70: 76, 90: 94 },
  steel: { 60: 46, 70: 50, 90: 50 }, // steel armour/earthing conductors
};

const AdiabaticCalculator = () => {
  // Input mode
  const [mode, setMode] = useState<"current" | "zs">("current");

  // Common inputs
  const [disconnectionTime, setDisconnectionTime] = useState<string>("");
  const [timePreset, setTimePreset] = useState<string>("custom");

  const [material, setMaterial] = useState<string>("copper");
  const [maxTemp, setMaxTemp] = useState<string>("70"); // 60, 70, 90
  const [customK, setCustomK] = useState<string>("");

  // Mode-specific inputs
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [zs, setZs] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("230");

  // Results
  const [result, setResult] = useState<
    | {
        minimumCsa: number;
        roundedCsa: number;
        k: number;
        usedFaultCurrent: number;
      }
    | null
  >(null);

  const effectiveK = useMemo(() => {
    const kFromMap = K_FACTORS[material]?.[parseFloat(maxTemp)] ?? 115;
    const kCustom = parseFloat(customK);
    return Number.isFinite(kCustom) && kCustom > 0 ? kCustom : kFromMap;
  }, [material, maxTemp, customK]);

  const effectiveTime = useMemo(() => {
    if (timePreset !== "custom") return parseFloat(timePreset);
    const t = parseFloat(disconnectionTime);
    return Number.isFinite(t) && t > 0 ? t : NaN;
  }, [timePreset, disconnectionTime]);

  const computeFaultCurrent = useMemo(() => {
    if (mode === "current") {
      const I = parseFloat(faultCurrent);
      return Number.isFinite(I) && I > 0 ? I : NaN;
    }
    const z = parseFloat(zs);
    const v = parseFloat(voltage);
    if (!Number.isFinite(z) || z <= 0 || !Number.isFinite(v) || v <= 0) return NaN;
    return v / z; // I = Uo / Zs
  }, [mode, faultCurrent, zs, voltage]);

  function roundUpToStandard(size: number) {
    for (const s of STANDARD_SIZES) {
      if (size <= s) return s;
    }
    return STANDARD_SIZES[STANDARD_SIZES.length - 1];
  }

  const calculateAdiabatic = () => {
    const I = computeFaultCurrent;
    const t = effectiveTime;
    const k = effectiveK;

    if (!Number.isFinite(I) || I <= 0 || !Number.isFinite(t) || t <= 0 || !Number.isFinite(k) || k <= 0) {
      setResult(null);
      return;
    }

    // Adiabatic: S = I * sqrt(t) / k
    const minimumCsa = (I * Math.sqrt(t)) / k;
    const roundedCsa = roundUpToStandard(minimumCsa);
    setResult({ minimumCsa, roundedCsa, k, usedFaultCurrent: I });
  };

  const reset = () => {
    setMode("current");
    setFaultCurrent("");
    setZs("");
    setVoltage("230");
    setDisconnectionTime("");
    setTimePreset("custom");
    setMaterial("copper");
    setMaxTemp("70");
    setCustomK("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Adiabatic Equation Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate minimum cable cross-sectional area to withstand fault current (BS 7671).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Input mode */}
            <MobileSelect value={mode} onValueChange={(v) => setMode(v as "current" | "zs") }>
              <MobileSelectTrigger label="Input Mode">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="current">Enter Fault Current (I)</MobileSelectItem>
                <MobileSelectItem value="zs">Calculate I from Zs</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {mode === "current" ? (
              <MobileInput
                label="Prospective Fault Current (I)"
                type="number"
                value={faultCurrent}
                onChange={(e) => setFaultCurrent(e.target.value)}
                placeholder="e.g., 1000"
                unit="A"
              />
            ) : (
              <div className="space-y-3">
                <MobileInput
                  label="Earth Fault Loop Impedance (Zs)"
                  type="number"
                  step="0.001"
                  value={zs}
                  onChange={(e) => setZs(e.target.value)}
                  placeholder="e.g., 0.35"
                  unit="Ω"
                />
                <MobileInput
                  label="Supply Voltage (Uo)"
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="230"
                  unit="V"
                />
                {Number.isFinite(computeFaultCurrent) && computeFaultCurrent > 0 && (
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-elec-yellow" />
                    Derived I ≈ <span className="font-mono text-elec-yellow">{computeFaultCurrent.toFixed(0)} A</span>
                  </div>
                )}
              </div>
            )}

            {/* Time preset + custom */}
            <MobileSelect value={timePreset} onValueChange={(v) => setTimePreset(v)}>
              <MobileSelectTrigger label="Disconnection Time Preset">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="0.1">0.1 s</MobileSelectItem>
                <MobileSelectItem value="0.2">0.2 s</MobileSelectItem>
                <MobileSelectItem value="0.4">0.4 s</MobileSelectItem>
                <MobileSelectItem value="1">1 s</MobileSelectItem>
                <MobileSelectItem value="5">5 s</MobileSelectItem>
                <MobileSelectItem value="custom">Custom</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {timePreset === "custom" && (
              <MobileInput
                label="Disconnection Time (s)"
                type="number"
                step="0.01"
                value={disconnectionTime}
                onChange={(e) => setDisconnectionTime(e.target.value)}
                placeholder="e.g., 0.4"
                unit="s"
              />
            )}

            {/* Material */}
            <MobileSelect value={material} onValueChange={setMaterial}>
              <MobileSelectTrigger label="Conductor Material">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="copper">Copper</MobileSelectItem>
                <MobileSelectItem value="aluminium">Aluminium</MobileSelectItem>
                <MobileSelectItem value="steel">Steel</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {/* Max operating temperature / insulation */}
            <MobileSelect value={maxTemp} onValueChange={setMaxTemp}>
              <MobileSelectTrigger label="Insulation / Max Temp (°C)">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="60">60°C (Rubber/EPR)</MobileSelectItem>
                <MobileSelectItem value="70">70°C (PVC)</MobileSelectItem>
                <MobileSelectItem value="90">90°C (XLPE)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {/* Advanced options */}
            <div className="rounded-md border border-elec-yellow/20 bg-elec-dark/40 p-3">
              <button
                type="button"
                onClick={(e) => {
                  const box = (e.currentTarget.nextElementSibling as HTMLDivElement) || null;
                  if (box) box.classList.toggle("hidden");
                }}
                className="w-full flex items-center justify-between text-sm"
                aria-expanded={false}
              >
                <span>Advanced options</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="mt-3 space-y-3 hidden">
                <MobileInput
                  label="Custom k factor (optional)"
                  type="number"
                  step="1"
                  value={customK}
                  onChange={(e) => setCustomK(e.target.value)}
                  placeholder={`${effectiveK}`}
                />
                <div className="text-xs text-muted-foreground">
                  If provided, this overrides k derived from material and insulation.
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <MobileButton onClick={calculateAdiabatic} className="flex-1" variant="elec" icon={<CalcIcon className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset} aria-label="Reset calculator">
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[220px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Adiabatic Calculation</h3>
                    <Badge variant="secondary" className="mb-2">
                      {material.charAt(0).toUpperCase() + material.slice(1)} @ {maxTemp}°C
                    </Badge>
                    <div className="text-xs text-muted-foreground">k = {result.k}</div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Fault current used:</span>
                      <div className="font-mono text-elec-yellow">{result.usedFaultCurrent.toFixed(0)} A</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Minimum CSA required (S):</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.minimumCsa.toFixed(2)} mm²</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Round up to standard size:</span>
                      <div className="font-mono text-elec-yellow">{result.roundedCsa} mm²</div>
                    </div>

                    <Separator />

                    <div className="text-xs text-muted-foreground">
                      <div>Formula: S = I × √t / k</div>
                      <div>Where S is CSA (mm²), I in Amps, t in seconds, k from BS 7671.</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter inputs then tap Calculate to determine the minimum cable size
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                This tool uses the adiabatic method (no heat loss). Verify results against BS 7671 and manufacturer data.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdiabaticCalculator;
