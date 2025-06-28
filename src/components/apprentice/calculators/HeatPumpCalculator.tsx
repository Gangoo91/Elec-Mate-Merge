
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, RotateCcw, Calculator } from "lucide-react";
import { toast } from "sonner";

const HeatPumpCalculator = () => {
  const [propertySize, setPropertySize] = useState("");
  const [insulation, setInsulation] = useState("");
  const [outsideTemp, setOutsideTemp] = useState("-3");
  const [insideTemp, setInsideTemp] = useState("21");
  const [heatPumpType, setHeatPumpType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [result, setResult] = useState<any>(null);

  const heatPumpTypes = {
    "air-source": { cop: 3.5, efficiency: 350 },
    "ground-source": { cop: 4.5, efficiency: 450 },
    "water-source": { cop: 4.2, efficiency: 420 }
  };

  const insulationFactors = {
    "poor": 1.5,
    "average": 1.2,
    "good": 1.0,
    "excellent": 0.8
  };

  const propertyFactors = {
    "flat": 0.8,
    "terraced": 1.0,
    "semi-detached": 1.2,
    "detached": 1.4,
    "bungalow": 1.1
  };

  const calculateHeatPump = () => {
    const size = parseFloat(propertySize);
    const outsideTempNum = parseFloat(outsideTemp);
    const insideTempNum = parseFloat(insideTemp);

    if (!size || !insulation || !heatPumpType || !propertyType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const heatPumpSpec = heatPumpTypes[heatPumpType as keyof typeof heatPumpTypes];
    const insulationFactor = insulationFactors[insulation as keyof typeof insulationFactors];
    const propertyFactor = propertyFactors[propertyType as keyof typeof propertyFactors];
    
    // Temperature difference
    const tempDifference = insideTempNum - outsideTempNum;
    
    // Heat loss calculation (simplified)
    const heatLossPerM2 = 40; // W/m² base heat loss
    const totalHeatLoss = size * heatLossPerM2 * insulationFactor * propertyFactor * (tempDifference / 20);
    
    // Heat pump sizing (add 20% safety margin)
    const heatPumpCapacity = totalHeatLoss * 1.2;
    
    // Electrical load calculation
    const electricalLoad = heatPumpCapacity / heatPumpSpec.cop;
    
    // Running costs (assuming 30p per kWh)
    const hourlyRunningCost = (electricalLoad / 1000) * 0.30;
    const dailyRunningCost = hourlyRunningCost * 10; // 10 hours average per day
    const annualRunningCost = dailyRunningCost * 180; // heating season
    
    // Circuit requirements
    const current = electricalLoad / 230; // Single phase
    const recommendedMCB = current < 16 ? 20 : current < 25 ? 32 : current < 40 ? 45 : 63;
    const cableSize = current < 16 ? 2.5 : current < 25 ? 4 : current < 32 ? 6 : 10;

    setResult({
      totalHeatLoss: (totalHeatLoss / 1000).toFixed(1),
      heatPumpCapacity: (heatPumpCapacity / 1000).toFixed(1),
      electricalLoad: (electricalLoad / 1000).toFixed(1),
      current: current.toFixed(1),
      recommendedMCB,
      cableSize,
      cop: heatPumpSpec.cop,
      hourlyRunningCost: hourlyRunningCost.toFixed(2),
      dailyRunningCost: dailyRunningCost.toFixed(2),
      annualRunningCost: annualRunningCost.toFixed(0),
      tempDifference
    });

    toast.success("Heat pump calculations completed!");
  };

  const resetCalculator = () => {
    setPropertySize("");
    setInsulation("");
    setOutsideTemp("-3");
    setInsideTemp("21");
    setHeatPumpType("");
    setPropertyType("");
    setResult(null);
    toast.info("Calculator reset");
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Heat Pump Electrical Load Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate electrical requirements for heat pump installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="property-size">Property Size (m²) *</Label>
              <Input
                id="property-size"
                type="number"
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                placeholder="e.g., 120"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="property-type">Property Type *</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="terraced">Terraced House</SelectItem>
                  <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                  <SelectItem value="detached">Detached House</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="insulation">Insulation Level *</Label>
              <Select value={insulation} onValueChange={setInsulation}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select insulation level" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="poor">Poor (Pre-1970)</SelectItem>
                  <SelectItem value="average">Average (1970-1990)</SelectItem>
                  <SelectItem value="good">Good (1990-2010)</SelectItem>
                  <SelectItem value="excellent">Excellent (Post-2010)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="heat-pump-type">Heat Pump Type *</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="outside-temp">Outside Temp (°C)</Label>
                <Input
                  id="outside-temp"
                  type="number"
                  value={outsideTemp}
                  onChange={(e) => setOutsideTemp(e.target.value)}
                  placeholder="-3"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="inside-temp">Inside Temp (°C)</Label>
                <Input
                  id="inside-temp"
                  type="number"
                  value={insideTemp}
                  onChange={(e) => setInsideTemp(e.target.value)}
                  placeholder="21"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateHeatPump} className="flex-1">
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
                  <CardTitle className="text-green-300 text-lg">Heat Pump Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Heat Loss:</span>
                      <p className="font-mono font-bold">{result.totalHeatLoss} kW</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">HP Capacity:</span>
                      <p className="font-mono font-bold">{result.heatPumpCapacity} kW</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Electrical Load:</span>
                      <p className="font-mono font-bold">{result.electricalLoad} kW</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <p className="font-mono font-bold">{result.current} A</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">MCB Rating:</span>
                      <p className="font-mono font-bold">{result.recommendedMCB} A</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cable Size:</span>
                      <p className="font-mono font-bold">{result.cableSize} mm²</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">COP:</span>
                      <p className="font-mono font-bold">{result.cop}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temp Diff:</span>
                      <p className="font-mono font-bold">{result.tempDifference}°C</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Running Costs</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Hourly:</span>
                        <p className="font-mono font-bold">£{result.hourlyRunningCost}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Daily:</span>
                        <p className="font-mono font-bold">£{result.dailyRunningCost}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Annual:</span>
                        <p className="font-mono font-bold">£{result.annualRunningCost}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Thermometer className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter property details to calculate heat pump requirements</p>
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

export default HeatPumpCalculator;
