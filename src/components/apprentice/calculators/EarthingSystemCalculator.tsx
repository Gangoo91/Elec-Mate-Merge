
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap } from "lucide-react";

const EarthingSystemCalculator = () => {
  const [systemType, setSystemType] = useState("");
  const [soilResistivity, setSoilResistivity] = useState("");
  const [electrodeType, setElectrodeType] = useState("");
  const [result, setResult] = useState<{
    earthResistance: number;
    electrodeLength: number;
    stepVoltage: number;
    touchVoltage: number;
  } | null>(null);

  const calculateEarthing = () => {
    if (!systemType || !soilResistivity || !electrodeType) return;

    const rho = parseFloat(soilResistivity);
    
    // Simplified earth electrode calculations
    let resistance = 0;
    let length = 0;
    
    if (electrodeType === 'rod') {
      length = 2.4; // Standard 2.4m rod
      resistance = (rho / (2 * Math.PI * length)) * Math.log(8 * length / 0.016);
    } else if (electrodeType === 'plate') {
      const area = 1.2; // 1.2m² plate
      resistance = rho / (4 * Math.sqrt(area / Math.PI));
      length = Math.sqrt(area);
    } else if (electrodeType === 'strip') {
      length = 20; // 20m strip
      resistance = rho / (2 * Math.PI * length);
    }
    
    // Simplified step and touch voltage calculations
    const faultCurrent = 1000; // Assume 1kA fault
    const stepVoltage = resistance * faultCurrent * 0.65;
    const touchVoltage = resistance * faultCurrent * 0.75;

    setResult({
      earthResistance: resistance,
      electrodeLength: length,
      stepVoltage,
      touchVoltage
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Earthing System Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate earth electrode resistance and safety parameters
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-type">System Type</Label>
              <Select value={systemType} onValueChange={setSystemType}>
                <SelectTrigger id="system-type">
                  <SelectValue placeholder="Select system type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tn-s">TN-S System</SelectItem>
                  <SelectItem value="tn-c-s">TN-C-S System</SelectItem>
                  <SelectItem value="tt">TT System</SelectItem>
                  <SelectItem value="it">IT System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="electrode-type">Electrode Type</Label>
              <Select value={electrodeType} onValueChange={setElectrodeType}>
                <SelectTrigger id="electrode-type">
                  <SelectValue placeholder="Select electrode type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rod">Earth Rod</SelectItem>
                  <SelectItem value="plate">Earth Plate</SelectItem>
                  <SelectItem value="strip">Earth Strip</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-resistivity">Soil Resistivity (Ω·m)</Label>
              <Select value={soilResistivity} onValueChange={setSoilResistivity}>
                <SelectTrigger id="soil-resistivity">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Wet Clay (10 Ω·m)</SelectItem>
                  <SelectItem value="50">Moist Clay (50 Ω·m)</SelectItem>
                  <SelectItem value="100">Clay (100 Ω·m)</SelectItem>
                  <SelectItem value="200">Sandy Clay (200 Ω·m)</SelectItem>
                  <SelectItem value="500">Sand (500 Ω·m)</SelectItem>
                  <SelectItem value="1000">Dry Sand (1000 Ω·m)</SelectItem>
                  <SelectItem value="3000">Rock (3000 Ω·m)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateEarthing} className="w-full">
              Calculate Earthing System
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Earthing System Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-200">Earth Resistance</div>
                      <div className="text-green-300 font-mono text-xl font-bold">{result.earthResistance.toFixed(1)} Ω</div>
                    </div>
                    <div>
                      <div className="text-green-200">Electrode Length</div>
                      <div className="text-green-300 font-mono text-xl font-bold">{result.electrodeLength.toFixed(1)} m</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-200">Step Voltage</div>
                      <div className="text-green-300 font-mono text-lg">{result.stepVoltage.toFixed(0)} V</div>
                    </div>
                    <div>
                      <div className="text-green-200">Touch Voltage</div>
                      <div className="text-green-300 font-mono text-lg">{result.touchVoltage.toFixed(0)} V</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Zap className="h-8 w-8 mx-auto mb-2" />
                    <p>Configure earthing system parameters</p>
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

export default EarthingSystemCalculator;
