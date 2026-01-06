import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cable, Info, Calculator, AlertTriangle, CheckCircle2, BookOpen, ChevronDown } from "lucide-react";
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

const CableDeratingCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [baseRating, setBaseRating] = useState("");
  const [cableType, setCableType] = useState("pvc-70");
  const [installationMethod, setInstallationMethod] = useState("method-c");
  const [ambientTemp, setAmbientTemp] = useState("30");
  const [numberOfCables, setNumberOfCables] = useState("1");
  const [thermalInsulation, setThermalInsulation] = useState("none");
  const [soilThermalResistivity, setSoilThermalResistivity] = useState("2.5");

  // Enhanced inputs for protective device compliance
  const [designCurrent, setDesignCurrent] = useState<string>("");
  const [deviceRating, setDeviceRating] = useState<string>("32");

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactor: number;
    thermalInsulationFactor: number;
    soilFactor: number;
    totalDerating: number;
    finalRating: number;
    deratingPercentage: number;
    warnings: string[];
    compliance: {
      Ib: number;
      In: number;
      Iz: number;
      ibInCompliant: boolean;
      inIzCompliant: boolean;
      overallCompliant: boolean;
      safetyMargin: number;
    } | null;
  } | null>(null);

  // Cable types with reference temperatures
  const cableTypes = [
    { value: "pvc-70", label: "PVC Insulated 70°C", refTemp: 70 },
    { value: "xlpe-90", label: "XLPE Insulated 90°C", refTemp: 90 },
    { value: "lsf-70", label: "LSF Insulated 70°C", refTemp: 70 },
    { value: "mineral-70", label: "Mineral Insulated 70°C", refTemp: 70 },
    { value: "mineral-105", label: "Mineral Insulated 105°C", refTemp: 105 },
    { value: "silicone-180", label: "Silicone Insulated 180°C", refTemp: 180 }
  ];

  // BS 7671 Reference Installation Methods
  const installationMethods = [
    { value: "method-a1", label: "Method A1 - Enclosed in conduit on wall" },
    { value: "method-a2", label: "Method A2 - Enclosed in trunking on wall" },
    { value: "method-b1", label: "Method B1 - Enclosed in conduit in masonry" },
    { value: "method-b2", label: "Method B2 - Enclosed in trunking in masonry" },
    { value: "method-c", label: "Method C - Clipped direct to surface" },
    { value: "method-d1", label: "Method D1 - Direct in ground or duct" },
    { value: "method-d2", label: "Method D2 - In ducts in ground" },
    { value: "method-e", label: "Method E - In free air" },
    { value: "method-f", label: "Method F - On cable tray (perforated)" },
    { value: "method-g", label: "Method G - On cable tray (unperforated)" }
  ];

  // Ambient temperatures
  const ambientTemperatures = [
    "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70"
  ];

  // Number of cables for grouping
  const cableQuantities = [
    { value: "1", label: "1 (Single cable)" },
    { value: "2", label: "2 cables" },
    { value: "3", label: "3 cables" },
    { value: "4", label: "4-5 cables" },
    { value: "6", label: "6-8 cables" },
    { value: "9", label: "9-11 cables" },
    { value: "12", label: "12-15 cables" },
    { value: "16", label: "16-19 cables" },
    { value: "20", label: "20+ cables" }
  ];

  // Thermal insulation conditions
  const thermalInsulationTypes = [
    { value: "none", label: "No thermal insulation" },
    { value: "touching-one", label: "Touching thermal insulation (one side)" },
    { value: "touching-narrow", label: "Touching narrow strip (<225mm)" },
    { value: "touching-wide", label: "Touching wide area (>225mm)" },
    { value: "surrounded-50", label: "Surrounded by insulation ≤50mm" },
    { value: "surrounded-100", label: "Surrounded by insulation 50-100mm" },
    { value: "surrounded-200", label: "Surrounded by insulation 100-200mm" },
    { value: "surrounded-400", label: "Surrounded by insulation 200-400mm" },
    { value: "surrounded-over", label: "Surrounded by insulation >400mm" }
  ];

  const deviceRatingOptions = [
    { value: "6", label: "6A" },
    { value: "10", label: "10A" },
    { value: "16", label: "16A" },
    { value: "20", label: "20A" },
    { value: "25", label: "25A" },
    { value: "32", label: "32A" },
    { value: "40", label: "40A" },
    { value: "50", label: "50A" },
    { value: "63", label: "63A" },
  ];

  // Calculate temperature correction factor based on BS 7671
  const calculateTemperatureFactor = (ambient: number, cableTypeValue: string): number => {
    const cable = cableTypes.find(c => c.value === cableTypeValue);
    const refTemp = cable?.refTemp || 70;
    const refAmbient = installationMethod.includes('d') ? 20 : 30; // 20°C for buried, 30°C for air

    if (ambient === refAmbient) return 1.00;

    // BS 7671 temperature correction formula
    const factor = Math.sqrt((refTemp - ambient) / (refTemp - refAmbient));
    return Math.max(0.1, Math.min(1.2, factor)); // Limit between 0.1 and 1.2
  };

  // BS 7671 Grouping factors (Table 4C1)
  const getGroupingFactor = (numCables: string, method: string): number => {
    const num = parseInt(numCables);

    // Different factors for different installation methods
    if (method.includes('a') || method.includes('b')) { // Enclosed methods
      const factors = { 1: 1.00, 2: 0.80, 3: 0.70, 4: 0.65, 6: 0.60, 9: 0.55, 12: 0.50, 16: 0.45, 20: 0.40 };
      return factors[num as keyof typeof factors] || 0.35;
    } else if (method === 'method-c') { // Clipped direct
      const factors = { 1: 1.00, 2: 0.85, 3: 0.79, 4: 0.75, 6: 0.73, 9: 0.72, 12: 0.72, 16: 0.72, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    } else if (method.includes('d')) { // Buried
      const factors = { 1: 1.00, 2: 0.90, 3: 0.85, 4: 0.82, 6: 0.80, 9: 0.78, 12: 0.76, 16: 0.74, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    } else { // Cable tray and free air
      const factors = { 1: 1.00, 2: 0.88, 3: 0.82, 4: 0.77, 6: 0.75, 9: 0.73, 12: 0.72, 16: 0.72, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    }
  };

  // BS 7671 Thermal insulation factors (Table 4C4)
  const getThermalInsulationFactor = (insulation: string): number => {
    const factors = {
      "none": 1.00,
      "touching-one": 0.89,
      "touching-narrow": 0.81,
      "touching-wide": 0.68,
      "surrounded-50": 0.63,
      "surrounded-100": 0.51,
      "surrounded-200": 0.46,
      "surrounded-400": 0.42,
      "surrounded-over": 0.36
    };
    return factors[insulation as keyof typeof factors] || 1.00;
  };

  // Soil thermal resistivity correction factor
  const getSoilCorrectionFactor = (resistivity: number, method: string): number => {
    if (!method.includes('d')) return 1.00; // Only applies to buried cables

    // Standard soil thermal resistivity is 2.5 K⋅m/W
    const standardResistivity = 2.5;
    return Math.sqrt(standardResistivity / resistivity);
  };

  const calculateDerating = () => {
    if (!baseRating) return;

    const baseRatingValue = parseFloat(baseRating);
    const ambientValue = parseFloat(ambientTemp);
    const soilResistivity = parseFloat(soilThermalResistivity);

    // Calculate all derating factors
    const tempFactor = calculateTemperatureFactor(ambientValue, cableType);
    const groupFactor = getGroupingFactor(numberOfCables, installationMethod);
    const thermalFactor = getThermalInsulationFactor(thermalInsulation);
    const soilFactor = getSoilCorrectionFactor(soilResistivity, installationMethod);

    // Total derating factor
    const totalDerating = tempFactor * groupFactor * thermalFactor * soilFactor;

    // Final current rating
    const finalRating = baseRatingValue * totalDerating;

    // Calculate percentage reduction
    const deratingPercentage = ((baseRatingValue - finalRating) / baseRatingValue) * 100;

    // Calculate compliance if design current and device rating are provided
    let compliance = null;
    if (designCurrent && deviceRating) {
      const Ib = parseFloat(designCurrent);
      const In = parseFloat(deviceRating);
      const Iz = finalRating;

      const ibInCompliant = Ib <= In;
      const inIzCompliant = In <= Iz;
      const overallCompliant = ibInCompliant && inIzCompliant;
      const safetyMargin = Iz > 0 ? ((Iz - In) / Iz * 100) : 0;

      compliance = { Ib, In, Iz, ibInCompliant, inIzCompliant, overallCompliant, safetyMargin };
    }

    // Generate warnings
    const warnings: string[] = [];

    if (totalDerating < 0.5) {
      warnings.push("Severe derating detected - consider larger cable or alternative installation");
    }
    if (tempFactor < 0.8) {
      warnings.push("High ambient temperature significantly reducing capacity");
    }
    if (groupFactor < 0.7) {
      warnings.push("Cable grouping causing significant derating");
    }
    if (thermalFactor < 0.7) {
      warnings.push("Thermal insulation causing significant derating");
    }
    if (soilFactor < 0.9 && soilFactor !== 1.0) {
      warnings.push("Poor soil thermal conditions reducing capacity");
    }
    if (compliance && !compliance.overallCompliant) {
      if (!compliance.ibInCompliant) warnings.push("Design current exceeds device rating");
      if (!compliance.inIzCompliant) warnings.push("Device rating exceeds derated cable capacity");
    }

    setResult({
      temperatureFactor: tempFactor,
      groupingFactor: groupFactor,
      thermalInsulationFactor: thermalFactor,
      soilFactor: soilFactor,
      totalDerating: totalDerating,
      finalRating: finalRating,
      deratingPercentage: deratingPercentage,
      warnings: warnings,
      compliance
    });
  };

  const reset = () => {
    setBaseRating("");
    setCableType("pvc-70");
    setInstallationMethod("method-c");
    setAmbientTemp("30");
    setNumberOfCables("1");
    setThermalInsulation("none");
    setSoilThermalResistivity("2.5");
    setDesignCurrent("");
    setDeviceRating("32");
    setResult(null);
  };

  const hasValidInputs = () => {
    return !!baseRating;
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="cable"
        title="Cable Derating Calculator"
        description="Calculate cable current carrying capacity with BS 7671 derating factors"
        badge="BS 7671"
      >
        {/* Circuit Design Section */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <h4 className="text-sm font-medium text-white/80">Circuit Design (Optional)</h4>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Design Current (Ib)"
              unit="A"
              type="text"
              inputMode="decimal"
              value={designCurrent}
              onChange={setDesignCurrent}
              placeholder="Enter design current"
            />
            <CalculatorSelect
              label="Device Rating (In)"
              value={deviceRating}
              onChange={setDeviceRating}
              options={deviceRatingOptions}
            />
          </CalculatorInputGrid>
        </div>

        {/* Cable Parameters */}
        <CalculatorInput
          label="Base Current Rating"
          unit="A"
          type="text"
          inputMode="decimal"
          value={baseRating}
          onChange={setBaseRating}
          placeholder="e.g., 32"
          hint="From BS 7671 current capacity tables"
        />

        <CalculatorSelect
          label="Cable Type"
          value={cableType}
          onChange={setCableType}
          options={cableTypes.map(t => ({ value: t.value, label: t.label }))}
        />

        <CalculatorSelect
          label="Installation Method"
          value={installationMethod}
          onChange={setInstallationMethod}
          options={installationMethods.map(m => ({ value: m.value, label: m.label }))}
        />

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Ambient Temperature"
            value={ambientTemp}
            onChange={setAmbientTemp}
            options={ambientTemperatures.map(t => ({
              value: t,
              label: `${t}°C${t === "30" ? " (Reference)" : ""}`
            }))}
          />
          <CalculatorSelect
            label="Number of Cables"
            value={numberOfCables}
            onChange={setNumberOfCables}
            options={cableQuantities.map(q => ({ value: q.value, label: q.label }))}
          />
        </CalculatorInputGrid>

        <CalculatorSelect
          label="Thermal Insulation"
          value={thermalInsulation}
          onChange={setThermalInsulation}
          options={thermalInsulationTypes.map(t => ({ value: t.value, label: t.label }))}
        />

        {installationMethod.includes('d') && (
          <CalculatorInput
            label="Soil Thermal Resistivity"
            unit="K·m/W"
            type="text"
            inputMode="decimal"
            value={soilThermalResistivity}
            onChange={setSoilThermalResistivity}
            placeholder="e.g., 2.5"
            hint="Standard is 2.5 K·m/W"
          />
        )}

        <CalculatorActions
          category="cable"
          onCalculate={calculateDerating}
          onReset={reset}
          isDisabled={!hasValidInputs()}
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="cable">
            {/* Main Result */}
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Derated Cable Capacity</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.finalRating.toFixed(1)} A
              </div>
              <div className="flex justify-center items-center gap-4 mt-2 text-sm">
                <span className="text-white/60">Base: {baseRating}A</span>
                <Badge variant="outline" className="text-red-400 border-red-400/50">
                  -{result.deratingPercentage.toFixed(1)}%
                </Badge>
              </div>
            </div>

            {/* Derating Factors */}
            <div className="space-y-3 pt-4">
              <h4 className="text-sm font-medium text-white/80">Derating Factors</h4>

              {/* Temperature Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Temperature (Ca)</span>
                  <span className="font-mono text-emerald-400">{result.temperatureFactor.toFixed(3)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.temperatureFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`
                    }}
                  />
                </div>
              </div>

              {/* Grouping Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Grouping (Cg)</span>
                  <span className="font-mono text-emerald-400">{result.groupingFactor.toFixed(3)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.groupingFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`
                    }}
                  />
                </div>
              </div>

              {/* Thermal Insulation Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Thermal Insulation (Ci)</span>
                  <span className="font-mono text-emerald-400">{result.thermalInsulationFactor.toFixed(3)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.thermalInsulationFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`
                    }}
                  />
                </div>
              </div>

              {/* Soil Factor */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Soil (Cs)</span>
                  <span className="font-mono text-emerald-400">{result.soilFactor.toFixed(3)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.max(result.soilFactor * 100, 5)}%`,
                      background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Compliance Check */}
            {result.compliance && (
              <div className={cn(
                "mt-4 p-3 rounded-xl border",
                result.compliance.overallCompliant
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {result.compliance.overallCompliant ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <span className={cn(
                    "font-medium",
                    result.compliance.overallCompliant ? "text-green-300" : "text-red-300"
                  )}>
                    Ib ≤ In ≤ Iz: {result.compliance.overallCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-white/60 text-xs">Ib</div>
                    <div className="text-white font-mono">{result.compliance.Ib}A</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/60 text-xs">In</div>
                    <div className="text-white font-mono">{result.compliance.In}A</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/60 text-xs">Iz</div>
                    <div className="text-white font-mono">{result.compliance.Iz.toFixed(1)}A</div>
                  </div>
                </div>
                <div className="text-xs text-white/60 text-center mt-2">
                  Safety margin: {result.compliance.safetyMargin.toFixed(1)}%
                </div>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <div className="space-y-1 text-sm text-orange-200">
                    {result.warnings.map((warning, index) => (
                      <p key={index}>{warning}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CalculatorResult>

          {/* How It Worked Out - Collapsible */}
          <Collapsible open={showFormula} onOpenChange={setShowFormula}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showFormula && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="text-sm font-mono text-purple-300 space-y-2">
                  <div className="text-xs text-purple-400">Derated capacity formula:</div>
                  <div>Iz = It × Ca × Cg × Ci × Cs</div>
                  <div className="pt-2 border-t border-purple-500/20">
                    Iz = {baseRating} × {result.temperatureFactor.toFixed(3)} × {result.groupingFactor.toFixed(3)} × {result.thermalInsulationFactor.toFixed(3)} × {result.soilFactor.toFixed(3)}
                  </div>
                  <div className="text-purple-200 font-bold">
                    Iz = {result.finalRating.toFixed(1)}A
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* What This Means - Collapsible */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Derating factors</strong> reduce cable capacity based on installation conditions.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Multiple factors</strong> combine to determine safe operating current.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Ib ≤ In ≤ Iz</strong> ensures proper circuit protection per BS 7671.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Safety margin</strong> should be positive for compliant design.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Reference</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Table 4C1:</strong> Grouping factors for cables</p>
                  <p><strong className="text-amber-300">Table 4C4:</strong> Thermal insulation derating factors</p>
                  <p><strong className="text-amber-300">Appendix 4:</strong> Temperature correction factors</p>
                  <p><strong className="text-amber-300">Regulation 433:</strong> Protection against overload</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-emerald-200">
            <strong>Iz = It × Ca × Cg × Ci × Cs</strong> where It is tabulated current, and C factors are derating corrections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CableDeratingCalculator;
