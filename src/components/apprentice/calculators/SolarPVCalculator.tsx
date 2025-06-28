
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Info, Calculator, RotateCcw, Zap, TrendingUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Expanded UK locations with solar irradiance data (kWh/m²/year)
const UK_LOCATIONS = [
  { name: "London", irradiance: 1100 },
  { name: "Manchester", irradiance: 950 },
  { name: "Birmingham", irradiance: 1000 },
  { name: "Leeds", irradiance: 950 },
  { name: "Glasgow", irradiance: 850 },
  { name: "Edinburgh", irradiance: 900 },
  { name: "Cardiff", irradiance: 1050 },
  { name: "Belfast", irradiance: 850 },
  { name: "Bristol", irradiance: 1100 },
  { name: "Liverpool", irradiance: 950 },
  { name: "Newcastle", irradiance: 900 },
  { name: "Nottingham", irradiance: 1000 },
  { name: "Sheffield", irradiance: 950 },
  { name: "Brighton", irradiance: 1150 },
  { name: "Plymouth", irradiance: 1100 },
  { name: "Norwich", irradiance: 1050 },
  { name: "York", irradiance: 950 },
  { name: "Bath", irradiance: 1050 },
  { name: "Oxford", irradiance: 1050 },
  { name: "Cambridge", irradiance: 1000 },
  { name: "Exeter", irradiance: 1100 },
  { name: "Canterbury", irradiance: 1100 },
  { name: "Winchester", irradiance: 1100 },
  { name: "Inverness", irradiance: 800 },
  { name: "Aberdeen", irradiance: 850 },
  { name: "Dundee", irradiance: 850 },
  { name: "Stirling", irradiance: 850 },
  { name: "Perth", irradiance: 850 },
  { name: "Swansea", irradiance: 1000 },
  { name: "Newport", irradiance: 1050 },
  { name: "Bangor", irradiance: 950 },
  { name: "Derry", irradiance: 800 },
  { name: "Armagh", irradiance: 850 }
];

