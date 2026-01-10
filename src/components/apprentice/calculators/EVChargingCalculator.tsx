import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Car, Info, BookOpen, ChevronDown, AlertTriangle, CheckCircle, Zap, Clock, PoundSterling, Calculator } from "lucide-react";
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
import { calculateEVCharging, type EVCalculationInputs } from "@/lib/ev-calculations";
import { CHARGER_TYPES, EARTHING_SYSTEMS, DIVERSITY_FACTORS, INSTALLATION_LOCATIONS } from "@/lib/ev-constants";
import { formatCurrency } from "@/lib/format";
import { toast } from "@/hooks/use-toast";

const EVChargingCalculator = () => {
  const config = CALCULATOR_CONFIG['ev-storage'];

  const [inputs, setInputs] = useState({
    batteryCapacity: "",
    chargerType: "7kw-ac" as keyof typeof CHARGER_TYPES,
    currentCharge: "20",
    targetCharge: "80",
    electricityRate: "0.30",
    diversityFactor: "1.0",
    supplyType: "tn-c-s" as keyof typeof EARTHING_SYSTEMS,
    runLength: "20",
    ambientTemp: "30",
    installationLocation: "external",
    existingLoadCurrent: "0"
  });

  const [results, setResults] = useState<ReturnType<typeof calculateEVCharging> | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const chargerOptions = Object.entries(CHARGER_TYPES).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const earthingOptions = Object.entries(EARTHING_SYSTEMS).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const diversityOptions = Object.entries(DIVERSITY_FACTORS).map(([key, value]) => ({
    value: value.value.toString(),
    label: value.label
  }));

  const locationOptions = Object.entries(INSTALLATION_LOCATIONS).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const calculateEVChargingResults = () => {
    const calculationInputs: EVCalculationInputs = {
      batteryCapacity: parseFloat(inputs.batteryCapacity),
      chargerType: inputs.chargerType,
      currentCharge: parseFloat(inputs.currentCharge),
      targetCharge: parseFloat(inputs.targetCharge),
      electricityRate: parseFloat(inputs.electricityRate),
      diversityFactor: parseFloat(inputs.diversityFactor),
      supplyType: inputs.supplyType,
      runLength: parseFloat(inputs.runLength),
      ambientTemp: parseFloat(inputs.ambientTemp),
      installationLocation: inputs.installationLocation,
      existingLoadCurrent: parseFloat(inputs.existingLoadCurrent)
    };

    if (!calculationInputs.batteryCapacity || calculationInputs.currentCharge >= calculationInputs.targetCharge) {
      toast({
        title: "Invalid Input",
        description: "Please check your battery capacity and charge levels.",
        variant: "destructive"
      });
      return;
    }

    try {
      const calculationResults = calculateEVCharging(calculationInputs);
      setResults(calculationResults);

      if (!calculationResults.installationCompliant) {
        toast({
          title: "Installation Issues Detected",
          description: "Review the warnings below.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Unable to complete calculation.",
        variant: "destructive"
      });
    }
  };

  const resetCalculator = () => {
    setInputs({
      batteryCapacity: "",
      chargerType: "7kw-ac",
      currentCharge: "20",
      targetCharge: "80",
      electricityRate: "0.30",
      diversityFactor: "1.0",
      supplyType: "tn-c-s",
      runLength: "20",
      ambientTemp: "30",
      installationLocation: "external",
      existingLoadCurrent: "0"
    });
    setResults(null);
  };

  const hasValidInputs = () => inputs.batteryCapacity && parseFloat(inputs.batteryCapacity) > 0;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="ev_storage"
        title="EV Charging Calculator"
        description="Design compliant EV charging installations per BS 7671"
        badge="Section 722"
      >
        {/* Vehicle & Charging Details */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Vehicle & Charging</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Battery Capacity"
              unit="kWh"
              type="text"
              inputMode="decimal"
              value={inputs.batteryCapacity}
              onChange={(value) => setInputs({...inputs, batteryCapacity: value})}
              placeholder="e.g., 64"
            />
            <CalculatorSelect
              label="Charger Type"
              value={inputs.chargerType}
              onChange={(value) => setInputs({...inputs, chargerType: value as keyof typeof CHARGER_TYPES})}
              options={chargerOptions}
            />
            <CalculatorInput
              label="Current Charge"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.currentCharge}
              onChange={(value) => setInputs({...inputs, currentCharge: value})}
              placeholder="20"
            />
            <CalculatorInput
              label="Target Charge"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.targetCharge}
              onChange={(value) => setInputs({...inputs, targetCharge: value})}
              placeholder="80"
            />
          </CalculatorInputGrid>
        </div>

        {/* Installation Details */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Installation Details</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Supply Type"
              value={inputs.supplyType}
              onChange={(value) => setInputs({...inputs, supplyType: value as keyof typeof EARTHING_SYSTEMS})}
              options={earthingOptions}
            />
            <CalculatorSelect
              label="Installation Location"
              value={inputs.installationLocation}
              onChange={(value) => setInputs({...inputs, installationLocation: value})}
              options={locationOptions}
            />
            <CalculatorInput
              label="Cable Run Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={inputs.runLength}
              onChange={(value) => setInputs({...inputs, runLength: value})}
              placeholder="20"
            />
            <CalculatorInput
              label="Ambient Temperature"
              unit="°C"
              type="text"
              inputMode="decimal"
              value={inputs.ambientTemp}
              onChange={(value) => setInputs({...inputs, ambientTemp: value})}
              placeholder="30"
            />
          </CalculatorInputGrid>
        </div>

        {/* Load & Cost */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Load & Cost</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Diversity Factor"
              value={inputs.diversityFactor}
              onChange={(value) => setInputs({...inputs, diversityFactor: value})}
              options={diversityOptions}
            />
            <CalculatorInput
              label="Existing Load Current"
              unit="A"
              type="text"
              inputMode="decimal"
              value={inputs.existingLoadCurrent}
              onChange={(value) => setInputs({...inputs, existingLoadCurrent: value})}
              placeholder="0"
            />
          </CalculatorInputGrid>
          <CalculatorInput
            label="Electricity Rate"
            unit="£/kWh"
            type="text"
            inputMode="decimal"
            value={inputs.electricityRate}
            onChange={(value) => setInputs({...inputs, electricityRate: value})}
            placeholder="0.30"
          />
        </div>

        <CalculatorActions
          category="ev_storage"
          onCalculate={calculateEVChargingResults}
          onReset={resetCalculator}
          isDisabled={!hasValidInputs()}
          calculateLabel="Calculate"
        />
      </CalculatorCard>

      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="ev_storage">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">EV Charging Analysis</span>
              <Badge variant="outline" className={cn(
                results.installationCompliant ? "text-green-400 border-green-400/50" : "text-red-400 border-red-400/50"
              )}>
                {results.installationCompliant ? <><CheckCircle className="h-3 w-3 mr-1" /> Compliant</> : <><AlertTriangle className="h-3 w-3 mr-1" /> Issues Found</>}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Energy Required</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {results.energyRequired.toFixed(1)}
                </div>
                <p className="text-xs text-white/80">kWh</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Charging Time</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {results.chargingTime.toFixed(1)}
                </div>
                <p className="text-xs text-white/80">hours</p>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Charging Cost" value={formatCurrency(results.cost)} category="ev_storage" size="sm" />
              <ResultValue label="Peak Demand" value={results.peakDemand.toFixed(1)} unit="kW" category="ev_storage" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Technical Results */}
          <CalculatorResult category="ev_storage">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Technical Specifications</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Circuit Current" value={results.circuitCurrent.toFixed(1)} unit="A" category="ev_storage" size="sm" />
              <ResultValue label="Design Current" value={results.designCurrent.toFixed(1)} unit="A" category="ev_storage" size="sm" />
              <ResultValue label="Cable Size" value={results.recommendedCable} category="ev_storage" size="sm" />
              <ResultValue label="Voltage Drop" value={`${results.voltageDrop.toFixed(1)}V (${((results.voltageDrop / 230) * 100).toFixed(1)}%)`} category="ev_storage" size="sm" />
              <ResultValue label="Earth Fault (Zs)" value={results.actualZs.toFixed(2)} unit="Ω" category="ev_storage" size="sm" />
              <ResultValue label="Max Zs" value={results.maxZs} unit="Ω" category="ev_storage" size="sm" />
            </ResultsGrid>
            <div className="mt-3 p-2 rounded-lg bg-white/5">
              <p className="text-sm text-white/80"><strong>Protection:</strong> {results.protectionRequired}</p>
            </div>
          </CalculatorResult>

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="text-sm font-medium text-red-300">Installation Warnings</p>
              </div>
              <ul className="space-y-1 text-sm text-red-200/80">
                {results.warnings.map((warning, idx) => (
                  <li key={idx}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-300">Recommendations</p>
              </div>
              <ul className="space-y-1 text-sm text-blue-200/80">
                {results.recommendations.map((rec, idx) => (
                  <li key={idx}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* How It Worked Out */}
          <Collapsible open={showFormula} onOpenChange={setShowFormula}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showFormula && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3 font-mono text-sm">
                <div className="p-2 rounded bg-white/5">
                  <p className="text-xs text-purple-400 mb-1">Step 1: Energy Required</p>
                  <p className="text-purple-200">E = {inputs.batteryCapacity}kWh × ({inputs.targetCharge}% - {inputs.currentCharge}%) ÷ 100</p>
                  <p className="text-purple-300 font-semibold">E = {results.energyRequired.toFixed(2)} kWh</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-xs text-purple-400 mb-1">Step 2: Charging Time</p>
                  <p className="text-purple-200">t = E ÷ (Power × Efficiency)</p>
                  <p className="text-purple-300 font-semibold">t = {results.chargingTime.toFixed(2)} hours</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-xs text-purple-400 mb-1">Step 3: Design Current</p>
                  <p className="text-purple-200">I = (P × 1000) ÷ V</p>
                  <p className="text-purple-300 font-semibold">I = {results.designCurrent.toFixed(1)}A</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-xs text-purple-400 mb-1">Step 4: Voltage Drop</p>
                  <p className="text-purple-200">ΔV = (2 × I × L × z) ÷ 1000</p>
                  <p className="text-purple-300 font-semibold">ΔV = {results.voltageDrop.toFixed(1)}V ({((results.voltageDrop / 230) * 100).toFixed(1)}%)</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Reference */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Section 722</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-amber-200/80">
                <p><strong className="text-amber-300">722.531.2:</strong> RCD protection (30mA Type A minimum) mandatory</p>
                <p><strong className="text-amber-300">722.411.4.1:</strong> DC fault protection required for AC charging</p>
                <p><strong className="text-amber-300">722.55:</strong> Earth electrode may be required for outdoor installations</p>
                <p><strong className="text-amber-300">BS EN 61851:</strong> Charging equipment safety and performance standards</p>
                <p><strong className="text-amber-300">Part P:</strong> Notification required for new circuits &gt;3.68kW</p>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Car className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Dedicated circuit required.</strong> RCD protection and DC fault detection mandatory per BS 7671.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EVChargingCalculator;
