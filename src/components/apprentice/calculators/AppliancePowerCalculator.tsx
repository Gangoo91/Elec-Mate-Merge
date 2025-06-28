
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home } from "lucide-react";

const AppliancePowerCalculator = () => {
  const [applianceType, setApplianceType] = useState("");
  const [customPower, setCustomPower] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [usageHours, setUsageHours] = useState("");
  const [result, setResult] = useState<{
    totalPower: number;
    current: number;
    dailyEnergy: number;
    monthlyCost: number;
    circuitRecommendation: string;
  } | null>(null);

  const applianceData: { [key: string]: { power: number; name: string } } = {
    "kettle": { power: 3000, name: "Electric Kettle" },
    "microwave": { power: 800, name: "Microwave Oven" },
    "washing-machine": { power: 2200, name: "Washing Machine" },
    "dishwasher": { power: 1800, name: "Dishwasher" },
    "tumble-dryer": { power: 2500, name: "Tumble Dryer" },
    "electric-shower": { power: 8500, name: "Electric Shower" },
    "immersion-heater": { power: 3000, name: "Immersion Heater" },
    "electric-hob": { power: 7200, name: "Electric Hob" },
    "electric-oven": { power: 2500, name: "Electric Oven" },
    "hair-dryer": { power: 1200, name: "Hair Dryer" },
    "vacuum-cleaner": { power: 1400, name: "Vacuum Cleaner" },
    "iron": { power: 2400, name: "Steam Iron" },
    "tv": { power: 150, name: "TV (LED)" },
    "fridge-freezer": { power: 300, name: "Fridge Freezer" },
    "custom": { power: 0, name: "Custom Appliance" }
  };

  const calculateAppliancePower = () => {
    if (!applianceType && !customPower) return;

    let powerPerUnit: number;
    if (applianceType === "custom") {
      powerPerUnit = parseFloat(customPower) || 0;
    } else {
      powerPerUnit = applianceData[applianceType]?.power || 0;
    }

    const qty = parseInt(quantity) || 1;
    const totalPower = powerPerUnit * qty;
    const current = totalPower / 230; // Assuming 230V supply
    const hours = parseFloat(usageHours) || 0;
    const dailyEnergy = (totalPower * hours) / 1000; // kWh
    const monthlyCost = dailyEnergy * 30 * 0.30; // £0.30/kWh

    // Circuit recommendation based on total power
    let circuitRecommendation: string;
    if (totalPower <= 3000) {
      circuitRecommendation = "13A socket circuit or dedicated 16A circuit";
    } else if (totalPower <= 7200) {
      circuitRecommendation = "Dedicated 32A circuit required";
    } else if (totalPower <= 10000) {
      circuitRecommendation = "Dedicated 45A circuit required";
    } else {
      circuitRecommendation = "High power - specialist circuit design needed";
    }

    setResult({
      totalPower,
      current,
      dailyEnergy,
      monthlyCost,
      circuitRecommendation
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Appliance Power Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate power requirements and circuit needs for household appliances
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Appliance Type</Label>
              <Select value={applianceType} onValueChange={setApplianceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appliance type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(applianceData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name} {data.power > 0 && `(${data.power}W)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {applianceType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-power">Custom Power Rating (W)</Label>
                <Input
                  id="custom-power"
                  type="number"
                  value={customPower}
                  onChange={(e) => setCustomPower(e.target.value)}
                  placeholder="e.g. 1500"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usage-hours">Daily Usage Hours</Label>
              <Input
                id="usage-hours"
                type="number"
                step="0.1"
                value={usageHours}
                onChange={(e) => setUsageHours(e.target.value)}
                placeholder="e.g. 2.5"
              />
            </div>

            <Button onClick={calculateAppliancePower} className="w-full">
              Calculate Appliance Power
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg">Appliance Power Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-orange-200">Total Power</div>
                      <div className="text-orange-300 font-mono text-xl font-bold">{result.totalPower.toFixed(0)} W</div>
                    </div>
                    <div>
                      <div className="text-orange-200">Current Draw</div>
                      <div className="text-orange-300 font-mono text-xl font-bold">{result.current.toFixed(1)} A</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-200">Daily Energy:</span>
                      <span className="text-orange-300 font-mono font-bold">{result.dailyEnergy.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-200">Monthly Cost:</span>
                      <span className="text-orange-300 font-mono font-bold">£{result.monthlyCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Circuit Recommendation</div>
                    <div className="text-blue-200 text-xs mt-1">{result.circuitRecommendation}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Home className="h-8 w-8 mx-auto mb-2" />
                    <p>Select an appliance to calculate power requirements</p>
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

export default AppliancePowerCalculator;
