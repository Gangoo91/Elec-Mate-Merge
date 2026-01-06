import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sun, Battery, Zap, Info, AlertTriangle, CheckCircle2, BookOpen, ChevronDown, Settings } from "lucide-react";
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
import { OFFGRID_PRESETS, getPresetByName } from "@/lib/offgrid-presets";
import { calculateOffGridSystem, OffGridResult } from "@/lib/offgrid-calculations";

export function OffGridSystemCalculator() {
  const config = CALCULATOR_CONFIG['renewable'];

  const [selectedPreset, setSelectedPreset] = useState('');
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [autonomyDays, setAutonomyDays] = useState('3');
  const [systemVoltage, setSystemVoltage] = useState('');
  const [panelWattage, setPanelWattage] = useState('400');
  const [batteryCapacity, setBatteryCapacity] = useState('100');
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [batteryType, setBatteryType] = useState('lithium');
  const [depthOfDischarge, setDepthOfDischarge] = useState('80');
  const [systemEfficiency, setSystemEfficiency] = useState('85');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [result, setResult] = useState<OffGridResult | null>(null);

  const presetOptions = OFFGRID_PRESETS.map(preset => ({ value: preset.name, label: preset.name }));

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

  const calculateSystem = () => {
    const consumption = parseFloat(dailyConsumption);
    const sunHours = parseFloat(peakSunHours);
    const autonomy = parseFloat(autonomyDays);
    const voltage = parseFloat(systemVoltage);
    const panelWatt = parseFloat(panelWattage);
    const battCap = parseFloat(batteryCapacity);
    const battVolt = parseFloat(batteryVoltage);
    const dod = parseFloat(depthOfDischarge);
    const efficiency = parseFloat(systemEfficiency);

    if (consumption && sunHours && autonomy && voltage && panelWatt && battCap && battVolt && dod && efficiency) {
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
        batteryType: batteryType as 'lithium' | 'agm'
      });
      setResult(calculatedResult);
    }
  };

  const reset = () => {
    setSelectedPreset('');
    setDailyConsumption('');
    setPeakSunHours('3.5');
    setAutonomyDays('3');
    setSystemVoltage('');
    setPanelWattage('400');
    setBatteryCapacity('100');
    setBatteryVoltage('12');
    setBatteryType('lithium');
    setDepthOfDischarge('80');
    setSystemEfficiency('85');
    setResult(null);
  };

  const hasValidInputs = () => dailyConsumption && systemVoltage;
  const selectedPresetData = selectedPreset ? getPresetByName(selectedPreset) : null;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-emerald-400';
      case 'adequate': return 'text-amber-400';
      default: return 'text-red-400';
    }
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
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
            <p className="text-sm text-green-200 font-medium">{selectedPresetData.description}</p>
            <p className="text-xs text-green-200/70 mt-1">{selectedPresetData.scenario}</p>
          </div>
        )}

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
            label="Peak Sun Hours"
            unit="hrs/day"
            type="text"
            inputMode="decimal"
            value={peakSunHours}
            onChange={setPeakSunHours}
            placeholder="3.5"
            hint="UK: 2.5-4.5 hrs"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
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
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Panel Wattage"
            unit="W"
            type="text"
            inputMode="numeric"
            value={panelWattage}
            onChange={setPanelWattage}
            placeholder="400"
          />
          <CalculatorSelect
            label="Battery Type"
            value={batteryType}
            onChange={setBatteryType}
            options={[
              { value: 'lithium', label: 'LiFePO4 (Recommended)' },
              { value: 'agm', label: 'AGM Deep Cycle' },
            ]}
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
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

        <CalculatorActions
          category="renewable"
          onCalculate={calculateSystem}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Design System"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="renewable">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">System Design</span>
              <Badge variant="outline" className={getRatingColor(result.systemRating)}>
                {result.systemRating.charAt(0).toUpperCase() + result.systemRating.slice(1)} System
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <Sun className="h-5 w-5 mx-auto mb-1 text-amber-400" />
                <p className="text-xs text-white/60">Solar Array</p>
                <p className="text-xl font-bold text-green-400">{(result.numberOfPanels * parseFloat(panelWattage) / 1000).toFixed(1)}kW</p>
                <p className="text-xs text-white/60">{result.numberOfPanels} × {panelWattage}W</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <Battery className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                <p className="text-xs text-white/60">Battery Bank</p>
                <p className="text-xl font-bold text-green-400">{(result.numberOfBatteries * parseFloat(batteryCapacity) * parseFloat(depthOfDischarge) / 100).toFixed(0)}Ah</p>
                <p className="text-xs text-white/60">{result.numberOfBatteries} × {batteryCapacity}Ah</p>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Daily Balance" value={result.dailyEnergyBalance >= 0 ? `+${result.dailyEnergyBalance.toFixed(1)}` : result.dailyEnergyBalance.toFixed(1)} unit="kWh" category="renewable" size="sm" />
              <ResultValue label="System Cost" value={`£${result.systemCost.toFixed(0)}`} category="renewable" size="sm" />
              <ResultValue label="Inverter" value={result.inverterSize.toFixed(1)} unit="kW" category="renewable" size="sm" />
              <ResultValue label="Charge Controller" value={result.chargeControllerSize.toFixed(0)} unit="A MPPT" category="renewable" size="sm" />
            </ResultsGrid>

            {result.dailyEnergyBalance < 0 && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-200">
                    Daily deficit of {Math.abs(result.dailyEnergyBalance).toFixed(1)}kWh - increase panels or reduce consumption.
                  </p>
                </div>
              </div>
            )}
          </CalculatorResult>

          {result.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-orange-300">Warnings</span>
              </div>
              <ul className="space-y-1 ml-6">
                {result.warnings.map((warning, i) => (
                  <li key={i} className="text-sm text-orange-200">{warning}</li>
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
                  <li key={i} className="text-sm text-green-200">{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <Collapsible open={showCost} onOpenChange={setShowCost}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">Cost Breakdown</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showCost && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  {Object.entries(result.costBreakdown).filter(([key]) => key !== 'total').map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white">£{(value as number).toFixed(0)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-white/10 font-semibold">
                    <span className="text-white">Total (inc. VAT)</span>
                    <span className="text-green-400">£{result.costBreakdown.total.toFixed(0)}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">Installation Guidance</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">Planning permission generally not needed for roof-mounted panels</p>
                <p className="text-sm text-blue-200/80">Ground-mounted systems over 9m² may need planning consent</p>
                <p className="text-sm text-blue-200/80">Battery storage must comply with fire safety regulations</p>
                <p className="text-sm text-blue-200/80">Maintain 1.5m clearance from boundaries for fire access</p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Standards & Regulations</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">BS 7671:</strong> Wiring regulations apply to all DC and AC circuits</p>
                  <p><strong className="text-amber-300">Building Regs Part P:</strong> Notification required for electrical work</p>
                  <p><strong className="text-amber-300">BS EN 62446:</strong> Testing and commissioning standards for PV</p>
                  <p><strong className="text-amber-300">MCS:</strong> Recommended for quality assurance</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-200">
            <strong>Off-grid sizing:</strong> Allow 20-30% margin for UK weather variability. LiFePO4 batteries offer 80% DoD vs 50% for AGM.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OffGridSystemCalculator;
