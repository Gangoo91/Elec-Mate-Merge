
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";

const PowerConsumptionCalculator = () => {
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [electricityRate, setElectricityRate] = useState("");
  const [timeUnit, setTimeUnit] = useState("daily");
  const [result, setResult] = useState<{
    energyConsumed: number;
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
    carbonFootprint: number;
  } | null>(null);

  const calculatePowerConsumption = () => {
    if (!power || !hours) return;

    const powerKW = parseFloat(power) / 1000; // Convert W to kW
    const hoursPerDay = parseFloat(hours);
    const daysInput = parseFloat(days) || 1;
    const rate = parseFloat(electricityRate) || 0.30; // Default UK rate £0.30/kWh

    let dailyEnergyKWh: number;
    
    switch (timeUnit) {
      case "daily":
        dailyEnergyKWh = powerKW * hoursPerDay;
        break;
      case "weekly":
        dailyEnergyKWh = (powerKW * hoursPerDay) / 7;
        break;
      case "monthly":
        dailyEnergyKWh = (powerKW * hoursPerDay) / 30;
        break;
      default:
        dailyEnergyKWh = powerKW * hoursPerDay;
    }

    const dailyCost = dailyEnergyKWh * rate;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    
    // UK grid carbon intensity ~233g CO2/kWh
    const carbonFootprint = dailyEnergyKWh * 0.233 * 365; // kg CO2/year

    setResult({
      energyConsumed: dailyEnergyKWh,
      dailyCost,
      monthlyCost,
      yearlyCost,
      carbonFootprint
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Consumption Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate energy consumption, costs, and carbon footprint over time
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="power">Power Rating (W)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g. 100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours of Operation</Label>
              <Input
                id="hours"
                type="number"
                step="0.1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 8"
              />
            </div>

            <div className="space-y-2">
              <Label>Time Period</Label>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Hours per Day</SelectItem>
                  <SelectItem value="weekly">Hours per Week</SelectItem>
                  <SelectItem value="monthly">Hours per Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="electricity-rate">Electricity Rate (£/kWh)</Label>
              <Input
                id="electricity-rate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
                placeholder="e.g. 0.30 (UK average)"
              />
            </div>

            <Button onClick={calculatePowerConsumption} className="w-full">
              Calculate Power Consumption
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Consumption Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-green-200 text-sm">Daily Energy Consumption</div>
                    <div className="text-green-300 font-mono text-2xl font-bold">
                      {result.energyConsumed.toFixed(2)} kWh/day
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-200">Daily Cost</div>
                      <div className="text-green-300 font-mono font-bold">£{result.dailyCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-green-200">Monthly Cost</div>
                      <div className="text-green-300 font-mono font-bold">£{result.monthlyCost.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-200">Annual Cost:</span>
                      <span className="text-green-300 font-mono font-bold">£{result.yearlyCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-200">Annual CO₂:</span>
                      <span className="text-green-300 font-mono font-bold">{result.carbonFootprint.toFixed(1)} kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter power rating and usage hours to calculate consumption</p>
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

export default PowerConsumptionCalculator;
