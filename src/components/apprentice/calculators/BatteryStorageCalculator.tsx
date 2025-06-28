
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Battery, RotateCcw, Calculator } from "lucide-react";
import { toast } from "sonner";

const BatteryStorageCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [depthOfDischarge, setDepthOfDischarge] = useState("80");
  const [systemEfficiency, setSystemEfficiency] = useState("90");
  const [autonomyDays, setAutonomyDays] = useState("2");
  const [batteryType, setBatteryType] = useState("");
  const [result, setResult] = useState<any>(null);

  const batteryTypes = {
    "lithium-ion": { efficiency: 95, cycles: 6000, voltage: 3.7 },
    "lead-acid": { efficiency: 85, cycles: 1500, voltage: 2.0 },
    "agm": { efficiency: 88, cycles: 800, voltage: 2.0 },
    "gel": { efficiency: 87, cycles: 1200, voltage: 2.0 }
  };

  const calculateBatterySystem = () => {
    const usage = parseFloat(dailyUsage);
    const capacity = parseFloat(batteryCapacity);
    const dod = parseFloat(depthOfDischarge) / 100;
    const efficiency = parseFloat(systemEfficiency) / 100;
    const days = parseFloat(autonomyDays);

    if (!usage || !capacity || !batteryType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const batterySpec = batteryTypes[batteryType as keyof typeof batteryTypes];
    
    // Required battery capacity considering DOD and efficiency
    const requiredCapacity = (usage * days) / (dod * efficiency);
    
    // Number of batteries needed
    const batteriesNeeded = Math.ceil(requiredCapacity / capacity);
    
    // Actual system capacity
    const actualCapacity = batteriesNeeded * capacity;
    
    // Useable capacity
    const useableCapacity = actualCapacity * dod;
    
    // Runtime calculation
    const runtime = useableCapacity / usage;
    
    // Charging requirements (assuming 5 hours charge time)
    const chargingCurrent = capacity / 5;
    const chargingPower = (chargingCurrent * batterySpec.voltage * batteriesNeeded) / 1000;

    setResult({
      requiredCapacity: requiredCapacity.toFixed(1),
      batteriesNeeded,
      actualCapacity: actualCapacity.toFixed(1),
      useableCapacity: useableCapacity.toFixed(1),
      runtime: runtime.toFixed(1),
      chargingCurrent: chargingCurrent.toFixed(1),
      chargingPower: chargingPower.toFixed(2),
      batterySpec,
      totalCost: batteriesNeeded * 150 // Rough estimate per battery
    });

    toast.success("Battery system calculated successfully!");
  };

  const resetCalculator = () => {
    setDailyUsage("");
    setBatteryCapacity("");
    setDepthOfDischarge("80");
    setSystemEfficiency("90");
    setAutonomyDays("2");
    setBatteryType("");
    setResult(null);
    toast.info("Calculator reset");
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Battery Storage System Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate battery requirements for energy storage systems
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="daily-usage">Daily Energy Usage (kWh) *</Label>
              <Input
                id="daily-usage"
                type="number"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(e.target.value)}
                placeholder="e.g., 25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="battery-capacity">Individual Battery Capacity (Ah) *</Label>
              <Input
                id="battery-capacity"
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
                placeholder="e.g., 100"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="battery-type">Battery Type *</Label>
              <Select value={batteryType} onValueChange={setBatteryType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select battery type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="lithium-ion">Lithium-Ion</SelectItem>
                  <SelectItem value="lead-acid">Lead-Acid</SelectItem>
                  <SelectItem value="agm">AGM</SelectItem>
                  <SelectItem value="gel">Gel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="depth-discharge">Depth of Discharge (%)</Label>
              <Input
                id="depth-discharge"
                type="number"
                value={depthOfDischarge}
                onChange={(e) => setDepthOfDischarge(e.target.value)}
                placeholder="80"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="system-efficiency">System Efficiency (%)</Label>
              <Input
                id="system-efficiency"
                type="number"
                value={systemEfficiency}
                onChange={(e) => setSystemEfficiency(e.target.value)}
                placeholder="90"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="autonomy-days">Days of Autonomy</Label>
              <Input
                id="autonomy-days"
                type="number"
                value={autonomyDays}
                onChange={(e) => setAutonomyDays(e.target.value)}
                placeholder="2"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateBatterySystem} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Battery System Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Required Capacity:</span>
                      <p className="font-mono font-bold">{result.requiredCapacity} Ah</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Batteries Needed:</span>
                      <p className="font-mono font-bold">{result.batteriesNeeded} units</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Capacity:</span>
                      <p className="font-mono font-bold">{result.actualCapacity} Ah</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Useable Capacity:</span>
                      <p className="font-mono font-bold">{result.useableCapacity} Ah</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Runtime:</span>
                      <p className="font-mono font-bold">{result.runtime} hours</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Charging Current:</span>
                      <p className="font-mono font-bold">{result.chargingCurrent} A</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Charging Power:</span>
                      <p className="font-mono font-bold">{result.chargingPower} kW</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <p className="font-mono font-bold">£{result.totalCost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Battery className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter battery specifications to calculate system requirements</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryStorageCalculator;
