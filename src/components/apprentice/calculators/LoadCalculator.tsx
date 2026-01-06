import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Lightbulb, Zap, Info, BookOpen, ChevronDown } from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Appliance {
  id: string;
  name: string;
  power: number;
  quantity: number;
  type: 'lighting' | 'socket' | 'heating' | 'motor' | 'other';
}

interface CableRecommendation {
  size: string;
  current: number;
  method: string;
}

const diversityFactors = {
  lighting: 0.9,
  socket: 0.4,
  heating: 1.0,
  motor: 0.8,
  other: 0.7
};

const cableData: CableRecommendation[] = [
  { size: '1.0mm²', current: 13, method: 'Method C (clipped direct)' },
  { size: '1.5mm²', current: 16, method: 'Method C (clipped direct)' },
  { size: '2.5mm²', current: 23, method: 'Method C (clipped direct)' },
  { size: '4.0mm²', current: 31, method: 'Method C (clipped direct)' },
  { size: '6.0mm²', current: 41, method: 'Method C (clipped direct)' },
  { size: '10.0mm²', current: 57, method: 'Method C (clipped direct)' },
  { size: '16.0mm²', current: 76, method: 'Method C (clipped direct)' }
];

const typeOptions = [
  { value: "lighting", label: "Lighting (90% diversity)" },
  { value: "socket", label: "Socket Outlet (40% diversity)" },
  { value: "heating", label: "Heating (100% diversity)" },
  { value: "motor", label: "Motor (80% diversity)" },
  { value: "other", label: "Other (70% diversity)" },
];

const voltageOptions = [
  { value: "230", label: "230V (Single Phase)" },
  { value: "400", label: "400V (Three Phase)" },
];

