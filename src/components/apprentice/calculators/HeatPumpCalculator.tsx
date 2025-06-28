
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Thermometer, Zap, Home } from "lucide-react";

const HeatPumpCalculator = () => {
  const [floorArea, setFloorArea] = useState("");
  const [heatLoss, setHeatLoss] = useState("");
  const [designTemp, setDesignTemp] = useState("");
  const [heatPumpType, setHeatPumpType] = useState("");
  const [currentHeating, setCurrentHeating] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateHeatPump = () => {
    if (!floorArea || !heatLoss || !designTemp || !heatPumpType || !currentHeating) {
      return;
    }

    const area = parseFloat(floorArea);
    const heatLossWm2 = parseFloat(heatLoss);
    const designTempC = parseFloat(designTemp);
    
    // Heat pump specifications
    const heatPumpSpecs = {
      "air-source": { cop: 3.5, minTemp: -15, efficiency: 0.85, costPerKw: 1500 },
      "ground-source": { cop: 4.5, minTemp: -20, efficiency: 0.95, costPerKw: 2500 },
      "water-source": { cop: 5.0, minTemp: -10, efficiency: 0.98, costPerKw: 3000 }
    };

    const currentSystemEfficiency = {
      "gas-boiler": 0.85,
      "oil-boiler": 0.80,
      "electric-heating": 1.0,
      "lpg-boiler": 0.82
    };

    const specs = heatPumpSpecs[heatPumpType as keyof typeof heatPumpSpecs];
    const currentEff = currentSystemEfficiency[currentHeating as keyof typeof currentSystemEfficiency];

    // Calculate heat demand
    const maxHeatDemand = (area * heatLossWm2) / 1000; // kW
    const adjustedCOP = specs.cop * (1 - Math.max(0, (Math.abs(designTempC) - 5) / 100)); // Temperature adjustment

    // Sizing calculations
    const recommendedCapacity = maxHeatDemand * 1.2; // 20% safety margin
    const electricalLoad = recommendedCapacity / adjustedCOP;
    const annualHeatDemand = maxHeatDemand * 2100; // Typical heating hours
    const annualElectricity = annualHeatDemand / adjustedCOP;

    // Cost analysis
    const systemCost = recommendedCapacity * specs.costPerKw;
    const installationCost = systemCost * 0.3; // 30% installation
    const totalCost = systemCost + installationCost;

    // Running cost comparison (assuming 30p/kWh electricity, 6p/kWh gas)
    const heatPumpRunningCost = annualElectricity * 0.30;
    const currentRunningCost = (annualHeatDemand / currentEff) * (currentHeating === 'electric-heating' ? 0.30 : 0.06);
    const annualSavings = currentRunningCost - heatPumpRunningCost;

    setResults({
      maxHeatDemand: maxHeatDemand.toFixed(1),
      recommendedCapacity: recommendedCapacity.toFixed(1),
      electricalLoad: electricalLoad.toFixed(1),
      adjustedCOP: adjustedCOP.toFixed(2),
      annualElectricity: annualElectricity.toFixed(0),
      systemCost: systemCost.toFixed(0),
      totalCost: totalCost.toFixed(0),
      heatPumpRunningCost: heatPumpRunningCost.toFixed(0),
      currentRunningCost: currentRunningCost.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      paybackPeriod: annualSavings > 0 ? (totalCost / annualSavings).toFixed(1) : "N/A",
      heatPumpSpecs: specs
    });
  };

  const resetCalculator = () => {
    setFloorArea("");
    setHeatLoss("");
    setDesignTemp("");
    setHeatPumpType("");
    setCurrentHeating("");
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Heat Pump Load Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="floor-area">Floor Area (m²)</Label>
              <Input
                id="floor-area"
                type="number"
                step="1"
                value={floorArea}
                onChange={(e) => setFloorArea(e.target.value)}
                placeholder="e.g., 150"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="heat-loss">Heat Loss Rate (W/m²)</Label>
              <Input
                id="heat-loss"
                type="number"
                step="1"
                value={heatLoss}
                onChange={(e) => setHeatLoss(e.target.value)}
                placeholder="e.g., 50 (well insulated: 30-50, average: 60-80)"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="design-temp">Design Temperature (°C)</Label>
              <Input
                id="design-temp"
                type="number"
                step="1"
                value={designTemp}
                onChange={(e) => setDesignTemp(e.target.value)}
                placeholder="e.g., -3 (UK typical)"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="heat-pump-type">Heat Pump Type</Label>
              <Select value={heatPumpType} onValueChange={setHeatPumpType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select heat pump type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="air-source">Air Source Heat Pump</SelectItem>
                  <SelectItem value="ground-source">Ground Source Heat Pump</SelectItem>
                  <SelectItem value="water-source">Water Source Heat Pump</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="current-heating">Current Heating System</Label>
              <Select value={currentHeating} onValueChange={setCurrentHeating}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select current heating system" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="gas-boiler">Gas Boiler</SelectItem>
                  <SelectItem value="oil-boiler">Oil Boiler</SelectItem>
                  <SelectItem value="lpg-boiler">LPG Boiler</SelectItem>
                  <SelectItem value="electric-heating">Electric Heating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateHeatPump} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Heat Pump Load
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
                <Thermometer className="h-5 w-5" />
                Heat Pump Sizing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-200">Max Heat Demand:</span>
                <span className="text-green-300 font-mono">{results.maxHeatDemand} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Recommended Capacity:</span>
                <span className="text-green-300 font-mono">{results.recommendedCapacity} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Electrical Load:</span>
                <span className="text-green-300 font-mono">{results.electricalLoad} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Seasonal COP:</span>
                <span className="text-green-300 font-mono">{results.adjustedCOP}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Annual Electricity:</span>
                <span className="text-green-300 font-mono">{results.annualElectricity} kWh</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Cost Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">System Cost:</span>
                <span className="text-blue-300 font-mono">£{results.systemCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Total Installed Cost:</span>
                <span className="text-blue-300 font-mono">£{results.totalCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Annual Running Cost:</span>
                <span className="text-blue-300 font-mono">£{results.heatPumpRunningCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Current System Cost:</span>
                <span className="text-blue-300 font-mono">£{results.currentRunningCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Annual Savings:</span>
                <span className={`font-mono ${parseFloat(results.annualSavings) > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  £{results.annualSavings}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Payback Period:</span>
                <span className="text-blue-300 font-mono">{results.paybackPeriod} years</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <Home className="h-5 w-5" />
                Heat Pump Performance Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-200">Efficiency Factors</h4>
                  <ul className="space-y-1 text-amber-100">
                    <li>• COP varies with outdoor temperature</li>
                    <li>• Lower flow temperatures improve efficiency</li>
                    <li>• Proper insulation is critical</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-200">Installation Considerations</h4>
                  <ul className="space-y-1 text-amber-100">
                    <li>• May require electrical supply upgrade</li>
                    <li>• Consider radiator sizing requirements</li>
                    <li>• Planning permission may be required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HeatPumpCalculator;
