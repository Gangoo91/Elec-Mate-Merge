import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  calculateMarine,
  vesselTypeOptions,
  batteryTypeOptions,
  systemVoltageOptions,
  type MarineInputs,
  type MarineResults,
} from '@/lib/marine';

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

const presetConfigs = [
  {
    value: 'sailing',
    label: 'Small Sailing Yacht',
    values: {
      vesselLength: '7.6',
      navigationLights: '15',
      cabinLights: '60',
      galleyLoad: '120',
      freshWaterPump: '50',
      bilgePump: '30',
      electronics: '80',
      alternatorRating: '60',
      solarPanels: '100',
      dailyUsageHours: '10',
    },
  },
  {
    value: 'cruiser',
    label: 'Motor Cruiser',
    values: {
      vesselLength: '10.7',
      navigationLights: '25',
      cabinLights: '120',
      galleyLoad: '200',
      freshWaterPump: '80',
      bilgePump: '50',
      electronics: '150',
      winch: '800',
      alternatorRating: '120',
      solarPanels: '200',
      dailyUsageHours: '14',
    },
  },
  {
    value: 'fishing',
    label: 'Offshore Fishing',
    values: {
      vesselType: 'fishing',
      vesselLength: '12',
      navigationLights: '40',
      electronics: '300',
      winch: '1200',
      alternatorRating: '200',
    },
  },
];

const MarineElectricalCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [results, setResults] = useState<MarineResults | null>(null);

  // Vessel details
  const [vesselType, setVesselType] = useState('yacht');
  const [vesselLength, setVesselLength] = useState('');
  const [systemVoltage, setSystemVoltage] = useState('12');

  // Load inputs
  const [navigationLights, setNavigationLights] = useState('');
  const [cabinLights, setCabinLights] = useState('');
  const [galleyLoad, setGalleyLoad] = useState('');
  const [freshWaterPump, setFreshWaterPump] = useState('');
  const [bilgePump, setBilgePump] = useState('');
  const [ventilationFans, setVentilationFans] = useState('');
  const [electronics, setElectronics] = useState('');
  const [winch, setWinch] = useState('');
  const [additionalLoad, setAdditionalLoad] = useState('');

  // Usage patterns
  const [dailyUsageHours, setDailyUsageHours] = useState('12');
  const [motoring, setMotoring] = useState('30');
  const [anchored, setAnchored] = useState('70');

  // Battery specifications
  const [batteryType, setBatteryType] = useState('agm');
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [maxDischarge, setMaxDischarge] = useState('80');

  // Charging systems
  const [alternatorRating, setAlternatorRating] = useState('');
  const [solarPanels, setSolarPanels] = useState('');
  const [windGenerator, setWindGenerator] = useState('');
  const [shoreCharger, setShoreCharger] = useState('');

  // Cable & environment
  const [cableLength, setCableLength] = useState('5');
  const [voltageDropLimit, setVoltageDropLimit] = useState('3');
  const [temperature, setTemperature] = useState('15');
  const [saltwaterExposure, setSaltwaterExposure] = useState(true);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const applyPreset = (presetValue: string) => {
    const preset = presetConfigs.find((p) => p.value === presetValue);
    if (!preset) return;
    const v = preset.values as Record<string, string>;
    if (v.vesselType) setVesselType(v.vesselType);
    if (v.vesselLength) setVesselLength(v.vesselLength);
    if (v.navigationLights) setNavigationLights(v.navigationLights);
    if (v.cabinLights) setCabinLights(v.cabinLights);
    if (v.galleyLoad) setGalleyLoad(v.galleyLoad);
    if (v.freshWaterPump) setFreshWaterPump(v.freshWaterPump);
    if (v.bilgePump) setBilgePump(v.bilgePump);
    if (v.electronics) setElectronics(v.electronics);
    if (v.winch) setWinch(v.winch);
    if (v.alternatorRating) setAlternatorRating(v.alternatorRating);
    if (v.solarPanels) setSolarPanels(v.solarPanels);
    if (v.dailyUsageHours) setDailyUsageHours(v.dailyUsageHours);
  };

  const canCalculate = () => {
    const length = parseFloat(vesselLength);
    return !!(length && length > 0);
  };

  const handleCalculate = useCallback(() => {
    const length = parseFloat(vesselLength);
    if (!length) return;

    const inputs: MarineInputs = {
      vesselType,
      vesselLength: length,
      systemVoltage: parseInt(systemVoltage) || 12,
      navigationLights: parseFloat(navigationLights) || 0,
      cabinLights: parseFloat(cabinLights) || 0,
      galleyLoad: parseFloat(galleyLoad) || 0,
      freshWaterPump: parseFloat(freshWaterPump) || 0,
      bilgePump: parseFloat(bilgePump) || 0,
      ventilationFans: parseFloat(ventilationFans) || 0,
      electronics: parseFloat(electronics) || 0,
      winch: parseFloat(winch) || 0,
      additionalLoad: parseFloat(additionalLoad) || 0,
      dailyUsageHours: parseFloat(dailyUsageHours) || 12,
      motoring: parseFloat(motoring) || 30,
      anchored: parseFloat(anchored) || 70,
      batteryType,
      batteryVoltage: parseFloat(batteryVoltage) || parseInt(systemVoltage) || 12,
      maxDischarge: parseFloat(maxDischarge) || 80,
      alternatorRating: parseFloat(alternatorRating) || 0,
      solarPanels: parseFloat(solarPanels) || 0,
      windGenerator: parseFloat(windGenerator) || 0,
      shoreCharger: parseFloat(shoreCharger) || 0,
      cableLength: parseFloat(cableLength) || 5,
      voltageDropLimit: parseFloat(voltageDropLimit) || 3,
      temperature: parseFloat(temperature) || 15,
      saltwaterExposure,
    };

    setResults(calculateMarine(inputs));
  }, [
    vesselType,
    vesselLength,
    systemVoltage,
    navigationLights,
    cabinLights,
    galleyLoad,
    freshWaterPump,
    bilgePump,
    ventilationFans,
    electronics,
    winch,
    additionalLoad,
    dailyUsageHours,
    motoring,
    anchored,
    batteryType,
    batteryVoltage,
    maxDischarge,
    alternatorRating,
    solarPanels,
    windGenerator,
    shoreCharger,
    cableLength,
    voltageDropLimit,
    temperature,
    saltwaterExposure,
  ]);

  const handleReset = useCallback(() => {
    setVesselType('yacht');
    setVesselLength('');
    setSystemVoltage('12');
    setNavigationLights('');
    setCabinLights('');
    setGalleyLoad('');
    setFreshWaterPump('');
    setBilgePump('');
    setVentilationFans('');
    setElectronics('');
    setWinch('');
    setAdditionalLoad('');
    setDailyUsageHours('12');
    setMotoring('30');
    setAnchored('70');
    setBatteryType('agm');
    setBatteryVoltage('12');
    setMaxDischarge('80');
    setAlternatorRating('');
    setSolarPanels('');
    setWindGenerator('');
    setShoreCharger('');
    setCableLength('5');
    setVoltageDropLimit('3');
    setTemperature('15');
    setSaltwaterExposure(true);
    setResults(null);
  }, []);

  const handleCopy = () => {
    if (!results) return;
    let text = 'Marine Electrical Calculator Results';
    text += `\nPeak Load: ${results.peakLoad} W`;
    text += `\nDaily Consumption: ${results.dailyEnergyConsumption.toFixed(0)} Ah`;
    text += `\nBattery Bank: ${results.recommendedBatteryCapacity} Ah (${results.numberOfBatteries} batteries)`;
    text += `\nCable Size: ${results.recommendedCableSize} mm² (${results.cableType})`;
    text += `\nVoltage Drop: ${results.actualVoltageDropPercentage.toFixed(1)}%`;
    text += `\nInverter: ${results.recommendedInverterSize} W (${results.inverterType})`;
    text += `\nEnergy Balance: ${results.energyBalance > 0 ? '+' : ''}${results.energyBalance.toFixed(0)} Ah/day`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getComplianceStatus = (): { status: 'pass' | 'warning' | 'fail'; label: string } => {
    if (!results) return { status: 'pass', label: '' };
    const hasNonCompliant = results.complianceChecks.some((c) => c.status === 'non-compliant');
    const hasWarning = results.complianceChecks.some((c) => c.status === 'warning');
    if (hasNonCompliant) return { status: 'fail', label: 'Non-Compliant' };
    if (hasWarning) return { status: 'warning', label: 'Warnings' };
    return { status: 'pass', label: 'Compliant' };
  };

  const voltageOptions = systemVoltageOptions.map((o) => ({
    value: o.value.toString(),
    label: o.label,
  }));

  return (
    <CalculatorCard
      category={CAT}
      title="Marine Electrical Calculator"
      description="Load analysis, battery sizing, charging balance for marine electrical systems"
    >
      {/* Quick Presets */}
      <CalculatorSelect
        label="Quick Preset"
        value=""
        onChange={applyPreset}
        options={presetConfigs.map((p) => ({ value: p.value, label: p.label }))}
        placeholder="Apply a vessel preset..."
      />

      {/* Vessel Details */}
      <CalculatorSection title="Vessel Details">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Vessel Type"
            value={vesselType}
            onChange={setVesselType}
            options={vesselTypeOptions}
          />
          <CalculatorInput
            label="Vessel Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={vesselLength}
            onChange={setVesselLength}
            placeholder="e.g., 12"
          />
        </CalculatorInputGrid>
        <CalculatorSelect
          label="System Voltage"
          value={systemVoltage}
          onChange={setSystemVoltage}
          options={voltageOptions}
        />
      </CalculatorSection>

      {/* Electrical Loads */}
      <CalculatorSection title="Electrical Loads">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Navigation Lights"
            unit="W"
            type="text"
            inputMode="decimal"
            value={navigationLights}
            onChange={setNavigationLights}
            placeholder="25"
          />
          <CalculatorInput
            label="Cabin Lighting"
            unit="W"
            type="text"
            inputMode="decimal"
            value={cabinLights}
            onChange={setCabinLights}
            placeholder="120"
          />
          <CalculatorInput
            label="Galley Equipment"
            unit="W"
            type="text"
            inputMode="decimal"
            value={galleyLoad}
            onChange={setGalleyLoad}
            placeholder="200"
          />
          <CalculatorInput
            label="Electronics"
            unit="W"
            type="text"
            inputMode="decimal"
            value={electronics}
            onChange={setElectronics}
            placeholder="150"
          />
          <CalculatorInput
            label="Fresh Water Pump"
            unit="W"
            type="text"
            inputMode="decimal"
            value={freshWaterPump}
            onChange={setFreshWaterPump}
            placeholder="80"
          />
          <CalculatorInput
            label="Bilge Pump"
            unit="W"
            type="text"
            inputMode="decimal"
            value={bilgePump}
            onChange={setBilgePump}
            placeholder="50"
          />
          <CalculatorInput
            label="Ventilation Fans"
            unit="W"
            type="text"
            inputMode="decimal"
            value={ventilationFans}
            onChange={setVentilationFans}
            placeholder="30"
          />
          <CalculatorInput
            label="Winch/Windlass"
            unit="W"
            type="text"
            inputMode="decimal"
            value={winch}
            onChange={setWinch}
            placeholder="800"
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Additional Load"
          unit="W"
          type="text"
          inputMode="decimal"
          value={additionalLoad}
          onChange={setAdditionalLoad}
          placeholder="0"
        />
      </CalculatorSection>

      {/* Battery System */}
      <CalculatorSection title="Battery System">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Battery Type"
            value={batteryType}
            onChange={setBatteryType}
            options={batteryTypeOptions}
          />
          <CalculatorInput
            label="Max Discharge"
            unit="%"
            type="text"
            inputMode="decimal"
            value={maxDischarge}
            onChange={setMaxDischarge}
            placeholder="80"
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Battery Voltage"
          unit="V"
          type="text"
          inputMode="decimal"
          value={batteryVoltage}
          onChange={setBatteryVoltage}
          placeholder="12"
        />
      </CalculatorSection>

      {/* Charging & Cable */}
      <CalculatorSection title="Charging and Cable">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Alternator"
            unit="W"
            type="text"
            inputMode="decimal"
            value={alternatorRating}
            onChange={setAlternatorRating}
            placeholder="120"
          />
          <CalculatorInput
            label="Solar Panels"
            unit="W"
            type="text"
            inputMode="decimal"
            value={solarPanels}
            onChange={setSolarPanels}
            placeholder="200"
          />
          <CalculatorInput
            label="Wind Generator"
            unit="W"
            type="text"
            inputMode="decimal"
            value={windGenerator}
            onChange={setWindGenerator}
            placeholder="100"
          />
          <CalculatorInput
            label="Shore Charger"
            unit="W"
            type="text"
            inputMode="decimal"
            value={shoreCharger}
            onChange={setShoreCharger}
            placeholder="80"
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Cable Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={cableLength}
            onChange={setCableLength}
            placeholder="5"
          />
          <CalculatorInput
            label="Voltage Drop Limit"
            unit="%"
            type="text"
            inputMode="decimal"
            value={voltageDropLimit}
            onChange={setVoltageDropLimit}
            placeholder="3"
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Temperature"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={temperature}
            onChange={setTemperature}
            placeholder="15"
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px] touch-manipulation">
              <input
                type="checkbox"
                checked={saltwaterExposure}
                onChange={(e) => setSaltwaterExposure(e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-green-400 focus:ring-green-400/50 h-5 w-5"
              />
              <span className="text-sm text-white">Saltwater exposure</span>
            </label>
          </div>
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate()}
        calculateLabel="Calculate"
        showReset={!!results}
      />

      {/* ── Results ── */}
      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={getComplianceStatus().status}
              label={getComplianceStatus().label}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Battery Bank Required</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {results.recommendedBatteryCapacity} Ah
            </p>
            <p className="text-sm text-white mt-2">
              {results.numberOfBatteries} × 100Ah batteries at {results.batteryBankVoltage}V
            </p>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Peak Load"
              value={results.peakLoad.toString()}
              unit="W"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Daily Consumption"
              value={results.dailyEnergyConsumption.toFixed(0)}
              unit="Ah"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Cable Size"
              value={results.recommendedCableSize.toString()}
              unit="mm²"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Voltage Drop"
              value={results.actualVoltageDropPercentage.toFixed(1)}
              unit="%"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Inverter"
              value={results.recommendedInverterSize.toString()}
              unit="W"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Energy Balance"
              value={`${results.energyBalance > 0 ? '+' : ''}${results.energyBalance.toFixed(0)}`}
              unit="Ah/day"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Compliance checks */}
          {results.complianceChecks.map((check, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border text-sm',
                check.status === 'compliant'
                  ? 'bg-green-500/5 border-green-500/20'
                  : check.status === 'warning'
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <div className="flex items-center gap-2">
                {check.status === 'compliant' ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                )}
                <span className="text-white font-medium text-xs">{check.regulation}</span>
              </div>
              <span className="text-white shrink-0 ml-2 text-xs">{check.message}</span>
            </div>
          ))}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-white">Recommendations</p>
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-white">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: config.gradientFrom }}
                  />
                  <span>
                    <span className="font-medium">{rec.category}:</span> {rec.message}
                  </span>
                </div>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Load analysis',
                formula: `Continuous: ${results.totalContinuousLoad} W | Intermittent: ${results.totalIntermittentLoad} W`,
                value: `${results.peakLoad} W peak load`,
                description:
                  'Navigation, cabin, electronics are continuous. Galley, pumps, winch are intermittent (30% duty cycle).',
              },
              {
                label: 'Daily energy consumption',
                formula: `(Continuous × ${dailyUsageHours}h + Intermittent × ${dailyUsageHours}h × 0.3) ÷ ${systemVoltage}V`,
                value: `${results.dailyEnergyConsumption.toFixed(0)} Ah/day`,
              },
              {
                label: 'Battery sizing with Peukert effect',
                formula: `Daily Ah × autonomy days × temp factor ÷ max discharge`,
                value: `${results.recommendedBatteryCapacity} Ah (${results.numberOfBatteries} × 100Ah)`,
                description: `Temperature derating applied for ${temperature}°C. Capacity rounded to nearest 50Ah for practical battery selection.`,
              },
              {
                label: 'Charging balance',
                formula: `Total charging: ${results.totalChargingCapacity} W × 8h average`,
                value: `${results.energyBalance > 0 ? '+' : ''}${results.energyBalance.toFixed(0)} Ah/day ${results.energyBalance > 0 ? '(surplus)' : '(deficit)'}`,
                description:
                  results.energyBalance < 0
                    ? 'Charging deficit — increase charging capacity or reduce loads for extended trips.'
                    : 'Positive energy balance — adequate charging for sustained operation.',
              },
              {
                label: 'Cable sizing',
                formula: `Peak current at ${systemVoltage}V, ${cableLength}m run, ${voltageDropLimit}% max drop`,
                value: `${results.recommendedCableSize} mm² ${results.cableType} — ${results.actualVoltageDropPercentage.toFixed(1)}% actual drop`,
              },
            ]}
          />

          {/* ── What This Means ── */}
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
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Marine Electrical Safety</p>
                  <ul className="space-y-1">
                    {[
                      'Vessel safety depends on reliable electrical systems for navigation, communication, and safety equipment',
                      'Proper load calculation prevents battery failure and equipment damage in marine environments',
                      'Adequate charging capacity ensures vessel autonomy during extended cruising or emergencies',
                      'Correct cable sizing prevents dangerous voltage drops and potential fire hazards at sea',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Corrosion Protection</p>
                  <ul className="space-y-1">
                    {[
                      'Install galvanic isolator on shore power connection',
                      'Use sacrificial anodes on metal components',
                      'Apply anti-corrosion compounds to all connections',
                      'Regular inspection and maintenance schedule essential',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── Standards Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Standards Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
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
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'ISO 13297',
                      desc: 'Small craft electrical systems — DC installations. Covers wiring, protection, battery installation, and testing requirements.',
                    },
                    {
                      reg: 'ABYC E-11',
                      desc: 'AC and DC electrical systems on boats — voltage drop limits (3% for critical, 10% max), wire sizing, overcurrent protection.',
                    },
                    {
                      reg: 'IEC 60364-7-709',
                      desc: 'Electrical installations in marinas and pleasure craft — RCD requirements, shore supply connections.',
                    },
                    {
                      reg: 'BS 7671 Section 709',
                      desc: 'Requirements for marinas and similar locations — supplementary bonding, RCD protection, IP ratings for exposed locations.',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Battery Sizing"
        formula="Ah = (Daily Wh ÷ V) × Days ÷ DoD × Temp Factor"
        variables={[
          { symbol: 'Ah', description: 'Required battery capacity (amp-hours)' },
          { symbol: 'Wh', description: 'Daily energy consumption (watt-hours)' },
          { symbol: 'V', description: 'System voltage (12V, 24V, or 48V)' },
          { symbol: 'DoD', description: 'Maximum depth of discharge (0.5-0.9)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default MarineElectricalCalculator;
