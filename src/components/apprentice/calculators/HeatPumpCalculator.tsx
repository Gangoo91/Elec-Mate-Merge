
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Thermometer, Zap, PoundSterling, Home } from "lucide-react";

const HeatPumpCalculator = () => {
  const [inputs, setInputs] = useState({
    houseSize: "",
    insulationLevel: "average",
    heatPumpType: "air-source",
    outdoorTemp: "-3",
    indoorTemp: "20",
    electricityRate: "0.30"
  });

  const [results, setResults] = useState<{
    heatLoad: number;
    cop: number;
    electricalPower: number;
    dailyCost: number;
    annualCost: number;
    carbonSavings: number;
  } | null>(null);

  const calculateHeatPump = () => {
    const size = parseFloat(inputs.houseSize);
    const outdoorTemp = parseFloat(inputs.outdoorTemp);
    const indoorTemp = parseFloat(inputs.indoorTemp);
    const electricityRate = parseFloat(inputs.electricityRate);

    if (!size || !electricityRate) return;

    // Heat loss calculation based on house size and insulation
    const insulationFactor = {
      'poor': 150,
      'average': 100,
      'good': 70,
      'excellent': 50
    };

    const baseLoss = insulationFactor[inputs.insulationLevel as keyof typeof insulationFactor];
    const tempDifference = indoorTemp - outdoorTemp;
    const heatLoad = (size * baseLoss * tempDifference) / 1000; // kW

    // COP calculation based on heat pump type and outdoor temperature
    let baseCOP = inputs.heatPumpType === 'air-source' ? 3.5 : 4.5;
    
    // COP decreases with lower outdoor temperatures
    const tempDerating = Math.max(0.5, 1 - (5 - outdoorTemp) * 0.05);
    const cop = baseCOP * tempDerating;

    const electricalPower = heatLoad / cop;
    const dailyCost = electricalPower * 12 * electricityRate; // 12 hours heating per day
    const annualCost = dailyCost * 200; // 200 heating days per year

    // Carbon savings vs gas boiler (kg CO2 per year)
    const gasCO2 = heatLoad * 12 * 200 * 0.185; // kg CO2 from gas
    const electricCO2 = electricalPower * 12 * 200 * 0.233; // kg CO2 from electricity
    const carbonSavings = Math.max(0, gasCO2 - electricCO2);

    setResults({
      heatLoad,
      cop,
      electricalPower,
      dailyCost,
      annualCost,
      carbonSavings
    });
  };

  const resetCalculator = () => {
    setInputs({
      houseSize: "",
      insulationLevel: "average",
      heatPumpType: "air-source",
      outdoorTemp: "-3",
      indoorTemp: "20",
      electricityRate: "0.30"
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Thermometer className="h-5 w-5" />
            Heat Pump Load Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="houseSize">House Size (m²)</Label>
              <Input
                id="houseSize"
                type="number"
                value={inputs.houseSize}
                onChange={(e) => setInputs({...inputs, houseSize: e.target.value})}
                placeholder="Floor area in square metres"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="insulationLevel">Insulation Level</Label>
              <Select value={inputs.insulationLevel} onValueChange={(value) => setInputs({...inputs, insulationLevel: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="poor">Poor (Pre-1920)</SelectItem>
                  <SelectItem value="average">Average (1920-1990)</SelectItem>
                  <SelectItem value="good">Good (Post-1990)</SelectItem>
                  <SelectItem value="excellent">Excellent (Passivhaus)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="heatPumpType">Heat Pump Type</Label>
              <Select value={inputs.heatPumpType} onValueChange={(value) => setInputs({...inputs, heatPumpType: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="air-source">Air Source Heat Pump</SelectItem>
                  <SelectItem value="ground-source">Ground Source Heat Pump</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="outdoorTemp">Design Outdoor Temp (°C)</Label>
              <Input
                id="outdoorTemp"
                type="number"
                value={inputs.outdoorTemp}
                onChange={(e) => setInputs({...inputs, outdoorTemp: e.target.value})}
                placeholder="Coldest expected temperature"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="indoorTemp">Indoor Target Temp (°C)</Label>
              <Input
                id="indoorTemp"
                type="number"
                value={inputs.indoorTemp}
                onChange={(e) => setInputs({...inputs, indoorTemp: e.target.value})}
                placeholder="Desired indoor temperature"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="electricityRate">Electricity Rate (£/kWh)</Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={inputs.electricityRate}
                onChange={(e) => setInputs({...inputs, electricityRate: e.target.value})}
                placeholder="Cost per kWh"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateHeatPump} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                <Zap className="h-5 w-5" />
                Heat Pump Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Heat Load Required:</span>
                <span className="text-elec-yellow font-semibold">{results.heatLoad.toFixed(1)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Coefficient of Performance:</span>
                <span className="text-elec-yellow font-semibold">{results.cop.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Electrical Power:</span>
                <span className="text-elec-yellow font-semibold">{results.electricalPower.toFixed(1)} kW</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <PoundSterling className="h-5 w-5" />
                Running Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Daily Cost:</span>
                <span className="text-elec-yellow font-semibold">£{results.dailyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Annual Cost:</span>
                <span className="text-elec-yellow font-semibold">£{results.annualCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">CO₂ Savings:</span>
                <span className="text-elec-yellow font-semibold">{results.carbonSavings.toFixed(0)} kg/year</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300">Heat Pump Installation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-200">
          <div className="space-y-3">
            <h4 className="font-semibold">Sizing Considerations:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Size for 95% of heating demand to avoid oversizing</li>
              <li>• Consider thermal mass and heat-up times</li>
              <li>• Account for domestic hot water requirements</li>
              <li>• Plan for defrost cycles in air source systems</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Electrical Requirements:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Three-phase supply may be required for larger units</li>
              <li>• Consider supply capacity and diversity</li>
              <li>• Install appropriate protection and isolation</li>
              <li>• Plan for backup heating if required</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeatPumpCalculator;
