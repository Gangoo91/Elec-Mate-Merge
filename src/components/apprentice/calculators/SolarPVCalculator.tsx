
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sun, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SolarPVCalculator = () => {
  const [systemSize, setSystemSize] = useState("");
  const [panelWattage, setPanelWattage] = useState("");
  const [efficiency, setEfficiency] = useState("20");
  const [location, setLocation] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [tiltAngle, setTiltAngle] = useState("35");
  const [results, setResults] = useState<any>(null);

  // Typical peak sun hours for UK regions
  const peakSunHours = {
    "london": 2.8,
    "manchester": 2.6,
    "birmingham": 2.7,
    "leeds": 2.5,
    "glasgow": 2.2,
    "edinburgh": 2.3,
    "bristol": 2.9,
    "liverpool": 2.5,
    "cardiff": 2.8,
    "belfast": 2.1
  };

  const calculatePV = () => {
    const panelWatts = parseFloat(panelWattage);
    const efficiencyPercent = parseFloat(efficiency) / 100;
    const areaM2 = parseFloat(roofArea);
    const tilt = parseFloat(tiltAngle);
    const sunHours = peakSunHours[location as keyof typeof peakSunHours] || 2.5;

    if (!panelWatts || !areaM2) return;

    // Calculate number of panels that can fit
    const panelArea = 2; // Typical panel area in m²
    const maxPanels = Math.floor(areaM2 / panelArea);
    
    // System capacity
    const systemCapacity = maxPanels * panelWatts;
    
    // Daily energy generation (accounting for efficiency and tilt)
    const tiltFactor = tilt >= 30 && tilt <= 40 ? 1.0 : 0.9; // Optimal tilt factor
    const dailyGeneration = systemCapacity * sunHours * efficiencyPercent * tiltFactor / 1000; // kWh
    
    // Annual generation
    const annualGeneration = dailyGeneration * 365;
    
    // CO2 savings (UK grid factor: ~0.23kg CO2/kWh)
    const co2Savings = annualGeneration * 0.23;
    
    // Rough cost estimates
    const systemCost = systemCapacity * 1.2; // £1.20 per watt
    const annualSavings = annualGeneration * 0.15; // £0.15 per kWh
    const paybackPeriod = systemCost / annualSavings;

    setResults({
      maxPanels,
      systemCapacity,
      dailyGeneration,
      annualGeneration,
      co2Savings,
      systemCost,
      annualSavings,
      paybackPeriod
    });
  };

  const resetCalculator = () => {
    setSystemSize("");
    setPanelWattage("");
    setEfficiency("20");
    setLocation("");
    setRoofArea("");
    setTiltAngle("35");
    setResults(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Solar PV System Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="panel-wattage">Panel Wattage (W)</Label>
                <Input
                  id="panel-wattage"
                  type="number"
                  value={panelWattage}
                  onChange={(e) => setPanelWattage(e.target.value)}
                  placeholder="e.g., 400"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="efficiency">System Efficiency (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  placeholder="e.g., 20"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="roof-area">Available Roof Area (m²)</Label>
                <Input
                  id="roof-area"
                  type="number"
                  value={roofArea}
                  onChange={(e) => setRoofArea(e.target.value)}
                  placeholder="e.g., 40"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="tilt-angle">Roof Tilt Angle (°)</Label>
                <Input
                  id="tilt-angle"
                  type="number"
                  value={tiltAngle}
                  onChange={(e) => setTiltAngle(e.target.value)}
                  placeholder="e.g., 35"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="london">London (2.8 peak sun hours)</SelectItem>
                  <SelectItem value="manchester">Manchester (2.6 peak sun hours)</SelectItem>
                  <SelectItem value="birmingham">Birmingham (2.7 peak sun hours)</SelectItem>
                  <SelectItem value="leeds">Leeds (2.5 peak sun hours)</SelectItem>
                  <SelectItem value="glasgow">Glasgow (2.2 peak sun hours)</SelectItem>
                  <SelectItem value="edinburgh">Edinburgh (2.3 peak sun hours)</SelectItem>
                  <SelectItem value="bristol">Bristol (2.9 peak sun hours)</SelectItem>
                  <SelectItem value="liverpool">Liverpool (2.5 peak sun hours)</SelectItem>
                  <SelectItem value="cardiff">Cardiff (2.8 peak sun hours)</SelectItem>
                  <SelectItem value="belfast">Belfast (2.1 peak sun hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculatePV}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!panelWattage || !roofArea || !location}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate System
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">System Analysis</h3>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Max Panels:</p>
                    <p className="text-lg font-bold text-white">{results.maxPanels}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">System Size:</p>
                    <p className="text-lg font-bold text-white">{(results.systemCapacity / 1000).toFixed(1)}kW</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Daily Generation:</p>
                  <p className="text-xl font-bold text-white">{results.dailyGeneration.toFixed(1)} kWh</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Annual Generation:</p>
                  <p className="text-2xl font-bold text-white">{results.annualGeneration.toFixed(0)} kWh</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">CO₂ Savings:</p>
                    <p className="text-lg font-bold text-green-400">{results.co2Savings.toFixed(0)} kg/year</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Cost:</p>
                    <p className="text-lg font-bold text-white">£{results.systemCost.toFixed(0)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Savings:</p>
                    <p className="text-lg font-bold text-green-400">£{results.annualSavings.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payback Period:</p>
                    <p className="text-lg font-bold text-white">{results.paybackPeriod.toFixed(1)} years</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> These are estimates based on typical values. 
                    Actual performance may vary based on shading, weather, and system orientation.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter system parameters to calculate solar PV performance and economics.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarPVCalculator;
