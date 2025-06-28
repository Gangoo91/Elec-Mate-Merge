
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Battery, Zap, Home } from "lucide-react";

const BatteryStorageCalculator = () => {
  const [solarCapacity, setSolarCapacity] = useState("");
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [peakDemand, setPeakDemand] = useState("");
  const [backupHours, setBackupHours] = useState("");
  const [batteryType, setBatteryType] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateBatteryStorage = () => {
    if (!solarCapacity || !dailyConsumption || !peakDemand || !backupHours || !batteryType) {
      return;
    }

    const solarKw = parseFloat(solarCapacity);
    const dailyKwh = parseFloat(dailyConsumption);
    const peakKw = parseFloat(peakDemand);
    const backupTime = parseFloat(backupHours);

    // Battery sizing calculations
    const usableBatteryCapacity = dailyKwh * 0.8; // 80% daily consumption coverage
    const backupCapacity = peakKw * backupTime;
    const recommendedCapacity = Math.max(usableBatteryCapacity, backupCapacity);

    // Battery specifications based on type
    const batterySpecs = {
      "lithium-ion": { efficiency: 0.95, dod: 0.9, cycles: 6000, costPerKwh: 800 },
      "lifepo4": { efficiency: 0.98, dod: 0.95, cycles: 10000, costPerKwh: 1000 },
      "lead-acid": { efficiency: 0.85, dod: 0.5, cycles: 1500, costPerKwh: 300 }
    };

    const specs = batterySpecs[batteryType as keyof typeof batterySpecs];
    const actualCapacity = recommendedCapacity / specs.dod;
    const estimatedCost = actualCapacity * specs.costPerKwh;

    // Self-consumption and savings
    const dailySolarGeneration = solarKw * 4; // Average 4 hours peak sun
    const excessSolar = Math.max(0, dailySolarGeneration - dailyKwh);
    const storedEnergy = Math.min(excessSolar, recommendedCapacity);
    const selfConsumption = ((dailyKwh - excessSolar + storedEnergy) / dailyKwh) * 100;

    setResults({
      recommendedCapacity: recommendedCapacity.toFixed(1),
      actualCapacity: actualCapacity.toFixed(1),
      estimatedCost: estimatedCost.toFixed(0),
      batterySpecs: specs,
      selfConsumption: selfConsumption.toFixed(1),
      storedEnergy: storedEnergy.toFixed(1),
      backupTime: backupTime,
      paybackPeriod: (estimatedCost / (storedEnergy * 365 * 0.25)).toFixed(1) // Assuming 25p/kWh savings
    });
  };

  const resetCalculator = () => {
    setSolarCapacity("");
    setDailyConsumption("");
    setPeakDemand("");
    setBackupHours("");
    setBatteryType("");
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Battery className="h-5 w-5" />
            Battery Storage System Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="solar-capacity">Solar System Capacity (kW)</Label>
              <Input
                id="solar-capacity"
                type="number"
                step="0.1"
                value={solarCapacity}
                onChange={(e) => setSolarCapacity(e.target.value)}
                placeholder="e.g., 5.0"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="daily-consumption">Daily Energy Consumption (kWh)</Label>
              <Input
                id="daily-consumption"
                type="number"
                step="0.1"
                value={dailyConsumption}
                onChange={(e) => setDailyConsumption(e.target.value)}
                placeholder="e.g., 15.0"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="peak-demand">Peak Demand (kW)</Label>
              <Input
                id="peak-demand"
                type="number"
                step="0.1"
                value={peakDemand}
                onChange={(e) => setPeakDemand(e.target.value)}
                placeholder="e.g., 8.0"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="backup-hours">Required Backup Hours</Label>
              <Input
                id="backup-hours"
                type="number"
                step="0.5"
                value={backupHours}
                onChange={(e) => setBackupHours(e.target.value)}
                placeholder="e.g., 4.0"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="battery-type">Battery Technology</Label>
              <Select value={batteryType} onValueChange={setBatteryType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select battery type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="lithium-ion">Lithium-Ion (Standard)</SelectItem>
                  <SelectItem value="lifepo4">LiFePO4 (Premium)</SelectItem>
                  <SelectItem value="lead-acid">Lead-Acid (Budget)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateBatteryStorage} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Battery System
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="border-elec-yellow/20">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Battery Sizing Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-200">Recommended Usable Capacity:</span>
                <span className="text-green-300 font-mono">{results.recommendedCapacity} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Actual Battery Capacity:</span>
                <span className="text-green-300 font-mono">{results.actualCapacity} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Backup Duration:</span>
                <span className="text-green-300 font-mono">{results.backupTime} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Self-Consumption Rate:</span>
                <span className="text-green-300 font-mono">{results.selfConsumption}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Financial Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Estimated System Cost:</span>
                <span className="text-blue-300 font-mono">£{results.estimatedCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Daily Stored Energy:</span>
                <span className="text-blue-300 font-mono">{results.storedEnergy} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Estimated Payback:</span>
                <span className="text-blue-300 font-mono">{results.paybackPeriod} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Battery Cycles:</span>
                <span className="text-blue-300 font-mono">{results.batterySpecs.cycles.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Battery Technology Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-200">Efficiency</h4>
                  <p className="text-amber-100">{(results.batterySpecs.efficiency * 100).toFixed(0)}% round-trip efficiency</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-200">Depth of Discharge</h4>
                  <p className="text-amber-100">{(results.batterySpecs.dod * 100).toFixed(0)}% usable capacity</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-200">Lifespan</h4>
                  <p className="text-amber-100">{results.batterySpecs.cycles.toLocaleString()} cycles (~{Math.round(results.batterySpecs.cycles / 365)} years)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BatteryStorageCalculator;
