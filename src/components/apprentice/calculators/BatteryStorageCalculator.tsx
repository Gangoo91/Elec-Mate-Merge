import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Battery, Info, BookOpen, ChevronDown, AlertTriangle, Zap, Clock, PoundSterling } from "lucide-react";
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

const BATTERY_DATA_2025 = {
  lithium: { dod: 95, cycles: 6000, efficiency: 98, costPerKwh: 650, tempDerating: 0.5, chargingC: 0.5, description: "LiFePO4 with excellent cycle life" },
  lithiumNMC: { dod: 90, cycles: 4000, efficiency: 96, costPerKwh: 550, tempDerating: 0.7, chargingC: 0.8, description: "High energy density" },
  agm: { dod: 50, cycles: 800, efficiency: 85, costPerKwh: 280, tempDerating: 1.0, chargingC: 0.1, description: "Maintenance-free" },
  gel: { dod: 50, cycles: 1000, efficiency: 87, costPerKwh: 320, tempDerating: 0.8, chargingC: 0.1, description: "Deep cycle capability" },
  flooded: { dod: 50, cycles: 1200, efficiency: 80, costPerKwh: 180, tempDerating: 1.2, chargingC: 0.08, description: "Lowest cost" }
};

const ENVIRONMENT_FACTORS = {
  indoor: { tempFactor: 1.0, description: "Controlled temperature" },
  garage: { tempFactor: 0.95, description: "Some temperature variation" },
  outdoor: { tempFactor: 0.85, description: "Weather exposed" },
  basement: { tempFactor: 0.98, description: "Cool and stable" }
};

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
  batteryCost: number;
  systemCost: number;
  costPerKwhStored: number;
  whatThisMeans: string;
  recommendations: string[];
  bs7671Notes: string[];
}

