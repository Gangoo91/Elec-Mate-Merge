import { useState, useCallback } from 'react';
import { Car, Copy, Check, Info, AlertTriangle, CheckCircle, Zap, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { calculateEVCharging, type EVCalculationInputs } from '@/lib/ev-calculations';
import {
  CHARGER_TYPES,
  EARTHING_SYSTEMS,
  DIVERSITY_FACTORS,
  INSTALLATION_LOCATIONS,
} from '@/lib/ev-constants';
import { formatCurrency } from '@/lib/format';

const CAT = 'ev-storage' as const;
const config = CALCULATOR_CONFIG[CAT];

const EVChargingCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [inputs, setInputs] = useState({
    batteryCapacity: '',
    chargerType: '7kw-ac' as keyof typeof CHARGER_TYPES,
    currentCharge: '20',
    targetCharge: '80',
    electricityRate: '0.30',
    diversityFactor: '1.0',
    supplyType: 'tn-c-s' as keyof typeof EARTHING_SYSTEMS,
    runLength: '20',
    ambientTemp: '30',
    installationLocation: 'external',
    existingLoadCurrent: '0',
  });

  const [results, setResults] = useState<ReturnType<typeof calculateEVCharging> | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const chargerOptions = Object.entries(CHARGER_TYPES).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  const earthingOptions = Object.entries(EARTHING_SYSTEMS).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  const diversityOptions = Object.entries(DIVERSITY_FACTORS).map(([, value]) => ({
    value: value.value.toString(),
    label: value.label,
  }));

  const locationOptions = Object.entries(INSTALLATION_LOCATIONS).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  const handleCalculate = useCallback(() => {
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
      existingLoadCurrent: parseFloat(inputs.existingLoadCurrent),
    };

    if (
      !calculationInputs.batteryCapacity ||
      calculationInputs.currentCharge >= calculationInputs.targetCharge
    ) {
      toast({
        title: 'Invalid Input',
        description: 'Please check your battery capacity and charge levels.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const calculationResults = calculateEVCharging(calculationInputs);
      setResults(calculationResults);

      if (!calculationResults.installationCompliant) {
        toast({
          title: 'Installation Issues Detected',
          description: 'Review the warnings below.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Calculation Error',
        description: 'Unable to complete calculation.',
        variant: 'destructive',
      });
    }
  }, [inputs, toast]);

  const handleReset = useCallback(() => {
    setInputs({
      batteryCapacity: '',
      chargerType: '7kw-ac',
      currentCharge: '20',
      targetCharge: '80',
      electricityRate: '0.30',
      diversityFactor: '1.0',
      supplyType: 'tn-c-s',
      runLength: '20',
      ambientTemp: '30',
      installationLocation: 'external',
      existingLoadCurrent: '0',
    });
    setResults(null);
  }, []);

  const handleCopy = () => {
    if (!results) return;
    const text = [
      'EV Charging Analysis',
      `Energy Required: ${results.energyRequired.toFixed(1)} kWh`,
      `Charging Time: ${results.chargingTime.toFixed(1)} hours`,
      `Cost: ${formatCurrency(results.cost)}`,
      `Design Current: ${results.designCurrent.toFixed(1)}A`,
      `Cable: ${results.recommendedCable}`,
      `Voltage Drop: ${results.voltageDrop.toFixed(1)}V (${((results.voltageDrop / 230) * 100).toFixed(1)}%)`,
      `Zs: ${results.actualZs.toFixed(2)}Ω (Max: ${results.maxZs}Ω)`,
      `Status: ${results.installationCompliant ? 'COMPLIANT' : 'ISSUES FOUND'}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs = inputs.batteryCapacity && parseFloat(inputs.batteryCapacity) > 0;

  return (
    <CalculatorCard
      category={CAT}
      title="EV Charging Calculator"
      description="Design compliant EV charging installations per BS 7671"
      badge="Section 722"
    >
      {/* Vehicle & Charging */}
      <CalculatorSection title="Vehicle & Charging">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Battery Capacity"
            unit="kWh"
            type="text"
            inputMode="decimal"
            value={inputs.batteryCapacity}
            onChange={(value) => setInputs({ ...inputs, batteryCapacity: value })}
            placeholder="e.g., 64"
          />
          <CalculatorSelect
            label="Charger Type"
            value={inputs.chargerType}
            onChange={(value) =>
              setInputs({ ...inputs, chargerType: value as keyof typeof CHARGER_TYPES })
            }
            options={chargerOptions}
          />
          <CalculatorInput
            label="Current Charge"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.currentCharge}
            onChange={(value) => setInputs({ ...inputs, currentCharge: value })}
            placeholder="20"
          />
          <CalculatorInput
            label="Target Charge"
            unit="%"
            type="text"
            inputMode="decimal"
            value={inputs.targetCharge}
            onChange={(value) => setInputs({ ...inputs, targetCharge: value })}
            placeholder="80"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Installation Details */}
      <CalculatorSection title="Installation Details">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Supply Type"
            value={inputs.supplyType}
            onChange={(value) =>
              setInputs({ ...inputs, supplyType: value as keyof typeof EARTHING_SYSTEMS })
            }
            options={earthingOptions}
          />
          <CalculatorSelect
            label="Installation Location"
            value={inputs.installationLocation}
            onChange={(value) => setInputs({ ...inputs, installationLocation: value })}
            options={locationOptions}
          />
          <CalculatorInput
            label="Cable Run Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={inputs.runLength}
            onChange={(value) => setInputs({ ...inputs, runLength: value })}
            placeholder="20"
          />
          <CalculatorInput
            label="Ambient Temperature"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={inputs.ambientTemp}
            onChange={(value) => setInputs({ ...inputs, ambientTemp: value })}
            placeholder="30"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Load & Cost */}
      <CalculatorSection title="Load & Cost">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Diversity Factor"
            value={inputs.diversityFactor}
            onChange={(value) => setInputs({ ...inputs, diversityFactor: value })}
            options={diversityOptions}
          />
          <CalculatorInput
            label="Existing Load Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={inputs.existingLoadCurrent}
            onChange={(value) => setInputs({ ...inputs, existingLoadCurrent: value })}
            placeholder="0"
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Electricity Rate"
          unit="£/kWh"
          type="text"
          inputMode="decimal"
          value={inputs.electricityRate}
          onChange={(value) => setInputs({ ...inputs, electricityRate: value })}
          placeholder="0.30"
        />
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs}
        calculateLabel="Calculate"
        showReset={!!results}
      />

      {/* ── Results ── */}
      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={results.installationCompliant ? 'pass' : 'fail'}
              label={results.installationCompliant ? 'Compliant' : 'Issues Found'}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero values */}
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-center">
              <p className="text-sm text-white mb-1">Energy Required</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {results.energyRequired.toFixed(1)}
              </p>
              <p className="text-xs text-white">kWh</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-white mb-1">Charging Time</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {results.chargingTime.toFixed(1)}
              </p>
              <p className="text-xs text-white">hours</p>
            </div>
          </div>

          <ResultsGrid columns={2}>
            <ResultValue
              label="Charging Cost"
              value={formatCurrency(results.cost)}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Peak Demand"
              value={results.peakDemand.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* Technical Specifications */}
          <div className="flex items-center gap-2 pb-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Technical Specifications</span>
          </div>
          <ResultsGrid columns={2}>
            <ResultValue
              label="Circuit Current"
              value={results.circuitCurrent.toFixed(1)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Design Current"
              value={results.designCurrent.toFixed(1)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Cable Size"
              value={results.recommendedCable}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Voltage Drop"
              value={`${results.voltageDrop.toFixed(1)}V (${((results.voltageDrop / 230) * 100).toFixed(1)}%)`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Earth Fault (Zs)"
              value={results.actualZs.toFixed(2)}
              unit="Ω"
              category={CAT}
              size="sm"
            />
            <ResultValue label="Max Zs" value={results.maxZs} unit="Ω" category={CAT} size="sm" />
          </ResultsGrid>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-sm text-white">
              <strong>Protection:</strong> {results.protectionRequired}
            </p>
          </div>

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="text-sm font-medium text-red-300">Installation Warnings</p>
              </div>
              <ul className="space-y-1 text-sm text-white">
                {results.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    {warning}
                  </li>
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
              <ul className="space-y-1 text-sm text-white">
                {results.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Energy required',
                formula: `E = ${inputs.batteryCapacity} kWh × (${inputs.targetCharge}% − ${inputs.currentCharge}%) / 100`,
                value: `${results.energyRequired.toFixed(2)} kWh`,
              },
              {
                label: 'Charging time',
                formula: `t = E / (P × η) = ${results.energyRequired.toFixed(2)} / (${CHARGER_TYPES[inputs.chargerType].power} × ${CHARGER_TYPES[inputs.chargerType].efficiency})`,
                value: `${results.chargingTime.toFixed(2)} hours`,
              },
              {
                label: 'Design current',
                formula: `I = (P / η × 1000) / V${CHARGER_TYPES[inputs.chargerType].phases === 3 ? '√3' : ''}`,
                value: `${results.designCurrent.toFixed(1)}A`,
              },
              {
                label: 'Voltage drop',
                formula: `ΔV = ${CHARGER_TYPES[inputs.chargerType].phases === 3 ? '√3' : '2'} × I × L × z / 1000`,
                value: `${results.voltageDrop.toFixed(1)}V (${((results.voltageDrop / 230) * 100).toFixed(1)}%)`,
              },
              {
                label: 'Earth fault loop impedance',
                formula: `Zs = Ze + cable impedance`,
                value: `${results.actualZs.toFixed(2)}Ω (max ${results.maxZs}Ω)`,
                description:
                  results.actualZs <= results.maxZs
                    ? 'Within limits'
                    : 'Exceeds maximum — review installation',
              },
            ]}
          />

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Load Analysis</p>
                  <p className="text-sm text-white">{results.reviewFindings.loadAnalysis}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Cable Assessment</p>
                  <p className="text-sm text-white">{results.reviewFindings.cableAssessment}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Protection Compliance</p>
                  <p className="text-sm text-white">
                    {results.reviewFindings.protectionCompliance}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Section 722 */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Section 722</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-2"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2 text-sm text-white">
                  <p>
                    <strong>722.531.2:</strong> RCD protection (30mA Type A minimum) mandatory
                  </p>
                  <p>
                    <strong>722.411.4.1:</strong> DC fault protection required for AC charging
                  </p>
                  <p>
                    <strong>722.55:</strong> Earth electrode may be required for outdoor
                    installations
                  </p>
                  <p>
                    <strong>BS EN 61851:</strong> Charging equipment safety and performance
                    standards
                  </p>
                  <p>
                    <strong>Part P:</strong> Notification required for new circuits &gt;3.68kW
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Info note */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Car className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Dedicated circuit required.</strong> RCD protection and DC fault detection
            mandatory per BS 7671.
          </p>
        </div>
      </div>

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="EV Charging Formulas"
        formula="E = C_batt × (target% − current%) / 100"
        variables={[
          { symbol: 'E', description: 'Energy required to charge (kWh)' },
          { symbol: 'C_batt', description: 'Battery capacity (kWh)' },
          { symbol: 'I', description: 'P × 1000 / V — design current (A)' },
          { symbol: 'ΔV', description: '2 × I × L × z / 1000 — voltage drop (V)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default EVChargingCalculator;
