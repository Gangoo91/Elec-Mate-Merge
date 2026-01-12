import { useState, useMemo } from "react";
import { Zap, Info, BookOpen, ChevronDown, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface ElectrodeResult {
  singleRodResistance: number;
  totalResistance: number;
  meetsTarget: boolean;
  recommendations: string[];
  requiredLength?: number;
}

// Soil resistivity values (Ωm) - typical UK values
const soilTypes = {
  "clay-wet": { name: "Wet clay", resistivity: 20, range: "10-30" },
  "clay-dry": { name: "Dry clay", resistivity: 100, range: "50-150" },
  "loam": { name: "Loam/garden soil", resistivity: 50, range: "30-100" },
  "sand-wet": { name: "Wet sand", resistivity: 200, range: "100-300" },
  "sand-dry": { name: "Dry sand", resistivity: 1000, range: "500-2000" },
  "gravel": { name: "Gravel", resistivity: 400, range: "200-800" },
  "chalk": { name: "Chalk", resistivity: 100, range: "50-200" },
  "rock": { name: "Rock", resistivity: 2000, range: "1000-5000" },
  "custom": { name: "Custom value", resistivity: 0, range: "Enter value" },
};

// Standard electrode dimensions
const electrodeDiameters = {
  "16": { name: "16mm rod", diameter: 0.016 },
  "19": { name: "19mm rod (common)", diameter: 0.019 },
  "25": { name: "25mm rod", diameter: 0.025 },
  "50x50": { name: "50×50mm angle", diameter: 0.050 },
};

const EarthElectrodeCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  // Inputs
  const [soilType, setSoilType] = useState<string>("loam");
  const [customResistivity, setCustomResistivity] = useState<string>("");
  const [electrodeLength, setElectrodeLength] = useState<string>("2.4");
  const [electrodeDiameter, setElectrodeDiameter] = useState<string>("19");
  const [numberOfRods, setNumberOfRods] = useState<string>("1");
  const [rodSpacing, setRodSpacing] = useState<string>("3");
  const [targetResistance, setTargetResistance] = useState<string>("200");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): ElectrodeResult | null => {
    const length = parseFloat(electrodeLength);
    const diameter = electrodeDiameters[electrodeDiameter as keyof typeof electrodeDiameters]?.diameter;
    const rods = parseInt(numberOfRods);
    const spacing = parseFloat(rodSpacing);
    const target = parseFloat(targetResistance);

    if (!length || !diameter || !rods) return null;

    // Get soil resistivity
    let resistivity: number;
    if (soilType === "custom") {
      resistivity = parseFloat(customResistivity);
      if (!resistivity) return null;
    } else {
      resistivity = soilTypes[soilType as keyof typeof soilTypes]?.resistivity || 50;
    }

    // Single rod resistance formula: R = (ρ / 2πL) × ln(4L/d)
    // Where: ρ = soil resistivity, L = length, d = diameter
    const singleRodResistance = (resistivity / (2 * Math.PI * length)) * Math.log((4 * length) / diameter);

    // Parallel rod reduction factor
    // For widely spaced rods (spacing > 2×length), factor ≈ 1/n
    // For closer spacing, use empirical reduction
    let totalResistance: number;
    if (rods === 1) {
      totalResistance = singleRodResistance;
    } else {
      // Parallel factor with spacing consideration
      // Uses Schwarz formula simplification
      const spacingFactor = spacing / length;
      let parallelFactor: number;

      if (spacingFactor >= 2) {
        // Widely spaced - near ideal parallel
        parallelFactor = 1 / rods;
      } else {
        // Closer spacing - reduced efficiency
        // Empirical formula: factor = (1 + k(n-1)) / n where k depends on spacing
        const k = 0.6 * (1 - spacingFactor / 2);
        parallelFactor = (1 + k * (rods - 1)) / rods;
      }

      totalResistance = singleRodResistance * parallelFactor;
    }

    const meetsTarget = totalResistance <= target;

    // Recommendations
    const recommendations: string[] = [];

    if (!meetsTarget) {
      // Calculate required length for single rod to meet target
      // Rearranging: L = (ρ / 2πR) × ln(4L/d) - iterative solution approximated
      const requiredLength = (resistivity / (2 * Math.PI * target)) * Math.log((4 * 3) / diameter);

      if (requiredLength < 6) {
        recommendations.push(`Increase rod length to approximately ${requiredLength.toFixed(1)}m`);
      }
      recommendations.push("Add parallel rods with minimum 3m spacing");
      recommendations.push("Consider improving soil conductivity with bentonite or marconite");
      if (soilType === "sand-dry" || soilType === "rock") {
        recommendations.push("Consider relocating electrode to area with lower resistivity soil");
      }
    } else {
      recommendations.push("Earth electrode meets target resistance");
      if (totalResistance < target * 0.5) {
        recommendations.push("Good margin - system is well earthed");
      }
    }

    // Calculate required length to meet target (for single rod)
    let requiredLength: number | undefined;
    if (!meetsTarget && rods === 1) {
      // Approximate required length using iterative approach
      let testLength = length;
      for (let i = 0; i < 10; i++) {
        const testR = (resistivity / (2 * Math.PI * testLength)) * Math.log((4 * testLength) / diameter);
        if (testR <= target) break;
        testLength += 0.5;
      }
      requiredLength = testLength;
    }

    return {
      singleRodResistance,
      totalResistance,
      meetsTarget,
      recommendations,
      requiredLength,
    };
  }, [soilType, customResistivity, electrodeLength, electrodeDiameter, numberOfRods, rodSpacing, targetResistance]);

  const reset = () => {
    setSoilType("loam");
    setCustomResistivity("");
    setElectrodeLength("2.4");
    setElectrodeDiameter("19");
    setNumberOfRods("1");
    setRodSpacing("3");
    setTargetResistance("200");
  };

  const soilTypeOptions = Object.entries(soilTypes).map(([key, soil]) => ({
    value: key,
    label: `${soil.name} (${soil.range} Ωm)`,
  }));

  const diameterOptions = Object.entries(electrodeDiameters).map(([key, rod]) => ({
    value: key,
    label: rod.name,
  }));

  const hasValidInputs = () => {
    if (soilType === "custom" && !customResistivity) return false;
    return electrodeLength && electrodeDiameter && numberOfRods && targetResistance;
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="Earth Electrode Calculator"
        description="Calculate earth rod resistance for TT systems per BS 7671 Section 542"
        badge="TT"
      >
        {/* Soil Type */}
        <CalculatorSelect
          label="Soil Type"
          value={soilType}
          onChange={setSoilType}
          options={soilTypeOptions}
        />

        {soilType === "custom" && (
          <CalculatorInput
            label="Soil Resistivity"
            unit="Ωm"
            type="text"
            inputMode="decimal"
            value={customResistivity}
            onChange={setCustomResistivity}
            placeholder="e.g., 75"
            hint="Measure with earth resistivity meter"
          />
        )}

        {/* Electrode Details */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Rod Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={electrodeLength}
            onChange={setElectrodeLength}
            placeholder="2.4"
          />
          <CalculatorSelect
            label="Rod Type"
            value={electrodeDiameter}
            onChange={setElectrodeDiameter}
            options={diameterOptions}
          />
        </div>

        {/* Multiple Rods */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Number of Rods"
            type="text"
            inputMode="numeric"
            value={numberOfRods}
            onChange={setNumberOfRods}
            placeholder="1"
          />
          {parseInt(numberOfRods) > 1 && (
            <CalculatorInput
              label="Rod Spacing"
              unit="m"
              type="text"
              inputMode="decimal"
              value={rodSpacing}
              onChange={setRodSpacing}
              placeholder="3"
              hint="Min 2× rod length"
            />
          )}
        </div>

        {/* Target Resistance */}
        <CalculatorInput
          label="Target Resistance"
          unit="Ω"
          type="text"
          inputMode="decimal"
          value={targetResistance}
          onChange={setTargetResistance}
          placeholder="200"
          hint="TT systems typically need Ra × Ia ≤ 50V"
        />

        <CalculatorActions
          category="protection"
          onCalculate={() => {}}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Live Results Below"
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Earth Electrode Resistance</span>
              <span className={cn(
                "text-sm font-medium",
                result.meetsTarget ? "text-green-400" : "text-red-400"
              )}>
                {result.meetsTarget ? "Meets Target" : "Exceeds Target"}
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Total Resistance</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.totalResistance.toFixed(1)} Ω
              </div>
              <p className="text-sm text-white/80 mt-1">Target: ≤{targetResistance} Ω</p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Single Rod"
                value={result.singleRodResistance.toFixed(1)}
                unit="Ω"
                category="protection"
                size="sm"
              />
              <ResultValue
                label="Rods in Parallel"
                value={numberOfRods}
                category="protection"
                size="sm"
              />
              {result.requiredLength && (
                <ResultValue
                  label="Required Length"
                  value={result.requiredLength.toFixed(1)}
                  unit="m"
                  category="protection"
                  size="sm"
                />
              )}
              <ResultValue
                label="Soil Resistivity"
                value={soilType === "custom" ? customResistivity : soilTypes[soilType as keyof typeof soilTypes]?.resistivity.toString()}
                unit="Ωm"
                category="protection"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Recommendations */}
          <div className={cn(
            "p-4 rounded-xl border",
            result.meetsTarget
              ? "bg-green-500/10 border-green-500/30"
              : "bg-orange-500/10 border-orange-500/30"
          )}>
            <div className="flex items-start gap-3">
              {result.meetsTarget ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
              )}
              <div className="space-y-2">
                <p className={cn(
                  "font-medium",
                  result.meetsTarget ? "text-green-300" : "text-orange-300"
                )}>
                  {result.meetsTarget ? "Compliant" : "Action Required"}
                </p>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className={cn(
                      "text-sm flex items-start gap-2",
                      result.meetsTarget ? "text-green-200/80" : "text-orange-200/80"
                    )}>
                      <span className="mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How It Worked Out */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-3 text-sm">
                  {/* Why This Matters */}
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 font-medium mb-2">Why Earth Electrode Resistance Matters</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>• <strong>RCD operation:</strong> High resistance = slower/failed RCD trips in fault</li>
                      <li>• <strong>Touch voltage:</strong> Must limit to 50V for safety (Ra × Ia ≤ 50V)</li>
                      <li>• <strong>Lightning protection:</strong> Low resistance disperses fault current safely</li>
                      <li>• <strong>Seasonal variation:</strong> Dry summers can double earth resistance</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Single rod resistance formula</p>
                    <p className="text-white font-mono text-xs">
                      R = (ρ / 2πL) × ln(4L/d)
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Calculation</p>
                    <p className="text-white font-mono text-xs">
                      R = ({soilType === "custom" ? customResistivity : soilTypes[soilType as keyof typeof soilTypes]?.resistivity} / 2π × {electrodeLength}) × ln(4 × {electrodeLength} / {electrodeDiameters[electrodeDiameter as keyof typeof electrodeDiameters]?.diameter})
                    </p>
                  </div>
                  {parseInt(numberOfRods) > 1 && (
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 mb-1">Parallel reduction</p>
                      <p className="text-white/80 text-xs">
                        {numberOfRods} rods at {rodSpacing}m spacing reduces total resistance
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* BS 7671 Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Reference</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <p><strong className="text-amber-300">Regulation 542.2:</strong> Earth electrodes shall maintain their resistance under varying conditions.</p>
              <p><strong className="text-amber-300">TT Systems (411.5.3):</strong> Ra × Ia ≤ 50V where Ra is the sum of earth electrode and protective conductor resistance.</p>
              <p><strong className="text-amber-300">Typical Values:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• With 30mA RCD: Ra ≤ 1667Ω (50V/0.03A)</li>
                <li>• With 100mA RCD: Ra ≤ 500Ω (50V/0.1A)</li>
                <li>• With 300mA RCD: Ra ≤ 167Ω (50V/0.3A)</li>
              </ul>
              <p className="text-xs text-white/80 pt-2 border-t border-white/10">
                Standard 2.4m rods typically achieve 20-100Ω in clay soils. Seasonal variation can increase resistance by 30-50%.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default EarthElectrodeCalculator;
