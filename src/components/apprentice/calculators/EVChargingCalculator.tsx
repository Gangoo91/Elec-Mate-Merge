
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Car, Zap, Clock, PoundSterling } from "lucide-react";

const EVChargingCalculator = () => {
  const [inputs, setInputs] = useState({
    batteryCapacity: "",
    chargerType: "7kw-ac",
    currentCharge: "20",
    targetCharge: "80",
    electricityRate: "0.30",
    diversityFactor: "1.0"
  });

  const [results, setResults] = useState<{
    energyRequired: number;
    chargingTime: number;
    cost: number;
    peakDemand: number;
    circuitLoad: number;
    recommendedCable: string;
  } | null>(null);

  const calculateEVCharging = () => {
    const capacity = parseFloat(inputs.batteryCapacity);
    const currentCharge = parseFloat(inputs.currentCharge);
    const targetCharge = parseFloat(inputs.targetCharge);
    const electricityRate = parseFloat(inputs.electricityRate);
    const diversityFactor = parseFloat(inputs.diversityFactor);

    if (!capacity || currentCharge >= targetCharge) return;

    // Energy required calculation
    const chargeNeeded = targetCharge - currentCharge;
    const energyRequired = (capacity * chargeNeeded) / 100; // kWh

    // Charger specifications
    const chargerSpecs = {
      '3kw-ac': { power: 3, voltage: 230, phases: 1, efficiency: 0.90 },
      '7kw-ac': { power: 7, voltage: 230, phases: 1, efficiency: 0.92 },
      '11kw-ac': { power: 11, voltage: 400, phases: 3, efficiency: 0.93 },
      '22kw-ac': { power: 22, voltage: 400, phases: 3, efficiency: 0.93 },
      '50kw-dc': { power: 50, voltage: 400, phases: 3, efficiency: 0.95 },
      '150kw-dc': { power: 150, voltage: 400, phases: 3, efficiency: 0.95 }
    };

    const charger = chargerSpecs[inputs.chargerType as keyof typeof chargerSpecs];
    
    // Charging time calculation
    const effectivePower = charger.power * charger.efficiency;
    const chargingTime = energyRequired / effectivePower;

    // Cost calculation
    const cost = energyRequired * electricityRate;

    // Electrical load calculations
    const peakDemand = charger.power / charger.efficiency; // kW
    const current = (peakDemand * 1000) / (charger.voltage * (charger.phases === 3 ? Math.sqrt(3) : 1));
    const circuitLoad = current * diversityFactor;

    // Cable recommendation based on current
    let recommendedCable = "";
    if (circuitLoad <= 16) recommendedCable = "2.5mm² T&E";
    else if (circuitLoad <= 20) recommendedCable = "4mm² T&E";
    else if (circuitLoad <= 25) recommendedCable = "6mm² T&E";
    else if (circuitLoad <= 32) recommendedCable = "10mm² T&E";
    else if (circuitLoad <= 40) recommendedCable = "16mm² SWA";
    else recommendedCable = "25mm² SWA";

    setResults({
      energyRequired,
      chargingTime,
      cost,
      peakDemand,
      circuitLoad,
      recommendedCable
    });
  };

  const resetCalculator = () => {
    setInputs({
      batteryCapacity: "",
      chargerType: "7kw-ac",
      currentCharge: "20",
      targetCharge: "80",
      electricityRate: "0.30",
      diversityFactor: "1.0"
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Car className="h-5 w-5" />
            EV Charging Station Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="batteryCapacity">Battery Capacity (kWh)</Label>
              <Input
                id="batteryCapacity"
                type="number"
                value={inputs.batteryCapacity}
                onChange={(e) => setInputs({...inputs, batteryCapacity: e.target.value})}
                placeholder="Vehicle battery capacity"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="chargerType">Charger Type</Label>
              <Select value={inputs.chargerType} onValueChange={(value) => setInputs({...inputs, chargerType: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="3kw-ac">3kW AC (Slow)</SelectItem>
                  <SelectItem value="7kw-ac">7kW AC (Standard)</SelectItem>
                  <SelectItem value="11kw-ac">11kW AC (Fast)</SelectItem>
                  <SelectItem value="22kw-ac">22kW AC (Fast)</SelectItem>
                  <SelectItem value="50kw-dc">50kW DC (Rapid)</SelectItem>
                  <SelectItem value="150kw-dc">150kW DC (Ultra-rapid)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currentCharge">Current Charge (%)</Label>
              <Input
                id="currentCharge"
                type="number"
                value={inputs.currentCharge}
                onChange={(e) => setInputs({...inputs, currentCharge: e.target.value})}
                placeholder="Current battery level"
                className="bg-elec-dark border-elec-yellow/20"
                min="0"
                max="100"
              />
            </div>

            <div>
              <Label htmlFor="targetCharge">Target Charge (%)</Label>
              <Input
                id="targetCharge"
                type="number"
                value={inputs.targetCharge}
                onChange={(e) => setInputs({...inputs, targetCharge: e.target.value})}
                placeholder="Desired battery level"
                className="bg-elec-dark border-elec-yellow/20"
                min="0"
                max="100"
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

            <div>
              <Label htmlFor="diversityFactor">Diversity Factor</Label>
              <Select value={inputs.diversityFactor} onValueChange={(value) => setInputs({...inputs, diversityFactor: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.0">1.0 (Single charger)</SelectItem>
                  <SelectItem value="0.8">0.8 (Multiple chargers)</SelectItem>
                  <SelectItem value="0.6">0.6 (Large installation)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateEVCharging} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                Charging Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Energy Required:</span>
                <span className="text-elec-yellow font-semibold">{results.energyRequired.toFixed(1)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Charging Time:</span>
                <span className="text-elec-yellow font-semibold">{results.chargingTime.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Charging Cost:</span>
                <span className="text-elec-yellow font-semibold">£{results.cost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-light flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Electrical Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-elec-light/80">Peak Demand:</span>
                <span className="text-elec-yellow font-semibold">{results.peakDemand.toFixed(1)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Circuit Current:</span>
                <span className="text-elec-yellow font-semibold">{results.circuitLoad.toFixed(1)} A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-elec-light/80">Recommended Cable:</span>
                <span className="text-elec-yellow font-semibold">{results.recommendedCable}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300">EV Charging Installation Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-200">
          <div className="space-y-3">
            <h4 className="font-semibold">Installation Requirements:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Dedicated circuit with RCD protection (Type A or B)</li>
              <li>• DC fault protection for AC charging points</li>
              <li>• Earth electrode may be required for outdoor installations</li>
              <li>• Consider load balancing for multiple charge points</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Regulations & Standards:</h4>
            <ul className="space-y-1 text-sm">
              <li>• BS EN 61851 series for EV charging equipment</li>
              <li>• IET Code of Practice for EV charging installations</li>
              <li>• Building Regulations Part P notification required</li>
              <li>• DNO notification for installations over 3.68kW per phase</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EVChargingCalculator;