const SolarPVCalculator = () => {
  const [systemSize, setSystemSize] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [panelEfficiency, setPanelEfficiency] = useState<string>("20");
  const [roofOrientation, setRoofOrientation] = useState<string>("south");
  const [roofTilt, setRoofTilt] = useState<string>("35");
  const [systemCost, setSystemCost] = useState<string>("6000");
  const [electricityRate, setElectricityRate] = useState<string>("0.25");
  const [result, setResult] = useState<{
    annualGeneration: number;
    dailyGeneration: number;
    annualSavings: number;
    paybackPeriod: number;
    co2Savings: number;
    systemEfficiency: number;
  } | null>(null);

  const calculateSolarPV = () => {
    const size = parseFloat(systemSize);
    const efficiency = parseFloat(panelEfficiency) / 100;
    const cost = parseFloat(systemCost);
    const rate = parseFloat(electricityRate);
    const tilt = parseFloat(roofTilt);

    if (size > 0 && location && efficiency > 0) {
      const locationData = UK_LOCATIONS.find(loc => loc.name === location);
      if (!locationData) return;

      let irradiance = locationData.irradiance;

      // Orientation factor
      let orientationFactor = 1.0;
      switch (roofOrientation) {
        case "south": orientationFactor = 1.0; break;
        case "southwest": 
        case "southeast": orientationFactor = 0.95; break;
        case "east":
        case "west": orientationFactor = 0.85; break;
        case "north": orientationFactor = 0.6; break;
      }

      // Tilt factor (optimal tilt in UK is around 35°)
      const optimalTilt = 35;
      const tiltDifference = Math.abs(tilt - optimalTilt);
      const tiltFactor = Math.max(0.7, 1 - (tiltDifference / 100));

      // System efficiency (includes inverter losses, wiring losses, etc.)
      const systemEfficiency = efficiency * 0.85; // 85% system efficiency

      // Annual generation calculation
      const annualGeneration = size * irradiance * orientationFactor * tiltFactor * systemEfficiency;
      const dailyGeneration = annualGeneration / 365;

      // Financial calculations
      const annualSavings = annualGeneration * rate;
      const paybackPeriod = cost / annualSavings;

      // Environmental impact (UK grid factor: 0.233 kg CO2/kWh)
      const co2Savings = annualGeneration * 0.233;

      setResult({
        annualGeneration: Math.round(annualGeneration),
        dailyGeneration: Math.round(dailyGeneration * 10) / 10,
        annualSavings: Math.round(annualSavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        co2Savings: Math.round(co2Savings),
        systemEfficiency: Math.round(systemEfficiency * 100)
      });
    }
  };

  const reset = () => {
    setSystemSize("");
    setLocation("");
    setPanelEfficiency("20");
    setRoofOrientation("south");
    setRoofTilt("35");
    setSystemCost("6000");
    setElectricityRate("0.25");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Solar PV System Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate solar panel performance, energy generation, and financial returns for UK installations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* System Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="system-size">System Size (kW)</Label>
                <Input
                  id="system-size"
                  type="number"
                  step="0.1"
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  placeholder="e.g., 4.0"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="panel-efficiency">Panel Efficiency (%)</Label>
                <Select value={panelEfficiency} onValueChange={setPanelEfficiency}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="15">15% (Budget panels)</SelectItem>
                    <SelectItem value="18">18% (Standard panels)</SelectItem>
                    <SelectItem value="20">20% (Premium panels)</SelectItem>
                    <SelectItem value="22">22% (High-efficiency panels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location and Installation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {UK_LOCATIONS.map((loc) => (
                      <SelectItem key={loc.name} value={loc.name}>
                        {loc.name} ({loc.irradiance} kWh/m²/year)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roof-orientation">Roof Orientation</Label>
                <Select value={roofOrientation} onValueChange={setRoofOrientation}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="south">South (Best)</SelectItem>
                    <SelectItem value="southeast">South-East</SelectItem>
                    <SelectItem value="southwest">South-West</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="north">North (Poor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Financial and Technical Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roof-tilt">Roof Tilt (degrees)</Label>
                <Input
                  id="roof-tilt"
                  type="number"
                  value={roofTilt}
                  onChange={(e) => setRoofTilt(e.target.value)}
                  placeholder="35"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="system-cost">System Cost (£)</Label>
                <Input
                  id="system-cost"
                  type="number"
                  value={systemCost}
                  onChange={(e) => setSystemCost(e.target.value)}
                  placeholder="6000"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="electricity-rate">Electricity Rate (£/kWh)</Label>
              <Input
                id="electricity-rate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
                placeholder="0.25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={calculateSolarPV} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Solar PV Performance</h3>
                    <Badge variant="secondary" className="mb-4">
                      {location} - {result.systemEfficiency}% System Efficiency
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Energy Generation */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-elec-yellow" />
                        <span className="text-sm font-medium">Energy Generation</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Annual:</span>
                          <span className="font-mono text-elec-yellow">{result.annualGeneration.toLocaleString()} kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Daily Average:</span>
                          <span className="font-mono text-elec-yellow">{result.dailyGeneration} kWh</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Returns */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Financial Returns</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Annual Savings:</span>
                          <span className="font-mono text-green-500">£{result.annualSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Payback Period:</span>
                          <span className="font-mono text-green-500">{result.paybackPeriod} years</span>
                        </div>
                      </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Environmental Impact</span>
                      </div>
                      <div className="pl-6">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">CO₂ Saved Annually:</span>
                          <span className="font-mono text-blue-500">{result.co2Savings} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-xs text-muted-foreground">
                    <div>Calculations include:</div>
                    <div>• System efficiency losses (15%)</div>
                    <div>• Orientation and tilt factors</div>
                    <div>• UK solar irradiance data</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Configure your solar PV system to see performance calculations
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Results are estimates based on typical UK conditions. Actual performance may vary due to weather, shading, and system maintenance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarPVCalculator;
