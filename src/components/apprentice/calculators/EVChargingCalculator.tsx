
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, RotateCcw, Calculator } from "lucide-react";
import { toast } from "sonner";

const EVChargingCalculator = () => {
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [chargeLevel, setChargeLevel] = useState("20");
  const [targetLevel, setTargetLevel] = useState("80");
  const [chargerType, setChargerType] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [numberOfChargers, setNumberOfChargers] = useState("1");
  const [result, setResult] = useState<any>(null);

  const chargerTypes = {
    "type1-slow": { power: 3, voltage: 230, phases: 1, name: "Type 1 Slow (3kW)" },
    "type1-fast": { power: 7, voltage: 230, phases: 1, name: "Type 1 Fast (7kW)" },
    "type2-single": { power: 7.4, voltage: 230, phases: 1, name: "Type 2 Single Phase (7.4kW)" },
    "type2-three": { power: 22, voltage: 400, phases: 3, name: "Type 2 Three Phase (22kW)" },
    "rapid-dc": { power: 50, voltage: 400, phases: 3, name: "Rapid DC (50kW)" },
    "ultra-rapid": { power: 150, voltage: 400, phases: 3, name: "Ultra Rapid (150kW)" }
  };

  const installationFactors = {
    "domestic": { factor: 1.0, earthing: "TN-C-S", mcbType: "B" },
    "commercial": { factor: 1.2, earthing: "TN-S", mcbType: "C" },
    "public": { factor: 1.5, earthing: "TN-S", mcbType: "C" },
    "industrial": { factor: 1.3, earthing: "TT", mcbType: "C" }
  };

  const calculateEVCharging = () => {
    const capacity = parseFloat(batteryCapacity);
    const currentLevel = parseFloat(chargeLevel);
    const targetLevelNum = parseFloat(targetLevel);
    const numChargers = parseInt(numberOfChargers);

    if (!capacity || !chargerType || !installationType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const charger = chargerTypes[chargerType as keyof typeof chargerTypes];
    const installation = installationFactors[installationType as keyof typeof installationFactors];
    
    // Energy required
    const energyNeeded = (capacity * (targetLevelNum - currentLevel)) / 100;
    
    // Charging time
    const chargingTime = energyNeeded / charger.power;
    
    // Electrical calculations
    const totalPower = charger.power * numChargers * installation.factor;
    const current = charger.phases === 1 
      ? totalPower / charger.voltage 
      : totalPower / (charger.voltage * Math.sqrt(3));
    
    // Circuit protection
    const mcbRating = current < 16 ? 20 : 
                     current < 25 ? 32 : 
                     current < 32 ? 40 : 
                     current < 40 ? 50 : 
                     current < 50 ? 63 : 100;
    
    // Cable sizing (simplified)
    const cableSize = current < 16 ? 2.5 :
                     current < 25 ? 4 :
                     current < 32 ? 6 :
                     current < 40 ? 10 :
                     current < 50 ? 16 : 25;
    
    // RCD requirements
    const rcdRating = mcbRating;
    const rcdType = charger.power > 7 ? "Type A" : "Type AC";
    
    // Cost calculations (rough estimates)
    const energyCostPer100km = (15 * 0.30); // 15kWh per 100km at 30p/kWh
    const chargingCost = energyNeeded * 0.30;
    
    // Installation requirements
    const earthingSystem = installation.earthing;
    const specialRequirements = charger.power > 7 ? 
      ["Dedicated supply", "RCD protection", "Surge protection", "Load balancing"] :
      ["Standard supply", "RCD protection"];

    setResult({
      energyNeeded: energyNeeded.toFixed(1),
      chargingTime: chargingTime.toFixed(1),
      totalPower: totalPower.toFixed(1),
      current: current.toFixed(1),
      mcbRating,
      cableSize,
      rcdRating,
      rcdType,
      phases: charger.phases,
      voltage: charger.voltage,
      chargingCost: chargingCost.toFixed(2),
      energyCostPer100km: energyCostPer100km.toFixed(2),
      earthingSystem,
      specialRequirements
    });

    toast.success("EV charging calculations completed!");
  };

  const resetCalculator = () => {
    setBatteryCapacity("");
    setChargeLevel("20");
    setTargetLevel("80");
    setChargerType("");
    setInstallationType("");
    setNumberOfChargers("1");
    setResult(null);
    toast.info("Calculator reset");
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-elec-yellow" />
          <CardTitle>EV Charging Station Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate electrical requirements for EV charging installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="battery-capacity">Vehicle Battery Capacity (kWh) *</Label>
              <Input
                id="battery-capacity"
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
                placeholder="e.g., 75"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="charge-level">Current Charge (%)</Label>
                <Input
                  id="charge-level"
                  type="number"
                  value={chargeLevel}
                  onChange={(e) => setChargeLevel(e.target.value)}
                  placeholder="20"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="target-level">Target Charge (%)</Label>
                <Input
                  id="target-level"
                  type="number"
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  placeholder="80"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="charger-type">Charger Type *</Label>
              <Select value={chargerType} onValueChange={setChargerType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select charger type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="type1-slow">Type 1 Slow (3kW)</SelectItem>
                  <SelectItem value="type1-fast">Type 1 Fast (7kW)</SelectItem>
                  <SelectItem value="type2-single">Type 2 Single Phase (7.4kW)</SelectItem>
                  <SelectItem value="type2-three">Type 2 Three Phase (22kW)</SelectItem>
                  <SelectItem value="rapid-dc">Rapid DC (50kW)</SelectItem>
                  <SelectItem value="ultra-rapid">Ultra Rapid (150kW)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installation-type">Installation Type *</Label>
              <Select value={installationType} onValueChange={setInstallationType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select installation type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="number-chargers">Number of Chargers</Label>
              <Input
                id="number-chargers"
                type="number"
                value={numberOfChargers}
                onChange={(e) => setNumberOfChargers(e.target.value)}
                placeholder="1"
                min="1"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateEVCharging} className="flex-1">
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
              <div className="space-y-4">
                <Card className="border-green-500/30 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-green-300 text-lg">Charging Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Energy Needed:</span>
                        <p className="font-mono font-bold">{result.energyNeeded} kWh</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Charging Time:</span>
                        <p className="font-mono font-bold">{result.chargingTime} hrs</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Power:</span>
                        <p className="font-mono font-bold">{result.totalPower} kW</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current:</span>
                        <p className="font-mono font-bold">{result.current} A</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="text-blue-300 text-lg">Electrical Installation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">MCB Rating:</span>
                        <p className="font-mono font-bold">{result.mcbRating} A</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cable Size:</span>
                        <p className="font-mono font-bold">{result.cableSize} mm²</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RCD Rating:</span>
                        <p className="font-mono font-bold">{result.rcdRating} A</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RCD Type:</span>
                        <p className="font-mono font-bold">{result.rcdType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Supply:</span>
                        <p className="font-mono font-bold">{result.phases} Phase</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Voltage:</span>
                        <p className="font-mono font-bold">{result.voltage} V</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <span className="text-muted-foreground">Earthing System:</span>
                      <p className="font-mono font-bold">{result.earthingSystem}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardHeader>
                    <CardTitle className="text-amber-300 text-lg">Cost & Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Charging Cost:</span>
                        <p className="font-mono font-bold">£{result.chargingCost}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost per 100km:</span>
                        <p className="font-mono font-bold">£{result.energyCostPer100km}</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <h4 className="font-medium mb-2">Special Requirements:</h4>
                      <ul className="space-y-1">
                        {result.specialRequirements.map((req: string, index: number) => (
                          <li key={index} className="text-sm">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Car className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter EV and charger details to calculate installation requirements</p>
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

export default EVChargingCalculator;
