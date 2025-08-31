import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Preset data
const INVERTER_PRESETS = {
  singlePhase: [
    { value: '3.68', label: '3.68kW Single Phase', specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 1, maxCurrent: 16 } },
    { value: '4', label: '4kW Single Phase', specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 1, maxCurrent: 16 } },
    { value: '5', label: '5kW Single Phase', specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 2, maxCurrent: 11 } },
    { value: '6', label: '6kW Single Phase', specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 11 } },
    { value: '8', label: '8kW Single Phase', specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 13 } },
    { value: '10', label: '10kW Single Phase', specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 15 } },
  ],
  threePhase: [
    { value: '10', label: '10kW Three Phase', specs: { maxDcV: 1000, mpptMin: 200, mpptMax: 800, mppts: 2, maxCurrent: 15 } },
    { value: '12', label: '12kW Three Phase', specs: { maxDcV: 1000, mpptMin: 200, mpptMax: 800, mppts: 3, maxCurrent: 13 } },
    { value: '15', label: '15kW Three Phase', specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 3, maxCurrent: 15 } },
    { value: '20', label: '20kW Three Phase', specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 4, maxCurrent: 20 } },
  ]
};

const ARRAY_SIZE_OPTIONS = [
  { value: '2', label: '2.0kW DC' },
  { value: '3.68', label: '3.68kW DC' },
  { value: '4', label: '4.0kW DC' },
  { value: '5', label: '5.0kW DC' },
  { value: '6', label: '6.0kW DC' },
  { value: '8', label: '8.0kW DC' },
  { value: '10', label: '10.0kW DC' },
  { value: '12', label: '12.0kW DC' },
  { value: '15', label: '15.0kW DC' },
  { value: 'custom', label: 'Custom Size' },
];

const PSH_OPTIONS = [
  { value: '3.8', label: 'UK South (3.8 PSH)' },
  { value: '3.5', label: 'UK Central (3.5 PSH)' },
  { value: '3.2', label: 'UK North (3.2 PSH)' },
  { value: '3.0', label: 'Scotland (3.0 PSH)' },
  { value: 'custom', label: 'Custom PSH' },
];

const SELF_CONSUMPTION_OPTIONS = [
  { value: '30', label: 'Home daytime (~30%)' },
  { value: '65', label: 'Home + battery (~65%)' },
  { value: '70', label: 'SME (~70%)' },
  { value: '85', label: 'High self-use (~85%)' },
  { value: 'custom', label: 'Custom %' },
];

const EXPORT_LIMIT_OPTIONS = [
  { value: 'none', label: 'No Export Limit' },
  { value: '3.68', label: '3.68kW (G98 Single Phase)' },
  { value: '11.04', label: '11.04kW (G98 Three Phase)' },
  { value: 'custom', label: 'Custom Limit' },
];

const LOSS_PROFILE_OPTIONS = [
  { value: '12', label: 'Excellent (12% losses)' },
  { value: '18', label: 'Typical (18% losses)' },
  { value: '30', label: 'Shaded (30% losses)' },
  { value: 'custom', label: 'Custom losses' },
];

const RETAIL_PRICE_OPTIONS = [
  { value: '0.22', label: '22p/kWh' },
  { value: '0.25', label: '25p/kWh' },
  { value: '0.30', label: '30p/kWh' },
  { value: '0.35', label: '35p/kWh' },
  { value: 'custom', label: 'Custom price' },
];

const SEG_RATE_OPTIONS = [
  { value: '0.05', label: '5p/kWh (SEG)' },
  { value: '0.07', label: '7p/kWh (SEG)' },
  { value: '0.10', label: '10p/kWh (SEG)' },
  { value: '0.15', label: '15p/kWh (SEG)' },
  { value: 'custom', label: 'Custom rate' },
];

interface GridTieResult {
  // System sizing
  dcArrayPower: number;
  inverterAcPower: number;
  dcAcRatio: number;
  