export const LoadCalculator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [voltage, setVoltage] = useState<string>("230");
  const [calculated, setCalculated] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [newAppliance, setNewAppliance] = useState({
    name: '',
    power: '',
    quantity: '1',
    type: 'other' as const
  });

  const config = CALCULATOR_CONFIG['power'];

  const addAppliance = useCallback(() => {
    if (newAppliance.name && newAppliance.power) {
      const appliance: Appliance = {
        id: Math.random().toString(36).substr(2, 9),
        name: newAppliance.name,
        power: parseFloat(newAppliance.power),
        quantity: parseInt(newAppliance.quantity),
        type: newAppliance.type
      };
      setAppliances(prev => [...prev, appliance]);
      setNewAppliance({ name: '', power: '', quantity: '1', type: 'other' });
      setCalculated(false);
    }
  }, [newAppliance]);

  const removeAppliance = useCallback((id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
    setCalculated(false);
  }, []);

  const handleCalculate = useCallback(() => {
    if (appliances.length > 0) {
      setCalculated(true);
    }
  }, [appliances]);

  const resetCalculator = useCallback(() => {
    setAppliances([]);
    setCalculated(false);
  }, []);

  const calculations = useCallback(() => {
    let totalConnectedLoad = 0;
    let totalMaximumDemand = 0;

    const breakdownByType: Record<string, { connected: number; demand: number; count: number }> = {};

    appliances.forEach(appliance => {
      const connected = appliance.power * appliance.quantity;
      const diversity = diversityFactors[appliance.type];
      const demand = connected * diversity;

      totalConnectedLoad += connected;
      totalMaximumDemand += demand;

      if (!breakdownByType[appliance.type]) {
        breakdownByType[appliance.type] = { connected: 0, demand: 0, count: 0 };
      }
      breakdownByType[appliance.type].connected += connected;
      breakdownByType[appliance.type].demand += demand;
      breakdownByType[appliance.type].count += appliance.quantity;
    });

    const voltageNum = parseInt(voltage);
    const current = totalMaximumDemand / voltageNum;
    const designCurrent = current * 1.25;
    const recommendedCable = cableData.find(cable => cable.current >= designCurrent) || cableData[cableData.length - 1];
    const recommendedMCB = current <= 6 ? 6 : current <= 10 ? 10 : current <= 16 ? 16 : current <= 20 ? 20 : current <= 25 ? 25 : current <= 32 ? 32 : current <= 40 ? 40 : 50;

    const cableResistance: Record<string, number> = {
      '1.0mm²': 18.1,
      '1.5mm²': 12.1,
      '2.5mm²': 7.41,
      '4.0mm²': 4.61,
      '6.0mm²': 3.08,
      '10.0mm²': 1.83,
      '16.0mm²': 1.15
    };

    const resistance = cableResistance[recommendedCable.size] || 1.83;
    const voltageDrop = (current * resistance * 20) / 1000;
    const voltageDropPercent = (voltageDrop / voltageNum) * 100;

    return {
      totalConnectedLoad: totalConnectedLoad / 1000,
      totalMaximumDemand: totalMaximumDemand / 1000,
      current: current,
      designCurrent: designCurrent,
      recommendedCable,
      recommendedMCB,
      breakdownByType,
      diversityApplied: ((totalConnectedLoad - totalMaximumDemand) / totalConnectedLoad * 100) || 0,
      voltageDrop,
      voltageDropPercent
    };
  }, [appliances, voltage]);

  const results = calculations();

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Load Calculator"
        description="Calculate maximum demand with diversity factors for electrical installations"
      >
        {/* Add Appliance Section */}
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{
            borderColor: `${config.gradientFrom}30`,
            background: `${config.gradientFrom}08`
          }}
        >
          <h4 className="font-medium text-white flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" style={{ color: config.gradientFrom }} />
            Add Appliance
          </h4>

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Appliance Name"
              type="text"
              value={newAppliance.name}
              onChange={(value) => setNewAppliance(prev => ({ ...prev, name: value }))}
              placeholder="e.g. Immersion Heater"
            />
            <CalculatorInput
              label="Power"
              unit="W"
              type="text"
              inputMode="decimal"
              value={newAppliance.power}
              onChange={(value) => setNewAppliance(prev => ({ ...prev, power: value }))}
              placeholder="e.g. 3000"
            />
            <CalculatorInput
              label="Quantity"
              type="text"
              inputMode="numeric"
              value={newAppliance.quantity}
              onChange={(value) => setNewAppliance(prev => ({ ...prev, quantity: value }))}
              placeholder="1"
            />
            <CalculatorSelect
              label="Load Type"
              value={newAppliance.type}
              onChange={(value) => setNewAppliance(prev => ({ ...prev, type: value as any }))}
              options={typeOptions}
            />
          </CalculatorInputGrid>

          <button
            onClick={addAppliance}
            disabled={!newAppliance.name || !newAppliance.power}
            className={cn(
              "w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all touch-manipulation active:scale-[0.98]",
              newAppliance.name && newAppliance.power
                ? "bg-gradient-to-r text-white shadow-lg"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            )}
            style={newAppliance.name && newAppliance.power ? {
              backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
            } : undefined}
          >
            <Plus className="h-4 w-4" />
            Add Appliance
          </button>
        </div>

        {/* Supply Voltage */}
        <CalculatorSelect
          label="Supply Voltage"
          value={voltage}
          onChange={setVoltage}
          options={voltageOptions}
        />

        {/* Appliance List */}
        {appliances.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-white text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4" style={{ color: config.gradientFrom }} />
              Added Appliances ({appliances.length})
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {appliances.map(appliance => (
                <div
                  key={appliance.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-medium text-white text-sm">{appliance.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs capitalize"
                        style={{ borderColor: `${config.gradientFrom}40`, color: config.gradientFrom }}
                      >
                        {appliance.type}
                      </Badge>
                      <span className="text-xs text-white/60">
                        {appliance.power}W × {appliance.quantity} = {(appliance.power * appliance.quantity).toLocaleString()}W
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAppliance(appliance.id)}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors touch-manipulation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculate Actions */}
        <CalculatorActions
          category="power"
          onCalculate={handleCalculate}
          onReset={resetCalculator}
          isDisabled={appliances.length === 0}
        />
      </CalculatorCard>

      {/* Results */}
      {calculated && appliances.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Maximum Demand</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {results.totalMaximumDemand.toFixed(2)} kW
              </div>
              <p className="text-sm text-white/50 mt-1">
                {results.diversityApplied.toFixed(0)}% diversity applied
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Connected Load"
                value={results.totalConnectedLoad.toFixed(2)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Design Current"
                value={results.designCurrent.toFixed(1)}
                unit="A"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Load Current"
                value={results.current.toFixed(1)}
                unit="A"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Voltage Drop (20m)"
                value={`${results.voltageDrop.toFixed(2)}V (${results.voltageDropPercent.toFixed(1)}%)`}
                category="power"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Recommendations */}
          <CalculatorResult category="cable">
            <h4 className="font-medium text-white flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-emerald-400" />
              Recommendations
            </h4>

            <ResultsGrid columns={2}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Cable Size</p>
                <p className="text-2xl font-bold text-emerald-400">{results.recommendedCable.size}</p>
                <p className="text-xs text-white/40">Capacity: {results.recommendedCable.current}A</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">MCB Rating</p>
                <p className="text-2xl font-bold text-emerald-400">{results.recommendedMCB}A</p>
                <p className="text-xs text-white/40">Type B/C</p>
              </div>
            </ResultsGrid>

            <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-200">
                <strong>Note:</strong> Based on Method C installation. Consider derating factors for final design.
              </p>
            </div>
          </CalculatorResult>

          {/* Load Breakdown */}
          {Object.keys(results.breakdownByType).length > 0 && (
            <div className="calculator-card p-4">
              <h4 className="font-medium text-white mb-3 text-sm">Load Breakdown by Type</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(results.breakdownByType).map(([type, data]) => (
                  <div
                    key={type}
                    className="p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="font-medium capitalize text-white mb-2 text-sm">{type}</div>
                    <div className="text-xs space-y-1 text-white/70">
                      <div className="flex justify-between">
                        <span>Connected:</span>
                        <span className="text-white">{(data.connected / 1000).toFixed(2)} kW</span>
                      </div>
                      <div className="flex justify-between">
                        <span>After Diversity:</span>
                        <span style={{ color: config.gradientFrom }}>{(data.demand / 1000).toFixed(2)} kW</span>
                      </div>
                      <div className="flex justify-between text-white/50">
                        <span>Diversity Factor:</span>
                        <span>{(diversityFactors[type as keyof typeof diversityFactors] * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  <strong className="text-blue-300">Maximum Demand:</strong> The estimated peak load after applying diversity factors. This accounts for the fact that not all loads operate simultaneously at full capacity.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Design Current:</strong> The maximum demand current plus a 25% safety margin for future expansion and unexpected loads.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Diversity Factors:</strong> Heating loads typically run at full capacity (100%), while socket outlets have lower diversity (40%) as they're rarely all used simultaneously.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Regs at a Glance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showBsRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p>• <strong className="text-amber-300">311.1:</strong> Assessment of maximum demand shall account for diversity</p>
                  <p>• <strong className="text-amber-300">433.1:</strong> Protective devices shall be selected for design current (Ib ≤ In ≤ Iz)</p>
                  <p>• <strong className="text-amber-300">525:</strong> Voltage drop limits: 3% lighting, 5% other uses from origin</p>
                  <p>• <strong className="text-amber-300">Appendix 4:</strong> Current-carrying capacities and cable sizing tables</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Maximum Demand</strong> = Σ(Connected Load × Diversity Factor). Design Current = Max Demand Current × 1.25
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadCalculator;
