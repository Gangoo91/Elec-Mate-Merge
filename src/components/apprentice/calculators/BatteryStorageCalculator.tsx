import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
import { Calculator, RotateCcw, Battery, Zap, AlertTriangle, Clock, PoundSterling } from "lucide-react";

// 2025 Battery Technology Data Models
const BATTERY_DATA_2025 = {
  lithium: { 
    dod: 95, cycles: 6000, efficiency: 98, costPerKwh: 650, tempDerating: 0.5, 
    chargingC: 0.5, description: "LiFePO4 technology with excellent cycle life" 
  },
  lithiumNMC: { 
    dod: 90, cycles: 4000, efficiency: 96, costPerKwh: 550, tempDerating: 0.7, 
    chargingC: 0.8, description: "High energy density, moderate cycle life" 
  },
  agm: { 
    dod: 50, cycles: 800, efficiency: 85, costPerKwh: 280, tempDerating: 1.0, 
    chargingC: 0.1, description: "Maintenance-free, good performance" 
  },
  gel: { 
    dod: 50, cycles: 1000, efficiency: 87, costPerKwh: 320, tempDerating: 0.8, 
    chargingC: 0.1, description: "Deep cycle capability, temperature stable" 
  },
  flooded: { 
    dod: 50, cycles: 1200, efficiency: 80, costPerKwh: 180, tempDerating: 1.2, 
    chargingC: 0.08, description: "Lowest cost, requires maintenance" 
  }
};

const ENVIRONMENT_FACTORS = {
  indoor: { tempFactor: 1.0, description: "Controlled temperature environment" },
  garage: { tempFactor: 0.95, description: "Some temperature variation" },
  outdoor: { tempFactor: 0.85, description: "Weather exposed, derating required" },
  basement: { tempFactor: 0.98, description: "Cool and stable conditions" }
};

interface BatteryResult {
  // Sizing
  requiredCapacityAh: number;
  usableCapacityKwh: number;
  batteryBankCapacityKwh: number;
  numberOfBatteries: number;
  batteriesInSeries: number;
  batteriesInParallel: number;
  
  // Power Analysis
  continuousPowerKw: number;
  peakPowerKw: number;
  inverterSizeKw: number;
  powerSufficient: boolean;
  powerWarning?: string;
  
  // Timing & Performance
  backupDurationHours: number;
  chargingTimeHours: number;
  cycleLife: number;
  warrantyYears: number;
  
  // Financial
  batteryCost: number;
  systemCost: number;
  costPerKwhStored: number;
  
  // Context
  whatThisMeans: string;
  recommendations: string[];
  bs7671Notes: string[];
}

