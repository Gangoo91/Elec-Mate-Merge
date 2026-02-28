import { useState, useCallback } from 'react';
import {
  Sun,
  Battery,
  Copy,
  Check,
  Info,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  PoundSterling,
} from 'lucide-react';
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
import { OFFGRID_PRESETS, getPresetByName } from '@/lib/offgrid-presets';
import { calculateOffGridSystem, OffGridResult } from '@/lib/offgrid-calculations';

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

export function OffGridSystemCalculator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [selectedPreset, setSelectedPreset] = useState('');
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [peakPowerKw, setPeakPowerKw] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [autonomyDays, setAutonomyDays] = useState('3');
  const [systemVoltage, setSystemVoltage] = useState('');
  const [panelWattage, setPanelWattage] = useState('400');
  const [batteryCapacity, setBatteryCapacity] = useState('100');
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [batteryType, setBatteryType] = useState('lithium');
  const [batteryLocation, setBatteryLocation] = useState('sheltered');
  const [depthOfDischarge, setDepthOfDischarge] = useState('80');
  const [systemEfficiency, setSystemEfficiency] = useState('85');

  const [showCost, setShowCost] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [result, setResult] = useState<OffGridResult | null>(null);

  const presetOptions = OFFGRID_PRESETS.map((preset) => ({
    value: preset.name,
    label: preset.name,
  }));

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName) {
      const preset = getPresetByName(presetName);
      if (preset) {
        setDailyConsumption(preset.dailyConsumption);
        setPeakSunHours(preset.peakSunHours);
        setAutonomyDays(preset.autonomyDays);
        setSystemVoltage(preset.systemVoltage);
        setPanelWattage(preset.panelWattage);
        setBatteryCapacity(preset.batteryCapacity);
        setBatteryVoltage(preset.batteryVoltage);
        setDepthOfDischarge(preset.depthOfDischarge);
        setSystemEfficiency(preset.systemEfficiency);
      }
    }
  };

  const handleCalculate = useCallback(() => {
    const consumption = parseFloat(dailyConsumption);
    const sunHours = parseFloat(peakSunHours);
    const autonomy = parseFloat(autonomyDays);
    const voltage = parseFloat(systemVoltage);
    const panelWatt = parseFloat(panelWattage);
    const battCap = parseFloat(batteryCapacity);
    const battVolt = parseFloat(batteryVoltage);
    const dod = parseFloat(depthOfDischarge);
    const efficiency = parseFloat(systemEfficiency);
    const peakKw = peakPowerKw ? parseFloat(peakPowerKw) : undefined;

    if (
      consumption &&
      sunHours &&
      autonomy &&
      voltage &&
      panelWatt &&
      battCap &&
      battVolt &&
      dod &&
      efficiency
    ) {
      const calculatedResult = calculateOffGridSystem({
        dailyConsumption: consumption,
        peakSunHours: sunHours,
        autonomyDays: autonomy,
        systemVoltage: voltage,
        panelWattage: panelWatt,
        batteryCapacity: battCap,
        batteryVoltage: battVolt,
        depthOfDischarge: dod,
        systemEfficiency: efficiency,
        batteryType: batteryType as 'lithium' | 'agm',
        peakPowerKw: peakKw,
        batteryLocation: batteryLocation as 'indoor' | 'sheltered' | 'outdoor',
      });
      setResult(calculatedResult);
    }
  }, [
    dailyConsumption,
    peakPowerKw,
    peakSunHours,
    autonomyDays,
    systemVoltage,
    panelWattage,
    batteryCapacity,
    batteryVoltage,
    batteryType,
    batteryLocation,
    depthOfDischarge,
    systemEfficiency,
  ]);

  const handleReset = useCallback(() => {
    setSelectedPreset('');
    setDailyConsumption('');
    setPeakPowerKw('');
    setPeakSunHours('3.5');
    setAutonomyDays('3');
    setSystemVoltage('');
    setPanelWattage('400');
    setBatteryCapacity('100');
    setBatteryVoltage('12');
    setBatteryType('lithium');
    setBatteryLocation('sheltered');
    setDepthOfDischarge('80');
    setSystemEfficiency('85');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Off-Grid System Design',
      `Daily Consumption: ${dailyConsumption} kWh`,
      `Solar Array: ${result.numberOfPanels} × ${panelWattage}W (${((result.numberOfPanels * parseFloat(panelWattage)) / 1000).toFixed(1)} kW)`,
      `Battery Bank: ${result.numberOfBatteries} × ${batteryCapacity}Ah`,
      `Inverter: ${result.inverterSize.toFixed(1)} kW`,
      `Charge Controller: ${result.chargeControllerSize.toFixed(0)}A MPPT`,
      `Daily Balance: ${result.dailyEnergyBalance >= 0 ? '+' : ''}${result.dailyEnergyBalance.toFixed(1)} kWh`,
      `System Cost: £${result.systemCost.toFixed(0)}`,
      `Rating: ${result.systemRating}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs = dailyConsumption && systemVoltage;
  const selectedPresetData = selectedPreset ? getPresetByName(selectedPreset) : null;

  const getRatingStatus = (rating: string): 'pass' | 'warning' | 'fail' | 'info' => {
    switch (rating) {
      case 'excellent':
      case 'good':
        return 'pass';
      case 'adequate':
      case 'marginal':
        return 'warning';
      default:
        return 'fail';
    }
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Off-Grid System Designer"
      description="Complete off-grid solar system with UK-focused guidance"
      badge="BS 7671"
    >
      <CalculatorSelect
        label="Quick Start Preset"
        value={selectedPreset}
        onChange={handlePresetChange}
        options={presetOptions}
        placeholder="Choose a preset or custom"
        hint="Auto-fill typical values"
      />

      {selectedPresetData && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-white font-medium">{selectedPresetData.description}</p>
          <p className="text-xs text-white mt-1">{selectedPresetData.scenario}</p>
        </div>
      )}

      {/* Consumption */}
      <CalculatorSection title="Energy Requirements">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Daily Consumption"
            unit="kWh"
            type="text"
            inputMode="decimal"
            value={dailyConsumption}
            onChange={setDailyConsumption}
            placeholder="e.g., 5"
            hint="Include all appliances"
          />
          <CalculatorInput
            label="Peak Power Draw"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={peakPowerKw}
            onChange={setPeakPowerKw}
            placeholder="e.g., 2"
            hint="Max simultaneous load"
          />
          <CalculatorInput
            label="Peak Sun Hours"
            unit="hrs/day"
            type="text"
            inputMode="decimal"
            value={peakSunHours}
            onChange={setPeakSunHours}
            placeholder="3.5"
            hint="UK: 2.5–4.5 hrs"
          />
          <CalculatorInput
            label="Backup Days"
            unit="days"
            type="text"
            inputMode="numeric"
            value={autonomyDays}
            onChange={setAutonomyDays}
            placeholder="3"
            hint="Days without solar"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="System Voltage"
            value={systemVoltage}
            onChange={setSystemVoltage}
            options={[
              { value: '12', label: '12V DC (Small)' },
              { value: '24', label: '24V DC (Medium)' },
              { value: '48', label: '48V DC (Large)' },
            ]}
            placeholder="Select voltage"
          />
          <CalculatorInput
            label="Panel Wattage"
            unit="W"
            type="text"
            inputMode="numeric"
            value={panelWattage}
            onChange={setPanelWattage}
            placeholder="400"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Battery Configuration */}
      <CalculatorSection title="Battery Configuration">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Battery Type"
            value={batteryType}
            onChange={setBatteryType}
            options={[
              { value: 'lithium', label: 'LiFePO4 (Recommended)' },
              { value: 'agm', label: 'AGM Deep Cycle' },
            ]}
          />
          <CalculatorSelect
            label="Battery Location"
            value={batteryLocation}
            onChange={setBatteryLocation}
            options={[
              { value: 'indoor', label: 'Indoor (20°C)' },
              { value: 'sheltered', label: 'Sheltered (5–15°C)' },
              { value: 'outdoor', label: 'Outdoor (0–5°C)' },
            ]}
          />
          <CalculatorInput
            label="Battery Capacity"
            unit="Ah"
            type="text"
            inputMode="numeric"
            value={batteryCapacity}
            onChange={setBatteryCapacity}
            placeholder="100"
          />
          <CalculatorInput
            label="Depth of Discharge"
            unit="%"
            type="text"
            inputMode="numeric"
            value={depthOfDischarge}
            onChange={setDepthOfDischarge}
            placeholder="80"
            hint="LiFePO4: 80%, AGM: 50%"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs}
        calculateLabel="Design System"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={getRatingStatus(result.systemRating)}
              label={`${result.systemRating.charAt(0).toUpperCase() + result.systemRating.slice(1)} System`}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero: Solar + Battery summary */}
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Sun className="h-5 w-5 mx-auto mb-1 text-amber-400" />
              <p className="text-xs text-white">Solar Array</p>
              <p
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {((result.numberOfPanels * parseFloat(panelWattage)) / 1000).toFixed(1)}kW
              </p>
              <p className="text-xs text-white">
                {result.numberOfPanels} × {panelWattage}W
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Battery className="h-5 w-5 mx-auto mb-1 text-blue-400" />
              <p className="text-xs text-white">Battery Bank</p>
              <p
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {(
                  (result.numberOfBatteries *
                    parseFloat(batteryCapacity) *
                    parseFloat(depthOfDischarge)) /
                  100
                ).toFixed(0)}
                Ah
              </p>
              <p className="text-xs text-white">
                {result.numberOfBatteries} × {batteryCapacity}Ah
              </p>
            </div>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Daily Balance"
              value={
                result.dailyEnergyBalance >= 0
                  ? `+${result.dailyEnergyBalance.toFixed(1)}`
                  : result.dailyEnergyBalance.toFixed(1)
              }
              unit="kWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="System Cost"
              value={`£${result.systemCost.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Inverter"
              value={result.inverterSize.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Charge Controller"
              value={result.chargeControllerSize.toFixed(0)}
              unit="A MPPT"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {result.dailyEnergyBalance < 0 && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  Daily deficit of {Math.abs(result.dailyEnergyBalance).toFixed(1)}kWh — increase
                  panels or reduce consumption.
                </p>
              </div>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-orange-300">Warnings</span>
              </div>
              <ul className="space-y-1 ml-6">
                {result.warnings.map((warning, i) => (
                  <li key={i} className="text-sm text-white">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-green-300">Recommendations</span>
              </div>
              <ul className="space-y-1 ml-6">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-white">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Efficiency Chain */}
          <div className="p-3 rounded-xl bg-white/5 space-y-2">
            <p className="text-sm font-medium text-white">
              Efficiency Chain ({result.overallEfficiency.toFixed(0)}% overall)
            </p>
            <div className="space-y-1.5">
              {result.efficiencyChain.map((step) => (
                <div key={step.stage} className="flex items-center justify-between text-sm">
                  <span className="text-white">{step.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{step.efficiency.toFixed(0)}%</span>
                    <span className="text-red-400 text-xs">−{step.lossKwh.toFixed(2)} kWh</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wire loss warning */}
          {result.wireLossWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Wire Loss Warning</p>
                  <p className="text-xs text-white">{result.wireLossWarning}</p>
                </div>
              </div>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Required solar capacity',
                formula: `P_solar = ${dailyConsumption} kWh / ${peakSunHours} h / ${(parseFloat(systemEfficiency) / 100).toFixed(2)}`,
                value: `${result.requiredSolarCapacity.toFixed(2)} kW`,
                description: 'Daily consumption ÷ peak sun hours ÷ system efficiency',
              },
              {
                label: 'Panels needed',
                formula: `N = ⌈${(result.requiredSolarCapacity * 1000).toFixed(0)}W / ${panelWattage}W⌉`,
                value: `${result.numberOfPanels} panels (${((result.numberOfPanels * parseFloat(panelWattage)) / 1000).toFixed(1)} kW actual)`,
              },
              {
                label: 'Required battery storage',
                formula: `C = (${dailyConsumption} × ${autonomyDays} × 1000) / (${systemVoltage}V × ${(parseFloat(depthOfDischarge) / 100).toFixed(2)})`,
                value: `${result.requiredBatteryCapacity.toFixed(0)} Ah`,
              },
              {
                label: 'Batteries needed',
                formula: `N = ⌈${result.requiredBatteryCapacity.toFixed(0)} / (${batteryCapacity} × ${(parseFloat(depthOfDischarge) / 100).toFixed(2)})⌉`,
                value: `${result.numberOfBatteries} batteries`,
                description:
                  batteryLocation !== 'indoor'
                    ? `Temperature derating applied for ${batteryLocation} location`
                    : undefined,
              },
              {
                label: 'Inverter sizing',
                formula: `P_inv = ${peakPowerKw || `${dailyConsumption} / 6`} kW × 1.25`,
                value: `${result.inverterSize.toFixed(1)} kW`,
                description: 'Sized from peak power draw with 25% surge margin',
              },
              {
                label: 'Daily energy balance',
                formula: `Balance = ${((result.numberOfPanels * parseFloat(panelWattage) * parseFloat(peakSunHours)) / 1000).toFixed(1)} − ${dailyConsumption}`,
                value: `${result.dailyEnergyBalance >= 0 ? '+' : ''}${result.dailyEnergyBalance.toFixed(1)} kWh`,
              },
            ]}
          />

          {/* Cost Breakdown */}
          <Collapsible open={showCost} onOpenChange={setShowCost}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-green-400" />
                <span>Cost Breakdown</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showCost && 'rotate-180'
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
                <div className="space-y-2 text-sm">
                  {Object.entries(result.costBreakdown)
                    .filter(([key]) => key !== 'total')
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-white">£{(value as number).toFixed(0)}</span>
                      </div>
                    ))}
                  <div className="flex justify-between pt-2 border-t border-white/10 font-semibold">
                    <span className="text-white">Total (inc. VAT)</span>
                    <span className="text-green-400">£{result.costBreakdown.total.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Installation Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Installation Guidance</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
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
                <p className="text-sm text-white">
                  Planning permission generally not needed for roof-mounted panels
                </p>
                <p className="text-sm text-white">
                  Ground-mounted systems over 9m² may need planning consent
                </p>
                <p className="text-sm text-white">
                  Battery storage must comply with fire safety regulations
                </p>
                <p className="text-sm text-white">
                  Maintain 1.5m clearance from boundaries for fire access
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Standards & Regulations */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Standards & Regulations</span>
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
                    <strong>BS 7671:</strong> Wiring regulations apply to all DC and AC circuits
                  </p>
                  <p>
                    <strong>Building Regs Part P:</strong> Notification required for electrical work
                  </p>
                  <p>
                    <strong>BS EN 62446:</strong> Testing and commissioning standards for PV
                  </p>
                  <p>
                    <strong>MCS:</strong> Recommended for quality assurance
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Info note */}
      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Off-grid sizing:</strong> Allow 20–30% margin for UK weather variability.
            LiFePO4 batteries offer 80% DoD vs 50% for AGM.
          </p>
        </div>
      </div>

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Off-Grid System Formulas"
        formula="P_solar = E_daily / PSH / η"
        variables={[
          { symbol: 'E_daily', description: 'Daily energy consumption (kWh)' },
          { symbol: 'PSH', description: 'Peak sun hours (hrs/day)' },
          { symbol: 'η', description: 'System efficiency (decimal)' },
          { symbol: 'C_batt', description: '(E × days × 1000) / (V × DoD)' },
        ]}
      />
    </CalculatorCard>
  );
}

export default OffGridSystemCalculator;
