import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";

interface OffGridResult {
  requiredSolarCapacity: number;
  requiredBatteryCapacity: number;
  numberOfPanels: number;
  numberOfBatteries: number;
  inverterSize: number;
  chargeControllerSize: number;
  systemCost: number;
  dailyEnergyBalance: number;
  autonomyDays: number;
}

export function OffGridSystemCalculator() {
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [autonomyDays, setAutonomyDays] = useState('3');
  const [systemVoltage, setSystemVoltage] = useState('');
  const [panelWattage, setPanelWattage] = useState('400');
  const [batteryCapacity, setBatteryCapacity] = useState('100');
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [depthOfDischarge, setDepthOfDischarge] = useState('80');
  const [systemEfficiency, setSystemEfficiency] = useState('85');
  const [result, setResult] = useState<OffGridResult | null>(null);

  const voltageOptions = [
    { value: '12', label: '12V DC' },
    { value: '24', label: '24V DC' },
    { value: '48', label: '48V DC' }
  ];

  const calculateOffGrid = () => {
    const consumption = parseFloat(dailyConsumption);
    const sunHours = parseFloat(peakSunHours);
    const autonomy = parseFloat(autonomyDays);
    const voltage = parseFloat(systemVoltage);
    const panelWatt = parseFloat(panelWattage);
    const battCap = parseFloat(batteryCapacity);
    const battVolt = parseFloat(batteryVoltage);
    const dod = parseFloat(depthOfDischarge) / 100;
    const efficiency = parseFloat(systemEfficiency) / 100;

    if (!consumption || !sunHours || !autonomy || !voltage || !panelWatt || !battCap || !battVolt || !dod || !efficiency) {
      return;
    }

    // Calculate required solar capacity (including losses and inefficiencies)
    const requiredSolarCapacity = (consumption / sunHours) / efficiency;
    const numberOfPanels = Math.ceil(requiredSolarCapacity * 1000 / panelWatt);

    // Calculate battery capacity for autonomy
    const requiredBatteryCapacity = (consumption * autonomy) / (voltage * dod);
    const usableBatteryCapacity = battCap * dod;
    const numberOfBatteries = Math.ceil(requiredBatteryCapacity / usableBatteryCapacity);

    // Calculate component sizes
    const inverterSize = consumption * 1.25; // 25% oversizing
    const chargeControllerSize = (numberOfPanels * panelWatt) * 1.25 / voltage; // 25% oversizing

    // Estimate system cost (rough estimates in £)
    const panelCost = numberOfPanels * (panelWatt * 0.5); // £0.50/W
    const batteryCost = numberOfBatteries * (battCap * battVolt * 1.5); // Rough estimate
    const inverterCost = inverterSize * 100; // £100/kW
    const controllerCost = chargeControllerSize * 50; // £50/A
    const miscCost = (panelCost + batteryCost + inverterCost + controllerCost) * 0.3; // 30% for wiring, mounting etc.
    const systemCost = panelCost + batteryCost + inverterCost + controllerCost + miscCost;

    // Energy balance
    const actualSolarGeneration = numberOfPanels * panelWatt * sunHours / 1000;
    const dailyEnergyBalance = actualSolarGeneration - consumption;

    setResult({
      requiredSolarCapacity,
      requiredBatteryCapacity,
      numberOfPanels,
      numberOfBatteries,
      inverterSize,
      chargeControllerSize,
      systemCost,
      dailyEnergyBalance,
      autonomyDays: autonomy
    });
  };

  const reset = () => {
    setDailyConsumption('');
    setPeakSunHours('3.5');
    setAutonomyDays('3');
    setSystemVoltage('');
    setPanelWattage('400');
    setBatteryCapacity('100');
    setBatteryVoltage('12');
    setDepthOfDischarge('80');
    setSystemEfficiency('85');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Off-Grid System Calculator</CardTitle>
        <CardDescription>
          Design a complete off-grid solar power system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            type="number"
            label="Daily Energy Consumption"
            placeholder="Enter daily consumption"
            value={dailyConsumption}
            onChange={(e) => setDailyConsumption(e.target.value)}
            unit="kWh"
            step="0.1"
          />
          
          <MobileInput
            type="number"
            label="Peak Sun Hours"
            placeholder="Enter peak sun hours"
            value={peakSunHours}
            onChange={(e) => setPeakSunHours(e.target.value)}
            unit="hrs/day"
            step="0.1"
          />
          
          <MobileInput
            type="number"
            label="Autonomy Days"
            placeholder="Days without sun"
            value={autonomyDays}
            onChange={(e) => setAutonomyDays(e.target.value)}
            unit="days"
            step="1"
          />
          
          <MobileSelect
            label="System Voltage"
            placeholder="Select system voltage"
            value={systemVoltage}
            onValueChange={setSystemVoltage}
            options={voltageOptions}
          />
          
          <MobileInput
            type="number"
            label="Solar Panel Wattage"
            placeholder="Enter panel wattage"
            value={panelWattage}
            onChange={(e) => setPanelWattage(e.target.value)}
            unit="W"
            step="10"
          />
          
          <MobileInput
            type="number"
            label="Battery Capacity"
            placeholder="Enter battery capacity"
            value={batteryCapacity}
            onChange={(e) => setBatteryCapacity(e.target.value)}
            unit="Ah"
            step="10"
          />
          
          <MobileInput
            type="number"
            label="Battery Voltage"
            placeholder="Enter battery voltage"
            value={batteryVoltage}
            onChange={(e) => setBatteryVoltage(e.target.value)}
            unit="V"
            step="1"
          />
          
          <MobileInput
            type="number"
            label="Depth of Discharge"
            placeholder="Enter DOD"
            value={depthOfDischarge}
            onChange={(e) => setDepthOfDischarge(e.target.value)}
            unit="%"
            step="5"
          />
          
          <MobileInput
            type="number"
            label="System Efficiency"
            placeholder="Enter system efficiency"
            value={systemEfficiency}
            onChange={(e) => setSystemEfficiency(e.target.value)}
            unit="%"
            step="1"
          />
        </div>

        <div className="flex gap-2">
          <MobileButton 
            onClick={calculateOffGrid} 
            variant="elec"
            size="wide"
            className="flex-1"
          >
            Design Off-Grid System
          </MobileButton>
          <MobileButton 
            onClick={reset} 
            variant="outline" 
            size="default"
          >
            Reset
          </MobileButton>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20">
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Off-Grid System Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Required Solar Capacity:</span>
                <span className="float-right">{result.requiredSolarCapacity.toFixed(2)} kW</span>
              </div>
              <div>
                <span className="font-medium">Number of Panels:</span>
                <span className="float-right">{result.numberOfPanels} panels</span>
              </div>
              <div>
                <span className="font-medium">Required Battery Capacity:</span>
                <span className="float-right">{result.requiredBatteryCapacity.toFixed(0)} Ah</span>
              </div>
              <div>
                <span className="font-medium">Number of Batteries:</span>
                <span className="float-right">{result.numberOfBatteries} batteries</span>
              </div>
              <div>
                <span className="font-medium">Inverter Size:</span>
                <span className="float-right">{result.inverterSize.toFixed(1)} kW</span>
              </div>
              <div>
                <span className="font-medium">Charge Controller:</span>
                <span className="float-right">{result.chargeControllerSize.toFixed(0)} A</span>
              </div>
              <div>
                <span className="font-medium">Daily Energy Balance:</span>
                <span className="float-right">{result.dailyEnergyBalance.toFixed(1)} kWh</span>
              </div>
              <div>
                <span className="font-medium">Autonomy Period:</span>
                <span className="float-right">{result.autonomyDays} days</span>
              </div>
              <div className="col-span-2 font-semibold border-t pt-2">
                <span>Estimated System Cost:</span>
                <span className="float-right text-elec-yellow">£{result.systemCost.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <AlertDescription>
            Off-grid systems require careful design considering load profiles, seasonal variations, 
            and component sizing. Include adequate safety margins for cloudy periods. Consider 
            backup power options and regular maintenance requirements. Professional design recommended 
            for critical applications.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default OffGridSystemCalculator;