
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Car, Zap, Home } from "lucide-react";

const EVChargingCalculator = () => {
  const [chargerType, setChargerType] = useState("");
  const [numberOfChargers, setNumberOfChargers] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [supplyType, setSupplyType] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateEVCharging = () => {
    if (!chargerType || !numberOfChargers || !batteryCapacity || !dailyUsage || !supplyType) {
      return;
    }

    const numChargers = parseInt(numberOfChargers);
    const batteryKwh = parseFloat(batteryCapacity);
    const dailyKm = parseFloat(dailyUsage);

    // Charger specifications
    const chargerSpecs = {
      "3kw-single": { power: 3.7, voltage: 230, phases: 1, current: 16, efficiency: 0.85, cost: 500 },
      "7kw-single": { power: 7.4, voltage: 230, phases: 1, current: 32, efficiency: 0.90, cost: 800 },
      "11kw-three": { power: 11, voltage: 400, phases: 3, current: 16, efficiency: 0.92, cost: 1200 },
      "22kw-three": { power: 22, voltage: 400, phases: 3, current: 32, efficiency: 0.95, cost: 2000 }
    };

    const specs = chargerSpecs[chargerType as keyof typeof chargerSpecs];
    
    // Vehicle consumption (typical 3-4 miles per kWh)
    const consumptionKwhPer100km = 18; // kWh per 100km
    const dailyEnergyNeeded = (dailyKm * consumptionKwhPer100km) / 100;
    
    // Charging calculations
    const totalChargerPower = specs.power * numChargers;
    const chargingTime = batteryKwh / specs.power; // Hours for full charge
    const dailyChargingTime = dailyEnergyNeeded / specs.power;
    
    // Supply requirements
    const maxCurrent = specs.current * numChargers;
    const diversityFactor = numChargers > 1 ? 0.8 : 1.0; // Diversity for multiple chargers
    const designCurrent = maxCurrent * diversityFactor;
    
    // Cable sizing (simplified)
    const cableSize = designCurrent <= 20 ? "2.5mm²" : 
                     designCurrent <= 27 ? "4mm²" : 
                     designCurrent <= 37 ? "6mm²" : 
                     designCurrent <= 50 ? "10mm²" : "16mm²";
    
    // Protection
    const mcbRating = Math.ceil(designCurrent / 5) * 5; // Round up to nearest 5A
    const earthLeakageRating = mcbRating <= 32 ? "30mA" : "100mA";
    
    // Cost analysis
    const equipmentCost = specs.cost * numChargers;
    const installationCost = equipmentCost * 0.5; // 50% installation
    const totalCost = equipmentCost + installationCost;
    
    // Running cost (assuming 30p/kWh domestic, 15p/kWh off-peak)
    const annualEnergyConsumption = dailyEnergyNeeded * 365;
    const annualCostStandard = annualEnergyConsumption * 0.30;
    const annualCostOffPeak = annualEnergyConsumption * 0.15;
    
    // Supply upgrade requirements
    const currentSupplyCapacity = supplyType === "single-60a" ? 60 : 
                                 supplyType === "single-80a" ? 80 :
                                 supplyType === "three-60a" ? 60 : 100;
    
    const supplyUpgradeNeeded = designCurrent > (currentSupplyCapacity * 0.8);

    setResults({
      totalChargerPower: totalChargerPower.toFixed(1),
      chargingTime: chargingTime.toFixed(1),
      dailyChargingTime: dailyChargingTime.toFixed(1),
      dailyEnergyNeeded: dailyEnergyNeeded.toFixed(1),
      maxCurrent: maxCurrent.toFixed(1),
      designCurrent: designCurrent.toFixed(1),
      cableSize,
      mcbRating,
      earthLeakageRating,
      equipmentCost: equipmentCost.toFixed(0),
      totalCost: totalCost.toFixed(0),
      annualEnergyConsumption: annualEnergyConsumption.toFixed(0),
      annualCostStandard: annualCostStandard.toFixed(0),
      annualCostOffPeak: annualCostOffPeak.toFixed(0),
      supplyUpgradeNeeded,
      chargerSpecs: specs
    });
  };

  const resetCalculator = () => {
    setChargerType("");
    setNumberOfChargers("");
    setBatteryCapacity("");
    setDailyUsage("");
    setSupplyType("");
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Car className="h-5 w-5" />
            EV Charging Station Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="charger-type">Charger Type</Label>
              <Select value={chargerType} onValueChange={setChargerType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select charger type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="3kw-single">3.7kW Single Phase (16A)</SelectItem>
                  <SelectItem value="7kw-single">7.4kW Single Phase (32A)</SelectItem>
                  <SelectItem value="11kw-three">11kW Three Phase (16A)</SelectItem>
                  <SelectItem value="22kw-three">22kW Three Phase (32A)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="number-chargers">Number of Charging Points</Label>
              <Input
                id="number-chargers"
                type="number"
                min="1"
                max="10"
                value={numberOfChargers}
                onChange={(e) => setNumberOfChargers(e.target.value)}
                placeholder="e.g., 1"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="battery-capacity">Vehicle Battery Capacity (kWh)</Label>
              <Input
                id="battery-capacity"
                type="number"
                step="1"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
                placeholder="e.g., 64 (typical range: 40-100)"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="daily-usage">Daily Driving Distance (km)</Label>
              <Input
                id="daily-usage"
                type="number"
                step="1"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(e.target.value)}
                placeholder="e.g., 50"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="supply-type">Existing Electrical Supply</Label>
              <Select value={supplyType} onValueChange={setSupplyType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="single-60a">Single Phase 60A</SelectItem>
                  <SelectItem value="single-80a">Single Phase 80A</SelectItem>
                  <SelectItem value="three-60a">Three Phase 60A</SelectItem>
                  <SelectItem value="three-100a">Three Phase 100A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateEVCharging} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate EV Charging Requirements
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
                <Zap className="h-5 w-5" />
                Electrical Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-200">Total Charger Power:</span>
                <span className="text-green-300 font-mono">{results.totalChargerPower} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Maximum Current:</span>
                <span className="text-green-300 font-mono">{results.maxCurrent} A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Design Current:</span>
                <span className="text-green-300 font-mono">{results.designCurrent} A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Cable Size Required:</span>
                <span className="text-green-300 font-mono">{results.cableSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">MCB Rating:</span>
                <span className="text-green-300 font-mono">{results.mcbRating} A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">RCD Rating:</span>
                <span className="text-green-300 font-mono">{results.earthLeakageRating}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Car className="h-5 w-5" />
                Charging Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Full Charge Time:</span>
                <span className="text-blue-300 font-mono">{results.chargingTime} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Daily Charging Time:</span>
                <span className="text-blue-300 font-mono">{results.dailyChargingTime} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Daily Energy Need:</span>
                <span className="text-blue-300 font-mono">{results.dailyEnergyNeeded} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Annual Consumption:</span>
                <span className="text-blue-300 font-mono">{results.annualEnergyConsumption} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Annual Cost (Standard):</span>
                <span className="text-blue-300 font-mono">£{results.annualCostStandard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Annual Cost (Off-Peak):</span>
                <span className="text-blue-300 font-mono">£{results.annualCostOffPeak}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Installation Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-amber-200">Equipment Cost:</span>
                <span className="text-amber-300 font-mono">£{results.equipmentCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Installation Cost:</span>
                <span className="text-amber-300 font-mono">£{(results.totalCost - results.equipmentCost).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Total Project Cost:</span>
                <span className="text-amber-300 font-mono">£{results.totalCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Supply Upgrade Needed:</span>
                <span className={`font-mono ${results.supplyUpgradeNeeded ? 'text-red-300' : 'text-green-300'}`}>
                  {results.supplyUpgradeNeeded ? "Yes" : "No"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="text-purple-300">Installation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-purple-200">
                <p>• All EV charging points require dedicated RCD protection</p>
                <p>• Installation must comply with BS 7671 and IET Code of Practice</p>
                <p>• Consider off-peak electricity tariffs for cost savings</p>
                <p>• Supply upgrade costs not included in estimate</p>
                <p>• Building regulations notification may be required</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EVChargingCalculator;
