import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Car, Info, BookOpen, ChevronDown, AlertTriangle, Plus, Trash2, Zap } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { calculateEVSELoad, type ChargingPoint, type CalculationInputs, type CalculationResult } from "@/lib/evse-calculations";
import { CHARGER_TYPES, EARTHING_SYSTEMS, DIVERSITY_FACTORS } from "@/lib/ev-constants";

const EVSELoadCalculator = () => {
  const config = CALCULATOR_CONFIG['ev_storage'];
  const { toast } = useToast();

  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [quantityInputs, setQuantityInputs] = useState<string[]>([]);
  const [supplyVoltage, setSupplyVoltage] = useState('415');
  const [earthingSystem, setEarthingSystem] = useState('tn-c-s');
  const [availableCapacity, setAvailableCapacity] = useState('100');
  const [cableLength, setCableLength] = useState('50');
  const [diversityScenario, setDiversityScenario] = useState('domestic_multiple');
  const [powerFactor, setPowerFactor] = useState('0.95');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [showRegs, setShowRegs] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const chargerOptions = Object.entries(CHARGER_TYPES).map(([key, charger]) => ({
    value: key,
    label: charger.label
  }));

  const earthingOptions = Object.entries(EARTHING_SYSTEMS).map(([key, system]) => ({
    value: key,
    label: system.label
  }));

  const diversityOptions = Object.entries(DIVERSITY_FACTORS).map(([key, factor]) => ({
    value: key,
    label: `${factor.label} (${(factor.value * 100).toFixed(0)}%)`
  }));

  const addChargingPoint = () => {
    const newPoint: ChargingPoint = { chargerType: '7kw-ac', quantity: 1 };
    setChargingPoints([...chargingPoints, newPoint]);
    setQuantityInputs([...quantityInputs, '1']);
  };

  const removeChargingPoint = (index: number) => {
    setChargingPoints(chargingPoints.filter((_, i) => i !== index));
    setQuantityInputs(quantityInputs.filter((_, i) => i !== index));
  };

  const updateChargingPoint = (index: number, field: keyof ChargingPoint, value: string | number) => {
    const updatedPoints = [...chargingPoints];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    setChargingPoints(updatedPoints);
  };

  const handleCalculate = () => {
    if (chargingPoints.length === 0) {
      toast({ title: "No Charging Points", description: "Add at least one charging point.", variant: "destructive" });
      return;
    }

    const inputs: CalculationInputs = {
      chargingPoints,
      supplyVoltage: parseFloat(supplyVoltage),
      earthingSystem,
      availableCapacity: parseFloat(availableCapacity),
      cableLength: parseFloat(cableLength),
      diversityScenario,
      powerFactor: parseFloat(powerFactor)
    };

    try {
      const calculations = calculateEVSELoad(inputs);
      setResult(calculations);
    } catch (error) {
      toast({ title: "Calculation Error", description: error instanceof Error ? error.message : "An error occurred.", variant: "destructive" });
    }
  };

  const reset = () => {
    setChargingPoints([]);
    setQuantityInputs([]);
    setSupplyVoltage('415');
    setEarthingSystem('tn-c-s');
    setAvailableCapacity('100');
    setCableLength('50');
    setDiversityScenario('domestic_multiple');
    setPowerFactor('0.95');
    setResult(null);
  };

  const getTotalPoints = () => chargingPoints.reduce((sum, cp) => sum + cp.quantity, 0);

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="ev_storage"
        title="EVSE Load Calculator"
        description="Calculate electrical load and infrastructure requirements"
        badge="BS 7671"
      >
        {/* Charging Points Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/80">Charging Points</p>
            <Badge variant="outline" className="text-blue-400 border-blue-400/50">
              {getTotalPoints()} point{getTotalPoints() !== 1 ? 's' : ''}
            </Badge>
          </div>

          <button
            onClick={addChargingPoint}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Add Charging Point</span>
          </button>

          {chargingPoints.length > 0 && (
            <div className="space-y-2">
              {chargingPoints.map((point, index) => (
                <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Point {index + 1}</span>
                    <button
                      onClick={() => removeChargingPoint(index)}
                      className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </button>
                  </div>
                  <CalculatorInputGrid columns={2}>
                    <CalculatorSelect
                      label="Charger Type"
                      value={point.chargerType}
                      onChange={(value) => updateChargingPoint(index, 'chargerType', value)}
                      options={chargerOptions}
                    />
                    <CalculatorInput
                      label="Quantity"
                      type="text"
                      inputMode="numeric"
                      value={quantityInputs[index] ?? ''}
                      onChange={(value) => {
                        if (value === '' || /^[0-9]+$/.test(value)) {
                          const updatedInputs = [...quantityInputs];
                          updatedInputs[index] = value;
                          setQuantityInputs(updatedInputs);
                          if (value !== '' && parseInt(value) > 0) {
                            updateChargingPoint(index, 'quantity', parseInt(value));
                          }
                        }
                      }}
                      placeholder="1"
                    />
                  </CalculatorInputGrid>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supply Details */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Supply & Installation</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Supply Voltage"
              unit="V"
              type="text"
              inputMode="decimal"
              value={supplyVoltage}
              onChange={setSupplyVoltage}
              placeholder="415"
            />
            <CalculatorInput
              label="Available Capacity"
              unit="kW"
              type="text"
              inputMode="decimal"
              value={availableCapacity}
              onChange={setAvailableCapacity}
              placeholder="100"
            />
            <CalculatorSelect
              label="Earthing System"
              value={earthingSystem}
              onChange={setEarthingSystem}
              options={earthingOptions}
            />
            <CalculatorSelect
              label="Diversity Scenario"
              value={diversityScenario}
              onChange={setDiversityScenario}
              options={diversityOptions}
            />
            <CalculatorInput
              label="Cable Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={cableLength}
              onChange={setCableLength}
              placeholder="50"
            />
            <CalculatorInput
              label="Power Factor"
              type="text"
              inputMode="decimal"
              value={powerFactor}
              onChange={setPowerFactor}
              placeholder="0.95"
            />
          </CalculatorInputGrid>
        </div>

        <CalculatorActions
          category="ev_storage"
          onCalculate={handleCalculate}
          onReset={reset}
          isDisabled={chargingPoints.length === 0}
          calculateLabel="Calculate Load"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="ev_storage">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">EVSE Load Analysis</span>
              <Badge variant="outline" className={cn(
                result.compliance.voltageDrop ? "text-green-400 border-green-400/50" : "text-red-400 border-red-400/50"
              )}>
                {result.compliance.voltageDrop ? "Compliant" : "Review Required"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Diversified Load</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {result.totalDiversifiedLoad.toFixed(1)}
                </div>
                <p className="text-xs text-white/80">kW</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Design Current</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {result.designCurrent.toFixed(0)}
                </div>
                <p className="text-xs text-white/80">A</p>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Nominal Load" value={result.totalNominalPower.toFixed(0)} unit="kW" category="ev_storage" size="sm" />
              <ResultValue label="Voltage Drop" value={result.voltageDropPercent.toFixed(1)} unit="%" category="ev_storage" size="sm" />
              <ResultValue label="Cable Size" value={result.selectedCable || "TBD"} category="ev_storage" size="sm" />
              <ResultValue label="Protection" value={result.selectedProtection || "TBD"} category="ev_storage" size="sm" />
            </ResultsGrid>

            <div className="mt-4 p-3 rounded-lg bg-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Headroom Available</span>
                <span className={cn("text-lg font-bold", result.headroom > 10 ? "text-green-400" : result.headroom > 0 ? "text-amber-400" : "text-red-400")}>
                  {result.headroom.toFixed(0)}A
                </span>
              </div>
            </div>
          </CalculatorResult>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-300">Recommendations</p>
              </div>
              <ul className="space-y-1 text-sm text-blue-200/80">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Low Headroom Warning */}
          {result.headroom < 10 && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <p className="text-sm text-orange-200">
                  <strong>Low Headroom:</strong> Consider future expansion and load growth requirements.
                </p>
              </div>
            </div>
          )}

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
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-blue-200/80">
                <p><strong className="text-blue-300">Design Current:</strong> Determines cable sizing and protection device rating. {result.designCurrent > 100 ? "High current - consider 3-phase supply." : "Standard residential/commercial load."}</p>
                <p><strong className="text-blue-300">Voltage Drop:</strong> Must stay below 5% (BS 7671). {result.voltageDropPercent > 5 ? "EXCESSIVE - increase cable size or reduce run length." : "Within acceptable limits."}</p>
                <p><strong className="text-blue-300">Diversity Factor:</strong> Accounts for realistic usage patterns. Multiple chargers rarely operate at full load simultaneously.</p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Regulations */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Requirements</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-amber-200/80">
                <p><strong className="text-amber-300">Section 722:</strong> EV charging installations - RCD protection mandatory (30mA Type A minimum)</p>
                <p><strong className="text-amber-300">IET Code of Practice:</strong> EV supply equipment installation and earthing arrangements</p>
                <p><strong className="text-amber-300">Earthing:</strong> {EARTHING_SYSTEMS[earthingSystem as keyof typeof EARTHING_SYSTEMS]?.description}</p>
                {result.selectedProtection?.includes('DC') && (
                  <p className="text-blue-300"><strong>DC Protection:</strong> Required for installations &gt;32A. Consult manufacturer specifications.</p>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {!result && chargingPoints.length === 0 && (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
          <Car className="h-10 w-10 mx-auto mb-3 text-white/30" />
          <p className="text-sm text-white/80">Add charging points to calculate EVSE load requirements</p>
        </div>
      )}

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Professional design required.</strong> Verify calculations with supply authority for commercial installations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EVSELoadCalculator;