  // Generation
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  clippingLoss: number;
  exportCurtailed: number;
  
  // Financials
  selfConsumedKwh: number;
  exportedKwh: number;
  exportIncome: number;
  billSavings: number;
  totalAnnualValue: number;
  paybackYears: number;
  
  // AC currents and protection
  acCurrent: number;
  phaseCurrent: number;
  recommendedMcb: number;
  
  // Compliance checks
  isG98: boolean;
  requiresG99: boolean;
  exportLimited: boolean;
  dcVoltageOk: boolean;
  mpptWindowOk: boolean;
  dcCurrentOk: boolean;
}

export function GridTieInverterCalculator() {
  // Basic inputs
  const [arraySize, setArraySize] = useState('');
  const [customArraySize, setCustomArraySize] = useState('');
  const [inverterPower, setInverterPower] = useState('');
  const [systemPhase, setSystemPhase] = useState('');
  const [exportLimit, setExportLimit] = useState('none');
  const [customExportLimit, setCustomExportLimit] = useState('');
  const [exportLimiterInstalled, setExportLimiterInstalled] = useState(false);
  
  // Site and usage
  const [psh, setPsh] = useState('3.5');
  const [customPsh, setCustomPsh] = useState('');
  const [selfConsumption, setSelfConsumption] = useState('30');
  const [customSelfConsumption, setCustomSelfConsumption] = useState('');
  const [retailPrice, setRetailPrice] = useState('0.25');
  const [customRetailPrice, setCustomRetailPrice] = useState('');
  const [segRate, setSegRate] = useState('0.05');
  const [customSegRate, setCustomSegRate] = useState('');
  
  // Losses and CAPEX
  const [lossProfile, setLossProfile] = useState('18');
  const [customLosses, setCustomLosses] = useState('');
  const [systemCost, setSystemCost] = useState('');
  
  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [moduleVoc, setModuleVoc] = useState('48');
  const [moduleVmpp, setModuleVmpp] = useState('40');
  const [moduleImpp, setModuleImpp] = useState('10');
  const [tempCoeff, setTempCoeff] = useState('-0.3');
  const [minAmbientTemp, setMinAmbientTemp] = useState('-10');
  const [maxCellTemp, setMaxCellTemp] = useState('70');
  const [powerFactor, setPowerFactor] = useState('0.99');
  
  const [result, setResult] = useState<GridTieResult | null>(null);

  const voltageOptions = [
    { value: '230', label: '230V Single Phase' },
    { value: '400', label: '400V Three Phase' }
  ];

  const systemCostOptions = [
    { value: '4000', label: '£4,000' },
    { value: '6000', label: '£6,000' },
    { value: '8000', label: '£8,000' },
    { value: '12000', label: '£12,000' },
    { value: 'custom', label: 'Custom cost' },
  ];

  const getInverterOptions = () => {
    if (systemPhase === '230') return INVERTER_PRESETS.singlePhase;
    if (systemPhase === '400') return INVERTER_PRESETS.threePhase;
    return [];
  };

  const calculateGridTie = () => {
    try {
      // Get actual values, considering custom options
      const dcArrayPower = parseFloat(arraySize === 'custom' ? customArraySize : arraySize);
      const inverterAcPower = parseFloat(inverterPower);
      const actualPsh = parseFloat(psh === 'custom' ? customPsh : psh);
      const actualSelfCons = parseFloat(selfConsumption === 'custom' ? customSelfConsumption : selfConsumption) / 100;
      const actualRetailPrice = parseFloat(retailPrice === 'custom' ? customRetailPrice : retailPrice);
      const actualSegRate = parseFloat(segRate === 'custom' ? customSegRate : segRate);
      const actualLosses = parseFloat(lossProfile === 'custom' ? customLosses : lossProfile) / 100;
      const actualSystemCost = parseFloat(systemCost === 'custom' ? '0' : systemCost);
      const voltage = parseFloat(systemPhase);
      const pf = parseFloat(powerFactor);

      if (!dcArrayPower || !inverterAcPower || !actualPsh || !actualRetailPrice || !actualSegRate || !voltage) {
        toast({
          title: "Missing inputs",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      // Core calculations
      const dcAcRatio = dcArrayPower / inverterAcPower;
      const inverterEfficiency = 0.96; // Default 96%
      
      // Generation calculations with losses
      const grossDailyGeneration = dcArrayPower * actualPsh;
      const netDailyGeneration = grossDailyGeneration * (1 - actualLosses) * inverterEfficiency;
      const yearlyGeneration = netDailyGeneration * 365;
      const monthlyGeneration = netDailyGeneration * 30;
      
      // Clipping estimation (simplified)
      const clippingFactor = Math.max(0, (dcAcRatio - 1.2) * 0.05); // Rough estimation
      const clippingLoss = yearlyGeneration * clippingFactor;
      const actualYearlyGeneration = yearlyGeneration - clippingLoss;
      
      // Export limiting
      const actualExportLimit = exportLimit === 'custom' ? parseFloat(customExportLimit) : 
                               exportLimit === 'none' ? Infinity : parseFloat(exportLimit);
      const maxPossibleExport = inverterAcPower;
      const effectiveExportLimit = exportLimiterInstalled ? Math.min(actualExportLimit, maxPossibleExport) : maxPossibleExport;
      
      // Energy split
      const selfConsumedKwh = actualYearlyGeneration * actualSelfCons;
      const potentialExportKwh = actualYearlyGeneration * (1 - actualSelfCons);
      const exportedKwh = Math.min(potentialExportKwh, effectiveExportLimit * 8760 * 0.3); // Rough export hours
      const exportCurtailed = potentialExportKwh - exportedKwh;
      
      // Financials
      const exportIncome = exportedKwh * actualSegRate;
      const billSavings = selfConsumedKwh * actualRetailPrice;
      const totalAnnualValue = exportIncome + billSavings;
      const paybackYears = actualSystemCost > 0 ? actualSystemCost / totalAnnualValue : 0;
      
      // AC currents and protection
      const acCurrent = systemPhase === '230' ? 
        inverterAcPower * 1000 / (voltage * pf) : 
        inverterAcPower * 1000 / (Math.sqrt(3) * voltage * pf);
      const phaseCurrent = systemPhase === '400' ? acCurrent : 0;
      const recommendedMcb = Math.ceil(acCurrent / 5) * 5; // Round up to nearest 5A
      
      // Compliance checks
      const maxCurrentPerPhase = systemPhase === '230' ? acCurrent : acCurrent;
      const isG98 = maxCurrentPerPhase <= 16; // 16A per phase at 230V ≈ 3.68kW
      const requiresG99 = !isG98;
      const exportLimited = exportLimit !== 'none' && exportLimiterInstalled;
      
      // DC checks (simplified - would need module data for full checks)
      const dcVoltageOk = true; // Would check Voc_cold vs inverter max
      const mpptWindowOk = true; // Would check Vmpp range
      const dcCurrentOk = true; // Would check string current vs MPPT max

      setResult({
        dcArrayPower,
        inverterAcPower,
        dcAcRatio,
        dailyGeneration: netDailyGeneration,
        monthlyGeneration,
        yearlyGeneration: actualYearlyGeneration,
        clippingLoss,
        exportCurtailed,
        selfConsumedKwh,
        exportedKwh,
        exportIncome,
        billSavings,
        totalAnnualValue,
        paybackYears,
        acCurrent,
        phaseCurrent,
        recommendedMcb,
        isG98,
        requiresG99,
        exportLimited,
        dcVoltageOk,
        mpptWindowOk,
        dcCurrentOk
      });

      toast({
        title: "Calculation complete",
        description: "Grid-tie system analysis completed",
        variant: "success"
      });

    } catch (error) {
      toast({
        title: "Calculation error",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setArraySize('');
    setCustomArraySize('');
    setInverterPower('');
    setSystemPhase('');
    setExportLimit('none');
    setCustomExportLimit('');
    setExportLimiterInstalled(false);
    setPsh('3.5');
    setCustomPsh('');
    setSelfConsumption('30');
    setCustomSelfConsumption('');
    setRetailPrice('0.25');
    setCustomRetailPrice('');
    setSegRate('0.05');
    setCustomSegRate('');
    setLossProfile('18');
    setCustomLosses('');
    setSystemCost('');
    setShowAdvanced(false);
    setResult(null);
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow">Grid-Tie Inverter Calculator</CardTitle>
          <CardDescription>
            Professional grid-tie system design with comprehensive analysis, compliance checks, and financial modelling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="DC Array Size"
                placeholder="Select array size"
                value={arraySize}
                onValueChange={setArraySize}
                options={ARRAY_SIZE_OPTIONS}
              />
              
              {arraySize === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Array Size"
                  placeholder="Enter DC power"
                  value={customArraySize}
                  onChange={setCustomArraySize}
                  unit="kW"
                  step="0.1"
                />
              )}
              
              <MobileSelectWrapper
                label="Grid Connection"
                placeholder="Select grid connection"
                value={systemPhase}
                onValueChange={setSystemPhase}
                options={voltageOptions}
              />
              
              {systemPhase && (
                <MobileSelectWrapper
                  label="Inverter Selection"
                  placeholder="Select inverter"
                  value={inverterPower}
                  onValueChange={setInverterPower}
                  options={getInverterOptions()}
                />
              )}
              
              <MobileSelectWrapper
                label="Export Limitation"
                placeholder="Select export limit"
                value={exportLimit}
                onValueChange={setExportLimit}
                options={EXPORT_LIMIT_OPTIONS}
              />
              
              {exportLimit === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Export Limit"
                  placeholder="Enter limit"
                  value={customExportLimit}
                  onChange={setCustomExportLimit}
                  unit="kW"
                  step="0.1"
                />
              )}
            </div>
            
            {exportLimit !== 'none' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="exportLimiter"
                  checked={exportLimiterInstalled}
                  onChange={(e) => setExportLimiterInstalled(e.target.checked)}
                  className="w-4 h-4 text-elec-yellow bg-gray-100 border-gray-300 rounded focus:ring-elec-yellow"
                />
                <label htmlFor="exportLimiter" className="text-sm text-elec-light">
                  Export limiter (G100) installed
                </label>
              </div>
            )}
          </div>

          {/* Site Resources & Usage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-light">Site Resources & Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Location (Peak Sun Hours)"
                placeholder="Select region"
                value={psh}
                onValueChange={setPsh}
                options={PSH_OPTIONS}
              />
              
              {psh === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom PSH"
                  placeholder="Enter PSH"
                  value={customPsh}
                  onChange={setCustomPsh}
                  unit="hrs/day"
                  step="0.1"
                />
              )}
              
              <MobileSelectWrapper
                label="Self-Consumption Pattern"
                placeholder="Select usage pattern"
                value={selfConsumption}
                onValueChange={setSelfConsumption}
                options={SELF_CONSUMPTION_OPTIONS}
              />
              
              {selfConsumption === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Self-Consumption"
                  placeholder="Enter percentage"
                  value={customSelfConsumption}
                  onChange={setCustomSelfConsumption}
                  unit="%"
                  step="1"
                />
              )}
              
              <MobileSelectWrapper
                label="Retail Electricity Price"
                placeholder="Select price"
                value={retailPrice}
                onValueChange={setRetailPrice}
                options={RETAIL_PRICE_OPTIONS}
              />
              
              {retailPrice === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Retail Price"
                  placeholder="Enter price"
                  value={customRetailPrice}
                  onChange={setCustomRetailPrice}
                  unit="£/kWh"
                  step="0.01"
                />
              )}
              
              <MobileSelectWrapper
                label="SEG Export Rate"
                placeholder="Select SEG rate"
                value={segRate}
                onValueChange={setSegRate}
                options={SEG_RATE_OPTIONS}
              />
              
              {segRate === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom SEG Rate"
                  placeholder="Enter rate"
                  value={customSegRate}
                  onChange={setCustomSegRate}
                  unit="£/kWh"
                  step="0.01"
                />
              )}
              
              <MobileSelectWrapper
                label="System Losses"
                placeholder="Select loss profile"
                value={lossProfile}
                onValueChange={setLossProfile}
                options={LOSS_PROFILE_OPTIONS}
              />
              
              {lossProfile === 'custom' && (
                <MobileInputWrapper
                  type="number"
                  label="Custom Losses"
                  placeholder="Enter total losses"
                  value={customLosses}
                  onChange={setCustomLosses}
                  unit="%"
                  step="1"
                />
              )}
              
              <MobileSelectWrapper
                label="System Cost (optional)"
                placeholder="Select system cost"
                value={systemCost}
                onValueChange={setSystemCost}
                options={systemCostOptions}
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="flex items-center gap-2 text-elec-light hover:text-elec-yellow transition-colors">
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              Advanced Settings
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MobileInputWrapper
                  type="number"
                  label="Module Voc"
                  placeholder="Open circuit voltage"
                  value={moduleVoc}
                  onChange={setModuleVoc}
                  unit="V"
                  step="0.1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Module Vmpp"
                  placeholder="MPP voltage"
                  value={moduleVmpp}
                  onChange={setModuleVmpp}
                  unit="V"
                  step="0.1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Module Impp"
                  placeholder="MPP current"
                  value={moduleImpp}
                  onChange={setModuleImpp}
                  unit="A"
                  step="0.1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Temp Coefficient"
                  placeholder="Voc temp coeff"
                  value={tempCoeff}
                  onChange={setTempCoeff}
                  unit="%/°C"
                  step="0.01"
                />
                <MobileInputWrapper
                  type="number"
                  label="Min Ambient Temp"
                  placeholder="Minimum temperature"
                  value={minAmbientTemp}
                  onChange={setMinAmbientTemp}
                  unit="°C"
                  step="1"
                />
                <MobileInputWrapper
                  type="number"
                  label="Max Cell Temp"
                  placeholder="Maximum cell temp"
                  value={maxCellTemp}
                  onChange={setMaxCellTemp}
                  unit="°C"
                  step="1"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <MobileButton 
              onClick={calculateGridTie} 
              variant="elec"
              size="wide"
              className="sm:flex-1"
            >
              Calculate Grid-Tie System
            </MobileButton>
            <MobileButton 
              onClick={reset} 
              variant="outline" 
              size="default"
              className="sm:w-auto"
            >
              Reset
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{result.dcAcRatio.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">DC:AC Ratio</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.dcAcRatio >= 1.1 && result.dcAcRatio <= 1.3 ? 'Optimal' : 
                     result.dcAcRatio > 1.3 ? 'High (expect clipping)' : 'Conservative'}
                  </div>
                </div>
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{result.yearlyGeneration.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">kWh/year</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.dailyGeneration.toFixed(1)} kWh/day avg
                  </div>
                </div>
                <div className="text-center p-4 bg-elec-dark/20 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">£{result.totalAnnualValue.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Annual Value</div>
                  <div className="text-xs text-elec-light mt-1">
                    {result.paybackYears > 0 ? `${result.paybackYears.toFixed(1)} year payback` : 'No payback calc'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Financial Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Self-consumed energy:</span>
                    <span className="font-semibold">{result.selfConsumedKwh.toFixed(0)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bill savings:</span>
                    <span className="font-semibold text-green-400">£{result.billSavings.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exported energy:</span>
                    <span className="font-semibold">{result.exportedKwh.toFixed(0)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Export income:</span>
                    <span className="font-semibold text-green-400">£{result.exportIncome.toFixed(0)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {result.clippingLoss > 0 && (
                    <div className="flex justify-between">
                      <span>Clipping loss:</span>
                      <span className="font-semibold text-amber-400">{result.clippingLoss.toFixed(0)} kWh</span>
                    </div>
                  )}
                  {result.exportCurtailed > 0 && (
                    <div className="flex justify-between">
                      <span>Export curtailed:</span>
                      <span className="font-semibold text-amber-400">{result.exportCurtailed.toFixed(0)} kWh</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total annual value:</span>
                    <span className="font-bold text-elec-yellow">£{result.totalAnnualValue.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AC System & Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">AC System & Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">AC Current</div>
                  <div className="text-2xl font-bold">{result.acCurrent.toFixed(1)}A</div>
                  {systemPhase === '400' && (
                    <div className="text-sm text-muted-foreground">
                      {result.phaseCurrent.toFixed(1)}A per phase
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">Recommended MCB</div>
                  <div className="text-2xl font-bold text-elec-yellow">{result.recommendedMcb}A</div>
                  <div className="text-sm text-muted-foreground">Type B or C</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-elec-light">Compliance</div>
                  <div className="space-y-1">
                    <Badge variant={result.isG98 ? "default" : "secondary"}>
                      {result.isG98 ? 'G98' : 'G99'}
                    </Badge>
                    {result.exportLimited && (
                      <Badge variant="outline">G100 Limited</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What This Means */}
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Info className="h-5 w-5" />
                What This Means
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm text-elec-light max-w-none">
                <p>
                  <strong>DC:AC Ratio ({result.dcAcRatio.toFixed(2)}):</strong> {
                    result.dcAcRatio >= 1.1 && result.dcAcRatio <= 1.3 
                      ? 'This is an optimal ratio that balances generation and clipping losses.'
                      : result.dcAcRatio > 1.3 
                        ? 'This high ratio may cause significant clipping during peak sun conditions.'
                        : 'This conservative ratio minimises clipping but may underutilise the inverter.'
                  }
                </p>
                <p>
                  <strong>Annual Generation:</strong> Your system is estimated to generate {result.yearlyGeneration.toFixed(0)} kWh annually, 
                  providing approximately {((result.selfConsumedKwh + result.exportedKwh) / result.yearlyGeneration * 100).toFixed(0)}% 
                  of a typical UK home's electricity consumption.
                </p>
                <p>
                  <strong>Financial Returns:</strong> You'll save £{result.billSavings.toFixed(0)} on your electricity bill and earn 
                  £{result.exportIncome.toFixed(0)} from exported energy annually.
                  {result.paybackYears > 0 && (
                    ` With a system cost of £${systemCost === 'custom' ? 'entered' : systemCost}, 
                    the simple payback period is ${result.paybackYears.toFixed(1)} years.`
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Regulations & Considerations */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <div className="font-semibold">Regulatory Requirements:</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>{result.isG98 ? 'G98' : 'G99'} Application:</strong> {
                  result.isG98 
                    ? 'Systems ≤16A per phase can use simplified G98 notification process.'
                    : 'Systems >16A per phase require G99 application and DNO approval.'
                }</li>
                {result.exportLimited && (
                  <li><strong>G100 Export Limitation:</strong> Export limiter required to comply with connection agreement.</li>
                )}
                <li><strong>BS 7671 Section 712:</strong> RCD Type A minimum (Type B if specified), isolation switches, and DC/AC labelling required.</li>
                <li><strong>MCS Certification:</strong> Required for SEG payments and compliance with Building Regulations.</li>
                <li><strong>Professional Design:</strong> String calculations, earthing arrangements, and voltage drop analysis must be verified by qualified personnel.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default GridTieInverterCalculator;