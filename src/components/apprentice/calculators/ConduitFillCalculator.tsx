import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info, AlertTriangle, CheckCircle2, BookOpen, ChevronDown } from "lucide-react";
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

const ConduitFillCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [conduitSize, setConduitSize] = useState("");
  const [conduitMaterial, setConduitMaterial] = useState("pvc");
  const [cableSize, setCableSize] = useState("");
  const [cableQuantity, setCableQuantity] = useState("");
  const [installationType, setInstallationType] = useState("straight");
  const [fillTarget, setFillTarget] = useState("40");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [result, setResult] = useState<{
    fillPercentage: number;
    maxCables: number;
    suitable: boolean;
    actualFillTarget: number;
    bendRadius: number;
    warnings: string[];
    pullTension: number;
  } | null>(null);

  // Enhanced conduit data with different materials - BS EN 61386-1
  const conduitData = {
    pvc: {
      "16": { diameter: 12.2, area: 117, bendRadius: 48 },
      "20": { diameter: 16.0, area: 201, bendRadius: 60 },
      "25": { diameter: 20.4, area: 327, bendRadius: 75 },
      "32": { diameter: 26.0, area: 531, bendRadius: 96 },
      "40": { diameter: 32.0, area: 804, bendRadius: 120 },
      "50": { diameter: 40.0, area: 1257, bendRadius: 150 },
      "63": { diameter: 52.0, area: 2124, bendRadius: 189 },
      "75": { diameter: 62.0, area: 3019, bendRadius: 225 },
      "100": { diameter: 82.0, area: 5281, bendRadius: 300 },
    },
    steel: {
      "16": { diameter: 13.0, area: 133, bendRadius: 60 },
      "20": { diameter: 16.8, area: 222, bendRadius: 75 },
      "25": { diameter: 21.2, area: 353, bendRadius: 90 },
      "32": { diameter: 27.2, area: 581, bendRadius: 120 },
      "40": { diameter: 33.2, area: 866, bendRadius: 150 },
      "50": { diameter: 41.2, area: 1332, bendRadius: 180 },
      "63": { diameter: 53.4, area: 2239, bendRadius: 225 },
      "75": { diameter: 63.4, area: 3157, bendRadius: 270 },
      "100": { diameter: 84.0, area: 5542, bendRadius: 360 },
    }
  };

  // Enhanced cable data for common UK cables
  const cableData = {
    "1.0": { diameter: 3.2, weight: 0.05 },
    "1.5": { diameter: 3.6, weight: 0.07 },
    "2.5": { diameter: 4.2, weight: 0.10 },
    "4.0": { diameter: 4.8, weight: 0.15 },
    "6.0": { diameter: 5.5, weight: 0.22 },
    "10.0": { diameter: 6.8, weight: 0.35 },
    "16.0": { diameter: 8.2, weight: 0.55 },
    "25.0": { diameter: 10.5, weight: 0.85 },
    "35.0": { diameter: 12.0, weight: 1.20 },
  };

  const calculateConduitFill = () => {
    const conduit = conduitData[conduitMaterial as keyof typeof conduitData][conduitSize as keyof typeof conduitData[keyof typeof conduitData]];
    const cable = cableData[cableSize as keyof typeof cableData];
    const quantity = parseInt(cableQuantity);
    const targetFill = parseFloat(fillTarget);

    if (!conduit || !cable || !quantity || !targetFill) return;

    const cableArea = Math.PI * Math.pow(cable.diameter / 2, 2);
    const totalCableArea = cableArea * quantity;
    const fillPercentage = (totalCableArea / conduit.area) * 100;

    // Determine actual fill target based on installation and cable count
    let actualFillTarget = targetFill;
    if (quantity === 1) actualFillTarget = 53;
    else if (quantity === 2) actualFillTarget = 31;
    else if (installationType === "bends") actualFillTarget = Math.min(targetFill, 35);

    // Calculate maximum cables that can fit
    const maxFillArea = conduit.area * (actualFillTarget / 100);
    const maxCables = Math.floor(maxFillArea / cableArea);

    const suitable = fillPercentage <= actualFillTarget;

    // Calculate approximate pulling tension (simplified)
    const totalWeight = quantity * cable.weight;
    const pullTension = totalWeight * 9.81 * 0.3; // Approximate friction coefficient

    // Generate warnings
    const warnings: string[] = [];
    if (fillPercentage > actualFillTarget) {
      warnings.push(`Fill exceeds ${actualFillTarget}% limit for this configuration`);
    }
    if (fillPercentage > 35 && installationType === "bends") {
      warnings.push("High fill percentage may cause pulling difficulties with bends");
    }
    if (quantity > 4 && parseFloat(cableSize) >= 10) {
      warnings.push("Large cables in groups may require derating consideration");
    }
    if (conduitMaterial === "pvc" && parseFloat(cableSize) >= 25) {
      warnings.push("Consider steel conduit for large cables and mechanical protection");
    }
    if (pullTension > 100) {
      warnings.push("High pulling tension - consider cable pulling lubricant");
    }

    setResult({
      fillPercentage: Math.round(fillPercentage * 10) / 10,
      maxCables,
      suitable,
      actualFillTarget,
      bendRadius: conduit.bendRadius,
      warnings,
      pullTension: Math.round(pullTension)
    });
  };

  const resetCalculator = () => {
    setConduitSize("");
    setConduitMaterial("pvc");
    setCableSize("");
    setCableQuantity("");
    setInstallationType("straight");
    setFillTarget("40");
    setResult(null);
  };

  const hasValidInputs = () => {
    return conduitSize && cableSize && cableQuantity;
  };

  // Build select options
  const conduitSizeOptions = [
    { value: "16", label: "16mm" },
    { value: "20", label: "20mm" },
    { value: "25", label: "25mm" },
    { value: "32", label: "32mm" },
    { value: "40", label: "40mm" },
    { value: "50", label: "50mm" },
    { value: "63", label: "63mm" },
    { value: "75", label: "75mm" },
    { value: "100", label: "100mm" },
  ];

  const cableSizeOptions = [
    { value: "1.0", label: "1.0mm²" },
    { value: "1.5", label: "1.5mm²" },
    { value: "2.5", label: "2.5mm²" },
    { value: "4.0", label: "4.0mm²" },
    { value: "6.0", label: "6.0mm²" },
    { value: "10.0", label: "10.0mm²" },
    { value: "16.0", label: "16.0mm²" },
    { value: "25.0", label: "25.0mm²" },
    { value: "35.0", label: "35.0mm²" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="cable"
        title="Conduit Fill Calculator"
        description="Calculate fill percentage with BS EN 61386-1 compliance"
        badge="BS EN 61386-1"
      >
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Conduit Material"
            value={conduitMaterial}
            onChange={setConduitMaterial}
            options={[
              { value: "pvc", label: "PVC" },
              { value: "steel", label: "Steel" },
            ]}
          />
          <CalculatorSelect
            label="Conduit Size"
            value={conduitSize}
            onChange={setConduitSize}
            options={conduitSizeOptions}
            placeholder="Select size"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Cable Size"
            value={cableSize}
            onChange={setCableSize}
            options={cableSizeOptions}
            placeholder="Select cable size"
          />
          <CalculatorInput
            label="Number of Cables"
            type="text"
            inputMode="numeric"
            value={cableQuantity}
            onChange={setCableQuantity}
            placeholder="Enter quantity"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Installation Type"
            value={installationType}
            onChange={setInstallationType}
            options={[
              { value: "straight", label: "Straight Run" },
              { value: "bends", label: "With Bends" },
            ]}
          />
          <CalculatorSelect
            label="Fill Target"
            value={fillTarget}
            onChange={setFillTarget}
            options={[
              { value: "30", label: "30% (Conservative)" },
              { value: "40", label: "40% (Standard)" },
              { value: "50", label: "50% (Maximum)" },
            ]}
          />
        </CalculatorInputGrid>

        <CalculatorActions
          category="cable"
          onCalculate={calculateConduitFill}
          onReset={resetCalculator}
          isDisabled={!hasValidInputs()}
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="cable">
            {/* Status Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              {result.suitable ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
              <span className="font-semibold text-white">
                {result.suitable ? 'Suitable Installation' : 'Exceeds Fill Limit'}
              </span>
            </div>

            {/* Main Result */}
            <div className="text-center py-3">
              <p className="text-sm text-white/60 mb-1">Fill Percentage</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.fillPercentage}%
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "mt-2",
                  result.suitable ? "text-green-400 border-green-400/50" : "text-red-400 border-red-400/50"
                )}
              >
                Target: {result.actualFillTarget}%
              </Badge>
            </div>

            {/* Result Details */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Max Cables"
                value={result.maxCables.toString()}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Bend Radius"
                value={result.bendRadius.toString()}
                unit="mm"
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Current Cables"
                value={cableQuantity}
                category="cable"
                size="sm"
              />
              <ResultValue
                label="Pull Tension"
                value={`~${result.pullTension}`}
                unit="N"
                category="cable"
                size="sm"
              />
            </ResultsGrid>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 mt-3">
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
          {conduitSize && cableSize && cableQuantity && (
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
                  <div className="text-sm font-mono text-purple-300 space-y-3">
                    <div>
                      <div className="text-xs text-purple-400 mb-1">Step 1: Cable cross-sectional area</div>
                      <div>A = π × (d/2)²</div>
                      <div>A = π × ({cableData[cableSize as keyof typeof cableData].diameter/2})²</div>
                      <div className="text-purple-200 font-bold">A = {(Math.PI * Math.pow(cableData[cableSize as keyof typeof cableData].diameter / 2, 2)).toFixed(1)}mm²</div>
                    </div>

                    <div className="pt-2 border-t border-purple-500/20">
                      <div className="text-xs text-purple-400 mb-1">Step 2: Total cable area</div>
                      <div>Total = A × qty = {(Math.PI * Math.pow(cableData[cableSize as keyof typeof cableData].diameter / 2, 2)).toFixed(1)} × {cableQuantity}</div>
                      <div className="text-purple-200 font-bold">Total = {(Math.PI * Math.pow(cableData[cableSize as keyof typeof cableData].diameter / 2, 2) * parseInt(cableQuantity)).toFixed(1)}mm²</div>
                    </div>

                    <div className="pt-2 border-t border-purple-500/20">
                      <div className="text-xs text-purple-400 mb-1">Step 3: Fill percentage</div>
                      <div>Fill = (Cable Area ÷ Conduit Area) × 100</div>
                      <div>Fill = ({(Math.PI * Math.pow(cableData[cableSize as keyof typeof cableData].diameter / 2, 2) * parseInt(cableQuantity)).toFixed(1)} ÷ {conduitData[conduitMaterial as keyof typeof conduitData][conduitSize as keyof typeof conduitData[keyof typeof conduitData]].area}) × 100</div>
                      <div className="text-purple-200 font-bold">Fill = {result.fillPercentage}%</div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

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
                  <strong className="text-blue-300">Fill percentage</strong> affects cable pulling difficulty and heat dissipation.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">High fill</strong> causes cables to jam during pulling and overheat in operation.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Proper fill</strong> allows easier maintenance and future cable additions.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Pull tension</strong> indicates if cable lubricant may be needed.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS EN 61386-1 Guidance - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Regs at a Glance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">BS EN 61386-1:</strong> Conduit systems for cable management</p>
                  <p><strong className="text-amber-300">1 cable:</strong> 53% maximum fill</p>
                  <p><strong className="text-amber-300">2 cables:</strong> 31% maximum fill</p>
                  <p><strong className="text-amber-300">3+ cables:</strong> 40% max for straight runs</p>
                  <p><strong className="text-amber-300">With bends:</strong> Reduce to 35% maximum</p>
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
            <strong>Fill %</strong> = (Total Cable Area ÷ Conduit Area) × 100. Lower fill = easier installation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConduitFillCalculator;