const BatteryStorageCalculator = () => {
  // Core inputs
  const [criticalLoad, setCriticalLoad] = useState("");
  const [peakLoad, setPeakLoad] = useState("");
  const [daysOfAutonomy, setDaysOfAutonomy] = useState("1");
  const [dailyConsumption, setDailyConsumption] = useState("");
  
  // System specifications
  const [batteryType, setBatteryType] = useState("lithium");
  const [systemVoltage, setSystemVoltage] = useState("48");
  const [batteryUnitVoltage, setBatteryUnitVoltage] = useState("12");
  const [batteryUnitCapacity, setBatteryUnitCapacity] = useState("100");
  
  // Environmental & Installation
  const [installEnvironment, setInstallEnvironment] = useState("indoor");
  const [chargerPower, setChargerPower] = useState("");
  const [designReserve, setDesignReserve] = useState("20");
  
  const [result, setResult] = useState<BatteryResult | null>(null);

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

  const unitVoltageOptions = [
    { value: "2", label: "2V (Single Cell)" },
    { value: "6", label: "6V" },
    { value: "12", label: "12V" },
    { value: "24", label: "24V" },
    { value: "48", label: "48V" }
  ];

  const unitCapacityOptions = [
    { value: "50", label: "50Ah" },
    { value: "75", label: "75Ah" },
    { value: "100", label: "100Ah" },
    { value: "150", label: "150Ah" },
    { value: "200", label: "200Ah" },
    { value: "280", label: "280Ah" },
    { value: "400", label: "400Ah" }
  ];

  const chargerPowerOptions = [
    { value: "1", label: "1kW" },
    { value: "2", label: "2kW" },
    { value: "3", label: "3kW" },
    { value: "5", label: "5kW" },
    { value: "7", label: "7kW" },
    { value: "10", label: "10kW" }
  ];

  const designReserveOptions = [
    { value: "10", label: "10%" },
    { value: "15", label: "15%" },
    { value: "20", label: "20%" },
    { value: "25", label: "25%" },
    { value: "30", label: "30%" }
  ];

  const calculateBatteryStorage = () => {
    const consumption = parseFloat(dailyConsumption);
    const criticalLoadKw = parseFloat(criticalLoad);
    const peakLoadKw = parseFloat(peakLoad);
    const autonomyDays = parseFloat(daysOfAutonomy);
    const systemV = parseFloat(systemVoltage);
    const unitV = parseFloat(batteryUnitVoltage);
    const unitAh = parseFloat(batteryUnitCapacity);
    const chargerKw = parseFloat(chargerPower) || 0;
    const reserve = parseFloat(designReserve) / 100;

    if (!consumption || !criticalLoadKw || !autonomyDays || !systemV || !unitV || !unitAh) return;

    const batteryData = BATTERY_DATA_2025[batteryType as keyof typeof BATTERY_DATA_2025];
    const envData = ENVIRONMENT_FACTORS[installEnvironment as keyof typeof ENVIRONMENT_FACTORS];

    // Energy calculation with design reserve
    const dailyEnergyKwh = consumption;
    const requiredEnergyKwh = dailyEnergyKwh * autonomyDays * (1 + reserve);
    
    // Apply environmental derating and battery efficiency
    const deratedEnergyKwh = requiredEnergyKwh / (batteryData.efficiency / 100) / envData.tempFactor;
    
    // Calculate usable capacity considering DOD
    const usableCapacityKwh = deratedEnergyKwh;
    const totalBankCapacityKwh = usableCapacityKwh / (batteryData.dod / 100);
    
    // Battery configuration
    const batteriesInSeries = systemV / unitV;
    const bankAh = (totalBankCapacityKwh * 1000) / systemV;
    const batteriesInParallel = Math.ceil(bankAh / unitAh);
    const totalBatteries = batteriesInSeries * batteriesInParallel;
    const actualBankCapacityKwh = (totalBatteries * unitAh * unitV) / 1000;
    const actualUsableKwh = actualBankCapacityKwh * (batteryData.dod / 100);
    
    // Power analysis
    const continuousPowerKw = criticalLoadKw;
    const peakPowerKw = peakLoadKw || criticalLoadKw * 1.5;
    const inverterSizeKw = Math.max(peakPowerKw, continuousPowerKw * 1.25);
    
    // Check if battery can deliver required power (C-rate check)
    const maxContinuousC = batteryData.chargingC * 2; // Discharge typically 2x charge rate
    const maxBatteryPowerKw = (actualBankCapacityKwh * maxContinuousC);
    const powerSufficient = maxBatteryPowerKw >= continuousPowerKw;
    let powerWarning = undefined;
    if (!powerSufficient) {
      powerWarning = `Battery can only deliver ${maxBatteryPowerKw.toFixed(1)}kW continuously. Consider more parallel strings.`;
    }
    
    // Timing calculations
    const actualBackupHours = (actualUsableKwh / criticalLoadKw);
    const chargingTimeHours = chargerKw > 0 ? (actualUsableKwh / chargerKw) : (actualBankCapacityKwh / batteryData.chargingC);
    
    // Financial
    const batteryCost = actualBankCapacityKwh * batteryData.costPerKwh;
    const systemCost = batteryCost * 1.4; // Add 40% for BMS, wiring, installation
    const costPerKwhStored = systemCost / actualUsableKwh;
    
    // Generate contextual feedback
    const whatThisMeans = generateWhatThisMeans(actualBackupHours, totalBatteries, batteryType, actualUsableKwh, criticalLoadKw);
    const recommendations = generateRecommendations(batteryData, totalBatteries, powerSufficient, chargingTimeHours);
    const bs7671Notes = generateBS7671Notes(systemV, batteryCost, installEnvironment);

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
      whatThisMeans,
      recommendations,
      bs7671Notes
    });
  };

  const generateWhatThisMeans = (backupHours: number, batteries: number, chemistry: string, usableKwh: number, loadKw: number): string => {
    const days = Math.floor(backupHours / 24);
    const hours = Math.floor(backupHours % 24);
    const daysText = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
    const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const durationText = [daysText, hoursText].filter(Boolean).join(' and ');
    
    return `This system provides ${durationText} of backup power for your ${loadKw}kW critical load. With ${batteries} ${chemistry} ${batteries === 1 ? 'battery' : 'batteries'}, you'll have ${usableKwh.toFixed(1)}kWh of usable energy storage. This is suitable for maintaining essential systems like lighting, security, and critical appliances during power outages.`;
  };

  const generateRecommendations = (batteryData: any, batteries: number, powerOk: boolean, chargeTime: number): string[] => {
    const recs = [];
    
    if (batteries === 1) {
      recs.push("Single battery system - consider adding redundancy for critical applications");
    } else if (batteries > 8) {
      recs.push("Large battery bank - ensure proper battery management system (BMS) and monitoring");
    }
    
    if (!powerOk) {
      recs.push("Increase parallel battery strings to meet power requirements");
    }
    
    if (chargeTime > 12) {
      recs.push("Consider higher power charger to reduce charging time");
    } else if (chargeTime < 4) {
      recs.push("Fast charging setup - ensure adequate ventilation and thermal management");
    }
    
    if (batteryData.cycles < 2000) {
      recs.push("Lead acid chemistry - plan for replacement every 3-5 years");
    } else {
      recs.push("Long-life chemistry - expect 10+ years with proper maintenance");
    }
    
    return recs;
  };

  const generateBS7671Notes = (voltage: number, cost: number, environment: string): string[] => {
    const notes = [];
    
    if (voltage >= 48) {
      notes.push("48V system requires appropriate safety measures (BS 7671 Section 414)");
    } else {
      notes.push("Low voltage system - standard domestic wiring practices apply");
    }
    
    if (environment === 'outdoor') {
      notes.push("Outdoor installation requires IP65+ enclosure (BS 7671 Section 512)");
    }
    
    notes.push("Install appropriate DC isolation switches and overcurrent protection");
    notes.push("Ensure earthing arrangements comply with BS 7671 Section 542");
    
    if (cost > 5000) {
      notes.push("High-value installation - consider enhanced security measures");
    }
    
    return notes;
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          Battery Storage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-6">
          {/* Load Requirements */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-elec-yellow">Load Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="Critical Load"
                type="number"
                value={criticalLoad}
                onChange={(e) => setCriticalLoad(e.target.value)}
                placeholder="e.g., 3.5"
                unit="kW"
                hint="Essential power needed during outage"
              />
              <MobileInput
                label="Peak Load"
                type="number"
                value={peakLoad}
                onChange={(e) => setPeakLoad(e.target.value)}
                placeholder="e.g., 5.0"
                unit="kW"
                hint="Maximum instantaneous power required"
              />
              <MobileInput
                label="Daily Energy Consumption"
                type="number"
                value={dailyConsumption}
                onChange={(e) => setDailyConsumption(e.target.value)}
                placeholder="e.g., 25"
                unit="kWh"
                hint="Total energy used per day"
              />
              <MobileSelect value={daysOfAutonomy} onValueChange={setDaysOfAutonomy}>
                <MobileSelectTrigger label="Days of Autonomy">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {autonomyOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>

          {/* Battery Specifications */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-elec-yellow">Battery Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelect value={batteryType} onValueChange={setBatteryType}>
                <MobileSelectTrigger label="Battery Chemistry">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {batteryTypes.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileSelect value={systemVoltage} onValueChange={setSystemVoltage}>
                <MobileSelectTrigger label="System Voltage">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {voltageOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileSelect value={batteryUnitVoltage} onValueChange={setBatteryUnitVoltage}>
                <MobileSelectTrigger label="Battery Unit Voltage">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {unitVoltageOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileSelect value={batteryUnitCapacity} onValueChange={setBatteryUnitCapacity}>
                <MobileSelectTrigger label="Battery Unit Capacity">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {unitCapacityOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>

          {/* Installation & Design */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-elec-yellow">Installation & Design</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelect value={installEnvironment} onValueChange={setInstallEnvironment}>
                <MobileSelectTrigger label="Installation Environment">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {environmentOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileSelect value={chargerPower} onValueChange={setChargerPower}>
                <MobileSelectTrigger label="Charger Power">
                  <MobileSelectValue placeholder="Select charger size" />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {chargerPowerOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
              <MobileSelect value={designReserve} onValueChange={setDesignReserve}>
                <MobileSelectTrigger label="Design Reserve">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {designReserveOptions.map((option) => (
                    <MobileSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <MobileButton onClick={calculateBatteryStorage} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Storage
          </MobileButton>
          <MobileButton onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </MobileButton>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Sizing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard
                title="Battery Configuration"
                value={result.numberOfBatteries}
                unit="batteries"
                subtitle={`${result.batteriesInSeries}S${result.batteriesInParallel}P configuration`}
                status="info"
                icon={<Battery />}
              />
              <ResultCard
                title="Usable Capacity"
                value={result.usableCapacityKwh}
                unit="kWh"
                subtitle={`${result.batteryBankCapacityKwh.toFixed(1)}kWh total bank`}
                status="success"
                icon={<Zap />}
              />
              <ResultCard
                title="Backup Duration"
                value={result.backupDurationHours.toFixed(1)}
                unit="hours"
                subtitle={`At ${result.continuousPowerKw}kW load`}
                status="success"
                icon={<Clock />}
              />
              <ResultCard
                title="System Cost"
                value={`£${Math.round(result.systemCost / 1000)}k`}
                subtitle={`£${result.costPerKwhStored.toFixed(0)}/kWh stored`}
                status="info"
                icon={<PoundSterling />}
              />
            </div>

            {/* Power Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                title="Continuous Power"
                value={result.continuousPowerKw}
                unit="kW"
                subtitle="Available continuously"
                status={result.powerSufficient ? "success" : "warning"}
              />
              <ResultCard
                title="Peak Power"
                value={result.peakPowerKw}
                unit="kW"
                subtitle="Short-term capability"
                status="info"
              />
              <ResultCard
                title="Recommended Inverter"
                value={result.inverterSizeKw}
                unit="kW"
                subtitle="Minimum inverter rating"
                status="info"
              />
            </div>

            {/* Power Warning */}
            {result.powerWarning && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-amber-200">
                  <strong>Power Limitation:</strong> {result.powerWarning}
                </AlertDescription>
              </Alert>
            )}

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Technical Specifications</h4>
                <div className="text-sm space-y-1 text-white">
                  <p>Charging time: <span className="text-white">{result.chargingTimeHours.toFixed(1)} hours</span></p>
                  <p>Cycle life: <span className="text-white">{result.cycleLife.toLocaleString()} cycles</span></p>
                  <p>Warranty: <span className="text-white">{result.warrantyYears} years</span></p>
                  <p>Battery cost: <span className="text-white">£{Math.round(result.batteryCost).toLocaleString()}</span></p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">BS 7671 Compliance</h4>
                <div className="text-sm space-y-1 text-white">
                  {result.bs7671Notes.map((note, idx) => (
                    <p key={idx}>• {note}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* What This Means */}
        <Alert className="text-white">
              <Battery className="h-4 w-4" />
              <AlertDescription className="text-white">
                <strong>What this means:</strong> {result.whatThisMeans}
              </AlertDescription>
            </Alert>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Recommendations</h4>
                <div className="text-sm text-white space-y-1">
                  {result.recommendations.map((rec, idx) => (
                    <p key={idx} className="text-white">• {rec}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Alert>
          <Battery className="h-4 w-4" />
          <AlertDescription className="text-white">
            This calculator provides sizing estimates based on 2025 battery technology data. Consider professional design review for critical applications and compliance verification.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default BatteryStorageCalculator;