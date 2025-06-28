
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Battery, Zap, Clock, PoundSterling } from "lucide-react";

const BatteryStorageCalculator = () => {
  const [inputs, setInputs] = useState({
    dailyEnergyUsage: "",
    backupHours: "",
    systemVoltage: "12",
    batteryType: "lithium",
    depthOfDischarge: "80",
    efficiency: "95"
  });

  const [results, setResults] = useState<{
    batteryCapacityAh: number;
    batteryCapacitykWh: number;
    numberOfBatteries: number;
    estimatedCost: number;
    backupTime: number;
  } | null>(null);

  const calculateBatteryStorage = () => {
    const dailyUsage = parseFloat(inputs.dailyEnergyUsage);
    const backupHours = parseFloat(inputs.backupHours);
    const voltage = parseFloat(inputs.systemVoltage);
    const dod = parseFloat(inputs.depthOfDischarge) / 100;
    const efficiency = parseFloat(inputs.efficiency) / 100;

    if (!dailyUsage || !backupHours || !voltage) return;

    // Calculate energy needed for backup period
    const energyNeeded = (dailyUsage / 24) * backupHours; // kWh
    
    // Account for depth of discharge and efficiency
    const actualEnergyNeeded = energyNeeded / (dod * efficiency);
    
    // Convert to Ah
    const batteryCapacityAh = (actualEnergyNeeded * 1000) / voltage;
    
    // Standard battery sizes (Ah)
    const standardSizes = [100, 200, 300, 400, 500, 1000];
    const selectedSize = standardSizes.find(size => size >= batteryCapacityAh) || standardSizes[standardSizes.length - 1];
    
    const numberOfBatteries = Math.ceil(batteryCapacityAh / selectedSize);
    
    // Cost estimation (£/kWh)
    const costPerKwh = inputs.batteryType === "lithium" ? 800 : 400;
    const estimatedCost = actualEnergyNeeded * costPerKwh;
    
    // Actual backup time with selected batteries
    const actualCapacity = numberOfBatteries * selectedSize * voltage / 1000; // kWh
    const usableCapacity = actualCapacity * dod * efficiency;
    const backupTime = (usableCapacity / (dailyUsage / 24));

    setResults({
      batteryCapacityAh: batteryCapacityAh,
      batteryCapacitykWh: actualEnergyNeeded,
      numberOfBatteries,
      estimatedCost,
      backupTime
    });
  };

  const resetCalculator = () => {
    setInputs({
      dailyEnergyUsage: "",
      backupHours: "",
      systemVoltage: "12",
      batteryType: "lithium",
      depthOfDischarge: "80",
      efficiency: "95"
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Battery className="h-5 w-5" />
            Battery Storage System Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dailyEnergyUsage">Daily Energy Usage (kWh)</Label>
              <Input
                id="dailyEnergyUsage"
                type="number"
                value={inputs.dailyEnergyUsage}
                onChange={(e) => setInputs({...inputs, dailyEnergyUsage: e.target.value})}
                placeholder="Enter daily kWh usage"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="backupHours">Required Backup Time (hours)</Label>
              <Input
                id="backupHours"
                type="number"
                value={inputs.backupHours}
                onChange={(e) => setInputs({...inputs, backupHours: e.target.value})}
                placeholder="Hours of backup needed"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="systemVoltage">System Voltage</Label>
              <Select value={inputs.systemVoltage} onValueChange={(value) => setInputs({...inputs, systemVoltage: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="12">12V</SelectItem>
                  <SelectItem value="24">24V</SelectItem>
                  <SelectItem value="48">48V</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="batteryType">Battery Type</Label>
              <Select value={inputs.batteryType} onValueChange={(value) => setInputs({...inputs, batteryType: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="lithium">Lithium-ion</SelectItem>
                  <SelectItem value="lead-acid">Lead Acid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="depthOfDischarge">Depth of Discharge (%)</Label>
              <Select value={inputs.depthOfDischarge} onValueChange={(value) => setInputs({...inputs, depthOfDischarge: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="50">50% (Lead Acid)</SelectItem>
                  <SelectItem value="80">80% (Lithium)</SelectItem>
                  <SelectItem value="90">90% (High-end Lithium)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="efficiency">System Efficiency (%)</Label>
              <Input
                id="efficiency"
                type="number"
                value={inputs.efficiency}
                onChange={(e) => setInputs({...inputs, efficiency: e.target.value})}
                placeholder="System efficiency"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateBatteryStorage} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="border-elec-yellow/20">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Battery Capacity Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Capacity (Ah):</span>
                <span className="text-elec-yellow font-semibold">{results.batteryCapacityAh.toFixed(0)} Ah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Capacity (kWh):</span>
                <span className="text-elec-yellow font-semibold">{results.batteryCapacitykWh.toFixed(1)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Number of Batteries:</span>
                <span className="text-elec-yellow font-semibold">{results.numberOfBatteries}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <PoundSterling className="h-5 w-5" />
                Cost & Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Estimated Cost:</span>
                <span className="text-elec-yellow font-semibold">£{results.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Actual Backup Time:</span>
                <span className="text-elec-yellow font-semibold">{results.backupTime.toFixed(1)} hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300">Battery Storage Considerations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-200">
          <div className="space-y-3">
            <h4 className="font-semibold">Battery Types:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Lithium-ion:</strong> Higher efficiency, longer lifespan, 80-90% DoD</li>
              <li>• <strong>Lead Acid:</strong> Lower cost, shorter lifespan, 50% DoD maximum</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Installation Tips:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Consider temperature effects on capacity</li>
              <li>• Include battery management system (BMS)</li>
              <li>• Plan for ventilation and safety equipment</li>
              <li>• Factor in inverter efficiency losses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatteryStorageCalculator;
