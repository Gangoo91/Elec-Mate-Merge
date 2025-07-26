import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, Battery } from "lucide-react";

const BatteryStorageCalculator = () => {
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [backupHours, setBackupHours] = useState("");
  const [batteryVoltage, setBatteryVoltage] = useState("12");
  const [batteryType, setBatteryType] = useState("lithium");
  const [depthOfDischarge, setDepthOfDischarge] = useState("");
  const [systemVoltage, setSystemVoltage] = useState("12");
  const [inverterEfficiency, setInverterEfficiency] = useState("90");
  const [result, setResult] = useState<{
    requiredCapacity?: number;
    usableCapacity?: number;
    batteryCapacity?: number;
    numberOfBatteries?: number;
    systemCost?: number;
    chargingTime?: number;
  } | null>(null);

  const batteryTypes = [
    { value: "lithium", label: "Lithium Ion" },
    { value: "agm", label: "AGM Lead Acid" },
    { value: "gel", label: "Gel Lead Acid" },
    { value: "flooded", label: "Flooded Lead Acid" }
  ];

  const voltageOptions = [
    { value: "12", label: "12V" },
    { value: "24", label: "24V" },
    { value: "48", label: "48V" }
  ];

  const calculateBatteryStorage = () => {
    const consumption = parseFloat(dailyConsumption);
    const hours = parseFloat(backupHours);
    const voltage = parseFloat(batteryVoltage);
    const systemV = parseFloat(systemVoltage);
    const efficiency = parseFloat(inverterEfficiency) / 100;
    let dod = parseFloat(depthOfDischarge);

    if (!consumption || !hours || !voltage || !efficiency) return;

    // Set default DOD based on battery type if not provided
    if (!dod) {
      switch (batteryType) {
        case "lithium": dod = 90; break;
        case "agm": dod = 50; break;
        case "gel": dod = 50; break;
        case "flooded": dod = 50; break;
        default: dod = 50;
      }
    }

    // Calculate required energy accounting for backup duration
    const requiredEnergy = (consumption * (hours / 24)) / efficiency; // kWh
    const requiredEnergyWh = requiredEnergy * 1000; // Wh

    // Calculate required capacity accounting for DOD
    const usableCapacity = requiredEnergyWh / (dod / 100);
    const requiredAh = usableCapacity / systemV;

    // Typical battery capacities
    let batteryAh: number;
    switch (voltage) {
      case 12: batteryAh = 100; break; // Typical 12V battery
      case 24: batteryAh = 100; break; // Typical 24V battery  
      case 48: batteryAh = 100; break; // Typical 48V battery
      default: batteryAh = 100;
    }

    const numberOfBatteries = Math.ceil(requiredAh / batteryAh);
    const actualCapacity = numberOfBatteries * batteryAh * systemV; // Wh

    // Estimate costs (£ per kWh)
    let costPerKwh: number;
    switch (batteryType) {
      case "lithium": costPerKwh = 800; break;
      case "agm": costPerKwh = 300; break;
      case "gel": costPerKwh = 350; break;
      case "flooded": costPerKwh = 200; break;
      default: costPerKwh = 400;
    }

    const systemCost = (actualCapacity / 1000) * costPerKwh;

    // Estimate charging time (assuming C/10 charging rate)
    const chargingTime = batteryAh / 10; // hours

    setResult({
      requiredCapacity: requiredAh,
      usableCapacity: usableCapacity / 1000, // kWh
      batteryCapacity: actualCapacity / 1000, // kWh
      numberOfBatteries,
      systemCost,
      chargingTime
    });
  };

  const reset = () => {
    setDailyConsumption("");
    setBackupHours("");
    setBatteryVoltage("12");
    setBatteryType("lithium");
    setDepthOfDischarge("");
    setSystemVoltage("12");
    setInverterEfficiency("90");
    setResult(null);
  };

  // Set default DOD when battery type changes
  const handleBatteryTypeChange = (value: string) => {
    setBatteryType(value);
    switch (value) {
      case "lithium": setDepthOfDischarge("90"); break;
      case "agm": setDepthOfDischarge("50"); break;
      case "gel": setDepthOfDischarge("50"); break;
      case "flooded": setDepthOfDischarge("50"); break;
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            label="Daily Consumption"
            type="number"
            value={dailyConsumption}
            onChange={(e) => setDailyConsumption(e.target.value)}
            placeholder="e.g., 20"
            unit="kWh"
          />
          <MobileInput
            label="Required Backup Hours"
            type="number"
            value={backupHours}
            onChange={(e) => setBackupHours(e.target.value)}
            placeholder="e.g., 12"
            unit="hours"
          />
          <MobileSelect value={batteryType} onValueChange={handleBatteryTypeChange}>
            <MobileSelectTrigger label="Battery Type">
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
          <MobileInput
            label="Depth of Discharge"
            type="number"
            value={depthOfDischarge}
            onChange={(e) => setDepthOfDischarge(e.target.value)}
            placeholder="Auto-set by battery type"
            unit="%"
          />
          <MobileInput
            label="Inverter Efficiency"
            type="number"
            value={inverterEfficiency}
            onChange={(e) => setInverterEfficiency(e.target.value)}
            placeholder="e.g., 90"
            unit="%"
          />
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
          <div className="mt-6 p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-3">Battery Storage Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>Required capacity: <span className="text-elec-yellow font-medium">{result.requiredCapacity?.toFixed(0)} Ah</span></p>
                <p>Usable capacity: <span className="text-elec-yellow font-medium">{result.usableCapacity?.toFixed(1)} kWh</span></p>
                <p>Battery bank capacity: <span className="text-elec-yellow font-medium">{result.batteryCapacity?.toFixed(1)} kWh</span></p>
              </div>
              <div>
                <p>Number of batteries: <span className="text-elec-yellow font-medium">{result.numberOfBatteries}</span></p>
                <p>Estimated cost: <span className="text-elec-yellow font-medium">£{result.systemCost?.toLocaleString()}</span></p>
                <p>Charging time: <span className="text-elec-yellow font-medium">{result.chargingTime?.toFixed(1)} hours</span></p>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <Battery className="h-4 w-4" />
          <AlertDescription>
            Lithium batteries offer higher DOD but cost more. Lead acid batteries are cheaper but have lower DOD.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default BatteryStorageCalculator;