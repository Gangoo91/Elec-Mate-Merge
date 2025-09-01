
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
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
import { Shield, Info, Calculator as CalcIcon, RotateCcw, ChevronDown, Zap, CheckCircle, AlertTriangle, BookOpen, Lightbulb, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";

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

  // Results and validation
  const [result, setResult] = useState<
    | {
        minimumCsa: number;
        roundedCsa: number;
        k: number;
        usedFaultCurrent: number;
        disconnectionTime: number;
        material: string;
        maxTemp: string;
        isCompliant: boolean;
        complianceNotes: string[];
      }
    | null
  >(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    if (mode === "current") {
      if (!faultCurrent || parseFloat(faultCurrent) <= 0) {
        newErrors.faultCurrent = "Fault current must be greater than 0";
      }
    } else {
      if (!zs || parseFloat(zs) <= 0) {
        newErrors.zs = "Zs must be greater than 0";
      }
      if (!voltage || parseFloat(voltage) <= 0) {
        newErrors.voltage = "Voltage must be greater than 0";
      }
    }
    
    if (timePreset === "custom" && (!disconnectionTime || parseFloat(disconnectionTime) <= 0)) {
      newErrors.disconnectionTime = "Disconnection time must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAdiabatic = () => {
    if (!validateInputs()) return;
    
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
    
    // Compliance checks
    const complianceNotes: string[] = [];
    let isCompliant = true;
    
    if (t > 5) {
      complianceNotes.push("Disconnection time >5s may require additional considerations per BS 7671");
      isCompliant = false;
    }
    
    if (I > 10000) {
      complianceNotes.push("Very high fault current - verify calculation method and protection coordination");
    }
    
    if (roundedCsa < 1.5) {
      complianceNotes.push("Minimum 1.5mm² generally required for fixed wiring per BS 7671");
    }
    
    setResult({ 
      minimumCsa, 
      roundedCsa, 
      k, 
      usedFaultCurrent: I, 
      disconnectionTime: t,
      material,
      maxTemp,
      isCompliant,
      complianceNotes
    });
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
    setErrors({});
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
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
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
              <MobileInputWrapper
                label="Prospective Fault Current (I)"
                type="number"
                value={faultCurrent}
                onChange={(value) => {
                  setFaultCurrent(value);
                  if (errors.faultCurrent) {
                    const newErrors = { ...errors };
                    delete newErrors.faultCurrent;
                    setErrors(newErrors);
                  }
                }}
                placeholder="e.g., 1000"
                unit="A"
                error={errors.faultCurrent}
                hint="Enter the prospective fault current at the point of connection"
                icon={<Zap className="h-4 w-4" />}
              />
            ) : (
              <div className="space-y-4">
                <MobileInputWrapper
                  label="Earth Fault Loop Impedance (Zs)"
                  type="number"
                  step="0.001"
                  value={zs}
                  onChange={(value) => {
                    setZs(value);
                    if (errors.zs) {
                      const newErrors = { ...errors };
                      delete newErrors.zs;
                      setErrors(newErrors);
                    }
                  }}
                  placeholder="e.g., 0.35"
                  unit="Ω"
                  error={errors.zs}
                  hint="Total earth fault loop impedance from supply to fault point"
                />
                <MobileInputWrapper
                  label="Supply Voltage (Uo)"
                  type="number"
                  value={voltage}
                  onChange={(value) => {
                    setVoltage(value);
                    if (errors.voltage) {
                      const newErrors = { ...errors };
                      delete newErrors.voltage;
                      setErrors(newErrors);
                    }
                  }}
                  placeholder="230"
                  unit="V"
                  error={errors.voltage}
                  hint="Line to earth voltage (230V for UK single phase)"
                />
                {Number.isFinite(computeFaultCurrent) && computeFaultCurrent > 0 && (
                  <div className="p-3 bg-elec-card/50 border border-elec-yellow/20 rounded-lg">
                    <div className="text-sm text-elec-light flex items-center gap-2">
                      <Zap className="h-4 w-4 text-elec-yellow" />
                      <span>Calculated fault current: </span>
                      <span className="font-mono text-elec-yellow font-medium">{computeFaultCurrent.toFixed(0)} A</span>
                    </div>
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
              <MobileInputWrapper
                label="Disconnection Time (t)"
                type="number"
                step="0.01"
                value={disconnectionTime}
                onChange={(value) => {
                  setDisconnectionTime(value);
                  if (errors.disconnectionTime) {
                    const newErrors = { ...errors };
                    delete newErrors.disconnectionTime;
                    setErrors(newErrors);
                  }
                }}
                placeholder="e.g., 0.4"
                unit="s"
                error={errors.disconnectionTime}
                hint="Maximum disconnection time per BS 7671 requirements"
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
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-card/30 p-4">
              <button
                type="button"
                onClick={(e) => {
                  const box = (e.currentTarget.nextElementSibling as HTMLDivElement) || null;
                  if (box) box.classList.toggle("hidden");
                }}
                className="w-full flex items-center justify-between text-sm text-elec-light hover:text-elec-yellow transition-colors"
                aria-expanded={false}
              >
                <span className="font-medium">Advanced Options</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="mt-4 space-y-4 hidden">
                <MobileInputWrapper
                  label="Custom k factor (optional)"
                  type="number"
                  step="1"
                  value={customK}
                  onChange={setCustomK}
                  placeholder={`Default: ${effectiveK}`}
                  hint="Override material-based k factor. Use values from manufacturer data or BS 7671 Table 54.3"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <MobileButton onClick={calculateAdiabatic} className="flex-1" variant="elec" icon={<CalcIcon className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset} aria-label="Reset calculator">
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
            </div>

            {/* Results Section */}
            <div className="space-y-5">
              <div className="bg-elec-card border border-elec-yellow/20 rounded-xl p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center border-b border-elec-yellow/20 pb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {result.isCompliant ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-400" />
                        )}
                        <h3 className="text-xl font-semibold text-elec-yellow">
                          Adiabatic Calculation Results
                        </h3>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                          {result.material.charAt(0).toUpperCase() + result.material.slice(1)} @ {result.maxTemp}°C
                        </Badge>
                        <span className="text-sm text-elec-light/70">k = {result.k}</span>
                      </div>
                    </div>

                    {/* Key Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                        <div className="text-sm text-elec-light/70 mb-1">Minimum CSA Required</div>
                        <div className="text-2xl font-mono font-bold text-elec-yellow">
                          {result.minimumCsa.toFixed(2)} mm²
                        </div>
                      </div>
                      <div className="bg-elec-dark/50 rounded-lg p-4 text-center">
                        <div className="text-sm text-elec-light/70 mb-1">Standard Cable Size</div>
                        <div className="text-2xl font-mono font-bold text-elec-yellow">
                          {result.roundedCsa} mm²
                        </div>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-elec-light flex items-center gap-2">
                        <FileText className="h-4 w-4 text-elec-yellow" />
                        Calculation Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-elec-light/70">Fault Current (I):</span>
                          <div className="font-mono text-elec-yellow">{result.usedFaultCurrent.toFixed(0)} A</div>
                        </div>
                        <div>
                          <span className="text-elec-light/70">Disconnection Time (t):</span>
                          <div className="font-mono text-elec-yellow">{result.disconnectionTime} s</div>
                        </div>
                      </div>
                      <div className="text-xs text-elec-light/60 bg-elec-dark/30 rounded p-3">
                        <div className="font-mono">Formula: S = I × √t / k</div>
                        <div className="mt-1">Where S = CSA (mm²), I = current (A), t = time (s), k = material factor</div>
                      </div>
                    </div>

                    {/* Compliance Notes */}
                    {result.complianceNotes.length > 0 && (
                      <Alert className={result.isCompliant ? "border-amber-500/20 bg-amber-500/10" : "border-red-500/20 bg-red-500/10"}>
                        <AlertTriangle className={`h-4 w-4 ${result.isCompliant ? "text-amber-400" : "text-red-400"}`} />
                        <AlertDescription className={result.isCompliant ? "text-amber-200" : "text-red-200"}>
                          <div className="font-medium mb-2">Compliance Notes:</div>
                          <ul className="space-y-1 text-sm">
                            {result.complianceNotes.map((note, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Enhanced Results Feedback */}
                    <div className="space-y-4 mt-6 pt-4 border-t border-elec-yellow/20">
                      <h4 className="font-medium text-elec-light flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-elec-yellow" />
                        Installation Guidance
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-elec-dark/50 rounded-lg p-4">
                          <div className="text-sm font-medium text-elec-yellow mb-2">Next Steps:</div>
                          <ul className="space-y-2 text-sm text-elec-light/80">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>Verify the {result.roundedCsa}mm² cable is available and suitable for your installation method</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>Check current-carrying capacity meets circuit requirements (this calculation is for fault conditions only)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>Ensure protective device operates within {result.disconnectionTime}s at calculated fault level</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>Document calculation for electrical certificate and future reference</span>
                            </li>
                          </ul>
                        </div>

                        {result.roundedCsa !== result.minimumCsa && (
                          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                            <div className="text-sm font-medium text-green-400 mb-2">Safety Margin:</div>
                            <div className="text-sm text-green-200">
                              The selected {result.roundedCsa}mm² cable provides a {((result.roundedCsa / result.minimumCsa - 1) * 100).toFixed(1)}% safety margin above the minimum required {result.minimumCsa.toFixed(2)}mm².
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-elec-light/60">
                    <CalcIcon className="h-12 w-12 mb-4 text-elec-yellow/30" />
                    <p className="text-center">
                      Enter all required parameters and click Calculate to determine the minimum cable cross-sectional area
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="space-y-6 pt-6 border-t border-elec-yellow/20">
          <WhyThisMatters
            title="Why Adiabatic Calculations Matter"
            points={[
              "The adiabatic equation ensures cables can withstand fault currents without dangerous overheating",
              "BS 7671 requires protective devices to operate within specific time limits for safety",
              "Undersized cables during fault conditions can cause fires or equipment damage",
              "This calculation is mandatory for earthing conductor sizing and short-circuit protection",
              "Proper cable sizing ensures compliance with UK electrical regulations and insurance requirements"
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InfoBox
              title="BS 7671 Requirements"
              icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
              className="h-full"
            >
              <ul className="space-y-3 text-elec-light text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Section 543:</strong> Earthing conductors must be sized using adiabatic equation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Table 54.3:</strong> k factors for different conductor materials and insulation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Regulation 411.3.2:</strong> Maximum disconnection times for automatic disconnection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Section 434:</strong> Protection against overcurrent in case of short-circuit</span>
                </li>
              </ul>
            </InfoBox>

            <InfoBox
              title="Practical Guidance"
              icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
              className="h-full"
            >
              <ul className="space-y-3 text-elec-light text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use manufacturer's k values when available for greater accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span>Consider derating factors for cables in conduits or high ambient temperatures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span>Verify protection device characteristics match calculated fault levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span>Document calculations for inspection and certification purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  <span>Regular testing ensures actual values match design calculations</span>
                </li>
              </ul>
            </InfoBox>
          </div>

          <Alert className="border-elec-yellow/30 bg-elec-yellow/5">
            <Info className="h-5 w-5 text-elec-yellow" />
            <AlertDescription className="text-elec-light">
              <div className="font-semibold mb-3 text-elec-yellow">Important Notes:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm leading-relaxed">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span>This calculation assumes adiabatic conditions (no heat dissipation)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span>Always verify results against manufacturer data and BS 7671</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span>Consider additional factors like voltage drop and current-carrying capacity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    <span>For complex installations, consult a qualified electrical engineer</span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdiabaticCalculator;
