import { useState, useCallback } from 'react';
import {
  Battery,
  Copy,
  Check,
  Info,
  AlertTriangle,
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

const CAT = 'ev-storage' as const;
const config = CALCULATOR_CONFIG[CAT];

// 2025 UK battery technology data
const BATTERY_DATA_2025 = {
  lithium: {
    dod: 95,
    cycles: 6000,
    efficiency: 98,
    costPerKwh: 500, // LiFePO4 — corrected from £650 to £500 (2025 market price)
    chargingC: 0.5,
    dischargeC: 1.0, // LiFePO4 can sustain 1C continuous discharge
    description: 'LiFePO4 with excellent cycle life',
  },
  lithiumNMC: {
    dod: 90,
    cycles: 4000,
    efficiency: 96,
    costPerKwh: 550,
    chargingC: 0.8,
    dischargeC: 1.5, // NMC handles higher discharge rates
    description: 'High energy density',
  },
  agm: {
    dod: 50,
    cycles: 800,
    efficiency: 85,
    costPerKwh: 280,
    chargingC: 0.1,
    dischargeC: 0.2, // Lead acid limited discharge rate
    description: 'Maintenance-free',
  },
  gel: {
    dod: 50,
    cycles: 1000,
    efficiency: 87,
    costPerKwh: 320,
    chargingC: 0.1,
    dischargeC: 0.2,
    description: 'Deep cycle capability',
  },
  flooded: {
    dod: 50,
    cycles: 1200,
    efficiency: 80,
    costPerKwh: 180,
    chargingC: 0.08,
    dischargeC: 0.15,
    description: 'Lowest cost',
  },
};

// Temperature derating by chemistry — different chemistries respond differently to cold
const ENVIRONMENT_FACTORS: Record<string, Record<string, { tempFactor: number; label: string }>> = {
  lithium: {
    indoor: { tempFactor: 1.0, label: 'Indoor (20°C)' },
    garage: { tempFactor: 0.95, label: 'Garage/Utility' },
    basement: { tempFactor: 0.98, label: 'Basement' },
    outdoor: { tempFactor: 0.9, label: 'Outdoor' },
  },
  lithiumNMC: {
    indoor: { tempFactor: 1.0, label: 'Indoor (20°C)' },
    garage: { tempFactor: 0.93, label: 'Garage/Utility' },
    basement: { tempFactor: 0.97, label: 'Basement' },
    outdoor: { tempFactor: 0.85, label: 'Outdoor' },
  },
  agm: {
    indoor: { tempFactor: 1.0, label: 'Indoor (20°C)' },
    garage: { tempFactor: 0.9, label: 'Garage/Utility' },
    basement: { tempFactor: 0.95, label: 'Basement' },
    outdoor: { tempFactor: 0.75, label: 'Outdoor' },
  },
  gel: {
    indoor: { tempFactor: 1.0, label: 'Indoor (20°C)' },
    garage: { tempFactor: 0.92, label: 'Garage/Utility' },
    basement: { tempFactor: 0.96, label: 'Basement' },
    outdoor: { tempFactor: 0.78, label: 'Outdoor' },
  },
  flooded: {
    indoor: { tempFactor: 1.0, label: 'Indoor (20°C)' },
    garage: { tempFactor: 0.88, label: 'Garage/Utility' },
    basement: { tempFactor: 0.94, label: 'Basement' },
    outdoor: { tempFactor: 0.7, label: 'Outdoor' },
  },
};

interface DegradationPoint {
  year: number;
  capacityPercent: number;
  usableKwh: number;
}

interface BatteryResult {
  requiredCapacityAh: number;
  usableCapacityKwh: number;
  batteryBankCapacityKwh: number;
  numberOfBatteries: number;
  batteriesInSeries: number;
  batteriesInParallel: number;
  continuousPowerKw: number;
  peakPowerKw: number;
  inverterSizeKw: number;
  powerSufficient: boolean;
  powerWarning?: string;
  backupDurationHours: number;
  chargingTimeHours: number;
  cycleLife: number;
  warrantyYears: number;
  costBreakdown: {
    batteries: number;
    inverter: number;
    bms: number;
    wiring: number;
    installation: number;
    total: number;
  };
  costPerKwhStored: number;
  tariffArbitrage: {
    dailySaving: number;
    annualSaving: number;
    peakRate: number;
    offPeakRate: number;
  };
  degradation: DegradationPoint[];
  whatThisMeans: string;
  recommendations: string[];
  bs7671Notes: string[];
}

const BatteryStorageCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [criticalLoad, setCriticalLoad] = useState('');
  const [peakLoad, setPeakLoad] = useState('');
  const [daysOfAutonomy, setDaysOfAutonomy] = useState('1');
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [batteryType, setBatteryType] = useState('lithium');
  const [systemVoltage, setSystemVoltage] = useState('48');
  const [batteryUnitVoltage, setBatteryUnitVoltage] = useState('12');
  const [batteryUnitCapacity, setBatteryUnitCapacity] = useState('100');
  const [installEnvironment, setInstallEnvironment] = useState('indoor');
  const [chargerPower, setChargerPower] = useState('');
  const [designReserve, setDesignReserve] = useState('20');
  const [result, setResult] = useState<BatteryResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showCosts, setShowCosts] = useState(false);

  const batteryTypes = [
    { value: 'lithium', label: 'Lithium Iron Phosphate (LiFePO4)' },
    { value: 'lithiumNMC', label: 'Lithium NMC (High Density)' },
    { value: 'agm', label: 'AGM Lead Acid' },
    { value: 'gel', label: 'Gel Lead Acid' },
    { value: 'flooded', label: 'Flooded Lead Acid' },
  ];

  const voltageOptions = [
    { value: '12', label: '12V' },
    { value: '24', label: '24V' },
    { value: '48', label: '48V' },
  ];

  const environmentOptions = [
    { value: 'indoor', label: 'Indoor (Controlled)' },
    { value: 'garage', label: 'Garage/Utility Room' },
    { value: 'basement', label: 'Basement' },
    { value: 'outdoor', label: 'Outdoor Enclosure' },
  ];

  const autonomyOptions = [
    { value: '0.5', label: '12 Hours' },
    { value: '1', label: '1 Day' },
    { value: '2', label: '2 Days' },
    { value: '3', label: '3 Days' },
    { value: '5', label: '5 Days' },
  ];

  const unitCapacityOptions = [
    { value: '50', label: '50Ah' },
    { value: '100', label: '100Ah' },
    { value: '150', label: '150Ah' },
    { value: '200', label: '200Ah' },
    { value: '280', label: '280Ah' },
    { value: '400', label: '400Ah' },
  ];

  const chargerOptions = [
    { value: '1', label: '1kW' },
    { value: '2', label: '2kW' },
    { value: '3', label: '3kW' },
    { value: '5', label: '5kW' },
    { value: '7', label: '7kW' },
    { value: '10', label: '10kW' },
  ];

  const reserveOptions = [
    { value: '10', label: '10%' },
    { value: '15', label: '15%' },
    { value: '20', label: '20%' },
    { value: '25', label: '25%' },
    { value: '30', label: '30%' },
  ];

  const handleCalculate = useCallback(() => {
    const consumption = parseFloat(dailyConsumption);
    const criticalLoadKw = parseFloat(criticalLoad);
    const peakLoadKw = parseFloat(peakLoad) || criticalLoadKw * 1.5;
    const autonomyDays = parseFloat(daysOfAutonomy);
    const systemV = parseFloat(systemVoltage);
    const unitV = parseFloat(batteryUnitVoltage);
    const unitAh = parseFloat(batteryUnitCapacity);
    const chargerKw = parseFloat(chargerPower) || 0;
    const reserve = parseFloat(designReserve) / 100;

    if (!consumption || !criticalLoadKw || !autonomyDays || !systemV || !unitV || !unitAh) return;

    const batteryData = BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025];
    const envFactors = ENVIRONMENT_FACTORS[batteryType] ?? ENVIRONMENT_FACTORS['lithium'];
    const envData = envFactors[installEnvironment] ?? envFactors['indoor'];

    const dailyEnergyKwh = consumption;
    const requiredEnergyKwh = dailyEnergyKwh * autonomyDays * (1 + reserve);
    const deratedEnergyKwh =
      requiredEnergyKwh / (batteryData.efficiency / 100) / envData.tempFactor;
    const usableCapacityKwh = deratedEnergyKwh;
    const totalBankCapacityKwh = usableCapacityKwh / (batteryData.dod / 100);

    const batteriesInSeries = systemV / unitV;
    const bankAh = (totalBankCapacityKwh * 1000) / systemV;
    const batteriesInParallel = Math.ceil(bankAh / unitAh);
    const totalBatteries = batteriesInSeries * batteriesInParallel;
    const actualBankCapacityKwh = (totalBatteries * unitAh * unitV) / 1000;
    const actualUsableKwh = actualBankCapacityKwh * (batteryData.dod / 100);

    const continuousPowerKw = criticalLoadKw;
    const inverterSizeKw = Math.max(peakLoadKw, continuousPowerKw * 1.25);

    // Use explicit discharge C-rate per chemistry (not chargingC × 2)
    const maxBatteryPowerKw = actualBankCapacityKwh * batteryData.dischargeC;
    const powerSufficient = maxBatteryPowerKw >= continuousPowerKw;
    const powerWarning = !powerSufficient
      ? `Battery can only deliver ${maxBatteryPowerKw.toFixed(1)}kW continuously. Consider more parallel strings.`
      : undefined;

    const actualBackupHours = actualUsableKwh / criticalLoadKw;
    const chargingTimeHours =
      chargerKw > 0 ? actualUsableKwh / chargerKw : actualBankCapacityKwh / batteryData.chargingC;

    // Itemised BOP costs (replacing flat ×1.4 multiplier)
    const batteryCost = actualBankCapacityKwh * batteryData.costPerKwh;
    const inverterCost = inverterSizeKw * 150; // £150/kW pure sine wave
    const bmsCost = batteryType.includes('lithium')
      ? totalBatteries * 45 // £45/battery for lithium BMS modules
      : totalBatteries * 15; // £15/battery for lead-acid monitoring
    const wiringCost = Math.max(200, totalBatteries * 35); // £35/battery for cables + busbars + fuses
    const installationCost = (batteryCost + inverterCost) * 0.12; // 12% installation labour
    const systemCost = batteryCost + inverterCost + bmsCost + wiringCost + installationCost;
    const costPerKwhStored = systemCost / actualUsableKwh;

    const generateWhatThisMeans = (): string => {
      const days = Math.floor(actualBackupHours / 24);
      const hours = Math.floor(actualBackupHours % 24);
      const daysText = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
      const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
      const durationText =
        [daysText, hoursText].filter(Boolean).join(' and ') || 'less than 1 hour';

      return `This system provides ${durationText} of backup for your ${criticalLoadKw}kW load. With ${totalBatteries} batteries in ${batteriesInSeries}S${batteriesInParallel}P configuration, you'll have ${actualUsableKwh.toFixed(1)}kWh usable storage.`;
    };

    const generateRecommendations = (): string[] => {
      const recs = [];
      if (totalBatteries === 1)
        recs.push('Single battery — consider adding redundancy for critical applications');
      else if (totalBatteries > 8)
        recs.push('Large battery bank — ensure proper BMS and monitoring');
      if (!powerSufficient) recs.push('Increase parallel strings to meet power requirements');
      if (chargingTimeHours > 12)
        recs.push('Consider higher power charger to reduce charging time');
      else if (chargingTimeHours < 4) recs.push('Fast charging — ensure adequate ventilation');
      if (batteryData.cycles < 2000) recs.push('Lead acid — plan for replacement every 3–5 years');
      else recs.push('Long-life chemistry — expect 10+ years with proper maintenance');
      return recs;
    };

    const generateBS7671Notes = (): string[] => {
      const notes = [];
      if (systemV >= 48)
        notes.push('48V system requires appropriate safety measures (Section 414)');
      else notes.push('Low voltage system — standard domestic wiring practices apply');
      if (installEnvironment === 'outdoor')
        notes.push('Outdoor installation requires IP65+ enclosure (Section 512)');
      notes.push('Install appropriate DC isolation switches and overcurrent protection');
      notes.push('Ensure earthing arrangements comply with Section 542');
      return notes;
    };

    // Tariff arbitrage — charge off-peak, use during peak
    const offPeakRate = 0.07; // Octopus Go / Economy 7 typical
    const peakRate = 0.3; // Standard daytime rate
    const usableCycleKwh = actualUsableKwh * (batteryData.efficiency / 100);
    const dailyArbitrageSaving = usableCycleKwh * (peakRate - offPeakRate);
    const annualArbitrageSaving = dailyArbitrageSaving * 365;

    // Degradation curve — capacity retention at key years
    // Lithium: ~1.5%/yr; Lead acid: ~5%/yr
    const annualDegradation = batteryType.includes('lithium') ? 0.015 : 0.05;
    const degradationYears = [1, 5, 10, 15];
    const degradation: DegradationPoint[] = degradationYears.map((yr) => {
      const remaining = Math.pow(1 - annualDegradation, yr);
      return {
        year: yr,
        capacityPercent: Math.round(remaining * 100),
        usableKwh: Math.round(actualUsableKwh * remaining * 10) / 10,
      };
    });

    setResult({
      requiredCapacityAh: bankAh,
      usableCapacityKwh: actualUsableKwh,
      batteryBankCapacityKwh: actualBankCapacityKwh,
      numberOfBatteries: totalBatteries,
      batteriesInSeries,
      batteriesInParallel,
      continuousPowerKw,
      peakPowerKw: peakLoadKw,
      inverterSizeKw,
      powerSufficient,
      powerWarning,
      backupDurationHours: actualBackupHours,
      chargingTimeHours,
      cycleLife: batteryData.cycles,
      warrantyYears: batteryType.includes('lithium') ? 10 : 5,
      costBreakdown: {
        batteries: batteryCost,
        inverter: inverterCost,
        bms: bmsCost,
        wiring: wiringCost,
        installation: installationCost,
        total: systemCost,
      },
      costPerKwhStored,
      tariffArbitrage: {
        dailySaving: dailyArbitrageSaving,
        annualSaving: annualArbitrageSaving,
        peakRate,
        offPeakRate,
      },
      degradation,
      whatThisMeans: generateWhatThisMeans(),
      recommendations: generateRecommendations(),
      bs7671Notes: generateBS7671Notes(),
    });
  }, [
    dailyConsumption,
    criticalLoad,
    peakLoad,
    daysOfAutonomy,
    systemVoltage,
    batteryUnitVoltage,
    batteryUnitCapacity,
    chargerPower,
    designReserve,
    batteryType,
    installEnvironment,
  ]);

  const handleReset = useCallback(() => {
    setCriticalLoad('');
    setPeakLoad('');
    setDaysOfAutonomy('1');
    setDailyConsumption('');
    setBatteryType('lithium');
    setSystemVoltage('48');
    setBatteryUnitVoltage('12');
    setBatteryUnitCapacity('100');
    setInstallEnvironment('indoor');
    setChargerPower('');
    setDesignReserve('20');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Battery Storage Design',
      `Configuration: ${result.batteriesInSeries}S${result.batteriesInParallel}P (${result.numberOfBatteries} batteries)`,
      `Bank Capacity: ${result.batteryBankCapacityKwh.toFixed(1)} kWh`,
      `Usable Capacity: ${result.usableCapacityKwh.toFixed(1)} kWh`,
      `Backup Duration: ${result.backupDurationHours.toFixed(1)} hours`,
      `Inverter Size: ${result.inverterSizeKw.toFixed(1)} kW`,
      `System Cost: £${Math.round(result.costBreakdown.total)}`,
      `Cost/kWh: £${result.costPerKwhStored.toFixed(0)}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs =
    dailyConsumption &&
    criticalLoad &&
    parseFloat(dailyConsumption) > 0 &&
    parseFloat(criticalLoad) > 0;

  return (
    <CalculatorCard
      category={CAT}
      title="Battery Storage Calculator"
      description="Design battery storage systems with 2025 technology data"
      badge="2025 Data"
    >
      {/* Load Requirements */}
      <CalculatorSection title="Load Requirements">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Critical Load"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={criticalLoad}
            onChange={setCriticalLoad}
            placeholder="e.g., 3.5"
            hint="Essential power during outage"
          />
          <CalculatorInput
            label="Peak Load"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={peakLoad}
            onChange={setPeakLoad}
            placeholder="e.g., 5.0"
            hint="Maximum instantaneous power"
          />
          <CalculatorInput
            label="Daily Consumption"
            unit="kWh"
            type="text"
            inputMode="decimal"
            value={dailyConsumption}
            onChange={setDailyConsumption}
            placeholder="e.g., 25"
            hint="Total energy used per day"
          />
          <CalculatorSelect
            label="Days of Autonomy"
            value={daysOfAutonomy}
            onChange={setDaysOfAutonomy}
            options={autonomyOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Battery Specifications */}
      <CalculatorSection title="Battery Specifications">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Battery Chemistry"
            value={batteryType}
            onChange={setBatteryType}
            options={batteryTypes}
          />
          <CalculatorSelect
            label="System Voltage"
            value={systemVoltage}
            onChange={setSystemVoltage}
            options={voltageOptions}
          />
          <CalculatorSelect
            label="Battery Unit Voltage"
            value={batteryUnitVoltage}
            onChange={setBatteryUnitVoltage}
            options={voltageOptions}
          />
          <CalculatorSelect
            label="Battery Unit Capacity"
            value={batteryUnitCapacity}
            onChange={setBatteryUnitCapacity}
            options={unitCapacityOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Installation & Design */}
      <CalculatorSection title="Installation & Design">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Environment"
            value={installEnvironment}
            onChange={setInstallEnvironment}
            options={environmentOptions}
          />
          <CalculatorSelect
            label="Charger Power"
            value={chargerPower}
            onChange={setChargerPower}
            options={chargerOptions}
            placeholder="Select charger"
          />
        </CalculatorInputGrid>
        <CalculatorSelect
          label="Design Reserve"
          value={designReserve}
          onChange={setDesignReserve}
          options={reserveOptions}
        />
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs}
        calculateLabel="Calculate Storage"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.powerSufficient ? 'pass' : 'warning'}
              label={`${result.numberOfBatteries}× ${batteryUnitCapacity}Ah — ${result.batteriesInSeries}S${result.batteriesInParallel}P`}
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
              <p className="text-sm text-white mb-1">Configuration</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.batteriesInSeries}S{result.batteriesInParallel}P
              </p>
              <p className="text-xs text-white">{result.numberOfBatteries} batteries</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-white mb-1">Usable Capacity</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.usableCapacityKwh.toFixed(1)}
              </p>
              <p className="text-xs text-white">kWh</p>
            </div>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Bank Capacity"
              value={result.batteryBankCapacityKwh.toFixed(1)}
              unit="kWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Backup Duration"
              value={result.backupDurationHours.toFixed(1)}
              unit="hours"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Inverter Size"
              value={result.inverterSizeKw.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Charging Time"
              value={result.chargingTimeHours.toFixed(1)}
              unit="hours"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Power Warning */}
          {result.powerWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  <strong>Power Limitation:</strong> {result.powerWarning}
                </p>
              </div>
            </div>
          )}

          {/* What This Means */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                <strong>What this means:</strong> {result.whatThisMeans}
              </p>
            </div>
          </div>

          <CalculatorDivider category={CAT} />

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Required energy storage',
                formula: `E = ${dailyConsumption} kWh × ${daysOfAutonomy} days × (1 + ${designReserve}%)`,
                value: `${(parseFloat(dailyConsumption) * parseFloat(daysOfAutonomy) * (1 + parseFloat(designReserve) / 100)).toFixed(1)} kWh`,
              },
              {
                label: 'Derated for efficiency & temperature',
                formula: `E_derated = E / η_batt / temp_factor`,
                value: `${((result.batteryBankCapacityKwh * (BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025]?.dod ?? 95)) / 100).toFixed(1)} kWh`,
                description: `${BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025]?.efficiency ?? 98}% round-trip efficiency, ${installEnvironment} temp derating applied`,
              },
              {
                label: 'Total bank capacity',
                formula: `C_bank = E_derated / DoD = E / ${BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025]?.dod ?? 95}%`,
                value: `${result.batteryBankCapacityKwh.toFixed(1)} kWh`,
              },
              {
                label: 'Battery configuration',
                formula: `Series: ${systemVoltage}V / ${batteryUnitVoltage}V = ${result.batteriesInSeries} | Parallel: ⌈${result.requiredCapacityAh.toFixed(0)}Ah / ${batteryUnitCapacity}Ah⌉ = ${result.batteriesInParallel}`,
                value: `${result.batteriesInSeries}S${result.batteriesInParallel}P = ${result.numberOfBatteries} batteries`,
              },
              {
                label: 'Max continuous discharge',
                formula: `P_max = ${result.batteryBankCapacityKwh.toFixed(1)} kWh × ${BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025]?.dischargeC ?? 1}C`,
                value: `${(result.batteryBankCapacityKwh * (BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025]?.dischargeC ?? 1)).toFixed(1)} kW`,
                description: result.powerSufficient
                  ? 'Sufficient for load'
                  : 'Insufficient — add parallel strings',
              },
            ]}
          />

          {/* Cost Breakdown */}
          <Collapsible open={showCosts} onOpenChange={setShowCosts}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-blue-400" />
                <span>Cost Breakdown</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showCosts && 'rotate-180'
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
                  <div className="flex justify-between">
                    <span className="text-white">Batteries</span>
                    <span className="text-white">
                      £{Math.round(result.costBreakdown.batteries).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Inverter</span>
                    <span className="text-white">
                      £{Math.round(result.costBreakdown.inverter).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">BMS/Monitoring</span>
                    <span className="text-white">
                      £{Math.round(result.costBreakdown.bms).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Wiring & Protection</span>
                    <span className="text-white">
                      £{Math.round(result.costBreakdown.wiring).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Installation</span>
                    <span className="text-white">
                      £{Math.round(result.costBreakdown.installation).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-semibold">
                    <span className="text-white">Total System Cost</span>
                    <span className="text-green-400">
                      £{Math.round(result.costBreakdown.total).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Cost per kWh stored</span>
                    <span className="text-white">£{result.costPerKwhStored.toFixed(0)}/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Expected life</span>
                    <span className="text-white">
                      {result.warrantyYears}+ years ({result.cycleLife.toLocaleString()} cycles)
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Tariff Arbitrage */}
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 space-y-2">
            <p className="text-sm font-medium text-white">Tariff Arbitrage Savings</p>
            <p className="text-xs text-white">
              Charge off-peak (£{result.tariffArbitrage.offPeakRate.toFixed(2)}/kWh) and use during
              peak (£{result.tariffArbitrage.peakRate.toFixed(2)}/kWh)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-white">Daily Saving</p>
                <p className="text-lg font-bold text-green-400">
                  £{result.tariffArbitrage.dailySaving.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-white">Annual Saving</p>
                <p className="text-lg font-bold text-green-400">
                  £{Math.round(result.tariffArbitrage.annualSaving)}
                </p>
              </div>
            </div>
            <p className="text-xs text-white">
              Payback from arbitrage alone:{' '}
              {(result.costBreakdown.total / result.tariffArbitrage.annualSaving).toFixed(1)} years
            </p>
          </div>

          {/* Degradation Curve */}
          <div className="p-3 rounded-xl bg-white/5 space-y-2">
            <p className="text-sm font-medium text-white">Capacity Degradation</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {result.degradation.map((d) => (
                <div key={d.year}>
                  <p className="text-xs text-white">Year {d.year}</p>
                  <p className="text-sm font-bold text-white">{d.capacityPercent}%</p>
                  <p className="text-xs text-white">{d.usableKwh} kWh</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
                <span>Recommendations</span>
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
                  <ul className="space-y-2 text-sm text-white">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* BS 7671 Compliance */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Compliance</span>
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
                <ul className="space-y-2 text-sm text-white">
                  {result.bs7671Notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Info note */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Battery className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>2025 technology data.</strong> Professional design review required for critical
            applications.
          </p>
        </div>
      </div>

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Battery Storage Formulas"
        formula="C_bank = (E_daily × days × (1 + reserve)) / (η × DoD × temp)"
        variables={[
          { symbol: 'E_daily', description: 'Daily energy consumption (kWh)' },
          { symbol: 'η', description: 'Round-trip efficiency (decimal)' },
          { symbol: 'DoD', description: 'Depth of discharge (decimal)' },
          { symbol: 'temp', description: 'Temperature derating factor' },
        ]}
      />
    </CalculatorCard>
  );
};

export default BatteryStorageCalculator;