const BatteryStorageCalculator = () => {
  const config = CALCULATOR_CONFIG['ev-storage'];

  const [criticalLoad, setCriticalLoad] = useState("");
  const [peakLoad, setPeakLoad] = useState("");
  const [daysOfAutonomy, setDaysOfAutonomy] = useState("1");
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [batteryType, setBatteryType] = useState("lithium");
  const [systemVoltage, setSystemVoltage] = useState("48");
  const [batteryUnitVoltage, setBatteryUnitVoltage] = useState("12");
  const [batteryUnitCapacity, setBatteryUnitCapacity] = useState("100");
  const [installEnvironment, setInstallEnvironment] = useState("indoor");
  const [chargerPower, setChargerPower] = useState("");
  const [designReserve, setDesignReserve] = useState("20");
  const [result, setResult] = useState<BatteryResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const batteryTypes = [
    { value: "lithium", label: "Lithium Iron Phosphate (LiFePO4)" },
    { value: "lithiumNMC", label: "Lithium NMC (High Density)" },
    { value: "agm", label: "AGM Lead Acid" },
    { value: "gel", label: "Gel Lead Acid" },
    { value: "flooded", label: "Flooded Lead Acid" }
  ];

  const voltageOptions = [
    { value: "12", label: "12V" },
    { value: "24", label: "24V" },
    { value: "48", label: "48V" }
  ];

  const environmentOptions = [
    { value: "indoor", label: "Indoor (Controlled)" },
    { value: "garage", label: "Garage/Utility Room" },
    { value: "basement", label: "Basement" },
    { value: "outdoor", label: "Outdoor Enclosure" }
  ];

  const autonomyOptions = [
    { value: "0.5", label: "12 Hours" },
    { value: "1", label: "1 Day" },
    { value: "2", label: "2 Days" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" }
  ];

  const unitCapacityOptions = [
    { value: "50", label: "50Ah" },
    { value: "100", label: "100Ah" },
    { value: "150", label: "150Ah" },
    { value: "200", label: "200Ah" },
    { value: "280", label: "280Ah" },
    { value: "400", label: "400Ah" }
  ];

  const chargerOptions = [
    { value: "1", label: "1kW" },
    { value: "2", label: "2kW" },
    { value: "3", label: "3kW" },
    { value: "5", label: "5kW" },
    { value: "7", label: "7kW" },
    { value: "10", label: "10kW" }
  ];

  const reserveOptions = [
    { value: "10", label: "10%" },
    { value: "15", label: "15%" },
    { value: "20", label: "20%" },
    { value: "25", label: "25%" },
    { value: "30", label: "30%" }
  ];

  const calculateBatteryStorage = () => {
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
    const envData = ENVIRONMENT_FACTORS[installEnvironment as keyof typeof ENVIRONMENT_FACTORS];

    const dailyEnergyKwh = consumption;
    const requiredEnergyKwh = dailyEnergyKwh * autonomyDays * (1 + reserve);
    const deratedEnergyKwh = requiredEnergyKwh / (batteryData.efficiency / 100) / envData.tempFactor;
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

    const maxContinuousC = batteryData.chargingC * 2;
    const maxBatteryPowerKw = actualBankCapacityKwh * maxContinuousC;
    const powerSufficient = maxBatteryPowerKw >= continuousPowerKw;
    const powerWarning = !powerSufficient ? `Battery can only deliver ${maxBatteryPowerKw.toFixed(1)}kW continuously. Consider more parallel strings.` : undefined;

    const actualBackupHours = actualUsableKwh / criticalLoadKw;
    const chargingTimeHours = chargerKw > 0 ? actualUsableKwh / chargerKw : actualBankCapacityKwh / batteryData.chargingC;

    const batteryCost = actualBankCapacityKwh * batteryData.costPerKwh;
    const systemCost = batteryCost * 1.4;
    const costPerKwhStored = systemCost / actualUsableKwh;

    const generateWhatThisMeans = (): string => {
      const days = Math.floor(actualBackupHours / 24);
      const hours = Math.floor(actualBackupHours % 24);
      const daysText = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
      const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
      const durationText = [daysText, hoursText].filter(Boolean).join(' and ') || 'less than 1 hour';

      return `This system provides ${durationText} of backup for your ${criticalLoadKw}kW load. With ${totalBatteries} batteries in ${batteriesInSeries}S${batteriesInParallel}P configuration, you'll have ${actualUsableKwh.toFixed(1)}kWh usable storage.`;
    };

    const generateRecommendations = (): string[] => {
      const recs = [];
      if (totalBatteries === 1) recs.push("Single battery - consider adding redundancy for critical applications");
      else if (totalBatteries > 8) recs.push("Large battery bank - ensure proper BMS and monitoring");
      if (!powerSufficient) recs.push("Increase parallel strings to meet power requirements");
      if (chargingTimeHours > 12) recs.push("Consider higher power charger to reduce charging time");
      else if (chargingTimeHours < 4) recs.push("Fast charging - ensure adequate ventilation");
      if (batteryData.cycles < 2000) recs.push("Lead acid - plan for replacement every 3-5 years");
      else recs.push("Long-life chemistry - expect 10+ years with proper maintenance");
      return recs;
    };

    const generateBS7671Notes = (): string[] => {
      const notes = [];
      if (systemV >= 48) notes.push("48V system requires appropriate safety measures (Section 414)");
      else notes.push("Low voltage system - standard domestic wiring practices apply");
      if (installEnvironment === 'outdoor') notes.push("Outdoor installation requires IP65+ enclosure (Section 512)");
      notes.push("Install appropriate DC isolation switches and overcurrent protection");
      notes.push("Ensure earthing arrangements comply with Section 542");
      if (systemCost > 5000) notes.push("High-value installation - consider enhanced security measures");
      return notes;
    };

    setResult({
      requiredCapacityAh: bankAh,
      usableCapacityKwh: actualUsableKwh,
      batteryBankCapacityKwh: actualBankCapacityKwh,
      numberOfBatteries: totalBatteries,
      batteriesInSeries,
      batteriesInParallel,
      continuousPowerKw,
      peakPowerKw,
      inverterSizeKw,
      powerSufficient,
      powerWarning,
      backupDurationHours: actualBackupHours,
      chargingTimeHours,
      cycleLife: batteryData.cycles,
      warrantyYears: batteryType.includes('lithium') ? 10 : 5,
      batteryCost,
      systemCost,
      costPerKwhStored,
      whatThisMeans: generateWhatThisMeans(),
      recommendations: generateRecommendations(),
      bs7671Notes: generateBS7671Notes()
    });
  };

  const reset = () => {
    setCriticalLoad("");
    setPeakLoad("");
    setDaysOfAutonomy("1");
    setDailyConsumption("");
    setBatteryType("lithium");
    setSystemVoltage("48");
    setBatteryUnitVoltage("12");
    setBatteryUnitCapacity("100");
    setInstallEnvironment("indoor");
    setChargerPower("");
    setDesignReserve("20");
    setResult(null);
  };

  const hasValidInputs = () => dailyConsumption && criticalLoad && parseFloat(dailyConsumption) > 0 && parseFloat(criticalLoad) > 0;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="ev-storage"
        title="Battery Storage Calculator"
        description="Design battery storage systems with 2025 technology data"
        badge="2025 Data"
      >
        {/* Load Requirements */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Load Requirements</p>
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
        </div>

        {/* Battery Specifications */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Battery Specifications</p>
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
        </div>

        {/* Installation & Design */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Installation & Design</p>
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
        </div>

        <CalculatorActions
          category="ev-storage"
          onCalculate={calculateBatteryStorage}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Calculate Storage"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="ev-storage">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Battery Storage Analysis</span>
              <Badge variant="outline" className={cn(
                result.powerSufficient ? "text-green-400 border-green-400/50" : "text-amber-400 border-amber-400/50"
              )}>
                {result.numberOfBatteries}× {batteryUnitCapacity}Ah
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Configuration</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {result.batteriesInSeries}S{result.batteriesInParallel}P
                </div>
                <p className="text-xs text-white/80">{result.numberOfBatteries} batteries</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/60 mb-1">Usable Capacity</p>
                <div className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                  {result.usableCapacityKwh.toFixed(1)}
                </div>
                <p className="text-xs text-white/80">kWh</p>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Bank Capacity" value={result.batteryBankCapacityKwh.toFixed(1)} unit="kWh" category="ev-storage" size="sm" />
              <ResultValue label="Backup Duration" value={result.backupDurationHours.toFixed(1)} unit="hours" category="ev-storage" size="sm" />
              <ResultValue label="Inverter Size" value={result.inverterSizeKw.toFixed(1)} unit="kW" category="ev-storage" size="sm" />
              <ResultValue label="Charging Time" value={result.chargingTimeHours.toFixed(1)} unit="hours" category="ev-storage" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Financial Summary */}
          <CalculatorResult category="ev-storage">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <PoundSterling className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Financial Summary</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Battery Cost" value={`£${Math.round(result.batteryCost / 1000)}k`} category="ev-storage" size="sm" />
              <ResultValue label="System Cost" value={`£${Math.round(result.systemCost / 1000)}k`} category="ev-storage" size="sm" />
              <ResultValue label="Cost/kWh Stored" value={`£${result.costPerKwhStored.toFixed(0)}`} category="ev-storage" size="sm" />
              <ResultValue label="Expected Life" value={`${result.warrantyYears}+ years`} category="ev-storage" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Power Warning */}
          {result.powerWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-200">
                  <strong>Power Limitation:</strong> {result.powerWarning}
                </p>
              </div>
            </div>
          )}

          {/* What This Means */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-200">
                <strong>What this means:</strong> {result.whatThisMeans}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">Recommendations</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-blue-200/80">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* BS 7671 Compliance */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Compliance</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-amber-200/80">
                  {result.bs7671Notes.map((note, idx) => (
                    <li key={idx}>• {note}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Battery className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>2025 technology data.</strong> Professional design review required for critical applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatteryStorageCalculator;
