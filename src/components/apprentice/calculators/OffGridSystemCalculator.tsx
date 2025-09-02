import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Battery, Sun, Zap, AlertTriangle, CheckCircle2, Info, Settings, Lightbulb } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { OFFGRID_PRESETS, getPresetByName } from "@/lib/offgrid-presets";
import { calculateOffGridSystem, OffGridResult } from "@/lib/offgrid-calculations";
import InfoBox from "@/components/common/InfoBox";
import WhyThisMatters from "@/components/common/WhyThisMatters";

export function OffGridSystemCalculator() {
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
  const [result, setResult] = useState<OffGridResult | null>(null);
  
  // Debounced values for live calculation
  const debouncedDailyConsumption = useDebounce(dailyConsumption, 800);
  const debouncedPeakSunHours = useDebounce(peakSunHours, 800);
  const debouncedAutonomyDays = useDebounce(autonomyDays, 800);

  const presetOptions = OFFGRID_PRESETS.map(preset => ({ value: preset.name, label: preset.name }));

  const voltageOptions = [
    { value: '12', label: '12V DC (Small systems)' },
    { value: '24', label: '24V DC (Medium systems)' },
    { value: '48', label: '48V DC (Large systems)' }
  ];

  const batteryOptions = [
    { value: 'lithium', label: 'Lithium LiFePO4 (Recommended)' },
    { value: 'agm', label: 'AGM Deep Cycle (Budget)' }
  ];

  // Handle preset selection
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

  // Live calculation when key inputs change
  useEffect(() => {
    const consumption = parseFloat(debouncedDailyConsumption);
    const sunHours = parseFloat(debouncedPeakSunHours);
    const autonomy = parseFloat(debouncedAutonomyDays);
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
    } else {
      setResult(null);
    }
  }, [debouncedDailyConsumption, debouncedPeakSunHours, debouncedAutonomyDays, systemVoltage, panelWattage, batteryCapacity, batteryVoltage, batteryType, depthOfDischarge, systemEfficiency]);

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

  const getSystemRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-elec-green';
      case 'good': return 'text-elec-yellow';
      case 'adequate': return 'text-elec-light';
      case 'marginal': return 'text-elec-orange';
      case 'inadequate': return 'text-destructive';
      default: return 'text-elec-light';
    }
  };

  const selectedPresetData = selectedPreset ? getPresetByName(selectedPreset) : null;

  return (
    <div className="w-full space-y-6">
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-elec-light flex items-center gap-3">
            <Sun className="h-6 w-6 text-elec-yellow" />
            Off-Grid System Designer
          </CardTitle>
          <CardDescription className="text-elec-light/80">
            Design a complete off-grid solar system with live calculations and UK-focused guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Start Presets */}
          <div className="space-y-3">
            <MobileSelectWrapper
              label="Quick Start Presets"
              placeholder="Choose a preset or custom configuration"
              value={selectedPreset}
              onValueChange={handlePresetChange}
              options={presetOptions}
              hint="Select a common scenario to auto-fill typical values"
            />
            
            {selectedPresetData && (
              <div className="p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
                <p className="text-sm text-elec-light/90 mb-1 font-medium">{selectedPresetData.description}</p>
                <p className="text-xs text-elec-light/70">{selectedPresetData.scenario}</p>
              </div>
            )}
          </div>

          {/* Core System Requirements */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              Core Requirements
            </h3>
            
            <div className="space-y-4">
              <MobileInputWrapper
                type="number"
                label="Daily Energy Consumption"
                placeholder="Enter daily consumption"
                value={dailyConsumption}
                onChange={setDailyConsumption}
                unit="kWh"
                step="0.1"
                hint="Include all appliances, lighting, and devices you'll use daily"
                icon={<Zap className="h-4 w-4" />}
              />
              
              <MobileInputWrapper
                type="number"
                label="Peak Sun Hours"
                placeholder="UK average: 3-4 hrs"
                value={peakSunHours}
                onChange={setPeakSunHours}
                unit="hrs/day"
                step="0.1"
                hint="UK varies from 2.5hrs (winter) to 4.5hrs (summer) - use conservative estimate"
                icon={<Sun className="h-4 w-4" />}
              />
              
              <MobileInputWrapper
                type="number"
                label="Backup Days (Autonomy)"
                placeholder="Recommended: 3-5 days"
                value={autonomyDays}
                onChange={setAutonomyDays}
                unit="days"
                step="1"
                hint="How many days the system should run without solar input"
                icon={<Battery className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light flex items-center gap-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              System Configuration
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="System Voltage"
                placeholder="Select system voltage"
                value={systemVoltage}
                onValueChange={setSystemVoltage}
                options={voltageOptions}
                hint="Higher voltage = better efficiency for larger systems"
              />
              
              <MobileSelectWrapper
                label="Battery Type"
                placeholder="Select battery type"
                value={batteryType}
                onValueChange={setBatteryType}
                options={batteryOptions}
                hint="LiFePO4 costs more but lasts longer and deeper discharge"
              />
              
              <MobileInputWrapper
                type="number"
                label="Solar Panel Wattage"
                placeholder="Typical: 300-450W"
                value={panelWattage}
                onChange={setPanelWattage}
                unit="W"
                step="10"
                hint="Individual panel rating - larger panels are more efficient"
              />
              
              <MobileInputWrapper
                type="number"
                label="Battery Capacity"
                placeholder="Typical: 100-200Ah"
                value={batteryCapacity}
                onChange={setBatteryCapacity}
                unit="Ah"
                step="10"
                hint="Individual battery capacity - will calculate how many needed"
              />
              
              <MobileInputWrapper
                type="number"
                label="Battery Voltage"
                placeholder="Common: 12V"
                value={batteryVoltage}
                onChange={setBatteryVoltage}
                unit="V"
                step="1"
                hint="Individual battery voltage - typically 12V"
              />
              
              <MobileInputWrapper
                type="number"
                label="Depth of Discharge"
                placeholder="LiFePO4: 80%, AGM: 50%"
                value={depthOfDischarge}
                onChange={setDepthOfDischarge}
                unit="%"
                step="5"
                hint="How much battery capacity you can safely use"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-3">
            <MobileInputWrapper
              type="number"
              label="System Efficiency"
              placeholder="Typical: 80-90%"
              value={systemEfficiency}
              onChange={setSystemEfficiency}
              unit="%"
              step="1"
              hint="Accounts for inverter losses, wiring losses, and battery efficiency"
            />
          </div>

          <MobileButton 
            onClick={reset} 
            variant="outline" 
            size="wide"
            className="sm:w-auto"
          >
            Reset All Values
          </MobileButton>
        </CardContent>
      </Card>

      {/* Live Results */}
      {result && (
        <div className="space-y-4">
          {/* System Rating & Overview */}
          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light flex items-center justify-between">
                <span>System Design Results</span>
                <span className={`text-sm font-medium capitalize ${getSystemRatingColor(result.systemRating)}`}>
                  {result.systemRating} System
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics - Mobile Stacked Layout */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Solar Array</p>
                      <p className="text-xs text-elec-light/70">{result.numberOfPanels} × {panelWattage}W panels</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">{(result.numberOfPanels * parseFloat(panelWattage) / 1000).toFixed(1)}kW</p>
                    <p className="text-xs text-elec-light/70">Total capacity</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Battery className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Battery Bank</p>
                      <p className="text-xs text-elec-light/70">{result.numberOfBatteries} × {batteryCapacity}Ah batteries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">{(result.numberOfBatteries * parseFloat(batteryCapacity) * parseFloat(depthOfDischarge) / 100).toFixed(0)}Ah</p>
                    <p className="text-xs text-elec-light/70">Usable capacity</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">Daily Balance</p>
                      <p className="text-xs text-elec-light/70">Generation vs consumption</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${result.dailyEnergyBalance >= 0 ? 'text-elec-green' : 'text-destructive'}`}>
                      {result.dailyEnergyBalance >= 0 ? '+' : ''}{result.dailyEnergyBalance.toFixed(1)}kWh
                    </p>
                    <p className="text-xs text-elec-light/70">Daily surplus/deficit</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm font-medium text-elec-light">System Cost</p>
                      <p className="text-xs text-elec-light/70">Including VAT & installation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-elec-yellow">£{result.systemCost.toFixed(0)}</p>
                    <p className="text-xs text-elec-light/70">Total investment</p>
                  </div>
                </div>
              </div>

              {/* Additional Components */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-elec-dark/20 rounded">
                  <p className="font-medium text-elec-light">Inverter</p>
                  <p className="text-elec-yellow">{result.inverterSize.toFixed(1)}kW</p>
                </div>
                <div className="text-center p-2 bg-elec-dark/20 rounded">
                  <p className="font-medium text-elec-light">Charge Controller</p>
                  <p className="text-elec-yellow">{result.chargeControllerSize.toFixed(0)}A MPPT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="bg-elec-card border-elec-yellow/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-elec-light text-base">Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Solar panels</span>
                  <span className="text-elec-light">£{result.costBreakdown.panels.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Batteries ({batteryType})</span>
                  <span className="text-elec-light">£{result.costBreakdown.batteries.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Inverter</span>
                  <span className="text-elec-light">£{result.costBreakdown.inverter.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Charge controller</span>
                  <span className="text-elec-light">£{result.costBreakdown.chargeController.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Wiring & electrical</span>
                  <span className="text-elec-light">£{result.costBreakdown.wiring.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Mounting & hardware</span>
                  <span className="text-elec-light">£{result.costBreakdown.mounting.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elec-light/80">Professional installation</span>
                  <span className="text-elec-light">£{result.costBreakdown.installation.toFixed(0)}</span>
                </div>
                <div className="flex justify-between border-t border-elec-gray/30 pt-2 font-semibold">
                  <span className="text-elec-light">Total (inc. VAT)</span>
                  <span className="text-elec-yellow">£{result.costBreakdown.total.toFixed(0)}</span>
                </div>
              </div>
              <p className="text-xs text-elec-light/60 mt-3">
                *Prices include 5% VAT (reduced rate for solar). Costs may vary by supplier and location.
              </p>
            </CardContent>
          </Card>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <InfoBox
              title="System Warnings"
              icon={<AlertTriangle className="h-5 w-5 text-elec-orange" />}
              points={result.warnings}
              className="border-elec-orange/30"
            />
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <InfoBox
              title="System Recommendations"
              icon={<CheckCircle2 className="h-5 w-5 text-elec-green" />}
              points={result.recommendations}
              className="border-elec-green/30"
            />
          )}
        </div>
      )}

      {/* Why This Matters */}
      <WhyThisMatters
        points={[
          "Off-grid systems provide energy independence from the national grid",
          "Proper sizing prevents expensive over-specification or inadequate performance",
          "Battery autonomy ensures power during extended cloudy periods",
          "Professional installation ensures safety and Building Regulations compliance",
          "UK planning permission may be required for ground-mounted arrays over 9m²"
        ]}
      />

      {/* Practical Guidance */}
      <InfoBox
        title="UK Installation Guidance"
        icon={<Info className="h-5 w-5 text-elec-blue" />}
        points={[
          "Building Regulations Part P applies to all electrical work - use qualified electrician",
          "Planning permission generally not needed for roof-mounted panels on existing buildings",
          "Ground-mounted systems may need planning consent if over 9m² or in protected areas",
          "Consider G-Code requirements if grid-tie backup is planned for future",
          "Maintain 1.5m clearance from boundaries for fire safety access",
          "Battery storage must comply with fire safety regulations (especially lithium)"
        ]}
      />

      {/* Regulatory Notes */}
      <InfoBox
        title="Standards & Regulations"
        icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
        points={[
          "BS 7671 (18th Edition) wiring regulations apply to all DC and AC circuits",
          "MCS installation standards recommended for quality assurance",
          "BS EN 62446 testing and commissioning standards for PV systems",
          "Building Regulations Part P notification required for electrical work",
          "Consider future grid connection - install G99 compliant equipment",
          "Regular PAT testing recommended for portable equipment connected to system"
        ]}
        as="section"
      />
    </div>
  );
}

export default OffGridSystemCalculator;